---
aliases: [RTOS, FreeRTOS, Real-Time Operating System]
tags: [DDC/004.16, rtos]
---
# 05 RTOS 即時作業系統

## 為什麼需要 RTOS
裸機程式 (Super Loop) 在複雜任務中難以管理——RTOS 提供**任務排程、資源同步、時間確定性**。

## FreeRTOS (最廣泛使用的嵌入式 RTOS)
| 特性 | 說明 |
|------|------|
| **任務 Task** | 獨立執行單元，優先級排程 |
| **隊列 Queue** | 任務間數據傳遞 |
| **信號量 Semaphore** | 同步與互斥 |
| **互斥鎖 Mutex** | 資源保護 (含優先級繼承) |
| **軟體定時器** | 非中斷上下文定時回調 |
| **空閒任務** | 低功耗進入點 |

## 其他 RTOS
- **Zephyr** — Linux 基金會，模組化
- **RT-Thread** — 中國社群活躍
- **ThreadX** — Azure RTOS，安全認證
