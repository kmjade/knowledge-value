---
title: AI知识库索引
date: 2026-01-25
type: index
tags: [AI, index, knowledge-base]
---

# AI知识库 / AI Knowledge Base

> [!info] 说明
> 本索引提供AI领域知识库的导航入口，包括新闻、研究、技术、工具等各类资源。

---

## 📁 知识库结构

```
3 Resources/01-Tech/🧠 AI 知识/
├── 📰 新闻/           - AI行业新闻与动态
├── 📚 研究/           - 论文、研究报告
├── 🔧 技术/           - 技术文档与教程
├── 🛠️ 工具/           - AI工具评测
├── 📖 学习/           - 学习路径与资源
└── 🤖 基础概念/       - AI基础知识
```

---

## 🆕 最近更新

| 日期         | 笔记                                   | 类型   |
| ---------- | ------------------------------------ | ---- |
| 2026-01-25 | [[20260125-Apple选择Google而非OpenAI分析]] | 新闻分析 |
| 2026-01-25 | [[Obsidian阅读、分析、拆解-AI]]              | 工作流  |

---

## 📰 新闻与动态

```dataview
TABLE dateformat(file.ctime, "yyyy-MM-dd") as "日期", impact_level as "影响"
FROM "3 Resources/🧠 AI/新闻"
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

## 🔧 技术文档

```dataview
TABLE
FROM "3 Resources/🧠 AI/技术"
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
TABLE dateformat(file.ctime, "yyyy-MM-dd") as "创建", type as "类型"
FROM "5 Zettels"
WHERE contains(tags, "AI")
SORT file.ctime DESC
LIMIT 20
```

---

## 🏷️ 主题标签

| 标签          | 说明     | 数量  |
| ----------- | ------ | --- |
| #AI         | 通用AI标签 | -    |
| #LLM        | 大语言模型  | -    |
| #enterprise | 企业AI   | -    |
| #news       | AI新闻   | -    |
| #research   | 研究论文   | -    |
| #tech       | 技术文档   | -    |


---

## 💡 热门主题

1. [[企业AI采购决策框架]] - 企业级AI采购策略
2. [[LLM提示工程]] - 大语言模型使用技巧
3. [[AI Agent架构]] - AI代理系统设计

---

## 🔧 工作流入口

- [[Obsidian阅读、分析、拆解-AI]] - AI内容处理标准流程
- [[渐进式总结工作流]] - 通用阅读内化流程
- [[收件箱处理流程]] - 内容捕获入口

---

## 📌 快速操作

### 添加新内容

1. **捕获新闻**: 添加到 `0 Personals/📥 00_InBox/`
2. **深度分析**: 保存到 `3 Resources/🧠 AI/新闻/`
3. **技术拆解**: 保存到 `3 Resources/🧠 AI/技术/`
4. **原子笔记**: 保存到 `5 Zettels/📚/concept/`

### 搜索内容

- 使用 `/search` 命令搜索
- 或使用Dataview查询

---

## 📊 知识库统计

```dataviewjs
const aiPages = dv.pages('"3 Resources/🧠 AI"');
const zettelAI = dv.pages('"5 Zettels"').where(p => p.tags && p.tags.includes("AI"));

dv.table(['类别', '数量'], [
  ['新闻/动态', aiPages.where(p => p.file.folder.includes('新闻')).length],
  ['技术文档', aiPages.where(p => p.file.folder.includes('技术')).length],
  ['研究论文', aiPages.where(p => p.file.folder.includes('研究')).length],
  ['工具评测', aiPages.where(p => p.file.folder.includes('工具')).length],
  ['原子笔记', zettelAI.length],
  ['总计', aiPages.length + zettelAI.length]
]);
```

---

## 🔗 相关资源

- [[2 Areas/ai-knowledge/ai-knowledge.md]] - AI 知识库领域（Area）
- [[3 Resources/📖 工具使用/Obsidian/Obsidian]] - Obsidian使用指南
- [[PARA知识管理]] - 整体知识管理框架
- [[Zettelkasten|Zettelkasten原子化标准]] - 笔记组织规范

---

*最后更新: 2026-01-25*
