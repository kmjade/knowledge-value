---
title: Hermes Agent 学习项目
aliases:
  - Hermes Agent Learning Project
  - Hermes 智能体学习
para: project
domain:
  - "[[AI-Agent]]"
  - "[[LLM]]"
tags:
  - para/project/learning
  - topic/ai-agent
  - topic/hermes
  - topic/llm
  - topic/tool-calling
created: 2026-05-24
modified: 2026-05-25
status: active
---

# Hermes Agent 学习项目

> [!info] 项目概述
> 学习 Hermes Agent 框架——一个开源的 AI 智能体框架（同类：Claude Code、Codex CLI）。掌握其 Skills 技能系统、Memory 记忆、Gateway 多平台网关、多 Provider 支持和完整工具链。

> [!warning] 重要区分
> **Hermes Agent**（框架）≠ **Hermes 3**（LLM 模型）。本项目的学习对象是框架，不是模型训练/部署。

---

## 项目目标

### 核心目标
- [ ] 理解 Hermes Agent 框架的架构和定位
- [ ] 掌握 CLI 命令和配置管理
- [ ] 熟练使用 Skills 技能系统
- [ ] 利用 Memory 实现跨会话持久化
- [ ] 能够创建和管理定时任务
- [ ] 使用子智能体进行并行任务

### 应用场景
- 日常编程助手（代码生成、调试、审查）
- 系统管理（监控、部署、日志分析）
- 自动化工作流（Cron 定时任务）
- 多平台 AI 助手（Telegram、Discord 等）
- 多智能体协作（并行开发、分派任务）

---

## 学习资源

### 知识库索引
- [[0 Inbox/_processed/AI-Agent/Hermes-Agent/Hermes-Agent|Hermes Agent 资源索引]]
- [[0 Inbox/_processed/AI-Agent/Hermes-Agent/00-MOCs/MOC-總覽|知识体系总览]]
- [[0 Inbox/_processed/AI-Agent/Hermes-Agent/00-MOCs/MOC-學習路徑|学习路径]]

### 外部资源
- 官方文档: https://hermes-agent.nousresearch.com/docs/
- GitHub: https://github.com/NousResearch/hermes-agent
- Nous Research: https://nousresearch.com/

---

## 时间规划

| 阶段 | 内容 | 时间 | 状态 |
|------|------|------|------|
| 第一阶段 | 快速开始 | 2026-05-24 ~ 2026-05-27 | `进行中` |
| 第二阶段 | 核心概念 | 2026-05-28 ~ 2026-06-03 | `待开始` |
| 第三阶段 | 高级功能 | 2026-06-04 ~ 2026-06-17 | `待开始` |
| 第四阶段 | 集成与实践 | 持续学习 | `待开始` |

---

## 学习内容

### 第一阶段：快速开始 (3 天)
- [ ] [[1 简介|Hermes Agent 简介]] - 了解框架定位
- [ ] [[2 安装配置|安装配置]] - 安装和 API 配置
- [ ] [[3 第一个智能体|第一个智能体]] - 启动第一个会话
- [ ] [[常用命令|CLI 命令速查表]]

### 第二阶段：核心概念 (1 周)
- [ ] [[Agent概述|Agent 概述]]
- [ ] [[工具系统|工具系统]]
- [ ] [[../../3 Resources/01-Tech/AI-Agent/Hermes-Agent/02-核心概念/CLI与配置|CLI 与配置]]
- [ ] [[工作流|工作流]]

### 第三阶段：高级功能 (2 周)
- [ ] Skills 技能系统 - 安装、加载、创建技能
- [ ] Memory 记忆系统 - 配置和使用
- [ ] Gateway 网关 - 接入 Telegram/Discord
- [ ] Subagent 子智能体 - 并行任务委派
- [ ] Cron 定时任务 - 创建自动化任务
- [ ] Profiles 多 Profile - 管理多实例

### 第四阶段：集成与实践
- [ ] 日常编程工作流集成
- [ ] 自定义 Skill 开发
- [ ] 系统管理自动化
- [ ] 多智能体协作实践

---

## 学习笔记

### 2026-05-25
- 修正了对 Hermes Agent 的理解：它是 AI 智能体框架，不是 LLM 模型
- 更新知识库，区分 Hermes Agent（框架）和 Hermes 3（模型）
- 修正官方网站链接：hermes-agent.nousresearch.com

### 2026-05-24
- 创建 Hermes Agent 学习项目
- 开始学习工具调用协议

---

## 相关项目

- [[Claude Code 使用指南]] - 同类 AI 编程工具
- [[Python学习项目]] - 工具开发语言
- [[LLM学习项目]] - 大语言模型基础

---

## 进度追踪

```dataview
Table without id file.link as "学习内容", file.mtime as "更新时间"
WHERE contains(file.path, "Hermes-Agent") AND file.name != this.file.name
SORT file.mtime DESC
LIMIT 20
```
