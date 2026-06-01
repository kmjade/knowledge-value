---
aliases:
  - Triage 使用指南
  - 分拣指南
created: 2026-05-31
type: guide
topic: triage
parent: "[[PARA+LLM-Wiki 融合系统]]"
tags:
  - skill
  - triage
  - guide
---

# /triage 使用指南

> Inbox 智能分拣引擎 — 自动分析 + 路由 + 日志

---

## 快速开始

```bash
/triage                    # 扫描所有 Inbox，自动分拣
/triage --dry-run          # 仅预览分析结果，不移动
/triage --file "name.md"   # 处理单个文件
/triage --scope clippings  # 仅处理网页剪藏
```

---

## 使用场景

| 场景 | 命令 | 说明 |
|------|------|------|
| 日常清理 | `/triage` | 完整扫描 0 Inbox/ |
| 谨慎预览 | `/triage --dry-run` | 先看分析再决定 |
| 快速处理 | `/triage --file "x.md"` | 单个文件 |
| 批量剪藏 | `/triage --scope clippings` | 网页保存合集 |
| 闪念整理 | `/triage --scope fleeting` | 碎片想法 |

---

## 分拣逻辑

| 时效性 | 判定 | 目标 |
|--------|------|------|
| 🏃 ephemeral | 短期任务 + 截止日期 | `1 Projects/` tasks.md |
| 📋 operational | 项目笔记 | `1 Projects/` |
| 📚 reference | 文章/论文/书摘 | `3 Resources/[topic]/raw/` |
| 🌲 evergreen | 概念/方法论 | `3 Resources/[topic]/wiki/` |
| 👤 人物 | 联系人信息 | `0 Inbox/people/raw/` |

---

## 工作流建议

```
上午: /triage --dry-run    ← 预览 Inbox
确认: /triage              ← 执行分拣
后续: /wiki-compile [topic] ← 编译新资料
检查: /lint --quick        ← 验证状态
```

---

## 相关 Skills

| Skill | 关系 |
|-------|------|
| [[context-使用指南\|/context]] | 分拣前检查 Inbox 状态 |
| [[../.claude/skills/wiki-compile/wiki-compile.md\|/wiki-compile]] | 分拣后编译知识库 |
| [[../.claude/skills/lint/lint.md\|/lint]] | 分拣后健康检查 |

---

> 📎 关联: [[03-Skills 完整设计\|Skill 设计文档]] | [[开发工作清单\|Phase 1: 100%]]
