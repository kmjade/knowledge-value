---
aliases: [Wiki-Compile SRS, 编译需求说明书]
created: 2026-05-31
type: srs
topic: wiki-compile
parent: "[[PARA+LLM-Wiki 融合系统需求文档 v1.0]]"
tags: [srs, wiki-compile, requirements]
---

# /wiki-compile — 知识编译引擎 需求说明书

> 基于 [[../SRS 03-功能需求|SRS §3.3]] + [[../设计文档/Skill 2-wiki-compile|Skill 2 设计]]

**状态**: ✅ 已实施 | **Phase**: 100% (10/10)

---

## 1. 概述

### 1.1 目的

`/wiki-compile` 是 PARA+LLM-Wiki 系统的核心知识生产 Skill，负责将 `raw/` 原始资料编译为结构化的 `wiki/` 知识页面。

### 1.2 范围

- raw/ 源文件扫描
- 概念/实体/关系提取
- Wiki 页面生成与更新
- 索引维护与日志记录
- 三种编译子模式

---

## 2. 功能需求

### FR-020: 源文件扫描

| 属性 | 值 |
|------|-----|
| 优先级 | P0 |
| 输入 | `3 Resources/[topic]/raw/` |
| 遍历 | articles/ papers/ books/ conversations/ |
| 排除 | `compiled: true` 文件 |
| 输出 | 待编译文件列表 |

### FR-021: 概念提取

| 属性 | 值 |
|------|-----|
| 优先级 | P0 |
| 输出 | `wiki/concepts/[slug].md` |
| 命名 | PascalCase (如 `LLM-Pricing-Model`) |
| 内容 | 定义 + 核心原理 + 相关概念链接 |

### FR-022: 实体提取

| 属性 | 值 |
|------|-----|
| 优先级 | P0 |
| 类型 | person / company / tool / paper / product |
| 输出 | `wiki/entities/[name].md` |
| 内容 | 基本信息 + 描述 + 关联 |

### FR-023: 关系提取

| 关系 | 含义 | 优先级 |
|------|------|:------:|
| is-a | 子类型/继承 | P1 |
| part-of | 组成部分 | P1 |
| related | 语义关联 | P1 |
| implements | 实体实现概念 | P1 |
| uses | 概念使用实体 | P1 |
| created | 创建者 | P1 |
| collaborates | 协作 | P1 |
| competes | 竞争 | P1 |

### FR-024: 增量编译

| 属性 | 值 |
|------|-----|
| 优先级 | P1 |
| 判定 | 源文件修改时间 > 编译时间 → 重编译 |
| 跳过 | `compiled: true` + 源文件未修改 |

### FR-025: 来源追溯

每个 wiki 页面必须包含 `## Sources` 章节 + Frontmatter `sources` 字段。

### FR-026: 编译日志

双写: `wiki/log.md` + `AI-Log/compile-log.md`，记录时间戳/topic/页面列表。

### FR-027: 编译模式

| 标志 | 功能 | 优先级 |
|------|------|:------:|
| `--dry-run` | 仅预览，不写入 | P1 |
| `--incremental` | 增量 (默认) | P1 |
| `--force` | 全量重编译 | P1 |

### FR-028: 页面去重

多源文件涉及同一概念 → 合并而非创建重复页面 (P2)。

---

## 3. 非功能需求

| ID | 需求 | 指标 |
|----|------|------|
| NFR-002 | 编译响应 | 10 源文件 < 5 分钟 |
| NFR-020 | AI 权限 | raw/ 只读 |
| NFR-033 | 日志可审计 | 双写强制 |

---

## 4. 接口

| 接口 | 说明 |
|------|------|
| 命令 | `/wiki-compile [topic] [--dry-run\|--incremental\|--force]` |
| 输入 | `3 Resources/[topic]/raw/` |
| 输出 | `wiki/` 页面 + 日志 |

---

## 5. 验收标准

| ID | 验收项 | 条件 |
|:--:|--------|------|
| VA-20 | 扫描源文件 | 正确列出未编译文件 |
| VA-21 | 概念页面 | 含定义+原理+Sources |
| VA-22 | 实体页面 | 含信息+描述+关联 |
| VA-23 | 来源追溯 | 每页有 Sources |
| VA-25 | 增量编译 | 不重复处理 |
| VA-26 | 日志记录 | compile-log 正确更新 |

---

> 📎 关联: [[../设计文档/Skill 2-wiki-compile\|设计]] | [[wiki-compile-使用指南\|使用指南]] | [[../开发工作清单\|Phase 2: 100%]]
