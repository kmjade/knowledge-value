---
aliases:
  - 信息生命周期
  - 时效性分类
created: 2026-05-27
type: concept
topic: productivity
status: reviewed
---

# Information Lifecycle (信息生命周期)

## 定义

信息生命周期是 LLM-Wiki 方法论中用于自动分拣信息时效性的四级分类体系，将信息分为 ephemeral（临时）、operational（运行中）、reference（参考）和 evergreen（常青），确保不同时效的信息得到不同的处理策略。

## 核心原理

### 四阶段模型

```
┌──────────────────────────────────────────────┐
│                                              │
│ ephemeral ──────┤  1-7 天                    │
│ (临时)          │  任务提醒、临时备忘          │
│                 │                            │
│      │          │                            │
│      ▼          │                            │
│ operational ────┤  1 周 - 3 月               │
│ (运行中)        │  项目笔记、会议记录           │
│                 │                            │
│      │          │                            │
│      ▼          │                            │
│ reference ──────┤  3 月 - 永久                │
│ (参考)          │  文章、书摘、网页保存         │
│                 │                            │
│      │          │                            │
│      ▼          │                            │
│ evergreen ──────┤  永久                       │
│ (常青)          │  编译后的知识、Wiki 页面       │
│                 │                            │
└──────────────────────────────────────────────┘
```

### 判定维度

| 维度 | ephemeral | operational | reference | evergreen |
|------|-----------|-------------|-----------|-----------|
| **时效性** | 数天 | 数周-数月 | 长期 | 永久 |
| **可复用性** | 不可复用 | 项目内复用 | 跨项目复用 | 通用知识 |
| **是否需要编译** | 否 | 否 | **是** | 已经是 |

## 关键要点

1. **ephemeral → tasks.md** — 自动追加到项目任务列表
2. **operational → 项目目录** — 项目结束后归档
3. **reference → raw/** — AI 编译为 wiki/ 页面
4. **evergreen → wiki/** — 持续更新维护

## 相关概念

- [[3 Resources/productivity/wiki/concepts/LLM-Wiki]] — 生命周期是 LLM-Wiki 的核心分类维度
- [[Semantic-Pollution]] — 不加区分的存储导致语义污染
- [[PARA-Method]] — PARA 的 Archives 层对应生命周期的末端

## 实践应用

- `/triage` Skill 自动识别时效性并路由
- `ephemeral` 7 天后可自动归档到 `_processed/`
- `reference` 编译后标记 `compiled: true`

## Sources

- [[3 Resources/productivity/raw/articles/LifeOS × LLM-Wiki 融合系统.md]]
- [[3 Resources/productivity/raw/articles/PARA + LLM-WIKI 架构，实现个人知识与生活管理的自动化革命.md]]
