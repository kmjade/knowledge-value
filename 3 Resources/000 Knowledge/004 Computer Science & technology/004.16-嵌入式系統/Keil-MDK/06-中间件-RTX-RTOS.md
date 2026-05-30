---
aliases: [RTX5, RL-TCPnet, RL-USB, RL-FlashFS, emWin, Middleware]
tags: [DDC/004.16, keil, rtx, rtos, middleware]
---

# 06 中間件與 RTX RTOS (Middleware & RTX RTOS)

## RTX5 即時核心 Real-Time Kernel

RTX5 是 Keil MDK 內建的確定性 RTOS，符合 CMSIS-RTOS v2 API。

| 特性 | 說明 |
|:-----|:-----|
| **排程 Scheduling** | Preemptive + Round-Robin (搶佔+輪詢) |
| **Context Switch** | ~5 μs (@ 168 MHz Cortex-M4) |
| **Thread 數量** | 理論無限制（取決於 RAM） |
| **Priority 等級** | 0 (idle) ~ N-1, 數字小=高優先級 |
| **IPC 機制** | Mutex, Semaphore, Message Queue, Event Flags, Memory Pool |
| **零中斷延遲** | Zero Interrupt Latency (ZIL) 機制 |

### RTX5 核心物件 Core Objects

| 物件 | 建立函數 (CMSIS-RTOS2) | 功能 |
|:-----|:----------------------|:-----|
| **osThread** | `osThreadNew()` | 獨立執行緒 |
| **osMutex** | `osMutexNew()` | 互斥鎖 (含 priority inheritance) |
| **osSemaphore** | `osSemaphoreNew()` | 計數/二元信號量 |
| **osMessageQueue** | `osMessageQueueNew()` | FIFO 訊息佇列 |
| **osTimer** | `osTimerNew()` | 單次/週期軟體定時器 |
| **osEventFlags** | `osEventFlagsNew()` | 32-bit 事件標誌 |
| **osMemoryPool** | `osMemoryPoolNew()` | 固定大小記憶體池 |
| **osThreadFlags** | `osThreadFlagsWait()` | 每 thread 的事件標誌 |

### RTX5 配置 (RTX_Config.h)

```c
// 關鍵配置宏
#define OS_TICK_FREQ            1000    // 1 kHz tick
#define OS_ROBIN_ENABLE         1       // Round-Robin 啟用
#define OS_ROBIN_TIMEOUT        5       // 5 ticks 時間片
#define OS_ISR_FIFO_QUEUE       16      // ISR 事件 FIFO 深度
#define OS_STACK_SIZE           200     // 默認 stack (words)
```

## Keil Middleware 中間件家族

| 組件 | 功能 | 關鍵特性 |
|:-----|:-----|:---------|
| **RL-TCPnet** | TCP/IP 網路協定棧 | IPv4/IPv6, BSD Socket, mbedTLS |
| **RL-USB** | USB Device/Host 棧 | CDC/HID/MSC/Audio, OTG |
| **RL-FlashFS** | 嵌入式檔案系統 | FAT12/16/32, exFAT, NAND/NOR, SD/MMC |
| **emWin** | 圖形 GUI 庫 | SEGGER emWin (授權版), 抗鋸齒字型 |

### RL-TCPnet 快速範例

```c
#include "rl_net.h"

// 初始化網絡
netInitialize();

// TCP Server
int sock = netTCP_GetSocket(tcp_callback);
netTCP_Listen(sock, 80);

// BSD-style socket also supported
int s = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
```

### 中間件配置 Middleware Configuration

所有中間件透過 μVision 圖形化配置:

```
Project → Options → Runtime Environment (RTE)
  ├── CMSIS
  ├── Device
  ├── MDK-Middleware
  │   ├── Network       (RL-TCPnet)
  │   ├── USB           (RL-USB)
  │   ├── File System   (RL-FlashFS)
  │   └── Graphics      (emWin)
  └── RTOS
      └── Keil RTX5
```

> 勾選所需組件 → Resolve dependencies → OK，自動生成配置檔案並連結靜態庫。

## 相關參考 Cross References

- [[../05-RTOS 即時作業系統|RTOS 知識庫]]
- [[Keil-MDK/04-CMSIS-标准接口|04 CMSIS 標準]]
