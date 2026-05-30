---
title: 大疆A型板使用经验分享（三）——时钟树配置和GPIO口配置
aliases:
  - DJI A型板时钟配置
  - STM32F427 时钟树配置
  - A型板 GPIO 配置
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
  - type/tutorial
created: 2026-05-24
modified: 2026-05-24
source: https://blog.csdn.net/weixin_43361652/article/details/113061892
author: Cascatrix
---

# 大疆A型板使用经验分享（三）——时钟树配置和GPIO口配置

> [!summary] 概述
> 本文详细介绍 STM32F427 时钟树配置和 GPIO 口使用方法，包括时钟源选择、PLL 设置实现最高工作频率，以及 GPIO 配置点亮 LED 的完整流程。

---

## 一、时钟树配置

### 1.1 时钟源概述

STM32 开发板提供以下五种时钟源：

| 时钟源 | 名称 | 说明 | 频率 |
|--------|------|------|------|
| **HSI** | 高速内部时钟 | RC 振荡电路 | 16 MHz |
| **HSE** | 高速外部时钟 | 外部晶振 | 4-26 MHz |
| **LSI** | 低速内部时钟 | RC 振荡电路 | 32 kHz |
| **LSE** | 低速外部时钟 | 外部晶振 | 32.768 kHz |
| **PLL** | 锁相环倍频输出 | 倍频电路 | 可配置 |

### 1.2 内部时钟

内部时钟通过 RC 振荡电路提供，高速和低速内部时钟频率分别为 **16MHz** 和 **32kHz**：

![内部时钟](https://i-blog.csdnimg.cn/blog_migrate/cd5b27e7e452d51e58f0c91084da537b.png)

### 1.3 外部时钟

外部时钟通常通过连接外部晶振产生，其频率可调控。高速外部时钟的频率可选范围为 **4~26MHz**：

![外部时钟](https://i-blog.csdnimg.cn/blog_migrate/2763d0ffe24c81ee11aff82dd454f6ef.png)

> [!tip] RCC 配置
> 若发现无法配置外部时钟，应在 RCC 处开启外部时钟，设定 HSE 由晶振提供：

![RCC配置](https://i-blog.csdnimg.cn/blog_migrate/2755e23b97c1893510903a809ed3c2d0.png)

### 1.4 锁相环 (PLL)

锁相环倍频输出可通过锁相环倍频电路对输入频率进行控制，输入时钟通常为 HSE 和 HSI。

#### PLL 配置参数

| 参数 | 说明 | A型板典型值 |
|------|------|-------------|
| **PLL_M** | 输入分频 | 8 |
| **PLL_N** | VCO 倍频 | 336 |
| **PLL_P** | 系统时钟分频 | 2 |
| **PLL_Q** | USB/SDIO 分频 | 7 |

#### 时钟计算公式

```
系统时钟 = HSE × (PLL_N / PLL_M) / PLL_P
         = 8MHz × (336 / 8) / 2 = 168MHz
```

### 1.5 CubeMX 时钟配置步骤

#### 步骤 1：开启外部时钟

在 Pinout & Configuration → System Core → RCC 中：
- **HSE**：Crystal/Ceramic Resonator（晶振）
- **LSE**：Disable 或 Crystal/Ceramic Resonator

#### 步骤 2：配置时钟树

在 Clock Configuration 界面：

```
输入时钟源: HSE (8 MHz)
    │
    ├── PLL_M = 8
    │
    ├── PLL_N = 336
    │
    ├── PLL_P = 2
    │
    └── 系统时钟 SYSCLK = 168 MHz
            │
            ├── AHB 预分频 = 1 → HCLK = 168 MHz
            │
            ├── APB1 预分频 = 4 → PCLK1 = 42 MHz
            │
            └── APB2 预分频 = 2 → PCLK2 = 84 MHz
```

#### 步骤 3：验证配置

确保时钟配置满足以下条件：

| 时钟 | 频率 | 最大值 |
|------|------|--------|
| SYSCLK | 168 MHz | 180 MHz |
| HCLK | 168 MHz | 180 MHz |
| PCLK1 | 42 MHz | 45 MHz |
| PCLK2 | 84 MHz | 90 MHz |

### 1.6 时钟安全系统 (CSS)

> [!warning] 时钟安全
> 建议开启 CSS（Clock Security System），当外部晶振失效时自动切换到内部时钟，防止系统崩溃。

```c
// 在 HAL_Init() 后启用 CSS
__HAL_RCC_CSS_ENABLE();
```

---

## 二、GPIO 口配置

### 2.1 GPIO 基本概念

GPIO（General Purpose Input/Output）通用输入输出端口，是 STM32 与外部设备通信的基本接口。

### 2.2 GPIO 模式

| 模式 | 说明 | 应用场景 |
|------|------|----------|
| **输入模式** | 浮空输入 | 按键检测 |
| **输入上拉** | 内部上拉电阻 | 按键检测 |
| **输入下拉** | 内部下拉电阻 | 按键检测 |
| **模拟输入** | ADC 采集 | 传感器读取 |
| **推挽输出** | 高低电平输出 | LED 控制 |
| **开漏输出** | 需外部上拉 | I2C 通信 |
| **复用推挽** | 外设功能输出 | UART TX |
| **复用开漏** | 外设功能输出 | I2C SDA |

### 2.3 GPIO 输出速度

| 速度等级 | 说明 | 应用场景 |
|----------|------|----------|
| Low | 低速 | 低频信号 |
| Medium | 中速 | 一般应用 |
| High | 高速 | 高频信号 |
| Very High | 超高速 | SPI 等 |

### 2.4 LED 点亮示例

#### CubeMX 配置

1. 选择 LED 对应引脚（如 PA8）
2. 设置为 **GPIO_Output**
3. 配置参数：
   - GPIO output level：Low/High
   - GPIO mode：Output Push Pull
   - GPIO Pull-up/Pull-down：No pull-up and no pull-down
   - Maximum output speed：Low
   - User Label：LED（可选）

#### 代码实现

```c
/* main.c */

// 方法 1：使用 HAL 库函数
HAL_GPIO_WritePin(GPIOA, GPIO_PIN_8, GPIO_PIN_SET);    // 点亮
HAL_GPIO_WritePin(GPIOA, GPIO_PIN_8, GPIO_PIN_RESET);  // 熄灭

// 方法 2：翻转 LED
HAL_GPIO_TogglePin(GPIOA, GPIO_PIN_8);

// 方法 3：直接操作寄存器
GPIOA->BSRR = GPIO_PIN_8;   // 置位（点亮）
GPIOA->BSRR = (uint32_t)GPIO_PIN_8 << 16;  // 复位（熄灭）
```

#### LED 闪烁示例

```c
while (1)
{
    HAL_GPIO_TogglePin(GPIOA, GPIO_PIN_8);
    HAL_Delay(500);  // 500ms 延时
}
```

### 2.5 GPIO 配置结构体

```c
typedef struct
{
    uint32_t Pin;       // 引脚号
    uint32_t Mode;      // 模式
    uint32_t Pull;      // 上下拉
    uint32_t Speed;     // 速度
    uint32_t Alternate; // 复用功能
} GPIO_InitTypeDef;
```

#### 初始化示例

```c
GPIO_InitTypeDef GPIO_InitStruct = {0};

// 开启 GPIO 时钟
__HAL_RCC_GPIOA_CLK_ENABLE();

// 配置参数
GPIO_InitStruct.Pin = GPIO_PIN_8;
GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;
GPIO_InitStruct.Pull = GPIO_NOPULL;
GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_LOW;

// 初始化 GPIO
HAL_GPIO_Init(GPIOA, &GPIO_InitStruct);
```

---

## 三、A型板 GPIO 引脚分配

### 3.1 LED 指示灯

| LED | 引脚 | 说明 |
|-----|------|------|
| LED_RED | PE11 | 红色 LED |
| LED_GREEN | PE12 | 绿色 LED |
| LED_BLUE | PE13 | 蓝色 LED |

### 3.2 按键

| 按键 | 引脚 | 说明 |
|------|------|------|
| KEY1 | PC13 | 用户按键 |
| KEY2 | PA0 | 唤醒按键 |

### 3.3 PWM 输出引脚

| 功能 | 引脚 | 定时器 |
|------|------|--------|
| PWM1 | PA0 | TIM2_CH1 |
| PWM2 | PA1 | TIM2_CH2 |
| PWM3 | PA2 | TIM2_CH3 |
| PWM4 | PA3 | TIM2_CH4 |

---

## 四、常见问题

### 4.1 时钟配置问题

| 问题 | 原因 | 解决方法 |
|------|------|----------|
| 系统不运行 | 时钟配置错误 | 检查 PLL 参数 |
| 外设工作异常 | 时钟频率不对 | 确认 APB 时钟 |
| USB 不工作 | 48MHz 时钟不对 | 调整 PLL_Q |

### 4.2 GPIO 问题

| 问题 | 原因 | 解决方法 |
|------|------|----------|
| 引脚无输出 | 时钟未开启 | 开启 GPIO 时钟 |
| 电平不正确 | 模式配置错误 | 检查 GPIO 模式 |
| 引脚冲突 | 多功能复用 | 检查引脚分配 |

### 4.3 调试建议

```c
// 调试时钟配置
SystemCoreClockUpdate();  // 更新系统时钟变量
printf("SystemCoreClock = %d\r\n", SystemCoreClock);

// 检查时钟源
if (__HAL_RCC_GET_SYSCLK_SOURCE() == RCC_SYSCLKSOURCE_STATUS_PLLCLK)
{
    printf("System clock from PLL\r\n");
}
```

---

## 五、代码示例

### 5.1 完整 LED 闪烁程序

```c
/* main.c */

#include "main.h"

void SystemClock_Config(void);
static void MX_GPIO_Init(void);

int main(void)
{
    // HAL 库初始化
    HAL_Init();
    
    // 系统时钟配置
    SystemClock_Config();
    
    // GPIO 初始化
    MX_GPIO_Init();
    
    while (1)
    {
        // LED 闪烁
        HAL_GPIO_TogglePin(GPIOE, GPIO_PIN_11);  // LED_RED
        HAL_GPIO_TogglePin(GPIOE, GPIO_PIN_12);  // LED_GREEN
        HAL_GPIO_TogglePin(GPIOE, GPIO_PIN_13);  // LED_BLUE
        HAL_Delay(500);
    }
}

void SystemClock_Config(void)
{
    RCC_OscInitTypeDef RCC_OscInitStruct = {0};
    RCC_ClkInitTypeDef RCC_ClkInitStruct = {0};

    // 配置 PLL
    RCC_OscInitStruct.OscillatorType = RCC_OSCILLATORTYPE_HSE;
    RCC_OscInitStruct.HSEState = RCC_HSE_ON;
    RCC_OscInitStruct.PLL.PLLState = RCC_PLL_ON;
    RCC_OscInitStruct.PLL.PLLSource = RCC_PLLSOURCE_HSE;
    RCC_OscInitStruct.PLL.PLLM = 8;
    RCC_OscInitStruct.PLL.PLLN = 336;
    RCC_OscInitStruct.PLL.PLLP = RCC_PLLP_DIV2;
    RCC_OscInitStruct.PLL.PLLQ = 7;
    HAL_RCC_OscConfig(&RCC_OscInitStruct);

    // 配置系统时钟
    RCC_ClkInitStruct.ClockType = RCC_CLOCKTYPE_HCLK | RCC_CLOCKTYPE_SYSCLK
                                | RCC_CLOCKTYPE_PCLK1 | RCC_CLOCKTYPE_PCLK2;
    RCC_ClkInitStruct.SYSCLKSource = RCC_SYSCLKSOURCE_PLLCLK;
    RCC_ClkInitStruct.AHBCLKDivider = RCC_SYSCLK_DIV1;
    RCC_ClkInitStruct.APB1CLKDivider = RCC_HCLK_DIV4;
    RCC_ClkInitStruct.APB2CLKDivider = RCC_HCLK_DIV2;
    HAL_RCC_ClockConfig(&RCC_ClkInitStruct, FLASH_LATENCY_5);
}

static void MX_GPIO_Init(void)
{
    GPIO_InitTypeDef GPIO_InitStruct = {0};

    // 开启 GPIOE 时钟
    __HAL_RCC_GPIOE_CLK_ENABLE();

    // 配置 LED 引脚
    GPIO_InitStruct.Pin = GPIO_PIN_11 | GPIO_PIN_12 | GPIO_PIN_13;
    GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;
    GPIO_InitStruct.Pull = GPIO_NOPULL;
    GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_LOW;
    HAL_GPIO_Init(GPIOE, &GPIO_InitStruct);

    // 初始状态：熄灭
    HAL_GPIO_WritePin(GPIOE, GPIO_PIN_11 | GPIO_PIN_12 | GPIO_PIN_13, GPIO_PIN_RESET);
}
```

### 5.2 时钟验证代码

```c
// 打印时钟信息
void PrintClockInfo(void)
{
    printf("=== Clock Information ===\r\n");
    printf("SYSCLK: %d MHz\r\n", HAL_RCC_GetSysClockFreq() / 1000000);
    printf("HCLK:   %d MHz\r\n", HAL_RCC_GetHCLKFreq() / 1000000);
    printf("PCLK1:  %d MHz\r\n", HAL_RCC_GetPCLK1Freq() / 1000000);
    printf("PCLK2:  %d MHz\r\n", HAL_RCC_GetPCLK2Freq() / 1000000);
}
```

---

## 六、相关链接

- [[大疆A型板使用经验分享（1）——A型板使用入门]] - 硬件配置与开发环境
- [[大疆A型板使用经验分享（2）——A型板原理图和引脚图]] - 原理图与引脚配置
- [[开发板示例概览]] - 开发板示例索引
- [原文链接](https://blog.csdn.net/weixin_43361652/article/details/113061892)

---

## 系列文章

本文是大疆 A 型板使用经验分享系列的第三篇：

| 序号 | 文章 | 说明 |
|------|------|------|
| 1 | [[大疆A型板使用经验分享（1）——A型板使用入门]] | 硬件配置与开发环境搭建 |
| 2 | [[大疆A型板使用经验分享（2）——A型板原理图和引脚图]] | 原理图与引脚配置 |
| 3 | **时钟树配置和GPIO口配置**（本文） | 时钟与GPIO详解 |
| 4 | [[大疆A型板使用经验分享（4）——PWM和舵机SG996的控制]] | PWM原理与舵机控制 |

---

## 导航

| 上一章 | 当前章 | 下一章 |
|--------|--------|--------|
| [[大疆A型板使用经验分享（2）——A型板原理图和引脚图]] | **时钟树配置和GPIO口配置** | [[大疆A型板使用经验分享（4）——PWM和舵机SG996的控制]] |
