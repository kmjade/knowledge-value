---
aliases:
  - Investment & Trading Wiki
  - 投资与交易知识库
created: 2026-05-29
type: wiki-schema
topic: 332.6-Investment-and-Trading
---

# Investment & Trading Wiki Schema — DDC 332.6

> 二级市场投资与交易知识库。从价值投资到量化交易，从 K 线到 MQL 算法——系统化的交易知识体系。
> Merged from Tree 1 (Alexander Elder framework) and Tree 2 (MetaTrader/MQL ecosystem).

## Directory Structure

```
332.6-Investment-and-Trading/
├── CLAUDE.md                                    ← Schema definition
├── 332.6-Investment-and-Trading.md               ← Directory index
├── 00-MOCs/                                     ← Overviews & learning paths
│   ├── Investment-and-Trading-Learning-Path.md
│   └── Investment-and-Trading-KB-Overview.md
├── 01-Investment-Basics/                        ← Markets, order types, margin
├── 02-Stock-Trading/                            ← Stock trading
├── 03-Forex-Trading/                            ← Forex, MT4/MT5
├── 04-Futures-and-Derivatives/                  ← Futures, options, CFD
├── 05-Technical-Analysis/                       ← K-line, indicators, patterns
├── 06-Fundamental-Analysis/                     ← Macro, industry, company
├── 07-Algorithmic-Trading/                      ← EA, MQL4/5, backtesting
├── 08-Risk-Management/                          ← Money mgmt, stop loss, Kelly
├── 09-Trading-Psychology/                       ← Discipline, biases, mindset
├── 10-Practice-and-Review/                      ← Trading journal, review
├── 99-Resources/                                ← FAQ, tools, books
│   ├── Investment-and-Trading-Resources.md
│   ├── Investment-and-Trading-FAQ.md
│   ├── Finance-Management/
│   └── ram/Book/                                ← 12 PDF trading books
├── raw/                                         ← ① Raw materials (human, AI read-only)
│   ├── articles/MQL/                            ← MQL4/5 programming (12 files)
│   ├── articles/MetaTrader/                     ← MetaTrader KB (14 files)
│   ├── economic-calendar/                       ← Daily economic calendar data
│   ├── papers/
│   ├── books/
│   └── conversations/
├── wiki/                                        ← ② AI-compiled (AI exclusive write)
│   ├── index.md
│   ├── log.md
│   ├── concepts/   (13)
│   ├── entities/    (7)
│   └── sources/     (5)
└── outputs/                                     ← ③ Wiki-based artifacts
```

## Core Concept Domains

### Investment Theory
- Value Investing, Growth Investing, Index Investing
- Asset Allocation, Modern Portfolio Theory (MPT)
- Efficient Market Hypothesis (EMH)
- Behavioral Finance

### Technical Analysis
- Candlestick Patterns, Trend Analysis
- Support & Resistance, Fibonacci
- Indicators: MA, MACD, RSI, Stochastic, Bollinger, ADX, CCI, Keltner Channel
- Volume Analysis: OBV, Volume Profile, MFI
- Chart Patterns: Head & Shoulders, Double Top/Bottom, Flags, Triangles
- Elliott Wave Theory

### Trading Psychology
- Trading Discipline, Emotion Management
- Cognitive Biases (Confirmation, Loss Aversion, Overconfidence, Anchoring)
- Elder's AA Principle
- Pre-Trade Rituals & Checklists

### Risk Management
- Money Management: 2% Rule, 6% Rule (Elder)
- Position Sizing: Fixed Fractional, Fixed Ratio, Kelly Criterion
- Stop Loss: Hard, Trailing, Time-based, Volatility-based (ATR)
- Risk Metrics: Sharpe Ratio, Max Drawdown, Calmar Ratio, Profit Factor

### Financial Instruments
- Stocks, ETFs, Futures, Options, Forex, Cryptocurrency, CFD

### Trading Strategies
- Trend Following, Mean Reversion, Breakout Trading, Momentum Trading
- Arbitrage, Event-Driven, Quantitative Strategies

### Market Analysis
- Macroeconomic Analysis (GDP, CPI, PCE, NFP, PMI, Central Bank Policy)
- Industry Analysis (Porter's Five Forces, Sector Rotation)
- Company Fundamental Analysis (Financial Statements, Valuation)
- Market Sentiment (Fear & Greed, VIX, Put/Call Ratio)

### Trading Systems
- System Design Principles, Backtesting Frameworks
- MetaTrader EA Development (MQL4/MQL5)
- Python Ecosystem (Backtrader, Zipline, vnpy, ccxt)
- Performance Metrics & Walk-Forward Analysis

### Economic Calendar
- Event-driven trading, impact levels (High/Medium/Low)
- Key events: NFP, CPI, FOMC, ECB, GDP, PMI
- Sources: Forex Factory, Investing.com, DailyFX

## Wiki Compilation Status

| Metric | Value |
|--------|-------|
| Concept Pages | 13 |
| Entity Pages | 7 |
| Source Pages | 5 |
| Total Pages | 25 |
| Last Compile | 2026-05-29 |
| Status | 🟢 Active |

## Concept List

| # | Concept | Page |
|---|---------|------|
| 1 | Value Investing | [[wiki/concepts/Value-Investing\|Value Investing]] |
| 2 | Technical Analysis | [[wiki/concepts/Technical-Analysis\|Technical Analysis]] |
| 3 | Risk Management | [[wiki/concepts/Risk-Management\|Risk Management]] |
| 4 | Trading Psychology | [[wiki/concepts/Trading-Psychology\|Trading Psychology]] |
| 5 | Trend Following | [[wiki/concepts/Trend-Following\|Trend Following]] |
| 6 | Algorithmic Trading | [[wiki/concepts/Algorithmic-Trading\|Algorithmic Trading]] |
| 7 | Backtesting | [[wiki/concepts/Backtesting\|Backtesting]] |
| 8 | Expert Advisor | [[wiki/concepts/Expert-Advisor\|Expert Advisor]] |
| 9 | MQL | [[wiki/concepts/MQL\|MQL]] |
| 10 | Economic Calendar | [[wiki/concepts/Economic-Calendar\|Economic Calendar]] |
| 11 | Economic Indicators | [[wiki/concepts/Economic-Indicators\|Economic Indicators]] |
| 12 | Order Types | [[wiki/concepts/Order-Types\|Order Types]] |
| 13 | Broker Selection | [[wiki/concepts/Broker-Selection\|Broker Selection]] |

## Entity List

### People
| # | Person | Contribution | Page |
|---|--------|-------------|------|
| 1 | Alexander Elder | Trading for a Living author | [[wiki/entities/Alexander-Elder\|Alexander Elder]] |

### Platforms & Tools
| # | Entity | Type | Page |
|---|--------|------|------|
| 2 | MetaTrader | Trading Platform | [[wiki/entities/MetaTrader\|MetaTrader]] |
| 3 | MT4 | Platform Version | [[wiki/entities/MT4\|MT4]] |
| 4 | MT5 | Platform Version | [[wiki/entities/MT5\|MT5]] |
| 5 | Forex Factory | Data Source | [[wiki/entities/Forex-Factory\|Forex Factory]] |

### Institutions
| # | Entity | Type | Page |
|---|--------|------|------|
| 6 | Federal Reserve / FOMC | Central Bank | [[wiki/entities/Federal-Reserve-FOMC\|Federal Reserve]] |
| 7 | ECB | Central Bank | [[wiki/entities/ECB-European-Central-Bank\|ECB]] |

## Compilation Rules

1. **raw/ Read-only**: AI never modifies raw materials
2. **Sources Required**: All wiki pages must have `## Sources` section
3. **Link Priority**: Use `[[]]` for knowledge connections
4. **Incremental Compile**: Update existing pages, avoid duplicates
5. **Elder Framework**: Psychology + Method + Money as organizing principle
6. **Chinese Aliases**: Preserve Chinese names in `aliases:` frontmatter

## Cross-Library Links

| Classification | Link |
|----------------|------|
| DDC 330 Economics | [[../330-经济学\|Economics]] — Macro & micro foundations |
| DDC 332.6 Parent | [[../07-金融与货币/07-金融与货币\|Finance & Money]] — Capital markets |
| Finance Practice | [[3 Resources/finance/\|finance/]] — Personal finance management |
| Mathematics | [[3 Resources/500 Natural Sciences/510-Mathematics/README\|DDC 510 Math]] — Probability & statistics |
| Behavioral Science | [[../05-行为经济学/05-行为经济学\|Behavioral Economics]] — Decision biases |
| Knowledge Systems | [[3 Resources/000 Knowledge/000 Knowledge\|000 Knowledge]] — KOS & PKM methods |

## Commands

- `/wiki-compile 332.6` — Compile this knowledge base
- `/triage 332.6` — Triage new materials to raw/
