---
aliases: [Skill 6 /weekly-review, 每周回顾]
created: 2026-06-01
type: design
topic: weekly-review
parent: "[[03-Skills 完整设计]]"
tags: [design, weekly-review, skill]
---

# Skill 6: `/weekly-review` — 每周回顾与知识蒸馏

> 从 [[03-Skills 完整设计]] 提取

**文件路径**: `.claude/skills/weekly-review/weekly-review.md`

---

## 使用方式

```
/weekly-review    # 执行完整周回顾
```

## 用途

每周末运行，完成四件事: 回顾+编译+归档+审查

---

## 六步流程

| Step | 内容 | 产出 |
|:----:|------|------|
| 1 | 本周数据汇总 | 任务/Inbox/Wiki 统计 |
| 2 | 生成周记 | `Periodic/weekly/YYYY-Www.md` |
| 3 | 批量知识编译 | `/wiki-compile [topic]` |
| 4 | 过期内容归档 | ephemeral > 14天 → 4 Archives/ |
| 5 | 项目状态审查 | stalled/overdue 检测 |
| 6 | Wiki Lint | 死链/孤立页/矛盾/低置信度 |

---

## 问题检测

| 检查 | 阈值 |
|------|:----:|
| 过期任务 | lifecycle: ephemeral + > 14 天 |
| 停滞项目 | 30 天无更新 |
| 过期项目 | deadline 已过 + 未完成 |
| 死链 | wikilink → 不存在 |
| 孤立页 | 0 入链 wiki 页面 |

---

> 📎 关联: [[weekly-review-使用指南\|使用指南]] | [[../../.claude/skills/weekly-review/weekly-review.md\|实现]]
