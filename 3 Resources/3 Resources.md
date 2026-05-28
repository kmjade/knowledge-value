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


---

## 📁 資源結構

```
3 Resources/
│
├── 📚 按 PARA 分類 ──────────────────────────────────
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
│   └── Hobbies/
├── 05-Reference/         # 參考類
│   └── Documents/
│
├── 📚 按 DDC 分類 ──────────────────────────────────
├── 000 Knowledge/        # 🟢 知識組織 (18 concepts)
├── 100 Philosophy. Psychology/  # 🟢 哲學·心理學 (7 子庫)
├── 200 RELIGION. THEOLOGY/      # 🟡 宗教·神學
├── 300 Social Sciences/         # 🟡 社會科學
├── 500 Natural Sciences/        # 🟢 自然科學 (數學 17 文件)
│   └── 510-Mathematics/         # 數學
├── 06 Applied Sciences/         # 🟢 應用科學 (207 文件)
├── 07-Information/              # 🟢 資訊科學 (14 文件)
├── epistemology/                # 🟢 認識論
├── finance/                     # 🟡 金融
├── people/                      # 🟡 人物
├── productivity/                # 🟢 生產力
└── 0 Department/                # 🟡 學科基礎
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

## 📚 DDC 分類導航

| DDC 大類 | 入口 | 狀態 |
|----------|------|:----:|
| 000 知識 | [[000 Knowledge/000 Knowledge\|→ 進入]] | 🟢 |
| 100 哲學·心理學 | [[100 Philosophy & Psychology\|→ 進入]] | 🟢 |
| 200 宗教·神學 | [[200 RELIGION. THEOLOGY/200 RELIGION. THEOLOGY\|→ 進入]] | 🟡 |
| 300 社會科學 | [[300 Social Sciences/300 Social Sciences\|→ 進入]] | 🟡 |
| 500 自然科學 | [[500 Natural Sciences/500 Natural Sciences\|→ 進入]] | 🟢 |
| 600 應用科學 | [[06 Applied Sciences/06 Applied Sciences\|→ 進入]] | 🟢 |

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

## 📋 管理

1. **收集資訊**：發現有趣資源時記錄
2. **評估價值**：每季檢視是否仍需
3. **建立連結**：連接相關資源和項目

### 維護頻率

| 頻率 | 動作 |
|------|------|
| 每日 | 發現有趣資源時記錄 |
| 每週 | 整理 Inbox |
| 每月 | 深度閱讀 1-2 個資源 |
| 每季 | 清理過時資源 |

---

## 🔗 相關

- [[1 Projects|Projects]] - 相關項目
- [[2 Areas|Areas]] - 相關領域
- [[0 Inbox/0 Inbox|Inbox]] - 待分揀資源
- [[AI-Log/optimization-report-2026-05-28|優化報告]] - 最近一次優化報告
