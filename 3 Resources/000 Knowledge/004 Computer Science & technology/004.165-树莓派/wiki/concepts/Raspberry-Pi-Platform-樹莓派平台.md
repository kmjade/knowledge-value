---
aliases: [Raspberry Pi Platform] · created: 2026-05-30
type: concept · category: raspberry-pi · status: reviewed
---

# Raspberry Pi Platform 樹莓派平台

## 定義

樹莓派 (Raspberry Pi) 是由英國 Raspberry Pi Foundation 開發的單板計算機 (SBC) 系列，自 2012 年推出以來已成為全球最暢銷的 SBC 生態，累計出貨超過 6,000 萬台。其設計使命為推廣計算機科學教育，同時廣泛應用於工業控制、IoT 邊緣運算、智慧家居與機器人領域。

## 核心內容

### 型號譜系

| 世代 | 旗艦型號 | SoC | CPU 核心 | 年份 | 定位 |
|:----:|----------|-----|:-------:|:----:|------|
| 1st | Pi 1 B+ | BCM2835 | 1×ARM11 | 2014 | 教育入門 |
| 2nd | Pi 2B | BCM2836 | 4×Cortex-A7 | 2015 | 首次四核 |
| 3rd | Pi 3B+ | BCM2837B0 | 4×Cortex-A53 64-bit | 2018 | WiFi/BT 整合 |
| 4th | Pi 4B | BCM2711 | 4×Cortex-A72 | 2019 | 桌面級性能 |
| 5th | **Pi 5** | BCM2712 | 4×Cortex-A76 | 2023 | 旗艦平台 |

### 生態層級

```
應用層    Python (gpiozero) / C (libgpiod) / Node.js / Docker
系統層    Raspberry Pi OS (Debian Bookworm) / Ubuntu / Third-party
韌體層    rpi-eeprom / bootloader / device tree
硬體層    BCM27xx SoC / RP1 I/O controller (Pi 5)
擴展層    HAT / Camera / Display / PCIe M.2
```

### 關鍵數據

| 指標 | 數值 |
|------|:----:|
| 總出貨量 | >6,000 萬台 |
| 旗艦 RAM | 最高 16GB (Pi 5 預計) |
| Pi 5 CPU 性能 | ~2-3× Pi 4B |
| 典型功耗 | 2.5–12W |
| 官方支援週期 | 至 2035+ |

## 相關

[[wiki/concepts/SBC-單板計算機|SBC]] · [[wiki/concepts/GPIO-通用輸入輸出|GPIO]] · [[wiki/concepts/Raspberry-Pi-OS-作業系統|Raspberry Pi OS]] · [[wiki/entities/Raspberry-Pi-5|Pi 5]]

## Sources

[[wiki/sources/source-Pi-KB|Source: Pi-KB]] · [[../01-樹莓派導論/01-樹莓派導論|01 樹莓派導論]] · [[../02-硬體平台與型號/02-硬體平台與型號|02 硬體平台]]
