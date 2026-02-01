---
title: Obsidian 搜尋優化
status: active
tags: [Obsidian, search-optimization, best-practices]
aliases: [Obsidian Search Optimization]
created: 2026-02-01
modified: 2026-02-01
---

# Obsidian 搜尋優化

## 定義

# 效率

## 命名優化

### 筆記命名規範
- 使用清晰、明確的標題
- 避免模糊不清的標題
- 包含關鍵詞便於搜尋
- 保持命名風格一致

**示例**:
# 指南
# 方法
- ❌ `筆記.md`（過於模糊）
- ❌ `關於 Obsidian 的一些想法.md`（不清晰）

### 關鍵詞選擇
- 使用常見的術語和概念
- 包含同義詞和變體
- 考慮搜尋習慣
- 避免過於專業或冷僻的詞彙

## 內容結構優化

### 結構化內容
```markdown
---
title: 清晰的標題
tags: [tag1, tag2, tag3]
---

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
- [資源連結](url)
```

### 前置資訊
- 在開頭提供定義和概述
- 使用清晰的標題層級
- 提供摘要和關鍵詞
- 新增相關筆記連結

## 標籤系統優化

### 標籤設計原則
- ✅ 統一的標籤系統
- ✅ 分類清晰，易於過濾
- ✅ 支持標籤嵌套
- ✅ 定期清理無用標籤
- ❌ 避免過於細碎的標籤
- ❌ 避免重複的標籤

### 標籤層級示例
```
#knowledge
├── #knowledge/tech
│   ├── #knowledge/tech/obsidian
│   └── #knowledge/tech/python
├── #knowledge/language
│   ├── #knowledge/language/english
│   └── #knowledge/language/chinese
└── #reference

#project
├── #project/active
└── #project/completed

#learning
├── #learning/course
└── #learning/reading
```

### 標籤使用策略
- 每個筆記 3-5 個主要標籤
- 使用層級標籤而非平行標籤
- 定期審視和優化標籤系統
- 刪除不再使用的標籤

## 連結優化

### 內部連結
詳見：[[Obsidian 雙向連結系統]]

### 連結策略
- 優先使用內部連結而非複製
- 在相關筆記中建立連結
- 使用描述性的連結文本
- 定期檢查和修復斷鏈

### 反向連結利用
- 經常檢視反向連結
- 發現新的關聯和模式
- 通過反向連結探索相關內容

## 搜尋技巧

### 基本搜尋
- `keyword`: 精確匹配
- `tag:#tag`: 搜尋標籤
- `path:folder`: 限定檔案夾
- `file:name`: 限定檔案名

### 高級搜尋
- `keyword1 keyword2`: AND 搜尋
- `keyword1 OR keyword2`: OR 搜尋
- `keyword -exclude`: 排除詞
- `keyword*`: 通配符搜尋
- `/regex/`: 正則表達式搜尋

### 搜尋快捷鍵
- `Ctrl/Cmd + F`: 當前檔案搜尋
- `Ctrl/Cmd + Shift + F`: 全局搜尋
- `Ctrl/Cmd + G`: 打開快速切換器

## Dataview 查詢優化

詳見：[[Obsidian Dataview 外掛]]

### 查詢效能優化
- 使用索引字段（file.link, file.ctime）
- 限制查詢結果數量（LIMIT）
- 避免複雜的嵌套查詢
- 使用 WHERE 過濾提前篩選

### 常用查詢模板

#### 按標籤搜尋
```dataview
LIST
FROM #tag
SORT file.ctime DESC
```

#### 按檔案夾搜尋
```dataview
TABLE file.link AS "筆記", status AS "狀態"
FROM "folder/"
```

#### 按屬性搜尋
```dataview
TABLE file.link, created
WHERE status = "active"
SORT created DESC
```

#### 組合查詢
```dataview
TABLE
  file.link AS "筆記",
  status AS "狀態",
  created AS "創建日期"
FROM "folder/"
WHERE (contains(file.tags, "tag")) AND (status = "active")
SORT created DESC
LIMIT 20
```

## 維護策略

### 定期檢查
- 每週檢查無效連結
- 每月審視標籤系統
- 每季優化命名規範
- 每年重組知識庫結構

### 質量控制
- 檢查筆記完整性
# 更新
- 刪除重複內容
# 效率

## 工具和外掛

### 推薦外掛
- [[Obsidian Dataview 外掛]] - 強大的查詢和數據可視化
# 管理
- **Broken Links** - 檢測和修復斷鏈
- **Search++** - 增強搜尋功能

### 自動化工具
# 工作流

## 最佳實踐

### 創建時
- 使用清晰的命名
- 新增合適的標籤
- 提供定義和概述
- 建立相關連結

### 維護時
- 定期檢查和優化
- 清理無用標籤和連結
# 更新
- 保持結構整潔

### 搜尋時
- 使用多種搜尋技巧
- 組合關鍵詞和標籤
- 利用反向連結
- 使用 Dataview 查詢

## 相關筆記

- [[Obsidian 筆記組織原則]]
- [[Obsidian 雙向連結系統]]
- [[Obsidian Dataview 外掛]]

## 參考資源

- [Obsidian 搜尋文檔](https://help.obsidian.md/Searching)
- [Dataview 查詢語法](https://blacksmithgu.github.io/obsidian-dataview/)
