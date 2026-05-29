---
aliases: [Raspberry Pi OS, Raspberry Pi Operating System] · created: 2026-05-30
type: concept · category: raspberry-pi · status: reviewed
---

# Raspberry Pi OS 作業系統

## 定義

Raspberry Pi OS (原稱 Raspbian) 是樹莓派官方作業系統，基於 Debian GNU/Linux 並針對 ARM 架構與 Pi 硬體深度優化。提供桌面 (Desktop) 與輕量伺服器 (Lite) 兩個版本，是 Pi 生態中使用者最廣泛、文件最齊全的 OS。

## 核心內容

### 版本對比

| 版本 | 桌面環境 | 預裝軟體 | 映像大小 | 適用 |
|------|:-------:|----------|:-------:|------|
| **Full** | PIXEL/Wayland | 辦公+程式+教育全套 | ~3GB | 桌面替代 |
| **Desktop** | PIXEL/Wayland | 瀏覽器+終端+基本工具 | ~2GB | 一般開發 |
| **Lite** | 無 (CLI only) | apt + 最小系統 | ~0.5GB | 伺服器/嵌入式 |

### 核心特性

| 特性 | 說明 |
|------|------|
| **基礎** | Debian Bookworm (12), ARM64 |
| **桌面** | Wayland (wayfire) for Pi 5/4, X11 兼容模式 |
| **軟體源** | apt + piwheels (ARM64 預編譯 Python wheels) |
| **配置** | raspi-config (文字介面配置工具) |
| **韌體** | rpi-eeprom (bootloader 更新與配置) |
| **更新策略** | LTS 週期跟隨 Debian, stable + backports |

### 與其他 Pi OS 的關係

| OS | 基礎 | 亮點 |
|----|------|------|
| Ubuntu Server/Desktop | Ubuntu | Snap、完整 Ubuntu 生態 |
| DietPi | Debian | 極輕量、Ramdisk 優化 |
| LibreELEC | Kodi | HTPC 專用媒體中心 |
| Home Assistant OS | Buildroot | 一體化智慧家居中樞 |

## 相關

[[wiki/concepts/Raspberry-Pi-Platform-樹莓派平台|Raspberry Pi Platform]] · [[wiki/entities/Raspberry-Pi-5|Pi 5]]

## Sources

[[wiki/sources/source-Pi-KB|Source: Pi-KB]] · [[../03-作業系統與設置/03-作業系統與設置|03 OS 與設置]]
