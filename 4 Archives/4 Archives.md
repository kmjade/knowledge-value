---
title: Archives
aliases:
  - 歸檔
tags:
  - archive/index
---

# Archives 歸檔

> 已完成的項目、過時的資源、不再需要的內容

---

## 📊 歸檔統計

```dataview
TABLE without ID
  file.link AS "名稱",
  archived AS "歸檔日期",
  regexreplace(file.name, "^\d{4}-\d{2}-\d{2}_", "") AS "原名稱"
FROM "4 Archives"
WHERE file.name != this.file.name
SORT archived DESC
```

---

## 📁 歸檔結構

```
4 Archives/
├── 2026/
│   ├── 01-January/
│   ├── 02-February/
│   ├── 03-March/
│   └── ...
├── by-type/
│   ├── Projects/
│   ├── Areas/
│   └── Resources/
└── by-status/
    ├── Completed/
    ├── Cancelled/
    └── On-Hold/
```

---

## 📋 歸檔索引

### 按狀態分類

#### Completed 已完成
```dataview
list from "4 Archives"
where original-status = "completed"
sort archived desc
```

#### Cancelled 已取消
```dataview
list from "4 Archives"
where original-status = "cancelled"
sort archived desc
```

### 按類型分類

```dataview
TABLE without ID
  file.link AS "名稱",
  original-type AS "原始類型",
  archived AS "歸檔日期"
FROM "4 Archives"
WHERE file.name != this.file.name
SORT archived DESC
```

---

## 🔄 清理策略

| 頻率 | 動作 |
|------|------|
| 每月 | 檢查擱置項目是否歸檔 |
| 每季 | 歸檔已完成項目 |
| 每年 | 清理 >3 年歸檔（永久刪除） |

---

## 📝 歸檔原則

1. **項目完成後立即歸檔**
2. **擱置超過 3 個月考慮歸檔**
3. **資源過時時歸檔**
4. **保留摘要方便日後查詢**
5. **不要刪除，只做歸檔**

---

## 🔗 相關

- [[PARA歸檔結構]] - 歸檔策略指南
- [[PARA工作流]] - 完整 PARA 說明
