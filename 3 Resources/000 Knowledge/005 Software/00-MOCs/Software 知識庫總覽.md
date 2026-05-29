---
title: Software 知識庫總覽
tags: [software, moc, overview]
created: 2026-05-29
aliases: [Software Overview, 軟體知識庫全景]
---

# Software 知識庫總覽

> DDC 005 全景地圖 — 軟體工程的完整知識圖譜，從程式設計到系統架構，從開發流程到開源生態。

---

## 知識領域圖譜 Knowledge Domain Map

```
                    ┌──────────────────────────────────┐
                    │     Software Engineering (DDC 005)     │
                    └──────────────────────────────────┘
                                      │
          ┌───────────────────────────┼───────────────────────────┐
          │                           │                           │
    ┌─────┴─────┐              ┌─────┴─────┐              ┌─────┴─────┐
    │  Foundations  │              │   Process    │              │  Ecosystem   │
    │  基礎理論        │              │   開發流程      │              │  生態系統       │
    └─────┬─────┘              └─────┬─────┘              └─────┬─────┘
          │                           │                           │
  ┌───────┼───────┐            ┌──────┼──────┐           ┌───────┼───────┐
  │       │       │            │      │      │           │       │       │
Paradigms  Arch  Patterns  Methodo- Testing  VCS    Languages  FOSS  Tools
程式範式   架構   設計模式   開發方法   測試    版本控制   語言生態   開源   工具鏈
```

---

## 子領域總覽 Subdomain Overview

### 1. 基礎理論 Foundations

| 模組 | 核心問題 | 關鍵概念 |
|------|---------|---------|
| [[01-Software Engineering Overview]] | What makes software engineering different from programming? | Software crisis, Brooks' law, lifecycle |
| [[02-Programming Paradigms]] | How should we structure code? | OOP, FP, Reactive, Declarative, Procedural |
| [[07-Software Design Patterns]] | What are proven solutions to recurring problems? | GoF 23, SOLID, DDD, Anti-patterns |

### 2. 開發流程 Process

| 模組 | 核心問題 | 關鍵概念 |
|------|---------|---------|
| [[04-Development Methodologies]] | How do teams organize work? | Agile, Scrum, Kanban, DevOps, Waterfall |
| [[05-Software Testing]] | How do we ensure quality? | Testing pyramid, TDD, BDD, automation |
| [[06-Version Control & Collaboration]] | How do teams collaborate on code? | Git, CI/CD, Code Review, trunk-based dev |

### 3. 生態系統 Ecosystem

| 模組 | 核心問題 | 關鍵概念 |
|------|---------|---------|
| [[03-Software Architecture]] | How do we structure systems? | Monolith, Microservices, Event-driven, Clean Arch |
| [[08-Programming Language Ecosystems]] | Which language for which job? | Python, JS/TS, Go, Rust, Java ecosystems |
| [[09-Open Source & Licensing]] | How does open source work? | FOSS, MIT/GPL/Apache, governance, Inner Source |

---

## 技術里程碑 Technology Milestones

| 年份 Year | 里程碑 Milestone | 影響 Impact |
|-----------|-----------------|------------|
| 1968 | NATO Software Engineering Conference | 首次定義「軟體工程」術語 |
| 1970 | Royce's Waterfall Model | 第一個正式的軟體開發生命週期模型 |
| 1972 | C Language (Dennis Ritchie) | 系統程式設計的基石 |
| 1985 | C++ (Bjarne Stroustrup) | OOP 進入主流 |
| 1991 | Linux Kernel (Linus Torvalds) | 開源運動的旗艦專案 |
| 1994 | GoF Design Patterns | 23 種設計模式標準化 |
| 1995 | Java (Sun Microsystems) | "Write Once, Run Anywhere" |
| 2001 | Agile Manifesto | 徹底改變軟體開發方法論 |
| 2005 | Git (Linus Torvalds) | 分散式版本控制的革命 |
| 2008 | GitHub Launch | 社交化程式設計與開源協作平台 |
| 2009 | DevOps (Velocity Conf) | 開發與維運的融合 |
| 2010 | Microservices | 單體架構的替代方案興起 |
| 2014 | Docker 1.0 | 容器化改變部署方式 |
| 2015 | Rust 1.0 | 記憶體安全的新典範 |
| 2022 | ChatGPT / Copilot | AI 輔助程式設計成為主流 |
| 2024+ | AI-Native Development | LLM Agent 驅動的自主軟體開發 |

---

## 學習路徑建議 Learning Path

```
入門 Beginner        中階 Intermediate      進階 Advanced         專家 Expert
────────────────────────────────────────────────────────────────────────
 01 Overview    →    02 Paradigms     →    03 Architecture    →    07 Patterns
 04 Methodologies  05 Testing          06 VCS & Collab        08 Ecosystems
 09 Open Source                                                     09 Governance
```

詳見 [[Software 學習路徑]]。

---

## 跨庫關聯 Cross-KB Links

| 相關知識庫 | 關聯說明 |
|-----------|---------|
| [[3 Resources/000 Knowledge/004 Computer Science & technology/README\|CS (DDC 004)]] | 硬體、OS、網路、演算法 —— 軟體的底層基礎 |
| [[3 Resources/000 Knowledge/006 Artificial-Intelligence/README\|AI (DDC 006)]] | AI 輔助程式設計、LLM Agent、MLOps |
| [[3 Resources/000 Knowledge/000 Knowledge\|Knowledge (DDC 000)]] | 知識組織與分類體系 |

---

> 💡 **Pro Tip**: 建議從里程碑圖譜建立時間線感知，再深入各子領域模組。
