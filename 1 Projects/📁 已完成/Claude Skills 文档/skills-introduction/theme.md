# Claude Skills 简介 / Claude Skills Introduction

# 文檔

# 連結

作者：Neko cc - Colorful black
# 發佈

---

## 背景问题 / Background Problem

### CLAUDE.md 的困境

# 專案

# 專案

- 语言规范要求
- 上下文检索机制（7步强制清单）
# 開發
- 强制验证机制
- 代码质量标准
# 開發
# 設計
- 工具集成说明

### Token 消耗问题

这带来了严重的 token 消耗问题：

**每次对话都需要加载完整的 628 行内容，消耗约 25,000 tokens**

# 開發

---

## 解决方案：Claude Skills

### 什么是 Claude Skills

# 知識

> **核心概念解释**：
>
# 方法

---

## Skills 核心特点

# 管理

每个 Skill 专注于单一主题：

```
单一职责原则
├── 中文规范 Skill：只管语言要求
├── 上下文检索 Skill：只管检索流程
# 開發
└── 验证机制 Skill：只管验证标准
```

### 2. 按需加载

Claude 根据任务类型自动选择相关 Skills：

```
# 分析
```

# 場景
# 文檔
# 開發
- 代码审查任务 → 只加载"代码审查" Skill

# 學習

通过多轮对话逐步掌握复杂技能：

```
# 學習
第 2 轮对话：应用核心原则
第 3 轮对话：深入高级特性
...
```

# 更新

# 修改

```
# 修改
├── ✅ 不影响"中文规范" Skill
# 開發
└── ✅ 不影响其他任何 Skill
```

---

## 为什么需要 Skills？

### 问题对比

| 方面 | 单一 CLAUDE.md | Skills 方案 |
|------|---------------|-------------|
| **Token 消耗** | 每次加载全部内容（25,000 tokens） | 按需加载（平均 7,000 tokens） |
# 讀取
# 更新
# 管理
| **适用性** | 所有任务使用相同内容 | 不同任务使用不同内容 |

### 实际收益

1. **成本降低**：平均 token 消耗减少 72%
2. **响应速度提升**：加载时间减少 60% 以上
# 管理
# 新增

---

# 場景

# 場景

# 專案
# 開發
# 開發
# 更新
✅ **成本敏感** - token 消耗成本较高

# 場景

# 專案
❌ **单一任务类型** - 只做一种类型的任务
❌ **低频使用** - 很少使用 Claude Code

---

## 快速开始

### 第一步：理解核心概念

# 知識
2. **Skills 如何工作？** - 按需加载，渐进式披露
# 效率

# 專案

问自己几个问题：

# 檔案
# 開發
# 關注
- 我的团队是否需要统一的规范？

### 第三步：开始实施

# 文檔

- [[./skills-mechanism/theme.md|Skills 工作原理]] - 了解 Skills 如何工作
# 學習
# 指南

---

## 相关主题

- **Skills 工作原理**：[[./skills-mechanism/theme.md|了解 Skills 的加载机制和执行流程]]
# 效率
- **Skills vs MCP**：[[./skills-vs-mcp/theme.md|比较 Skills 和 MCP 的区别]]
- **Skills 实施方案**：[[./skills-implementation/theme.md|如何将 CLAUDE.md 拆分为 Skills]]
# 優化
# 設計
- **最佳实践**：[[./skills-best-practices/theme.md|如何开始使用和维护 Skills]]

---

## 技术细节

# 版本
# 檔案
# 目錄
# 檔案

---

# 資源

# 文檔
# 專案
- **社区讨论**：[待补充]

---

> [!tip] 提示
>
# 專案
>
> If you need project-related skills.md example files, reply "Claude Skills" to the official account "Colorful black"!
