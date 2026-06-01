---
title: Skills 实施方案
aliases: [Skills Implementation, Skills 实施指南]
tags: [claude-code, skills, implementation, migration]
created: 2026-05-26
updated: 2026-06-01
type: reference
status: evergreen
---

# Skills 实施方案

> 从单体 CLAUDE.md 迁移到模块化 Skills 体系的完整实施指南。

---

## 概览

| 步骤 | 内容 | 产出 |
|:---:|------|------|
| 1 | 拆分 CLAUDE.md — 识别独立模块 | 模块清单 |
| 2 | 创建目录结构 | 目录树 |
| 3 | 简化 CLAUDE.md — 改为索引 | 精简版 CLAUDE.md (~100 行) |
| 4 | 创建每个 SKILL.md | 8 个 Skill 文件 |
| 5 | 测试验证 | 验证报告 |

---

## 第一步：拆分 CLAUDE.md

### 识别独立模块

从原始 CLAUDE.md (628 行) 中识别出 8 个独立模块：

| # | Skill | 来源 | 行数 | 说明 |
|:---:|------|------|:---:|------|
| 1 | `chinese-first-rule` | 语言规范 | 200 | 强制简体中文 |
| 2 | `context-retrieval-checklist` | 检索机制 | 550 | 7 步检索流程 |
| 3 | `five-stage-workflow` | 开发流程 | 480 | 研究→计划→实施→验证→提交 |
| 4 | `mandatory-verification` | 验证机制 | 450 | 拒绝 CI/远程，强制本地验证 |
| 5 | `mall-crud-generator` | CRUD 生成 | 334 | Entity/Mapper/Service/Controller |
| 6 | `mall-code-review` | 代码审查 | 255 | 6 维度质量检查 |
| 7 | `mall-multi-tenant` | 多租户 | 434 | 租户数据隔离 |
| 8 | `mall-api-development` | API 规范 | 645 | RESTful 设计标准 |

### 拆分原则

| 原则 | 说明 |
|------|------|
| **单一职责** | 每个 Skill 专注一个主题。`chinese-first-rule` 只管语言，不管 API |
| **可独立使用** | 每个 Skill 自包含。`chinese-first-rule` 无需参考其他 Skill |
| **相互协作** | 可引用其他 Skill，但避免重复内容。`five-stage-workflow` 引用但不复制检索流程 |
| **合理大小** | 200–650 行。mall-code-review (255) ✅; mall-api-development (645) ✅ |

---

## 第二步：创建目录结构

```
.claude/
├── CLAUDE.md                    ← 简化版索引（~100 行）
│
├── README.md                    ← Skills 总览
│
└── skills/
    ├── README.md                ← Skills 索引
    │
    ├── chinese-first-rule/       # 通用 Skills
    │   └── SKILL.md
    │
    ├── context-retrieval-checklist/
    │   └── SKILL.md
    │
    ├── five-stage-workflow/
    │   └── SKILL.md
    │
    ├── mandatory-verification/
    │   └── SKILL.md
    │
    └── mall/                     # 项目 Skills
        ├── mall-crud-generator/
        │   ├── SKILL.md
        │   ├── templates/        ← 代码模板
        │   │   ├── entity.java.template
        │   │   ├── mapper.java.template
        │   │   ├── service.java.template
        │   │   ├── service-impl.java.template
        │   │   └── controller.java.template
        │   └── examples/
        │       └── generated-examples.md
        │
        ├── mall-code-review/
        │   └── SKILL.md
        │
        ├── mall-multi-tenant/
        │   └── SKILL.md
        │
        └── mall-api-development/
            ├── SKILL.md
            ├── reference/
            │   ├── restful-api-guide.md
            │   ├── http-status-codes.md
            │   ├── api-versioning.md
            │   └── authentication.md
            └── examples/
                └── api-examples.md
```

### 关键文件说明

| 文件 | 作用 | 大小 |
|------|------|:---:|
| `.claude/CLAUDE.md` | 核心原则概述 + Skills 索引 + 快速参考 | ~100 行 |
| `.claude/README.md` | 项目总览 + Skills 体系说明 | ~50 行 |
| `.claude/skills/README.md` | 所有 Skill 列表 + 简要说明 + 使用指南 | ~80 行 |

---

## 第三步：简化 CLAUDE.md

原始 628 行的 CLAUDE.md 精简为 ~100 行的索引文件：

```markdown
# 项目 AI 开发规范

## 核心原则

### 1. 语言规范（绝对强制）
所有内容使用简体中文。
→ 详见 skills/chinese-first-rule/SKILL.md

### 2. 上下文检索（编码前必须执行）
7 步强制检索清单。
→ 详见 skills/context-retrieval-checklist/SKILL.md

### 3. 开发流程
研究 → 计划 → 实施 → 验证 → 提交。
→ 详见 skills/five-stage-workflow/SKILL.md

### 4. 验证机制（强制本地验证）
拒绝 CI/远程验证，强制本地 AI 执行。
→ 详见 skills/mandatory-verification/SKILL.md

## Skills 索引

### 通用 Skills
| Skill | 用途 |
|--------|------|
| chinese-first-rule | 中文优先规范 |
| context-retrieval | 上下文检索清单 |
| five-stage-workflow | 开发流程 |
| mandatory-verification | 强制验证 |

### 项目 Skills
| Skill | 用途 |
|--------|------|
| mall-crud-generator | CRUD 代码生成 |
| mall-code-review | 代码审查 |
| mall-multi-tenant | 多租户隔离 |
| mall-api-development | API 规范 |

## 快速参考

| 任务 | 使用的 Skills |
|------|-------------|
| 编写文档 | chinese-first-rule |
| 开发功能 | chinese-first-rule, context, workflow, crud, multi-tenant, api |
| 代码审查 | chinese-first-rule, code-review, multi-tenant, api |
| 修复 Bug | chinese-first-rule, context, workflow, api |
```

---

## 第四步：创建 SKILL.md

### 标准模板

每个 SKILL.md 应包含：

```markdown
# Skill 名称

## 概述
简要说明作用。

## 使用场景
✅ 何时应该使用
❌ 何时不应该使用

## 核心规则
1. 规则 1
2. 规则 2

## 详细说明
→ 规则详解、示例、注意事项

## 与其他 Skills 的关系
- [[other-skill/SKILL.md]]

## 参考资料
- 链接/引用
```

### 完整示例：chinese-first-rule

```markdown
# 中文优先规范

## 概述
强制所有内容使用简体中文。

## 使用场景
✅ 用户交流 · 代码注释 · 文档编写 · 变量命名注释
❌ 技术术语可以保留英文

## 核心规则
1. 绝对强制：所有内容使用简体中文
2. 无例外：不允许英文（技术术语除外）
3. 包括：代码注释 · 文档 · 接口说明

## 详细说明

### 用户交流
✅ "我来分析一下代码..."
❌ "I'll analyze the code..."

### 代码注释
✅ /**
     * 创建订单
     * @param orderDTO 订单数据传输对象
     */
❌ /**
     * Create order service
     */

### 文档编写
✅ # 评论接口
❌ # Product Comment API

## 与其他 Skills 的关系
所有 Skill 的基础——永远加载，优先级最高。
```

---

## 第五步：测试验证

### 场景测试矩阵

| 场景 | 加载的 Skills | Token 预估 |
|------|------|:---:|
| 编写文档 | `chinese-first-rule` | ~2,000 |
| 开发功能 | 全部项目 Skill | ~12,000 |
| 代码审查 | `chinese-first-rule` + `code-review` + `multi-tenant` + `api` | ~6,500 |
| 修复 Bug | `chinese-first-rule` + `context` + `workflow` + `api` | ~7,000 |

### 验证清单

```
□ 简单任务只加载必要的 Skills
□ 复杂任务加载所有相关 Skills
□ 专项任务加载特定 Skills
□ Token 消耗符合预期
□ 响应速度正常
□ 无错误或异常
□ 内容使用简体中文
□ 未加载不必要的 Skills
```

---

## 总结

| 步骤 | 动作 | 关键原则 |
|:---:|------|------|
| 1 | 拆分 | 单一职责 · 按主题识别 |
| 2 | 建目录 | 通用/项目分层 · 2–3 层 |
| 3 | 简化 CLAUDE.md | 改为索引 · ~100 行 |
| 4 | 写 SKILL.md | 完整自包含 · 含示例 |
| 5 | 测试 | 场景验证 · Token 核对 |

---

## 相关

- [[./skills-introduction/theme.md|Skills 简介]]
- [[./skills-mechanism/theme.md|Skills 工作原理]]
- [[skills-design-principles|Skills 设计原则]]
- [[skills-features|Skills 核心特性]]
- [[./skills-best-practices/skills-best-practices|Skills 最佳实践]]
