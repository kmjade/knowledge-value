---
title: 量化交易
tags: [investment, algo-trading, MQL4, MQL5, EA, Python]
created: 2026-05-29
aliases: [Quantitative Trading, Algo Trading, EA, 自動交易]
---

# 07 量化交易 Quantitative Trading

> 把交易策略寫成程式，讓電腦幫你盯盤。EA (Expert Advisor) = 外匯交易機器人。

## MQL4 / MQL5 快速對比

| 特性 | MQL4 | MQL5 |
|------|------|------|
| 平台 | MT4 | MT5 |
| 語法 | C-like (較簡單) | C++ (OOP) |
| 訂單函數 | OrderSend() | 多種 OrderSend 變體 |
| 內建指標 | iMA(), iRSI()... | 複製到 buffer |
| 回測 | 單幣種單線程 | 多幣種多線程 |
| 市場 | 外匯為主 | 股票/期貨/外匯 |
| 學習曲線 | 🟢 較緩 | 🟡 較陡 |

> 💡 純外匯 EA → MQL4 入門較快。多市場/複雜策略 → MQL5。

## MQL4 EA 基礎架構 Basic EA Structure

```cpp
//+------------------------------------------------------------------+
//|                                               Simple_EA.mq4       |
//+------------------------------------------------------------------+
#property copyright "Your Name"
#property version   "1.00"
#property strict

// 外部參數（用戶可在 MT4 界面調整）
input double LotSize = 0.1;          // 交易手數
input int    StopLoss = 50;          // 止損點數
input int    TakeProfit = 100;       // 止盈點數
input int    FastMA = 10;            // 快線週期
input int    SlowMA = 30;            // 慢線週期

// 全局變數
double fastMA_val, slowMA_val;
double prev_fastMA, prev_slowMA;

//+------------------------------------------------------------------+
//| Expert initialization function                                     |
//+------------------------------------------------------------------+
int OnInit() {
   // 初始化：檢查參數、設置定時器等
   if(LotSize < 0.01) {
      Print("手數太小！");
      return INIT_PARAMETERS_INCORRECT;
   }
   return INIT_SUCCEEDED;
}

//+------------------------------------------------------------------+
//| Expert deinitialization function                                   |
//+------------------------------------------------------------------+
void OnDeinit(const int reason) {
   // 清理：關閉文件、釋放資源
}

//+------------------------------------------------------------------+
//| Expert tick function — 每次價格變動時執行                           |
//+------------------------------------------------------------------+
void OnTick() {
   // 1. 獲取指標值
   fastMA_val = iMA(NULL, 0, FastMA, 0, MODE_SMA, PRICE_CLOSE, 0);
   slowMA_val = iMA(NULL, 0, SlowMA, 0, MODE_SMA, PRICE_CLOSE, 0);
   prev_fastMA = iMA(NULL, 0, FastMA, 0, MODE_SMA, PRICE_CLOSE, 1);
   prev_slowMA = iMA(NULL, 0, SlowMA, 0, MODE_SMA, PRICE_CLOSE, 1);
   
   // 2. 檢查是否有持倉
   if(OrdersTotal() == 0) {
      // 黃金交叉 → 買入
      if(prev_fastMA <= prev_slowMA && fastMA_val > slowMA_val) {
         OrderSend(Symbol(), OP_BUY, LotSize, Ask, 3, 
                   Ask - StopLoss * Point, 
                   Ask + TakeProfit * Point, 
                   "MA Cross Buy", 0, 0, clrGreen);
      }
      // 死亡交叉 → 賣出
      else if(prev_fastMA >= prev_slowMA && fastMA_val < slowMA_val) {
         OrderSend(Symbol(), OP_SELL, LotSize, Bid, 3,
                   Bid + StopLoss * Point,
                   Bid - TakeProfit * Point,
                   "MA Cross Sell", 0, 0, clrRed);
      }
   }
}
```

## EA 必備安全機制 Essential Safety

### 1. 風險檢查

```cpp
double RiskPercent = 2.0;  // 每筆風險 2%
double sl_distance = StopLoss * Point;
double tick_value = MarketInfo(Symbol(), MODE_TICKVALUE);
double risk_per_lot = sl_distance / Point * tick_value;
double max_lot = (AccountBalance() * RiskPercent / 100) / risk_per_lot;

LotSize = MathMin(LotSize, max_lot);  // 限制手數
```

### 2. 魔術數字（區分 EA 訂單）

```cpp
#define MAGIC_NUMBER 20260529

// 只管理自己開的單
bool IsMyOrder() {
   return OrderMagicNumber() == MAGIC_NUMBER;
}
```

### 3. 最大持倉限制

```cpp
int MaxOrders = 3;
int myOrders = 0;
for(int i = 0; i < OrdersTotal(); i++) {
   if(OrderSelect(i, SELECT_BY_POS) && OrderMagicNumber() == MAGIC_NUMBER)
      myOrders++;
}
if(myOrders >= MaxOrders) return;  // 不開新倉
```

### 4. 交易時間過濾

```cpp
bool IsTradingHour() {
   int hour = Hour();
   // 避開亞洲盤冷清時段 (GMT+2 夏季)
   if(hour >= 1 && hour <= 7) return false;
   // 避開週五收盤前
   if(DayOfWeek() == 5 && hour >= 20) return false;
   return true;
}
```

## 回測與優化 Backtesting & Optimization

### MT4 策略測試器設置

```
1. 選擇 EA → 選擇貨幣對 → 選擇時間框架
2. 設置時間範圍（建議 1–2 年）
3. 模式：每筆報價 (Every Tick) — 最精確
4. 初始資金：$10,000
5. 點差：設為平均點差 + 2（保守）
```

### 關鍵回測指標

| 指標 | 理想值 | 說明 |
|------|--------|------|
| 總淨利 | > 0 | 越大越好 |
| 最大回撤 | < 20% | 越低越好 |
| 勝率 | > 40% | 低勝率 + 高盈虧比也可 |
| 盈虧比 (Profit Factor) | > 1.5 | 總盈利/總虧損 |
| 夏普比率 | > 1.0 | 風險調整後回報 |
| 交易次數 | > 100 | 太少 = 統計不可靠 |

> ⚠️ **過度擬合陷阱**：參數完美匹配歷史數據 ≠ 未來會盈利。留出 30% 數據做樣本外測試。

## Python 量化回測 Python Backtesting

```python
import backtrader as bt
import pandas as pd

class MA_Cross(bt.Strategy):
    params = (('fast', 10), ('slow', 30),)
    
    def __init__(self):
        self.fast_ma = bt.indicators.SMA(self.data.close, period=self.p.fast)
        self.slow_ma = bt.indicators.SMA(self.data.close, period=self.p.slow)
        self.crossover = bt.indicators.CrossOver(self.fast_ma, self.slow_ma)
    
    def next(self):
        if not self.position:
            if self.crossover > 0:  # 黃金交叉
                self.buy()
            elif self.crossover < 0:  # 死亡交叉
                self.sell()
        else:
            # 反向信號 → 平倉
            if (self.position.size > 0 and self.crossover < 0) or \
               (self.position.size < 0 and self.crossover > 0):
                self.close()

# 執行回測
cerebro = bt.Cerebro()
cerebro.addstrategy(MA_Cross)
data = bt.feeds.GenericCSVData(dataname='EURUSD_H1.csv')
cerebro.adddata(data)
cerebro.run()
cerebro.plot()
```

## 常用 Python 量化工具

| 工具 | 用途 |
|------|------|
| **backtrader** | 回測框架（事件驅動） |
| **vectorbt** | 向量化回測（超快速） |
| **pandas** | 數據處理 |
| **TA-Lib** | 技術指標庫 |
| **yfinance** | Yahoo Finance 數據下載 |
| **MetaTrader5** | Python → MT5 直接交易 |

## EA 開發流程 Development Workflow

```
1. 策略構思 → 紙上描述策略邏輯
2. 手動驗證 → 先手動交易 20+ 次確認策略有效
3. MQL 編碼 → 寫成 EA
4. 回測 → 歷史數據測試（≥ 1 年）
5. 樣本外測試 → 保留 30% 數據驗證
6. 模擬帳戶 → 至少跑 2 週
7. 小資金實盤 → 最小手數跑 1 個月
8. 正式上線 → VPS 24h 運行
```

> 💡 **最重要的一步是第 2 步**。如果手動都做不到盈利，EA 只會加速虧損。

## 相關資源

- [[03-Forex-Trading|外匯交易 — MT4/MT5 平台]]
- [[05-Technical-Analysis|技術分析 — 指標與策略來源]]
- [[08-Risk-Management|風險管理 — EA 的風控編碼]]
