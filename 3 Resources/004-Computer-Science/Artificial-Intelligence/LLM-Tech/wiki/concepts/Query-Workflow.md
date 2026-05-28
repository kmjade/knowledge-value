---
title: Query 查询流程
tags: [concept, workflow]
type: concept
created: 2026-05-27
modified: 2026-05-27
---

# Query 查询流程

Query（查询）是从知识库中检索并综合回答的流程。

## 步骤

### 1. 问题理解
- 解析用户问题
- 确定所需的知识领域

### 2. 索引定位
- 读取 wiki/index.md
- 定位相关概念页、实体页

### 3. 深度阅读
- 读取定位到的 wiki 页面
- 提取相关信息

### 4. 综合回答
- 将多个来源的信息整合
- 提供带来源标注的回答

### 5. 回写（可选）
- 有价值的问答可回写为新的 wiki 页面
- 实现知识的持续增长

## 相关概念
- [[0 Inbox/_processed/01-Tech/LLM-Tech/wiki/concepts/LLM-Wiki]] - 方法论整体
- [[Ingest-Workflow]] - 导入流程
- [[Lint-Workflow]] - 维护流程

## 相关实体
- [[QueryAgent]] - Query 实现

## Sources
- [[LLM-Wiki-Query流程]]
