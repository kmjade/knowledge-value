---
aliases: [Enterpy Trade System, Enterpy EA]
created: 2026-06-05
updated: 2026-06-05
type: concept
topic: finance
lifecycle: operational
status: active
tags: [finance, mql4, mql5, turtle-trading, ea]
---

# Enterpy Trade 系统 — 设计说明书 v0.1

> 基于海龟交易法则的 MQL4/MQL5 双平台自动交易系统。

---

## 1. 系统概述

### 1.1 定位

**Enterpy Trade System** 是一个运行在 MetaTrader 4/5 平台上的整合型自动交易 EA（Expert Advisor），以海龟交易法则为核心策略引擎，采用模块化架构设计，支持未来策略扩展。

### 1.2 设计原则

| 原则 | 说明 |
|------|------|
| **双平台兼容** | 同一套设计同时适配 MQL4 和 MQL5 API 差异 |
| **模块化** | 信号引擎、风控引擎、执行引擎松耦合 |
| **可扩展** | 策略接口标准化，新策略即插即用 |
| **防御性编程** | 极端行情保护、重启恢复、日志完备 |

### 1.3 与现有架构的关系

```
2 Areas/03-Finance/
├── Enterpy Trade 系统/           ◄── 本系统（设计文档 + EA 代码）
├── daily-trade/                  交易日志（Enterpy 输出落地）
├── market-analysis/              市场分析（人工研判，与 EA 互补）
├── economic-calendar/            经济日历（风控输入参考）
└── ...
└── 3 Resources/300/332.6-Investment-and-Trading/wiki/  ← 知识沉淀
```

---

## 2. 系统架构

### 2.1 整体架构

```
┌─────────────────────────────────────────────────────────────┐
│                     Enterpy Trade System                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │   📡 DATA LAYER     数据层                            │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────┐  │  │
│  │  │ 价格数据      │  │ ATR 计算      │  │ Donchian   │  │  │
│  │  │ (H/L/C/Vol) │  │ (SMA/EMA)    │  │ 通道       │  │  │
│  │  └──────────────┘  └──────────────┘  └────────────┘  │  │
│  └──────────────────────────┬────────────────────────────┘  │
│                             │                               │
│  ┌──────────────────────────▼────────────────────────────┐  │
│  │   🧠 STRATEGY LAYER   策略层                         │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │  IStrategy 接口                                  │  │  │
│  │  │  ├── CTurtleStrategy_S1  (快速: 20日系统)        │  │  │
│  │  │  ├── CTurtleStrategy_S2  (慢速: 55日系统)        │  │  │
│  │  │  └── (预留: 未来策略)                            │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  └──────────────────────────┬────────────────────────────┘  │
│                             │                               │
│  ┌──────────────────────────▼────────────────────────────┐  │
│  │   ⚡ EXECUTION LAYER   执行层                         │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────┐  │  │
│  │  │ 仓位计算      │  │ 订单管理      │  │ 头寸追踪   │  │  │
│  │  │ (Unit Sizing)│  │ (Order Mgmt)│  │ (Position) │  │  │
│  │  └──────────────┘  └──────────────┘  └────────────┘  │  │
│  └──────────────────────────┬────────────────────────────┘  │
│                             │                               │
│  ┌──────────────────────────▼────────────────────────────┐  │
│  │   🛡️ RISK LAYER       风控层                         │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────┐  │  │
│  │  │ 硬止损 2ATR   │  │ 净值回撤保护   │  │ 最大仓位   │  │  │
│  │  │ (Hard SL)    │  │ (DD Protect)│  │ (Max Pos)  │  │  │
│  │  └──────────────┘  └──────────────┘  └────────────┘  │  │
│  └──────────────────────────┬────────────────────────────┘  │
│                             │                               │
│  ┌──────────────────────────▼────────────────────────────┐  │
│  │   📊 LOGGING LAYER     日志层                         │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────┐  │  │
│  │  │ 交易日志      │  │ 绩效统计      │  │ 错误监控   │  │  │
│  │  │ (Trade Log)  │  │ (Stats)     │  │ (Errors)   │  │  │
│  │  └──────────────┘  └──────────────┘  └────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 数据流

```
每个 Tick 事件:
    OnTick()
      │
      ├── 1. 数据更新 → 更新价格缓冲区 + ATR + Donchian
      │
      ├── 2. 风控检查 → 净值回撤是否超限？
      │     ├── 超限 → 全部平仓，停止交易
      │     └── 正常 → 继续
      │
      ├── 3. 已持仓检查
      │     ├── 3a. 是否有出场信号？ → 出场逻辑
      │     └── 3b. 是否满足加仓条件？ → 加仓逻辑
      │
      ├── 4. 新开仓检查
      │     ├── 是否有入场信号？ → 开仓逻辑
      │     └── 无 → 等待下一 Tick
      │
      └── 5. 日志/状态更新
```

---

## 3. 海龟策略规格 (Turtle Trading Specification)

### 3.1 双系统

| 参数 | S1 (快速) | S2 (慢速) |
|:----:|:---------:|:---------:|
| 入场突破 | 20日 高点/低点 | 55日 高点/低点 |
| 出场反向突破 | 10日 反向 | 20日 反向 |
| 系统状态 | 🏃 活跃 | 🐢 活跃 |
| 信号优先级 | 两系统独立运行，可同时持仓 |

### 3.2 单位计算 (Unit Sizing)

```
1 Unit = 账户余额 × 风险比率 ÷ (ATR × 每点价值)

默认参数:
  - 风险比率:      1%  (可配置 0.5%–2%)
  - ATR 周期:      20
  - ATR 平滑方式:  简单移动平均 (SMA)
  - 每点价值:      根据交易品种自动获取
```

### 3.3 加仓规则 (Pyramiding)

```
Level  入场条件              仓位
────────────────────────────────────
 1st   N日高点突破          1 Unit
 2nd   价格 ↑  ½ATR         +1 Unit  (总 2U)
 3rd   价格 ↑  ½ATR         +1 Unit  (总 3U)
 4th   价格 ↑  ½ATR         +1 Unit  (总 4U)

上限: 最多 4 个单位
间隔: 每 ½ATR 加 1 单位（以入场价为基准）
```

### 3.4 止损规则 (Stop Loss)

| 类型 | 规则 | 说明 |
|:----:|:----|------|
| 全仓止损 | 当前价格反向 2ATR | 所有单位统一止损 |
| 盈亏平衡止损 | 价格涨超 1ATR 后，止损移至盈亏平衡 | 保护已实现利润 |
| 追踪止损 | 价格有利方向每涨 1ATR，止损上移 ½ATR | 锁定利润 |

### 3.5 出场规则 (Exit)

| 系统 | 多头出场 | 空头出场 |
|:----:|:--------:|:--------:|
| S1 | 价格跌破 10日低点 | 价格突破 10日高点 |
| S2 | 价格跌破 20日低点 | 价格突破 20日高点 |
| 止损出场 | 2ATR 硬止损 | 2ATR 硬止损 |

> 出场信号触发时，该系统的**所有持仓全部平仓**。

### 3.6 风险配置

| 参数 | 默认值 | 说明 |
|:----:|:------:|:------|
| 1 Unit 风险 | 账户的 1% | 核心风控参数 |
| 硬止损 | 2 ATR | 每个单位入场后设置 |
| 最大持仓 | 8 Units（S1+S2 各 4） | 满仓状态 |
| 最大总风险 | 账户的 8% | 极端情况 |
| 净值回撤警戒 | 20% | 全部平仓，暂停交易 |
| 净值回撤恢复 | 回到 10% 以内 | 恢复交易 |

---

## 4. MQL4/MQL5 兼容层设计

### 4.1 API 差异映射

这是双平台开发的核心挑战。兼容策略如下：

| 功能 | MQL4 | MQL5 | 兼容方案 |
|:----:|:----:|:----:|:---------|
| 订单函数 | `OrderSend/SELECT` | `PositionSelect/OrderSend` | 封装 `CTrade` 类 |
| 定时器 | `Start()` → 循环 | `OnTimer()` | 宏定义统一入口 |
| 指标句柄 | `iATR()` 直接调用 | `iATR()` → Handle | 封装 `CIndicator` 类 |
| 持仓判断 | `OrdersTotal()` | `PositionsTotal()` | 封装 `CPositionManager` |
| 订单类型 | `OP_BUY` | `POSITION_TYPE_BUY` | 统一枚举 |
| 订单修改 | `OrderModify()` | `PositionSelect()` + `Trade.PositionModify()` | 封装 |
| 历史订单 | `OrderHistoryTotal()` | `HistorySelect()` | 封装 |

### 4.2 宏定义统一入口

```cpp
// --- CompatLayer.mqh ---
#ifdef __MQL4__
   #define ENTERPY_START   int start() {
   #define ENTERPY_TICK    OnTick()
   #define ENTERPY_INIT    int init() {
   #define ENTERPY_DEINIT  int deinit() {
   // MQL4 订单类型映射
   #define POSITION_TYPE_BUY   OP_BUY
   #define POSITION_TYPE_SELL  OP_SELL
#else
   #define ENTERPY_START   void OnTick() {
   // MQL5 不需要 start/init/deinit 映射
#endif
```

---

## 5. 文件结构

### 5.1 EA 文件目录 (MetaTrader 标准结构)

采用 MQL4/MQL5 标准目录结构，以 `Enterpy` 子目录统一分包：

```
MQL4/  ────────────────────────── 或 ──────  MQL5/
│                                              │
├── Experts/Enterpy/              # EA 主文件
│   ├── Enterpy.mq4               # MQL4 主入口
│   └── Enterpy.mq5               # MQL5 主入口
│
├── Include/Enterpy/              # 包含文件 (.mqh)
│   ├── CompatLayer.mqh           # MQL4/MQL5 兼容层
│   ├── Config.mqh                # 全局配置
│   ├── Data/
│   │   ├── PriceData.mqh         # 价格数据管理
│   │   └── Indicators.mqh        # ATR / Donchian 指标
│   ├── Strategy/
│   │   ├── IStrategy.mqh         # 策略接口
│   │   ├── TurtleS1.mqh          # 海龟 S1 (20日)
│   │   └── TurtleS2.mqh          # 海龟 S2 (55日)
│   ├── Execution/
│   │   ├── PositionManager.mqh   # 头寸管理
│   │   ├── OrderManager.mqh      # 订单执行
│   │   └── UnitSizing.mqh        # 仓位计算
│   ├── Risk/
│   │   ├── RiskManager.mqh       # 风控引擎
│   │   └── DrawdownMonitor.mqh   # 回撤监控
│   └── Utils/
│       ├── Logger.mqh            # 日志系统
│       └── FileIO.mqh            # 文件读写
│
├── Indicators/Enterpy/           # 自定义指标
│   ├── Enterpy_ATR.mq4           # ATR 指标封装
│   ├── Enterpy_Donchian.mq4      # Donchian 通道
│   └── (按需扩展)
│
└── Images/Enterpy/               # 图片资源
    ├── logo.bmp
    └── (屏幕截图/图表模板)
```

### 5.2 相关文档

| 文档 | 说明 |
|:-----|:------|
| [[Enterpy Trade 系统\|主设计说明书]] | 架构设计、参数规格、开发路线图 |
| [[docs/01-原型实现报告\|原型实现报告 v0.1]] | MQL 代码骨架、类关系、OnTick 流程、风控引擎 |

### 5.3 Obsidian 知识体系

```
Enterpy Trade 系统/               # Obsidian 设计文档
├── Enterpy Trade 系统.md         ◄── 本文档（设计说明书）
├── docs/                         # 补充文档
│   ├── 01-参数参考.md
│   ├── 02-MQL4移植指南.md
│   └── 03-策略开发指南.md
│
└── ref/                          # 参考资料
    └── (相关文章/笔记)
```

```
3 Resources/300/332.6-Investment-and-Trading/wiki/
├── concepts/
│   ├── 海龟交易法则.md        ← Enterpy 核心策略来源
│   ├── 仓位计算.md            ← Unit Sizing 概念
│   └── ATR.md                 ← ATR 指标概念
└── entities/
    └── Richard Dennis.md       ← 海龟策略创始人
```

---

## 6. 模块规格说明

### 6.1 策略接口 (IStrategy)

```cpp
class IStrategy {
public:
    // 入场信号
    virtual bool ShouldEnterLong()   = 0;
    virtual bool ShouldEnterShort()  = 0;

    // 出场信号
    virtual bool ShouldExitLong()    = 0;
    virtual bool ShouldExitShort()   = 0;

    // 加仓信号
    virtual bool ShouldAddToPosition(bool isLong) = 0;

    // 止损价格
    virtual double GetStopLossPrice(bool isLong, double entryPrice) = 0;

    // 状态更新
    virtual void OnTick() = 0;

    // 策略名称
    virtual string GetName() = 0;
};
```

### 6.2 风控引擎 (RiskManager)

| 检查项 | 触发动作 | 优先级 |
|:-------|:---------|:------:|
| 单笔止损 2ATR | 该单位平仓 | P0 |
| 净值回撤 > 20% | 全部平仓，停止交易 | P0 |
| 净值回撤回到 ≤10% | 恢复交易 | P1 |
| 总持仓 > 8 Units | 拒绝新开仓/加仓 | P1 |
| 单品种集中度 > 30% | 警告 | P2 |

### 6.3 日志系统 (Logger)

```
每笔交易记录内容:
  [Time] [Action] [Symbol] [Type] [Lots] [Price] [SL] [TP] [Balance]

文件输出:
  Enterpy_YYYY-MM-DD.log        // 每日运行日志
  Enterpy_Trades_YYYY-MM.csv    // 交易记录（可导入 Excel）
  Enterpy_Stats.txt             // 绩效统计摘要
```

---

## 7. 开发路线图

### Phase 1 — 核心引擎 (P0)

| # | 任务 | 产出 |
|:-:|:-----|:-----|
| 1 | 兼容层 `CompatLayer.mqh` | MQL4/MQL5 宏封装 |
| 2 | 数据模块 `PriceData` + `Indicators` | ATR / Donchian |
| 3 | 单位计算 `UnitSizing` | 动态仓位算法 |
| 4 | 风控引擎 `RiskManager v1` | 止损 + 回撤保护 |

### Phase 2 — 海龟策略 (P1)

| # | 任务 | 产出 |
|:-:|:-----|:-----|
| 5 | `IStrategy` 接口 | 策略基类 |
| 6 | `TurtleS1` (20日系统) | S1 入场/出场/加仓 |
| 7 | `TurtleS2` (55日系统) | S2 入场/出场/加仓 |
| 8 | `OrderManager` | 订单执行 |
| 9 | `PositionManager` | 头寸追踪 |

### Phase 3 — 完整 EA (P1)

| # | 任务 | 产出 |
|:-:|:-----|:-----|
| 10 | `Enterpy.mq4` 主入口 | MQL4 可运行 EA |
| 11 | `Enterpy.mq5` 主入口 | MQL5 可运行 EA |
| 12 | 日志系统 `Logger` | 文件输出 + 统计 |
| 13 | 参数配置 `Config.mqh` | 外部参数界面 |

### Phase 4 — 验证与优化 (P2)

| # | 任务 | 产出 |
|:-:|:-----|:-----|
| 14 | MQL4 策略测试器回测 | 历史绩效报告 |
| 15 | MQL5 策略测试器回测 | 历史绩效报告 |
| 16 | 参数优化 (Optimization) | 最优参数集 |
| 17 | 模拟盘测试 | 实盘准备 |

---

## 8. 配置参数 (Input)

以下为 EA 的外部可调参数（输入面板）：

```cpp
// === 海龟策略参数 ===
input int    Turtle1_Period     = 20;    // S1 突破周期
input int    Turtle1_ExitPeriod = 10;    // S1 出场周期
input int    Turtle2_Period     = 55;    // S2 突破周期
input int    Turtle2_ExitPeriod = 20;    // S2 出场周期
input int    ATR_Period         = 20;    // ATR 计算周期

// === 仓位管理 ===
input double Risk_Percent       = 1.0;   // 每单位风险 (%)
input int    MaxUnits           = 4;     // 每个系统最大单位
input double AddUnitStep        = 0.5;   // 加仓步长 (ATR 倍数)

// === 止损 ===
input double StopLoss_ATR       = 2.0;   // 硬止损 (ATR 倍数)
input double Breakeven_ATR      = 1.0;   // 盈亏平衡触发 (ATR)

// === 风控 ===
input double Max_DD_Percent     = 20.0;  // 最大回撤暂停 (%)
input double Resume_DD_Percent  = 10.0;  // 恢复交易回撤 (%)

// === 交易管理 ===
input bool   UseS1              = true;  // 启用 S1 系统
input bool   UseS2              = true;  // 启用 S2 系统
input double Lot_Size           = 0;     // 固定手数 (0=自动)
input int    MagicNumber        = 20240605;  // Magic Number
input string Comment            = "Enterpy";
```

---

## 9. 后续策略扩展预留

在设计 `IStrategy` 接口时预留了扩展点，后期添加新策略只需：

```
1. 新建 CMyNewStrategy.mqh → 实现 IStrategy
2. 在 Enterpy.mq4/.mq5 中注册策略
3. 配置参数 → 完成
```

候选策略（待定）：
| 策略 | 类型 | 是否调研 |
|:-----|:-----|:--------:|
| 双均线交叉 | 趋势 | ❌ |
| 布林带反转 | 均值回归 | ❌ |
| 网格交易 | 震荡 | ❌ |
| 自定义突破系统 | 趋势 | ❌ |

---

## 附录

### A. 参考资料

- [海龟交易法则](https://en.wikipedia.org/wiki/Turtle_trader) — Curtis Faith
- MQL4 官方文档: https://docs.mql4.com/
- MQL5 官方文档: https://www.mql5.com/en/docs

### B. 版本记录

| 版本 | 日期 | 变更 |
|:----:|:----:|:-----|
| v0.1 | 2026-06-05 | 初始设计说明书，海龟策略规格定稿 |
