---
aliases: [CMSIS, Cortex Microcontroller Software Interface Standard]
tags: [DDC/004.16, keil, cmsis, arm]
---

# 04 CMSIS 標準介面 (CMSIS Standard Interface)

> CMSIS (Cortex Microcontroller Software Interface Standard) 是 Arm 定義的軟體抽象層標準，提供跨 Cortex-M 晶片的統一 API。

## CMSIS 組件架構 CMSIS Components

```
CMSIS 生態
├── CMSIS-Core       — 核心寄存器 / 系統時鐘 / NVIC / SysTick
├── CMSIS-DSP        — 數位信號處理庫 (FIR/FFT/矩陣)
├── CMSIS-NN         — 神經網絡推理庫 (TinyML)
├── CMSIS-RTOS v2    — RTOS 抽象 API (RTX5/FreeRTOS/Zephyr)
├── CMSIS-Driver     — 週邊驅動 API (UART/SPI/I2C/USB/Ethernet)
├── CMSIS-Compiler   — 編譯器適配（IAR/GCC/armclang）
├── CMSIS-Pack       — 軟體包描述格式 (pdsc)
└── CMSIS-Toolbox    — CLI 工具 (cbuild / cpackget)
```

## CMSIS-Core 核心

| 頭文件 Header | 功能 |
|:--------------|:-----|
| `core_cm4.h` / `core_cm7.h` | Core 寄存器定義 (SCB, NVIC, SysTick, MPU) |
| `cmsis_gcc.h` / `cmsis_armclang.h` | 編譯器內建函數封裝 |
| `system_<device>.h` | 系統初始化 (`SystemInit()`, `SystemCoreClock`) |
| `startup_<device>.s` | 啟動代碼 (vector table, Reset_Handler) |

### 標準 CMSIS 函數 Examples

```c
#include "stm32f4xx.h"

// System tick 配置
SysTick_Config(SystemCoreClock / 1000);  // 1ms 中斷

// NVIC 中斷控制
NVIC_EnableIRQ(TIM2_IRQn);
NVIC_SetPriority(TIM2_IRQn, 2);

// 臨界區 (disable interrupts)
__disable_irq();
// ... critical section ...
__enable_irq();

// 記憶體屏障
__DMB();  // Data Memory Barrier
__DSB();  // Data Synchronization Barrier
```

## CMSIS-DSP 數位信號處理

| 模組 | 功能 | 關鍵函數 |
|:-----|:-----|:---------|
| **Basic Math** | 向量加減乘除 | `arm_add_f32()` |
| **Filtering** | FIR/IIR/LMS 濾波 | `arm_fir_f32()` |
| **Transform** | FFT/DCT | `arm_cfft_f32()` |
| **Matrix** | 矩陣運算 | `arm_mat_mult_f32()` |
| **Statistics** | 均值/方差/RMS | `arm_rms_f32()` |

> CMSIS-DSP 針對 Cortex-M4/M7 的 FPU + SIMD 指令深度優化。

## CMSIS-RTOS v2 API (統一 RTOS 接口)

| API 類型 | 關鍵函數 | 說明 |
|:---------|:---------|:-----|
| **Thread** | `osThreadNew()`, `osThreadYield()` | 執行緒創建與管理 |
| **Mutex** | `osMutexNew()`, `osMutexAcquire()` | 互斥鎖 |
| **Semaphore** | `osSemaphoreNew()`, `osSemaphoreAcquire()` | 信號量 |
| **Message Queue** | `osMessageQueueNew()`, `osMessageQueuePut()` | 訊息佇列 |
| **Timer** | `osTimerNew()`, `osTimerStart()` | 軟體定時器 |
| **Event Flags** | `osEventFlagsNew()`, `osEventFlagsWait()` | 事件標誌組 |

> 透過 RTOS2 API 可無縫切換 RTX5 / FreeRTOS / Zephyr 底層實作。

## CMSIS-Pack 格式

Softwa​​re Pack 使用 `.pdsc` (XML 描述檔) + 源碼/庫打包為 `.pack` 檔案。

```xml
<!-- 精簡 pdsc 範例 -->
<package vendor="Keil" name="STM32F4xx_DFP" version="2.17.0">
  <devices>
    <family Dname="STM32F4"/>
    <device Dname="STM32F407VG">
      <memory name="IROM1" start="0x08000000" size="0x00100000"/>
    </device>
  </devices>
</package>
```
