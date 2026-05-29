---
aliases: [SBC, Single Board Computer] · created: 2026-05-30
type: concept · category: raspberry-pi · status: reviewed
---

# SBC 單板計算機 Single Board Computer

## 定義

單板計算機 (Single Board Computer, SBC) 是將處理器、記憶體、儲存介面、I/O 控制器全部整合於單一電路板上的完整計算機系統。與 MCU (微控制器) 的關鍵區別在於：SBC 支援完整作業系統（如 Linux），具備 MMU（記憶體管理單元），可執行多工運算、聯網服務與複雜應用。樹莓派是 SBC 的代表性產品。

## 核心內容

### SBC vs MCU vs Desktop

| 維度 | SBC (Pi 5) | MCU (STM32F4) | Desktop PC |
|------|:----------:|:-------------:|:----------:|
| **處理器** | ARM Cortex-A76 | ARM Cortex-M4 | Intel/AMD x86-64 |
| **時脈** | 2.4 GHz | 180 MHz | 3-5 GHz |
| **RAM** | 4-8 GB | 192 KB | 16-64 GB |
| **OS** | Linux | Bare metal / RTOS | Windows/Linux/macOS |
| **MMU** | ✅ | ❌ | ✅ |
| **功耗** | 5-12W | <0.5W | 65-200W+ |
| **價格** | $60-80 | $3-15 | $500-3000+ |
| **GPIO** | 40-pin 3.3V | 多通道 3.3V/5V | 極少 (需 USB 轉接) |

### SBC 市場全景 (2024)

| 產品 | SoC | RAM (max) | 亮點 |
|------|-----|:---------:|------|
| **Raspberry Pi 5** | BCM2712 | 8GB | 生態最強、文件最全 |
| Orange Pi 5 | RK3588S | 32GB | 6 TOPS NPU |
| Jetson Orin Nano | Tegra Orin | 8GB | 40 TOPS AI |
| ROCK 5B | RK3588 | 16GB | PCIe 3.0 ×4 |
| Banana Pi BPI-M7 | RK3588 | 32GB | 雙 2.5GbE、NVMe |
| Radxa Zero 3W | RK3566 | 4GB | Pi Zero 尺寸 |

### SBC 的典型應用場景

| 場景 | 關鍵需求 | 推薦 SBC |
|------|----------|----------|
| IoT 網關 | 多協議 + 聯網 + 低功耗 | Pi 4B/5 |
| 邊緣 AI 推理 | NPU + Camera 介面 | Pi 5 + AI Kit / Jetson |
| 智慧家居中樞 | 長期穩定 + MQTT/Zigbee | Pi 5 + HA OS |
| 輕量桌面 | GPIO 教學 + 上網 | Pi 5 (8GB) |
| 工業控制 | 可靠性 + 寬溫 | CM4 + 工業底板 |
| 機器人上位機 | ROS2 + 視覺 | Pi 5 |

## 相關

[[wiki/concepts/Raspberry-Pi-Platform-樹莓派平台|Raspberry Pi Platform]] · [[wiki/entities/Raspberry-Pi-5|Pi 5]] · [[wiki/entities/Raspberry-Pi-Pico|Pi Pico]]

## Sources

[[wiki/sources/source-Pi-KB|Source: Pi-KB]] · [[../01-樹莓派導論/01-樹莓派導論|01 樹莓派導論]]
