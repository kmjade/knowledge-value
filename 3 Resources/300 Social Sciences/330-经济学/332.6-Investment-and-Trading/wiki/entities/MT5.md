---
aliases:
  - MT5
  - MetaTrader 5
created: 2026-05-27
type: entity
entity_type: platform
topic: 332.6-Investment-and-Trading
status: reviewed
---

# MetaTrader 5 (MT5)

## 基本信息

| 属性 | 值 |
|------|------|
| **类型** | 多资产交易平台 |
| **版本** | MetaTrader 5 |
| **发布** | 2010 年 |
| **架构** | 64 位、多线程 |
| **编程语言** | MQL5（面向对象，类 C++） |
| **官网** | https://www.metatrader5.com |

## 描述

MT5 是 MetaTrader 的全面升级版，从单一外汇交易平台扩展为**多资产综合交易平台**。凭借 64 位多线程架构、增强的策略测试器和 MQL5 编程语言，已成为 2026 年算法交易和专业交易者的主流选择。

## 核心功能

### 图表分析
- **21 种时间框架** — 含 M2, M3, M10, M12, H2, H3, H6, H8, H12 等中间周期
- **38 种内置技术指标**
- **44 种分析对象**
- **市场深度 (DOM)** — 实时查看流动性

### 订单类型 (6 种)
| 订单 | 说明 |
|------|------|
| Market | 市价单 |
| Limit | 限价单 |
| Stop | 止损单 |
| Stop Limit | 止损限价单 |
| Buy Stop Limit | 买入止损限价 |
| Sell Stop Limit | 卖出止损限价 |

### 策略测试器
- **多线程回测** — 速度远超 MT4
- **多币种同时测试** — 跨品种策略验证
- **可视化模式** — 逐笔回放交易过程
- **优化模式** — 参数遗传算法优化

### 其他增强
- 内置经济日历
- 对冲 + 单边净额结算双模式
- MQL5 云端存储和协作
- 支持 OpenCL GPU 加速

## MT4 vs MT5 对比

| 维度 | MT4 | MT5 |
|------|-----|-----|
| 时间框架 | 9 | 21 |
| 内置指标 | 30 | 38 |
| 订单类型 | 4 | 6 |
| 架构 | 32 位单线程 | 64 位多线程 |
| 市场深度 | ❌ | ✅ |
| 经济日历 | ❌ | ✅ |
| 回测能力 | 单币种 | 多币种多线程 |
| 编程语言 | MQL4 | MQL5 (快 20 倍) |
| 学习难度 | ⭐⭐ | ⭐⭐⭐ |

## 适用场景

- ✅ 多资产交易者（外汇+股票+商品）
- ✅ 算法交易 / EA 开发者
- ✅ 短线/高频交易者
- ✅ 需要高级回测的策略研究员
- ✅ 专业交易者和 Prop Firm

## 相关实体

- [[3 Resources/300 Social Sciences/330-经济学/332.6-Investment-and-Trading/wiki/entities/MetaTrader]] — 母公司/系列
- [[MT4]] — 前代版本
- [[MetaQuotes-Software]] — 开发商

## Sources

- [MT5 官方网站](https://www.metatrader5.com)
- [MT4 vs MT5 Comparison](https://www.markets.com/education-centre/mt-4-vs-mt-5-key-differences-explained)
