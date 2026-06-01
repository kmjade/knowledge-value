---
aliases: [Skill 5 /daily-open, 每日开启仪式]
created: 2026-06-01
type: design
topic: daily-open
parent: "[[03-Skills 完整设计]]"
tags: [design, daily-open, skill]
---
# Skill: /daily-open — 创建并初始化今日日记

## 用途
每天第一次打开 Vault 时运行，创建当日日记并填充上下文。

## 执行步骤

1. **检查今日日记是否存在**
   路径：Periodic/daily/[YYYY]/[YYYY-MM-DD].md
   - 已存在 → 跳到 Step 4
   - 不存在 → 继续

2. **从模板创建日记**
   使用 `_Meta/templates/Periodic/daily-template.md`

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