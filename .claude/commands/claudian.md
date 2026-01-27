---
---
PARA 助手 - 幫助管理和組織 PARA 筆記的快捷指令。

## 使用方式

```
/claudian [操作] [參數]
```

或直接運行此命令，進入交互式 PARA 管理流程。

## 支持的操作

### 1. `status` - PARA 狀態概覽
顯示當前 PARA 結構的統計信息：
- Projects 數量及狀態
- Areas 列表
- Resources 分類
- Archives 統計
- 收件箱待處理項目

### 2. `suggest` - 智能建議
根據當前筆記內容提供建議：
- 建議所屬 PARA 類別
- 建議關聯的 Area/Resource
- 建議標籤
- 建議創建子筆記

### 3. `organize` - 整理收件箱
處理 `0 Personals/📥 Inbox` 中的內容：
- 分類歸檔到 PARA 結構
- 自動添加 frontmatter
- 連接到相關 Area/Project

### 4. `link` - 建立連接
智能建立筆記間的連接：
- 尋找相關的 Area/Resource
- 添加 wikilinks
- 更新 domain 屬性

### 5. `review` - 定期複查
執行 PARA 定期複查：
- 檢查過期 Projects
- 檢查已完成需歸檔的項目
- 檢查需要創建的 Areas

## 執行步驟

### 交互式模式（無參數）

1. 詢問用戶要執行的操作類型
2. 根據操作類型執行相應邏輯：
   - **status**: 讀取 `_meta_/scripts/getAreaList.js` 等，生成統計報告
   - **suggest**: 分析當前筆記內容，提供建議
   - **organize**: 掃描 Inbox，逐一處理
   - **link**: 使用 Dataview 查詢找相關筆記
   - **review**: 檢查 frontmatter 的日期屬性

3. 顯示結果並等待確認

### 命令模式（帶參數）

直接執行指定的操作，根據參數進行處理。

## 示例

### 用戶：`/claudian status`

結果：
```
📊 PARA 狀態概覽

🎯 Projects: 5 個
  - 進行中: 3
  - 已完成: 1
  - 已延期: 1

🌳 Areas: 4 個
  - 💼 Career Development
  - 📁 Digital Organization
  - 🌱 Personal Development
  - 📊 Project Management

🗂️ Resources: 12 個

📥 Inbox 待處理: 3 項
```

### 用戶：`/claudian suggest`

結果（基於當前筆記）：
```
💡 PARA 建議

建議類別: 🗂️ Resource
建議關聯 Area: [[🌳 Personal Development]]
建議標籤: #learning #documentation

操作：
1. 創建為 Resource？[Y/n]
2. 連接到 Area？[Y/n]
```

### 用戶：`/claudian organize`

結果：
```
📥 整理收件箱

發現 3 個待處理筆記：

1. "學習筆記.md"
   - 建議: 🗂️ Resource → [[🌱 Personal Development]]
   - 動作: [歸檔] [跳過] [編輯]

2. "購物清單.md"
   - 建議: 🎯 Project (短期) 或歸檔
   - 動作: [歸檔] [跳過] [編輯]

3. "會議記錄.md"
   - 建議: 📥 Inbox 保留 (需更多信息)
   - 動作: [保留] [歸檔] [編輯]
```

## 技術實現

### 使用的腳本
- `getAreaList.js` - 獲取 Area 列表
- `getProjectList.js` - 獲取 Project 列表
- `getResourceList.js` - 獲取 Resource 列表

### Dataview 查詢模式
```dataview
TABLE file.link, status, by-when
FROM "1 Projects"
WHERE para = "project" AND !contains(status, "完成")
SORT by-when ASC
```

## 設計原則

- **智能分析**: 根據內容自動建議歸類
- **批量處理**: 支持一次處理多個項目
- **確認機制**: 關鍵操作需要用戶確認
- **可擴展**: 易於添加新的操作類型
