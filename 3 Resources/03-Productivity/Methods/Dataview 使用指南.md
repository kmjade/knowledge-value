---
title: Dataview 使用指南
interest-level: ⭐⭐⭐⭐⭐
last-reviewed: 2026-01-26
tags:
  - resource/productivity
  - tool/obsidian
  - dataview
---

# Dataview 使用指南

> Obsidian 的數據查詢外掛，讓你從筆記中提取和顯示結構化數據

---

## 📖 基礎概念

### Dataview 是什麼？

Dataview 是 Obsidian 的一個外掛，能夠：
- 從筆記的 frontmatter 中讀取數據
- 查詢和聚合筆記信息
- 動態生成表格、列表和任務列表
- 支持數據排序、過濾和分組

### 為什麼使用 Dataview？

| 傳統方式 | Dataview |
|----------|----------|
| 手動維護表格 | 自動聚合數據 |
| 重複更新內容 | 寫一次查詢 |
| 容易過時 | 實時同步 |
| 不支持統計 | 支持計算和聚合 |

---

## 🔧 安裝與設置

### 安裝步驟

1. 打開 Obsidian 設置 → 社群外掛
2. 瀏覽並搜索 "Dataview"
3. 安裝並啟用外掛
4. (可選) 啟用 DataviewJS 以使用進階功能

### 基本設置

在 `設定 → 社群外掛 → Dataview` 中：

| 設置項 | 推薦值 | 說明 |
|--------|--------|------|
| 自動重新評估查詢 | ✅ | 開啟時自動刷新查詢 |
| 查詢執行間隔 | 1 分鐘 | 自動刷新頻率 |
| 內聯查詢格式 | `=query` | 設定內聯查詢語法 |
| 啟用 JavaScript 查詢 | ⚠️ | 進階用戶可開啟 |

---

## 📝 查詢語法

### 基本結構

````markdown
```dataview
<查詢命令>
FROM <數據源>
WHERE <條件>
SORT <排序規則>
LIMIT <結果數量>
```
````

### 查詢命令

| 命令 | 用途 | 示例 |
|------|------|------|
| `LIST` | 顯示筆記列表 | `LIST FROM "1 Projects"` |
| `TABLE` | 顯示表格 | `TABLE title, due FROM "1 Projects"` |
| `TASK` | 顯示任務列表 | `TASK WHERE !completed` |
| `CALENDAR` | 顯示日曆 | `CALENDAR due` |

---

## 🎯 常用查詢示例

### 1. LIST 查詢 - 列出筆記

```dataview
LIST
FROM "1 Projects"
WHERE status = "active"
SORT due ASC
```

輸出：
```
- [[2024-Q1-技術報告]]
- [[建立知識庫]]
```

### 2. TABLE 查詢 - 顯示表格

```dataview
TABLE
  file.link AS "項目",
  status AS "狀態",
  due AS "截止日期"
FROM "1 Projects"
WHERE status = "active"
SORT due ASC
```

輸出：
| 項目 | 狀態 | 截止日期 |
|------|------|----------|
| [[項目A]] | active | 2024-02-01 |
| [[項目B]] | active | 2024-02-15 |

### 3. TASK 查詢 - 顯示任務

```dataview
TASK
WHERE !completed
AND due < date(today) + dur("7 days")
SORT due ASC
```

### 4. CALENDAR 查詢 - 日曆視圖

```dataview
CALENDAR due
FROM "1 Projects"
WHERE due
```

---

## 🔍 WHERE 條件過濾

### 比較運算符

| 運算符 | 說明 | 示例 |
|--------|------|------|
| `=` | 等於 | `WHERE status = "active"` |
| `!=` | 不等於 | `WHERE status != "completed"` |
| `<` | 小於 | `WHERE due < date(today)` |
| `>` | 大於 | `WHERE progress > 50` |
| `<=` | 小於等於 | `WHERE priority <= 3` |
| `>=` | 大於等於 | `WHERE health-score >= 6` |

### 邏輯運算符

| 運算符 | 說明 | 示例 |
|--------|------|------|
| `AND` | 並且 | `WHERE active AND due` |
| `OR` | 或者 | `WHERE tag = "#work" OR tag = "#personal"` |
| `NOT` | 非 | `WHERE NOT completed` |

### 函數

| 函數 | 說明 | 示例 |
|------|------|------|
| `date()` | 日期轉換 | `WHERE due > date("2024-01-01")` |
| `today()` | 今天日期 | `WHERE due < date(today)` |
| `dur()` | 時間間隔 | `WHERE due < date(today) + dur("7 days")` |
| `contains()` | 包含 | `WHERE contains(file.tags, "#project")` |
| `startswith()` | 以...開頭 | `WHERE startswith(file.path, "1 Projects")` |
| `regexreplace()` | 正則替換 | `WHERE regexreplace(file.name, ".*", "匹配")` |

---

## 📊 高級查詢技巧

### 1. 去除索引文件

```dataview
TABLE title
FROM "1 Projects"
WHERE file.name != this.file.name
```

### 2. 限制結果數量

```dataview
LIST
FROM "1 Projects"
SORT due ASC
LIMIT 5
```

### 3. 條件性顯示屬性

```dataview
TABLE without ID
  file.link AS "項目",
  status AS "狀態",
  due AS "截止日期"
FROM "1 Projects"
WHERE progress
```
> 只顯示有 `progress` 屬性的筆記

### 4. 日期計算

```dataview
TABLE without ID
  file.link AS "項目",
  due AS "截止",
  (due - file.ctime).days AS "創建距今天數"
FROM "1 Projects"
WHERE due
```

### 5. 標籤過濾

```dataview
TABLE without ID
  file.link AS "筆記",
  join(filter(file.tags, (t) => startswith(t, "#project/")), ", ") AS "標籤"
FROM "1 Projects"
```

### 6. 數據聚合

```dataview
TABLE without ID
  status,
  length(rows) AS "數量"
FROM "1 Projects"
GROUP BY status
```

---

## 🏷️ Frontmatter 最佳實踐

### 基本格式

```yaml
---
title: 筆記標題
status: active
due: 2024-02-01
priority: 3
tags:
  - project/learning
  - important
---
```

### 日期格式

| 格式 | 示例 | 說明 |
|------|------|------|
| `YYYY-MM-DD` | `2024-01-26` | ISO 8601 標準（推薦） |
| `YYYY-MM-DDTHH:mm` | `2024-01-26T10:30` | 包含時間 |
| 相對日期 | `tomorrow`、`next monday` | 動態日期（查詢時使用） |

### 推薦屬性命名

| 屬性 | 類型 | 示例值 |
|------|------|--------|
| `status` | 文本 | `active`, `completed`, `on-hold` |
| `priority` | 數字 | `1-5` |
| `due` | 日期 | `2024-02-01` |
| `progress` | 數字 | `0-100` |
| `tags` | 數組 | `["project", "learning"]` |
| `importance` | 文本 | `⭐⭐⭐⭐⭐` |

---

## 🛠️ 進階技巧

### 1. 嵌套查詢

```dataview
TABLE
  file.link AS "領域",
  (length(filter(rows, (r) => r.status = "active"))) AS "活躍項目"
FROM "2 Areas"
FLATTEN file.links as link
WHERE link.path = "1 Projects"
GROUP BY file.name
```

### 2. 查找引用此文件的筆記

```dataview
TABLE without ID
  file.link AS "筆記",
  file.ctime AS "創建時間"
WHERE contains([[current-note]] + ".md", file.outlinks)
```
> 顯示所有引用當前筆記的其他筆記

或者查找包含特定內容的筆記：

```dataview
TABLE without ID
  file.link AS "項目",
  due AS "截止日期"
FROM "1 Projects"
WHERE file.outlinks
FLATTEN file.outlinks AS link
WHERE contains(link.path, "2 Areas")
```

### 3. 條件格式化

```dataview
TABLE without ID
  file.link AS "項目",
  choice(status = "active", "🟢", choice(status = "completed", "✅", "⏸️")) AS "狀態",
  due AS "截止"
FROM "1 Projects"
```

---

## 🚀 性能優化

### 最佳實踐

1. **限制查詢範圍**

   使用指定路徑而非全庫查詢：
   ```dataview
   LIST FROM "1 Projects"
   ```

2. **使用 LIMIT**
   ```dataview
   LIST FROM "1 Projects" LIMIT 10
   ```

3. **避免複雜計算**
   - 將計算結果存儲在屬性中
   - 避免在查詢中進行大量計算

4. **適當使用索引**

   基於標籤查詢比全文搜索更快：
   ```dataview
   LIST FROM #project
   ```

---

## ❌ 常見錯誤與排除

### 錯誤 1: 查詢無結果

**原因**: 查詢條件過於嚴格或範圍錯誤

**解決**:

先簡化查詢確認數據：
```dataview
LIST FROM "1 Projects"
```

然後逐步添加條件：
```dataview
LIST FROM "1 Projects" WHERE status = "active"
```

### 錯誤 2: 日期解析失敗

**原因**: 日期格式不正確

**解決**: 使用 ISO 8601 標準格式（連字符而非斜杠）
```yaml
# ❌ 錯誤格式（可能解析失敗）
due: 2024/02/01
due: "2024年02月01日"

# ✅ 正確格式
due: 2024-02-01
due: 2024-02-01T10:30
```

### 錯誤 3: 屬性顯示為 undefined

**原因**: 屬性名稱拼寫錯誤或不存在

**解決**: 檢查 frontmatter 中的屬性名稱與查詢中的名稱是否一致

### 錯誤 4: 排序結果不如預期

**原因**: 數據類型不匹配

**解決**: 使用類型轉換

```dataview
TABLE without ID
  file.link AS "項目",
  priority AS "優先權"
FROM "1 Projects"
SORT number(priority) ASC
```

---

## 📚 PARA 系統查詢示例

### 項目查詢

```dataview
TABLE without ID
  file.link AS "項目",
  status AS "狀態",
  priority AS "優先權",
  due AS "截止日期",
  progress AS "進度"
FROM "1 Projects"
WHERE file.name != this.file.name
SORT priority ASC, due ASC
```

### 領域查詢

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

### 資源查詢

```dataview
TABLE without ID
  file.link AS "資源",
  interest-level AS "興趣程度",
  file.ctime AS "創建日期"
FROM "3 Resources"
WHERE file.name != this.file.name AND interest-level
SORT interest-level DESC
LIMIT 10
```

### 歸檔查詢

```dataview
TABLE without ID
  file.link AS "名稱",
  original-type AS "原始類型",
  original-status AS "原始狀態",
  archived AS "歸檔日期"
FROM "4 Archives"
WHERE file.name != this.file.name
SORT archived DESC
```

---

## 🔗 相關資源

### 官方文檔
- [Dataview GitHub](https://github.com/blacksmithgu/obsidian-dataview)
- [Dataview 查詢語法文檔](https://blacksmithgu.github.io/obsidian-dataview/)

### 社群資源
- [Dataview 官方論壇](https://forum.obsidian.md/c/plugins/dataview/9)
- [Obsidian 中文社群](https://forum-zh.obsidian.md/c/obsidian/7)

### 相關外掛
- [[DataviewJS 外掛]]
- [[3 Resources/03-Productivity/Methods/前端數據可視化]]

---

## ✅ 快速參考卡

### 基本查詢結構

使用以下基本結構構建查詢：

```dataview
TABLE
  file.link AS "標題",
  status AS "狀態"
FROM "1 Projects"
WHERE status = "active"
SORT due ASC
LIMIT 10
```

**可用的查詢命令：**
- `LIST` - 列出筆記
- `TABLE` - 顯示表格
- `TASK` - 顯示任務
- `CALENDAR` - 顯示日曆

### 常用函數
- `date()` - 日期轉換
- `today()` - 今天
- `dur()` - 時間間隔
- `contains()` - 包含
- `startswith()` - 開頭匹配
- `regexreplace()` - 正則替換

### 比較運算符

```
`=`, `!=`, `<`, `>`, `<=`, `>=`
```

### 邏輯運算符
- `AND`, `OR`, `NOT`

---

> **提示**: 將此文檔加入常用筆記，方便快速查詢 Dataview 語法
