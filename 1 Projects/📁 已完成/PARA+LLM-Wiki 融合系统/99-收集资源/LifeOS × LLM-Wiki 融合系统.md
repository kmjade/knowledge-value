---
title: "LifeOS × LLM-Wiki 融合系统"
source: "https://mp.weixin.qq.com/s/uEAegrqhsM1WKcqlVfuE2w"
author:
  - "[[一只阿木木]]"
published:
created: 2026-05-26
description:
tags:
  - "clippings"
triaged: true
triaged_at: 2026-05-27T09:00:56
triaged_to: ai-ml
---
一只阿木木 *2026年5月26日 00:02*

## 从零开始的完整架构设计文档 v1.0

---

## 第零章：设计哲学与核心假设

在动手之前，必须先确立三条设计公理，所有后续决策都从这里推导。

**公理一：单一 Vault，永不分裂**

当所有内容都进入同一个 Obsidian Vault，工具碎片化的问题就消失了——一个 Vault，全部 Markdown，全部对 Claude Code 可访问。 多 Vault 切换的摩擦是伪问题，真正的解是 **在单一 Vault 内建立明确的隔离边界** 。

**公理二：AI 是编译器，不是对话伙伴**

这一转变重新定义了整个问题：从「检索」到「编译」。 对生活信息，AI 是 **路由器** ；对专业知识，AI 是 **编译器** 。你只是信息的生产者和最终消费者，中间的所有整理工作都由 AI 承担。

**公理三：信息有生命周期，不是所有东西都值得永久存储**

知识管理系统失败的根源不是工具——是维护成本。构建知识库有三个步骤：收集（容易）、组织（困难）、维护（规模化后几乎不可能）。整理、交叉引用、摘要、更新的繁重工作才是系统死亡的地方。 本系统的核心设计目标就是把这个维护成本降到零。

---

## 第一章：Vault 目录结构设计（物理层）

## 1.1 完整目录树

```
~/ObsidianVault/               ← Vault 根目录（= Claude Code 工作目录）
│
├── CLAUDE.md                  ← 🧠 Agent 宪法（最重要的文件）
├── .gitignore                 ← Git 版本控制配置
│
├── .claude/                   ← Claude Code 配置目录
│   ├── skills/                ← 所有 Skills（/triage、/wiki-compile 等）
│   │   ├── triage.md          ← 核心：Inbox 分拣 Skill
│   │   ├── wiki-compile.md    ← 知识编译 Skill
│   │   ├── daily-open.md      ← 每日开启仪式 Skill
│   │   ├── weekly-review.md   ← 每周回顾 Skill
│   │   ├── context.md         ← 会话状态加载 Skill
│   │   └── lint.md            ← 系统健康检查 Skill
│   └── hooks/
│       └── hooks.json         ← SessionStart/Stop 自动钩子
│
├── 00-Inbox/                  ← 📥 唯一入口（永远只往这里扔东西）
│   ├── _processed/            ← 已分拣存档（不删除，留痕迹）
│   └── [新内容直接扔这里]
│
├── 01-Projects/               ← 🎯 活跃项目（有截止日期、有结果）
│   ├── _INDEX.md              ← 所有项目快照（Dataview 自动生成）
│   ├── [项目名]/
│   │   ├── README.md          ← 项目定义：目标、截止、状态
│   │   ├── tasks.md           ← 任务列表（Obsidian Tasks 格式）
│   │   ├── log.md             ← 追加式进展日志
│   │   └── refs/              ← 项目相关参考资料
│   └── ...
│
├── 02-Areas/                  ← 🏠 持续领域（无截止日期、持续维护）
│   ├── health/                ← 健康领域
│   ├── finance/               ← 财务领域
│   ├── family/                ← 家庭领域
│   ├── career/                ← 职业领域
│   └── [其他领域]/
│
├── 03-Resources/              ← 📚 资源库（LLM-Wiki 子库挂载点）
│   ├── _META-INDEX.md         ← 🗺️ 全局知识图谱入口（跨 Wiki 导航）
│   │
│   ├── [wiki-topic-1]/        ← 例：ai-ml/
│   │   ├── CLAUDE.md          ← 该 Wiki 子库的 schema（覆盖根 CLAUDE.md）
│   │   ├── raw/               ← 原始资料（LLM 只读，人类维护）
│   │   │   ├── articles/      ← 文章、网页剪辑
│   │   │   ├── papers/        ← 论文 PDF 或 MD
│   │   │   ├── books/         ← 书摘、读书笔记
│   │   │   └── conversations/ ← AI 对话记录（值得保留的部分）
│   │   ├── wiki/              ← LLM 编译产物（人类只读）
│   │   │   ├── index.md       ← 该主题总索引（每次编译更新）
│   │   │   ├── log.md         ← 编译日志（追加式）
│   │   │   ├── concepts/      ← 概念页
│   │   │   ├── entities/      ← 实体页（人物、工具、机构）
│   │   │   ├── sources/       ← 来源摘要页
│   │   │   └── comparisons/   ← 对比分析页
│   │   └── outputs/           ← 基于 Wiki 生成的制品（报告、文章草稿）
│   │
│   ├── [wiki-topic-2]/        ← 例：finance/
│   ├── [wiki-topic-3]/        ← 例：health/
│   ├── [wiki-topic-4]/        ← 例：cooking/
│   └── people/                ← 人物 CRM（特殊 Wiki，GBrain 模式）
│       ├── CLAUDE.md          ← 人物 Wiki schema
│       ├── raw/               ← 原始人物信息（会议记录、聊天记录）
│       └── wiki/
│           ├── index.md
│           └── [person-name].md  ← 人物页（分级丰富）
│
├── 04-Archive/                ← 🗄️ 归档（已完结项目、过期内容）
│   ├── projects/              ← 已完结项目
│   ├── ephemeral/             ← 过期 ephemeral 内容
│   └── [year]/                ← 按年归档
│
├── Periodic/                  ← 📅 周期笔记
│   ├── daily/
│   │   └── 2026/
│   │       └── 2026-05-11.md  ← 日记格式（LifeOS 模板）
│   ├── weekly/
│   ├── monthly/
│   ├── quarterly/
│   └── yearly/
│
├── 99-Meta/                   ← ⚙️ 系统元数据（不放内容）
│   ├── assets/                ← 图片、附件
│   ├── templates/             ← Templater 模板文件
│   ├── bases/                 ← Obsidian Bases 数据库视图
│   ├── scripts/               ← Python/Shell 辅助脚本
│   └── graphs/                ← 自定义 D3 图谱（可选）
│
└── AI-Log/                    ← 🤖 Agent 操作日志（审计追踪）
    ├── sessions/              ← 每次 Claude Code 会话摘要
    ├── triage-log.md          ← 分拣操作追加日志
    └── compile-log.md         ← Wiki 编译操作追加日志
```

## 1.2 目录设计的关键决策解释

**为什么 `03-Resources/` 是 Wiki 子库的挂载点？**

标准 LLM-Wiki 的三层架构是： `raw/` （不可修改的源文件）、 `wiki/` （LLM 生成的页面）、 `CLAUDE.md` （schema 配置）。LLM 读取这些文件但永远不修改它们。它们是核实基线：wiki 中的每个声明都可以追溯到 raw/ 中的某个文件。 将这个结构嵌套在 `03-Resources/[topic]/` 下，天然契合 PARA 的 Resources 层级。

**为什么有 `AI-Log/` 目录？**

/AI `文件夹（本设计中为` AI-Log/\`）是 Claude Code 写入其输出的地方——会话摘要、生成的草稿、任务日志。随着时间推移，这个文件夹成为 Agent 为你做过所有事情的完整记录。

**为什么有 `_META-INDEX.md` ？**

当你有多个 Wiki 子库时，需要一个跨域入口。LLM-Wiki 的 deep 查询深度会读取所有内容、搜索原始来源、并查看兄弟 Wiki——用于复杂问题。 `_META-INDEX.md` 是这个跨域查询的导航地图。

---

## 第二章：CLAUDE.md 根宪法（完整文件）

这是整个系统最重要的文件。Claude Code 在项目根目录查找 `CLAUDE.md` 文件。这是你的 Agent 常驻指令——每次会话都会读取它。把它当作你第二大脑的宪法。

Markdown

```
# LifeOS × LLM-Wiki 系统宪法

## 关于我
[在此填写 2-3 句话描述你是谁、你做什么工作、你的核心目标]
例：我是一名产品经理，专注于 AI 领域的创业项目。
我用这个 Vault 管理我的整个人生：工作项目、个人生活、专业知识积累。

## Vault 架构
这个 Vault 采用三层架构：
- **Layer 1（生活管理层）**：00-Inbox → 01-Projects → 02-Areas → 04-Archive + Periodic/
- **Layer 2（路由层）**：AI Agent 负责分拣、路由、维护（技能定义在 .claude/skills/）
- **Layer 3（知识编译层）**：03-Resources/ 下的 LLM-Wiki 子库群

## 目录职责速查
| 目录 | 职责 | 写入者 |
|------|------|--------|
| 00-Inbox/ | 所有信息的唯一入口 | 人类 |
| 01-Projects/ | 有截止日期的活跃项目 | 人类 + AI |
| 02-Areas/ | 持续维护的生活领域 | 人类 + AI |
| 03-Resources/[topic]/raw/ | 原始资料（不可修改） | 人类 |
| 03-Resources/[topic]/wiki/ | 编译后的知识页面 | AI 专属 |
| 04-Archive/ | 已完结/过期内容 | AI 自动 |
| Periodic/ | 日/周/月周期笔记 | 人类 + AI |
| AI-Log/ | Agent 操作日志 | AI 专属 |

## 核心规则（绝对不可违反）
1. **永远不修改 raw/ 中的文件** — 原始资料是不可变的事实基线
2. **永远不删除文件** — 只移动到 04-Archive/（删除需明确二次确认）
3. **所有 AI 写入 wiki/ 的内容必须有来源标注** — frontmatter 中的 sources 字段
4. **00-Inbox/ 中的文件在分拣前不要读取用于其他目的** — 防止未分拣信息污染 Wiki
5. **每次修改 wiki/ 文件后必须追加到 AI-Log/compile-log.md**

## 信息生命周期分级
- **ephemeral**：生命周期 < 14 天（任务、提醒、临时记录）→ 完成或过期后移入 04-Archive/ephemeral/
- **operational**：项目生命周期内有效 → 项目完结时移入 04-Archive/projects/
- **reference**：持续参考价值，主题明确 → 送入对应 Wiki 子库编译
- **evergreen**：核心概念/原则，长期有效 → Wiki 中的永久页面

## Frontmatter 标准（所有文件必须包含）
```yaml
---
created: YYYY-MM-DD
updated: YYYY-MM-DD
type: [note|task|wiki-concept|wiki-entity|wiki-source|daily|weekly|project|area]
lifecycle: [ephemeral|operational|reference|evergreen]
status: [inbox|active|review|archived]
tags: []
sources: []      # wiki/ 文件专用，记录来源 raw/ 文件路径
origin: [manual|webclipper|voice|email|ai-generated]
---
```

## Wiki 子库目录

当前已有的 Wiki 子库（在 03-Resources/ 下）：

- \[在此列出你的子库，例如：ai-ml、finance、health、cooking、people\]

每个子库有独立的 CLAUDE.md，覆盖本文件的 Wiki 相关规则。

## 会话协议

### 会话开始

1. 读取 `AI-Log/sessions/` 最近 3 个会话摘要，了解历史上下文
2. 运行 `/context` 加载当前生命状态（今日待办、活跃项目、当周优先级）
3. 检查 `00-Inbox/` 是否有未处理文件，如有则提示用户运行 `/triage`

### 会话结束

1. 将本次会话的关键行动写入 `AI-Log/sessions/YYYY-MM-DD-HH.md`
2. 更新 `Periodic/daily/[今日].md` 的 Agent 日志区块
3. 如本次编译了 Wiki，更新对应子库的 `wiki/log.md`

## 禁止行为

- 不推断或猜测用户意图后直接执行重大操作，先描述计划等待确认
- 不在未经指令的情况下批量修改 wiki/ 文件（单次会话修改超过 20 个文件需确认）
- 不将 ephemeral 内容（购物清单、临时提醒）编译进 Wiki

text

```
---

# 第三章：Skills 完整设计（AI 的技能库）

<!--citation:24-->Claude Code Skill 是一个可复用的行为包。它捆绑了 slash 命令、脚本、参考文档和操作指令，Claude 自动加载这些内容。Skills 赋予 Claude 领域专业知识，无需每次会话重新提示工程。

以下是本系统的全套 Skills 定义。

---

## Skill 1：\`/triage\` — Inbox 分拣引擎（核心 Skill）

**文件路径**：\`.claude/skills/triage.md\`

\`\`\`markdown
# Skill: /triage — Inbox 智能分拣

## 触发方式
- 手动：用户输入 \`/triage\`
- 自动：SessionStart hook 检测到 00-Inbox/ 有新文件时提示

## 输入
00-Inbox/ 目录下所有 status != "processed" 的文件

## 执行流程

### Step 1: 扫描 Inbox
列出 00-Inbox/ 中所有文件（排除 _processed/ 子目录）。
对每个文件执行以下分析：

### Step 2: 内容分析（对每个文件）
读取文件内容，判断以下维度：

**2a. 时效性分析**
- 含具体日期/时间 + 动作动词（买、约、提醒、发送、完成）→ 标记为 \`ephemeral\`
- 含项目名称 + 任务描述，但无明确截止 → 标记为 \`operational\`
- 技术文章/论文/书摘/教程，无时效性 → 标记为 \`reference\`
- 原则/方法论/核心观点，可长期使用 → 标记为 \`evergreen\`

**2b. 主题识别**
- 识别内容所属领域（从 CLAUDE.md 的 Wiki 子库目录中匹配）
- 如无匹配子库，记录建议（"可能需要新建 [topic] 子库"）

**2c. 人物识别**
- 检测内容中是否涉及具体人名、联系人
- 如有，标记为同时需要更新 \`03-Resources/people/\`

**2d. 双重属性检测**
- 检查内容是否同时包含「任务属性」和「知识属性」
- 例：「下周前读完这篇论文」→ 既是任务，又含参考资料
- 此类文件执行「双重处理」：任务部分 + 知识部分分开路由

### Step 3: 路由决策

| 判定结果 | 目标位置 | 额外操作 |
|---------|---------|---------|
| ephemeral 任务 | 01-Projects/[匹配项目]/tasks.md 追加条目 | 无对应项目则到 02-Areas/[领域]/tasks.md |
| operational 笔记 | 01-Projects/[匹配项目]/ | 如无项目则提示用户是否新建 |
| reference 资料 | 03-Resources/[topic]/raw/articles/ | 自动触发 wiki-compile（见 Skill 2） |
| evergreen 内容 | 03-Resources/[topic]/raw/books/ 或 papers/ | 优先级队列编译 |
| 人物信息 | 03-Resources/people/raw/ | 触发人物页更新 |
| 闪念/想法 | Periodic/daily/[今日].md → ## 💡 Fleeting Ideas 区块 | 同时检查是否应升级为 Project |

### Step 4: 写入目标文件

**任务路由格式**（写入 tasks.md）：
```
- \[任务描述\] 📅 YYYY-MM-DD #来源:inbox #lifecycle:ephemeral

text

```
**资料路由操作**：
1. 将文件复制到目标 raw/ 目录（保持原始内容不变）
2. 在文件顶部添加标准 frontmatter（如缺失）
3. 将原文件移入 00-Inbox/_processed/

**闪念路由格式**（追加到日记）：
\`\`\`markdown
## 💡 Fleeting Ideas
- [想法内容] — 来自 Inbox，[原始文件名]
```

### Step 5: 生成分拣报告

在 AI-Log/triage-log.md 追加：

text

```
## [日期时间] Triage 操作
- 处理文件数：N
- 路由到 Projects：X 条任务
- 路由到 Wiki raw/：Y 个文件（待编译主题：[列表]）
- 路由到 Daily：Z 条闪念
- 人物更新：W 人
- 建议新建子库：[列表]（如有）
```

### Step 6: 提示用户

输出分拣摘要，并询问：

- 是否立即触发 `/wiki-compile` 编译新入库的 reference 材料
- 是否有需要人工确认的路由决策（模糊内容列出供用户选择）

## 错误处理

- 文件无法分类时：移入 00-Inbox/ 根目录并添加 `status: needs-review` frontmatter，不强制分类
- 内容过短（< 50 字）且无明确类型：默认路由到今日日记的 Fleeting Ideas，不进 Wiki

text

```
---

## Skill 2：\`/wiki-compile\` — 知识编译引擎

**文件路径**：\`.claude/skills/wiki-compile.md\`

\`\`\`markdown
# Skill: /wiki-compile — LLM-Wiki 编译

## 触发方式
- 手动：/wiki-compile [topic] [可选:文件路径]
- 自动：/triage 结束后，如有新 reference 材料进入 raw/

## 参数
- topic（必须）：Wiki 子库名称，对应 03-Resources/[topic]/
- file（可选）：指定编译单个文件，默认编译所有未编译文件

## 编译前检查
1. 读取 03-Resources/[topic]/CLAUDE.md（子库 schema）
2. 读取 03-Resources/[topic]/wiki/index.md（现有知识结构）
3. 读取 03-Resources/[topic]/wiki/log.md 末尾 10 条（最近编译历史）
4. 扫描 raw/ 目录，找出 frontmatter 中 \`compiled: false\` 或无 compiled 字段的文件

## 编译流程（对每个未编译文件）

### Phase A: 来源分析
读取原始文件，提取：
- 核心主张（3-5 条）
- 涉及的概念实体（名词）
- 涉及的人物/工具/机构实体
- 与已有 Wiki 页面的潜在关联
- 内容可信度评估（来源类型：学术/媒体/个人/未知）

### Phase B: 页面创建/更新
对每个识别出的概念/实体：

1. **检查 wiki/ 中是否已存在对应页面**
   - 已存在 → 追加新信息，更新 updated 字段，记录 contradiction（如有）
   - 不存在 → 创建新页面（使用标准模板）

2. **页面类型与模板**

**概念页模板** (wiki/concepts/[concept].md)：
\`\`\`yaml
---
type: wiki-concept
created: YYYY-MM-DD
updated: YYYY-MM-DD
lifecycle: evergreen
confidence: [high|medium|low]
sources:
  - ../raw/articles/xxx.md
related:
  - [[concept-2]]
  - [[entity-1]]
provenance: [extracted|inferred|ambiguous]
---
# [概念名称]

## 核心定义
[1-2 句精确定义]

## 关键要素
[要点列表]

## 与其他概念的关系
- [[相关概念]] — [关系描述]

## 来源与注记
> [!source] 来自 [来源文件名]
> [关键引用或摘要]

## 矛盾与待确认
> [!contradiction] [如有来源间的矛盾，记录在此]
```

**实体页模板** (wiki/entities/\[entity\].md)：

YAML

```
---
type: wiki-entity
entity-type: [person|tool|organization|paper]
tier: [1|2|3]   # 1=深度丰富, 2=基础信息, 3=存根
created: YYYY-MM-DD
updated: YYYY-MM-DD
sources: []
---
# [实体名称]

## 基本信息
[关键事实]

## 在知识库中的角色
[与其他概念的关联]

## 时间线
- [日期]：[事件]
```

### Phase C: 交叉引用更新

1. 扫描新增/修改页面中提到的所有 `[[wikilink]]`
2. 对每个引用的目标页面：追加反向引用（如该页面存在）
3. 对不存在的引用目标：在 wiki/index.md 的「待创建页面」列表中追加

### Phase D: 索引更新

更新 `wiki/index.md` ：

Markdown

```
## 最近更新
- [日期] [页面名] — [一句话描述变更]

## 概念页（[总数]）
[按字母序列出所有概念页链接]

## 实体页（[总数]）
[按类型分组列出]

## 待创建页面
[提到但尚未创建的概念列表]

## 知识空白
[lint 发现的内容缺口]
```

### Phase E: 原始文件标记

在编译完成的 raw/ 文件 frontmatter 中添加：

YAML

```
compiled: true
compiled-date: YYYY-MM-DD
compiled-pages:
  - wiki/concepts/xxx.md
  - wiki/entities/yyy.md
```

### Phase F: 日志写入

追加到 `wiki/log.md` ：

text

```
## [日期时间] 编译操作
- 来源文件：[文件名]
- 新建页面：[列表]
- 更新页面：[列表]
- 发现矛盾：[列表]
- 新增 wikilink：N 个
```

同时追加到全局 `AI-Log/compile-log.md` 。

## 成本控制模式

- 单文件编译（默认）：每次处理 1 个 raw 文件
- 批量编译： `/wiki-compile [topic] --batch 5` ，一次处理 5 个（适合周期回顾时使用）
- 索引编译： `/wiki-compile [topic] --index-only` ，只更新索引，不处理新文件（最便宜）

text

```
---

## Skill 3：\`/context\` — 会话状态加载

**文件路径**：\`.claude/skills/context.md\`

\`\`\`markdown
# Skill: /context — 加载当前生命状态

## 用途
在每次 Claude Code 会话开始时，建立对「当下」的完整感知。
解决问题：Claude 知道 Vault 结构，但不知道你「现在」在做什么、什么最重要。

## 执行步骤

1. **读取今日日记**（如存在）
   路径：Periodic/daily/[今日].md
   提取：今日待办、昨日遗留、今日重点

2. **读取本周周记**（如存在）
   路径：Periodic/weekly/[本周].md
   提取：本周目标、本周优先级

3. **扫描 01-Projects/_INDEX.md**
   识别：status: active 的项目列表 + 最近截止日期

4. **检查 00-Inbox/**
   统计：未处理文件数量（不读取内容，只统计）

5. **读取最近会话摘要**
   路径：AI-Log/sessions/ 最新 3 个文件
   提取：上次会话的待跟进事项

## 输出格式
```

📍 当前状态快照 \[日期\]

🎯 活跃项目（\[N\] 个）：

- \[项目名\] — \[状态\] — 截止：\[日期\]...

📋 今日待办（来自日记）：

- \[任务1\]...

📥 Inbox 待处理：\[N\] 个文件（运行 /triage 处理）

⏮️ 上次会话遗留：

- \[待跟进事项\]

💡 建议本次优先处理：\[基于截止日期和遗留事项的 AI 建议\]

---

## Skill 4：/daily-open — 每日开启仪式

**文件路径** ：`.claude/skills/daily-open.md`

Markdown

```
# Skill: /daily-open — 创建并初始化今日日记

## 用途
每天第一次打开 Vault 时运行，创建当日日记并填充上下文。

## 执行步骤

1. **检查今日日记是否存在**
   路径：Periodic/daily/[YYYY]/[YYYY-MM-DD].md
   - 已存在 → 跳到 Step 4
   - 不存在 → 继续

2. **从模板创建日记**
   使用 99-Meta/templates/daily-template.md

3. **自动填充以下区块**

   **📋 今日任务**（从所有活跃项目 tasks.md 提取今日或过期任务）：
```
- \[任务\] — 来自 项目名

text

```
**📅 日历事件**（如配置了日历集成，从 MCP 读取）

**🔄 昨日回顾**（读取昨日日记的完成情况）：
```

昨日完成：N 个任务 昨日未完成（已滚动到今日）：M 个

text

```
**📥 Inbox 状态**：
```

Inbox 待处理：\[N\] 个文件

text

```
4. **输出**
返回今日日记路径，提示用户在 Obsidian 中打开

## 日记模板标准结构

\`\`\`markdown
---
type: daily
date: YYYY-MM-DD
created: YYYY-MM-DD
lifecycle: ephemeral
---

# [YYYY-MM-DD] [星期几]

## 🌅 今日意图
> [今日最重要的一件事 — 手动填写]

## 📋 任务
<!-- /daily-open 自动填充 -->

## 📅 日程
<!-- 日历集成自动填充 -->

## 📥 待处理
<!-- Inbox 状态 -->

## 💡 Fleeting Ideas
<!-- /triage 自动追加 -->

## 📝 工作日志
<!-- 手动追加，自由记录 -->

## 🤖 Agent 日志
<!-- Claude Code 操作自动追加 -->

## 🌙 日终回顾
- 完成情况：
- 明日优先：
- 遗留给 AI：
```

text

```
---

## Skill 5：\`/weekly-review\` — 每周回顾与知识蒸馏

**文件路径**：\`.claude/skills/weekly-review.md\`

\`\`\`markdown
# Skill: /weekly-review — 每周回顾与知识蒸馏

## 用途
每周末（建议周日）运行，完成四件事：
1. 生成本周回顾
2. 批量编译本周积累的 raw 资料
3. 过期 ephemeral 内容归档
4. 项目状态审查

## Step 1: 本周数据汇总
读取本周所有日记（Periodic/daily/[本周7天].md），提取：
- 完成的任务总数
- 新进入 Inbox 的材料数量
- 已编译的 Wiki 页面数
- 活跃项目的进展

## Step 2: 生成周记
创建 Periodic/weekly/[YYYY-WNN].md，结构：
\`\`\`markdown
# Week [N] — [日期范围]

## 本周成果
[来自 Step 1 的汇总数据]

## 项目进展
[每个活跃项目的状态快照]

## 知识积累
[本周新编译的 Wiki 页面列表，按主题分组]

## 下周优先级
[基于项目截止日期和遗留任务的 AI 建议]

## 反思
> [留给人类手动填写]
```

## Step 3: 批量知识编译

对所有 Wiki 子库执行： `/wiki-compile [topic] --batch 10` 优先处理本周新进入 raw/ 的文件（按 created 日期过滤）

## Step 4: 过期内容归档

扫描全 Vault，找出：

- lifecycle: ephemeral + created 日期 > 14 天前 + status!= archived
- 将这些文件移入 04-Archive/ephemeral/\[YYYY-MM\]/

## Step 5: 项目状态审查

扫描 01-Projects/，对每个项目检查：

- 截止日期已过且 status!= completed → 提示用户确认是否延期/关闭
- 30 天内无更新 → 标记为 `status: stalled` ，提示用户

## Step 6: Wiki Lint（健康检查）

对所有 Wiki 子库运行 lint：

- 死链检测（wikilink 指向不存在的文件）
- 孤立页检测（没有被任何页面引用的页面）
- 矛盾标记汇总（所有 \[!contradiction\] callout）
- 低置信度页面列表（confidence: low 的概念页）

输出：Lint 报告追加到 AI-Log/ 本周目录

text

```
---

## Skill 6：\`/lint\` — 系统健康检查

**文件路径**：\`.claude/skills/lint.md\`

\`\`\`markdown
# Skill: /lint — 全系统健康检查

## 用途
随时运行，检查整个 Vault 的结构健康状况。
建议：每月运行一次完整 lint。

## 检查项

### Layer 1 检查（生活管理层）
- [ ] 00-Inbox/ 中有无滞留 > 7 天的文件
- [ ] 01-Projects/ 中有无过期未关闭的项目
- [ ] 02-Areas/ 中有无 > 90 天未更新的领域笔记
- [ ] 04-Archive/ 归档文件的 frontmatter 是否完整

### Layer 3 检查（Wiki 层）
对每个 Wiki 子库：
- [ ] 死链：[[wikilink]] 指向不存在的文件
- [ ] 孤立页：没有被引用的 wiki 页面
- [ ] 未编译原料：raw/ 中 compiled: false 的文件数量
- [ ] 矛盾汇总：所有 [!contradiction] callout 清单
- [ ] 置信度分布：high/medium/low 各占比

### 全局检查
- [ ] Frontmatter 缺失：无 type 字段的文件
- [ ] 循环引用：A 引用 B，B 引用 A（警告但不报错）
- [ ] 大文件：> 50KB 的 markdown 文件（可能需要拆分）

## 输出格式
生成报告文件：AI-Log/lint-[YYYY-MM-DD].md
包含所有检查结果 + 修复建议 + 优先级排序
```

---

## 第四章：Hooks 配置（自动化钩子）

**文件路径** ：`.claude/hooks/hooks.json`

JSON

```
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": ".*",
        "hooks": [
          {
            "type": "command",
            "command": "echo '=== Session Start ===' && ls 00-Inbox/ | wc -l | xargs -I{} echo 'Inbox 待处理文件数：{}'",
            "description": "显示 Inbox 待处理文件数"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write|Edit|Create",
        "hooks": [
          {
            "type": "command",
            "command": "echo \"[$(date '+%Y-%m-%d %H:%M')] 文件修改\" >> AI-Log/sessions/current-session.log",
            "description": "记录所有文件写入操作"
          }
        ]
      }
    ]
  }
}
```

Hooks 使用 `SessionStart` 和 `Stop` 钩子实现热缓存，这使得 Agent 在每次会话启动时能自动预加载上下文。

---

## 第五章：Wiki 子库专属 CLAUDE.md（以 ai-ml 为例）

**文件路径** ： `03-Resources/ai-ml/CLAUDE.md`

此文件覆盖根 CLAUDE.md 中的 Wiki 相关规则。

Markdown

```
# Wiki 子库：ai-ml（机器学习与 AI）

## 子库定位
本子库管理所有与 AI/ML 相关的专业知识。
覆盖范围：大语言模型、深度学习、AI 应用架构、AI 产品设计

## 排除范围（不属于本子库）
- AI 工具的使用教程（属于 03-Resources/tools/）
- AI 相关商业新闻（属于 02-Areas/career/ 或日记）
- AI 相关任务和项目（属于 01-Projects/）

## 页面类型
本子库特有的页面类型（在通用类型之外）：
- \`wiki-paper\`：论文页（包含 arxiv 链接、引用数、核心贡献）
- \`wiki-model\`：模型页（包含参数规模、发布日期、能力评测）
- \`wiki-benchmark\`：基准测试页

## 置信度规则
- \`high\`：来自同行评审论文或官方文档
- \`medium\`：来自知名博客、技术报告
- \`low\`：来自新闻报道、社交媒体、个人观点

## 实体分级（人物）
- Tier 1：核心研究者（> 5 篇被引用论文进入本库）
- Tier 2：重要贡献者（> 2 次被不同来源提及）
- Tier 3：存根（仅被提及 1 次）

## 编译优先级
优先编译：papers/ > books/ > articles/
低优先级：conversations/（AI 对话记录）

## 特殊处理规则
- 论文类文件：必须提取 Abstract、核心贡献、局限性三个字段
- 模型类文件：必须建立对应 wiki-model 页面，并追加到 wiki/entities/models-index.md
- 有明确发布日期的技术：在页面 frontmatter 中标注 \`release-date\`
```

---

## 第六章：People CRM 子库设计（GBrain 移植）

**文件路径** ： `03-Resources/people/CLAUDE.md`

People 子库是最特殊的 Wiki 子库，它的编译逻辑完全不同。

Markdown

```
# Wiki 子库：people（人物 CRM）

## 定位
管理所有与你有交集的人物信息。
这不是通讯录，而是关系智能层——记录每个人的背景、你们的互动、可能的协作点。

## 人物分级系统（Tier System）

### Tier 3：存根（自动创建）
触发条件：某人在任意 Inbox 内容中被提及 1 次
最小结构：
\`\`\`yaml
---
type: wiki-entity
entity-type: person
tier: 3
name: [姓名]
created: YYYY-MM-DD
mentioned-in: [来源文件]
---
# [姓名]
> [!stub] Tier 3 存根 — 仅被提及一次，待丰富
提及上下文：[简短描述]
```

### Tier 2：基础信息（半自动）

触发条件：同一人被 ≥ 2 个不同来源提及，或被你主动标记为 Tier 2 自动操作：

- 进行基础信息补充（职位、所在机构、公开信息）
- 建立与其他页面的关联链接

### Tier 1：深度档案（人工驱动）

触发条件：你主动标记某人为 Tier 1（重要合作者、导师、关键人脉） 结构：

Markdown

```
---
tier: 1
---
# [姓名]

## 背景
[详细背景]

## 互动历史
| 日期 | 事件 | 链接 |
|------|------|------|

## 共同项目
[[项目1]], [[项目2]]

## 价值观/风格观察
[你对这个人的判断和洞察]

## 待跟进
- [ ] [跟进事项]
```

## 编译规则

1. 从 raw/ 的会议记录、聊天记录中识别人名
2. 查询 wiki/\[person\].md 是否存在
3. 不存在 → 创建 Tier 3 存根
4. 已存在且为 Tier 3 → 检查是否满足 Tier 2 升级条件
5. 在互动历史表格中追加新条目（永不删除历史）
6. 更新相关项目/概念的双向链接

## 隐私规则

- 不自动从 raw/ 提取私人对话内容直接写入 wiki
- 只提取：姓名、组织、职位、互动日期、互动主题（不含内容）
- 如需记录具体对话要点，需人类手动补充到 wiki/\[person\].md

text

```
---

# 第七章：周期笔记模板设计

## 7.1 日记模板

**文件路径**：\`99-Meta/templates/daily-template.md\`

\`\`\`markdown
---
type: daily
date: <% tp.date.now("YYYY-MM-DD") %>
week: <% tp.date.now("YYYY-[W]WW") %>
created: <% tp.date.now("YYYY-MM-DD") %>
lifecycle: ephemeral
status: active
---

# <% tp.date.now("YYYY-MM-DD dddd") %>

## 🌅 今日意图
> 今天最重要的一件事：

---

## 📋 任务
<!-- /daily-open 自动填充活跃任务 -->

---

## 📥 Inbox
<!-- /daily-open 自动填充 Inbox 状态 -->

---

## 📝 工作日志
<!-- 自由记录，流式写作 -->

---

## 💡 Fleeting Ideas
<!-- /triage 自动追加闪念 -->

---

## 🤖 Agent 操作记录
<!-- Claude Code 操作自动追加 -->

---

## 🌙 日终回顾
- **完成了什么**：
- **未完成的原因**：
- **明日最重要**：
- **给 AI 的指令**：
```

## 7.2 周记模板

**文件路径** ： `99-Meta/templates/weekly-template.md`

Markdown

```
---
type: weekly
week: <% tp.date.now("YYYY-[W]WW") %>
date-range: <% tp.date.now("YYYY-MM-DD", -tp.date.now("d") + 1) %> ~ <% tp.date.now("YYYY-MM-DD", 7 - tp.date.now("d")) %>
created: <% tp.date.now("YYYY-MM-DD") %>
lifecycle: operational
---

# Week <% tp.date.now("[W]WW") %> 回顾

## 📊 本周数据
<!-- /weekly-review 自动填充 -->
- 任务完成：
- 新入库资料：
- Wiki 更新：

## 🎯 项目进展
<!-- /weekly-review 自动生成 -->

## 📚 本周学到的
<!-- 人类手动填写，或 AI 从 daily 提炼 -->

## ⚠️ 本周问题与阻塞
<!-- 人类手动填写 -->

## 🔭 下周计划
<!-- /weekly-review AI 建议 + 人类确认 -->

## 🌱 反思
<!-- 留白给人类 -->
```

---

## 第八章：插件配置清单（Obsidian Plugin Stack）

基于当前生态，本系统推荐以下插件组合：

## 8.1 必装插件

| 插件 | 作用 | 配置要点 |
| --- | --- | --- |
| **LifeOS** | PARA 结构 + 周期笔记的可视化创建入口 |  |

无需编程知识，简单可视化点击即可创建周期笔记和 PARA 笔记|  
| **Templater** |模板变量支持（日期、文件名等）|开启「新建文件自动触发 Templater」|  
| **Obsidian Tasks** |任务管理（跨文件查询、截止日期）|统一使用 `- [ ] 任务 📅 YYYY-MM-DD` 格式|  
| **Obsidian Bases** |原生数据库视图|  
驱动 wiki/meta/dashboard.base：原生数据库视图，自 Obsidian v1.9.10（2025年8月）起可用，替代 Dataview 作为主仪表盘。|  
| **Dataview** |动态查询（Bases 的补充，用于复杂查询）|用于生成 \_INDEX.md 等动态视图|  
| **Periodic Notes** |周期笔记管理（日/周/月/季/年）|与 LifeOS 配合，或单独使用|

## 8.2 强烈推荐插件

| 插件 | 作用 | 说明 |
| --- | --- | --- |
| **Obsidian Web Clipper** | 浏览器内容一键进 Inbox | 可将网页文章转换为 markdown 并直接放入 raw/articles/，本系统中改为进 00-Inbox/ |
| **Smart Connections** | 语义相似笔记推荐 | 使用嵌入进行语义搜索，写作时显示相关笔记，内置本地嵌入模型可离线使用 |
| **Claudian / Agent Client** | 在 Obsidian 内嵌入 Claude Code | 在 Vault 中嵌入 AI 编码 Agent，你的 Vault 成为 Agent 的工作目录——文件读写、搜索、bash、多步骤工作流开箱即用 |
| **Calendar** | 日历视图，快速跳转日记 | 与 Periodic Notes 联动 |
| **Obsidian Git** | Vault 版本控制 | 将整个 wiki 目录放入 Git，获得完整历史记录、回滚 bad ingest 的能力、以及 LLM 变更的 diff 审查 |

## 8.3 可选插件（根据需求）

| 插件 | 作用 | 适用场景 |
| --- | --- | --- |
| **Obsidian Copilot** | Vault 级语义搜索 + Agent 模式 | 多模型聊天支持 @笔记引用，付费 Plus 档添加了具有自主工具调用、长期记忆和基于时间查询的 Agent 模式 |
| **Cortex** | Obsidian 内置 Claude Code 侧边栏 | 在 Vault 内放置 Claude Code Agent，在侧边栏与 Claude 聊天，Claude 可以读取、写入、创建、移动和组织笔记 |
| **Full Calendar** | 完整日历视图（任务可视化） | 需要日程可视化时 |

---

## 第九章：搜索层配置（QMD）

当 Wiki 子库增长超过 100 个页面后，纯文件系统搜索会变慢。

Shopify CEO Tobi Lutke 构建了 QMD——一个用于 markdown 文件的本地搜索引擎，使用混合 BM25/向量搜索加 LLM 重排序。Karpathy 推荐它作为 LLM Wiki 的搜索层。它同时提供 CLI 和 MCP 服务器，让 Claude Code 能高效导航大型 Wiki。通过将 `qmd` 命令教给 Claude Code，可让其搜索 Vault 中的笔记，这比 Obsidian 内置搜索快得多。

**配置方法** （在根 CLAUDE.md 中添加）：

Markdown

```
## 搜索工具配置
当需要搜索 Vault 内容时：
1. 优先使用 \`qmd search "[查询词]" --path ~/ObsidianVault/03-Resources/[topic]/\` 进行 Wiki 子库内搜索
2. 跨 Wiki 搜索：\`qmd search "[查询词]" --path ~/ObsidianVault/03-Resources/\`
3. 全 Vault 搜索：\`qmd search "[查询词]" --path ~/ObsidianVault/\`
4. 如 qmd 未安装，退化为 grep 搜索

qmd 安装：brew install qmd（macOS）
```

---

## 第十章：移动端快速捕获方案

Obsidian 移动端体验是整个系统的弱点。以下是三个可行方案：

## 方案 A：usememos + LifeOS 集成（推荐）

LifeOS 支持与 usememos 结合，实现快速移动端记录的日记功能。

**部署步骤** ：

1. 用 Docker 自部署 usememos 实例（或使用官方 demo）
2. 在 LifeOS 插件中配置 usememos API 地址
3. 手机上打开 usememos Web App（添加到主屏幕）
4. 闪念直接在 usememos 写，LifeOS 自动同步到当日日记

## 方案 B：Telegram Bot → Inbox（技术方案）

text

```
手机 Telegram → Bot → Python 脚本 → 写入 00-Inbox/[timestamp].md → iCloud/Syncthing 同步 → 本地 Vault
```

**Bot 指令设计** ：

- 直接发文字 → 进 Inbox（默认）
- `/task 买牛奶 @明天` → 直接生成 ephemeral 任务格式
- `/idea [内容]` → 进 Inbox 并标记为 fleeting
- 发图片/语音 → 进 Inbox/assets/

## 方案 C：iOS Shortcuts（最简单）

创建一个 Shortcut：

1. 触发：共享表单（接收网页/文本/图片）
2. 处理：生成带 frontmatter 的 markdown 内容
3. 保存到：iCloud/ObsidianVault/00-Inbox/\[时间戳\].md

---

## 第十一章：系统启动手册（从零到运行）

## Phase 0：环境准备（约 30 分钟）

Bash

```
# 1. 安装必要工具
npm install -g @anthropic-ai/claude-code   # Claude Code
brew install qmd                            # 搜索引擎（macOS）
brew install git                            # 版本控制

# 2. 创建 Vault 目录
mkdir -p ~/ObsidianVault
cd ~/ObsidianVault

# 3. 初始化 Git
git init
echo "00-Inbox/_processed/" >> .gitignore
echo "99-Meta/assets/" >> .gitignore
echo ".DS_Store" >> .gitignore
git add . && git commit -m "init: vault structure"
```

## Phase 1：目录骨架搭建（约 15 分钟）

Bash

```
# 创建完整目录结构
mkdir -p {00-Inbox/_processed,01-Projects,02-Areas/{health,finance,family,career},03-Resources,04-Archive/{projects,ephemeral},Periodic/{daily,weekly,monthly,quarterly,yearly},99-Meta/{assets,templates,bases,scripts,graphs},AI-Log/sessions}

# 创建 .claude 目录和 skills
mkdir -p .claude/{skills,hooks}

# 创建占位文件（防止空目录被 git 忽略）
touch 03-Resources/_META-INDEX.md
touch AI-Log/triage-log.md
touch AI-Log/compile-log.md
```

## Phase 2：核心文件创建（约 60 分钟）

按本文档第二至六章的内容，依次创建：

1. `CLAUDE.md` （根宪法）
2. `.claude/skills/triage.md`
3. `.claude/skills/wiki-compile.md`
4. `.claude/skills/context.md`
5. `.claude/skills/daily-open.md`
6. `.claude/skills/weekly-review.md`
7. `.claude/hooks/hooks.json`
8. `99-Meta/templates/daily-template.md`
9. `99-Meta/templates/weekly-template.md`

## Phase 3：Obsidian 配置（约 20 分钟）

1. 打开 Obsidian，将 `~/ObsidianVault` 添加为新 Vault
2. 安装插件（按第八章清单，优先安装必装插件）
3. 配置 Templater：
- Template folder location： `99-Meta/templates`
	- 开启 "Trigger Templater on new file creation"
5. 配置 Periodic Notes：指向 `Periodic/` 各子目录
6. 配置 LifeOS：设置 PARA 目录路径

## Phase 4：创建第一个 Wiki 子库（约 30 分钟）

以你最常用的专业领域为例（假设是 `ai-ml` ）：

Bash

```
mkdir -p 03-Resources/ai-ml/{raw/{articles,papers,books,conversations},wiki/{concepts,entities,sources,comparisons},outputs}
touch 03-Resources/ai-ml/CLAUDE.md
touch 03-Resources/ai-ml/wiki/index.md
touch 03-Resources/ai-ml/wiki/log.md
```

然后按第五章模板填写 `03-Resources/ai-ml/CLAUDE.md` 。

## Phase 5：首次运行测试（约 20 分钟）

Bash

```
# 进入 Vault，启动 Claude Code
cd ~/ObsidianVault
claude

# 在 Claude Code 中依次测试：
> /context                         # 验证状态加载
> /daily-open                      # 创建今日日记
# 手动往 00-Inbox/ 放一个测试文件
> /triage                          # 测试分拣
# 往 03-Resources/ai-ml/raw/articles/ 放一篇文章
> /wiki-compile ai-ml              # 测试编译
```

## Phase 6：建立操作习惯（持续）

**每日习惯** （约 5 分钟）：

- 早晨：运行 `/daily-open`
- 全天：所有信息 → `00-Inbox/`
- 睡前：运行 `/triage` （或设置提醒）

**每周习惯** （约 15 分钟）：

- 周日：运行 `/weekly-review`
- 确认过期任务、关闭已完结项目

**随时** ：

- 看到好文章：Web Clipper → 00-Inbox/
- 有想法：直接扔 00-Inbox/ 或 usememos

---

## 第十二章：已知风险与防御设计

## 风险 1：AI 批量修改导致 Vault 损坏

一篇标题为「Claude + Obsidian：黑暗面，肆意破坏」的帖子获得了 78 个赞和 101 条评论——很多人深有同感。Vault 损坏是真实存在的风险。

**防御措施** ：

- Obsidian Git 插件开启自动提交（每小时一次）
- CLAUDE.md 中明确：单次会话修改超过 20 个文件需用户确认
- `raw/` 目录设置为只读（ `chmod -R 444 03-Resources/*/raw/` ）
- 敏感操作前 Claude 必须先描述计划，等待确认

## 风险 2：Wiki 重复/近似条目问题

去重问题是没人一开始就谈的隐患：「最大的挑战不是构建记忆层，而是去重。同一话题在 10 次会话中讨论会产生 10 个几乎相同的记忆条目。我最终加入了「保存前先搜索」步骤。」

**防御措施** ：

- `wiki-compile` Skill 的 Phase B 中强制先搜索 wiki/ 中的相似页面
- 使用 qmd 进行语义相似度检测（ `qmd similar "[新页面标题]"` ）
- 每月 `/lint` 检查重复页面

## 风险 3：token 成本失控

一篇 2000 字文章的编译大约需要 3000-6000 个 token（Claude Code Sonnet）。按当前定价，处理 50 篇文章的成本约为 0.15-0.30 美元。查询操作更便宜，100 页 Wiki 的 lint 约需 0.10 美元。

**防御措施** ：

- 路由分拣（ `/triage` ）用小模型（Haiku 级别）
- Wiki 编译（ `/wiki-compile` ）用中等模型（Sonnet 级别）
- 批量操作（ `--batch` ）优于单次多次调用
- 设置月度 token 预算提醒

## 风险 4：系统复杂度让人望而却步

每个开发者都有废弃知识系统的墓地——Notion 数据库有 200 页但三个月后没有更新，书签文件夹有 500 个链接但没有摘要，Obsidian vault 有前景勃勃的图谱但已经过时。

**防御措施** ：

- **Phase 1 原则** ：先只建一个 Wiki 子库，跑通整个流程，再扩展
- **最小可用集** ：CLAUDE.md + triage Skill + wiki-compile Skill，三个文件就能启动
- **渐进式复杂度** ：Skills 可以按需添加，不要一次性全部实现

---

## 附录 A：\_META-INDEX.md 模板

Markdown

```
---
type: meta-index
updated: YYYY-MM-DD
---

# 知识库全局导航

## Wiki 子库目录
| 子库 | 领域 | 页面数 | 最近更新 | 状态 |
|------|------|--------|---------|------|
| [[03-Resources/ai-ml/wiki/index\|ai-ml]] | 机器学习/AI | - | - | active |
| [[03-Resources/finance/wiki/index\|finance]] | 个人理财 | - | - | active |
| [[03-Resources/people/wiki/index\|people]] | 人物 CRM | - | - | active |

## 跨领域查询入口
- 问 AI 跨域问题时，先读本文件，再通过 [[index]] 链接深入子库
- 使用 \`qmd search "[查询]" --path 03-Resources/\` 进行跨库语义搜索

## 最近重要更新
<!-- /weekly-review 自动追加 -->

## 建议扩展的子库
<!-- /triage 发现内容无匹配子库时自动追加 -->
```

---

## 附录 B：系统演进路线图

text

```
Month 1（建立习惯）
├── 只用：00-Inbox + /triage + 1个 Wiki 子库
├── 目标：每天往 Inbox 扔东西，每周运行一次 /triage
└── 成功标准：Wiki 子库有 20+ 页面，Inbox 不积压

Month 2（扩展覆盖）
├── 增加：2-3 个 Wiki 子库 + /weekly-review 习惯
├── 增加：People CRM 子库
└── 成功标准：每周回顾成为固定习惯

Month 3（深度优化）
├── 增加：QMD 搜索层
├── 增加：Git 自动备份
├── 优化：CLAUDE.md 根据实际使用调整
└── 成功标准：能用自然语言查询跨库知识

Month 6（系统成熟）
├── Wiki 子库 5+ 个，总页面 200+
├── 开始产出：基于 Wiki 的 /outputs（文章、报告）
└── 成功标准：感觉 Vault「知道」你的历史，查询结果超出预期
```

---

这套架构的本质是：把 Obsidian Vault 变成 24×7 AI Agent 不是关于某种疯狂的自动化栈，而是三个简单的决定：投入一个认真维护的 Vault；让 Claude Code 安全地看到它；用一个 markdown 文件教会它你的工作方式和你想要什么帮助。

**你现在拥有的，是一个可以直接执行的完整设计文档** 。从 Phase 0 开始，两个小时内可以完成骨架搭建，第一天就能跑通 Inbox → Triage → Wiki 的完整流程。


