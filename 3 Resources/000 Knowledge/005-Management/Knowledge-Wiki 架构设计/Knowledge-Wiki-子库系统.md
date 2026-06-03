---
aliases:
  - Wiki 子库系统规范
  - Wiki Sub-library System
created: 2026-06-02
version: "1.0"
status: stable
type: design
parent: "[[PARA+LLM-Wiki 融合系统]]"
tags: [architecture, wiki, sub-library]
---

# Wiki 子库系统

> Wiki 子库的通用结构、页面类型和 CLAUDE.md 规范
> 拆分自 [[1 Projects/PARA+LLM-Wiki 融合系统/设计文档/PARA+LLM-Wiki 整合系统架构设计文档 v1.0]]

## 通用结构

```
3 Resources/[topic]/
├── CLAUDE.md          # 子库 Schema
├── raw/               # 原始资料（人类维护，AI 只读）
│   ├── articles/
│   ├── papers/
│   ├── books/
│   └── conversations/
├── wiki/              # 编译产物（AI 独占写入）
│   ├── index.md
│   ├── log.md
│   ├── concepts/
│   ├── entities/
│   └── sources/
└── outputs/
```

## 页面类型

- **概念页** `wiki/concepts/` — 知识最小单元，含 `## Sources`
- **实体页** `wiki/entities/` — 人物/工具/组织，含 `entity_type`
- **来源页** `wiki/sources/` — 原始资料溯源

## 子库 CLAUDE.md 模板

含子库定位、核心概念域、编译规则、UC-02 UDC 映射节。
