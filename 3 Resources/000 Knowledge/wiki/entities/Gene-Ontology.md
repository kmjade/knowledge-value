---
aliases:
  - Gene Ontology
  - GO
  - 基因本体
created: 2026-05-28
type: entity
entity_type: system
topic: knowledge-systems
status: reviewed
sources:
  - "[[3 Resources/000 Knowledge/ram/Knowledge-Systems/04-本体论/04-本体论.md]]"
---

# Gene Ontology (GO)

## 基本信息

- **类型**: 生物信息学本体
- **创建**: 1998 年，Gene Ontology Consortium
- **用途**: 基因和蛋白质功能的标准注释
- **许可**: 开放 (CC BY)

## 描述

Gene Ontology 是生命科学领域最成功的本体工程。它为基因功能提供了一套标准化的词汇和层级结构，解决了不同数据库使用不同术语描述同一功能的"巴别塔"问题。

### 三大子本体

| 子本体 | 描述 | 例子 |
|--------|------|------|
| **分子功能** (Molecular Function) | 基因产物的分子活动 | "DNA 结合" |
| **生物过程** (Biological Process) | 分子活动完成的过程 | "细胞分裂" |
| **细胞组分** (Cellular Component) | 基因产物发挥功能的位置 | "细胞核" |

## 核心特征

- 跨物种统一注释——人类的"细胞分裂"和果蝇的是同一个 GO term
- 有向无环图 (DAG) 结构——一个 term 可以有多个父节点
- 目前包含 40,000+ 术语
- 每条注释有 evidence code 标注可靠性

## 相关概念

- [[Ontology]] - GO 是最成功的本体论应用
- [[Knowledge-Graph]] - GO + 基因数据构成生物知识图谱

## Sources

- [[3 Resources/000 Knowledge/ram/Knowledge-Systems/04-本体论/04-本体论.md]]
