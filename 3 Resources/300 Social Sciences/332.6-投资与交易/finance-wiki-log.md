---
created: 2026-05-26
type: compile-log
topic: finance
---

# Finance Wiki 编译日志

## 2026-05-27 | 二次编译 — 从 raw/ 深度提取

**状态**: success

**源文件** (12):
- `raw/MetaTrader/` — 8 大主题，12 个文件

**新增概念页** (3):
- `concepts/Backtesting.md` — 策略回测（从 05 提取）
- `concepts/Risk-Management.md` — 风险管理（从 06 提取）
- `concepts/Technical-Analysis.md` — 技术分析（从 03 提取）

**新增来源页** (1):
- `sources/source-MetaTrader-Raw.md` — 原始资料索引

**更新**:
- `wiki/index.md` — 从 3/3/0 更新为 6/3/1

**先前编译** (首次 — 网络搜索):
- `concepts/Algorithmic-Trading.md`
- `concepts/Expert-Advisor.md`
- `concepts/MQL.md`
- `entities/MetaTrader.md`
- `entities/MT4.md`
- `entities/MT5.md`

**完整概念网络**:
```
Algorithmic-Trading
    ├── Expert-Advisor    (EA 是实现)
    ├── Backtesting       (验证策略)
    ├── Risk-Management   (生存法则)
    └── Technical-Analysis (信号基础)
            │
        MQL (编程语言)
            │
    MetaTrader (平台)
        ├── MT4 (MQL4)
        └── MT5 (MQL5)
```

---

## 2026-05-26

系统初始化完成，等待首次编译操作。
