---
title: Agent概述
aliases:
  - Agent Overview
  - 智能体概述
para: resource
domain:
  - "[[Hermes-Agent]]"
tags:
  - para/resource/tech
  - topic/ai-agent
  - topic/hermes
  - type/tutorial
  - difficulty/intermediate
created: 2026-05-24
modified: 2026-05-25
---

# Agent概述

> [!summary] 概述
> Hermes Agent 的智能体架构和工作原理。Hermes Agent 是一个 CLI 应用，不是 Python SDK。

> [!warning] 关于 Python API
> Hermes Agent 不提供 `from hermes import Agent` 这样的 Python SDK。
> 它通过 CLI（`hermes` 命令）和自然语言交互来工作。

---

## Agent 循环 (Agent Loop)

Hermes Agent 的核心是一个标准化的"工具调用循环"：

```
用户输入 → 构建 System Prompt → 调用 LLM
    ↓                                    ↓
工具结果 ← 执行工具 ← 解析 Tool Calls ← LLM 响应
    ↓
返回 LLM → 生成最终回复 → 输出给用户
```

### 伪代码

```
while turns < max_turns:
    response = llm.chat(messages, tools)
    if response has tool_calls:
        for each tool_call:
            result = execute_tool(tool_call)
            append result to messages
        continue  # 让 LLM 处理结果
    else:
        return response  # 最终文本回复
```

---

## 核心组件

| 组件 | 说明 | 实现位置 |
|------|------|---------|
| **System Prompt** | 包含环境信息、工具定义、用户记忆 | `agent/prompt_builder.py` |
| **Model Router** | 路由到选定的 LLM 提供商 | `agent/model_router.py` |
| **Tool Registry** | 工具发现和分发 | `tools/registry.py` |
| **Context Compression** | 自动压缩上下文防止超 token | `agent/compression.py` |
| **Memory** | 跨会话持久记忆 | 可插拔后端 |

---

## 工具集 (Toolsets)

Hermes Agent 内置了丰富的工具集，通过 `hermes tools` 管理：

| 工具集 | 提供的能力 |
|--------|-----------|
| `terminal` | Shell 命令执行、后台进程管理 |
| `file` | 文件读写、搜索、补丁 |
| `web` | 网络搜索和内容提取 |
| `browser` | 浏览器自动化 |
| `skills` | 技能加载和管理 |
| `memory` | 跨会话记忆读写 |
| `delegation` | 子智能体任务委派 |
| `cronjob` | 定时任务管理 |
| `session_search` | 历史会话搜索 |
| `todo` | 会话内任务跟踪 |
| `vision` | 图像分析 |
| `image_gen` | AI 图像生成 |
| `tts` | 文本转语音 |

更多工具集参考：[[工具系统]]

---

## 会话管理

### 生命周期

```
hermes                    # 新会话
    ↓
交互式对话 (多轮)
    ↓
/quit 或 Ctrl+C          # 结束
```

### 会话恢复

```bash
hermes --continue         # 恢复最近会话
hermes --resume <id>      # 恢复指定会话
hermes sessions list      # 列出所有会话
hermes sessions browse    # 交互式浏览
```

### 会话内命令

| 命令 | 说明 |
|------|------|
| `/new` | 新会话（重置上下文） |
| `/model <name>` | 切换模型 |
| `/skill <name>` | 加载技能 |
| `/tools` | 管理工具开关 |
| `/history` | 查看对话历史 |
| `/compress` | 手动压缩上下文 |
| `/undo` | 撤销上一次交换 |
| `/yolo` | 切换审批绕过 |
| `/quit` | 退出 |

---

## 配置管理

```bash
hermes config              # 查看配置
hermes config edit         # 编辑 config.yaml
hermes config set KEY VAL  # 设置配置项
hermes model               # 交互式选择模型
hermes setup               # 配置向导
```

关键配置项：

| 配置 | 默认值 | 说明 |
|------|--------|------|
| `agent.max_turns` | 90 | 每会话最大工具调用轮次 |
| `terminal.timeout` | 180 | 命令超时（秒） |
| `checkpoints.enabled` | false | 文件系统快照 |
| `approvals.mode` | manual | 命令审批级别 |
| `memory.memory_enabled` | true | 记忆功能 |

---

## 相关链接

- [[工具系统]] - 工具集详解
- [[协议规范]] - OpenAI 兼容 function calling
- [[工作流]] - 单/多智能体工作流
