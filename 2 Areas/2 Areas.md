---
title: Areas
aliases:
  - 領域
tags:
  - area/index
---

# Areas 領域

> 持續維護的生活責任領域，沒有明確的「完成」狀態

---

## 📊 領域統計

```dataview
TABLE without ID
  file.link AS "名稱",
  regexreplace(join(filter(file.tags, (t) => startswith(t, "#area/")), ", "), "#area/", "") AS "分類",
  review-frequency AS "檢視頻率"
FROM "2 Areas"
WHERE file.name != this.file.name
SORT file.name ASC
```

---

## 📁 領域結構

```
2 Areas/
├── 01-Health/              # 健康
│   ├── 健康管理.md
│   └── 運動計劃.md
│
├── 02-Career/              # 職業
│   ├── 職業發展.md
│   └── 技能提升.md
│
├── 03-Finance/             # 財務
│   ├── 財務規劃.md
│   └── 投資組合.md
│
├── 04-Relationships/       # 人際
│   ├── 家人關係.md
│   └── 專業人脈.md
│
├── 05-Learning/            # 學習
│   └── 持續學習.md
│
└── 06-Lifestyle/           # 生活
    ├── 居住環境.md
    └── 休閒娛樂.md
```

---

## 📋 領域索引

### 健康 (Health)
```dataview
list from "2 Areas"
where contains(file.tags, "#area/health")
```

### 職業 (Career)
```dataview
list from "2 Areas"
where contains(file.tags, "#area/career")
```

### 財務 (Finance)
```dataview
list from "2 Areas"
where contains(file.tags, "#area/finance")
```

### 人際 (Relationships)
```dataview
list from "2 Areas"
where contains(file.tags, "#area/relationships")
```

### 學習 (Learning)
```dataview
list from "2 Areas"
where contains(file.tags, "#area/learning")
```

### 生活 (Lifestyle)
```dataview
list from "2 Areas"
where contains(file.tags, "#area/lifestyle")
```

---

## ⭐ 核心領域

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

---

## 📝 領域管理原則

### 建立原則
1. **長期責任**：不是項目，是持續的責任
2. **有標準**：可以衡量的維護標準
3. **可行動**：有具體的檢查清單
4. **有價值**：對生活質量有實際影響

### 維護原則
1. **定期檢視**：按設定頻率檢查
2. **更新狀態**：記錄變化和進展
3. **調整標準**：根據情況調整目標
4. **勇於歸檔**：不再相關時歸檔

### 檢視頻率

| 領域類型 | 建議頻率 |
|----------|----------|
| 健康 | 每週 |
| 職業 | 每月 |
| 財務 | 每月 |
| 人際 | 每月 |
| 學習 | 每週 |
| 生活 | 每季 |

---

## 🔄 領域與項目的關係

```
領域 (Area) ←→ 項目 (Project)

Example:
職業發展 (Area)
  ↓ 衍生
建立知識庫 (Project)
  ↓ 完成
歸檔 (Archive)
```

**原則：**
- 領域是長期責任
- 項目是短期任務
- 完成後從項目回到領域
- 領域本身不歸檔

---

## 📊 領域健康度評估

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

> **提示**：為各領域添加 `health-score`、`issues`、`action-items` 屬性以啟用此查詢

---

## 🔗 相關

- [[PARA工作流 1]] - 完整 PARA 說明
- [[1 Projects/]] - 相關項目
- [[3 Resources/]] - 相關資源
- [[4 Archives/]] - 歸檔
