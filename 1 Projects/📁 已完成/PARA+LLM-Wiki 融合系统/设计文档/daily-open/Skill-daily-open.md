---
aliases: [Skill 5 /daily-open, 每日开启仪式]
created: 2026-06-01
type: design
topic: daily-open
parent: "[[03-Skills 完整设计]]"
tags: [design, daily-open, skill]
---

# Skill 5: `/daily-open` — 每日开启仪式

> 从 [[03-Skills 完整设计]] 提取

**文件路径**: `.claude/skills/daily-open/daily-open.md`

---

## 使用方式

```
/daily-open              # 检查/创建今日日记
/daily-open --dry-run    # 仅预览
```

## 用途

每天第一次打开 Vault 时运行，创建当日日记并填充上下文。

---

## 执行步骤

| # | 步骤 | 说明 |
|:--:|------|------|
| 1 | 检查日记 | `Periodic/daily/YYYY/YYYY-MM-DD.md`，已存在→跳到4 |
| 2 | 创建目录 | 确保年份目录存在 |
| 3 | 模板创建 | 从模板生成日记 |
| 4 | 自动填充 | 任务 + Inbox + 昨日回顾 |
| 5 | 输出摘要 | 日记路径 + 统计 |

---

## 自动填充

| 区块 | 来源 | 说明 |
|------|------|------|
| 📋 任务 | `1 Projects/` 活跃项目 | 今日/过期任务 |
| 📥 Inbox | `0 Inbox/` 统计 | 文件数量+列表 |
| 🔄 昨日回顾 | 昨日日记 `## 🌙 日終回顧` | 滚动遗留任务 |

---

> 📎 关联: [[daily-open-使用指南\|使用指南]] | [[../../.claude/skills/daily-open/daily-open.md\|实现]]
