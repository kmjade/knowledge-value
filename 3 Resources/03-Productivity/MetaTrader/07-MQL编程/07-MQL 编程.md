---
title: 07-MQL 编程
tags: [metatrader/mql, programming]
created: 2026-05-26
---

# 07 - MQL 编程基础

## MQL4 vs MQL5

| 特性 | MQL4 | MQL5 |
|------|------|------|
| 语法 | 类 C 语言 | 类 C++（OOP） |
| 文件后缀 | .mq4 → .ex4 | .mq5 → .ex5 |
| 回测速度 | 慢（单线程） | 快（多线程） |
| 内置函数 | 较少 | 更丰富 |
| 事件处理 | 3 种 | 10+ 种 |

## 三种程序类型

| 类型 | 说明 | 运行方式 |
|------|------|----------|
| **EA**（Expert Advisor） | 自动交易 | 附加到图表，随 tick 运行 |
| **指标**（Indicator） | 技术指标 | 附加到图表显示 |
| **脚本**（Script） | 一次性任务 | 运行一次后结束 |

## 第一个 EA（MQL4）

```c
//+------------------------------------------------------------------+
//|                                               SimpleMA_EA.mq4     |
//+------------------------------------------------------------------+
#property copyright "Your Name"
#property version   "1.00"

// 输入参数 — 用户可调整
input double LotSize = 0.1;      // 手数
input int    FastMA = 10;        // 快线周期
input int    SlowMA = 30;        // 慢线周期
input int    StopLoss = 200;     // 止损点数
input int    TakeProfit = 400;   // 止盈点数

// 全局变量
double maFast, maSlow;
double maFastPrev, maSlowPrev;

//+------------------------------------------------------------------+
//| 初始化函数                                                        |
//+------------------------------------------------------------------+
int OnInit()
{
    return(INIT_SUCCEEDED);
}

//+------------------------------------------------------------------+
//| 每 tick 执行一次                                                  |
//+------------------------------------------------------------------+
void OnTick()
{
    // 获取当前和上一根 K 线的 MA 值
    maFast = iMA(NULL, 0, FastMA, 0, MODE_SMA, PRICE_CLOSE, 0);
    maSlow = iMA(NULL, 0, SlowMA, 0, MODE_SMA, PRICE_CLOSE, 0);
    maFastPrev = iMA(NULL, 0, FastMA, 0, MODE_SMA, PRICE_CLOSE, 1);
    maSlowPrev = iMA(NULL, 0, SlowMA, 0, MODE_SMA, PRICE_CLOSE, 1);

    // 金叉买入
    if(maFastPrev < maSlowPrev && maFast > maSlow)
    {
        if(OrdersTotal() == 0)  // 没有持仓
        {
            OrderSend(Symbol(), OP_BUY, LotSize, Ask, 3, 
                      Ask - StopLoss * Point, 
                      Ask + TakeProfit * Point, 
                      "MA Cross Buy", 0, 0, clrGreen);
        }
    }

    // 死叉卖出
    if(maFastPrev > maSlowPrev && maFast < maSlow)
    {
        if(OrdersTotal() == 0)
        {
            OrderSend(Symbol(), OP_SELL, LotSize, Bid, 3,
                      Bid + StopLoss * Point,
                      Bid - TakeProfit * Point,
                      "MA Cross Sell", 0, 0, clrRed);
        }
    }
}

//+------------------------------------------------------------------+
```

## MQL5 版本关键差异

```cpp
// MQL5 使用面向对象
#include <Trade/Trade.mqh>
CTrade trade;

void OnTick()
{
    // 获取指标
    double maFast[], maSlow[];
    ArraySetAsSeries(maFast, true);
    ArraySetAsSeries(maSlow, true);
    
    // 使用内置类下单
    trade.Buy(LotSize, Symbol(), 0, sl, tp, "Buy");
}
```

## 学习路径

```
第 1 步：学会编译和运行示例 EA
第 2 步：修改别人的 EA（改参数、改逻辑）
第 3 步：写简单脚本（一键平仓等）
第 4 步：写自定义指标
第 5 步：写完整 EA
```

---

## 相关笔记

- [[04-自动交易]] — EA 的使用
- [[05-策略回测]] — 测试你的 EA
- [[MetaTrader 资源收集]] — MQL 文档
