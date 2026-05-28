---
title: Ingest 导入流程
tags: [concept, workflow]
type: concept
created: 2026-05-27
modified: 2026-05-27
---

# Ingest 导入流程

Ingest（导入）是将 raw/ 数据编译为 wiki 页面的核心流程。

## 步骤

### 1. 读取阶段
- 读取 raw/ 下的未编译文件（compiled: false）
- 提取关键要点和数据结构

### 2. 提取阶段
- **概念提取**: 识别核心概念和定义
- **实体提取**: 识别关键实体（工具、人物、产品）
- **关系提取**: 概念间、实体间、概念与实体的关系

### 3. 编译阶段
- 创建/更新 wiki/ 下的概念页、实体页、来源页
- 建立双向 wikilinks

### 4. 索引更新
- 更新 wiki/index.md 统计和索引
- 更新 wiki/log.md 记录编译操作

## 相关概念
- [[0 Inbox/_processed/01-Tech/LLM-Tech/wiki/concepts/LLM-Wiki]] - 方法论整体
- [[Query-Workflow]] - 查询流程
- [[Lint-Workflow]] - 维护流程

## 相关实体
- [[IngestAgent]] - Ingest 实现

## Sources
- [[LLM-Wiki-Ingest流程]]
