---
title: 从入门小白成长为嵌入式高手（二）——CAN通信协议（大疆3508电机驱动）（RoboMater篇）（上）
aliases:
  - CAN 通信协议详解
  - M3508 CAN 通信教程
  - RoboMaster CAN 协议入门
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
  - topic/motor
  - type/tutorial
created: 2026-05-24
modified: 2026-05-24
source: https://aiot.csdn.net/69df664154b52172bc6a1b17.html
author: huayigui
---

# 从入门小白成长为嵌入式高手（二）——CAN通信协议（大疆3508电机驱动）（RoboMater篇）（上）

> [!summary] 概述
> 本文详细介绍 CAN 通信协议基础知识及其在大疆 M3508 电机驱动中的应用，包括 CAN 总线原理、数据帧格式、大疆电机 CAN 通信协议及代码实现。

---

## 一、大疆 M3508 电机

### 1.1 大疆电机简介

大疆 M3508 是大疆公司推出的一款高性能无刷直流电机，主要用于无人机、航模及机甲机器人等领域。

![灵活控制](https://i-blog.csdnimg.cn/direct/e820961a3f70420ebd01a2cb1334b04a.jpeg)

| 参数 | 规格 |
|------|------|
| **额定电压** | 24V |
| **空载转速** | 462 RPM |
| **额定扭矩** | 0.25 N·m |
| **峰值扭矩** | 0.8 N·m |
| **编码器** | 8192 线增量式编码器 |

### 1.2 驱动方式

M3508 电机支持两种驱动方式：

#### （1）PWM 驱动

大疆 C620 电调内部自带 PID 闭环控制，使用 PWM 控制时：

| 特性 | 说明 |
|------|------|
| **控制方式** | 发送占空比信号 |
| **PID 控制** | 电调内部自动执行 |
| **控制目标** | 根据脉宽确定目标转速 |
| **反馈机制** | 内部传感器实时检测转速 |

**工作流程：**

```
PWM 信号 ──→ C620 电调 ──→ 内部 PID ──→ 电机输出
               ↑
          霍尔传感器反馈
```

#### （2）CAN 通信驱动

**硬件连接：**

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│  STM32      │         │  C620 电调   │         │  M3508      │
│  开发板     │         │             │         │  电机       │
│             │         │             │         │             │
│  CAN_H ─────┼─────────┼─ CAN_H      │         │             │
│  CAN_L ─────┼─────────┼─ CAN_L      ├─────────┤  电机输出   │
│             │         │             │         │             │
└─────────────┘         └─────────────┘         └─────────────┘
```

**软件设置步骤：**

| 步骤 | 内容 |
|------|------|
| **1. CAN 初始化** | 使用 STM32CubeMX 配置，波特率 1Mbps |
| **2. 接收过滤器** | 设置接收标准 ID 0x200~0x207 |
| **3. 发送控制指令** | ID = 0x200 + 电机编号，数据域 8 字节 |
| **4. 接收反馈数据** | 中断回调函数处理 |
| **5. PID 闭环控制** | 外部控制器计算目标电流 |

> [!important] 关键区别
> 使用 CAN 控制时，**C620 电调不执行内部的速度 PID 控制**，需要外部控制器进行 PID 运算。

---

## 二、CAN 通信协议

### 2.1 CAN 通信简介

**CAN（Controller Area Network）** 是一种用于实时应用的串行通讯协议总线，可以使用双绞线传输信号，是世界上应用最广泛的现场总线之一。

### 2.2 CAN 总线信号

CAN 总线使用两根差分信号线：

| 信号线 | 显性电平 | 隐性电平 | 说明 |
|--------|----------|----------|------|
| **CAN_H** | 约 3.5V | 约 2.5V | 高电平信号线 |
| **CAN_L** | 约 1.5V | 约 2.5V | 低电平信号线 |
| **电压差** | 约 2V | 0V | 差分信号传输 |

**差分信号优势：**

```
显性状态（逻辑 0）：
  CAN_H: 3.5V  ─────────────
                        │
                        │ 差分电压 ≈ 2V
                        │
  CAN_L: 1.5V  ─────────────

隐性状态（逻辑 1）：
  CAN_H: 2.5V  ─────────────
                        │
                        │ 差分电压 ≈ 0V
                        │
  CAN_L: 2.5V  ─────────────
```

**差分设计优势：**
- 大幅抵御电磁干扰
- 适配工业/车载/机器人等复杂环境
- 支持远距离传输

### 2.3 CAN 总线拓扑

**闭环结构（标准）：**

```
        终端电阻 (120Ω)
             ┌──┐
             │  │
    ┌────────┴──┴────────┐
    │                     │
   ┌┴┐                   ┌┴┐
   │ │ Node 1    Node 2 │ │
   └┬┘                   └┬┘
    │                     │
    └────────┬──┬────────┘
             │  │
             └──┘
        终端电阻 (120Ω)
```

定义：CAN_H与CAN_L构成完整差分回路，两端接120Ω终端电阻，信号通过两线电压差传输。

![闭环结构](https://i-blog.csdnimg.cn/direct/97bf37a7d5154980bf5bf417eeb7bd35.png)


特点：抗干扰极强、传输距离远、信号稳定，是汽车、机器人（RoboMaster）等工业/[嵌入式](https://link.csdn.net/?target=https%3A%2F%2Fwww.elecfans.com%2Fzt%2F29415%2F)场景的标准用法。

**开环结构（简化）：**

定义：仅用CAN_H或CAN_L单线传输，或未接终端电阻、总线断开，无完整差分回路。

```
    ┌─── Node 1 ─── Node 2 ─── Node 3 ───┐
    │                                      │
   CAN_H ──────────────────────────────── CAN_H
   CAN_L ──────────────────────────────── CAN_L
```

  
![](https://i-blog.csdnimg.cn/direct/6f6a622af86a4aa88857a051130469f8.png)

特点：抗干扰极差、传输距离极短（仅几米）、易丢包，仅用于调试排查（如测试收发器是否输出信号）或极端简化场景（不推荐正式使用）。

---

## 三、CAN 通信格式

### 3.1 CAN 数据帧结构

  
![](https://i-blog.csdnimg.cn/direct/b28ed48ad9844cc1a038da12a914c07f.jpg)

以CAN 2.0核心的数据帧（标准帧+扩展帧）为例：

```
标准 CAN 数据帧结构：
┌──────┬────────┬────────┬──────────┬───────┬──────┬────────┐
│ 帧起始│ 仲裁域 │ 控制域  │  数据域   │ CRC域 │ ACK域│ 帧结束 │
│ SOF  │ ID     │ DLC    │ 0-8 Byte │ 15bit │ 2bit│ EOF    │
└──────┴────────┴────────┴──────────┴───────┴──────┴────────┘
```

| 字段 | 长度 | 说明 |
|------|------|------|
| **SOF** | 1 bit | 帧起始位，显性电平 |
| **ID** | 11 bit | 标准标识符（仲裁域） |
| **RTR** | 1 bit | 远程请求位 |
| **IDE** | 1 bit | 标识符扩展位 |
| **DLC** | 4 bit | 数据长度码（0-8） |
| **Data** | 0-64 bit | 数据域 |
| **CRC** | 15 bit | 循环冗余校验 |
| **ACK** | 2 bit | 应答位 |
| **EOF** | 7 bit | 帧结束 |

### 3.2 标准帧 vs 扩展帧

| 特性 | 标准帧 | 扩展帧 |
|------|--------|--------|
| **ID 长度** | 11 bit | 29 bit |
| **适用场景** | 一般应用 | 复杂系统 |
| **大疆电机** | 使用标准帧 | - |

### 3.3 数据帧类型

| 帧类型 | 说明 |
|--------|------|
| **数据帧** | 携带数据，用于发送/接收 |
| **远程帧** | 请求数据，无数据域 |
| **错误帧** | 检测到错误时发送 |
| **过载帧** | 请求延迟下一帧 |

---

## 四、大疆电机 CAN 数据帧报文格式

### 4.1 发送控制命令（单片机 → 电调）

标准帧格式：用于向电调发送控制指令控制电调的电流输出，两个标识符(0x200和0x1FF)各自对应控制4个ID的电调。控制电流值范围  
-16384~0~16384，对应电调输出的转矩电流范围-20～0～20A。

![](https://i-blog.csdnimg.cn/direct/d487efde0bae4eceac33156a4e30cfd6.jpg)

电调ID一般设置为1-7，ID8一般不用。当ID设为8时，电机会自校准，疯狂转。具体原因就是电调反馈频率为1000hz，一条CAN报文108Bit，总线挂载7个电机，外加两个控制报文，108×9×1000=0.972Mbps，刚好是1M波特率上限。如果需要增加控制电机的数量，可以通过上位机（RM Assistant）来降频处理。

![](https://i-blog.csdnimg.cn/direct/29b0c3c2b7584448b668b4807127ab5c.jpg)


**控制 1-4 号电机：**

| 参数 | 值 |
|------|-----|
| **标识符 (ID)** | 0x200 |
| **帧类型** | 标准帧 |
| **帧格式** | DATA |
| **DLC** | 8 字节 |

**数据格式：**

| 字节 | 内容 | 说明 |
|------|------|------|
| Byte 0 | 电流1高8位 | 电机1目标电流 |
| Byte 1 | 电流1低8位 | (范围 -16384~16384) |
| Byte 2 | 电流2高8位 | 电机2目标电流 |
| Byte 3 | 电流2低8位 | |
| Byte 4 | 电流3高8位 | 电机3目标电流 |
| Byte 5 | 电流3低8位 | |
| Byte 6 | 电流4高8位 | 电机4目标电流 |
| Byte 7 | 电流4低8位 | |

**控制 5-8 号电机：**

| 参数 | 值 |
|------|-----|
| **标识符 (ID)** | 0x1FF |
| **帧格式** | DATA |
| **DLC** | 8 字节 |

### 4.2 接收反馈数据（电调 → 单片机）

电调发送报文数据格式（对应芯片接收报文格式）

![](https://i-blog.csdnimg.cn/direct/c12514c9dbbe40749cd0091f643ae15d.jpg)


**反馈帧格式：**

| 参数 | 值 |
|------|-----|
| **标识符 (ID)** | 0x201~0x208（对应电机编号） |
| **帧类型** | 标准帧 |
| **帧格式** | DATA |
| **DLC** | 8 字节 |
| **发送频率** | 1KHz（默认） |

**数据格式：**

| 字节 | 内容 | 说明 |
|------|------|------|
| Byte 0-1 | 机械角度 | 0~8191（对应 0~360°） |
| Byte 2-3 | 转子转速 | RPM（有符号） |
| Byte 4-5 | 转矩电流 | -16384~16384 |
| Byte 6 | 电机温度 | ℃ |
| Byte 7 | 保留 | - |

### 4.3 电流值对应关系

```
电流值范围：-16384 ~ 0 ~ 16384
对应电调输出电流：-20A ~ 0A ~ 20A

转换公式：
实际电流(A) = 电流值 × 20 / 16384
```

---

## 五、STM32 CAN 配置

### 5.1 CubeMX 配置

**步骤 1：启用 CAN**

在 Pinout & Configuration → Connectivity → CAN：
- 勾选 **Master Mode**

**步骤 2：参数配置**

| 参数 | 值 | 说明 |
|------|-----|------|
| Prescaler | 3 | 预分频 |
| Time Quanta in Bit Segment 1 | 10 Times | |
| Time Quanta in Bit Segment 2 | 3 Times | |
| ReSynchronization Jump Width | 1 Time | |

**波特率计算：**

```
波特率 = APB1时钟 / (Prescaler × (SyncSeg + BS1 + BS2))
       = 42MHz / (3 × (1 + 10 + 3))
       = 42MHz / 42
       = 1Mbps
```

**步骤 3：NVIC 配置**

- 使能 **CAN RX0 中断**

### 5.2 过滤器配置

```c
/**
 * @brief  CAN 过滤器配置
 */
void CAN_FilterConfig(void)
{
    CAN_FilterTypeDef filter;

    filter.FilterBank = 0;
    filter.FilterMode = CAN_FILTERMODE_IDMASK;
    filter.FilterScale = CAN_FILTERSCALE_32BIT;
    filter.FilterIdHigh = 0x200 << 5;      // ID 高位
    filter.FilterIdLow = 0x0000;
    filter.FilterMaskIdHigh = 0x7F0 << 5;  // 掩码（接收 0x200-0x207）
    filter.FilterMaskIdLow = 0x0000;
    filter.FilterFIFOAssignment = CAN_RX_FIFO0;
    filter.FilterActivation = ENABLE;
    filter.SlaveStartFilterBank = 14;

    HAL_CAN_ConfigFilter(&hcan1, &filter);
}
```

---

## 六、代码实现

### 6.1 CAN 初始化

```c
/**
 * @brief  CAN 初始化
 */
void CAN_User_Init(void)
{
    // 配置过滤器
    CAN_FilterConfig();

    // 启动 CAN
    HAL_CAN_Start(&hcan1);

    // 使能接收中断
    HAL_CAN_ActivateNotification(&hcan1, CAN_IT_RX_FIFO0_MSG_PENDING);
}
```

### 6.2 发送控制命令

```c
/**
 * @brief  发送电机电流控制命令
 * @param  motor_id: 电机 ID (1-4)
 * @param  current: 目标电流 (-16384~16384)
 */
void Motor_SendCurrent(uint8_t motor_id, int16_t current)
{
    CAN_TxHeaderTypeDef txHeader;
    uint8_t txData[8] = {0};
    uint32_t txMailbox;

    // 设置帧头
    txHeader.StdId = 0x200;
    txHeader.IDE = CAN_ID_STD;
    txHeader.RTR = CAN_RTR_DATA;
    txHeader.DLC = 8;

    // 填充数据
    txData[(motor_id - 1) * 2] = (current >> 8) & 0xFF;
    txData[(motor_id - 1) * 2 + 1] = current & 0xFF;

    // 发送
    HAL_CAN_AddTxMessage(&hcan1, &txHeader, txData, &txMailbox);
}
```

### 6.3 接收中断回调

```c
/**
 * @brief  电机数据结构
 */
typedef struct
{
    uint16_t angle;    // 机械角度
    int16_t speed;     // 转速
    int16_t current;   // 实际电流
    uint8_t temp;      // 温度
} Motor_Data_t;

Motor_Data_t motor_data[8];

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
            uint8_t index = rxHeader.StdId - 0x201;

            // 解析数据
            motor_data[index].angle = (rxData[0] << 8) | rxData[1];
            motor_data[index].speed = (int16_t)((rxData[2] << 8) | rxData[3]);
            motor_data[index].current = (int16_t)((rxData[4] << 8) | rxData[5]);
            motor_data[index].temp = rxData[6];
        }
    }
}
```

---

## 七、总结

### 7.1 CAN vs PWM 控制对比

| 特性 | CAN 控制 | PWM 控制 |
|------|----------|----------|
| **PID 执行位置** | 外部控制器 | 电调内部 |
| **数据反馈** | 丰富（位置/速度/电流/温度） | 无 |
| **控制精度** | 高 | 一般 |
| **接线复杂度** | 中等 | 简单 |
| **适用场景** | 精确控制 | 简单应用 |

### 7.2 学习要点

1. **CAN 总线原理**：差分信号、抗干扰能力
2. **数据帧格式**：标准帧、ID、数据域
3. **大疆协议**：发送 ID 0x200/0x1FF，接收 ID 0x201-0x208
4. **电流控制**：-16384~16384 对应 -20A~20A
5. **PID 控制**：CAN 模式需要外部计算

---

## 八、相关链接

- [[大疆M3508电机使用CAN通信进行速度PID闭环控制详解]] - PID 控制实现
- [[大疆A型板使用经验分享（7）——大疆M3508电机和PID控制]] - 电机基础
- [[开发板示例概览]] - 开发板示例索引
- [原文链接](https://aiot.csdn.net/69df664154b52172bc6a1b17.html)

---

## 参考资料

| 资料 | 说明 |
|------|------|
| **C620 电调说明书** | 大疆官网 |
| **M3508 电机说明书** | 大疆官网 |
| **CAN 协议规范** | ISO 11898 |
| **STM32 CAN 参考手册** | ST 官网 |

---

## 版本记录

| 日期 | 版本 | 说明 |
|------|------|------|
| 2026-05-24 | 1.0 | 初始版本 |
