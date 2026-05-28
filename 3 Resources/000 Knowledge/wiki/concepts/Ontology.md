---
aliases:
  - Ontology
  - 本体论
  - 知识表示
  - OWL
created: 2026-05-28
type: concept
topic: knowledge-systems
status: reviewed
sources:
  - "[[3 Resources/000 Knowledge/ram/Knowledge-Systems/04-Ontologies/04-Ontologies.md]]"
---

# Ontology (本体论)

## 定义

本体是知识系统的最高形式——不仅定义概念和术语，还定义概念之间的逻辑关系和推理规则。如果分类法是"索引"，本体就是"知识模型"。

> 来源: [[3 Resources/000 Knowledge/ram/Knowledge-Systems/04-Ontologies/04-Ontologies.md|04-Ontologies]]

## 核心原理

### 本体的四个要素

| 要素 | 说明 | 例子 |
|------|------|------|
| **类 (Class)** | 概念类别 | Person, Book, Disease |
| **属性 (Property)** | 类之间的关系 | hasAuthor, causes, treats |
| **实例 (Instance)** | 具体的个体 | "红楼梦" is-a Book |
| **公理 (Axiom)** | 逻辑约束 | "每本书至少有一个作者" |

### W3C 标准栈

```
OWL (Web Ontology Language — 推理层)
  ↕
RDFS (RDF Schema — 基础术语定义)
  ↕
RDF (Resource Description Framework — 三元组)
  ↕
XML/JSON (序列化格式)
```

### RDF 三元组

RDF 是一切语义网技术的基础：

```
<红楼梦> <hasAuthor> <曹雪芹> .
<曹雪芹> <bornIn> <清朝> .
<红楼梦> <isA> <Novel> .
```

每个三元组 = 主语 + 谓语 + 宾语，构成知识的基本原子。

### 著名本体

| 本体 | 领域 | 说明 |
|------|------|------|
| **Gene Ontology** | 生物基因功能 | 三大子本体: 分子功能、生物过程、细胞组分 |
| **SNOMED CT** | 医学术语 | 30 万+ 概念，临床信息标准 |
| **Schema.org** | Web 语义标注 | Google/Bing/Yahoo 联合推出，SEO 核心 |
| **FOAF** | 人际关系描述 | Friend of a Friend，最早的社交本体 |

## 关键要点

1. 本体 = 分类法 + 叙词表 + 逻辑推理规则
2. RDF 三元组是语义网的最小知识单元
3. OWL 允许表达复杂逻辑（如传递性、对称性、基数约束）
4. 本体比知识图谱更重"推理"，知识图谱更重"规模"
5. 本 Vault 的 YAML `type:` + 子库 `CLAUDE.md` schema = 简化的本体约束

## 实践应用

- **本 Vault**: Claude 子库 schema (`type: concept|entity|source`) = 本体约束
- **SEO**: Schema.org 标记帮助搜索引擎理解网页内容
- **医疗**: SNOMED CT 驱动电子病历的语义互操作
- **生物**: Gene Ontology 统一全球基因功能注释

## 相关概念

- [[Thesaurus]] - 本体的前身，叙词表加上逻辑约束即成本体
- [[Knowledge-Graph]] - 本体的大规模工业应用
- [[Linked-Data]] - 本体在 Web 上的发布标准

## Sources

- [[3 Resources/000 Knowledge/ram/Knowledge-Systems/04-Ontologies/04-Ontologies.md]]
