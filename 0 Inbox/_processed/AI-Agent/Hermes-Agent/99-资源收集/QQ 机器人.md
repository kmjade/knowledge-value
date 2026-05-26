---
title: "QQ 机器人"
source: "https://hermesagent.org.cn/docs/user-guide/messaging/qqbot"
author:
  - "[[Nous Research]]"
published:
created: 2026-05-25
description: "Hermes Agent 中文文档与安装教程：覆盖 Windows、WSL2、长期记忆、Skills、MCP、消息网关、多平台接入与自托管部署，附微信社区和快速上手指南。, 开源、自托管的 AI Agent，支持长期记忆、Skills、MCP、消息网关、多平台接入与自动化任务。"
tags:
  - "clippings"
---
通过 **官方 QQ 机器人 API (v2)** 将 Hermes **Hermes Agent** 开源 AI 智能体框架与产品的正式名称。Hermes Agent 是项目和产品的正式名称。文档、GitHub 仓库、安装命令、社区讨论和搜索结果都统一使用这一写法。 连接到 QQ —— 支持私聊 (C2C)、群聊 @提及、频道消息以及带有语音转文字的直连消息。

## 概述

QQ 机器人适配器使用 [官方 QQ 机器人 API](https://bot.q.qq.com/wiki/develop/api-v2/) 来：

- 通过与 QQ 网关的持久 **WebSocket **WebSocket** 在客户端和服务器之间建立持久双向通信通道的协议。不像 HTTP 那样"问一次答一次"，WebSocket 建立连接后双方可以随时互相发送数据。Hermes 通过 WebSocket 连接到 Chrome 的 CDP 调试端口来操控浏览器，Browserbase 等云浏览器服务也使用 WebSocket 进行实时通信。** 连接接收消息
- 通过 **REST API **REST API** 基于 HTTP 协议的 API 设计风格，通过 URL 和 HTTP 动词操作资源。用 URL 表示资源、用 GET / POST / PUT / DELETE 表示操作来跟服务器打交道，是最常见的 Web API 风格。Hermes API Server 走 REST 风格，Browser Use 也通过 REST API 提供云浏览器服务。** 发送文本和 Markdown 回复
- 下载并处理图片、语音消息和文件附件
- 使用腾讯内置的 ASR 或可配置的 STT 提供商转录语音消息

## 前提条件

1. **QQ 机器人应用** — 在 [q.qq.com](https://q.qq.com/) 注册：
	- 创建新应用并记录您的 **App ID** 和 **App Secret**
		- 启用所需的意图（Intents）：C2C 消息、群聊 @消息、频道消息
		- 在沙盒模式中配置机器人以进行测试，或发布用于生产环境
2. **依赖项** — 适配器需要 `aiohttp` 和 `httpx` ：
```bash
pip install aiohttp httpx
```

## 配置

### 交互式设置

```bash
hermes gateway setup
```

从平台列表中选择 **QQ Bot** 并按照提示操作。

### 手动配置

在 `~/.hermes/.env` 中设置所需的 环境变量 **Environment Variable** 操作系统级别的键值对配置，程序启动时可读取。电脑里的"公共便签"——任何程序启动时都能查看上面的信息。Hermes 通过环境变量（如 \`OPENAI\_API\_KEY\`、\`HERMES\_TOOLS\`）存储 API 密钥和功能开关等配置，这些变量写在 \`~/.hermes/.env\` 文件中。 ：

```bash
QQ_APP_ID=your-app-id
QQ_CLIENT_SECRET=your-app-secret
```

## 环境变量Environment Variable操作系统级别的键值对配置，程序启动时可读取。电脑里的"公共便签"——任何程序启动时都能查看上面的信息。Hermes 通过环境变量（如 \`OPENAI\_API\_KEY\`、\`HERMES\_TOOLS\`）存储 API 密钥和功能开关等配置，这些变量写在 \`~/.hermes/.env\` 文件中。

| 变量 | 描述 | 默认值 |
| --- | --- | --- |
| `QQ_APP_ID` | QQ 机器人 App ID（必填） | — |
| `QQ_CLIENT_SECRET` | QQ 机器人 App Secret（必填） | — |
| `QQBOT_HOME_CHANNEL` | 用于定时任务/通知投递的 OpenID | — |
| `QQBOT_HOME_CHANNEL_NAME` | 主页频道的显示名称 | `Home` |
| `QQ_ALLOWED_USERS` | 允许访问私聊的用户 OpenID，以逗号分隔 | open（所有用户） |
| `QQ_ALLOW_ALL_USERS` | 设置为 `true` 以允许所有私聊消息 | `false` |
| `QQ_SANDBOX` | 将请求路由到 QQ 沙盒网关以进行开发测试 | `false` |
| `QQ_STT_API_KEY` | 语音转文本提供商的 API 密钥 | — |
| `QQ_STT_BASE_URL` | STT **STT** 把语音转成文字。你说一句话，系统先识别成文字，再交给模型理解。 提供商的基础 URL | `https://open.bigmodel.cn/api/coding/paas/v4` |
| `QQ_STT_MODEL` | STT 模型名称 | `glm-asr` |

## 高级配置

如需更精细的控制，请将平台设置添加到 `~/.hermes/config.yaml` ：

```yaml
platforms:
  qq:
    enabled: true
    extra:
      app_id: "your-app-id"
      client_secret: "your-secret"
      markdown_support: true       # enable QQ markdown (msg_type 2). Config-only; no env-var equivalent.
      dm_policy: "open"          # open | allowlist | disabled
      allow_from:
        - "user_openid_1"
      group_policy: "open"       # open | allowlist | disabled
      group_allow_from:
        - "group_openid_1"
      stt:
        provider: "zai"          # zai (GLM-ASR), openai (Whisper), etc.
        baseUrl: "https://open.bigmodel.cn/api/coding/paas/v4"
        apiKey: "your-stt-key"
        model: "glm-asr"
```

## 语音消息 (STT)

语音转录分为两个阶段：

1. **QQ 内置 ASR** （免费，始终优先尝试）— QQ 在语音消息附件中提供 `asr_refer_text` ，使用的是腾讯自家的语音识别服务
2. **配置的 STT **STT** 把语音转成文字。你说一句话，系统先识别成文字，再交给模型理解。 提供商** （ 回退 **Fallback** 主方案不可用时自动切换到备用方案的容错机制。Plan A 不行了就走 Plan B。Hermes 中 Fallback 体现在多个层面：主模型调用失败时切换到备用模型（Fallback Provider），主 Provider 限流时轮换密钥（Credential Pool），核心逻辑都是 fallback。 方案）— 如果 QQ 的 ASR 未返回文本，适配器将调用兼容 OpenAI 的 STT API：
	- **智谱/GLM (zai)** ：默认提供商，使用 `glm-asr` 模型
		- **OpenAI Whisper** ：设置 `QQ_STT_BASE_URL` 和 `QQ_STT_MODEL`
		- 任何兼容 OpenAI 的 STT 端点

## 故障排除

### 机器人立即断开连接（快速断开）

这通常意味着：

- **无效的 App ID / Secret** — 请在 q.qq.com 仔细检查您的凭据
- **缺少权限** — 确保已启用机器人所需的意图（Intents）
- **仅限沙盒的机器人** — 如果机器人处于沙盒模式，它只能接收来自 QQ 沙盒测试频道的消息

### 语音消息未转录

1. 检查附件数据中是否存在 QQ 内置的 `asr_refer_text`
2. 如果使用自定义 STT **STT** 把语音转成文字。你说一句话，系统先识别成文字，再交给模型理解。 提供商，请验证 `QQ_STT_API_KEY` 是否设置正确
3. 检查网关日志中是否有 STT 错误消息

### 消息未送达

- 验证是否在 q.qq.com 启用了机器人的 **意图（Intents）**
- 如果限制了私聊访问，请检查 `QQ_ALLOWED_USERS`
- 对于群消息，确保机器人被 **@提及** （群策略可能需要 白名单 **Allowlist** 只允许特定来源、频道或用户访问的控制机制。就像"VIP 名单"——只有名单里的人才能跟 Hermes 交互。Hermes 的各消息平台（Telegram、Discord 等）都支持 allowlist 配置，未在白名单中的用户或频道会被自动拒绝。 ）
- 检查 `QQBOT_HOME_CHANNEL` 以确认定时任务/通知的投递

### 连接错误

- 确保已安装 `aiohttp` 和 `httpx` ： `pip install aiohttp httpx`
- 检查到 `api.sgroup.qq.com` 和 WebSocket **WebSocket** 在客户端和服务器之间建立持久双向通信通道的协议。不像 HTTP 那样"问一次答一次"，WebSocket 建立连接后双方可以随时互相发送数据。Hermes 通过 WebSocket 连接到 Chrome 的 CDP 调试端口来操控浏览器，Browserbase 等云浏览器服务也使用 WebSocket 进行实时通信。 网关的网络连通性
- 查看网关日志以获取详细的错误消息和重连行为