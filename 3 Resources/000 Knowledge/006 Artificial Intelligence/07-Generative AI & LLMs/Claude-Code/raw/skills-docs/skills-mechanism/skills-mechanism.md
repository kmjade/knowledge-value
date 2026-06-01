---
title: Skills 工作原理
aliases: [Skills Working Mechanism, Skills 加载机制]
tags: [claude-code, skills, mechanism, loading]
created: 2026-05-26
updated: 2026-06-01
type: reference
status: evergreen
---

# Skills 工作原理

> Claude Skills 的加载与执行机制——四步流程 (Review → Determine → Load → Apply) 完整拆解。

---

## 一、四步流程

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  Review  │───▶│Determine │───▶│   Load   │───▶│  Apply   │
│   审查    │    │   确定    │    │   加载    │    │   应用    │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
```

---

## 二、Step 1：审查 (Review)

扫描可用 Skills 的**名称和描述**（不加载完整内容）：

```
发现 8 个可用 Skills:
├── chinese-first-rule         中文优先规范
├── context-retrieval-checklist 上下文检索清单
├── five-stage-workflow         开发流程
├── mandatory-verification      强制验证
├── mall-crud-generator         CRUD 生成
├── mall-code-review            代码审查
├── mall-multi-tenant           多租户隔离
└── mall-api-development        API 规范

→ 仅元数据，~200 tokens
```

---

## 三、Step 2：确定 (Determine)

分析任务 → 匹配相关 Skills → 评估相关性分值：

| 任务 | 匹配的 Skills | 相关性 |
|------|------|:---:|
| "帮我写 README" | `chinese-first-rule` | 100% |
| "创建评论 API" | 全部项目 Skill | 70–100% |
| "审查这段代码" | `chinese-first-rule` + `code-review` + `multi-tenant` + `api` | 70–100% |

---

## 四、Step 3：加载 (Load)

按优先级分批加载——**不是全部内容**，而是渐进式披露：

```
优先级 1（最高）：核心必需
  └─ chinese-first-rule（200 行）

优先级 2：任务相关
  └─ 如 context-retrieval-checklist（550 行）

优先级 3：领域相关
  └─ 如 mall-api-development（645 行）

优先级 4（最低）：参考
  └─ 按需查阅，不主动加载
```

### 示例：开发 API 的加载顺序

```
第 1 轮（高相关）:
  ✅ chinese-first-rule（200 行）
  ✅ context-retrieval-checklist（550 行）
  ✅ five-stage-workflow（480 行）

第 2 轮（中相关）:
  ✅ mall-api-development（645 行）
  ✅ mandatory-verification（450 行）

第 3 轮（按需）:
  ❓ mall-crud-generator — 需要时加载

未加载:
  ❌ mall-code-review — 不相关
```

---

## 五、Step 4：应用 (Apply)

按照 Skills 中的指令执行任务：

```
1. 遵循 chinese-first-rule
   ✅ 全部使用简体中文

2. 执行 context-retrieval-checklist
   ✅ 7 步检索 → 理解现有代码

3. 按照 five-stage-workflow
   ✅ 研究 → 计划 → 实施 → 验证 → 提交

4. 遵循 mall-api-development
   ✅ RESTful 路径 · 响应格式 · 错误处理

5. 使用 mall-crud-generator
   ✅ 生成 Entity/Mapper/Service/Controller
```

---

## 六、触发条件

| 方式 | 说明 | 示例 |
|------|------|------|
| 关键词触发 | 请求包含特定关键词 | "API" → 加载 API 规范 |
| 任务类型触发 | 按任务类型匹配 | 编码 → 加载检索+流程+CRUD |
| 显式调用 | 用户明确要求 | "使用 code-review Skill" |
| 上下文依赖 | Skill 间互相引用 | workflow 引用 retrieval |

---

## 七、部分加载策略

大型 Skill 不一次性加载全部，而是分块：

```
mall-api-development（645 行）:

摘要部分（~50 行）        → 始终加载
核心规则（~200 行）       → 任务相关时加载
详细示例（~200 行）       → 需要时加载
参考资料（~195 行）       → 按需引用
```

---

## 八、实战示例

### 简单任务：写 README

```
加载：chinese-first-rule（200 行）
不加载：其余 7 个 Skill
Token：~2,000
节省：92%
```

### 复杂任务：创建评论 API

```
加载：7 个 Skill（~3,093 行）
不加载：mall-code-review
Token：~12,000
节省：52%
```

---

## 总结

| 步骤 | 动作 | 关键 |
|:---:|------|------|
| Review | 扫描名称和描述 | 只看元数据 |
| Determine | 任务→Skill 匹配 | 相关性评分 |
| Load | 按优先级分批 | 渐进式，不全量 |
| Apply | 遵循 Skill 指令 | 多层次质量保证 |

---

## 相关

- [[skills-introduction|Skills 简介]] · [[skills-features|核心特性]]
- [[skills-implementation|实施方案]] · [[skills-optimization|优化分析]]
