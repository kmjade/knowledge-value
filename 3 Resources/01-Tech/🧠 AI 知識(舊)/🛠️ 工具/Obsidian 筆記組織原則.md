---
title: Obsidian 筆記組織原則
status: active
tags: [Obsidian, note-organization, best-practices]
aliases: [Obsidian Note Organization Principles]
created: 2026-02-01
modified: 2026-02-01
---

# Obsidian 筆記組織原則

## 定義

筆記組織原則是保持知識庫高效、可維護的核心指導方針，確保資訊易於尋找、連接和使用。

## 核心原則

### 1. 一張一個筆記（Atomic Notes）
- ✅ 每個概念一個筆記
- ✅ 每個筆記只關注一個主題
# 管理
- ❌ 避免大而全的筆記

**示例**:
- ✅ `Obsidian 核心特性.md`
- ✅ `Obsidian 雙向連結系統.md`
# 指南

### 2. 連結而非複製
- ✅ 使用 Wiki 連結建立關聯
# 修改
- ✅ 保持知識庫的一致性
- ❌ 避免複製粘貼相同內容

**示例**:
```markdown
# 主筆記
Obsidian 的核心特性包括 [[Obsidian 雙向連結系統]] 和 [[Obsidian 外掛生態]]。
```

### 3. 使用標籤
- ✅ 統一標籤系統
- ✅ 分類清晰，易於過濾
- ✅ 支持標籤嵌套
- ✅ 定期清理無用標籤

**標籤層級示例**:
```
#knowledge/tech/obsidian
#learning/language/english
#project/active
```

## 筆記結構模板

### 標準結構
```markdown
---
title: 清晰的標題
status: active
tags: [tag1, tag2]
created: 2026-02-01
modified: 2026-02-01
---

# 標題

## 定義
簡短的定義或概念

## 要點
- 要點 1
- 要點 2
- 要點 3

## 示例
具體的示例和用例

## 相關筆記
- [[筆記1]]
- [[筆記2]]

## 參考資源
- [資源連結1](url)
- [資源連結2](url)
```

## 命名規範

### 筆記命名
- 使用清晰、具體的名稱
- 包含關鍵詞便於搜尋
- 保持命名風格一致
- 避免過於通用的名稱

**示例**:
- ✅ `Obsidian Dataview 外掛.md`
# 工作流
- ❌ `外掛.md`（過於模糊）

### 檔案夾命名
- 使用邏輯化的分類
- 支持嵌套結構
- 保持深度合理（不超過 3 層）

**示例**:
```
3 Resources/
├── 01-Tech/
# AI 知識
│   └── 🛠️ 工具/
└── 02-Learning/
    └── 📚 學習資源/
```

## 組織策略

# 方法
# 工作流

### 主題導向
- 按主題知識域組織
- 便於深入學習
- 適合資源類筆記

### 項目導向
- 按項目組織相關筆記
# 管理
- 適合臨時性工作

### 時間導向
- 按時間順序組織
- 便於日誌和記錄
- 適合日記和筆記

## 維護策略

### 定期清理
- 每週清理 Inbox
- 每月審視標籤
- 每季歸檔舊筆記
- 每年重新組織結構

### 質量控制
- 檢查筆記完整性
# 更新
- 刪除重複內容
- 優化連結結構

### 效能優化
詳見：[[Obsidian 效能優化]]

## 常見問題

# 管理
**解決方案**:
- 使用標籤和檔案夾分類
- 定期歸檔和清理
- 創建索引筆記

### 問題：重複內容
**解決方案**:
- 使用連結而非複製
- 創建統一的參考筆記
- 定期檢查和合併

### 問題：找不到筆記
**解決方案**:
- 優化命名和標籤
- 使用 [[Obsidian 搜尋優化]]
- 創建索引和導航

## 相關筆記

- [[Obsidian 搜尋優化]]
- [[Obsidian 雙向連結系統]]
# 工作流

## 參考資源

- [Atomic Notes 原則](https://zettelkasten.de/posts/overview/)
- [Obsidian 官方文檔 - 筆記組織](https://help.obsidian.md/Organizing+your+notes)
