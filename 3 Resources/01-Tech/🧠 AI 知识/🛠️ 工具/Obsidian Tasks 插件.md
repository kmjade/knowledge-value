---
title: Obsidian Tasks 插件
status: active
tags: [Obsidian, Tasks, plugin, task-management]
aliases: [Obsidian Tasks Plugin]
created: 2026-02-01
modified: 2026-02-01
---

# Obsidian Tasks 插件

## 定義

Tasks 是 Obsidian 中的任務管理插件，可在筆記中創建和追蹤任務，支持多種任務狀態、優先級、截止日期等功能。

## 核心功能

### 任務狀態
- `todo`: 待辦
- `in-progress`: 進行中
- `done`: 已完成
- `cancelled`: 已取消
- `non-action`: 參考資料

### 任務屬性
- 優先級（high, medium, low）
- 截止日期（due date）
- 開始日期（start date）
- 重複任務、循環任務
- 子任務和依賴關係

### 視圖模式
- 任務列表視圖
- 看板視圖（Kanban）
- 日曆視圖

## 任務語法

### 基本任務
```markdown
- [ ] 簡單任務
- [x] 已完成任務
```

### 帶屬性的任務
```markdown
- [ ] 重要任務 🔴 #high
- [ ] 中等任務 🟡 #medium
- [ ] 普通任務 🔵 #low
```

### 帶截止日期的任務
```markdown
- [ ] 任務 📅 2026-02-15
- [ ] 重要任務 🔴 📅 2026-02-10
```

### 重複任務
```markdown
- [ ] 每週任務 🔁 every week on Monday
- [ ] 每月任務 🔁 every month on the 1st
```

## Dataview 查詢示例

### 查看未完成任務
```dataview
TABLE
  text AS "任務",
  status AS "狀態",
  due AS "截止日期"
FROM #project
WHERE status != "done"
SORT due ASC
```

### 按優先級排序
```dataview
TABLE
  text AS "任務",
  priority AS "優先級",
  due AS "截止日期"
FROM ""
WHERE !contains(text, "已完成")
SORT priority DESC, due ASC
```

### 今日任務
```dataview
TASK
FROM ""
WHERE due = date(today)
SORT priority DESC
```

## 最佳實踐

### 任務組織
- 每個項目使用獨立的筆記
- 使用標籤分類任務類型
- 定期清理已完成任務

### 任務管理
- 每日檢視任務列表
- 優先處理高優先級任務
- 設置合理的截止日期

### 協作使用
- 使用看板視圖追蹤進度
- 記錄任務完成的上下文
- 定期回顧和優化工作流

## 相關筆記

- [[Obsidian 插件生態]]
- [[Obsidian Dataview 插件]]
- [[PARA 工作流整合]]

## 參考資源

- [Tasks 插件文檔](https://publish.obsidian.md/tasks/Getting+Started)
- [Tasks GitHub](https://github.com/obsidian-tasks-group/obsidian-tasks)
