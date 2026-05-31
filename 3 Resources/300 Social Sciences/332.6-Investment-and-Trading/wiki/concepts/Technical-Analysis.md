---
aliases:
  - 技术分析
  - Technical Analysis
  - TA
created: 2026-05-27
type: concept
topic: 332.6-Investment-and-Trading
status: reviewed
---

# Technical Analysis (技术分析)

## 定义

技术分析是通过研究历史价格数据（K 线、成交量、指标）来预测未来市场走势的方法。与基本面分析不同，技术分析关注**价格本身的行为**而非资产的内在价值。

## 核心原理

### 三大假设

```
1. 市场行为包容一切
   → 所有已知信息已反映在价格中

2. 价格以趋势方式演变
   → 趋势是技术分析的核心

3. 历史会重演
   → 市场心理模式重复出现
```

### 四维分析框架

```
价格 (Price) → K 线形态、支撑阻力、趋势线
趋势 (Trend) → 方向、强度、阶段判断
动量 (Momentum) → RSI、MACD、Stochastic
成交量 (Volume) → 确认、背离
```

## 关键要点

### MT4/MT5 内置分析工具

| 类别 | MT4 | MT5 |
|------|-----|-----|
| 技术指标 | 30 | 38 |
| 分析对象 | 24 | 44 |
| 时间框架 | 9 | 21 |

### 常用指标分类

```
趋势类:
├── 移动平均线 (MA)
├── MACD
├── 布林带 (Bollinger Bands)
└── ADX

震荡类:
├── RSI (相对强弱指标)
├── Stochastic (KDJ)
└── CCI

成交量:
└── Volume / OBV

自定义:
└── MQL 编写
```

### 技术分析 VS 基本面分析

| | 技术分析 | 基本面分析 |
|------|----------|----------|
| 依据 | 价格图表 | 经济数据/财报 |
| 时间框架 | 短期~中期 | 中长期 |
| 适用 | 交易 | 投资 |
| MetaTrader | ⭐ 核心功能 | 需外部数据 |

## 相关概念

- [[Backtesting]] — 用历史数据验证技术信号
- [[Risk-Management]] — 技术位是止损的依据
- [[Expert-Advisor]] — EA 通常基于技术信号
- [[Algorithmic-Trading]] — 技术指标的自动化
- [[MQL]] — 编写自定义技术指标

## 相关实体

- [[MetaTrader]] — 最强大的技术分析平台之一
- [[MT5]] — 38 种内置指标 + 44 种分析对象
- [[MT4]] — 30 种内置指标，社区资源最丰富

## Sources

- [[3 Resources/finance/raw/MetaTrader/03-技术分析/03-技术分析.md]]
