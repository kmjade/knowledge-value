---
aliases: [RSI, Relative Strength Index]
created: 2026-05-29
type: concept
topic: 技術分析
status: reviewed
---

# RSI 指標 Relative Strength Index

## 定義
RSI (相對強弱指標) 是衡量價格變動速度和幅度的震盪指標，範圍 0–100。

## 公式

```
RS = 平均漲幅 / 平均跌幅 (N期)
RSI = 100 − [100 / (1 + RS)]

預設週期 N = 14
```

## 信號解讀

| RSI 值 | 狀態 | 行動 |
|:--:|------|------|
| > 70 | 超買 Overbought | 考慮賣出 |
| < 30 | 超賣 Oversold | 考慮買入 |
| 50 | 中線 | 趨勢分界（>50=多頭、<50=空頭） |
| 80+ | 極端超買 | 強趨勢中可能持續超買 |
| < 20 | 極端超賣 | 強趨勢中可能持續超賣 |

## 背離

| 類型 | 價格 | RSI | 信號 |
|------|------|-----|:--:|
| 頂背離 | Higher High | Lower High | 看跌 |
| 底背離 | Lower Low | Higher Low | 看漲 |

## MQL4 實現

```cpp
double rsi = iRSI(NULL, 0, 14, PRICE_CLOSE, 0);

if(rsi < 30) {
    // 超賣 → 考慮買入
} else if(rsi > 70) {
    // 超買 → 考慮賣出
}
```

## 與 MACD 的配合

| 組合 | 策略 |
|------|------|
| MACD 金叉 + RSI < 40 | 確認上漲動能 |
| MACD 死叉 + RSI > 60 | 確認下跌動能 |
| MACD 背離 + RSI 背離 | 雙重確認——高概率反轉 |

## 相關概念
- [[MACD指標]]、[[布林帶]]

## Sources
- [[source-投資與交易-KB]]
