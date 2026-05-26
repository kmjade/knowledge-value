---
title: Hermes Agent
aliases:
  - Hermes Agent 资源索引
  - Hermes 智能体框架
para: resource
domain:
  - "[[AI-Agent]]"
  - "[[LLM]]"
  - "[[Nous Research]]"
tags:
  - para/resource/tech
  - topic/ai-agent
  - topic/hermes
  - topic/llm
  - topic/tool-calling
  - type/moc
created: 2026-05-24
modified: 2026-05-25
source:
  - https://hermes-agent.nousresearch.com/docs/
  - https://github.com/NousResearch/hermes-agent
---

# Hermes Agent

> [!info] 知识库概述
> Hermes Agent 是 Nous Research 开发的开源 AI 智能体**框架**，可在终端、消息平台和 IDE 中运行。属于 Claude Code（Anthropic）、Codex（OpenAI）同类的自主编程和任务执行智能体。支持 **38 个** LLM 提供商（OpenRouter、Anthropic、OpenAI、DeepSeek、国内厂商、本地模型等），可在 Linux、macOS 和 WSL 上运行。

> [!warning] 重要区分
> - **Hermes Agent** = AI 智能体**框架**（本知识库主题）——用自然语言驱动，内置 terminal/file/web 等工具
> - **Hermes 3** = Nous Research 的 **LLM 模型**系列（8B/70B/405B），可在 Hermes Agent 中作为本地模型使用
> - 两者是不同产品。Hermes Agent ≠ Python SDK，它是一个 CLI 应用。

---

## 项目概述

| 项目 | 说明 |
|------|------|
| **开发者** | Nous Research |
| **类型** | 开源 AI 智能体框架 |
| **安装** | `curl ... \| bash` 一键安装 |
| **定位** | 终端/消息平台/IDE 中的自主 AI 助手 |
| **特点** | 技能系统、持久记忆、多平台网关、提供商无关、多 Profile |
| **许可证** | MIT |
| **官方文档** | https://hermes-agent.nousresearch.com/docs/ |
| **GitHub** | https://github.com/NousResearch/hermes-agent |

---

## 核心特性

| 特性 | 说明 |
|------|------|
| **Skills 技能系统** | 从经验中学习，保存可复用程序为技能文档，越用越聪明 |
| **Memory 持久记忆** | 跨会话记住用户偏好、环境细节，可插拔后端 |
| **Gateway 多平台网关** | 同一智能体运行在 Telegram、Discord、Slack 等 15+ 平台 |
| **Provider 无关** | 20+ LLM 提供商，随时切换，凭证池自动轮换 |
| **多 Profile** | 运行多个隔离实例，独立配置/会话/技能/记忆 |

---

## 快速开始

```bash
# 安装
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash

# 启动
hermes

# 配置
hermes setup
hermes model     # 选择模型
```

---

## 文档结构

### 一、快速开始

| 文档 | 说明 |
|------|------|
| [[1 简介]] | Hermes Agent 是什么 |
| [[2 安装配置]] | 安装和 API 配置 |
| [[3 第一个智能体]] | 第一个交互式会话 |
| [[常用命令]] ⭐ | CLI 命令速查表 |

### 二、核心概念

| 文档                  | 说明                         |
| ------------------- | -------------------------- |
| [[Agent概述]] | 智能体架构和 Agent 循环            |
| [[工具系统]]    | Toolsets 工具集详解             |
| [[协议规范]]    | OpenAI 兼容 function calling |
| [[工作流]]     | 单/多智能体工作流                  |

### 三、提供商会话

| 文档                      | 说明                          |
| ----------------------- | --------------------------- |
| [[Hermes-3概览]]  | Nous Research 的 LLM 模型系列（附） |
| [[Hermes-3-8B]] | 轻量级本地模型                     |
| [[Hermes-3-70B]]        |                             |
| [[Hermes-3-405B]]       |                             |
| [[Agent-API]]  | 配置项详解                       |

### 四、工具调用

| 文档                      | 说明                  |
| ----------------------- | ------------------- |
| [[工具调用格式]]      | function calling 详解 |
| [[JSON-Schema]] | 参数定义规范              |
| [[工具执行模式]]      | 同步/异步/链式            |
| [[错误处理]]        | 重试和回退               |

### 五、集成指南

| 文档                       | 说明  |
| ------------------------ | --- |
| [[LangChain集成]]  | 待更新 |
| [[AutoGen集成]]    | 待更新 |
| [[LlamaIndex集成]] | 待更新 |
| [[MCP协议集成]]      | 待更新 |

### 六、高级主题

| 文档                  |     |
| ------------------- | --- |
| [[自定义工具开发]] | 待更新 |
| [[多智能体协作]]  | 待更新 |
| [[记忆与状态管理]] | 待更新 |
| [[性能优化]]    | 待更新 |

### 七、实践案例

| 文档                  | 说明  |
| ------------------- | --- |
| [[天气查询智能体]] | 待更新 |
| [[多工具智能体]]  | 待更新 |
| [[编程助手]]    | 待更新 |
| [[数据分析智能体]] | 待更新 |

### 八、问题解决

| 文档                        | 说明                 |
| ------------------------- | ------------------ |
| [[Windows-WSL问题]] | Windows 和 WSL 相关问题 |

### 九、资源收集

| 文档                   | 说明   |
| -------------------- | ---- |
| [[0 Inbox/_processed/AI-Agent/Hermes-Agent/99-资源收集/官方文档]]     | 链接汇总 |
| [[GitHub仓库]] | 仓库说明 |
| [[社区资源]]     | 社区链接 |

---

## 快速导航

- 🚀 [[1 简介|Hermes Agent 简介]] — 从这里开始
- 🛠️ [[2 安装配置|安装配置]] — 安装只需一条命令
- 🤖 [[3 第一个智能体|第一个智能体]] — 启动第一个会话
- ⌨️ [[常用命令]] — 命令速查表

---

## 最近更新

```dataview
Table without id file.link as "文件", file.mtime as "更新时间"
WHERE contains(file.path, this.file.folder) AND file.name != this.file.name
SORT file.mtime DESC
LIMIT 10
```

---

## 官方资源

- **官方文档（英文）**: https://hermes-agent.nousresearch.com/docs/
- **中文社区文档**: https://hermesagent.org.cn/ — 国内用户推荐（含 DeepSeek 配置、飞书教程）
- **中文配置向导**: https://hermesagent.org.cn/docs/getting-started/setup-wizard
- **GitHub**: https://github.com/NousResearch/hermes-agent
