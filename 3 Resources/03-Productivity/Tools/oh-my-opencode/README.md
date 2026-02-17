---
title: oh-my-opencode 知识库
tags: [tool, ai, productivity, opencode, oh-my-opencode]
created: 2026-02-16
updated: 2026-02-16
---

# oh-my-opencode 知识库

> oh-my-opencode 是 OpenCode 的编排层，提供多代理、Hooks、工作流自动化等功能。

---

## 📚 知识库结构

### 核心内容
- [[01-快速开始]] - 安装和配置指南
- [[02-Agent指南]] - 各种 Agent 使用说明
- [[03-Hooks工作流]] - Hook 系统详解
- [[04-MCP集成]] - MCP 集成配置
- [[05-技巧和最佳实践]] - 使用技巧和最佳实践
- [[06-故障排除]] - 常见问题解决

---

## 🤖 核心功能

| 功能 | 说明 |
|------|------|
| **多代理编排** | 多代理并行工作，自动协调 |
| **20+ Hooks** | 工作流自动化 |
| **MCP 集成** | Context7、grep.app 等 |
| **LSP 支持** | 语言服务器协议 |
| **多模型支持** | Claude、OpenAI、Gemini 等 |

---

## 🚀 快速开始

### 安装

```bash
npx oh-my-opencode install --no-tui --claude=max20 --gemini=no --copilot=no
```

### 基本使用

```bash
opencode                    # 启动
opencode --agent sisyphus  # 使用 Sisyphus 代理
opencode --agent librarian  # 使用 Librarian 代理
```

---

## 📋 相关资源

- 官网：https://ohmyopencode.com/
- GitHub：https://github.com/code-yeongyu/oh-my-opencode
- 配置文件：`C:\Users\thinkpad\.config\opencode\oh-my-opencode.json`
