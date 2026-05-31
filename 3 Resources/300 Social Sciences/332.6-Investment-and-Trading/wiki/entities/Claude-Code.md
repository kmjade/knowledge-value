---
aliases:
  - Claude Code
  - ClaudeCode
created: 2026-05-27
type: entity
entity_type: tool
topic: 332.6-Investment-and-Trading
status: reviewed
---

# Claude Code

## 基本信息

| 属性 | 值 |
|------|------|
| **类型** | AI 编程 Agent / CLI 工具 |
| **开发者** | Anthropic |
| **模型** | Claude (Opus/Sonnet) |
| **平台** | 终端 CLI，支持 VS Code/JetBrains |
| **官网** | https://claude.ai |

## 描述

Claude Code 是 Anthropic 推出的 AI 编程代理，以命令行形式运行，可以深入理解整个代码库、编辑文件、运行命令。在 LLM-Wiki 架构中，Claude Code 扮演"编译器"角色——将原始资料编译为结构化 Wiki 知识库。

## 核心特征

- **Agentic 模式** — 自主规划和执行多步骤任务
- **完整代码库理解** — 读取、搜索、编辑整个项目
- **Skills 系统** — 可自定义的专项能力实现
- **Hooks** — 自动化操作触发
- **CLAUDE.md** — 项目级规则文件
- **Git 集成** — 自动版本控制

## 在本系统中的角色

Claude Code 是 **LLM-Wiki 编译引擎**：
- `/triage` — 扫描 Inbox 并分拣
- `/wiki-compile` — 读取 raw/ 生成 wiki/
- `/context` — 管理会话状态
- `/lint` — 系统健康检查
- 所有操作记录到 `AI-Log/`

## 相关概念

- [[3 Resources/productivity/wiki/concepts/LLM-Wiki]] — Claude Code 是 LLM-Wiki 的执行引擎
- [[PARA-Method]] — Claude Code 维护 PARA 架构
- [[Second-Brain]] — Claude Code 使第二大脑自动化

## 相关实体

- [[3 Resources/productivity/wiki/entities/Obsidian]] — Vault 宿主平台
- [[Andrej-Karpathy]] — LLM-Wiki 概念提出者
- [[3 Resources/000 Knowledge/Computer-Science/Artificial-Intelligence/06-强化学习/AI-Agent/Hermes-Agent/Hermes-Agent]] — LLM-Wiki 参考实现（已被 Claude Code 替代）

## Sources

- [[3 Resources/productivity/raw/articles/封神组合！Claude Code+LLM Wiki+Obsidian 一站式打通 AI 知识库.md]]
- [[3 Resources/productivity/raw/articles/LifeOS × LLM-Wiki 融合系统.md]]
