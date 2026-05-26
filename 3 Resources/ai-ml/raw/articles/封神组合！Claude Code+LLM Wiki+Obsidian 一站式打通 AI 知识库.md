---
title: "封神组合！Claude Code+LLM Wiki+Obsidian 一站式打通 AI 知识库"
created: 2026-05-26
source: "https://mp.weixin.qq.com/s/d-z-QLUF7g0aL4LorqYykg"
tags: [clippings, topic/ai-agent, topic/llm]
compiled: true
compiled-date: 2026-05-27
compiled-pages:
  - wiki/entities/Claude-Code.md
  - wiki/sources/source-Claude-Code-Wiki.md
---

# 封神组合！Claude Code+LLM Wiki+Obsidian 一站式打通 AI 知识库

之前分享过关于 hermes，LLM wiki，Obsidian 相关的文章。但我发现了一些缺陷：其一，三个软件切来切去非常麻烦；其二，用软件实现 LLM wiki 功能固定无法更改。

## 核心观点

- LLM wiki 主要是 Karpathy 提出的概念，最大作用是给知识库装上记忆的工作流
- Obsidian 是静态知识库没有记忆，每次调用需查看整个知识库，烧 token 且慢
- 改用 Claude Code + Skills 实现 wiki，不再需要 Hermes，所有工作流都在一个软件中

## Wiki 工作流

由 Ingest、Query、Lint 三部分组成：
- **Ingest**：负责输入，内容整理，打标签，关联，摘要，索引
- **Query**：内容的搜索，生成图表等
- **Lint**：维护整个知识库，检查死链、不关联的链接

## 自定义目录结构

### Raw 输入
- articles：文章
- papers：论文
- transcripts：语音转文字、会议纪要
- meeting_notes：会议记录
- archive：原文存档
- assets：静态资源文件

### Wiki 处理
- concepts：概念
- entities：实体
- sources：摘要
- bridge：与原知识库打通
- index：索引
- log：操作日志

## 总结

用 Skills 实现 wiki 的方式非常灵活，目录和相关功能都可以更改。

## 相关概念
- [[3 Resources/ai-ml/raw/articles/LLM-Wiki/LLM-Wiki]]
- [[Ingest-Workflow]]
- [[Query-Workflow]]
- [[Lint-Workflow]]

## 相关实体
- [[Obsidian]]
- [[0 Inbox/_processed/AI-Agent/Hermes-Agent/Hermes-Agent]]

## Sources
- [[raw/articles/封神组合！Claude Code+LLM Wiki+Obsidian 一站式打通 AI 知识库.md]]
