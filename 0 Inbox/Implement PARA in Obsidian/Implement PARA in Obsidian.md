---
aliases:
title: Implement PARA in Obsidian
para: project
domain:
  - "[[Digital Organization]]"
status: active
created: 2026-01-03 06:19
start-date:
achieve-date:
tags:
---
# Implement PARA in Obsidian (项目名称)

## 📌 屬性

- **開始日期** :: 2026-01-03
- **預計完成** :: 2026-03-31
- **負責人** :: 
- **狀態** :: #待開始 

## 🎯 Desired outcome（预期结果）

- 完成完整的 PARA 檔案結構
- 建立可重用的模板與自動化腳本
- 實作每週回顧流程

## 🗂️ Action Plan（行动计划）
- [x] 建立根層級資料夾（已完成 ✅） 
- [ ] 撰寫模板（待完成）
- [ ] 設定 QuickAdd 快捷指令（待完成）
- [ ] 建立每週回顧筆記（待完成）


```dataview
TABLE without id
FROM "Projects/Implement PARA in Obsidian"
WHERE contains(file.tags, "task")
SORT file.name ASC
```
---
## 📂 All files (本資料夾內筆記)
```dataview
Table without id type as Type, rows.file.link as File
WHERE contains(file.path, this.file.folder) AND file.name != this.file.name
FLATTEN type
GROUP BY type
SORT type, file.name
```

## 🔗 Linked notes (相關連結)
```dataview
Table sort(rows.file.link) as File
FROM [[]]
WHERE !contains(file.folder, this.file.name)
GROUP BY file.folder as Folder
```

## 📊 活躍專案總覽
```dataview
TABLE file.link AS "專案", length(file.inlinks) AS "相關筆記"
FROM "1 Projects"
WHERE !contains(file.path, "Archives")
SORT file.mtime DESC
```