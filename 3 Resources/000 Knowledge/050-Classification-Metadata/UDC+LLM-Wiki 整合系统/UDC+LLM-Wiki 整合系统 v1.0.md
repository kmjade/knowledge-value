---
aliases:
  - UDC+LLM-Wiki Architecture
  - UDC-Wiki 整合
created: 2026-06-02
version: "1.0"
status: stable
type: design
parent: "[[PARA+LLM-Wiki 融合系统]]"
tags:
  - architecture
  - design
  - udc
  - classification
  - knowledge-organization
---

# UDC+LLM-Wiki 整合系统 架构设计 v1.0

> 国际十进分类法 (UDC) × LLM-Wiki 知识编译引擎
> 分面分类 · 跨体系映射 · 知识图谱增强

---

## 目录

1. [设计哲学](#1-设计哲学)
2. [系统总览](#2-系统总览)
3. [UDC 核心特性](#3-udc-核心特性)
4. [DDC → UDC 映射架构](#4-ddc--udc-映射架构)
5. [分面分类引擎](#5-分面分类引擎)
6. [UDC 标签体系集成](#6-udc-标签体系集成)
7. [跨分类系统映射矩阵](#7-跨分类系统映射矩阵)
8. [实体增强: Paul Otlet & UDC 历史](#8-实体增强-paul-otlet--udc-历史)
9. [Frontmatter 扩展规范](#9-frontmatter-扩展规范)
10. [编译规则增强](#10-编译规则增强)
11. [知识图谱增强](#11-知识图谱增强)
12. [运营与路线图](#12-运营与路线图)
13. [附录](#13-附录)

---

## 1. 设计哲学

### 1.1 核心洞见

```
DDC 是骨架，UDC 是关节。
骨架提供刚性结构（十类体系），关节提供灵活运动（分面组合）。
没有关节的骨架无法适应复杂知识体。
没有骨架的关节是一盘散沙。
```

### 1.2 三条公理

#### 公理 A：单一概念可分属多个分面

```
经典例子：「农业用钢缆」
  DDC: 只能放在 农业 (630) 或 冶金 (669) — 二选一
  UDC: 669.14:631 (钢缆:农业用途) — 精确表达复合主题
  
LLM-Wiki 翻译:
  一个概念可以有多个分面标签，但只有一个主 DDC 分类位置。
  分面标签通过 UDC 复合号表达，通过 [[wikilink]] 建立连接。
```

#### 公理 B：分类系统之间可翻译

```
DDC · UDC · CLC · LCC — 四大分类体系互为方言。
同一概念在不同体系中各有编码，如同一个词在不同语言中各有拼写。
知识图谱是多语言词典，wiki 页面是概念本身。
```

**推论**:
- 每个概念页面应有跨体系分类码映射
- 分类码映射通过 frontmatter 字段维护
- /wiki-compile 可自动生成跨体系映射

#### 公理 C：分面是概念的超链接

```
UDC 的复合号 (:) 本质上是概念之间的链接声明。
  UDC 669.14:631 等价于 wiki 中的:
    [[Steel-Cable]] `uses` [[Agriculture]]
  
  UDC 发明了链接，LLM-Wiki 将其显式化为可导航的超文本。
```

### 1.3 UDC 与 DDC 对偶性

| 维度 | DDC | UDC | 互补关系 |
|:----|:----|:----|:---------|
| 发明者 | Melvil Dewey (1876) | Paul Otlet (1905) | Otlet 基于 Dewey 扩展 |
| 分类哲学 | 层级树状 | 分面组合 | 骨架 vs 关节 |
| 核心符号 | 数字 (3位) | 数字 + 符号 | DDC 是 UDC 的子集 |
| 复合表达 | ❌ 不可复合 | ✅ `:` `+` `-` | UDC 表达能力更强 |
| 辅助表 | ❌ 有限 | ✅ 独立辅助表 | 时间/地点/语言/形式 |
| 维护 | OCLC (美国) | UDC Consortium (荷兰) | 两个独立体系 |
| 在 Vault 中的角色 | Wiki 子库组织 | 细粒度标签 + 分面 | 宏观 + 微观分类 |

---

## 2. 系统总览

### 2.1 UDC+LLM-Wiki 架构全景

```
┌────────────────────────────────────────────────────────────────────────────┐
│                     UDC+LLM-Wiki 整合系统                                    │
│                                                                             │
│  ┌─────────────────────────┐    ┌─────────────────────────┐                │
│  │    DDC 骨架层            │    │    UDC 关节层            │                │
│  │    (宏观分类)            │    │    (微观标引)            │                │
│  │                         │    │                         │                │
│  │  000 Knowledge-Systems ─┼────┼─ #udc/001               │                │
│  │  100 Philosophy        ─┼────┼─ #udc/1xx               │                │
│  │  500 Natural Sciences  ─┼────┼─ #udc/5xx               │                │
│  │  600 Applied Sciences  ─┼────┼─ #udc/6xx               │                │
│  │  900 History/Geo        ─┼────┼─ #udc/9xx               │                │
│  │  ...                     │    │  ...                    │                │
│  └──────────┬──────────────┘    └──────────┬──────────────┘                │
│             │                              │                               │
│             └──────────┬───────────────────┘                               │
│                        ▼                                                   │
│  ┌────────────────────────────────────────────────────────┐                │
│  │              分面复合引擎 (Facet Engine)                 │                │
│  │                                                        │                │
│  │  输入: concept + context → UDC 复合号                   │                │
│  │  例: "Transformer模型在NLP中的应用"                      │                │
│  │      → #udc/004.8:004.93 (AI:NLP)                      │                │
│  │      → DDC 主分类: 000 → wiki/000/wiki/concepts/       │                │
│  └──────────────────────┬─────────────────────────────────┘                │
│                         │                                                  │
│                         ▼                                                  │
│  ┌────────────────────────────────────────────────────────┐                │
│  │              跨体系分类码映射 (Cross Mapping)            │                │
│  │                                                        │                │
│  │  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐       │                │
│  │  │ DDC    │  │ UDC    │  │ CLC    │  │ LCC    │       │                │
│  │  │ 杜威   │  │ 国际   │  │ 中图   │  │ 国会   │       │                │
│  │  └────────┘  └────────┘  └────────┘  └────────┘       │                │
│  └──────────────────────┬─────────────────────────────────┘                │
│                         │                                                  │
│                         ▼                                                  │
│  ┌────────────────────────────────────────────────────────┐                │
│  │              wiki/concepts/[concept].md                  │                │
│  │                                                        │                │
│  │  frontmatter:                                          │                │
│  │    udc: "004.8:004.93"     # UDC 复合号                │                │
│  │    ddc: "000"              # DDC 主分类                 │                │
│  │    clc: "TP18"             # 中图分类号                 │                │
│  │    lcc: "QA76.9.N38"      # 国会分类号                 │                │
│  │    tags: ["#udc/tech/ai"]  # UDC 标签                   │                │
│  └────────────────────────────────────────────────────────┘                │
└────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 组件关系

```
┌─────────────────────────────────────────────────────────────────┐
│                     CLAUDE.md (系统宪法)                          │
│  ┌───────────────────────────────────────────────────────┐      │
│  │  DDC 规则: 子库组织 · 主分类位置                        │      │
│  │  UDC 规则: 分面标引 · 复合号语法 · 标签命名            │      │
│  │  Cross-Mapping: DDC↔UDC↔CLC↔LCC 映射表                │      │
│  └───────────────────────────────────────────────────────┘      │
├─────────────────────────────────────────────────────────────────┤
│  ┌────────────┐   ┌────────────┐   ┌────────────┐              │
│  │ /wiki-     │──►│ 分面引擎    │──►│ /lint 增强   │              │
│  │  compile   │   │ (Facet)    │   │ (分类码验证) │              │
│  │ (现有)     │   └────────────┘   └────────────┘              │
│  └─────┬──────┘                                                │
│        │                                                        │
│        ▼                                                        │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  wiki/concepts/[concept].md — frontmatter 含分类码      │    │
│  │  raw/[type]/[source].md — frontmatter 含 UDC 标签      │    │
│  └────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. UDC 核心特性

### 3.1 UDC 符号系统

UDC 区别于 DDC 的核心是它的**分面符号体系**：

| 符号 | 名称 | 含义 | 示例 | LLM-Wiki 等价 |
|:----:|:----|:-----|:-----|:-------------|
| `+` | 并列号 | 两个不相关主题 | `59+636` 动物学+畜牧业 | 两个独立概念页面 |
| `/` | 扩展号 | 连续范围 | `592/599` 动物学全部 | 分类层级索引 |
| `:` | 关联号 | 主题间关系 | `37:004` 教育中使用电脑 | `[[Education]] uses [[Computer]]` |
| `::` | 固定关联 | 永久顺序关系 | `51::62` 数学应用于工程 | 固定排序的交叉链接 |
| `[ ]` | 组合号 | 子分组 | `061.3(100):[37:004]` | 嵌套概念分组 |
| `*` | 星号 | 非 UDC 编号 | `629.4***4` | 外部编号引用 |
| `A/Z` | 字母扩展 | 专名细分 | `004.451Linux` | 实体名直接扩展 |
| `(0...)` | 形式复分 | 文献类型 | `(03)` 百科全书 | type: reference |
| `(1/9)` | 地理复分 | 地点 | `(510)` 中国 | raw/ 地理分类 |
| `(=...`) | 种族/语言 | 民族 | `(=512.1)` 突厥民族 | people/ 属性 |
| `"..."` | 时间复分 | 日期 | `"2026"` 2026年 | periodic/ 日期 |
| `-0...` | 通用特性 | 属性 | `-021` 人工制品 | concept 属性字段 |

### 3.2 UDC 与 DDC 结构对比

```
DDC:  63[0]          — 农业 (3位基础号)
      636            — 畜牧业 (3位)
      636.7          — 狗 (3位 + 小数扩展)
      → 纯层级，无复合

UDC:  63             — 农业 (2位，比 DDC 少一位)
      636            — 畜牧业 (3位)
      636.7          — 狗
      636.7:37       — 狗在教育中的使用 (复合)
      636.7(100)     — 全世界的狗 (地理复分)
      636.7"2026"    — 2026年的狗 (时间复分)
      636.7:37(100)"2026" — 2026年全世界狗在教育中的使用
      → 层级 + 分面组合，表达能力指数级增强
```

### 3.3 UDC 相对 DDC 的优势

| 能力     | DDC      | UDC          | 对 Wiki 的价值        |
| :----- | :------- | :----------- | :---------------- |
| 复合主题表达 | ❌ 被迫二选一  | ✅ `:` 关联     | 精确描述跨学科概念         |
| 地理维度   | ❌ 内置在号码中 | ✅ 独立 `(1/9)` | 可独立标注地理位置         |
| 时间维度   | ❌ 无标准化   | ✅ `"..."`    | 自动时间轴索引           |
| 多语言    | ❌ 无      | ✅ “=...”     | 多语言知识关联           |
| 形式区分   | ❌ 有限     | ✅ `(0...)`   | 区分论文/书/教程等        |
| 字母扩展   | ❌ 无      | ✅ A-Z        | OS 分类、产品名等        |
| 标签体系集成 | ❌        | ✅ 天然适合       | 现有 #udc/ 标签系统直接对接 |

---

## 4. DDC → UDC 映射架构

### 4.1 子库映射表

当前 13 个子库的 DDC→UDC 映射：

| DDC | 子库名称 | UDC 基础号 | 差异说明 |
|:---:|:---------|:----------:|---------|
| 000 | Knowledge-Systems | 001/004 | UDC 001 知识论，004 IT |
| 100 | Philosophy-Psychology | 1 | UDC 100 哲学，对应 DDC 100 |
| 120 | Epistemology | 165 | UDC 165 认识论（非 120）|
| 150 | Psychology | 159.9 | UDC 159.9 心理学 |
| 180 | 易经/古典哲学 | 133.4 | UDC 133.4 占卜体系 |
| 200 | Religion-Theology | 2 | UDC 200 宗教 |
| 300 | Social-Sciences | 3 | UDC 300 社会科学 |
| 400 | Language | 81 | UDC 81 语言学 |
| 500 | Natural-Sciences | 5 | UDC 500 自然科学 |
| 600 | Applied-Sciences | 62 | UDC 62 工程/技术 |
| 700 | Arts/Generative Art | 7 | UDC 700 艺术 |
| 800 | Literature | 82 | UDC 82 文学 |
| 900 | History-Geography | 9 | UDC 900 历史/地理 |
| 060 | People CRM | 659.2 | UDC 659.2 知识管理/信息工作 |

### 4.2 映射原则

```
1. 保底映射: 每个 DDC 号码有一个对应的 UDC 基础号
2. 精度差异: UDC 和 DDC 的分类深度不同，映射到最接近的编号
3. 复合表达: 跨学科内容使用 UDC `:` 关联号
4. 正向映射: DDC 为主分类 → UDC 为补充标引
5. 反向溯源: 从 UDC 标签可反查 DDC 子库位置
```

### 4.3 映射示例

```
概念: "人工智能在农业中的应用"

DDC 位置:
  006.3 — 人工智能 (主)
  630 — 农业 (次)
  → 矛盾: 只能放一个位置

UDC 标引:
  004.8:63 — AI:农业
  → 精确表达复合主题

Wiki 页面:
  frontmatter:
    ddc: "006.3"        # DDC 主分类
    udc: "004.8:63"     # UDC 复合号
    tags: ["#udc/tech/ai", "#udc/6xx"]
  
  正文:
    ## 相关概念
    - [[AI]] `uses` [[Agriculture]]
    
  → 放在 DDC 000 (AI) 子库，通过 UDC 标签关联到农业
```

---

## 5. 分面分类引擎

### 5.1 分面复合规则

将 LLM-Wiki 的概念链接转化为 UDC 复合号：

```
概念关系 → UDC 复合号
─────────────────────────────
A `is-a` B        →  B:A
A `part-of` B     →  B:A
A `uses` B        →  A:B
A `created` B     →  B:A (B由A创建)
A `related` B     →  A:B

地理附加:         →  A(1/9)
时间附加:         →  A"YYYY"
形式附加:         →  A(0...)

复合示例:
  [[RAG]] `uses` [[Vector-Database]]
    → UDC: 004.8:004.92 (RAG:向量数据库)
    
  [[Transformer]] `part-of` [[LLM]] (China, 2026)
    → UDC: 004.8:004.93(510)"2026"
```

### 5.2 自动分面生成

```
输入: concept.md frontmatter
  relations:
    - target: "Vector-Database"
      type: "uses"
    - target: "LLM"
      type: "part-of"

处理:
  1. 读取目标概念的 UDC 编码
  2. 根据关系类型选择复合符号
  3. 生成 UDC 复合号
  4. 写入当前概念的 udc 字段

输出:
  udc: "004.8:004.92"  (RAG:Vector-Database)
```

### 5.3 分面查询

```
查询: "中国在人工智能方面的应用"
  分解:
    AI → #udc/004.8
    中国 → (510)
    应用 → :62 或 :63
  
  UDC 复合: 004.8(510):62
  
  Wiki 搜索: 查找 udc 含 "004.8" AND "510" AND "62"
  
  ⟶ 返回所有符合的 wiki/concepts/ 页面
```

---

## 6. UDC 标签体系集成

### 6.1 现有标签体系

Vault 已有 `#udc/` 标签体系 (`_meta/⚙️ 系统配置/UDC 標籤體系.md`)：

```
#udc/0xx  — 总类
#udc/1xx  — 哲学
#udc/2xx  — 宗教
#udc/3xx  — 社会科学
#udc/4xx  — 语言学
#udc/5xx  — 自然科学
#udc/6xx  — 应用科学
#udc/7xx  — 艺术
#udc/8xx  — 文学
#udc/9xx  — 历史与地理

扩展标签:
#udc/tech/ — 技术领域 (ai, ml, web, backend, ...)
#udc/lang/ — 编程语言 (python, java, ...)
```

### 6.2 标签 → Wiki 子库映射

```
#udc/ 标签前缀         DDC 子库                     映射策略
─────────────────────────────────────────────────────────
#udc/0xx              Knowledge-Systems (000)      1:1 直映
#udc/1xx              Philosophy-Psychology (100)   1:1 直映
#udc/165              Epistemology (120)            n:n 多对多
#udc/159.9            Psychology (150)              1:1 直映
#udc/2xx              Religion-Theology (200)       1:1 直映
#udc/3xx              Social-Sciences (300)         1:1 直映
#udc/5xx              Natural-Sciences (500)        1:1 直映
#udc/6xx              Applied-Sciences (600)        1:1 直映
#udc/7xx              Arts (700)                    1:1 直映
#udc/8xx              Literature (800)              1:1 直映
#udc/9xx              History-Geography (900)       1:1 直映
#udc/tech/*           cross-cutting                 跨库标签
```

### 6.3 标签使用规范 (增强版)

#### raw/ 原始资料

```yaml
---
created: 2026-06-02
source: "https://example.com"
tags:
  - #udc/004.8        # UDC 分类号
  - #udc/tech/ai      # UDC 技术标签
udc: "004.8"          # UDC 编码 (正式字段)
ddc: "000/006"        # 对应 DDC 位置
---
```

#### wiki/ 概念页面

```yaml
---
aliases: [概念名, Concept-Name]
created: 2026-06-02
type: concept
topic: knowledge-systems
ddc: "006.3"              # DDC 主分类
udc: "004.8:63"           # UDC 复合号
clc: "TP18"                # 中图分类号 (可选)
lcc: "Q335"                # 国会分类号 (可选)
tags:
  - #udc/004.8            # UDC 细分类
  - #udc/tech/ai          # UDC 技术域
  - #udc/6xx              # 关联学科域
---
```

---

## 7. 跨分类系统映射矩阵

### 7.1 四体系并行映射

本系统支持四套分类体系的并行映射：

| 体系 | 全称 | 范围 | 本系统角色 |
|:----|:-----|:----|:----------|
| **DDC** | 杜威十进分类法 | 国际通用 | Wiki 子库组织结构 |
| **UDC** | 国际十进分类法 | 国际通用 + 分面 | 细粒度标签 + 分面复合 |
| **CLC** | 中国图书馆分类法 | 中国标准 | 中文内容补充映射 |
| **LCC** | 美国国会分类法 | 学术标准 | 英文内容补充映射 |

### 7.2 映射表示例

```
概念: 人工智能
────────────────────────────
DDC:  006.3        (人工智能)
UDC:  004.8        (人工智能)
CLC:  TP18         (人工智能)
LCC:  Q335         (人工智能)

概念: 机器学习
────────────────────────────
DDC:  006.31       (机器学习)
UDC:  004.85       (机器学习)
CLC:  TP181        (机器学习)
LCC:  Q325.5       (机器学习)
```

### 7.3 映射维护

```
映射数据存放:
  _meta/⚙️ 系统配置/
  ├── UDC 標籤體系.md       ← UDC 标签树
  ├── DDC-UDC 映射表.md     ← 双向映射 (待创建)
  ├── CLC 映射表.md          ← CLC 对照 (待创建)
  └── LCC 映射表.md          ← LCC 对照 (待创建)

自动映射:
  /wiki-compile 编译时:
    1. 识别概念 → 根据 DDC 位置推断 UDC 编码
    2. 查询映射表 → 生成 CLC 和 LCC 编码
    3. 写入 frontmatter 的 clc/lcc 字段
    4. 验证: /lint 检查映射完整性
```

### 7.4 操作系统分类码映射 (已有实践)

Vault 已有的 OS 分类码跨体系映射：

```
概念: Linux 操作系统
────────────────────────────
UDC:  004.451Linux      (字母扩展)
DDC:  005.432            (操作系统)
CLC:  TP316.85           (Linux)
LCC:  QA76.76.O63        (操作系统)

概念: Windows Server
────────────────────────────
UDC:  004.451.8Windows Server
DDC:  005.446            (Windows)
CLC:  TP316.86           (Windows Server)
LCC:  QA76.76.O63        (操作系统)
```

---

## 8. 实体增强: Paul Otlet & UDC 历史

### 8.1 当前状态

Paul Otlet 实体目前是 **Tier 3 存根**，需要丰富为 Knowledge-Wiki 的关键实体：

```
当前:
  Paul-Otlet-奥特勒.md — Tier 3, 仅 2 行内容

目标:
  Paul-Otlet-奥特勒.md — Tier 1, 知识图谱核心节点
```

### 8.2 丰富计划

#### 基础信息

```yaml
---
type: entity
entity_type: person
tier: 1
aliases: [Paul-Otlet, 保罗·奥特勒, Paul Marie Ghislain Otlet]
born: 1868-08-23
died: 1944-12-10
nationality: Belgian
topic: people
---
```

#### 关联子库

```
Paul Otlet 跨库连接:
  ├── DDC 000 (Knowledge-Systems) → 信息科学先驱
  ├── DDC 020 (Library Science)   → 文献学 (Documentation)
  ├── DDC 060 (知识管理)          → People CRM
  ├── DDC 100 (Philosophy)        → 知识理论
  ├── DDC 900 (History)           → 历史人物
  └── UDC 体系本身                 → UDC 创始人
```

#### 关系图谱

```
Paul-Otlet `created` UDC
Paul-Otlet `collaborates` Henri-La-Fontaine
Paul-Otlet `influenced` World-Wide-Web (预见超文本概念)
Paul-Otlet `influenced` Linked-Data
Paul-Otlet `founded` Mundaneum
Paul-Otlet `wrote` Traité-de-Documentation
Paul-Otlet `part-of` Documentation-Movement
```

### 8.3 关联 Wiki 概念

```
概念: [[UDC]]            — Paul-Otlet `created` UDC
概念: [[Documentation]]  — Paul-Otlet `founded` 文献学运动
概念: [[Information-Science]] — Otlet 被称为信息科学之父
概念: [[Hypertext]]      — Otlet 1895 年预见超文本概念
概念: [[Semantic-Web]]   — Otlet 的"关联文档"概念
概念: [[Knowledge-Organization]] — Otlet 是知识组织先驱
```

---

## 9. Frontmatter 扩展规范

### 9.1 Wiki 概念页面 (扩展)

```yaml
---
# 必填 (继承自 Knowledge-Wiki)
aliases: [中文名, English]
created: YYYY-MM-DD
type: concept
topic: [topic-name]

# DDC 分类 (必填)
ddc: "006.3"                    # DDC 主分类号
ddc-path: "000/006/006.3"       # DDC 层级路径 (可选)

# UDC 分类 (推荐)
udc: "004.8:63"                 # UDC 复合号
udc-aux: ["(510)", "\"2026\""] # UDC 辅助表 (地理/时间/形式)

# 其他分类体系 (可选)
clc: "TP18"                     # 中国图书馆分类法
lcc: "Q335"                     # 美国国会分类法

# 标签
tags:
  - #udc/004.8                 # UDC 细分类标签
  - #ddc/006.3                 # DDC 分类标签

# 置信度与状态
confidence: high | medium | low
status: draft | reviewed | evergreen
sources: [raw/...路径]
---
```

### 9.2 原始资料页面 (扩展)

```yaml
---
created: YYYY-MM-DD
source: "https://example.com"
type: note | clippings | paper

# DDC 路由目标
ddc: "006.3"                    # 分拣目标 DDC 号

# UDC 标引
udc: "004.8"                    # UDC 分类号
tags:
  - #udc/004.8                 # UDC 标签

# 地理/时间 (可选)
location: "(510)"               # 地理 UDC 复分
period: "\"2026\""              # 时间 UDC 复分

# 编译状态
compiled: true | false
compiled_at: ISO8601
compiled_to: [wiki/...路径]
---
```

### 9.3 命名规范扩展

```
frontmatter 字段命名:
  ddc:         DDC 主分类号 (String)
  ddc-path:    DDC 层级路径 (String, 用 / 分隔)
  udc:         UDC 复合号 (String)
  udc-aux:     UDC 辅助表数组 (Array)
  clc:         中图分类号 (String)
  lcc:         国会分类号 (String)

标签命名:
  #udc/[number]        UDC 数字标签
  #udc/tech/[name]     UDC 技术域标签
  #udc/lang/[name]     UDC 语言标签
  #ddc/[number]        DDC 分类标签

在 Obsidian 中:
  标签可以直接搜索，适合快速筛选
  正式 frontmatter 字段适合精确查询和 /lint 校验
```

---

## 10. 编译规则增强

### 10.1 /wiki-compile UDC 扩展

在现有编译流程中增加 UDC 处理阶段：

```
Phase 2.5: UDC 标引 (新增)
  输入: 已提取的概念 + 实体 + 关系
  输出: UDC 复合号 + 标签

  流程:
  1. 查找 DDC → UDC 映射表
  2. 根据概念关系生成 UDC 复合号
  3. 从 CLAUDE.md 读取子库默认 UDC 范围
  4. 生成 #udc/ 标签
  5. 写入 concept.md frontmatter
```

### 10.2 /lint UDC 验证 (新增)

```
/lint --udc    检查 UDC 字段完整性
/lint --mapping 检查跨体系映射一致性

检查项:
  [ ] 每个 wiki 概念有 udc 字段 (推荐)
  [ ] UDC 编码格式合法 (分面符号使用正确)
  [ ] DDC-UDC 映射一致 (不矛盾)
  [ ] #udc/ 标签指向有效的 UDC 码
  [ ] udc-aux 辅助表格式正确
  [ ] 有 clc/lcc 字段时格式有效
```

### 10.3 /triage UDC 增强

```
/triage 分拣时:
  1. 分析 Inbox 内容 → 主题识别
  2. 通过关键词匹配 → DDC 路由目标 (已有)
  3. 同时生成:
     - udc 标签 (基于内容的关键词 → UDC 映射)
     - #udc/ 标签 (用于 Obsidian 搜索)
  4. 写入 raw/ 文件的 frontmatter

  分拣输出增强:
    Routing: 3 Resources/ai-ml/raw/articles/
    DDC:     006.3 (人工智能)
    UDC:     004.8 (AI)
    Tags:    #udc/004.8, #udc/tech/ai
```

---

## 11. 知识图谱增强

### 11.1 新增节点类型

```
现有节点:  Concepts · Entities · Sources
新增节点:  UDC-Codes · DDC-Codes · Classification-Systems
───────────────────────────────────────────────

UDC-Code 节点:
  节点: udc/004.8
  标签: #udc/004.8
  关联: 指向所有使用此 UDC 的概念页面
  关系: udc/004.8 `sister-code` udc/004.85 (兄弟码)

DDC-Code 节点:
  节点: ddc/006.3
  标签: #ddc/006.3
  关联: 指向 DDC 006 子库
  关系: 反映 DDC 层级
```

### 11.2 知识图谱密度提升

```
添加 UDC 后，每个概念页面新增关系:

原关系 (示例):
  [[Transformer]] `part-of` [[LLM]]           (1 条)
  [[Transformer]] `sources` raw/paper-01.md   (1 条)
  → 总共: 2 条边

新增关系 (同页面):
  [[Transformer]] `udc` #udc/004.8            (1 条)
  [[Transformer]] `udc-facet` #udc/004.93     (NLP 分面)
  [[Transformer]] `ddc` #ddc/006.3            (1 条)
  #udc/004.8 `sister-code` #udc/004.85        (1 条)
  → 额外: 4+ 条边

总效应:
  图谱密度从 ~1.2 提升至 3.0+ (每节点链接数)
```

### 11.3 META-INDEX UDC 增强

在 `_META-INDEX.md` 中增加 UDC 视图：

```markdown
## UDC 分类索引

### 0xx 总类
| #udc/004 | 计算机科学 | 概念 (N) | 实体 (M) |
| #udc/004.8 | AI/ML | 概念 (N) | 实体 (M) |

### 6xx 应用科学  
| #udc/62 | 工程 | 概念 (N) | 实体 (M) |
| #udc/63 | 农业 | 概念 (N) | 实体 (M) |

## 跨体系映射查询
从 DDC 006.3 出发:
  → UDC: 004.8
  → CLC: TP18
  → LCC: Q335
  → 关联 wiki: [[AI]], [[Machine-Learning]], [[Deep-Learning]]
```

---

## 12. 运营与路线图

### 12.1 实施阶段

```
Phase 1 (基础映射) — 2 周
  [ ] 建立 DDC→UDC 完整映射表
  [ ] 在所有 wiki 概念页添加 udc frontmatter
  [ ] 更新 /wiki-compile 生成 UDC 编码
  [ ] 运行 /lint --udc 初次验证

Phase 2 (标签集成) — 1 周
  [ ] 将 #udc/ 标签系统与 wiki 子库同步
  [ ] 更新 raw/ 资料的 UDC 标签
  [ ] 补充 #ddc/ 标签作为 DDC 补充
  [ ] 建立 #udc/ → wiki/ 双向导航

Phase 3 (实体丰富) — 1 周
  [ ] 将 Paul Otlet 从 Tier 3 升级到 Tier 1
  [ ] 创建 Henri La Fontaine 实体
  [ ] 创建 UDC 概念页面
  [ ] 建立 UDC 知识图谱关系网

Phase 4 (跨体系映射) — 2 周
  [ ] 建立 CLC 映射表
  [ ] 建立 LCC 映射表
  [ ] 更新 /wiki-compile 跨体系自动映射
  [ ] 创建 _meta/⚙️ 系统配置/分类映射表归档
```

### 12.2 运营指标

| 指标 | 当前 | Phase 1 | Phase 4 (目标) |
|:----|:----:|:-------:|:--------------:|
| 概念页 UDC 覆盖率 | 0% | 80% | 100% |
| raw/ 资料 UDC 标签率 | ~10% | 50% | 80% |
| Paul Otlet 实体等级 | Tier 3 | — | Tier 1 |
| UDC 标签数 | ~50 (现有) | 200 | 500+ |
| 跨体系映射覆盖率 | — | DDC↔UDC | 四体系全 |
| 图谱密度 | 1.2 | 2.0 | 3.5+ |

### 12.3 日常运营

```
每周:
  /lint --udc → 检查 UDC 字段完整性
  /lint --mapping → 检查跨体系映射

每次编译:
  /wiki-compile [topic] 自动生成 UDC 复合号

每月:
  更新 _meta/UDC-标签体系.md (新增标签)
  更新 DDC-UDC 映射表 (修正偏差)

每季:
  跨体系映射审计
  分类码使用统计
```

---

## 13. 附录

### A. 术语表

| 术语 | 英文 | 定义 |
|:----|:-----|:------|
| UDC | Universal Decimal Classification | 国际十进分类法，Paul Otlet 基于 DDC 扩展的分面分类体系 |
| DDC | Dewey Decimal Classification | 杜威十进分类法，Melvil Dewey 1876 年创立 |
| CLC | Chinese Library Classification | 中国图书馆分类法 |
| LCC | Library of Congress Classification | 美国国会图书馆分类法 |
| 分面分类 | Faceted Classification | 使用多个独立维度的分类方法 |
| 复合号 | Compound Number | UDC 中使用 `+` `:` `/` 等符号组合多个分类号 |
| 辅助表 | Auxiliary Table | UDC 中独立的时间、地点、语言等复分维度 |
| 字母扩展 | Alphabetical Extension | UDC 中用 A-Z 字母细分的方式 (如 004.451Linux) |
| 映射 | Mapping | 不同分类体系之间的号码对应关系 |
| Knowledge Graph | 知识图谱 | 概念、实体、分类码之间的链接网络 |

### B. UDC 常用符号速查

```
符号   UDC 原文    含义        示例
───── ───────── ─────────── ─────────────────
+     addition  并列        59+636 动物学+畜牧业
/     extension 扩展范围     592/599 动物学全部
:     relation  关联        37:004 教育:电脑
::    fixed     固定关联     51::62 数学→工程
[]    grouping  分组        [37:004]:63 教育技术:农业
*     asterisk  外来编号    629.4***4 外部编号
A/Z   alpha     字母扩展     004.451Linux
(0)   form      形式        (03) 百科全书
(1/9) place     地点        (510) 中国
(=...) race     民族        (=512.1) 突厥
"..." time      时间        "2026" 2026年
-0... general   通用特性     -021 人工制品
```

### C. DDC→UDC 快速映射表

```
DDC 分类         UDC 编码        说明
────────────────────────────────────
000 总论         001/002/004    知识论/文献学/IT
100 哲学         1/159.9        哲学/心理学
200 宗教         2              宗教
300 社会科学     3              社会科学
400 语言         81             语言学
500 自然科学     5              自然科学
510 数学         51             数学
520 天文学       52             天文学
530 物理学       53             物理学
540 化学         54             化学
550 地球科学     55             地球科学
570 生物学       57/59          生物学/动物学
600 技术         62             工程/技术
610 医学         61             医学
620 工程         62             工程
630 农业         63             农业
640 家政         64             家政
650 管理         65             管理
660 化工         66             化工
670 制造         67             制造
680 手工         68             手工/轻工
690 建筑         69             建筑
700 艺术         7              艺术
800 文学         82             文学
900 历史/地理    9              历史/地理
910 地理         913            地理
920 传记         929            传记
930 古代史       931/939        古代史
940 欧洲史       94             欧洲史
950 亚洲史       95             亚洲史
```

### D. 扩展 Frontmatter 模板

#### 概念页面 (完整版)

```yaml
---
aliases: [别名1, 别名2]
created: 2026-06-02
type: concept
topic: [topic]

# 分类标识
ddc: "006.3"
udc: "004.8"
clc: "TP18"
lcc: "Q335"

# UDC 复合与辅助
udc-facets: ["004.8:63", "004.8(510)"]
udc-aux:
  geo: "(510)"
  time: '"2026"'

# 标签
tags:
  - #udc/004.8
  - #ddc/006.3

# 质量
confidence: high
status: reviewed
sources:
  - raw/articles/source-1.md
  - raw/papers/paper-2.md
---
```

#### 原始资料 (完整版)

```yaml
---
created: 2026-06-02
source: "https://example.com/paper"
title: "论文标题"
author: "作者名"
published: 2026-05-01

# 分类
ddc: "006.3"
udc: "004.8"
tags:
  - #udc/004.8
  - #udc/tech/ai

# 地理/语言
language: "=112.2"     # 德语
location: "(510)"       # 中国

# 编译
compiled: false
---
```

### E. 参考链接

- [[PARA+LLM-Wiki 融合系统\|项目首页]]
- [[Knowledge-Wiki 架构设计\|Knowledge-Wiki 架构 v1.0]]
- [[1 Projects/PARA+LLM-Wiki 融合系统/设计文档/PARA+LLM-Wiki 整合系统架构设计文档 v1.0\|系统架构 v1.0]]
- [[Skill-wiki-compile v2.0\|Wiki-Compile Skill v2.0]]
- [[_meta/⚙️ 系统配置/UDC 標籤體系.md\|UDC 标签体系]]
- [[3 Resources/people/wiki/entities/Paul-Otlet-奥特勒.md\|Paul Otlet 实体]]
- [[3 Resources/people/CLAUDE.md\|People 子库 Schema]]
- [[1 Projects/PARA+LLM-Wiki 融合系统/设计文档/diagram/knowledge-llm-wiki.svg\|Knowledge-Wiki 架构图]]

---

## 版本历史

| 版本 | 日期 | 变更 |
|:----:|:----:|------|
| v1.0 | 2026-06-02 | 初始发布 — UDC 分面分类 × LLM-Wiki 整合架构 |

---

**文档维护者**: AI (Claude Code)
**下次审查**: 2026-07-02
**状态**: ✅ 稳定版本
