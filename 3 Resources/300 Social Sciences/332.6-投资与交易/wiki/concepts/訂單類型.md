---
aliases: [Order Types]
created: 2026-05-29
type: concept
topic: 基礎
status: reviewed
---

# 訂單類型 Order Types

## 即時訂單

| 類型 | 說明 |
|------|------|
| **市價單 Market** | 以當前價格立即成交 |
| **限價單 Limit** | 指定價格或更優價格成交 |

## 掛單 Pending Orders

| MT4 類型 | 說明 | 使用場景 |
|---------|------|---------|
| Buy Limit | 在當前價格下方買入 | 回調做多 |
| Sell Limit | 在當前價格上方賣出 | 反彈做空 |
| Buy Stop | 在當前價格上方買入 | 突破做多 |
| Sell Stop | 在當前價格下方賣出 | 跌破做空 |

## 止損與止盈

| 類型 | 說明 |
|------|------|
| **止損 Stop Loss** | 價格觸及後自動平倉，限制虧損 |
| **止盈 Take Profit** | 價格觸及後自動平倉，鎖定利潤 |
| **移動止損 Trailing Stop** | 跟隨價格移動的止損 |

## 相關概念
- [[倉位計算]]、[[EA開發]]

## Sources
- [[source-投資與交易-KB]]
