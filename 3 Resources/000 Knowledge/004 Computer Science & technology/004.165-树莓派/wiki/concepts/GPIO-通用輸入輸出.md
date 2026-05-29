---
aliases: [GPIO, General Purpose Input Output] · created: 2026-05-30
type: concept · category: raspberry-pi · status: reviewed
---

# GPIO 通用輸入輸出 General Purpose Input Output

## 定義

GPIO (General Purpose Input/Output) 是樹莓派 40-pin 排針所提供的可程式化數位接腳，允許使用者以軟體控制外部電路——讀取傳感器狀態或驅動執行器。這是樹莓派與 Arduino/MCU 共享的核心能力，也是嵌入式應用的基礎。

## 核心內容

### 40-pin 腳位資源

| 類別 | 數量 | 說明 |
|------|:----:|------|
| 通用 GPIO | 26 | 可配置為數位輸入或輸出 |
| 3.3V 電源 | 2 | 最大輸出 50mA |
| 5V 電源 | 2 | 直通 USB 供電 |
| GND | 8 | 電路共同地 |
| I²C 專用 | 2 (SDA/SCL) | 帶 1.8kΩ pull-up |
| SPI 專用 | 5 | SPI0 (2×CS) |
| UART 專用 | 2 (TX/RX) | 序列通訊 |
| ID EEPROM | 2 | HAT 自動識別用 |

### 電氣特性

| 參數 | 規格 | 風險 |
|------|------|------|
| 邏輯電平 | **3.3V** | 5V 訊號直連會燒毀 SoC |
| 最大輸出電流 | 16mA/腳 | 超過可能永久損壞 |
| 總輸出電流 | 50mA (所有 GPIO) | 需外接驅動電路 |
| 內部上下拉 | ~50kΩ，可程式化 | — |

### 程式庫生態

| 庫 | 層級 | 狀態 |
|----|:----:|:----:|
| gpiozero | 高階 | ✅ 活躍 (官方推薦) |
| libgpiod | 中階 | ✅ 活躍 (Linux 標準) |
| RPi.GPIO | 低階 | ⚠️ 維護放緩 |
| pigpio | 精密控制 | ✅ 活躍 (DMA 定時) |

## 相關

[[wiki/concepts/GPIO-Pinout-引腳定義|GPIO Pinout]] · [[wiki/concepts/I2C-SPI-UART-通訊總線|I²C/SPI/UART]] · [[wiki/concepts/HAT-擴展板|HAT]]

## Sources

[[wiki/sources/source-Pi-KB|Source: Pi-KB]] · [[../04-GPIO-與週邊介面/04-GPIO-與週邊介面|04 GPIO 與週邊介面]]
