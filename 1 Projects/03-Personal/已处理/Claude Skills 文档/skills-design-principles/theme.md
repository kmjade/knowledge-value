# Skills 设计原则 / Skills Design Principles

## 概述

学习设计高质量 Claude Skills 的核心原则，确保 Skills 易于使用、维护和扩展。

---

## 1. 单一职责

### 原则说明

每个 Skill 专注于一个明确的主题，避免内容混杂。

### 实践示例

#### ✅ 好的设计

```
chinese-first-rule Skill:
└─ 只负责：语言规范
   ├─ 用户交流语言
   ├─ 文档编写语言
   └─ 代码注释语言

context-retrieval-checklist Skill:
└─ 只负责：上下文检索
   ├─ 7 步检索流程
   ├─ 检索检查清单
   └─ 验证理解

five-stage-workflow Skill:
└─ 只负责：开发流程
   ├─ 5 个阶段定义
   ├─ 各阶段任务
   └─ 阶段转换条件
```

#### ❌ 不好的设计

```
development-standards Skill:
├─ 语言规范
├─ 上下文检索
├─ 开发流程
├─ 验证机制
├─ API 规范
├─ 多租户规范
├─ 代码审查标准
└─ CRUD 生成规则

问题：
├─ 内容混杂
├─ 难以维护
├─ 难以定位
└─ 失去模块化优势
```

### 拆分策略

**如何判断是否需要拆分：**

1. **内容长度**：超过 650 行考虑拆分
2. **主题数量**：包含 2 个以上明确主题
3. **使用场景**：在不同场景下使用不同部分
4. **更新频率**：不同部分更新频率不同

**示例拆分：**

```
原 Skill：api-standards（800 行）
├─ RESTful API 设计（300 行）
├─ HTTP 状态码使用（150 行）
├─ 错误处理标准（200 行）
├─ 认证机制（100 行）
└─ 版本控制策略（50 行）

拆分为：
├─ api-design/SKILL.md（300 行）
├─ http-standards/SKILL.md（300 行）
│  ├─ HTTP 状态码使用（150 行）
│  └─ 错误处理标准（150 行）
├─ authentication/SKILL.md（100 行）
└─ versioning/SKILL.md（50 行）
```

---

## 2. 可独立使用

### 原则说明

每个 Skill 都可以独立理解和使用，不需要依赖其他 Skills。

### 实践示例

#### ✅ 好的设计

```
chinese-first-rule/SKILL.md:
# 中文优先规范

## 概述
强制所有内容使用简体中文。

## 规则
1. 用户交流使用简体中文
2. 文档编写使用简体中文
3. 代码注释使用简体中文

## 示例
...

特点：
├─ 完整自包含
├─ 不需要参考其他 Skills
├─ 可以单独加载使用
└─ 独立理解
```

#### ❌ 不好的设计

```
chinese-first-rule/SKILL.md:
# 中文优先规范

## 概述
强制所有内容使用简体中文。

## 规则
1. 用户交流使用简体中文
2. 详见：api-design Skill 的第 3 节
3. 详见：code-review Skill 的第 2 节

问题：
├─ 不完整
├─ 需要参考其他 Skills
├─ 不能独立使用
└─ 依赖性强
```

### 实现要点

1. **完整的内容**：包含所有必要的信息
2. **清晰的说明**：不依赖外部参考即可理解
3. **充足的示例**：提供足够的示例说明
4. **自包含的规则**：规则完整，不依赖其他文件

---

## 3. 相互协作

### 原则说明

Skills 之间可以互相引用，但避免重复内容。

### 实践示例

#### ✅ 好的设计

```
five-stage-workflow/SKILL.md:
# 五阶段开发工作流程

## 第 1 阶段：研究

在开始编码之前，必须执行上下文检索：
详见：[[context-retrieval-checklist/SKILL.md]]

检索完成后，继续...

context-retrieval-checklist/SKILL.md:
# 上下文检索强制清单

## 7 步检索流程

1. 第 1 步：...
2. 第 2 步：...
...

特点：
├─ 互相引用
├─ 避免重复
├─ 清晰的依赖关系
└─ 易于维护
```

#### ❌ 不好的设计

```
five-stage-workflow/SKILL.md:
# 五阶段开发工作流程

## 第 1 阶段：研究

在开始编码之前，必须执行上下文检索：

1. 第 1 步：查看项目结构
2. 第 2 步：分析相关文件
3. ...
7. 第 7 步：验证理解

检索完成后，继续...

context-retrieval-checklist/SKILL.md:
# 上下文检索强制清单

## 7 步检索流程

1. 第 1 步：查看项目结构
2. 第 2 步：分析相关文件
3. ...
7. 第 7 步：验证理解

问题：
├─ 内容重复
├─ 维护困难
├─ 同步问题
└─ 文件冗余
```

### 引用策略

**何时引用：**

1. **跨 Skill 依赖** - 一个 Skill 依赖另一个 Skill 的内容
2. **详细内容** - 避免在 Skill 中重复大量内容
3. **可选内容** - 不是所有任务都需要的内容

**引用格式：**

```markdown
参考：[[other-skill-name/SKILL.md]]
参考：[[other-skill-name/SKILL.md#section-name]]
参考：[[other-skill-name/SKILL.md#^block-id]]
```

**注意事项：**

1. **最小化引用**：只在必要时引用
2. **清晰的引用**：明确说明引用的内容
3. **循环引用**：避免循环引用
4. **引用验证**：确保引用的 Skill 存在

---

## 4. 易于更新

### 原则说明

独立的 Skills 便于维护和更新，不影响其他部分。

### 实践示例

#### ✅ 好的设计

```
mall-api-development/SKILL.md:
# Mall API 开发规范

## API 设计原则

### RESTful 标准

所有 API 必须遵循 RESTful 标准...

### 版本控制

使用 URL 路径版本控制：
/v1/api/...

更新场景：
├─ 修改 RESTful 标准时
│  ├─ 只编辑 mall-api-development/SKILL.md
│  ├─ 不影响其他 Skills
│  └─ 风险：低
│
└─ 修改中文规范时
   ├─ 只编辑 chinese-first-rule/SKILL.md
   ├─ 不影响其他 Skills
   └─ 风险：低

特点：
├─ 独立更新
├─ 影响范围小
├─ 风险低
└─ 易于回滚
```

#### ❌ 不好的设计

```
monolithic-CLAUDE.md (628 行):
# 开发规范

## 语言规范
...

## 上下文检索
...

## API 设计
...

## 代码审查
...

更新场景：
├─ 修改 API 规准时
│  ├─ 需要在 628 行中找到 API 部分
│  ├─ 可能误改其他部分
│  ├─ 需要全面测试
│  └─ 风险：高
│
└─ 修改中文规范时
   ├─ 需要在 628 行中找到语言部分
   ├─ 可能误改其他部分
   ├─ 需要全面测试
   └─ 风险：高

问题：
├─ 难以定位
├─ 容易误改
├─ 需要全面测试
└─ 回滚困难
```

### 版本控制优势

```
Git 提交历史对比：

Skills 方式：
commit 1: 更新 mall-api-development/SKILL.md（RESTful 标准）
commit 2: 更新 mall-api-development/SKILL.md（版本控制）
commit 3: 更新 chinese-first-rule/SKILL.md（语言规范）

优势：
├─ 清晰的修改历史
├─ 易于追溯
├─ 易于回滚
└─ 易于审查
```

---

## 5. 合理大小

### 原则说明

单个 Skill 建议控制在 200-650 行，平衡可读性和模块化。

### 大小分析

| 大小范围 | 评价 | 建议 |
|---------|------|------|
| < 200 行 | 可能过小 | 考虑合并相关内容 |
| 200-400 行 | ✅ 理想 | 保持现状 |
| 400-650 行 | ✅ 可接受 | 可以继续使用 |
| > 650 行 | 可能过大 | 考虑拆分 |

### 拆分示例

#### 示例 1：大 Skill 拆分

```
原 Skill：mall-api-development（800 行）
├─ API 设计原则（300 行）
├─ HTTP 标准（200 行）
├─ 认证机制（150 行）
├─ 错误处理（100 行）
└─ 版本控制（50 行）

拆分为：
├─ mall-api-design/SKILL.md（300 行）
├─ mall-http-standards/SKILL.md（300 行）
│  ├─ HTTP 标准（200 行）
│  └─ 错误处理（100 行）
├─ mall-authentication/SKILL.md（150 行）
└─ mall-api-versioning/SKILL.md（50 行）
```

#### 示例 2：小 Skill 合并

```
原 Skills：
├─ api-naming/SKILL.md（50 行）
├─ api-path/SKILL.md（60 行）
├─ api-method/SKILL.md（40 行）
└─ api-status/SKILL.md（50 行）

合并为：
└─ mall-api-design/SKILL.md（200 行）
   ├─ API 命名规范（50 行）
   ├─ API 路径设计（60 行）
   ├─ HTTP 方法使用（40 行）
   └─ HTTP 状态码（50 行）
```

### 大小优化策略

1. **参考文档分离**：将详细参考移到 reference/ 目录
2. **示例分离**：将示例移到 examples/ 目录
3. **模板分离**：将模板移到 templates/ 目录
4. **核心内容保留**：只保留核心规则和说明

---

## 6. 清晰的触发条件

### 原则说明

在每个 Skill 中明确说明何时应该使用这个 Skill。

### 实践示例

#### ✅ 好的设计

```markdown
# mall-api-development/SKILL.md

## 适用场景

**何时使用这个 Skill：**

✅ 开发新的 API 接口时
✅ 修改现有 API 接口时
✅ 设计 API 响应格式时
✅ 实现 API 错误处理时

**何时不需要使用这个 Skill：**

❌ 编写文档时（使用 chinese-first-rule）
❌ 审查代码时（使用 mall-code-review）
❌ 生成 CRUD 代码时（使用 mall-crud-generator）

## 触发条件

Claude 会在以下情况下自动加载此 Skill：

1. 用户提到"API"或"接口"
2. 任务涉及设计新的 API
3. 任务涉及修改现有 API
4. 任务涉及 API 相关的文档

**关键词**：
- API, 接口, endpoint, RESTful, HTTP, POST, GET, PUT, DELETE
```

#### ❌ 不好的设计

```markdown
# mall-api-development/SKILL.md

## API 设计原则

...

（没有说明何时使用）
（没有说明触发条件）
（没有说明适用场景）

问题：
├─ 不清楚何时加载
├─ 可能被错误加载
└─ 可能被遗漏
```

---

## 7. 清晰的命名和组织

### 命名原则

1. **描述性名称**：名称应该清楚描述 Skill 的内容

```
✅ 好的命名：
├─ chinese-first-rule - 清楚说明是中文优先规则
├─ context-retrieval-checklist - 清楚说明是检索清单
├─ five-stage-workflow - 清楚说明是 5 阶段流程
└─ mall-api-development - 清楚说明是 Mall API 开发

❌ 不好的命名：
├─ rule-1 - 不清楚是什么规则
├─ workflow - 不清楚是什么流程
├─ api - 太宽泛
└─ dev - 太宽泛
```

2. **一致的风格**：所有 Skill 使用一致的命名风格

```
✅ 一致的风格：
├─ chinese-first-rule
├─ context-retrieval-checklist
├─ five-stage-workflow
└─ mandatory-verification

❌ 不一致的风格：
├─ chinese-rule
├─ retrieval-checklist
├─ workflow-5-stages
└─ verification-mandatory
```

3. **合理的长度**：名称不要太长或太短

```
✅ 合理的长度：
├─ chinese-first-rule
├─ context-retrieval-checklist
└─ mall-api-development

❌ 太长：
├─ chinese-first-rule-for-all-communications-and-documents

❌ 太短：
├─ cn
├─ ctx
└─ api
```

### 目录组织

1. **分类清晰**：按照功能或类型分类

```
.claude/skills/
├── general/              # 通用 Skills
│   ├── chinese-first-rule/
│   ├── context-retrieval-checklist/
│   └── five-stage-workflow/
│
└── project-specific/     # 项目特定 Skills
    ├── mall-crud-generator/
    ├── mall-code-review/
    ├── mall-multi-tenant/
    └── mall-api-development/
```

2. **层次结构**：合理的层次深度

```
✅ 好的结构（2-3 层）：
.claude/skills/
├── general/
│   └── chinese-first-rule/
└── project/
    └── mall/
        └── api-development/

❌ 不好的结构（太深）：
.claude/skills/
├── general/
│   └── language/
│       └── chinese/
│           └── first/
│               └── rule/
```

---

## 8. 文档化触发场景

### 原则说明

在每个 Skill 中明确说明：
1. 何时应该使用这个 Skill
2. 典型的应用场景
3. 与其他 Skills 的关系

### 完整示例

```markdown
# mall-api-development/SKILL.md

## 概述

提供 Mall 项目的 API 开发规范，包括 RESTful 标准、错误处理、认证机制等。

## 适用场景

### 何时使用这个 Skill

✅ **以下情况应该使用此 Skill：**

1. **开发新的 API 接口**
   - 例如：创建商品评论 API
   - 例如：添加用户认证 API

2. **修改现有 API 接口**
   - 例如：更新订单查询 API
   - 例如：优化商品列表 API

3. **设计 API 响应格式**
   - 例如：定义成功的响应格式
   - 例如：定义错误的响应格式

4. **实现 API 错误处理**
   - 例如：添加参数校验错误处理
   - 例如：添加业务逻辑错误处理

### 何时不需要使用这个 Skill

❌ **以下情况不需要使用此 Skill：**

1. **编写文档时** → 使用 [[chinese-first-rule/SKILL.md]]
2. **审查代码时** → 使用 [[mall-code-review/SKILL.md]]
3. **生成 CRUD 代码时** → 使用 [[mall-crud-generator/SKILL.md]]
4. **检索上下文时** → 使用 [[context-retrieval-checklist/SKILL.md]]

### 典型应用场景

#### 场景 1：创建商品评论 API

**任务描述**：创建商品评论的增删改查 API

**使用的 Skills**：
- chinese-first-rule（语言规范）
- context-retrieval-checklist（上下文检索）
- mall-api-development（API 设计规范）
- mall-multi-tenant（多租户隔离）
- mall-crud-generator（CRUD 代码生成）

**具体应用**：
- 按照 mall-api-development 设计 API 路径、方法、参数
- 按照 mall-multi-tenant 添加租户字段和过滤
- 按照 mall-crud-generator 生成基础代码

#### 场景 2：优化现有 API

**任务描述**：优化商品列表 API，添加分页和排序

**使用的 Skills**：
- chinese-first-rule（语言规范）
- mall-api-development（API 设计规范）
- mall-code-review（代码审查标准）

**具体应用**：
- 按照 mall-api-design 优化分页参数设计
- 按照 mall-code-review 审查优化后的代码

### 与其他 Skills 的关系

**依赖关系**：

```
mall-api-development
├─ 依赖：chinese-first-rule（所有 API 文档使用中文）
├─ 依赖：mall-multi-tenant（API 需要支持多租户）
└─ 被依赖：mall-code-review（审查 API 时参考 API 规范）
```

**配合使用**：

```
完整 API 开发流程：
1. context-retrieval-checklist（检索上下文）
2. mall-api-development（设计 API）
3. mall-crud-generator（生成代码）
4. mandatory-verification（验证代码）
5. mall-code-review（审查代码）
```

### 触发关键词

Claude 会在检测到以下关键词时加载此 Skill：

**主要关键词**：
- API, 接口, endpoint, RESTful
- GET, POST, PUT, DELETE, PATCH
- 请求, 响应, 状态码
- 错误处理, 异常处理

**次要关键词**：
- HTTP, URL, 路径, 参数
- 认证, 授权, token
- 版本控制, v1, v2

## 触发优先级

**高优先级**（总是加载）：
- chinese-first-rule

**中优先级**（开发任务时加载）：
- context-retrieval-checklist
- mall-api-development
- mall-crud-generator

**低优先级**（特定任务时加载）：
- mall-code-review（代码审查时）
- mall-multi-tenant（需要时）
```

---

## 设计检查清单

使用此检查清单确保你的 Skill 设计符合最佳实践：

```
□ 单一职责
  └─ Skill 只专注于一个主题

□ 可独立使用
  └─ Skill 可以独立理解和使用

□ 相互协作
  └─ Skills 之间可以互相引用

□ 易于更新
  └─ Skill 可以独立更新

□ 合理大小
  └─ Skill 在 200-650 行之间

□ 清晰的触发条件
  └─ 明确说明何时使用此 Skill

□ 清晰的命名
  └─ 名称描述性强且一致

□ 文档化触发场景
  └─ 说明适用场景和关系

□ 完整的内容
  └─ 包含所有必要的信息

□ 充足的示例
  └─ 提供足够的示例说明

□ 版本控制友好
  └─ 易于追踪修改历史
```

---

## 相关主题

- **Skills 简介**：[[./skills-introduction/theme.md|了解 Claude Skills 的基本概念]]
- **Skills 工作原理**：[[./skills-mechanism/theme.md|了解加载机制和执行流程]]
- **Skills 核心特性**：[[./skills-features/theme.md|深入了解 Token 效率优化]]
- **Skills 实施方案**：[[./skills-implementation/theme.md|学习如何实施 Skills]]

---

## 总结

设计高质量 Skills 的核心原则：

1. **单一职责** - 每个 Skill 专注一个主题
2. **可独立使用** - Skill 可以独立理解和应用
3. **相互协作** - Skills 之间可以互相引用
4. **易于更新** - 独立的 Skills 便于维护
5. **合理大小** - 控制在 200-650 行
6. **清晰的触发条件** - 明确说明何时使用
7. **清晰的命名和组织** - 一致的命名风格
8. **文档化触发场景** - 说明适用场景和关系

遵循这些原则，你将创建出易于使用、维护和扩展的高质量 Skills！
