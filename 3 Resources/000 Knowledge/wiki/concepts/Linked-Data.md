---
aliases:
  - Linked Data
  - 关联数据
  - Semantic Web
  - 语义网
created: 2026-05-28
type: concept
topic: knowledge-systems
status: reviewed
sources:
  - "[[3 Resources/000 Knowledge/ram/Knowledge-Systems/06-Linked-Data/06-Linked-Data.md]]"
---

# Linked Data (关联数据)

## 定义

关联数据是 Tim Berners-Lee 提出的语义网实现路径——Web 不仅是文档的互联，更是**数据的互联**。每个数据实体用 URI 标识，通过 RDF 格式发布，并链接到其他数据源。

> 来源: [[3 Resources/000 Knowledge/ram/Knowledge-Systems/06-Linked-Data/06-Linked-Data.md|06-Linked-Data与语义网]]

## 核心原理

### 关联数据四原则

1. **用 URI 命名事物** — 每本书、每个人、每个地点有唯一 URL
2. **使用 HTTP URI** — 通过 Web 协议可访问
3. **提供有用信息** — 用标准格式 (RDF) 返回数据
4. **包含链接** — 指向其他 URI，形成数据网络

### 五星开放数据

| 星 | 条件 | 说明 |
|----|------|------|
| ★ | 数据在网上 (任何格式) | 开放许可即可 |
| ★★ | 结构化数据 | Excel 而非图片扫描 |
| ★★★ | 开放格式 | CSV 而非 .xlsx |
| ★★★★ | **使用 URI 标识事物** | RDF 格式 |
| ★★★★★ | **链接到其他数据** | 真正的 Linked Data |

### SPARQL — 语义网的 SQL

```sparql
# Wikidata: 曹雪芹写了什么？
SELECT ?work WHERE {
  wd:Q10581 wdt:P800 ?work.
}
```

SPARQL 是 W3C 标准，可以在任何 SPARQL endpoint 上执行跨数据集查询。

## 关键要点

1. Linked Data 的核心思想是**数据即网络**——每个数据点可以链接到其他数据
2. 五星模型是一个渐进路线：从开放到结构化到互联
3. SPARQL 让跨知识库查询成为可能（如同时查询 Wikidata + DBpedia）
4. 关联数据是知识图谱在 Web 上的"发布格式"
5. 本 Vault 的跨子库 wikilinks  = 个人版的 Linked Data

## 相关概念

- [[Knowledge-Graph]] - KG 是关联数据最成功的应用
- [[Ontology]] - RDF/OWL 是关联数据的技术标准
- [[SPARQL]] - 关联数据的查询语言

## Sources

- [[3 Resources/000 Knowledge/ram/Knowledge-Systems/06-Linked-Data/06-Linked-Data.md]]
