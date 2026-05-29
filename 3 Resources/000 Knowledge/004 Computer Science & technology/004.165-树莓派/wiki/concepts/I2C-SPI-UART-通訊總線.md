---
aliases: [I2C SPI UART, Communication Buses] · created: 2026-05-30
type: concept · category: raspberry-pi · status: reviewed
---

# I²C / SPI / UART 通訊總線 Communication Buses

## 定義

I²C、SPI 與 UART 是樹莓派 GPIO 腳位上原生支援的三種核心序列通訊協議，用於與外部傳感器、顯示器、儲存設備、通訊模組進行數據交換。三種協議在速度、複雜度、腳位使用上各有取捨。

## 核心內容

### 三協議對比

| 維度 | I²C | SPI | UART |
|------|:---:|:---:|:----:|
| **線數** | 2 (SDA+SCL) | 4+ (MOSI/MISO/SCLK/CS) | 2 (TX+RX) |
| **最大速度** | 100k–3.4M bps | 10–50 MHz | 115k–4M bps |
| **最大距離** | <1m | <1m | ~15m |
| **拓撲** | 匯流排 (多主多從) | 星型 (一主多從) | 點對點 |
| **位址機制** | 7-bit 硬體位址 | CS 腳選擇 | 無 (點對點) |
| **複雜度** | 中等 | 簡單 (但腳位多) | 簡單 |

### Pi 上的實作層

| 協議 | Linux 設備 | Python 庫 | 啟用命令 |
|------|-----------|-----------|----------|
| I²C | /dev/i2c-1 | smbus / smbus2 | `raspi-config nonint do_i2c 0` |
| SPI | /dev/spidev0.x | spidev | `raspi-config nonint do_spi 0` |
| UART | /dev/serial0 | pyserial | `raspi-config nonint do_serial 0` |

### 設備位址生態 (I²C 範例)

| 設備 | I²C 位址 | 功能 |
|------|:-------:|------|
| BME280 | 0x76/0x77 | 溫濕壓 |
| MPU6050 | 0x68 | 6-axis IMU |
| SSD1306 | 0x3C | 128×64 OLED |
| PCF8574 | 0x20-0x27 | GPIO 擴展 |
| VL53L0X | 0x29 | ToF 測距 |

## 相關

[[wiki/concepts/GPIO-通用輸入輸出|GPIO]] · [[wiki/concepts/GPIO-Pinout-引腳定義|GPIO Pinout]]

## Sources

[[wiki/sources/source-Pi-KB|Source: Pi-KB]] · [[../06-通訊協議/06-通訊協議|06 通訊協議]]
