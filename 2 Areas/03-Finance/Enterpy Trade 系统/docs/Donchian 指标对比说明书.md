---
aliases: [Donchian 指标对比, Tutle vs Enterpy_Donchian]
created: 2026-06-05
type: analysis
topic: finance
tags: [finance, mql4, donchian, indicator, comparison]
---

# Donchian 通道指标对比说明书

> 旧版 `Tutle.mq4` vs 新版 `Enterpy_Donchian.mq4` 逐项对比与改进建议。

---

## 1. 基本信息

| 项目 | Tutle.mq4 (旧) | Enterpy_Donchian.mq4 (新) |
|:-----|:-------------|:------------------------|
| 路径 | `Indicators\Enterpy\` | `Indicators\Enterpy_v2\` |
| 版本 | v1.00 (2016) | v0.1 (2026) |
| 作者 | RoyalFamilys Trading | Enterpy |
| 缓冲区数 | 4 | 2 |
| API 风格 | MQL5 风格 (OnInit/OnCalculate) | MQL4 风格 (init/start) |
| 代码行数 | 100 行 | 65 行 |

---

## 2. 功能对比

### 2.1 通道数量

| | Tutle.mq4 | Enterpy_Donchian.mq4 |
|:--|:----------|:-------------------|
| 入场通道 | ✅ 上轨 + 下轨 (默认 55 日) | ❌ 不支持 |
| 出场通道 | ✅ 上轨 + 下轨 (默认 20 日) | ❌ 不支持 |
| 单通道 | ❌ | ✅ 上轨 + 下轨 (可配置周期) |

**Tutle 优势**：一张图同时显示海龟双系统的入场/出场通道（4 条线），完整覆盖 S1+S2 策略。

**Enterpy_Donchian 不足**：只能显示一个通道，S1 和 S2 需各拖一次指标。

```cpp
// Tutle: 两个周期独立配置
input int LookBack_Entry = 55;  // 入场通道
input int LookBack_Exit  = 20;  // 出场通道

// Enterpy_Donchian: 单一周期
input int Donchian_Period = 20; // 仅一个通道
```

### 2.2 算法效率

| | Tutle.mq4 | Enterpy_Donchian.mq4 |
|:--|:----------|:-------------------|
| 算法 | `iHighest()` / `iLowest()` | 手动双重循环 |
| 复杂度 | O(n × log k) 内部优化 | O(n × k) |
| 大数据量 | 快 | 慢 |

**Tutle 优势**：使用 MQL4 内置的 `iHighest()`/`iLowest()` 函数，内部有滑动窗口优化。

```cpp
// Tutle: 高效
EntryMAX[i] = iHigh(Symbol(), Period(), 
    iHighest(Symbol(), Period(), MODE_HIGH, LookBack_Entry, i));

// Enterpy_Donchian: 每根 K 线重新遍历 N 根
for (int j = 1; j < Donchian_Period && (i + j) < Bars; j++) {
    if (High[i + j] > highest) highest = High[i + j];
    ...
}
```

对于 55 日通道 + 10 年历史数据，内层循环执行约 `2000 × 55 = 110,000` 次比较；`iHighest()` 可显著减少该开销。

### 2.3 视觉定制

| | Tutle.mq4 | Enterpy_Donchian.mq4 |
|:--|:----------|:-------------------|
| 颜色可配置 | ✅ input color | ❌ 硬编码 Orange |
| 入场/出场区分 | ✅ 绿/红/金三色 | ❌ 同色 |
| 线宽 | 1 | 2 |
| 标签 | "Upper Line" / "Exit Line" | "上轨" / "下轨" |

**Tutle 优势**：入场通道（绿上/红下）和出场通道（金）颜色区分明显，且支持用户自定义。

---

## 3. API 风格对比

### Tutle.mq4 — MQL5 风格

```cpp
int OnInit() { ... }        // 使用现代事件处理
int OnCalculate(...) { ... } // 直接获取 open/high/low/close 数组
```

### Enterpy_Donchian.mq4 — MQL4 风格

```cpp
int init() { ... }          // 传统入口
int start() { ... }         // 传统迭代，通过 IndicatorCounted() 增量计算
```

**Tutle 优势**：`OnCalculate` 直接传入 `high[]` / `low[]` 数组指针，无需通过 `iHigh()` 每次查询，效率更高且代码更清晰。

**注意**：Tutle 虽是 `.mq4` 文件但使用了 MQL5 风格的入口函数。这在 MQL4 build 600+ 中是被支持的。

---

## 4. 改进建议

综合 Tutle.mq4 的优点，Enterpy_Donchian.mq4 建议做以下升级：

### 4.1 增加双通道支持（高优先级）

```cpp
// 增加参数
input int    EntryPeriod = 55;   // 入场通道周期
input int    ExitPeriod  = 20;   // 出场通道周期
input bool   ShowEntry   = true; // 显示入场通道
input bool   ShowExit    = true; // 显示出场通道

// 增加缓冲区到 4 个
#property indicator_buffers 4
double g_entryUpper[], g_entryLower[];
double g_exitUpper[],  g_exitLower[];
```

### 4.2 改用 iHighest/iLowest（高优先级）

```cpp
// Before (O(n*k))
for (int j = 1; j < Donchian_Period && (i + j) < Bars; j++) {
    if (High[i + j] > highest) highest = High[i + j];
}

// After (O(n log k))
int idx = iHighest(Symbol(), Period(), MODE_HIGH, Donchian_Period, i);
highest = iHigh(Symbol(), Period(), idx);
```

### 4.3 改用 MQL5 风格 API（中优先级）

```cpp
// 改用 OnInit() / OnCalculate()
int OnCalculate(...) {
    // 直接使用 high[] / low[] 数组
    // 无需 IndicatorCounted() 计数
}
```

### 4.4 增加颜色配置（低优先级）

```cpp
input color EntryUpperColor = clrGreen;
input color EntryLowerColor = clrRed;
input color ExitColor       = clrGold;
```

---

## 5. 总结

| 维度 | Tutle.mq4 | Enterpy_Donchian.mq4 | 建议 |
|:----|:--------|:-------------------|:-----|
| 功能完整度 | ⭐⭐⭐⭐⭐ | ⭐⭐ | 补充双通道 |
| 算法效率 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | 改用 iHighest |
| API 现代化 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | 改用 OnCalculate |
| 代码可读性 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 中文注释清晰 |
| 视觉定制 | ⭐⭐⭐⭐ | ⭐⭐ | 增加颜色 input |

Tutle 是一个成熟的、面向实战的指标，功能完备且高效。Enterpy_Donchian 是一个简洁的参考实现，建议按 4.1-4.4 逐步对齐 Tutle 的功能和性能水平。

---

## 6. 版本记录

| 版本 | 日期 | 变更 |
|:---:|:----:|:-----|
| v1.0 | 2026-06-05 | 初始版本，Tutle.mq4 vs Enterpy_Donchian.mq4 全维度对比 |