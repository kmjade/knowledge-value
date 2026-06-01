---
aliases:
  - Skill 3 /context
  - 会话状态加载
created: 2026-05-31
type: design
topic: context
parent: "[[03-Skills 完整设计]]"
tags:
  - design
  - context
  - skill
---

# Skill: `/context` — 会话状态加载

> 从 [[03-Skills 完整设计]] 提取

**文件路径**: `.claude/commands/context.md`

---

## 使用方式

```
/context              # 加载完整上下文
/context --quick      # 快速概览 (< 30s)
/context --projects   # 仅项目状态
/context --inbox      # 仅 Inbox 状态
/context --summary    # 操作建议 (阈值触发)
```

## 用途

在每次 Claude Code 会话开始时，建立对「当下」的完整感知。
解决问题: Claude 知道 Vault 结构，但不知道你「现在」在做什么、什么最重要。

---

## 执行步骤

| # | 步骤 | 来源 | 提取内容 |
|:--:|------|------|----------|
| 1 | 读取今日日记 | `Periodic/daily/YYYY/YYYY-MM-DD.md` | 今日待办、昨日遗留、今日重点 |
| 2 | 读取本周周记 | `Periodic/weekly/YYYY/YYYY-Www.md` | 本周目标、本周优先级 |
| 3 | 扫描活跃项目 | `1 Projects/` | status:active 项目 + 截止日期 |
| 4 | 检查 Inbox | `0 Inbox/` | 文件数量 (不读内容) |
| 5 | 读取会话历史 | `AI-Log/sessions/` 最新 3 个 | 待跟进事项 |

---

## 输出格式

```
📍 当前状态快照 [日期]

🎯 活跃项目（N 个）:
- [项目名] — [状态] — 截止: [日期]

📋 今日待办（来自日记）:
- [任务1]

📥 Inbox 待处理: N 个文件 (运行 /triage 处理)

⏮️ 上次会话遗留:
- [待跟进事项]

💡 建议本次优先处理: [基于截止+遗留的 AI 建议]
```

---

## 阈值规则

| 条件 | 阈值 | 建议 |
|------|:----:|------|
| Inbox 积压 | > 5 | 🟡 `/triage` |
| Inbox 积压 | > 20 | 🔴 立即分拣 |
| 最旧 Inbox | > 7 天 | 🟡 长期积压 |
| raw/ 未编译 | > 3 | 🟡 `/wiki-compile` |
| 距上次 lint | > 7 天 | 🟡 `/lint` |

---

## 与其他 Skill 配合

```
/context
  ├── Inbox 有积压？──→ /triage
  ├── raw/ 有新材料？──→ /wiki-compile
  ├── 距离上次 lint > 7天？──→ /lint
  └── 项目过期？──→ 优先处理或归档
```

---

> 📎 关联:
> - [[context-使用指南\|使用指南]]
> - [[../../.claude/commands/context.md\|Skill 实现]]
> - [[开发工作清单\|Phase 3: 100%]]
