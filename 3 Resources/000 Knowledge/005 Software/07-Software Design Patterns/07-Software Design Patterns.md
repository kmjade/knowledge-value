---
title: Software Design Patterns
tags: [software, design-patterns, architecture]
created: 2026-05-29
aliases: [軟體設計模式, 07-Patterns, GoF, SOLID]
---

# 07 — Software Design Patterns 軟體設計模式

> Proven solutions to recurring design problems. Design patterns are not recipes — they're conceptual tools for thinking about software structure.
> 設計模式不是食譜——它們是思考軟體結構的概念工具。

---

## SOLID 原則

重溫 [[02-Programming Paradigms]] 中介紹的五大原則：

| 原則 | 核心思想 | 違反的後果 |
|------|---------|-----------|
| **S**RP | 一個類別只有一個改變的理由 | God class, 修改影響範圍過大 |
| **O**CP | 開放擴展，關閉修改 | 每次新增功能都要改既有程式碼 |
| **L**SP | 子類別能無縫替換父類別 | 多型失效，型別檢查混亂 |
| **I**SP | 不強迫實作不需要的方法 | Fat interface, 空方法充斥 |
| **D**IP | 依賴抽象而非具體 | 高層模組與低層模組緊耦合 |

---

## GoF Design Patterns (Gang of Four, 1994)

### Creational Patterns 創建型模式 (5)

| Pattern | 核心思想 | 使用場景 |
|---------|---------|---------|
| **Singleton** | 確保一個類別只有一個實例 | Logger, config manager, DB connection pool |
| **Factory Method** | 將物件建立委派給子類別 | 建立不同類型的 UI 元件、文檔解析器 |
| **Abstract Factory** | 建立相關物件家族 | 跨平台 UI toolkit |
| **Builder** | 逐步構建複雜物件 | 複雜的 query builder, HTTP request builder |
| **Prototype** | 通過複製來建立新物件 | 物件建立成本高，需要快速複製 |

```python
# Singleton example
class DatabaseConnection:
    _instance = None
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance
```

### Structural Patterns 結構型模式 (7)

| Pattern | 核心思想 | 使用場景 |
|---------|---------|---------|
| **Adapter** | 轉換介面以相容不同系統 | 整合第三方 API 與 legacy code |
| **Decorator** | 動態添加行為 | Middleware, logging wrapper |
| **Facade** | 提供簡化介面到複雜系統 | 對複雜子系統的單一入口 |
| **Proxy** | 控制對物件的存取 | Lazy loading, access control |
| **Composite** | 統一處理單體與組合 | 檔案系統（檔案 + 目錄） |
| **Bridge** | 分離抽象與實作 | 跨平台的繪圖引擎 |
| **Flyweight** | 共享細粒度物件 | 文字編輯器的字元快取 |

```python
# Decorator example
@log_execution_time
@authenticate
def handle_request(request):
    ...
```

### Behavioral Patterns 行為型模式 (11)

| Pattern | 核心思想 | 使用場景 |
|---------|---------|---------|
| **Observer** | 一對多依賴通知 | Event listeners, pub/sub |
| **Strategy** | 可互換的演算法家族 | 排序策略、支付方式 |
| **Command** | 將請求封裝為物件 | Undo/redo, job queues |
| **State** | 根據狀態改變行為 | Order state machine |
| **Chain of Responsibility** | 沿鏈傳遞請求 | Middleware pipeline, error handling |
| **Template Method** | 定義骨架，子類別填補細節 | Framework hooks |
| **Iterator** | 統一遍歷集合的方式 | `for item in collection` |
| **Mediator** | 集中管理物件互動 | Chat room, air traffic control |
| **Memento** | 捕捉與恢復狀態 | Undo functionality |
| **Visitor** | 分離演算法與資料結構 | AST traversal, export formats |

---

## 現代模式 Modern Patterns

### Dependency Injection (DI)

```python
# Without DI (tight coupling)
class OrderService:
    def __init__(self):
        self.db = PostgresDatabase()  # hard-coded dependency
        self.notifier = EmailNotifier()

# With DI (loose coupling)
class OrderService:
    def __init__(self, db: Database, notifier: Notifier):
        self.db = db
        self.notifier = notifier
```

### Repository Pattern

```python
class UserRepository:
    def find_by_id(self, id: int) -> User: ...
    def save(self, user: User) -> None: ...
    def find_by_email(self, email: str) -> User | None: ...
```

### CQRS (Command Query Responsibility Segregation)

```
 ┌──────────┐     ┌──────────┐
 │ Command   │────►│  Write   │
 │  Model    │     │   DB     │
 └──────────┘     └──────────┘
                        │
                   (sync/async)
                        │
 ┌──────────┐     ┌──────┴───┐
 │  Query    │◄────│  Read    │
 │  Model    │     │   DB     │
 └──────────┘     └──────────┘
```

---

## Domain-Driven Design (DDD) 戰術模式

| Pattern | 說明 |
|---------|------|
| **Entity** | 有唯一身份的物件（User, Order） |
| **Value Object** | 無身份、由屬性定義（Money, Address） |
| **Aggregate** | 交易一致性邊界 |
| **Repository** | 聚合的持久化抽象 |
| **Domain Service** | 不屬於任何單一實體的領域邏輯 |
| **Domain Event** | 領域中發生的重要事件 |
| **Bounded Context** | 模型的明確邊界 |

---

## 反模式 Anti-Patterns to Avoid

| 反模式 | 描述 | 解法 |
|--------|------|------|
| **God Object** | 一個類別做太多事 | SRP: 拆分成多個專注的類別 |
| **Spaghetti Code** | 無結構的混亂程式碼 | 模組化、遵循架構原則 |
| **Golden Hammer** | 用同一種模式解決所有問題 | 根據上下文選擇合適模式 |
| **Premature Optimization** | 過早最佳化 | 先正確，再快速（Make it work → right → fast） |
| **Cargo Cult** | 盲目套用模式不理解原因 | 理解 "why" 再套用 |
| **Lava Flow** | 無人理解的遺留程式碼 | Refactoring, 測試覆蓋 |

---

## 模式選擇指南 Pattern Selection Guide

| 問題 | 考慮的模式 |
|------|-----------|
| 需要確保只有一個實例 | Singleton |
| 需要根據條件建立不同物件 | Factory Method / Abstract Factory |
| 需要不相容的介面協作 | Adapter |
| 需要動態添加行為 | Decorator |
| 需要一對多的事件通知 | Observer |
| 需要可替換的演算法 | Strategy |
| 需要 undo/redo | Command + Memento |
| 需要簡化複雜子系統 | Facade |

---

> 💡 **Key Insight**: Patterns are discovered, not invented. They emerge from solving real problems repeatedly. 模式是被發現的，不是被發明的。先理解問題，再找模式——而不是相反。
