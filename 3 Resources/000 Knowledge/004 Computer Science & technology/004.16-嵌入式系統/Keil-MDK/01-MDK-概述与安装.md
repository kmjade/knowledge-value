---
aliases: [Keil MDK Overview, MDK Installation, MDK-Community]
tags: [DDC/004.16, keil, mdk, installation]
---

# 01 MDK 概述與安裝 (Overview & Installation)

## 什麼是 Keil MDK What is Keil MDK

Keil MDK (Microcontroller Development Kit) 是 **Arm 官方** 嵌入式開發工具鏈，整合編譯、調試、RTOS 和中間件，支援 **10000+ 微控制器**。

### MDK 版本演進 Version Evolution

| 版本 | 編譯器 | IDE | 核心特性 |
|:-----|:-------|:----|:---------|
| **MDK v5** | armcc v5 + armclang v6 | μVision v5 | Pack System, CMSIS v5 |
| **MDK v6** | armclang v6 only | VS Code + μVision | DevOps, CMSIS-Toolbox, cloud |
| **MDK-Community** | armclang v6 | μVision / VS Code | 免費非商用, M0/M3/M4/M7/M33 |

### MDK-Community 免費版 (Free Edition)

| 項目 | 限制 |
|:-----|:-----|
| **授權 License** | 非商業用途 (non-commercial) |
| **支援核心** | Cortex-M0/M0+/M3/M4/M7/M23/M33 |
| **編譯器** | armclang v6 (LLVM) |
| **RTOS** | RTX5, CMSIS-RTOS2 |
| **調試器** | ULINK, CMSIS-DAP, J-Link |
| **代碼大小** | 無限制 (no code size limit) |

## 安裝步驟 Installation Steps

```bash
# 1. 下載 MDK 安裝包 from keil.com/download
MDKxxx.EXE

# 2. 安裝後啟動 Pack Installer
#    Menu: Project → Manage → Pack Installer (Ctrl+Shift+U)

# 3. 安裝芯片 Support Pack (e.g., STM32F4)
#    Pack Installer → Devices → STM32F4xx → Install
```

### 關鍵目錄結構 Directory Layout

```
Keil_v5/
├── ARM/
│   ├── ARMCC/          # armcc v5 編譯器 (legacy)
│   ├── ARMCLANG/       # armclang v6 編譯器 (LLVM)
│   ├── PACK/           # Software Packs (.pack 解壓後)
│   │   └── Keil/STM32F4xx_DFP/
│   ├── CMSIS/          # CMSIS 核心檔案
│   └── Startup/        # 啟動文件範例
├── UV4/                # μVision IDE 執行檔
└── TOOLS.INI           # 工具鏈配置檔案
```

## Pack System 軟體包管理

| Pack 類型 | 說明 | 示例 |
|:----------|:-----|:-----|
| **DFP** (Device Family Pack) | 芯片週邊驅動庫 | `Keil.STM32F4xx_DFP.2.17.0.pack` |
| **CMSIS Pack** | CMSIS 軟體標準 | `ARM.CMSIS.6.0.0.pack` |
| **Middleware Pack** | 中間件庫 | `Keil.MDK-Middleware.8.0.0.pack` |
| **BSP** (Board Support Pack) | 開發板例程 | `Keil.Boards.STM32F4-Discovery.pack` |

> 官方 Pack 站點: [keil.com/pack](https://www.keil.com/pack) — 支援 10000+ 微控制器設備。
