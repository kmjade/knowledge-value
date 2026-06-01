---
aliases:
  - People MOC
  - 人物关系管理入口
created: 2026-06-01
type: index
topic: people
status: active
---

# People — 人物关系管理

> 关系智能层 — 记录、维护、调用你与所有人的互动与背景。

---

## 📊 人物概览

```dataview
TABLE WITHOUT ID
  file.link AS "人物",
  tier AS "Tier",
  type AS "类型",
  status AS "状态"
FROM "3 Resources/people/wiki/entities"
SORT tier ASC, file.name ASC
```

---

## 🔗 跨层连接

| 层级 | 位置 | 用途 |
|:---:|------|------|
| 🟢 行动 | `[[2 Areas/04-Relationships/]]` | 关系维护 · 互动跟进 |
| 🔵 知识 | `3 Resources/people/wiki/` | 人物档案 · 关系图谱 |
| ⚪ 研究 | `[[3 Resources/900/920-传记与人物/]]` | 历史人物传记 |

---

## 📂 子库结构

```
people/
├── [[CLAUDE]]                  ← Schema
├── raw/                        ← 原始资料 (人类维护)
│   ├── conversations/
│   └── meetings/
├── wiki/                       ← 编译产物 (AI 独占)
│   ├── index.md
│   ├── log.md
│   └── entities/               ← 人物实体页
└── outputs/
```

---

## 🔗 相关

- [[CLAUDE|People Schema]] — 子库完整规范
- [[People 分类码]] — 人物/传记四体系分类码
- [[CRM 分类码]] — CRM 系统分类码
- [[_META-INDEX|Wiki 全局导航]]

---

*DDC: 060 · 状态: 🟢 活跃*
