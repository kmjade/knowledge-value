---
aliases: [RTOS, FreeRTOS, Real-Time OS]
created: 2026-05-30
type: concept
category: 嵌入式系統
status: reviewed
---
# 即時作業系統 RTOS

## 定義
RTOS 保證任務在**確定的時間內**完成——不是「快」，而是「可預測」。延遲有上界。

## 核心機制 (FreeRTOS)
| 機制 | 用途 |
|------|------|
| **任務排程** | 優先級搶佔式，同等級時間片輪轉 |
| **隊列 Queue** | 任務間數據傳遞 (FIFO) |
| **信號量 Semaphore** | 同步 + 資源計數 |
| **互斥鎖 Mutex** | 互斥訪問 + 優先級繼承防反轉 |
| **軟體定時器** | 非 ISR 上下文回調 |

## 硬即時 vs 軟即時
- **硬即時**: 錯過截止 = 系統失敗 (ABS 剎車、飛控)
- **軟即時**: 錯過截止 = 品質下降 (影音播放)

## Sources: [[source-嵌入式-KB]] · [[05-RTOS 即時作業系統]]
