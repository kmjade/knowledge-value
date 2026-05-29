---
title: GitHub 集成
aliases:
  - Gemini CLI GitHub Action
  - Gemini GitHub
tags:
  - #topic/gemini
  - #topic/cli
  - #topic/github
  - #type/guide
created: 2026-05-25
updated: 2026-05-25
---

# GitHub 集成

## 概述

Gemini CLI 提供官方 GitHub Action，可以在 GitHub 工作流中使用 Gemini 能力。

---

## 功能特性

| 功能 | 说明 |
|------|------|
| PR 代码审查 | 自动化代码审查和反馈 |
| Issue 分类 | 自动标签和优先级分配 |
| 按需协助 | 在 Issue 中 @gemini-cli 获取帮助 |
| 自定义工作流 | 构建自动化流程 |

---

## 快速开始

### 基本配置

创建 `.github/workflows/gemini-review.yml`：

```yaml
name: Gemini Code Review

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: AI Code Review
        uses: google-github-actions/run-gemini-cli@v1
        with:
          prompt: |
            审查这个 PR 的代码变更：
            1. 检查代码质量和最佳实践
            2. 识别潜在的 bug
            3. 提出改进建议
```

---

## 使用场景

### 1. Pull Request 审查

```yaml
name: PR Review

on:
  pull_request:
    types: [opened]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: Review PR
        uses: google-github-actions/run-gemini-cli@v1
        with:
          prompt: |
            审查这个 PR：
            - 代码风格是否符合项目规范
            - 是否有安全漏洞
            - 是否有性能问题
            - 测试是否充分
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### 2. Issue 自动分类

```yaml
name: Issue Triage

on:
  issues:
    types: [opened]

jobs:
  triage:
    runs-on: ubuntu-latest
    steps:
      - name: Triage Issue
        uses: google-github-actions/run-gemini-cli@v1
        with:
          prompt: |
            分析这个 Issue 并：
            1. 确定问题类型（bug/feature/question）
            2. 评估优先级
            3. 建议标签
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### 3. 按需协助

在 Issue 或 PR 中评论：

```
@gemini-cli 请解释这段代码的工作原理
```

```
@gemini-cli 帮我重构这个函数，使其更易读
```

### 4. 定期报告

```yaml
name: Weekly Report

on:
  schedule:
    - cron: '0 9 * * 1'  # 每周一 9:00

jobs:
  report:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Generate Report
        uses: google-github-actions/run-gemini-cli@v1
        with:
          prompt: |
            分析过去一周的代码变更：
            1. 主要改动概述
            2. 引入的新功能
            3. 修复的问题
            4. 潜在风险点
```

---

## 认证配置

### 使用 Google 账号

```yaml
- name: Authenticate
  uses: google-github-actions/auth@v2
  with:
    credentials_json: ${{ secrets.GOOGLE_CREDENTIALS }}
```

### 使用 API Key

```yaml
- name: AI Review
  uses: google-github-actions/run-gemini-cli@v1
  with:
    api-key: ${{ secrets.GEMINI_API_KEY }}
    prompt: "审查代码"
```

---

## 高级配置

### 自定义模型

```yaml
- name: AI Review
  uses: google-github-actions/run-gemini-cli@v1
  with:
    model: gemini-2.5-pro
    prompt: "审查代码"
```

### 输出到 PR 评论

```yaml
- name: Review and Comment
  uses: google-github-actions/run-gemini-cli@v1
  with:
    prompt: "审查代码并提供改进建议"
    output-format: markdown
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### 使用 GEMINI.md 上下文

在仓库根目录创建 `GEMINI.md`：

```markdown
# 项目说明

这是一个 TypeScript 项目，使用以下技术：
- React 前端
- Node.js 后端
- PostgreSQL 数据库

## 代码规范
- 使用 ESLint
- 测试覆盖率 > 80%
```

GitHub Action 会自动读取此文件作为上下文。

---

## 最佳实践

### 1. 控制触发条件

```yaml
on:
  pull_request:
    types: [opened, synchronize]
    paths:
      - 'src/**'  # 只在 src 目录变更时触发
```

### 2. 限制成本

```yaml
jobs:
  review:
    if: github.event.pull_request.draft == false  # 跳过草稿 PR
```

### 3. 错误处理

```yaml
- name: AI Review
  uses: google-github-actions/run-gemini-cli@v1
  continue-on-error: true  # 失败不阻塞工作流
  with:
    prompt: "审查代码"
```

---

## 相关链接

- [[MCP扩展]]
- [[高级功能]]
- [[0 Inbox/_processed/AI-ML/Gemini/README|Gemini 知识库导航]]
- [Gemini CLI GitHub Action](https://github.com/google-github-actions/run-gemini-cli)
