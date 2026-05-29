---
aliases: [GPIO Pinout, Pi Pin Layout] · created: 2026-05-30
type: concept · category: raspberry-pi · status: reviewed
---

# GPIO Pinout 引腳定義

## 定義

樹莓派 GPIO Pinout 是指 40-pin 排針（2×20, 2.54mm pitch）的標準腳位佈局，定義每個物理腳位的功能——電源、接地、通訊協議或通用數位 I/O。此佈局自 Pi 1 B+ (2014) 起標準化，並被所有後續全尺寸型號繼承。

## 核心內容

### 腳位邏輯分組

| 腳位編號 (物理) | 功能群組 | 說明 |
|:--------------:|----------|------|
| 1, 17 | 3.3V Power | 3.3V 輸出，總和 ≤50mA |
| 2, 4 | 5V Power | 直通 USB 供電 |
| 6, 9, 14, 20, 25, 30, 34, 39 | GND | 電路共同地 |
| 3/5 (GPIO 2/3) | I²C Bus 1 | SDA1/SCL1，帶 1.8kΩ pull-up |
| 19/21/23/24/26 | SPI0 | MOSI/MISO/SCLK/CE0/CE1 |
| 8/10 (GPIO 14/15) | UART TXD0/RXD0 | 序列埠 |
| 12/32/33/35 | PWM 硬體 | GPIO 12/13/18/19 |
| 27/28 (GPIO 0/1) | HAT EEPROM | I²C (ID_SD/ID_SC)，勿作一般用途 |
| 其餘 GPIO x | 通用 I/O | 可程式數位輸入/輸出/軟體 PWM |

### 電氣警告

| 風險 | 說明 |
|------|------|
| **邏輯電平** | GPIO 為 **3.3V**，直接接 5V 訊號永久燒毀 SoC |
| **電流限制** | 單腳 ≤16mA，全部 GPIO 總和 ≤50mA |
| **無過壓保護** | 無內建 ESD 或過壓鉗位，需外加保護電路 |
| **通電插拔** | GPIO 不支援熱插拔，請斷電後接線 |

### 查詢方式

```bash
pinout          # 終端機互動式腳位圖
pinout -r       # 僅顯示修訂版資訊
gpio readall    # WiringPi 視角（不推薦，已棄用）
```

## 相關

[[wiki/concepts/GPIO-通用輸入輸出|GPIO]] · [[wiki/concepts/I2C-SPI-UART-通訊總線|I²C/SPI/UART]] · [[wiki/concepts/HAT-擴展板|HAT]]

## Sources

[[wiki/sources/source-Pi-KB|Source: Pi-KB]] · [[../04-GPIO-與週邊介面/04-GPIO-與週邊介面|04 GPIO 與週邊介面]] · [pinout.xyz](https://pinout.xyz)
