---
aliases: [PARA System Architecture, 系统架构]
created: 2026-06-01
type: architecture
parent: "[[PARA+LLM-Wiki 融合系统]]"
tags: [architecture, design, system]
---

# PARA-System 架构设计文档

> PARA+LLM-Wiki 融合系统完整架构 | 6 Skill | 13 Wiki 子库

---

## 1. 系统全景

```
┌──────────────────────────────────────────────────────────────┐
│                     PARA+LLM-Wiki 融合系统                     │
│                                                               │
│  ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐     │
│  │ /triage │──►│/wiki-   │──►│/context │──►│ /lint   │     │
│  │ 分拣     │   │compile  │   │ 状态     │   │ 健康     │     │
│  └────┬─────┘   └────┬─────┘   └────┬─────┘   └────┬─────┘     │
│       │              │              │              │           │
│  ┌────┴──────────────┴──────────────┴──────────────┴────┐     │
│  │                   Vault 文件系统                       │     │
│  │  0 Inbox/ → 1 Projects/ → 3 Resources/ → 4 Archives/ │     │
│  └───────────────────────────────────────────────────────┘     │
│       │                                                        │
│  ┌────┴──────────────┬──────────────────────┐                 │
│  │  /daily-open       │  /weekly-review      │                 │
│  │  每日仪式           │  每周回顾             │                 │
│  └───────────────────┴──────────────────────┘                 │
└──────────────────────────────────────────────────────────────┘
```

---

## 2. 信息生命周期

```
Capture ──► Triage ──► Organize ──► Compile ──► Retrieve
   │           │           │            │            │
0 Inbox    /triage    PARA dirs   /wiki-compile  /context
   │           │           │            │            │
   └───────────┴───────────┴────────────┴──────► /lint
```

---

## 3. 六 Skill 架构

| Skill | 层 | 职责 | 触发 |
|-------|:--:|------|------|
| /triage | 输入 | Inbox → PARA 路由 | 手动/自动 |
| /wiki-compile | 处理 | raw/ → wiki/ 编译 | 手动/分拣后 |
| /context | 感知 | Vault 状态快照 | 会话开始 |
| /lint | 维护 | 健康检查+修复 | 手动/周 |
| /daily-open | 仪式 | 日记创建+填充 | 每日 |
| /weekly-review | 仪式 | 周回顾+归档+编译 | 每周 |

---

## 4. 数据流

```
0 Inbox/                     ← Web Clipper + 手动
    │
    ▼ /triage
┌───────────────────────┐
│ ephemeral → tasks.md   │
│ operational → Projects │
│ reference → raw/       │
│ evergreen → wiki/      │
└───────────────────────┘
    │
    ▼ /wiki-compile
3 Resources/[topic]/wiki/
├── concepts/   (23+)
├── entities/   (26+)
└── sources/
    │
    ▼ /context + /lint
检索 + 评分 + 修复
```

---

## 5. 13 Wiki 子库

| DDC | 子库                | concepts | entities |
| :-: | ----------------- | :------: | :------: |
| 000 | Knowledge-Systems |    23    |    26    |
| 100 | Philosophy        |    —     |    —     |
| 120 | Epistemology      |    38    |    —     |
| 200 | Religion          |    —     |    —     |
| 300 | Social Sciences   |    —     |    —     |
| 400 | Language          |    —     |    —     |
| 500 | Natural Sciences  |    —     |    —     |
| 600 | Applied Sciences  |    —     |    —     |
| 700 | Arts              |    —     |    —     |
| 800 | Literature        |    —     |    —     |
| 900 | History           |    —     |    —     |
|  —  | People            |    —     |    —     |
|  —  | Generative Art    |    4     |    1     |

---

## 6. 自动化

```
Cron 08:07 → raw/ 编译检查
Cron 09:03 → Inbox 分拣检查
/daily-open → 每日日记
/weekly-review → 周回顾+Lint
```

---

> 📎 关联: [[PARA+LLM-Wiki 融合系统\|项目首页]] | [[03-Skills 完整设计\|Skills 设计]] | [[../开发工作清单\|开发清单 60/60]]
