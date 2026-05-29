---
aliases:
  - 信息生命周期
  - Information Lifecycle
  - 信息老化模型
  - 时效性分类
created: 2026-05-28
type: concept
topic: knowledge-systems
status: reviewed
sources:
  - "[[3 Resources/000 Knowledge/ram/07-Information/01-Overview/01-Overview.md]]"
  - "[[3 Resources/productivity/raw/articles/LifeOS × LLM-Wiki 融合系统.md]]"
  - "[[3 Resources/productivity/raw/articles/PARA + LLM-WIKI 架构，实现个人知识与生活管理的自动化革命.md]]"
domain:
  - "[[Knowledge-Organization-Systems]]"
  - "[[Information-Lifecycle]]"
related:
  - "[[DIKW-Pyramid]]"
  - "[[KOS-Architecture-Design]]"
  - "[[Semantic-Pollution]]"
---

# Information Lifecycle (信息生命周期)

> [!abstract] 定义
> 信息生命周期是描述信息从**创建**到**使用**再到**保存/销毁**全过程的理论模型。它回答的核心问题是：信息在其存续期间经历哪些阶段？每个阶段需要什么操作？不同时效性的信息应该如何区别处理？

---

## 1. 两种视角

信息生命周期可以从两个层次理解：

| 视角 | 来源 | 关注点 | 粒 度 |
|------|------|--------|-------|
| **信息科学视角** | 图书馆学 / 信息科学 | 信息在社会系统中的宏观流动 | 阶段级（采集、组织、检索...） |
| **KOS 操作视角** | KOS 知识操作系统 | 信息在个人知识库中的微观处理 | 时效性级（ephemeral / reference...） |

两种视角互补：信息科学定义了信息自然演化的阶段，KOS 为这些阶段提供了自动化的执行机制。

---

## 2. 信息科学视角：经典八阶段模型

### 2.1 生命周期全景

![[diagram/information-lifecycle.svg]]

### 2.2 各阶段详解

| 阶段 | 英文 | 核心问题 | 信息科学关注点 | KOS 实现 |
|------|------|----------|---------------|----------|
| **创建** | Create | 信息如何产生？ | 学术写作、数据生产 | Web Clipper 捕获、语音录入 |
| **采集** | Collect | 信息如何进入系统？ | 采访、馆藏发展 | `0 Inbox/` 统一入口 |
| **组织** | Organize | 信息如何被整理？ | 分类、编目、知识组织 | `/triage` 分拣 + PARA 四层路由 |
| **存储** | Store | 信息如何持久化？ | 数据库、数字仓储 | `raw/` 原始资料（人类）+ `wiki/` 编译产物（AI） |
| **检索** | Retrieve | 信息如何被找到？ | 搜索引擎、信息检索 | `/query` 精确查询 + `[[wikilinks]]` 索引 |
| **传播** | Disseminate | 信息如何被分享？ | 出版、开放获取 | wiki/ 页面作为知识制品输出 |
| **使用** | Use | 信息如何被应用？ | 信息行为、信息素养 | 综合报告、决策支持、知识发现 |
| **保存/销毁** | Preserve/Dispose | 信息如何终结？ | 数字保存、档案学 | `4 Archives/` 归档 / 过期信息清理 |

### 2.3 反馈循环

> 信息生命周期的核心特征是**循环性**：使用产生反馈，反馈驱动新创建。

```
创建 → 采集 → 组织 → 存储 → 检索 → 传播 → 使用 → 保存/销毁
  ↑________________________________________________________↓
                        反馈与更新
```

Ranganathan 的第五定律深刻地捕捉了这一点：**「图书馆是一个生长的有机体」**。知识系统不是静态仓库，而是不断新陈代谢的活系统。

---

## 3. KOS 操作视角：四层时效性模型

### 3.1 核心理念

在 KOS 系统中，信息生命周期从**操作**角度重新定义：不是"信息经过了哪些阶段"，而是"这个信息需要保存多久？需要什么处理？"

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  ephemeral (临时)        1-7 天                          │
│  ├── 任务提醒、临时代码、一次性备忘                       │
│  ├── 存储: 1 Projects/[project]/tasks.md                 │
│  ├── 操作: 直接使用，不编译                                │
│  └── 归宿: 完成后自动删除 / 归档                          │
│                                                          │
│  operational (运行中)     1 周 - 3 月                     │
│  ├── 项目笔记、会议记录、周报                              │
│  ├── 存储: 1 Projects/[project]/notes/                   │
│  ├── 操作: 项目内复用                                     │
│  └── 归宿: 项目结束 → 4 Archives/                         │
│                                                          │
│  reference (参考)         3 月 - 数年                      │
│  ├── 文章摘录、论文笔记、书籍摘要、网页保存               │
│  ├── 存储: 3 Resources/[topic]/raw/                      │
│  ├── 操作: /wiki-compile 编译为结构化知识                  │
│  └── 归宿: 编译后保留 raw/ + 生成 wiki/ 页面               │
│                                                          │
│  evergreen (常青)         永久                             │
│  ├── 编译后的知识、概念页面、实体档案                      │
│  ├── 存储: 3 Resources/[topic]/wiki/                      │
│  ├── 操作: 持续更新，/query 查询，/lint 维护              │
│  └── 归宿: 永久保留，持续演化                              │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### 3.2 时效性判定矩阵

| 判定维度 | ephemeral | operational | reference | evergreen |
|----------|-----------|-------------|-----------|-----------|
| **时效性** | 数天 | 数周-数月 | 长期（年） | 永久 |
| **可复用性** | 不可复用 | 项目内复用 | 跨项目复用 | 通用知识 |
| **是否需编译** | 否 | 否 | **是** | 已经是 |
| **维护者** | 人类 | 人类主导 | AI 编译 | AI 独占 |
| **信息密度** | 低 | 中 | 中高 | 高 |
| **检索优先级** | 最低 | 低 | 中 | 最高 |
| **存储位置** | `tasks.md` | `Projects/` | `raw/` | `wiki/` |

### 3.3 生命周期自动机

在 KOS 中，信息在四个时效性层级之间流动，由系统操作驱动：

```
                    ┌──────────┐
                    │  Inbox   │  所有信息入口
                    └────┬─────┘
                         │
                    ┌────▼─────┐
                    │ /triage  │  时效性判定
                    └─┬──┬──┬──┘
                      │  │  │
          ┌───────────┘  │  └───────────┐
          ▼              ▼              ▼
    ┌──────────┐  ┌──────────┐  ┌──────────┐
    │ephemeral │  │operational│  │reference │
    └────┬─────┘  └────┬─────┘  └────┬─────┘
         │              │              │
         │ 到期自动      │ 项目结束     │ /wiki-compile
         ▼              ▼              ▼
    ┌──────────┐  ┌──────────┐  ┌──────────┐
    │  删除     │  │4 Archives│  │evergreen │
    └──────────┘  └──────────┘  └────┬─────┘
                                     │
                                /lint 维护 ←── 时间推移（熵增）
```

---

## 4. 两种模型的映射关系

### 4.1 映射表

| 经典 IS 阶段 | KOS 时效性 | KOS 操作 | KOS 存储 |
|-------------|-----------|----------|----------|
| 创建 | — | 捕获 (Web Clipper / 语音) | `0 Inbox/` |
| 采集 | ephemeral → operational | `/triage` 分拣 | `1 Projects/` |
| 组织 | operational → reference | `/triage` 路由 | `3 Resources/raw/` |
| 存储 | reference | — | `3 Resources/raw/` |
| 存储 (编译) | reference → evergreen | `/wiki-compile` | `3 Resources/wiki/` |
| 检索 | evergreen | `/query` | `3 Resources/wiki/` |
| 传播 | evergreen | wiki/ 输出 | `outputs/` |
| 使用 | evergreen | AI 综合报告 | — |
| 保存 | operational (结束) | 归档 | `4 Archives/` |

### 4.2 关键差异

| 维度 | 经典 IS 模型 | KOS 模型 |
|------|-------------|----------|
| **关注层次** | 宏观社会系统 | 微观个人知识库 |
| **驱动方式** | 人工操作（图书馆员） | AI 自动化（/triage, /wiki-compile） |
| **时间尺度** | 年-世纪（保存期） | 天-年（个人知识半衰期） |
| **粒度** | 阶段（粗粒度） | 时效性（细粒度） |
| **核心问题** | "这个信息在哪个阶段？" | "这个信息需要多深的处理？" |
| **反馈机制** | 使用→创建（学术产出循环） | `/lint` 反熵（质量维护循环） |
| **终止条件** | 销毁/永久保存 | 归档/删除（ephemeral） |

---

## 5. 与 DIKW 金字塔的关系

信息生命周期和 DIKW 金字塔是**正交**的两种分类维度：

| | DIKW 维度（纵向） | 生命周期维度（横向） |
|----|-------------------|---------------------|
| **问什么** | 信息的理解深度 | 信息的时间属性 |
| **怎么分** | Data → Information → Knowledge → Wisdom | ephemeral → operational → reference → evergreen |
| **怎么用** | 衡量信息质量 | 决定处理策略 |

两者的交叉矩阵：

| | ephemeral | operational | reference | evergreen |
|----|-----------|-------------|-----------|-----------|
| **Data** | 今日天气 | 项目 Bug 数 | 实验原始数据 | — |
| **Information** | 待办提醒 | 会议纪要 | 文章摘录 | 概念定义 |
| **Knowledge** | — | 项目复盘 | 方法论总结 | Wiki 页面 |
| **Wisdom** | — | 决策记录 | — | 设计原则 |

---

## 6. 信息老化与熵增

### 6.1 信息的半衰期

不同类型信息有天然不同的"半衰期"：

| 信息类型 | 半衰期 | 到期后 |
|----------|--------|--------|
| 新闻/资讯 | 1-7 天 | 归档/删除 |
| 技术文档 | 6 月-2 年 | 更新/标记过期 |
| 基础知识 | 5-10 年 | 持续可用 |
| 方法论/原则 | 10 年+ | 永久 evergreen |

### 6.2 熵增与反熵

```
高熵态（混乱）                          低熵态（有序）
────────────────────────────────────────────────────▶

raw/ 原始资料          /wiki-compile        wiki/ 编译产物
├── 混合格式           ───────────────▶      ├── 统一结构
├── 未标注关系                              ├── wikilinks 网络
├── 重复信息                                ├── 去重合并
└── 随时间递增混乱                          └── /lint 维持秩序

时间推移 → 熵增（新资料涌入、链接腐化）
/lint 操作 → 反熵（修复链接、更新过时内容、合并重复）
```

> 参见 [[3 Resources/productivity/wiki/concepts/KOS-Theory|KOS 第三定律：熵增定律]] — 知识系统必然趋向混乱，维护成本必须趋近于零。

---

## 7. 实践应用

### 7.1 KOS 中的操作闭环

```
捕获 (Capture)
    │
    ▼
分拣 (Triage) ──── 判定时效性
    │
    ├── ephemeral ──▶ tasks.md ──▶ 到期自动清理
    ├── operational ─▶ Projects/ ──▶ 完成归档
    └── reference ──▶ raw/ ──▶ /wiki-compile ──▶ wiki/
                                                     │
                                                     ▼
                                               /query 查询
                                                     │
                                                     ▼
                                               /lint 维护
                                                     │
                                                     ▼
                                               (循环)
```

### 7.2 设计原则

1. **信息有寿命** — 不是所有信息都值得永久存储
2. **时效决定策略** — 不同时效性使用不同的存储和处理方式
3. **编译是降熵** — 将高熵的 raw/ 编译为低熵的 wiki/
4. **维护要自动** — 任何需要手动维护的系统都会死亡
5. **入口要唯一** — 绕过 Inbox 的信息不经过生命周期管理，形成语义污染

### 7.3 反模式

| 反模式 | 后果 | 修复 |
|--------|------|------|
| 所有信息放入一个文件夹 | 语义污染 | 按时效性分层存储 |
| 从不清理 ephemeral | 信息腐烂 | 设置自动过期规则 |
| reference 永不被编译 | 知识沉没 | `/wiki-compile` 定期触发 |
| wiki 从不维护 | 链接腐化、内容过时 | `/lint` 每周检查 |

---

## 8. 相关概念

- [[DIKW-Pyramid]] — 信息质量的纵向维度
- [[Knowledge-Organization-Systems]] — 信息组织的基础理论
- [[Vault-Thesaurus-Plan]] — 叙词表增强生命周期中的组织与检索
- [[Classification-Systems]] — 分类法是组织阶段的核心工具
- [[3 Resources/productivity/wiki/concepts/KOS-Theory|KOS Theory]] — KOS 系统的理论基础
- [[3 Resources/productivity/wiki/concepts/Semantic-Pollution|Semantic Pollution]] — 违反生命周期原则的后果
- [[3 Resources/productivity/wiki/concepts/LLM-Wiki|LLM-Wiki]] — 编译阶段的方法论
- [[3 Resources/productivity/wiki/concepts/PARA-Method|PARA Method]] — 时效性分层的物理实现

## 9. 相关实体

- [[3 Resources/000 Knowledge/wiki/entities/DDC]] — 图书馆分类法中的生命周期管理
- [[KOS-Architecture-Design]]— 生命周期在系统架构中的位置

## Sources

- [[3 Resources/000 Knowledge/ram/07-Information/01-Overview/01-Overview.md]] — 经典信息生命周期模型
- [[3 Resources/productivity/raw/articles/LifeOS × LLM-Wiki 融合系统.md]] — KOS 时效性分类
- [[3 Resources/productivity/raw/articles/PARA + LLM-WIKI 架构，实现个人知识与生活管理的自动化革命.md]] — 生命周期在 PARA 中的应用
- [[3 Resources/productivity/raw/articles/知识工作者的 AI-Agentic LifeOS 落地手册.md]] — 生命周期自动化实践
