---
aliases:
  - 知識入口
  - Knowledge Index
  - DDC 001 Index
created: 2026-05-28
updated: 2026-05-28
type: directory-index
topic: knowledge-systems
---

# Knowledge — 知识系统知识库

> [!info] DDC 001 · Knowledge Organization Systems
> 从分类法到知识图谱，从叙词表到 AI——知识如何被组织、检索和理解。
> 本目录是 KOS 知识库的根入口，串联原始资料、AI 编译产物与最终制品。

---

## 📂 目录结构

```
000 Knowledge/                           ← 你在这里
│
├── 000 Knowledge.md                     ← 本文件：目录索引
├── CLAUDE.md                            ← Schema 定义 + 概念/实体清单
│
├── ram/                                 ← ① 原始资料（人类维护，AI 只读）
│   ├── Knowledge-Systems/               KOS 九章知识库
│   │   ├── Knowledge-Systems.md          主入口
│   │   ├── README.md                     简介
│   │   ├── 00-MOCs/                      MOC 总览 + 学习路径
│   │   ├── 01-概述/ ~ 09-个人知识管理/     核心九章
│   │   └── 99-资源收集/                   外部资源
│   ├── DDC/                              杜威十进分类法详解 (9章)
│   │   ├── README.md
│   │   ├── 00-MOCs/
│   │   └── 01~09-章节/
│   ├── UDC/                              国际十进分类法详解 (9章)
│   │   ├── README.md
│   │   ├── 00-MOCs/
│   │   └── 01~09-章节/
│   ├── 五维分类框架/                       产品-运营-负荷-措施-时间 标准化
│   │   ├── README.md                      五维分类框架主文档
│   │   ├── 00-MOCs/
│   │   └── 99-资源收集/
│   └── DDC-UDC对比表.md                  DDC vs UDC 全面对比
│
├── wiki/                                ← ② AI 编译产物（AI 独占写入）
│   ├── index.md                          知识索引
│   ├── log.md                            编译日志
│   ├── concepts/   (12)                  概念页
│   ├── entities/    (8)                  实体页
│   └── sources/     (1)                  来源溯源
│
└── outputs/                             ← ③ 基于 Wiki 的制品（待产出）
```

---

## 🧭 按意图导航

| 我想...              | 去这里                                                                              |
| ------------------ | -------------------------------------------------------------------------------- |
| 📖 **系统学习 KOS 理论** | [[ram/Knowledge-Systems-知识系统/Knowledge-Systems\|Knowledge-Systems 主入口]] → 三周学习路径 |
| 📚 **查阅原始资料**      | [[ram/Knowledge-Systems-知识系统/README\|知识系统 (Knowledge Systems)]] → 九章节选读          |
| 🧠 **浏览已编译的概念**    | [[3 Resources/000 Knowledge/wiki/index\|Wiki 知识索引]] → 11 概念 + 8 实体               |
| 🔧 **了解编译规则**      | [[CLAUDE\|Schema 定义]]                                                            |
| 📊 **查看编译历史**      | [[3 Resources/000 Knowledge/wiki/log\|编译日志]]                                     |
| 🗺️ **看知识全景**      | [[ram/Knowledge-Systems-知识系统/00-MOCs/知识系统 知识库总览\|MOC 总览]]                        |
| 🏷️ **标准化操作分类**    | [[ram/五维分类框架/README\|五维分类框架 (5D)]] — 产品·运营·负荷·措施·时间                              |

---

## ① ram/ — 原始资料

> 人类维护，AI 只读。原始资料是 Wiki 编译的唯一信息源。

### KOS 九章

| 层次 | 章节 | 核心 |
|:----:|------|------|
| 🌐 | [[ram/Knowledge-Systems-知识系统/01-概述/01-概述\|01-概述]] | KOS 谱系、DIKW 金字塔 |
| 📜 | [[ram/Knowledge-Systems-知识系统/02-分类法/02-分类法\|02-分类法]] | DDC、UDC、CLC |
| 📜 | [[ram/Knowledge-Systems-知识系统/03-叙词表/03-叙词表\|03-叙词表]] | MeSH、LCSH |
| 📜 | [[ram/Knowledge-Systems-知识系统/04-本体论/04-本体论\|04-本体论]] | OWL、RDF、SKOS |
| 🕸️ | [[ram/Knowledge-Systems-知识系统/05-知识图谱/05-知识图谱\|05-知识图谱]] | Wikidata、企业 KG |
| 🕸️ | [[ram/Knowledge-Systems-知识系统/06-关联数据/06-关联数据\|06-关联数据]] | Linked Data、SPARQL |
| 🏢 | [[ram/Knowledge-Systems-知识系统/07-知识管理/07-知识管理\|07-知识管理]] | SECI、实践社区 |
| 🤖 | [[ram/Knowledge-Systems-知识系统/08-AI与知识系统/08-AI与知识系统\|08-AI与知识系统]] | LLM + KG = RAG |
| 👤 | [[ram/Knowledge-Systems-知识系统/09-个人知识管理/09-个人知识管理\|09-个人知识管理]] | Zettelkasten、Obsidian、PARA |

### 导航辅助

- [[ram/Knowledge-Systems-知识系统/00-MOCs/知识系统 知识库总览\|知识库总览 MOC]]
- [[ram/Knowledge-Systems-知识系统/00-MOCs/知识系统 学习路径\|三周学习路径]]
- [[ram/Knowledge-Systems-知识系统/99-资源收集/知识系统 资源收集\|外部资源收集]]

### 分类系统详解

| 系统 | 入口 | 内容 |
|:----:|------|------|
| 📗 | [[ram/DDC-杜威十进分类法/README\|DDC 知识库]] | Dewey十进分类法 — 9章深度详解 + 学习路径 |
| 📘 | [[ram/UDC-国际十进分类法/README\|UDC 知识库]] | 国际十进分类法 — 9章深度详解 + 学习路径 |
| 📊 | [[ram/articles/DDC-UDC对比表\|DDC vs UDC 对比表]] | 全面横向对比：结构、符号、哲学、实践 |
| 🔷 | [[ram/五维分类框架/README\|五维分类框架 (5D)]] | 产品·运营·负荷·措施·时间 — 标准化操作分类 |

---

## ② wiki/ — AI 编译产物

> AI 独占写入。所有内容均从 `ram/` 编译而来，保证可溯源。

| 指标 | 数值 |
|------|------|
| 概念页 | 11 |
| 实体页 | 8 |
| 来源页 | 1 |
| 最后编译 | 2026-05-28 |

### 概念速览

| # | 概念 | 一句话 |
|---|------|--------|
| 1 | [[wiki/concepts/Knowledge-Organization-Systems\|KOS]] | 知识组织系统全谱系 |
| 2 | [[wiki/concepts/DIKW-Pyramid\|DIKW]] | 数据→信息→知识→智慧 金字塔 |
| 3 | [[wiki/concepts/Classification-Systems\|分类法]] | 树状层级分类体系 |
| 4 | [[wiki/concepts/Thesaurus\|叙词表]] | 图状多维度词表 |
| 5 | [[wiki/concepts/Ontology\|本体论]] | 语义网逻辑推理层 |
| 6 | [[wiki/concepts/Knowledge-Graph\|知识图谱]] | 工业级知识表示 |
| 7 | [[wiki/concepts/Linked-Data\|关联数据]] | Web 化知识发布 |
| 8 | [[wiki/concepts/SECI-Model\|SECI]] | 组织知识创造螺旋 |
| 9 | [[wiki/concepts/RAG\|RAG]] | 检索增强生成 |
| 10 | [[wiki/concepts/PKM\|PKM]] | 个人知识管理 |
| 11 | [[wiki/concepts/PARA-Method\|PARA]] | 项目-领域-资源-归档 |

> 完整索引：[[3 Resources/000 Knowledge/wiki/index|Wiki 知识索引]] · Schema：[[CLAUDE]]

---

## ③ outputs/ — 制品

> 基于 Wiki 知识库生成的最终产出物（图表、报告、演示等）。

| 状态 | 说明 |
|------|------|
| 🟡 待产出 | 暂无制品，编译完成后可生成架构图、知识图谱可视化等 |

---

## 📊 统计

```dataview
TABLE WITHOUT ID
  file.folder AS 目录,
  length(rows) AS 文件数
FROM "3 Resources/000 Knowledge"
WHERE file.name != "000 Knowledge"
GROUP BY file.folder
SORT file.folder ASC
```

---

## ✅ 维护清单

### 日常
- [ ] 新资料存入 `ram/` 对应章节
- [ ] 运行 `/triage` 分拣 Inbox 中的 KOS 相关内容

### 按需
- [ ] 运行 `/wiki-compile 000 knowledge` 增量编译
- [ ] 检查 `wiki/log.md` 确认编译质量

### 每季
- [ ] 检查概念/实体页的 Sources 完整性
- [ ] 更新学习路径和 MOC

---

## 🔗 跨库连接

### 父节点
- [[3 Resources/3 Resources.md|Resources 资源总览]]

### 关联知识库

| 知识库 | 关系 |
|--------|------|
| [[3 Resources/000 Knowledge/Computer-Science/Artificial-Intelligence/02-机器学习/ai-ml/CLAUDE\|AI/ML 知识库]] | AI 驱动的知识系统 |
| [[5 Zettels\|Zettels 卡片系统]] | 个人知识管理实践 |
| [[3 Resources/productivity/CLAUDE.md\|生产力知识库]] | PARA 方法论 |

---

## 📅 更新日志

| 日期 | 更新内容 |
|------|----------|
| 2026-05-28 | 创建知识索引入口 |
| 2026-05-28 | **重构**：聚焦本目录三层管道（ram → wiki → outputs），移除全域冗余 |

---

*分类: 3 Resources/000 Knowledge · DDC: 001 Knowledge*
