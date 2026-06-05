---
aliases: [Enterpy Trade 实现报告]
created: 2026-06-05
type: report
topic: finance
status: active
tags: [finance, mql4, mql5, turtle-trading, ea, implementation]
---

# Enterpy Trade System — 实现报告 v0.1

> 基于海龟交易法则的 MQL4/MQL5 双平台自动交易 EA，2026-06-05 完成编码与部署。

---

## 1. 项目概况

| 项目 | 说明 |
|:-----|:-----|
| 系统名称 | Enterpy Trade System |
| 版本 | v0.1 |
| 策略引擎 | 海龟交易法则（Turtle Trading） |
| 目标平台 | MetaTrader 4 / MetaTrader 5 |
| 语言 | MQL4 / MQL5（通过 CompatLayer 双平台兼容） |
| 文件数量 | 34 个（每平台 17 个） |
| 部署位置 | `D:\Trade\MetaTrader 4\MQL4\` 和 `D:\Trade\MetaTrader 5\MQL5\` |
| 部署目录 | `Enterpy_v2\`（与旧版 `Enterpy\` 并存） |

---

## 2. 系统架构

```
OnTick() 主循环
  ├─ 1. 价格数据更新          → PriceData.OnTick()
  ├─ 2. 风控检查 (DD 保护)    → RiskManager.CanTrade()
  ├─ 3. 单位仓位重算          → UnitSizing.Recalculate()
  ├─ 4. S1 策略处理 (快系统)  → ProcessStrategy(S1)
  │     ├─ 已持仓 → 出场信号？ → 移动止损？ → 加仓？
  │     └─ 空仓   → 入场信号？(Donchian 突破)
  ├─ 5. S2 策略处理 (慢系统)  → ProcessStrategy(S2)
  └─ 6. 日志/统计更新         → Logger 更新
```

**五层模块架构**：

| 层级 | 职责 | 模块 |
|:---|:-----|:-----|
| Data Layer | 价格缓冲区、MarketInfo | `PriceData` |
| | ATR、Donchian 通道 | `Indicators` |
| Strategy Layer | 策略抽象接口 | `IStrategy` |
| | 海龟 S1 (20/10 日) | `TurtleS1` → `CTurtleStrategy` 基类 |
| | 海龟 S2 (55/20 日) | `TurtleS2` |
| Execution Layer | 单位仓位计算 | `UnitSizing` |
| | 订单执行 | `OrderManager` |
| | 头寸追踪/移动止损 | `PositionManager` |
| Risk Layer | 回撤监控 (峰值水位线) | `DrawdownMonitor` |
| | 止损/保本/追踪/仓位限制 | `RiskManager` |
| Logging Layer | 文件 I/O | `FileIO` |
| | 交易日志、CSV 记录、绩效统计 | `Logger` |

---

## 3. 海龟策略规格

### 3.1 双系统

| 参数 | S1 (快系统) | S2 (慢系统) |
|:----:|:---------:|:---------:|
| 入场周期 | 20 日 Donchian 突破 | 55 日 Donchian 突破 |
| 出场周期 | 10 日反向突破 | 20 日反向突破 |
| 状态 | 独立运行，可同时持仓 | 独立运行，可同时持仓 |

### 3.2 仓位计算

```
1 Unit = 账户余额 × 风险比例 ÷ (ATR × 每点价值)

默认: Risk = 1%, ATR 周期 = 20, 平滑方式 = SMA
```

### 3.3 金字塔加仓

| 层级 | 触发条件 | 仓位 |
|:---:|:-------|:---:|
| 1st | N 日高点/低点突破 | 1 Unit |
| 2nd | 价格朝有利方向 + ½ ATR | +1 Unit (总 2U) |
| 3rd | 再 + ½ ATR | +1 Unit (总 3U) |
| 4th | 再 + ½ ATR | +1 Unit (总 4U) |

上限：每系统 4 单位，双系统合计 8 单位。

### 3.4 止损规则

| 类型 | 规则 |
|:---:|:-----|
| 全仓硬止损 | 入场价反向 2 ATR |
| 保本止损 | 价格盈利超过 1 ATR 后，止损移至入场价 |
| 追踪止损 | 每盈利 1 ATR，止损同向移动 |

### 3.5 出场规则

| 系统 | 多头出场 | 空头出场 |
|:---:|:------:|:------:|
| S1 | 跌破 10 日低点 | 涨破 10 日高点 |
| S2 | 跌破 20 日低点 | 涨破 20 日高点 |
| 止损出场 | 2 ATR 硬止损 | 2 ATR 硬止损 |

出场信号触发时，该系统**全部仓位一次平掉**。

### 3.6 风控配置

| 参数 | 默认值 | 说明 |
|:---:|:-----:|:-----|
| 单单位风险 | 1% | 核心风控参数 |
| 硬止损 | 2 ATR | 每单位入场后设置 |
| 最大持仓 | 8 Units (S1+S2 各 4) | 满仓状态 |
| 最大回撤暂停 | 20% | 全平并暂停交易 |
| 回撤恢复 | 回至 10% 以内 | 恢复交易 |

---

## 4. 双平台兼容策略

### 4.1 核心思路

**MQL4 端**：CompatLayer 在 MQL4 API 之上模拟 MQL5 风格的类接口。

| MQL4 原生 API | CompatLayer 封装 |
|:------------|:---------------|
| `OrderSend / OrderSelect` | `CTradeCompat` → `Buy / Sell / PositionClose` |
| `OrdersTotal / OrderTicket` | `CPositionInfoCompat` → `SelectByTicket / SelectByIndex` |
| `iATR / iHigh / iLow` | `CIndicatorCompat` → `iATR / iHigh / iLow` |

**MQL5 端**：直接使用原生 `CTrade`、`CPositionInfo`，仅对指标 API 做薄封装（`CIndicator`）。

### 4.2 跨平台宏

| 宏 | MQL4 | MQL5 |
|:--|:-----|:-----|
| `ENTERPY_TIMEFRAME` | `int` | `ENUM_TIMEFRAMES` |
| `ENTERPY_ON_INIT` | `int init()` | `int OnInit()` |
| `ENTERPY_ON_TICK` | `int start()` | `void OnTick()` |
| `ENTERPY_RETURN_OK` | `return 0;` | `return;` |

共享 `.mqh` 模块（14 个文件）通过宏实现 MQL4/MQL5 零差异编译。

---

## 5. 文件清单

### 5.1 MQL4 部署 (`Enterpy_v2\`)

```
Experts\Enterpy_v2\
  Enterpy.mq4                         ← EA 主入口

Include\Enterpy_v2\
  CompatLayer.mqh                     ← MQL4→MQL5 兼容层
  Config.mqh                          ← 全局参数（18 个 input）
  Data\
    PriceData.mqh                     ← 价格缓冲区
    Indicators.mqh                    ← ATR / Donchian
  Strategy\
    IStrategy.mqh                     ← 策略接口
    TurtleS1.mqh                      ← 海龟 S1 + CTurtleStrategy 基类
    TurtleS2.mqh                      ← 海龟 S2
  Execution\
    UnitSizing.mqh                    ← 单位仓位计算
    OrderManager.mqh                  ← 订单执行
    PositionManager.mqh               ← 头寸追踪
  Risk\
    DrawdownMonitor.mqh               ← 回撤监控
    RiskManager.mqh                   ← 风控引擎
  Utils\
    FileIO.mqh                        ← 文件读写
    Logger.mqh                        ← 日志/CSV/统计

Indicators\Enterpy_v2\
  Enterpy_ATR.mq4                     ← ATR 图表指标
  Enterpy_Donchian.mq4                ← Donchian 通道图表指标
```

### 5.2 MQL5 部署（镜像结构，17 文件）

---

## 6. 配置参数一览

```cpp
// === 海龟策略 ===
input int    Turtle1_Period     = 20;    // S1 突破周期 (日)
input int    Turtle1_ExitPeriod = 10;    // S1 出场周期 (日)
input int    Turtle2_Period     = 55;    // S2 突破周期 (日)
input int    Turtle2_ExitPeriod = 20;    // S2 出场周期 (日)
input int    ATR_Period         = 20;    // ATR 计算周期

// === 仓位管理 ===
input double Risk_Percent       = 1.0;   // 每单位风险 (%)
input int    MaxUnits           = 4;     // 每个系统最大单位数
input double AddUnitStep        = 0.5;   // 加仓步长 (ATR 倍数)

// === 止损 ===
input double StopLoss_ATR       = 2.0;   // 硬止损 (ATR 倍数)
input double Breakeven_ATR      = 1.0;   // 保本止损触发 (ATR)

// === 风控 ===
input double Max_DD_Percent     = 20.0;  // 最大回撤暂停 (%)
input double Resume_DD_Percent  = 10.0;  // 恢复交易回撤阈值 (%)

// === 交易管理 ===
input bool   UseS1              = true;  // 启用 S1 系统 (20日)
input bool   UseS2              = true;  // 启用 S2 系统 (55日)
input double Lot_Size           = 0;     // 固定手数 (0=自动计算)
input int    MagicNumber        = 20240605;
input string OrderComment       = "Enterpy";
```

---

## 7. 部署与使用

### 7.1 编译

1. 重启 MT4/MT5，或在 Navigator 面板右键 → Refresh
2. 打开 MetaEditor (F4)
3. 找到 `Enterpy_v2\Enterpy.mq4`（或 `.mq5`）
4. 点击 Compile (F7)

### 7.2 运行

1. 在 Navigator → Expert Advisors 中找到 `Enterpy_v2`
2. 拖到图表上
3. 在参数面板中调整策略/风控参数
4. 勾选 "Allow Auto Trading"，点击 OK

### 7.3 日志输出

| 文件 | 内容 |
|:-----|:-----|
| `Enterpy_<品种>_<日期>.log` | 每日运行日志 |
| `Enterpy_Trades_<品种>_<日期>.csv` | 交易记录（可导入 Excel） |
| `Enterpy_Stats_<品种>.txt` | 绩效统计摘要 |

---

## 8. 后续扩展预留

`IStrategy` 接口已预留策略扩展点，添加新策略只需：

1. 新建 `CMyStrategy.mqh`，实现 `IStrategy` 接口
2. 在 `Enterpy.mq4/.mq5` 中注册策略实例
3. 添加配置参数即可

候选策略方向：双均线交叉、布林带均值回归、网格交易。

---

## 9. 版本记录

| 版本 | 日期 | 变更 |
|:---:|:----:|:-----|
| v0.1 | 2026-06-05 | 初始实现：CompatLayer、五层架构、海龟 S1/S2、全中文注释 |