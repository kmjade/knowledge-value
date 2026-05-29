---
aliases: [Bollinger Bands]
created: 2026-05-29
type: concept
category: 技術分析
status: reviewed
---

# 布林帶 Bollinger Bands

## 定義
布林帶由三條線組成：中軌 (20 SMA) 和上下兩條標準差軌道，反映價格的波動率範圍。

## 計算

```
中軌 = 20 SMA
上軌 = 中軌 + 2 × σ (標準差)
下軌 = 中軌 − 2 × σ
```

## 交易信號

| 信號 | 條件 | 含義 |
|------|------|------|
| **觸及上軌** | 價格觸及或突破上軌 | 可能回調（超買） |
| **觸及下軌** | 價格觸及或突破下軌 | 可能反彈（超賣） |
| **Squeeze** | 頻寬收窄至極小 | 🔥 **爆發前兆**——即將大幅波動 |
| **Walking the Band** | 價格沿上軌/下軌運行 | 強趨勢持續 |
| **回歸中軌** | 價格從軌道回歸中軌 | 均值回歸 |

## Squeeze 策略

```
布林帶 Squeeze = 低波動後的爆發

1. 頻寬 (上軌−下軌) 收窄至 N 期最低
2. 等待價格突破 Squeeze 區間
3. 在突破方向進場
4. 止損設在 Squeeze 區間對側
```

## MQL4 實現

```cpp
double upper = iBands(NULL, 0, 20, 2, 0, PRICE_CLOSE, MODE_UPPER, 0);
double lower = iBands(NULL, 0, 20, 2, 0, PRICE_CLOSE, MODE_LOWER, 0);
double middle = iBands(NULL, 0, 20, 2, 0, PRICE_CLOSE, MODE_MAIN, 0);

double bandwidth = upper - lower;  // 頻寬
```

## 相關概念
- [[RSI指標]]、[[移動平均線]]、[[支撐與阻力]]

## Sources
- [[source-投資與交易-KB]]、[[source-交易書籍]]
