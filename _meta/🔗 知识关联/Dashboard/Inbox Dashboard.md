---
title: Inbox 仪表盘
tags:
  - inbox
  - dashboard
  - dataview
  - productivity
created: 2026-01-27
updated: 2026-02-16
---

> [!info] **Inbox 仪表盘**
> 整合所有待处理信息，提升工作效率

---

## 📊 实时概览

### Inbox 状态总览

```dataview
TABLE WITHOUT ID
  length(rows) AS "总笔记数",
  (length(filter(rows, (r) => r.file.ctime AND (date(today) - r.file.ctime).days <= 1))) AS "今日新增",
  (length(filter(rows, (r) => r.file.ctime AND (date(today) - r.file.ctime).days <= 7))) AS "本周新增"
FROM "0 Inbox"
WHERE file.path != "0 Inbox/0 Inbox.md" AND file.path != "0 Inbox/Inbox Dashboard.md"
```

### 效率指标

```dataview
TABLE WITHOUT ID
  round((length(filter(rows, (r) => r.file.ctime AND (date(today) - r.file.ctime).days <= 30)) / 30), 2) AS "日均新增",
  round(length(rows) / (length(filter(rows, (r) => r.file.ctime AND (date(today) - r.file.ctime).days <= 1)) + 0.01), 1) AS "积压倍数"
FROM "0 Inbox"
WHERE file.path != "0 Inbox/0 Inbox.md" AND file.path != "0 Inbox/Inbox Dashboard.md"
```

### 逾期项目提醒

```dataview
TABLE WITHOUT ID
  length(rows) AS "逾期总数",
  "🔴 " + length(filter(rows, (r) => r.file.ctime AND (date(today) - r.file.ctime).days > 30)) AS ">30天",
  "🟡 " + length(filter(rows, (r) => r.file.ctime AND (date(today) - r.file.ctime).days > 7 AND (date(today) - r.file.ctime).days <= 30)) AS "7-30天"
FROM "0 Inbox"
WHERE file.ctime AND (date(today) - file.ctime).days > 7 AND file.path != "0 Inbox/0 Inbox.md" AND file.path != "0 Inbox/Inbox Dashboard.md"
```

---

## 📋 待处理笔记

### 所有待处理项目

```dataview
TABLE WITHOUT ID
  file.link AS "筆記",
  dateformat(file.ctime, "MM-dd") AS "創建日期",
  (date(today) - file.ctime).days AS "天数",
  tags AS "標籤"
FROM "0 Inbox"
WHERE file.path != "0 Inbox/0 Inbox.md" AND file.path != "0 Inbox/Inbox Dashboard.md"
SORT file.ctime DESC
```

### 今日新增（< 1天）

```dataview
TABLE WITHOUT ID
  file.link AS "筆記",
  dateformat(file.ctime, "HH:mm") AS "創建時間",
  tags AS "標籤"
FROM "0 Inbox"
WHERE (date(today) - file.ctime).days <= 1 AND file.path != "0 Inbox/0 Inbox.md" AND file.path != "0 Inbox/Inbox Dashboard.md"
SORT file.ctime DESC
```

### 本周新增（<7天）

```dataview
TABLE WITHOUT ID
  file.link AS "筆記",
  dateformat(file.ctime, "MM-dd") AS "創建日期",
  (date(today) - file.ctime).days AS "天数"
FROM "0 Inbox"
WHERE (date(today) - file.ctime).days <= 7 AND file.path != "0 Inbox/0 Inbox.md" AND file.path != "0 Inbox/Inbox Dashboard.md"
SORT file.ctime DESC
```

### 逾期项目（>7天）

```dataview
TABLE WITHOUT ID
  file.link AS "筆記",
  dateformat(file.ctime, "MM-dd") AS "創建日期",
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
5. **定期整理** - 每周进行一次彻底整理

### 处理检查清单

```dataview
TABLE WITHOUT ID
  "☐ 处理 " + file.link AS "待处理",
  dateformat(file.ctime, "MM-dd") AS "創建日期",
  (date(today) - file.ctime).days AS "天数"
FROM "0 Inbox"
WHERE file.path != "0 Inbox/0 Inbox.md" AND file.path != "0 Inbox/Inbox Dashboard.md"
SORT file.ctime ASC
LIMIT 20
```

---

## 📈 深度分析

### 最近30天创建趋势

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

## 🔍 高级过滤

### 按优先级过滤

```dataview
TABLE WITHOUT ID
  file.link AS "项目",
  dateformat(file.ctime, "MM-dd") AS "创建日期",
  "⭐" * (length(filter(file.tags, (t) => t.contains("priority")))) AS "优先级",
  file.tags AS "标签"
FROM "0 Inbox"
WHERE file.path != "0 Inbox/0 Inbox.md" AND file.path != "0 Inbox/Inbox Dashboard.md"
FLATTEN file.tags AS tag
WHERE tag.contains("priority") OR tag.contains("urgent")
SORT file.ctime DESC
LIMIT 10
```

### 按状态过滤

```dataview
TABLE WITHOUT ID
  file.link AS "项目",
  choice(file.ctime, (date(today) - file.ctime).days, 0) AS "天数",
  choice(file.ctime AND (date(today) - file.ctime).days <= 1, "🟢", file.ctime AND (date(today) - file.ctime).days <= 7, "🟡", "🔴") AS "状态"
FROM "0 Inbox"
WHERE file.ctime AND file.path != "0 Inbox/0 Inbox.md" AND file.path != "0 Inbox/Inbox Dashboard.md"
SORT file.ctime DESC
```

---

## 🔗 相关资源

- 📖 [[_meta/🔗 知识关联/Dashboard/Inbox 管理指南|管理指南]]
- 🔄 [[_meta/🔗 知识关联/Dashboard/Inbox 工作流|处理工作流]]

---

> [!tip] 💡 **使用提示**
> - 每天查看今日新增部分
> - 每周清理逾期项目
> - 使用标签系统进行分类管理

---

---

## 🔄 更新记录

- **2026-02-16**: 优化仪表盘，新增效率指标、逾期提醒、高级过滤功能
