---
title: Technical Analysis
aliases: [技术分析, 技術分析, TA, Chart Analysis, 技术面分析]
ddc: 332.632
created: 2026-05-29
tags: [technical-analysis, trading, ddc-332.6]
topic: 332.6-Investment-and-Trading
---

# 05 — Technical Analysis 技术分析

> 價格反映一切——技術分析的核心假設：所有已知資訊已計入價格。

## 三大前提 Three Premises

1. **價格反映一切** — 基本面、消息面、情緒面都已體現在價格中
2. **價格呈趨勢運動** — 趨勢一旦形成，更可能持續而非反轉
3. **歷史會重演** — 人性不變，價格型態重複出現

## K 線 Candlestick

### 基本結構

```
    上影線 (High)
    │
    ├── 實體 (Open/Close)
    │
    下影線 (Low)

陽線：收盤 > 開盤（通常綠/白）→ 買方強
陰線：收盤 < 開盤（通常紅/黑）→ 賣方強
```

### 關鍵反轉型態 Key Reversal Patterns

| 型態 | 信號 | 可靠性 |
|------|------|:------:|
| **錘子線 Hammer** | 底部反轉（長下影 + 小實體） | ⭐⭐⭐ |
| **吊頸線 Hanging Man** | 頂部反轉（上升趨勢中出現） | ⭐⭐⭐ |
| **吞沒型態 Engulfing** | 強反轉信號 | ⭐⭐⭐⭐ |
| **十字星 Doji** | 猶豫不決、可能反轉 | ⭐⭐ |
| **晨星/夜星** | 三根K線反轉型態 | ⭐⭐⭐⭐ |
| **射擊之星 Shooting Star** | 頂部反轉（長上影） | ⭐⭐⭐ |

### 持續型態 Continuation Patterns

| 型態 | 說明 |
|------|------|
| **旗形 Flag** | 快速趨勢中的短暫整理 |
| **三角收斂 Triangle** | 對稱/上升/下降三角形 |
| **楔形 Wedge** | 上升楔形看跌、下降楔形看漲 |

## 图表形态 Chart Patterns

### 反转形态 Reversal Patterns
- 头肩顶/底 (Head & Shoulders)
- 双顶/底 (Double Top/Bottom)
- 圆顶/底 (Rounding Top/Bottom)
- 岛形反转 (Island Reversal)

### 持续形态 Continuation Patterns
已有上述旗形、三角、楔形之外：
- 矩形整理 (Rectangle)

### 突破与假突破
- 成交量确认: 真突破应有放量配合
- 回踩确认: 突破后回踩不破为有效突破
- 假突破: 突破后快速回落至区间内

## 核心技術指標 Technical Indicators

### 趨勢指標 Trend Indicators

#### 移動平均線 Moving Average

| 類型 | 說明 | 常用參數 |
|------|------|---------|
| SMA | 簡單移動平均 | 20/50/200 |
| EMA | 指數移動平均（反應更快） | 9/21/50 |

**使用法則：**
- 價格 > MA → 上升趨勢
- 短期 MA 上穿長期 MA → 黃金交叉（看漲）
- 短期 MA 下穿長期 MA → 死亡交叉（看跌）

#### MACD (指數平滑異同移動平均線)

```
MACD 線 = 12EMA − 26EMA
信號線 = 9EMA (MACD線)
柱狀圖 = MACD線 − 信號線

買入信號：MACD 上穿信號線 + 柱狀圖由負轉正
賣出信號：MACD 下穿信號線 + 柱狀圖由正轉負
背離：價格創新高但 MACD 未創新高 = 頂背離（看跌）
```

#### ADX (平均趋向指數)
- ADX > 25: 趨勢市場
- ADX < 20: 盤整市場
- +DI 上穿 -DI: 買入信號
- ADX 上升: 趨勢轉強

### 震盪指標 Oscillators

#### CCI (商品通道指數)
- CCI > +100: 超買
- CCI < -100: 超賣
- 常用週期: 20

### 波動指標 Volatility

#### Keltner Channel
- 以 ATR 取代標準差
- 中軌 = EMA (20)
- 上/下軌 = 中軌 ± 2×ATR

### 成交量指標 Volume Indicators

- **OBV (On-Balance Volume)**: 累積成交量趨勢
- **Volume Profile**: 價格水準的成交量分佈
- **MFI (Money Flow Index)**: 結合價格與成交量的震盪指標

#### RSI (相對強弱指標)

```
RSI = 100 − [100 / (1 + 平均漲幅/平均跌幅)]
預設週期：14

RSI > 70 → 超買 (考慮賣出)
RSI < 30 → 超賣 (考慮買入)
RSI 50 → 中線（趨勢分界）
```

#### 隨機指標 Stochastic

```
%K = (收盤 − N日最低) / (N日最高 − N日最低) × 100
%D = %K 的3日均線

超買區：> 80
超賣區：< 20
```

### 波動指標 Volatility

#### 布林帶 Bollinger Bands

```
中軌 = 20 SMA
上軌 = 中軌 + 2σ
下軌 = 中軌 − 2σ

價格觸及上軌 → 可能回調
價格觸及下軌 → 可能反彈
頻寬收窄 → 爆發前兆（Squeeze）
```

## 支撐與阻力 Support & Resistance

### 繪製方法

```
支撐 Support：價格下跌時反彈的區域（買方進場）
阻力 Resistance：價格上漲時回落的區域（賣方進場）

角色互換：突破後的阻力變支撐，跌破後的支撐變阻力
```

### 斐波那契回調 Fibonacci Retracement

| 比率 | 說明 |
|------|------|
| 23.6% | 淺回調（強趨勢） |
| **38.2%** | 常見回調位 |
| **50.0%** | 心理關口（非斐波那契數） |
| **61.8%** | 黃金比例，最關鍵 |
| 78.6% | 深回調（趨勢瀕臨反轉） |

## 多重時間框架分析 Multi-Timeframe Analysis

```
月線 (MN) → 判斷大趨勢方向
週線 (W1) → 確認中期趨勢
日線 (D1) → 尋找交易機會
4小時 (H4) → 精細化入場點
1小時 (H1) → 執行交易
```

> 💡 原則：高時間框架定方向，低時間框架找入場。不要逆大趨勢交易。

## 交易策略模板 Strategy Template

```
1. 趨勢判斷 (D1/W1)
   → MA 排列？價格在 MA 上方/下方？
   
2. 關鍵位確認 (H4/D1)
   → 支撐/阻力在哪？斐波那契回調位？
   
3. 入場信號 (H1/M30)
   → 出現反轉型態？指標背離？
   
4. 止損設置
   → 放在結構低點/高點之外 + 緩衝
   
5. 止盈目標
   → 下一個支撐/阻力位，或 R:R ≥ 1:2
```

## 相關資源

- [[../03-Forex-Trading/03-Forex-Trading|Forex Trading]]
- [[../07-Algorithmic-Trading/07-Algorithmic-Trading|Algorithmic Trading]]（將技術指標自動化）
- [[../09-Trading-Psychology/09-Trading-Psychology|Trading Psychology]]（技術再好，心理不過關也沒用）
- [[../../01-投资理论/01-投资理论|01 Investment Theory]] — 基本面與技術面互補
- [[../../06-交易策略/06-交易策略|06 Trading Strategies]] — 指標與策略結合
