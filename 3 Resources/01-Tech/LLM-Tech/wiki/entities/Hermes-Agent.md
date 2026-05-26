---
title: Hermes Agent
tags: [entity, tool]
type: entity
entity_type: tool
topic: llm
created: 2026-05-27
modified: 2026-05-27
---

# Hermes Agent

Hermes Agent 是一个开源的 AI Agent 框架，支持多平台消息接入和工具调用。

## 基本信息
- 类型: 工具（框架）
- 状态: active

## 核心能力

| 能力 | 说明 |
|------|------|
| Skills 技能系统 | 可扩展的技能/插件 |
| Memory 持久记忆 | 跨会话记忆管理 |
| Gateway 多平台 | 消息网关架构 |
| 20+ Provider | 支持 Claude、GPT、DeepSeek 等 |

## 架构特点
- **框架而非模型**: 通过 API 调用任何 LLM，无需本地 GPU
- **内置工具集**: terminal、file、web、browser 等 20+ 工具
- **自然语言驱动**: 通过自然语言调度工具

## 消息平台支持
- 微信、企业微信（机器人/回调）
- 飞书、钉钉
- Telegram、Discord、Slack
- QQ 机器人
- 电子邮件、短信等

## 相关概念
- [[3 Resources/ai-ml/raw/articles/LLM-Wiki/LLM-Wiki]] - 方法论
- [[Three-Layer-Architecture]] - 架构设计

## 相关实体
- [[IngestAgent]] - Ingest 实现
- [[QueryAgent]] - Query 实现
- [[LintAgent]] - Lint 实现

## Sources
- [[Hermes-Agent简介]]
