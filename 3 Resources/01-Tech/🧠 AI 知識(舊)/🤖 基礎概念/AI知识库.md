---
# 知識庫
date: 2026-01-25
type: index
tags: [AI, index, knowledge-base]
---

# 知識庫

> [!info] 說明
# 知識庫

---

# 知識庫

```
# AI 知識
├── 📰 新聞/           - AI行业新聞与動態
├── 📚 研究/           - 论文、研究報告
# 教程
├── 🛠️ 工具/           - AI工具评测
├── 📖 學習/           - 學習路徑与資源
# 知識
```

---

# 更新

| 日期         | 筆記                                   | 类型   |
| ---------- | ------------------------------------ | ---- |
# 分析
# 工作流

---

## 📰 新聞与動態

```dataview
TABLE dateformat(file.ctime, "yyyy-MM-dd") as "日期", impact_level as "影响"
FROM "3 Resources/🧠 AI/新聞"
SORT file.ctime DESC
LIMIT 10
```

---

## 📚 研究与论文

```dataview
TABLE
FROM "3 Resources/🧠 AI/研究"
SORT file.name ASC
```

---

## 🔧 技術文檔

```dataview
TABLE
FROM "3 Resources/🧠 AI/技術"
SORT file.name ASC
```

---

## 🛠️ 工具评测

```dataview
TABLE
FROM "3 Resources/🧠 AI/工具"
SORT file.name ASC
```

---

## 🔗 核心概念（Zettels）

```dataview
TABLE dateformat(file.ctime, "yyyy-MM-dd") as "創建", type as "类型"
FROM "5 Zettels"
WHERE contains(tags, "AI")
SORT file.ctime DESC
LIMIT 20
```

---

## 🏷️ 主題標籤

| 標籤          | 說明     | 数量  |
| ----------- | ------ | --- |
| #AI         | 通用AI標籤 | -    |
| #LLM        | 大语言模型  | -    |
| #enterprise | 企业AI   | -    |
| #news       | AI新聞   | -    |
| #research   | 研究论文   | -    |
| #tech       | 技術文檔   | -    |


---

## 💡 热门主題

1. [[企业AI采购決策框架]] - 企业级AI采购策略
2. [[LLM提示工程]] - 大语言模型使用技巧
3. [[AI Agent架構]] - AI代理系統設計

---

# 工作流

# 分析
# 工作流
- [[收件箱處理流程]] - 內容捕获入口

---

## 📌 快速操作

### 新增新內容

1. **捕获新聞**: 新增到 `0 Personals/📥 00_InBox/`
# 分析
3. **技術拆解**: 儲存到 `3 Resources/🧠 AI/技術/`
4. **原子筆記**: 儲存到 `5 Zettels/📚/concept/`

### 搜尋內容

- 使用 `/search` 命令搜尋
- 或使用Dataview查詢

---

# 知識庫

```dataviewjs
const aiPages = dv.pages('"3 Resources/🧠 AI"');
const zettelAI = dv.pages('"5 Zettels"').where(p => p.tags && p.tags.includes("AI"));

dv.table(['类别', '数量'], [
  ['新聞/動態', aiPages.where(p => p.file.folder.includes('新聞')).length],
  ['技術文檔', aiPages.where(p => p.file.folder.includes('技術')).length],
  ['研究论文', aiPages.where(p => p.file.folder.includes('研究')).length],
  ['工具评测', aiPages.where(p => p.file.folder.includes('工具')).length],
  ['原子筆記', zettelAI.length],
  ['总计', aiPages.length + zettelAI.length]
]);
```

---

## 🔗 相關資源

# AI 知識
# 指南
# 管理
- [[Zettelkasten|Zettelkasten原子化標準]] - 筆記组织規範

---

# 更新
