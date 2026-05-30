---
title: ESP32-IDF配置
status: active
priority: medium
tags: [esp32/examples, development/setup]
aliases: [ESP32-IDF开发环境, 搭建ESP32-IDF]
created: 2026-02-19
modified: 2026-02-19
source: https://www.yahboom.com/public/upload/upload-html/1706346640/%E6%90%AD%E5%BB%BAESP32-IDF%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83.html
related:
  - [[ESP32开发基础]]
  - [[开发环境搭建]]
---

# ESP32-IDF配置

> 本节介绍如何搭建ESP32-IDF开发环境。

---

## 📋 ESP32开发环境介绍

ESP32开发环境支持Windows、Linux和Mac平台。

在Linux和Mac平台需要从源码下载并安装ESP-IDF开发环境。

在Windows平台有多种开发环境可选，有官方的ESP-IDF环境，有使用Arduino IDE软件开发环境，有使用VS Code+PlatformIO IDE开发方式等。

这里以Ubuntu系统从源码下载并安装ESP-IDF开发环境的方式为例。

---

## 🔧 安装依赖

打开Ubuntu系统终端，并运行以下命令安装相关依赖。

```bash
sudo apt-get install git wget flex bison gperf python3 python3-pip python3-venv cmake ninja-build ccache libffi-dev libssl-dev dfu-util libusb-1.0-0
```

---

## ⬇️ 下载ESP-IDF

打开Ubuntu系统终端，运行以下命令下载esp-idf-v5.1.2版本

```bash
mkdir -p ~/esp
cd ~/esp
git clone -b v5.1.2 --recursive https://github.com/espressif/esp-idf.git
```

设置工具支持的芯片esp32s3。

```bash
cd esp-idf
./install.sh esp32s3
```

---

## 🚀 激活ESP-IDF开发环境

在esp-idf工具目录下运行以下命令

```bash
source ~/esp/esp-idf/export.sh
```

> **注意**: 每次打开新终端都需要先激活ESP-IDF开发环境才可以编译ESP-IDF的工程。

---

## 🔨 编译和烧录固件

将microROS控制板连接到虚拟机/电脑上，接下来测试编译hello_world程序生成固件。

```bash
cd examples/get-started/hello_world
idf.py set-target esp32s3
idf.py build
```

当看到以下提示表示编译通过。

查看生成的固件

```bash
ls build/*.bin
ls build/bootloader/*.bin
ls build/partition_table/*.bin
```

运行以下命令将生成的固件烧录到microROS控制板上。

```bash
idf.py flash
```

使用此命令烧录前需要确认电脑只连接一个串口设备，如果连接多个串口设备，为了区分可手动指定串口号，例如指定烧录的串口号为 /dev/ttyUSB0

```bash
idf.py flash -p /dev/ttyUSB0
```

当下载进度达到100%，并且显示Done时表示烧录完成。

打开串口模拟器

```bash
idf.py monitor
```

如果需要退出串口模拟器，请按 **Ctrl+]** 退出。

---

## ⚡ 快捷命令

如果需要编译、烧录、打开串口模拟机，请输入以下命令

```bash
idf.py build flash monitor
```

---

## 📚 ESP-IDF API参考

打开以下链接即可查看ESP32S3官方API参考内容

https://docs.espressif.com/projects/esp-idf/en/v5.1.2/esp32s3/api-reference/index.html

如果需要显示中文可以点击【中文】跳转。

---

## 🔗 相关文档

- [[ESP32开发基础]] - ESP32基础教程
- [[ESP32-IDF配置工具]] - 配置工具使用
