---
aliases: [TinyML, Edge AI, 嵌入式機器學習]
tags: [DDC/004.16, ai, tinyml]
---
# 09 嵌入式 AI TinyML

## 什麼是 TinyML
在**資源極度受限**的 MCU 上運行機器學習推理 (mW 級功耗, KB 級記憶體)。

## 工作流
數據採集 → 訓練 (PC/Cloud) → 量化/壓縮 → 轉換 (TFLite) → 部署到 MCU

## 關鍵技術
| 技術 | 說明 |
|------|------|
| **TensorFlow Lite Micro** | Google 的 MCU 推理框架 |
| **量化 Quantization** | FP32 → INT8 (減小 4×, 加速) |
| **CMSIS-NN** | ARM 的 NN 核心庫 (Cortex-M) |
| **Edge Impulse** | 無程式碼 TinyML 平台 |

## 典型應用
- **關鍵詞喚醒** (Keyword Spotting) — "Hey Siri"
- **手勢辨識** — IMU + CNN
- **異常檢測** — 振動感測器 + Autoencoder
- **人員計數** — 紅外陣列 + 分類器

## 硬體平台
Arduino Nano 33 BLE Sense、STM32F4/F7、ESP32-S3、Raspberry Pi Pico
