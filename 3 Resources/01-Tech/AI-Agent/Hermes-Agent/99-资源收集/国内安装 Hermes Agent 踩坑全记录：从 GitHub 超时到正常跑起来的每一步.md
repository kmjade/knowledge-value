---
title: "国内安装 Hermes Agent 踩坑全记录：从 GitHub 超时到正常跑起来的每一步"
source: "https://www.cnblogs.com/itech/p/19862085"
author:
  - "[[iTech]]"
published: 2026-04-13
created: 2026-05-25
description: "国内安装 Hermes Agent 踩坑全记录：从 GitHub 超时到正常跑起来的每一步 Hermes Agent 是 Nous Research 开源的\"自我进化\"AI Agent——它能从使用经验中自动创建 Skill，持续优化自己的能力，还能通过 Telegram、Dis"
tags:
  - "clippings"
---
Hermes Agent 是 Nous Research 开源的"自我进化"AI Agent——它能从使用经验中自动创建 Skill，持续优化自己的能力，还能通过 Telegram、Discord、Slack 等平台跟你聊天。75000 Star，MIT 协议，听着很美好。

但如果你在国内，照着官方文档一条命令装下来，大概率卡在第一步。git clone 超时、pip install 挂掉、npm 依赖下不动、Playwright 浏览器下载失败……每一个环节都能让你怀疑人生。

我花了一整天踩完所有坑，把完整的解决方案整理出来，帮你跳过这些弯路。

## 本文提纲

1. Hermes Agent 是什么
2. 安装前准备：环境要求
3. 坑一：git clone 超时
4. 坑二：uv 和 pip 依赖安装失败
5. 坑三：Node.js 和 npm 依赖卡住
6. 坑四：Playwright 浏览器下载失败
7. 坑五：首次 setup 向导的网络问题
8. 坑六：模型 API 在国内的可用性
9. 完整的国内安装脚本
10. 安装完成后的验证

## Hermes Agent 是什么

简单说，它是一个能自我改进的 AI Agent 框架，用 Python 写的。核心亮点：

- **自学习循环** ：复杂任务完成后自动创建 Skill，使用过程中持续优化
- **多平台接入** ：Telegram、Discord、Slack、WhatsApp、Signal、CLI 都能用
- **多种终端后端** ：本地、Docker、SSH、Daytona、Modal 等
- **40+ 内置工具** ：Web 搜索、文件操作、终端命令等
- **支持国产模型** ：Kimi/Moonshot、MiniMax、阿里通义千问、DeepSeek

技术栈：

**MERMAID\_BLOCK\_0**

## 安装前准备：环境要求

先确认你机器上有这些东西：

| 依赖 | 版本要求 | 检查命令 |
| --- | --- | --- |
| Python | 3.11+ | `python3 --version` |
| Git | 任意 | `git --version` |
| Node.js | 22+ | `node --version` |
| 磁盘空间 | ~2GB | 含 Playwright Chromium |

**Python 版本不对？** 推荐用 pyenv 管理：

```csharp
curl -fsSL https://pyenv.run | bash
pyenv install 3.11
pyenv global 3.11
```

**Node.js 没装？** 用 nvm：

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
nvm install 22
```

当然，这两个命令本身在国内也可能超时。往下看解决方案。

## 坑一：git clone 超时

官方安装脚本第一步就是 `git clone https://github.com/NousResearch/hermes-agent.git` 。在国内直连 GitHub，这个操作大概率卡死。

### 方案 A：GitCode 镜像（推荐）

GitCode 是国内最稳定的 GitHub 镜像之一，速度快、无需代理：

```bash
git clone https://gitcode.com/GitHub_Trending/he/hermes-agent.git ~/.hermes/hermes-agent
```

### 方案 B：GitHub 镜像站

如果 GitCode 访问有问题，可以用这些镜像加速站：

```bash
git clone https://ghfast.top/https://github.com/NousResearch/hermes-agent.git ~/.hermes/hermes-agent
```

| 镜像站 | 用法 |
| --- | --- |
| GitCode（推荐） | `https://gitcode.com/GitHub_Trending/he/hermes-agent.git` |
| ghfast.top | `https://ghfast.top/https://github.com/...` |
| ghproxy.cn | `https://ghproxy.cn/https://github.com/...` |

### 方案 C：设置 Git 全局代理

如果你有代理，直接配 Git：

```verilog
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890
```

用完记得取消：

```
git config --global --unset http.proxy
git config --global --unset https.proxy
```

## 坑二：uv 和 pip 依赖安装失败

Hermes Agent 用 [uv](https://github.com/astral-sh/uv) 作为包管理器（Termux 上降级为 pip）。无论哪个，核心问题是 PyPI 官方源在国内太慢。

### uv 镜像配置

```bash
export UV_INDEX_URL=https://mirrors.aliyun.com/pypi/simple/
```

或者用清华源：

```bash
export UV_INDEX_URL=https://pypi.tuna.tsinghua.edu.cn/simple/
```

写入 `~/.bashrc` 或 `~/.zshrc` 持久化：

```bash
echo 'export UV_INDEX_URL=https://mirrors.aliyun.com/pypi/simple/' >> ~/.bashrc
source ~/.bashrc
```

### pip 镜像配置（备用）

如果安装脚本用的是 pip 而非 uv：

```csharp
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple/
pip config set global.trusted-host mirrors.aliyun.com
```

### 手动装依赖

如果一键安装脚本的依赖步骤挂了，可以手动来：

```bash
cd ~/.hermes/hermes-agent

uv venv venv --python 3.11
source venv/bin/activate

uv pip install -e ".[all]"
```

`.[all]` 会安装所有可选依赖。如果只想体验核心功能，可以先装最小集：

```
uv pip install -e ".[cli,cron,mcp,pty,honcho]"
```

后面需要再加 `messaging` （Telegram/Discord）、 `voice` （语音）等。

**常见报错** ：

| 报错 | 原因 | 解决 |
| --- | --- | --- |
| `Failed to build wheel for xxx` | 缺少 C 编译工具链 | `sudo apt install build-essential python3-dev` |
| `ResolutionImpossible` | 依赖版本冲突 | 删掉 venv 重建，或用 `--reinstall` |
| `ConnectionTimeout` | PyPI 源超时 | 换镜像源 |

## 坑三：Node.js 和 npm 依赖卡住

Hermes Agent 的浏览器工具和 WhatsApp Bridge 需要 Node.js 依赖。 `npm install` 默认从 npmjs.org 拉包，国内也可能超时。

### npm 镜像配置

```bash
npm config set registry https://registry.npmmirror.com
```

设置完后验证：

```csharp
npm config get registry
# 应该输出: https://registry.npmmirror.com
```

### 手动装 Node 依赖

安装脚本里 npm install 失败的话，手动跑：

```bash
cd ~/.hermes/hermes-agent
npm install --registry=https://registry.npmmirror.com

cd scripts/whatsapp-bridge
npm install --registry=https://registry.npmmirror.com
```

## 坑四：Playwright 浏览器下载失败

这是最大的坑之一。Playwright 需要下载 Chromium 浏览器，约 150MB。默认从 Microsoft CDN 下载，国内经常超时或被墙。

### 方案 A：设置 Playwright 镜像

```bash
export PLAYWRIGHT_DOWNLOAD_HOST=https://npmmirror.com/mirrors/playwright
```

然后重试：

```bash
cd ~/.hermes/hermes-agent
npx playwright install chromium
```

### 方案 B：跳过浏览器安装

如果你暂时不需要浏览器工具（Web 搜索、网页抓取等），可以先跳过：

```bash
# 修改 config.yaml，禁用 browser 工具
hermes config set tools.browser.enabled false
```

等网络好的时候再装：

```cpp
PLAYWRIGHT_DOWNLOAD_HOST=https://npmmirror.com/mirrors/playwright npx playwright install --with-deps chromium
```

### 方案 C：用系统 Chromium

Ubuntu/Debian：

```javascript
sudo apt install chromium-browser
export PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium-browser
```

## 坑五：首次 setup 向导的网络问题

装完后运行 `hermes setup` ，向导会让你选 LLM 提供商。这里涉及 OAuth 认证或 API 连接测试，有些在国内也会有问题。

**建议** ：跳过向导里的在线验证，手动写配置文件。

```bash
# 编辑配置文件
vim ~/.hermes/config.yaml
```

配置示例（以 DeepSeek 为例，国内最顺畅的选择）：

```yaml
model:
  provider: deepseek
  name: deepseek-chat

providers:
  deepseek:
    api_key: ${DEEPSEEK_API_KEY}
```

然后在 `~/.hermes/.env` 里写 API Key：

```bash
echo 'DEEPSEEK_API_KEY=sk-your-key-here' >> ~/.hermes/.env
```

## 坑六：模型 API 在国内的可用性

Hermes Agent 要求模型至少 64K token 上下文。以下是国内开发者的实测可用性：

| 提供商 | 国内直连 | 配置难度 | 推荐度 |
| --- | --- | --- | --- |
| **DeepSeek** | 直连，速度快 | 低，API Key 即可 | 首选 |
| **Kimi/Moonshot** | 直连 | 低 | 推荐 |
| **MiniMax 国内** | 直连 | 低 | 推荐 |
| **阿里通义千问** | 直连 | 低，DashScope API Key | 推荐 |
| **Hugging Face** | 基本不通 | 需代理 | 不推荐 |
| **Anthropic** | 不通 | 需代理或第三方转发 | 有代理可用 |
| **OpenAI** | 不通 | 需代理或第三方转发 | 有代理可用 |
| **OpenRouter** | 偶尔能通 | 不稳定 | 备选 |

**国内最省心的选择** ：DeepSeek。API 申请快（几小时），价格便宜，直连稳定，中文能力也不错。

```bash
hermes model
# 选 DeepSeek，输入 API Key
```

## 完整的国内安装脚本

把上面的所有解决方案串起来，我基于官方 `install.sh` 做了一份国内镜像版。核心改动：

| 环节 | 官方源 | 国内镜像版 |
| --- | --- | --- |
| git clone | github.com | **gitcode.com** |
| Python 包 | pypi.org | **mirrors.aliyun.com** |
| npm 包 | npmjs.org | **registry.npmmirror.com** |
| Playwright 浏览器 | Microsoft CDN | **npmmirror.com/mirrors/playwright** |
| Node.js 下载 | nodejs.org | **npmmirror.com/mirrors/node** |
| uv 安装 | astral.sh | **ghfast.top 代理** |

一行命令安装：

```bash
curl -fsSL https://raw.githubusercontent.com/itech001/theaiera/main/scripts/install-cn.sh | bash
```

或者先下载再运行（方便检查或修改）：

```powershell
curl -fsSL https://raw.githubusercontent.com/itech001/theaiera/main/scripts/install-cn.sh -o install-cn.sh
chmod +x install-cn.sh
./install-cn.sh
```

脚本启动时会显示所有使用的镜像源：

```java
┌─────────────────────────────────────────────────────────┐
│       ⚕ Hermes Agent Installer (China Mirrors)        │
├─────────────────────────────────────────────────────────┤
│  All downloads use Chinese mirror sources               │
│  gitcode.com · aliyun pypi · npmmirror · npmmirror pw  │
└─────────────────────────────────────────────────────────┘

⚑ Using China mirror sources:

   Git:       gitcode.com
   PyPI:      https://mirrors.aliyun.com/pypi/simple/
   npm:       https://registry.npmmirror.com
   Playwright:https://npmmirror.com/mirrors/playwright
   Node.js:   https://npmmirror.com/mirrors/node
```

也支持和官方脚本一样的参数：

```bash
./install-cn.sh --skip-setup       # 跳过配置向导
./install-cn.sh --dir /opt/hermes  # 指定安装目录
./install-cn.sh --no-venv          # 不创建虚拟环境
```

脚本源码在 `scripts/install-cn.sh` ，可以自行查看和修改。

## 安装完成后的验证

跑完安装，用这些命令确认一切正常：

```
hermes doctor
```

`hermes doctor` 会检查环境配置、依赖完整性、模型连接等。全部通过就说明没问题。

启动第一次对话：

```
hermes
```

你会看到一个 TUI 界面，显示当前模型、可用工具和 Skill。输入任何问题试试：

```
❯ 你好，介绍一下你自己
```

如果能正常回复，恭喜你，所有坑都过了。

**常用命令速查** ：

| 命令 | 功能 |
| --- | --- |
| `hermes` | 启动交互式 CLI |
| `hermes model` | 切换 LLM 模型 |
| `hermes tools` | 配置启用的工具 |
| `hermes setup` | 完整配置向导 |
| `hermes doctor` | 诊断问题 |
| `hermes update` | 更新版本 |
| `hermes gateway` | 启动消息网关（Telegram 等） |
| `hermes --continue` | 恢复上次对话 |

**如果你从 OpenClaw 迁移** ：

```dockerfile
hermes claw migrate --dry-run   # 先预览
hermes claw migrate              # 确认迁移
```

会自动导入 SOUL.md、记忆、Skill、API Key 等数据。

---

**作者**: TheAIEra  
**来源**: 公众号：AI 人工智能时代

*本文首发于 AI 人工智能时代，转载请注明出处。*

公众号：AI人工智能时代。 每日AI新闻和技术博客，主页：https://www.theaiera.cn