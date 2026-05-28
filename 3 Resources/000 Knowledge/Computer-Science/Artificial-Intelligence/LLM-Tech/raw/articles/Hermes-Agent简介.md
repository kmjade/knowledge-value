---
title: Hermes Agent 简介
created: 2026-05-27
source: "[[Hermes+LLM wiki +Obsidian 工作流]], [[99-資源收集/Hermes-Agent-企业微信回调配置]]"
tags: [topic/ai-agent, para/resource/tech]
compiled: false
---

# Hermes Agent 简介

Hermes Agent 是一个开源的 AI Agent 框架，支持多平台消息接入和工具调用。

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

Hermes Agent 通过消息网关支持多平台接入：
- 微信、企业微信（机器人/回调）
- 飞书、钉钉
- Telegram、Discord、Slack
- QQ 机器人
- 电子邮件、短信等

## 相关概念
- [[三层架构设计]]
- [[LLM-Wiki-方法论]]

## 相关实体
- [[IngestAgent]]
- [[QueryAgent]]
- [[LintAgent]]
