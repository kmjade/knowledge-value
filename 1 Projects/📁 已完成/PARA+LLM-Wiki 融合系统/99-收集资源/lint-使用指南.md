---
aliases:
  - Lint 使用指南
  - 健康检查指南
created: 2026-05-31
type: guide
topic: lint
parent: "[[PARA+LLM-Wiki 融合系统]]"
tags:
  - skill
  - lint
  - guide
---

# /lint 使用指南

> 系统健康检查 — 评分 + 诊断 + 修复

---

## 快速开始

```bash
/lint                 # 完整检查 + 健康评分
/lint --quick         # 快速评分 (< 30s)
/lint --report        # 详细报告 + 存档
/lint --fix           # 自动修复可修复问题
```

---

## 评分维度

| 维度 | 权重 | 满分 |
|------|:----:|:----:|
| 🔗 链接健康度 | 30% | 30 |
| 📋 Frontmatter 合规 | 25% | 25 |
| 🏗️ 目录完整性 | 15% | 15 |
| 📚 编译覆盖率 | 15% | 15 |
| 📝 日志完整性 | 10% | 10 |
| 🔧 配置完整性 | 5% | 5 |

**评级**: 🟢 90+ 健康 | 🟡 70-89 需关注 | 🟠 50-69 警告 | 🔴 <50 需修复

---

## 修复能力

| 级别 | 示例 |
|:----:|------|
| 🟢 自动 | 日期格式修正、空目录创建 |
| 🟡 确认 | 批量 `category:` → `topic:` |
| 🔴 人工 | 断链修复、孤立文件 |

---

## 检查项目

| 检查 | 内容 |
|------|------|
| 目录结构 | PARA 目录 + 子库 wiki/ |
| 断链检测 | 所有 wikilinks 有效性 |
| Frontmatter | type / topic / created / sources |
| 编译状态 | raw/ → wiki/ 覆盖率 |
| Git 状态 | 未提交 + 未跟踪 |
| 配置 | Skills 注册 + Hooks |

---

## 工作流建议

```
每次提交前:  /lint --quick
每周维护:    /lint --report
发现问题:    /lint --fix
```

---

> 📎 关联: [[03-Skills 完整设计\|设计文档]] | [[开发工作清单\|Phase 4: 100%]]
