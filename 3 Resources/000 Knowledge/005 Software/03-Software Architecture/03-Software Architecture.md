---
title: Software Architecture
tags: [software, architecture, design]
created: 2026-05-29
aliases: [軟體架構, 03-Architecture]
---

# 03 — Software Architecture 軟體架構

> How do we structure systems? Software architecture is about the fundamental organization of a system, embodied in its components, their relationships, and the principles governing its design and evolution.
> 軟體架構是系統的基本組織方式——元件、關係，以及指導其設計與演進的原則。

---

## 架構模式 Architectural Patterns

### 1. Monolithic Architecture 單體架構

**所有功能打包為單一部署單元**。

| 特性 | 說明 |
|------|------|
| 適合 | 小型團隊、早期產品、簡單業務邏輯 |
| 優點 | Simple to develop, deploy, test; low operational overhead |
| 缺點 | Scaling bottleneck, tight coupling, technology lock-in |
| 範例 | 傳統 Rails/Django 應用 |

```
┌──────────────────────────────┐
│        Monolith              │
│  ┌──────┐ ┌──────┐ ┌──────┐ │
│  │  UI  │ │Orders│ │Users │ │
│  └──────┘ └──────┘ └──────┘ │
│        Single Database       │
└──────────────────────────────┘
```

### 2. Microservices Architecture 微服務架構

**系統拆分為獨立部署的細粒度服務**。

| 特性 | 說明 |
|------|------|
| 適合 | 大規模系統、多團隊、獨立擴展需求 |
| 優點 | Independent deploy, team autonomy, polyglot tech stack |
| 缺點 | Network complexity, distributed debugging, data consistency |
| 關鍵模式 | API Gateway, Service Discovery, Circuit Breaker |

```
┌───────┐  ┌───────┐  ┌───────┐
│  Auth │  │Orders │  │Payment│
└───┬───┘  └───┬───┘  └───┬───┘
    │          │          │
┌───┴──────────┴──────────┴───┐
│        API Gateway          │
└─────────────┬───────────────┘
              │
         ┌────┴────┐
         │ Client  │
         └─────────┘
```

### 3. Service-Oriented Architecture (SOA)

**企業級服務導向架構**—微服務的前身。

| vs Microservices | SOA | Microservices |
|-----------------|-----|---------------|
| Communication | ESB (Enterprise Service Bus) | Lightweight (REST/gRPC) |
| Data | Shared database | Database per service |
| Scope | Enterprise-wide | Bounded context |

---

## 架構風格 Architectural Styles

### Layered Architecture 分層架構

```
┌────────────────────┐
│   Presentation     │  ← UI / API Controllers
├────────────────────┤
│   Application      │  ← Use Cases / Business Logic
├────────────────────┤
│   Domain           │  ← Entities / Domain Logic
├────────────────────┤
│   Infrastructure   │  ← DB / External Services
└────────────────────┘
```

### Hexagonal Architecture (Ports & Adapters) 六邊形架構

```
        ┌──────────────┐
   HTTP │              │  DB
 ──────►│   Domain     ├──────►
   gRPC │   (Core)     │  Queue
 ──────►│              ├──────►
        └──────────────┘
```

核心理念：核心業務邏輯與外部依賴（DB、API、Queue）完全解耦。

### Clean Architecture

同心圓結構，依賴方向永遠指向內層：

```
Entities → Use Cases → Interface Adapters → Frameworks & Drivers
  (內層)  ←─────────────────────────────────── (外層)
```

### Event-Driven Architecture 事件驅動架構

```
Producer → Event Bus → Consumer
   │                      │
   └──────────────────────┘
        (asynchronous)
```

---

## 架構決策 Architecture Decision Records (ADR)

ADR 是記錄架構決策的輕量級文件：

```markdown
# ADR-001: Use PostgreSQL as Primary Database

## Status
Accepted (2026-05-29)

## Context
Need a relational database with strong ACID guarantees...

## Decision
Use PostgreSQL 16.

## Consequences
- Positive: ACID, JSONB, strong ecosystem
- Negative: Vertical scaling limits, connection pooling needed
```

---

## CAP Theorem CAP 定理

分散式系統只能同時滿足三項中的兩項：

| 選擇 | 犧牲 | 典型系統 |
|------|------|---------|
| **CP** (Consistency + Partition Tolerance) | Availability | HBase, MongoDB (configurable) |
| **AP** (Availability + Partition Tolerance) | Consistency | Cassandra, DynamoDB, CouchDB |
| **CA** (Consistency + Availability) | Partition Tolerance | 單體 RDBMS (無網路分區) |

---

## 架構評估 Architecture Evaluation

| 維度 | 單體 Monolith | 微服務 Microservices |
|------|-------------|---------------------|
| 開發複雜度 | Low | High |
| 部署複雜度 | Low | High |
| 擴展彈性 | Limited (scale all) | Granular (scale per service) |
| 團隊自治 | Low | High |
| 除錯難度 | Low (single process) | High (distributed tracing) |
| 資料一致性 | Easy (single DB) | Hard (eventual consistency) |

---

## 現代趨勢 Modern Trends

| 趨勢 | 說明 |
|------|------|
| **Modular Monolith** | 單體但按模組組織，為未來拆分做準備 |
| **Serverless** | AWS Lambda、Cloudflare Workers |
| **Event Sourcing + CQRS** | 事件溯源與命令查詢責任分離 |
| **Backend for Frontend (BFF)** | 為每個前端類型（Web/Mobile）提供專屬 API 層 |

---

> 💡 **Key Insight**: 沒有「最好」的架構，只有「最適合當前上下文」的取捨 (trade-off)。Start simple, evolve as needed. 從單體開始，按需求演進。
