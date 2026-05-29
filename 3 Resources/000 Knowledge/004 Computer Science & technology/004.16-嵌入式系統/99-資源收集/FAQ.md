---
aliases: [嵌入式 FAQ]
tags: [DDC/004.16, faq]
---
# 嵌入式系統 FAQ

### MCU 還是 MPU？
簡單控制、低功耗 → MCU (STM32)。複雜 UI、網路堆疊、多媒體 → MPU (i.MX, Raspberry Pi)。

### 裸機還是 RTOS？
單一任務、簡單邏輯 → 裸機 Super Loop。多任務、即時響應 → FreeRTOS。

### HAL 還是 LL？
快速原型、跨晶片移植 → HAL。效能極致、精確控制 → LL。

### STM32 還是 ESP32？
工業可靠、豐富周邊、長生命週期 → STM32。WiFi/BT 內建、低成本 IoT → ESP32。

### 如何入門 TinyML？
Edge Impulse (無程式碼) → TensorFlow Lite Micro 範例 → 自定義模型訓練。
