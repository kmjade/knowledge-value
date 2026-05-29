---
aliases:
  - Thesaurus
  - 叙词表
  - 主题词表
  - 受控词表
created: 2026-05-28
type: concept
topic: knowledge-systems
status: reviewed
sources:
  - "[[3 Resources/000 Knowledge/ram/Knowledge-Systems/03-Thesauri/03-Thesauri.md]]"
---

# Thesaurus (叙词表)

## 定义

叙词表是比分类法更精细的知识组织工具——它不仅列出术语，还定义术语间的层级、等同和关联关系 (BT/NT/RT)，支持多维度检索。

> 来源: [[3 Resources/000 Knowledge/ram/Knowledge-Systems/03-Thesauri/03-Thesauri.md|03-Thesauri与受控词表]]

## 核心原理

### 核心关系类型

| 关系 | 符号 | 含义 | 例子 |
|------|------|------|------|
| 上位词 | BT (Broader Term) | 更广义的概念 | 猫 **BT** 哺乳动物 |
| 下位词 | NT (Narrower Term) | 更狭义的概念 | 猫 **NT** 暹罗猫 |
| 相关词 | RT (Related Term) | 非层级的语义关联 | 猫 **RT** 宠物 |
| 同义词 | USE/UF | 规范词/非规范词 | "猫咪" **USE** "猫" |

### 著名叙词表

| 名称 | 领域 | 术语数 | 说明 |
|------|------|--------|------|
| **MeSH** | 医学 | 30,000+ | PubMed 索引基础 |
| **LCSH** | 通用 | 340,000+ | 美国国会图书馆 |
| **中文主题词表** | 通用 (中文) | 120,000+ | 中国图书馆 |
| **AGROVOC** | 农业 | 40,000+ | FAO 维护 |

### 叙词表 vs 分类法

| 维度 | 分类法 | 叙词表 |
|------|--------|--------|
| 结构 | 树 (单父节点) | 图 (多父节点) |
| 检索方式 | 浏览为主 | 搜索+浏览 |
| 粒度 | 学科级 | 概念级 |
| 多维度 | 不支持 | 支持 (一个概念可有多个 BT) |
| 例子 | DDC 636.7 = 狗 | MeSH: "犬" = Dogs |

## 关键要点

1. 叙词表的核心突破是**允许一个概念有多个父节点**（图结构 vs 树结构）
2. BT/NT/RT 三种关系构成了语义导航的基础
3. USE/UF 机制解决了同义词问题，在搜索时自动映射
4. Obsidian 的 `aliases:` frontmatter 就是叙词表的 USE/UF 实现
5. MOC 导航页相当于叙词表的 BT/NT 层级

## 实践应用

- **本 Vault**: `aliases:` = 入口词映射；MOC 页面 = 层级导航
- **PubMed**: MeSH 词表驱动精准医学文献检索
- **标签系统**: 受控词表保证标签一致性，避免同义词分散内容

## 相关概念

- [[Classification-Systems]] - 叙词表的上层，分类法是树，叙词表是图
- [[Ontology]] - 叙词表的进化方向，增加逻辑约束

## Sources

- [[3 Resources/000 Knowledge/ram/Knowledge-Systems/03-Thesauri/03-Thesauri.md]]
