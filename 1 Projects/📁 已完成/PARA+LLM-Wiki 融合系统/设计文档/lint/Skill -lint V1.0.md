---
aliases: [Skill 4 /lint, 系统健康检查]
created: 2026-06-01
type: design
topic: lint
parent: "[[03-Skills 完整设计]]"
tags: [design, lint, skill]
---

# Skill : `/lint` — 系统健康检查

> 从 [[03-Skills 完整设计]] 提取

**文件路径**: `.claude/skills/lint/lint.md`

---

## 使用方式

```
/lint              # 完整检查 + 健康评分
/lint --quick      # 快速评分 (< 30s)
/lint --report     # 详细报告 + 存档
/lint --fix        # 自动修复可修复问题
```

## 用途

随时运行，检查整个 Vault 的结构健康状况。建议每月运行一次完整 lint。

---

## 检查项

### Layer 1: 生活管理层

- [ ] `0 Inbox/` 中有无滞留 > 7 天的文件
- [ ] `1 Projects/` 中有无过期未关闭的项目
- [ ] `2 Areas/` 中有无 > 90 天未更新的领域笔记
- [ ] `4 Archives/` 归档文件 frontmatter 是否完整

### Layer 3: Wiki 层

对每个 Wiki 子库:
- [ ] 死链: `[[wikilink]]` 指向不存在的文件
- [ ] 孤立页: 没有被引用的 wiki 页面
- [ ] 未编译原料: `raw/` 中 `compiled: false` 的文件数量
- [ ] 置信度分布: high/medium/low 各占比

### 全局检查

- [ ] Frontmatter 缺失: 无 type/topic/created 字段
- [ ] 循环引用: A↔B (警告)
- [ ] 大文件: > 50KB markdown (建议拆分)

---

## 健康评分 (6 维加权)

| 维度 | 权重 |
|------|:----:|
| 🔗 链接健康度 | 30% |
| 📋 Frontmatter 合规 | 25% |
| 🏗️ 目录完整性 | 15% |
| 📚 编译覆盖率 | 15% |
| 📝 日志完整性 | 10% |
| 🔧 配置完整性 | 5% |

🟢 90+ | 🟡 70-89 | 🟠 50-69 | 🔴 <50

---

## 自动修复 (--fix)

| 级别 | 示例 |
|:----:|------|
| 🟢 自动 | 日期格式、空目录 |
| 🟡 确认 | 批量 topic 替换 |
| 🔴 人工 | 断链、孤立文件 |

---

> 📎 关联: [[lint-使用指南\|使用指南]] | [[../../.claude/skills/lint/lint.md\|实现]] | [[开发工作清单\|Phase 4: 100%]]
