---
aliases:
  - 職業
  - Career
  - 職業發展
subtopic: 2 areas
para: areas
---

# 02-Career / 職業發展

> [!info] 區域定義
> 職業發展相關的持續性責任領域，包含技能提升、工作流程優化、個人成長等。

---

## 📊 區域概覽

### 子領域統計

| 子領域 | 說明 | 筆記數 |
|--------|------|--------|
| **🤖 AI & Claudian** | AI 知識庫、Claudian 系統 | 4 |
| **📁 Digital Organization** | 數位組織、工具、工作流 | 10 |
| **🌱 個人成長** | 習慣養成、專注力、健康 | 6 |
| **🌐 家庭網絡** | 網絡架構、內網規劃 | 4 |
| **⚡ 工作流優化** | PARA、自動化、回顧系統 | 5 |
| **💻 技術專案** | OpenClaw、開發指南 | 4 |

---

## 🗂️ 子領域導覽

### 🤖 AI & Claudian

```dataview
TABLE
  file.link AS 筆記,
  dateformat(file.mtime, "YYYY-MM-DD") AS 更新日期
FROM "2 Areas/02-Career"
WHERE contains(file.folder, "Claudian") OR contains(file.name, "AI") OR contains(file.name, "OpenClaw") OR contains(file.name, "OpenCode")
SORT file.mtime DESC
```

### 📁 Digital Organization

> [!note] 入口
> [[2 Areas/02-Career/Digital Organization/Digital Organization Index.md|Digital Organization Index]]

```dataview
TABLE
  file.link AS 筆記,
  tags AS 標籤
FROM "2 Areas/02-Career/Digital Organization"
WHERE file.name != "Digital Organization Index"
SORT file.mtime DESC
LIMIT 5
```

### 🌱 個人成長

```dataview
TABLE
  file.link AS 筆記,
  dateformat(file.mtime, "YYYY-MM-DD") AS 更新日期
FROM "2 Areas/02-Career/個人成長"
SORT file.mtime DESC
```

### 🌐 家庭網絡

```dataview
TABLE
  file.link AS 筆記,
  dateformat(file.mtime, "YYYY-MM-DD") AS 更新日期
FROM "2 Areas/02-Career/家庭網絡"
SORT file.mtime DESC
```

### ⚡ 工作流優化

```dataview
TABLE
  file.link AS 筆記,
  dateformat(file.mtime, "YYYY-MM-DD") AS 更新日期
FROM "2 Areas/02-Career/🛠️ 工作流優化"
SORT file.mtime DESC
```

---

## 📌 核心筆記

### 職業發展規劃

- [[2 Areas/02-Career/職業發展.md|職業發展]] - 職涯目標、關鍵指標、人脈管理
- [[2 Areas/02-Career/技能提升.md|技能提升]] - 技能體系、學習計畫、進度追蹤

### 技能地圖

```
技能體系
├── 技術技能
│   ├── 編程語言 (Python, JS/TS, Java, C/C++, Rust)
│   ├── 框架工具 (React, Django, Docker, K8s)
│   └── AI/ML (Prompt Engineering, LangChain, Ollama)
│
├── 軟技能
│   ├── 溝通能力
│   ├── 領導力
│   └── 問題解決
│
└── 領域知識
    ├── 人工智能
    ├── 知識管理
    └── 自動化
```

---

## 🎯 年度目標追蹤

### 2026 年職業目標

| 目標 | 期限 | 狀態 | 進度 |
|------|------|------|------|
| Java 達到熟練水平 | Q1 | 🟡 進行中 | 40% |
| CKA 認證 | Q3 | ⚪ 計劃中 | 0% |
| 技術博客 12 篇 | 年度 | 🟡 進行中 | 2/12 |
| OpenClaw 生態完成 | Q2 | 🟡 進行中 | 60% |

### 學習進度

```dataview
TABLE WITHOUT ID
  file.link AS 學習主題,
  status AS 狀態,
  priority AS 優先級
FROM "2 Areas/02-Career"
WHERE contains(tags, "learning") OR contains(file.name, "學習")
SORT priority DESC
```

---

## ✅ 定期檢查清單

### 每週

- [ ] 複習本週學習筆記
- [ ] 更新專案進度
- [ ] 記錄工作成就

### 每月

- [ ] 評估技能學習進度
- [ ] 檢視職業目標
- [ ] 整理知識庫

### 每季

- [ ] 設定季度目標
- [ ] 進行技能評估
- [ ] 更新人脈紀錄

---

## 📚 學習資源

### 線上平台

- [Coursera](https://www.coursera.org/)
- [Udemy](https://www.udemy.com/)
- [GitHub Learning Lab](https://lab.github.com/)

### 技術社區

- [Stack Overflow](https://stackoverflow.com/)
- [Hacker News](https://news.ycombinator.com/)
- [掘金](https://juejin.cn/)

---

## 🔗 相關連結

### 相關專案

```dataview
LIST
FROM "1 Projects"
WHERE contains(file.outlinks, [[2 Areas/02-Career]])
SORT file.mtime DESC
```

### 相關資源

```dataview
LIST
FROM "3 Resources"
WHERE contains(tags, "career") OR contains(tags, "learning")
SORT file.mtime DESC
LIMIT 10
```

---

## 📅 維護紀錄

| 日期 | 更新內容 |
|------|----------|
| 2026-05-26 | 優化入口頁面結構 |

---

## 📌 注意事項

> [!tip] 區域維護
> 此區域需要每月回顧，確保職業目標與實際行動保持一致。

> [!warning] 需要關注
> - 技能提升筆記存在格式問題，建議清理孤立標籤
> - 職業發展筆記需要更新進度指標
