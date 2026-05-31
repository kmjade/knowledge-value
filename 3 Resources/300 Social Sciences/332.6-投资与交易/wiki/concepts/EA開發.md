---
aliases: [Expert Advisor Development, EA Programming]
created: 2026-05-29
type: concept
topic: 量化
status: reviewed
---

# EA 開發 EA Development

## 定義
EA (Expert Advisor) 是在 MT4/MT5 上運行的自動交易程式，使用 MQL4/MQL5 語言編寫。

## EA 生命週期

```
OnInit()     → 初始化（加載時執行一次）
OnDeinit()   → 卸載（移除EA時執行）
OnTick()     → 每次價格變動時執行（核心）
OnTimer()    → 定時器回調
OnChartEvent() → 圖表事件
```

## 必備安全機制

### 風險檢查
```cpp
double RiskPercent = 2.0;
double max_lot = (AccountBalance() * RiskPercent / 100) 
                 / (sl_distance / Point * tick_value);
LotSize = MathMin(LotSize, max_lot);
```

### 魔術數字
```cpp
#define MAGIC 20260529
bool IsMyOrder() { return OrderMagicNumber() == MAGIC; }
```

### 最大持倉限制
```cpp
if(myOrderCount >= MaxOrders) return;
```

### 時間過濾
```cpp
if(Hour() < 8 || Hour() > 20) return;  // 僅交易活躍時段
```

## 開發流程

```
1. 策略構思 → 2. 手動驗證 → 3. MQL編碼
→ 4. 回測 → 5. 樣本外測試 → 6. 模擬帳戶
→ 7. 小資金實盤 → 8. VPS 正式上線
```

## 相關概念
- [[倉位計算]]、[[凱利公式]]、[[MQL4]]、[[MQL5]]

## Sources
- [[source-投資與交易-KB]]、[[source-交易書籍]]
- [[332.6-投资与交易/07-量化交易|KB: 量化交易]]
