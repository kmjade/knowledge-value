---
title: Inbox 仪表盘
tags:
  - inbox
  - dashboard
  - dataview
created: 2026-01-27
---

> [!info] Inbox 仪表盘
# 效率

---

## 📊 概览

### Inbox 狀態

```dataview
TABLE WITHOUT ID
  length(rows) AS "待處理筆記数",
  (length(filter(rows, (r) => (date(today) - r.file.ctime).days <= 1))) AS "今日新增",
  (length(filter(rows, (r) => (date(today) - r.file.ctime).days <= 7))) AS "本周新增"
FROM "0 Inbox"
WHERE file.path != "0 Inbox/0 Inbox.md" AND file.path != "0 Inbox/Inbox Dashboard.md"
```

# 效率

```dataview
TABLE WITHOUT ID
  round((length(filter(rows, (r) => (date(today) - r.file.ctime).days <= 30)) / 30), 2) AS "月均新增",
  round(length(rows) / (length(filter(rows, (r) => (date(today) - r.file.ctime).days <= 1)) + 0.01), 1) AS "积压倍数"
FROM "0 Inbox"
WHERE file.path != "0 Inbox/0 Inbox.md" AND file.path != "0 Inbox/Inbox Dashboard.md"
```

---

## 📋 待處理筆記

### 所有待處理專案

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

### 今日新增（< 1 天）

```dataview
TABLE WITHOUT ID
  file.link AS "筆記",
  dateformat(file.ctime, "HH:mm") AS "創建時間",
  tags AS "標籤"
FROM "0 Inbox"
WHERE (date(today) - file.ctime).days <= 1 AND file.path != "0 Inbox/0 Inbox.md" AND file.path != "0 Inbox/Inbox Dashboard.md"
SORT file.ctime DESC
```

### 本周新增（< 7 天）

```dataview
TABLE WITHOUT ID
  file.link AS "筆記",
  dateformat(file.ctime, "MM-dd") AS "創建日期",
  (date(today) - file.ctime).days AS "天数"
FROM "0 Inbox"
WHERE (date(today) - file.ctime).days <= 7 AND file.path != "0 Inbox/0 Inbox.md" AND file.path != "0 Inbox/Inbox Dashboard.md"
SORT file.ctime DESC
```

### 逾期專案（> 7 天）

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

## 📂 按类型分類

### 按標籤統計

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

### 按檔案类型統計

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

### 處理建議

1. **优先處理今日新增** - 趁热打铁，快速響應
2. **清理逾期專案** - 避免积压太久
3. **批量分類** - 将相似类型的筆記一起處理
4. **刪除無用專案** - 保持 Inbox 精简

### 處理檢查清單

```dataview
TABLE WITHOUT ID
  "☐ 處理 " + file.link AS "待處理",
  dateformat(file.ctime, "MM-dd") AS "創建日期",
  (date(today) - file.ctime).days AS "天数"
FROM "0 Inbox"
WHERE file.path != "0 Inbox/0 Inbox.md" AND file.path != "0 Inbox/Inbox Dashboard.md"
SORT file.ctime ASC
LIMIT 20
```

---

# 分析

### 最近 30 天的創建趨勢

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

## 🔗 相關資源

# 指南
# 工作流
# 工作流

---

> [!tip] 提示
# 查看

---

# 更新
