---
aliases:
  - KOS
  - 知识组织系统
  - Knowledge Organization Systems
created: 2026-05-28
type: concept
topic: knowledge-systems
status: reviewed
sources:
  - "[[3 Resources/000 Knowledge/ram/Knowledge-Systems/01/01-概述.md]]"
---

# Knowledge Organization Systems (KOS)

## 定义

知识组织系统 (KOS) 是将知识结构化、使之可发现、可理解、可复用的体系。从图书馆的书架到 Google 的知识图谱，本质相同——**让正确的知识在正确的时间到达正确的人**。

> 来源: [[3 Resources/000 Knowledge/ram/Knowledge-Systems/01/01-概述.md|01]]

## 核心原理

### DIKW 金字塔

KOS 建立在信息层级之上：

```
智慧 Wisdom  —— 应用知识做正确判断
知识 Knowledge—— 结构和理解的信息
信息 Information—— 有上下文的数据
数据 Data      —— 原始符号
```

| 层级 | 例子 |
|------|------|
| 数据 | "37.5" |
| 信息 | "体温 37.5°C" |
| 知识 | "正常 36-37°C，37.5 是低烧" |
| 智慧 | "先物理降温，持续升高就去医院" |

### KOS 类型谱系（按结构化程度）

| 类型 | 结构化程度 | 例子 |
|------|-----------|------|
| 标签/大众分类 | ★ | Instagram #hashtag |
| 分类法 | ★★ | DDC, UDC, CLC |
| 叙词表 | ★★★ | MeSH, LCSH |
| 本体 | ★★★★ | Gene Ontology |
| 知识图谱 | ★★★★★ | Wikidata |

## 三大功能

| 功能 | 说明 | 在本 Vault 中的实现 |
|------|------|---------------------|
| **描述** | 这是什么？——元数据、标注 | YAML frontmatter (`type:`, `topic:`, `tags:`) |
| **组织** | 它和其他知识的关系？——分类、链接 | PARA 文件夹 + `[[wikilink]]` |
| **检索** | 如何找到它？——搜索、浏览、推理 | Obsidian 搜索 + Dataview 查询 + MOC 导航 |

## 关键要点

1. KOS 是一个谱系，从低结构化的标签到高结构化的知识图谱
2. DIKW 是理解知识层级的基础框架
3. KOS 的三大功能（描述、组织、检索）在任何系统中都适用
4. 个人 Obsidian vault 本质上就是一套"个人 KOS"
5. 结构化程度越高，机器可理解性越强，但构建成本也越高

## 实践应用

- **图书馆**: DDC/UDC 分类排架
- **搜索引擎**: Google Knowledge Graph 提供实体卡片
- **个人知识管理**: Obsidian 的文件夹 + 标签 + 链接 = 个人 KOS
- **AI 增强**: LLM + KG = RAG，让 AI 基于事实回答

## 相关概念

- [[Classification-Systems]] - KOS 的基础层级
- [[Thesaurus]] - 比分类法更精细的知识组织工具
- [[Ontology]] - KOS 的高级形式，包含逻辑推理
- [[Knowledge-Graph]] - KOS 的工业级实现
- [[Linked-Data]] - KOS 在 Web 上的实现
- [[PKM]] - KOS 在个人层面的应用

## Sources

- [[3 Resources/000 Knowledge/ram/Knowledge-Systems/01/01-概述.md]]
- [[3 Resources/000 Knowledge/ram/Knowledge-Systems/Knowledge-Systems.md]]
