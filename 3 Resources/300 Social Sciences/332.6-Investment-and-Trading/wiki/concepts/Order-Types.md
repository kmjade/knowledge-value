---
aliases:
  - 订单类型
  - 挂单类型
  - Order Types
created: 2026-05-27
type: concept
topic: 332.6-Investment-and-Trading
status: reviewed
---

# Order Types (订单类型)

## 定义

订单类型定义了交易如何被触发和执行。MetaTrader 支持市价单（即时执行）和多种挂单（条件触发），MT4 支持 4 种，MT5 支持 6 种。

## 核心原理

### 市价单 vs 挂单

```
市价单 (Market Order)
  → 按当前最佳价格立即成交
  → 买入按 Ask 价，卖出按 Bid 价

挂单 (Pending Order)
  → 当价格到达指定条件时触发执行
  → 4 种（MT4）/ 6 种（MT5）
```

### MT4 订单类型 (4 种)

| 订单 | 方向 | 触发条件 |
|------|------|----------|
| **Market** | — | 即时成交 |
| **Buy Limit** | 做多 | 价格下跌到指定位置后买入 |
| **Sell Limit** | 做空 | 价格上涨到指定位置后卖出 |
| **Buy Stop** | 做多 | 价格上涨到指定位置后追多 |
| **Sell Stop** | 做空 | 价格下跌到指定位置后追空 |

### MT5 新增 (6 种)

| 新增订单 | 说明 |
|----------|------|
| **Buy Stop Limit** | 价格到触发价后，下买入限价单 |
| **Sell Stop Limit** | 价格到触发价后，下卖出限价单 |
| **Stop Loss** | 止损（MT5 独立管理） |
| **Take Profit** | 止盈（MT5 独立管理） |

## 关键要点

1. **Limit vs Stop** — Limit 等待回调，Stop 追趋势
2. **滑点风险** — 市价单在波动大时可能出现滑点
3. **挂单有效期** — 可设置 GTC (永久) 或日终过期
4. **MT5 更强** — 6 种订单类型 + 独立止损止盈管理

### 选择指南

```
挂单交易策略:
├── Limit  → 震荡市（高抛低吸）
├── Stop   → 趋势市（突破追入）
└── Market → 需要立即成交（新闻/事件）
```

## 相关概念

- [[Risk-Management]] — 止损止盈是风控核心
- [[Technical-Analysis]] — 技术位决定挂单价格
- [[Expert-Advisor]] — EA 自动管理订单

## 相关实体

- [[MT4]] — 4 种订单类型
- [[MT5]] — 6 种订单类型，更灵活

## Sources

- [[3 Resources/finance/raw/MetaTrader/02-界面与操作/02-界面与操作.md]]
