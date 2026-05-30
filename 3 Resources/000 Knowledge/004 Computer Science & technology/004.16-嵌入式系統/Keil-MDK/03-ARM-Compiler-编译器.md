---
aliases: [ARM Compiler, armclang, armcc, Scatter Loading]
tags: [DDC/004.16, keil, compiler, armclang]
---

# 03 ARM Compiler 編譯器 (ARM Compiler)

## armcc v5 vs armclang v6 對比

| 特性 | armcc v5 | armclang v6 |
|:-----|:---------|:------------|
| **編譯器後端** | ARM 自研 (CCS) | LLVM/Clang |
| **C 標準** | C90/C99 | C11/C17 |
| **C++ 標準** | C++03 | C++14/C++17 |
| **診斷訊息** | 基本 | 豐富（Clang 風格 warning） |
| **Link-Time Optimization** | ❌ | ✅ (LTO) |
| **預設語言** | `--gnu` (GNU extensions) | `-std=gnu11` |
| **狀態** | Legacy / 凍結 | 主力推薦 |

> **建議**: 新專案使用 armclang v6（`Options → Target → ARM Compiler: V6.xx`）。

## 優化等級 Optimization Levels

| 等級 | 旗標 | 說明 | 適用場景 |
|:-----|:-----|:-----|:---------|
| **-O0** | No optimization | 完全不優化，最佳調試體驗 | Debug 開發階段 |
| **-O1** | Restricted | 基本優化，不增加 code size | 輕度優化 |
| **-O2** | High (default) | 中等優化，平衡速度/大小 | 日常使用 |
| **-O3** | Highest | 最激進速度優化，code 變大 | 性能瓶頸熱點 |
| **-Ofast** | -O3 + fast-math | 忽略 IEEE 精度規範 | DSP 運算 |
| **-Os** | Balanced | 針對 code size 優化 | Flash 受限 |
| **-Oz** | Smallest | 最小 code size (Clang 6+) | 極小 Flash 裝置 |

## Scatter-Loading 分散載入腳本 (.sct)

Scatter-loading 取代傳統 linker script，定義記憶體佈局：

```c
// example.sct — STM32F407VG (1024KB Flash, 128KB RAM)
LR_IROM1 0x08000000 0x00100000  {    // Load Region (Flash start, 1MB)
  ER_IROM1 0x08000000 0x00100000  {  // Execution Region — Code
    *.o (RESET, +First)
    *(InRoot$$Sections)
    .ANY (+RO)
  }
  RW_IRAM1 0x20000000 0x00020000  {  // R/W Region — SRAM
    .ANY (+RW +ZI)
  }
}
```

| 關鍵詞 | 含義 |
|:-------|:-----|
| `LR_xxx` | Load Region：可執行檔載入位址 |
| `ER_xxx` | Execution Region：執行時位址 |
| `+RO` | Read-Only: code + constants |
| `+RW` | Read-Write: initialized data |
| `+ZI` | Zero-Initialized: bss section |
| `+First` | 確保 vector table 在最前面 |

## 常用編譯選項 Common Options

| armclang 選項 | 功能 |
|:--------------|:-----|
| `-c` | Compile only (不 link) |
| `-g` | 生成 debug 資訊 |
| `-D<macro>` | 定義巨集 `-DSTM32F407xx` |
| `-I<dir>` | 添加 include path |
| `-W<warning>` | 控制 warning 等級 |
| `-target arm-arm-none-eabi` | 目標架構 triplet |
| `-mcpu=cortex-m4` | 目標 CPU |
| `-mthumb` | Thumb 指令集 |
| `-ffunction-sections` | 按函數分節（配合 `--gc-sections`） |
