---
title: LLM Wiki Ingest 流程
created: 2026-05-27
source: "[[Hermes+LLM wiki +Obsidian 工作流]]"
tags: [topic/llm, para/resource/tech, workflow]
compiled: false
---

# LLM Wiki Ingest 流程

Ingest（导入）是将 raw/ 数据编译为 wiki 页面的核心流程。

## Ingest 步骤

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

## IngestAgent 实现

参考 Python 实现 (IngestAgent):
- 读取 raw/ 文件
- 调用 LLM 提取结构
- 写入 wiki/ 目录
- 更新索引和日志

## 相关概念
- [[LLM-Wiki-方法论]]
- [[Query流程]]
- [[Lint流程]]
