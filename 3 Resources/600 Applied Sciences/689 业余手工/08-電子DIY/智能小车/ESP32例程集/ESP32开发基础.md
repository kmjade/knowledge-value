---
title: ESP32开发基础
status: active
priority: medium
tags: [knowledge/embedded, esp32, microcontroller]
aliases: [ESP32基础教程, ESP32编程]
created: 2026-02-19
---

# ESP32开发基础

> ESP32是一款低成本、低功耗的微控制器，集成了Wi-Fi和蓝牙功能，广泛应用于物联网和嵌入式系统开发。

---

## 📋 概述

### ESP32特性
- **双核处理器**: Xtensa LX6双核，240MHz
- **内存**: 520KB SRAM，448KB ROM
- **通信**: Wi-Fi (802.11 b/g/n)，蓝牙 4.2 BLE
- **外设**: GPIO、ADC、DAC、PWM、I2C、SPI、UART
- **开发环境**: ESP-IDF、Arduino、MicroPython

---

## 🔧 开发环境搭建

### ESP-IDF安装

#### Windows平台
```bash
# 1. 下载ESP-IDF
git clone --recursive https://github.com/espressif/esp-idf.git
cd esp-idf
git checkout v5.1  # 选择稳定版本

# 2. 运行安装脚本
install.bat

# 3. 激活环境
export.bat
```

#### Linux/macOS平台
```bash
# 1. 安装依赖
sudo apt-get install git wget flex bison gperf python3 python3-venv
sudo apt-get install cmake ninja-build ccache libffi-dev libssl-dev dfu-util

# 2. 克隆ESP-IDF
git clone --recursive https://github.com/espressif/esp-idf.git
cd esp-idf
git checkout v5.1

# 3. 安装工具链
./install.sh

# 4. 设置环境
source ./export.sh
```

### 工具链
- **idf.py**: 命令行构建工具
- **ESP-IDF Extension**: VS Code插件
- **flash-tool**: 固件烧录工具

---

## 💡 基础外设操作

### 1. GPIO控制

#### 点亮LED
```c
#include "driver/gpio.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"

#define LED_PIN GPIO_NUM_2  // 内置LED

void app_main(void)
{
    // 配置GPIO
    gpio_config_t io_conf = {
        .pin_bit_mask = (1ULL << LED_PIN),
        .mode = GPIO_MODE_OUTPUT,
        .pull_up_en = GPIO_PULLUP_DISABLE,
        .pull_down_en = GPIO_PULLDOWN_DISABLE,
        .intr_type = GPIO_INTR_DISABLE
    };
    gpio_config(&io_conf);

    // 闪烁LED
    while(1) {
        gpio_set_level(LED_PIN, 1);
        vTaskDelay(1000 / portTICK_PERIOD_MS);
        gpio_set_level(LED_PIN, 0);
        vTaskDelay(1000 / portTICK_PERIOD_MS);
    }
}
```

### 2. 按键检测

```c
#include "driver/gpio.h"

#define BUTTON_PIN GPIO_NUM_0  // Boot按键

void button_task(void *pvParameters)
{
    while(1) {
        int level = gpio_get_level(BUTTON_PIN);
        if (level == 0) {  // 按下
            printf("Button pressed!\n");
            vTaskDelay(500 / portTICK_PERIOD_MS);  // 防抖
        }
        vTaskDelay(100 / portTICK_PERIOD_MS);
    }
}
```

### 3. PWM控制

#### 控制舵机
```c
#include "driver/ledc.h"

#define SERVO_PIN GPIO_NUM_18
#define SERVO_CHANNEL LEDC_CHANNEL_0
#define SERVO_MODE LEDC_LOW_SPEED_MODE
#define SERVO_FREQ 50  // 50Hz

void servo_init(void)
{
    ledc_timer_config_t timer_conf = {
        .speed_mode = SERVO_MODE,
        .duty_resolution = LEDC_TIMER_16_BIT,
        .timer_num = LEDC_TIMER_0,
        .freq_hz = SERVO_FREQ,
        .clk_cfg = LEDC_AUTO_CLK
    };
    ledc_timer_config(&timer_conf);

    ledc_channel_config_t channel_conf = {
        .gpio_num = SERVO_PIN,
        .speed_mode = SERVO_MODE,
        .channel = SERVO_CHANNEL,
        .intr_type = LEDC_INTR_DISABLE,
        .timer_sel = LEDC_TIMER_0,
        .duty = 0,
        .hpoint = 0
    };
    ledc_channel_config(&channel_conf);
}

void set_servo_angle(int angle)
{
    // 0度=500us, 90度=1500us, 180度=2500us
    int duty = 500 + (angle * 2000 / 180);
    ledc_set_duty(SERVO_MODE, SERVO_CHANNEL, duty * 32.7);  // 转换为16位
    ledc_update_duty(SERVO_MODE, SERVO_CHANNEL);
}
```

---

## 📡 通信协议

### UART通信

```c
#include "driver/uart.h"
#include "driver/gpio.h"

#define UART_NUM UART_NUM_1
#define TX_PIN GPIO_NUM_4
#define RX_PIN GPIO_NUM_5
#define BUF_SIZE (1024)

void uart_init(void)
{
    uart_config_t uart_config = {
        .baud_rate = 115200,
        .data_bits = UART_DATA_8_BITS,
        .parity = UART_PARITY_DISABLE,
        .stop_bits = UART_STOP_BITS_1,
        .flow_ctrl = UART_HW_FLOWCTRL_DISABLE
    };
    uart_param_config(UART_NUM, &uart_config);
    uart_set_pin(UART_NUM, TX_PIN, RX_PIN, UART_PIN_NO_CHANGE, UART_PIN_NO_CHANGE);
    uart_driver_install(UART_NUM, BUF_SIZE * 2, BUF_SIZE * 2, 0, NULL, 0);
}

void uart_send(const char *data)
{
    uart_write_bytes(UART_NUM, data, strlen(data));
}

void uart_task(void *pvParameters)
{
    uint8_t *data = (uint8_t *) malloc(BUF_SIZE + 1);
    while(1) {
        int len = uart_read_bytes(UART_NUM, data, BUF_SIZE, 100 / portTICK_PERIOD_MS);
        if (len > 0) {
            data[len] = '\0';
            printf("Received: %s\n", data);
        }
    }
}
```

### I2C通信

```c
#include "driver/i2c.h"

#define I2C_MASTER_NUM I2C_NUM_0
#define I2C_SDA_IO GPIO_NUM_21
#define I2C_SCL_IO GPIO_NUM_22

void i2c_init(void)
{
    i2c_config_t conf = {
        .mode = I2C_MODE_MASTER,
        .sda_io_num = I2C_SDA_IO,
        .sda_pullup_en = GPIO_PULLUP_ENABLE,
        .scl_io_num = I2C_SCL_IO,
        .scl_pullup_en = GPIO_PULLUP_ENABLE,
        .master.clk_speed = 100000
    };
    i2c_param_config(I2C_MASTER_NUM, &conf);
    i2c_driver_install(I2C_MASTER_NUM, conf.mode, 0, 0, 0);
}
```

---

## 🌐 网络连接

### WiFi连接

```c
#include "esp_wifi.h"
#include "esp_event.h"
#include "esp_log.h"

#define WIFI_SSID "Your_SSID"
#define WIFI_PASS "Your_Password"

void wifi_init(void)
{
    esp_netif_init();
    esp_event_loop_create_default();
    esp_netif_create_default_wifi_sta();

    wifi_init_config_t cfg = WIFI_INIT_CONFIG_DEFAULT();
    esp_wifi_init(&cfg);

    esp_event_handler_register(WIFI_EVENT, ESP_EVENT_ANY_ID, wifi_event_handler, NULL);
    esp_event_handler_register(IP_EVENT, IP_EVENT_STA_GOT_IP, wifi_event_handler, NULL);

    wifi_config_t wifi_config = {
        .sta = {
            .ssid = WIFI_SSID,
            .password = WIFI_PASS
        }
    };
    esp_wifi_set_mode(WIFI_MODE_STA);
    esp_wifi_set_config(WIFI_IF_STA, &wifi_config);
    esp_wifi_start();
    esp_wifi_connect();
}
```

---

## 🔋 传感器接口

### ADC电压检测

```c
#include "driver/adc.h"

#define ADC_CHANNEL ADC1_CHANNEL_0  // GPIO36

void adc_init(void)
{
    adc1_config_width(ADC_WIDTH_BIT_12);
    adc1_config_channel_atten(ADC_CHANNEL, ADC_ATTEN_DB_11);
}

int read_battery_voltage(void)
{
    int raw = adc1_get_raw(ADC_CHANNEL);
    // 转换公式根据实际电路调整
    float voltage = (raw * 3.3) / 4095.0 * 2.0;  // 假设分压比为2:1
    return (int)(voltage * 1000);  // 返回mV
}
```

---

## ⚡ 任务调度

### FreeRTOS任务

```c
void task1(void *pvParameters)
{
    while(1) {
        printf("Task 1 running\n");
        vTaskDelay(1000 / portTICK_PERIOD_MS);
    }
}

void task2(void *pvParameters)
{
    while(1) {
        printf("Task 2 running\n");
        vTaskDelay(500 / portTICK_PERIOD_MS);
    }
}

void app_main(void)
{
    xTaskCreate(task1, "Task1", 4096, NULL, 1, NULL);
    xTaskCreate(task2, "Task2", 4096, NULL, 1, NULL);
}
```

---

## 📚 Flash存储

### NVS (Non-Volatile Storage)

```c
#include "nvs_flash.h"
#include "nvs.h"

void save_data(const char *key, int value)
{
    nvs_handle_t nvs_handle;
    nvs_open("storage", NVS_READWRITE, &nvs_handle);
    nvs_set_i32(nvs_handle, key, value);
    nvs_commit(nvs_handle);
    nvs_close(nvs_handle);
}

int load_data(const char *key, int default_value)
{
    nvs_handle_t nvs_handle;
    int value = default_value;
    nvs_open("storage", NVS_READONLY, &nvs_handle);
    nvs_get_i32(nvs_handle, key, &value);
    nvs_close(nvs_handle);
    return value;
}
```

---

## 🔧 常用命令

### idf.py命令

```bash
# 配置项目
idf.py menuconfig

# 编译
idf.py build

# 烧录
idf.py flash

# 监视串口
idf.py monitor

# 一键编译、烧录、监视
idf.py build flash monitor

# 清理
idf.py fullclean

# 设置目标芯片
idf.py set-target esp32
```

---

## 📝 调试技巧

### 串口调试
```bash
# 使用idf.py monitor
idf.py monitor

# 或使用独立串口工具
# Windows: PuTTY, Tera Term
# Linux: picocom, minicom
picocom -b 115200 /dev/ttyUSB0
```

### 内存监控
```c
#include "esp_heap_caps.h"

void print_memory_info(void)
{
    printf("Free heap: %d bytes\n", esp_get_free_heap_size());
    printf("Min free heap: %d bytes\n", esp_get_minimum_free_heap_size());
}
```

---

## 🔗 相关资源

### 官方文档
- [ESP-IDF编程指南](https://docs.espressif.com/projects/esp-idf/)
- [ESP32技术参考手册](https://www.espressif.com/sites/default/files/documentation/esp32_technical_reference_en.pdf)

### 相关笔记
- [[MicroROS-Board学习项目]] - MicroROS学习项目
- [[机器人控制笔记]] - 机器人控制实践

---

*分类: 3 Resources*
*创建时间: 2026-02-19*
