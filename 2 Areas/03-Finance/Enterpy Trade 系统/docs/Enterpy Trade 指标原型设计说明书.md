---
aliases: [指标原型设计, ATR设计, Donchian设计, 指标架构]
created: 2026-06-05
type: design
topic: finance
tags: [finance, mql4, mql5, indicator, atr, donchian, design]
---

# Enterpy Trade 指标原型设计说明书 v1.0

> Enterpy ATR 与 Enterpy Donchian 两个自定义图表指标的设计决策、算法选择、架构对比与演进路线。

---

## 1. 设计目标

| 目标 | 说明 |
|:-----|:-----|
| **可视化验证** | 在图表上直观看到 EA 所用的 ATR 和 Donchian 通道，验证信号是否正确 |
| **参数同步** | 指标参数与 EA 参数一致，修改一处即可对照 |
| **双平台可用** | MQL4 和 MQL5 各一份，功能等价 |
| **低耦合** | 指标不依赖 EA 的任何模块，独立编译运行 |

---

## 2. 指标架构

### 2.1 指标与 EA 的关系

```
┌──────────────────────────────────┐
│           图表 (Chart)            │
│                                  │
│  ┌────────────┐ ┌──────────────┐ │
│  │ Donchian   │ │ Donchian     │ │  ← 两个实例：S1(20) + S2(55)
│  │ 通道 #1    │ │ 通道 #2      │ │
│  │ period=20  │ │ period=55    │ │
│  └────────────┘ └──────────────┘ │
│                                  │
│  ┌────────────────────────────┐  │
│  │        ATR 副图             │  │  ← 一个实例
│  │        period=20            │  │
│  └────────────────────────────┘  │
│                                  │
│  ┌────────────────────────────┐  │
│  │    Enterpy EA (后台运行)     │  │  ← 内部计算，不画图
│  │    使用相同的算法和参数       │  │
│  └────────────────────────────┘  │
└──────────────────────────────────┘
```

**关键设计**：EA 内部用 `CIndicators` 类计算 Donchian/ATR，与图表指标使用相同的算法但不同的 API——EA 用程序接口，指标用图形接口。两者独立编译，互不引用。

### 2.2 为什么 EA 和指标不共享代码

| 方案 | 描述 | 评价 |
|:-----|:-----|:-----|
| 共享 `.mqh` | EA 和指标都 include 同一个 .mqh | ❌ 编译耦合，指标文件需 `#include` EA 模块 |
| 各自实现 | EA 内部有 `CIndicators`，指标独立写 | ✅ 当前方案，各自编译互不影响 |
| 指标用 EA 的类 | 指标 `#include <Enterpy_v2/Data/Indicators.mqh>` | ❌ 引入不必要的依赖链（CompatLayer → 整个 EA） |

选择各自实现的原因是**编译隔离**——指标的 include 链应该是最短的，不应拖着 CompatLayer 和整个 EA 的依赖树。

---

## 3. Enterpy ATR 设计

### 3.1 功能规格

| 项目 | 规格 |
|:-----|:-----|
| 缓冲区 | 1 个（ATR 值） |
| 显示位置 | 副图（separate_window） |
| 计算方式 | 直接调用平台内置 `iATR()` |
| 默认周期 | 20 |
| 线条颜色 | DodgerBlue |
| 线宽 | 2 |

### 3.2 为什么直接调 iATR()

ATR 是一个标准指标，MT4/MT5 均有高效的内置实现。没有理由自己写 True Range → EMA 的循环：

```cpp
// 简洁：一行搞定
g_atrBuffer[i] = iATR(Symbol(), Period(), ATR_Period, i);

// 自实现：约 20 行，且性能不如内置
```

**设计原则**：能用平台内置就不用自实现。内置函数经过优化且无 bug。

### 3.3 API 差异处理

| | MQL4 | MQL5 |
|:--|:-----|:-----|
| 入口 | `init()` / `start()` | `OnInit()` / `OnCalculate()` |
| 指标调用 | `iATR(sym, tf, period, shift)` 直接调用 | 需创建句柄 `iATR()` → `CopyBuffer()` → `IndicatorRelease()` |
| 缓冲区绑定 | `SetIndexBuffer(0, buf)` | `SetIndexBuffer(0, buf, INDICATOR_DATA)` |
| 增量计算 | `IndicatorCounted()` | `prev_calculated` 参数 |

MQL4 版本更简洁；MQL5 版本的句柄管理更复杂但性能更好（首次 `CopyBuffer` 后缓存）。

### 3.4 MQL5 版本的初始化策略

```cpp
int OnInit() {
    g_atrHandle = iATR(Symbol(), Period(), ATR_Period);  // 创建一次
    ...
}

int OnCalculate(...) {
    if (prev_calculated == 0) {
        CopyBuffer(g_atrHandle, 0, 0, rates_total, atr);  // 首次全量
    } else {
        CopyBuffer(g_atrHandle, 0, rates_total - 1, 1, atr);  // 增量只取最新
    }
}
```

**设计考量**：句柄在 `OnInit` 创建一次、`OnDeinit` 释放一次，而不是每次 `OnCalculate` 创建/释放。这避免了不必要的系统调用。

---

## 4. Enterpy Donchian 设计

### 4.1 功能规格

| 项目 | 规格 |
|:-----|:-----|
| 缓冲区 | 2 个（上轨、下轨） |
| 显示位置 | 主图叠加（chart_window） |
| 计算方式 | 手动遍历 High[] / Low[] |
| 默认周期 | 20 |
| 线条颜色 | Orange |
| 线宽 | 2 |

### 4.2 算法

```
for i in [0, Bars):
    g_upper[i] = max(High[i], High[i+1], ..., High[i+period-1])
    g_lower[i] = min(Low[i],  Low[i+1],  ..., Low[i+period-1])
```

**时间复杂度**：O(n × k)，其中 n = 总 K 线数，k = 周期。

当前实现：
```cpp
for (int j = 1; j < Donchian_Period && (i + j) < Bars; j++) {
    if (High[i + j] > highest) highest = High[i + j];
    if (Low[i + j]  < lowest)  lowest  = Low[i + j];
}
```

### 4.3 算法选择：手动循环 vs iHighest/iLowest

| 方案 | 实现 | 复杂度 | 优点 | 缺点 |
|:-----|:-----|:------|:-----|:-----|
| **A: 手动双重循环** | 当前实现 | O(n×k) | 简单直观，易理解 | 大数据量慢 |
| **B: iHighest/iLowest** | 旧版 Tutle 方案 | O(n×log k) | 快，内置优化 | 函数调用开销 |

```cpp
// 方案 B（推荐升级）
EntryMAX[i] = iHigh(Symbol(), Period(),
    iHighest(Symbol(), Period(), MODE_HIGH, LookBack_Entry, i));
```

**设计决策**：当前选用方案 A 是因为代码简洁、易于教学理解。但生产环境建议升级到方案 B——对于 55 日周期 + 10 年 D1 数据（约 2600 根 K 线），方案 B 可减少约 30% 的计算时间。

### 4.4 单通道 vs 双通道

当前设计只显示**一个通道**（单一周期）。Tutle 旧版显示**四个通道**（进场上下 + 出场上下）。

| 特性 | 当前 Enterpy_Donchian | 旧版 Tutle |
|:-----|:-------------------|:---------|
| 缓冲区 | 2 | 4 |
| 通道数 | 1 个（可配置周期） | 2 个（进场 + 出场） |
| 参数 | `Donchian_Period` | `LookBack_Entry` + `LookBack_Exit` |
| 部署方式 | 拖两次（S1=20, S2=55） | 拖一次即可 |

**设计决策**：选单通道是为了**职责单一**——每个指标实例只做一件事。用户按需拖入多个实例并设置不同周期。缺点是多占一个指标槽位（MT4 最多 8 个）。

### 4.5 为什么不用 EA 内部的 CIndicators

EA 内部的 `CIndicators::DonchianHigh/Low` 和指标有本质区别：

| | EA 内部 CIndicators | 图表指标 |
|:--|:------------------|:-------|
| **调用方式** | 按需计算（只算当前 Tick 需要的） | 全量计算（每根 K 线都要画） |
| **数据源** | 通过 `CIndicator` 封装逐根查询 | `OnCalculate` 直接拿整个数组 |
| **输出** | 返回 double 值 | 填充整个 buffer[] 数组 |
| **生命周期** | EA 的 OnTick 内临时用 | 指标持续运行，响应新 K 线 |

因此 EA 和指标的 Donchian 算法相同但实现方式不同——不应该共享同一份代码。

---

## 5. MQL4 vs MQL5 指标 API 对比

### 5.1 入口函数

| | MQL4 | MQL5 |
|:--|:-----|:-----|
| 初始化 | `int init()` | `int OnInit()` |
| 退出 | `int deinit()` | `void OnDeinit(const int reason)` |
| 计算 | `int start()` | `int OnCalculate(rates_total, prev_calculated, time[], open[], high[], low[], close[], tick_volume[], volume[], spread[])` |

### 5.2 缓冲区

| | MQL4 | MQL5 |
|:--|:-----|:-----|
| 绑定 | `SetIndexBuffer(0, buf)` | `SetIndexBuffer(0, buf, INDICATOR_DATA)` |
| 样式 | `SetIndexStyle(0, DRAW_LINE)` | `PlotIndexSetInteger(0, PLOT_DRAW_TYPE, DRAW_LINE)` |
| 属性声明 | `#property indicator_color1` | `#property indicator_type1 DRAW_LINE` + `#property indicator_color1` |

### 5.3 设计影响

MQL5 的 `OnCalculate` 直接传入 `high[]` / `low[]` 数组，Donchian 计算可以直接用数组索引，无需通过 `iHigh()` 查询——这是 MQL5 指标比 MQL4 指标快的主要原因。

```cpp
// MQL5: 直接用数组
double highest = high[i];
for (int j = 1; j <= lookback; j++) {
    if (high[i - j] > highest) highest = high[i - j];
}

// MQL4: 每次调用 iHigh()
double highest = High[i];
for (int j = 1; j < Donchian_Period && (i + j) < Bars; j++) {
    if (High[i + j] > highest) highest = High[i + j];
}
```

---

## 6. 演进路线

### Phase 1 — 当前状态 (v0.1)

- [x] ATR 单线指标
- [x] Donchian 单通道指标
- [x] MQL4 + MQL5 双平台

### Phase 2 — 效率升级 (v0.2)

- [ ] Donchian 改用 `iHighest()` / `iLowest()` 算法
- [ ] MQL5 版本直接用 `OnCalculate` 数组，消除 `iHigh()` 调用
- [ ] ATR MQL5 句柄缓存优化（当前每次调用创建/释放）

### Phase 3 — 功能升级 (v0.3)

- [ ] Donchian 升级为双通道（入场 + 出场）
- [ ] 增加 4 缓冲区（EntryUpper / EntryLower / ExitUpper / ExitLower）
- [ ] 颜色可配置（input color）
- [ ] 通道内填充半透明色带

### Phase 4 — 增强 (v1.0)

- [ ] 增加突破标记（价格突破通道时画箭头）
- [ ] 增加 ATR 多周期对比（同时显示 20 日和 55 日 ATR）
- [ ] 工具提示显示当前通道宽度

---

## 7. 设计决策记录

| # | 决策 | 选项 | 选择 | 原因 |
|:-:|:-----|:-----|:---:|:-----|
| 1 | ATR 算法 | 自实现 | 调内置 iATR() | **内置** | 无必要重复实现 |
| 2 | Donchian 算法 | 手动循环 | iHighest | **手动** | v0.1 求简洁，v0.2 升级 |
| 3 | 通道数量 | 单通道 | 双通道 | **单通道** | 职责单一，用户自行组合 |
| 4 | EA/指标共享代码 | 共享 | 各自实现 | **各自实现** | 编译隔离 |
| 5 | ATR MQL5 句柄 | 每调用创建 | OnInit 创建一次 | **OnInit** | 减少系统调用 |
| 6 | Donchian API 风格 | MQL4 init/start | MQL5 OnInit/OnCalculate | **按平台** | 不强行统一，用原生 API |

---

## 8. 版本记录

| 版本 | 日期 | 变更 |
|:---:|:----:|:-----|
| v1.0 | 2026-06-05 | 初始版本，ATR + Donchian 指标完整设计说明书 |