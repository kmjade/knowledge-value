---
aliases: [HAT, Hardware Attached on Top] · created: 2026-05-30
type: concept · category: raspberry-pi · status: reviewed
---

# HAT 擴展板 Hardware Attached on Top

## 定義

HAT (Hardware Attached on Top) 是樹莓派官方定義的擴展板標準，符合標準的 HAT 板可直接安裝於 40-pin GPIO 排針上方，並透過 I²C EEPROM 自動識別，實現即插即用。HAT 極大豐富了 Pi 的硬體生態——從馬達驅動到 AI 推理加速。

## 核心內容

### HAT 標準規範

| 規範 | 要求 |
|------|------|
| **尺寸** | 65×56mm (Pi B+ 相容，安裝孔對齊) |
| **EEPROM** | 必須搭載，自動識別 (ID_SD/ID_SC, GPIO 0/1) |
| **供電** | 透過 5V 腳位，可選 GPIO 供電回送 |
| **GPIO** | 所有未使用腳位應以母排針引出 (堆疊性) |
| **機械** | 四個安裝孔，支援銅柱固定 |

### 常見 HAT 分類

| 類別 | 範例 | 功能 |
|------|------|------|
| **儲存** | NVMe HAT (Pi 5 官方) | M.2 NVMe SSD 連接 |
| **AI 加速** | AI Kit (Hailo-8L) | 13 TOPS NPU 推理 |
| **電源/UPS** | PiJuice、Geekworm X708 | 電池供電、UPS |
| **馬達控制** | Adafruit Motor HAT | DC/步進馬達驅動 |
| **顯示** | Pimoroni Display HAT | mini TFT/OLED/e-Paper |
| **音頻** | Pirate Audio HAT | I2S DAC、小型揚聲器 |
| **傳感器** | Sense HAT | 溫濕壓+IMU+8×8 LED |
| **通訊** | GSM/GPS HAT | 4G LTE、GNSS 定位 |

### 與 pHAT/uHAT 的區別

| 標準 | 尺寸 | 適用 |
|------|:----:|------|
| **HAT** | 65×56mm | Pi B+ / 3 / 4 / 5 |
| **pHAT** | 65×30mm | Pi Zero (半尺寸)，需焊接排針 |
| **uHAT** | 65×30mm | Pi Zero，內建排針 |

## 相關

[[wiki/concepts/GPIO-通用輸入輸出|GPIO]] · [[wiki/concepts/GPIO-Pinout-引腳定義|GPIO Pinout]] · [[wiki/concepts/Camera-Module-攝像頭模組|Camera Module]]

## Sources

[[wiki/sources/source-Pi-KB|Source: Pi-KB]] · [[../02-硬體平台與型號/02-硬體平台與型號|02 硬體平台]] · [[../07-多媒體與攝像頭/07-多媒體與攝像頭|07 多媒體]]
