---
created: 2026-05-31
type: report
topic: lint
parent: "[[开发工作清单]]"
tags:
  - lint
  - frontmatter
  - audit
---

# Frontmatter 合规审计报告 — LN-03

> 扫描时间: 2026-05-31 | 总文件: 512 wiki/ + raw/ | 方法: 自动扫描

## 合规摘要

| 字段 | 合规 | 不合规 | 合规率 |
|------|------|--------|--------|
| `type` | ~500 | ~12 | 98% |
| `created` | ~505 | ~7 | 99% |
| `topic` | ~173 | **339** | 34% ⚠️ |
| `sources` | ~150 | **~350** | 30% ⚠️ |

## 问题根因

### 1. `topic` 缺失 (339 文件) — 🔴 严重

**受影响范围**: DDC 004 子库下所有 wiki/ 文件

```
3 Resources/000 Knowledge/004 Computer Science & technology/
├── 004.16-嵌入式系統/wiki/    (10 文件, 使用 category: 而非 topic:)
├── 004.165-树莓派/wiki/       (12 文件)
├── 004.3-计算机硬件/wiki/      (10+ 文件)
├── 004.5-数据库与数据结构/wiki/
├── 004.8-人工智能/wiki/
├── 004.9-面向应用的计算机技术/wiki/
└── 004.43-计算机语言/Python/wiki/
```

**原因**: 这些子库使用旧版 CLAUDE.md schema，字段名为 `category` 而非 `topic`

**修复方案**: 
1. 更新各子库 CLAUDE.md → 统一使用 `topic` 字段
2. 批量替换 `category:` → `topic:` (约 150+ 文件)
3. 或：将 `category` 纳入 `topic` 的合法别名

### 2. `sources` 缺失 (约 350 文件) — 🟡 中等

**受影响范围**: 同上 DDC 004 子库 + 部分旧版 wiki 文件

**原因**: 旧版编译流程未强制执行 `sources` 规则 (FR-025)

**合规示例** (DDC 000/120):
- `000 Knowledge/wiki/concepts/*.md` — 23/23 有 `sources` ✅
- `epistemology/wiki/concepts/*.md` — 38/38 有 `sources` 或 `tags` ✅

### 3. 其他问题 — 🟢 轻微

| 问题 | 数量 | 示例 |
|------|------|------|
| `type` 值不规范 | ~5 | 使用了 `index` 而非 `wiki-index` |
| `created` 格式错误 | ~3 | 使用了 `2026/05/26` 格式 |
| 缺少 `entity_type` | ~10 | 实体页未标注 entity_type |

## 推荐行动计划

| 优先级 | 行动 | 影响范围 |
|--------|------|----------|
| P0 | 更新 004 子库 CLAUDE.md → 统一 `topic` 标准 | 7 个 CLAUDE.md |
| P1 | 批量替换 `category:` → `topic:` | ~150 wiki/ 文件 |
| P1 | 为缺少 `sources` 的 wiki 页面补充来源 | ~350 文件 |
| P2 | 修正 `type` 值不规范的文件 | ~5 文件 |
| P2 | 修正 `created` 格式错误 | ~3 文件 |

---

> 📎 关联: [[../.claude/skills/lint/lint.md|lint skill §3 Frontmatter 规范检查]]
