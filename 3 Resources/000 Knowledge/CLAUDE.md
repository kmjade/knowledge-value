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
├── CLAUDE.md
├── 000 Knowledge.md                    # DDC 000 知识总索引入口
├── 010-Prolegomena-知识学导论/          # 什么是知识？认识论核心问题
├── 020-Knowledge-Organization-知识组织/ # KOS 分类法、叙词表、本体、知识图谱
├── 030-Library-Info-Science-图书情报学/ # 图书馆学、信息检索、信息服务
├── 040-Information-Science-信息科学/    # 信息论、信息架构、信息行为
├── 050-Classification-Metadata-分类法与元数据/ # DDC/UDC/CLC 分类法详解
├── 060-Knowledge-Management-知识管理/   # SECI、CoP、PKM
├── 070-Digital-Knowledge-数字知识系统/   # 语义网、RAG、LLM、知识工程
├── ram/                                        # 原始资料 (人类维护, AI 只读)
│   ├── Prolegomena-知识学导论/                   # 知识学导论原始笔记 (14 文件)
│   ├── Knowledge-Systems-知识系统/               # KOS 九章知识库 (14 文件)
│   ├── DDC-杜威十进分类法/                        # 杜威十进分类法详解 (13 文件)
│   ├── UDC-国际十进分类法/                        # 国际十进分类法详解 (13 文件)
│   ├── 05-图书情报学-LIS/                         # LIS 原始笔记 (16 文件)
│   ├── 07-Information/                          # DDC 000 原始笔记 (13 文件)
│   ├── 五维分类框架-5D-Framework/                 # 五维分类框架
│   └── legacy-信息科学-DDC000/                   # 归档: 已由 DDC 030/040 取代
├── wiki/                               # LLM 编译产物 (AI 独占)
│   ├── index.md                        # 知识索引
│   ├── log.md                          # 编译日志
│   ├── concepts/                       # 概念页面 (15)
│   ├── entities/                       # 实体页面 (23)
│   └── sources/                        # 来源溯源
└── outputs/                            # 基于 Wiki 的制品
```

## Wiki 编译状态

| 指标 | 数值 |
|------|------|
| 概念页 | 15 |
| 实体页 | 23 |
| 来源页 | 1 |
| 总页面 | 39 |
| 最后编译 | 2026-05-29 |
| 编译状态 | ✅ 活跃 |

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

### 系统 (10)

| # | 实体 | 类型 | 页面 |
|---|------|------|------|
| 1 | DDC | 系统 | [[wiki/entities/DDC\|DDC]] |
| 2 | UDC | 系统 | [[wiki/entities/UDC\|UDC]] |
| 3 | CLC | 系统 | [[wiki/entities/CLC-中国图书馆分类法\|CLC]] |
| 4 | LCC | 系统 | [[wiki/entities/LCC-国会图书馆分类法\|LCC]] |
| 5 | MeSH | 系统 | [[wiki/entities/MeSH\|MeSH]] |
| 6 | Gene Ontology | 系统 | [[wiki/entities/Gene-Ontology\|GO]] |
| 7 | Wikidata | 平台 | [[wiki/entities/Wikidata\|Wikidata]] |
| 8 | SPARQL | 标准 | [[wiki/entities/SPARQL\|SPARQL]] |
| 9 | Zettelkasten | 方法 | [[wiki/entities/Zettelkasten\|Zettelkasten]] |
| 10 | 五维分类框架 | 框架 | [[ram/五维分类框架-5D-Framework/README\|5D-Framework]] |

### 人物 (13)

| # | 人物 | 贡献 |
|---|------|------|
| 1 | Karl Popper | [[wiki/entities/Karl-Popper-波普尔\|可证伪性]] |
| 2 | Thomas Kuhn | [[wiki/entities/Thomas-Kuhn-库恩\|范式与科学革命]] |
| 3 | Imre Lakatos | [[wiki/entities/Imre-Lakatos-拉卡托斯\|研究纲领]] |
| 4 | Paul Feyerabend | [[wiki/entities/Paul-Feyerabend-费耶阿本德\|认识论无政府主义]] |
| 5 | Michael Polanyi | [[wiki/entities/Michael-Polanyi-波兰尼\|默会知识]] |
| 6 | Robert Merton | [[wiki/entities/Robert-Merton-默顿\|科学社会学]] |
| 7 | Bruno Latour | [[wiki/entities/Bruno-Latour-拉图尔\|行动者网络理论]] |
| 8 | David Bloor | [[wiki/entities/David-Bloor-布鲁尔\|强纲领]] |
| 9 | Paul Otlet | [[wiki/entities/Paul-Otlet-奥特勒\|UDC 创始人]] |
| 10 | Melvil Dewey | [[wiki/entities/Melvil-Dewey-杜威\|DDC 创始人]] |
| 11 | S.R. Ranganathan | [[wiki/entities/SR-Ranganathan-阮冈纳赞\|冒号分类法]] |
| 12 | Tim Berners-Lee | [[wiki/entities/Tim-Berners-Lee\|语义网]] |

### 学派 (2)

| # | 学派 | 页面 |
|---|------|------|
| 1 | 维也纳学派 | [[wiki/entities/Vienna-Circle-维也纳学派\|Vienna Circle]] |
| 2 | 法兰克福学派 | [[wiki/entities/Frankfurt-School-法兰克福学派\|Frankfurt School]] |

## 编译规则

1. **raw/ 只读**: AI 不修改原始资料
2. **Sources 必须**: 所有 wiki 页面必须标注来源
3. **链接优先**: 使用 `[[]]` 建立知识连接
4. **增量编译**: 优先更新现有页面，避免重复

## 跨库关联

| DDC | 链接 |
|-----|------|
| DDC 004 | [[3 Resources/004-Computer science and technology/README\|Computer Science]] |
| DDC 100 | [[3 Resources/100 Philosophy & Psychology/README\|Philosophy & Psychology]] |
| DDC 400 | [[3 Resources/400 Language/README\|Language — Knowledge Representation]] |

## 使用命令

- `/wiki-compile 000 knowledge` — 编译此知识库
- `/triage` — 将新资料分拣到 ram/