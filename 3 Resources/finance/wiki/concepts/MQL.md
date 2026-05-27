---
aliases:
  - MQL4
  - MQL5
  - MetaQuotes Language
created: 2026-05-27
type: concept
topic: finance
status: reviewed
---

# MQL (MetaQuotes Language)

## 定义

MQL 是 MetaQuotes 公司为 MetaTrader 平台开发的内置编程语言，用于编写自动交易系统 (EA)、自定义技术指标、脚本和函数库。MQL4 面向 MT4，MQL5 面向 MT5，两者语法相似但架构不同。

## 核心原理

### MQL4 vs MQL5 对比

| 维度 | MQL4 | MQL5 |
|------|------|------|
| **范式** | 面向过程 | 面向对象 |
| **执行速度** | 基准 | **快 20 倍** |
| **事件驱动** | 基础 | 完整事件模型 |
| **交易操作** | 同步 | 同步 + 异步 |
| **指标缓冲区** | 有限 | 512 个（无限制） |
| **多品种** | 困难 | 原生支持 |
| **OpenCL** | ❌ | ✅ GPU 加速 |
| **云存储** | ❌ | ✅ MQL5 Storage |

### 可创建的程序类型

```
MQL 程序
├── Expert Advisor (EA)    ← 自动交易系统
├── Custom Indicator        ← 自定义技术指标
├── Script                  ← 一次性执行脚本
├── Library                 ← 可复用函数库
└── Include File            ← 头文件/代码模块
```

## 关键要点

1. **类 C 语法** — 有 C/C++ 基础上手极快
2. **事件驱动 (MQL5)** — `OnTick()` 处理价格变动，`OnTrade()` 处理交易事件
3. **订单发送 (MQL5)** — `OrderSend()` 同步，`OrderSendAsync()` 异步高速发送
4. **账户不互通** — MT4 EA 和 MT5 EA 需要分别用 MQL4 和 MQL5 编写

### MQL5 典型代码结构

```cpp
// 输入参数
input double LotSize = 0.1;
input int StopLoss = 50;

// 初始化
int OnInit() {
    return INIT_SUCCEEDED;
}

// 每次 Tick 触发
void OnTick() {
    // 策略逻辑
}

// 清理
void OnDeinit(const int reason) {
}
```

## 相关概念

- [[Expert-Advisor]] — MQL 最主要的产品类型
- [[Algorithmic-Trading]] — 算法交易
- [[Backtesting]] — 策略回测与优化

## 相关实体

- [[MetaTrader]] — MQL 的运行平台
- [[MT4]] — MQL4 宿主环境
- [[MT5]] — MQL5 宿主环境
- [[MetaEditor]] — MQL 集成开发环境 (IDE)

## 生态资源

| 资源 | 说明 |
|------|------|
| MQL5.com Market | 交易应用买卖市场 (10,000+ 产品) |
| MQL5 Freelance | 程序员接单平台 |
| Code Base | 免费源码库 |
| MQL5 Articles | 社区技术文章 |
| MQL5 Storage | 云端版本控制 |

## Sources

- [MQL5 官方文档](https://www.mql5.com)
- [MQL4 百度百科](https://baike.baidu.com/item/MQL4)
- [MQL5 百度百科](https://baike.baidu.com/item/MQL5)
- [[3 Resources/finance/raw/MetaTrader/07-MQL编程/07-MQL 编程.md]]
