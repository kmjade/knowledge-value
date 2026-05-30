---
title: ROBOMASTER 开发板 C 型
aliases:
  - RoboMaster Type C 开发板
  - DJI 开发板 C 型
  - STM32F407 开发板
para: resource
domain:
  - "[[RoboMaster]]"
  - "[[DJI]]"
  - "[[STM32]]"
tags:
  - para/resource/tech
  - topic/robomaster
  - topic/stm32
  - topic/embedded
  - type/reference
created: 2026-05-24
modified: 2026-05-24
source: https://www.robomaster.com/zh-CN/products/components/general/development-board-type-c/info
---

# ROBOMASTER 开发板 C 型

> [!summary] 概述
> RoboMaster 开发板 C 型采用 STM32 主控芯片，结构紧凑，接口丰富，集成高精度 IMU 传感器，保护功能强，配套步兵机器人专用例程，专为 RoboMaster 比赛步兵机器人量身打造。

---

## 产品简介

### 产品定位

RoboMaster 开发板 C 型是一款专为 RoboMaster 比赛步兵机器人设计的嵌入式控制板：

- **STM32 主控芯片**：高性能 ARM Cortex-M4 处理器
- **结构紧凑**：小体积，易于集成
- **接口丰富**：多种通信和控制接口
- **集成 IMU**：高精度惯性测量单元
- **保护功能强**：完善的电路保护设计
- **配套例程**：步兵机器人专用示例代码

### 应用场景

| 场景 | 说明 |
|------|------|
| **RoboMaster 比赛** | 步兵机器人控制 |
| **科研教育** | 嵌入式系统教学 |
| **自动化设备** | 工业控制应用 |
| **机器人开发** | 移动机器人平台 |

---

## 技术参数

### 核心参数

| 参数 | 规格 |
|------|------|
| **主控芯片** | STM32F407VGT6 |
| **CPU 架构** | ARM Cortex-M4 |
| **主频** | 168 MHz |
| **Flash** | 1 MB |
| **SRAM** | 192 KB |
| **工作电压** | 4.75V ~ 5.25V |
| **工作温度** | -10°C ~ 55°C |

### 外设资源

| 外设 | 数量 | 说明 |
|------|------|------|
| **CAN** | 2 路 | 电机控制总线 |
| **UART** | 6 路 | 串口通信 |
| **SPI** | 3 路 | 高速通信接口 |
| **I2C** | 3 路 | 传感器通信 |
| **ADC** | 3 路 | 模拟信号采集 |
| **PWM** | 多路 | 电机/舵机控制 |
| **GPIO** | 多路 | 通用输入输出 |
| **USB** | 1 路 | 调试与通信 |

### IMU 传感器

| 参数 | 规格 |
|------|------|
| **型号** | BMI088 |
| **陀螺仪** | 三轴陀螺仪 |
| **加速度计** | 三轴加速度计 |
| **采样率** | 最高 2kHz |
| **通信接口** | SPI |

### 物理参数

| 参数 | 规格 |
|------|------|
| **尺寸** | 67mm × 67mm |
| **重量** | 约 35g |
| **安装孔** | 4 × M3 |

---

## 接口定义

### 电源接口

| 接口 | 说明 |
|------|------|
| **DC 输入** | 4.75V ~ 5.25V |
| **电池接口** | 2S ~ 6S 锂电池 |

### CAN 接口

| 接口 | 引脚 | 说明 |
|------|------|------|
| CAN1 | CAN_H, CAN_L | 电机控制总线 |
| CAN2 | CAN_H, CAN_L | 扩展 CAN 总线 |

### 电机接口

| 接口 | 说明 |
|------|------|
| **M1-M4** | 4 路电机驱动接口 |
| **编码器接口** | 4 路编码器输入 |

### 传感器接口

| 接口 | 说明 |
|------|------|
| **ADC 接口** | 3 路模拟输入 |
| **IO 接口** | 多路数字输入输出 |
| **I2C 接口** | 传感器扩展 |

### 通信接口

| 接口 | 说明 |
|------|------|
| **USB** | USB Device 接口 |
| **USART** | 多路串口 |
| **DBUS** | 遥控器接收机接口 |

---

## 引脚图

### 主要引脚定义

```
                    ┌─────────────────────────┐
                    │   RoboMaster C 型开发板  │
                    │                         │
    ┌───────────────┤ CAN1    CAN2    DBUS    │
    │               │                         │
    │   LED ────────┤ LED1    LED2    LED3    │
    │               │                         │
    │   电源 ───────┤ BAT+    BAT-    DC 5V   │
    │               │                         │
    │   电机 ───────┤ M1      M2      M3   M4 │
    │               │                         │
    │   编码器 ─────┤ ENC1    ENC2    ENC3 ENC4│
    │               │                         │
    │   IMU ────────┤ BMI088 (SPI)            │
    │               │                         │
    │   USB ────────┤ USB Device              │
    │               │                         │
    │   ADC ────────┤ ADC1    ADC2    ADC3    │
    │               │                         │
    │   UART ───────┤ USART1  USART2  USART3  │
    │               │ UART4   UART5   USART6  │
    │               │                         │
    │   SWD ────────┤ SWD_CLK  SWD_DIO        │
                    │                         │
                    └─────────────────────────┘
```

### CAN 引脚分配

| 功能 | 引脚 | 说明 |
|------|------|------|
| CAN1_RX | PD0 | CAN1 接收 |
| CAN1_TX | PD1 | CAN1 发送 |
| CAN2_RX | PB12 | CAN2 接收 |
| CAN2_TX | PB13 | CAN2 发送 |

### UART 引脚分配

| 功能 | TX | RX | 说明 |
|------|------|------|------|
| USART1 | PA9 | PA10 | 调试串口 |
| USART2 | PD5 | PD6 | 扩展串口 |
| USART3 | PD8 | PD9 | 遥控器 |
| UART4 | PC10 | PC11 | 扩展串口 |
| UART5 | PC12 | PD2 | 扩展串口 |
| USART6 | PC6 | PC7 | 扩展串口 |

---

## 开发环境

### IDE 支持

| IDE | 说明 |
|------|------|
| **Keil MDK-ARM** | 推荐使用 |
| **STM32CubeIDE** | 免费开发环境 |
| **IAR EWARM** | 商业 IDE |

### 配置工具

| 工具 | 说明 |
|------|------|
| **STM32CubeMX** | 图形化配置工具 |
| **ST-Link Utility** | 程序下载工具 |

### 调试接口

| 接口 | 说明 |
|------|------|
| **SWD** | Serial Wire Debug |
| **JTAG** | 调试接口 |

---

## 软件资源

### 官方示例代码

GitHub 仓库：[Development-Board-C-Examples](https://github.com/RoboMaster/Development-Board-C-Examples)

### 示例列表

| 示例类型 | 包含示例 |
|----------|----------|
| **基础入门** | LED 点亮/闪烁、定时器、PWM、蜂鸣器、舵机 |
| **通信接口** | USART、CAN、遥控器 DMA |
| **传感器** | IST8310 磁力计、BMI088 IMU、OLED 显示 |
| **实时系统** | FreeRTOS 任务管理 |
| **机器人系统** | 底盘任务、云台任务、惯导系统、完整机器人 |

### HAL 库支持

- **STM32 HAL 库**：硬件抽象层
- **CMSIS**：ARM 标准接口
- **FreeRTOS**：实时操作系统

---

## 使用指南

### 快速开始

1. **安装开发环境**
   - 下载并安装 Keil MDK-ARM
   - 安装 STM32CubeMX
   - 安装 ST-Link 驱动

2. **获取示例代码**
   ```bash
   git clone https://github.com/RoboMaster/Development-Board-C-Examples.git
   ```

3. **编译下载**
   - 使用 Keil 打开工程
   - 编译工程
   - 连接 ST-Link 下载程序

### CAN 通信配置

```c
/* CAN 初始化 */
void CAN_Init(void)
{
    CAN_FilterTypeDef filter;

    filter.FilterBank = 0;
    filter.FilterMode = CAN_FILTERMODE_IDMASK;
    filter.FilterScale = CAN_FILTERSCALE_32BIT;
    filter.FilterIdHigh = 0x0000;
    filter.FilterIdLow = 0x0000;
    filter.FilterMaskIdHigh = 0x0000;
    filter.FilterMaskIdLow = 0x0000;
    filter.FilterFIFOAssignment = CAN_RX_FIFO0;
    filter.FilterActivation = ENABLE;

    HAL_CAN_ConfigFilter(&hcan1, &filter);
    HAL_CAN_Start(&hcan1);
    HAL_CAN_ActivateNotification(&hcan1, CAN_IT_RX_FIFO0_MSG_PENDING);
}
```

### IMU 数据读取

```c
/* BMI088 IMU 初始化 */
void IMU_Init(void)
{
    // 初始化加速度计
    BMI088_Accel_Init();
    // 初始化陀螺仪
    BMI088_Gyro_Init();
}

/* 读取 IMU 数据 */
void IMU_Read(float *accel, float *gyro)
{
    // 读取加速度
    BMI088_Accel_Read(accel);
    // 读取角速度
    BMI088_Gyro_Read(gyro);
}
```

---

## 与 A 型板对比

### 主要差异

| 特性 | A 型板 | C 型板 |
|------|--------|--------|
| **主控芯片** | STM32F427IIH6 | STM32F407VGT6 |
| **主频** | 180MHz | 168MHz |
| **Flash** | 2MB | 1MB |
| **SRAM** | 256KB | 192KB |
| **CAN** | 2 路 | 2 路 |
| **集成 IMU** | 无 | BMI088 |
| **尺寸** | 较大 | 较小 |
| **定位** | 通用开发 | 步兵机器人专用 |

### 选型建议

| 场景 | 推荐型号 |
|------|----------|
| **步兵机器人** | C 型板 |
| **英雄机器人** | A 型板 |
| **云台控制** | C 型板 |
| **复杂系统** | A 型板 |

---

## 常见问题

### Q1: 如何选择 A 型板和 C 型板？

A 型板资源更丰富，适合复杂系统；C 型板集成 IMU，体积小，适合步兵机器人。

### Q2: CAN 通信波特率如何设置？

推荐 1Mbps 波特率，与 RoboMaster 电机电调匹配。

### Q3: 如何配置 FreeRTOS？

使用 STM32CubeMX 可以快速配置 FreeRTOS，添加任务和通信机制。

### Q4: IMU 数据如何使用？

BMI088 提供 SPI 接口，可读取三轴加速度和角速度，用于姿态解算。

---

## 相关链接

- [[开发板C型示例概览]] - C 型板示例教程
- [[开发板示例概览]] - A 型板示例教程
- [官方产品页面](https://www.robomaster.com/zh-CN/products/components/general/development-board-type-c/info)
- [GitHub 示例代码](https://github.com/RoboMaster/Development-Board-C-Examples)

---

## 参考资料

| 资料 | 链接 |
|------|------|
| **STM32F407 数据手册** | [ST 官网](https://www.st.com/zh-CN/microcontrollers-microprocessors/stm32f407-417.html) |
| **BMI088 数据手册** | Bosch 官网 |
| **RoboMaster 开发者社区** | [BBS](http://bbs.robomaster.com/) |

---

## 版本记录

| 日期 | 版本 | 说明 |
|------|------|------|
| 2026-05-24 | 1.0 | 初始版本 |
