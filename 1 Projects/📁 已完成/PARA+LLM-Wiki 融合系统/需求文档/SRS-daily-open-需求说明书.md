---
aliases: [Daily-Open SRS, 每日仪式需求]
created: 2026-06-01
type: srs
topic: daily-open
parent: "[[PARA+LLM-Wiki 融合系统需求文档 v1.0]]"
tags: [srs, daily-open, requirements]
---

# /daily-open — 每日开启仪式 需求说明书

> 基于 [[Skill-daily-open|Skill 5 设计]]

**状态**: ✅ 已实施

---

## 1. 概述

### 1.1 目的

`/daily-open` 是每日会话启动的入口 Skill，自动创建当日日记并填充上下文（任务、Inbox、昨日回顾）。

### 1.2 范围

- 日记文件生命周期管理
- 五区块自动填充
- 昨日回顾滚动

---

## 2. 功能需求

| ID | 需求 | 描述 |
|:--:|------|------|
| DO-01 | 日记检查 | 检测 `Periodic/daily/YYYY/YYYY-MM-DD.md`，存在则跳过 |
| DO-02 | 目录创建 | 自动 `mkdir -p` 年份目录 |
| DO-03 | 模板生成 | 从标准模板创建日记 |
| DO-04 | 任务填充 | 扫描 `1 Projects/` 提取今日/过期任务 |
| DO-05 | Inbox 填充 | 统计 `0 Inbox/` 文件数+列表 |
| DO-06 | 昨日回顾 | 读取昨日 `## 🌙 日終回顧` 滚动遗留 |
| DO-07 | 摘要输出 | 返回日记路径+统计 |

---

## 3. 验收

| 条件 | ✅ |
|------|:--:|
| 日记不存在时自动创建 | |
| 已存在时不覆盖 | |
| 任务从活跃项目正确提取 | |
| Inbox 统计准确 | |
| 昨日回顾正确滚动 | |

---

> 📎 关联: [[Skill-daily-open\|设计]] | [[daily-open-使用指南\|使用指南]]
