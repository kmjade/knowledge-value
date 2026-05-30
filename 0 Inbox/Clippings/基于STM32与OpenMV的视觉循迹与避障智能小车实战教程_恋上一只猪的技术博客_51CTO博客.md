---
title: "基于STM32与OpenMV的视觉循迹与避障智能小车实战教程_恋上一只猪的技术博客_51CTO博客"
source: "https://blog.51cto.com/u_19261/14582054"
author:
published: 2026-05-06
created: 2026-05-30
description:
tags:
  - "clippings"
---
## 基于STM32与OpenMV的视觉循迹与避障智能小车实战教程

转载

***文章标签* [stm32](https://blog.51cto.com/topic/stm32.html) [人工智能](https://blog.51cto.com/topic/rengongzhineng.html) [嵌入式硬件](https://blog.51cto.com/topic/qianrushiyingjian.html) [舵机](https://blog.51cto.com/topic/duoji2.html) [开发环境](https://blog.51cto.com/topic/kaifahuanjing.html)** ***文章分类* [AI 编程](https://blog.51cto.com/nav/ai-coding)** ***阅读数* **679****

#### 文章目录

- 摘要
- 一、项目概述
- 1.1 功能目标
- 1.2 技术架构
- 二、硬件准备
- 2.1 硬件清单
- 2.2 接线图
- 三、开发环境搭建
- 3.1 STM32开发环境
- 3.2 OpenMV开发环境
- 四、核心代码实现
- 4.1 STM32主控程序（\`main.c\`）
- 4.2 OpenMV视觉处理（\`line\_following.py\`）
- 4.3 避障逻辑（\`obstacle\_avoidance.py\`）
- 五、系统联调步骤
- 5.1 循迹模式调试
- 5.2 避障模式调试
- 六、常见问题解决
- 七、完整技术图谱

---

##### 摘要

本文将手把手教你实现一个基于STM32微控制器和OpenMV机器视觉模块的智能小车，具备循迹（沿黑线行驶）和避障（躲避障碍物）功能。教程涵盖硬件搭建、环境配置、核心算法、代码实现及调试技巧，零基础也可复现。

---

#### 一、项目概述

##### 1.1 功能目标

- **循迹模式** ：通过OpenMV识别地面黑色轨迹线，STM32控制舵机转向。
- **避障模式** ：OpenMV检测前方障碍物，STM32驱动电机后退并转向。
- **双模式切换** ：通过物理按键选择工作模式。

##### 1.2 技术架构

![基于STM32与OpenMV的视觉循迹与避障智能小车实战教程_嵌入式硬件](https://s2.51cto.com/images/blog/front/202605/939340d17f4319be47718814440416dbd847d4.png?x-oss-process=image/watermark,size_14,text_QDUxQ1RP5Y2a5a6i,color_FFFFFF,t_30,g_se,x_10,y_10,shadow_20,type_ZmFuZ3poZW5naGVpdGk=,x-oss-process=image/resize,m_fixed,w_1184/format,webp)

---

#### 二、硬件准备

##### 2.1 硬件清单

| 组件 | 型号 | 数量 |
| --- | --- | --- |
| 主控板 | STM32F103C8T6 | 1 |
| 视觉模块 | OpenMV Cam H7 | 1 |
| 电机驱动 | L298N | 1 |
| 直流电机 | TT马达 | 2 |
| 舵机 | SG90 | 1 |
| 超声波模块 | HC-SR04 | 1 |
| 电源 | 18650电池组 | 1 |

##### 2.2 接线图

![基于STM32与OpenMV的视觉循迹与避障智能小车实战教程_stm32_02](https://s2.51cto.com/images/blog/front/202605/d116374108c17e10b5c668d7b01c33899b291e.png?x-oss-process=image/watermark,size_14,text_QDUxQ1RP5Y2a5a6i,color_FFFFFF,t_30,g_se,x_10,y_10,shadow_20,type_ZmFuZ3poZW5naGVpdGk=,x-oss-process=image/resize,m_fixed,w_1184/format,webp)

---

#### 三、开发环境搭建

##### 3.1 STM32开发环境

1. **软件安装** ：
- Keil MDK v5 + STM32CubeMX
- 安装 `STM32F1` HAL库
2. **工程配置** ：
- 时钟树设置：72MHz
- 启用UART1（波特率115200）
- 配置4路PWM（舵机+电机）

##### 3.2 OpenMV开发环境

1. **固件烧录** ：
- 下载最新OpenMV IDE，刷入固件
2. **库安装** ：

```
# 关键库
import pyb, sensor, image, time, math
from machine import UART1.2.3.
```

---

#### 四、核心代码实现

##### 4.1 STM32主控程序（main.c）

```
// 电机控制函数
void Motor_Control(int speed_left, int speed_right) {
  // 左电机：PB8/PB9
  HAL_GPIO_WritePin(GPIOB, GPIO_PIN_8, (speed_left > 0) ? GPIO_PIN_SET : GPIO_PIN_RESET);
  HAL_GPIO_WritePin(GPIOB, GPIO_PIN_9, (speed_left < 0) ? GPIO_PIN_SET : GPIO_PIN_RESET);
  
  // 右电机：PB10/PB11
  HAL_GPIO_WritePin(GPIOB, GPIO_PIN_10, (speed_right > 0) ? GPIO_PIN_SET : GPIO_PIN_RESET);
  HAL_GPIO_WritePin(GPIOB, GPIO_PIN_11, (speed_right < 0) ? GPIO_PIN_SET : GPIO_PIN_RESET);
}

// 舵机角度控制（0-180°）
void Servo_SetAngle(uint16_t angle) {
  TIM2->CCR1 = 500 + (angle * 10); // PWM占空比计算
}1.2.3.4.5.6.7.8.9.10.11.12.13.14.15.
```

##### 4.2 OpenMV视觉处理（line\_following.py）

```
def find_line():
    sensor.reset()
    sensor.set_pixformat(sensor.RGB565)
    sensor.set_framesize(sensor.QQVGA)
    uart = UART(3, 115200)  # 连接STM32的串口
    
    while True:
        img = sensor.snapshot()
        line = img.get_regression([(0, 64)], robust=True)  # 检测黑色轨迹
        
        if line:
            angle = line.theta()  # 计算偏离角度
            uart.write("A%d\n" % angle)  # 发送角度给STM321.2.3.4.5.6.7.8.9.10.11.12.13.
```

##### 4.3 避障逻辑（obstacle\_avoidance.py）

```
def avoid_obstacle():
    trigger_pin = Pin('P0', Pin.OUT)
    echo_pin = Pin('P1', Pin.IN)
    
    while True:
        trigger_pin.low()
        time.sleep_us(2)
        trigger_pin.high()
        time.sleep_us(10)
        signal_off = time.ticks_us()
        
        while echo_pin.value() == 0:  # 等待高电平
            signal_on = time.ticks_us()
        
        distance = (signal_on - signal_off) * 0.0343 / 2  # 单位：cm
        
        if distance < 15:  # 检测到障碍物
            uart.write("STOP\n")  # 通知STM32停车1.2.3.4.5.6.7.8.9.10.11.12.13.14.15.16.17.18.
```

---

#### 五、系统联调步骤

##### 5.1 循迹模式调试

1. 地面铺设黑色电工胶带作为轨迹
2. OpenMV调整阈值： `img.get_regression([(0, 64)])`
3. STM32响应角度：

```
if (uart_rx_buf[0] == 'A') {
  int angle = atoi(&uart_rx_buf[1]);
  Servo_SetAngle(90 + angle/2); // 舵机转向补偿
}1.2.3.4.
```

##### 5.2 避障模式调试

1. 超声波模块朝向正前方
2. 触发逻辑优化：

```
if (HAL_GPIO_ReadPin(GPIOA, GPIO_PIN_2) == GPIO_PIN_SET) {
  Motor_Control(-100, -100); // 后退
  HAL_Delay(500);
  Motor_Control(100, -100);  // 右转
}1.2.3.4.5.
```

---

#### 六、常见问题解决

| 问题现象 | 解决方案 |
| --- | --- |
| OpenMV无法识别黑线 | 调整环境光照/降低阈值 |
| 小车转向抖动 | 增加PWM频率（50Hz→100Hz） |
| 串口通信乱码 | 检查波特率是否匹配（双方115200） |
| 电机反转 | 交换L298N的IN1/IN2接线 |

---

#### 七、完整技术图谱

![基于STM32与OpenMV的视觉循迹与避障智能小车实战教程_舵机_03](https://s2.51cto.com/images/blog/front/202605/07734dd492e363fc39e782fcd8e112699dae1e.png?x-oss-process=image/watermark,size_14,text_QDUxQ1RP5Y2a5a6i,color_FFFFFF,t_30,g_se,x_10,y_10,shadow_20,type_ZmFuZ3poZW5naGVpdGk=,x-oss-process=image/resize,m_fixed,w_1184/format,webp)

本文章为转载内容，我们尊重原作者对文章享有的著作权。如有内容错误或侵权问题，欢迎原作者联系我们进行内容更正或删除文章。

上一篇： [优化 Spring AI 可观察性体系：构建全链路可视化运维的最佳方案](https://blog.51cto.com/u_19261/14582034)

下一篇： [关于三星手机照片恢复的最新消息-值得一看](https://blog.51cto.com/u_19261/14584017)

**相关文章**