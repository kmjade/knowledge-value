---
created: 2026-05-31
type: test-plan
topic: acceptance
parent: "[[开发工作清单]]"
---

# 验收测试计划 — Phase 8

---

## AT-01: 端到端工作流

| 步骤 | 操作 | 预期结果 | ✅ |
|------|------|----------|:--:|
| 1 | 在 `0 Inbox/` 放入测试文件 | 文件就位 | |
| 2 | `/context --inbox` | 检测到新文件 | |
| 3 | `/triage --dry-run` | 正确分类+建议路由 | |
| 4 | `/triage` | 文件移动到目标 raw/ | |
| 5 | `/wiki-compile [topic]` | 生成 wiki/ 页面 | |
| 6 | 检查 wiki/ 页面 | 含 Sources + 概念/实体 | |
| 7 | `/lint --quick` | 评分 > 70 | |

---

## AT-02: 四 Skill 全部可用

| Skill | 验证命令 | 预期 | ✅ |
|-------|----------|------|:--:|
| /triage | `/triage --dry-run` | 输出分析结果 | |
| /wiki-compile | `/wiki-compile [topic] --dry-run` | 预览编译 | |
| /context | `/context --quick` | 返回状态快照 | |
| /lint | `/lint --quick` | 返回健康评分 | |

---

## AT-03: Triage 准确率 ≥ 85%

准备 20 个测试文件覆盖 4 种时效性:

| 时效性 | 测试文件数 | 正确数 | 准确率 |
|--------|:---------:|:------:|:------:|
| ephemeral | 5 | | |
| operational | 5 | | |
| reference | 5 | | |
| evergreen | 5 | | |
| **总计** | **20** | | **≥85%** |

---

## AT-04: Wiki 页面包含 Sources

抽样检查:

| 子库 | 检查页面数 | 含 Sources | ✅ |
|------|:---------:|:---------:|:--:|
| 000 Knowledge | 3 | | |
| Epistemology | 3 | | |
| ai-ml | 3 | | |

---

## AT-05: 连续操作无数据丢失

| 步骤 | 操作 | 检查 | ✅ |
|:----:|------|------|:--:|
| 1 | `git stash` 保存状态 | | |
| 2 | 执行 /triage + /wiki-compile + /lint ×3 | | |
| 3 | `git diff --stat` | 变更合理 | |
| 4 | 检查关键文件 | 无损坏 | |
| 5 | `git stash pop` (可选) | | |

---

## 执行记录

| 日期 | 执行人 | AT-01 | AT-02 | AT-03 | AT-04 | AT-05 | 总体 |
|------|:------:|:-----:|:-----:|:-----:|:-----:|:-----:|:----:|
| — | — | — | — | — | — | — | — |

---

> 📎 关联: [[开发工作清单]] — Phase 8
