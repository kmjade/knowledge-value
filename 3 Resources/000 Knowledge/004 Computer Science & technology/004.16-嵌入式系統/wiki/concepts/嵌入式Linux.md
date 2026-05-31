---
aliases: [Embedded Linux, Yocto, Buildroot]
created: 2026-05-30
type: concept
topic: 嵌入式系統
status: reviewed
---
# 嵌入式 Linux Embedded Linux

## 定義
在**嵌入式硬體** (ARM Cortex-A / MIPS) 上運行的 Linux 系統——非桌面/伺服器 Linux，而是裁剪、優化、專用化的版本。

## 四大組件
| 組件 | 工具 | 功能 |
|------|------|------|
| **Bootloader** | U-Boot | 初始化 DRAM、載入 kernel |
| **Kernel** | Linux (裁剪) | 驅動、排程、網路 |
| **Rootfs** | Buildroot/Yocto | 用戶空間基礎 |
| **Device Tree** | .dts/.dtb | 硬體拓撲描述 |

## 構建系統選擇: **Buildroot** (快速、簡單、小團隊) vs **Yocto** (可重現、Layer 架構、企業級)

## Sources: [[source-嵌入式-KB]] · [[06-嵌入式 Linux]]
