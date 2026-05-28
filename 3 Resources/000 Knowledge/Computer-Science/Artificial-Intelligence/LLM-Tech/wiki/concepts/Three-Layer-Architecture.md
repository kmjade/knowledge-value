---
title: 三层架构
tags: [concept]
type: concept
created: 2026-05-27
modified: 2026-05-27
---

# 三层架构

LLM Wiki 采用三层分离架构，每层有明确的职责和访问权限，确保信息从原始资料到结构化知识的转化。

## 架构总览

```
┌─────────────────────────────────────────────────────────┐
│                   信息输入层 (Inbox)                       │
│                   0 Inbox/ (捕获与分拣)                   │
└─────────────────────────────────────────────────────────┘
                              ↓ /triage
┌─────────────────────────────────────────────────────────┐
│                   行动管理层 (PARA)                        │
│     1 Projects/ → 2 Areas/ → 3 Resources/ → 4 Archives/ │
└─────────────────────────────────────────────────────────┘
                              ↓ /wiki-compile
┌─────────────────────────────────────────────────────────┐
│                   知识编译层 (Wiki)                        │
│        3 Resources/[topic]/wiki/ (AI 编译产物)           │
└─────────────────────────────────────────────────────────┘
```

## 层级详解

### Layer 1: raw/ - 原始资料层
- 存储原始文档、文章摘录、论文笔记
- 人类维护，AI 只读
- 分类: articles/, papers/, books/, conversations/

### Layer 2: wiki/ - 知识编译层
- AI 生成和维护的知识页面
- 分为 concepts/, entities/, sources/ 三类
- 使用 wikilinks 建立知识连接

### Layer 3: Schema (CLAUDE.md) - 配置层
- 定义命名规范和 frontmatter 模板
- 三大操作: Ingest, Query, Lint

## 目录职责

| 目录 | 职责 | 维护者 | AI 权限 |
|------|------|--------|---------|
| raw/ | 原始资料 | 人类 | 只读 |
| wiki/ | 编译知识 | AI | 写入 |
| CLAUDE.md | Schema | 混合 | 参考 |

## 相关概念
- [[0 Inbox/_processed/01-Tech/LLM-Tech/wiki/concepts/LLM-Wiki]] - 方法论整体

## Sources
- [[LLM-Wiki-三层架构]]
