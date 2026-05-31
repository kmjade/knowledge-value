---
aliases: [Position Sizing]
created: 2026-05-29
type: concept
topic: 風險
status: reviewed
---

# 倉位計算 Position Sizing

## 定義
倉位計算是根據帳戶餘額、風險承受比例和止損距離計算每筆交易應使用的交易量。

## 核心公式

```
手數 = (帳戶餘額 × 風險%) / (止損點數 × 每點價值)

例：$10,000 帳戶 × 2% = $200 風險
止損 50 點 × EURUSD ($10/標準手) = $500/手
手數 = $200 / $500 = 0.4 手
```

## 風險上限規則

| 規則 | 數值 | 觸發後行動 |
|------|:--:|------|
| 每筆風險 | ≤ 2% | — |
| 每日風險 | ≤ 5% | 停止當日交易 |
| 每週風險 | ≤ 10% | 下週減倉 |

## MQL4 實現

```cpp
double CalcLotSize(double riskPercent, double slPoints) {
    double balance = AccountBalance();
    double riskAmount = balance * riskPercent / 100.0;
    double tickValue = MarketInfo(Symbol(), MODE_TICKVALUE);
    double lotSize = riskAmount / (slPoints * tickValue);
    lotSize = MathMin(lotSize, MarketInfo(Symbol(), MODE_MAXLOT));
    lotSize = NormalizeDouble(lotSize, 2);
    return lotSize;
}
```

## 相關概念
- [[凱利公式]]、[[保證金與槓桿]]、[[EA開發]]

## Sources
- [[source-投資與交易-KB]]
- [[../../08-風險管理|風險管理]]
