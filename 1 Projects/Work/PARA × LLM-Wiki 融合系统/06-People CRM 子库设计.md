---
title: LifeOS × LLM-Wiki 融合系统 — 第六章：People CRM 子库设计
source: https://mp.weixin.qq.com/s/uEAegrqhsM1WKcqlVfuE2w
author:
created: 2026-05-26
tags:
  - clippings
  - llm-wiki
  - people-crm
chapter: 6
parent: "[[0 Inbox/PARA × LLM-Wiki 融合系统]]"
---

## 第六章：People CRM 子库设计（GBrain 移植）

**文件路径**：`03-Resources/people/CLAUDE.md`

People 子库是最特殊的 Wiki 子库，它的编译逻辑完全不同。

```markdown
# Wiki 子库：people（人物 CRM）

## 定位
管理所有与你有交集的人物信息。
这不是通讯录，而是关系智能层——记录每个人的背景、你们的互动、可能的协作点。

## 人物分级系统（Tier System）

### Tier 3：存根（自动创建）
触发条件：某人在任意 Inbox 内容中被提及 1 次
最小结构：
```markdown
---
type: wiki-entity
entity-type: person
tier: 3
name: [姓名]
created: YYYY-MM-DD
mentioned-in: [来源文件]
---
# [姓名]
> [!stub] Tier 3 存根 — 仅被提及一次，待丰富
提及上下文：[简短描述]
```
```

### Tier 2：基础信息（半自动）

触发条件：同一人被 ≥ 2 个不同来源提及，或被你主动标记为 Tier 2 自动操作：

- 进行基础信息补充（职位、所在机构、公开信息）
- 建立与其他页面的关联链接

### Tier 1：深度档案（人工驱动）

触发条件：你主动标记某人为 Tier 1（重要合作者、导师、关键人脉） 结构：

---
tier: 1
---
# [姓名]

## 背景
[详细背景]

## 互动历史
| 日期 | 事件 | 链接 |
|------|------|------|

## 共同项目
[[项目1]], [[项目2]]

## 价值观/风格观察
[你对这个人的判断和洞察]

## 待跟进
- [ ] [跟进事项]

## 编译规则

1. 从 raw/ 的会议记录、聊天记录中识别人名
2. 查询 wiki/[person].md 是否存在
3. 不存在 → 创建 Tier 3 存根
4. 已存在且为 Tier 3 → 检查是否满足 Tier 2 升级条件
5. 在互动历史表格中追加新条目（永不删除历史）
6. 更新相关项目/概念的双向链接

## 隐私规则

- 不自动从 raw/ 提取私人对话内容直接写入 wiki
- 只提取：姓名、组织、职位、互动日期、互动主题（不含内容）
- 如需记录具体对话要点，需人类手动补充到 wiki/[person].md
```

---

> 📂 返回 [[4 Archives/by-type/Projects/LifeOS × LLM-Wiki 融合系统|目录索引]]
