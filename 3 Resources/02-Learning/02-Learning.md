---
title: Learning Resources Index
tags: [resource/learning, index]
aliases:
  - 课程
  - 學習資源
  - Learning Resources Index
---

# 📚 學習資源

# 方法

---

## 🎯 快速開始

> [!tip] 推薦閱讀順序
>
# 指南
# 管理
> 3. 根據學習路徑選擇對應資源庫深入學習

---

## 📚 資源分類

### 學習資源整合

| 資源 | 說明 | 狀態 |
|------|------|------|
# 指南
| [[Courses/PARA學習與實施計劃.md]] | PARA 系統 30 天實施計劃 | ✅ |

---

### 知識庫

| 知識庫 | 主題 | 檔案數 | 狀態 |
|--------|------|--------|------|
| [[計算机網路/README.md]] | 計算機網絡 | 15+ | ✅ |
| [[数学知識庫/数学知識庫.md]] | 數學知識 | 10+ | ✅ |
| [[3 Resources/02-Learning/易经/易经]] | 易經智慧 | 10+ | ✅ |

---

### 工具與自動化

| 工具 | 用途 | 狀態 |
|------|------|------|
# 工作流

---

### 課程與書籍

| 類別 | 檔案 | 狀態 |
|------|------|------|
| [[Courses/Courses.md]] | 線上課程 | ⚠️ 待填充 |
| [[Books/Books.md]] | 書籍閱讀 | ⚠️ 待填充 |

---

## 🗂️ 子分類統計

```dataview
Table without id (subtopic + " (" + length(rows.file.link) + ")") as "Subtopic", sort(rows.file.link) as File
WHERE contains(file.path, this.file.folder) AND file.name != this.file.name
FLATTEN subtopic
GROUP BY subtopic
SORT subtopic
```

---

## 🔗 連結筆記

```dataview
Table sort(rows.file.link) as File
FROM [[]]
WHERE !contains(file.folder, this.file.name)
GROUP BY file.folder as Folder
```

---

## 📊 學習進度

### 2026年Q1 進度

| 領域 | 目標 | 進度 | 狀態 |
|------|------|------|------|
| PARA 系統 | 90% | 🟢 90% | ✅ |
| 計算機網絡 | 85% | 🟢 85% | ✅ |
| AI/ML | 60% | 🟡 60% | 🟡 |
| 數學基礎 | 30% | 🟡 30% | 🟡 |
| 易經智慧 | 70% | 🟢 70% | ✅ |

---

## 🎯 學習路徑

# 指南

1. **計算機網絡基礎** (2-3個月)
2. **數學基礎進階** (3-6個月)
3. **易經智慧學習** (持續學習)
4. **PARA 系統實施** (30天)
5. **閃念學習實踐** (持續進行)

---

# 更新

# 指南
- **2026-01-26**: 完成 [[Courses/PARA學習與實施計劃.md]]
# 指南
- **2026-01-21**: 完善 [[計算机網路/README.md]]

---

# 更新
