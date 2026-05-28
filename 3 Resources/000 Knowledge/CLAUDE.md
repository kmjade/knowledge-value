---
aliases:
  - Knowledge Wiki
  - 知识知识库
created: 2026-05-25
updated: 2026-05-28
type: wiki-index
topic: 000 Knowledge
---

# Knowledge Wiki Schema — DDC 001

> 知识组织系统 (KOS) 的完整知识库，从分类法到 AI 的知识组织谱系。

## 子库结构

```
3 Resources/000 Knowledge/
├── CLAUDE.md              # 本文件 — Schema 定义
├── 000 Knowledge.md        # 知识总索引入口
├── ram/                    # 原始资料 (人类维护, AI 只读)
│   ├── Knowledge-Systems/  # KOS 九章知识库
│   │   ├── 01~09-章节/      # 核心内容
│   │   ├── 00-MOCs/         # 学习路径 + 总览
│   │   └── 99-资源收集/      # 外部资源链接
│   ├── DDC/                # 杜威十进分类法详解 (9章)
│   ├── UDC/                # 国际十进分类法详解 (9章)
│   └── DDC-UDC对比表.md    # 两大分类法全面对比
├── wiki/                   # LLM 编译产物 (AI 独占)
│   ├── index.md            # 知识索引
│   ├── log.md              # 编译日志
│   ├── concepts/           # 概念页面 (12)
│   ├── entities/           # 实体页面 (8)
│   └── sources/            # 来源溯源
└── outputs/                # 基于 Wiki 的制品
```

## Wiki 编译状态

| 指标 | 数值 |
|------|------|
| 概念页 | 13 |
| 实体页 | 8 |
| 来源页 | 1 |
| 总页面 | 24 |
| 最后编译 | 2026-05-28 |
| 编译状态 | ✅ 完成 |

## 概念清单

| # | 概念 | 页面 |
|---|------|------|
| 1 | KOS 知识组织系统 | [[wiki/concepts/Knowledge-Organization-Systems\|KOS]] |
| 2 | DIKW 金字塔 | [[wiki/concepts/DIKW-Pyramid\|DIKW]] |
| 3 | 分类法体系 | [[wiki/concepts/Classification-Systems\|分类法]] |
| 4 | 叙词表 | [[wiki/concepts/Thesaurus\|叙词表]] |
| 5 | 本体论 | [[wiki/concepts/Ontology\|本体论]] |
| 6 | 知识图谱 | [[wiki/concepts/Knowledge-Graph\|知识图谱]] |
| 7 | 关联数据 | [[wiki/concepts/Linked-Data\|关联数据]] |
| 8 | SECI 模型 | [[wiki/concepts/SECI-Model\|SECI]] |
| 9 | RAG | [[wiki/concepts/RAG\|RAG]] |
| 10 | 个人知识管理 | [[wiki/concepts/PKM\|PKM]] |
| 11 | PARA 方法论 | [[wiki/concepts/PARA-Method\|PARA]] |
| 12 | 信息生命周期 | [[wiki/concepts/Information-Lifecycle\|信息生命周期]] |
| 13 | 熵增与反熵 | [[wiki/concepts/Entropy-Anti-Entropy\|熵增与反熵]] |

## 实体清单

| # | 实体 | 类型 | 页面 |
|---|------|------|------|
| 1 | DDC | 系统 | [[3 Resources/000 Knowledge/wiki/entities/DDC\|DDC]] |
| 2 | UDC | 系统 | [[3 Resources/000 Knowledge/wiki/entities/UDC\|UDC]] |
| 3 | MeSH | 系统 | [[wiki/entities/MeSH\|MeSH]] |
| 4 | Gene Ontology | 系统 | [[wiki/entities/Gene-Ontology\|GO]] |
| 5 | Wikidata | 平台 | [[wiki/entities/Wikidata\|Wikidata]] |
| 6 | SPARQL | 标准 | [[wiki/entities/SPARQL\|SPARQL]] |
| 7 | Zettelkasten | 方法 | [[wiki/entities/Zettelkasten\|Zettelkasten]] |
| 8 | Tim Berners-Lee | 人物 | [[wiki/entities/Tim-Berners-Lee\|TBL]] |

## 编译规则

1. **raw/ 只读**: AI 不修改原始资料
2. **Sources 必须**: 所有 wiki 页面必须标注来源
3. **链接优先**: 使用 `[[]]` 建立知识连接
4. **增量编译**: 优先更新现有页面，避免重复

## 使用命令

- `/wiki-compile 000 knowledge` — 编译此知识库
- `/triage` — 将新资料分拣到 ram/