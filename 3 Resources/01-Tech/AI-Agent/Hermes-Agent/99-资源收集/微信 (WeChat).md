---
title: "微信 (WeChat)"
source: "https://hermesagent.org.cn/docs/user-guide/messaging/weixin"
author:
  - "[[Nous Research]]"
published:
created: 2026-05-25
description: "通过 iLink Bot API 将 Hermes Agent 连接到个人微信账号"
tags:
  - "clippings"
---
将 Hermes **Hermes Agent** 开源 AI 智能体框架与产品的正式名称。Hermes Agent 是项目和产品的正式名称。文档、GitHub 仓库、安装命令、社区讨论和搜索结果都统一使用这一写法。 连接到 [微信](https://weixin.qq.com/) （腾讯的个人即时通讯平台）。该适配器使用腾讯的 **iLink Bot API** 来支持个人微信账号——这与企业微信（WeCom）不同。消息通过长轮询方式传输，因此无需公网端点或 Webhook **Webhook** 某个系统把事件主动推给另一个系统的回调地址。简单理解就是“有事发生时，对方主动来通知你”。例如平台在收到新消息后，把消息推给 Hermes。 。

> [!-info] -info
> 信息
> 
> 此适配器适用于 **个人微信账号** （微信）。如需企业/公司微信，请参阅 [企业微信适配器](https://hermesagent.org.cn/docs/user-guide/messaging/wecom) 。

## 前提条件

- 一个个人微信账号
- Python 包： `aiohttp` 和 `cryptography`
- `qrcode` 包为可选（用于在设置过程中在终端中渲染二维码）

安装所需依赖：

```bash
pip install aiohttp cryptography
# 可选：用于终端QR代码显示
pip install qrcode
```

## 设置

### 1\. 运行设置向导

连接微信账号最简单的方式是通过交互式设置向导：

```bash
hermes gateway setup
```

提示时选择 **Weixin** 。向导将执行以下操作：

1. 向 iLink Bot API 请求一个二维码
2. 在终端中显示二维码（或提供一个 URL）
3. 等待您使用微信手机 App 扫描二维码
4. 提示您在手机上确认登录
5. 自动将账号凭证保存至 `~/.hermes/weixin/accounts/`

确认后，您将看到类似如下消息：

```markdown
微信连接成功，account_id=your-account-id
```

向导会保存 `account_id` 、 `token` 和 `base_url` ，因此无需手动配置。

### 2\. 配置环境变量Environment Variable操作系统级别的键值对配置，程序启动时可读取。电脑里的"公共便签"——任何程序启动时都能查看上面的信息。Hermes 通过环境变量（如 \`OPENAI\_API\_KEY\`、\`HERMES\_TOOLS\`）存储 API 密钥和功能开关等配置，这些变量写在 \`~/.hermes/.env\` 文件中。

首次通过二维码登录后，请在 `~/.hermes/.env` 中至少设置账号 ID：

```bash
WEIXIN_ACCOUNT_ID=your-account-id

# 可选：覆盖 token（通常从 QR 登录自动保存）
# WEIXIN_TOKEN=你的机器人-token

# 可选：限制访问
WEIXIN_DM_POLICY=open
WEIXIN_ALLOWED_USERS=user_id_1,user_id_2

# 可选：为 Cron / 通知设置主频道
WEIXIN_HOME_CHANNEL=chat_id
WEIXIN_HOME_CHANNEL_NAME=Home
```

### 3\. 启动网关

```bash
hermes gateway
```

适配器将恢复保存的凭证，连接到 iLink API，并开始长轮询接收消息。

## 功能特性

- **长轮询传输** —— 无需公网端点、 Webhook **Webhook** 某个系统把事件主动推给另一个系统的回调地址。简单理解就是“有事发生时，对方主动来通知你”。例如平台在收到新消息后，把消息推给 Hermes。 或 WebSocket **WebSocket** 在客户端和服务器之间建立持久双向通信通道的协议。不像 HTTP 那样"问一次答一次"，WebSocket 建立连接后双方可以随时互相发送数据。Hermes 通过 WebSocket 连接到 Chrome 的 CDP 调试端口来操控浏览器，Browserbase 等云浏览器服务也使用 WebSocket 进行实时通信。
- **二维码登录** —— 通过 `hermes gateway setup` 实现扫码连接
- **私信与群组消息** —— 可配置访问策略
- **媒体支持** —— 图片、视频、文件和语音消息
- **AES-128-ECB 加密 CDN** —— 所有媒体传输自动加密/解密
- **上下文令牌持久化** —— 磁盘持久化，支持重启后继续回复
- **Markdown 格式化** —— 标题、表格和代码块会重新格式化以适配微信阅读
- **智能消息分块** —— 长消息在逻辑边界（段落、代码块）处自动拆分
- **输入提示** —— Agent **Agent** 具备自主性、能调用工具以完成目标的 AI 程序。Agent 是一种基于大语言模型的智能程序，能够感知环境、做出决策、调用工具执行操作，并自主推进任务——它不仅能读写文件、执行命令，还能操作浏览器、调用 API，与数字世界进行多轮交互。 处理时，微信客户端会显示“正在输入…”状态
- **SSRF **SSRF** 一种攻击方式：通过操纵服务器发起恶意请求，访问内部资源。攻击者让服务器"自己打自己"——比如你在 Agent 对话中让它访问某个 URL，这个 URL 实际指向了内网的敏感服务（如云平台的元数据接口）。Hermes 对 Agent 的网络请求有安全限制，部分目的就是防范 SSRF 攻击。 保护** —— 下载前验证出站媒体 URL
- **消息去重** —— 5 分钟滑动窗口防止重复处理
- **自动重试带退避机制** —— 可从临时 API 错误中恢复

## 配置选项

在 `config.yaml` 中的 `platforms.weixin.extra` 下设置以下选项：

| 键 | 默认值 | 描述 |
| --- | --- | --- |
| `account_id` | — | iLink Bot 账号 ID（必需） |
| `token` | — | iLink Bot 令牌（必需，由二维码登录自动保存） |
| `base_url` | `https://ilinkai.weixin.qq.com` | iLink API 基础 URL |
| `cdn_base_url` | `https://novac2c.cdn.weixin.qq.com/c2c` | 媒体传输的 CDN 基础 URL |
| `dm_policy` | `open` | 私信访问策略： `open` 、 `allowlist` 、 `disabled` 、 `pairing` |
| `group_policy` | `disabled` | 群组访问策略： `open` 、 `allowlist` 、 `disabled` |
| `allow_from` | `[]` | 允许私信的用户 ID 列表（当 `dm_policy=allowlist` 时） |
| `group_allow_from` | `[]` | 允许响应的群组 ID 列表（当 `group_policy=allowlist` 时） |

## 访问策略

### 私信策略（DM Policy）

控制谁可以向机器人发送私信：

| 值 | 行为 |
| --- | --- |
| `open` | 任何人都可以向机器人发送私信（默认） |
| `allowlist` | 仅 `allow_from` 列表中的用户 ID 可发送私信 |
| `disabled` | 所有私信均被忽略 |
| `pairing` | 配对模式（用于初始设置） |

```bash
WEIXIN_DM_POLICY=allowlist
WEIXIN_ALLOWED_USERS=user_id_1,user_id_2
```

### 群组策略（Group Policy）

控制机器人在哪些群组中响应：

| 值 | 行为 |
| --- | --- |
| `open` | 机器人在所有群组中响应 |
| `allowlist` | 机器人仅在 `group_allow_from` 列表中的群组 ID 中响应 |
| `disabled` | 所有群组消息均被忽略（默认） |

```bash
WEIXIN_GROUP_POLICY=allowlist
WEIXIN_GROUP_ALLOWED_USERS=group_id_1,group_id_2
```

> [!-secondary] -secondary
> 备注
> 
> 个人微信账号的默认群组策略为 `disabled` （与企业微信默认为 `open` 不同）。这是有意为之，因为个人微信账号可能加入大量群组。

## 媒体支持

### 入站（接收）

适配器接收用户发送的媒体附件，从微信 CDN 下载，解密后本地缓存，供 Agent 处理：

| 类型 | 处理方式 |
| --- | --- |
| **图片** | 下载、AES 解密，并缓存为 JPEG 格式。 |
| **视频** | 下载、AES 解密，并缓存为 MP4 格式。 |
| **文件** | 下载、AES 解密，并缓存。保留原始文件名。 |
| **语音** | 若有文字转录，提取为文本；否则下载 SILK 格式的音频并缓存。 |

**引用消息** ：来自被引用（回复）消息的媒体也会被提取，使 Agent **Agent** 具备自主性、能调用工具以完成目标的 AI 程序。Agent 是一种基于大语言模型的智能程序，能够感知环境、做出决策、调用工具执行操作，并自主推进任务——它不仅能读写文件、执行命令，还能操作浏览器、调用 API，与数字世界进行多轮交互。 能够了解用户回复的内容上下文。

### AES-128-ECB 加密 CDN

微信媒体文件通过加密 CDN 传输。适配器会透明地处理此过程：

- **入站（Inbound）：** 使用 `encrypted_query_param` URL 从 CDN 下载加密媒体，然后使用 AES-128-ECB 加密算法配合消息负载中提供的文件级密钥进行解密。
- **出站（Outbound）：** 文件在本地使用随机生成的 AES-128-ECB 密钥加密，上传至 CDN，加密后的引用信息包含在出站消息中。
- AES 密钥长度为 16 字节（128 位）。密钥可以以原始 base64 或十六进制编码形式到达 —— 适配器会自动处理这两种格式。
- 此功能需要安装 `cryptography` Python 包。

无需任何配置 —— 加密与解密过程自动完成。

### 出站（发送）

| 方法 | 发送内容 |
| --- | --- |
| `send` | 带有 Markdown 格式的文本消息 |
| `send_image` / `send_image_file` | 原生图片消息（通过 CDN 上传） |
| `send_document` | 文件附件（通过 CDN 上传） |
| `send_video` | 视频消息（通过 CDN 上传） |

所有出站媒体均通过加密 CDN 上传流程：

1. 生成一个随机的 AES-128 密钥
2. 使用 AES-128-ECB + PKCS#7 填充对文件进行加密
3. 通过 iLink API 请求上传 URL（ `getuploadurl` ）
4. 将密文上传至 CDN
5. 发送消息并附带加密媒体引用

## 上下文令牌持久化

iLink Bot API 要求每个出站消息必须回传与特定对端关联的 `context_token` 。适配器维护一个基于磁盘的上下文令牌存储：

- 每个账户+对端的令牌保存在 `~/.hermes/weixin/accounts/<account_id>.context-tokens.json`
- 启动时，先前保存的令牌会被恢复
- 每条入站消息都会更新对应发送者的存储令牌
- 出站消息会自动包含最新的上下文令牌

这确保了即使网关重启后仍能保持回复连续性。

## Markdown 格式化

微信个人聊天不原生支持完整的 Markdown 渲染。适配器会对内容进行重格式化以提升可读性：

- **标题** （ `# 标题` ）→ 转换为 `【标题】` （一级标题）或 `**标题**` （二级及以上）
- **表格** → 重格式化为带标签的键值列表（例如： `- 列名: 值` ）
- **代码块** → 保持原样（微信可良好渲染）
- **过多的空白行** → 合并为双换行

## 消息分块

长消息会智能拆分以适配聊天传输：

- 单条消息最大长度： **4000 字符**
- 拆分点优先选择段落边界和空行
- 代码块保持完整（不会在块内拆分）
- 缩进的续行（重格式化表格/列表中的子项）与父项保持在一起
- 超大单个块将 回退 **Fallback** 主方案不可用时自动切换到备用方案的容错机制。Plan A 不行了就走 Plan B。Hermes 中 Fallback 体现在多个层面：主模型调用失败时切换到备用模型（Fallback Provider），主 Provider 限流时轮换密钥（Credential Pool），核心逻辑都是 fallback。 至基础适配器的截断逻辑

## 输入状态指示

适配器会在微信客户端显示输入状态：

1. 当消息到达时，适配器通过 `getconfig` API 获取 `typing_ticket`
2. 每个用户的 `typing_ticket` 缓存 10 分钟
3. `send_typing` 发送输入开始信号； `stop_typing` 发送输入停止信号
4. 网关在 Agent **Agent** 具备自主性、能调用工具以完成目标的 AI 程序。Agent 是一种基于大语言模型的智能程序，能够感知环境、做出决策、调用工具执行操作，并自主推进任务——它不仅能读写文件、执行命令，还能操作浏览器、调用 API，与数字世界进行多轮交互。 处理消息期间自动触发输入状态指示

## 长轮询连接

适配器使用 HTTP 长轮询（非 WebSocket **WebSocket** 在客户端和服务器之间建立持久双向通信通道的协议。不像 HTTP 那样"问一次答一次"，WebSocket 建立连接后双方可以随时互相发送数据。Hermes 通过 WebSocket 连接到 Chrome 的 CDP 调试端口来操控浏览器，Browserbase 等云浏览器服务也使用 WebSocket 进行实时通信。 ）接收消息：

### 工作原理

1. **连接：** 验证凭证并启动轮询循环
2. **轮询：** 调用 `getupdates` ，设置 35 秒超时；服务器保持请求打开，直到有消息到达或超时
3. **分发：** 入站消息通过 `asyncio.create_task` 并发分发
4. **同步缓冲：** 持久化的同步游标（ `get_updates_buf` ）保存在磁盘，确保适配器重启后能从正确位置恢复

### 重试行为

在 API 错误时，适配器采用简单的重试策略：

| 条件 | 行为 |
| --- | --- |
| 临时错误（第 1–2 次） | 2 秒后重试 |
| 重复错误（第 3 次及以上） | 退避 30 秒，然后重置计数器 |
| 会话过期（ `errcode=-14` ） | 暂停 10 分钟（可能需要重新登录） |
| 超时 | 立即重新轮询（正常长轮询行为） |

### 去重

入站消息通过消息 ID 进行去重，窗口为 5 分钟。这可防止网络波动或重叠轮询响应导致的重复处理。

### 令牌锁

同一令牌仅允许一个 Weixin 网关实例使用。适配器在启动时获取作用域锁，并在关闭时释放。若已有其他网关正在使用相同令牌，启动将失败并显示提示性错误信息。

## 所有环境变量Environment Variable操作系统级别的键值对配置，程序启动时可读取。电脑里的"公共便签"——任何程序启动时都能查看上面的信息。Hermes 通过环境变量（如 \`OPENAI\_API\_KEY\`、\`HERMES\_TOOLS\`）存储 API 密钥和功能开关等配置，这些变量写在 \`~/.hermes/.env\` 文件中。

| 变量 | 必需 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `WEIXIN_ACCOUNT_ID` | ✅ | — | iLink Bot 账号 ID（来自二维码登录） |
| `WEIXIN_TOKEN` | ✅ | — | iLink Bot 令牌（通过二维码登录自动保存） |
| `WEIXIN_BASE_URL` | — | `https://ilinkai.weixin.qq.com` | iLink API 基础 URL |
| `WEIXIN_CDN_BASE_URL` | — | `https://novac2c.cdn.weixin.qq.com/c2c` | 媒体传输的 CDN 基础 URL |
| `WEIXIN_DM_POLICY` | — | `open` | 私信访问策略： `open` 、 `allowlist` 、 `disabled` 、 `pairing` |
| `WEIXIN_GROUP_POLICY` | — | `disabled` | 群组访问策略： `open` 、 `allowlist` 、 `disabled` |
| `WEIXIN_ALLOWED_USERS` | — | *(空)* | 用逗号分隔的用户 ID，用于私信 白名单 **Allowlist** 只允许特定来源、频道或用户访问的控制机制。就像"VIP 名单"——只有名单里的人才能跟 Hermes 交互。Hermes 的各消息平台（Telegram、Discord 等）都支持 allowlist 配置，未在白名单中的用户或频道会被自动拒绝。 |
| `WEIXIN_GROUP_ALLOWED_USERS` | — | *(空)* | 用逗号分隔的群组 ID，用于群组 白名单 **Allowlist** 只允许特定来源、频道或用户访问的控制机制。就像"VIP 名单"——只有名单里的人才能跟 Hermes 交互。Hermes 的各消息平台（Telegram、Discord 等）都支持 allowlist 配置，未在白名单中的用户或频道会被自动拒绝。 |
| `WEIXIN_HOME_CHANNEL` | — | — | 用于定时任务/通知输出的聊天 ID |
| `WEIXIN_HOME_CHANNEL_NAME` | — | `Home` | 主频道的显示名称 |
| `WEIXIN_ALLOW_ALL_USERS` | — | — | 网关级别标志，允许所有用户（由设置向导使用） |

## 故障排除

| 问题 | 解决方法 |
| --- | --- |
| `Weixin startup failed: aiohttp and cryptography are required` | 安装两者： `pip install aiohttp cryptography` |
| `Weixin startup failed: WEIXIN_TOKEN is required` | 运行 `hermes gateway setup` 完成二维码登录，或手动设置 `WEIXIN_TOKEN` |
| `Weixin startup failed: WEIXIN_ACCOUNT_ID is required` | 在 `.env` 文件中设置 `WEIXIN_ACCOUNT_ID` ，或运行 `hermes gateway setup` |
| `Another local Hermes gateway is already using this Weixin token` | 首先停止其他网关实例——每个令牌仅允许一个轮询器 |
| 会话已过期（ `errcode=-14` ） | 您的登录会话已过期。重新运行 `hermes gateway setup` 扫描新的二维码 |
| 设置过程中二维码已过期 | 二维码最多自动刷新 3 次。如果持续过期，请检查网络连接 |
| 机器人不响应私信 | 检查 `WEIXIN_DM_POLICY` —— 若设置为 `allowlist` ，发送者必须在 `WEIXIN_ALLOWED_USERS` 中 |
| 机器人忽略群消息 | 群组策略默认为 `disabled` 。请将 `WEIXIN_GROUP_POLICY` 设置为 `open` 或 `allowlist` |
| 媒体下载/上传失败 | 确保已安装 `cryptography` 。检查对 `novac2c.cdn.weixin.qq.com` 的网络访问权限 |
| `Blocked unsafe URL (SSRF protection)` | 外部媒体 URL 指向私有/内部地址。仅允许公共 URL |
| 语音消息显示为文本 | 若微信提供语音转文字，适配器将使用文本。这是预期行为 |
| 消息出现重复 | 适配器通过消息 ID 去重。若仍见重复，请检查是否运行了多个网关实例 |
| `iLink POST ... HTTP 4xx/5xx` | iLink 服务端 API 错误。请检查令牌有效性及网络连接 |
| 终端二维码无法渲染 | 安装 `qrcode` ： `pip install qrcode` 。或打开二维码上方打印的 URL |