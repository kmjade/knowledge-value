---
title: 04-PARA 实践
tags: [obsidian/para, productivity]
created: 2026-05-25
aliases: [PARA in Obsidian]
---

# 04 - PARA 在 Obsidian 中的实践

> PARA 是 Tiago Forte 提出的知识组织方法：Projects、Areas、Resources、Archives。
> 比传统文件夹分类更灵活，非常适合 Obsidian。

## PARA 四层结构

```
仓库根目录/
├── 0 Inbox/            ← 快速捕获，暂时存放
├── 1 Projects/         ← 有截止日期的任务
├── 2 Areas/            ← 长期维护的领域
├── 3 Resources/        ← 参考资料  
├── 4 Archives/         ← 已完成/不活跃
├── _templates/         ← 模板
└── _meta/              ← 元数据/配置
```

## 各层详解

### 0 Inbox — 收件箱

快速捕获一切想法、灵感、待处理信息。

```markdown
---
title: 今日灵感-XXX
tags: [inbox]
created: 2026-05-25
---
```

> 核心原则：**先记下来，后面再分类**。每天/每周清空 Inbox。

### 1 Projects — 项目

有明确目标和截止日期的系列任务。

```
1 Projects/
├── 01-Learning/
│   ├── Obsidian 学习项目.md
│   └── Python 学习项目.md
├── 02-Work/
│   └── 2026 Q2 OKR.md
└── 03-Personal/
    └── 健身计划.md
```

**项目模板**：
```yaml
---
title: 项目名
tags: [project/active]
status: active       # active | on-hold | completed
priority: high
due: 2026-06-30
---
```

### 2 Areas — 领域

需要长期维护、没有截止日期的生活/工作领域。

```
2 Areas/
├── 01-Health/        ← 健康
├── 02-Career/        ← 职业
├── 03-Finance/       ← 财务
├── 04-Relationships/ ← 人际关系
├── 05-Learning/      ← 学习
└── 06-Lifestyle/     ← 生活
```

### 3 Resources — 资源

兴趣话题、参考资料、知识库。

```
3 Resources/
├── 01-Tech/          ← 技术
│   ├── AI-ML/
│   ├── Markdown/
│   └── Obsidian/
├── 02-Books/         ← 读书笔记
├── 03-Productivity/  ← 效率方法
└── 05-Reference/     ← 参考手册
```

### 4 Archives — 归档

已完成的项目、不再维护的领域、过时的资源。

```
4 Archives/
├── 2025/
├── 2026/
│   ├── 01-January/
│   └── 05-May/
└── Completed-Projects/
```

## 工作流

```
        捕获             整理             执行             归档
    ┌────────┐      ┌──────────┐     ┌──────────┐    ┌────────┐
    │ 0 Inbox│ ───→ │ 1-3 归类 │ ──→ │ 处理任务  │ ──→│4 Archive│
    └────────┘      └──────────┘     └──────────┘    └────────┘
         ↑                                               │
         └────────── 定期回顾 ←───────────────────────────┘
```

## 核心原则

1. **4 层足够** — 不要建超过 4 层深度的文件夹
2. **编号排序** — `1 Projects` `2 Areas` 保持顺序
3. **MOC 导航** — 复杂结构用 Map of Content 索引
4. **渐进整理** — 不要一次性完美，边用边调

## 相关笔记

- [[Obsidian 知识库总览]]
- [[3 Resources/productivity/raw/articles/Notion/02-核心概念/02-核心概念]] — Wikilink 与链接
- [[05-高级技巧]] — Dataview 增强 PARA
