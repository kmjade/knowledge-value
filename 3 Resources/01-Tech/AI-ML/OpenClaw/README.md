---
title: OpenClaw 知识库导航
tags:
  - para/resource/tech
  - 技术/AI
  - OpenClaw
  - MOC
status: active
aliases:
  - OpenClaw Knowledge Base
  - 龙虾AI知识库
cssclasses:
  - resource-note
created: 2026-05-24
---

# OpenClaw 知识库导航

> [!info] 概述
> OpenClaw 🦞 是一个**开源的个人 AI 助手平台** —— 本地部署、安装即用。通过微信、飞书、钉钉对话指挥，它能发邮件、管日历、写代码、浏览网页，7×24 小时为你工作。

## 核心定位

OpenClaw 是一个**自托管 Gateway 网关**：
- 把常用的聊天应用和 AI 智能体连接起来
- 在自己的机器上运行单个 Gateway 进程
- 成为消息应用和 AI 助手之间的桥梁

### 核心特点

| 特点 | 说明 |
|------|------|
| 自托管 | 在你的硬件上运行，遵循你的规则 |
| 多渠道 | 一个 Gateway 可同时服务多个渠道 |
| 智能体原生 | 为具备工具使用、会话、记忆和多智能体路由能力的编码智能体而构建 |
| 开源 | MIT 许可，社区驱动 |

---

## 快速导航

### 入门指南
| 主题 | 说明 |
|------|------|
| [[01-快速开始/1. OpenClaw简介]] | 什么是 OpenClaw、核心能力 |
| [[01-快速开始/2. 快速开始]] | 5 分钟快速设置 |
| [[01-快速开始/3. 新手引导]] | CLI 和 macOS 应用引导 |

### 安装部署
| 主题 | 说明 |
|------|------|
| [[02-安装部署/1. 安装方式]] | 安装脚本、npm、Docker 等 |
| [[02-安装部署/2. 系统要求]] | Node.js、平台要求 |
| [[02-安装部署/3. 配置文件]] | openclaw.json 配置详解 |

### 消息渠道
| 主题 | 说明 |
|------|------|
| [[03-消息渠道/1. 渠道概览]] | 支持的所有消息平台 |
| [[03-消息渠道/2. Telegram配置]] | 最快设置的渠道 |
| [[03-消息渠道/3. WhatsApp配置]] | WhatsApp 配对与使用 |
| [[03-消息渠道/4. 飞书钉钉]] | 飞书、钉钉企业集成 |
| [[03-消息渠道/5. 微信集成]] | 企业微信、公众号配置 |

### 代理与工具
| 主题 | 说明 |
|------|------|
| [[04-代理与工具/1. Pi代理]] | Pi 默认智能体配置 |
| [[04-代理与工具/2. 工具系统]] | 内置工具与自定义工具 |
| [[04-代理与工具/3. Skills技能]] | 技能模块创建与使用 |
| [[04-代理与工具/4. 多智能体路由]] | 路由规则与分层代理 |

### 模型配置
| 主题 | 说明 |
|------|------|
| [[05-模型配置/1. 模型提供商]] | Claude、GPT、DeepSeek 配置 |
| [[05-模型配置/2. 本地模型]] | Ollama、vLLM 本地模型 |

### 网关运维
| 主题 | 说明 |
|------|------|
| [[06-网关运维/1. Gateway配置]] | 网关核心配置与调优 |
| [[06-网关运维/2. 安全配置]] | 认证、白名单、审计 |
| [[06-网关运维/3. 远程访问]] | Tailscale、Cloudflare Tunnel |

### 资源收集
| 主题 | 说明 |
|------|------|
| [[99-资源收集/1. 官方资源]] | 官方链接与社区资源 |
| [[99-资源收集/2. 常见问题]] | FAQ 与故障排除 |

---

## 支持的渠道

| 渠道 | 说明 | 状态 |
|------|------|------|
| Telegram | Bot API，最快设置 | ✅ |
| WhatsApp | 二维码配对 | ✅ |
| 飞书/Lark | WebSocket 机器人 | ✅ |
| 钉钉 | 机器人/工作流 | ✅ |
| 企业微信 | 应用/群机器人 | ✅ |
| 微信 | iLink Bot | ✅ |
| Discord | Bot API + Gateway | ✅ |
| Slack | Bolt SDK | ✅ |
| iMessage | macOS 原生集成 | ✅ |
| Signal | signal-cli | ✅ |
| Matrix | Matrix 协议 | ✅ |
| QQ Bot | QQ Bot API | ✅ |

---

## 支持的模型

| 提供商 | 说明 |
|--------|------|
| Anthropic | Claude 系列 |
| OpenAI | GPT 系列 |
| Google | Gemini 系列 |
| DeepSeek | 国产模型 |
| 阿里云 | 通义千问 |
| 本地模型 | Ollama |

---

## 相关链接

- 官网：https://openclawbot.org.cn/
- 文档：https://docs.openclaw.ai/zh-CN
- GitHub：https://github.com/openclaw/openclaw
- Discord：https://discord.com/invite/clawd

## 版本信息

- 知识库创建日期：2026-05-24
- 数据来源：OpenClaw 官方文档、官网
