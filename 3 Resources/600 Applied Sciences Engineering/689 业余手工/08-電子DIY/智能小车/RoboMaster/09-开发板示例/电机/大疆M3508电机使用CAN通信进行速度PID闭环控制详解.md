---
title: 大疆M3508电机使用CAN通信进行速度PID闭环控制详解
aliases:
  - DJI M3508 CAN PID 控制
  - M3508 速度闭环控制
  - RoboMaster 电机 PID 教程
para: resource
domain:
  - "[[RoboMaster]]"
  - "[[DJI]]"
  - "[[STM32]]"
tags:
  - para/resource/tech
  - topic/robomaster
  - topic/stm32
  - topic/can
  - topic/pid
  - topic/motor
  - type/tutorial
created: 2026-05-24
modified: 2026-05-24
source: https://blog.csdn.net/qq_30267617/article/details/119651826
author: qq_30267617
---

# 大疆M3508电机使用CAN通信进行速度PID闭环控制详解

> [!summary] 概述
> 本文详细介绍如何使用 STM32 微控制器通过 CAN 通信实现对大疆 M3508 电机的速度 PID 控制，包括通信协议、PID 控制原理、CAN 中断接收与查询接收两种方式的代码实现。

---

## 一、简介

### 1.1 背景

M3508 电机是大疆 RoboMaster 机器人同款电机，配套 C620 电调使用。本文分别使用 **CAN 查询接收**与 **CAN 中断接收**两种方式实现速度 PID 闭环控制，去掉了操作系统，使代码精简易读。

### 1.2 开发环境

| 项目 | 说明 |
|------|------|
| **IDE** | Keil MDK 5.14 |
| **配置工具** | STM32CubeMX 6.2.1 |
| **开发板** | STM32F407 / STM32F767 |
| **电机** | 大疆 M3508 + C620 电调 |

### 1.3 实现功能

- 大疆 M3508 速度 PID 控制
- CAN 查询接收与中断接收两种方式
- 无操作系统，代码精简

---

## 二、电机通信协议

### 2.1 控制方式对比

C620 电调可以通过两种方式控制电机：

| 控制方式 | 特点 | 优缺点 |
|----------|------|--------|
| **PWM 控制** | 接线简单，直接速度控制 | 速度稳定性不好 |
| **CAN 控制** | 电调上传数据，PID 计算控制 | 速度稳定性好，功能完整 |

> [!note] 推荐方式
> 实际测试表明，PWM 方式速度稳定性不行，**推荐使用 CAN 通信方式**。

### 2.2 CAN 上传报文

电调发给单片机的数据，上传电机状态信息：

| 参数 | 说明 |
|------|------|
| **标识符** | 0x200 + 电调 ID（如 ID=1，标识符=0x201） |
| **帧类型** | 标准帧 |
| **帧格式** | DATA |
| **DLC** | 8 字节 |
| **发送频率** | 1KHz（默认值，可在上位机修改） |

**数据格式：**

| 字节 | 数据 | 说明 |
|------|------|------|
| Byte 0-1 | 转子机械角度 | 0-8191（对应 0-360°） |
| Byte 2-3 | 转子转速 | RPM |
| Byte 4-5 | 转矩电流 | -16384 ~ 16384 |
| Byte 6 | 电机温度 | ℃ |
| Byte 7 | 保留 | - |

### 2.3 CAN 下发报文

单片机发给电调的数据，设置电机电流输出：

| 标识符 | 控制电机 | 说明 |
|--------|----------|------|
| 0x200 | 1-4 号电机 | 控制电流值 |
| 0x1FF | 5-8 号电机 | 控制电流值 |

**帧格式：**

| 参数 | 值 |
|------|-----|
| 帧类型 | 标准帧 |
| 帧格式 | DATA |
| DLC | 8 字节 |

**电流值范围：**

```
电流值范围：-16384 ~ 0 ~ 16384
对应电调输出电流：-20A ~ 0A ~ 20A
```

---

## 三、电机 PID 控制原理

### 3.1 电机控制层次

电机是一种通电就会转的设备，但我们需要精准控制：

| 控制层次 | 说明 |
|----------|------|
| **低级驱动器** | 只提供功率放大，PID 需控制器计算 |
| **高级驱动器** | 内置 PID，控制器只需给指令 |

C620 电调：
- **PWM 模式**：自带速度 PID
- **CAN 模式**：不带 PID，需单片机计算

### 3.2 三闭环控制

伺服电机有三种控制模式：

```
┌─────────────────────────────────────────────┐
│              三闭环控制架构                    │
├─────────────────────────────────────────────┤
│                                             │
│    位置环（最外层）                           │
│         ↓                                   │
│    速度环（中间层）                           │
│         ↓                                   │
│    电流环（最内层）                           │
│                                             │
└─────────────────────────────────────────────┘
```

| 控制模式 | 外环到内环 | 应用场景 |
|----------|------------|----------|
| **位置伺服** | 位置环 → 速度环 → 电流环 | 精确定位 |
| **速度伺服** | 速度环 → 电流环 | 稳速控制 |
| **力伺服** | 电流环 | 力矩控制 |

### 3.3 速度闭环控制

本文目标是速度控制，控制框图如下：

```
目标速度 ──→ (+) ──→ [加减速处理] ──→ [速度环PID] ──→ 电流值 ──→ CAN下发
              │                                          ↑
              │                                          │
              └──────────────── 反馈速度 ←──────────── CAN上传
```

**关键点说明：**

1. **加减速处理**：防止偏差值太大，PID 输出超过电机响应范围
2. **速度环输出**：电流值（转矩电流）
3. **电流环**：由硬件实现

### 3.4 PID 算法

```c
/**
 * @brief  PID 计算
 * @param  target: 目标速度
 * @param  feedback: 反馈速度
 * @retval 输出电流值
 */
float PID_Calc(float target, float feedback)
{
    static float error = 0, last_error = 0, integral = 0;
    float output = 0;

    // 计算误差
    error = target - feedback;

    // 积分项
    integral += error;

    // 限幅
    if (integral > INTEGRAL_MAX) integral = INTEGRAL_MAX;
    if (integral < -INTEGRAL_MAX) integral = -INTEGRAL_MAX;

    // PID 计算
    output = Kp * error + Ki * integral + Kd * (error - last_error);

    // 输出限幅
    if (output > OUTPUT_MAX) output = OUTPUT_MAX;
    if (output < -OUTPUT_MAX) output = -OUTPUT_MAX;

    last_error = error;

    return output;
}
```

---

## 四、CAN 初始化

### 4.1 头文件定义

```c
/* can.h */

#ifndef __CAN_H
#define __CAN_H

#include "sys.h"

// CAN1 接收 RX0 中断使能
#define CAN1_RX0_INT_ENABLE    1    // 0: 不使能; 1: 使能

// CAN 接收数据结构
typedef struct
{
    uint16_t angle;      // 机械角度
    int16_t speed;       // 转速
    int16_t current;     // 实际电流
    uint8_t temp;        // 温度
    int16_t set_current; // 设定电流
} Motor_t;

// 电机数据
extern Motor_t motor[8];

// 函数声明
void CAN_Init(void);
void CAN_SendCurrent(uint8_t id, int16_t *current);

#endif
```

### 4.2 CAN 初始化函数

```c
/* can.c */

#include "can.h"

Motor_t motor[8];  // 8 个电机数据

/**
 * @brief  CAN 初始化
 */
void CAN_Init(void)
{
    CAN_FilterTypeDef filter;
    CAN_TxHeaderTypeDef txHeader;

    // 配置过滤器
    filter.FilterBank = 0;
    filter.FilterMode = CAN_FILTERMODE_IDMASK;
    filter.FilterScale = CAN_FILTERSCALE_32BIT;
    filter.FilterIdHigh = 0x0000;
    filter.FilterIdLow = 0x0000;
    filter.FilterMaskIdHigh = 0x0000;
    filter.FilterMaskIdLow = 0x0000;
    filter.FilterFIFOAssignment = CAN_RX_FIFO0;
    filter.FilterActivation = ENABLE;
    filter.SlaveStartFilterBank = 14;

    if (HAL_CAN_ConfigFilter(&hcan1, &filter) != HAL_OK)
    {
        Error_Handler();
    }

    // 启动 CAN
    if (HAL_CAN_Start(&hcan1) != HAL_OK)
    {
        Error_Handler();
    }

    // 使能接收中断
    if (HAL_CAN_ActivateNotification(&hcan1, CAN_IT_RX_FIFO0_MSG_PENDING) != HAL_OK)
    {
        Error_Handler();
    }
}
```

---

## 五、CAN 发送控制命令

### 5.1 发送函数

```c
/**
 * @brief  发送电机电流控制命令
 * @param  id: CAN ID (0x200 或 0x1FF)
 * @param  current: 电流数组 (4个电机)
 */
void CAN_SendCurrent(uint8_t id, int16_t *current)
{
    CAN_TxHeaderTypeDef txHeader;
    uint8_t txData[8];
    uint32_t txMailbox;

    // 设置帧头
    txHeader.StdId = id;
    txHeader.IDE = CAN_ID_STD;
    txHeader.RTR = CAN_RTR_DATA;
    txHeader.DLC = 8;

    // 填充数据
    txData[0] = (current[0] >> 8) & 0xFF;
    txData[1] = current[0] & 0xFF;
    txData[2] = (current[1] >> 8) & 0xFF;
    txData[3] = current[1] & 0xFF;
    txData[4] = (current[2] >> 8) & 0xFF;
    txData[5] = current[2] & 0xFF;
    txData[6] = (current[3] >> 8) & 0xFF;
    txData[7] = current[3] & 0xFF;

    // 发送
    HAL_CAN_AddTxMessage(&hcan1, &txHeader, txData, &txMailbox);
}
```

---

## 六、CAN 接收数据解析

### 6.1 数据解析函数

```c
/**
 * @brief  解析电机反馈数据
 * @param  id: CAN ID (0x201-0x208)
 * @param  data: 数据缓冲区
 */
void Motor_Decode(uint32_t id, uint8_t *data)
{
    uint8_t index = id - 0x201;  // 计算电机索引

    if (index > 7) return;

    // 解析数据
    motor[index].angle = (data[0] << 8) | data[1];
    motor[index].speed = (int16_t)((data[2] << 8) | data[3]);
    motor[index].current = (int16_t)((data[4] << 8) | data[5]);
    motor[index].temp = data[6];
}
```

---

## 七、方式一：中断接收

### 7.1 中断接收回调

```c
/**
 * @brief  CAN 接收中断回调
 */
void HAL_CAN_RxFifo0MsgPendingCallback(CAN_HandleTypeDef *hcan)
{
    CAN_RxHeaderTypeDef rxHeader;
    uint8_t rxData[8];

    if (HAL_CAN_GetRxMessage(hcan, CAN_RX_FIFO0, &rxHeader, rxData) == HAL_OK)
    {
        // 判断是否为电机反馈数据 (ID: 0x201-0x208)
        if (rxHeader.StdId >= 0x201 && rxHeader.StdId <= 0x208)
        {
            Motor_Decode(rxHeader.StdId, rxData);
        }
    }
}
```

### 7.2 主循环控制

```c
/* main.c - 中断接收方式 */

#include "main.h"
#include "can.h"

// PID 参数
#define KP  10.0f
#define KI  0.5f
#define KD  0.1f

// 目标速度
int16_t target_speed = 100;  // RPM

int main(void)
{
    HAL_Init();
    SystemClock_Config();
    MX_GPIO_Init();
    MX_CAN1_Init();

    // CAN 初始化
    CAN_Init();

    while (1)
    {
        // PID 计算
        float output = PID_Calc(target_speed, motor[0].speed);
        motor[0].set_current = (int16_t)output;

        // 发送控制命令
        CAN_SendCurrent(0x200, &motor[0].set_current);

        HAL_Delay(1);  // 1ms 控制周期
    }
}
```

---

## 八、方式二：查询接收

### 8.1 查询接收函数

```c
/**
 * @brief  CAN 查询接收
 */
void CAN_PollingReceive(void)
{
    CAN_RxHeaderTypeDef rxHeader;
    uint8_t rxData[8];

    // 检查是否有数据
    if (HAL_CAN_GetRxFifoFillLevel(&hcan1, CAN_RX_FIFO0) > 0)
    {
        if (HAL_CAN_GetRxMessage(&hcan1, CAN_RX_FIFO0, &rxHeader, rxData) == HAL_OK)
        {
            if (rxHeader.StdId >= 0x201 && rxHeader.StdId <= 0x208)
            {
                Motor_Decode(rxHeader.StdId, rxData);
            }
        }
    }
}
```

### 8.2 主循环控制

```c
/* main.c - 查询接收方式 */

#include "main.h"
#include "can.h"

int16_t target_speed = 100;  // RPM

int main(void)
{
    HAL_Init();
    SystemClock_Config();
    MX_GPIO_Init();
    MX_CAN1_Init();

    // CAN 初始化（不使能中断）
    CAN_Init();

    while (1)
    {
        // 查询接收数据
        CAN_PollingReceive();

        // PID 计算
        float output = PID_Calc(target_speed, motor[0].speed);
        motor[0].set_current = (int16_t)output;

        // 发送控制命令
        CAN_SendCurrent(0x200, &motor[0].set_current);

        HAL_Delay(1);
    }
}
```

---

## 九、两种方式对比

| 特性 | 中断接收 | 查询接收 |
|------|----------|----------|
| **实时性** | 高 | 一般 |
| **CPU 占用** | 低 | 高 |
| **代码复杂度** | 中等 | 简单 |
| **适用场景** | 实时控制 | 简单应用 |

> [!tip] 推荐选择
> 对于电机控制，**推荐使用中断接收方式**，实时性更好。

---

## 十、PID 参数整定

### 10.1 典型参数范围

| 参数 | 范围 | 说明 |
|------|------|------|
| Kp | 3.0 ~ 15.0 | 比例系数 |
| Ki | 0.1 ~ 1.0 | 积分系数 |
| Kd | 0.0 ~ 0.5 | 微分系数 |

### 10.2 整定步骤

1. 将 Ki、Kd 设为 0，调节 Kp
2. Kp 从小到大，观察速度响应
3. 出现振荡时，取振荡前的值
4. 加入 Ki 消除稳态误差
5. 最后加入 Kd 提高稳定性

---

## 十一、常见问题

| 问题 | 原因 | 解决方法 |
|------|------|----------|
| 电机不转 | CAN 通信异常 | 检查接线和 ID 设置 |
| 速度振荡 | Kp 过大 | 减小 Kp |
| 稳态误差 | Ki 过小 | 增大 Ki |
| 响应慢 | Kp 过小 | 增大 Kp |

---

## 十二、相关链接

- [[大疆A型板使用经验分享（七）——大疆M3508电机和PID控制]] - M3508 电机与 PID 基础
- [[大疆电机M3508 PWM控制]] - PWM 控制方式
- [[基于大疆A板与STM32F427的CAN总线双闭环控制——M2006_M3508位置与速度模式实践]] - 双闭环控制
- [[开发板示例概览]] - 开发板示例索引
- [原文链接](https://blog.csdn.net/qq_30267617/article/details/119651826)

---

## 参考资料

| 资料 | 链接 |
|------|------|
| **C620 电调说明书** | 大疆官网下载 |
| **M3508 电机说明书** | 大疆官网下载 |
| **STM32 CAN 参考手册** | ST 官网 |

---

## 版本记录

| 日期 | 版本 | 说明 |
|------|------|------|
| 2026-05-24 | 1.0 | 初始版本 |
