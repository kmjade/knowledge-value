---
aliases: [Embedded Linux, Yocto, Buildroot]
tags: [DDC/004.16, linux]
---
# 06 嵌入式 Linux

## 何時選擇 Embedded Linux
MCU (Cortex-M) 不夠時 → 上 MPU (Cortex-A) 跑 Linux：網路路由器、工業 HMI、智慧攝影機。

## 構建系統
| 工具 | 特點 |
|------|------|
| **Buildroot** | 簡單快速，Makefile + menuconfig |
| **Yocto** | 企業級，Layer 架構，可重現 |
| **OpenWrt** | 路由器專用 |

## 關鍵組件
- **Bootloader** — U-Boot (初始化 DRAM、載入 kernel)
- **Linux Kernel** — 驅動、排程、網路堆疊
- **Rootfs** — BusyBox / systemd
- **Device Tree** — 硬體描述 (非 x86 必備)

## 驅動開發
字元設備 → 平台驅動 → Device Tree 綁定 → 中斷處理
