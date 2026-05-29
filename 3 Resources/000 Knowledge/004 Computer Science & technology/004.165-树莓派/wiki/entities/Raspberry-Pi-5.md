---
aliases: [Pi 5, Raspberry Pi 5, 樹莓派5] · created: 2026-05-30
type: entity · entity_type: product · status: reviewed
---

# Raspberry Pi 5

樹莓派基金會 2023 年推出的第五代旗艦單板計算機。搭載四核心 Cortex-A76 SoC 與自研 RP1 I/O 晶片，性能較 Pi 4B 提升 2-3 倍，首次加入 PCIe 2.0 介面支援 NVMe SSD。

## 核心規格

| 參數 | 規格 |
|------|------|
| **SoC** | BCM2712 (16nm) |
| **CPU** | 4× ARM Cortex-A76 @ 2.4 GHz (64-bit) |
| **GPU** | VideoCore VII @ 800 MHz, Vulkan 1.2 |
| **RAM** | 4GB / 8GB LPDDR4X-4267 |
| **儲存** | microSD + PCIe 2.0 ×1 (M.2 NVMe) |
| **USB** | 2× USB 3.0 (5Gbps) + 2× USB 2.0 |
| **顯示** | 雙 micro HDMI 4Kp60 (HDR) |
| **網絡** | Gigabit Ethernet, WiFi 5 (802.11ac), BT 5.0 / BLE |
| **GPIO** | 40-pin (3.3V), RP1 晶片驅動 |
| **CSI/DSI** | 2× 4-lane MIPI (相機+顯示各一) |
| **電源** | 5V/5A via USB-PD (RTC 電池接頭內建) |
| **尺寸** | 85 × 56 mm |
| **價格** | $60 (4GB) / $80 (8GB) |

## 關鍵創新

| 特性 | 相較 Pi 4B |
|------|-----------|
| **Performance** | 2-3× faster (A76 vs A72, 2.4 vs 1.8 GHz) |
| **RP1 I/O Chip** | 自研南橋，USB/GbE/MIPI/GPIO 穩定性大幅提升 |
| **PCIe 2.0 ×1** | 首次支援 NVMe SSD (透過 M.2 HAT) |
| **Power Button** | 內建軟開關機按鈕 |
| **RTC** | 內建 RTC 電池接頭 (需額外購買電池) |
| **UART** | RP1 接管，不再與藍牙衝突 |
| **Fan Header** | 專用 PWM 風扇接口 |

## 生態定位

作為樹莓派的旗艦平台，Pi 5 瞄準桌面替代、邊緣運算伺服器、輕量 AI 推理與教育市場。搭配 AI Kit (Hailo-8L) 可實現 13 TOPS 邊緣推理，搭配 Camera Module 3 可進行 4K 視覺應用。

## 相關

[[wiki/concepts/Raspberry-Pi-Platform-樹莓派平台|Raspberry Pi Platform]] · [[wiki/concepts/SBC-單板計算機|SBC]] · [[wiki/entities/Raspberry-Pi-Pico|Pi Pico]]

## Sources

[[wiki/sources/source-Pi-KB|Source: Pi-KB]] · [[../02-硬體平台與型號/02-硬體平台與型號|02 硬體平台與型號]]
