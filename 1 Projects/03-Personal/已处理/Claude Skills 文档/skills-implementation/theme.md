# Skills 实施方案 / Skills Implementation

## 概述

学习如何将现有的 CLAUDE.md 拆分为模块化的 Skills，包括详细的实施步骤和目录结构设计。

---

## 第一步：拆分 CLAUDE.md

### 识别独立模块

分析现有 CLAUDE.md 内容，识别可以独立拆分的主题模块：

**通用开发 Skills（4 个）：**

1. **中文优先规范** (`chinese-first-rule/`)
   - 来源：CLAUDE.md 语言规范部分
   - 约 200 行
   - 强制所有交流、文档、注释使用简体中文

2. **上下文检索强制清单** (`context-retrieval-checklist/`)
   - 来源：CLAUDE.md 上下文检索机制部分
   - 约 550 行
   - 7 步强制检索流程，确保充分理解现有代码

3. **五阶段开发工作流程** (`five-stage-workflow/`)
   - 来源：CLAUDE.md 工作流程部分
   - 约 480 行
   - 研究-计划-实施-验证-提交的完整流程

4. **强制验证机制** (`mandatory-verification/`)
   - 来源：CLAUDE.md 验证机制部分
   - 约 450 行
   - 拒绝 CI/远程验证，强制本地 AI 执行验证

**项目特定 Skills（4 个）：**

5. **Mall CRUD 代码生成器** (`mall-crud-generator/`)
   - 334 行
   - 自动生成 Entity、Mapper、Service、Controller

6. **Mall 代码审查** (`mall-code-review/`)
   - 255 行
   - 6 个维度的代码质量检查

7. **Mall 多租户开发** (`mall-multi-tenant/`)
   - 434 行
   - 多租户隔离和数据安全规范

8. **Mall API 开发规范** (`mall-api-development/`)
   - 645 行
   - RESTful API 设计标准

### 拆分原则

#### 原则 1：单一职责

每个 Skill 专注于一个明确的主题：

```
chinese-first-rule Skill:
└─ 只负责：语言规范
   ├─ 交流语言
   ├─ 文档语言
   └─ 代码注释语言

不包含：
├─ ❌ 开发流程（在 five-stage-workflow Skill）
├─ ❌ API 规范（在 mall-api-development Skill）
└─ ❌ 代码审查标准（在 mall-code-review Skill）
```

#### 原则 2：可独立使用

每个 Skill 都可以独立理解和使用：

```
chinese-first-rule/SKILL.md:
├─ 包含完整的语言规范
├─ 不需要参考其他 Skills
├─ 可以单独加载使用
└─ 自包含

示例：
当用户要求"用简体中文写文档"时：
└─ 只需要加载 chinese-first-rule Skill
   └─ 不需要加载其他 Skills
```

#### 原则 3：相互协作

Skills 之间可以互相引用，但避免重复内容：

```
five-stage-workflow/SKILL.md:
├─ 包含完整的开发流程
├─ 不重复"上下文检索"规则
└─ 引用 context-retrieval-checklist Skill

```markdown
## 第 1 阶段：研究

在开始编码之前，必须执行上下文检索：
详见：context-retrieval-checklist Skill

检索完成后，继续...
```
```

#### 原则 4：合理大小

单个 Skill 建议控制在 200-650 行：

```
Skill 大小分析：

chinese-first-rule:      200 行  ✅ 合理
mall-code-review:         255 行  ✅ 合理
mall-crud-generator:     334 行  ✅ 合理
mall-multi-tenant:       434 行  ✅ 合理
mandatory-verification:  450 行  ✅ 合理
five-stage-workflow:     480 行  ✅ 合理
context-retrieval:       550 行  ✅ 合理
mall-api-development:    645 行  ✅ 合理

总计：3,348 行（原 CLAUDE.md：628 行）

注意：原示例中的 628 行可能是指简化后的版本，
实际上拆分后的总内容可能更多（因为增加了详细说明）
```

---

## 第二步：目录结构设计

### 完整目录结构

```
.claude/
├── CLAUDE.md                    # 简化版索引（约 100 行）
│
├── README.md                    # Skills 总览
│
└── skills/
    │
    ├── README.md                # Skills 索引和说明
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
    ├── mall-crud-generator/     # 项目特定 Skills
    │   ├── SKILL.md
    │   ├── templates/           # 代码模板
    │   │   ├── entity.java.template
    │   │   ├── mapper.java.template
    │   │   ├── service.java.template
    │   │   ├── service-impl.java.template
    │   │   └── controller.java.template
    │   └── examples/            # 生成示例
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
        ├── reference/           # 参考文档
        │   ├── restful-api-guide.md
        │   ├── http-status-codes.md
        │   ├── api-versioning.md
        │   └── authentication.md
        └── examples/            # API 示例
            └── api-examples.md
```

### 目录说明

#### 1. `.claude/CLAUDE.md`

**作用**：简化的索引文档，包含核心原则和 Skills 索引

**内容**：
- 核心原则概述
- Skills 索引和链接
- 快速参考指南
- 入门指导

**大小**：约 100 行

#### 2. `.claude/README.md`

**作用**：项目级别的 README，说明 Claude Code 配置

**内容**：
- 项目简介
- Claude Code 配置说明
- Skills 体系概述
- 使用指南

#### 3. `.claude/skills/README.md`

**作用**：Skills 总览和索引

**内容**：
- Skills 体系说明
- 所有 Skills 列表
- 每个 Skill 的简要说明
- 使用指南

#### 4. 每个 Skill 目录

**标准结构**：

```
skill-name/
├── SKILL.md           # 必需：主要技能文件
├── reference/        # 可选：参考文档
├── templates/        # 可选：模板文件
├── examples/         # 可选：示例文件
└── tests/           # 可选：测试文件
```

---

## 第三步：简化 CLAUDE.md

### 简化策略

将原始 CLAUDE.md（628 行）简化为索引文档（约 100 行），仅保留：

1. **核心原则概述**
   - PARA 方法论简介
   - 语言规范（强制）
   - 工作流程概述
   - 验证机制概述

2. **Skills 索引和链接**
   - 所有 Skills 的列表
   - 每个 Skill 的链接
   - 适用场景说明

3. **快速参考指南**
   - 常用命令
   - 快速链接
   - 入门指导

### 示例内容

```markdown
# CLAUDE.md 开发准则

## 概览

本文件为核心规则精简版，详细规范见 Skills。

## 核心原则

### 1. 语言规范（绝对强制）

**所有交流、文档、注释必须使用简体中文**

详见：`.claude/skills/chinese-first-rule/SKILL.md`

### 2. 上下文检索（编码前必须执行）

**7 步强制检索清单**

详见：`.claude/skills/context-retrieval-checklist/SKILL.md`

### 3. 工作流程（5 阶段必须遵循）

**研究-计划-实施-验证-提交**

详见：`.claude/skills/five-stage-workflow/SKILL.md`

### 4. 验证机制（强制本地验证）

**拒绝 CI/远程验证，强制本地 AI 执行**

详见：`.claude/skills/mandatory-verification/SKILL.md`

## Skills 索引

### 通用 Skills

| Skill | 用途 | 详情 |
|--------|------|------|
| chinese-first-rule | 中文优先规范 | [SKILL.md](skills/chinese-first-rule/SKILL.md) |
| context-retrieval-checklist | 上下文检索清单 | [SKILL.md](skills/context-retrieval-checklist/SKILL.md) |
| five-stage-workflow | 五阶段开发流程 | [SKILL.md](skills/five-stage-workflow/SKILL.md) |
| mandatory-verification | 强制验证机制 | [SKILL.md](skills/mandatory-verification/SKILL.md) |

### 项目特定 Skills

| Skill | 用途 | 详情 |
|--------|------|------|
| mall-crud-generator | CRUD 代码生成 | [SKILL.md](skills/mall-crud-generator/SKILL.md) |
| mall-code-review | 代码审查标准 | [SKILL.md](skills/mall-code-review/SKILL.md) |
| mall-multi-tenant | 多租户开发规范 | [SKILL.md](skills/mall-multi-tenant/SKILL.md) |
| mall-api-development | API 开发规范 | [SKILL.md](skills/mall-api-development/SKILL.md) |

## 快速参考

### 常见任务

| 任务 | 使用的 Skills |
|------|-------------|
| 编写文档 | chinese-first-rule |
| 功能开发 | chinese-first-rule, context-retrieval-checklist, five-stage-workflow, mandatory-verification, mall-crud-generator, mall-multi-tenant, mall-api-development |
| 代码审查 | chinese-first-rule, mall-code-review, mall-multi-tenant, mall-api-development |
| Bug 修复 | chinese-first-rule, context-retrieval-checklist |

### 快速链接

- **完整 Skills 列表**：[skills/README.md](skills/README.md)
- **Skills 使用指南**：[docs/skills-usage.md](docs/skills-usage.md)

## 入门指导

### 新手指南

1. 阅读 [[skills/chinese-first-rule/SKILL.md|语言规范]]
2. 了解 [[skills/five-stage-workflow/SKILL.md|开发流程]]
3. 开始使用 Claude Code

### 开发者指南

1. 使用 [[skills/context-retrieval-checklist/SKILL.md|上下文检索]]
2. 按照 [[skills/five-stage-workflow/SKILL.md|5 阶段流程]]开发
3. 使用 [[skills/mall-crud-generator/SKILL.md|CRUD 生成器]]加速开发
4. 遵循 [[skills/mall-api-development/SKILL.md|API 规范]]
5. 使用 [[skills/mandatory-verification/SKILL.md|验证机制]]确保质量
```

---

## 第四步：创建 Skills

### Skill 文件模板

每个 SKILL.md 应包含以下部分：

```markdown
# Skill 名称

## 概述

简要说明这个 Skill 的作用和目的。

## 适用场景

明确说明何时应该使用这个 Skill：

- 场景 1
- 场景 2
- 场景 3

## 核心规则

列出这个 Skill 的核心规则和规范：

1. 规则 1
2. 规则 2
3. 规则 3

## 详细说明

详细的规则说明、示例和注意事项。

### 规则 1 详细说明

#### 规则内容

具体的规则描述。

#### 示例

✅ 正确示例：
```
符合规范的代码/文档
```

❌ 错误示例：
```
不符合规范的代码/文档
```

#### 注意事项

注意事项和提醒。

## 与其他 Skills 的关系

说明这个 Skill 如何与其他 Skills 配合使用：

- 相关 Skill 1：[[other-skill-1/SKILL.md]]
- 相关 Skill 2：[[other-skill-2/SKILL.md]]

## 参考资源

相关的参考文档和资源：

- 参考文档 1：[[reference/doc-1.md]]
- 参考文档 2：[[reference/doc-2.md]]
```

### 示例：chinese-first-rule Skill

```markdown
# 中文优先规范

## 概述

强制所有交流、文档、注释使用简体中文。

## 适用场景

适用于所有任务：
- 用户交流
- 文档编写
- 代码注释
- 变量命名注释
- 日志输出

## 核心规则

1. **绝对强制**：所有内容必须使用简体中文
2. **无例外**：不允许使用英文（除非是技术术语）
3. **严格检查**：输出前必须验证语言

## 详细说明

### 1. 用户交流

#### 规则

所有与用户的交流必须使用简体中文。

#### 示例

✅ 正确：
```
我理解您的需求，现在开始分析代码...
```

❌ 错误：
```
I understand your requirements. Now I'll analyze the code...
```

### 2. 代码注释

#### 规则

所有代码注释必须使用简体中文。

#### 示例

✅ 正确：
```java
/**
 * 创建订单服务
 * @param orderDTO 订单数据传输对象
 * @return 创建的订单ID
 */
public Long createOrder(OrderDTO orderDTO) {
    // 验证订单数据
    if (orderDTO == null) {
        throw new IllegalArgumentException("订单数据不能为空");
    }

    // 保存订单
    Order order = convertToOrder(orderDTO);
    orderMapper.insert(order);

    return order.getId();
}
```

❌ 错误：
```java
/**
 * Create order service
 * @param orderDTO Order data transfer object
 * @return Created order ID
 */
public Long createOrder(OrderDTO orderDTO) {
    // Validate order data
    if (orderDTO == null) {
        throw new IllegalArgumentException("Order data cannot be null");
    }

    // Save order
    Order order = convertToOrder(orderDTO);
    orderMapper.insert(order);

    return order.getId();
}
```

### 3. 文档编写

#### 规则

所有文档（README, API 文档, 设计文档等）必须使用简体中文。

#### 示例

✅ 正确：
```markdown
# 商品评论 API

## 接口说明

创建商品评论接口，允许用户对购买的商品进行评价。

## 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| productId | Long | 是 | 商品 ID |
| content | String | 是 | 评论内容 |
```

❌ 错误：
```markdown
# Product Comment API

## Interface Description

Create product comment interface, allowing users to review purchased products.

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| productId | Long | Yes | Product ID |
| content | String | Yes | Comment content |
```

## 与其他 Skills 的关系

这个 Skill 是所有任务的基础，应该始终加载：

- 所有任务都需要遵循此 Skill
- 与其他 Skills 配合使用时，优先级最高

## 参考资源

- 无
```

---

## 第五步：测试验证

### 测试计划

通过不同类型的任务测试 Skills 加载：

#### 1. 简单任务测试

**任务**：编写 README 文档

**预期**：
- 加载的 Skills：chinese-first-rule
- 未加载的 Skills：其他所有 Skills
- Token 消耗：约 2,000 tokens

**验证**：
- ✅ 内容使用简体中文
- ✅ 未加载不必要的 Skills

#### 2. 复杂任务测试

**任务**：创建商品评论功能

**预期**：
- 加载的 Skills：
  - chinese-first-rule
  - context-retrieval-checklist
  - five-stage-workflow
  - mandatory-verification
  - mall-crud-generator
  - mall-multi-tenant
  - mall-api-development
- 未加载的 Skills：mall-code-review
- Token 消耗：约 12,000 tokens

**验证**：
- ✅ 遵循 5 阶段流程
- ✅ 执行上下文检索
- ✅ 使用 CRUD 生成器
- ✅ 实现多租户隔离
- ✅ 符合 API 规范
- ✅ 本地验证通过

#### 3. 专项任务测试

**任务**：代码审查

**预期**：
- 加载的 Skills：
  - chinese-first-rule
  - mall-code-review
  - mall-multi-tenant
  - mall-api-development
- 未加载的 Skills：
  - context-retrieval-checklist
  - five-stage-workflow
  - mandatory-verification
  - mall-crud-generator
- Token 消耗：约 6,500 tokens

**验证**：
- ✅ 按照 6 个维度审查代码
- ✅ 检查多租户隔离
- ✅ 检查 API 规范

### 测试检查清单

```
□ 简单任务只加载必要的 Skills
□ 复杂任务加载所有相关 Skills
□ 专项任务加载特定 Skills
□ 输出符合所有 Skills 规范
□ Token 消耗符合预期
□ 响应速度正常
□ 无错误或异常
```

---

## 相关主题

- **Skills 简介**：[[./skills-introduction/theme.md|了解 Claude Skills 的基本概念]]
- **Skills 工作原理**：[[./skills-mechanism/theme.md|了解加载机制和执行流程]]
- **Skills 核心特性**：[[./skills-features/theme.md|深入了解 Token 效率优化]]
- **Skills 优化效果**：[[./skills-optimization/theme.md|Token 消耗对比和实际收益]]
- **Skills 设计原则**：[[./skills-design-principles/theme.md|设计良好 Skills 的指导原则]]
- **最佳实践**：[[./skills-best-practices/theme.md|如何开始使用和维护 Skills]]

---

## 总结

实施 Skills 的关键步骤：

1. **拆分 CLAUDE.md** - 识别独立模块，按主题拆分
2. **设计目录结构** - 创建清晰的 Skills 目录
3. **简化 CLAUDE.md** - 转变为索引文档
4. **创建 Skills** - 编写每个 Skill 的 SKILL.md
5. **测试验证** - 确保按需加载正常工作

**核心要点：**

- ✅ 单一职责：每个 Skill 专注一个主题
- ✅ 独立使用：每个 Skill 可以单独工作
- ✅ 相互协作：Skills 之间可以互相引用
- ✅ 合理大小：控制在 200-650 行

通过这些步骤，你可以成功将单一的 CLAUDE.md 拆分为模块化的 Skills 体系！
