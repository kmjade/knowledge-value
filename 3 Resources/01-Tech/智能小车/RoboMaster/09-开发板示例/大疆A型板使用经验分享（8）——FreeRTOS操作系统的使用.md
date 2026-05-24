---
title: 大疆A型板使用经验分享（八）——FreeRTOS操作系统的使用
aliases:
  - DJI A型板 FreeRTOS
  - STM32 RTOS 教程
  - FreeRTOS 任务管理
para: resource
domain:
  - "[[RoboMaster]]"
  - "[[DJI]]"
  - "[[STM32]]"
tags:
  - para/resource/tech
  - topic/robomaster
  - topic/stm32
  - topic/freertos
  - topic/rtos
  - type/tutorial
created: 2026-05-24
modified: 2026-05-24
source: https://blog.csdn.net/weixin_43361652/article/details/118827347
author: Cascatrix
---

# 大疆A型板使用经验分享（八）——FreeRTOS操作系统的使用

> [!summary] 概述
> 本文介绍在 STM32 A 型板上使用 FreeRTOS 实时操作系统的方法，包括操作系统基础概念、任务管理、CubeMX 配置步骤及多任务并发执行的代码实现。

---

## 一、操作系统基础

### 1.1 操作系统简介

**操作系统（Operating System）** 本质上是一个帮助用户进行功能管理的软件，操作系统运行在硬件之上，为其他工作的软件执行资源分配等管理工作。

### 1.2 裸机开发 vs RTOS 开发

| 开发方式 | 特点 | 优缺点 |
|----------|------|--------|
| **裸机开发** | 无操作系统，手动设计循环、中断、定时 | 简单直接，但难以管理复杂任务 |
| **RTOS 开发** | 创建任务，系统自动调度 | 任务管理方便，支持并发执行 |

### 1.3 RTOS 的优势

使用实时操作系统进行开发的优势：

1. **任务管理**：自动按照特定机制运行和切换任务
2. **任务通信**：提供任务间的通信机制（队列、信号量等）
3. **同步机制**：任务间的同步协调
4. **堆栈管理**：自动管理各任务的堆栈
5. **资源互斥**：控制任务对重要资源的互斥访问

---

## 二、FreeRTOS 简介

### 2.1 FreeRTOS 概述

**FreeRTOS** 是一个开源的实时操作系统内核，专为嵌入式系统设计：

| 特性 | 说明 |
|------|------|
| **开源** | MIT 许可证，免费使用 |
| **轻量级** | 内核小巧，资源占用少 |
| **可移植** | 支持多种 MCU 架构 |
| **实时性** | 确定性响应时间 |
| **成熟稳定** | 广泛应用于工业领域 |

### 2.2 FreeRTOS 核心功能

| 功能 | 说明 |
|------|------|
| **任务管理** | 任务创建、删除、挂起、恢复 |
| **调度器** | 优先级抢占式调度 |
| **队列** | 任务间数据传递 |
| **信号量** | 任务同步与互斥 |
| **互斥量** | 资源互斥访问 |
| **事件组** | 多事件同步 |
| **软件定时器** | 定时回调函数 |
| **内存管理** | 动态内存分配 |

### 2.3 进程与任务

在操作系统中，每一个要执行的任务（一段程序的运行过程）被称为一个**进程**或**任务**。

**进程的特点：**
- 包含动态概念，是程序的运行过程
- 体现在程序中是一段循环执行的代码
- 例如：`led_green` 任务让绿色 LED 灯闪烁

### 2.4 任务状态

一段程序执行时，一般划分成三个阶段：

```
开始执行 ──> 执行中 ──> 执行完成
```

对应进程的工作状态：

| 状态 | 说明 |
|------|------|
| **就绪态（Ready）** | 任务准备好运行，等待调度 |
| **运行态（Running）** | 任务正在执行 |
| **阻塞态（Blocked）** | 任务等待事件或资源 |
| **挂起态（Suspended）** | 任务被显式挂起 |

**状态转换图：**

```
              ┌──────────────┐
              │   就绪态      │
              │   (Ready)    │
              └──────┬───────┘
                     │ 调度
                     ▼
              ┌──────────────┐
    等待事件  │   运行态      │  时间片用完
   ┌─────────│  (Running)   │─────────┐
   │         └──────────────┘         │
   ▼                                  ▼
┌──────────────┐              ┌──────────────┐
│   阻塞态      │              │   就绪态      │
│  (Blocked)   │              │   (Ready)    │
└──────────────┘              └──────────────┘
```

---

## 三、STM32CubeMX 配置

### 3.1 开启 FreeRTOS

在 Pinout & Configuration → Middleware → FREERTOS：
- **Interface**：CMSIS_V2（推荐）

### 3.2 FreeRTOS 参数配置

#### 基本配置

| 参数 | 值 | 说明 |
|------|-----|------|
| **USE_PREEMPTION** | Enabled | 抢占式调度 |
| **USE_TICKLESS_IDLE** | Disabled | 低功耗模式 |
| **USE_MUTEXES** | Enabled | 使用互斥量 |
| **USE_RECURSIVE_MUTEXES** | Enabled | 递归互斥量 |
| **USE_COUNTING_SEMAPHORES** | Enabled | 计数信号量 |
| **USE_QUEUE_SETS** | Enabled | 队列集 |
| **MAX_PRIORITIES** | 7 | 最大优先级数 |

#### 内存配置

| 参数 | 值 | 说明 |
|------|-----|------|
| **TOTAL_HEAP_SIZE** | 40960 | 堆大小（字节） |
| **MINIMAL_STACK_SIZE** | 128 | 最小任务栈（字） |

#### 时钟配置

| 参数 | 值 | 说明 |
|------|-----|------|
| **TICK_RATE_HZ** | 1000 | 时钟节拍频率 |
| **MAX_TASK_NAME_LEN** | 16 | 任务名最大长度 |

### 3.3 任务配置

在 Configuration → Tasks and Queues：

点击 **Add** 添加任务：

| 参数 | 值 | 说明 |
|------|-----|------|
| **Task Name** | defaultTask | 任务名称 |
| **Entry Point** | StartDefaultTask | 任务函数 |
| **Priority** | osPriorityNormal | 优先级 |
| **Stack Size** | 128 | 栈大小（字） |

### 3.4 系统时钟配置

FreeRTOS 需要一个周期性的时钟节拍（Tick），通常使用 **SysTick** 定时器：

```
时钟节拍周期 = 1 / TICK_RATE_HZ
             = 1 / 1000
             = 1ms
```

---

## 四、FreeRTOS 任务管理

### 4.1 任务函数结构

每个任务都是一个无限循环函数：

```c
/**
 * @brief  任务函数模板
 * @param  argument: 任务参数
 */
void Task_Template(void *argument)
{
    // 任务初始化代码（只执行一次）

    for (;;)
    {
        // 任务主体代码（循环执行）

        osDelay(100);  // 延时 100ms，让出 CPU
    }
}
```

### 4.2 任务创建

```c
/* 任务句柄 */
osThreadId_t task1Handle;
osThreadId_t task2Handle;

/* 任务属性 */
const osThreadAttr_t task1_attributes = {
    .name = "Task1",
    .stack_size = 128 * 4,  // 栈大小（字节）
    .priority = osPriorityNormal,
};

const osThreadAttr_t task2_attributes = {
    .name = "Task2",
    .stack_size = 128 * 4,
    .priority = osPriorityAboveNormal,  // 更高优先级
};

/**
 * @brief  创建任务
 */
void Tasks_Create(void)
{
    task1Handle = osThreadNew(Task1_Func, NULL, &task1_attributes);
    task2Handle = osThreadNew(Task2_Func, NULL, &task2_attributes);
}
```

### 4.3 任务优先级

FreeRTOS 使用**优先级抢占式调度**：

| 优先级 | 宏定义 | 说明 |
|--------|--------|------|
| 最低 | osPriorityLow | 低优先级 |
| | osPriorityBelowNormal | 低于正常 |
| | osPriorityNormal | 正常优先级 |
| | osPriorityAboveNormal | 高于正常 |
| | osPriorityHigh | 高优先级 |
| 最高 | osPriorityRealtime | 实时优先级 |

> [!tip] 调度规则
> - 高优先级任务就绪时，立即抢占低优先级任务
> - 同优先级任务按时间片轮转调度
> - 数值越大优先级越高

### 4.4 任务延时

```c
/**
 * @brief  任务延时函数
 * @param  ms: 延时时间（毫秒）
 */
osDelay(100);           // 延时 100ms，让出 CPU
osDelayUntil(&tick, 100); // 绝对延时，周期更精确
```

### 4.5 任务挂起与恢复

```c
// 挂起任务
osThreadSuspend(task1Handle);

// 恢复任务
osThreadResume(task1Handle);

// 终止任务
osThreadTerminate(task1Handle);
```

---

## 五、任务间通信

### 5.1 消息队列

**队列**是任务间传递数据的主要方式：

```c
/* 队列句柄 */
osMessageQueueId_t myQueueHandle;

/* 队列属性 */
const osMessageQueueAttr_t myQueue_attributes = {
    .name = "MyQueue"
};

/**
 * @brief  创建队列
 */
void Queue_Create(void)
{
    // 创建容量为 10，元素大小为 4 字节的队列
    myQueueHandle = osMessageQueueNew(10, sizeof(uint32_t), &myQueue_attributes);
}

/**
 * @brief  发送消息
 */
void Queue_Send(uint32_t data)
{
    osMessageQueuePut(myQueueHandle, &data, 0, 0);
}

/**
 * @brief  接收消息
 */
uint32_t Queue_Receive(void)
{
    uint32_t data;
    osMessageQueueGet(myQueueHandle, &data, NULL, osWaitForever);
    return data;
}
```

### 5.2 信号量

**信号量**用于任务同步：

```c
/* 信号量句柄 */
osSemaphoreId_t mySemHandle;

/**
 * @brief  创建二值信号量
 */
void Semaphore_Create(void)
{
    mySemHandle = osSemaphoreNew(1, 1, NULL);
}

/**
 * @brief  获取信号量
 */
void Semaphore_Take(void)
{
    osSemaphoreAcquire(mySemHandle, osWaitForever);
}

/**
 * @brief  释放信号量
 */
void Semaphore_Give(void)
{
    osSemaphoreRelease(mySemHandle);
}
```

### 5.3 互斥量

**互斥量**用于资源互斥访问：

```c
/* 互斥量句柄 */
osMutexId_t myMutexHandle;

/**
 * @brief  创建互斥量
 */
void Mutex_Create(void)
{
    myMutexHandle = osMutexNew(NULL);
}

/**
 * @brief  临界区保护
 */
void Critical_Section(void)
{
    // 获取互斥量
    osMutexAcquire(myMutexHandle, osWaitForever);

    // 临界区代码（保护共享资源）
    shared_resource++;

    // 释放互斥量
    osMutexRelease(myMutexHandle);
}
```

### 5.4 事件标志组

**事件标志组**用于多事件同步：

```c
/* 事件标志组句柄 */
osEventFlagsId_t myEventHandle;

#define EVENT_BIT_0 (1 << 0)
#define EVENT_BIT_1 (1 << 1)

/**
 * @brief  创建事件标志组
 */
void Event_Create(void)
{
    myEventHandle = osEventFlagsNew(NULL);
}

/**
 * @brief  等待事件
 */
void Event_Wait(void)
{
    // 等待任一事件
    osEventFlagsWait(myEventHandle, EVENT_BIT_0 | EVENT_BIT_1,
                     osFlagsWaitAny, osWaitForever);
}

/**
 * @brief  设置事件
 */
void Event_Set(void)
{
    osEventFlagsSet(myEventHandle, EVENT_BIT_0);
}
```

---

## 六、软件定时器

### 6.1 定时器创建

```c
/* 定时器句柄 */
osTimerId_t myTimerHandle;

/**
 * @brief  定时器回调函数
 */
void Timer_Callback(void *argument)
{
    // 定时器到期执行的代码
    HAL_GPIO_TogglePin(LED_GPIO_Port, LED_Pin);
}

/**
 * @brief  创建定时器
 */
void Timer_Create(void)
{
    myTimerHandle = osTimerNew(Timer_Callback, osTimerPeriodic, NULL, NULL);
}

/**
 * @brief  启动定时器
 */
void Timer_Start(void)
{
    osTimerStart(myTimerHandle, 1000);  // 1000ms 周期
}

/**
 * @brief  停止定时器
 */
void Timer_Stop(void)
{
    osTimerStop(myTimerHandle);
}
```

---

## 七、完整示例代码

### 7.1 多任务示例

```c
/* main.c */

#include "main.h"
#include "cmsis_os.h"

/* 任务句柄 */
osThreadId_t ledTaskHandle;
osThreadId_t motorTaskHandle;
osThreadId_t sensorTaskHandle;

/* 任务属性 */
const osThreadAttr_t ledTask_attributes = {
    .name = "LedTask",
    .stack_size = 128 * 4,
    .priority = osPriorityNormal,
};

const osThreadAttr_t motorTask_attributes = {
    .name = "MotorTask",
    .stack_size = 256 * 4,
    .priority = osPriorityAboveNormal,
};

const osThreadAttr_t sensorTask_attributes = {
    .name = "SensorTask",
    .stack_size = 128 * 4,
    .priority = osPriorityNormal,
};

/* 互斥量 */
osMutexId_t uartMutexHandle;

/**
 * @brief  LED 闪烁任务
 */
void LED_Task(void *argument)
{
    for (;;)
    {
        HAL_GPIO_TogglePin(LED_GPIO_Port, LED_Pin);
        osDelay(500);  // 500ms 延时
    }
}

/**
 * @brief  电机控制任务
 */
void Motor_Task(void *argument)
{
    for (;;)
    {
        // 电机 PID 控制
        Motor_Control_Loop();

        // 1ms 控制周期
        osDelay(1);
    }
}

/**
 * @brief  传感器读取任务
 */
void Sensor_Task(void *argument)
{
    for (;;)
    {
        // 读取传感器数据
        float distance = HC_SR04_GetDistance();

        // 使用互斥量保护串口输出
        osMutexAcquire(uartMutexHandle, osWaitForever);
        printf("Distance: %.2f cm\r\n", distance);
        osMutexRelease(uartMutexHandle);

        osDelay(100);  // 100ms 采样周期
    }
}

/**
 * @brief  FreeRTOS 初始化
 */
void MX_FREERTOS_Init(void)
{
    // 创建互斥量
    uartMutexHandle = osMutexNew(NULL);

    // 创建任务
    ledTaskHandle = osThreadNew(LED_Task, NULL, &ledTask_attributes);
    motorTaskHandle = osThreadNew(Motor_Task, NULL, &motorTask_attributes);
    sensorTaskHandle = osThreadNew(Sensor_Task, NULL, &sensorTask_attributes);
}

/**
 * @brief  主函数
 */
int main(void)
{
    // HAL 库初始化
    HAL_Init();
    SystemClock_Config();

    // 外设初始化
    MX_GPIO_Init();
    MX_USART1_UART_Init();

    // 启动调度器
    osKernelInitialize();
    MX_FREERTOS_Init();
    osKernelStart();

    // 不会执行到这里
    while (1);
}
```

### 7.2 生产者-消费者模型

```c
/* 队列句柄 */
osMessageQueueId_t dataQueueHandle;

/* 数据结构 */
typedef struct
{
    uint32_t id;
    float value;
} Data_t;

/**
 * @brief  生产者任务
 */
void Producer_Task(void *argument)
{
    Data_t data;
    uint32_t count = 0;

    for (;;)
    {
        // 生成数据
        data.id = count++;
        data.value = (float)count * 1.5f;

        // 发送到队列
        osMessageQueuePut(dataQueueHandle, &data, 0, osWaitForever);

        osDelay(100);
    }
}

/**
 * @brief  消费者任务
 */
void Consumer_Task(void *argument)
{
    Data_t data;

    for (;;)
    {
        // 从队列接收数据
        if (osMessageQueueGet(dataQueueHandle, &data, NULL, osWaitForever) == osOK)
        {
            // 处理数据
            printf("ID: %lu, Value: %.2f\r\n", data.id, data.value);
        }
    }
}
```

---

## 八、调试与优化

### 8.1 任务栈溢出检测

```c
/* 在 FreeRTOSConfig.h 中使能栈溢出检测 */
#define configCHECK_FOR_STACK_OVERFLOW  2

/* 栈溢出钩子函数 */
void vApplicationStackOverflowHook(TaskHandle_t xTask, char *pcTaskName)
{
    // 任务栈溢出处理
    printf("Stack overflow in task: %s\r\n", pcTaskName);
    while (1);
}
```

### 8.2 内存使用监控

```c
/**
 * @brief  打印内存使用情况
 */
void Print_Memory_Info(void)
{
    printf("Free heap: %lu bytes\r\n", xPortGetFreeHeapSize());
    printf("Minimum ever free heap: %lu bytes\r\n", xPortGetMinimumEverFreeHeapSize());
}
```

### 8.3 任务状态查看

```c
/**
 * @brief  获取任务运行状态
 */
void Print_Task_Status(void)
{
    TaskStatus_t *taskStatus;
    UBaseType_t taskCount;
    uint32_t totalRunTime;

    // 获取任务数量
    taskCount = uxTaskGetNumberOfTasks();

    // 分配内存
    taskStatus = pvPortMalloc(taskCount * sizeof(TaskStatus_t));

    if (taskStatus != NULL)
    {
        // 获取任务状态
        taskCount = uxTaskGetSystemState(taskStatus, taskCount, &totalRunTime);

        // 打印任务信息
        printf("Task Name\tState\tPriority\tStack\r\n");
        printf("---------\t-----\t--------\t-----\r\n");

        for (UBaseType_t i = 0; i < taskCount; i++)
        {
            printf("%s\t\t%d\t%lu\t\t%u\r\n",
                   taskStatus[i].pcTaskName,
                   taskStatus[i].eCurrentState,
                   taskStatus[i].uxCurrentPriority,
                   taskStatus[i].usStackHighWaterMark);
        }

        vPortFree(taskStatus);
    }
}
```

### 8.4 常见问题

| 问题 | 可能原因 | 解决方法 |
|------|----------|----------|
| 任务不运行 | 优先级太低或被阻塞 | 检查优先级和等待条件 |
| 栈溢出 | 栈空间不足 | 增大任务栈大小 |
| 死锁 | 资源竞争不当 | 检查互斥量使用顺序 |
| 饥饿 | 低优先级任务无法运行 | 调整优先级或使用时间片 |

### 8.5 优化建议

1. **合理设置优先级**：重要任务优先级高
2. **栈大小优化**：根据实际需求设置
3. **减少临界区**：缩短互斥量持有时间
4. **使用事件驱动**：避免轮询，使用事件或信号量
5. **任务划分合理**：功能独立，耦合度低

---

## 九、A型板 FreeRTOS 应用场景

### 9.1 典型任务划分

| 任务 | 功能 | 优先级 | 周期 |
|------|------|--------|------|
| **电机控制任务** | PID 控制、CAN 通信 | 高 | 1ms |
| **IMU 任务** | 姿态解算 | 高 | 1ms |
| **遥控器任务** | 数据接收与解析 | 中 | 10ms |
| **传感器任务** | 数据采集 | 中 | 10ms |
| **决策任务** | 运动规划 | 中 | 20ms |
| **LED 任务** | 状态指示 | 低 | 500ms |

### 9.2 系统架构

```
┌────────────────────────────────────────────────────┐
│                  FreeRTOS 内核                      │
├─────────┬─────────┬─────────┬─────────┬──────────┤
│电机控制  │ IMU任务 │遥控器任务│传感器任务│ 决策任务  │
│(1ms)    │ (1ms)   │ (10ms)  │ (10ms)  │ (20ms)   │
└────┬────┴────┬────┴────┬────┴────┬────┴────┬─────┘
     │         │         │         │         │
     └─────────┴─────────┴─────────┴─────────┘
                    ↓ 任务间通信 ↓
              ┌──────────────────┐
              │  消息队列/信号量  │
              └──────────────────┘
```

---

## 十、相关链接

- [[大疆A型板使用经验分享（一）——A型板使用入门]] - 硬件配置与开发环境
- [[大疆A型板使用经验分享（二）——A型板原理图和引脚图]] - 原理图与引脚配置
- [[大疆A型板使用经验分享（三）——时钟树配置和GPIO口配置]] - 时钟与GPIO详解
- [[开发板示例概览]] - 开发板示例索引
- [原文链接](https://blog.csdn.net/weixin_43361652/article/details/118827347)

---

## 系列文章

本文是大疆 A 型板使用经验分享系列的第八篇：

| 序号 | 文章 | 说明 |
|------|------|------|
| 1 | [[大疆A型板使用经验分享（一）——A型板使用入门]] | 硬件配置与开发环境搭建 |
| 2 | [[大疆A型板使用经验分享（二）——A型板原理图和引脚图]] | 原理图与引脚配置 |
| 3 | [[大疆A型板使用经验分享（三）——时钟树配置和GPIO口配置]] | 时钟与GPIO详解 |
| 4 | [[大疆A型板使用经验分享（四）——PWM和舵机SG996的控制]] | PWM原理与舵机控制 |
| 5 | [[大疆A型板使用经验分享（5）——DMA配置和遥控器使用]] | DMA与遥控器通讯 |
| 6 | [[大疆A型板使用经验分享（6）——GPIO口输入输出模式与HC-SR04超声波传感器控制]] | GPIO与超声波传感器 |
| 7 | [[大疆A型板使用经验分享（7）——大疆M3508电机和PID控制]] | CAN通信与PID控制 |
| 8 | **FreeRTOS操作系统的使用**（本文） | RTOS任务管理 |

---

## 导航

| 上一章 | 当前章 | 下一章 |
|--------|--------|--------|
| [[大疆A型板使用经验分享（7）——大疆M3508电机和PID控制]] | **FreeRTOS操作系统的使用** | 待更新 |
