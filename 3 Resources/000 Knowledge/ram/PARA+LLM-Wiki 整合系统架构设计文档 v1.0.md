---
aliases:
  - 系统架构
  - Architecture Design
created: 2026-05-27
version: "1.0"
status: stable
---

# PARA+LLM-Wiki 整合系统架构设计文档

**版本**: v1.0
**日期**: 2026-05-27
**状态**: ✅ 已实施

---

## 目录

1. [设计哲学与核心公理](#1-设计哲学与核心公理)
2. [系统总览](#2-系统总览)
3. [三层架构详解](#3-三层架构详解)
4. [目录结构规范](#4-目录结构规范)
5. [组件设计](#5-组件设计)
6. [数据流详解](#6-数据流详解)
7. [信息生命周期模型](#7-信息生命周期模型)
8. [Wiki 子库规范](#8-wiki-子库规范)
9. [Skills 接口规范](#9-skills-接口规范)
10. [Frontmatter 标准](#10-frontmatter-标准)
11. [安全与约束](#11-安全与约束)
12. [运维手册](#12-运维手册)
13. [附录](#13-附录)

---

## 1. 设计哲学与核心公理

### 1.1 三条公理

#### 公理一：单一 Vault，永不分裂

```
当所有内容进入同一个 Obsidian Vault，工具碎片化问题消失。
一个 Vault，全部 Markdown，全部对 Claude Code 可访问。
多 Vault 切换的摩擦是伪问题，真正的解是在单一 Vault 内建立明确的隔离边界。
```

**推论**:
- 所有知识存放在同一个 Vault
- 不同类型的内容通过目录边界隔离
- 权限控制通过 AI 规则实现，而非物理分割

#### 公理二：AI 是编译器，不是对话伙伴

```
从"检索"到"编译"的范式转变。
对生活信息，AI 是路由器（/triage）。
对专业知识，AI 是编译器（/wiki-compile）。
人类是信息的生产者和最终消费者，中间的整理工作由 AI 承担。
```

**推论**:
- AI 的职责是结构化知识，而非闲聊
- Wiki 页面是 AI 的编译产物
- 人类维护 raw/，AI 维护 wiki/

#### 公理三：信息有生命周期

```
知识管理系统失败的根源不是工具——是维护成本。
收集（容易）→ 组织（困难）→ 维护（规模化后几乎不可能）。
本系统的核心设计目标：把维护成本降到零。
```

**推论**:
- 不是所有信息都值得永久存储
- 信息需要自动过期和归档
- AI 负责维护，人类负责生产和消费

### 1.2 设计原则

| 原则 | 描述 |
|------|------|
| **关注点分离** | raw/ 和 wiki/ 严格分离，人类和 AI 各司其职 |
| **最小权限** | AI 只能在授权范围内操作 |
| **溯源优先** | 所有 AI 输出必须标注原始来源 |
| **渐进增强** | 系统功能渐进式释放，从核心到边缘 |
| **故障安全** | 即使 AI 不可用，人类仍可直接操作 Markdown |

---

## 2. 系统总览

### 2.1 架构图

```
                              ┌─────────────────────────┐
                              │      用户交互层          │
                              │                          │
                              │  /triage  /wiki-compile  │
                              │  /context    /lint       │
                              └────────────┬────────────┘
                                           │
                    ┌──────────────────────┼──────────────────────┐
                    │                      │                      │
                    ▼                      ▼                      ▼
          ┌─────────────┐        ┌─────────────┐        ┌─────────────┐
          │  信息输入层  │        │  行动管理层  │        │  知识编译层  │
          │             │        │             │        │             │
          │  0 Inbox/   │ ────► │ 1 Projects/ │ ────► │ wiki/       │
          │             │ triage│ 2 Areas/    │ compile│             │
          │             │        │ 3 Resources/│        │ concepts/   │
          │             │        │ 4 Archives/ │        │ entities/   │
          │             │        │             │        │ sources/    │
          └─────────────┘        └─────────────┘        └─────────────┘
                    │                      │                      │
                    └──────────────────────┼──────────────────────┘
                                           │
                                           ▼
                              ┌─────────────────────────┐
                              │        日志层            │
                              │                          │
                              │  AI-Log/                 │
                              │  ├── triage-log.md       │
                              │  ├── compile-log.md      │
                              │  └── sessions/           │
                              └─────────────────────────┘
```

### 2.2 层间关系

```
层                输入          处理          输出           消费者
─────────────────────────────────────────────────────────────────────
用户交互层    用户命令       Skill 路由     执行结果       用户
信息输入层    外部内容       /triage        PARA 位置       行动管理层
行动管理层    已分拣内容     PARA 工作流     raw/ 内容      知识编译层
知识编译层    raw/ 内容      /wiki-compile  wiki/ 页面     用户
日志层        所有操作       格式化记录     日志文件        用户/AI
```

---

## 3. 三层架构详解

### 3.1 信息输入层 (0 Inbox/)

**职责**: 信息的临时捕获和暂存

**设计目标**:
- 零摩擦捕获：任何内容可以以最小成本放入 Inbox
- 自动分拣：由 `/triage` 自动分析并路由

**子目录结构**:

```
0 Inbox/
├── Clippings/          # 网页剪藏（Obsidian Web Clipper）
├── 1-输入/             # 手动输入的内容
├── 2-输出/             # 待输出的内容
├── 3-任务/             # 待处理的任务
├── 4-成果/             # 完成的成果
├── 5 Zettels/          # Zettelkasten 笔记
├── _processed/         # 已处理文件存档
├── _Processed.md       # 处理记录
└── 0 Inbox.md          # Inbox 索引
```

**处理策略**:

| 内容类型 | 检测方式 | 处理方式 |
|----------|----------|----------|
| 网页剪藏 | `source` frontmatter + URL | 提取元数据 → 路由到 raw/ |
| 碎片笔记 | 短内容，无明确结构 | 评估后路由 |
| 任务条目 | 包含待办标记 | 追加到项目 tasks.md |
| 文献笔记 | 引用信息，较长内容 | 路由到 raw/ |

### 3.2 行动管理层 (PARA)

**职责**: 按行动性组织信息

**PARA 四象限**:

```
                  │  有截止日期   │  无截止日期    │
──────────────────┼──────────────┼────────────────┼
有具体行动         │ 1 Projects/  │ 2 Areas/       │
──────────────────┼──────────────┼────────────────┤
无具体行动         │ 4 Archives/  │ 3 Resources/   │
                  │              │                │
```

#### 1 Projects/ - 项目
- 有明确的完成条件和截止日期
- 一个项目一个文件夹
- 项目结束后迁移到 4 Archives/

#### 2 Areas/ - 领域
- 持续的责任范围，无结束日期
- 包含标准、流程、长期跟踪

#### 3 Resources/ - 资源
- 兴趣主题，参考材料
- Wiki 子库的宿主目录
- 最大的目录，包含 raw/ 和 wiki/

#### 4 Archives/ - 归档
- 不活跃的项目和内容
- 保留以供将来参考

### 3.3 知识编译层 (Wiki)

**职责**: 将原始信息编译为结构化知识

**核心原则**:

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│   raw/                      wiki/                    │
│   ┌──────────┐              ┌──────────┐            │
│   │  人类维护  │  ──编译──►  │  AI 维护  │            │
│   │  只写不读  │              │  可读可查  │            │
│   │  (对 AI)  │              │  (对人类)  │            │
│   └──────────┘              └──────────┘            │
│                                                      │
│   人类写入原始资料            AI 生成结构化知识        │
│   AI 只读取，不修改           AI 独占写入权限          │
│   格式自由                   格式严格                 │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**编译过程**:

```
raw/articles/*.md
raw/papers/*.md      ──→  /wiki-compile  ──→  wiki/concepts/*.md
raw/books/*.md                                  wiki/entities/*.md
raw/conversations/*.md                          wiki/sources/*.md
                                                wiki/index.md (更新)
                                                wiki/log.md   (更新)
```

---

## 4. 目录结构规范

### 4.1 完整目录树

```
~/Vault/                                    ← Vault 根目录
│
├── CLAUDE.md                               ← AI 宪法（最重要文件）
├── README.md
│
├── 0 Inbox/                                ← 信息输入层
│   ├── 0 Inbox.md
│   ├── _processed/                         ← 已处理存档
│   ├── Clippings/                          ← 网页剪藏
│   ├── 1-输入/                             ← 手动输入
│   ├── 2-输出/                             ← 待输出
│   ├── 3-任务/                             ← 待处理任务
│   ├── 4-成果/                             ← 完成成果
│   └── 5 Zettels/                          ← Zettelkasten
│
├── 1 Projects/                             ← 有截止日期的行动
│   └── [Project-Name]/
│
├── 2 Areas/                                ← 持续责任领域
│   └── [Area-Name]/
│
├── 3 Resources/                            ← 资源与知识库
│   ├── _META-INDEX.md                      ← 全局导航
│   ├── 01-Tech/                            ← 技术资源
│   ├── 02-Learning/                        ← 学习资源
│   ├── 03-Productivity/                    ← 生产力资源
│   ├── 04-Interests/                       ← 兴趣资源
│   ├── 05-Reference/                       ← 参考资料
│   │
│   ├── ai-ml/                              ← Wiki 子库：AI/ML
│   │   ├── CLAUDE.md                       ←   子库 Schema
│   │   ├── raw/                            ←   原始资料（人类维护）
│   │   │   ├── articles/
│   │   │   ├── papers/
│   │   │   ├── books/
│   │   │   └── conversations/
│   │   ├── wiki/                           ←   编译产物（AI 维护）
│   │   │   ├── index.md
│   │   │   ├── log.md
│   │   │   ├── concepts/
│   │   │   ├── entities/
│   │   │   └── sources/
│   │   └── outputs/                        ←   生成制品
│   │
│   ├── people/                             ← Wiki 子库：人物
│   │   └── ... (同上结构)
│   │
│   ├── finance/                            ← Wiki 子库：财务
│   │   └── ... (同上结构)
│   │
│   └── productivity/                       ← Wiki 子库：生产力
│       └── ... (同上结构)
│
├── 4 Archives/                             ← 归档内容
│
├── AI-Log/                                 ← AI 操作日志
│   ├── triage-log.md                       ←   分拣日志
│   ├── compile-log.md                      ←   编译日志
│   └── sessions/                           ←   会话记录
│
├── .obsidian/                              ← Obsidian 配置
├── .claude/                                ← Claude Code 配置
│   ├── skills/                             ←   Skills 定义
│   │   ├── triage/
│   │   ├── wiki-compile/
│   │   ├── context/
│   │   └── lint/
│   └── hooks/                              ←   Hooks 配置
│       └── hooks.json
│
└── .git/                                   ← Git 版本控制
```

### 4.2 目录权限矩阵

| 目录 | 人类可读 | 人类可写 | AI 可读 | AI 可写 | 备注 |
|------|----------|----------|---------|---------|------|
| `0 Inbox/` | ✅ | ✅ | ✅ | ❌ | AI 只能移动，不能修改 |
| `1 Projects/` | ✅ | ✅ | ✅ | ✅ | 辅助整理 |
| `2 Areas/` | ✅ | ✅ | ✅ | ✅ | 辅助整理 |
| `3 Resources/` (通用) | ✅ | ✅ | ✅ | ✅ | 混合维护 |
| `3 Resources/*/raw/` | ✅ | ✅ | ✅ | ❌ | **AI 只读** |
| `3 Resources/*/wiki/` | ✅ | ❌ | ✅ | ✅ | **AI 独占写入** |
| `4 Archives/` | ✅ | ✅ | ✅ | ✅ | 辅助迁移 |
| `AI-Log/` | ✅ | ❌ | ✅ | ✅ | **AI 独占写入** |
| `.obsidian/` | ✅ | ✅ | ⚠️ | ❌ | 需确认才修改 |
| `.claude/` | ✅ | ⚠️ | ✅ | ✅ | Skills 由 AI 管理 |
| `.git/` | ✅ | ❌ | ✅ | ❌ | 通过 Git 命令操作 |

---

## 5. 组件设计

### 5.1 组件全景

```
                        ┌──────────────────────┐
                        │     CLAUDE.md         │
                        │    (系统宪法)          │
                        └──────────┬───────────┘
                                   │ 定义规则
               ┌───────────────────┼───────────────────┐
               │                   │                   │
               ▼                   ▼                   ▼
        ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
        │   Skills    │    │   Hooks     │    │   Schemas   │
        │             │    │             │    │             │
        │ /triage     │    │SessionStart │    │CLAUDE.md    │
        │ /wiki-      │    │PostToolUse  │    │(子库)       │
        │   compile   │    │             │    │             │
        │ /context    │    │             │    │             │
        │ /lint       │    │             │    │             │
        └──────┬──────┘    └──────┬──────┘    └──────┬──────┘
               │                   │                   │
               └───────────────────┼───────────────────┘
                                   │
                                   ▼
                        ┌──────────────────────┐
                        │     文件系统          │
                        │  (Markdown 文件)      │
                        └──────────────────────┘
```

### 5.2 CLAUDE.md - 系统宪法

**文件**: `CLAUDE.md`
**角色**: 系统级规则定义文件

**核心章节**:

| 章节 | 内容 | 作用 |
|------|------|------|
| Vault 架构 | 三层架构图解 | 整体理解 |
| 目录职责速查 | 8 个目录的职责和权限 | 路由决策 |
| 核心规则 | 5 条不可违反规则 | 行为约束 |
| 信息生命周期 | 4 阶段分类 | 分拣依据 |
| Frontmatter 标准 | 统一格式 | 数据规范 |
| 会话协议 | 开始/结束流程 | 操作流程 |
| 禁止行为 | 4 条禁止事项 | 安全边界 |

### 5.3 Skills - 功能组件

#### /triage - Inbox 分拣引擎

```
triage/
├── triage.md       ← Skill 指令文件
└── skill.json      ← 注册配置
```

**输入**: `0 Inbox/` 目录
**输出**: 分拣后的文件 + `AI-Log/triage-log.md`
**分类能力**: 时效性 × 主题 × 人物
**路由目标**: PARA 四目录 + Wiki 子库

**命令参数**:
| 参数 | 功能 |
|------|------|
| (无参) | 扫描所有未处理文件 |
| `--dry-run` | 仅预览，不执行 |
| `--file "file.md"` | 处理单个文件 |
| `--scope clippings\|fleeting\|...` | 限定范围 |

#### /wiki-compile - 知识编译引擎

```
wiki-compile/
├── wiki-compile.md  ← Skill 指令文件
└── skill.json       ← 注册配置
```

**输入**: `3 Resources/[topic]/raw/` 目录
**输出**: `3 Resources/[topic]/wiki/` 页面 + 日志
**处理能力**: 概念提取 × 实体提取 × 关系提取

**命令参数**:
| 参数 | 功能 |
|------|------|
| `[topic]` | 编译指定子库 |
| --dry-run | 仅预览 |
| --incremental | 仅处理新增文件 |

#### /context - 会话状态管理

```
context/
├── context.md      ← Skill 指令文件
└── skill.json      ← 注册配置
```

**输出内容**:
- PARA 概览统计
- Inbox 健康状态
- Wiki 子库统计
- 活跃项目列表
- 最近活动摘要
- 操作建议

#### /lint - 系统健康检查

```
lint/
├── lint.md         ← Skill 指令文件
└── skill.json      ← 注册配置
```

**检查项目**:
1. 目录结构完整性
2. 文件完整性（断链检测）
3. Frontmatter 规范
4. 系统状态（Inbox/Wiki 同步）
5. 配置正确性
6. Git 状态

### 5.4 Hooks - 自动化钩子

**文件**: `.claude/hooks/hooks.json`

```
Hook 类型         触发时机           动作
─────────────────────────────────────────────────────
SessionStart      每次会话开始        显示 Vault 状态
PostToolUse       Write/Edit 后      记录文件修改
```

### 5.5 Schemas - 子库定义

每个 Wiki 子库有一个 `CLAUDE.md` 定义文件：

```
3 Resources/[topic]/CLAUDE.md
├── 目录结构定义
├── 核心概念域
├── 页面模板
├── 编译规则
└── 使用命令
```

---

## 6. 数据流详解

### 6.1 主数据流

```
外部内容
    │
    ▼
┌──────────────────────────────────────────────────────┐
│                    捕获 (Capture)                     │
│                                                      │
│  Web Clipper ─┐                                      │
│  手动输入 ────┤                                      │
│  AI 对话 ────┼──► 0 Inbox/                           │
│  文件导入 ───┘                                      │
└────────────────────┬─────────────────────────────────┘
                     │
                     ▼ /triage
┌──────────────────────────────────────────────────────┐
│                    分拣 (Triage)                      │
│                                                      │
│  1. 扫描 Inbox                                       │
│  2. 分析内容（时效性/主题/人物）                     │
│  3. 路由决策                                        │
│  4. 文件移动                                        │
│  5. Frontmatter 更新                                 │
│  6. 日志记录                                        │
└────────────────────┬─────────────────────────────────┘
                     │
          ┌──────────┼──────────┐
          │          │          │
          ▼          ▼          ▼
    ephemeral  operational   reference
          │          │          │
          ▼          ▼          ▼
  1 Projects/  1 Projects/  3 Resources/
  tasks.md     笔记目录     [topic]/raw/
          │          │          │
          │          │          ▼ /wiki-compile
          │          │  ┌──────────────────────────────┐
          │          │  │         编译 (Compile)         │
          │          │  │                               │
          │          │  │  1. 读取 raw/ 源文件          │
          │          │  │  2. 提取概念/实体/关系        │
          │          │  │  3. 创建/更新 wiki/ 页面      │
          │          │  │  4. 更新 index.md             │
          │          │  │  5. 记录 compile-log.md       │
          │          │  └───────────────┬───────────────┘
          │          │                  │
          │          │                  ▼
          │          │         3 Resources/[topic]/wiki/
          │          │
          └──────────┴──────────────────► 用户查询
```

### 6.2 Triage 数据流细节

```
输入: 0 Inbox/ 下的 .md 文件
    │
    ▼
┌─────────────────┐
│ 1. 过滤         │  排除 _processed/ 、已有 triaged:true 的文件
└────────┬────────┘
         ▼
┌─────────────────┐
│ 2. 分析         │
│                 │
│ 时效性分析:     │  关键词匹配 + 内容长度 + Frontmatter
│  ├─ ephemeral   │  "todo", "task", "待办", "明天"...
│  ├─ operational │  "meeting", "会议", "note", 有日期
│  ├─ reference   │  URL, 引用, 长文, 有 source
│  └─ evergreen   │  概念定义, 原理说明, 术语解释
│                 │
│ 主题识别:       │  关键词权重匹配
│  ├─ ai-ml       │  LLM, GPT, ML, AI, Agent...
│  ├─ people      │  人名, 联系方式, 职位...
│  ├─ finance     │  投资, 股票, 理财...
│  └─ productivity│  GTD, 笔记, 工具...
└────────┬────────┘
         ▼
┌─────────────────┐
│ 3. 路由         │
│                 │
│ ephemeral  → 1 Projects/[项目]/tasks.md              │
│ operational→ 1 Projects/[项目]/                      │
│ reference  → 3 Resources/[主题]/raw/                 │
│ evergreen  → 3 Resources/[主题]/wiki/                │
│ 人物信息   → 3 Resources/people/raw/                 │
└────────┬────────┘
         ▼
┌─────────────────┐
│ 4. 执行         │
│                 │
│ - 复制/移动文件  │
│ - 更新 Frontmatter                               │
│ - 记录 triage-log                                │
└─────────────────┘
```

### 6.3 Wiki-Compile 数据流细节

```
输入: 3 Resources/[topic]/raw/ 目录
    │
    ▼
┌─────────────────────────────────────┐
│ 1. 扫描                             │
│                                     │
│ raw/articles/    → 未编译的文件      │
│ raw/papers/      → 未编译的文件      │
│ raw/books/       → 未编译的文件      │
│ raw/conversations/ → 未编译的文件    │
│                                     │
│ 判定标准: 无 compiled:true frontmatter │
└────────────────┬────────────────────┘
                 ▼
┌─────────────────────────────────────┐
│ 2. 提取                             │
│                                     │
│ 概念提取:                            │
│ - 识别关键词和术语                    │
│ - 提取定义和解释                     │
│ - 判断概念层级（基础/进阶）           │
│                                     │
│ 实体提取:                            │
│ - 识别命名实体                       │
│ - 提取属性                           │
│ - 分类（人物/组织/产品/工具）        │
│                                     │
│ 关系提取:                            │
│ - 概念之间: is-a / part-of / related │
│ - 概念-实体: implements / uses / created │
│ - 实体之间: collaborates / competes  │
└────────────────┬────────────────────┘
                 ▼
┌─────────────────────────────────────┐
│ 3. 编译                             │
│                                     │
│ wiki/concepts/[slug].md             │
│ wiki/entities/[slug].md             │
│ wiki/sources/source-[slug].md       │
│                                     │
│ 增量编译: 优先更新已有页面           │
│ 冲突处理: 合并信息, 标注多来源      │
│ 链接建立: [[]] 自动关联             │
└────────────────┬────────────────────┘
                 ▼
┌─────────────────────────────────────┐
│ 4. 索引与日志                       │
│                                     │
│ wiki/index.md  ← 更新统计和目录     │
│ wiki/log.md    ← 记录编译详情       │
│ AI-Log/compile-log.md ← 全局日志   │
└─────────────────────────────────────┘
```

---

## 7. 信息生命周期模型

### 7.1 四阶段模型

```
                    ┌─────────────────────────────────────┐
                    │                                     │
    ephemeral ──────┤  1-7 天                            │
    (临时)          │  "明天发邮件", "买个灯泡"           │
                    │                                     │
         │          │                                     │
         ▼          │                                     │
    operational ────┤  1 周 - 3 月                       │
    (运行中)        │  项目笔记, 会议记录, 工作草稿        │
                    │                                     │
         │          │                                     │
         ▼          │                                     │
    reference ──────┤  3 月 - 永久                        │
    (参考)          │  文章, 书摘, 网页保存               │
                    │                                     │
         │          │                                     │
         ▼          │                                     │
    evergreen ──────┤  永久                               │
    (常青)          │  编译后的知识, Wiki 页面             │
                    │                                     │
                    └─────────────────────────────────────┘
```

### 7.2 生命周期判定矩阵

| 判定维度 | ephemeral | operational | reference | evergreen |
|----------|-----------|-------------|-----------|-----------|
| **时效性** | 高（数天） | 中（数周-数月） | 低（长期） | 极低（永久） |
| **可复用性** | 不可复用 | 项目内复用 | 可跨项目复用 | 通用知识 |
| **结构化程度** | 低 | 中 | 中 | 高 |
| **是否需要编译** | 否 | 否 | 是 | 已经是 |
| **存储位置** | tasks.md | 项目目录 | raw/ | wiki/ |
| **归档时机** | 完成后 | 项目结束后 | 长期保留 | 持续更新 |

### 7.3 自动过期机制

```
ephemeral
  │  7 天无更新
  ▼
  [_processed/ 存档]
  │  30 天
  ▼
  自动删除（或手动确认删除）

operational
  │  项目标记完成
  ▼
  4 Archives/

reference
  │  编译完成
  ▼
  wiki/ (长期保留，持续更新)
```

---

## 8. Wiki 子库规范

### 8.1 通用结构

```
3 Resources/[topic]/
├── CLAUDE.md          # 子库 Schema 定义
├── raw/               # 原始资料（人类维护）
│   ├── articles/      #   文章摘录
│   ├── papers/        #   论文笔记
│   ├── books/         #   书籍笔记
│   └── conversations/ #   对话记录
├── wiki/              # LLM 编译产物（AI 维护）
│   ├── index.md       #   知识索引
│   ├── log.md         #   编译日志
│   ├── concepts/      #   概念页面
│   ├── entities/      #   实体页面
│   └── sources/       #   来源溯源页面
└── outputs/           # 基于 Wiki 生成的制品
```

### 8.2 Wiki 页面类型规范

#### 概念页面 (concepts/)

```yaml
---
aliases:           # 别名数组
created: YYYY-MM-DD
type: concept
topic: [topic_name]
status: draft | reviewed | evergreen
---
```

**必需章节**:
- `## 定义` - 一句话定义
- `## 核心原理` - 详细解释
- `## 相关概念` - `[[]]` 链接列表
- `## Sources` - 来源追溯

#### 实体页面 (entities/)

```yaml
---
aliases:
created: YYYY-MM-DD
type: entity
entity_type: person | company | tool | paper | product
topic: [topic_name]
---
```

**必需章节**:
- `## 基本信息` - 类型/时间/状态
- `## 描述` - 详细描述
- `## 关联` - 链接列表
- `## Sources` - 来源追溯

#### 来源页面 (sources/)

```yaml
---
source_url: ""
source_author: ""
source_date: YYYY-MM-DD
created: YYYY-MM-DD
type: source
---
```

**必需章节**:
- `## 摘要` - 内容摘要
- `## 关键引用` - 重要原文
- `## 衍生概念` - 由此产生的概念列表
- `## 关联页面` - 引用了此来源的页面

### 8.3 四个子库

#### ai-ml
| 属性 | 值 |
|------|------|
| Schema | [[3 Resources/ai-ml/CLAUDE.md]] |
| 状态 | 🟢 活跃 |
| 核心概念域 | LLM, Transformer, Agent, RAG, Training |
| 实体类型 | 模型, 公司, 框架, 论文 |

```
概念示例:
├── LLM-Pricing-Model     # 大模型定价模型
├── Prompt-Caching         # 提示缓存机制
├── Model-Routing          # 模型路由策略
├── Transformer-Architecture
├── Attention-Mechanism
├── RAG-System
└── Agent-Framework

实体示例:
├── OpenAI        (公司)
├── Anthropic     (公司)
├── Claude-Code   (工具)
├── GPT-5.5       (模型)
└── DeepSeek-V4   (模型)
```

#### people
| 属性 | 值 |
|------|------|
| Schema | [[0 Inbox/people/CLAUDE]] |
| 状态 | 🟡 规划中 |
| 核心概念域 | 人物类型, 关系维度, 互动记录 |
| 实体类型 | 个人, 组织, 关系 |

```
概念示例:
├── Professional-Networking   # 职业社交方法
├── Relationship-Management   # 关系管理
└── Collaboration-Model       # 协作模式

实体示例:
├── [姓名]   (个人)
│   ├── 基本信息
│   ├── 专业背景
│   ├── 互动记录
│   └── 共同话题
└── [组织]   (组织)
```

#### finance
| 属性 | 值 |
|------|------|
| Schema | [[3 Resources/finance/CLAUDE.md]] |
| 状态 | 🟡 规划中 |
| 核心概念域 | 投资, 交易, 理财, 税务 |
| 实体类型 | 工具, 平台, 策略 |

```
概念示例:
├── Asset-Allocation    # 资产配置
├── Risk-Management     # 风险管理
├── Value-Investing     # 价值投资
├── Technical-Analysis  # 技术分析
└── Tax-Planning        # 税务规划

实体示例:
├── [股票代码]  (金融产品)
├── [基金名称]  (基金)
└── [交易平台]  (平台)
```

#### productivity
| 属性 | 值 |
|------|------|
| Schema | [[3 Resources/productivity/CLAUDE.md]] |
| 状态 | 🟢 活跃 |
| 核心概念域 | GTD, PARA, 工作流, 工具, 习惯 |
| 实体类型 | 工具, 方法, 框架 |

```
概念示例:
├── PARA-Method             # PARA 方法论
├── Zettelkasten-Method     # 卡片盒笔记法
├── Second-Brain            # 第二大脑
├── Time-Blocking           # 时间块
├── Deep-Work               # 深度工作
└── LLM-Wiki                # LLM Wiki 方法论

实体示例:
├── Obsidian    (工具)
├── Claude-Code (工具)
├── Todoist     (工具)
└── GTD         (方法论)
```

---

## 9. Skills 接口规范

### 9.1 通用接口

```
Skill 定义结构:
.claude/skills/[name]/
├── [name].md        ← 指令文件（Markdown）
│   ├── 使用方式
│   ├── 执行流程
│   ├── 输出格式
│   └── 示例
└── skill.json       ← 注册配置
    ├── name
    ├── description
    ├── instructions (指向 .md 文件)
    ├── commands (注册的命令列表)
    └── enabled
```

### 9.2 Triage Skill 接口

```
触发: /triage [options]
输入: 0 Inbox/ 目录
输出: AI-Log/triage-log.md + 文件移动

选项:
  --dry-run           仅预览分析结果
  --file "name.md"    处理单个文件
  --scope clippings   限定扫描范围
  --scope fleeting    限定扫描范围

返回格式:
{
  "timestamp": "ISO8601",
  "summary": { "total": N, "processed": N, "remaining": N },
  "classification": { "ephemeral": N, "operational": N, ... },
  "routing": [ { "file": "...", "target": "...", "status": "..." } ],
  "errors": []
}
```

### 9.3 Wiki-Compile Skill 接口

```
触发: /wiki-compile [topic] [options]
输入: 3 Resources/[topic]/raw/
输出: 3 Resources/[topic]/wiki/ + 日志

选项:
  --dry-run           仅预览提取结果
  --incremental       仅处理新增/修改文件
  --force             重新编译所有文件

返回格式:
{
  "timestamp": "ISO8601",
  "topic": "ai-ml",
  "summary": {
    "source_files": N,
    "new_concepts": N,
    "new_entities": N,
    "updated_pages": N
  },
  "created": [ "file1.md", "file2.md" ],
  "updated": [ "file3.md" ],
  "errors": []
}
```

### 9.4 Context Skill 接口

```
触发: /context [options]
输出: Markdown 格式的状态摘要

选项:
  --quick         仅状态概览
  --projects      仅项目状态
  --inbox         仅 Inbox 状态
  --summary       建议摘要

返回格式:
  Markdown 文本，包含 Vault 状态、最近活动、建议
```

### 9.5 Lint Skill 接口

```
触发: /lint [options]
输出: Markdown 格式的检查报告

选项:
  --quick         快速检查（仅关键项）
  --fix           自动修复可修复的问题
  --report        详细报告

返回格式:
{
  "timestamp": "ISO8601",
  "health_score": 0-100,
  "checks": { "passed": N, "warnings": N, "errors": N },
  "details": [
    { "category": "...", "status": "pass|warn|error", "message": "..." }
  ],
  "fixable": [ { "issue": "...", "auto_fix": true|false } ]
}
```

---

## 10. Frontmatter 标准

### 10.1 Wiki 页面标准 Frontmatter

```yaml
---
# 必填字段
aliases:              # 别名数组，用于搜索匹配
  - 中文概念名
  - English Concept Name
created: 2026-05-27   # YYYY-MM-DD 创建日期
type: concept          # concept | entity | source | wiki-index | compile-log
topic: ai-ml           # ai-ml | people | finance | productivity

# 可选字段
modified: 2026-05-27  # 最后修改日期
status: reviewed       # draft | reviewed | evergreen
tags:                  # 标签数组
  - ai
  - llm
---
```

### 10.2 原始资料标准 Frontmatter

```yaml
---
# 必填字段
created: 2026-05-27
source: "https://url"  # 来源 URL
tags:
  - clippings

# 可选字段
title: "文章标题"
author: "作者"
published: 2026-05-20   # 原始发布日期
description: "简要描述"
---
```

### 10.3 分拣标记

处理后的文件添加：
```yaml
---
triaged: true
triaged_at: 2026-05-27T14:30:00
triaged_to: 3 Resources/ai-ml/raw/articles/
original_path: 0 Inbox/Clippings/original-name.md
---
```

### 10.4 编译标记

编译后的源文件添加：
```yaml
---
compiled: true
compiled_at: 2026-05-27T15:00:00
compiled_to:
  - concepts/LLM-Pricing-Model
  - entities/OpenAI
---
```

### 10.5 类型枚举

| type 值 | 说明 | 位置 |
|---------|------|------|
| `concept` | 概念页面 | wiki/concepts/ |
| `entity` | 实体页面 | wiki/entities/ |
| `source` | 来源页面 | wiki/sources/ |
| `wiki-index` | 索引页面 | wiki/index.md |
| `compile-log` | 编译日志 | wiki/log.md |
| `wiki-schema` | 子库 Schema | CLAUDE.md |
| `triage-log` | 分拣日志 | AI-Log/ |
| `compile-log` | 编译日志（全局） | AI-Log/ |
| `session` | 会话记录 | AI-Log/sessions/ |
| `implementation-report` | 实施报告 | AI-Log/ |

---

## 11. 安全与约束

### 11.1 AI 权限边界

```
允许操作:
✅ 读取 Vault 中任何文件
✅ 写入 wiki/ 目录
✅ 写入 AI-Log/ 目录
✅ 移动 0 Inbox/ 中的文件
✅ 在 1 Projects/、2 Areas/、4 Archives/ 中辅助整理
✅ 创建新目录
✅ 更新 Frontmatter

禁止操作:
❌ 修改 raw/ 目录中的任何文件
❌ 删除文件（除非明确确认）
❌ 修改 .obsidian/ 配置文件
❌ 批量操作超过 10 个文件（除非明确确认）
❌ 在 wiki/ 中修改非 AI 创建的内容
❌ 暴露敏感信息到 wiki/ 页面
```

### 11.2 Git 保护

```
操作前后自动检查:
1. 操作前: git status 确认工作区干净
2. 操作后: git status 确认变更范围
3. 批量操作: 建议分步提交
4. 危险操作: 要求用户确认

提交策略:
- 每次 /triage 或 /wiki-compile 后建议提交
- 提交信息遵循 conventional commits 规范
- 单次提交不应超过 50 个文件

远程同步:
- push 前确认网络连通性
- 优先使用 SSH（配置后）
- token 权限要求: repo
```

### 11.3 数据隐私

| 数据类型 | 处理规则 |
|----------|----------|
| 个人财务数据 | 不进入 wiki/ |
| 联系方式 | 存储在 people/raw/，不在 wiki/ 公开 |
| API 密钥 | 永不存储在 Vault 中 |
| 私有对话 | 如有 sensitive: true 标记则跳过编译 |
| 医疗信息 | 不编译到 wiki/ |

### 11.4 容错设计

```
故障场景           影响              恢复方式
─────────────────────────────────────────────────
Git 不可用         无法同步远程      本地继续工作
AI 不可用          知识编译暂停      人类可直接操作 Markdown
网络不可用         无法剪藏          手动输入 Inbox
目录被误删         结构损坏          从 Git 恢复
Skill 被误改       功能异常          从 Git 恢复或重新创建
断链               导航中断          运行 /lint 检测并修复
```

---

## 12. 运维手册

### 12.1 日常流程

```
┌─────────────────────────────────────────────┐
│              会话开始 (每日)                  │
│                                             │
│  1. 打开 Vault                               │
│  2. 运行 /context --quick                    │
│  3. 检查 Inbox 是否有新内容                   │
│  4. 确认今日活跃项目                          │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│              工作会话                         │
│                                             │
│  有新内容时:                                 │
│    剪藏 → Inbox → /triage                   │
│                                             │
│  有未编译资料时:                              │
│    /wiki-compile [topic]                    │
│                                             │
│  /context 保持状态感知                        │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│              会话结束                         │
│                                             │
│  1. 运行 /lint --quick                       │
│  2. 检查 Git 状态                            │
│  3. 提交更改                                 │
│  4. 推送到远程                               │
└─────────────────────────────────────────────┘
```

### 12.2 定期维护

| 频率 | 操作 | 命令 |
|------|------|------|
| 每日 | Inbox 分拣 | `/triage` |
| 每日 | 状态检查 | `/context --quick` |
| 每次新内容 | 编译知识 | `/wiki-compile [topic]` |
| 每周 | 健康检查 | `/lint` |
| 每月 | 详细报告 | `/lint --report` |
| 每季度 | 归档回顾 | 检查 4 Archives/ 内容 |
| 每年 | 大清理 | 审查并清理低价值内容 |

### 12.3 新子库创建流程

```
1. 确定主题和概念域
2. 创建目录结构:
   mkdir -p "3 Resources/[topic]/{raw/{articles,papers,books,conversations},wiki/{concepts,entities,sources},outputs}"
3. 创建 CLAUDE.md (Schema 定义)
4. 创建 wiki/index.md (索引页)
5. 创建 wiki/log.md (编译日志)
6. 更新 3 Resources/_META-INDEX.md
7. 添加初始 raw/ 内容
8. 运行 /wiki-compile [topic]
9. 验证: /lint
```

### 12.4 故障排除

| 问题 | 诊断 | 解决方案 |
|------|------|----------|
| Inbox 积压过多 | `/context --inbox` | 分批 `/triage --scope` |
| Wiki 编译失败 | 查看 compile-log | `--dry-run` 预览错误 |
| 断链增多 | `/lint` 检查 | 运行 `/lint --fix` |
| Git 状态混乱 | `git status` | 逐文件提交 |
| Skill 不生效 | 检查 skill.json | 确认 enabled: true |

---

## 13. 附录

### A. 术语表

| 术语 | 英文 | 定义 |
|------|------|------|
| 三层架构 | Three-Layer Architecture | 输入层→管理层→编译层的系统架构 |
| 知识编译 | Knowledge Compilation | AI 将原始资料转为结构化 Wiki 的过程 |
| 信息分拣 | Information Triage | 分析信息时效性和主题，路由到正确位置 |
| 时效性分类 | Time-Aware Classification | ephemeral/operational/reference/evergreen |
| 常青知识 | Evergreen Knowledge | 长期有效、持续更新的知识 |
| 子库 | Sub-Library | 一个主题领域的 Wiki 知识库 |
| 溯源 | Provenance | 知识的来源追溯 |
| 渐进增强 | Progressive Enhancement | 系统功能从核心到边缘渐进式释放 |

### B. 文件命名规范

```
Wiki 页面:
  concepts/[Descriptive-Name].md
  entities/[Entity-Name].md
  sources/source-[Short-Slug].md

原始资料:
  raw/articles/[原始标题].md
  raw/papers/[论文标题].md
  raw/books/[书名]-[作者].md
  raw/conversations/[日期]-[主题].md

日志:
  AI-Log/triage-log.md (追加)
  AI-Log/compile-log.md (追加)
  AI-Log/sessions/[YYYY-MM-DD]_[HH-MM]_[topic].md
```

### C. Conventional Commits 规范

```
feat:     新功能        feat: 实施 PARA+LLM-Wiki 整合系统
fix:      Bug 修复       fix: 修复 triage 路由错误
refactor: 重构          refactor: 优化 wiki-compile 编译逻辑
docs:     文档          docs: 更新 CLAUDE.md
chore:    杂项          chore: 清理 Inbox
para:     PARA 同步     para: sync daily changes
```

### D. 版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| v1.0 | 2026-05-27 | 初始发布，完整架构设计 |

### E. 参考链接

- [[CLAUDE.md]] - 系统宪法
- [[3 Resources/_META-INDEX.md]] - 知识导航
- [[3 Resources/ai-ml/CLAUDE.md]] - AI/ML 子库 Schema
- [[0 Inbox/people/CLAUDE]] - People 子库 Schema
- [[3 Resources/finance/CLAUDE.md]] - Finance 子库 Schema
- [[3 Resources/productivity/CLAUDE.md]] - Productivity 子库 Schema
- [[AI-Log/implementation-report-2026-05-26.md]] - 实施报告

### F. 实施检查清单

- [x] 目录结构创建
- [x] 4 个 Skills 创建
- [x] CLAUDE.md 更新
- [x] 4 个 Wiki 子库初始化
- [x] Hooks 配置
- [x] 日志系统建立
- [x] 首次分拣执行
- [ ] 首次编译执行
- [ ] 定期维护流程建立
- [ ] 性能优化调优

---

**文档维护者**: AI (Claude Code)
**下次审查**: 2026-06-27
**状态**: ✅ 稳定版本

