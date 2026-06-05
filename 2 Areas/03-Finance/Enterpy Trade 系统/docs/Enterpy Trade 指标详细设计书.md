---
aliases: [指标详细设计, 指标技术规格]
created: 2026-06-05
type: design
topic: finance
tags: [finance, mql4, mql5, indicator, atr, donchian, detailed-design]
---

# Enterpy Trade 指标详细设计书 v1.0

> ATR 与 Donchian 指标的完整技术规格：数据结构、算法伪代码、边界条件、性能预算、测试用例。

---

## 1. Enterpy ATR 详细设计

### 1.1 数据结构

```
┌─────────────────────────────────────────────┐
│               Enterpy_ATR                    │
├─────────────────────────────────────────────┤
│  input:                                      │
│    ATR_Period : int = 20                     │
│                                              │
│  buffers:                                    │
│    g_atrBuffer[] : double                    │  ← 指标线 (INDICATOR_DATA)
│                                              │
│  handles (MQL5 only):                        │
│    g_atrHandle : int = INVALID_HANDLE        │  ← iATR 句柄
│                                              │
│  properties:                                 │
│    indicator_separate_window                 │  ← 独立副图
│    indicator_buffers = 1                     │
│    indicator_color1  = DodgerBlue            │
│    indicator_width1  = 2                     │
│    indicator_label1  = "ATR"                 │
│    indicator_type1   = DRAW_LINE (MQL5)      │
│    indicator_digits  = 1                     │
└─────────────────────────────────────────────┘
```

### 1.2 生命周期

```
OnInit()
  │
  ├─ SetIndexBuffer(0, g_atrBuffer)      // 绑定缓冲区
  ├─ IndicatorSetString(SHORTNAME, ...)   // 设置标题
  ├─ [MQL5] g_atrHandle = iATR(...)       // 创建句柄
  └─ return INIT_SUCCEEDED
       │
       ▼
  ┌─────────────────────────────────────┐
  │        运行中 (OnCalculate)           │
  │  每次新 K 线触发一次                   │
  └─────────────────────────────────────┘
       │
       ▼
OnDeinit()
  ├─ [MQL5] IndicatorRelease(g_atrHandle) // 释放句柄
  └─ return
```

### 1.3 OnCalculate 算法 (MQL4)

```
输入: 无（通过全局 Bars / IndicatorCounted 获取状态）
输出: 0 (成功)

算法:
  limit = Bars - IndicatorCounted()        // 需要计算的新 K 线数

  for i = limit-1 down to 0:
      g_atrBuffer[i] = iATR(Symbol(), Period(), ATR_Period, i)

  return 0
```

**边界条件**：

| 条件 | 行为 |
|:-----|:-----|
| `Bars < ATR_Period` | `iATR()` 返回 0，缓冲区填充 0 |
| `IndicatorCounted() == 0` | 首次加载，全量计算 |
| `IndicatorCounted() == Bars` | 无新 K 线，不计算 |
| `ATR_Period <= 0` | 未处理——依赖 MT 平台对 `iATR` 的默认行为 |

### 1.4 OnCalculate 算法 (MQL5)

```
输入:
  rates_total     : int       // 总 K 线数
  prev_calculated : int       // 已计算数
  high[]          : double[]  // (未使用，但函数签名要求)
  low[]           : double[]  // (未使用)
  close[]         : double[]  // (未使用)
  ...

输出: rates_total (成功) 或 0 (失败)

算法:
  if prev_calculated == 0:
      // 首次：全量复制
      CopyBuffer(g_atrHandle, 0, 0, rates_total, buf)
      for i = 0 to rates_total - 1:
          g_atrBuffer[i] = buf[i]
  else:
      // 增量：只取最新一根
      CopyBuffer(g_atrHandle, 0, rates_total - 1, 1, buf)
      g_atrBuffer[rates_total - 1] = buf[0]

  return rates_total
```

**句柄管理状态机**：

```
                        OnInit()
                           │
                     iATR() 成功？
                        ╱     ╲
                      是       否
                       │        │
                 handle = 有效   return INIT_FAILED
                       │
                       ▼
              ┌─── 运行中 ───┐
              │ CopyBuffer()  │
              └──────────────┘
                       │
                   OnDeinit()
                       │
              IndicatorRelease(handle)
                       │
                    handle = INVALID_HANDLE
```

### 1.5 性能预算

| 场景 | MQL4 | MQL5 |
|:-----|:----:|:----:|
| 首次加载 (5000 bars) | ~5ms | ~10ms (含 CopyBuffer 全量) |
| 增量更新 (1 bar) | <0.1ms | <0.5ms |
| 句柄创建 | N/A | ~1ms (仅一次) |
| 内存占用 | 1 × 8 × 5000 = 40KB | 40KB + 句柄 8B |

### 1.6 测试用例

| # | 输入 | 预期 |
|:-:|:-----|:-----|
| TC1 | `ATR_Period=20`, EURUSD D1 首次加载 | 缓冲区[0..19] = 0, [20..n] = 有效 ATR 值 |
| TC2 | `ATR_Period=20`, 新增 1 根 K 线 | 仅最新索引更新，其余不变 |
| TC3 | `ATR_Period=1` | 每根 K 线 ATR = TR = High - Low（近似） |
| TC4 | `Bars < ATR_Period` (如新上市品种) | 全缓冲区 = 0，不崩溃 |
| TC5 | 切换周期 (H1→D1) | 触发全量重算，`prev_calculated=0` |

---

## 2. Enterpy Donchian 详细设计

### 2.1 数据结构

```
┌─────────────────────────────────────────────┐
│            Enterpy_Donchian                   │
├─────────────────────────────────────────────┤
│  input:                                      │
│    Donchian_Period : int = 20                │
│                                              │
│  buffers:                                    │
│    g_upperBuffer[] : double                  │  ← 上轨
│    g_lowerBuffer[] : double                  │  ← 下轨
│                                              │
│  properties:                                 │
│    indicator_chart_window                    │  ← 主图叠加
│    indicator_buffers = 2                     │
│    indicator_color1  = Orange                │
│    indicator_color2  = Orange                │
│    indicator_width1  = 2                     │
│    indicator_width2  = 2                     │
│    indicator_style1  = STYLE_SOLID           │
│    indicator_style2  = STYLE_SOLID           │
│    indicator_label1  = "Donchian 上轨"       │
│    indicator_label2  = "Donchian 下轨"       │
└─────────────────────────────────────────────┘
```

### 2.2 生命周期

```
OnInit()
  │
  ├─ SetIndexBuffer(0, g_upperBuffer)
  ├─ SetIndexBuffer(1, g_lowerBuffer)
  ├─ SetIndexStyle(0, DRAW_LINE)
  ├─ SetIndexStyle(1, DRAW_LINE)
  ├─ SetIndexLabel(0, "上轨(N)")
  ├─ SetIndexLabel(1, "下轨(N)")
  ├─ IndicatorShortName("Enterpy Donchian(N)")
  └─ return INIT_SUCCEEDED
       │
       ▼
  ┌─────────────────────────────────────┐
  │        运行中 (OnCalculate)           │
  └─────────────────────────────────────┘
       │
       ▼
OnDeinit()
  └─ return (无资源需释放)
```

### 2.3 OnCalculate 算法 (MQL4)

```
输入: 无
输出: 0

常量:
  period = Donchian_Period

算法:
  limit = Bars - IndicatorCounted()
  if limit <= 0: return 0

  for i = limit-1 down to 0:
      // 初始化
      highest = High[i]
      lowest  = Low[i]

      // 回溯 period-1 根 K 线
      for j = 1 to period-1:
          if i + j >= Bars: break          // 边界保护
          if High[i+j] > highest: highest = High[i+j]
          if Low[i+j]  < lowest:  lowest  = Low[i+j]

      // 写入缓冲区
      g_upperBuffer[i] = highest
      g_lowerBuffer[i] = lowest

  return 0
```

**算法复杂度分析**：

| 变量 | 含义 | 量级 |
|:-----|:-----|:----|
| n | Bars (总 K 线数) | ~5000 (D1 约 20 年) |
| k | Donchian_Period | 20 或 55 |
| 首次计算 | 双重循环 | O(n × k) ≈ 100K~275K 次比较 |
| 增量更新 | 仅 1 根 K 线 | O(k) ≈ 20~55 次比较 |

### 2.4 OnCalculate 算法 (MQL5)

```
输入:
  rates_total     : int
  prev_calculated : int
  high[]          : double[]
  low[]           : double[]
  ...

输出: rates_total

算法:
  start = prev_calculated > 0 ? prev_calculated - 1 : 0

  for i = start to rates_total - 1:
      highest = high[i]
      lowest  = low[i]
      lookback = min(period - 1, i)

      for j = 1 to lookback:
          if high[i-j] > highest: highest = high[i-j]
          if low[i-j]  < lowest:  lowest  = low[i-j]

      g_upperBuffer[i] = highest
      g_lowerBuffer[i] = lowest

  return rates_total
```

**MQL5 优势**：`high[]` 和 `low[]` 是 `OnCalculate` 直接传入的数组，无需 `iHigh()`/`iLow()` 函数调用，减少函数调用开销。

### 2.5 边界条件矩阵

| 条件 | MQL4 行为 | MQL5 行为 |
|:-----|:---------|:---------|
| `Bars == 0` | `limit = 0 - 0 = 0`，不循环 | `start = 0, rates_total = 0`，不循环 |
| `Bars < period` | 内层循环受 `i+j < Bars` 保护 | `lookback = min(period-1, i)` 保护 |
| `period == 1` | 内层 `j < 0`，不执行，`highest=High[i]` | `lookback = 0`，不执行 |
| `period == 0` | `j < -1` 永不成立？无限循环风险！ | `lookback = min(-1, i)` = -1 → **越界风险** |
| `IndicatorCounted() > Bars` | `limit < 0`，`if(limit<=0)` 拦截 | N/A |
| 首根 K 线 (`i == 0`) | `j < period-1`，`i+j < Bars` → `0+j < N` | `lookback = min(period-1, 0) = 0` |
| 末根 K 线 (`i == Bars-1`) | `j < period-1`，`i+j >= Bars` → break | `lookback = min(period-1, Bars-1)` |

**已知缺陷**：`Donchian_Period = 0` 时 MQL5 版本会越界。建议在 `OnInit` 中加防护：

```cpp
if (Donchian_Period < 1) Donchian_Period = 1;
```

### 2.6 算法优化：滑动窗口 (推荐升级)

当前 O(n×k) 的手动循环可优化为 O(n) 的滑动窗口算法：

```
算法 (滑动窗口最大/最小值):

  使用双端队列维护窗口内的最大值和最小值。

  数据结构:
    maxDeque : Deque<{index, value}>   // 递减队列，头部=最大值
    minDeque : Deque<{index, value}>   // 递增队列，头部=最小值

  伪代码:
    for i = 0 to rates_total-1:
        // 入队：维护单调性
        while maxDeque 非空 and maxDeque.tail.value <= high[i]:
            maxDeque.pop_tail()
        maxDeque.push_tail({i, high[i]})

        while minDeque 非空 and minDeque.tail.value >= low[i]:
            minDeque.pop_tail()
        minDeque.push_tail({i, low[i]})

        // 出队：移除窗口外的元素
        if maxDeque.head.index <= i - period:
            maxDeque.pop_head()
        if minDeque.head.index <= i - period:
            minDeque.pop_head()

        // 写入缓冲区
        g_upperBuffer[i] = maxDeque.head.value
        g_lowerBuffer[i] = minDeque.head.value
```

**复杂度对比**：

| 方案 | 时间复杂度 | 首次 5000 bars | 增量 1 bar |
|:-----|:---------|:-------------|:---------|
| 手动双重循环 | O(n×k) | ~275K 比较 (k=55) | ~55 比较 |
| iHighest/iLowest | O(n×log k) | ~50K 调用 | ~log(55) 调用 |
| 滑动窗口 | O(n) | ~10K 操作 | ~2 操作 |
| MQL5 + 滑动窗口 | O(n) | ~5K 操作 | ~2 操作 |

**建议**：v0.2 阶段升级到滑动窗口方案。在 MQL4 中实现双端队列会引入额外复杂度，折中方案是使用 `iHighest()`/`iLowest()`。

---

## 3. 与旧版 Tutle.mq4 的逐行算法对比

### 3.1 Donchian 计算

```
Tutle.mq4 (旧):                          Enterpy_Donchian.mq4 (新):
─────────────────────────────────────    ───────────────────────────
EntryMAX[i] = iHigh(Symbol(), Period(),  g_upperBuffer[i] = highest
  iHighest(Symbol(), Period(),           (手动循环计算)
  MODE_HIGH, LookBack_Entry, i));
                                         for j = 1 to period-1:
EntryMIN[i] = iLow(...);                    比较 High[i+j] 取最大
                                            比较 Low[i+j] 取最小
ExitMAX[i]  = iHigh(...周期不同...);
ExitMIN[i]  = iLow(...);
```

### 3.2 API 风格

```
Tutle:                                   Enterpy_Donchian:
──────────────────────────────           ──────────────────
int OnInit()                             int init()
int OnCalculate(const int rates_total,   int start()
    const int prev_calculated,           int limit = Bars
    const double &high[],                   - IndicatorCounted()
    ...)
ArraySetAsSeries(high, true)             直接用 High[i+j] 查询
```

### 3.3 差距总结

| 维度 | Tutle | Enterpy_Donchian | 差距 |
|:-----|:-----:|:---------------:|:---:|
| 算法效率 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | 2 星 |
| API 现代化 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | 2 星 |
| 通道数量 | ⭐⭐⭐⭐⭐ | ⭐⭐ | 3 星 |
| 代码简洁 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | -2 星 |
| 中文支持 | ⭐ | ⭐⭐⭐⭐⭐ | 4 星 |

Tutle 在算法和功能上更强，Enterpy_Donchian 在可读性上更优。

---

## 4. 指标属性完整声明表

### 4.1 MQL4

```cpp
// ATR
#property indicator_separate_window         // 独立副图
#property indicator_buffers 1               // 1 个缓冲区
#property indicator_color1  DodgerBlue      // 颜色
#property indicator_width1  2               // 线宽
#property indicator_label1  "ATR"           // 图例标签

// Donchian
#property indicator_chart_window            // 主图叠加
#property indicator_buffers 2               // 2 个缓冲区
#property indicator_color1  Orange          // 上轨颜色
#property indicator_color2  Orange          // 下轨颜色
#property indicator_width1  2               // 线宽
#property indicator_width2  2
#property indicator_style1  STYLE_SOLID     // 实线
#property indicator_style2  STYLE_SOLID
```

### 4.2 MQL5

```cpp
// ATR
#property indicator_separate_window
#property indicator_buffers 1
#property indicator_plots   1               // MQL5 特有：图线声明
#property indicator_type1   DRAW_LINE       // MQL5 特有：绘制类型
#property indicator_color1  DodgerBlue
#property indicator_width1  2
#property indicator_label1  "ATR"

// Donchian
#property indicator_chart_window
#property indicator_buffers 2
#property indicator_plots   2
#property indicator_type1   DRAW_LINE
#property indicator_type2   DRAW_LINE
#property indicator_color1  Orange
#property indicator_color2  Orange
#property indicator_width1  2
#property indicator_width2  2
#property indicator_style1  STYLE_SOLID
#property indicator_style2  STYLE_SOLID
```

**注意**：MQL5 需要 `#property indicator_plots N` 显式声明图线数量，少于此声明会导致部分缓冲区不渲染。这是一个常见陷阱。

---

## 5. 测试计划

### 5.1 单元测试 (手动验证)

| 测试项 | 步骤 | 验证点 |
|:-----|:-----|:-----|
| 首次加载 | 拖入指标到空白图表 | 无崩溃，缓冲区正确填充 |
| 周期切换 | H1 → D1 → M5 | 每个周期正确重算，无残留数据 |
| 极端 period | period=1, 100, 500 | 不崩溃，结果合理 |
| 多实例 | 拖入 3 个 Donchian (period=10,20,55) | 互不干扰 |
| 长时间运行 | 挂机 24h，观察内存 | 无内存泄漏 |

### 5.2 回归测试

```
测试脚本: 对比 iATR 内置值与 Enterpy_ATR 输出
  for i = 0 to 100:
      assert(abs(Enterpy_ATR[i] - iATR(..., i)) < 0.00001)

测试脚本: 对比 Tutle Donchian 值与 Enterpy_Donchian 输出
  设置相同 period
  for i = 0 to 100:
      assert(abs(Enterpy_Donchian.upper[i] - Tutle.EntryMAX[i]) < 0.00001)
```

---

## 6. 版本记录

| 版本 | 日期 | 变更 |
|:---:|:----:|:-----|
| v1.0 | 2026-06-05 | 初始版本：ATR/Donchian 完整详细设计 |