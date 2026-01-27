---
aliases:
title: Write_IP
para: project
domain:
  - "[[Digital Organization]]"
created: 2026-01-05 08:05
start-date:
achieve-date:
type: ""
status: active
outcome: ""
action_plan: ""
tags: []
---
# Write_IP (项目名称)
## 🎯 Desired outcome（预期结果）
- 

## 🗓️ Action Plan（行动计划）
- [ ] 

## 📋 Project Properties
```dataview
TABLE
  file.mtime AS "Last Modified",
  status,
  outcome,
  action_plan
FROM "{{tp.file.path}}"
WHERE file.name != this.file.name
```

```dataview
TABLE without id
FROM "Projects/Write_IP"
WHERE contains(file.tags, "task")
SORT file.name ASC
```
---
## All files
```dataview
Table without id type as Type, rows.file.link as File
WHERE contains(file.path, this.file.folder) AND file.name != this.file.name
FLATTEN type
GROUP BY type
SORT type, file.name
```

## Linked notes
```dataview
Table sort(rows.file.link) as File
FROM [[]]
WHERE !contains(file.folder, this.file.name)
GROUP BY file.folder as Folder
```