---
title: OpenClaw 内容总览
tags:
  - para/resource/tech
  - 技术/AI
  - OpenClaw
  - MOC
status: active
cssclasses:
  - resource-note
created: 2026-05-24
---

# OpenClaw 内容总览

## 模块结构

```
OpenClaw/
├── 00-MOCs/           # 导航与学习路径
├── 01-快速开始/        # 简介、快速开始、新手引导
├── 02-安装部署/        # 安装、系统要求、配置
├── 03-消息渠道/        # 渠道概览、各平台配置
├── 04-代理与工具/      # Pi代理、工具、Skills
├── 05-模型配置/        # 模型提供商、本地模型
├── 06-网关运维/        # Gateway配置、安全、远程访问
└── 99-资源收集/        # 官方资源、常见问题
```

## 内容统计

| 模块 | 文件数 | 主要内容 |
|------|--------|----------|
| 01-快速开始 | 3 | 简介、快速开始、新手引导 |
| 02-安装部署 | 3 | 安装方式、系统要求、配置文件 |
| 03-消息渠道 | 5 | 渠道概览、Telegram、WhatsApp、飞书钉钉、微信 |
| 04-代理与工具 | 4 | Pi代理、工具、Skills、多智能体 |
| 05-模型配置 | 2 | 模型提供商、本地模型 |
| 06-网关运维 | 3 | Gateway配置、安全、远程访问 |
| 99-资源收集 | 2 | 官方资源、常见问题 |

## 核心概念速查

### 什么是 OpenClaw？
开源的个人 AI 助手平台，自托管 Gateway 网关，连接聊天应用和 AI 智能体。

### 工作原理

```
Chat apps + plugins → Gateway → Pi agent
                              → CLI
                              → Web Control UI
                              → macOS app
                              → iOS/Android nodes
```

### 快速命令

| 命令 | 作用 |
|------|------|
| `openclaw onboard` | 新手引导 |
| `openclaw dashboard` | 打开 Control UI |
| `openclaw gateway status` | 查看网关状态 |
| `openclaw gateway restart` | 重启网关 |

### 配置文件位置

| 配置类型 | 路径 |
|----------|------|
| 主配置 | `~/.openclaw/openclaw.json` |
| 状态目录 | `~/.openclaw/` |

### 默认端口

| 服务 | 端口 |
|------|------|
| Control UI | 18789 |

## 支持的渠道一览

### 即时通讯

| 渠道 | 配置方式 |
|------|----------|
| Telegram | Bot Token |
| WhatsApp | 二维码配对 |
| Signal | signal-cli |
| Discord | Bot API |
| Slack | Bolt SDK |
| iMessage | macOS 原生 |

### 国内平台

| 渠道 | 配置方式 |
|------|----------|
| 飞书 | WebSocket |
| 钉钉 | Bot API |
| 企业微信 | 应用/机器人 |
| 微信 | iLink Bot |
| QQ Bot | Bot API |

## 相关知识库

- [[../OpenCode/README|OpenCode 知识库]] - 开源 AI 编程 Agent
- [[../AI-ML/AI员工搭建全流程指南|AI 员工搭建指南]]
