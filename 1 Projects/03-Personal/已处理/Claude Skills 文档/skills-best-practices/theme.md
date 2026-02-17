# Skills 最佳实践指南

## 概述

本指南提供了 Claude Skills 的最佳实践，帮助您有效创建、管理和优化技能库。

---

## 快速开始

### 基础设置

```bash
# 创建技能目录
mkdir -p .claude/skills

# 创建第一个技能
mkdir -p .claude/skills/my-first-skill
```

### 目录结构

```
.claude/skills/
├── README.md                # Skills 索引
└── my-first-skill/        # 你的第一个技能
    └── SKILL.md           # 技能内容
```

### 技能拆分策略

#### 拆分步骤

1. **阅读 CLAUDE.md**：全面了解现有内容
2. **识别主题**：找出独立的主题模块
3. **评估大小**：评估每个模块的内容量
4. **规划拆分**：决定如何拆分和组织

#### 拆分示例

```
原 CLAUDE.md（假设包含以下内容）：

## 语言规范
所有内容必须使用简体中文...

## 上下文检索
编码前必须执行 7 步检索...

## 验证机制
拒绝 CI/远程验证...

## API 规范
遵循 RESTful 标准...

## 代码审查
按照 6 个维度审查...

拆分为：
├─ chinese-first-rule/SKILL.md
├─ context-retrieval-checklist/SKILL.md
├─ five-stage-workflow/SKILL.md
├─ mandatory-verification/SKILL.md
├─ api-development/SKILL.md
└─ code-review/SKILL.md
```

### 简化 CLAUDE.md

简化后的 CLAUDE.md 应该只包含：

```markdown
# CLAUDE.md

## 概览

## Skills 索引

### 通用技能

- **中文优先规范**：[skills/chinese-first-rule/SKILL.md]
  - 适用：所有任务
  - 用途：强制使用简体中文

- **上下文检索清单**：[skills/context-retrieval-checklist/SKILL.md]
  - 适用：编码前
  - 用途：7 步强制检索流程

- **代码审查标准**：[skills/code-review/SKILL.md]
  - 适用：代码审查
  - 用途：6 维度代码质量检查

## 快速开始

1. 阅读 [中文优先规范](skills/chinese-first-rule/SKILL.md)
2. 了解 [上下文检索清单](skills/context-retrieval-checklist/SKILL.md)
3. 开始使用 Claude Code
```

# 創建

在 `.claude/skills/README.md` 中列出所有 Skills：

```markdown
# Skills 索引

## 技能列表

### 通用技能

| 技能名称 | 描述 | 适用场景 | 大小 |
|---------|------|---------|------|
| [chinese-first-rule](./chinese-first-rule/SKILL.md) | 中文优先规范 | 所有任务 | 200 行 |
| [context-retrieval-checklist](./context-retrieval-checklist/SKILL.md) | 上下文检索清单 | 编码前 | 550 行 |

### 开发技能

| 技能名称 | 描述 | 适用场景 | 大小 |
|---------|------|---------|------|
| [code-review](./code-review/SKILL.md) | 代码审查标准 | 代码审查 | 250 行 |

### 使用指南

1. **自动加载**：Claude 会根据任务类型自动加载相关技能
2. **参考示例**：每个技能包含示例和最佳实践

### 最佳实践

- ✅ 遵循单一职责原则
- ✅ 保持技能在合理大小（200-650 行）
- ✅ 清晰的命名和组织
```

# 測試

# 測試

# 文檔

## 技能组合示例

### 1. 写作任务
```markdown
用户：帮我写一个 README

预期技能：
├─ 加载：chinese-first-rule（约 200 行）
├─ Token：约 2,000

验证：
□ 内容使用简体中文
□ 只加载必要的技能
□ Token 消耗符合预期
```

### 2. API 开发任务
```markdown
预期技能：
├─ 加载：
│  ├─ chinese-first-rule
│  ├─ context-retrieval-checklist
│  ├─ five-stage-workflow
│  └─ api-development
├─ Token：约 8,000

验证：
□ 遵循 5 阶段流程
□ 执行上下文检索
□ 符合 API 规范
□ 所有内容使用简体中文
□ Token 消耗符合预期
```

### 3. 代码审查任务
```markdown
预期技能：
├─ 加载：
│  ├─ chinese-first-rule
│  └─ code-review
├─ Token：约 4,000

验证：
□ 按照标准审查代码
□ 提供具体的改进建议
□ 所有内容使用简体中文
□ Token 消耗符合预期
```

---

## 最佳实践建议

### 1. 合理控制技能大小

#### 大小建议

| 大小 | 建议 | 理由 |
|------|------|------|
| < 200 行 | 考虑合并 | 过小会导致技能数量过多 |
| 200-400 行 | ✅ 理想 | 平衡可读性和模块化 |
| 400-650 行 | ✅ 可接受 | 可以继续使用 |
| > 650 行 | 考虑拆分 | 过大失去模块化优势 |

### 2. 技能拆分策略

#### 拆分原则
1. **单一职责**：每个技能应该专注一个主题
2. **主题拆分**：将多个主题拆分为独立技能
3. **大小控制**：SKILL.md 控制在 200-650 行

#### 拆分示例

```
原技能：api-standards（800 行）

优化后：
├─ api-standards/SKILL.md（300 行）
│  └─ 核心规则和原则
├─ reference/
│  ├─ restful-guide.md（200 行）
│  └─ http-status-codes.md（150 行）
└── examples/
    └─ api-examples.md（150 行）

结果：
└─ SKILL.md：300 行 ✅
```

### 3. 清晰的命名和组织

#### 命名原则

1. **描述性名称**：名称应该清楚描述技能的内容

```
✅ 好的命名：
├─ chinese-first-rule
├─ context-retrieval-checklist
├─ five-stage-workflow
└─ api-development-standards

❌ 不好的命名：
├─ rule-1
├─ workflow
├─ api
└─ dev
```

2. **一致的风格**：所有技能使用一致的命名风格

```
✅ 一致的风格：
├─ chinese-first-rule
├─ context-retrieval-checklist
└─ five-stage-workflow

❌ 不一致的风格：
├─ ChineseFirstRule
├─ contextRetrieval
└─ workflow-5-stages
```

#### 目录组织结构

```
.claude/skills/
├── README.md                # 技能索引
├── general/                 # 通用技能
│   ├── chinese-first-rule/
│   ├── context-retrieval-checklist/
│   └── five-stage-workflow/
├── development/             # 开发技能
│   ├── api-development/
│   ├── code-review/
│   └── multi-tenant/
└── documentation/           # 文档资料
    ├── design-principles.md
    └── best-practices.md
```

# 更新

#### 审查周期

| 周期 | 审查内容 | 频率 |
|------|---------|------|
| **每周** | 检查技能错误和不一致 | 每周 1 次 |
| **每月** | 审查技能是否符合实际使用 | 每月 1 次 |
| **每季度** | 全面审查所有技能 | 每季度 1 次 |

#### 维护流程

```
发现问题
   ↓
分析需求
   ↓
设计解决方案
   ↓
实施修改
   ↓
测试验证
   ↓
提交更改
   └─ Git commit with clear message
```

### 必须包含的内容

在每个技能中明确说明：

1. **技能描述**：技能的主要功能
2. **触发条件**：Claude 何时会加载这个技能
3. **典型应用**：典型的使用示例
4. **与其他技能的关系**：与其他技能的配合使用

#### 完整示例

```markdown
# api-development/SKILL.md

## 技能描述

**何时使用这个技能：**
✅ 实现 API 错误处理时
✅ 设计 RESTful 接口时
✅ 处理 HTTP 状态码时

**何时不需要使用这个技能：**
❌ 审查代码时（使用 code-review）

## 触发条件

Claude 会在以下情况下加载此技能：

1. 用户提到"API"或"接口"
2. 提到 RESTful、endpoint、HTTP 方法
3. 涉及接口设计或错误处理

**关键词**：
- API, 接口, endpoint, RESTful, HTTP, POST, GET, PUT, DELETE

## 典型应用

**使用的技能**：
- chinese-first-rule（语言规范）
- multi-tenant（多租户隔离）

**具体应用**：
- 设计 RESTful API 端点
- 实现 API 错误处理
- 处理多租户数据隔离

## 与其他技能的关系

**依赖关系**：

```
api-development
├─ 依赖：multi-tenant（API 支持多租户）
└─ 被依赖：code-review（审查 API 时参考规范）
```
```

---

## 常见问题

### Q1: 如何确定一个 Skill 是否需要拆分？

**A**: 使用以下标准判断：

1. **内容长度**：超过 650 行考虑拆分
2. **主题数量**：包含 2 个以上明确主题
# 場景
# 更新

**示例**：

```
需要拆分的情况：
├─ API 规范 Skill（800 行）
# 設計
│  └─ 拆分为：api-design, http-standards, error-handling, authentication

不需要拆分的情况：
├─ 中文规范 Skill（200 行）
│  └─ 包含：语言规范（单一主题）
```

### Q2: Skills 应该多详细？

**A**: 平衡详细程度和大小：

1. **核心规则**：必须完整详细
2. **示例**：提供充足的示例
# 文檔
4. **大小控制**：SKILL.md 控制在 200-650 行

**示例**：

```
SKILL.md（300 行）：
├─ 核心规则和原则（200 行）
├─ 基础示例（100 行）

reference/restful-guide.md（500 行）：
# 指南
```

### Q3: 如何处理技能之间的冲突？

**A**: 预防为主，建立优先级：

1. **避免冲突**：技能应该互补，不应冲突
2. **明确优先级**：如果可能冲突，明确优先级

**示例**：

```
明确优先级：

chinese-first-rule 技能:
└─ 优先级：最高（所有任务都必须遵循）

api-development 技能:
└─ 优先级：中高（API 开发时遵循）

code-review 技能:
└─ 优先级：中（代码审查时遵循）

规则：
├─ 冲突时，优先级高的技能生效
└─ 一般情况下，技能应该不冲突
```

## 技能测试验证

### 测试场景

#### 1. 写作任务测试
```markdown
任务：编写 README
验证：
├─ 加载：chinese-first-rule
└─ 验证：只加载必要的技能
```

#### 2. 开发任务测试
```markdown
任务：API 开发
验证：
├─ 加载：chinese-first-rule, context-retrieval-checklist, five-stage-workflow, api-development
└─ 验证：加载所有相关技能
```

#### 3. 代码审查测试
```markdown
任务：代码审查
验证：
├─ 加载：chinese-first-rule, code-review
└─ 验证：加载特定技能
```

### 性能验证

□ Token 消耗验证：检查 Token 消耗符合预期
□ 响应速度验证：检查响应速度正常

## 技能复用

### 跨项目复用

**可以复用的情况：**

1. **通用技能**：可以直接复用
   - chinese-first-rule
   - code-review（通用标准）

2. **特定领域技能**：需要根据项目调整
   - api-development（可能需要定制）
   - multi-tenant（可能需要定制）

3. **最佳实践**：
   - 将通用技能放到独立的仓库
   - 将特定领域技能放在项目中

**复用示例：**

```
通用技能仓库：
└─ .claude/skills/
    ├── chinese-first-rule/
    └── code-review/

项目技能仓库：
└─ .claude/skills/
    ├── api-development/      # 定制化
    └── multi-tenant/       # 定制化
```

---

## 维护和版本控制

### 日常维护

**每日检查：**
- [ ] 是否有错误或不一致的地方需要修正

**每周检查：**
- [ ] 技能是否符合实际使用情况

**每月检查：**
- [ ] 全面审查所有技能的内容

**每季度检查：**
- [ ] 评估技能是否需要优化或重构

### 版本控制

#### 提交规范

```bash
# 更新技能
git commit -m "update(api-development): add GraphQL support"

# 新增技能
git commit -m "feat(skills): add authentication skill"

# 修复问题
git commit -m "fix(code-review): correct naming convention"

# 删除技能
git commit -m "refactor(skills): remove deprecated skill"
```

#### 分支策略

```
main 分支：
└─ 稳定的技能

feature/* 分支：
└─ 新功能或改进的技能

hotfix/* 分支：
└─ 紧急修复
```

### 团队协作

**协作流程：**

1. **分工明确**：不同人负责不同的技能
2. **代码审查**：技能变更需要经过审查
3. **文档同步**：保持技能文档的更新
4. **测试验证**：新技能需要经过测试验证

---

## 高级技巧

### 1. 技能组合模式

```markdown
组合 1：API 开发
├─ chinese-first-rule
├─ context-retrieval-checklist
├─ five-stage-workflow
└─ api-development

组合 2：代码质量保证
├─ chinese-first-rule
├─ code-review
└── mandatory-verification

组合 3：多租户系统开发
├─ chinese-first-rule
├─ api-development
└── multi-tenant
```

### 2. 渐进式加载策略

```markdown
第 1 批：核心必需（总是加载）
└─ chinese-first-rule

第 2 批：任务相关（按需加载）
└─ context-retrieval, five-stage-workflow

第 3 批：领域相关（按需加载）
└─ api-development, multi-tenant

第 4 批：质量保证（按需加载）
└─ code-review, validation
```

### 3. 动态调整

```markdown
写作任务：
└─ 技能：five-stage-workflow, code-review

设计任务：
└─ 技能：api-development, architecture

优化任务：
└─ 技能：performance, security
```

---

## 相关主题

- **Skills 简介**：[[./skills-introduction/theme.md|了解 Claude Skills 的基本概念]]
- **Skills 工作原理**：[[./skills-mechanism/theme.md|了解加载机制和执行流程]]
- **Skills 实施方案**：[[./skills-implementation/theme.md|學習如何实施 Skills]]

---

## 总结

使用 Claude Skills 的关键步骤：

1. **规划技能架构** - 设计技能的层次结构
2. **拆分 CLAUDE.md** - 按主题拆分为多个技能
3. **创建技能文件** - 编写高质量的技能文档
4. **测试验证** - 确保技能正常工作

最佳实践：

- ✅ 合理控制技能大小（200-650 行）
- ✅ 清晰的命名和组织
- ✅ 高效的团队协作
- ✅ 持续维护和优化
