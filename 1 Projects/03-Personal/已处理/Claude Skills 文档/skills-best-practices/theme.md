# 指南

## 概述

# 學習

---

## 如何开始使用

# 目錄

# 專案

```bash
# 目錄
mkdir -p .claude/skills

# 目錄
mkdir -p .claude/skills/my-first-skill
```

# 目錄

```
.claude/
# 專案
# 專案
# 目錄
    ├── README.md                # Skills 索引
    └── my-first-skill/        # 你的第一个 Skill
        └── SKILL.md           # Skill 内容
```

### 第二步：拆分现有 CLAUDE.md

# 分析

# 分析

1. **阅读 CLAUDE.md**：全面了解现有内容
2. **识别主题**：找出独立的主题模块
3. **评估大小**：评估每个模块的内容量
4. **规划拆分**：决定如何拆分和组织

#### 拆分示例

```
原 CLAUDE.md（假设包含以下内容）：

# 專案

## 语言规范
所有内容必须使用简体中文...

## 上下文检索
编码前必须执行 7 步检索...

# 開發
# 開發

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

# 文檔

```markdown
# CLAUDE.md

## 概览

# 檔案

## Skills 索引

### 通用 Skills

- **中文优先规范**：[skills/chinese-first-rule/SKILL.md]
  - 适用：所有任务
  - 用途：强制使用简体中文

- **上下文检索清单**：[skills/context-retrieval-checklist/SKILL.md]
  - 适用：编码前
  - 用途：7 步强制检索流程

# 專案

# 開發
# 開發
# 設計

- **代码审查标准**：[skills/code-review/SKILL.md]
  - 适用：代码审查
  - 用途：6 维度代码质量检查

## 快速开始

1. 阅读 [中文优先规范](skills/chinese-first-rule/SKILL.md)
# 開發
3. 开始使用 Claude Code
```

# 創建

在 `.claude/skills/README.md` 中列出所有 Skills：

```markdown
# Skills 索引

# 專案

## Skills 列表

### 通用 Skills

# 場景
|-------|------|---------|------|
| [chinese-first-rule](./chinese-first-rule/SKILL.md) | 中文优先规范 | 所有任务 | 200 行 |
| [context-retrieval-checklist](./context-retrieval-checklist/SKILL.md) | 上下文检索清单 | 编码前 | 550 行 |
# 開發

# 專案

# 場景
|-------|------|---------|------|
# 開發
| [code-review](./code-review/SKILL.md) | 代码审查标准 | 代码审查 | 250 行 |

# 指南

### 如何使用 Skills

1. **自动加载**：Claude 会根据任务类型自动加载相关 Skills
# 連結
3. **参考示例**：每个 Skill 包含示例和最佳实践

### 最佳实践

- ✅ 遵循单一职责原则
- ✅ 保持 Skill 在合理大小（200-650 行）
# 文檔
# 更新

# 文檔

# 專案
# 設計
# 指南
```

# 測試

# 測試

# 文檔

```
用户：帮我写一个 README

预期：
├─ 加载：chinese-first-rule（约 200 行）
├─ Token：约 2,000
# 輸出

验证：
□ 内容使用简体中文
□ 只加载必要的 Skills
□ Token 消耗符合预期
```

# 開發

```
# 創建

预期：
├─ 加载：
│  ├─ chinese-first-rule
│  ├─ context-retrieval-checklist
│  ├─ five-stage-workflow
│  └─ api-development
├─ Token：约 8,000
# 輸出

验证：
□ 遵循 5 阶段流程
□ 执行上下文检索
□ 符合 API 规范
□ 所有内容使用简体中文
□ Token 消耗符合预期
```

# 測試

```
用户：审查这段代码

预期：
├─ 加载：
│  ├─ chinese-first-rule
│  └─ code-review
├─ Token：约 4,000
# 輸出

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

# 優化

# 優化

# 文檔
# 目錄
# 目錄
4. **拆分主题**：将多个主题拆分为独立 Skills

**示例：**

```
原 Skill：api-standards（800 行）

# 優化
├─ api-standards/SKILL.md（300 行）
│  └─ 核心规则和原则
├─ reference/
│  ├─ restful-guide.md（200 行）
│  └─ http-status-codes.md（150 行）
└── examples/
    └─ api-examples.md（150 行）

结果：
└─ SKILL.md：300 行 ✅
# 檔案
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

# 目錄

```
.claude/skills/
├── README.md                # Skills 索引
│
├── general/                 # 通用 Skills
│   ├── chinese-first-rule/
│   ├── context-retrieval-checklist/
│   └── five-stage-workflow/
│
# 專案
│   ├── api-development/
│   ├── code-review/
│   └── multi-tenant/
│
# 文檔
    ├── design-principles.md
    └── best-practices.md
```

# 更新

#### 审查周期

| 周期 | 审查内容 | 频率 |
|------|---------|------|
# 場景
# 更新
| **每季度** | 全面审查所有 Skills | 每季度 1 次 |
# 專案

# 更新

```
# 更新
   ↓
# 更新
# 更新
# 更新
   ↓
# 檔案
# 修改
   ↓
# 更新
# 更新
   ↓
# 文檔
# 文檔
   ↓
5. 提交更改
   └─ Git commit with clear message
```

# 文檔

#### 必须包含的内容

在每个 Skill 中明确说明：

# 場景
2. **触发条件**：Claude 何时会加载这个 Skill
3. **典型应用**：典型的使用示例
4. **与其他 Skills 的关系**：与其他 Skill 的配合使用

#### 完整示例

```markdown
# api-development/SKILL.md

# 場景

**何时使用这个 Skill：**

# 開發
# 修改
# 設計
✅ 实现 API 错误处理时

**何时不需要使用这个 Skill：**

# 文檔
❌ 审查代码时（使用 code-review）

## 触发条件

Claude 会在以下情况下加载此 Skill：

1. 用户提到"API"或"接口"
# 設計
# 修改

**关键词**：
- API, 接口, endpoint, RESTful, HTTP, POST, GET, PUT, DELETE

## 典型应用

# 創建

# 創建

**使用的 Skills**：
- chinese-first-rule（语言规范）
# 設計
- multi-tenant（多租户隔离）

**具体应用**：
# 方法
# 新增

## 与其他 Skills 的关系

**依赖关系**：

```
api-development
# 文檔
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

### Q3: 如何处理 Skills 之间的冲突？

**A**: 预防为主，建立优先级：

1. **避免冲突**：Skills 应该互补，不应冲突
2. **明确优先级**：如果可能冲突，明确优先级
# 設計

**示例**：

```
明确优先级：

chinese-first-rule Skill:
└─ 优先级：最高（所有任务都必须遵循）

api-development Skill:
# 開發

code-review Skill:
└─ 优先级：中（代码审查时遵循）

规则：
├─ 冲突时，优先级高的 Skill 生效
└─ 一般情况下，Skills 应该不冲突
```

# 測試

# 測試

```
# 測試

# 測試
   └─ 任务：编写 README
   └─ 验证：只加载必要的 Skills

# 測試
# 創建
   └─ 验证：加载所有相关 Skills

# 測試
   └─ 任务：代码审查
   └─ 验证：加载特定 Skills

# 輸出
# 輸出

□ Token 消耗验证
   └─ 检查：Token 消耗符合预期

# 效能
   └─ 检查：响应速度正常
```

# 專案

**A**: 可以，但需要注意：

1. **通用 Skills**：可以直接复用
   - chinese-first-rule
   - code-review（通用标准）

# 專案
# 專案
# 專案

3. **最佳实践**：
   - 将通用 Skills 放到独立的仓库
# 專案

**示例**：

```
通用 Skills 仓库：
└─ .claude/skills/
    ├── chinese-first-rule/
    └── code-review/

# 專案
└─ .claude/skills/
    ├── api-development/      # 定制化
    └── multi-tenant/       # 定制化
```

---

# 指南

### 日常维护

**每日检查：**
# 新增
- [ ] 是否有错误或不一致的地方需要修正

**每周检查：**
- [ ] Skills 是否符合实际使用情况
# 更新

**每月检查：**
- [ ] 全面审查所有 Skills 的内容
# 更新
# 優化

# 版本

**提交规范：**

```bash
# 更新
git commit -m "update(api-development): add GraphQL support"

# 新增 Skill
git commit -m "feat(skills): add authentication Skill"

# 修復
git commit -m "fix(code-review): correct naming convention"

# 刪除
git commit -m "refactor(skills): remove deprecated Skill"
```

**分支策略：**

```
main 分支：
└─ 稳定的 Skills

feature/* 分支：
└─ 新功能或改进的 Skills

hotfix/* 分支：
# 修復
```

### 团队协作

**协作流程：**

1. **分工明确**：不同人负责不同的 Skills
# 更新
# 修改
# 文檔

---

## 高级技巧

### 1. 技能组合模式

# 創建

```
# 開發
├─ chinese-first-rule
├─ context-retrieval-checklist
├─ five-stage-workflow
└─ api-development

组合 2：代码质量保证
├─ chinese-first-rule
├─ code-review
└── mandatory-verification

# 開發
├─ chinese-first-rule
├─ api-development
└── multi-tenant
```

### 2. 渐进式加载策略

# 優化

```
第 1 批：核心必需（总是加载）
└─ chinese-first-rule

第 2 批：任务相关（按需加载）
└─ context-retrieval, five-stage-workflow

第 3 批：领域相关（按需加载）
└─ api-development, multi-tenant

# 資訊
└─ code-review, validation
```

### 3. 动态调整

# 專案

```
# 專案
# 開發
└─ Skills：five-stage-workflow, code-review

# 專案
# 設計
└─ Skills：api-development, architecture

# 專案
# 優化
└─ Skills：performance, security
```

---

## 相关主题

- **Skills 简介**：[[./skills-introduction/theme.md|了解 Claude Skills 的基本概念]]
- **Skills 工作原理**：[[./skills-mechanism/theme.md|了解加载机制和执行流程]]
# 效率
- **Skills 实施方案**：[[./skills-implementation/theme.md|學習如何实施 Skills]]
# 設計

---

## 总结

使用 Claude Skills 的关键步骤：

# 目錄
2. **拆分 CLAUDE.md** - 按主题拆分为多个 Skills
# 文檔
# 創建
# 測試

最佳实践：

- ✅ 合理控制 Skill 大小（200-650 行）
- ✅ 清晰的命名和组织
# 更新
# 文檔

# 指南

# 更新
# 版本
- ✅ 高效的团队协作

# 指南
