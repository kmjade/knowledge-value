---
aliases:
  - Projects Index
  - 项目入口
created: 2026-05-31
type: index
tags:
  - index/projects
---

# 📋 Projects 项目

> 有明确目标和截止日期的短期任务

← [[_meta/_INDEX|总览]] | [[1 Projects/1 Projects|项目主页]]

---

## 🗂️ 项目分类

### 🎨 Creative 创作
```dataview
LIST
FROM "1 Projects/Creative"
WHERE file.name != this.file.name
SORT file.mtime DESC
```

### 📖 Learning 学习
```dataview
LIST
FROM "1 Projects/Learning"
WHERE file.name != this.file.name
SORT file.mtime DESC
```

### 👤 Personal 个人
```dataview
LIST
FROM "1 Projects/Personal"
WHERE file.name != this.file.name
SORT file.mtime DESC
```

### 💼 Work 工作
```dataview
LIST
FROM "1 Projects/Work"
WHERE file.name != this.file.name
SORT file.mtime DESC
```

---

## 🎯 重点项目

| 项目 | 状态 | 说明 |
|------|:---:|------|
| [[富福-履带式智能小车/]] | 🟡 进行中 | 履带式智能小车 |
| [[學習AI/]] | 🟡 进行中 | AI 学习 |
| [[學習IOTO/]] | 🟡 进行中 | IOTO 插件学习 |

---

## ✅ 最近完成

```dataview
LIST
FROM "1 Projects/📁 已完成"
SORT file.mtime DESC
LIMIT 5
```

---

## 🔗 相关

- [[2 Areas/_INDEX|领域]] — 项目所属的持续责任领域
- [[3 Resources/_INDEX|资源]] — 项目参考材料
- [[4 Archives/_INDEX|归档]] — 已完成项目归档处
