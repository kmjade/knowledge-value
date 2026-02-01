# Skills 实施方案 / Skills Implementation

## 概述

# 學習

---

## 第一步：拆分 CLAUDE.md

### 识别独立模块

# 分析

# 開發

1. **中文优先规范** (`chinese-first-rule/`)
   - 来源：CLAUDE.md 语言规范部分
   - 约 200 行
# 文檔

2. **上下文检索强制清单** (`context-retrieval-checklist/`)
   - 来源：CLAUDE.md 上下文检索机制部分
   - 约 550 行
   - 7 步强制检索流程，确保充分理解现有代码

# 開發
# 工作流
   - 约 480 行
   - 研究-计划-实施-验证-提交的完整流程

4. **强制验证机制** (`mandatory-verification/`)
   - 来源：CLAUDE.md 验证机制部分
   - 约 450 行
   - 拒绝 CI/远程验证，强制本地 AI 执行验证

# 專案

5. **Mall CRUD 代码生成器** (`mall-crud-generator/`)
   - 334 行
   - 自动生成 Entity、Mapper、Service、Controller

6. **Mall 代码审查** (`mall-code-review/`)
   - 255 行
   - 6 个维度的代码质量检查

# 開發
   - 434 行
# 數據

# 開發
   - 645 行
# 設計

### 拆分原则

#### 原则 1：单一职责

每个 Skill 专注于一个明确的主题：

```
chinese-first-rule Skill:
└─ 只负责：语言规范
   ├─ 交流语言
# 文檔
   └─ 代码注释语言

不包含：
# 開發
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
# 文檔
└─ 只需要加载 chinese-first-rule Skill
   └─ 不需要加载其他 Skills
```

#### 原则 3：相互协作

Skills 之间可以互相引用，但避免重复内容：

```
five-stage-workflow/SKILL.md:
# 開發
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
# 分析

chinese-first-rule:      200 行  ✅ 合理
mall-code-review:         255 行  ✅ 合理
mall-crud-generator:     334 行  ✅ 合理
mall-multi-tenant:       434 行  ✅ 合理
mandatory-verification:  450 行  ✅ 合理
five-stage-workflow:     480 行  ✅ 合理
context-retrieval:       550 行  ✅ 合理
mall-api-development:    645 行  ✅ 合理

总计：3,348 行（原 CLAUDE.md：628 行）

# 版本
实际上拆分后的总内容可能更多（因为增加了详细说明）
```

---

# 設計

# 目錄

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
# 專案
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
# 文檔
        │   ├── restful-api-guide.md
        │   ├── http-status-codes.md
        │   ├── api-versioning.md
        │   └── authentication.md
        └── examples/            # API 示例
            └── api-examples.md
```

# 目錄

#### 1. `.claude/CLAUDE.md`

# 文檔

**内容**：
- 核心原则概述
# 連結
# 指南
- 入门指导

**大小**：约 100 行

#### 2. `.claude/README.md`

# 專案

**内容**：
# 專案
# 配置
- Skills 体系概述
# 指南

#### 3. `.claude/skills/README.md`

**作用**：Skills 总览和索引

**内容**：
- Skills 体系说明
- 所有 Skills 列表
- 每个 Skill 的简要说明
# 指南

# 目錄

**标准结构**：

```
skill-name/
# 檔案
# 文檔
# 檔案
# 檔案
# 檔案
```

---

## 第三步：简化 CLAUDE.md

### 简化策略

# 文檔

1. **核心原则概述**
# 方法
   - 语言规范（强制）
# 工作流
   - 验证机制概述

# 連結
   - 所有 Skills 的列表
# 連結
# 場景

# 指南
   - 常用命令
# 連結
   - 入门指导

### 示例内容

```markdown
# 開發

## 概览

# 檔案

## 核心原则

### 1. 语言规范（绝对强制）

# 文檔

详见：`.claude/skills/chinese-first-rule/SKILL.md`

### 2. 上下文检索（编码前必须执行）

**7 步强制检索清单**

详见：`.claude/skills/context-retrieval-checklist/SKILL.md`

# 工作流

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
# 開發
| mandatory-verification | 强制验证机制 | [SKILL.md](skills/mandatory-verification/SKILL.md) |

# 專案

| Skill | 用途 | 详情 |
|--------|------|------|
| mall-crud-generator | CRUD 代码生成 | [SKILL.md](skills/mall-crud-generator/SKILL.md) |
| mall-code-review | 代码审查标准 | [SKILL.md](skills/mall-code-review/SKILL.md) |
# 開發
# 開發

## 快速参考

### 常见任务

| 任务 | 使用的 Skills |
|------|-------------|
# 文檔
# 開發
| 代码审查 | chinese-first-rule, mall-code-review, mall-multi-tenant, mall-api-development |
# 修復

# 連結

- **完整 Skills 列表**：[skills/README.md](skills/README.md)
# 指南

## 入门指导

# 指南

1. 阅读 [[skills/chinese-first-rule/SKILL.md|语言规范]]
2. 了解 [[skills/five-stage-workflow/SKILL.md|開發流程]]
3. 开始使用 Claude Code

# 開發

1. 使用 [[skills/context-retrieval-checklist/SKILL.md|上下文检索]]
# 開發
# 開發
4. 遵循 [[skills/mall-api-development/SKILL.md|API 规范]]
5. 使用 [[skills/mandatory-verification/SKILL.md|验证机制]]确保质量
```

---

# 創建

# 檔案

每个 SKILL.md 应包含以下部分：

```markdown
# Skill 名称

## 概述

简要说明这个 Skill 的作用和目的。

# 場景

明确说明何时应该使用这个 Skill：

# 場景
# 場景
# 場景

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
# 文檔
```

❌ 错误示例：
```
# 文檔
```

#### 注意事项

注意事项和提醒。

## 与其他 Skills 的关系

说明这个 Skill 如何与其他 Skills 配合使用：

- 相关 Skill 1：[[other-skill-1/SKILL.md]]
- 相关 Skill 2：[[other-skill-2/SKILL.md]]

# 資源

# 文檔

# 文檔
# 文檔
```

### 示例：chinese-first-rule Skill

```markdown
# 中文优先规范

## 概述

# 文檔

# 場景

适用于所有任务：
- 用户交流
# 文檔
- 代码注释
- 变量命名注释
# 輸出

## 核心规则

1. **绝对强制**：所有内容必须使用简体中文
2. **无例外**：不允许使用英文（除非是技术术语）
# 輸出

## 详细说明

### 1. 用户交流

#### 规则

所有与用户的交流必须使用简体中文。

#### 示例

✅ 正确：
```
# 分析
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
# 創建
# 數據
# 創建
 */
public Long createOrder(OrderDTO orderDTO) {
# 數據
    if (orderDTO == null) {
# 數據
    }

# 儲存
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

# 文檔

#### 规则

# 設計

#### 示例

✅ 正确：
```markdown
# 評論

## 接口说明

# 創建

## 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| productId | Long | 是 | 商品 ID |
# 評論
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

# 資源

- 无
```

---

# 測試

# 測試

# 測試

# 測試

# 文檔

**预期**：
- 加载的 Skills：chinese-first-rule
- 未加载的 Skills：其他所有 Skills
- Token 消耗：约 2,000 tokens

**验证**：
- ✅ 内容使用简体中文
- ✅ 未加载不必要的 Skills

# 測試

# 創建

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

# 測試

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

# 測試

```
□ 简单任务只加载必要的 Skills
□ 复杂任务加载所有相关 Skills
□ 专项任务加载特定 Skills
# 輸出
□ Token 消耗符合预期
□ 响应速度正常
□ 无错误或异常
```

---

## 相关主题

- **Skills 简介**：[[./skills-introduction/theme.md|了解 Claude Skills 的基本概念]]
- **Skills 工作原理**：[[./skills-mechanism/theme.md|了解加载机制和执行流程]]
# 效率
# 優化
# 設計
- **最佳实践**：[[./skills-best-practices/theme.md|如何开始使用和维护 Skills]]

---

## 总结

实施 Skills 的关键步骤：

1. **拆分 CLAUDE.md** - 识别独立模块，按主题拆分
# 設計
# 文檔
# 創建
# 測試

**核心要点：**

- ✅ 单一职责：每个 Skill 专注一个主题
- ✅ 独立使用：每个 Skill 可以单独工作
- ✅ 相互协作：Skills 之间可以互相引用
- ✅ 合理大小：控制在 200-650 行

通过这些步骤，你可以成功将单一的 CLAUDE.md 拆分为模块化的 Skills 体系！
