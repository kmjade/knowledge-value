---
title: 外匯交易
tags: [investment, forex, MT4, MT5, 外匯]
created: 2026-05-29
aliases: [Forex Trading, FX, 外汇保证金交易]
---

# 03 外匯交易 Forex Trading

> 全球最大的金融市場——每日交易量 $7.5 兆美元。24 小時運轉，從不休息。

## 外匯市場基礎

### 貨幣對結構 Currency Pair Structure

```
EUR/USD = 1.0850
 ↑    ↑      ↑
基幣  報價幣  匯率

1 EUR = 1.0850 USD
買入 EURUSD = 看好 EUR、看空 USD
賣出 EURUSD = 看空 EUR、看好 USD
```

### 主要貨幣對 Majors

| 貨幣對 | 暱稱 | 點差 (典型) | 特點 |
|--------|------|------------|------|
| **EUR/USD** | Fiber | 0.1–1.0 | 流動性最高、最窄點差 |
| **GBP/USD** | Cable | 0.5–2.0 | 波動大、適合波段 |
| **USD/JPY** | Yen | 0.5–1.5 | 與美債殖利率關聯 |
| **AUD/USD** | Aussie | 0.5–1.5 | 商品貨幣 |
| **USD/CHF** | Swissy | 0.5–1.5 | 避險貨幣 |
| **USD/CAD** | Loonie | 0.5–2.0 | 與油價關聯 |
| **NZD/USD** | Kiwi | 1.0–2.0 | 高波動小眾 |

### 交叉貨幣對 Crosses

| 貨幣對 | 特點 |
|--------|------|
| EUR/GBP | 低波動、窄點差 |
| EUR/JPY | 高波動、適合突破策略 |
| GBP/JPY | **波動之王**、日內幅度可達 200+ 點 |
| AUD/JPY | 風險情緒指標 |

## MT4 / MT5 平台 MetaTrader Platform

### MT4 vs MT5

| 特性 | MT4 | MT5 |
|------|-----|-----|
| 發布 | 2005 | 2010 |
| 語言 | MQL4 | MQL5 |
| 市場深度 | ❌ | ✅ (DOM) |
| 時間框架 | 9 種 | 21 種 |
| 內建指標 | 30 | 38 |
| 回測 | 單線程 | 多線程/多幣種 |
| 掛單類型 | 4 種 | 6 種 |
| 股票/期貨 | ❌ | ✅ |
| **外匯** | ✅ 主流 | ✅ 更好 |
| EA 兼容 | MQL4 專用 | MQL5 專用 |

> 💡 純外匯交易 → MT4（經紀商支援最廣）。多市場或需要更強回測 → MT5。

### MT4 常用快捷鍵

| 快捷鍵 | 功能 |
|--------|------|
| F1 | 幫助 |
| F6 | 策略測試器 |
| F8 | 圖表屬性 |
| F9 | 新訂單 |
| Ctrl+T | 終端窗口 |
| Ctrl+N | 導航窗口 |
| Ctrl+M | 市場報價 |
| + / - | 放大/縮小圖表 |
| Enter | 快速交易 |

### 標準手數換算 Lot Size

| 手數 | 單位 | 每點價值 (EURUSD) |
|------|------|-------------------|
| 1 標準手 | 100,000 | ~$10 |
| 0.1 迷你手 | 10,000 | ~$1 |
| 0.01 微型手 | 1,000 | ~$0.10 |

## 外匯交易策略 Forex Strategies

### 日內交易 Intraday

| 策略 | 時間框架 | 持倉 | 適合 |
|------|---------|------|------|
| Scalping | M1–M5 | 秒~分鐘 | 快速反應、低點差 |
| 日內波段 | M15–H1 | 數小時 | 大多數交易者 |
| 新聞交易 | M1–M5 | 分鐘級 | 經濟數據發布時 |

### 波段交易 Swing Trading

- 時間框架：H4–Daily
- 持倉：數天~數週
- 優勢：不用盯盤、交易成本佔比低
- 適合：有正職的交易者

### 關鍵交易時段 Key Sessions

```
亞洲盤 (Tokyo)   08:00–17:00 JST    流動性低、區間震盪
歐洲盤 (London)  08:00–17:00 GMT    波動最大、趨勢明顯
美洲盤 (New York) 08:00–17:00 EST    重疊歐洲最活躍
─────────────────────────────────────────
最佳交易時段：London + New York 重疊 (13:00–17:00 GMT)
最差交易時段：亞洲尾盤 + 歐洲未開 (17:00–19:00 GMT)
```

## 經濟數據日曆 Economic Calendar

重點關注（對 USD 影響最大）：

| 數據 | 發布頻率 | 影響程度 |
|------|---------|:--------:|
| **非農就業 NFP** | 每月第一個週五 | ⭐⭐⭐⭐⭐ |
| **CPI 通膨** | 每月 | ⭐⭐⭐⭐⭐ |
| **FOMC 利率決議** | 每 6 週 | ⭐⭐⭐⭐⭐ |
| GDP | 每季 | ⭐⭐⭐⭐ |
| 零售銷售 | 每月 | ⭐⭐⭐⭐ |
| PMI 製造業/服務業 | 每月 | ⭐⭐⭐ |
| 初請失業金 | 每週四 | ⭐⭐⭐ |

> 📅 數據來源：[[../99-Resources/Investment-and-Trading-Resources|ForexFactory / Investing.com]]

## 經紀商選擇 Broker Selection

| 考量 | 說明 |
|------|------|
| **監管** | FCA (UK)、ASIC (AU)、CySEC (EU) 較可靠 |
| **點差** | EURUSD 典型 0.0–1.0 pips (ECN) |
| **槓桿** | 主流 30–500:1（取決於監管） |
| **出金** | 速度、手續費 |
| **平台** | MT4 / MT5 / cTrader |

> ⚠️ 避開不受監管的經紀商。永遠先用模擬帳戶測試。

## 相關資源

- [[../05-Technical-Analysis/05-Technical-Analysis|技術分析]]（K 線、指標、型態）
- [[../06-Fundamental-Analysis/06-Fundamental-Analysis|基本面分析]]（經濟日曆、央行政策）
- [[../07-Algorithmic-Trading/07-Algorithmic-Trading|量化交易]]（MQL4/MQL5 EA 開發）
- [[../08-Risk-Management/08-Risk-Management|風險管理]]（外匯專屬風險）
- [[../99-Resources/Investment-and-Trading-Resources|資源收集]]（數據源、工具）
