---
title: PARA × LLM-Wiki 融合系统 — 第三章：Skills 完整设计
source: https://mp.weixin.qq.com/s/uEAegrqhsM1WKcqlVfuE2w
author:
created: 2026-05-26
tags:
  - clippings
  - llm-wiki
  - skills
chapter: 3
parent: "[[0 Inbox/PARA × LLM-Wiki 融合系统]]"
---

## 第三章：Skills 完整设计（AI 的技能库）

Claude Code Skill 是一个可复用的行为包。它捆绑了 slash 命令、脚本、参考文档和操作指令，Claude 自动加载这些内容。Skills 赋予 Claude 领域专业知识，无需每次会话重新提示工程。

以下是本系统的全套 Skills 定义。

---

### Skill 1：`/triage` — Inbox 分拣引擎（核心 Skill）

**文件路径**：`.claude/skills/triage.md`

```markdown
# Skill: /triage — Inbox 智能分拣

## 使用方式
```markdown
/triage              # 扫描所有未处理文件
/triage --dry-run    # 仅预览，不执行移动
/triage --file "filename.md"  # 处理单个文件
```
```

## 触发方式
- 手动：用户输入 `/triage`
- 自动：SessionStart hook 检测到 0 Inbox/ 有新文件时提示

## 输入
0 Inbox/ 目录下所有 `status != "_processed"` 的文件

## 执行流程

### Step 1: 扫描 Inbox
列出 0 Inbox/ 中所有文件（排除 `_processed/` 子目录）。
对每个文件执行以下分析：

### Step 2: 内容分析（对每个文件）
读取文件内容，判断以下维度：

**2a. 时效性分析**
- 含具体日期/时间 + 动作动词（买、约、提醒、发送、完成）→ 标记为 `ephemeral`
- 含项目名称 + 任务描述，但无明确截止 → 标记为 `operational`
- 技术文章/论文/书摘/教程，无时效性 → 标记为 `reference`
- 原则/方法论/核心观点，可长期使用 → 标记为 `evergreen`

**2b. 主题识别**
- 识别内容所属领域（从 CLAUDE.md 的 Wiki 子库目录中匹配）
- 如无匹配子库，记录建议（"可能需要新建 [topic] 子库"）

**2c. 人物识别**
- 检测内容中是否涉及具体人名、联系人
- 如有，标记为同时需要更新 `2 Areas/people/`

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

### 特殊处理

#### Clippings (网页剪藏)
- 来源 URL → 提取到 frontmatter
- 创建时间 → 保留原始时间戳
- 标签 → 转换为 Obsidian tags

#### 人物信息
- 提取姓名、联系方式
- 创建/更新人物卡片
- 建立双向链接
  
### Step 4: 写入目标文件

**任务路由格式**（写入 tasks.md）：
- [任务描述] 📅 YYYY-MM-DD #来源:inbox #lifecycle:ephemeral

**资料路由操作**：
1. 将文件复制到目标 raw/ 目录（保持原始内容不变）
2. 在文件顶部添加标准 frontmatter（如缺失）
3. 将原文件移入 0 Inbox/_processed/

**闪念路由格式**（追加到日记）：

## 💡 Fleeting Ideas
- [想法内容] — 来自 Inbox，[原始文件名]

## Frontmatter 更新
处理后的文件添加：

```markdown
---
triaged: true
triaged_at: YYYY-MM-DDTHH:MM:SS
triaged_to: [目标路径]
original_path: [原始路径]
---
```
```

### Step 5: 生成分拣报告
在 AI-Log/triage-log.md 追加：

## [日期时间] Triage 操作
- 处理文件数：N
- 路由到 Projects：X 条任务
- 路由到 Wiki raw/：Y 个文件（待编译主题：[列表]）
- 路由到 Daily：Z 条闪念
- 人物更新：W 人
- 建议新建子库：[列表]（如有）

### Step 6: 提示用户
输出分拣摘要，并询问：
- 是否立即触发 `/wiki-compile` 编译新入库的 reference 材料
- 是否有需要人工确认的路由决策（模糊内容列出供用户选择）

## 错误处理
- 文件无法分类时：移入 0 Inbox/ 根目录并添加 `status: needs-review` frontmatter，不强制分类
- 内容过短（< 50 字）且无明确类型：默认路由到今日日记的 Fleeting Ideas，不进 Wiki

## 安全检查
在移动文件前执行：
1. 检查目标位置是否已存在同名文件
2. 检查文件是否有未保存的修改
3. 确认移动不会破坏现有的 wikilinks

```

---

### Skill 2：`/wiki-compile` — 知识编译引擎

**文件路径**：`.claude/skills/wiki-compile.md`

```markdown
# Skill: /wiki-compile — LLM-Wiki 编译

将 `raw/` 目录下的原始资料编译成结构化的 Wiki 知识库。

## 使用方式

/wiki-compile              # 编译所有子库
/wiki-compile ai-ml        # 编译指定子库
/wiki-compile --dry-run    # 仅预览，不执行
/wiki-compile --incremental  # 仅处理新增/修改的文件

## 核心理念

> AI 是"编译器"，不是对话伙伴。它的职责是将原始信息转换为结构化知识。

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
4. 扫描 raw/ 目录，找出 frontmatter 中 `compiled: false` 或无 compiled 字段的文件

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
```
```morkdown
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

**实体页模板** (wiki/entities/[entity].md)：

```markdown
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

### Phase C: 交叉引用更新

1. 扫描新增/修改页面中提到的所有 `[[wikilink]]`
2. 对每个引用的目标页面：追加反向引用（如该页面存在）
3. 对不存在的引用目标：在 wiki/index.md 的「待创建页面」列表中追加

### Phase D: 索引更新

更新 `wiki/index.md` ：

```markdown
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
```

### Phase E: 原始文件标记

在编译完成的 raw/ 文件 frontmatter 中添加：

```markdown
---
compiled: true
compiled-date: YYYY-MM-DD
compiled-pages:
  - wiki/concepts/xxx.md
  - wiki/entities/yyy.md
---
```
```

### Phase F: 日志写入

追加到 `wiki/log.md` ：

## [日期时间] 编译操作
- 来源文件：[文件名]
- 新建页面：[列表]
- 更新页面：[列表]
- 发现矛盾：[列表]
- 新增 wikilink：N 个

同时追加到全局 `AI-Log/compile-log.md` 。

## 成本控制模式

- 单文件编译（默认）：每次处理 1 个 raw 文件
- 批量编译： `/wiki-compile [topic] --batch 5` ，一次处理 5 个（适合周期回顾时使用）
- 索引编译： `/wiki-compile [topic] --index-only` ，只更新索引，不处理新文件（最便宜）

```

---

### Skill 3：`/context` — 会话状态加载

**文件路径**：`.claude/skills/context.md`

```markdown
# Skill: /context — 加载当前生命状态

```markdown
/context              # 加载完整上下文
/context --quick      # 快速加载（仅状态概览）
/context --projects   # 仅加载项目状态
/context --inbox      # 仅加载 Inbox 状态
```
```

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

📍 当前状态快照 [日期]

🎯 活跃项目（[N] 个）：
- [项目名] — [状态] — 截止：[日期]...

📋 今日待办（来自日记）：
- [任务1]...

📥 Inbox 待处理：[N] 个文件（运行 /triage 处理）

⏮️ 上次会话遗留：
- [待跟进事项]

💡 建议本次优先处理：[基于截止日期和遗留事项的 AI 建议]
```

---

### Skill 4：`/daily-open` — 每日开启仪式

**文件路径**：`.claude/skills/daily-open.md`

```markdown
# Skill: /daily-open — 创建并初始化今日日记

## 用途
每天第一次打开 Vault 时运行，创建当日日记并填充上下文。

## 执行步骤

1. **检查今日日记是否存在**
   路径：Periodic/daily/[YYYY]/[YYYY-MM-DD].md
   - 已存在 → 跳到 Step 4
   - 不存在 → 继续

2. **从模板创建日记**
   使用 _Meta/templates/Periodic/daily-template.md

3. **自动填充以下区块**

   **📋 今日任务**（从所有活跃项目 tasks.md 提取今日或过期任务）：
   - [任务] — 来自 项目名

   **📅 日历事件**（如配置了日历集成，从 MCP 读取）

   **🔄 昨日回顾**（读取昨日日记的完成情况）：
   昨日完成：N 个任务 昨日未完成（已滚动到今日）：M 个

   **📥 Inbox 状态**：
   Inbox 待处理：[N] 个文件

4. **输出**
   返回今日日记路径，提示用户在 Obsidian 中打开

## 日记模板标准结构

```markdown
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

### Skill 5：`/weekly-review` — 每周回顾与知识蒸馏

**文件路径**：`.claude/skills/weekly-review.md`

```markdown
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
- 将这些文件移入 04-Archive/ephemeral/[YYYY-MM]/

## Step 5: 项目状态审查

扫描 01-Projects/，对每个项目检查：

- 截止日期已过且 status!= completed → 提示用户确认是否延期/关闭
- 30 天内无更新 → 标记为 `status: stalled` ，提示用户

## Step 6: Wiki Lint（健康检查）

对所有 Wiki 子库运行 lint：

- 死链检测（wikilink 指向不存在的文件）
- 孤立页检测（没有被任何页面引用的页面）
- 矛盾标记汇总（所有 [!contradiction] callout）
- 低置信度页面列表（confidence: low 的概念页）

输出：Lint 报告追加到 AI-Log/ 本周目录
```

---

### Skill 6：`/lint` — 系统健康检查

**文件路径**：`.claude/skills/lint.md`

```markdown
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

> 📂 返回 [[4 Archives/by-type/Projects/LifeOS × LLM-Wiki 融合系统|目录索引]]
