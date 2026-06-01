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
parent: "[[PARA+LLM-Wiki 融合系统]]"
---

## 第三章：Skills 完整设计（AI 的技能库）

Claude Code Skill 是一个可复用的行为包。它捆绑了 slash 命令、脚本、参考文档和操作指令，Claude 自动加载这些内容。Skills 赋予 Claude 领域专业知识，无需每次会话重新提示工程。

以下是本系统的全套 Skills 定义。

---

### Skill 1：`/triage` — Inbox 分拣引擎（核心 Skill）

**文件路径**：`.claude/skills/triage.md`

[[Skill-triage v2.0]]

---

### Skill 2：`/wiki-compile` — 知识编译引擎

**文件路径**：`.claude/skills/wiki-compile.md`

[[Skill-wiki-compile v2.0]]

---

### Skill 3：`/context` — 会话状态加载

**文件路径**：`.claude/skills/context.md`

[[Skill-context v2.0]]

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
