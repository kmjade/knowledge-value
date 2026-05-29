---
title: 大疆A型板使用经验分享（二）——A型板原理图和引脚图
aliases:
  - DJI A型板原理图
  - RoboMaster A型板引脚图
para: resource
domain:
  - "[[RoboMaster]]"
  - "[[DJI]]"
  - "[[STM32]]"
tags:
  - para/resource/tech
  - topic/robomaster
  - topic/stm32
  - topic/hardware
  - type/reference
created: 2026-05-24
modified: 2026-05-24
source: https://blog.csdn.net/weixin_43361652/article/details/112968459
author: Cascatrix
---

# 大疆A型板使用经验分享（二）——A型板原理图和引脚图

> [!summary] 概述
> 本文分享了大疆 A 型板的原理图和引脚图，为理解和操作该开发板提供详细的硬件参考。

---

## 一、A型开发板概述

### 核心芯片

| 参数 | 说明 |
|------|------|
| **MCU 型号** | STM32F427IIH6 |
| **内核** | ARM Cortex-M4 |
| **主频** | 168 MHz |
| **Flash** | 2 MB |
| **RAM** | 256 KB |
| **封装** | BGA-176 |

### 主要特性

- 高性能 DSP 和 FPU
- ART Accelerator 实时加速器
- 多路 PWM 输出
- 多路 UART/USART 接口
- CAN 总线接口
- SPI/I2C 接口
- USB OTG 接口

---

## 二、原理图

### 完整原理图

以下是 A 型开发板的完整原理图，展示了各功能模块的电路连接：

![原理图1](https://i-blog.csdnimg.cn/blog_migrate/7b1f2de5042bcef7f5b4b8f7a9deaf48.png)

![原理图2](https://i-blog.csdnimg.cn/blog_migrate/93afe9ca9d7df594639a7d1597feb785.png)

![原理图3](https://i-blog.csdnimg.cn/blog_migrate/128bea47d021af44efc53d2cc71152fd.png)

![原理图4](https://i-blog.csdnimg.cn/blog_migrate/9658f48733c19b43bb899cda8c6ceb4f.png)

![原理图5](https://i-blog.csdnimg.cn/blog_migrate/6a6e81686b1af812321adea52818d928.png)

![原理图6](https://i-blog.csdnimg.cn/blog_migrate/f53ed50e9cdc8cf350eedd9eac72f64e.png)

---

## 三、引脚配置

### 电源引脚

| 引脚 | 说明 | 电压 |
|------|------|------|
| VBAT | 电池供电 | 3.0V - 3.6V |
| VDD | 数字电源 | 3.3V |
| VSS | 数字地 | GND |
| VCAP_1/VCAP_2 | 内部稳压器电容 | - |

### GPIO 引脚分类

#### PWM 输出引脚

| 引脚 | 定时器 | 通道 | 功能 |
|------|--------|------|------|
| PA0 | TIM2 | CH1 | PWM 输出 |
| PA1 | TIM2 | CH2 | PWM 输出 |
| PA2 | TIM2 | CH3 | PWM 输出 |
| PA3 | TIM2 | CH4 | PWM 输出 |
| PA6 | TIM3 | CH1 | PWM 输出 |
| PA7 | TIM3 | CH2 | PWM 输出 |
| PB0 | TIM3 | CH3 | PWM 输出 |
| PB1 | TIM3 | CH4 | PWM 输出 |

#### 通信接口引脚

| 接口 | TX | RX | 说明 |
|------|----|----|------|
| USART1 | PA9 | PA10 | 调试串口 |
| USART2 | PA2 | PA3 | 通用串口 |
| USART3 | PB10 | PB11 | 遥控器 DBUS |
| UART4 | PA0 | PA1 | 扩展串口 |
| UART6 | PC6 | PC7 | 扩展串口 |
| CAN1 | PB8 | PB9 | CAN 总线 |
| CAN2 | PB12 | PB13 | CAN 总线 |

#### SPI 接口引脚

| 接口 | SCK | MISO | MOSI | 说明 |
|------|-----|------|------|------|
| SPI1 | PA5 | PA6 | PA7 | IMU 传感器 |
| SPI2 | PB13 | PB14 | PB15 | 扩展 SPI |
| SPI3 | PB3 | PB4 | PB5 | 扩展 SPI |

#### I2C 接口引脚

| 接口 | SCL | SDA | 说明 |
|------|-----|-----|------|
| I2C1 | PB6 | PB7 | OLED 显示 |
| I2C2 | PB10 | PB11 | 扩展 I2C |
| I2C3 | PA8 | PC9 | 磁力计 |

---

## 四、功能模块

### 电源系统

```
输入电源 (12V-24V)
    │
    ├── 降压电路 (5V)
    │       │
    │       └── LDO (3.3V) → MCU 供电
    │
    └── 电机驱动电源 (12V)
```

### 通信系统

```
STM32F427
    │
    ├── CAN 总线 ←→ 电机控制器
    │
    ├── UART/USART ←→ 上位机/遥控器
    │
    ├── SPI ←→ IMU 传感器
    │
    └── I2C ←→ OLED/磁力计
```

### 传感器接口

| 传感器 | 接口 | 说明 |
|--------|------|------|
| BMI055 | SPI | 六轴 IMU |
| IST8310 | I2C | 三轴磁力计 |
| ADC | 内部 | 电压/电流检测 |

---

## 五、开发板布局

### 主要接口位置

| 接口 | 位置 | 说明 |
|------|------|------|
| **电源接口** | 板边 | XT30 接口 |
| **CAN 接口** | 板边 | 2x CAN 接口 |
| **PWM 接口** | 板边 | 多路 PWM 输出 |
| **UART 接口** | 板边 | 多路串口 |
| **SPI 接口** | 板内 | 传感器接口 |
| **JTAG/SWD** | 板边 | 调试接口 |
| **USB** | 板边 | USB OTG |
| **OLED 接口** | 板边 | I2C 显示屏 |

### LED 指示灯

| LED | 颜色 | 说明 |
|-----|------|------|
| LED1 | 绿色 | 电源指示 |
| LED2 | 红色 | 状态指示 |
| LED3 | 蓝色 | 通信指示 |

---

## 六、STM32CubeMX 引脚配置

### 推荐配置

在 STM32CubeMX 中配置 A 型板引脚时，需要参考以下配置：

#### 时钟配置

- **外部晶振**：8 MHz
- **系统时钟**：168 MHz
- **APB1 时钟**：42 MHz
- **APB2 时钟**：84 MHz

#### 外设使能

| 外设 | 时钟源 | 说明 |
|------|--------|------|
| TIM1-TIM14 | APB2/APB1 | 定时器 |
| USART1-3, UART4,6 | APB2/APB1 | 串口 |
| CAN1-2 | APB1 | CAN 总线 |
| SPI1-3 | APB2/APB1 | SPI 接口 |
| I2C1-3 | APB1 | I2C 接口 |
| ADC1-3 | APB2 | 模数转换 |

---

## 七、常见问题

### 引脚冲突

> [!warning] 注意事项
> 在使用引脚时，注意检查是否有引脚复用冲突。部分引脚可能被多个外设共用。

### 电源注意事项

1. **输入电压范围**：12V - 25V
2. **启动电流**：需要足够的电源功率
3. **电机驱动**：电机启动时会有大电流冲击

### 通信注意事项

1. **CAN 总线**：需要终端电阻 (120Ω)
2. **串口波特率**：遥控器 DBUS 使用 100K 波特率
3. **SPI 时钟**：根据传感器规格配置

---

## 八、相关资源

### 官方文档

| 文档 | 说明 |
|------|------|
| STM32F427 数据手册 | 芯片规格和引脚定义 |
| STM32F427 参考手册 | 寄存器和外设详细说明 |
| A 型板用户手册 | 开发板使用指南 |

### 相关链接

- [[大疆A型板使用经验分享（1）——A型板使用入门]] - 硬件配置与开发环境
- [[开发板示例概览]] - 开发板示例索引
- [原文链接](https://blog.csdn.net/weixin_43361652/article/details/112968459)

---

## 系列文章

本文是大疆 A 型板使用经验分享系列的第二篇：

| 序号 | 文章 | 说明 |
|------|------|------|
| 1 | [[大疆A型板使用经验分享（1）——A型板使用入门]] | 硬件配置与开发环境搭建 |
| 2 | **A型板原理图和引脚图**（本文） | 原理图与引脚配置 |
| 3 | [[大疆A型板使用经验分享（3）——时钟树配置和GPIO口配置]] | 时钟与GPIO详解 |

---

## 导航

| 上一章 | 当前章 | 下一章 |
|--------|--------|--------|
| [[大疆A型板使用经验分享（1）——A型板使用入门]] | **A型板原理图和引脚图** | [[大疆A型板使用经验分享（3）——时钟树配置和GPIO口配置]] |
