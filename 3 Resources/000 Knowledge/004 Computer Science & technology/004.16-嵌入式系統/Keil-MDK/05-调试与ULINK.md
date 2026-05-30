---
aliases: [ULINK, Debug Probe, JTAG, SWD, Trace, ITM]
tags: [DDC/004.16, keil, debug, ulink]
---

# 05 調試與 ULINK (Debugging & ULINK Probes)

## ULINK 調試器比較 ULINK Probe Comparison

| 特性 | ULINK2 | ULINKpro | ULINKplus |
|:-----|:-------|:---------|:----------|
| **調試介面** | JTAG / SWD | JTAG / SWD | JTAG / SWD |
| **Trace** | ❌ | ✅ ETMv3 (4-bit) | ✅ SWO/ITM |
| **功耗量測** | ❌ | ❌ | ✅ 電流/電壓 |
| **SWO 支援** | 基本 | ✅ | ✅ 高頻 |
| **最大 SWD 時鐘** | 10 MHz | 50 MHz | 50 MHz |
| **Code Coverage** | ❌ | ✅ | ❌ |
| **適用場景** | 入門/學生 | 專業分析 | 功耗優化 |
| **Event Recorder** | ✅ | ✅ | ✅ |

## 調試介面 Debug Interfaces

| 介面 | 線數 | 頻寬 | 說明 |
|:-----|:----|:-----|:-----|
| **JTAG** | 5 (TMS/TCK/TDI/TDO/nTRST) | 中 | 標準 IEEE 1149.1 |
| **SWD** | 2 (SWDIO/SWCLK) | 高 | ARM 專用，佔用腳位少 |
| **cJTAG** | 2 | 高 | 相容 JTAG + SWD |

## ITM / SWO Trace 追蹤

ITM (Instrumentation Trace Macrocell) 透過 SWO (Single Wire Output) 輸出 runtime 數據：

```
Cortex-M Core
    │
    ├── ITM (32 channels)
    │   ├── Channel 0: OS events
    │   ├── Channel 1: User printf
    │   └── Channel 31: Timestamps
    │
    └── SWO ──► ULINKpro/plus ──► μVision Trace Window
```

### ITM printf 重定向

```c
// SWO printf — 無需 UART, 不佔用 CPU
#include "stm32f4xx.h"
#define ITM_Port8(n)   (*((volatile unsigned char *)(0xE0000000+4*n)))

int fputc(int ch, FILE *f) {
    ITM_Port8(0) = (unsigned char)ch;  // ITM Channel 0
    return ch;
}
```

> **優勢**: SWO printf 不阻塞 CPU（透過 ITM FIFO），真實時序不受影響。

## 斷點與監視點 Breakpoints & Watchpoints

| 類型 | 數量 (Cortex-M4) | 說明 |
|:-----|:----------------|:-----|
| **Hardware Breakpoint** | 6 (FPB) | 程式碼斷點（不限 Flash 寫入） |
| **Software Breakpoint** | 不限 | 修改 Flash 放置 `BKPT`，影響壽命 |
| **Data Watchpoint** | 4 (DWT) | 變數存取觸發中斷 |
| **Access Breakpoint** | — | 指定記憶體位址讀/寫觸發 |

### 進階條件斷點

```
μVision → Debug → Breakpoints (Ctrl+B)
  Expression:  counter == 100
  Count:       5              // 第 5 次命中才停
  Command:     "printf(...)"  // 斷點觸發時執行 script
```

## Event Recorder 事件記錄器

不佔用 SWO/ITM 通道，透過 DWT 記錄事件到 RAM buffer：

```c
#include "EventRecorder.h"

EventRecord2(EventID1, val1, val2);  // 記錄帶 2 個參數事件
EventRecorder::Update();              // 刷新到調試器
```

| 特性 | SWO ITM | Event Recorder |
|:-----|:--------|:---------------|
| 硬體需求 | SWO pin | DWT (所有 Cortex-M) |
| 即時性 | ✅ 串流輸出 | RAM buffer (調試暫停後讀取) |
| 佔用 CPU | 極低 | 極低 |

## 調試工作流 Debug Workflow

```
1. 編譯:  F7 → Build (確保 -g debug info)
2. 連接:  Ctrl+F5 → Start Debug Session
3. 斷點:  F9 → 設定斷點
4. 執行:  F5 → Run (全速)
          F10 → Step Over
          F11 → Step Into
5. 監視:  Watch Window → 添加變數
          Memory Window → 查看記憶體
6. Trace: View → Trace → 分析執行路徑/時序
7. 功耗:  ULINKplus → Debug → Power Measurement
8. 結束:  Ctrl+F5 → Stop Debug
```
