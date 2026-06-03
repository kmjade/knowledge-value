---
aliases:
  - Knowledge-Wiki Architecture
  - 知识维基架构
created: 2026-06-02
version: "1.0"
status: stable
type: design
parent: "[[PARA+LLM-Wiki 融合系统]]"
tags:
  - architecture
  - design
  - knowledge-management
  - wiki
  - ddc
---

# Knowledge-Wiki 架构设计 v1.0

> DDC 知识组织 × LLM-Wiki 编译引擎 — 从原始资料到常青知识的完整管道
> 本文件是 [[1 Projects/PARA+LLM-Wiki 融合系统/设计文档/PARA+LLM-Wiki 整合系统架构设计文档 v1.0]] 的专项深化

---

## 目录

1. [设计哲学](#1-设计哲学)
2. [Knowledge-Wiki 系统全景](#2-knowledge-wiki-系统全景)
3. [DDC 知识组织架构](#3-ddc-知识组织架构)
4. [Wiki 子库系统](#4-wiki-子库系统)
5. [跨库知识图谱](#5-跨库知识图谱)
6. [编译管道详解](#6-编译管道详解)
7. [知识质量框架](#7-知识质量框架)
8. [扩展性设计](#8-扩展性设计)
9. [知识运营体系](#9-知识运营体系)
10. [风险与防御](#10-风险与防御)
11. [附录](#11-附录)

---

## 1. 设计哲学

### 1.1 三条公理

#### 公理 A：知识天然有结构

```
DDC（杜威十进分类法）不是人为强加的分类，而是知识内在结构的反映。
每个概念属于一个分类位置，每个分类位置与其他位置有确定关系。
我们的任务不是发明结构，而是发现结构。
```

**推论**:
- 知识库组织应遵循学科分类的自然边界
- 跨学科概念需明确主从关系（主分类 + 引用）
- 分类深度与知识成熟度成正比

#### 公理 B：编译优于创作

```
AI 的核心职责不是「创作」知识，而是「编译」知识——
从原始资料中提取、结构化、链接已有信息。
创作属于人类，编译属于 AI。
```

**推论**:
- 每个 wiki 页面必须有可追溯的 raw/ 来源
- 禁止无来源的「捏造」式页面创建
- 编译质量 = 溯源完整度 + 链接密度

#### 公理 C：规模即复杂度

```
系统成功的标志不是「有知识」，而是「有更多知识而不崩溃」。
当子库从 3 个增长到 13 个、概念从 30 个增长到 3000 个时，
架构不能需要重写。
```

**推论**:
- 去中心化：每个子库自治，不依赖中心索引
- 增量处理：编译操作复杂度 O(n) 而非 O(n²)
- 局部故障：一个子库的问题不影响其他子库

### 1.2 设计原则

| 原则 | 含义 | 实现机制 |
|------|------|----------|
| **溯源第一** | 所有 wiki 内容可追溯到 raw/ | Sources 字段强制标注 |
| **去重合并** | 一个概念只在一个页面 | 跨库扫描 + Jaccard 相似度 |
| **增量优先** | 默认只处理新增/修改文件 | compiled frontmatter 跟踪 |
| **局部自治** | 子库独立运行 | 独立 CLAUDE.md + wiki/log.md |
| **链接驱动** | 知识靠链接组织而非层次 | [[wikilink]] + 关系标注 |
| **渐进编译** | 从核心到边缘逐步展开 | 编译优先级: papers > books > articles |

---

## 2. Knowledge-Wiki 系统全景

### 2.1 架构总览

```
┌──────────────────────────────────────────────────────────────────────────┐
│                           Knowledge-Wiki 系统                             │
│                                                                          │
│  ┌─────────────────────┐    ┌─────────────────────┐                     │
│  │   DDC 知识组织层     │    │   Wiki 编译层        │                     │
│  │                     │    │                     │                     │
│  │  000 ~ 999 分类架构 │◄──►│  raw/ → wiki/ 管道  │                     │
│  │  13 子库 · 7 活跃    │    │  概念/实体/来源提取  │                     │
│  │  META-INDEX 导航     │    │  跨库链接生成       │                     │
│  └──────────┬──────────┘    └──────────┬──────────┘                     │
│             │                          │                                │
│             └──────────┬───────────────┘                                │
│                        ▼                                                │
│  ┌──────────────────────────────────────────────────────────┐          │
│  │                  知识图谱 (Knowledge Graph)                │          │
│  │                                                          │          │
│  │  ┌──────────┐     ┌──────────┐     ┌──────────┐         │          │
│  │  │ Concepts │◄───►│ Entities │◄───►│ Sources  │         │          │
│  │  │  概念节点  │     │  实体节点  │     │  来源节点  │         │          │
│  │  │  N 个     │     │  M 个     │     │  K 个     │         │          │
│  │  └────┬─────┘     └────┬─────┘     └────┬─────┘         │          │
│  │       │                │                │                │          │
│  │       └────────────────┼────────────────┘                │          │
│  │                        ▼                                 │          │
│  │               ┌──────────────────┐                       │          │
│  │               │  Cross-Library   │                       │          │
│  │               │  跨库链接          │                       │          │
│  │               └──────────────────┘                       │          │
│  └──────────────────────────────────────────────────────────┘          │
└──────────────────────────────────────────────────────────────────────────┘
```

### 2.2 三层知识模型

```
┌─────────────────────────────────────────────┐
│               Layer 3: 常青知识               │
│  wiki/concepts/ · wiki/entities/             │
│  🌲 永久保留 · AI 独占写入 · 严格格式        │
├─────────────────────────────────────────────┤
│                   ↑ 编译                      │
│                   |                          │
├─────────────────────────────────────────────┤
│               Layer 2: 原始资料               │
│  raw/articles/ · raw/papers/ · raw/books/    │
│  📦 长期保留 · 人类维护 · AI 只读             │
├─────────────────────────────────────────────┤
│                   ↑ 分拣                      │
│                   |                          │
├─────────────────────────────────────────────┤
│               Layer 1: 输入捕获               │
│  0 Inbox/ · Web Clipper · 手动输入           │
│  📥 临时暂存 · 人类写入 · AI 路由             │
└─────────────────────────────────────────────┘
```

### 2.3 组件关系

```
┌──────────────────────────────────────────────────────────────────┐
│  CLAUDE.md (系统宪法)                                             │
│  ├── 通用规则: raw/只读 · wiki/AI独占 · Source必标注             │
│  └── 子库覆盖规则: 3 Resources/[topic]/CLAUDE.md                  │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐       │
│  │ /triage      │───►│ /wiki-compile │───►│ /lint        │       │
│  │ Inbox → PARA │    │ raw/ → wiki/  │    │ 质量验证      │       │
│  └──────────────┘    └──────────────┘    └──────────────┘       │
│         │                    │                    │              │
│         ▼                    ▼                    ▼              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐       │
│  │ triage-log   │    │ compile-log  │    │ lint-report  │       │
│  │ (AI-Log/)    │    │ (wiki/ + AI) │    │ (AI-Log/)    │       │
│  └──────────────┘    └──────────────┘    └──────────────┘       │
└──────────────────────────────────────────────────────────────────┘
```

---

## 3. DDC 知识组织架构

### 3.1 分类体系

本系统采用**杜威十进分类法 (DDC)** 作为知识组织的骨架。DDC 的十类体系提供了天然的学科边界，而 Wiki 子库在其内部填充具体内容。

```
DDC 大类          本系统子库               状态
────────────────────────────────────────────────
000 计算机·信息    Knowledge-Systems       🟢 活跃 (23 concepts · 26 entities)
060 知识管理       Knowledge-Management    🟢 活跃 (6 concepts · 1 entity)
100 哲学·心理学    Philosophy-Psychology   🟢 活跃
  ├─ 120 认识论     Epistemology           🟢 活跃 (38 concepts)
  ├─ 150 心理学     Psychology             🟡 框架
  └─ 180 古典哲学   易经知识库              🟢 活跃 (92 文件)
200 宗教·神学      Religion-Theology      🟡 框架
300 社会科学       Social-Sciences        🟡 框架
400 语言           Language               🔴 未创建
500 自然科学       Natural-Sciences       🟢 活跃
600 应用科学       Applied-Sciences       🟢 活跃
  ├─ 610 医学                              🔴 未创建
  ├─ 630 农业                              🟡 框架
  └─ 6xx 工程                               🔴 未创建
700 艺术·美术       Arts                   🔴 未创建
  └─ Generative Art                        🟢 活跃 (4 concepts · 1 entity)
800 文学           Literature             🟡 框架
900 历史·地理      History-Geography      🟢 活跃 (7 子库 · 14 concepts · 2 entities)
── 特殊子库        People CRM             🟡 框架 (27 entities)
```

### 3.2 分类规则

#### 规则 1: 一个概念一个位置

每个概念只能有一个主要 DDC 分类位置。跨学科概念选择**最核心的学科归属**：

```
Transfomer-Architecture
  ├── 主要位置: 000 Knowledge/ (信息科学)
  ├── 次要引用: 100 Philosophy/ (认识论 — 知识表示)
  └── 处理方式: 主要位置创建页面，其他位置用 [[wikilink]] 引用
```

#### 规则 2: 分类深度 = 知识成熟度

| DDC 层级 | 子库结构 | 适用条件 |
|----------|----------|----------|
| 百位 (000) | 独立子库 | 有 ≥ 5 个概念的活动领域 |
| 十位 (120) | 子目录 | 有 3-5 个概念的专项 |
| 个位 (121) | 概念页面 | 单个深度概念 |

#### 规则 3: 子库命名规范

```
DDC 三位码 + 空格 + 英文分类名
例: 100 Philosophy & Psychology/
例: 600 Applied Sciences/

非 DDC 特殊子库使用英文小写
例: people/
例: generative-art/
```

### 3.3 DDC 覆盖矩阵

本系统当前 DDC 覆盖状态:

```
DDC 000 ████████████░░░░░░  60%  活跃  13 文件
DDC 005 ██████████████░░░░  70%  活跃  6 概念 · 1 实体
DDC 100 ██████████████░░░░  70%  活跃  92+ 文件
DDC 200 ████░░░░░░░░░░░░░░  20%  框架
DDC 300 ████░░░░░░░░░░░░░░  20%  框架
DDC 400 ░░░░░░░░░░░░░░░░░░   0%  未创建
DDC 500 ████████░░░░░░░░░░  40%  活跃
DDC 600 ████████░░░░░░░░░░  40%  活跃
DDC 700 ████░░░░░░░░░░░░░░  20%  部分
DDC 800 ████░░░░░░░░░░░░░░  20%  框架
DDC 900 ██████████████░░░░  70%  活跃  7 子库
```

---

## 4. Wiki 子库系统

### 4.1 子库通用结构

```
3 Resources/[topic]/
├── CLAUDE.md          # 子库 Schema（覆盖根宪法）
├── raw/               # 原始资料（人类维护，AI 只读）
│   ├── articles/      #   文章摘录与网页剪藏
│   ├── papers/        #   论文笔记与学术文献
│   ├── books/         #   书籍笔记与书摘
│   └── conversations/ #   AI 对话记录（有价值部分）
├── wiki/              # 编译产物（AI 独占写入）
│   ├── index.md       #   知识索引（统计 + 分类目录）
│   ├── log.md         #   编译日志（追加式操作记录）
│   ├── concepts/      #   概念页面（知识的最小单元）
│   ├── entities/      #   实体页面（人物·组织·工具）
│   └── sources/       #   来源追溯（链接到 raw/）
└── outputs/           # 基于 Wiki 的生成制品
```

### 4.2 页面类型规范

#### 4.2.1 概念页面 (concepts/)

```yaml
---
aliases:
  - 中文别名
  - English-Alias
created: YYYY-MM-DD
type: concept
topic: [topic]
confidence: high | medium | low    # 置信度（基于来源质量）
status: draft | reviewed | evergreen
---
```

**强制章节**:
- `## 定义` — 一句话精确定义
- `## 核心原理` — 深入解释
- `## 相关概念` — `[[wikilink]]` + 关系标注
- `## 相关实体` — `[[wikilink]]` + 关系标注
- `## Sources` — 来源 raw/ 文件路径

**可选章节**:
- `## 关键要点` — 3-5 个要点
- `## 实践应用` — 具体案例
- `## 历史沿革` — 概念演变

#### 4.2.2 实体页面 (entities/)

```yaml
---
aliases: []
created: YYYY-MM-DD
type: entity
entity_type: person | company | tool | paper | product | organization
topic: [topic]
---
```

**强制章节**:
- `## 基本信息` — 类型/时间/状态
- `## 描述` — 详细描述
- `## 相关概念` — 体现/使用的概念
- `## 相关实体` — 协作/竞争/创建关系
- `## Sources`

#### 4.2.3 来源页面 (sources/)

```yaml
---
source_url: ""
source_author: ""
source_date: YYYY-MM-DD
created: YYYY-MM-DD
type: source
topic: [topic]
---
```

**强制章节**:
- `## 摘要` — 内容摘要
- `## 关键引用` — 重要原文
- `## 衍生概念` — 由此产生的概念
- `## 引用此来源的页面`

### 4.3 子库 CLAUDE.md 标准模板

```markdown
# Wiki 子库：[Topic Name]

## 子库定位
[一句话描述本子库覆盖的领域和范围]

## 排除范围
- 不属于本子库的内容类型

## 页面类型
本子库特有的页面类型（在通用类型之外）：
- `wiki-[type]`：[说明]

## 置信度规则
- `high`：来自[来源类型]
- `medium`：来自[来源类型]
- `low`：来自[来源类型]

## 实体分级
- Tier 1：[标准]
- Tier 2：[标准]
- Tier 3：[标准]

## 编译优先级
优先编译：[类型] > [类型]
低优先级：[类型]

## 特殊处理规则
- [适用于本子库的特殊规则]
```

### 4.4 子库生命周期

```
创建
  │
  ▼
🟢 活跃 — 有原始资料入库，定期编译
  │
  ├── 无新资料 > 90 天
  │
  ▼
🟡 休眠 — 知识完整，仅维护
  │
  ├── 确认无再激活必要
  │
  ▼
🔴 归档 — 移到 4 Archives/
```

---

## 5. 跨库知识图谱

### 5.1 知识图谱节点类型

```
知识图谱 = { Concepts } ∪ { Entities } ∪ { Sources }

节点类型    标识          示例                     出边
────────── ──────────── ─────────────────────── ──────────
Concept    wiki/concepts  Transformer-Architecture → Entity, Concept, Source
Entity     wiki/entities  OpenAI                  → Concept, Entity
Source     wiki/sources   source-arxiv-2024-001   → Concept, Entity
```

### 5.2 关系本体

见 [[03-Skills 完整设计#关系类型本体]] 的完整关系定义。这里是知识图谱视角的概览：

```
概念 → 概念 (C→C)
  is-a (子类型)      Transformer is-a Neural-Network
  part-of (组成)     Attention part-of Transformer
  related (关联)     RAG related LLM
  precedes (前置)    Tokenization precedes Embedding

概念 → 实体 (C→E)
  implements (实现)  Obsidian implements PKM
  uses (使用)        RAG uses Vector-Database
  exemplifies (例证) DDC exemplifies Classification

实体 → 实体 (E→E)
  created (创建)     Tim-Berners-Lee created WWW
  collaborates (协作) Kuhn collaborates Lakatos
  competes (竞争)     Notion competes Obsidian
  evolved-from (演化) DDC evolved-from Decimal-Classification
```

### 5.3 跨库链接策略

#### 策略 1: 主分类 + 引用

当概念跨越多个 DDC 分类时：

```
概念: Knowledge-Representation
主分类: 000 Knowledge/ (DDC 001 知识组织)
引用子库:
  → 100 Philosophy/ (认识论角度)
  → 600 Applied Sciences/ (AI 知识表示实现)

在 000/wiki/concepts/Knowledge-Representation.md 中:
  ## 关联子库
  - [[../100 Philosophy & Psychology/wiki/concepts/认识论|认识论]] — 哲学基础
  - [[../600 Applied Sciences/wiki/concepts/知识表示系统|知识表示系统]] — 技术实现
```

#### 策略 2: 跨库扫描去重

编译前扫描其他子库的 `wiki/concepts/`：

```
input: 新概念 "Knowledge-Graph"
扫描: DDC 000, 100, 300, 500, 600 的 wiki/concepts/
结果:
  - 000: 找到 "Knowledge-Graph" (已有页面)
  - 600: 找到 "Graph-Database" (相关但不同)
动作:
  - 不在当前子库创建新页面
  - 在当前子库添加 [[Knowledge-Graph]] 链接
```

#### 策略 3: META-INDEX 跨库导航

`3 Resources/_META-INDEX.md` 作为跨库入口：

```markdown
# 全局知识图谱索引

## 跨库概念（出现在 ≥2 个子库）
| 概念 | 主库 | 引用子库 |
|------|------|----------|
| [[Knowledge-Representation]] | 000 | 100, 600 |
| [[Classification-System]] | 000 | 100, 020 |
| [[Causality]] | 100 | 500, 300 |

## 跨库实体
| 实体 | 类型 | 出现子库 |
|------|------|----------|
| [[Aristotle]] | person | 100, 500, 300 |
| [[Darwin]] | person | 500, 100 |
```

### 5.4 知识图谱统计

当前系统图谱规模（截至 2026-06-02）：

```
子库总数:       13 (活跃 7 · 框架 5 · 未创建 4)
概念页面:       65+（epistemology 38 + Knowledge 23 + Generative Art 4）
实体页面:       27+（people 27 + Knowledge 26）
来源页面:       0（待编译）
跨库链接:       建设中

知识图谱密度 = 链接数 / 节点数
当前密度:       ~1.2 (目标: ≥ 3.0)
```

---

## 6. 编译管道详解

### 6.1 全管道流程

```
raw/ 源文件
    │
    ▼
┌───────────────────────────────────────────────────┐
│  Phase 1: 预检 (Preflight)                        │
│                                                   │
│  1. 读取子库 CLAUDE.md → 获取 Schema 和规则         │
│  2. 读取 wiki/index.md → 现有知识状态              │
│  3. 读取 wiki/log.md → 最近 10 条编译历史          │
│  4. 检查目录结构完整性 → 缺失则 mkdir -p           │
│  5. 扫描 raw/ 目录 → 文件列表 + 编译状态           │
└──────────────────────┬────────────────────────────┘
                       ▼
┌───────────────────────────────────────────────────┐
│  Phase 2: 扫描 (Scanner)                          │
│                                                   │
│   for each file in raw/:                          │
│     fm = parseFrontmatter(file)                   │
│     if incremental AND fm.compiled AND no change: │
│       skip                                        │
│     else:                                         │
│       queue for extraction                        │
│                                                   │
│   output: 待编译文件列表 + 跳过列表                 │
└──────────────────────┬────────────────────────────┘
                       ▼
┌───────────────────────────────────────────────────┐
│  Phase 3: 提取 (Extractor)                        │
│                                                   │
│   三层提取并行:                                    │
│                                                   │
│   ┌─────────────┐  ┌─────────────┐  ┌───────────┐ │
│   │  概念提取     │  │  实体提取     │  │  关系提取   │ │
│   │             │  │             │  │           │ │
│   │· 标题匹配    │  │· 命名实体识别 │  │· is-a     │ │
│   │· 术语密度    │  │· 属性分类     │  │· part-of  │ │
│   │· 关键词权重  │  │· 5种实体类型  │  │· uses     │ │
│   └──────┬──────┘  └──────┬──────┘  └─────┬─────┘ │
│          │                │                │       │
│          └────────────────┼────────────────┘       │
│                           ▼                        │
│                   结构化提取结果                      │
└──────────────────────┬────────────────────────────┘
                       ▼
┌───────────────────────────────────────────────────┐
│  Phase 4: 编译 (Compiler)                         │
│                                                   │
│   去重检查 → 跨库扫描                              │
│       │                                           │
│       ├── 完全匹配 → 合并到现有页面                  │
│       ├── 别名匹配 → 追加别名 + Sources              │
│       ├── 高相似度 → 合并 + 标注多来源               │
│       └── 新概念 → 创建新页面                       │
│                                                   │
│   创建/更新:                                       │
│     wiki/concepts/[slug].md                        │
│     wiki/entities/[slug].md                        │
│     wiki/sources/source-[slug].md                  │
│                                                   │
│   链接生成: 自动添加 [[]] + 关系标注                │
└──────────────────────┬────────────────────────────┘
                       ▼
┌───────────────────────────────────────────────────┐
│  Phase 5: 验证 (Validator)  [/lint 集成]          │
│                                                   │
│   □ 所有页面有 ## Sources                         │
│   □ 所有 Source 指向有效 raw/ 文件                  │
│   □ 每个页面 ≥ 2 个 [[wikilink]]                   │
│   □ Frontmatter 字段完整                          │
│   □ 无重复概念页面                                 │
│   □ 跨库链接格式正确                               │
└──────────────────────┬────────────────────────────┘
                       ▼
┌───────────────────────────────────────────────────┐
│  Phase 6: 索引与日志 (Indexer)                     │
│                                                   │
│   A. 更新 wiki/index.md:                          │
│      · 概念/实体/来源总数                          │
│      · 最近创建/更新列表                           │
│      · 分类目录索引                                │
│                                                   │
│   B. 更新 wiki/log.md (子库级)                     │
│                                                   │
│   C. 更新 AI-Log/compile-log.md (全局)            │
│      ⚠️ 双写强制 — 子库级 + 全局                    │
└───────────────────────────────────────────────────┘
```

### 6.2 增量编译判定逻辑

```
输入: 源文件 F，位于 3 Resources/[topic]/raw/[type]/
输出: 跳过 / 增量编译 / 强制重新编译

判定流程:

1. 读取 F 的 Frontmatter
2. 检查 compiled 字段:
   ├── 不存在或 false → 增量编译 (未编译)
   └── true → 继续检查

3. 对比 modified 与 compiled_at:
   ├── F.mtime > F.frontmatter.compiled_at → 强制重新编译 (源文件已修改)
   └── F.mtime ≤ F.frontmatter.compiled_at → 跳过 (已编译且未修改)

4. 检查 compiled_to 指向的 wiki 页面:
   ├── 所有页面存在 → 跳过
   └── 部分页面缺失 → 增量编译 (补全缺失页面)
```

### 6.3 编译优先级

| 优先级 | 源类型 | 原因 |
|:------:|--------|------|
| P0 | raw/papers/ | 学术论文信息密度最高 |
| P1 | raw/books/ | 系统性知识 |
| P2 | raw/articles/ | 碎片化但有用 |
| P3 | raw/conversations/ | 非结构化，需更多过滤 |

---

## 7. 知识质量框架

### 7.1 质量维度

```
知识质量 = 完整性 × 准确性 × 可追溯性 × 链接密度

维度          指标                  阈值          测量方式
─────── ──────────────────── ──────────────── ─────────────────
完整性    Frontmatter 字段完成   100% 必填字段    /lint 扫描
准确性    来源质量置信度          ≥ 80% high/med 前页 confidence 字段
可追溯性  每个页面 Sources 标注  100%            /lint 检查
链接密度   每页 [[wikilink]] 数    ≥ 2            /lint 统计
时效性    最近编译时间            ≤ 90 天         compile-log 检查
一致性    命名规范遵循            100%            frontmatter type 字段校验
```

### 7.2 置信度规则

#### 概念置信度 (frontmatter `confidence`)

| 置信度 | 含义 | 来源要求 | 展示 |
|:------:|------|----------|:----:|
| `high` | 事实性知识 | 同行评审论文或官方文档 | 🟢 |
| `medium` | 推论性知识 | 知名博客、技术报告 | 🟡 |
| `low` | 推测性知识 | 新闻报道、社交媒体、个人观点 | 🔴 |

#### 实体分级 (仅 people 子库)

| 层级 | 标准 | 示例 |
|:----:|------|------|
| Tier 1 | > 5 篇被引用论文进入本库 | Thomas-Kuhn, Karl-Popper |
| Tier 2 | > 2 次被不同来源提及 | Paul-Feyerabend, Imre-Lakatos |
| Tier 3 | 仅被提及 1 次 | (存根页面) |

### 7.3 质量检查清单 (/lint 集成)

```
/lint --wiki [topic]       # 检查指定子库
/lint --wiki --all         # 检查所有子库
/lint --wiki --fix         # 自动修复可修复问题

检查项:
[ ] 目录结构完整 — raw/ 和 wiki/ 子目录存在
[ ] Frontmatter 必填字段 — type, topic, aliases, created
[ ] Sources 指向有效 raw/ 文件 — 无断链
[ ] [[wikilink]] 无断链 — 链接目标存在
[ ] 概念无重复 — 同子库 + 跨库
[ ] 实体属性完整 — entity_type 字段
[ ] 最近 90 天内编译 — compile-log 检查
[ ] wiki/index.md 统计准确 — 与实际文件数一致
```

### 7.4 质量评分模型

```
总评分 = Σ(维度评分 × 权重) / 权重总和

维度            权重    满分     计算方式
────────────── ───── ─────── ───────────────────────
Frontmatter     25%   100    通过字段数 / 应填字段数
Sources         25%   100    有 Sources 的页面 / 总页面数
链接密度         20%   100    avg(wikilinks_per_page) / 目标值(3)
时效性           15%   100    1 - (超期天数 / 90)
命名规范         15%   100    遵循规范的页面 / 总页面数

评分等级:
  ≥ 90: 🟢 优秀
  ≥ 75: 🟡 良好
  ≥ 60: 🟠 需改进
  < 60: 🔴 不合格
```

---

## 8. 扩展性设计

### 8.1 子库扩展

#### 新子库创建流程

```
1. 确定 DDC 分类编码和名称
2. 创建目录结构:
   mkdir -p "3 Resources/[code] [name]/{raw/{articles,papers,books,conversations},wiki/{concepts,entities,sources},outputs}"
3. 创建 CLAUDE.md:
   - 子库定位与范围
   - 排除范围
   - 特别页面类型（如有）
   - 置信度规则
   - 编译优先级
4. 创建 wiki/index.md（前置信息模板）
5. 创建 wiki/log.md（frontmatter + 空日志）
6. 更新 3 Resources/_META-INDEX.md
7. 添加初始 raw/ 内容
8. 运行 /wiki-compile [topic]
9. 运行 /lint --wiki [topic] 验证
```

#### 目录创建脚本

```bash
create_sub_library() {
  local code="$1"      # e.g., "400"
  local name="$2"      # e.g., "Language"
  local path="3 Resources/${code} ${name}"
  mkdir -p "$path/raw/"{articles,papers,books,conversations}
  mkdir -p "$path/wiki/"{concepts,entities,sources}
  mkdir -p "$path/outputs"
  echo "✅ Created: $path"
}
```

### 8.2 文件数扩展

| 规模 | 文件数 | 策略 | 编译模式 |
|:----:|:------:|------|:--------:|
| 🟢 小型 | < 100 | 全量编译 | `--force` |
| 🟡 中型 | 100-1000 | 增量编译为主 | `--incremental` |
| 🟠 大型 | 1000-5000 | 分域增量 | `--incremental --scope [type]` |
| 🔴 超大型 | > 5000 | 按需编译 + 缓存 | 触发式编译 |

### 8.3 性能设计

#### 编译复杂度

```
单源文件编译: O(1)  — 每个文件独立处理
增量编译扫描: O(n)  — 线性扫描 raw/ 目录
跨库去重检查: O(k)  — k = 已有概念数 (缓存优化)
全量编译:     O(n)  — 逐文件处理

总复杂度:     O(n)  — 线性可扩展
```

#### 缓存策略

```
编译状态缓存: frontmatter compiled_at 字段
概念索引缓存: wiki/index.md 统计信息
跨库知识缓存: META-INDEX.md 简要知识图谱
```

### 8.4 故障模式

| 场景 | 影响 | 自动恢复 |
|------|------|----------|
| raw/ 文件被误删 | 对应 wiki 页面失去来源 | /lint 检测断链并告警 |
| wiki/ 页面被误改 | 知识一致性受损 | 下一次编译覆盖 |
| compile-log 丢失 | 失去操作审计 | 从 wiki/log.md 重建 |
| CLAUDE.md 缺失 | 使用默认规则编译 | 自动降级为通用规则 |
| META-INDEX 过时 | 跨库导航不准确 | 下一次跨库操作自动更新 |

---

## 9. 知识运营体系

### 9.1 日常运营节奏

```
每日 (Daily)
  ├── /context --quick → 检查 Inbox 和子库状态
  └── 有新增 raw/ → /wiki-compile [topic] --incremental

每周 (Weekly)
  ├── /wiki-compile --all → 全子库增量编译
  └── /lint --wiki --all → 全子库质量检查

每月 (Monthly)
  ├── 新子库创建评估
  ├── 休眠子库检查 (> 90 天无活动)
  └── META-INDEX 更新

每季 (Quarterly)
  ├── 全量质量评分报告
  ├── 跨库知识图谱审查
  └── 子库活跃度排序 + 优化建议
```

### 9.2 知识蒸馏流程

```
从原始资料到常青知识的四阶段蒸馏:

Raw Capture (原始捕获)
  │  0 Inbox/ → 分拣到 raw/
  │  信息密度: ★☆☆☆☆
  ▼
Structured Notes (结构化笔记)
  │  raw/articles/ · raw/papers/
  │  信息密度: ★★☆☆☆
  ▼
Wiki Concepts (Wiki 概念)
  │  wiki/concepts/ — 提取核心概念和定义
  │  信息密度: ★★★☆☆
  ▼
Cross-linked Knowledge (互联知识)
  │  [[]] + 关系标注 + 跨库引用
  │  信息密度: ★★★★☆
  ▼
Evergreen Principles (常青原理)
  │  status: evergreen — 经过时间检验的核心知识
  │  信息密度: ★★★★★
```

### 9.3 运营指标

| 指标 | 当前值 | 目标值 | 测量频率 |
|------|:------:|:------:|:--------:|
| 总子库数 | 13 | 13 | 月度 |
| 活跃子库数 | 7 | ≥ 10 | 月度 |
| 概念页面总数 | 65+ | ≥ 200 | 月度 |
| 实体页面总数 | 27+ | ≥ 100 | 月度 |
| 跨库链接数 | — | ≥ 50 | 月度 |
| 子库平均链接密度 | 1.2 | ≥ 3.0 | 周度 |
| 知识图谱覆盖率 | — | ≥ 60% DDC | 季度 |
| 编译成功率 | — | ≥ 95% | 每次编译 |

---

## 10. 风险与防御

### 10.1 风险矩阵

| 风险 | 概率 | 影响 | 防御措施 |
|:----|:----:|:----:|----------|
| 概念重复创建 | 中 | 中 | 跨库去重检查 + Jaccard 相似度 |
| 来源断链 | 中 | 高 | /lint 定期检测 |
| 跨库链接错误 | 中 | 中 | 编译时链接验证 |
| META-INDEX 过期 | 高 | 低 | 定期自动更新 |
| 子库膨胀失控 | 低 | 高 | 休眠检测 + 归档机制 |
| 知识置信度误标 | 中 | 中 | 置信度规则可配置化 |
| 命名格式不一致 | 高 | 低 | /lint --fix 自动修正 |

### 10.2 安全边界

```
禁止 AI 操作:
  ❌ 修改 raw/ 下的任何文件
  ❌ 删除 wiki/ 文件（需二次确认）
  ❌ 在无 Sources 情况下创建概念页面
  ❌ 跨子库移动 wiki/ 文件
  ❌ 修改其他子库的 CLAUDE.md

受限操作 (需确认):
  ⚠️ 全量重编译 --force
  ⚠️ 批量移动 > 10 个 raw/ 文件
  ⚠️ 修改 META-INDEX 结构
  ⚠️ 删除休眠子库
```

---

## 11. 附录

### A. 术语表

| 术语 | 英文 | 定义 |
|------|------|------|
| DDC | Dewey Decimal Classification | 杜威十进分类法，知识组织的分类骨架 |
| 子库 | Sub-library | 一个 DDC 分类下的 Wiki 知识库 |
| 知识编译 | Knowledge Compilation | AI 将 raw/ 原始资料转为 wiki/ 结构化知识的过程 |
| 概念 | Concept | 知识的最小单元，wiki/concepts/ 中的页面 |
| 实体 | Entity | 具体的人/物/组织，wiki/entities/ 中的页面 |
| 来源 | Source | raw/ 中的原始资料文件 |
| 知识图谱 | Knowledge Graph | 概念 + 实体 + 来源的链接网络 |
| 置信度 | Confidence | 知识准确性的可信度标记 |
| 增量编译 | Incremental Compile | 仅处理新增/修改文件的编译模式 |
| 全量重编译 | Force Compile | 重新处理所有 raw/ 文件的编译模式 |

### B. 文件命名规范

```
Wiki 概念页:     wiki/concepts/[Pascal-Case-Name].md
  例: wiki/concepts/Transformer-Architecture.md

Wiki 实体页:     wiki/entities/[Entity-Name].md
  例: wiki/entities/Thomas-Kuhn.md

Wiki 来源页:     wiki/sources/source-[short-slug].md
  例: wiki/sources/source-arxiv-2024-001.md

原始资料:        raw/[type]/[原始标题或说明].md
  例: raw/articles/LLM Pricing Model Comparison 2026.md
```

### C. Frontmatter 速查表

#### 概念页面

```yaml
aliases: [别名数组]
created: YYYY-MM-DD
type: concept
topic: [topic-name]
confidence: high|medium|low
status: draft|reviewed|evergreen
```

#### 实体页面

```yaml
aliases: [别名数组]
created: YYYY-MM-DD
type: entity
entity_type: person|company|tool|paper|product|organization
topic: [topic-name]
```

#### 来源页面

```yaml
source_url: "URL"
source_author: "作者"
source_date: YYYY-MM-DD
created: YYYY-MM-DD
type: source
topic: [topic-name]
```

#### 原始资料 (raw/)

```yaml
created: YYYY-MM-DD
source: "URL 或描述"
tags: [标签数组]
author: "作者"          # 可选
published: YYYY-MM-DD  # 可选
compiled: true|false   # 编译后添加
compiled_at: ISO8601    # 编译后添加
compiled_to: [路径数组] # 编译后添加
```

### D. DDC 子库速查表

| 编码 | 子库名称 | 路径 | 状态 |
|:----:|----------|------|:----:|
| 000 | Knowledge-Systems | `3 Resources/000 Knowledge/` | 🟢 |
| 100 | Philosophy-Psychology | `4 Archives/by-type/Resources/100 Philosophy & Psychology/` | 🟢 |
| 120 | Epistemology | `4 Archives/by-type/Resources/epistemology/` | 🟢 |
| 200 | Religion-Theology | `4 Archives/by-type/Resources/200 Religion & Theology/` | 🟡 |
| 300 | Social-Sciences | `3 Resources/300 Social Sciences/` | 🟡 |
| 500 | Natural-Sciences | `3 Resources/500 Natural Sciences/` | 🟢 |
| 600 | Applied-Sciences | `3 Resources/600 Applied Sciences/` | 🟢 |
| 700 | Generative Art | `4 Archives/by-type/Resources/concept/` | 🟢 |
| 800 | Literature | `4 Archives/by-type/Resources/800 Literature/` | 🟡 |
| 900 | History-Geography | `3 Resources/900 History & Geography/` | 🟢 |
| — | People CRM | `3 Resources/people/` | 🟡 |

### E. 参考链接

- [[PARA+LLM-Wiki 融合系统\|项目首页]]
- [[1 Projects/PARA+LLM-Wiki 融合系统/设计文档/PARA+LLM-Wiki 整合系统架构设计文档 v1.0\|系统架构 v1.0]]
- [[03-Skills 完整设计\|Skills 完整设计]]
- [[Skill-wiki-compile v2.0\|Wiki-Compile Skill v2.0]]
- [[05-Wiki 子库专属 CLAUDE.md\|Wiki 子库 Schema]]
- [[3 Resources/people/CLAUDE.md\|People 子库 Schema]]
- [[3 Resources/_META-INDEX.md\|全局知识图谱索引]]
- [[1 Projects/PARA+LLM-Wiki 融合系统/设计文档/diagram/knowledge-llm-wiki.svg\|Knowledge-Wiki 架构图]]

---

## 版本历史

| 版本 | 日期 | 变更 |
|:----:|:----:|------|
| v1.0 | 2026-06-02 | 初始发布 — DDC 知识组织 + Wiki 编译引擎完整架构 |

---

**文档维护者**: AI (Claude Code)
**下次审查**: 2026-07-02
**状态**: ✅ 稳定版本
