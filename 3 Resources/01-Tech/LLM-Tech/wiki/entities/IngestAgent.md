---
title: IngestAgent
tags: [entity, tool]
type: entity
entity_type: tool
topic: llm
created: 2026-05-27
modified: 2026-05-27
---

# IngestAgent

IngestAgent 是 LLM Wiki 中 Ingest 流程的参考 Python 实现。

## 核心功能
- 读取 raw/ 文件（compiled: false）
- 调用 LLM 提取概念、实体和关系
- 写入 wiki/ 目录（概念页、实体页、来源页）
- 更新 wiki/index.md 和 wiki/log.md

## 相关概念
- [[Ingest-Workflow]] - 导入工作流
- [[3 Resources/ai-ml/raw/articles/LLM-Wiki/LLM-Wiki]] - 方法论整体

## 相关实体
- [[0 Inbox/_processed/01-Tech/LLM-Tech/wiki/entities/Hermes-Agent]] - 所属框架
- [[QueryAgent]] - 同类实现
- [[LintAgent]] - 同类实现

## Sources
- [[LLM-Wiki-Ingest流程]]
