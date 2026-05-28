---
aliases:
  - SPARQL
  - SPARQL Query Language
created: 2026-05-28
type: entity
entity_type: standard
topic: knowledge-systems
status: reviewed
sources:
  - "[[3 Resources/000 Knowledge/ram/Knowledge-Systems/06-关联数据/06-关联数据.md]]"
---

# SPARQL

## 基本信息

- **类型**: W3C 标准查询语言
- **全称**: SPARQL Protocol and RDF Query Language
- **版本**: SPARQL 1.1 (2013)
- **用途**: 查询和操作 RDF 数据

## 描述

SPARQL 是语义网的"SQL"——用于查询 RDF 三元组数据库（知识图谱）。它允许跨知识库查询，是关联数据生态的核心工具。

### 基本语法

```sparql
SELECT ?subject ?predicate ?object
WHERE {
  ?subject ?predicate ?object .
}
```

### 实际查询 (Wikidata)

```sparql
# 查找曹雪芹的所有著作
SELECT ?work ?workLabel WHERE {
  wd:Q10581 wdt:P800 ?work.
  SERVICE wikibase:label { bd:serviceParam wikibase:language "zh". }
}
```

## 核心特征

- 图模式匹配 (Graph Pattern Matching)
- 支持跨知识库的联邦查询 (Federated Query)
- 四种子句: SELECT / CONSTRUCT / ASK / DESCRIBE
- Wikidata Query Service 是最容易上手的公共 SPARQL endpoint

## 相关概念

- [[Linked-Data]] - SPARQL 是关联数据的查询语言
- [[Wikidata]] - 最重要的公共 SPARQL endpoint
- [[Knowledge-Graph]] - KG 通常提供 SPARQL 查询接口

## Sources

- [[3 Resources/000 Knowledge/ram/Knowledge-Systems/06-关联数据/06-关联数据.md]]
