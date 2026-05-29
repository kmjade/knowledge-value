---
title: LLM Wiki Query 流程
created: 2026-05-27
source: "[[Hermes+LLM wiki +Obsidian 工作流]]"
tags: [topic/llm, para/resource/tech, workflow]
compiled: false
---

# LLM Wiki Query 流程

Query（查询）是从知识库中检索并综合回答的流程。

## Query 步骤

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

## QueryAgent 实现

参考 Python 实现 (QueryAgent):
- 接收自然语言问题
- 索引查找定位页面
- 深度阅读综合
- 返回带源的回答

## 相关概念
- [[LLM-Wiki-方法论]]
- [[Ingest流程]]
- [[Lint流程]]
