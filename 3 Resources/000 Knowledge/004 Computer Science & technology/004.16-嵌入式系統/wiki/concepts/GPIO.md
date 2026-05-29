---
aliases: [GPIO, General Purpose I/O]
created: 2026-05-30
type: concept
category: 嵌入式系統
status: reviewed
---
# GPIO 通用輸入輸出

## 定義
MCU 最基礎的數位介面——每個腳位可配置為**輸入**(讀取外部信號) 或**輸出**(驅動外部電路)。

## 關鍵配置
| 參數 | 選項 |
|------|------|
| **方向** | Input / Output |
| **上下拉** | Pull-up / Pull-down / None |
| **輸出模式** | Push-pull / Open-drain |
| **速度** | Low / Medium / High / Very High |

## 常見應用: LED 控制、按鍵讀取 (去彈跳)、繼電器驅動、bit-bang 通訊、片選 (CS for SPI)

## 相關: [[中斷處理]] (GPIO 外部中斷 EXTI)
## Sources: [[source-嵌入式-KB]] · [[04-STM32 開發]]
