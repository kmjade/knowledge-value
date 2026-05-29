---
title: Development Methodologies
tags: [software, agile, devops, methodology]
created: 2026-05-29
aliases: [開發方法論, 04-Methodologies, Agile, Scrum]
---

# 04 — Development Methodologies 開發方法論

> How do teams organize work? From Waterfall to Agile to DevOps — the evolution of how we build software.
> 從瀑布模型到敏捷開發，再到 DevOps —— 軟體開發方法論的演進。

---

## 演進歷程 Evolution

```
1970s          1990s          2001            2010s          2020s
Waterfall  →  Iterative  →  Agile Manifesto →  DevOps  →  Platform Engineering
  瀑布          迭代             敏捷宣言          開發維運        平台工程
```

---

## 1. Waterfall Model 瀑布模型

**線性、順序的開發流程**。

```
Requirements → Design → Implementation → Testing → Deployment → Maintenance
```

| 特性 | 說明 |
|------|------|
| 適合 | 需求固定且明確的專案（政府、航太） |
| 優點 | Simple, predictable, well-documented |
| 缺點 | 難以應對變更，晚期才發現問題 |

---

## 2. Agile 敏捷開發

### Agile Manifesto 敏捷宣言 (2001)

> 我們在實踐中發現更好的軟體開發方法：
>
> - **Individuals and interactions** over processes and tools
> - **Working software** over comprehensive documentation
> - **Customer collaboration** over contract negotiation
> - **Responding to change** over following a plan

### 12 Principles 十二條原則

1. 最高優先級是通過早期且持續交付有價值的軟體來滿足客戶
2. 歡迎需求變更，即使在開發後期
3. 頻繁交付可工作的軟體（幾週到幾個月）
4. 業務人員與開發者每天一起工作
5. 圍繞有動機的個人建立專案，給予環境與信任
6. 面對面交談是最有效的溝通方式
7. 可工作的軟體是進度的主要度量標準
8. 敏捷過程促進可持續的開發節奏
9. 持續關注技術卓越與良好設計
10. 簡單——最大化未完成工作的藝術——至關重要
11. 最好的架構、需求和設計來自自組織團隊
12. 團隊定期反思如何變得更有效，並相應調整行為

---

## 3. Scrum

**最流行的敏捷框架**。

### Scrum Framework

```
         ┌──────────────────────────────┐
         │        Product Backlog       │
         └──────────────┬───────────────┘
                        │
         ┌──────────────┴───────────────┐
         │      Sprint Planning         │
         └──────────────┬───────────────┘
                        │
┌───────────────────────┴───────────────────────┐
│              Sprint (1–4 weeks)               │
│  ┌──────────────────────────────────────┐     │
│  │         Daily Scrum (15 min)          │     │
│  └──────────────────────────────────────┘     │
└───────────────────────┬───────────────────────┘
                        │
         ┌──────────────┴───────────────┐
         │       Sprint Review          │
         │    Sprint Retrospective      │
         └──────────────┬───────────────┘
                        │
         ┌──────────────┴───────────────┐
         │   Potentially Shippable      │
         │        Increment             │
         └──────────────────────────────┘
```

### Roles 角色

| Role | Responsibility |
|------|---------------|
| **Product Owner** | Defines vision, manages backlog, prioritizes value |
| **Scrum Master** | Facilitates process, removes impediments, coaches team |
| **Development Team** | Self-organizing, cross-functional, delivers increment |

### Artifacts 工件

| Artifact | Purpose |
|----------|---------|
| **Product Backlog** | 有序的需求清單 |
| **Sprint Backlog** | 本次 Sprint 要完成的項目 |
| **Increment** | Sprint 結束時可交付的軟體增量 |

---

## 4. Kanban

**基於流程視覺化與 WIP 限制的漸進式改進方法**。

| 特性 | Scrum | Kanban |
|------|-------|--------|
| **節奏** | Fixed sprints | Continuous flow |
| **角色** | PO, SM, Team | No required roles |
| **變更** | Within sprint boundary | Anytime |
| **度量** | Velocity | Cycle time, throughput |

```
To Do  │ In Progress (WIP:3) │ Review │ Done
───────┼─────────────────────┼────────┼──────
Task A │ Task C              │        │ Task B
Task D │ Task E              │        │
       │ Task F              │        │
```

---

## 5. DevOps

**Development + Operations 的文化融合**。

### Three Ways 三條路徑

| Way | Principle |
|-----|-----------|
| **First Way: Flow** | 從開發到維運的順暢流程 (CI/CD, automation) |
| **Second Way: Feedback** | 快速且持續的反饋迴路 (monitoring, alerts) |
| **Third Way: Learning** | 持續實驗與學習的文化 (blameless postmortems) |

### DevOps Toolchain

```
Plan → Code → Build → Test → Release → Deploy → Operate → Monitor
  │      │      │       │       │        │         │         │
  └──────┴──────┴───────┴───────┴────────┴─────────┴─────────┘
                          ∞ (continuous loop)
```

### CALMS Framework

| Element | Description |
|---------|-------------|
| **C**ulture | 協作、共擔責任、無咎錯文化 |
| **A**utomation | CI/CD、IaC、自動化測試 |
| **L**ean | 消除浪費、小批量交付 |
| **M**easurement | 監控、指標、數據驅動決策 |
| **S**haring | 跨團隊知識分享 |

---

## 6. 現代趨勢 Modern Trends

| Methodology | Description |
|-------------|-------------|
| **Platform Engineering** | 構建內部開發者平台 (IDP)，降低認知負荷 |
| **GitOps** | Git 作為單一真相來源，自動同步基礎設施 |
| **Trunk-Based Development** | 短生命週期分支，頻繁合併主幹 |
| **Shape Up** (Basecamp) | 6 週循環，固定時間可變範圍 |

---

> 💡 **Key Insight**: Methodology is a means, not an end. The best teams adapt their process to their context — 最好的團隊根據上下文調整流程，而非盲目照搬框架。
