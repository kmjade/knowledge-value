---
title: Arduino入門
ddc: 689
udc: 004.31
clc: TP368.1
lcc: TK7895.M5
tags: [電子, Arduino, 入門, ddc/689, udc/004.31, clc/TP368.1, lcc/TK7895.M5]
created: 2026-05-29
aliases: [Arduino Basics, Arduino 基礎]
---

# 01 Arduino 入門 Arduino Basics

> 零基礎也能玩——Arduino 是電子DIY最友善的起點。

## 為什麼選 Arduino？

| 優勢 | 說明 |
|------|------|
| 簡單 | C/C++ 語法，幾行程式就能讓LED閃爍 |
| 便宜 | UNO R3 約 ¥15–30，相容板更便宜 |
| 資源多 | 全球最大Maker社群，幾乎所有問題都有人問過 |
| 跨平台 | Windows / macOS / Linux 全支援 |

## 開發環境設定

### 1. 安裝 Arduino IDE

- 官網下載：https://www.arduino.cc/en/software
- 或使用 **Arduino CLI**（命令列版本）
- 也可以使用 **VS Code + PlatformIO**（推薦進階使用者）

### 2. 安裝驅動程式

| 板子 | 驅動晶片 | 備註 |
|------|---------|------|
| Arduino UNO R3 | CH340 / ATmega16U2 | CH340 需手動安裝驅動 |
| Arduino Nano | CH340 / FT232 | 同 UNO |
| Arduino Mega | ATmega16U2 | 通常自動識別 |

### 3. 第一個程式：Blink

```cpp
void setup() {
  pinMode(LED_BUILTIN, OUTPUT);  // 內建LED = 13號腳位
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);  // 點亮
  delay(1000);                      // 等1秒
  digitalWrite(LED_BUILTIN, LOW);   // 熄滅
  delay(1000);                      // 等1秒
}
```

## 基礎概念

### 數位 vs 類比

| | 數位 Digital | 類比 Analog |
|---|---|---|
| 信號 | 只有 0 / 1 (HIGH / LOW) | 連續變化 (0–1023) |
| 腳位 | D0–D13 | A0–A5 |
| 用途 | LED、按鈕、繼電器 | 光敏、溫度、電位器 |

### PWM (Pulse Width Modulation)

- 模擬類比輸出（實際上是快速開關）
- Arduino UNO 支援 PWM 的腳位：**3, 5, 6, 9, 10, 11**
- `analogWrite(pin, value)` → value = 0–255
- 用途：LED 亮度控制、馬達調速

### 常用函式

```cpp
pinMode(pin, INPUT/OUTPUT/INPUT_PULLUP)   // 設定腳位模式
digitalWrite(pin, HIGH/LOW)                // 數位寫入
digitalRead(pin)                           // 數位讀取
analogRead(pin)                            // 類比讀取 (0–1023)
analogWrite(pin, 0-255)                    // PWM 輸出
delay(ms)                                  // 暫停毫秒
Serial.begin(9600)                         // 序列埠初始化
Serial.println("text")                     // 輸出到序列埠監控器
```

## 必備零件清單

| 零件 | 價格 | 用途 |
|------|------|------|
| Arduino UNO R3 | ¥15–30 | 主控板 |
| 麵包板 + 跳線 | ¥5–10 | 免焊接電路 |
| LED (5mm) ×10 | ¥2 | 輸出指示 |
| 電阻 220Ω ×10 | ¥2 | LED 限流 |
| 按鈕 ×3 | ¥3 | 輸入 |
| 電位器 10kΩ | ¥2 | 類比輸入練習 |
| 杜邦線 公母各20條 | ¥5 | 連接模組 |
| USB Type-B 線 | ¥3 | 供電+燒錄 |

> **總計約 ¥40–60** 即可開始。

## 學習路徑

1. 🔵 **Blink** → 了解 `setup()` / `loop()` / `pinMode()` / `digitalWrite()`
2. 🔵 **Button** → 了解 `digitalRead()` / `INPUT_PULLUP` / 按鈕去彈跳
3. 🟡 **Fade** → 了解 PWM / `analogWrite()`
4. 🟡 **Serial Monitor** → 了解 `Serial.begin()` / `println()` / 除錯
5. 🟡 **Potentiometer** → 了解 `analogRead()` / 分壓原理
6. 🔴 **多顆 LED 掃描** → 了解 `for` 迴圈 / 陣列
7. 🔴 **七段顯示器** → 了解函式封裝

## 常見問題

### 上傳失敗：`avrdude: stk500_recv(): programmer is not responding`

- 檢查 **板子型號** 是否選對（工具 → 開發板）
- 檢查 **COM Port** 是否選對（工具 → 序列埠）
- 拔掉 0 號和 1 號腳位的杜邦線（Serial 腳位衝突）
- 嘗試按著 Reset 鍵再上傳

### 為什麼 LED 要串電阻？

LED 工作電壓約 2V，Arduino 輸出 5V。如果沒有電阻限流，LED 會燒毀。220Ω 是最常用的值。

$$
R = \frac{V_{source} - V_{LED}}{I_{LED}} = \frac{5V - 2V}{0.02A} = 150\Omega \approx 220\Omega \text{（安全值）}
$$

## 相關資源

- [[電子DIY學習路徑|🎯 學習路徑]]
- [[電子DIY資源收集|📦 零件購買指南]]
- [[電子DIY常見問題|❓ 更多 FAQ]]
