---
aliases: [Keil MDK, MDK-ARM, Keil Microcontroller Development Kit]
tags: [DDC/004.16, keil, embedded, arm, toolchain]
---

# Keil MDK — 微控制器開發工具鏈 (Microcontroller Development Kit)

> Keil MDK 是 Arm 官方嵌入式開發環境，整合 μVision IDE、ARM Compiler、CMSIS 標準、RTX RTOS 及 ULINK 調試器。

## 產品線概覽 Product Overview

| 產品 | 核心 | 支援晶片 | 狀態 |
|:-----|:-----|:---------|:-----|
| **MDK-ARM** | armclang v6 (LLVM) | Cortex-M/A/R, Armv6-M ~ Armv8-M | ✅ 主力 |
| **MDK v5** | armcc v5 + armclang v6 | 10000+ MCU (STM32/ NXP/ TI/ Microchip...) | 成熟穩定 |
| **MDK v6** | armclang v6 only + VS Code | CMSIS 原生整合, DevOps | 新一代 |
| **C51** | C51 Compiler | 8051 family | 經典遺留 |
| **C166/C251** | C166/C251 Compiler | 16-bit MCU | 遺留 |
| **MDK-Community** | armclang v6 (free) | Armv6-M/7-M/8-M Baselib | 免費非商用 |

## 硬體調試器 Hardware Debug Probes

| 型號 | 介面 | Trace | 功耗量測 | 適用場景 |
|:-----|:-----|:------|:--------|:---------|
| **ULINKpro** | JTAG/SWD + ETM | ✅ 4-bit ETMv3 | ❌ | 高性能 trace 分析 |
| **ULINKplus** | JTAG/SWD + SWO | ✅ SWO/ITM | ✅ (電流/電壓) | 功耗優化調試 |
| **ULINK2** | JTAG/SWD | ❌ | ❌ | 基本調試入門 |
| **CMSIS-DAP** | SWD | ❌ | ❌ | 開源介面標準 |

## 核心組件 Core Components

```
MDK 生態系統
├── μVision IDE         — 專案管理 / 編輯器 / 調試前端
├── ARM Compiler        — armclang v6 (LLVM) / armcc v5
├── CMSIS               — Cortex 微控制器軟體介面標準
├── Middleware           — RTX5 RTOS / TCPnet / USB / FlashFS / emWin
├── ULINK Debug         — JTAG/SWD 硬件調試器
├── Pack System         — 芯片支持包管理 (10000+ devices)
└── Debugger            — 斷點 / Watch / Trace / Event Recorder
```

## 快速導航 Quick Navigation

| 章節 | 主題 |
|:-----|:-----|
| [[Keil-MDK/README\|README]] | 簡介與學習路徑 |
| [[Keil-MDK/01-MDK-概述与安装\|01 概述與安裝]] | MDK 架構、版本、安裝與 Pack Installer |
| [[Keil-MDK/02-μVision-IDE详解\|02 μVision IDE]] | 專案結構、編輯器、建置流程 |
| [[Keil-MDK/03-ARM-Compiler-编译器\|03 ARM Compiler]] | armcc vs armclang、優化等級、scatter-loading |
| [[Keil-MDK/04-CMSIS-标准接口\|04 CMSIS]] | CMSIS-Core/DSP/RTOS/Driver/Pack |
| [[Keil-MDK/05-调试与ULINK\|05 調試與 ULINK]] | 硬件調試、Trace、功耗量測 |
| [[Keil-MDK/06-中间件-RTX-RTOS\|06 RTX5 中間件]] | RTX kernel, TCPnet, USB, FlashFS, emWin |
| [[Keil-MDK/07-C51-8051工具链\|07 C51 工具鏈]] | 8051 編譯器、週邊、中斷 |
| [[Keil-MDK/08-项目实战-STM32\|08 STM32 實戰]] | 完整專案：GPIO/UART/RTX5/ULINK |
| [[Keil-MDK/99-資源收集/FAQ\|FAQ]] | 常見問題 10+ |
| [[Keil-MDK/99-資源收集/資源總覽\|資源總覽]] | 官方文檔、書籍、論壇 |

## 相關參考 Cross References

- [[../01-嵌入式系統基礎|嵌入式系統基礎]]
- [[../03-ARM Cortex-M|ARM Cortex-M 架構]]
- [[../04-STM32 開發|STM32 開發]]
- [[../05-RTOS 即時作業系統|RTOS]]
- [[../../../../689 业余手工/08-電子DIY/智能小车/智能小车|689 智能小車]]
