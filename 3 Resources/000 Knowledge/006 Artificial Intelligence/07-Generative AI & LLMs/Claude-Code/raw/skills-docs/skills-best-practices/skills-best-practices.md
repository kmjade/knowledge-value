---
title: Skills 最佳实践
aliases: [Skills Best Practices, Skills 使用规范]
tags: [claude-code, skills, best-practices, maintenance]
created: 2026-05-26
updated: 2026-06-01
type: reference
status: evergreen
---

# Skills 最佳实践

> Skills 的创建、测试、维护、复用和团队协作的完整指南。

---

## 一、创建 Skills

### 目录结构

```bash
.claude/skills/
├── README.md              # Skills 索引
├── general/               # 通用 Skills
│   ├── chinese-first-rule/
│   └── code-review/
└── project/               # 项目 Skills
    └── mall/
        ├── api-development/
        │   ├── SKILL.md
        │   └── reference/
        └── crud-generator/
            ├── SKILL.md
            └── templates/
```

### 每个 SKILL.md 必须包含

1. **概述** — 一句话说明作用
2. **使用场景** — ✅ 何时用 / ❌ 何时不用
3. **核心规则** — 列出必须遵守的规则
4. **详细说明** — 含正反示例
5. **关系说明** — 与其他 Skill 的依赖/配合

---

## 二、合理大小

| 大小 | 建议 | 理由 |
|:---:|------|------|
| < 200 行 | 考虑合并 | 过小导致 Skill 过多 |
| 200–400 行 | ✅ 理想 | 平衡可读性与模块化 |
| 400–650 行 | ✅ 可接受 | 可以继续使用 |
| > 650 行 | 考虑拆分 | 过大失去模块化优势 |

### 拆分示例

```
原：api-standards（800 行）
→ 拆分为：
  ├── api-design/SKILL.md（300 行）
  ├── reference/restful-guide.md（200 行）
  ├── reference/http-status-codes.md（150 行）
  └── examples/api-examples.md（150 行）
```

---

## 三、技能复用

| 类型 | 做法 | 示例 |
|------|------|------|
| 通用 Skill | 独立仓库，跨项目复用 | `chinese-first-rule` |
| 领域 Skill | 项目内，需定制 | `mall-api-development` |

```
# 跨项目复用
通用仓库：~/.claude/skills/
  ├── chinese-first-rule/
  └── code-review/

项目仓库：project/.claude/skills/
  ├── api-development/
  └── multi-tenant/
```

---

## 四、测试验证

### 场景测试

| 场景 | 预期加载 | Token |
|------|------|:---:|
| 编写文档 | `chinese-first-rule` | ~2,000 |
| 开发 API | 7 个 Skill | ~12,000 |
| 代码审查 | 4 个 Skill | ~6,500 |

### 验证清单

```
□ 只加载必要的 Skills
□ Token 消耗符合预期
□ 响应速度正常
□ 输出符合规范
□ 未加载不必要的 Skill
```

---

## 五、维护周期

| 周期 | 动作 |
|:---:|------|
| 每日 | 检查是否有明显错误 |
| 每周 | 审查是否符合实际使用 |
| 每月 | 全面审查所有 Skill 内容 |
| 每季度 | 评估是否需要拆分/合并/重构 |

### 维护流程

```
发现问题 → 分析需求 → 设计方案 → 实施修改 → 测试验证 → Git 提交
```

---

## 六、版本控制

### 提交规范

```bash
git commit -m "update(api): add GraphQL support"
git commit -m "feat(skills): add authentication skill"
git commit -m "fix(review): correct naming convention"
```

### 分支策略

```
main        → 稳定版本
feature/*   → 新功能
hotfix/*    → 紧急修复
```

---

## 七、团队协作

1. **分工明确** — 不同人负责不同 Skill
2. **变更审查** — Skill 变更需 review
3. **文档同步** — 代码和文档保持一致
4. **测试验证** — 新 Skill 需经过场景测试

---

## 八、常见问题

### Q: 何时拆分？

内容 > 650 行 或 包含 2+ 个独立主题

### Q: 多详细合适？

核心规则必须完整，示例配 1–2 个，详细内容放 `reference/`

### Q: Skill 冲突怎么办？

明确优先级 —— 如 `chinese-first-rule` 优先级最高，冲突时优先生效

---

## 相关

- [[skills-design-principles|设计原则]] · [[skills-implementation|实施方案]]
- [[skills-optimization|优化分析]] · [[skills-vs-mcp|Skills vs MCP]]
