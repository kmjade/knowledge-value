---
aliases: [Enterpy 原型设计, 系统设计说明书]
created: 2026-06-05
type: design
topic: finance
tags: [finance, mql4, mql5, turtle-trading, design, architecture]
---

# Enterpy Trade 原型设计说明书 v1.0

> 从零到一设计一个 MQL4/MQL5 双平台海龟交易 EA。本文档聚焦"为什么这样设计"，是编码前的架构决策记录。

---

## 1. 设计目标与原则

### 1.1 目标

| 目标 | 说明 |
|:-----|:-----|
| 双平台兼容 | 同一套设计同时适配 MQL4 和 MQL5，避免维护两套代码 |
| 策略可插拔 | 新增策略只需实现接口，不改动核心引擎 |
| 风控硬隔离 | 风控逻辑独立于策略逻辑，回撤保护为最高优先级 |
| 日志可审计 | 每笔交易可追溯，支持 CSV 导出做历史分析 |

### 1.2 设计原则

| 原则 | 含义 | 实现方式 |
|:-----|:-----|:--------|
| **分层解耦** | 数据、策略、执行、风控、日志五层独立 | 每层一个子目录，层间通过接口通信 |
| **最少知识** | 模块只知道自己需要的东西 | `UnitSizing` 不拿 `CIndicators*`，只接 ATR 值 |
| **防御性编码** | 假设一切可能出错 | 回撤超限全平、EA 重载状态同步、Tick 级入场防抖 |
| **约定优于配置** | 默认参数覆盖 80% 场景 | 海龟原版参数为默认值，用户只需调风险偏好 |

---

## 2. 架构设计

### 2.1 五层架构

```
┌─────────────────────────────────────────────┐
│                  Enterpy EA                   │
│           OnTick() 主循环                     │
├─────────────────────────────────────────────┤
│  ① Data Layer    价格 / ATR / Donchian      │
│  ② Strategy Layer  入场 / 出场 / 加仓信号     │
│  ③ Execution Layer  仓位 / 订单 / 头寸       │
│  ④ Risk Layer     止损 / 回撤 / 集中度       │
│  ⑤ Logging Layer  日志 / CSV / 统计          │
└─────────────────────────────────────────────┘
```

**层间数据流**：

```
OnTick()
  │
  ├─→ PriceData.OnTick()              → 刷新 Bid/Ask/Point
  │
  ├─→ RiskManager.CanTrade()          → DD 超限？全平+暂停
  │     └─ DrawdownMonitor.Check()     → 峰值水位线对比
  │
  ├─→ UnitSizing.Recalculate(atr)     → 动态 1 Unit = f(净值, ATR)
  │
  ├─→ [S1] Indicators.GetSignal()     → Donchian 突破判断
  │     ├─ 已持仓 → ShouldExit?       → 出场逻辑
  │     ├─ 已持仓 → ShouldAddUnit?    → 加仓逻辑
  │     └─ 空仓   → ShouldEnter?      → 入场逻辑
  │
  ├─→ [S2] 同上                        → 独立运行
  │
  └─→ Logger.WriteStats()             → 持久化
```

### 2.2 为什么是五层而不是三层

常见的 MVC 三层架构（Model-View-Controller）不适合 EA：

- EA 没有 View——它在后台运行
- 策略（Strategy）和执行（Execution）职责不同：策略决定"要不要做"，执行决定"怎么做"
- 风控需要在策略和执行之间插入一个强制检查点

因此将 Model 拆为 Data + Strategy + Risk + Execution 四层，加上 Logging 作为横切层。

---

## 3. 模块接口设计

### 3.1 CompatLayer — 双平台兼容层

**设计目标**：让共享 `.mqh` 文件写一次、编译两次。

**方案**：MQL4 端模拟 MQL5 类接口，MQL5 端直接用原生类。

```
       共享 .mqh 代码 (14 个文件)
       │  使用 CTrade / CPositionInfo / CIndicator
       │
  ┌────┴────┐
  │         │
  MQL4      MQL5
  │         │
  CTradeCompat    CTrade (原生)
  CPositionInfo-  CPositionInfo (原生)
  Compat          │
  CIndicator-     CIndicator (薄封装)
  Compat
```

**关键决策**：
- 类型别名用 `#define` 而非 `typedef`（MQL4 对类类型的 typedef 不稳定）
- 入口函数用宏统一：`ENTERPY_ON_INIT` → `init()` / `OnInit()`
- 方法命名避开 MQL4 内置函数：`Comment` → `PositionComment`、`OrderClosePrice` → `GetOrderClosePrice`

### 3.2 IStrategy — 策略接口

```cpp
class IStrategy {
    virtual bool ShouldEnterLong()   = 0;  // 多头入场信号
    virtual bool ShouldEnterShort()  = 0;  // 空头入场信号
    virtual bool ShouldExitLong()    = 0;  // 多头出场信号
    virtual bool ShouldExitShort()   = 0;  // 空头出场信号
    virtual bool ShouldAddToPosition(bool isLong) = 0;  // 加仓信号
    virtual double GetStopLossPrice(bool isLong, double entry) = 0;  // 止损价
    virtual void OnTick()            = 0;  // 每 Tick 更新
    virtual string GetName()         = 0;  // 策略名称
};
```

**设计考量**：
- 没有 `ShouldSetTakeProfit()`——海龟策略不用止盈，靠出场信号
- `GetStopLossPrice` 返回价格而非 true/false——不同策略止损算法不同
- `OnTick()` 留给策略做内部状态维护（如计算移动平均）

### 3.3 策略状态管理

策略本身不管理持仓——它只管信号。持仓状态由 `CPositionManager` 管理，但策略内部有 `m_active` / `m_currentUnits` 用于加仓逻辑。

**状态同步**：EA 每 Tick 将实际持仓数与策略状态对齐：

```
if (posMgr.Count() > 0 && !strategy.IsActive()) {
    strategy.OnEntry(isLong, avgPrice);   // 恢复状态
}
if (posMgr.Count() == 0 && strategy.IsActive()) {
    strategy.OnExit();                    // 清理残留
}
```

这解决了 EA 重载、手动平仓等异常场景下的状态不一致。

---

## 4. 海龟策略设计

### 4.1 双系统独立运行

S1 和 S2 各有自己的：
- 持仓状态（可同时持有多头和空头？不，同品种同方向）
- 加仓层级
- 出场信号

两个系统**可以同时持有同方向仓位**——这是海龟原版的设计，目的是捕捉不同时间尺度的趋势。

### 4.2 Donchian 突破判断

```
突破做多条件：
  prevClose ≤ prevHigh && curClose > prevHigh

突破做空条件：
  prevClose ≥ prevLow  && curClose < prevLow
```

**为什么用收盘价**：避免日内假突破。海龟原版用收盘价判断，EA 在每根新 K 线开盘时检查上一根 K 线的收盘价。

### 4.3 金字塔加仓

```cpp
// 加仓触发价 = 入场价 + 当前单位数 × 步长 × ATR
double stepPrice = m_entryPrice + currentUnits * 0.5 * atr;

// 防重复触发：同一价位只加一次
if (triggered && m_lastAddPrice != stepPrice) {
    m_lastAddPrice = stepPrice;
    return true;
}
```

**设计考量**：
- `m_lastAddPrice` 防止同一 Tick 重复加仓
- 每次加仓以首单入场价为基准计算间距，而非上一单的价格
- 第 4 次加仓后总持仓 = 4 Units，此时 `m_maxUnits` 拦截

---

## 5. 风控设计

### 5.1 优先级体系

```
P0 (硬止损)       > P1 (仓位限制)     > P2 (集中度预警)
├─ 2 ATR 止损     ├─ 每系统 ≤4U      ├─ 单品种 ≤30% 净值
├─ DD > 20% 全平  ├─ 双系统 ≤8U      └─ 仅警告，不强制
└─ 立即执行        └─ 拒绝新开/加仓
```

**为什么 DD 是全平而不是减仓**：回撤超限说明策略在当前市场失效，继续持有任何仓位都是在赌反转。全平并等待恢复是最保守但最安全的选择。

### 5.2 移动止损

```cpp
// 保本：盈利 ≥ 1 ATR → 止损移到入场价
if (currentPrice >= entryPrice + 1 * atr && currentSL < entryPrice)
    return entryPrice;

// 追踪：每盈利 1 ATR，止损同向移动
double profitATR = (currentPrice - entryPrice) / atr;
if (profitATR > 1.0) {
    double trailSL = currentPrice - 2 * atr;
    if (trailSL > currentSL) return trailSL;
}
```

**设计考量**：移动止损只在盈利时收紧，亏损时不动——避免在回调中被震出。

### 5.3 峰值水位线

```
Equity: 10000 → 11000 → 10500 → 9500 → 10200
Peak:   10000 → 11000 → 11000 → 11000 → 11000
DD%:    0%    → 0%    → 4.5%  → 13.6% → 7.3%
Action: 正常   → 正常   → 正常   → 正常   → 正常

Equity: 10000 → 8500
Peak:   10000 → 10000
DD%:    0%    → 15% (未触发)

Equity: 10000 → 7800
Peak:   10000 → 10000
DD%:    0%    → 22% → 触发全平！
```

---

## 6. 仓位计算设计

### 6.1 公式推导

```
风险金额 = 账户净值 × 风险比例
         = Equity × 1%

ATR 价值 = ATR / Point × TickValue
         = ATR 点数 × 每点每手价值

1 Unit = 风险金额 ÷ ATR 价值
       = Equity × 1% ÷ (ATR × TickValue / Point)
```

**为什么用 ATR 而不是固定点数**：
- EURUSD 日均波动 50 点，GBPJPY 日均波动 150 点
- 固定点数会导致不同品种风险暴露差异巨大
- ATR 自适应品种波动率，1% 风险在不同品种上保持一致

### 6.2 精度处理

```cpp
double NormalizeVolume(double volume) {
    double minLot = MarketInfo(symbol, MODE_MINLOT);
    double maxLot = MarketInfo(symbol, MODE_MAXLOT);
    double step   = MarketInfo(symbol, MODE_LOTSTEP);
    if (volume < minLot) return minLot;
    if (volume > maxLot) return maxLot;
    return NormalizeDouble(volume / step, 0) * step;
}
```

品种手数步进可能是 0.01（多数外汇）或 0.1（部分 CFD），`NormalizeVolume` 自动适配。

---

## 7. 日志系统设计

### 7.1 三层输出

| 层级 | 目标 | 格式 | 用途 |
|:---:|:-----|:-----|:-----|
| 终端输出 | MT4/MT5 Experts 标签 | `[INFO] 信息` | 实时监控 |
| 交易日志 | `.log` 文件 | `[时间] [级别] 内容` | 问题排查 |
| CSV 记录 | `.csv` 文件 | 逗号分隔 | Excel 统计分析 |

### 7.2 CSV 结构

```
时间, 动作, 品种, 方向, 手数, 价格, 止损, 止盈, 盈亏, 余额
2026-06-05 14:30:00, 多头入场, EURUSD, 买入, 0.10, 1.08500, 1.08200, 0, 0, 10000.00
2026-06-05 18:45:00, 多头出场, EURUSD, 买入, 0.10, 1.08800, 0, 0, 30.00, 10030.00
```

可直接导入 Excel 做绩效分析：胜率、盈亏比、最大回撤、夏普比率。

---

## 8. 设计权衡记录

| 决策 | 方案 A | 方案 B | 选择 | 原因 |
|:-----|:------|:------|:---:|:-----|
| 双平台兼容 | 条件编译 `#ifdef` 到处散落 | CompatLayer 集中隔离 | **B** | 共享模块零差异，易维护 |
| 类型别名 | `typedef` | `#define` | **B** | typedef 类类型在 MQL4 下不稳定 |
| 指针访问 | `->` | `.` | **B** | 双平台均支持指针自动解引用 |
| PositionManager | 管理全部系统的头寸 | 每个策略独立一个实例 | **B** | 策略间解耦，S1/S2 各自独立 |
| 策略状态 | 策略自己追踪 | PositionManager 统一管理 | **混合** | 策略管信号逻辑，PM 管实际持仓 |
| ATR 获取 | UnitSizing 内部获取 | 外部传入 | **B** | 遵循最少知识原则 |
| 入场信号 | 用实时 Bid/Ask | 用收盘价 | **B** | 海龟原版用收盘价，避免假突破 |

---

## 9. 版本记录

| 版本 | 日期 | 变更 |
|:---:|:----:|:-----|
| v1.0 | 2026-06-05 | 初始版本，完整原型设计说明书 |