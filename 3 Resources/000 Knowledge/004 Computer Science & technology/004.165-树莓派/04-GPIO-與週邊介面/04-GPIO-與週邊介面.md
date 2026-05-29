---
aliases: [GPIO & Peripherals, General Purpose Input Output]
tags: [DDC/004.165, raspberry-pi, gpio]
---

# 04 GPIO 與週邊介面 GPIO & Peripherals

## 40-pin GPIO 腳位定義

樹莓派自 Pi 1 B+ 起使用標準 **40-pin GPIO 排針**（2×20，2.54mm 間距）。

### 腳位功能分類

| Pin# | 名稱 | 功能 |
|:----:|------|------|
| 1, 17 | 3.3V | 3.3V 電源輸出（最大 50mA） |
| 2, 4 | 5V | 5V 電源輸出（直通 USB 供電） |
| 6, 9, 14, 20, 25, 30, 34, 39 | GND | 接地 |
| 3, 5 | GPIO 2/3 (SDA1/SCL1) | I²C 匯流排 (預設帶 1.8kΩ pull-up) |
| 8, 10 | GPIO 14/15 (TXD0/RXD0) | UART 序列埠 |
| 9, 11 | GPIO 9/11 (SPI0) | SPI0 |
| 12 | GPIO 18 | PCM_CLK / PWM0 |
| 19, 21, 23, 24, 26 | GPIO 10/9/11/8/7 | SPI0 |
| 27, 28 | GPIO 0/1 (ID_SD/ID_SC) | HAT EEPROM 通訊 (I²C) |
| 其餘 | GPIO 4-27 | 通用數位 I/O |

> 使用 `pinout` 命令可在終端機顯示互動式 GPIO 圖。

## ⚠️ 3.3V 邏輯電平警告

| 參數 | 規格 | 注意 |
|------|------|------|
| **GPIO 邏輯電平** | **3.3V** | 非 5V 容忍！ |
| **最大輸出電流** | 16mA per pin, 總和 50mA | 超過可能燒毀 GPIO |
| **輸入容忍** | 最高 3.3V | **接 5V 訊號 = 永久損壞！** |

> **致命錯誤**：將 5V 訊號（如 Arduino）直接連接到 Pi 的 GPIO 輸入腳位會燒毀 SoC。務必使用 **邏輯電平轉換器** (Level Shifter, e.g., TXS0108E) 或 **分壓電阻** (1kΩ + 2kΩ) 將 5V 降至 3.3V。

## GPIO 程式庫比較

| 庫 | 語言 | 特點 | 活躍維護 | 推薦度 |
|----|:----:|------|:-------:|:------:|
| **gpiozero** | Python | 高階 API、裝置抽象、文件極佳 | ✅ | ⭐⭐⭐ |
| **RPi.GPIO** | Python | 經典、簡單、低階 | ⚠️ 維護放緩 | ⭐⭐ |
| **libgpiod** | C/Python | 基於 Linux GPIO 子系統、未來標準 | ✅ | ⭐⭐⭐ |
| **pigpio** | C/Python | DMA 硬體定時 PWM、遠端 GPIO | ✅ | ⭐⭐⭐ (精密控制) |
| **WiringPi** | C | 類 Arduino 風格 | ❌ 已棄用 | ⭐ (不推薦新專案) |

## gpiozero 快速入門

```python
from gpiozero import LED, Button
from signal import pause

# LED 閃爍
led = LED(17)      # GPIO 17
led.blink(0.5)     # 0.5 秒間隔閃爍

# 按鈕控制 LED
button = Button(2)  # GPIO 2
button.when_pressed = led.on
button.when_released = led.off

pause()  # 保持程式運行
```

## PWM (脈衝寬度調變)

Pi 提供兩種 PWM：

| 類型 | GPIO | 特點 |
|------|------|------|
| **硬體 PWM** | GPIO 12/13 (PWM0), GPIO 18/19 (PWM1) | 精確、穩定（推薦） |
| **軟體 PWM** | 任意 GPIO | 靈活、但精度受 CPU 負載影響 |

```python
from gpiozero import PWMLED
led = PWMLED(18)   # 硬體 PWM0
led.value = 0.5    # 50% 亮度
led.pulse()        # 呼吸燈效果
```

## 上下拉電阻 (Pull-up / Pull-down)

| 設定 | 效果 |
|------|------|
| **Pull-up** (預設高電位) | 未連接時讀取為 HIGH，按下按鈕接地 → LOW |
| **Pull-down** (預設低電位) | 未連接時讀取為 LOW，按下按鈕接 VCC → HIGH |

```python
from gpiozero import Button
btn = Button(2, pull_up=True)   # 內部 pull-up (預設)
btn = Button(2, pull_up=False)  # 內部 pull-down
```

> gpiozero 預設使用內部 pull-up。Pi 所有 GPIO 內建可程式化上下拉 (~50kΩ)。

## GPIO 腳位圖速查 (關鍵腳位)

```
    3.3V  (1)  (2)  5V
  SDA1/GPIO2  (3)  (4)  5V
  SCL1/GPIO3  (5)  (6)  GND
     GPIO4  (7)  (8)  GPIO14/TXD
       GND  (9)  (10) GPIO15/RXD
    GPIO17 (11)  (12) GPIO18/PWM0
    GPIO27 (13)  (14) GND
    GPIO22 (15)  (16) GPIO23
       3.3V (17)  (18) GPIO24
   SPI_MOSI (19)  (20) GND
   SPI_MISO (21)  (22) GPIO25
   SPI_SCLK (23)  (24) SPI_CE0
       GND (25)  (26) SPI_CE1
  ID_SD/I2C (27)  (28) ID_SC/I2C
     GPIO5 (29)  (30) GND
     GPIO6 (31)  (32) GPIO12/PWM0
    GPIO13 (33)  (34) GND
    GPIO19 (35)  (36) GPIO16
    GPIO26 (37)  (38) GPIO20/PCM
       GND (39)  (40) GPIO21/PCM
```

> 完整腳位圖請使用 `pinout` 命令查看。
