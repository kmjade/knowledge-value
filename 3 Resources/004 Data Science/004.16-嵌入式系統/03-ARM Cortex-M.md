---
aliases: [ARM Cortex-M]
tags: [DDC/004.16, arm]
---
# 03 ARM Cortex-M

## ARM Cortex-M 家族
| 系列 | 效能 | 應用 |
|:-----|:-----|------|
| **M0/M0+** | 低功耗入門 | 感測器、穿戴 |
| **M3** | 主流平衡 | 工業控制 |
| **M4** | DSP + FPU | 音訊、馬達控制 |
| **M7** | 高效能 | 邊緣 AI、圖像 |
| **M33** | TrustZone 安全 | IoT 安全節點 |

## 核心特性
- **NVIC** — 巢狀向量中斷控制器 (最多 240 中斷)
- **SysTick** — 24-bit 系統定時器 (RTOS 時基)
- **MPU** — 記憶體保護單元
- **除錯** — SWD/JTAG, DWT, ITM

## 開發工具
ARM Keil、IAR EWARM、GCC (arm-none-eabi)、OpenOCD
