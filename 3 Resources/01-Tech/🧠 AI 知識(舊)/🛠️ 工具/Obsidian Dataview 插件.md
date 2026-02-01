---
title: Obsidian Dataview 外掛
status: active
tags: [Obsidian, Dataview, plugin, data-query]
aliases: [Obsidian Dataview Plugin]
created: 2026-02-01
modified: 2026-02-01
---

# Obsidian Dataview 外掛

## 定義

Dataview 是 Obsidian 中強大的查詢和數據可視化外掛，使用類似 SQL 的查詢語言從筆記中提取、過濾、展示數據。

## 核心功能

### 數據查詢
- 從筆記中提取數據
# 排序
- 聚合統計資訊

### 數據可視化
- 表格視圖（TABLE）
- 列表視圖（LIST）
- 任務視圖（TASK）
- 日曆視圖（CALENDAR）

## 查詢語言

### 基本語法
```dataview
TABLE
  file.link AS "筆記",
  status AS "狀態",
  priority AS "優先級",
  created AS "創建日期"
FROM ""
WHERE status = "active"
SORT priority ASC
LIMIT 20
```

### 常用查詢場景

#### 1. 列出特定標籤的筆記
```dataview
LIST FROM #learning
SORT file.ctime DESC
```

#### 2. 統計每天完成的任務
```dataview
TABLE
  rows.file.link AS "任務",
  length(rows) AS "完成數"
FROM #task
WHERE status = "done"
GROUP BY file.ctime
```

#### 3. 尋找所有未完成的項目
```dataview
TABLE file.link, due
FROM #project
WHERE status != "done"
SORT due ASC
```

#### 4. 統計每週學習進度
```dataview
CALENDAR file.mtime
FROM #learning
```

## 應用場景

- 項目追蹤和進度統計
# 管理
# 管理
# 分析

## 最佳實踐

### 查詢優化
- 使用索引字段（file.link, file.ctime）
- 限制查詢結果數量（LIMIT）
- 避免複雜的嵌套查詢

### 數據結構
- 統一使用 frontmatter 存儲數據
- 保持字段命名一致
- 使用標準數據類型

## 相關筆記

- [[Obsidian 外掛生態]]
- [[Obsidian Tasks 外掛]]
- [[Obsidian 搜尋優化]]

## 參考資源

- [Dataview 官方文檔](https://blacksmithgu.github.io/obsidian-dataview/)
- [Dataview 查詢示例](https://github.com/blacksmithgu/obsidian-dataview/blob/master/docs/README.md)
