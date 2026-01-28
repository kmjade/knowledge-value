---
title: Resources
aliases:
  - 資源
tags:
  - resource/index
---

# Resources 資源

> 有興趣的主題、參考資料、收集的資訊

---

## 📊 資源統計

```dataview
TABLE without ID
  file.link AS "名稱",
  interest-level AS "興趣程度",
  regexreplace(join(filter(file.tags, (t) => startswith(t, "#resource/")), ", "), "#resource/", "") AS "分類"
FROM "3 Resources"
WHERE file.name != this.file.name
SORT interest-level DESC
```

---

## 📁 資源結構

```
3 Resources/
├── 01-Tech/              # 技術類
│   ├── Programming/
│   ├── AI-ML/
│   └── Data-Science/
├── 02-Learning/          # 學習類
│   ├── Courses/
│   └── Books/
├── 03-Productivity/      # 生產力類
│   ├── Tools/
│   └── Methods/
├── 04-Interests/         # 興趣類
│   ├── Travel/
│   ├── Cooking/
│   └── Hobbies/
└── 05-Reference/         # 參考類
    ├── Documents/
    └── Templates/
```

---

## 📋 資源索引

### 技術類 (Tech)

```dataview
list from "3 Resources"
where contains(file.tags, "#resource/tech")
sort file.name asc
```

### 學習類 (Learning)

```dataview
list from "3 Resources"
where contains(file.tags, "#resource/learning")
sort file.name asc
```

### 生產力類 (Productivity)

```dataview
list from "3 Resources"
where contains(file.tags, "#resource/productivity")
sort file.name asc
```

### 興趣類 (Interests)

```dataview
list from "3 Resources"
where contains(file.tags, "#resource/interest")
sort file.name asc
```

---

## ⭐ 精選資源

### 高優先級資源
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

### 最近新增
```dataview
TABLE without ID
  file.link AS "資源",
  file.ctime AS "創建日期"
FROM "3 Resources"
WHERE file.name != this.file.name
SORT file.ctime DESC
LIMIT 5
```

---

## 📝 資源管理原則

1. **定期更新**：每月添加新資源
2. **評估價值**：每季檢視是否仍需
3. **建立連結**：連接相關資源和項目
4. **深度閱讀**：不要只收藏，要實際閱讀
5. **分享知識**：將學習內容分享給他人

---

## 🔄 更新頻率

| 頻率 | 動作 |
|------|------|
| 每日 | 發現有趣資源時記錄 |
| 每週 | 整理和分類新資源 |
| 每月 | 深度閱讀 1-2 個資源 |
| 每季 | 清理過時資源 |

---

## 🔗 相關

- [[PARA工作流]] - 完整 PARA 說明
- [[1 Projects|Projects]] - 相關項目
- [[2 Areas|Areas]] - 相關領域
