---
title: MicroROS机器人控制板
aliases:
  - MicroROS-Board
  - 亚博MicroROS
  - Yahboom MicroROS
para: resource
domain:
  - "[[ESP32]]"
  - "[[ROS2]]"
tags:
  - para/resource/tech
  - topic/robotics
  - topic/esp32
  - topic/microros
  - type/moc
created: 2026-05-23
modified: 2026-05-23
---

# MicroROS机器人控制板

> [!info] 知識庫概述
> 亞博智能 MicroROS 機器人控制板完整學習資源，基於 ESP32-S3 和 MicroROS 組件，實現 ROS2 機器人控制系統開發。

---

## 產品概述

| 項目 | 說明 |
|------|------|
| **廠商** | 深圳市亞博智能科技有限公司 (Yahboom) |
| **主控** | ESP32-S3 雙核 @ 240MHz |
| **定位** | 輕量級 ROS2 機器人驅動控制器 |
| **官方教程** | https://www.yahboom.com/study/MicroROS-Board |

### 核心特性

- ✅ 支持虛擬機主控遠程 MicroROS 應用
- ✅ 支持多 ROS 主控：樹莓派5 / Jetson 等
- ✅ 板載 IMU 六軸姿態傳感器 / 雷達接口
- ✅ 支持四路編碼器電機，2路 PWM 舵機
- ✅ 支持 WiFi 和藍牙 5.0 通訊

---

## 模塊索引

| 模塊 | 說明 | 狀態 |
|------|------|------|
| [[0 Inbox/_processed/01-Tech/智能小车/MicroROS/00-MOCs/MOC-總覽\|📖 知識體系]] | 完整架構與導航 | `#status/active` |
| [[0 Inbox/_processed/01-Tech/智能小车/MicroROS/00-MOCs/MOC-學習路徑\|🎯 學習路徑]] | 系統化學習順序 | `#status/active` |
| [[01-硬件介绍\|01 硬件介紹]] | 控制板規格與接口 | `#status/active` |
| [[02-开发环境\|02 開發環境]] | ESP32-IDF 環境搭建 | `#status/active` |
| [[03-基础外设\|03 基礎外設]] | LED/按鍵/蜂鳴器/串口 | `#status/to-learn` |
| [[04-电机控制\|04 電機控制]] | 電機驅動/PID控制 | `#status/to-learn` |
| [[05-传感器\|05 傳感器]] | IMU/雷達數據讀取 | `#status/to-learn` |
| [[06-MicroROS基础\|06 MicroROS基礎]] | 話題通訊/節點開發 | `#status/to-learn` |
| [[07-ROS2课程\|07 ROS2課程]] | ROS2 核心概念學習 | `#status/to-learn` |
| [[08-机器人控制\|08 機器人控制]] | 運動學/控制實踐 | `#status/to-learn` |
| [[99-资源收集\|99 資源收集]] | 學習資源匯總 | `#status/active` |

---

## 快速導航

- 📖 [[0 Inbox/_processed/01-Tech/智能小车/MicroROS/00-MOCs/MOC-總覽|知識體系總覽]]
- 🎯 [[0 Inbox/_processed/01-Tech/智能小车/MicroROS/00-MOCs/MOC-學習路徑|學習路徑規劃]]
- 🔌 [[MicroROS控制板硬件规格|硬件規格]]
- 🛠️ [[02-开发环境/开发环境搭建总览|開發環境搭建]]
- 📚 [[99-资源收集|學習資源]]

---

## 硬件規格

### 主控芯片

| 項目 | 規格 |
|------|------|
| 處理器 | ESP32-S3 雙核 Xtensa LX7 |
| CPU 頻率 | 240MHz |
| 內存 | 512KB SRAM |
| 閃存 | 8MB |
| 無線通訊 | 2.4GHz WiFi 4/5, Bluetooth 5.0 |
| 工作電壓 | 3.3V |

### 板載資源

| 資源 | 數量/規格 |
|------|----------|
| 編碼器電機接口 | 4 路 (310 電機) |
| PWM 舵機接口 | 2 路 (S1/S2) |
| IMU 傳感器 | 六軸姿態傳感器 |
| 激光雷達接口 | MS200 雷達 |
| 電池接口 | 7.4V T型接口 |
| 充電接口 | DC 8.4V |
| 串口 | Type-C (燒錄/通訊) |
| PD 供電 | 為樹莓派5供電 |

---

## 學習項目

- [[MicroROS-Board学习项目]] - 學習項目主文件

---

## 最近更新

```dataview
Table without id file.link as "文件", file.mtime as "更新時間"
WHERE contains(file.path, this.file.folder) AND file.name != this.file.name
SORT file.mtime DESC
LIMIT 10
```

---

## 版本信息

- **硬件版本**: MicroROS-Board v1.0
- **ROS2 版本**: Humble / Foxy
- **創建日期**: 2026-05-23
