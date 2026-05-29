---
title: "企业微信 (WeCom)"
source: "https://hermesagent.org.cn/docs/user-guide/messaging/wecom"
author:
  - "[[Nous Research]]"
published:
created: 2026-05-25
description: "通过 AI 机器人 WebSocket 网关将 Hermes Agent 连接到 WeCom"
tags:
  - "clippings"
---
将 Hermes **Hermes Agent** 开源 AI 智能体框架与产品的正式名称。Hermes Agent 是项目和产品的正式名称。文档、GitHub 仓库、安装命令、社区讨论和搜索结果都统一使用这一写法。 与 [WeCom](https://work.weixin.qq.com/) （腾讯的企业级消息平台）连接。该适配器使用 WeCom 的 AI Bot WebSocket 网关实现实时双向通信——无需公开端点或 Webhook **Webhook** 某个系统把事件主动推给另一个系统的回调地址。简单理解就是“有事发生时，对方主动来通知你”。例如平台在收到新消息后，把消息推给 Hermes。 。

## 先决条件

- 一个 WeCom 组织账号
- 在 WeCom 管理控制台中创建的 AI Bot
- 从 Bot 的凭证页面获取的 Bot ID 和 Secret
- Python 包： `aiohttp` 和 `httpx`

## 设置

### 1\. 创建 AI Bot

1. 登录 [WeCom 管理控制台](https://work.weixin.qq.com/wework_admin/frame)
2. 导航至 **应用** → **创建应用** → **AI Bot**
3. 配置 Bot 名称和描述
4. 从凭证页面复制 **Bot ID** 和 **Secret**

### 2\. 配置 HermesHermes Agent开源 AI 智能体框架与产品的正式名称。Hermes Agent 是项目和产品的正式名称。文档、GitHub 仓库、安装命令、社区讨论和搜索结果都统一使用这一写法。

运行交互式设置：

```bash
hermes gateway setup
```

选择 **WeCom** ，并输入您的 Bot ID 和 Secret。

或者在 `~/.hermes/.env` 中设置 环境变量 **Environment Variable** 操作系统级别的键值对配置，程序启动时可读取。电脑里的"公共便签"——任何程序启动时都能查看上面的信息。Hermes 通过环境变量（如 \`OPENAI\_API\_KEY\`、\`HERMES\_TOOLS\`）存储 API 密钥和功能开关等配置，这些变量写在 \`~/.hermes/.env\` 文件中。 ：

```bash
WECOM_BOT_ID=your-bot-id
WECOM_SECRET=your-secret

# 可选：限制访问
WECOM_ALLOWED_USERS=user_id_1,user_id_2

# 可选：为 Cron / 通知设置主频道
WECOM_HOME_CHANNEL=chat_id
```

### 3\. 启动网关

```bash
hermes gateway
```

## 功能特性

- **WebSocket **WebSocket** 在客户端和服务器之间建立持久双向通信通道的协议。不像 HTTP 那样"问一次答一次"，WebSocket 建立连接后双方可以随时互相发送数据。Hermes 通过 WebSocket 连接到 Chrome 的 CDP 调试端口来操控浏览器，Browserbase 等云浏览器服务也使用 WebSocket 进行实时通信。 传输** —— 持久连接，无需公开端点
- **私信与群组消息** —— 可配置访问策略
- **按群组发送者 白名单 **Allowlist** 只允许特定来源、频道或用户访问的控制机制。就像"VIP 名单"——只有名单里的人才能跟 Hermes 交互。Hermes 的各消息平台（Telegram、Discord 等）都支持 allowlist 配置，未在白名单中的用户或频道会被自动拒绝。** —— 对每个群组中谁可以互动进行细粒度控制
- **媒体支持** —— 支持图片、文件、语音、视频的上传与下载
- **AES 加密媒体** —— 自动解密传入的附件
- **引用上下文** —— 保留回复的线程结构
- **Markdown 渲染** —— 支持富文本响应
- **回复模式流式输出** —— 将响应与传入消息上下文相关联
- **自动重连** —— 连接中断时采用指数退避重试

## 配置选项

在 `config.yaml` 中的 `platforms.wecom.extra` 下设置以下选项：

| 键 | 默认值 | 描述 |
| --- | --- | --- |
| `bot_id` | — | WeCom AI Bot ID（必需） |
| `secret` | — | WeCom AI Bot Secret（必需） |
| `websocket_url` | `wss://openws.work.weixin.qq.com` | WebSocket 网关 URL |
| `dm_policy` | `open` | 私信访问策略： `open` 、 `allowlist` 、 `disabled` 、 `pairing` |
| `group_policy` | `open` | 群组访问策略： `open` 、 `allowlist` 、 `disabled` |
| `allow_from` | `[]` | 允许私信的用户 ID 列表（当 `dm_policy=allowlist` 时） |
| `group_allow_from` | `[]` | 允许的群组 ID 列表（当 `group_policy=allowlist` 时） |
| `groups` | `{}` | 按群组配置（见下文） |

## 访问策略

### 私信策略（DM Policy）

控制谁可以向 Bot 发送私信：

| 值 | 行为 |
| --- | --- |
| `open` | 任何人都可以向 Bot 发送私信（默认） |
| `allowlist` | 仅 `allow_from` 列表中的用户 ID 可以发送私信 |
| `disabled` | 所有私信均被忽略 |
| `pairing` | 配对模式（用于初始设置） |

```bash
WECOM_DM_POLICY=allowlist
```

### 群组策略（Group Policy）

控制 Bot 在哪些群组中响应：

| 值 | 行为 |
| --- | --- |
| `open` | Bot 在所有群组中响应（默认） |
| `allowlist` | Bot 仅在 `group_allow_from` 列表中的群组 ID 中响应 |
| `disabled` | 所有群组消息均被忽略 |

```bash
WECOM_GROUP_POLICY=allowlist
```

### 按群组发送者白名单

为实现细粒度控制，您可以限制特定群组中哪些用户可以与 Bot 互动。该配置在 `config.yaml` 中完成：

```yaml
platforms:
  wecom:
    enabled: true
    extra:
      bot_id: "your-bot-id"
      secret: "your-secret"
      group_policy: "allowlist"
      group_allow_from:
        - "group_id_1"
        - "group_id_2"
      groups:
        group_id_1:
          allow_from:
            - "user_alice"
            - "user_bob"
        group_id_2:
          allow_from:
            - "user_charlie"
        "*":
          allow_from:
            - "user_admin"
```

**工作原理：**

1. `group_policy` 和 `group_allow_from` 控制某个群组是否被允许。
2. 如果群组通过了顶层检查，则 `groups.<group_id>.allow_from` 列表（如果存在）会进一步限制该群组内哪些发送者可以与 Bot 互动。
3. 通配符 `"*"` 条目可作为未显式列出群组的默认规则。
4. 白名单 **Allowlist** 只允许特定来源、频道或用户访问的控制机制。就像"VIP 名单"——只有名单里的人才能跟 Hermes 交互。Hermes 的各消息平台（Telegram、Discord 等）都支持 allowlist 配置，未在白名单中的用户或频道会被自动拒绝。 条目支持 `*` 通配符以允许所有用户，且条目不区分大小写。
5. 条目可选择使用 `wecom:user:` 或 `wecom:group:` 前缀格式——前缀会自动剥离。

如果某个群组未配置 `allow_from` ，则该群组中所有用户均被允许（前提是该群组本身通过了顶层策略检查）。

## 媒体支持

### 入站（接收）

适配器接收用户发送的媒体附件，并在本地缓存以供 Agent **Agent** 具备自主性、能调用工具以完成目标的 AI 程序。Agent 是一种基于大语言模型的智能程序，能够感知环境、做出决策、调用工具执行操作，并自主推进任务——它不仅能读写文件、执行命令，还能操作浏览器、调用 API，与数字世界进行多轮交互。 处理：

| 类型 | 处理方式 |
| --- | --- |
| **图片** | 下载并本地缓存。支持基于 URL 和 base64 编码的图片。 |
| **文件** | 下载并缓存。文件名保留原始消息中的名称。 |
| **语音** | 若可用，提取语音消息的文本转录。 |
| **混合消息** | WeCom 的混合类型消息（文本 + 图片）会被解析，所有组件均被提取。 |

**引用消息：** 被引用（回复）的消息中的媒体也会被提取，使 Agent **Agent** 具备自主性、能调用工具以完成目标的 AI 程序。Agent 是一种基于大语言模型的智能程序，能够感知环境、做出决策、调用工具执行操作，并自主推进任务——它不仅能读写文件、执行命令，还能操作浏览器、调用 API，与数字世界进行多轮交互。 能够了解用户正在回复的内容。

### AES 加密媒体解密

WeCom 使用 AES-256-CBC 对部分入站媒体附件进行加密。该适配器会自动处理解密过程：

- 当入站媒体项包含 `aeskey` 字段时，适配器会下载加密字节，并使用 AES-256-CBC 加密算法配合 PKCS#7 填充进行解密。
- AES 密钥为 `aeskey` 字段的 base64 解码值（必须恰好为 32 字节）。
- IV 由密钥的前 16 字节导出。
- 此功能需要 `cryptography` Python 包（运行 `pip install cryptography` 安装）。

无需配置——当接收到加密媒体时，解密将自动透明完成。

### 出站（发送）

| 方法 | 发送内容 | 大小限制 |
| --- | --- | --- |
| `send` | Markdown 文本消息 | 4000 字符 |
| `send_image` / `send_image_file` | 原生图片消息 | 10 MB |
| `send_document` | 文件附件 | 20 MB |
| `send_voice` | 语音消息（仅支持原生语音的 AMR 格式） | 2 MB |
| `send_video` | 视频消息 | 10 MB |

**分块上传** ：文件通过三步协议（初始化 → 分块 → 完成）以 512 KB 为单位上传。适配器会自动处理此过程。

**自动 降级 **Fallback** 主方案不可用时自动切换到备用方案的容错机制。Plan A 不行了就走 Plan B。Hermes 中 Fallback 体现在多个层面：主模型调用失败时切换到备用模型（Fallback Provider），主 Provider 限流时轮换密钥（Credential Pool），核心逻辑都是 fallback。** ：当媒体超出原生类型大小限制但仍在绝对 20 MB 文件限制内时，将自动作为通用文件附件发送：

- 图片 > 10 MB → 作为文件发送
- 视频 > 10 MB → 作为文件发送
- 语音 > 2 MB → 作为文件发送
- 非 AMR 音频 → 作为文件发送（仅 WeCom 支持 AMR 格式的原生语音）

超过绝对 20 MB 限制的文件将被拒绝，并向聊天发送一条信息提示。

## 回复模式流式响应

当机器人通过 WeCom 回调 **Hook** 在 Hermes 关键生命周期节点自动触发的自定义代码回调。在 Hermes 运行过程中设置"触发器"——比如 Agent 开始工作时自动记录日志、工具调用前检查安全性、会话结束时自动清理文件。插件可以通过 \`ctx.register\_hook()\` 注册自己的钩子函数。 收到消息时，适配器会记住入站请求 ID。如果在请求上下文仍有效时发送响应，适配器将使用 WeCom 的回复模式（ `aibot_respond_msg` ）并启用流式传输，将响应直接关联到入站消息。这在 WeCom 客户端中提供更自然的对话体验。

如果入站请求上下文已过期或不可用，适配器将回退至通过 `aibot_send_msg` 主动发送消息。

回复模式也适用于媒体：上传的媒体可作为对原始消息的回复发送。

## 连接与重连

适配器维护与 WeCom 网关的持久化 WebSocket **WebSocket** 在客户端和服务器之间建立持久双向通信通道的协议。不像 HTTP 那样"问一次答一次"，WebSocket 建立连接后双方可以随时互相发送数据。Hermes 通过 WebSocket 连接到 Chrome 的 CDP 调试端口来操控浏览器，Browserbase 等云浏览器服务也使用 WebSocket 进行实时通信。 连接，地址为 `wss://openws.work.weixin.qq.com` 。

### 连接生命周期

1. **连接** ：打开 WebSocket 连接，并发送包含 bot\_id 和 secret 的 `aibot_subscribe` 认证帧。
2. **心跳** ：每 30 秒发送一次应用层 ping 帧，以保持连接活跃。
3. **监听** ：持续读取入站帧并分发消息 回调 **Hook** 在 Hermes 关键生命周期节点自动触发的自定义代码回调。在 Hermes 运行过程中设置"触发器"——比如 Agent 开始工作时自动记录日志、工具调用前检查安全性、会话结束时自动清理文件。插件可以通过 \`ctx.register\_hook()\` 注册自己的钩子函数。 。

### 重连行为

连接丢失后，适配器使用指数退避机制进行重连：

| 尝试次数 | 延迟 |
| --- | --- |
| 第 1 次重试 | 2 秒 |
| 第 2 次重试 | 5 秒 |
| 第 3 次重试 | 10 秒 |
| 第 4 次重试 | 30 秒 |
| 第 5 次及以上重试 | 60 秒 |

每次成功重连后，退避计数器重置为 0。断开连接时，所有待处理的请求未来对象均被标记为失败，防止调用者无限挂起。

### 去重

入站消息通过消息 ID 进行去重，窗口为 5 分钟，最大缓存条目数为 1000 条。这可防止在重连或网络波动期间重复处理消息。

## 所有环境变量Environment Variable操作系统级别的键值对配置，程序启动时可读取。电脑里的"公共便签"——任何程序启动时都能查看上面的信息。Hermes 通过环境变量（如 \`OPENAI\_API\_KEY\`、\`HERMES\_TOOLS\`）存储 API 密钥和功能开关等配置，这些变量写在 \`~/.hermes/.env\` 文件中。

| 变量 | 是否必需 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `WECOM_BOT_ID` | ✅ | — | WeCom AI Bot ID |
| `WECOM_SECRET` | ✅ | — | WeCom AI Bot Secret |
| `WECOM_ALLOWED_USERS` | — | *(空)* | 用于网关级别 白名单 **Allowlist** 只允许特定来源、频道或用户访问的控制机制。就像"VIP 名单"——只有名单里的人才能跟 Hermes 交互。Hermes 的各消息平台（Telegram、Discord 等）都支持 allowlist 配置，未在白名单中的用户或频道会被自动拒绝。 的逗号分隔用户 ID 列表 |
| `WECOM_HOME_CHANNEL` | — | — | 用于定时任务/通知输出的聊天 ID |
| `WECOM_WEBSOCKET_URL` | — | `wss://openws.work.weixin.qq.com` | WebSocket **WebSocket** 在客户端和服务器之间建立持久双向通信通道的协议。不像 HTTP 那样"问一次答一次"，WebSocket 建立连接后双方可以随时互相发送数据。Hermes 通过 WebSocket 连接到 Chrome 的 CDP 调试端口来操控浏览器，Browserbase 等云浏览器服务也使用 WebSocket 进行实时通信。 网关 URL |
| `WECOM_DM_POLICY` | — | `open` | 私聊访问策略 |
| `WECOM_GROUP_POLICY` | — | `open` | 群组访问策略 |

## 故障排除

| 问题 | 解决方案 |
| --- | --- |
| `WECOM_BOT_ID and WECOM_SECRET are required` | 设置两个 环境变量 **Environment Variable** 操作系统级别的键值对配置，程序启动时可读取。电脑里的"公共便签"——任何程序启动时都能查看上面的信息。Hermes 通过环境变量（如 \`OPENAI\_API\_KEY\`、\`HERMES\_TOOLS\`）存储 API 密钥和功能开关等配置，这些变量写在 \`~/.hermes/.env\` 文件中。 ，或在设置向导中进行配置 |
| `WeCom startup failed: aiohttp not installed` | 安装 aiohttp： `pip install aiohttp` |
| `WeCom startup failed: httpx not installed` | 安装 httpx： `pip install httpx` |
| `invalid secret (errcode=40013)` | 确认密钥与机器人的凭证匹配 |
| `Timed out waiting for subscribe acknowledgement` | 检查与 `openws.work.weixin.qq.com` 的网络连接 |
| 机器人在群组中无响应 | 检查 `group_policy` 设置，并确保群组 ID 在 `group_allow_from` 列表中 |
| 机器人忽略群组中的某些用户 | 检查 `groups` 配置部分中各群组的 `allow_from` 列表 |
| 媒体解密失败 | 安装 `cryptography` ： `pip install cryptography` |
| `cryptography is required for WeCom media decryption` | 入站媒体为 AES 加密。请安装： `pip install cryptography` |
| 语音消息以文件形式发送 | WeCom 仅支持原生 AMR 格式的语音消息。其他格式将自动 降级 **Fallback** 主方案不可用时自动切换到备用方案的容错机制。Plan A 不行了就走 Plan B。Hermes 中 Fallback 体现在多个层面：主模型调用失败时切换到备用模型（Fallback Provider），主 Provider 限流时轮换密钥（Credential Pool），核心逻辑都是 fallback。 为文件发送。 |
| `File too large` 错误 | WeCom 对所有文件上传有 20 MB 的绝对限制。请压缩或拆分文件。 |
| 图片以文件形式发送 | 图片大小超过 10 MB 时，超出原生图片限制，将自动 降级 **Fallback** 主方案不可用时自动切换到备用方案的容错机制。Plan A 不行了就走 Plan B。Hermes 中 Fallback 体现在多个层面：主模型调用失败时切换到备用模型（Fallback Provider），主 Provider 限流时轮换密钥（Credential Pool），核心逻辑都是 fallback。 为文件附件。 |
| `Timeout sending message to WeCom` | WebSocket 可能已断开。请检查日志中是否有重连消息。 |
| `WeCom websocket closed during authentication` | 网络问题或凭证错误。请验证 bot\_id 和 secret。 |