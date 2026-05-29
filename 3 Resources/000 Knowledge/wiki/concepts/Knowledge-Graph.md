---
aliases:
  - Knowledge Graph
  - 知识图谱
  - 知识网络
created: 2026-05-28
type: concept
topic: knowledge-systems
status: reviewed
sources:
  - "[[3 Resources/000 Knowledge/ram/Knowledge-Systems/05-Knowledge-Graphs/05-Knowledge-Graphs.md]]"
---

# Knowledge Graph (知识图谱)

## 定义

知识图谱是本体的工业级实现——将亿万实体和关系组织为可查询、可推理的网络。Google 在 2012 年提出这个概念，但比利时学者 Paul Otlet 在 100 年前已有雏形。

> 来源: [[3 Resources/000 Knowledge/ram/Knowledge-Systems/05-Knowledge-Graphs/05-Knowledge-Graphs.md|05-Knowledge-Graphs]]

## 核心原理

### 三大要素

| 要素 | 说明 | 例子 |
|------|------|------|
| **实体 (Entity)** | 人/地/物/概念 | 曹雪芹、红楼梦、清朝 |
| **关系 (Relation)** | 实体间的连接 | 作者、出生地、创作于 |
| **属性 (Attribute)** | 实体的特征 | 曹雪芹: 生卒 1715-1763 |

### 主要知识图谱

| 图谱 | 实体数 | 来源 | 许可 |
|------|--------|------|------|
| **Wikidata** | 1 亿+ | 众包 | CC0 (完全自由) |
| **Google KG** | 数十亿 | 自动提取 | 闭源 |
| **DBpedia** | 500 万+ | Wikipedia 结构化 | 开源 |
| **CN-DBpedia** | 1600 万+ | 中文百科 | 开源 |

### 构建流程

```
原始数据 (文本/表格/数据库)
    ↓ 实体识别 (NER)
实体列表
    ↓ 关系抽取
三元组 (实体-关系-实体)
    ↓ 实体对齐/融合
知识图谱
    ↓ 推理
新知识发现
```

## 应用场景

| 应用 | 说明 |
|------|------|
| **搜索引擎** | 搜索"曹雪芹"→右侧知识卡片——来自 KG |
| **推荐系统** | "喜欢红楼梦的人还喜欢…" |
| **问答系统** | "谁写了红楼梦？"→KG 直接返回 |
| **企业 KG** | 供应链、客户、产品的关系网络 |
| **反欺诈** | 识别异常关系模式 |

## 关键要点

1. 知识图谱 = 大规模本体 + 实例数据
2. Wikidata 是最重要的开放知识图谱，CC0 许可允许任意使用
3. KG 构建的五步流水线: NER → 关系抽取 → 三元组 → 融合 → 推理
4. KG 的可解释性强于 LLM，但覆盖广度不如 LLM
5. Obsidian 的 `[[wikilink]]` 网络本质上是一个个人知识图谱

## 相关概念

- [[Ontology]] - KG 的本体基础
- [[Linked-Data]] - KG 在 Web 上的发布方式
- [[RAG]] - KG + LLM 的融合应用

## Sources

- [[3 Resources/000 Knowledge/ram/Knowledge-Systems/05-Knowledge-Graphs/05-Knowledge-Graphs.md]]
