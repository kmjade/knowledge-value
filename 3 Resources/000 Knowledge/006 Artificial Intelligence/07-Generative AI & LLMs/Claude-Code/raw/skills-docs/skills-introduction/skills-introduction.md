---
title: Claude Skills 简介
aliases: [Skills Introduction, Skills 介绍]
tags: [claude-code, skills, introduction, getting-started]
source: https://mp.weixin.qq.com
created: 2026-05-26
updated: 2026-06-01
type: reference
status: evergreen
---

# Claude Skills 简介

> Claude Code Skills 是什么、为什么需要、如何开始——从单体 CLAUDE.md 到模块化 Skills 体系的入门指南。

---

## 一、背景问题

### CLAUDE.md 的困境

随着项目复杂化，单一的 CLAUDE.md 逐渐膨胀：

```
CLAUDE.md (628 行)
├── 语言规范要求
├── 上下文检索机制（7 步强制清单）
├── 开发流程（研究→计划→实施→验证→提交）
├── 强制验证机制
├── 代码质量标准
├── API 设计规范
├── 多租户隔离规则
├── CRUD 生成规范
└── 工具集成说明
```

**核心问题**：每次对话加载全部 628 行 → **固定消耗 ~25,000 tokens**，无论任务需要与否。

### Token 浪费

```
写文档任务：
  需要：语言规范（200 行）
  加载：全部 628 行（含 API 规范、CRUD 规则、多租户...）
  → 浪费 80%+

代码审查任务：
  需要：审查标准 + API 规范（~400 行）
  加载：全部 628 行
  → 浪费 35%+
```

---

## 二、解决方案：Claude Skills

### 核心概念

> Claude Skills 是**可复用的行为包**——它捆绑了指令、参考文档和操作规范，Claude 按需自动加载。Skills 赋予 Claude 领域专业知识，无需每次会话重新提示工程。

### 简单类比

```
CLAUDE.md  = 一本百科全书（每次查资料都要翻完整本）
Skills     = 一套专题手册（需要什么拿什么）
```

### 与 CLAUDE.md 的关系

```
实施前：
  .claude/CLAUDE.md (628 行)
  └── 所有规则混在一起

实施后：
  .claude/CLAUDE.md (~100 行)  ← 精简为索引
  └── 指向 → skills/*/SKILL.md  ← 8 个专题 Skill
```

---

## 三、核心特点

### 1. 单一职责

每个 Skill 专注一个主题：

```
chinese-first-rule          → 只管语言规范
context-retrieval-checklist → 只管检索流程
five-stage-workflow         → 只管开发流程
mall-api-development        → 只管 API 设计
```

### 2. 按需加载

Claude 根据任务类型自动选择相关 Skills：

```
编写文档    → 加载：chinese-first-rule
开发 API    → 加载：chinese-first-rule, context, workflow, api, crud...
代码审查    → 加载：chinese-first-rule, code-review, api
```

未使用的 Skills → **零 Token 消耗**

### 3. 渐进式学习

```
第 1 轮：加载摘要和核心原则
第 2 轮：应用核心规则
第 3 轮：深入高级特性
...
→ 内容逐步展开，而非一次性倾倒
```

### 4. 独立更新

```
修改 API 规范：
  ├── 只改 mall-api-development/SKILL.md
  ├── 不影响 chinese-first-rule
  └── 不影响任何其他 Skill
→ 变更影响范围小、风险低
```

---

## 四、为什么需要 Skills？

### 问题对比

| 方面 | 单一 CLAUDE.md | Skills 方案 |
|------|:---:|:---:|
| **Token 消耗** | 25,000 tokens/次 | ~7,000 tokens/次 |
| **加载内容** | 全部 | 按需（相关 Skill） |
| **更新影响** | 全局 | 单个 Skill |
| **适用性** | 所有任务相同内容 | 不同任务不同内容 |
| **可维护性** | 低（628 行定位困难） | 高（每个 Skill 独立文件） |

### 实际收益

| 指标 | 效果 |
|------|:---:|
| Token 成本 | 平均减少 **72%** |
| 响应速度 | 加载时间减少 **60%+** |
| 更新风险 | 影响范围缩小至单个文件 |
| 新增规则 | 只需新建一个 Skill 文件 |

---

## 五、适用场景

### ✅ 适合 Skills

- **复杂项目** — 多种任务类型、多套规范
- **团队协作** — 需要统一开发标准
- **频繁使用** — 每天多次与 Claude Code 交互
- **成本敏感** — Token 消耗需要控制

### ❌ 不一定需要

- **单一任务类型** — 只做一种简单任务
- **低频使用** — 偶尔使用 Claude Code
- **极简项目** — 规范不超过 100 行

---

## 六、快速开始

### 第一步：理解核心概念

1. **Skills 是什么？** — 可复用的行为包，按需加载
2. **Skills 如何工作？** — 惰性加载 → 渐进式披露
3. **Skills 能带来什么？** — Token 节省 72%，速度提升 60%+

### 第二步：评估是否适合

问自己：
- 我的 CLAUDE.md 是否超过 200 行？
- 是否有多个独立的主题/规范？
- 团队是否需要统一的标准？

如果 2+ 个答案是"是" → 适合 Skills。

### 第三步：开始实施

1. 阅读 [[skills-implementation|Skills 实施方案]] — 五步完整指南
2. 阅读 [[skills-design-principles|Skills 设计原则]] — 七项核心原则
3. 识别 CLAUDE.md 中的独立模块
4. 按步骤拆分、建目录、测试

---

## 相关

| 文档 | 内容 |
|------|------|
| [[skills-features|Skills 核心特性]] | Token 效率 · 四种注入模式 · 一致性与速度 |
| [[skills-mechanism|Skills 工作原理]] | 加载机制 · 执行流程 |
| [[skills-implementation|Skills 实施方案]] | 从 CLAUDE.md 迁移的五步指南 |
| [[skills-design-principles|Skills 设计原则]] | 7 项设计原则 + 正反例 |
| [[skills-best-practices|Skills 最佳实践]] | 使用与维护建议 |
| [[skills-vs-mcp|Skills vs MCP]] | 两种扩展机制对比 |
