---
title: MOC-學習路徑
aliases:
  - Hermes Agent 学习路径
  - Hermes Agent Learning Path
para: resource
domain:
  - "[[0 Inbox/_processed/AI-Agent/Hermes-Agent/Hermes-Agent]]"
tags:
  - para/resource/tech
  - system/moc
  - topic/ai-agent
  - topic/hermes
  - type/moc
created: 2026-05-24
modified: 2026-05-25
---

# MOC-學習路徑

> [!info] 
> Hermes Agent 系统化学习路径——框架使用，不是模型训练。

---

## 学习阶段

```
阶段一 (3天)      阶段二 (1周)      阶段三 (2周)      阶段四 (持续)
快速开始     →    核心概念     →    进阶功能     →    集成实践
```

---

## 第一阶段：快速开始（3天）

### Day 1: 了解框架
- [[1 简介|Hermes Agent 简介]]
  - [ ] 理解框架定位（vs Claude Code）
  - [ ] 区分 Hermes Agent（框架）和 Hermes 3（模型）

### Day 2: 安装配置
- [[2 安装配置|安装配置]]
  - [ ] 一键安装
  - [ ] 配置 API 密钥
  - [ ] 运行 `hermes model` 选择模型

### Day 3: 第一个会话
- [[3 第一个智能体|第一个智能体]]
  - [ ] 启动 `hermes`
  - [ ] 尝试文件操作、Shell 命令
  - [ ] 掌握 `/new`、`/model`、`/skill`

**成果**: ✅ 能独立使用 Hermes 完成任务

---

## 第二阶段：核心概念（1周）

### 前半周：Agent 与工具

| 文档 | 学习点 |
|------|--------|
| [[../02-核心概念/Agent概述|Agent 概述]] | Agent 循环、会话管理 |
| [[../02-核心概念/工具系统|工具系统]] | 20+ Toolsets、工具开关 |
| [[../02-核心概念/协议规范|协议规范]] | OpenAI function calling |

### 后半周：配置与工作流

| 文档 | 学习点 |
|------|--------|
| [[../05-API参考/Agent-API|配置参考]] | config.yaml、审批模式 |
| [[常用命令|命令速查表]] | 所有 CLI 命令 |
| [[../02-核心概念/工作流|工作流]] | 单/多智能体/Cron/Profile |

**成果**: ✅ 能配置和定制 Hermes

---

## 第三阶段：进阶功能（2周）

### Skills + Memory

- [[记忆与状态管理|记忆与状态管理]]
- 实践：`/skill <name>` 加载技能、`hermes skills browse`

### 高级功能

| 文档 | 学习点 |
|------|--------|
| [[../02-核心概念/工作流|工作流]] | delegate_task、tmux 多开 |
| [[../07-高级主题/多智能体协作|多智能体协作]] | 并行委派模式 |
| [[../06-集成指南/MCP协议集成|MCP 协议]] | 添加 MCP 服务 |

### 实践

- [[多工具智能体|多工具案例]]
- [[编程助手|编程助手模式]]

**成果**: ✅ 能用高级功能提升效率

---

## 第四阶段：集成实践（持续）

### 平台集成
- [[LangChain集成|LangChain]]
- [[MCP协议集成|MCP 协议]]

### 自定义开发
- [[自定义工具开发|自定义工具]]
- [[性能优化|性能优化]]

---

## 附录：Hermes 3 模型

- [[Hermes-3概览|模型概览]]
- [[Hermes-3-8B|8B 轻量版]]

---

## 学习建议

1. **先跑起来** — 安装只需一条命令
2. **边用边学** — 自然语言就是接口
3. **善用技能** — `hermes skills browse` 查看可用技能
4. **积累记忆** — 让 Hermes 记住你的偏好

## 相关链接

- [[0 Inbox/_processed/AI-Agent/Hermes-Agent/00-MOCs/MOC-總覽]] — 知识体系总览
- [[0 Inbox/_processed/AI-Agent/Hermes-Agent/Hermes-Agent]] — 知识库首页
