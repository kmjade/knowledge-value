---
title: C-RTOS 简化模板概览
aliases:
  - 大疆C型开发板简化模板
  - RoboMaster C型开发板 FreeRTOS 模板
para: resource
domain:
  - "[[RoboMaster]]"
  - "[[DJI]]"
  - "[[STM32]]"
  - "[[FreeRTOS]]"
tags:
  - para/resource/tech
  - topic/robomaster
  - topic/stm32
  - topic/freertos
  - topic/embedded
  - type/moc
created: 2026-05-24
modified: 2026-05-24
source: https://github.com/LinmingZhou234/C-RTOS
author: LinmingZhou234
license: MIT
---

# C-RTOS 简化模板概览

> [!info] 概述
> 大疆机甲大师 C 型开发板外设使用简化模板，基于 FreeRTOS 实时操作系统，从官方例程中抽离出易于理解的外设使用模板，降低开发门槛。

---

## 项目简介

这个工程的模板搭建主要是为了**降低大疆机甲大师 C 型开发板的开发门槛**，因为很多人觉得大疆给的官方例程过于繁琐。作者从中抽离出了 C 型开发板的外设使用模板，希望对赛事兵种的开发有所帮助。

### 与官方例程对比

| 特性 | 官方例程 | 本模板 |
|------|----------|--------|
| **代码量** | 大，包含完整系统 | 精简，专注外设 |
| **学习曲线** | 陡峭 | 平缓 |
| **上手难度** | 高 | 低 |
| **适用场景** | 完整机器人开发 | 学习外设使用 |

---

## 仓库信息

| 项目 | 说明 |
|------|------|
| **仓库名称** | C-RTOS |
| **GitHub** | https://github.com/LinmingZhou234/C-RTOS |
| **Stars** | 9+ |
| **开发语言** | C |
| **目标平台** | STM32F407 (RoboMaster 开发板 C 型) |
| **操作系统** | FreeRTOS v9.0.0 |
| **创建时间** | 2024-09-16 |
| **许可证** | MIT License |

---

## 硬件设备

| 设备 | 说明 | 链接 |
|------|------|------|
| **开发板** | 大疆机甲大师 C 型开发板 | [官方页面](https://www.robomaster.com/zh-CN/products/components/general/development-board-type-c) |

---

## 软件环境

### 必需软件

| 软件 | 版本 | 下载链接 |
|------|------|----------|
| **Keil MDK-ARM** | V5.36 | [下载](https://img.anfulai.cn/bbs/96992/MDK536.EXE) |
| **STM32F4 芯片包** | 2.13.0 | [下载](https://keilpack.azureedge.net/pack/Keil.STM32F4xx_DFP.2.13.0.pack) |
| **FreeRTOS** | v9.0.0 | [下载](https://sourceforge.net/projects/freertos/files/FreeRTOS/V9.0.0/FreeRTOSv9.0.0.zip/download) |

### FreeRTOS 教程

- [FreeRTOS 中文教程](https://doc.embedfire.com/rtos/freertos/zh/latest/index.html)

> [!note] 注意
> 本模板没有使用 STM32CubeMX 进行图形化配置，直接操作源文件库函数，更易于理解工程的建立。

---

## 工程结构

```
C-RTOS/
├── Core/                    # 核心代码
│   ├── Inc/                # 头文件
│   ├── Src/                # 源代码
│   │   ├── main.c          # 主函数
│   │   ├── stm32f4xx_it.c  # 中断处理
│   │   └── user_task.c     # 用户任务
│   └── Startup/            # 启动文件
│       └── startup_stm32f407xx.s
├── Drivers/                 # STM32 驱动库
│   ├── STM32F4xx_HAL_Driver/
│   └── CMSIS/
├── Middlewares/             # 中间件
│   └── FreeRTOS/           # FreeRTOS 源码
├── FreeRTOSConfig.h         # FreeRTOS 配置
├── stm32f4xx_hal_conf.h     # HAL 库配置
└── readme.md
```

---

## 配置文件说明

### FreeRTOS 配置

**文件：** `FreeRTOSConfig.h`

```c
// 关键配置项
#define configUSE_PREEMPTION        1   // 抢占式调度
#define configUSE_IDLE_HOOK         0   // 空闲任务钩子
#define configUSE_TICK_HOOK         0   // 时钟滴答钩子
#define configCPU_CLOCK_HZ          (168000000UL)  // CPU 时钟
#define configTICK_RATE_HZ          1000  // 时钟滴答频率 1kHz
#define configMAX_PRIORITIES        32    // 最大优先级数
#define configMINIMAL_STACK_SIZE    128   // 最小堆栈大小
#define configTOTAL_HEAP_SIZE       ((size_t)30720)  // 堆大小
```

### HAL 库配置

**文件：** `stm32f4xx_hal_conf.h`

```c
// 启用的外设模块
#define HAL_MODULE_ENABLED
#define HAL_GPIO_MODULE_ENABLED
#define HAL_DMA_MODULE_ENABLED
#define HAL_USART_MODULE_ENABLED
#define HAL_TIM_MODULE_ENABLED
#define HAL_CAN_MODULE_ENABLED
// ... 根据需要启用/禁用
```

### 中断回调函数

**文件：** `stm32f4xx_it.c`

> [!important] 重要
> 重定义中断回调函数的函数名，必须与启动文件的中断向量表对应相同。

---

## 代码执行流程

```
启动文件 (startup_stm32f407xx.s)
    │
    ├── CPU 复位
    ├── 堆栈初始化
    ├── 异常向量表初始化
    ├── 内存初始化
    │
    └── 进入 main() 函数
           │
           ├── HAL 库初始化
           ├── 系统时钟初始化
           ├── 开发板硬件初始化
           ├── 创建 FreeRTOS 任务
           │
           └── 开启调度器 → 系统实时运行
```

---

## FreeRTOS 使用指南

### 1. 定义任务句柄

```c
// 在头文件中定义
TaskHandle_t led_task_handle;
TaskHandle_t motor_task_handle;
```

### 2. 创建任务

```c
// 在 main.c 中创建任务
void main(void)
{
    // 硬件初始化...
    
    // 创建任务
    xTaskCreate(LED_Task,           // 任务函数
                "LED_Task",          // 任务名称
                128,                 // 堆栈大小
                NULL,                // 参数
                1,                   // 优先级
                &led_task_handle);   // 任务句柄
    
    // 开启调度器
    vTaskStartScheduler();
}
```

### 3. 定义任务函数

**文件：** `user_task.c`

```c
// LED 闪烁任务
void LED_Task(void *pvParameters)
{
    while (1)  // 无限循环
    {
        HAL_GPIO_TogglePin(LED_GPIO_Port, LED_Pin);
        vTaskDelay(500);  // 阻塞延时 500ms
    }
}

// 电机控制任务
void Motor_Task(void *pvParameters)
{
    while (1)
    {
        // 电机控制代码...
        vTaskDelay(10);  // 10ms 周期
    }
}
```

### 4. 任务编写规则

| 规则 | 说明 |
|------|------|
| **无限循环** | 每个任务函数体必须为无限循环 |
| **无返回值** | 任务函数没有返回值 |
| **阻塞延时** | 循环里必须有阻塞延时（如 `vTaskDelay()`） |
| **区分延时** | 阻塞延时不同于普通循环延时 |

### 两种延时对比

```c
// 阻塞延时（推荐）- 让出 CPU 给其他任务
vTaskDelay(500);  // FreeRTOS API

// 普通延时（占用 CPU）
void delay_ticks(uint32_t delay)
{
    while (delay--);
}
```

---

## 外设使用模板

### GPIO 控制

```c
// 点亮 LED
HAL_GPIO_WritePin(LED_GPIO_Port, LED_Pin, GPIO_PIN_SET);

// 熄灭 LED
HAL_GPIO_WritePin(LED_GPIO_Port, LED_Pin, GPIO_PIN_RESET);

// 翻转 LED
HAL_GPIO_TogglePin(LED_GPIO_Port, LED_Pin);
```

### PWM 输出

```c
// 启动 PWM
HAL_TIM_PWM_Start(&htim3, TIM_CHANNEL_1);

// 设置占空比
__HAL_TIM_SET_COMPARE(&htim3, TIM_CHANNEL_1, 500);
```

### CAN 通信

```c
// CAN 发送
CAN_TxHeaderTypeDef tx_header;
uint8_t tx_data[8] = {0};
uint32_t tx_mailbox;

tx_header.StdId = 0x200;
tx_header.IDE = CAN_ID_STD;
tx_header.RTR = CAN_RTR_DATA;
tx_header.DLC = 8;

HAL_CAN_AddTxMessage(&hcan1, &tx_header, tx_data, &tx_mailbox);

// CAN 接收回调
void HAL_CAN_RxFifo0MsgPendingCallback(CAN_HandleTypeDef *hcan)
{
    CAN_RxHeaderTypeDef rx_header;
    uint8_t rx_data[8];
    HAL_CAN_GetRxMessage(hcan, CAN_RX_FIFO0, &rx_header, rx_data);
}
```

### USART 串口

```c
// 串口发送
HAL_UART_Transmit(&huart1, data, len, timeout);

// 串口接收中断
void HAL_UART_RxCpltCallback(UART_HandleTypeDef *huart)
{
    // 处理接收到的数据
}
```

---

## 常用任务模板

### 定时控制任务

```c
void Control_Task(void *pvParameters)
{
    TickType_t last_wake_time = xTaskGetTickCount();
    const TickType_t frequency = 10;  // 10ms 周期
    
    while (1)
    {
        // 读取传感器
        // 计算控制量
        // 输出到执行器
        
        // 精确周期延时
        vTaskDelayUntil(&last_wake_time, frequency);
    }
}
```

### 通信处理任务

```c
void Comm_Task(void *pvParameters)
{
    while (1)
    {
        // 处理遥控器数据
        // 处理串口命令
        // 上报状态
        
        vTaskDelay(10);
    }
}
```

---

## 与 CMSIS-OS 的区别

| 特性 | FreeRTOS 原生 API | CMSIS-OS 封装 |
|------|-------------------|---------------|
| **任务创建** | `xTaskCreate()` | `osThreadCreate()` |
| **延时** | `vTaskDelay()` | `osDelay()` |
| **信号量** | `xSemaphoreGive()` | `osSemaphoreRelease()` |
| **队列** | `xQueueSend()` | `osMessageQueuePut()` |

> [!note] 注意
> 如果使用 STM32CubeMX 图形化配置的 FreeRTOS，其函数使用与本模板不同，因为它对 FreeRTOS 内核进行了 CMSIS-OS 封装。本模板直接使用 FreeRTOS 内核函数。

---

## 快速开始

### 下载工程

```bash
# 克隆仓库
git clone https://github.com/LinmingZhou234/C-RTOS.git

# 或下载压缩包
# C-RTOS-V2.0.0.rar
```

### 编译下载

1. 安装 Keil MDK-ARM V5.36
2. 安装 STM32F4 芯片支持包
3. 打开工程文件 `*.uvprojx`
4. 编译工程（使用默认编译器 Compiler5）
5. 连接 ST-Link 调试器
6. 下载程序

---

## 学习路径

```
┌─────────────────────────────────────────────────────────────────┐
│                      C-RTOS 学习路径                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Step 1: 理解工程结构                                           │
│      ├── 阅读启动文件                                           │
│      ├── 理解 main 函数流程                                     │
│      └── 了解配置文件                                           │
│                                                                 │
│  Step 2: 学习 FreeRTOS 基础                                     │
│      ├── 任务创建与管理                                         │
│      ├── 任务调度原理                                           │
│      └── 阻塞延时机制                                           │
│                                                                 │
│  Step 3: 外设使用                                               │
│      ├── GPIO 控制                                              │
│      ├── PWM 输出                                               │
│      ├── CAN 通信                                               │
│      └── USART 串口                                             │
│                                                                 │
│  Step 4: 综合应用                                               │
│      ├── 多任务协调                                             │
│      ├── 任务间通信                                             │
│      └── 机器人控制                                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 常见问题

### Q1: 任务不执行？

检查任务优先级和堆栈大小，确保 `vTaskStartScheduler()` 被调用。

### Q2: 程序卡死？

可能是堆栈溢出，增大 `configTOTAL_HEAP_SIZE` 或任务堆栈大小。

### Q3: 延时不准确？

使用 `vTaskDelayUntil()` 实现精确周期控制，而非 `vTaskDelay()`。

### Q4: 中断不响应？

检查 NVIC 配置和中断优先级，确保中断函数名与向量表一致。

---

## 相关链接

- [[开发板C型示例概览]] - 官方示例概览
- [[ROBOMASTER开发板C型]] - 产品文档
- [[开发板示例概览]] - A 型板示例
- [GitHub 仓库](https://github.com/LinmingZhou234/C-RTOS)
- [FreeRTOS 官方文档](https://www.freertos.org/)
- [FreeRTOS 中文教程](https://doc.embedfire.com/rtos/freertos/zh/latest/index.html)

---

## 参考资料

| 资料 | 说明 |
|------|------|
| **FreeRTOS 官方文档** | freertos.org |
| **STM32F4 参考手册** | ST 官网 |
| **RoboMaster 开发板 C 型用户手册** | 大疆官网 |

---

## 版本记录

| 日期 | 版本 | 说明 |
|------|------|------|
| 2026-05-24 | 1.0 | 初始版本 |
