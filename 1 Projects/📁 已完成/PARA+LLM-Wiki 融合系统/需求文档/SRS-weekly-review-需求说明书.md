---
aliases: [Weekly-Review SRS]
created: 2026-06-01
type: srs
topic: weekly-review
parent: "[[PARA+LLM-Wiki 融合系统需求文档 v1.0]]"
tags: [srs, weekly-review]
---

# /weekly-review — 每周回顾 需求说明书

> 基于 [[../设计文档/Skill 6-weekly-review|Skill 6 设计]]

**状态**: ✅ 已实施

---

## 1. 概述

每周末运行的周回顾流程：汇总+编译+归档+审查+健康检查。

## 2. 功能需求

| ID | 需求 | 描述 |
|:--:|------|------|
| WR-01 | 本周汇总 | 本周日记数据汇总 |
| WR-02 | 周记生成 | `Periodic/weekly/YYYY-Www.md` |
| WR-03 | 批量编译 | 触发 `/wiki-compile` |
| WR-04 | 过期归档 | ephemeral > 14天 → 4 Archives/ |
| WR-05 | 项目审查 | stalled/overdue 检测 |
| WR-06 | Wiki Lint | 死链/孤立/置信度 |

## 3. 验收

| 条件 | ✅ |
|------|:--:|
| 汇总本周数据正确 | |
| 周记生成无误 | |
| 过期内容正确归档 | |
| 停滞/过期项目检测 | |

---

> 📎 关联: [[../设计文档/Skill 6-weekly-review\|设计]] | [[weekly-review-使用指南\|使用指南]]
