---
title: ESP32-IDF配置工具
status: active
priority: medium
tags: [esp32/examples, development/setup]
aliases: [ESP32配置工具, menuconfig配置]
created: 2026-02-19
modified: 2026-02-19
source: https://www.yahboom.com/public/upload/upload-html/1706346658/ESP32-IDF%E9%85%8D%E7%BD%AE%E5%B7%A5%E5%85%B7.html
related:
  - [[ESP32-IDF配置]]
  - [[开发环境搭建]]
---

# ESP32-IDF配置工具

> 本节介绍ESP32-IDF的配置工具menuconfig的使用方法。

---

## 📋 ESP32-IDF配置工具介绍

在ESP32-IDF项目根目录中，有一个sdkconfig文件，是用来存储ESP32-IDF的配置内容。

---

## 🔧 激活ESP-IDF开发环境

在esp-idf工具目录下运行以下命令

```bash
source ~/esp/esp-idf/export.sh
```

> **注意**: 每次打开新终端都需要先激活ESP-IDF开发环境才可以编译ESP-IDF的工程。

---

## 🆕 新建工程

新建一个空白工程，作为基础工程来使用。

```bash
mkdir ~/esp/Samples/esp32_samples
cd ~/esp/Samples/esp32_samples
idf.py create-project main
cd main
```

---

## ⚙️ 配置工程

设置目标芯片为esp32s3芯片，打开配置界面。

```bash
idf.py set-target esp32s3
idf.py menuconfig
```

### 1. 配置在烧录的时候自动检测flash的大小

在Serial flasher config里面将Flash size修改为4MB，并且勾选Detect flash size when flashing bootloader。

### 2. 配置外部PSRAM

打开Component config->ESP PSRAM，使能Support for external, SPI-connected RAM.

SPI RAM config配置里如下图所示保持默认即可。

### 3. 配置CPU频率为240MHz

打开Component config->ESP System Settings->CPU frequency，将CPU频率修改为240MHz。

### 4. 配置freertos的频率为1000hz

打开Component config->FreeRTOS->Kernel，找到configTICK_RATE_HZ，将数值修改为1000即可。

### 5. 配置分区表，加大程序空间

打开Parttition Table->Partition Table，选择Single factory app (large), no OTA.

修改后按S保存，再按Q退出配置工具。

---

## 🔗 相关文档

- [[ESP32-IDF配置]] - ESP32-IDF环境搭建
- [[开发环境搭建]] - 环境搭建总览
