---
created: 2026-05-26
type: compile-log
topic: finance
---

# Finance Wiki 编译日志

## 2026-05-27 | 首次编译 — MetaTrader 知识库

**状态**: success

**来源**: 网络搜索 (MetaTrader 官方文档, 百度百科, MQL5 社区)

**概念页** (3):
- `concepts/Algorithmic-Trading.md` — 算法交易方法论
- `concepts/Expert-Advisor.md` — EA 智能交易系统
- `concepts/MQL.md` — MQL4/MQL5 编程语言

**实体页** (3):
- `entities/MetaTrader.md` — MetaTrader 平台总览
- `entities/MT4.md` — MetaTrader 4
- `entities/MT5.md` — MetaTrader 5

**概念关系**:
```
Algorithmic-Trading ←→ Expert-Advisor (EA 是实现)
Expert-Advisor ←→ MQL (MQL 是语言)
MetaTrader ←→ MT4 (包含)
MetaTrader ←→ MT5 (包含)
MT4 ←→ MQL4 (绑定)
MT5 ←→ MQL5 (绑定)
```

**后续计划**:
- [ ] 添加 Backtesting 策略回测概念页
- [ ] 添加 Risk-Management 风险管理概念页
- [ ] 添加 Technical-Analysis 技术分析概念页
- [ ] 添加 MetaQuotes 公司实体页
- [ ] 添加 TradingView 竞品实体页

## 2026-05-26

系统初始化完成，等待首次编译操作。
