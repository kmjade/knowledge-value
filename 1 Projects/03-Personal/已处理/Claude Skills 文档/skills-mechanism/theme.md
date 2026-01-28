# Skills 工作原理 / Skills Working Mechanism

## 概述

了解 Claude Skills 的工作机制，包括渐进式披露流程、加载时机和执行过程。这有助于更好地设计和使用 Skills。

---

## 渐进式披露流程

### 流程图

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Review    │───▶│  Determine  │───▶│    Load     │───▶│   Apply     │
│   审查      │    │    确定      │    │    加载      │    │    应用      │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
      │                  │                  │                  │
      ▼                  ▼                  ▼                  ▼
 查看可用的     判断哪些与        仅加载必要的      应用技能指令
   skills         当前任务相关        信息              完成任务
```

### 详细步骤

#### 第 1 步：审查（Review）

**Claude 查看可用的 skills**

- 扫描 `.claude/skills/` 目录
- 识别所有可用的 Skill 名称
- 读取每个 Skill 的简短描述
- **不加载完整内容**，只获取元数据

**示例输出：**
```
发现 8 个可用 Skills:
1. chinese-first-rule - 中文优先规范
2. context-retrieval-checklist - 上下文检索强制清单
3. five-stage-workflow - 五阶段开发工作流程
4. mandatory-verification - 强制验证机制
5. mall-crud-generator - Mall CRUD 代码生成器
6. mall-code-review - Mall 代码审查
7. mall-multi-tenant - Mall 多租户开发
8. mall-api-development - Mall API 开发规范
```

#### 第 2 步：确定（Determine）

**判断哪些与当前任务相关**

- 分析用户请求的类型
- 识别任务所需的知识领域
- 匹配最相关的 Skills
- 按相关性排序

**示例场景分析：**

| 用户请求 | 分析 | 相关 Skills |
|---------|------|-----------|
| "帮我写一个 README" | 文档编写任务 | chinese-first-rule |
| "创建商品评论功能" | 功能开发任务 | chinese-first-rule, context-retrieval, five-stage-workflow, mandatory-verification, mall-crud-generator, mall-multi-tenant, mall-api-development |
| "审查这段代码" | 代码审查任务 | chinese-first-rule, mall-code-review, mall-multi-tenant, mall-api-development |

#### 第 3 步：加载（Load）

**仅加载必要的信息**

- 从高相关性到低相关性加载
- **不是加载全部内容**，而是选择性加载
- 使用"渐进式披露"防止上下文过载

**加载优先级：**

```
高相关性（必须加载）
  ↓
中相关性（可能加载）
  ↓
低相关性（按需加载）
  ↓
不相关（不加载）
```

**示例加载流程：**

```
任务：创建商品评论功能

第 1 轮加载（高相关性）:
  ✅ chinese-first-rule（200 行）
  ✅ context-retrieval-checklist（550 行）
  ✅ five-stage-workflow（480 行）

第 2 轮加载（中相关性）:
  ✅ mandatory-verification（450 行）
  ✅ mall-crud-generator（334 行）

第 3 轮加载（按需）:
  ❓ 如果需要，加载 mall-multi-tenant（434 行）
  ❓ 如果需要，加载 mall-api-development（645 行）

未加载（不相关）:
  ❌ mall-code-review（开发时不需要）
```

#### 第 4 步：应用（Apply）

**应用技能指令完成任务**

- 根据 Skills 中的指令执行任务
- 遵循最佳实践和规范
- 生成符合标准的输出
- 在需要时加载更多 Skills

---

## 加载时机

### 触发条件

Skills 在以下情况下被触发加载：

| 触发条件 | 说明 | 示例 |
|---------|------|------|
| **任务类型匹配** | 任务描述与 Skill 描述匹配 | 用户说"创建新功能" → 加载开发流程 Skill |
| **关键词触发** | 请求中包含特定关键词 | 提到"API" → 加载 API 规范 Skill |
| **文件类型** | 操作特定类型的文件 | 编辑 `.md` 文件 → 加载 Markdown 规范 Skill |
| **显式调用** | 用户明确要求使用某个 Skill | "使用 code-review Skill" |
| **上下文依赖** | Skills 之间互相引用 | context-retrieval Skill 引用 five-stage-workflow Skill |

### 加载范围

**关键原则：仅加载相关部分，不是全部内容**

```
❌ 错误理解：
用户要求 → 加载所有 Skills

✅ 正确理解：
用户要求 → 识别相关 Skills → 仅加载必要的部分
```

**部分加载策略：**

1. **摘要优先** - 先加载 Skill 的摘要部分
2. **按需深入** - 需要时才加载详细内容
3. **分块加载** - 大型 Skill 可以分块加载
4. **智能缓存** - 对话中已加载的内容会被缓存

### 优先级规则

Skills 按以下优先级加载：

```
优先级 1（最高）：核心必需 Skills
  └─ 例如：中文优先规范（所有任务都需要）

优先级 2：任务相关 Skills
  └─ 例如：开发流程（开发任务）、代码审查（审查任务）

优先级 3：领域相关 Skills
  └─ 例如：API 规范（API 相关）、多租户（多租户相关）

优先级 4（最低）：参考 Skills
  └─ 例如：工具说明（按需查阅）
```

---

## 执行过程

### 完整执行流程

```
用户请求
   │
   ▼
┌─────────────────────────────┐
│ 1. 上下文识别              │
│    - 分析用户请求           │
│    - 理解当前上下文        │
│    - 识别任务类型           │
└─────────────────────────────┘
   │
   ▼
┌─────────────────────────────┐
│ 2. 技能匹配                │
│    - 扫描可用 Skills       │
│    - 评估相关性            │
│    - 选择最相关的 Skills    │
└─────────────────────────────┘
   │
   ▼
┌─────────────────────────────┐
│ 3. 渐进式加载              │
│    - 高优先级先加载         │
│    - 按需加载详细内容       │
│    - 防止上下文过载        │
└─────────────────────────────┘
   │
   ▼
┌─────────────────────────────┐
│ 4. 知识应用                │
│    - 应用技能中的指令       │
│    - 遵循最佳实践          │
│    - 执行任务              │
└─────────────────────────────┘
   │
   ▼
┌─────────────────────────────┐
│ 5. 输出生成                │
│    - 按照技能标准生成       │
│    - 确保符合规范           │
│    - 提供结果              │
└─────────────────────────────┘
   │
   ▼
生成输出
```

### 详细说明

#### 1. 上下文识别（Context Recognition）

**分析用户请求和当前上下文：**

- **用户意图** - 用户想做什么？
- **任务类型** - 开发、审查、文档、其他？
- **涉及领域** - API、数据库、前端、后端？
- **复杂度评估** - 简单任务还是复杂任务？

**示例：**
```
用户请求："帮我创建一个商品评论功能"

上下文识别结果：
├─ 意图：创建新功能
├─ 任务类型：功能开发
├─ 涉及领域：电商、API、数据库、后端
└─ 复杂度：复杂（需要多个步骤）
```

#### 2. 技能匹配（Skill Matching）

**从可用技能中找到最相关的：**

```
可用 Skills: [chinese-first-rule, context-retrieval-checklist,
             five-stage-workflow, mandatory-verification,
             mall-crud-generator, mall-code-review,
             mall-multi-tenant, mall-api-development]

匹配分析：
├─ chinese-first-rule: 相关性 100%（所有任务都需要）
├─ context-retrieval-checklist: 相关性 90%（编码前必须）
├─ five-stage-workflow: 相关性 85%（开发任务）
├─ mandatory-verification: 相关性 80%（开发任务）
├─ mall-crud-generator: 相关性 75%（生成 CRUD 代码）
├─ mall-multi-tenant: 相关性 70%（涉及多租户）
├─ mall-api-development: 相关性 85%（开发 API）
└─ mall-code-review: 相关性 10%（开发时不需要）

选择结果：
✅ 高相关性：chinese-first-rule, context-retrieval-checklist,
             five-stage-workflow, mall-api-development
✅ 中相关性：mandatory-verification, mall-crud-generator,
             mall-multi-tenant
❌ 不相关：mall-code-review
```

#### 3. 知识应用（Knowledge Application）

**应用技能中的指令和最佳实践：**

```
应用 Skills 指令：

1. 遵循 chinese-first-rule：
   ✓ 所有输出使用简体中文
   ✓ 代码注释使用简体中文
   ✓ 文档使用简体中文

2. 执行 context-retrieval-checklist：
   ✓ 第 1 步：查看项目结构
   ✓ 第 2 步：分析相关文件
   ✓ ...
   ✓ 第 7 步：验证理解

3. 按照 five-stage-workflow：
   ✓ 阶段 1：研究
   ✓ 阶段 2：计划
   ✓ 阶段 3：实施
   ✓ 阶段 4：验证
   ✓ 阶段 5：提交

4. 遵循 mall-api-development：
   ✓ API 路径规范
   ✓ 请求/响应格式
   ✓ 错误处理标准

5. 使用 mall-crud-generator：
   ✓ 生成 Entity
   ✓ 生成 Mapper
   ✓ 生成 Service
   ✓ 生成 Controller
```

#### 4. 输出生成（Output Generation）

**按照技能标准生成结果：**

```
生成符合规范的输出：

✅ 语言：简体中文
✅ 代码风格：符合项目规范
✅ API 设计：遵循 RESTful 标准
✅ 多租户支持：正确实现租户隔离
✅ 代码注释：详细且清晰
✅ 文档完整：包含使用说明
```

---

## 关键特性

### 1. 智能匹配

Claude 会智能分析任务，自动选择最相关的 Skills，无需用户手动指定。

### 2. 渐进式披露

Skills 内容采用渐进式披露，防止一次性加载过多信息导致上下文过载。

### 3. 按需加载

只有与当前任务相关的 Skills 才会被加载，不相关的 Skills 完全不消耗 token。

### 4. 上下文感知

Claude 会考虑整个对话上下文，动态调整 Skills 的加载策略。

---

## 实际示例

### 示例 1：简单文档编写

```
用户：帮我写一个 README

执行过程：
1. 上下文识别
   - 意图：编写文档
   - 任务类型：文档编写
   - 复杂度：简单

2. 技能匹配
   - chinese-first-rule: ✅ 高相关性
   - 其他 Skills: ❌ 不相关

3. 渐进式加载
   - 加载 chinese-first-rule（200 行）

4. 知识应用
   - 使用简体中文编写

5. 输出生成
   - 生成符合规范的 README

Token 消耗：约 2,000 tokens
```

### 示例 2：复杂功能开发

```
用户：创建商品评论功能

执行过程：
1. 上下文识别
   - 意图：创建新功能
   - 任务类型：功能开发
   - 涉及领域：API、数据库、多租户
   - 复杂度：复杂

2. 技能匹配
   - chinese-first-rule: ✅ 高相关性
   - context-retrieval-checklist: ✅ 高相关性
   - five-stage-workflow: ✅ 高相关性
   - mall-api-development: ✅ 高相关性
   - mall-multi-tenant: ✅ 中相关性
   - mall-crud-generator: ✅ 中相关性

3. 渐进式加载
   - 第 1 轮：加载核心 Skills（约 1,500 行）
   - 第 2 轮：加载领域 Skills（约 1,000 行）

4. 知识应用
   - 应用所有相关 Skills 的指令

5. 输出生成
   - 生成符合所有规范的完整功能

Token 消耗：约 12,000 tokens
```

---

## 相关主题

- **Skills 简介**：[[./skills-introduction/theme.md|了解 Claude Skills 的基本概念]]
- **Skills 核心特性**：[[./skills-features/theme.md|深入了解 Token 效率优化]]
- **Skills vs MCP**：[[./skills-vs-mcp/theme.md|比较 Skills 和 MCP 的区别]]
- **Skills 实施方案**：[[./skills-implementation/theme.md|学习如何实施 Skills]]
- **Skills 优化效果**：[[./skills-optimization/theme.md|Token 消耗对比分析]]

---

## 总结

Claude Skills 通过**渐进式披露流程**和**智能按需加载**，实现了高效的知识管理：

- **审查** → 查看 Skills 列表
- **确定** → 匹配相关 Skills
- **加载** → 仅加载必要内容
- **应用** → 执行任务

这种机制确保了：
1. **Token 效率** - 只加载必要的内容
2. **响应速度** - 减少加载时间
3. **灵活性** - 根据任务动态调整
4. **可扩展性** - 轻松添加新 Skills
