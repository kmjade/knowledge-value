---
title: 大疆A型板使用经验分享（五）——DMA配置和遥控器使用
aliases:
  - DJI A型板 DMA 配置
  - STM32 DBUS 协议
  - RoboMaster 遥控器使用
para: resource
domain:
  - "[[RoboMaster]]"
  - "[[DJI]]"
  - "[[STM32]]"
tags:
  - para/resource/tech
  - topic/robomaster
  - topic/stm32
  - topic/dma
  - topic/remote-control
  - type/tutorial
created: 2026-05-24
modified: 2026-05-24
source: https://blog.csdn.net/weixin_43361652/article/details/113747340
author: Cascatrix
---

# 大疆A型板使用经验分享（五）——DMA配置和遥控器使用

> [!summary] 概述
> 本文介绍使用 STM32 通过 DMA 处理 DBUS 协议与遥控器通讯的方法，包括 DMA 原理、DBUS 协议详解、CubeMX 配置步骤及解码函数实现。

---

## 一、DMA 基础

### 1.1 DMA 简介

**直接存储器访问（Direct Memory Access，DMA）**，当需要将外部设备发来的数据存储在存储器中时，如果不使用 DMA 方式则首先需要将外部设备数据先读入 CPU 中，再由 CPU 将数据存储到存储器中。如果数据量很大的话，那么将会占用大量的 CPU 时间，而通过使用 DMA 控制器直接将外部设备数据送入存储器，不需要占用 CPU。

### 1.2 DMA 优势

| 特性 | 传统方式 | DMA 方式 |
|------|----------|----------|
| **数据传输** | CPU 参与 | DMA 控制器完成 |
| **CPU 占用** | 高 | 低 |
| **传输效率** | 较低 | 高 |
| **实时性** | 受 CPU 影响 | 实时性好 |

### 1.3 STM32 DMA 支持的外设

STM32 中的许多通讯都支持 DMA 方式进行数据的收发：

| 外设 | TX | RX | 说明 |
|------|----|----|------|
| USART/UART | ✓ | ✓ | 串口通信 |
| SPI | ✓ | ✓ | SPI 通信 |
| I2C | ✓ | ✓ | I2C 通信 |
| ADC | - | ✓ | 模数转换 |
| DAC | ✓ | - | 数模转换 |
| TIM | ✓ | - | 定时器 |

---

## 二、DBUS 协议

### 2.1 DBUS 简介

遥控器和 STM32 之间采用 **DBUS 协议** 进行通讯。DBUS 通讯协议和串口类似。

### 2.2 DBUS 通信参数

| 参数 | 值 | 说明 |
|------|-----|------|
| **波特率** | 100 kbit/s | 固定速率 |
| **数据位** | 8 位 | 标准数据长度 |
| **校验位** | 偶校验 (Even) | 错误检测 |
| **停止位** | 1 位 | 帧结束标志 |

### 2.3 电平标准

> [!warning] 电平反转
> DBUS 使用的电平标准和串口是**相反的**：
> - DBUS 协议中：高电平表示 0，低电平表示 1
> - 串口协议中：高电平表示 1，低电平表示 0
>
> 如果使用串口进行接收，需要在接收电路上添加一个**反相器**。

### 2.4 数据帧格式

使用 DBUS 接收遥控器的数据，一帧数据的长度为 **18 字节**，一共 **144 位**。

![DBUS数据帧格式](https://i-blog.csdnimg.cn/blog_migrate/26eed445062ff21a6ce49e7f26b986d7.png)

### 2.5 通道数据定义

| 通道 | 长度 | 偏移 | 说明 |
|------|------|------|------|
| CH0 | 11 bit | 0 | 右摇杆水平 |
| CH1 | 11 bit | 11 | 右摇杆垂直 |
| CH2 | 11 bit | 22 | 左摇杆水平 |
| CH3 | 11 bit | 33 | 左摇杆垂直 |
| S1 | 2 bit | 66 | 右开关状态 |
| S2 | 2 bit | 68 | 左开关状态 |
| 鼠标 X | 8 bit | 72 | 鼠标 X 移动 |
| 鼠标 Y | 8 bit | 80 | 鼠标 Y 移动 |
| 鼠标 Z | 8 bit | 88 | 鼠标滚轮 |
| 鼠标左键 | 1 bit | 96 | 左键状态 |
| 鼠标右键 | 1 bit | 97 | 右键状态 |
| 按键 | 16 bit | 98 | 按键状态 |

### 2.6 摇杆数值范围

| 数值 | 说明 |
|------|------|
| 364 | 最小值 |
| 1024 | 中位值 |
| 1684 | 最大值 |

---

## 三、STM32CubeMX 配置

### 3.1 串口选择

A 型板遥控器接收机连接 **USART3**（引脚 PB10/PB11）。

### 3.2 USART3 配置

#### 步骤 1：开启 USART3

在 Pinout & Configuration → Connectivity → USART3：
- **Mode**：Asynchronous（异步模式）

#### 步骤 2：参数配置

| 参数 | 值 | 说明 |
|------|-----|------|
| **Baud Rate** | 100000 | 100k 波特率 |
| **Word Length** | 8 Bits | 数据位 |
| **Parity** | Even | 偶校验 |
| **Stop Bits** | 1 | 停止位 |
| **Data Direction** | Receive Only | 仅接收 |

#### 步骤 3：DMA 配置

在 USART3 → DMA Settings：
- **Add** → USART3_RX
- **Mode**：Circular（循环模式）
- **Data Width**：Byte
- **Priority**：High

#### 步骤 4：NVIC 配置

在 NVIC 中使能 DMA 中断：
- **DMA1 stream1 global interrupt**：Enable

### 3.3 引脚配置

| 引脚 | 功能 | 说明 |
|------|------|------|
| PB10 | USART3_TX | 发送（可选） |
| PB11 | USART3_RX | 接收（遥控器） |

---

## 四、代码实现

### 4.1 数据结构定义

```c
/* remote_control.h */

// 遥控器数据结构
typedef struct
{
    int16_t ch0;      // 右摇杆水平: 364-1024-1684
    int16_t ch1;      // 右摇杆垂直: 364-1024-1684
    int16_t ch2;      // 左摇杆水平: 364-1024-1684
    int16_t ch3;      // 左摇杆垂直: 364-1024-1684
    uint8_t s1;       // 右开关: 1-2-3
    uint8_t s2;       // 左开关: 1-2-3
    int16_t mouse_x;  // 鼠标 X
    int16_t mouse_y;  // 鼠标 Y
    int16_t mouse_z;  // 鼠标滚轮
    uint8_t mouse_l;  // 鼠标左键
    uint8_t mouse_r;  // 鼠标右键
    uint16_t key;     // 按键状态
} RC_ctrl_t;

// 外部变量声明
extern RC_ctrl_t rc_ctrl;
extern uint8_t sbus_rx_buf[18];
```

### 4.2 DMA 接收缓冲区

```c
/* remote_control.c */

#include "remote_control.h"
#include "usart.h"

// DMA 接收缓冲区
uint8_t sbus_rx_buf[18];

// 遥控器数据
RC_ctrl_t rc_ctrl;
```

### 4.3 DMA 初始化

```c
/**
 * @brief  遥控器 DMA 接收初始化
 */
void RC_Init(void)
{
    // 开启 DMA 接收
    HAL_UART_Receive_DMA(&huart3, sbus_rx_buf, 18);
}
```

### 4.4 DBUS 解码函数

```c
/**
 * @brief  DBUS 数据解码函数
 * @param  buf: DMA 接收缓冲区
 * @param  rc: 遥控器数据结构指针
 */
void sbus_to_rc(uint8_t *buf, RC_ctrl_t *rc)
{
    // 通道 0-3 (11 bit each)
    rc->ch0 = (buf[0] | (buf[1] << 8)) & 0x07FF;
    rc->ch1 = ((buf[1] >> 3) | (buf[2] << 5)) & 0x07FF;
    rc->ch2 = ((buf[2] >> 6) | (buf[3] << 2) | (buf[4] << 10)) & 0x07FF;
    rc->ch3 = ((buf[4] >> 1) | (buf[5] << 7)) & 0x07FF;

    // 开关 S1, S2 (2 bit each)
    rc->s1 = ((buf[5] >> 4) & 0x0003);
    rc->s2 = ((buf[5] >> 4) & 0x000C) >> 2;

    // 鼠标数据 (8 bit each)
    rc->mouse_x = buf[6] | (buf[7] << 8);
    rc->mouse_y = buf[8] | (buf[9] << 8);
    rc->mouse_z = buf[10] | (buf[11] << 8);

    // 鼠标按键
    rc->mouse_l = buf[12];
    rc->mouse_r = buf[13];

    // 按键状态 (16 bit)
    rc->key = buf[14] | (buf[15] << 8);
}
```

### 4.5 DMA 接收完成回调

```c
/**
 * @brief  DMA 接收完成回调函数
 * @param  huart: UART 句柄
 */
void HAL_UART_RxCpltCallback(UART_HandleTypeDef *huart)
{
    if (huart->Instance == USART3)
    {
        // 解码遥控器数据
        sbus_to_rc(sbus_rx_buf, &rc_ctrl);
    }
}
```

### 4.6 主程序

```c
/* main.c */

#include "main.h"
#include "usart.h"
#include "remote_control.h"

void RC_Init(void);
void sbus_to_rc(uint8_t *buf, RC_ctrl_t *rc);

int main(void)
{
    // HAL 库初始化
    HAL_Init();

    // 系统时钟配置
    SystemClock_Config();

    // 外设初始化
    MX_GPIO_Init();
    MX_DMA_Init();
    MX_USART3_UART_Init();

    // 遥控器初始化
    RC_Init();

    while (1)
    {
        // 使用遥控器数据
        int16_t ch0 = rc_ctrl.ch0;
        int16_t ch1 = rc_ctrl.ch1;

        // 根据通道值控制机器人...

        HAL_Delay(10);
    }
}
```

---

## 五、遥控器使用示例

### 5.1 通道值归一化

```c
/**
 * @brief  将通道值归一化到 -1.0 ~ 1.0
 * @param  value: 原始通道值 (364-1684)
 * @retval 归一化值 (-1.0 ~ 1.0)
 */
float RC_Normalize(int16_t value)
{
    // 中位值为 1024
    if (value > 1024)
    {
        return (float)(value - 1024) / 660.0f;
    }
    else if (value < 1024)
    {
        return (float)(value - 1024) / 660.0f;
    }
    return 0.0f;
}
```

### 5.2 底盘速度控制

```c
/**
 * @brief  根据遥控器控制底盘速度
 */
void Chassis_RC_Control(void)
{
    float vx, vy, vw;

    // 归一化通道值
    vx = RC_Normalize(rc_ctrl.ch1);  // 前后
    vy = RC_Normalize(rc_ctrl.ch0);  // 左右
    vw = RC_Normalize(rc_ctrl.ch2);  // 旋转

    // 速度限幅
    vx *= MAX_SPEED;
    vy *= MAX_SPEED;
    vw *= MAX_ANGULAR_SPEED;

    // 设置底盘速度
    Chassis_SetSpeed(vx, vy, vw);
}
```

### 5.3 开关状态检测

```c
/**
 * @brief  检测开关状态并执行相应操作
 */
void Switch_Control(void)
{
    // S1 开关状态
    switch (rc_ctrl.s1)
    {
        case 1:  // 上位
            // 执行模式 1
            break;
        case 2:  // 中位
            // 执行模式 2
            break;
        case 3:  // 下位
            // 执行模式 3
            break;
    }

    // S2 开关状态
    switch (rc_ctrl.s2)
    {
        case 1:
            // 功能 1
            break;
        case 2:
            // 功能 2
            break;
        case 3:
            // 功能 3
            break;
    }
}
```

### 5.4 按键检测

```c
// 按键定义
#define KEY_W 0x0001
#define KEY_S 0x0002
#define KEY_A 0x0004
#define KEY_D 0x0008
#define KEY_SHIFT 0x0010
#define KEY_CTRL  0x0020
#define KEY_Q 0x0040
#define KEY_E 0x0080
#define KEY_R 0x0100
#define KEY_F 0x0200
#define KEY_G 0x0400
#define KEY_Z 0x0800
#define KEY_X 0x1000
#define KEY_C 0x2000
#define KEY_V 0x4000
#define KEY_B 0x8000

/**
 * @brief  检测按键状态
 */
void Key_Control(void)
{
    if (rc_ctrl.key & KEY_W)
    {
        // W 键按下
    }
    if (rc_ctrl.key & KEY_SHIFT)
    {
        // Shift 键按下
    }
}
```

---

## 六、调试与验证

### 6.1 调试方法

> [!tip] 变量观察
> 调试过程中，通过观察变量验证配置的正确性。

1. 在调试器中添加以下变量到观察窗口：
   - `sbus_rx_buf` - 原始数据
   - `rc_ctrl` - 解码后数据

2. 检查数据是否随遥控器操作变化

### 6.2 常见问题

| 问题 | 可能原因 | 解决方法 |
|------|----------|----------|
| 数据全为 0 | DMA 未启动 | 检查 `HAL_UART_Receive_DMA` |
| 数据不变 | 中断未触发 | 检查 NVIC 配置 |
| 数据错误 | 波特率不对 | 确认 100K 波特率 |
| 电平异常 | 未加反相器 | 添加反相电路 |

### 6.3 反相电路

由于 DBUS 电平与串口相反，需要添加反相器：

```
方案 1：使用反相器芯片 (74HC04 等)
    遥控器接收机 ──→ 反相器 ──→ STM32 RX

方案 2：使用 NPN 三极管
    遥控器接收机 ──→ ┌─────────┐
                      │  NPN    │
                      └────┬────┘
                           │
    3.3V ────────[10K]────┴────→ STM32 RX
```

---

## 七、A型板遥控器接口

### 7.1 接口定义

| 接口 | 说明 | 引脚 |
|------|------|------|
| DBUS | 遥控器接收机 | USART3 (PB10/PB11) |

### 7.2 接收机接线

| 接收机引脚 | 颜色 | 连接 |
|------------|------|------|
| VCC | 红色 | 5V |
| GND | 黑色 | GND |
| DBUS | 黄色 | PB11 (需反相) |

---

## 八、相关链接

- [[大疆A型板使用经验分享（1）——A型板使用入门]] - 硬件配置与开发环境
- [[大疆A型板使用经验分享（2）——A型板原理图和引脚图]] - 原理图与引脚配置
- [[大疆A型板使用经验分享（3）——时钟树配置和GPIO口配置]] - 时钟与GPIO详解
- [[大疆A型板使用经验分享（4）——PWM和舵机SG996的控制]] - PWM原理与舵机控制
- [[3. 遥控器接收]] - 开发板遥控器示例
- [[开发板示例概览]] - 开发板示例索引
- [原文链接](https://blog.csdn.net/weixin_43361652/article/details/113747340)

---

## 系列文章

本文是大疆 A 型板使用经验分享系列的第五篇：

| 序号  | 文章                                              | 说明          |
| --- | ----------------------------------------------- | ----------- |
| 1   | [[大疆A型板使用经验分享（1）——A型板使用入门]]                     | 硬件配置与开发环境搭建 |
| 2   | [[大疆A型板使用经验分享（2）——A型板原理图和引脚图]]                  | 原理图与引脚配置    |
| 3   | [[大疆A型板使用经验分享（3）——时钟树配置和GPIO口配置]]               | 时钟与GPIO详解   |
| 4   | [[大疆A型板使用经验分享（4）——PWM和舵机SG996的控制]]              | PWM原理与舵机控制  |
| 5   | **DMA配置和遥控器使用**（本文）                             | DMA与遥控器通讯   |
| 6   | [[大疆A型板使用经验分享（6）——GPIO口输入输出模式与HC-SR04超声波传感器控制]] | GPIO与超声波传感器 |

---

## 导航

| 上一章                                | 当前章             | 下一章                                             |
| ---------------------------------- | --------------- | ----------------------------------------------- |
| [[大疆A型板使用经验分享（4）——PWM和舵机SG996的控制]] | **DMA配置和遥控器使用** | [[大疆A型板使用经验分享（6）——GPIO口输入输出模式与HC-SR04超声波传感器控制]] |
