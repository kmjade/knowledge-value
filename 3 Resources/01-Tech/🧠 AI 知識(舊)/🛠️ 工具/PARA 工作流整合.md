---
# 工作流
status: active
tags: [Obsidian, PARA, workflow, organization]
aliases: [PARA Workflow Integration]
created: 2026-02-01
modified: 2026-02-01
---

# 工作流

## 定義

# 方法

## 分類對應

| PARA 類別 | Obsidian 檔案夾 | 用途 | 時間跨度 |
|-----------|----------------|------|---------|
| **Projects** | `2 Projects/` | 短期項目 | 週-月 |
| **Areas** | `2 Areas/` | 長期責任領域 | 年-數年 |
| **Resources** | `3 Resources/` | 參考資料和學習資源 | 長期 |
| **Archives** | `4 Archives/` | 已完成項目和歸檔 | 長期 |

## 檔案夾結構

```
知識庫/
├── 1 Inbox/           # 收集箱
├── 2 Areas/           # 長期責任領域
# 管理
│   ├── 02-Career/     # 職業發展
│   ├── 04-Relationships/ # 人際關係
│   ├── 05-Learning/   # 學習與成長
│   └── 06-Lifestyle/  # 生活方式
│
├── 2 Projects/        # 短期項目
│   ├── active/        # 進行中
│   ├── completed/     # 已完成
│   └── future/        # 未來計劃
│
├── 3 Resources/       # 參考資源
│   ├── 01-Tech/       # 技術知識
│   ├── 02-Learning/   # 學習資源
│   ├── 03-Productivity/ # 生產力工具
│   └── 05-Reference/  # 參考文檔
│
├── 4 Archives/        # 歸檔資料
│   └── completed-projects/
└── 5 Zettels/         # 知識卡片
```

# 工作流

### 1. 收集階段
```
新資訊 → 快速記錄到 Inbox
```
- 不做分類，快速記錄
- 使用統一的標籤系統
- 定期清理 Inbox

### 2. 處理階段
```
Inbox → 分類到 PARA
```
- 每天/每週定期處理
- 根據資訊性質分類
- 創建相關筆記和連結

### 3. 執行階段
```
# 更新
```
- 跟蹤項目進度
- 記錄學習和思考
# 更新

### 4. 歸檔階段
```
完成 → 立即歸檔到 Archives
# 整理
```
- 項目完成後立即歸檔
- 定期清理過時資源
- 保持系統整潔

## 筆記分類標籤

### 通用標籤
- `#knowledge`: 知識筆記
- `#reference`: 參考資料
- `#active`: 進行中的項目
- `#archive`: 已歸檔內容
- `#idea`: 靈感與想法

### PARA 標籤
- `#project`: 項目筆記
- `#area`: 領域筆記
- `#resource`: 資源筆記
- `#archive`: 歸檔筆記

## 最佳實踐

### 分類原則
- 一個項目完成後，立即移至 Archives
- Resources 中的內容應長期有價值
- Areas 反映長期責任和標準
- 定期審視和調整分類

### 筆記命名
- 使用清晰的名稱
- 包含關鍵資訊（日期、狀態）
- 保持命名風格一致

### 定期維護
- 每週：檢視 Inbox 和 Projects
- 每月：審視 Areas 和 Resources
- 每季：清理 Archives
- 每年：重新評估整體結構

## 與 Obsidian 外掛整合

### Dataview 查詢
```dataview
TABLE
  file.link AS "項目",
  status AS "狀態",
  due AS "截止日期"
FROM "2 Projects/"
WHERE status = "active"
SORT due ASC
```

### Tasks 整合
```dataview
TASK
FROM "2 Projects/"
WHERE !completed
SORT priority DESC, due ASC
```

## 相關筆記

- [[Obsidian 筆記組織原則]]
- [[Obsidian Tasks 外掛]]
- [[Obsidian Dataview 外掛]]

## 參考資源

# 方法
- [Tiago Forte - Building a Second Brain](https://www.buildingasecondbrain.com/)
