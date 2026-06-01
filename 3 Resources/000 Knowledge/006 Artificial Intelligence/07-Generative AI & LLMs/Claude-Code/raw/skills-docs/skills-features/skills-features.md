---
title: Skills 核心特性
aliases: [Skills Core Features, Skills 特性]
tags: [claude-code, skills, features, token-efficiency]
created: 2026-05-26
updated: 2026-06-01
type: reference
status: evergreen
---

# Skills 核心特性

> Claude Skills 的三大核心特性——Token 效率、多模式知识注入、一致性质量保证。

---

## 一、Token 效率

### 懒加载 vs 全量加载

```
传统方式 (CLAUDE.md 单文件):
  每次对话加载全部内容
  ├── 25,000 tokens 固定消耗
  ├── 无论任务类型
  └── 无论需要与否

Skills 方式:
  按需渐进式加载
  ├── 只加载相关内容
  ├── 平均 7,000 tokens
  └── 节省 72% Token
```

### 三阶段加载策略

**阶段 1：初始阶段** — Claude 仅看到名称和描述

```
.claude/skills/
├── chinese-first-rule        名称：中文优先规范
├── context-retrieval          名称：上下文检索清单
└── ...
→ 只加载元数据，不加载完整内容
```

**阶段 2：按需加载** — 仅与当前任务相关的 Skill 完整加载

```
场景：写文档

✅ 加载 chinese-first-rule（200 行）
❌ 不加载 context-retrieval（不相关）
❌ 不加载 five-stage-workflow（不相关）
❌ 不加载 mall-crud-generator（不相关）

Token 消耗：~2,000 tokens（节省 92%）
```

**阶段 3：部分加载** — 大型 Skill 分批加载

```
mall-api-development Skill (645 行):

第 1 批：摘要 + 核心原则（~100 行）
第 2 批：按需加载具体章节（~100 行/批）
第 3 批：其余内容（按需）

→ 逐步展开，非一次性全量
```

### 未使用的 Skills 零消耗

```
假设 8 个 Skills，每个 ~400 行 (15,000 tokens)

传统方式：8 × 15,000 = 120,000 tokens/次 ❌
Skills 方式（仅加载 2 个）：2 × 15,000 = 30,000 tokens/次 ✅
节省：75%
```

### 渐进式披露

```
传统：一次性加载全部 628 行 → 上下文过载

渐进式：
├── 高相关性（~1,000 tokens）→ 立即
├── 中相关性（~500 tokens）  → 按需
└── 低相关性（~200 tokens）  → 按需
```

---

## 二、四种知识注入模式

Skills 支持四种模式将知识注入 Claude 的上下文。

### 模式 1：直接注入 (Direct Injection)

核心规则直接写入 SKILL.md 正文——Claude 立即可用。

```markdown
# mall-api-development/SKILL.md

## RESTful 标准
- 使用名词，不是动词
- 使用复数形式

✅ GET /api/v1/products
❌ GET /api/v1/getProducts
```

**适用**：核心流程 · 标准规范 · 强制执行规则

### 模式 2：强制规则 (Mandatory Rules)

跨交互稳定质量的规则——所有任务必须遵守。

```markdown
# chinese-first-rule/SKILL.md

## 语言规范（绝对强制）

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
```

**适用**：语言规范 · 代码风格 · 命名约定 · 所有任务

### 模式 3：参考资料 (Reference Materials)

详细内容放在独立文件——按需加载，不占主空间。

```
.claude/skills/mall-api-development/
├── SKILL.md
├── reference/
│   ├── http-status-codes.md
│   ├── restful-api-guide.md
│   └── authentication.md
└── examples/
    └── api-examples.md
```

```markdown
# SKILL.md 中引用：
参考：[[reference/restful-api-guide.md]]
参考：[[reference/http-status-codes.md]]
```

**适用**：详细手册 · 规范文档 · 扩展内容

### 模式 4：模板资产 (Template Assets)

可重用的代码模板——保证输出一致性。

```
.claude/skills/mall-crud-generator/
├── templates/
│   ├── entity.java.template
│   ├── mapper.java.template
│   ├── service.java.template
│   ├── service-impl.java.template
│   └── controller.java.template
└── examples/
    └── generated-examples.md
```

```markdown
# SKILL.md 中使用模板：
1. 分析需求
2. 选择模板：[[templates/entity.java.template]]
3. 填充参数
4. 生成代码
```

**适用**：CRUD 生成 · 样板代码 · 重复性产出

### 四种模式对比

| 模式 | 加载时机 | 占用 | 适用场景 |
|------|:---:|:---:|------|
| 直接注入 | 加载 Skill 时 | 中 | 核心规则 |
| 强制规则 | 始终加载 | 小 | 全局规范 |
| 参考资料 | 按需引用 | 大（独立文件） | 详细手册 |
| 模板资产 | 使用时 | 大（独立文件） | 代码生成 |

---

## 三、一致性与速度

### 一致执行

```
传统方式（无 Skills）:
  第 1 次：方法 A
  第 2 次：方法 B  ← 不一致
  第 3 次：方法 C  ← 不一致

Skills 方式:
  第 1 次：按 Skill 标准执行 ✅
  第 2 次：按 Skill 标准执行 ✅
  第 100 次：按 Skill 标准执行 ✅
```

**示例**：Skill 定义「所有实体必须有 `created_by` 和 `updated_by`」

```java
// 第 1 次生成 Product —— 符合规范 ✅
// 第 2 次生成 Order   —— 符合规范 ✅
// 第 100 次生成 Comment —— 符合规范 ✅
```

### 速度提升

```
传统方式:
  1. 接收任务
  2. 思考如何执行
  3. 寻找参考资料
  4. 分析最佳实践
  5. 执行任务
  └─ 耗时：较长 ❌

Skills 方式:
  1. 接收任务
  2. 加载 Skill（已含最佳实践）
  3. 直接执行
  └─ 耗时：较短 ✅  (节省 60%+)
```

| 因素 | 说明 |
|------|------|
| 预设知识 | Skill 已包含领域知识，无需搜索 |
| 预设流程 | Skill 已定义工作流，无需思考 |
| 预设标准 | Skill 已规定输出格式，一致高效 |
| 按需加载 | 只加载必要内容，减少加载时间 |

### 质量保证

```
质量保证链：
  chinese-first-rule        → 语言规范 ✅
  mall-api-development      → RESTful 标准 ✅
  mall-multi-tenant         → 租户隔离 ✅
  mall-crud-generator       → CRUD 规范 ✅
  mall-code-review          → 代码审查 ✅
```

---

## 四、Token 消耗对比

### 场景对比

| 场景 | 传统方式 | Skills 方式 | 节省 |
|------|:---:|:---:|:---:|
| 编写文档 | 25,000 | 2,000 | **92%** |
| 开发 API | 25,000 | 8,500 | **66%** |
| 代码审查 | 25,000 | 6,500 | **74%** |
| 修复 Bug | 25,000 | 7,000 | **72%** |
| **平均** | **25,000** | **~7,000** | **~72%** |

### 规模折算

```
假设每日 50 次对话：

传统：50 × 25,000 = 1,250,000 tokens/天
Skills：50 × 7,000 = 350,000 tokens/天

每日节省：900,000 tokens
每月节省：27,000,000 tokens
```

---

## 总结

| # | 特性 | 核心价值 |
|:---:|------|------|
| 1 | **Token 效率** | 按需加载 · 渐进披露 · 节省 72% |
| 2 | **四种注入模式** | 直接·强制·参考·模板 — 各按其用 |
| 3 | **一致性与速度** | 百次如一 · 提速 60%+ · 质量闭环 |

---

## 相关

- [[./skills-introduction/theme.md|Skills 简介]]
- [[./skills-mechanism/theme.md|Skills 工作原理]]
- [[skills-design-principles|Skills 设计原则]]
- [[./skills-vs-mcp/theme.md|Skills vs MCP]]
- [[./skills-best-practices/skills-best-practices|Skills 最佳实践]]
