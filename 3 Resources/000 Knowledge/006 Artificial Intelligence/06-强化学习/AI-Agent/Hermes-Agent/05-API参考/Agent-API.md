---
title: Agent API
aliases:
  - Hermes Agent 配置参考
  - Hermes Agent CLI 配置
tags:
  - topic/hermes
  - topic/api
  - topic/ai-agent
created: 2026-05-25
modified: 2026-05-25
---

# Agent 配置参考

> [!important] 不是 Python API
> Hermes Agent 不提供 `from hermes import Agent` 这样的 Python SDK。
> 它是一个 CLI 应用，通过 `hermes` 命令和自然语言交互。

---

## CLI 命令参考

### 启动和会话

```bash
hermes                        # 交互式聊天
hermes chat -q "..."          # 单次查询
hermes --continue             # 恢复最近会话
hermes --resume <id>          # 恢复指定会话
hermes -s <skill>             # 预加载技能
hermes --yolo                 # 跳过命令审批
hermes --profile <name>       # 使用指定 Profile
```

### 模型和提供商

```bash
hermes model                  # 交互式选择
hermes chat -m model/name     # 指定模型
hermes chat --provider name   # 指定提供商
hermes login                  # OAuth 登录
hermes doctor                 # 健康检查
```

### 配置管理

```bash
hermes config                 # 查看配置
hermes config edit            # 编辑 config.yaml
hermes config set KEY VAL     # 设置配置项
hermes config path            # 配置文件路径
hermes config env-path        # .env 路径
hermes setup                  # 配置向导
```

### 工具和技能

```bash
hermes tools                  # 交互式管理工具
hermes tools list             # 列出工具
hermes tools enable/disable   # 开关工具

hermes skills list            # 已安装技能
hermes skills search QUERY    # 搜索技能
hermes skills install ID      # 安装技能
hermes skills update          # 更新技能
```

### 会话管理

```bash
hermes sessions list          # 列出会话
hermes sessions browse        # 交互式浏览
hermes sessions export OUT    # 导出
hermes sessions delete ID     # 删除
```

---

## config.yaml 关键配置

编辑：`hermes config edit`

| 配置路径 | 说明 | 默认值 |
|---------|------|--------|
| `model.default` | 默认模型 | - |
| `model.provider` | 默认提供商 | - |
| `agent.max_turns` | 每会话最大轮次 | 90 |
| `terminal.backend` | 终端后端 | local |
| `terminal.timeout` | 命令超时(秒) | 180 |
| `checkpoints.enabled` | 文件快照 | false |
| `approvals.mode` | 审批模式 | manual |
| `memory.memory_enabled` | 记忆功能 | true |
| `compression.enabled` | 上下文压缩 | true |
| `display.skin` | UI 主题 | - |
| `delegation.model` | 子智能体模型 | 继承主模型 |

### 审批模式

| 值 | 说明 |
|----|------|
| `manual` | 危险命令需要确认 |
| `smart` | LLM 辅助判断风险 |
| `off` | 跳过所有确认（= `--yolo`） |

---

## .env 密钥配置

编辑：`hermes config env-path`

```bash
# 推荐：一站式
OPENROUTER_API_KEY=sk-or-v1-xxxxx

# 单独提供商
ANTHROPIC_API_KEY=sk-ant-xxxxx
OPENAI_API_KEY=sk-xxxxx
DEEPSEEK_API_KEY=sk-xxxxx
GOOGLE_API_KEY=xxxxx
XAI_API_KEY=xxxxx
```

---

## 路径参考

| 路径 | 内容 |
|------|------|
| `~/.hermes/config.yaml` | 主配置 |
| `~/.hermes/.env` | API 密钥 |
| `~/.hermes/skills/` | 已安装技能 |
| `~/.hermes/sessions/` | 会话存储 |
| `~/.hermes/logs/` | 日志 |
| `~/.hermes/state.db` | 会话数据库 |

---

## 相关链接

- [[常用命令]] - CLI 命令速查表
- [[2 安装配置]] - 安装指南
- [官方配置文档](https://hermes-agent.nousresearch.com/docs/user-guide/configuration)
