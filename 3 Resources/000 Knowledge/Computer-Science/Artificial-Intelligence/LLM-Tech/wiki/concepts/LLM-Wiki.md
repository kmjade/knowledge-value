---
title: LLM Wiki 方法论
tags: [concept]
type: concept
created: 2026-05-27
modified: 2026-05-27
---

# LLM Wiki 方法论

LLM Wiki 是一种知识库构建方法论，核心理念是将 AI 视为"编译器"而非对话伙伴，将原始信息编译为结构化知识。

## 核心原则

### 三层架构
- **Raw Sources (raw/)**: 原始资料层，人类维护，LLM 只读
- **Wiki (wiki/)**: AI 编译维护的知识页面，LLM 独占
- **Schema (CLAUDE.md)**: 配置与约定

### 三大操作
- **Ingest（导入）**: 将 raw/ 数据编译为 wiki 页面
- **Query（查询）**: 从 wiki 中检索综合回答
- **Lint（维护）**: 定期检查知识库健康状态

### 复利增长
- 新资料不断补充
- 知识通过 wikilinks 建立连接
- 每次查询成果可回写为 wiki 页面

## 相关概念
- [[Three-Layer-Architecture]] - 三层架构设计
- [[Ingest-Workflow]] - 导入流程
- [[Query-Workflow]] - 查询流程
- [[Lint-Workflow]] - 维护流程

## 相关实体
- [[3 Resources/productivity/wiki/entities/Obsidian]] - IDE 工具
- [[0 Inbox/_processed/AI-Agent/Hermes-Agent/Hermes-Agent]] - 参考实现框架

## Sources
- [[Hermes-LLM-Wiki-方法论]]
