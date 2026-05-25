---
title: Projects
aliases:
  - 項目
tags:
  - project/index
---

# Projects 項目

> 有明確目標和截止日期的短期任務

---

## 📊 項目統計

```dataview
TABLE without ID
  file.link AS "名稱",
  status AS "狀態",
  priority AS "優先權",
  due AS "截止日期",
  regexreplace(join(filter(file.tags, (t) => startswith(t, "#project/")), ", "), "#project/", "") AS "分類"
FROM "1 Projects"
WHERE file.name != this.file.name
SORT priority ASC, due ASC
```

---

## [[📁 項目結構]]

---

## 📋 項目索引

### 進行中 (Active)
```dataview
list from "1 Projects"
where status = "active"
sort due asc
```

### 擱置中 (On-Hold)
```dataview
list from "1 Projects"
where status = "on-hold"
sort due asc
```

### 已完成 (Completed)
```dataview
list from "1 Projects"
where status = "completed"
sort completed-date desc
```

---

## ⏰ 近期截止

```dataview
TABLE without ID
  file.link AS "項目",
  due AS "截止",
  regexreplace(join(filter(file.tags, (t) => startswith(t, "#project/")), " "), "#project/", "") AS "分類"
FROM "1 Projects"
where status = "active" and due < date(today) + dur("30 days")
sort due asc
```

---

## ✅ 完成項目

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

---

# 管理

### 建立原則
1. **有明確目標**：清楚定義成功標準
2. **有截止日期**：設定實際的完成時間
3. **可衡量**：有具體的交付物
4. **可控**：在能力範圍內

### 追蹤原則
# 更新
2. **勾選任務**：使用 `[ ]` 標記完成
3. **記錄障礙**：遇到問題時記錄下來
4. **調整計劃**：必要時調整時間線

### 完成原則
1. **確認完成**：對照目標確認達成
2. **記錄成果**：總結完成內容
3. **立即歸檔**：完成後立即歸檔
4. **反思學習**：記錄改進點

---

## 📊 項目健康度

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

---

## 🔄 項目與領域的關係

```
領域 (Area) ←→ 項目 (Project)

Example:
職業發展 (Area)
  ↓ 衍生項目
Obsidian學習計劃 (Project)
  ↓ 完成
歸檔 (Archive)

# 管理
  ↓ 衍生項目
健身目標 (Project)
  ↓ 完成
歸檔 (Archive)
```

**原則：**
- 領域是長期責任的容器
- 項目是領域中的具體任務
- 完成後從項目回到領域
- 項目完成後歸檔

---

## 🎯 項目類型

| 類型 | 描述 | 示例 |
|------|------|------|
| 學習類 | 技能學習、課程完成 | 語言學習、工具學習 |
| 工作類 | 職場任務、專案交付 | 產品發布、報告撰寫 |
| 個人類 | 生活目標、興趣項目 | 旅行規劃、健身目標 |
| 創作類 | 內容創作、作品產出 | 部落格、書籍 |

---

## 📈 生產力追蹤

| 指標 | 本月 | 目標 | 狀態 |
|------|------|------|------|
| 新增項目 | 2 | - | - |
| 完成項目 | 1 | 3 | ⚠️ |
| 準時完成 | 1/1 | 80% | ✅ |
| 平均週期 | 11 天 | - | - |

---

## 🔗 相關

# 工作流
- [[2 Areas/]] - 相關領域
- [[3 Resources/]] - 相關資源
- [[4 Archives/]] - 歸檔
