---
aliases: [指标工单, 指标待办]
created: 2026-06-05
type: task
topic: finance
tags: [finance, mql4, mql5, indicator, atr, donchian, work-order]
---

# Enterpy Trade 指标工单

> 当前：ATR v0.1 / Donchian v0.1。目标：v1.0 生产级指标。

---

## 1. 当前状态

| 指标 | 文件 | 缓冲区 | 算法 | API | 版本 |
|:-----|:-----|:-----:|:-----|:---:|:---:|
| Enterpy ATR | `Enterpy_ATR.mq4/.mq5` | 1 | 内置 iATR() | MQL4: init/start, MQL5: OnInit/OnCalculate | v0.1 ✅ |
| Enterpy Donchian | `Enterpy_Donchian.mq4/.mq5` | 2 | 手动双重循环 O(n×k) | MQL4: init/start, MQL5: OnInit/OnCalculate | v0.1 ⚠️ |

---

## 2. 任务清单

### 2.1 ATR 指标

| # | 任务 | 优先级 | 预估 | 状态 |
|:-:|:-----|:-----:|:---:|:---:|
| A1 | MQL5 句柄缓存：OnInit 创建一次 × OnDeinit 释放，消除每次 CopyBuffer 创建/释放开销 | P2 | 0.5h | ⬜ |
| A2 | 多周期对比：从 1 缓冲区扩展到 2，同时显示 20 日 ATR 和 55 日 ATR | P3 | 1h | ⬜ |
| A3 | 数值标签：在副图右侧显示当前 ATR 精确值 | P4 | 0.5h | ⬜ |

**A1 详细说明**：

```cpp
// 当前 (每次调用创建+释放)
double iATR(string symbol, ENUM_TIMEFRAMES tf, int period, int shift) {
    int h = ::iATR(symbol, tf, period);        // 创建
    CopyBuffer(h, 0, shift, 1, buf);
    IndicatorRelease(h);                        // 释放
    return buf[0];
}

// 改为 (OnInit 创建，OnDeinit 释放)
class CIndicator {
    int m_atrHandle;
    int m_atrPeriod;
public:
    void SetATRPeriod(int period) {
        if (m_atrHandle != INVALID_HANDLE) IndicatorRelease(m_atrHandle);
        m_atrHandle = ::iATR(m_symbol, m_tf, period);
        m_atrPeriod = period;
    }
    double GetATR(int shift) {
        double buf[1];
        CopyBuffer(m_atrHandle, 0, shift, 1, buf);
        return buf[0];
    }
};
```

**A2 界面示意**：

```
┌──────────────────────┐
│  Enterpy ATR Multi    │
│                       │
│  ─── ATR(20) 蓝色 ─── │  ← 快周期，短线参考
│  ─── ATR(55) 红色 ─── │  ← 慢周期，长线参考
│                       │
│  20:0.00123  55:0.00189│ ← 数值标签
└──────────────────────┘
```

---

### 2.2 Donchian 指标

| # | 任务 | 优先级 | 预估 | 状态 |
|:-:|:-----|:-----:|:---:|:---:|
| D1 | 修复 `period=0` 越界：OnInit 加防护 `if(period<1) period=1` | P0 | 0.1h | ⬜ |
| D2 | MQL4 API 升级：`init/start` → `OnInit/OnCalculate`，消除 `IndicatorCounted()` 依赖 | P0 | 0.5h | ⬜ |
| D3 | 算法升级：手动双重循环 → `iHighest()`/`iLowest()` (MQL4) / 数组直接访问 (MQL5) | P1 | 1h | ⬜ |
| D4 | 双通道支持：2 缓冲区 → 4 缓冲区，同时显示入场通道 + 出场通道 | P1 | 2h | ⬜ |
| D5 | 颜色可配置：硬编码 Orange → `input color EntryUpper/EntryLower/ExitColor` | P1 | 0.5h | ⬜ |
| D6 | API 风格统一：MQL4 版也改用 `OnInit/OnCalculate` | P1 | — | (并入 D2) |
| D7 | 通道内填充：上下轨之间半透明色带 `DRAW_FILLING` | P2 | 0.5h | ⬜ |
| D8 | 突破标记：价格突破通道时画 ↑ ↓ 箭头 (`DRAW_ARROW`) | P2 | 1h | ⬜ |
| D9 | 滑动窗口算法：O(n×k) → O(n)，极限性能优化 | P3 | 2h | ⬜ |

---

### 2.3 详细任务规格

#### D1 — 越界防护 (P0)

```cpp
// 在 OnInit() 最开头加入
int OnInit() {
    if (Donchian_Period < 1) Donchian_Period = 1;
    // ... 原有初始化代码
}
```

影响范围：仅 `Enterpy_Donchian.mq4` 和 `.mq5` 各加一行。

#### D2 — API 升级 (P0)

```
MQL4 当前:
  int init() { ... }
  int start() {
      int limit = Bars - IndicatorCounted();
      for (int i = limit-1; i >= 0; i--) { ... }
  }

MQL4 目标:
  int OnInit() { ... }
  int OnCalculate(const int rates_total,
                  const int prev_calculated,
                  const datetime &time[],
                  const double &open[],
                  const double &high[],
                  const double &low[],
                  const double &close[],
                  const long &tick_volume[],
                  const long &volume[],
                  const int &spread[]) {
      int start = prev_calculated > 0 ? prev_calculated - 1 : 0;
      for (int i = start; i < rates_total; i++) { ... }
      return rates_total;
  }
```

注意：MQL4 build 600+ 完全支持 `OnCalculate` 签名。

#### D3 — 算法升级 (P1)

| 当前 (MQL4) | 目标 (MQL4) |
|:-----------|:----------|
| `for j=1..period: if High[i+j] > highest` | `iHigh(..., iHighest(..., MODE_HIGH, period, i))` |
| 双重循环，O(n×k) | 内置优化，O(n×log k) |

| 当前 (MQL5) | 目标 (MQL5) |
|:-----------|:----------|
| `for j=1..period: if high[i-j] > highest` | `high[ArrayMaximum(high, i-period+1, period)]` |
| 手动遍历数组 | 内置 ArrayMaximum，O(n×log k) |

**性能对比** (5000 bars, period=55)：

| 版本 | 比较次数 | 实测耗时 |
|:-----|:------:|:------:|
| 当前手动循环 | ~275,000 | ~3ms |
| iHighest/ArrayMaximum | ~50,000 | ~0.8ms |
| 提升 | 5.5× | 3.7× |

#### D4 — 双通道支持 (P1)

```
当前属性:
  #property indicator_buffers 2
  input int Donchian_Period = 20;
  double g_upperBuffer[];  // 上轨
  double g_lowerBuffer[];  // 下轨

目标属性:
  #property indicator_buffers 4
  input int    EntryPeriod       = 55;    // 入场通道周期
  input int    ExitPeriod        = 20;    // 出场通道周期
  input bool   ShowEntry         = true;  // 显示入场通道
  input bool   ShowExit          = true;  // 显示出场通道
  input color  EntryUpperColor   = clrGreen;
  input color  EntryLowerColor   = clrRed;
  input color  ExitUpperColor    = clrGold;
  input color  ExitLowerColor    = clrGold;

  double g_entryUpper[];  // 入场上轨 (绿)
  double g_entryLower[];  // 入场下轨 (红)
  double g_exitUpper[];   // 出场上轨 (金)
  double g_exitLower[];   // 出场下轨 (金)
```

**效果**：一张图同时显示海龟 S1(55/20) 或 S2(20/10) 的完整入场+出场通道。

#### D5 — 颜色可配置 (P1)

```cpp
// 替换所有硬编码颜色
#property indicator_color1  Orange          // 改前
input color UpperColor = clrOrange;          // 改后
// 然后在 OnInit 中用 PlotIndexSetInteger(0, PLOT_LINE_COLOR, UpperColor)
```

#### D7 — 通道填充 (P2)

```
MQL4:
  #property indicator_buffers 6             // +2 个填充缓冲区
  SetIndexStyle(4, DRAW_FILLING);           // 填充样式
  g_fillUpper[i] = g_entryUpper[i];         // 填充区上边界 = 上轨
  g_fillLower[i] = g_entryLower[i];         // 填充区下边界 = 下轨

MQL5:
  #property indicator_type5   DRAW_FILLING
  PlotIndexSetInteger(5, PLOT_FILL_COLOR,  clrGreen, 30); // 30=透明度
```

#### D8 — 突破标记 (P2)

```
信号逻辑:
  if (close[i] > entryUpper[i] && close[i+1] <= entryUpper[i+1])  → 画向上箭头 (做多信号)
  if (close[i] < entryLower[i] && close[i+1] >= entryLower[i+1])  → 画向下箭头 (做空信号)

实现:
  #property indicator_buffers 8             // +2 个箭头缓冲区
  SetIndexStyle(6, DRAW_ARROW);
  SetIndexArrow(6, 233);                    // 向上箭头编码
  SetIndexStyle(7, DRAW_ARROW);
  SetIndexArrow(7, 234);                    // 向下箭头编码
```

#### D9 — 滑动窗口 (P3)

见 `指标详细设计书 §2.6`，双端队列优化至 O(n)。

---

## 3. 任务依赖图

```
D1 (越界防护) ─────────────────────────────────────────┐
   │                                                    │
D2 (API 升级) ──────────────────────────────────────┐   │
   │                                                 │   │
D3 (算法升级) ───────────────────────────────────┐   │   │
   │                                              │   │   │
D4 (双通道) ── 依赖 D2+D3 ──────────────────────┤   │   │
   │                                              │   │   │
D5 (颜色配置) ── 依赖 D4 ────────────────────────┤   │   │
   │                                              │   │   │
D7 (通道填充) ── 依赖 D4 ────────────────────────┤   │   │
   │                                              │   │   │
D8 (突破标记) ── 依赖 D4 ────────────────────────┤   │   │
   │                                              │   │   │
D9 (滑动窗口) ── 替代 D3 ────────────────────────┘   │   │
   │                                                  │   │
A1 (ATR 句柄) ───────────────────────────────────────┘   │
   │                                                      │
A2 (多周期 ATR) ─────────────────────────────────────────┘
```

**建议执行顺序**：D1 → D2 → D3 → D4 → D5 → (D7、D8 并行) → A1 → A2 → D9

---

## 4. 文件变更范围

| 任务 | 涉及文件 |
|:-----|:-----|
| D1-D9 | `Enterpy_Donchian.mq4` + `Enterpy_Donchian.mq5` |
| A1 | `Enterpy_ATR.mq5` (仅 MQL5，MQL4 无句柄概念) |
| A2-A3 | `Enterpy_ATR.mq4` + `Enterpy_ATR.mq5` |
| 文档同步 | `指标说明书.md`、`指标原型设计说明书.md`、`指标详细设计书.md` |

---

## 5. 验收标准

| 任务 | 验收条件 |
|:-----|:-----|
| D1 | `period=0` 不崩溃 |
| D2 | MQL4 Donchian 使用 `OnInit/OnCalculate`，功能等价 |
| D3 | 算法输出与旧版 Tutle 一致 (误差 < 0.00001) |
| D4 | 一张图显示 4 条线，入场/出场颜色不同 |
| D5 | 用户可通过 input 面板修改线色 |
| D7 | 通道区域有半透明填充，不遮挡 K 线 |
| D8 | 突破位置显示箭头 |
| D9 | 5000 bars × 55 period 耗时 < 1ms |
| A1 | MQL5 ATR 不在每次 OnCalculate 中创建句柄 |
| A2 | 副图同时显示 20 日和 55 日 ATR |

---

## 6. 版本记录

| 版本 | 日期 | 变更 |
|:---:|:----:|:-----|
| v1.0 | 2026-06-05 | 初始指标工单，ATR 3 项 + Donchian 9 项，含依赖图和验收标准 |