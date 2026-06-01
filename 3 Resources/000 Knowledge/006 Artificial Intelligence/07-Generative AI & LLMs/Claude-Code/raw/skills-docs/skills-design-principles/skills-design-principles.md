---
title: Claude Skills 设计原则
aliases: [Skills Design Principles, Skills 设计规范]
tags: [claude-code, skills, design, best-practices]
created: 2026-05-26
updated: 2026-06-01
type: reference
status: evergreen
---

# Claude Skills 设计原则

> Claude Code Skills 的七项核心设计原则——从单一职责到清晰触发条件，每个原则配正反例和拆分策略。

---

## 原则 1：单一职责

每个 Skill 专注于一个明确的主题，避免内容混杂。

### ✅ 好的设计

```
chinese-first-rule/SKILL.md:
├── 只负责：语言规范
│   ├── 用户交流语言
│   ├── 代码注释语言
│   └── 文档编写语言

context-retrieval-checklist/SKILL.md:
├── 只负责：上下文检索
│   ├── 7 步检索流程
│   ├── 检索检查清单
│   └── 验证理解

five-stage-workflow/SKILL.md:
├── 只负责：5 阶段开发流程
│   ├── 5 个阶段定义
│   ├── 各阶段任务
│   └── 阶段转换条件
```

### ❌ 坏的反例

```
development-standards/SKILL.md:
├── 语言规范
├── 上下文检索
├── 验证机制
├── API 规范
├── 多租户规范
├── 代码审查标准
└── CRUD 生成规则

→ 内容混杂 · 难以维护 · 难以定位 · 失去模块化优势
```

### 拆分策略

| 条件 | 动作 |
|------|------|
| 超过 650 行 | 考虑拆分 |
| 包含 2 个以上明确主题 | 考虑拆分 |
| 4 个以上独立功能领域 | 立即拆分 |

**拆分示例**：

```
原 Skill：api-standards（800 行）
├── HTTP 状态码使用（150 行）
├── 错误处理标准（200 行）
├── 认证机制（100 行）
└── 版本规范（50 行）

拆分为：
├── api-design/SKILL.md（300 行）
├── http-standards/SKILL.md（300 行）
├── authentication/SKILL.md（100 行）
└── versioning/SKILL.md（50 行）
```

---

## 原则 2：可独立使用

每个 Skill 都可以独立理解和使用，不需要依赖其他 Skills。

### ✅ 好的设计

```markdown
# chinese-first-rule/SKILL.md

## 概述
强制所有内容使用简体中文。

## 规则
1. 用户交流使用简体中文
2. 文档编写使用简体中文
3. 代码注释使用简体中文

## 示例
...

→ 完整自包含 · 不需参考其他 Skills · 可单独加载 · 独立理解
```

### ❌ 坏的反例

```markdown
# chinese-first-rule/SKILL.md

## 规则
1. 用户交流使用简体中文
2. 详见 api-design Skill 的第 3 节
3. 详见 code-review Skill 的第 2 节

→ 不完整 · 依赖外部 · 不能独立使用
```

### 实现要点

1. 所有规则和说明在 SKILL.md 内自包含
2. 不依赖外部参考即可完整理解
3. 提供充足的示例说明
4. 可独立加载，无需读取其他文件

---

## 原则 3：相互协作

Skills 之间可以互相引用，但避免重复内容。

### ✅ 好的设计（引用而非复制）

```markdown
five-stage-workflow/SKILL.md:

## 第 1 阶段：研究
在开始编码之前，必须执行上下文检索：
→ 详见 [[context-retrieval-checklist/SKILL.md]]

检索完成后，继续...
---

context-retrieval-checklist/SKILL.md:

## 7 步检索流程
1. 第 1 步：...
2. 第 2 步：...
...

→ 互相引用 · 避免重复 · 清晰的依赖关系 · 易于维护
```

### ❌ 坏的反例（内容重复）

```
five-stage-workflow/SKILL.md  ← 包含完整的 7 步检索流程
context-retrieval-checklist/SKILL.md  ← 也包含完整的 7 步检索流程

→ 内容重复 · 维护困难 · 同步问题 · 两个文件需同时更新
```

### 引用策略

| 场景 | 做法 |
|------|------|
| 跨 Skill 依赖 | 引用目标 Skill |
| 详细内容已在别处 | 引用，不重复 |
| 可选内容 | 引用（用户按需加载） |

**引用格式**：

```markdown
参考：[[other-skill/SKILL.md]]
参考：[[other-skill/SKILL.md#section-name]]
```

**注意事项**：

1. 最小化引用——只在必要时引用
2. 清晰说明引用的内容
3. 避免循环引用
4. 确保引用的 Skill 存在

---

## 原则 4：可维护性

Skill 的变更应影响范围小、风险低、易于回滚。

### ✅ 好的设计

```
mall-api-development/SKILL.md:
└── RESTful 标准 / API 设计

## 修改 API 设计规则
├── 只影响 mall-api-development
├── 不影响其他 Skills
└── 风险：低

## 修改 API 版本号
├── 只影响 mall-api-development
├── 不影响其他 Skills
└── 风险：低

→ 影响范围小 · 风险低 · 易于回滚
```

### ❌ 坏的反例

```
monolithic CLAUDE.md (628 行):
├── 语言规范
├── 上下文检索
├── API 设计
├── 代码审查
└── ...

## 修改 API 部分
├── 需要在 628 行中定位
├── 可能误改其他部分
└── 风险：高

→ 难以定位 · 容易误改 · 回滚困难
```

### Git 对比

```
Skills 方式：
[commit a] 修改：api-design/SKILL.md（API 规范）
[commit b] 修改：chinese-rule/SKILL.md（语言规则）
[commit c] 修改：code-review/SKILL.md（审查标准）

→ 每次修改独立可追溯 · 易于审查 · 易于回滚
```

---

## 原则 5：合理大小

单个 Skill 建议控制在 200–650 行，平衡可读性和模块化。

| 大小范围 | 评价 | 建议 |
|:---:|:---:|------|
| < 200 行 | 可能过小 | 考虑合并相关内容 |
| 200–400 行 | ✅ 理想 | 保持现状 |
| 400–650 行 | ✅ 可接受 | 可以继续使用 |
| > 650 行 | 可能过大 | 考虑拆分 |

### 拆分示例

```
原 Skill：mall-api-development（800 行）

拆分为：
├── mall-api-design/SKILL.md（300 行）
├── mall-http-standards/SKILL.md（300 行）
├── mall-authentication/SKILL.md（150 行）
└── mall-api-versioning/SKILL.md（50 行）
```

### 合并示例

```
原 Skills（各自过小）：
├── api-naming/SKILL.md（50 行）
├── api-path/SKILL.md（60 行）
├── api-method/SKILL.md（40 行）
└── api-status/SKILL.md（50 行）

合并为：
└── mall-api-design/SKILL.md（200 行）
    ├── API 命名规范
    ├── 路径设计
    ├── HTTP 方法
    └── HTTP 状态码
```

### 优化建议

1. 去掉冗余说明——相同概念不重复解释
2. 精简示例——每个概念 1-2 个代表性示例
3. 合并相似内容——相关内容归入同一 Skill
4. 核心内容保留——只保留核心规则和说明

---

## 原则 6：清晰的触发条件

在每个 Skill 中明确说明何时应该使用、何时不应该使用。

### ✅ 好的设计

```markdown
# mall-api-development/SKILL.md

## 何时使用这个 Skill

✅ 以下情况应该使用：
- 设计新的 API 接口
- 修改现有的 API 接口
- 定义 API 的请求/响应格式（成功和错误）
- 实现 API 错误处理

## 何时不需要使用

❌ 以下情况不应该使用：
- 审查代码时 → 使用 [[mall-code-review/SKILL.md]]
- 生成 CRUD 代码时 → 使用 [[mall-crud-generator/SKILL.md]]
- 检索上下文时 → 使用 [[context-retrieval-checklist/SKILL.md]]

## 触发关键词
- API, 接口, endpoint, RESTful
- GET, POST, PUT, DELETE, PATCH
- 请求, 响应, 状态码, 错误处理, 异常处理
```

### ❌ 坏的反例

```markdown
# mall-api-development/SKILL.md

## API 设计规范
...（没有说明何时使用，没有触发条件）

→ 不清楚何时加载 · 可能被错误加载 · 可能被遗漏
```

### 触发优先级体系

| 优先级 | 类型 | 示例 |
|:---:|------|------|
| **高** | 总是加载 | `chinese-first-rule` |
| **中** | 按领域加载 | `mall-api-development` · `context-retrieval-checklist` |
| **低** | 特定任务加载 | `mall-code-review`（审查时）· `mall-multi-tenant`（需要时） |

---

## 原则 7：清晰的命名和组织

### 命名原则

**描述性名称**——名称应该清楚描述 Skill 的内容：

```
✅ 好的命名：
├── chinese-first-rule          → 清楚
├── context-retrieval-checklist → 清楚
├── five-stage-workflow         → 清楚
└── mall-api-development        → 清楚

❌ 不好的命名：
├── rule-1       → 不清楚是什么规则
├── workflow     → 不清楚是什么流程
├── api          → 太宽泛
└── dev          → 太宽泛
```

**一致的风格**——所有 Skill 使用一致的命名风格：

```
✅ 一致：chinese-first-rule · context-retrieval-checklist · five-stage-workflow
❌ 不一致：chinese-rule · retrieval-checklist · workflow-5-stages
```

**合理的长度**——不要太长或太短：

```
✅ chinese-first-rule  ·  mall-api-development
❌ chinese-first-rule-for-all-communications-and-documents (太长)
❌ cn · ctx · api (太短)
```

### 目录组织

```bash
.claude/skills/
├── general/              # 通用 Skills（跨项目）
│   ├── chinese-first-rule/
│   ├── context-retrieval-checklist/
│   └── five-stage-workflow/
│
└── project/              # 项目 Skills
    └── mall/
        ├── mall-crud-generator/
        ├── mall-code-review/
        ├── mall-multi-tenant/
        └── mall-api-development/
```

- 保持 2–3 层深度
- 3 层以上 → 考虑展平

---

## 设计检查清单

在创建新 Skill 时，逐项检查：

```
□ 单一职责 — Skill 只专注于一个主题
□ 可独立使用 — Skill 可以独立理解和使用
□ 相互协作 — Skills 之间可以互相引用，避免重复
□ 可维护性 — 变更影响范围小、风险低
□ 合理大小 — 控制在 200–650 行
□ 清晰的触发条件 — 明确说明何时使用和关键词
□ 清晰的命名 — 名称描述性强且一致
□ 完整的内容 — 规则、说明、示例三者齐备
□ 充足的示例 — 每个概念配正反例
□ 与其他 Skills 关系清楚 — 依赖、被依赖、配合使用
```

---

## 总结

| # | 原则 | 一句话 |
|:---:|------|------|
| 1 | **单一职责** | 每个 Skill 专注一个主题 |
| 2 | **可独立使用** | Skill 可独立理解，不依赖外部 |
| 3 | **相互协作** | 引用不重复，保持同步 |
| 4 | **可维护性** | 变更影响小、Git 可追溯 |
| 5 | **合理大小** | 200–650 行，过小合并过大拆分 |
| 6 | **清晰的触发条件** | 何时用、何时不用、触发关键词 |
| 7 | **清晰的命名和组织** | 命名一致、目录 2–3 层 |

---

## 与本 Vault 的 Skills 对照

| 本 Vault Skill | 满足的原则 |
|------|:---:|
| `triage` | 1·2·3·4·5·6·7 |
| `wiki-compile` | 1·2·3·4·5·6·7 |
| `context` | 1·2·4·5·6 |
| `daily-open` | 1·2·4·5·6 |
| `weekly-review` | 1·2·3·4·5·6 |
| `lint` | 1·2·4·5·6 |

---

## 相关

- [[./skills-introduction/theme.md|Skills 简介]]
- [[./skills-mechanism/theme.md|Skills 工作原理]]
- [[./skills-implementation/theme.md|Skills 实施方案]]
- [[context]] — 会话状态加载 Skill
- [[triage]] — 分拣引擎 Skill
