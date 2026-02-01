---
title: Inbox 仪表盘
tags:
  - inbox
  - dashboard
  - dataview
created: 2026-01-27
---

> [!info] Inbox 仪表盘
> 这是一个实时监控 Inbox 状态的仪表盘，帮助你跟踪待处理项目、分类情况和处理效率。

---

## 📊 概览

### Inbox 状态

```dataview
TABLE WITHOUT ID
  length(rows) AS "待处理笔记数",
  (length(filter(rows, (r) => (date(today) - r.file.ctime).days <= 1))) AS "今日新增",
  (length(filter(rows, (r) => (date(today) - r.file.ctime).days <= 7))) AS "本周新增"
FROM "0 Inbox"
WHERE file.path != "0 Inbox/0 Inbox.md" AND file.path != "0 Inbox/Inbox Dashboard.md"
```

### 处理效率

```dataview
TABLE WITHOUT ID
  round((length(filter(rows, (r) => (date(today) - r.file.ctime).days <= 30)) / 30), 2) AS "月均新增",
  round(length(rows) / (length(filter(rows, (r) => (date(today) - r.file.ctime).days <= 1)) + 0.01), 1) AS "积压倍数"
FROM "0 Inbox"
WHERE file.path != "0 Inbox/0 Inbox.md" AND file.path != "0 Inbox/Inbox Dashboard.md"
```

---

## 📋 待处理笔记

### 所有待处理项目

```dataview
TABLE WITHOUT ID
  file.link AS "笔记",
  dateformat(file.ctime, "MM-dd") AS "创建日期",
  (date(today) - file.ctime).days AS "天数",
  tags AS "标签"
FROM "0 Inbox"
WHERE file.path != "0 Inbox/0 Inbox.md" AND file.path != "0 Inbox/Inbox Dashboard.md"
SORT file.ctime DESC
```

### 今日新增（< 1 天）

```dataview
TABLE WITHOUT ID
  file.link AS "笔记",
  dateformat(file.ctime, "HH:mm") AS "创建时间",
  tags AS "标签"
FROM "0 Inbox"
WHERE (date(today) - file.ctime).days <= 1 AND file.path != "0 Inbox/0 Inbox.md" AND file.path != "0 Inbox/Inbox Dashboard.md"
SORT file.ctime DESC
```

### 本周新增（< 7 天）

```dataview
TABLE WITHOUT ID
  file.link AS "笔记",
  dateformat(file.ctime, "MM-dd") AS "创建日期",
  (date(today) - file.ctime).days AS "天数"
FROM "0 Inbox"
WHERE (date(today) - file.ctime).days <= 7 AND file.path != "0 Inbox/0 Inbox.md" AND file.path != "0 Inbox/Inbox Dashboard.md"
SORT file.ctime DESC
```

### 逾期项目（> 7 天）

```dataview
TABLE WITHOUT ID
  file.link AS "笔记",
  dateformat(file.ctime, "MM-dd") AS "创建日期",
  (date(today) - file.ctime).days AS "逾期天数"
FROM "0 Inbox"
WHERE (date(today) - file.ctime).days > 7 AND file.path != "0 Inbox/0 Inbox.md" AND file.path != "0 Inbox/Inbox Dashboard.md"
SORT file.ctime ASC
LIMIT 10
```

---

## 📂 按类型分类

### 按标签统计

```dataview
TABLE WITHOUT ID
  tag AS "类型",
  length(rows) AS "数量"
FROM "0 Inbox"
WHERE file.path != "0 Inbox/0 Inbox.md" AND file.path != "0 Inbox/Inbox Dashboard.md"
FLATTEN tags AS tag
WHERE tag != "inbox"
GROUP BY tag
SORT length(rows) DESC
```

### 按文件类型统计

```dataview
TABLE WITHOUT ID
  type AS "类型",
  length(rows) AS "数量"
FROM "0 Inbox"
WHERE file.path != "0 Inbox/0 Inbox.md" AND file.path != "0 Inbox/Inbox Dashboard.md"
FLATTEN file.ext AS ext
GROUP BY ext
SORT length(rows) DESC
```

---

## 🎯 快速行动

### 处理建议

1. **优先处理今日新增** - 趁热打铁，快速响应
2. **清理逾期项目** - 避免积压太久
3. **批量分类** - 将相似类型的笔记一起处理
4. **删除无用项目** - 保持 Inbox 精简

### 处理检查清单

```dataview
TABLE WITHOUT ID
  "☐ 处理 " + file.link AS "待处理",
  dateformat(file.ctime, "MM-dd") AS "创建日期",
  (date(today) - file.ctime).days AS "天数"
FROM "0 Inbox"
WHERE file.path != "0 Inbox/0 Inbox.md" AND file.path != "0 Inbox/Inbox Dashboard.md"
SORT file.ctime ASC
LIMIT 20
```

---

## 📈 趋势分析

### 最近 30 天的创建趋势

```dataview
TABLE WITHOUT ID
  dateformat(file.ctime, "yyyy-MM-dd") AS "日期",
  length(rows) AS "新增数"
FROM "0 Inbox"
WHERE (date(today) - file.ctime).days <= 30 AND file.path != "0 Inbox/0 Inbox.md" AND file.path != "0 Inbox/Inbox Dashboard.md"
GROUP BY dateformat(file.ctime, "yyyy-MM-dd")
SORT file.ctime DESC
```

---

## 🔗 相关资源

- [[0 Inbox]] - Inbox 使用指南
- [[Inbox 工作流]] - 详细的 Inbox 工作流
- [[3 Resources/05-Reference/Methods/PARA 自动化工作流]] - PARA 系统完整指南

---

> [!tip] 提示
> 定期查看此仪表盘，保持 Inbox 的健康状态。建议每周至少清空一次 Inbox。

---

**最后更新**：2026-01-27
