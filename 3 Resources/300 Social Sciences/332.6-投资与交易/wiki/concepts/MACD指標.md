---
aliases: [MACD, Moving Average Convergence Divergence]
created: 2026-05-29
type: concept
category: 技術分析
status: reviewed
---

# MACD 指標 MACD Indicator

## 定義
MACD (指數平滑異同移動平均線) 是趨勢跟蹤動量指標，顯示兩條移動平均線之間的關係。

## 計算公式

```
MACD 線 = 12 EMA − 26 EMA
信號線 = 9 EMA (of MACD 線)
柱狀圖 = MACD 線 − 信號線
```

## 交易信號

| 信號 | 條件 | 含義 |
|------|------|------|
| **MACD 上穿信號線** | MACD線 ↑ + 柱狀圖負→正 | 🟢 買入 |
| **MACD 下穿信號線** | MACD線 ↓ + 柱狀圖正→負 | 🔴 賣出 |
| **頂背離** | 價格創新高、MACD未創新高 | 🔴 看跌反轉 |
| **底背離** | 價格創新低、MACD未創新低 | 🟢 看漲反轉 |
| **零軸穿越** | MACD 從負→正 | 趨勢轉多 |

## 背離 Divergence

```
背離 = 最強的反轉信號之一

頂背離（看跌）：
  價格：Higher High ↑
  MACD：Lower High ↓

底背離（看漲）：
  價格：Lower Low ↓
  MACD：Higher Low ↑
```

## MQL4 實現

```cpp
double macd_main = iMACD(NULL, 0, 12, 26, 9, PRICE_CLOSE, MODE_MAIN, 0);
double macd_signal = iMACD(NULL, 0, 12, 26, 9, PRICE_CLOSE, MODE_SIGNAL, 0);

// 黃金交叉
if(macd_main > macd_signal && prev_macd <= prev_signal)
    OrderSend(Symbol(), OP_BUY, ...);
```

## 相關概念
- [[移動平均線]] (MACD的基礎)、[[RSI指標]] (搭配使用)

## Sources
- [[source-投資與交易-KB]]
