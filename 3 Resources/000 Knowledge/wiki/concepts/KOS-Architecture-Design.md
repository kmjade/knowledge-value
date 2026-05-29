---
aliases:
  - KOS 架构设计说明书
  - Knowledge Operating System 设计文档
created: 2026-05-28
type: concept
topic: productivity
status: draft
---

# KOS 知识系统架构设计说明书

> [!abstract] 文档定位
> 本文档是 KOS（Knowledge Operating System）知识操作系统的正式架构设计说明书，定义系统的整体架构、组件职责、数据流、核心定律和设计约束。

---

## 1. 系统概述

### 1.1 什么是 KOS

KOS（Knowledge Operating System，知识操作系统）是将 **PARA 生活管理**与 **LLM-Wiki 知识编译** 融合的元框架。它将个人知识系统建模为操作系统，由 **LifeOps（进程管理）** 和 **Knowledge（文件系统）** 两大核心组成，通过 **AI Agent** 作为内核驱动。

### 1.2 核心隐喻

| KOS 组件 | OS 类比 | 职责 | 实现 |
|----------|---------|------|------|
| **Inbox** | I/O 中断 | 捕获所有外部输入 | `0 Inbox/` |
| **PARA 四层** | 进程管理器 | 管理任务/项目生命周期 | `1-4 PARA 目录` |
| **Wiki 三层** | 文件系统 | 存储编译后的知识 | `wiki/concepts/entities/sources` |
| **AI Agent** | 内核 | 执行系统操作 | Skills (`/triage`, `/wiki-compile`, `/lint`) |
| **CLAUDE.md** | 系统配置 | 定义规则和约束 | 根目录 + 子库 CLAUDE.md |
| **AI-Log** | 系统日志 | 审计与回溯 | `AI-Log/` |

### 1.3 设计目标

- **零维护成本**：用户只需输入信息，其余由 AI 自动化完成
- **编译红利**：一次编译，多次查询，Token 节省 ~99%
- **语义隔离**：生活信息与专业知识物理分离，避免语义污染
- **完全溯源**：每个知识声明指向原始来源

---

## 2. 架构总览

```
┌──────────────────────────────────────────────────────────┐
│                    KOS 架构总览                           │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────┐    ┌──────────────┐    ┌────────────┐  │
│  │   输入/输出   │    │   进程管理    │    │  文件系统   │  │
│  │   (I/O)     │    │   LifeOps    │    │ Knowledge  │  │
│  │             │    │              │    │            │  │
│  │    Inbox    │───▶│  1 Projects  │    │  wiki/     │  │
│  │   Clippings │    │  2 Areas     │    │  concepts/ │  │
│  │   Capture   │    │  3 Resources │    │  entities/ │  │
│  │             │    │  4 Archives  │    │  sources/  │  │
│  └─────────────┘    └──────────────┘    └────────────┘  │
│                           │                    ▲         │
│                           │    /wiki-compile    │         │
│                           └────────────────────┘         │
│                                                          │
│  ┌──────────────────────────────────────────────────┐    │
│  │  内核 (Kernel): AI Agent / Claude Code + Skills  │    │
│  │  系统调用: /triage /wiki-compile /query /lint    │    │
│  └──────────────────────────────────────────────────┘    │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

> 架构全景图：

![[KOS-architecture.svg]]

### 2.1 三层架构

| 层级 | 角色 | 颜色 |
|------|------|------|
| **I/O 层** | 信息捕获入口，所有外部信息统一汇聚到 Inbox | Cyan |
| **双脑层** | LifeOps（左）+ Knowledge（右），分工协作 | Emerald + Violet |
| **内核层** | AI Agent 执行引擎，驱动四大系统操作 | Amber |

---

## 3. 组件详解

### 3.1 I/O 层

**职责：** 所有外部信息的统一捕获入口。

**入口类型：**

| 入口 | 工具 | 数据类型 |
|------|------|----------|
| 网页采集 | Web Clipper | 文章、论文、技术文档 |
| 语音备忘 | Telegram 语音 → Hermes | 灵感、待办、会议记录 |
| 消息指令 | Telegram / Discord | 任务指令、查询 |
| 文件导入 | 直接拖入 | 任意格式文件 |

**设计原则：** 单一入口原则 —— 所有信息必须通过 Inbox 进入系统，绕过 Inbox 的信息不会被 triage 处理，形成语义污染。

### 3.2 LifeOps Brain（进程管理）

**职责：** 管理有时效性的生活信息，对应 OS 的进程管理。

```
LifeOps Brain
├── 1 Projects/   # 活跃项目（进程 RUNNING）
│   ├── 有截止日期的任务
│   ├── 项目相关笔记
│   └── tasks.md（任务清单）
│
├── 2 Areas/      # 持续责任（进程 SUSPENDED）
│   ├── 周期性工作
│   ├── 健康/财务/学习
│   └── 无截止日期，需持续关注
│
├── 3 Resources/  # 知识资源（进程 IDLE）
│   ├── raw/ 原始资料
│   ├── wiki/ 编译产物
│   └── 按主题组织子库
│
└── 4 Archives/   # 归档（进程 EXITED）
    ├── 已完成项目
    ├── 过时信息
    └── 只读保留
```

**时效性分类：**

| 分类 | 保留期 | 存储 | 示例 |
|------|--------|------|------|
| **ephemeral** | 天 | `1 Projects/` | 临时代码片段 |
| **operational** | 周-月 | `1 Projects/` + `2 Areas/` | 项目文档 |
| **reference** | 年 | `3 Resources/raw/` | 参考文章 |
| **evergreen** | 永久 | `3 Resources/wiki/` | 结构化知识 |

### 3.3 Knowledge Brain（文件系统）

**职责：** 管理长半衰期的结构化知识，对应 OS 的文件系统。

```
Knowledge Brain
├── wiki/index.md       # 知识总索引（先读这里）
├── wiki/concepts/      # 概念页面
│   ├── [概念名].md
│   └── 含定义、原理、关联
├── wiki/entities/      # 实体页面
│   ├── [实体名].md
│   └── 含描述、属性、关联
└── wiki/sources/       # 来源溯源
    ├── [来源名].md
    └── 指向 raw/ 中的原始资料
```

**Wiki 页面标准：**

- 每个声明必须有来源
- 使用 `[[]]` 建立知识网络
- AI 独占写入，人类只读
- raw/ 是 Wiki 的唯一数据源

> 知识组织金字塔：

![[KOS-knowledge-pyramid.svg]]

### 3.4 Kernel（内核）

**职责：** 执行系统操作，对应 OS 内核。

```
Kernel
├── AI Agent        # 执行引擎（Claude Code）
│   ├── Skills      # 技能系统（领域能力）
│   ├── Memory      # 持久记忆（跨会话）
│   └── Gateway     # 多平台接入
│
└── 系统调用         # 四大 Syscall
    ├── /triage      # 分拣引擎
    ├── /wiki-compile # 知识编译
    ├── /query       # 知识查询
    └── /lint        # 健康检查
```

---

## 4. 数据流设计

### 4.1 信息生命周期

```
外部世界信息
    │
    ├── Web Clipper / 语音 / Telegram ──▶ Inbox
    │                                         │
    │                                    /triage 分拣
    │                                    ┌────┴────┐
    │                                    ▼         ▼
    │                              LifeOps     Knowledge
    │                              raw/        wiki/
    │                                 │           │
    │                        /wiki-compile ──────┘
    │                                 │
    │                                 ▼
    │                            wiki/（编译后的知识）
    │                                 │
    │                            /query ──▶ 查询结果
    │                                 │
    │                            /lint 反熵检查
    │                                 │
    └────────────────────────── 健康报告 ──▶ 自动修复
```

### 4.2 编译流程

```
raw/ 原始资料
    │
    ├── /ingest [文件]
    │   ├── 读取 raw/ 内容
    │   ├── 提取实体和概念
    │   ├── 创建/更新 wiki/ 页面
    │   ├── 建立 wikilinks 连接
    │   └── 更新 wiki/index.md
    │
    └── /wiki-compile
        ├── 扫描 raw/ 中未编译的资料
        ├── 批量编译为 wiki/ 页面
        ├── 更新交叉引用
        └── 生成编译日志
```

### 4.3 查询流程

```
用户提问
    │
    ▼
AI Agent
    │
    ├── 先读 wiki/index.md（索引）
    ├── 定位相关 wiki/ 页面（精确）
    ├── 验证来源（溯源到 raw/）
    └── 生成带源回答
```

**编译红利公式：**
- 无 Wiki：查询成本 ≈ 全库扫描（O(n)）
- 有 Wiki：查询成本 ≈ 索引查找 + 目标页面（O(1)）
- 编译投入：一次成本
- 查询节约：每次 ~99% Token
- 盈亏平衡：约 3-5 次查询后回本

---

## 5. 基本定律

### 5.1 第一定律：分离定律

> **不同类型的信息必须存储在不同的层级，不得混入同一检索空间。**

**推论：**
- 生活信息（任务、备忘）与专业知识（概念、实体）物理隔离
- Inbox 是唯一交叉点，经过 triage 后分流
- 违反此定律 → 语义污染（Semantic Pollution）

### 5.2 第二定律：编译定律

> **原始资料必须经过 AI 编译才能成为知识；查询时只读编译产物，不扫原始资料。**

**推论：**
- `raw/` 中的资料未经编译不可直接用于查询
- `wiki/` 中的每个声明必须溯源到 `raw/`
- 编译是单向的：raw → wiki（永不逆向）

### 5.3 第三定律：熵增定律

> **知识系统必然趋向混乱；维护成本必须趋近于零，否则系统必然死亡。**

**推论：**
- 手工维护不可持续 → AI 自动化维护
- 维护成本是知识系统死亡的唯一原因
- `/lint` 是反熵操作，必须定期执行
- 设计目标：**维护成本 = 0**

---

## 6. 系统操作

### 6.1 四大 Syscall

| 操作 | OS 类比 | 输入 | 输出 | 触发方式 |
|------|---------|------|------|----------|
| **Triage** | 中断路由 | Inbox 文件 | 路由到 PARA/Wiki | `/triage` |
| **Compile** | 文件写入 | raw/ 资料 | wiki/ 结构化页面 | `/wiki-compile` |
| **Query** | 文件读取 | 自然语言问题 | 带源的综合回答 | 直接提问 |
| **Lint** | 文件系统检查 | wiki/ 全库 | 健康报告 + 自动修复 | `/lint` |

### 6.2 操作闭环

```
捕获 → Triage → Compile → Query → (回写) → Lint → (循环)
```

### 6.3 推荐工作流

```
开始 → /context → /triage → /wiki-compile → /lint → 结束
```

---

## 7. 设计约束

### 7.1 硬性约束

| 约束 | 原因 |
|------|------|
| **单一 Vault** | 多库切换带来上下文切换成本，违反编译红利原则 |
| **AI 独占 wiki/** | 人类直接编辑 wiki/ 破坏溯源性 |
| **Inbox 唯一入口** | 绕过 Inbox 的信息未被 triage，导致语义污染 |
| **维护自动化** | 任何需要人类定期手动执行的操作都是系统缺陷 |

### 7.2 软性约束

| 约束 | 原因 |
|------|------|
| **Wikilinks 优先** | 使用 `[[]]` 建立知识连接，避免孤立页面 |
| **增量更新** | 优先更新现有页面，避免重复内容 |
| **Frontmatter 标准** | 统一元数据格式，支持 Dataview 查询 |
| **日志完备** | 所有操作记录到 AI-Log，支持审计回溯 |

---

## 8. 目录结构标准

```
knowledge-value/                    # Vault 根目录
├── CLAUDE.md                       # 系统总宪法
├── 0 Inbox/                        # I/O 缓冲区
├── 1 Projects/                     # 活跃项目
│   └── [project-name]/
│       ├── tasks.md
│       └── notes/
├── 2 Areas/                        # 持续领域
│   └── [area-name]/
├── 3 Resources/                    # 知识资源
│   ├── 0 Department/               # 学科分类（传统 KD）
│   ├── 000 Knowledge/              # 知识元系统
│   └── [topic]/                    # 主题子库
│       ├── CLAUDE.md               # 子库 schema
│       ├── raw/                    # 原始资料（人类独占）
│       │   ├── articles/
│       │   ├── papers/
│       │   ├── books/
│       │   └── conversations/
│       ├── wiki/                   # 编译产物（AI 独占）
│       │   ├── index.md
│       │   ├── log.md
│       │   ├── concepts/
│       │   ├── entities/
│       │   └── sources/
│       └── outputs/                # 基于 Wiki 的制品
├── 4 Archives/                     # 归档
├── AI-Log/                         # 操作日志
│   ├── triage-log.md
│   ├── compile-log.md
│   └── sessions/
└── .obsidian/                      # Obsidian 配置
```

---

## 9. 子库 Schema

### 9.1 活跃子库

| 子库 | 路径 | 状态 |
|------|------|------|
| AI/ML | `3 Resources/0 Department/Computer-Science/Artificial-Intelligence/02-机器学习/ai-ml/` | 🟢 活跃 |
| People | `3 Resources/people/` | 🟡 规划中 |
| Finance | `3 Resources/finance/` | 🟡 规划中 |
| Productivity | `3 Resources/productivity/` | 🟢 活跃 |
| Epistemology | `3 Resources/000 Knowledge/010-Prolegomena-知识学导论/` | 🟢 活跃 |

### 9.2 子库 CLAUDE.md 标准

每个子库必须包含 `CLAUDE.md`，定义：
- 目录结构
- 核心概念域
- 页面模板
- 编译规则
- 使用命令

---

## 10. 运维手册

### 10.1 每日仪式

```
早上（5 分钟）
├── 打开 Obsidian
├── 处理 Inbox：/triage
└── 确认当天重点

工作中（随时）
├── Web Clipper 采集 → raw/
├── 语音备忘 → Inbox
└── 知识查询 → wiki/

下班前（5 分钟）
├── 更新 SESSION_NOTES.md
└── 记录关键决策
```

### 10.2 每周维护

```
每周五（20 分钟）
├── /lint 健康检查
├── 处理未编译的 raw/ 资料
├── 查看 Graph View 找知识盲区
└── 生成知识积累报告
```

### 10.3 应急处理

| 问题 | 诊断 | 修复 |
|------|------|------|
| Inbox 积压 > 20 | `/lint` 检查 | `/triage` 批量分拣 |
| Wiki 孤立页面 | `/lint` 扫描 | 添加 wikilinks |
| Broken Links | Dataview 查询 | 手动修复或重定向 |
| 语义污染 | `/lint` 检测 | 移回正确层级 |

---

## 11. 演进路线

### 11.1 当前阶段（Phase 1）

- ✅ PARA 四层结构落地
- ✅ LLM-Wiki 方法论定义
- ✅ KOS 理论文档化
- ✅ 架构设计图

### 11.2 近期计划（Phase 2）

- 🔲 子库 CLAUDE.md 标准化
- 🔲 `/lint` 自动修复增强
- 🔲 编译日志可视化
- 🔲 知识图谱分析

### 11.3 远期愿景（Phase 3）

- 🔲 全自动知识编译管道
- 🔲 跨子库语义搜索
- 🔲 AI 驱动的知识发现
- 🔲 编译红利量化仪表盘

---

## 12. 参考文档

- [[KOS-Theory]] — KOS 理论基础
- [[3 Resources/productivity/wiki/concepts/LLM-Wiki]] — 知识编译方法论
- [[3 Resources/productivity/wiki/concepts/PARA-Method]] — 文件组织标准
- [[Information-Lifecycle]] — 信息时效性模型
- [[Semantic-Pollution]] — 语义污染诊断
- [[CLAUDE]] — 根目录系统配置

---

## Sources

- [[3 Resources/productivity/raw/articles/LifeOS × LLM-Wiki 融合系统.md]]
- [[3 Resources/productivity/raw/articles/PARA + LLM-WIKI 架构，实现个人知识与生活管理的自动化革命.md]]
- [[3 Resources/productivity/raw/articles/一个 Vault，两套逻辑：PARA × LLM-Wiki 融合架构的设计推演.md]]
- [[3 Resources/productivity/raw/articles/知识工作者的 AI-Agentic LifeOS 落地手册.md]]
