---
title: UGV 小車知識庫
ddc: 689
udc: 007.52
clc: TP242
lcc: TJ211
tags: [電子, UGV, 機器人, ROS, ESP32, ddc/689, udc/007.52, clc/TP242, lcc/TJ211]
created: 2026-05-29
aliases: [UGV, 無人地面車, Waveshare UGV, UGV Knowledge Base]
source:
  - https://www.waveshare.net/wiki/UGV01
  - https://www.waveshare.net/wiki/UGV02
---

# UGV 小車知識庫 Unmanned Ground Vehicle

> UGV (Unmanned Ground Vehicle) 即無人地面車——Waveshare 微雪開源機器人底盤系列，搭載 ESP32 下位機，支援樹莓派、Jetson 等上位機擴展。

## 📋 產品速覽

| 型號 | 結構 | 驅動 | 定位 |
|------|------|------|------|
| **UGV01** | 四輪履帶 | 2驅 | 極限越野、多獨立懸掛 |
| **UGV02** | 六輪四驅 | 4驅 | 重載越野、橡膠輪胎 |

## 📂 知識庫結構

### 產品介紹

| 文件 | 說明 |
|------|------|
| [[UGV01产品介绍\|UGV01 產品介紹]] | 履帶底盤硬體架構、供電系統、技術規格 |
| [[UGV02产品介绍\|UGV02 產品介紹]] | 六輪底盤硬體架構、型號編碼、技術規格 |
| [[UGV01与UGV02对比\|UGV01 vs UGV02 全面對比]] | 硬體差異、選型建議（321 行詳細分析） |

### 使用教學

| 文件 | 說明 |
|------|------|
| [[UGV01使用教程\|UGV01 使用教程]] | 固件更新、Web 控制、WiFi 配置、通信方式 |
| [[UGV02使用教程\|UGV02 使用教程]] | 電池安裝、首次激活、OLED 解讀、樹莓派上位機 |

### 指令與通訊

| 文件 | 說明 |
|------|------|
| [[UGV01 JSON指令集\|UGV01 JSON 指令集]] | 完整 JSON API 參考（492 行，含底盤/雲台/機械臂/ESP-NOW） |
| [[UGV-JSON指令集完整手冊\|UGV JSON 指令集手冊（精簡版）]] | 濃縮統一的指令參考（323 行，含 T 值速查表） |

### 選型與對比

| 文件 | 說明 |
|------|------|
| [[UGV-對比與選型指南\|UGV01 vs UGV02 對比與選型指南]] | 產品差異表、場景推薦、共同特性分析 |

### 學習專案

| 文件 | 位置 | 說明 |
|------|------|------|
| [[UGV01机器人学习项目]] | `1 Projects/Learning/` | UGV01 機器人學習項目記錄 |
| [[UGV02机器人学习项目]] | `1 Projects/Learning/` | UGV02 機器人學習項目記錄 |

## 🔧 核心技術棧

```
上位機（可選）
  ├── 樹莓派 4B/5 (Python + ROS)
  ├── NVIDIA Jetson Nano / Orin Nano (AI 運算)
  └── 地平線旭日 X3 (TROS)
        │ UART (115200)
        ▼
下位機 — ESP32 驅動板
  ├── JSON 指令集（串口 / USB / HTTP / ESP-NOW）
  ├── IMU 九軸姿態感知
  ├── 編碼器電機閉環控制
  └── 0.96" OLED 狀態顯示
        │
        ▼
底盤
  ├── UGV01：四輪履帶 + 多獨立懸掛
  └── UGV02：六輪四驅 + 柔軟橡膠輪胎
```

## 🔗 外部鏈結

- [[UGV01机器人]] — UGV01 開發資源總入口
- [[UGV02机器人]] — UGV02 開發資源總入口
- [[03-Raspberry-Pi\|Raspberry Pi 入門]] — 上位機基礎
- [[01-Arduino入門\|Arduino 入門]] — 下位機開發基礎

> 💡 UGV 小車是學習 ROS 機器人開發的絕佳載體——從 Web 控制入門，再到 Python SDK，最後到 ROS 整合。
