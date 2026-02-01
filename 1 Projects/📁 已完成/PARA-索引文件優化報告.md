---
# 檔案
date: 2026-01-26
tags:
  - project/report
  - para
status: completed
completed-date: 2026-01-26
---

# 檔案

# 檔案

---

## 📋 優化概述

# 檔案
|------|----------|----------|
# 修改
# 修改
# 修改
# 修改

---

# 修改

### 1. Projects 項目索引

# 更新
# 修改
# 修改
- **原因**: 與實際資料夾結構保持一致

# 修改
```dataview
TABLE without ID
  file.link AS "項目",
  completed-date AS "完成日期",
  file.folder AS "分類"
FROM "1 Projects"
WHERE status = "completed"
SORT completed-date DESC
LIMIT 10
```
- **優勢**: 自動顯示已完成項目，無需手動維護表格

# 修改
```dataview
TABLE without ID
  file.link AS "項目",
  progress AS "進度",
  risk AS "風險",
  due AS "截止日期"
FROM "1 Projects"
WHERE status = "active"
SORT due ASC, priority ASC
```
- **依賴屬性**: `progress`、`risk`、`due`、`priority`、`status`

---

### 2. Areas 領域索引

# 修改
```dataview
TABLE without ID
  file.link AS "領域",
  importance AS "重要性",
  review-frequency AS "檢視頻率",
  last-reviewed AS "上次檢視"
FROM "2 Areas"
WHERE file.name != this.file.name
SORT importance DESC
```
- **依賴屬性**: `importance`、`review-frequency`、`last-reviewed`

# 修改
```dataview
TABLE without ID
  file.link AS "領域",
  health-score AS "評分",
  issues AS "問題",
  action-items AS "行動項目"
FROM "2 Areas"
WHERE file.name != this.file.name AND health-score
SORT health-score DESC
```
- **依賴屬性**: `health-score`、`issues`、`action-items`
# 新增

---

### 3. Resources 資源索引

# 修改
```dataview
TABLE without ID
  file.link AS "資源",
  interest-level AS "興趣程度",
  last-reviewed AS "上次檢視"
FROM "3 Resources"
WHERE file.name != this.file.name AND interest-level
SORT interest-level DESC
LIMIT 10
```
- **依賴屬性**: `interest-level`、`last-reviewed`

# 修改
```dataview
TABLE without ID
  file.link AS "資源",
  file.ctime AS "創建日期"
FROM "3 Resources"
WHERE file.name != this.file.name
SORT file.ctime DESC
LIMIT 5
```
- **優勢**: 利用內置 `file.ctime` 屬性，無需手動標記

# 修改
- **移除內容**: 手動維護的"待探索"清單
- **替代方案**: 建議直接創建對應的資源筆記

---

### 4. Archives 歸檔索引

# 修改
- **移除**: 2026 年度的靜態表格
- **原因**: 表格為空，改用 Dataview 查詢替代

# 修改
```dataview
list from "4 Archives"
where original-status = "cancelled"
sort archived desc
```
- **修正**: 將 `original-status = "completed"` 改為 `"cancelled"`

# 修改
```dataview
TABLE without ID
  file.link AS "名稱",
  original-type AS "原始類型",
  archived AS "歸檔日期"
FROM "4 Archives"
WHERE file.name != this.file.name
SORT archived DESC
```
- **依賴屬性**: `original-type`、`archived`

---

## 🎯 優化成果

### 自動化程度
| 類型 | 優化前 | 優化後 |
|------|--------|--------|
| 項目統計 | 靜態 | ✅ 動態 |
| 領域健康度 | 手動維護 | ✅ 自動查詢 |
# 排序
| 歸檔記錄 | 空表格 | ✅ 自動顯示 |

### 維護成本
# 更新
- **優化後**: 僅需在筆記中設置屬性，Dataview 自動聚合顯示

---

# 指南

### 推薦屬性清單

#### Projects 項目
```yaml
---
status: active | on-hold | completed
priority: 1 | 2 | 3 | 4 | 5
due: YYYY-MM-DD
completed-date: YYYY-MM-DD
progress: 0-100
risk: 低 | 中 | 高
tags:
  - project/learning | project/work | project/personal | project/creative
---
```

#### Areas 領域
```yaml
---
importance: ⭐⭐⭐⭐⭐
review-frequency: 每週 | 每月 | 每季
last-reviewed: YYYY-MM-DD
health-score: 1-10
issues: 當前問題描述
action-items: 待辦行動
tags:
  - area/health | area/career | area/finance | area/relationships | area/learning | area/lifestyle
---
```

#### Resources 資源
```yaml
---
interest-level: ⭐⭐⭐⭐⭐
last-reviewed: YYYY-MM-DD
tags:
  - resource/tech | resource/learning | resource/productivity | resource/interest
---
```

#### Archives 歸檔
```yaml
---
original-type: project | area | resource
original-status: completed | cancelled | on-hold
archived: YYYY-MM-DD
tags:
  - archive/index
---
```

---

## 🔧 未來改進方向

# 新增
   - 圖表化顯示項目進度
   - 熱力圖顯示活動頻率

2. **建立屬性驗證機制**
   - 使用 Templater 插件確保必要屬性存在
   - 自動填充默認值

# 工作流
   - 自動歸檔腳本
# 新增

---

## ✅ 檢查清單

- [x] 1 Projects/1 Projects.md - 完成
- [x] 2 Areas/2 Areas.md - 完成
- [x] 3 Resources/3 Resources.md - 完成
- [x] 4 Archives/4 Archives.md - 完成
- [x] 所有靜態內容改為動態查詢
- [x] 移除過時的範例內容
# 指南

---

## 📅 優化記錄

- **日期**: 2026-01-26
- **分支**: main_para
- **執行者**: Claude Code
- **耗時**: ~10 分鐘

---

## 🔗 相關資源

# 工作流
# 指南
- [[Obsidian 外掛精選]]
