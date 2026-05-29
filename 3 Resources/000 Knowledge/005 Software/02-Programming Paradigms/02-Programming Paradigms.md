---
title: Programming Paradigms
tags: [software, paradigms, programming]
created: 2026-05-29
aliases: [程式設計範式, 02-Paradigms]
---

# 02 — Programming Paradigms 程式設計範式

> How should we structure code? A paradigm is a fundamental style of programming — a way of thinking about and organizing computation.
> 程式設計範式是程式設計的基本風格——一種思考與組織計算的方式。

---

## 範式總覽 Paradigm Overview

```
                    Programming Paradigms
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
   Imperative          Declarative         Reactive
   命令式                  聲明式                響應式
        │                  │
   ┌────┴────┐        ┌────┴────┐
   │         │        │         │
Procedural   OOP    Functional  Logic
程序式      物件導向     函數式      邏輯式
```

---

## 1. Procedural Programming 程序式程式設計

**核心理念**：程式是一系列按順序執行的指令（procedure calls）。

| 特性 | 說明 |
|------|------|
| 代表語言 | C, Pascal, Fortran, Go (部分) |
| 核心概念 | Procedures, functions, routines, step-by-step execution |
| 優點 | Simple, direct mapping to hardware, predictable |
| 缺點 | Difficult to scale, code reuse limited, global state issues |

```c
// C 範例：程序式風格
float calculate_area(float width, float height) {
    return width * height;
}
```

---

## 2. Object-Oriented Programming (OOP) 物件導向程式設計

**核心理念**：將資料與操作封裝為「物件」，透過程式設計模擬真實世界。

| 特性 | 說明 |
|------|------|
| 代表語言 | Java, C++, C#, Python, Ruby, Kotlin |
| 四大支柱 | Encapsulation, Inheritance, Polymorphism, Abstraction |
| 優點 | Code reuse, modularity, natural modeling |
| 缺點 | Over-engineering, verbose boilerplate, inheritance hell |

### SOLID 原則

| 原則 Principle | 說明 Description |
|---------------|-----------------|
| **S**ingle Responsibility | 一個類別只有一個改變的理由 |
| **O**pen/Closed | 對擴展開放，對修改關閉 |
| **L**iskov Substitution | 子類別必須能替換父類別 |
| **I**nterface Segregation | 不強迫客戶依賴不需要的介面 |
| **D**ependency Inversion | 依賴抽象而非具體實作 |

詳見 [[07-Software Design Patterns]]。

---

## 3. Functional Programming (FP) 函數式程式設計

**核心理念**：程式是數學函數的組合，避免可變狀態與副作用。

| 特性 | 說明 |
|------|------|
| 代表語言 | Haskell, Clojure, Elixir, Scala, F# |
| 核心概念 | Pure functions, immutability, higher-order functions, recursion |
| 優點 | Predictable, testable, parallelizable |
| 缺點 | Steep learning curve, performance overhead, I/O complexity |

### FP 核心概念

| 概念 | 說明 | 範例 |
|------|------|------|
| **Pure Function** | 相同輸入永遠產生相同輸出，無副作用 | `f(x) = x + 1` |
| **Immutability** | 資料建立後不可修改 | 建立新物件而非修改舊物件 |
| **Higher-Order Function** | 接受或返回函數的函數 | `map`, `filter`, `reduce` |
| **Function Composition** | 將簡單函數組合成複雜函數 | `f ∘ g (x) = f(g(x))` |
| **Monad** | 封裝副作用與鏈式操作的設計模式 | Maybe, Either, IO |

```javascript
// FP 風格：使用 map/filter/reduce 而非迴圈
const result = [1, 2, 3, 4, 5]
  .filter(n => n % 2 === 0)   // [2, 4]
  .map(n => n * 2)              // [4, 8]
  .reduce((a, b) => a + b, 0); // 12
```

---

## 4. Declarative Programming 聲明式程式設計

**核心理念**：描述「做什麼」(what)，而非「怎麼做」(how)。

| 特性 | 說明 |
|------|------|
| 代表語言 | SQL, HTML, CSS, Prolog, Terraform |
| 核心概念 | Describe the desired result; engine figures out execution |
| 優點 | Concise, less error-prone, high-level |
| 缺點 | Limited control, performance surprises, domain-specific |

```sql
-- SQL：描述想要的結果，不描述如何取得
SELECT name, age FROM users WHERE age > 18 ORDER BY name;
```

---

## 5. Reactive Programming 響應式程式設計

**核心理念**：以資料流 (data streams) 和變化傳播 (propagation of change) 為核心。

| 特性 | 說明 |
|------|------|
| 代表框架 | RxJS, ReactiveX, Spring WebFlux, Akka |
| 核心概念 | Observables, streams, event-driven, async data flow |
| 優點 | 自然處理非同步事件，解耦，backpressure 支援 |
| 缺點 | Debugging 困難，學習曲線陡峭 |

---

## 範式對比 Paradigm Comparison

| 維度 | Procedural | OOP | FP | Reactive |
|------|-----------|-----|-----|----------|
| **思維模式** | Step-by-step | Object interactions | Function composition | Stream transformation |
| **狀態管理** | Mutable, global | Encapsulated mutable | Immutable | Stream-based |
| **副作用** | Common | Controlled via encapsulation | Avoided | Managed via operators |
| **並行處理** | Manual (threads, locks) | Shared state (complex) | Natural (no shared state) | Natural (async streams) |
| **學習曲線** | Low | Medium | High | High |
| **適合場景** | Scripts, embedded | Enterprise apps, games | Data processing, compilers | UI, real-time systems |

---

## 多範式語言 Multi-Paradigm Languages

現代語言通常支援多種範式：

| 語言 | 支援的範式 |
|------|-----------|
| **Python** | Procedural, OOP, FP (部分) |
| **JavaScript/TypeScript** | Procedural, OOP (prototype), FP, Reactive |
| **Go** | Procedural, CSP concurrency, limited OOP |
| **Rust** | Procedural, FP, trait-based (OO-lite) |
| **Kotlin** | OOP, FP |
| **Scala** | OOP + FP (深度融合) |

詳見 [[08-Programming Language Ecosystems]]。

---

> 💡 **Key Insight**: 沒有「最好的範式」— 選擇取決於問題領域、團隊技能、與專案需求。優秀的工程師應熟悉多種範式，並根據場景靈活運用。
