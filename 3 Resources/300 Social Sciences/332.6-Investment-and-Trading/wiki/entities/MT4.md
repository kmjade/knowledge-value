---
aliases:
  - MT4
  - MetaTrader 4
created: 2026-05-27
type: entity
entity_type: platform
topic: 332.6-Investment-and-Trading
status: reviewed
---

# MetaTrader 4 (MT4)

## 基本信息

| 属性 | 值 |
|------|------|
| **类型** | 外汇交易平台 |
| **版本** | MetaTrader 4 |
| **发布** | 2005 年 |
| **架构** | 32 位、单线程 |
| **编程语言** | MQL4（面向过程） |
| **官网** | https://www.metatrader4.com |

## 描述

MT4 是全球最经典的零售外汇交易平台，以简洁易用、资源占用低和庞大的社区生态著称，至今仍是许多外汇经纪商的首选平台。

## 核心功能

### 图表分析
- **9 种时间框架** — M1, M5, M15, M30, H1, H4, D1, W1, MN
- **30 种内置技术指标** — 趋势、震荡、成交量等分类
- **24 种分析对象** — 趋势线、通道、斐波那契等绘图工具
- **自定义指标** — MQL4 编写扩展指标

### 自动交易 (EA)
- 支持 MQL4 编写的 Expert Advisor (EA)
- 可 24/7 无人值守运行
- 内置策略测试器（单币种回测）

### 订单类型
- 市价单 (Market)
- 限价单 (Limit)
- 止损单 (Stop)
- 跟踪止损 (Trailing Stop)

### 系统要求
- 最低 512MB 内存
- Windows 7 及以上
- 适合低配置/VPS 运行

## 优势与劣势

| 优势 | 劣势 |
|------|------|
| 界面简洁，学习曲线低 | 仅 4 种订单类型 |
| 资源占用极低 | 不支持市场深度 (DOM) |
| 庞大的 EA 社区生态 | 无内置经济日历 |
| 20 年稳定运行验证 | 单线程回测效率低 |
| 经纪商广泛支持 | 主要面向外汇，多资产支持弱 |

## 适用场景

- ✅ 外汇初学者
- ✅ 手动外汇交易者
- ✅ 低配置硬件 / VPS 用户
- ✅ 已有大量 MQL4 代码的老用户
- ❌ 需要交易股票/期货的用户
- ❌ 高级算法交易策略

## 相关实体

- [[MetaTrader]] — 母公司/系列
- [[MT5]] — 升级版本
- [[MetaQuotes-Software]] — 开发商

## Sources

- [MT4 官方网站](https://www.metatrader4.com)
- [MetaTrader 百度百科](https://baike.baidu.com/item/MetaTrader)
