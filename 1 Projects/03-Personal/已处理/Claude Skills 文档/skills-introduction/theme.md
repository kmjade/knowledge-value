# Claude Skills 简介 / Claude Skills Introduction

## 文档来源 / Document Source

原文链接：[使用 Skills 按需动态加载，解决 CLAUDE.md 上下文太长，token 消耗问题](https://mp.weixin.qq.com/s/9J6c3-Idm41fgKXfAu1ghQ)

作者：Neko cc - Colorful black
发布时间：2025年12月31日

---

## 背景问题 / Background Problem

### CLAUDE.md 的困境

在使用 Claude Code 进行项目开发时，我们通常会在项目根目录下创建 `.claude/CLAUDE.md` 文件，用于指导 AI 理解项目规范、开发流程和最佳实践。

然而，随着项目复杂度增加，CLAUDE.md 文件会越来越长。以电商项目为例，CLAUDE.md 文件达到了 628 行，包含：

- 语言规范要求
- 上下文检索机制（7步强制清单）
- 五阶段开发工作流程
- 强制验证机制
- 代码质量标准
- 多租户开发规范
- API 设计规范
- 工具集成说明

### Token 消耗问题

这带来了严重的 token 消耗问题：

**每次对话都需要加载完整的 628 行内容，消耗约 25,000 tokens**

即使是简单的文档编写任务，也需要加载所有开发规范；即使只是代码审查，也要加载 CRUD 生成器的详细说明。这造成了极大的资源浪费。

---

## 解决方案：Claude Skills

### 什么是 Claude Skills

Claude Skills 是 Anthropic 官方推出的知识模块化机制，允许将大型指导文档拆分为多个独立的"技能包"，实现按需加载。

> **核心概念解释**：
>
> 就是很多领域的 prompt，如果你全部放在 CLAUDE.md 那就要吃很多的上下文。我们上下文寸土寸金，肯定要物尽其用。那我们就设定一个规则：当 AI 发现接下来的领域涉及到比如说 xlsx 文件的读取，那他就会去看 `/skills/xlsx/skills.md` 的内容，知道应该怎么处理。这种注入提示词是渐进式的、有选择的，是一个很好节约上下文的方法。

---

## Skills 核心特点

### 1. 模块化管理

每个 Skill 专注于单一主题：

```
单一职责原则
├── 中文规范 Skill：只管语言要求
├── 上下文检索 Skill：只管检索流程
├── 开发流程 Skill：只管工作流程
└── 验证机制 Skill：只管验证标准
```

### 2. 按需加载

Claude 根据任务类型自动选择相关 Skills：

```
任务分析 → 匹配相关 Skills → 仅加载必要内容 → 执行任务
```

**示例场景：**
- 文档编写任务 → 只加载"中文规范" Skill
- 功能开发任务 → 加载"开发流程"、"验证机制"等多个 Skills
- 代码审查任务 → 只加载"代码审查" Skill

### 3. 渐进式学习

通过多轮对话逐步掌握复杂技能：

```
第 1 轮对话：学习基础概念
第 2 轮对话：应用核心原则
第 3 轮对话：深入高级特性
...
```

### 4. 独立更新

修改单个 Skill 不影响其他部分：

```
修改"API 规范" Skill
├── ✅ 不影响"中文规范" Skill
├── ✅ 不影响"开发流程" Skill
└── ✅ 不影响其他任何 Skill
```

---

## 为什么需要 Skills？

### 问题对比

| 方面 | 单一 CLAUDE.md | Skills 方案 |
|------|---------------|-------------|
| **Token 消耗** | 每次加载全部内容（25,000 tokens） | 按需加载（平均 7,000 tokens） |
| **加载速度** | 慢（需要读取全部） | 快（只读取相关部分） |
| **维护成本** | 高（一处改动影响全局） | 低（独立更新） |
| **扩展性** | 差（文件越长越难管理） | 优（轻松添加新 Skill） |
| **适用性** | 所有任务使用相同内容 | 不同任务使用不同内容 |

### 实际收益

1. **成本降低**：平均 token 消耗减少 72%
2. **响应速度提升**：加载时间减少 60% 以上
3. **维护便利性**：模块化管理，独立更新
4. **可扩展性增强**：轻松添加新 Skills

---

## Skills 适用场景

### 推荐使用的场景

✅ **复杂项目** - 项目规范多、文档长
✅ **多领域开发** - 涉及不同技术栈和业务领域
✅ **团队协作** - 需要统一的开发规范
✅ **频繁更新** - 规范经常变化
✅ **成本敏感** - token 消耗成本较高

### 不推荐使用的场景

❌ **简单项目** - 项目简单，CLAUDE.md 很短
❌ **单一任务类型** - 只做一种类型的任务
❌ **低频使用** - 很少使用 Claude Code

---

## 快速开始

### 第一步：理解核心概念

1. **Skills 是什么？** - 模块化的知识包
2. **Skills 如何工作？** - 按需加载，渐进式披露
3. **为什么使用 Skills？** - 节省 token，提升效率

### 第二步：评估项目需求

问自己几个问题：

- 我的 CLAUDE.md 文件有多长？（超过 200 行？）
- 我是否经常做不同类型的任务？（开发、审查、文档）
- token 成本是否是我的关注点？
- 我的团队是否需要统一的规范？

### 第三步：开始实施

参考以下文档：

- [[./skills-mechanism/theme.md|Skills 工作原理]] - 了解 Skills 如何工作
- [[./skills-implementation/theme.md|Skills 实施方案]] - 学习如何实施 Skills
- [[./skills-best-practices/theme.md|最佳实践指南]] - 掌握使用技巧

---

## 相关主题

- **Skills 工作原理**：[[./skills-mechanism/theme.md|了解 Skills 的加载机制和执行流程]]
- **Skills 核心特性**：[[./skills-features/theme.md|深入了解 Token 效率优化和知识注入]]
- **Skills vs MCP**：[[./skills-vs-mcp/theme.md|比较 Skills 和 MCP 的区别]]
- **Skills 实施方案**：[[./skills-implementation/theme.md|如何将 CLAUDE.md 拆分为 Skills]]
- **Skills 优化效果**：[[./skills-optimization/theme.md|Token 消耗对比和实际收益分析]]
- **Skills 设计原则**：[[./skills-design-principles/theme.md|设计良好 Skills 的指导原则]]
- **最佳实践**：[[./skills-best-practices/theme.md|如何开始使用和维护 Skills]]

---

## 技术细节

- **Claude Code 版本**：支持 Skills 的所有版本
- **文件格式**：Markdown (.md)
- **目录位置**：`.claude/skills/`
- **索引文件**：`.claude/CLAUDE.md`

---

## 参考资源

- **Claude Skills 官方文档**：https://code.claude.com/docs/en/skills
- **GitHub 示例项目**：[待补充]
- **社区讨论**：[待补充]

---

> [!tip] 提示
>
> 如果需要项目相关的 skills.md 示例文件，可以在公众号 "Colorful black" 回复 "Claude Skills" 获取！
>
> If you need project-related skills.md example files, reply "Claude Skills" to the official account "Colorful black"!
