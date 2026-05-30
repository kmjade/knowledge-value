---
title: 大疆A型板使用经验分享（四）——PWM和舵机SG996的控制
aliases:
  - DJI A型板 PWM 控制
  - STM32 舵机控制
  - SG996 舵机教程
para: resource
domain:
  - "[[RoboMaster]]"
  - "[[DJI]]"
  - "[[STM32]]"
tags:
  - para/resource/tech
  - topic/robomaster
  - topic/stm32
  - topic/pwm
  - topic/servo
  - type/tutorial
created: 2026-05-24
modified: 2026-05-24
source: https://blog.csdn.net/weixin_43361652/article/details/113102720
author: Cascatrix
---

# 大疆A型板使用经验分享（四）——PWM和舵机SG996的控制

> [!summary] 概述
> 本文介绍使用 STM32 通过 PWM 技术控制 SG996 舵机的方法，包括 PWM 原理、舵机特性、CubeMX 配置（TIM5_CH1/PH10）及关键代码实现。

---

## 一、PWM 基础

### 1.1 PWM 简介

**脉冲宽度调制（Pulse Width Modulation，PWM）** 是利用微处理器的数字输出来对模拟电路进行控制的一种非常有效的技术。广泛应用在从测量、通信到功率控制与变换的许多领域中。

![PWM波形](https://i-blog.csdnimg.cn/blog_migrate/40ddc4a4ffa617b8f805a450dec7f1e3.png)

如图所示，当 STM32 输出方波时，其等效于近似输出正弦波。

### 1.2 占空比

**占空比**：一个周期内高电平的持续时间占总周期的比例。

通过改变方波的占空比，可以等效于输出了不同电平的模拟信号：

```
若高电平为 3.3V，占空比为 20%，则模拟效果等效于输出一个 0.66V 的模拟信号
```

> [!tip] PWM 频率
> PWM 输出频率越高，其连续性越好；频率低会导致出现突变的现象。

### 1.3 PWM 参数计算

| 参数 | 公式 | 说明 |
|------|------|------|
| **频率** | f = 1/T | T 为周期 |
| **占空比** | D = Ton/T | Ton 为高电平时间 |
| **等效电压** | Veff = Vhigh × D | Vhigh 为高电平电压 |

---

## 二、SG996 舵机

### 2.1 舵机概述

![SG996舵机](https://i-blog.csdnimg.cn/blog_migrate/afc6a2df61294f175e5bf03edf2a6157.png)

SG996 舵机接口有三个引脚：

| 引脚 | 颜色 | 说明 |
|------|------|------|
| **GND** | 黑色 | 接地 |
| **VCC** | 红色 | 5V 高电平供电 |
| **PWM** | 黄色 | PWM 信号输入，控制转动角度 |

### 2.2 舵机工作原理

舵机使用的 PWM 信号一般为：
- **频率**：50 Hz（周期 20ms）
- **高电平时间**：0.5ms - 2.5ms

### 2.3 角度与脉宽对应关系

| 高电平时间 | 转动角度 | 占空比 (50Hz) |
|------------|----------|---------------|
| 0.5 ms | 0° | 2.5% |
| 1.0 ms | 45° | 5% |
| 1.5 ms | 90° | 7.5% |
| 2.0 ms | 135° | 10% |
| 2.5 ms | 180° | 12.5% |

### 2.4 PWM 参数计算

对于 50Hz PWM 信号：

```
PWM 频率 = 50 Hz
PWM 周期 = 1/50 = 20 ms = 20000 μs

舵机控制脉宽范围：500μs ~ 2500μs
对应 CCR (Compare) 值范围需要根据定时器配置计算
```

---

## 三、STM32CubeMX 配置

### 3.1 定时器选择

本例使用 **TIM5_CH1**（引脚 **PH10**）输出 PWM 信号控制舵机。

### 3.2 时钟配置

确保 APB1 时钟频率正确：

```
APB1 Timer Clock = 84 MHz (典型值)
```

### 3.3 TIM5 配置步骤

#### 步骤 1：开启 TIM5

在 Pinout & Configuration → Timers → TIM5：
- **Channel1**：PWM Generation CH1

#### 步骤 2：参数配置

| 参数 | 值 | 说明 |
|------|-----|------|
| **Prescaler (PSC)** | 83 | 预分频系数 |
| **Counter Period (ARR)** | 19999 | 自动重装载值 |
| **Pulse (CCR)** | 1500 | 比较值（初始90°） |
| **Counter Mode** | Up | 向上计数 |
| **auto-reload preload** | Enable | 使能预装载 |

#### 步骤 3：计算验证

```
定时器时钟 = APB1_Timer_Clock / (PSC + 1)
           = 84 MHz / 84 = 1 MHz

PWM 频率 = 定时器时钟 / (ARR + 1)
         = 1 MHz / 20000 = 50 Hz ✓

PWM 周期 = 1/50 = 20 ms ✓
```

#### 步骤 4：引脚配置

确认 PH10 已配置为 TIM5_CH1：

![TIM5配置](https://i-blog.csdnimg.cn/blog_migrate/afc6a2df61294f175e5bf03edf2a6157.png)

### 3.4 生成代码

配置完成后，点击 **Generate Code** 生成工程代码。

---

## 四、代码实现

### 4.1 启动 PWM

```c
/* main.c */

// 启动 PWM 输出
HAL_TIM_PWM_Start(&htim5, TIM_CHANNEL_1);

// 设置初始角度 (90°)
__HAL_TIM_SET_COMPARE(&htim5, TIM_CHANNEL_1, 1500);
```

### 4.2 舵机角度控制函数

```c
/**
 * @brief  设置舵机角度
 * @param  angle: 目标角度 (0-180度)
 * @retval 无
 */
void Servo_SetAngle(uint8_t angle)
{
    // 限制角度范围
    if (angle > 180) angle = 180;

    // 计算脉宽 (500-2500us 对应 0-180度)
    uint16_t pulse = 500 + (uint32_t)angle * 2000 / 180;

    // 设置比较值
    __HAL_TIM_SET_COMPARE(&htim5, TIM_CHANNEL_1, pulse);
}
```

### 4.3 舵机扫描示例

```c
/**
 * @brief  舵机从 0° 扫描到 180°，再返回
 * @param  无
 * @retval 无
 */
void Servo_Scan(void)
{
    // 从 0° 到 180°
    for (uint8_t angle = 0; angle <= 180; angle++)
    {
        Servo_SetAngle(angle);
        HAL_Delay(20);  // 延时，控制转动速度
    }

    // 从 180° 到 0°
    for (uint8_t angle = 180; angle > 0; angle--)
    {
        Servo_SetAngle(angle);
        HAL_Delay(20);
    }
}
```

### 4.4 完整示例代码

```c
/* main.c */

#include "main.h"
#include "tim.h"

void Servo_SetAngle(uint8_t angle);
void Servo_Scan(void);

int main(void)
{
    // HAL 库初始化
    HAL_Init();

    // 系统时钟配置
    SystemClock_Config();

    // 外设初始化
    MX_GPIO_Init();
    MX_TIM5_Init();

    // 启动 PWM
    HAL_TIM_PWM_Start(&htim5, TIM_CHANNEL_1);

    // 设置初始位置
    Servo_SetAngle(90);  // 中位
    HAL_Delay(1000);

    while (1)
    {
        // 舵机扫描
        Servo_Scan();

        HAL_Delay(1000);
    }
}

void Servo_SetAngle(uint8_t angle)
{
    if (angle > 180) angle = 180;

    // 脉宽计算: 500us + (angle * 2000us / 180)
    uint16_t pulse = 500 + (uint32_t)angle * 2000 / 180;

    __HAL_TIM_SET_COMPARE(&htim5, TIM_CHANNEL_1, pulse);
}

void Servo_Scan(void)
{
    // 正向扫描
    for (uint8_t angle = 0; angle <= 180; angle += 5)
    {
        Servo_SetAngle(angle);
        HAL_Delay(20);
    }

    // 反向扫描
    for (uint8_t angle = 180; angle > 0; angle -= 5)
    {
        Servo_SetAngle(angle);
        HAL_Delay(20);
    }
}
```

---

## 五、多舵机控制

### 5.1 多路 PWM 配置

使用同一定时器的多个通道控制多个舵机：

| 定时器 | 通道 | 引脚 | 舵机 |
|--------|------|------|------|
| TIM5 | CH1 | PH10 | 舵机 1 |
| TIM5 | CH2 | PH11 | 舵机 2 |
| TIM5 | CH3 | PH12 | 舵机 3 |
| TIM5 | CH4 | PI0 | 舵机 4 |

### 5.2 多舵机控制代码

```c
/**
 * @brief  设置多路舵机角度
 * @param  channel: 通道号 (1-4)
 * @param  angle: 目标角度 (0-180度)
 */
void Servo_SetAngle_Multi(uint32_t channel, uint8_t angle)
{
    if (angle > 180) angle = 180;

    uint16_t pulse = 500 + (uint32_t)angle * 2000 / 180;

    switch (channel)
    {
        case 1:
            __HAL_TIM_SET_COMPARE(&htim5, TIM_CHANNEL_1, pulse);
            break;
        case 2:
            __HAL_TIM_SET_COMPARE(&htim5, TIM_CHANNEL_2, pulse);
            break;
        case 3:
            __HAL_TIM_SET_COMPARE(&htim5, TIM_CHANNEL_3, pulse);
            break;
        case 4:
            __HAL_TIM_SET_COMPARE(&htim5, TIM_CHANNEL_4, pulse);
            break;
    }
}
```

---

## 六、实践经验

### 6.1 转动速度控制

> [!tip] 速度控制
> 舵机转动速度与 `__HAL_TIM_SET_COMPARE` 函数中的 Compare 参数有关，而旋转角度的精细控制可能需要调整 `HAL_Delay` 的延时时间。

```c
// 快速转动
Servo_SetAngle(90);
HAL_Delay(10);

// 慢速转动（小角度步进）
for (int angle = 0; angle <= 180; angle += 1)
{
    Servo_SetAngle(angle);
    HAL_Delay(50);  // 较长延时，转动更慢
}
```

### 6.2 常见问题

| 问题 | 可能原因 | 解决方法 |
|------|----------|----------|
| 舵机不转 | PWM 未启动 | 检查 `HAL_TIM_PWM_Start` |
| 舵机抖动 | 供电不足 | 使用外部 5V 电源 |
| 角度不准 | 脉宽计算错误 | 校准脉宽范围 |
| 无法达到 180° | 舵机规格限制 | 检查舵机实际角度范围 |

### 6.3 电源注意事项

> [!warning] 电源警告
> 舵机工作时电流较大（可达 500mA-1A），建议：
> 1. 使用独立 5V 电源供电
> 2. 共地连接
> 3. 添加滤波电容

```
推荐电路：
    5V电源 ───┬─── 舵机VCC
              │
             === 470μF (滤波电容)
              │
    GND ─────┴─── 舵机GND
```

---

## 七、A型板 PWM 引脚资源

### 7.1 可用 PWM 定时器

| 定时器 | 通道数 | 总线 | 说明 |
|--------|--------|------|------|
| TIM1 | 4 | APB2 | 高级定时器 |
| TIM2 | 4 | APB1 | 通用定时器 |
| TIM3 | 4 | APB1 | 通用定时器 |
| TIM4 | 4 | APB1 | 通用定时器 |
| TIM5 | 4 | APB1 | 通用定时器 |
| TIM8 | 4 | APB2 | 高级定时器 |

### 7.2 舵机控制推荐配置

| 应用场景 | 推荐定时器 | 说明 |
|----------|------------|------|
| 单舵机 | TIM2/TIM3/TIM4/TIM5 | 通用定时器 |
| 多舵机 | TIM1/TIM8 | 高级定时器，通道多 |
| 精确控制 | TIM1/TIM8 | 高级定时器功能丰富 |

---

## 八、相关链接

- [[大疆A型板使用经验分享（1）——A型板使用入门]] - 硬件配置与开发环境
- [[大疆A型板使用经验分享（2）——A型板原理图和引脚图]] - 原理图与引脚配置
- [[大疆A型板使用经验分享（3）——时钟树配置和GPIO口配置]] - 时钟与GPIO详解
- [[开发板示例概览]] - 开发板示例索引
- [原文链接](https://blog.csdn.net/weixin_43361652/article/details/113102720)

---

## 系列文章

本文是大疆 A 型板使用经验分享系列的第四篇：

| 序号  | 文章                                | 说明          |
| --- | --------------------------------- | ----------- |
| 1   | [[大疆A型板使用经验分享（1）——A型板使用入门]]       | 硬件配置与开发环境搭建 |
| 2   | [[大疆A型板使用经验分享（2）——A型板原理图和引脚图]]    | 原理图与引脚配置    |
| 3   | [[大疆A型板使用经验分享（3）——时钟树配置和GPIO口配置]] | 时钟与GPIO详解   |
| 4   | **PWM和舵机SG996的控制**（本文）            | PWM原理与舵机控制  |
| 5   | [[大疆A型板使用经验分享（5）——DMA配置和遥控器使用]]   | DMA与遥控器通讯   |

---

## 导航

| 上一章                               | 当前章                | 下一章                             |
| --------------------------------- | ------------------ | ------------------------------- |
| [[大疆A型板使用经验分享（3）——时钟树配置和GPIO口配置]] | **PWM和舵机SG996的控制** | [[大疆A型板使用经验分享（5）——DMA配置和遥控器使用]] |
