---
aliases: [Pi Pico, Raspberry Pi Pico, RP2040, RP2350] · created: 2026-05-30
type: entity · entity_type: product · status: reviewed
---

# Raspberry Pi Pico

樹莓派基金會於 2021 年推出的首款微控制器開發板，搭載自研 RP2040 MCU 晶片。Pico 是 MCU（非 Linux SBC），定位於即時控制、傳感器讀取、低功耗嵌入式應用。2024 年推出 Pico 2，搭載新一代 RP2350 晶片。

## 核心規格對比

| 參數 | Pico / Pico W | Pico 2 / Pico 2 W |
|------|:------------:|:----------------:|
| **MCU** | RP2040 | RP2350 |
| **核心** | 2× Cortex-M0+ @ 133 MHz | 2× Cortex-M33 / RISC-V @ 150 MHz |
| **Flash** | 2MB (外掛 QSPI) | 4MB (外掛 QSPI) |
| **SRAM** | 264KB | 520KB |
| **GPIO** | 26-pin (3.3V) | 26-pin (3.3V) |
| **ADC** | 3 通道 12-bit | 4 通道 12-bit |
| **PIO** | 2× PIO (8 狀態機) | 3× PIO (12 狀態機) |
| **通訊** | 2×UART/2×SPI/2×I²C | 2×UART/2×SPI/2×I²C |
| **USB** | USB 1.1 Device/Host | USB 1.1 Device/Host |
| **無線 (W)** | WiFi 4 (2.4GHz) | WiFi 4 + BT 5.2 |
| **價格** | $4 / $6 (W) | $5 / $7 (2W) |

## PIO (Programmable I/O) 特色

RP2040/RP2350 的標誌性創新：8/12 個獨立狀態機可在不佔用 CPU 週期的情況下生成或解碼任意通訊協議。常用於產生 NeoPixel 波形、VGA 訊號、自定義協議。

## 與 Pi SBC 的關係

| 維度 | Raspberry Pi 5 (SBC) | Raspberry Pi Pico 2 (MCU) |
|------|:--------------------:|:-------------------------:|
| **類型** | 單板計算機 (Linux) | 微控制器 (Bare metal) |
| **任務** | 多工、AI、網路伺服器 | 即時控制、低功耗傳感器 |
| **協作場景** | UGV 上位機 (ROS2) | UGV 下位機 (馬達控制) |

> Pico 適合低功耗即時控制，Pi SBC 適合複雜運算與聯網。兩者透過 UART/SPI/I²C 可互補協作。完整 MCU 開發指南請參見 [[../004.16-嵌入式系統/004.16-嵌入式系統|004.16 嵌入式系統]]。

## 相關

[[wiki/concepts/Raspberry-Pi-Platform-樹莓派平台|Raspberry Pi Platform]] · [[wiki/concepts/SBC-單板計算機|SBC]] · [[wiki/entities/Raspberry-Pi-5|Pi 5]]

## Sources

[[wiki/sources/source-Pi-KB|Source: Pi-KB]] · [[../02-硬體平台與型號/02-硬體平台與型號|02 硬體平台與型號]]
