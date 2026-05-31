---
title: flash-tool烧录
status: active
priority: medium
tags: [esp32/examples, development/flash]
aliases: [烧录工具, ESP32 flash tool, flash烧录]
created: 2026-02-19
modified: 2026-02-19
source: https://www.yahboom.com/public/upload/upload-html/1706346701/esp-flash-tool%E7%83%A7%E5%BD%95%E5%9B%BA%E4%BB%B6.html
related:
  - [[ESP32-IDF配置]]
  - [[开发环境搭建]]
---

# flash-tool烧录

> 本节介绍如何使用ESP Flash Download Tool烧录固件。

---

## ⬇️ 下载Flash工具

下载网址：

https://www.espressif.com.cn/zh-hans/support/download/other-tools

解压得到flash_download_tool，双击打开。选择串口烧录ESP32-S3。点击OK打开烧录工具。

---

## ⚙️ 配置烧录工具

从工程项目(以main项目为例)中复制编译好的bin文件到flash-download-tool目录的bin文件夹下。

**bin文件路径**：

```
build/bootloader/bootloader.bin
build/partition_table/partition-table.bin
build/main.bin
```

在'SPIDownload'选择要烧录到ESP32S3的固件，文件与地址对应关系如下表所示，再选择连接的COM口，其他配置保持默认即可。

| 固件名称 | 固件地址 | 备注 |
|---------|---------|------|
| bootloader.bin | 0x0000 | 引导文件 |
| partition-table.bin | 0x8000 | 分区表文件 |
| main.bin | 0x10000 | 功能文件 |

---

## 🔥 开始烧录固件

点击Start按钮，工具即自动开始烧录固件。

> **注**: 如果没有自动开始烧录固件，请先按住boot0键，再按复位键，松开boot0键，手动进入烧录模式。

---

## ✅ 烧录完成

下载完成后，提示蓝色FINISH标识。此时断电重启单片机或者按一下复位键启动程序。

---

## 🔗 相关文档

- [[ESP32-IDF配置]] - ESP32-IDF环境搭建
- [[开发环境搭建]] - 开发环境搭建
