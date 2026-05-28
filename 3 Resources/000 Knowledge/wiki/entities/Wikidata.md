---
aliases:
  - Wikidata
  - 维基数据
created: 2026-05-28
type: entity
entity_type: platform
topic: knowledge-systems
status: reviewed
sources:
  - "[[3 Resources/000 Knowledge/ram/Knowledge-Systems/05-知识图谱/05-知识图谱.md]]"
---

# Wikidata

## 基本信息

- **类型**: 开放知识图谱
- **创建**: 2012 年，Wikimedia Foundation
- **实体数**: 1 亿+
- **许可**: CC0 (完全自由，无任何限制)
- **查询**: SPARQL endpoint

## 描述

Wikidata 是全球最大的开放知识图谱，由 Wikimedia 基金会维护。它是 Wikipedia 的结构化数据后端——Wikipedia 的信息框 (infobox) 数据实际上来自 Wikidata。任何人都可以编辑和查询。

### 数据模型

```
Item (Q-number) → 实体，如 Q10581 = 曹雪芹
Property (P-number) → 关系，如 P800 = "notable work"
Statement → Item-Property-Value 三元组
```

### SPARQL 查询示例

```sparql
# 曹雪芹写了什么？
SELECT ?work ?workLabel WHERE {
  wd:Q10581 wdt:P800 ?work.
  SERVICE wikibase:label { bd:serviceParam wikibase:language "zh". }
}
```

## 核心特征

- **CC0 许可**: 数据可自由用于任何目的，包括商业
- **多语言**: 同一实体有所有语言的标签
- **SPARQL**: 强大的结构化查询
- **众包维护**: 类似 Wikipedia 的编辑模式

## 相关概念

- [[Knowledge-Graph]] - Wikidata 是最重要的开放 KG
- [[Linked-Data]] - Wikidata 是五星关联数据的典范
- [[SPARQL]] - Wikidata 的查询语言

## Sources

- [[3 Resources/000 Knowledge/ram/Knowledge-Systems/05-知识图谱/05-知识图谱.md]]
