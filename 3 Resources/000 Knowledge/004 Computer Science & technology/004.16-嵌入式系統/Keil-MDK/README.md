---
aliases: [Keil MDK README]
tags: [DDC/004.16, keil]
status: active
---

# Keil MDK README

本子庫為 Keil MDK 工具鏈的完整知識體系，涵蓋 IDE 操作、編譯器配置、CMSIS 標準、RTX RTOS、ULINK 調試與實戰範例。

## 學習路徑 Learning Path

| 階段 | 章節 | 目標 |
|:-----|:-----|:-----|
| **1. 入門** | [[Keil-MDK/01-MDK-概述与安装\|01 概述與安裝]] | 了解 MDK 生態、安裝與 Pack 配置 |
| **2. IDE** | [[Keil-MDK/02-μVision-IDE详解\|02 μVision IDE]] | 專案建立、編譯、快捷鍵 (F7 build) |
| **3. 編譯** | [[Keil-MDK/03-ARM-Compiler-编译器\|03 ARM Compiler]] | armclang v6、優化等級、scatter-loading |
| **4. 標準** | [[Keil-MDK/04-CMSIS-标准接口\|04 CMSIS]] | CMSIS-Core/DSP/RTOS/Driver 應用 |
| **5. 調試** | [[Keil-MDK/05-调试与ULINK\|05 調試與 ULINK]] | ULINKpro/plus、斷點、trace |
| **6. RTOS** | [[Keil-MDK/06-中间件-RTX-RTOS\|06 RTX5 中間件]] | RTX5 kernel + 網路/USB/GUI |
| **7. 遺留** | [[Keil-MDK/07-C51-8051工具链\|07 C51 工具鏈]] | 8051 開發參考 |
| **8. 實戰** | [[Keil-MDK/08-项目实战-STM32\|08 STM32 實戰]] | STM32F407 完整專案 + ULINK 調試 |

## 核心概念 Core Concepts

- **μVision IDE** — 圖形化嵌入式開發環境
- **armclang v6** — 基於 LLVM 的 ARM 編譯器
- **CMSIS** — Cortex Microcontroller Software Interface Standard
- **RTX5** — Keil RTOS v5 即時內核
- **ULINK** — Arm 硬件調試探針系列
- **Pack System** — 芯片支援包管理 (Software Pack)
