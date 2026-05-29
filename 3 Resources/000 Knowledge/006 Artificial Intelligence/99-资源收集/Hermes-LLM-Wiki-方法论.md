---
title: Hermes+LLM Wiki 方法论
created: 2026-05-27
source: "[[Hermes+LLM wiki +Obsidian 工作流]]"
tags: [topic/llm, para/resource/tech]
compiled: false
---

# Hermes+LLM Wiki 方法论

LLM Wiki 是一种知识库构建方法论，核心理念是：Obsidian 是 IDE，LLM 是程序员，Wiki 是代码库。

## 核心原则

### 1. 三层架构
- **Raw Sources (raw/)**: 原始资料层，由人类维护，LLM 只读
- **Wiki (wiki/)**: AI 编译维护的知识页面，LLM 独占
- **Schema (CLAUDE.md)**: 配置与约定

### 2. 三大操作
- **Ingest（导入）**: 将 raw/ 数据编译为 wiki 页面
- **Query（查询）**: 从 wiki 中检索综合回答
- **Lint（维护）**: 定期检查知识库健康状态

### 3. 复利增长
- 新资料不断补充
- 知识通过 wikilinks 建立连接
- 每次查询成果可回写为 wiki 页面

## 相关概念
- [[三层架构设计]]
- [[Ingest流程]]
- [[Query流程]]
- [[Lint流程]]
