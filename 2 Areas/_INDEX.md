---
aliases:
  - Areas Index
  - 领域入口
created: 2026-05-31
type: index
tags:
  - index/areas
---

# 🧭 Areas 领域

> 持续维护的生活责任 — 没有「完成」状态

← [[_meta/_INDEX|总览]] | [[2 Areas/2 Areas|领域主页]]

---

## 🗂️ 六大领域

| # | 领域 | 入口 | 检视频率 |
|---|------|------|:---:|
| 01 | 🏥 **Health 健康** | [[01-Health/01-Health\|→]] | 每周 |
| 02 | 💼 **Career 职业** | [[02-Career/02-Career\|→]] | 每月 |
| 03 | 💰 **Finance 财务** | [[03-Finance/\|→]] | 每月 |
| 04 | 👥 **Relationships 人际** | [[04-Relationships/04-Relationships\|→]] | 每月 |
| 05 | 📖 **Learning 学习** | [[05-Learning/05-Learning\|→]] | 每周 |
| 06 | 🌿 **Lifestyle 生活** | [[06-Lifestyle/06-lifestyle\|→]] | 每季 |

---

## 📋 领域文件索引

```dataview
LIST
FROM "2 Areas"
WHERE file.name != "2 Areas"
  AND file.name != "📁 領域結構"
  AND file.name != "_INDEX"
SORT file.folder ASC, file.name ASC
LIMIT 10
```

---

## 🔄 领域 ↔ 项目

```
领域 (Area) ──衍生──▶ 项目 (Project)
   │                      │
   │    持续责任          │  有截止日期
   │                      ▼
   ◀──反馈──      4 Archives (归档)
```

---

## 🔗 相关

- [[1 Projects/_INDEX|项目]] — 从领域衍生的短期任务
- [[3 Resources/_INDEX|资源]] — 支撑领域的知识
- [[📁 領域結構]] — 领域结构说明
