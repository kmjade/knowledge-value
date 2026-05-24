---
title: 大疆A型板使用经验分享（六）——GPIO口输入输出模式与HC-SR04超声波传感器控制
aliases:
  - DJI A型板 GPIO 输入输出
  - STM32 HC-SR04 控制
  - 超声波传感器教程
para: resource
domain:
  - "[[RoboMaster]]"
  - "[[DJI]]"
  - "[[STM32]]"
tags:
  - para/resource/tech
  - topic/robomaster
  - topic/stm32
  - topic/gpio
  - topic/ultrasonic
  - type/tutorial
created: 2026-05-24
modified: 2026-05-24
source: https://blog.csdn.net/weixin_43361652/article/details/113962137
author: Cascatrix
---

# 大疆A型板使用经验分享（六）——GPIO口输入输出模式与HC-SR04超声波传感器控制

> [!summary] 概述
> 本文介绍使用 STM32 通过 GPIO 口控制 HC-SR04 超声波传感器的方法，包括传感器工作原理、GPIO 输入输出模式配置、CubeMX 配置及代码实现。

---

## 一、HC-SR04 超声波传感器

### 1.1 传感器简介

HC-SR04 超声波传感器是最常用的一款传感器，其可以测定 **2cm ~ 4m** 的距离。

![HC-SR04传感器](https://i-blog.csdnimg.cn/blog_migrate/18bfbfb720a7b1399b868e3b7a197413.png)

### 1.2 技术参数

| 参数 | 值 |
|------|-----|
| **工作电压** | DC 5V |
| **工作电流** | 15mA |
| **工作频率** | 40Hz |
| **测距范围** | 2cm ~ 400cm |
| **测距精度** | 3mm |
| **感应角度** | ≤15° |

### 1.3 接口定义

HC-SR04 超声波模块有 4 个接口：

| 引脚 | 名称 | 说明 |
|------|------|------|
| **VCC** | 电源 | DC 5V 供电 |
| **Trig** | 触发信号 | 持续时间大于 10μs 的 TTL 高电平 |
| **Echo** | 接收信号 | 返回持续时间等同于声波往返时间的高电平 |
| **GND** | 接地 | 接地端口 |

### 1.4 工作原理

![HC-SR04工作时序](https://i-blog.csdnimg.cn/blog_migrate/337a775d11bc5541edc39225e36c6219.png)

**工作流程：**

1. **触发**：STM32 给 Trig 端口发送一段大于 10μs 的 TTL 高电平
2. **发射**：超声波传感器内部循环发出 8 个 40kHz 脉冲
3. **接收**：传感器检测回波，并记录时间差
4. **输出**：Echo 端口返回一段等同于该时间差的 TTL 高电平

### 1.5 距离计算

```
距离 = 声速 × 时间 / 2
     = 340 m/s × t / 2
     = 170 × t (米)
     = 17000 × t (厘米)

其中 t 为 Echo 高电平持续时间（秒）
```

---

## 二、GPIO 输入输出模式

### 2.1 GPIO 模式概述

STM32 GPIO 可配置为多种模式：

| 模式 | 说明 | 应用场景 |
|------|------|----------|
| **浮空输入** | 无上下拉 | 外部信号输入 |
| **上拉输入** | 内部上拉电阻 | 按键检测 |
| **下拉输入** | 内部下拉电阻 | 按键检测 |
| **模拟输入** | ADC 采集 | 模拟信号 |
| **推挽输出** | 高低电平输出 | LED、触发信号 |
| **开漏输出** | 需外部上拉 | I2C 通信 |
| **复用推挽** | 外设功能 | UART TX、SPI |
| **复用开漏** | 外设功能 | I2C SDA |

### 2.2 HC-SR04 GPIO 配置

| 引脚 | 方向 | GPIO 模式 | 说明 |
|------|------|-----------|------|
| **Trig** | 输出 | 推挽输出 | 触发信号 |
| **Echo** | 输入 | 浮空/下拉输入 | 回波信号 |

---

## 三、STM32CubeMX 配置

### 3.1 引脚选择

本例使用：
- **Trig**：PA4（GPIO 输出）
- **Echo**：PA5（GPIO 输入）

### 3.2 GPIO 输出配置（Trig）

在 Pinout & Configuration → GPIO：

| 参数 | 值 | 说明 |
|------|-----|------|
| **GPIO mode** | Output Push Pull | 推挽输出 |
| **GPIO Pull-up/Pull-down** | No pull-up and no pull-down | 无上下拉 |
| **Maximum output speed** | High | 高速输出 |
| **User Label** | TRIG | 用户标签 |

### 3.3 GPIO 输入配置（Echo）

| 参数 | 值 | 说明 |
|------|-----|------|
| **GPIO mode** | Input mode | 输入模式 |
| **GPIO Pull-up/Pull-down** | No pull-up and no pull-down | 无上下拉 |
| **User Label** | ECHO | 用户标签 |

### 3.4 定时器配置

用于测量 Echo 高电平时间：

在 Timers → TIM2：
- **Clock Source**：Internal Clock
- **Prescaler**：83（84MHz → 1MHz，1μs 计数）
- **Counter Period**：0xFFFF（最大值）

---

## 四、代码实现

### 4.1 宏定义

```c
/* hc_sr04.h */

#define TRIG_PIN    GPIO_PIN_4
#define TRIG_PORT   GPIOA
#define ECHO_PIN    GPIO_PIN_5
#define ECHO_PORT   GPIOA

#define TRIG_HIGH() HAL_GPIO_WritePin(TRIG_PORT, TRIG_PIN, GPIO_PIN_SET)
#define TRIG_LOW()  HAL_GPIO_WritePin(TRIG_PORT, TRIG_PIN, GPIO_PIN_RESET)

#define ECHO_READ() HAL_GPIO_ReadPin(ECHO_PORT, ECHO_PIN)
```

### 4.2 延时函数（微秒级）

```c
/**
 * @brief  微秒级延时
 * @param  us: 延时时间（微秒）
 */
void delay_us(uint32_t us)
{
    uint32_t start = TIM2->CNT;
    while ((TIM2->CNT - start) < us);
}
```

### 4.3 超声波测距函数

```c
/**
 * @brief  HC-SR04 测距
 * @retval 距离（厘米），-1 表示超时
 */
float HC_SR04_GetDistance(void)
{
    uint32_t timeout = 0;
    uint32_t start_time = 0;
    uint32_t end_time = 0;
    float distance = 0;

    // 1. 发送触发信号（至少 10us）
    TRIG_HIGH();
    delay_us(20);
    TRIG_LOW();

    // 2. 等待 Echo 变高（超时保护）
    timeout = 0;
    while (ECHO_READ() == GPIO_PIN_RESET)
    {
        timeout++;
        if (timeout > 100000) return -1;  // 超时
    }

    // 3. 记录开始时间
    start_time = TIM2->CNT;

    // 4. 等待 Echo 变低（超时保护）
    timeout = 0;
    while (ECHO_READ() == GPIO_PIN_SET)
    {
        timeout++;
        if (timeout > 100000) return -1;  // 超时
    }

    // 5. 记录结束时间
    end_time = TIM2->CNT;

    // 6. 计算时间（微秒）
    uint32_t duration = end_time - start_time;

    // 7. 计算距离（厘米）
    // 距离 = 时间 × 声速 / 2
    // 声速 = 340 m/s = 0.034 cm/us
    distance = duration * 0.034f / 2.0f;

    return distance;
}
```

### 4.4 完整示例代码

```c
/* main.c */

#include "main.h"
#include "tim.h"
#include "gpio.h"

// 宏定义
#define TRIG_PIN    GPIO_PIN_4
#define TRIG_PORT   GPIOA
#define ECHO_PIN    GPIO_PIN_5
#define ECHO_PORT   GPIOA

#define TRIG_HIGH() HAL_GPIO_WritePin(TRIG_PORT, TRIG_PIN, GPIO_PIN_SET)
#define TRIG_LOW()  HAL_GPIO_WritePin(TRIG_PORT, TRIG_PIN, GPIO_PIN_RESET)
#define ECHO_READ() HAL_GPIO_ReadPin(ECHO_PORT, ECHO_PIN)

// 函数声明
void delay_us(uint32_t us);
float HC_SR04_GetDistance(void);

int main(void)
{
    // HAL 库初始化
    HAL_Init();
    SystemClock_Config();

    // 外设初始化
    MX_GPIO_Init();
    MX_TIM2_Init();

    // 启动定时器
    HAL_TIM_Base_Start(&htim2);

    float distance = 0;

    while (1)
    {
        // 测量距离
        distance = HC_SR04_GetDistance();

        // 检测是否有效
        if (distance > 0 && distance < 400)
        {
            // 有效距离，进行处理...
        }

        // 测量间隔（建议至少 60ms）
        HAL_Delay(100);
    }
}

void delay_us(uint32_t us)
{
    uint32_t start = TIM2->CNT;
    while ((TIM2->CNT - start) < us);
}

float HC_SR04_GetDistance(void)
{
    uint32_t timeout = 0;
    uint32_t start_time = 0;
    uint32_t end_time = 0;
    float distance = 0;

    // 发送触发信号
    TRIG_HIGH();
    delay_us(20);
    TRIG_LOW();

    // 等待 Echo 变高
    timeout = 0;
    while (ECHO_READ() == GPIO_PIN_RESET)
    {
        if (++timeout > 100000) return -1;
    }

    // 记录时间
    start_time = TIM2->CNT;

    // 等待 Echo 变低
    timeout = 0;
    while (ECHO_READ() == GPIO_PIN_SET)
    {
        if (++timeout > 100000) return -1;
    }

    end_time = TIM2->CNT;

    // 计算距离
    uint32_t duration = end_time - start_time;
    distance = duration * 0.034f / 2.0f;

    return distance;
}
```

---

## 五、高级实现

### 5.1 使用输入捕获

更精确的测量方法是使用定时器输入捕获：

```c
/**
 * @brief  使用 TIM 输入捕获测量距离
 */
void HAL_TIM_IC_CaptureCallback(TIM_HandleTypeDef *htim)
{
    static uint32_t start_time = 0;
    static uint8_t capture_state = 0;

    if (htim->Channel == HAL_TIM_ACTIVE_CHANNEL_1)
    {
        if (capture_state == 0)
        {
            // 捕获上升沿
            start_time = HAL_TIM_ReadCapturedValue(htim, TIM_CHANNEL_1);
            capture_state = 1;

            // 切换为下降沿捕获
            __HAL_TIM_SET_CAPTUREPOLARITY(htim, TIM_CHANNEL_1, TIM_INPUTCHANNELPOLARITY_FALLING);
        }
        else
        {
            // 捕获下降沿
            uint32_t end_time = HAL_TIM_ReadCapturedValue(htim, TIM_CHANNEL_1);
            uint32_t duration = end_time - start_time;
            float distance = duration * 0.034f / 2.0f;

            capture_state = 0;

            // 切换为上升沿捕获
            __HAL_TIM_SET_CAPTUREPOLARITY(htim, TIM_CHANNEL_1, TIM_INPUTCHANNELPOLARITY_RISING);
        }
    }
}
```

### 5.2 多传感器控制

```c
/**
 * @brief  多路超声波传感器结构
 */
typedef struct
{
    GPIO_TypeDef* trig_port;
    uint16_t trig_pin;
    GPIO_TypeDef* echo_port;
    uint16_t echo_pin;
    float distance;
} HC_SR04_t;

HC_SR04_t sensors[4] = {
    {GPIOA, GPIO_PIN_4, GPIOA, GPIO_PIN_5, 0},  // 传感器 1
    {GPIOA, GPIO_PIN_6, GPIOA, GPIO_PIN_7, 0},  // 传感器 2
    {GPIOB, GPIO_PIN_0, GPIOB, GPIO_PIN_1, 0},  // 传感器 3
    {GPIOB, GPIO_PIN_2, GPIOB, GPIO_PIN_3, 0},  // 传感器 4
};
```

---

## 六、调试与验证

### 6.1 调试方法

> [!tip] 调试技巧
> 通过观察变量验证配置的正确性。

1. 在调试器中观察 `distance` 变量
2. 用尺子测量实际距离对比
3. 检查 Echo 信号波形

### 6.2 常见问题

| 问题 | 可能原因 | 解决方法 |
|------|----------|----------|
| 距离为 0 | Echo 未响应 | 检查接线 |
| 距离跳动大 | 供电不稳定 | 添加滤波电容 |
| 测量超时 | 触发信号异常 | 检查 Trig 引脚 |
| 精度不够 | 定时器精度低 | 使用输入捕获 |

### 6.3 优化建议

1. **多次测量取平均**：提高测量稳定性
2. **滤波算法**：卡尔曼滤波或滑动平均
3. **温度补偿**：声速受温度影响
4. **测量间隔**：至少 60ms 避免干扰

```c
/**
 * @brief  多次测量取平均
 * @param  samples: 采样次数
 * @retval 平均距离
 */
float HC_SR04_GetDistanceAvg(uint8_t samples)
{
    float sum = 0;
    uint8_t valid = 0;

    for (int i = 0; i < samples; i++)
    {
        float dist = HC_SR04_GetDistance();
        if (dist > 0 && dist < 400)
        {
            sum += dist;
            valid++;
        }
        HAL_Delay(10);
    }

    return (valid > 0) ? (sum / valid) : -1;
}
```

---

## 七、A型板传感器接口

### 7.1 可用 GPIO 引脚

| 接口 | 引脚 | 说明 |
|------|------|------|
| ADC1 | PA0 | 模拟输入 |
| ADC2 | PA1 | 模拟输入 |
| IO1 | PB0 | 数字输入/输出 |
| IO2 | PB1 | 数字输入/输出 |

### 7.2 接线示意

```
HC-SR04        STM32
  VCC    ───    5V
  Trig   ───    PA4 (GPIO 输出)
  Echo   ───    PA5 (GPIO 输入)
  GND    ───    GND
```

---

## 八、相关链接

- [[大疆A型板使用经验分享（1）——A型板使用入门]] - 硬件配置与开发环境
- [[大疆A型板使用经验分享（2）——A型板原理图和引脚图]] - 原理图与引脚配置
- [[大疆A型板使用经验分享（3）——时钟树配置和GPIO口配置]] - 时钟与GPIO详解
- [[开发板示例概览]] - 开发板示例索引
- [原文链接](https://blog.csdn.net/weixin_43361652/article/details/113962137)

---

## 系列文章

本文是大疆 A 型板使用经验分享系列的第六篇：

| 序号  | 文章                                  | 说明          |
| --- | ----------------------------------- | ----------- |
| 1   | [[大疆A型板使用经验分享（1）——A型板使用入门]]         | 硬件配置与开发环境搭建 |
| 2   | [[大疆A型板使用经验分享（2）——A型板原理图和引脚图]]      | 原理图与引脚配置    |
| 3   | [[大疆A型板使用经验分享（3）——时钟树配置和GPIO口配置]]   | 时钟与GPIO详解   |
| 4   | [[大疆A型板使用经验分享（4）——PWM和舵机SG996的控制]]  | PWM原理与舵机控制  |
| 5   | [[大疆A型板使用经验分享（5）——DMA配置和遥控器使用]]     | DMA与遥控器通讯   |
| 6   | **GPIO口输入输出模式与HC-SR04超声波传感器控制**（本文） | GPIO与超声波传感器 |
| 7   | [[大疆A型板使用经验分享（7）——大疆M3508电机和PID控制]] | CAN通信与PID控制 |

---

## 导航

| 上一章 | 当前章 | 下一章 |
|--------|--------|--------|
| [[大疆A型板使用经验分享（5）——DMA配置和遥控器使用]] | **GPIO口输入输出模式与HC-SR04超声波传感器控制** | [[大疆A型板使用经验分享（7）——大疆M3508电机和PID控制]] |
