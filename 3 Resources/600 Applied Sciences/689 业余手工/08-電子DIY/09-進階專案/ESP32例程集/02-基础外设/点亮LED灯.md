---
title: 点亮LED灯
status: active
priority: medium
tags: [esp32/examples, gpio, led]
aliases: [LED控制, 点灯实验]
created: 2026-02-19
modified: 2026-02-19
source: https://www.yahboom.com/public/upload/upload-html/1706346729/%E7%82%B9%E4%BA%AELED%E7%81%AF.html
related:
  - [[MicroROS机器人控制板]]
  - [[ESP32开发基础]]
---

# 点亮LED灯

> 控制microROS控制板上的LED指示灯闪烁。

---

## 📋 目录

- [实验目的](#一实验目的)
- [硬件连接](#二硬件连接)
- [核心代码解析](#三核心代码解析)
- [编译下载烧录固件](#四编译下载烧录固件)
- [实验效果](#五实验效果)

---

## 一、实验目的

控制microROS控制板上的LED指示灯闪烁。

---

## 二、硬件连接

如下图所示，LED指示灯为板载元器件，所以不需要外接其他设备，只需要把type-C数据线连接电脑与microROS控制板作为烧录固件功能即可。

![image-20240109163348233](https://www.yahboom.com/public/upload/upload-html/1706346729/image-20240109163348233.png)

---

## 三、核心代码解析

程序源码对应的虚拟机路径为：

```
~/esp/Samples/esp32_samples/led
```

初始化LED外设，其中LED_GPIO对应硬件电路的GPIO45，GPIO模式为输出模式。

```c
void Led_Init(void)
{
    // zero-initialize the config structure.
    gpio_config_t io_conf = {};

    // disable interrupt 禁用中断
    io_conf.intr_type = GPIO_INTR_DISABLE;

    // set as output mode 设置为输出模式
    io_conf.mode = GPIO_MODE_OUTPUT;

    // bit mask of the pins that you want to set 引脚编号设置
    io_conf.pin_bit_mask = (1ULL<<LED_GPIO);

    // disable pull-down mode 禁用下拉
    io_conf.pull_down_en = 0;

    // disable pull-up mode 禁用上拉
    io_conf.pull_up_en = 0;

    // configure GPIO with the given settings 配置GPIO口
    gpio_config(&io_conf);

    // 关闭LED灯
    Led_Off();
}
```

### 打开LED灯

```c
void Led_On(void)
{
    gpio_set_level(LED_GPIO, LED_ACTIVE_LEVEL);
}
```

### 关闭LED灯

```c
void Led_Off(void)
{
    gpio_set_level(LED_GPIO, !LED_ACTIVE_LEVEL);
}
```

### 控制LED灯状态

state传入0则LED灯灭，state传入1则LED灯亮。

```c
void Led_State(uint8_t state)
{
    if (state == 0)
    {
        gpio_set_level(LED_GPIO, !LED_ACTIVE_LEVEL);
    }
    else
    {
        gpio_set_level(LED_GPIO, LED_ACTIVE_LEVEL);
    }
}
```

### LED闪烁

interval表示间隔的时间，单位为10ms。

```c
void Led_Flash(uint16_t interval)
{
    static uint16_t state = 0;
    static uint16_t count = 0;

    count++;

    if (count >= interval)
    {
        count = 0;
        state = (state + 1) % 2;
        Led_State(state);
    }
}
```

在app_main里调用Led_Init函数，并且持续调用Led_Flash函数，从而让LED闪烁。

```c
Led_Init();

while (1)
{
    Led_Flash(50);
    vTaskDelay(pdMS_TO_TICKS(10));
}
```

---

## 四、编译下载烧录固件

使用Type-C数据线连接虚拟机/电脑与microROS控制板，如果系统弹窗选择连接到虚拟机上。

激活ESP-IDF开发环境，注意每次打开新终端都需要先激活ESP-IDF开发环境才可以编译固件。

```bash
source ~/esp/esp-idf/export.sh
```

进入项目目录

```bash
cd ~/esp/Samples/esp32_samples/led
```

编译、烧录、打开串口模拟器

```bash
idf.py build flash monitor
```

如果需要退出串口模拟器，请按**Ctrl+]**。

---

## 五、实验效果

串口模拟器打印"hello yahboom"欢迎词，并且MCU指示灯每隔0.5秒闪一次。

![image-20240109182517067](https://www.yahboom.com/public/upload/upload-html/1706346729/image-20240109182517067.png)

---

## 🔗 相关文档

- [[按键功能]] - 按键输入实验
- [[驱动蜂鸣器]] - 蜂鸣器控制
