---
title: Hermes Desktop
aliases:
  - Hermes 桌面版
  - hermes-desktop
para: resource
domain:
  - "[[3 Resources/000 Knowledge/Computer-Science/Artificial-Intelligence/06-强化学习/AI-Agent/Hermes-Agent/Hermes-Agent]]"
tags:
  - para/resource/tech
  - topic/ai-agent
  - topic/hermes
  - type/reference
created: 2026-05-27
source:
  - https://github.com/fathah/hermes-desktop
  - https://hermesagents.cc/
---

# Hermes Desktop

> [!info] 概述
> Hermes Desktop 是 Hermes Agent 的原生桌面应用（Electron），将 CLI 的全部功能包装为图形界面。无需手动管理命令行，通过 GUI 完成安装、配置、聊天、网关管理、技能管理、定时任务等所有操作。**复用 `~/.hermes/` 配置目录**，与 CLI 版完全兼容。

> [!tip] 与 CLI 的关系
> - **Hermes Agent CLI** = 命令行版本（`hermes` 命令）
> - **Hermes Desktop** = 桌面 GUI 版本（Electron 封装）
> - 两者共享同一套 `~/.hermes/` 配置、会话、技能和记忆
> - Desktop 内部调用官方 Hermes 安装脚本，第一次启动自动完成安装

---

## 项目信息

| 项目 | 说明 |
|------|------|
| **仓库** | [fathah/hermes-desktop](https://github.com/fathah/hermes-desktop) |
| **最新版本** | v0.5.1 (2026-05-25) |
| **许可证** | MIT |
| **技术栈** | Electron + React + TypeScript |
| **下载** | https://hermesagents.cc/ |
| **Telegram** | https://t.me/hermes_agent_desktop |

---

## 安装

### Windows

| 文件 | 大小 | 说明 |
|------|------|------|
| `hermes-desktop-0.5.1-setup.exe` | ~115 MB | 安装版 |
| `hermes-desktop-0.5.1-portable.exe` | ~115 MB | 便携版（免安装） |

> [!warning] SmartScreen 警告
> 安装包未做代码签名，首次启动时 Windows SmartScreen 会拦截。点击 **"更多信息" → "仍要运行"** 即可。

### macOS

```bash
# 下载 .dmg 文件，安装后解除隔离
xattr -cr "/Applications/Hermes Agent.app"
```

### Linux

| 格式 | 文件 |
|------|------|
| AppImage | `hermes-desktop-0.5.1.AppImage` |
| Debian/Ubuntu | `hermes-desktop_0.5.1_amd64.deb` |
| Fedora/RPM | `hermes-desktop-0.5.1.rpm` |

---

## 首次启动流程

1. **检测安装** → 检查 `~/.hermes` 是否已有 Hermes Agent
2. **自动安装** → 如未安装，运行官方安装脚本完成安装
3. **Provider 配置** → 引导选择 API 提供商和模型
4. **开始聊天** → 安装完成后直接进入对话界面

---

## 功能面板

### Chat（对话）
- 流式 SSE 对话，Markdown 渲染 + 语法高亮
- **22 个斜杠命令**：`/new` `/clear` `/fast` `/web` `/image` `/browse` `/code` `/shell` `/usage` `/help` `/tools` `/skills` `/model` `/memory` `/persona` `/version` `/compact` `/compress` `/undo` `/retry` `/debug` `/status`
- Token 用量实时追踪（Prompt + Completion + 费用）
- 右键上下文菜单（复制/粘贴/全选）
- 可折叠的工具调用历史（工具名 + 输入/输出 + 推理步骤）
- **对话级上下文文件夹** — 可将本地文件夹固定到对话，文件作为上下文

### Sessions（会话）
- SQLite FTS5 全文搜索
- 按日期分组的历史记录
- 跨会话搜索和恢复

### Profiles（配置文件）
- 创建/删除/切换独立的 Hermes 环境
- 每个 Profile 拥有隔离的配置、会话、技能和记忆

### Providers（提供商）
支持 **12+ 提供商**，含 OAuth 免密钥登录：

| 类型 | 提供商 |
|------|--------|
| **API Key** | OpenRouter、Anthropic、OpenAI、Google (Gemini)、xAI (Grok)、DeepSeek、Groq、Hugging Face |
| **OAuth 登录** | ChatGPT (Codex)、xAI Grok、Qwen、Gemini CLI、MiniMax |
| **本地端点** | LM Studio、Ollama、vLLM、llama.cpp（OpenAI 兼容 API） |
| **Portal** | Nous Portal |

- 模型名称实时自动补全（从 `/v1/models` 动态获取）
- OAuth 设备码流程：自动打开浏览器 + 复制验证码

### Gateway（消息网关）
GUI 管理 16 个消息平台的接入和启停：

| 平台 | 语音 | 图片 | 文件 | 线程 | 流式 |
|------|:--:|:--:|:--:|:--:|:--:|
| Telegram | ✅ | ✅ | ✅ | ✅ | ✅ |
| Discord | ✅ | ✅ | ✅ | ✅ | ✅ |
| Slack | ✅ | ✅ | ✅ | ✅ | ✅ |
| WhatsApp | — | ✅ | ✅ | — | ✅ |
| Signal | — | ✅ | ✅ | — | ✅ |
| Matrix | ✅ | ✅ | ✅ | ✅ | ✅ |
| Mattermost | ✅ | ✅ | ✅ | ✅ | ✅ |
| 飞书/Lark | ✅ | ✅ | ✅ | ✅ | ✅ |
| 企业微信 | ✅ | ✅ | ✅ | — | ✅ |
| 微信 | ✅ | ✅ | ✅ | — | ✅ |
| DingTalk（钉钉） | — | — | — | — | ✅ |
| Email（邮件） | — | ✅ | ✅ | ✅ | — |
| SMS（短信） | — | — | — | — | — |
| Home Assistant | — | — | — | — | — |
| BlueBubbles (iMessage) | — | ✅ | ✅ | — | — |
| Webhooks | — | — | — | — | — |

### Tools（工具）
**14 个工具集**的图形化启用/禁用管理：
- Web（搜索、抓取）、Browser（浏览器自动化）
- Terminal（终端命令）、File（文件操作）
- Code Execution（代码执行）、Vision（视觉识别）
- Image Gen（图像生成）、TTS（语音合成）
- Skills（技能系统）、Memory（记忆系统）
- Session Search（会话搜索）、Clarify（澄清问答）
- Delegation（委托）、MoA（多智能体编排）
- Task Planning（任务规划）

### Memory（记忆）
- 查看/编辑记忆条目
- 用户 Profile 记忆管理
- 容量追踪
- 7 种可插拔记忆后端：Honcho、Hindsight、Mem0、RetainDB、Supermemory、ByteRover

### Skills（技能）
- 查看已安装技能列表
- 安装/卸载技能
- 安装失败时显示明确错误信息

### Persona（人格）
- 编辑 Agent 的 `SOUL.md` 人格描述
- 一键重置为默认

### Schedules（定时任务）
- Cron 任务构建器（每分钟/每小时/每天/每周/自定义 Cron）
- 15 种交付目标
- 可视化管理所有定时任务

### Kanban & Office（Claw3D）
- 本地 Kanban 看板 + Claw3D HQ 只读看板
- Hermes Office (Claw3D) 3D 可视化界面
- 开发服务器和适配器管理
- SSH 远程模式支持

### Settings（设置）
- 提供商和模型管理
- 完整数据备份/恢复
- 系统诊断 Debug Dump
- SSH 隧道配置（VPS 远程管理）

---

## 架构要点

### 运行模式

| 模式 | 说明 |
|------|------|
| **本地模式** | Hermes 运行在 `127.0.0.1:8642` |
| **远程模式** | 连接远程 Hermes API 服务器（URL + API Key） |
| **SSH 隧道** | 通过 SSH 隧道连接 VPS 上的 Hermes 实例 |

### 数据目录

```
~/.hermes/                   # 与 CLI 版完全共享
├── config.yaml              # 主配置（Desktop 和 CLI 共用）
├── .env                     # API 密钥
├── hermes-agent/            # Agent 源码（安装脚本拉取）
├── skills/                  # 已安装技能
├── sessions/                # 会话存储
├── logs/                    # 日志
├── profiles/                # 多 Profile 隔离配置
│   └── <profile-name>/
│       └── state.db         # 独立会话数据库
└── gateway.json             # 网关平台配置
```

> [!important] 与 CLI 共存
> Desktop 和 CLI 共享 `~/.hermes/` 目录。在 Desktop 中修改配置、切换模型、安装技能，CLI 中直接生效，反之亦然。不同 Profile 拥有独立的 `state.db`。

---

## v0.5.0 更新亮点

### 对话增强
- **对话级上下文文件夹** — 将本地文件夹固定到会话，文件自动作为上下文
- **工具调用历史可折叠** — 聊天历史中可视化展示工具调用、输出和推理步骤
- **右键上下文菜单** — 原生右键菜单支持复制/粘贴/全选/复制全部聊天

### 提供商增强
- **OAuth 应用内登录** — ChatGPT Codex、xAI Grok、Qwen、Gemini CLI、MiniMax 免 API Key 登录
- **模型实时发现** — 模型名称字段从提供商 `/v1/models` 动态自动补全

### 构建与 CI
- **Windows 便携版** — 新增 `win-portable` 构建目标
- **GitHub Actions CI** — 每次 Push 和 PR 自动 Typecheck + 全量测试

### Bug 修复
- 会话界面正确读取当前 Profile 的 `state.db`
- 网关会话 ID 在切换会话时同步，不丢失上下文
- SSH 模式网关操作通过 `systemd` 路由

---

## 相关链接

- [[2 安装配置]] — CLI 安装方式
- [[消息网关]] — 网关详细文档
- [[GitHub仓库]] — 仓库地址汇总
- [[3 Resources/000 Knowledge/Computer-Science/Artificial-Intelligence/06-强化学习/AI-Agent/Hermes-Agent/Hermes-Agent]] — 知识库首页
- [官方下载](https://hermesagents.cc/)
- [GitHub Releases](https://github.com/fathah/hermes-desktop/releases)
