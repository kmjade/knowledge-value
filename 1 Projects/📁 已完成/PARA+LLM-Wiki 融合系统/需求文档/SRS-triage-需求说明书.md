---
aliases:
  - Triage SRS
  - 分拣需求说明书
created: 2026-05-31
type: srs
topic: triage
parent: "[[PARA+LLM-Wiki 融合系统需求文档 v1.0]]"
tags:
  - srs
  - triage
  - requirements
---

# /triage — Inbox 分拣引擎 需求说明书

> 基于 [[../SRS 03-功能需求|SRS §3.2]] + [[Skill-triage v1.0|Skill 1 设计]]

**状态**: ✅ 已实施 | **Phase**: 100% (9/9)

---

## 1. 概述

### 1.1 目的

`/triage` 是 PARA+LLM-Wiki 系统的入口 Skill，负责将 `0 Inbox/` 中的未分类信息自动分析、分类并路由到正确的目标位置。

### 1.2 范围

- 自动扫描 Inbox 目录
- 四维度内容分析（时效性 × 主题 × 人物 × 双重属性）
- 路由决策与文件移动
- 元数据更新与日志记录
- 三种子模式（dry-run / file / scope）

---

## 2. 功能需求

### FR-010: 自动扫描 Inbox

| 属性 | 值 |
|------|-----|
| 优先级 | P0 — 关键 |
| 输入 | `0 Inbox/` 目录 |
| 排除 | `_processed/` 目录、`triaged: true` 文件 |
| 输出 | 未处理文件列表 + 数量 |

### FR-011: 时效性四分类

| 分类 | 判定标准 | 目标 |
|------|----------|------|
| `ephemeral` | 含日期 + 动作动词 | `1 Projects/` tasks.md |
| `operational` | 项目 + 任务描述 | `1 Projects/[project]/` |
| `reference` | 文章/论文/书摘 | `3 Resources/[topic]/raw/` |
| `evergreen` | 方法论/核心观点 | `3 Resources/[topic]/wiki/` |

**准确率**: ≥ 85%（人工抽查 20 样本）

### FR-012: 主题识别

| 属性 | 值 |
|------|-----|
| 支持主题 | ai-ml, finance, productivity, people, knowledge-systems, philosophy, natural-sciences, applied-sciences, social-sciences, literature, history |
| 方法 | 关键词权重匹配 |
| 低置信度 | → `0 Inbox/_review/` 人工判断 |

### FR-013: 路由执行

| 分类 | 目标路径 | 操作 |
|------|----------|------|
| ephemeral | `1 Projects/[project]/tasks.md` | 追加条目 |
| operational | `1 Projects/[project]/` | 移动文件 |
| reference | `3 Resources/[topic]/raw/` | 复制 + 标记 |
| evergreen | `3 Resources/[topic]/wiki/` | AI 编译 |
| 人物信息 | `0 Inbox/people/raw/` | 更新 CRM |

### FR-014: 元数据更新

```yaml
triaged: true
triaged_at: YYYY-MM-DDTHH:MM:SS
triaged_to: [目标路径]
```

### FR-015: 日志记录

追加到 `AI-Log/triage-log.md`，记录：时间戳、处理文件数、路由决策、错误。

### FR-016: 子模式

| 标志 | 功能 | 优先级 |
|------|------|:------:|
| `--dry-run` | 仅预览，不执行 | P1 |
| `--file "name.md"` | 单文件处理 | P1 |
| `--scope clippings` | 仅剪藏 | P1 |
| `--scope fleeting` | 仅闪念 | P1 |
| `--scope tasks` | 仅任务 | P1 |

---

## 3. 非功能需求

| ID | 需求 | 指标 |
|----|------|------|
| NFR-001 | 响应时间 | 20 文件 < 2 分钟 |
| NFR-010 | 数据完整性 | 操作不丢失数据 |
| NFR-020 | 安全检查 | 移动前 3 项校验 |

---

## 4. 接口

| 接口 | 说明 |
|------|------|
| 命令 | `/triage [--dry-run\|--file\|--scope]` |
| 输入 | `0 Inbox/` 文件 |
| 输出 | 路由执行 + `AI-Log/triage-log.md` |

---

## 5. 验收标准

| ID | 验收项 | 条件 |
|:--:|--------|------|
| VA-10 | 扫描 Inbox | 正确列出未处理文件 |
| VA-11 | 时效性分类 | 20 样本准确率 ≥ 85% |
| VA-12 | 路由执行 | 文件正确移动到目标 |
| VA-13 | 元数据更新 | triaged 标记正确写入 |
| VA-14 | 日志记录 | triage-log.md 正确更新 |
| VA-15 | Dry-run | 仅预览不移动 |

---

> 📎 关联:
> - [[Skill-triage v1.0\|Skill 1 设计]]
> - [[triage-使用指南\|使用指南]]
> - [[../开发工作清单\|Phase 1: 100%]]
