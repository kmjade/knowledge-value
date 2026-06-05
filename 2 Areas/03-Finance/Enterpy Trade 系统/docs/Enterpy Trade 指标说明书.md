---
aliases: [Enterpy Trade 指标说明书, ATR指标, Donchian指标]
created: 2026-06-05
type: manual
topic: finance
tags: [finance, mql4, mql5, indicator, atr, donchian, turtle-trading]
---

# Enterpy Trade 指标说明书

> Enterpy 交易系统配套图表指标：ATR（平均真实波幅）与 Donchian 通道。用于可视化辅助海龟策略的双系统入场/出场判断。

---

## 1. 指标概览

| 指标 | 文件 | 缓冲区 | 显示位置 | 用途 |
|:-----|:-----|:------|:-------|:-----|
| Enterpy ATR | `Enterpy_ATR.mq4/.mq5` | 1 | 副图窗口 | 显示当前波动率，辅助仓位计算 |
| Enterpy Donchian | `Enterpy_Donchian.mq4/.mq5` | 2 | 主图叠加 | 显示 N 日最高/最低价通道，辅助突破判断 |

---

## 2. Enterpy ATR 指标

### 2.1 概述

ATR（Average True Range，平均真实波幅）衡量市场波动率。海龟交易法则用 ATR 做三件事：

- **仓位计算**：`1 Unit = 余额 × 1% ÷ (ATR × 每点价值)`
- **止损设置**：硬止损 = 入场价 ± 2 ATR
- **加仓间距**：每 ½ ATR 加一个单位

### 2.2 参数

| 参数 | 默认值 | 说明 |
|:-----|:-----:|:-----|
| `ATR_Period` | 20 | ATR 计算周期。海龟原版使用 20 日 |

### 2.3 界面

```
┌─────────────────────────────┐
│  Enterpy ATR(20)            │  ← 副图窗口标题
│                             │
│  ░░░░  ATR 曲线  ░░░░       │  ← 蓝色实线，反映波动率变化
│                             │
│  当前值: 0.00123 (12.3点)    │
└─────────────────────────────┘
```

- **上升** → 波动加剧，止损放宽，仓位缩小
- **下降** → 波动收窄，止损收紧，仓位放大
- **横盘** → 市场平稳

### 2.4 使用方法

1. 将 `Enterpy_ATR` 拖到图表上
2. 观察 ATR 数值趋势
3. 与 EA 参数 `ATR_Period` 保持一致（默认 20）
4. 高 ATR 时期 → 预期止损更宽、加仓间距更大
5. 低 ATR 时期 → 预期止损更窄、加仓间距更小

---

## 3. Enterpy Donchian 通道指标

### 3.1 概述

Donchian 通道由 Richard Donchian 提出，是海龟交易法则的核心信号来源：

- **入场**：价格突破 N 日高点（做多）或跌破 N 日低点（做空）
- **出场**：价格跌破 M 日低点（多单出场）或突破 M 日高点（空单出场）
- **S1 快系统**：入场 20 日 / 出场 10 日
- **S2 慢系统**：入场 55 日 / 出场 20 日

### 3.2 参数

| 参数 | 默认值 | 说明 |
|:-----|:-----:|:-----|
| `Donchian_Period` | 20 | 通道计算周期。S1 设为 20，S2 设为 55 |

### 3.3 界面

```
┌─────────────────────────────────────┐
│  K 线图                              │
│                                     │
│  ──────────── 上轨 (N 日最高价) ──── │  ← 橙色实线
│       ╱                             │
│      ╱  ╲   价格突破上轨 → 做多信号   │
│  ╱──╱    ╲──────                    │
│  │  │ K线 │                         │
│  ╲──╲    ╱──────                    │
│      ╲  ╱   价格跌破下轨 → 做空信号   │
│       ╲                             │
│  ──────────── 下轨 (N 日最低价) ──── │  ← 橙色实线
└─────────────────────────────────────┘
```

### 3.4 双通道部署

S1 和 S2 需分别拖入指标：

| 系统 | 参数设置 | 线色建议 |
|:---:|:-------|:-------|
| S1 (快) | `Donchian_Period = 20` | 蓝色 |
| S2 (慢) | `Donchian_Period = 55` | 红色 |

两张图可叠加在同一个图表窗口——颜色区分即可。

### 3.5 信号解读

| 信号 | 条件 | 动作 |
|:-----|:-----|:-----|
| 做多入场 | 收盘价从下方突破上轨 | EA 开多仓 1 Unit |
| 做空入场 | 收盘价从上方跌破下轨 | EA 开空仓 1 Unit |
| 多头加仓 | 持仓中，价格较入场价每涨 ½ ATR | EA 加 1 Unit（最多 4U） |
| 多头出场 | 收盘价跌破反向通道下轨 | EA 全平该系统多仓 |
| 空头出场 | 收盘价突破反向通道上轨 | EA 全平该系统空仓 |

### 3.6 与旧版 Tutle.mq4 的对比

旧版 `Tutle.mq4`（位于 `Indicators\Enterpy\`）功能更全面：

| 特性 | Tutle.mq4 | Enterpy_Donchian.mq4 |
|:-----|:--------|:-------------------|
| 通道数 | 4 线（入场上下 + 出场上下） | 2 线（单一通道） |
| 算法 | `iHighest()` / `iLowest()` 高效 | 手动循环，较慢 |
| 颜色 | 绿/红/金，可自定义 | 固定橙色 |
| API | MQL5 风格 OnCalculate | MQL4 风格 start() |

建议：如需同时观察 S1+S2 的入场和出场通道，可使用旧版 Tutle；如需配合 Enterpy_v2 EA 做单一通道参考，使用新版 Enterpy_Donchian。

---

## 4. 指标与 EA 的配合

### 4.1 参数同步

指标参数应与 EA 参数保持一致：

| EA 参数 | 对应指标 | 设置 |
|:--------|:--------|:----|
| `ATR_Period = 20` | Enterpy ATR | `ATR_Period = 20` |
| `Turtle1_Period = 20` | Enterpy Donchian #1 | `Donchian_Period = 20` |
| `Turtle2_Period = 55` | Enterpy Donchian #2 | `Donchian_Period = 55` |

### 4.2 可视化工作流

```
1. 打开品种图表（H1 / H4 / D1）
2. 拖入 Enterpy_ATR（查看副图）
3. 拖入 Enterpy_Donchian × 2（S1=20, S2=55）
4. 拖入 Enterpy_v2 EA，设置参数
5. 启动自动交易
```

图表上的 Donchian 通道可以直观验证 EA 的入场出场逻辑是否正确执行。

---

## 5. 安装

### MQL4

```
D:\Trade\MetaTrader 4\MQL4\Indicators\Enterpy_v2\
├── Enterpy_ATR.mq4
└── Enterpy_Donchian.mq4
```

### MQL5

```
D:\Trade\MetaTrader 5\MQL5\Indicators\Enterpy_v2\
├── Enterpy_ATR.mq5
└── Enterpy_Donchian.mq5
```

重启 MT4/MT5，在 Navigator → Indicators 中找到 `Enterpy_v2` 分组，拖入图表即可。

---

## 6. 版本记录

| 版本 | 日期 | 变更 |
|:---:|:----:|:-----|
| v1.0 | 2026-06-05 | 初始版本，ATR + Donchian 双指标说明书 |