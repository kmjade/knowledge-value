---
title: OpenCode 内容总览
tags:
  - para/resource/tech
  - 技术/AI
  - OpenCode
  - MOC
status: active
cssclasses:
  - resource-note
created: 2026-05-24
---

# OpenCode 内容总览

## 模块结构

```
OpenCode/
├── 00-MOCs/           # 导航与学习路径
├── 01-快速开始/        # 入门必读
├── 02-核心使用/        # TUI、CLI、Web、VSCode
├── 03-配置与定制/      # AGENTS、配置文件、主题、权限
├── 04-高级功能/        # Skills、Agent、MCP、LSP
├── 05-集成与生态/      # GitHub、GitLab、生态
├── 06-API提供商/       # 模型配置指南
└── 99-资源收集/        # 官方资源、常见问题
```

## 内容统计

| 模块 | 文件数 | 主要内容 |
|------|--------|----------|
| 01-快速开始 | 4 | 简介、安装、API设置、首次使用 |
| 02-核心使用 | 4 | TUI、CLI、Web、VSCode |
| 03-配置与定制 | 5 | AGENTS、配置文件、主题、快捷键、权限 |
| 04-高级功能 | 7 | Skills、Agent、MCP、LSP、自定义命令/工具 |
| 05-集成与生态 | 4 | GitHub、GitLab、生态系统 |
| 06-API提供商 | 2 | DeepSeek、模型选择 |
| 99-资源收集 | 2 | 官方资源、常见问题 |

## 核心概念速查

### 什么是 OpenCode？
开源 AI 编程 Agent，运行在终端中，可深度参与项目全流程开发。

### 三大核心特征
1. **上下文感知** - 突破单文件理解局限，深度掌握整个项目
2. **执行能力** - 直接修改文件、执行命令，落地开发动作
3. **工程化导向** - 聚焦代码规范、结构合理性、可维护性

### 关键命令速查

| 命令 | 作用 |
|------|------|
| `opencode` | 启动 TUI |
| `/connect` | 配置 API Key |
| `/model` | 切换模型 |
| `/init` | 创建 AGENTS.md |
| `@file` | 引用文件 |
| `!command` | 执行 shell 命令 |

### 配置文件位置

| 配置类型 | 路径 |
|----------|------|
| 项目配置 | `./opencode.json` |
| 项目规则 | `./AGENTS.md` |
| 全局配置 | `~/.config/opencode/opencode.json` |
| 全局规则 | `~/.config/opencode/AGENTS.md` |
| API 凭证 | `~/.local/share/opencode/auth.json` |

## 适用人群

| 人群 | 核心价值 |
|------|----------|
| 新手 | 降低学习门槛，快速入门编程 |
| 独立开发者 | 提升开发效率，减轻工作负担 |
| 团队 | 降低协作成本，统一代码规范 |

## 相关知识库

- [[AI员工搭建全流程指南]] - AI Agent 开发指南
- [[Claudian MCP 服务器]] - Claudian MCP 配置
