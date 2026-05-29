---
title: Software Engineering Overview
tags: [software, foundations, overview]
created: 2026-05-29
aliases: [軟體工程概述, 01-Software Engineering]
---

# 01 — Software Engineering Overview 軟體工程概述

> What is software engineering? How is it different from programming and computer science?
> 什麼是軟體工程？它與程式設計、電腦科學有何不同？

---

## 定義 Definition

**Software Engineering** is the systematic application of engineering approaches to the design, development, operation, and maintenance of software.

> 「軟體工程是將系統化的、規範化的、可量化的方法應用於軟體的開發、運行和維護。」— IEEE Standard 610.12

| 概念 | 焦點 Focus | 產出 Output |
|------|-----------|------------|
| **Computer Science** | 計算理論、演算法、資料結構 | 理論與證明 |
| **Programming** | 編寫程式碼解決問題 | 可運行的程式 |
| **Software Engineering** | 系統化地設計、構建、維護大型軟體 | 可靠、可維護的軟體系統 |

---

## 歷史 History

### 軟體危機 The Software Crisis (1960s–1970s)

- 硬體快速發展，軟體複雜度爆炸式增長
- 專案普遍超預算、超時、品質低劣
- 1968 NATO Conference on Software Engineering：首次提出 "software engineering" 術語
- **Fred Brooks** (1975) *The Mythical Man-Month*：Adding manpower to a late software project makes it later.（向延遲的軟體專案增加人手只會讓它更延遲）

### 結構化時代 Structured Era (1970s–1980s)

- Structured Programming (Dijkstra, 1968): "Go To Statement Considered Harmful"
- Waterfall Model (Royce, 1970)
- Structured Analysis & Design

### 物件導向時代 OO Era (1980s–1990s)

- C++ (1985), Java (1995)
- UML 統一建模語言 (1997)
- Design Patterns (GoF, 1994)

### 敏捷時代 Agile Era (2000s–2010s)

- **Agile Manifesto** (2001) — 徹底改變軟體開發方法論
- Scrum, XP (Extreme Programming), Kanban
- CI/CD, DevOps

### AI 時代 AI Era (2020s–)

- AI-assisted coding (GitHub Copilot, 2022)
- LLM-driven development
- Autonomous software engineering agents

---

## 核心概念 Core Concepts

### Brooks' Law 布魯克斯法則

> "Adding manpower to a late software project makes it later."

原因 Reasons：
1. **Ramp-up time** — 新人需要時間學習系統
2. **Communication overhead** — n 個人的溝通通道數 = n(n−1)/2
3. **Task divisibility limits** — 並非所有任務都可平行化

### No Silver Bullet (Brooks, 1986)

> 「沒有銀彈」— 沒有任何單一技術或方法能在十年內使軟體生產力提升一個數量級。

軟體的本質困難 Essential Difficulties：
- **Complexity** 複雜性 — 軟體實體比任何人造物都更複雜
- **Conformity** 一致性 — 軟體必須符合人為的介面與規範
- **Changeability** 可變性 — 軟體被認為是最容易修改的，因此不斷被要求改變
- **Invisibility** 不可見性 — 軟體沒有實體空間的幾何表徵

### 軟體生命週期 Software Lifecycle

```
Requirements → Design → Implementation → Testing → Deployment → Maintenance
   需求分析         設計           實作             測試          部署            維護
```

現代迭代模型見 [[04-Development Methodologies]]。

---

## 品質屬性 Quality Attributes

| 屬性 Attribute | 說明 Description |
|---------------|-----------------|
| **Correctness** 正確性 | 軟體是否符合規格 |
| **Reliability** 可靠性 | 在給定條件下無故障運行的機率 |
| **Maintainability** 可維護性 | 修改、修復、擴展的容易程度 |
| **Scalability** 可擴展性 | 處理增長的工作負載的能力 |
| **Security** 安全性 | 防止未授權存取與攻擊 |
| **Usability** 可用性 | 終端使用者使用的容易程度 |
| **Performance** 效能 | 回應時間、吞吐量、資源利用率 |

詳見各相關模組：[[03-Software Architecture]]（架構品質）、[[05-Software Testing]]（品質保證）。

---

## 相關模組 Related Modules

| 模組 | 關聯 |
|------|------|
| [[02-Programming Paradigms]] | 程式設計範式 — 軟體建構的基本方法 |
| [[04-Development Methodologies]] | 開發方法論 — 如何組織軟體開發流程 |
| [[05-Software Testing]] | 軟體測試 — 確保品質屬性的關鍵手段 |
| [[3 Resources/000 Knowledge/004 Computer Science & technology/README\|CS (DDC 004)]] | 電腦科學基礎 — 軟體工程的理論根基 |

---

> 💡 **Key Insight**: 軟體工程的核心挑戰不是「寫程式」，而是**管理複雜度**。所有方法論、架構模式、測試策略，歸根結底都是為了控制複雜度的增長。
