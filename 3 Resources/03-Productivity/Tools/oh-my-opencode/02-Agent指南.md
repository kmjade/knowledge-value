---
title: oh-my-opencode Agent 指南
tags: [tool, ai, productivity, opencode, oh-my-opencode, agent]
created: 2026-02-16
updated: 2026-02-16
---

# oh-my-opencode Agent 指南

> 详细介绍各种内置 Agent 的功能和用途。

---

## 🤖 Agent 概览

oh-my-opencode 提供多种专业 Agent，每个 Agent 针对不同任务优化。

### Agent 列表

| Agent | 模型 | 用途 |
|-------|------|------|
| **Sisyphus** | Claude Opus | 默认规划代理 |
| **Oracle** | Claude Opus | 问答代理 |
| **Librarian** | Claude Sonnet | 文档和知识管理 |
| **Explore** | Claude Haiku | 代码探索 |
| **Prometheus** | Claude Opus | 高级任务 |
| **Metis** | Claude Opus | 复杂任务 |
| **Momus** | Claude Opus | 创作任务 |
| **Atlas** | Claude Sonnet | 分析任务 |

---

## 🏛️ Sisyphus（规划代理）

**默认 Agent**，提供智能规划和执行。

### 特点
- 复杂任务分解和系统执行
- 多步骤工作流协调
- 自动规划执行路径

### 使用

```bash
opencode --agent sisyphus
# 或默认
opencode
```

### 适用场景
- 需要多步骤完成的任务
- 复杂项目规划
- 需要持续执行的工作

---

## 📖 Librarian（文档代理）

专门用于文档和代码探索。

### 特点
- 文档理解和总结
- 代码搜索和导航
- 知识库管理

### 使用

```bash
opencode --agent librarian
```

### 适用场景
- 查找相关代码
- 理解代码库结构
- 管理知识文档

---

## 🔍 Explore（探索代理）

高效探索和理解大型代码库。

### 特点
- 快速代码库导航
- 模式识别
- 结构分析

### 使用

```bash
opencode --agent explore
```

### 适用场景
- 理解新代码库
- 查找特定功能的实现
- 分析代码结构

---

## 💬 Oracle（问答代理）

基于代码库上下文提供智能问答。

### 特点
- 上下文感知回答
- 代码引用和解释
- 技术问题解答

### 使用

```bash
opencode --agent oracle
```

### 适用场景
- 技术问题解答
- 代码解释
- 最佳实践建议

---

## ⚡ Prometheus（高级代理）

处理复杂和高要求任务的高级代理。

### 特点
- 深度分析能力
- 复杂问题解决
- 高精度输出

### 使用

```bash
opencode --agent prometheus
```

### 适用场景
- 复杂架构设计
- 深度代码审查
- 高难度问题解决

---

## 🧠 Metis（复杂任务代理）

专门处理复杂和综合性任务。

### 特点
- 任务分解
- 多代理协调
- 深度推理

### 使用

```bash
opencode --agent metis
```

### 适用场景
- 大型项目重构
- 系统设计
- 复杂问题分析

---

## 🎨 Momus（创作代理）

专注于创意和内容创作。

### 特点
- 内容生成
- 创意写作
- 文档创作

### 使用

```bash
opencode --agent momus
```

### 适用场景
- 文档撰写
- 内容创作
- 创意生成

---

## 📊 Atlas（分析代理）

专注于数据分析和代码分析。

### 特点
- 代码分析
- 模式识别
- 性能评估

### 使用

```bash
opencode --agent atlas
```

### 适用场景
- 代码质量分析
- 性能优化建议
- 代码审查

---

## 🎯 Category（分类模型）

根据任务复杂度自动选择合适的模型。

| Category | 模型 | 用途 |
|----------|------|------|
| `visual-engineering` | Claude Opus | 视觉工程任务 |
| `ultrabrain` | Claude Opus | 高复杂度任务 |
| `quick` | Claude Haiku | 简单快速任务 |
| `writing` | Claude Sonnet | 写作任务 |

### 使用

在任务中使用分类标签：

```
# 使用 ultrabrain 处理复杂任务
ultrawork ultrabrain 设计一个微服务架构

# 使用 quick 处理简单任务
quick 重命名这个变量
```

---

## 🔗 组合使用

### 多代理协作

```bash
# 使用 ultrawork 启用多代理并行
ultrawork 同时进行代码审查和文档更新
```

### 任务分配策略

1. **简单查询** → `quick` + Haiku
2. **常规开发** → 默认 + Sonnet
3. **复杂任务** → `ultrabrain` + Opus
4. **探索发现** → Librarian/Explore
5. **深度分析** → Atlas/Prometheus

---

## 📚 下一步

- 阅读 [[03-Hooks工作流]] 了解 Hook 系统
- 阅读 [[04-MCP集成]] 了解 MCP 集成
