# 最佳实践指南 / Best Practices Guide

## 概述

学习如何开始使用和维护 Claude Skills，掌握最佳实践和常见问题的解决方案。

---

## 如何开始使用

### 第一步：创建 Skills 目录结构

在项目的 `.claude/` 目录下创建 `skills/` 目录：

```bash
# 创建 skills 目录
mkdir -p .claude/skills

# 创建示例 Skill 目录
mkdir -p .claude/skills/my-first-skill
```

**目录结构：**

```
.claude/
├── CLAUDE.md                    # 项目配置（保持简短）
├── README.md                    # 项目 README
└── skills/                     # Skills 目录
    ├── README.md                # Skills 索引
    └── my-first-skill/        # 你的第一个 Skill
        └── SKILL.md           # Skill 内容
```

### 第二步：拆分现有 CLAUDE.md

分析现有 CLAUDE.md 内容，按主题拆分为多个 Skills：

#### 分析步骤

1. **阅读 CLAUDE.md**：全面了解现有内容
2. **识别主题**：找出独立的主题模块
3. **评估大小**：评估每个模块的内容量
4. **规划拆分**：决定如何拆分和组织

#### 拆分示例

```
原 CLAUDE.md（假设包含以下内容）：

# 项目开发规范

## 语言规范
所有内容必须使用简体中文...

## 上下文检索
编码前必须执行 7 步检索...

## 开发流程
遵循 5 阶段开发流程...

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

### 第三步：简化 CLAUDE.md

将原始 CLAUDE.md 简化为索引文档，包含：

```markdown
# CLAUDE.md

## 概览

本文件为核心规则精简版，详细规范见 Skills。

## Skills 索引

### 通用 Skills

- **中文优先规范**：[skills/chinese-first-rule/SKILL.md]
  - 适用：所有任务
  - 用途：强制使用简体中文

- **上下文检索清单**：[skills/context-retrieval-checklist/SKILL.md]
  - 适用：编码前
  - 用途：7 步强制检索流程

### 项目特定 Skills

- **API 开发规范**：[skills/api-development/SKILL.md]
  - 适用：API 开发
  - 用途：RESTful API 设计标准

- **代码审查标准**：[skills/code-review/SKILL.md]
  - 适用：代码审查
  - 用途：6 维度代码质量检查

## 快速开始

1. 阅读 [中文优先规范](skills/chinese-first-rule/SKILL.md)
2. 了解 [开发流程](skills/five-stage-workflow/SKILL.md)
3. 开始使用 Claude Code
```

### 第四步：创建 Skills README

在 `.claude/skills/README.md` 中列出所有 Skills：

```markdown
# Skills 索引

本目录包含项目的所有 Claude Skills。

## Skills 列表

### 通用 Skills

| Skill | 描述 | 适用场景 | 大小 |
|-------|------|---------|------|
| [chinese-first-rule](./chinese-first-rule/SKILL.md) | 中文优先规范 | 所有任务 | 200 行 |
| [context-retrieval-checklist](./context-retrieval-checklist/SKILL.md) | 上下文检索清单 | 编码前 | 550 行 |
| [five-stage-workflow](./five-stage-workflow/SKILL.md) | 五阶段开发流程 | 功能开发 | 480 行 |

### 项目特定 Skills

| Skill | 描述 | 适用场景 | 大小 |
|-------|------|---------|------|
| [api-development](./api-development/SKILL.md) | API 开发规范 | API 开发 | 400 行 |
| [code-review](./code-review/SKILL.md) | 代码审查标准 | 代码审查 | 250 行 |

## 使用指南

### 如何使用 Skills

1. **自动加载**：Claude 会根据任务类型自动加载相关 Skills
2. **查看 Skills**：点击上方的链接查看详细内容
3. **参考示例**：每个 Skill 包含示例和最佳实践

### 最佳实践

- ✅ 遵循单一职责原则
- ✅ 保持 Skill 在合理大小（200-650 行）
- ✅ 文档化触发场景
- ✅ 定期审查和更新

### 相关文档

- [项目 CLAUDE.md](../CLAUDE.md) - 核心规则概览
- [Skills 设计原则](./docs/design-principles.md) - 如何设计良好 Skills
- [Skills 最佳实践](./docs/best-practices.md) - 使用和维护指南
```

### 第五步：测试验证

通过不同类型的任务测试 Skills 加载：

#### 测试任务 1：简单文档编写

```
用户：帮我写一个 README

预期：
├─ 加载：chinese-first-rule（约 200 行）
├─ Token：约 2,000
└─ 输出：简体中文 README

验证：
□ 内容使用简体中文
□ 只加载必要的 Skills
□ Token 消耗符合预期
```

#### 测试任务 2：功能开发

```
用户：创建商品评论功能

预期：
├─ 加载：
│  ├─ chinese-first-rule
│  ├─ context-retrieval-checklist
│  ├─ five-stage-workflow
│  └─ api-development
├─ Token：约 8,000
└─ 输出：符合所有规范的功能代码

验证：
□ 遵循 5 阶段流程
□ 执行上下文检索
□ 符合 API 规范
□ 所有内容使用简体中文
□ Token 消耗符合预期
```

#### 测试任务 3：代码审查

```
用户：审查这段代码

预期：
├─ 加载：
│  ├─ chinese-first-rule
│  └─ code-review
├─ Token：约 4,000
└─ 输出：详细的审查报告

验证：
□ 按照标准审查代码
□ 提供具体的改进建议
□ 所有内容使用简体中文
□ Token 消耗符合预期
```

---

## 最佳实践建议

### 1. 合理控制 Skill 大小

#### 大小建议

| 大小 | 建议 | 理由 |
|------|------|------|
| < 200 行 | 考虑合并 | 过小会导致 Skills 数量过多 |
| 200-400 行 | ✅ 理想 | 平衡可读性和模块化 |
| 400-650 行 | ✅ 可接受 | 可以继续使用 |
| > 650 行 | 考虑拆分 | 过大失去模块化优势 |

#### 优化策略

**如何优化过大 Skill：**

1. **分离参考文档**：将详细参考移到 `reference/` 目录
2. **分离示例**：将示例移到 `examples/` 目录
3. **分离模板**：将模板移到 `templates/` 目录
4. **拆分主题**：将多个主题拆分为独立 Skills

**示例：**

```
原 Skill：api-standards（800 行）

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
   └─ 参考和示例：独立文件 ✅
```

### 2. 清晰的命名和组织

#### 命名原则

1. **描述性名称**：名称应该清楚描述 Skill 的内容

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

2. **一致的风格**：所有 Skill 使用一致的命名风格

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

#### 目录组织

```
.claude/skills/
├── README.md                # Skills 索引
│
├── general/                 # 通用 Skills
│   ├── chinese-first-rule/
│   ├── context-retrieval-checklist/
│   └── five-stage-workflow/
│
├── project-specific/        # 项目特定 Skills
│   ├── api-development/
│   ├── code-review/
│   └── multi-tenant/
│
└── docs/                   # Skills 文档
    ├── design-principles.md
    └── best-practices.md
```

### 3. 定期审查和更新

#### 审查周期

| 周期 | 审查内容 | 频率 |
|------|---------|------|
| **每周** | 检查是否有新的使用场景 | 每周 1 次 |
| **每月** | 更新过时的规则和标准 | 每月 1 次 |
| **每季度** | 全面审查所有 Skills | 每季度 1 次 |
| **项目变化时** | 更新受影响的 Skills | 项目变化时立即 |

#### 更新流程

```
发现需要更新
   ↓
1. 确定更新范围
   └─ 哪个 Skill 需要更新？
      └─ 具体需要更新什么内容？
   ↓
2. 编辑 Skill 文件
   └─ 修改 SKILL.md
   ↓
3. 测试更新
   └─ 验证更新是否正确
   ↓
4. 更新文档
   └─ 更新 README.md 或相关文档
   ↓
5. 提交更改
   └─ Git commit with clear message
```

### 4. 文档化触发场景

#### 必须包含的内容

在每个 Skill 中明确说明：

1. **适用场景**：何时应该使用这个 Skill
2. **触发条件**：Claude 何时会加载这个 Skill
3. **典型应用**：典型的使用示例
4. **与其他 Skills 的关系**：与其他 Skill 的配合使用

#### 完整示例

```markdown
# api-development/SKILL.md

## 适用场景

**何时使用这个 Skill：**

✅ 开发新的 API 接口时
✅ 修改现有 API 接口时
✅ 设计 API 响应格式时
✅ 实现 API 错误处理时

**何时不需要使用这个 Skill：**

❌ 编写文档时（使用 chinese-first-rule）
❌ 审查代码时（使用 code-review）

## 触发条件

Claude 会在以下情况下加载此 Skill：

1. 用户提到"API"或"接口"
2. 任务涉及设计新的 API
3. 任务涉及修改现有 API

**关键词**：
- API, 接口, endpoint, RESTful, HTTP, POST, GET, PUT, DELETE

## 典型应用

### 示例：创建商品评论 API

**任务**：创建商品评论的增删改查 API

**使用的 Skills**：
- chinese-first-rule（语言规范）
- api-development（API 设计规范）
- multi-tenant（多租户隔离）

**具体应用**：
- 按照 api-development 设计 API 路径、方法、参数
- 按照 multi-tenant 添加租户字段和过滤

## 与其他 Skills 的关系

**依赖关系**：

```
api-development
├─ 依赖：chinese-first-rule（API 文档使用中文）
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
3. **使用场景**：在不同场景下使用不同部分
4. **更新频率**：不同部分更新频率不同

**示例**：

```
需要拆分的情况：
├─ API 规范 Skill（800 行）
│  ├─ 包含：设计原则、HTTP 标准、错误处理、认证
│  └─ 拆分为：api-design, http-standards, error-handling, authentication

不需要拆分的情况：
├─ 中文规范 Skill（200 行）
│  └─ 包含：语言规范（单一主题）
```

### Q2: Skills 应该多详细？

**A**: 平衡详细程度和大小：

1. **核心规则**：必须完整详细
2. **示例**：提供充足的示例
3. **参考文档**：详细内容可以放到 reference/
4. **大小控制**：SKILL.md 控制在 200-650 行

**示例**：

```
SKILL.md（300 行）：
├─ 核心规则和原则（200 行）
├─ 基础示例（100 行）

reference/restful-guide.md（500 行）：
└─ 详细的 RESTful API 指南
```

### Q3: 如何处理 Skills 之间的冲突？

**A**: 预防为主，建立优先级：

1. **避免冲突**：Skills 应该互补，不应冲突
2. **明确优先级**：如果可能冲突，明确优先级
3. **协作设计**：Skills 之间应该协作，而不是竞争

**示例**：

```
明确优先级：

chinese-first-rule Skill:
└─ 优先级：最高（所有任务都必须遵循）

api-development Skill:
└─ 优先级：高（API 开发时遵循）

code-review Skill:
└─ 优先级：中（代码审查时遵循）

规则：
├─ 冲突时，优先级高的 Skill 生效
└─ 一般情况下，Skills 应该不冲突
```

### Q4: 如何测试 Skills 是否正常工作？

**A**: 使用测试任务验证：

```
测试清单：

□ 简单任务测试
   └─ 任务：编写 README
   └─ 验证：只加载必要的 Skills

□ 复杂任务测试
   └─ 任务：创建新功能
   └─ 验证：加载所有相关 Skills

□ 专项任务测试
   └─ 任务：代码审查
   └─ 验证：加载特定 Skills

□ 输出验证
   └─ 检查：输出符合所有 Skills 规范

□ Token 消耗验证
   └─ 检查：Token 消耗符合预期

□ 性能验证
   └─ 检查：响应速度正常
```

### Q5: Skills 可以跨项目复用吗？

**A**: 可以，但需要注意：

1. **通用 Skills**：可以直接复用
   - chinese-first-rule
   - code-review（通用标准）

2. **项目特定 Skills**：需要修改
   - api-development（需要根据项目调整）
   - multi-tenant（需要根据项目调整）

3. **最佳实践**：
   - 将通用 Skills 放到独立的仓库
   - 项目特定 Skills 定制化

**示例**：

```
通用 Skills 仓库：
└─ .claude/skills/
    ├── chinese-first-rule/
    └── code-review/

项目特定 Skills：
└─ .claude/skills/
    ├── api-development/      # 定制化
    └── multi-tenant/       # 定制化
```

---

## 维护指南

### 日常维护

**每日检查：**
- [ ] 是否有新的使用场景需要添加到 Skills
- [ ] 是否有错误或不一致的地方需要修正

**每周检查：**
- [ ] Skills 是否符合实际使用情况
- [ ] 是否有过时的规则需要更新

**每月检查：**
- [ ] 全面审查所有 Skills 的内容
- [ ] 更新过时的标准
- [ ] 优化 Skill 大小和结构

### 版本控制

**提交规范：**

```bash
# 更新单个 Skill
git commit -m "update(api-development): add GraphQL support"

# 新增 Skill
git commit -m "feat(skills): add authentication Skill"

# 修复 Skill
git commit -m "fix(code-review): correct naming convention"

# 删除 Skill
git commit -m "refactor(skills): remove deprecated Skill"
```

**分支策略：**

```
main 分支：
└─ 稳定的 Skills

feature/* 分支：
└─ 新功能或改进的 Skills

hotfix/* 分支：
└─ 紧急修复的 Skills
```

### 团队协作

**协作流程：**

1. **分工明确**：不同人负责不同的 Skills
2. **定期同步**：每周同步一次 Skills 更新
3. **代码审查**：Skills 的修改需要审查
4. **文档更新**：更新 Skills 时同步更新文档

---

## 高级技巧

### 1. 技能组合模式

创建 Skill 组合，处理复杂场景：

```
组合 1：完整开发流程
├─ chinese-first-rule
├─ context-retrieval-checklist
├─ five-stage-workflow
└─ api-development

组合 2：代码质量保证
├─ chinese-first-rule
├─ code-review
└── mandatory-verification

组合 3：多租户开发
├─ chinese-first-rule
├─ api-development
└── multi-tenant
```

### 2. 渐进式加载策略

优化 Skills 的加载顺序和范围：

```
第 1 批：核心必需（总是加载）
└─ chinese-first-rule

第 2 批：任务相关（按需加载）
└─ context-retrieval, five-stage-workflow

第 3 批：领域相关（按需加载）
└─ api-development, multi-tenant

第 4 批：参考信息（按需加载）
└─ code-review, validation
```

### 3. 动态调整

根据项目阶段动态调整 Skills：

```
项目初期：
├─ 侧重：开发流程、编码规范
└─ Skills：five-stage-workflow, code-review

项目中期：
├─ 侧重：API 设计、架构
└─ Skills：api-development, architecture

项目后期：
├─ 侧重：性能优化、安全
└─ Skills：performance, security
```

---

## 相关主题

- **Skills 简介**：[[./skills-introduction/theme.md|了解 Claude Skills 的基本概念]]
- **Skills 工作原理**：[[./skills-mechanism/theme.md|了解加载机制和执行流程]]
- **Skills 核心特性**：[[./skills-features/theme.md|深入了解 Token 效率优化]]
- **Skills 实施方案**：[[./skills-implementation/theme.md|学习如何实施 Skills]]
- **Skills 设计原则**：[[./skills-design-principles/theme.md|设计良好 Skills 的指导原则]]

---

## 总结

使用 Claude Skills 的关键步骤：

1. **创建目录结构** - 建立 `.claude/skills/` 目录
2. **拆分 CLAUDE.md** - 按主题拆分为多个 Skills
3. **简化 CLAUDE.md** - 转变为索引文档
4. **创建 Skills README** - 建立 Skills 索引
5. **测试验证** - 测试按需加载是否正常

最佳实践：

- ✅ 合理控制 Skill 大小（200-650 行）
- ✅ 清晰的命名和组织
- ✅ 定期审查和更新
- ✅ 文档化触发场景

维护指南：

- ✅ 日常检查和更新
- ✅ 规范的版本控制
- ✅ 高效的团队协作

通过遵循这些指南，你将成功建立和维护一个高效的 Skills 体系！
