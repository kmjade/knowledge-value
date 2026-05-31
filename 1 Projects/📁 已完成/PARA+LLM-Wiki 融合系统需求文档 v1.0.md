---
aliases:
  - 系统需求规格
  - SRS
  - Requirements Specification
created: 2026-05-31
version: "1.0"
status: stable
type: project
lifecycle: evergreen
tags:
  - architecture
  - requirements
  - para
  - llm-wiki
sources:
  - "[[1 Projects/📁 已完成/PARA+LLM-Wiki 整合系统架构设计文档 v1.0]]"
  - "[[CLAUDE.md]]"
---

# PARA+LLM-Wiki 融合系统需求文档 (SRS)

**版本**: v1.0
**日期**: 2026-05-31
**状态**: ✅ 已确认（对应架构设计 v1.0 已实施）
**文档类型**: 软件需求规格说明书 (SRS)

---

## 目录

1. [文档概述](#1-文档概述)
2. [总体描述](#2-总体描述)
3. [功能需求](#3-功能需求)
4. [非功能需求](#4-非功能需求)
5. [接口需求](#5-接口需求)
6. [数据需求](#6-数据需求)
7. [约束与假设](#7-约束与假设)
8. [验收标准](#8-验收标准)
9. [可追溯矩阵](#9-可追溯矩阵)
10. [附录](#10-附录)

---

## 1. 文档概述

### 1.1 目的

本文档定义 **PARA+LLM-Wiki 整合系统** 的完整需求规格，作为系统设计、实施和验收的依据。文档面向以下读者群体：

| 读者 | 关注点 |
|------|--------|
| 系统用户（Vault 所有者） | 系统能做什么，如何使用 |
| AI 开发者（Claude Code） | 功能边界、接口规范、约束条件 |
| 质量保证（/lint） | 验收标准、测试场景 |
| 维护者 | 非功能需求、运维要求 |

### 1.2 范围

本系统是一个基于 **Obsidian Vault** 的个人知识管理平台，融合 **PARA 方法论**（项目管理）与 **LLM-Wiki**（AI 知识编译），通过 Claude Code 驱动的 Skills 实现信息的自动分拣、知识编译和系统运维。

**涵盖范围**:
- 信息捕获 → 分拣 → 组织 → 编译 → 检索的全生命周期管理
- 四个核心 Skill：`/triage`、`/wiki-compile`、`/context`、`/lint`
- 基于 Dewey Decimal Classification (DDC) 的 10 个 Wiki 子库体系
- AI 权限边界与安全约束

**不涵盖范围**:
- Obsidian 插件开发（本系统使用已有插件）
- 多用户协作功能（本系统为单用户 Vault）
- 图形化界面开发（交互完全通过 Claude Code CLI / Obsidian 编辑器）
- 外部系统的 API 集成（如自动从 RSS 抓取）

### 1.3 定义与缩略语

| 术语 | 英文 | 定义 |
|------|------|------|
| Vault | Vault | Obsidian 知识库的根目录，包含所有 Markdown 文件 |
| PARA | PARA | Projects / Areas / Resources / Archives 四象限管理法 |
| LLM-Wiki | LLM-Wiki | AI 驱动的知识编译子系统，将 raw/ 编译为 wiki/ |
| 分拣 | Triage | 对 Inbox 内容进行时效性×主题分析并路由到正确位置 |
| 编译 | Compile | AI 从 raw/ 中提取概念、实体、关系并生成结构化 wiki/ 页面 |
| 子库 | Sub-Library | 一个主题领域的 Wiki 知识库，如 ai-ml、finance |
| MOC | Map of Content | 内容索引页面，聚合相关主题的链接 |
| Frontmatter | Frontmatter | Markdown 文件头部的 YAML 元数据块 |
| Wikilink | Wikilink | Obsidian 内部链接语法 `[[note-name]]` |
| 常青 | Evergreen | 长期有效、持续更新的知识内容 |

### 1.4 参考文档

- [[1 Projects/📁 已完成/PARA+LLM-Wiki 整合系统架构设计文档 v1.0]] — 系统架构设计（v1.0，已实施）
- [[CLAUDE.md]] — 系统宪法与运行规则
- [[3 Resources/_META-INDEX.md]] — 全局知识导航
- [[AI-Log/compile-log.md]] — 编译操作日志
- [[AI-Log/triage-log.md]] — 分拣操作日志
- `3 Resources/[topic]/CLAUDE.md` — 各子库 Schema 定义

---

## 2. 总体描述

### 2.1 产品视角

本系统是一个**自包含的个人知识管理系统**，运行在用户本地的 Obsidian Vault 中。系统不依赖外部服务（AI 调用除外），所有数据以 Markdown 文件形式存储在本地文件系统中，通过 Git 进行版本控制和远程同步。

```
┌─────────────────────────────────────────────────────────────┐
│                       本系统 (PARA+LLM-Wiki)                  │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Obsidian     │  │ Claude Code  │  │ Git          │      │
│  │ (编辑器/     │  │ (AI 引擎)    │  │ (版本控制)   │      │
│  │  查看器)     │  │              │  │              │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                 │                 │               │
│         └─────────────────┼─────────────────┘               │
│                           │                                 │
│                    ┌──────┴───────┐                         │
│                    │ 文件系统      │                         │
│                    │ (Markdown)    │                         │
│                    └──────────────┘                         │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 用户特征

| 角色 | 特征 | 主要操作 |
|------|------|----------|
| **知识工作者** | 高频信息消费，需要快速捕获和组织 | 剪藏 → Inbox → 检索 |
| **项目管理者** | 多项目并行，需要明确的任务追踪 | 项目管理 → 归档 |
| **终身学习者** | 系统化学习，需要知识编译和内化 | raw/ 编纂 → wiki/ 学习 |
| **系统管理员** | 关注数据完整性和系统健康 | /lint → Git 提交 |

### 2.3 运行环境

| 组件 | 要求 |
|------|------|
| 操作系统 | macOS / Windows / Linux（Obsidian 支持的所有平台） |
| Obsidian | v1.0+，支持 Community Plugins |
| Claude Code | 最新稳定版（通过 Claude CLI 或 Claude Code IDE 扩展） |
| Git | 2.30+ |
| 网络 | 仅 AI 调用和 Git 远程同步时需要 |
| 磁盘空间 | 取决于 Vault 大小，建议预留 1GB+ |

### 2.4 设计约束

1. **单一 Vault 原则** — 所有内容必须在同一个 Obsidian Vault 内
2. **纯 Markdown 存储** — 不使用数据库，所有内容以 `.md` 文件存储
3. **离线可用** — 除 AI 功能外，所有内容应离线可读
4. **人类可编辑** — 即使没有 AI，用户也可以直接操作所有 Markdown 文件
5. **Git 兼容** — 所有文件变更应产生有意义的 Git diff

---

## 3. 功能需求

### 3.1 信息捕获与输入

**FR-001: 网页内容剪藏**
- **优先级**: P0 - 关键
- **描述**: 用户可以通过 Obsidian Web Clipper 将网页内容保存到 `0 Inbox/Clippings/`
- **验收标准**:
  - 剪藏内容自动添加 `source` URL 到 Frontmatter
  - 保留原始发布日期（如有）
  - 格式为 Markdown

**FR-002: 手动笔记输入**
- **优先级**: P0 - 关键
- **描述**: 用户可以直接在 `0 Inbox/1-输入/` 中创建 Markdown 笔记
- **验收标准**:
  - 支持任意长度的 Markdown 内容
  - 自动生成 `created` 日期

**FR-003: AI 对话记录捕获**
- **优先级**: P1 - 重要
- **描述**: 有价值的 AI 对话可以保存到 `0 Inbox/`
- **验收标准**:
  - 包含完整对话上下文
  - 标记 `origin: ai-generated`

### 3.2 信息分拣 (/triage)

**FR-010: 自动扫描 Inbox**
- **优先级**: P0 - 关键
- **描述**: `/triage` 命令应自动扫描 `0 Inbox/` 下所有未处理的 Markdown 文件
- **验收标准**:
  - 排除 `_processed/` 目录下的文件
  - 排除已有 `triaged: true` 标记的文件
  - 返回文件数量和列表

**FR-011: 时效性分类**
- **优先级**: P0 - 关键
- **描述**: 系统必须将每个文件分类为四种时效性之一
- **验收标准**:
  | 分类 | 判定标准 | 示例 |
  |------|----------|------|
  | ephemeral | 短内容 + 待办关键词 + 明确截止日期 | "明天买灯泡" |
  | operational | 有日期 + 中等长度 + 项目相关 | 会议记录、工作笔记 |
  | reference | 有 URL + 长文 + source 标记 | 文章摘录、网页保存 |
  | evergreen | 概念定义 + 原理说明 + 术语解释 | 知识条目 |
- 分类准确率应 ≥ 85%（人工抽查 20 样本）

**FR-012: 主题识别**
- **优先级**: P0 - 关键
- **描述**: 系统必须识别文件所属的主题领域
- **验收标准**:
  - 至少支持以下主题的识别：ai-ml、finance、productivity、people、knowledge-systems、philosophy、natural-sciences、applied-sciences、social-sciences、literature、history
  - 基于关键词权重匹配
  - 置信度低时应标记为 `triaged_to: 0 Inbox/_review/` 供人工判断

**FR-013: 路由执行**
- **优先级**: P0 - 关键
- **描述**: 根据分类结果将文件移动到正确位置
- **验收标准**:
  | 分类 | 目标路径 |
  |------|----------|
  | ephemeral | `1 Projects/[project]/tasks.md`（追加） |
  | operational | `1 Projects/[project]/` 或 `2 Areas/[area]/` |
  | reference | `3 Resources/[topic]/raw/` |
  | evergreen | `3 Resources/[topic]/wiki/` |
  | 人物信息 | `0 Inbox/people/raw/` |
- 移动后源文件保留或移入 `_processed/`

**FR-014: 分拣元数据更新**
- **优先级**: P0 - 关键
- **描述**: 分拣完成后必须更新文件的 Frontmatter
- **验收标准**:
  ```yaml
  triaged: true
  triaged_at: 2026-05-31T14:30:00
  triaged_to: 3 Resources/ai-ml/raw/articles/
  ```

**FR-015: 分拣日志记录**
- **优先级**: P0 - 关键
- **描述**: 每次分拣操作必须追加到 `AI-Log/triage-log.md`
- **验收标准**:
  - 记录时间戳、处理文件数、路由决策、错误信息
  - JSON 格式的结构化摘要

**FR-016: 分拣范围限定**
- **优先级**: P1 - 重要
- **描述**: 支持限定分拣范围
- **验收标准**:
  - `--dry-run`: 仅预览分析结果，不执行移动
  - `--file "name.md"`: 处理单个文件
  - `--scope clippings|fleeting`: 仅扫描指定子目录

### 3.3 知识编译 (/wiki-compile)

**FR-020: 源文件扫描**
- **优先级**: P0 - 关键
- **描述**: `/wiki-compile [topic]` 必须自动扫描指定子库的 `raw/` 目录
- **验收标准**:
  - 遍历 `raw/articles/`, `raw/papers/`, `raw/books/`, `raw/conversations/`
  - 排除已有 `compiled: true` 标记的文件
  - 返回待编译文件列表

**FR-021: 概念提取**
- **优先级**: P0 - 关键
- **描述**: AI 必须从 raw/ 内容中提取核心概念
- **验收标准**:
  - 每个概念生成一个 `wiki/concepts/[slug].md` 页面
  - 包含：定义、核心原理、相关概念链接
  - 概念名称使用英文 PascalCase（如 `LLM-Pricing-Model`）

**FR-022: 实体提取**
- **优先级**: P0 - 关键
- **描述**: AI 必须从 raw/ 内容中提取命名实体
- **验收标准**:
  - 每个实体生成一个 `wiki/entities/[name].md` 页面
  - 区分实体类型：person、company、tool、paper、product
  - 包含：基本信息、描述、关联

**FR-023: 关系提取**
- **优先级**: P1 - 重要
- **描述**: AI 必须识别概念之间和实体之间的关系
- **验收标准**:
  - 关系类型：`is-a`, `part-of`, `related`, `implements`, `uses`, `created`, `collaborates`, `competes`
  - 关系以 `[[]]` 链接形式体现在页面中

**FR-024: 增量编译**
- **优先级**: P1 - 重要
- **描述**: 支持 `--incremental` 模式，仅处理新增/修改的源文件
- **验收标准**:
  - 对比源文件的修改时间
  - 跳过已编译且源文件未修改的内容
  - 源文件更新时，对应 wiki/ 页面同步更新

**FR-025: 来源追溯**
- **优先级**: P0 - 关键
- **描述**: 每个 Wiki 页面必须标注信息来源
- **验收标准**:
  - `## Sources` 章节包含指向 raw/ 文件的 wikilink
  - Frontmatter 的 `sources` 字段记录来源路径
  - 支持多来源标注

**FR-026: 编译日志**
- **优先级**: P0 - 关键
- **描述**: 每次编译操作必须追加到日志
- **验收标准**:
  - `3 Resources/[topic]/wiki/log.md` — 子库级日志
  - `AI-Log/compile-log.md` — 全局编译日志
  - 记录：时间戳、topic、新增/更新的页面列表

**FR-027: 编译模式选项**
- **优先级**: P1 - 重要
- **描述**: 支持不同编译模式
- **验收标准**:
  - `--dry-run`: 仅预览提取结果
  - `--incremental`: 仅处理新增文件
  - `--force`: 重新编译所有源文件

**FR-028: 页面合并与去重**
- **优先级**: P2 - 可选
- **描述**: 当多个源文件涉及同一概念时，合并而非创建重复页面
- **验收标准**:
  - 合并信息到现有页面
  - 标注多来源

### 3.4 会话状态管理 (/context)

**FR-030: 快速状态概览**
- **优先级**: P0 - 关键
- **描述**: `/context --quick` 应返回 Vault 的关键状态指标
- **验收标准**:
  - Inbox 文件数量
  - 活跃项目数量
  - 待编译的 raw/ 文件数
  - Wiki 页面总数
  - 最近操作摘要

**FR-031: 分模块状态查询**
- **优先级**: P1 - 重要
- **描述**: 支持按模块查询状态
- **验收标准**:
  - `--projects`: 活跃项目列表及进度
  - `--inbox`: Inbox 积压详情
  - `--summary`: 系统级建议摘要

**FR-032: 操作建议生成**
- **优先级**: P1 - 重要
- **描述**: 根据当前状态自动生成操作建议
- **验收标准**:
  - Inbox 积压 > 5 → 建议执行 `/triage`
  - 待编译文件 > 3 → 建议执行 `/wiki-compile`
  - 距上次 `/lint` > 7 天 → 建议执行 `/lint`

### 3.5 系统健康检查 (/lint)

**FR-040: 目录结构完整性检查**
- **优先级**: P0 - 关键
- **描述**: 检查 PARA 目录结构和子库目录是否完整
- **验收标准**:
  - 检查所有必需目录是否存在
  - 报告缺失的目录

**FR-041: 断链检测**
- **优先级**: P0 - 关键
- **描述**: 检测所有 `[[]]` 链接目标是否存在
- **验收标准**:
  - 扫描所有 `.md` 文件中的 wikilinks
  - 报告断链（目标文件不存在）
  - 支持 `--fix` 自动修复已知模式

**FR-042: Frontmatter 规范检查**
- **优先级**: P0 - 关键
- **描述**: 检查文件的 Frontmatter 是否符合规范
- **验收标准**:
  - wiki/ 文件：检查 `type`, `topic`, `created` 字段
  - raw/ 文件：检查 `source`, `tags` 字段
  - 报告不符合规范的文件

**FR-043: 系统健康评分**
- **优先级**: P1 - 重要
- **描述**: 生成 0-100 的健康评分
- **验收标准**:
  - 评分维度：目录完整性、链接健康度、Frontmatter 合规率、编译覆盖率
  - 输出综合评分和改进建议

**FR-044: 自动修复**
- **优先级**: P2 - 可选
- **描述**: `--fix` 模式自动修复可修复的问题
- **验收标准**:
  - 可修复：缺失 Frontmatter 补充、常见路径修正
  - 不可修复：断链（需人工判断目标位置）
  - 修复后输出变更摘要

### 3.6 知识检索

**FR-050: Wiki 索引导航**
- **优先级**: P0 - 关键
- **描述**: 每个子库的 `wiki/index.md` 应提供结构化的知识索引
- **验收标准**:
  - 按概念/实体/来源分类列出
  - 学习路径推荐（基础 → 进阶）
  - 更新日期和页面数量统计

**FR-051: 全局导航**
- **优先级**: P1 - 重要
- **描述**: `3 Resources/_META-INDEX.md` 应提供跨子库的全局导航
- **验收标准**:
  - 列出所有子库及其状态
  - 跨库连接矩阵
  - 最近更新摘要

**FR-052: MOC 页面**
- **优先级**: P1 - 重要
- **描述**: 各子库的 `00-MOCs/` 应提供主题地图
- **验收标准**:
  - 涵盖子库所有主要章节
  - 提供学习路径入口
  - 链接到核心概念页面

### 3.7 版本控制与同步

**FR-060: Git 状态检查**
- **优先级**: P0 - 关键
- **描述**: 在关键操作前后自动检查 Git 状态
- **验收标准**:
  - 操作前：确认工作区状态
  - 操作后：确认变更范围
  - 批量操作时建议分步提交

**FR-061: Conventional Commits**
- **优先级**: P1 - 重要
- **描述**: Git 提交信息应遵循约定式提交规范
- **验收标准**:
  - 格式：`<type>: <description>`
  - 支持类型：`feat`, `fix`, `refactor`, `docs`, `chore`, `para`

**FR-062: 批量操作保护**
- **优先级**: P1 - 重要
- **描述**: 超过 10 个文件的批量操作需要用户确认
- **验收标准**:
  - 显示即将变更的文件列表
  - 用户确认后才执行

---

## 4. 非功能需求

### 4.1 性能

| ID | 需求 | 指标 |
|----|------|------|
| **NFR-001** | 分拣响应时间 | `/triage` 处理 20 个文件应在 2 分钟内完成 |
| **NFR-002** | 编译响应时间 | `/wiki-compile` 处理 10 个源文件应在 5 分钟内完成 |
| **NFR-003** | 状态查询响应 | `/context --quick` 应在 30 秒内返回结果 |
| **NFR-004** | 健康检查响应 | `/lint` 检查 500 个文件应在 3 分钟内完成 |
| **NFR-005** | 文件操作速度 | 单文件读写应 < 1 秒 |
| **NFR-006** | Vault 规模上限 | 支持 10,000+ 个 Markdown 文件 |

### 4.2 可靠性

| ID | 需求 | 指标 |
|----|------|------|
| **NFR-010** | 数据完整性 | 分拣/编译操作不应丢失用户数据 |
| **NFR-011** | 操作可回滚 | 通过 Git 可回滚任何 AI 操作 |
| **NFR-012** | 故障隔离 | AI 不可用时，人类仍可直接操作 Markdown 文件 |
| **NFR-013** | 错误恢复 | 操作失败后 Vault 应保持可用状态 |
| **NFR-014** | 日志完整性 | 每次操作必须有日志记录，日志写入失败不应阻止操作 |

### 4.3 安全性

| ID | 需求 | 指标 |
|----|------|------|
| **NFR-020** | AI 权限隔离 | AI 不得修改 `raw/` 目录中的文件 |
| **NFR-021** | 敏感信息保护 | 个人财务、联系方式、API 密钥不得进入 `wiki/` |
| **NFR-022** | 配置保护 | AI 未确认不得修改 `.obsidian/` 配置文件 |
| **NFR-023** | 删除保护 | 文件删除前必须二次确认 |
| **NFR-024** | 批量操作限制 | 未经确认的单次操作不超过 10 个文件修改 |

### 4.4 可维护性

| ID | 需求 | 指标 |
|----|------|------|
| **NFR-030** | 目录结构一致 | 所有子库遵循统一目录结构 |
| **NFR-031** | Frontmatter 规范 | 所有 wiki/ 文件使用统一的 Frontmatter 格式 |
| **NFR-032** | 命名规范 | 文件命名遵循约定（PascalCase for concepts, kebab-case for files） |
| **NFR-033** | 日志可审计 | 所有操作可通过日志追溯 |
| **NFR-034** | 文档自包含 | 系统规则和 Schema 存储在 Vault 内（CLAUDE.md） |

### 4.5 可用性

| ID | 需求 | 指标 |
|----|------|------|
| **NFR-040** | 学习曲线 | 新用户应能在 30 分钟内理解基本工作流 |
| **NFR-041** | 错误提示 | 操作失败时提供清晰的错误描述和建议 |
| **NFR-042** | 离线可用 | 除 AI 功能外，所有内容应离线可访问 |
| **NFR-043** | 多平台 | 支持 macOS、Windows、Linux |

### 4.6 扩展性

| ID | 需求 | 指标 |
|----|------|------|
| **NFR-050** | 新子库创建 | 支持在不修改核心系统的情况下添加新子库 |
| **NFR-051** | Skill 扩展 | 支持添加新 Skill 而不影响现有 Skill |
| **NFR-052** | 主题扩展 | 支持添加新的主题类型（DDC 分类） |
| **NFR-053** | 格式扩展 | 架构应支持未来的非 Markdown 内容（PDF、图片等） |

---

## 5. 接口需求

### 5.1 Skill 命令接口

| 命令 | 触发方式 | 输入 | 输出 |
|------|----------|------|------|
| `/triage [options]` | Claude Code 会话 | `0 Inbox/` 目录 | 文件移动 + `AI-Log/triage-log.md` |
| `/wiki-compile [topic] [options]` | Claude Code 会话 | `3 Resources/[topic]/raw/` | `wiki/` 页面 + `AI-Log/compile-log.md` |
| `/context [options]` | Claude Code 会话 | Vault 文件系统 | Markdown 状态摘要 |
| `/lint [options]` | Claude Code 会话 | Vault 全部文件 | Markdown 检查报告 |

### 5.2 Skill 选项接口

```
/triage:
  (无参数)         完整扫描
  --dry-run         仅预览
  --file "<path>"   单文件处理
  --scope <name>    限定范围 (clippings|fleet-notes|tasks)

/wiki-compile:
  <topic>           必选：指定子库
  --dry-run         仅预览
  --incremental     增量编译
  --force           全量重新编译

/context:
  --quick           快速概览 (默认)
  --projects        项目状态
  --inbox           Inbox 状态  
  --summary         建议摘要

/lint:
  --quick           快速检查
  --fix             自动修复
  --report          详细报告
```

### 5.3 文件系统接口

| 接口 | 说明 |
|------|------|
| 文件读取 | AI 可读取 Vault 中任何 `.md` 文件 |
| 文件写入 | AI 可写入 `wiki/`、`AI-Log/`、`1-4 Projects|Areas|Resources|Archives/` |
| 文件移动 | AI 可移动 `0 Inbox/` 中的文件到目标位置 |
| 文件删除 | AI 禁止随意删除，需二次确认 |
| 目录创建 | AI 可在授权目录下创建新目录 |

### 5.4 Git 接口

| 操作 | 触发条件 | 权限 |
|------|----------|------|
| `git status` | 操作前后自动 | ✅ 自动 |
| `git add` | 用户确认后 | ⚠️ 需确认 |
| `git commit` | 用户确认后 | ⚠️ 需确认 |
| `git push` | 提交后 | ⚠️ 需确认 |
| `git pull` | 会话开始 | ⚠️ 需确认 |

---

## 6. 数据需求

### 6.1 数据存储模型

```
Vault Root
├── *.md                          # 根级笔记（自由格式）
├── 0 Inbox/                      # 未结构化、待分拣
├── 1 Projects/                   # 项目级结构化
├── 2 Areas/                      # 领域级结构化
├── 3 Resources/[topic]/          # 主题级结构化
│   ├── raw/                      # 原始资料（自由格式 + 基础 Frontmatter）
│   │   ├── articles/             #   source URL 为主
│   │   ├── papers/               #   author, published 字段
│   │   ├── books/                #   title, author, isbn 字段
│   │   └── conversations/        #   date, participants 字段
│   └── wiki/                     # 编译产物（严格格式）
│       ├── concepts/             #   type: concept
│       ├── entities/             #   type: entity, entity_type
│       └── sources/              #   type: source
├── 4 Archives/                   # 归档（保留原始结构）
└── AI-Log/                       # 日志（结构化记录）
```

### 6.2 Frontmatter 字段规范

#### 全域字段

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `created` | Date (YYYY-MM-DD) | ✅ | 文件创建日期 |
| `modified` | Date (YYYY-MM-DD) | - | 最后修改日期 |
| `tags` | Array | ✅ | 标签列表 |
| `aliases` | Array | - | 别名（用于搜索匹配） |

#### Wiki 页面特有

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `type` | Enum | ✅ | concept / entity / source / wiki-index / compile-log |
| `topic` | Enum | ✅ | 所属子库 |
| `status` | Enum | - | draft / reviewed / evergreen |
| `entity_type` | Enum | 条件 | 当 type=entity 时必填 |
| `sources` | Array | ✅ | 来源 raw/ 文件路径 |

#### 原始资料特有

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `source` | String | ✅ | 来源 URL 或描述 |
| `author` | String | - | 作者 |
| `published` | Date | - | 原始发布日期 |

#### 处理标记

| 字段 | 类型 | 说明 |
|------|------|------|
| `triaged` | Boolean | 分拣完成标记 |
| `triaged_at` | DateTime (ISO 8601) | 分拣时间 |
| `triaged_to` | String | 分拣目标路径 |
| `compiled` | Boolean | 编译完成标记 |
| `compiled_at` | DateTime (ISO 8601) | 编译时间 |
| `compiled_to` | Array | 编译产出的 wiki/ 页面列表 |

### 6.3 数据关系

```
raw/articles/article.md ──编译──► wiki/concepts/Concept-A.md
                              ├─► wiki/entities/Entity-X.md
                              └─► wiki/sources/source-article.md

wiki/concepts/*.md ◄──[[wikilink]]──► wiki/concepts/*.md
wiki/concepts/*.md ◄──[[wikilink]]──► wiki/entities/*.md
wiki/concepts/*.md ───来源──► raw/articles/*.md
```

### 6.4 数据生命周期

| 阶段 | 存放位置 | 保留期 | 维护者 |
|------|---------|--------|--------|
| ephemeral | `1 Projects/[project]/tasks.md` | 任务完成 → 归档 | 人类 |
| operational | `1 Projects/[project]/` | 项目结束 → `4 Archives/` | 人类 + AI |
| reference | `3 Resources/[topic]/raw/` | 长期保留 | **人类独占** |
| evergreen | `3 Resources/[topic]/wiki/` | 永久保留，持续更新 | **AI 独占** |

---

## 7. 约束与假设

### 7.1 技术约束

| ID | 约束 | 说明 |
|----|------|------|
| **TC-01** | 纯 Markdown 存储 | 不使用数据库，不使用 JSON/YAML 元数据文件（除 Frontmatter 外） |
| **TC-02** | 单 Vault 架构 | 所有内容在同一 Obsidian Vault，不跨 Vault 引用 |
| **TC-03** | Git 版本控制 | 必须保持 Git 兼容性，避免二进制文件 |
| **TC-04** | Claude Code 依赖 | AI 功能完全依赖 Claude Code，不支持其他 AI 引擎 |
| **TC-05** | Obsidian 兼容 | 不使用 Obsidian 不支持的 Markdown 语法 |
| **TC-06** | 文件路径长度 | Windows 路径限制 260 字符，文件名 ≤ 255 字符 |

### 7.2 业务约束

| ID | 约束 | 说明 |
|----|------|------|
| **BC-01** | 单用户系统 | 不支持多用户协作，无需权限系统 |
| **BC-02** | 中文优先 | 用户界面和输出以中文为主 |
| **BC-03** | 无实时协作 | 同一时刻只有一个 Claude Code 会话操作 Vault |
| **BC-04** | 不处理媒体文件 | 图片、视频等仅存储引用，不进行内容分析 |

### 7.3 假设

| ID | 假设 | 影响 |
|----|------|------|
| **AS-01** | 用户使用 Obsidian 作为主编辑器 | 影响：文件格式和插件依赖 |
| **AS-02** | Claude Code 的 session 长度足够完成编译任务 | 影响：大型编译可能需要分批 |
| **AS-03** | Git 远程仓库可用且已配置 | 影响：同步功能 |
| **AS-04** | 用户理解基本的 Markdown 和 Obsidian 操作 | 影响：错误恢复 |
| **AS-05** | raw/ 内容质量由人类负责 | 影响：wiki/ 编译质量依赖 raw/ 质量 |

---

## 8. 验收标准

### 8.1 系统级验收

| ID | 验收项 | 通过条件 |
|----|--------|----------|
| **VA-01** | 完整工作流 | 从剪藏 → 分拣 → 编译 → 检索全流程可走通 |
| **VA-02** | 四个 Skills 可用 | `/triage`、`/wiki-compile`、`/context`、`/lint` 全部正常执行 |
| **VA-03** | 10 个子库框架完整 | 所有 DDC 分类子库的目录结构存在 |
| **VA-04** | 安全约束生效 | AI 无法修改 raw/ 目录文件 |
| **VA-05** | 日志系统工作 | 所有操作有日志记录 |

### 8.2 功能验收 — Triage

| ID | 验收项 | 通过条件 |
|----|--------|----------|
| **VA-10** | 扫描 Inbox | 正确列出所有未处理文件 |
| **VA-11** | 时效性分类 | 抽查 20 个文件，分类准确率 ≥ 85% |
| **VA-12** | 路由执行 | 文件正确移动到目标位置 |
| **VA-13** | 元数据更新 | triaged 标记正确写入 |
| **VA-14** | 日志记录 | triage-log.md 正确更新 |
| **VA-15** | Dry-run 模式 | 仅预览，不实际移动文件 |

### 8.3 功能验收 — Wiki-Compile

| ID | 验收项 | 通过条件 |
|----|--------|----------|
| **VA-20** | 扫描源文件 | 正确列出 raw/ 下所有未编译文件 |
| **VA-21** | 概念页面生成 | 提取的概念页面包含定义、原理、Sources |
| **VA-22** | 实体页面生成 | 提取的实体页面包含基本信息、描述、关联 |
| **VA-23** | 来源追溯 | 每个 wiki/ 页面有 `## Sources` 章节 |
| **VA-24** | 索引更新 | wiki/index.md 反映最新状态 |
| **VA-25** | 增量编译 | 不重复处理已编译文件 |
| **VA-26** | 日志记录 | compile-log.md 正确更新 |

### 8.4 功能验收 — Context

| ID | 验收项 | 通过条件 |
|----|--------|----------|
| **VA-30** | 快速概览 | 返回 Vault 关键指标 |
| **VA-31** | Inbox 状态 | 显示积压文件数量 |
| **VA-32** | 项目状态 | 显示活跃项目列表 |
| **VA-33** | 操作建议 | 根据状态生成合理建议 |

### 8.5 功能验收 — Lint

| ID | 验收项 | 通过条件 |
|----|--------|----------|
| **VA-40** | 目录完整性 | 检查并报告缺失目录 |
| **VA-41** | 断链检测 | 正确识别所有断链 |
| **VA-42** | Frontmatter 规范 | 检查格式合规性 |
| **VA-43** | 健康评分 | 输出 0-100 评分 |
| **VA-44** | 自动修复 | 修复可修复的问题 |

### 8.6 非功能验收

| ID | 验收项 | 通过条件 |
|----|--------|----------|
| **VA-50** | 性能 | 分拣 20 文件 < 2 分钟，状态查询 < 30 秒 |
| **VA-51** | 可靠性 | 连续 5 次操作无数据丢失 |
| **VA-52** | 容错 | AI 不可用时系统仍可正常使用 |
| **VA-53** | 可维护性 | 新子库可在 5 分钟内完成框架搭建 |
| **VA-54** | 文档完整性 | CLAUDE.md 覆盖所有核心规则和流程 |

---

## 9. 可追溯矩阵

### 9.1 需求 → 架构组件追溯

| 需求 ID | 需求描述 | 对应架构组件 | 实施状态 |
|----------|----------|--------------|----------|
| FR-001 | 网页剪藏 | `0 Inbox/Clippings/` + Web Clipper 插件 | ✅ |
| FR-002 | 手动笔记 | `0 Inbox/1-输入/` | ✅ |
| FR-010 | 扫描 Inbox | `/triage` Skill | ✅ |
| FR-011 | 时效性分类 | `/triage` 分析引擎 | ✅ |
| FR-012 | 主题识别 | `/triage` 路由决策 | ✅ |
| FR-013 | 路由执行 | `/triage` 执行引擎 | ✅ |
| FR-020 | 源文件扫描 | `/wiki-compile` 扫描模块 | ✅ |
| FR-021 | 概念提取 | `/wiki-compile` 提取引擎 | ✅ |
| FR-022 | 实体提取 | `/wiki-compile` 提取引擎 | ✅ |
| FR-025 | 来源追溯 | wiki/ 页面标准格式 | ✅ |
| FR-030 | 状态概览 | `/context` Skill | ✅ |
| FR-040 | 目录检查 | `/lint` 检查模块 | ✅ |
| FR-041 | 断链检测 | `/lint` 检查模块 | ✅ |
| FR-050 | Wiki 索引 | `wiki/index.md` | ⚠️ 部分 |
| FR-052 | MOC 页面 | `00-MOCs/` | ⚠️ 部分 |
| NFR-020 | AI 权限隔离 | `raw/` 只读规则（CLAUDE.md 规则 1） | ✅ |
| NFR-021 | 敏感信息保护 | 禁止行为（CLAUDE.md 规则 4） | ✅ |
| NFR-033 | 日志可审计 | AI-Log/ 日志系统 | ✅ |

### 9.2 需求 → 验收追溯

（参见第 8 章验收标准中的 VA-xx 编号，每个验收项对应上述功能/非功能需求）

---

## 10. 附录

### A. 用户故事

| ID | 用户故事 | 对应需求 |
|----|----------|----------|
| **US-01** | "作为知识工作者，我希望把网页内容一键保存到 Inbox，这样我可以稍后整理" | FR-001 |
| **US-02** | "作为 Vault 所有者，我希望 AI 自动帮我把 Inbox 内容分类并路由到正确位置" | FR-010~FR-015 |
| **US-03** | "作为学习者，我希望 AI 从我的阅读材料中提取关键概念，生成结构化的知识页面" | FR-020~FR-025 |
| **US-04** | "作为项目管理者，我希望快速了解 Vault 的当前状态，知道有什么待处理" | FR-030 |
| **US-05** | "作为系统管理员，我希望定期检查 Vault 健康状态，发现断链和格式问题" | FR-040~FR-044 |
| **US-06** | "作为用户，我希望能通过索引和链接在知识库中自由浏览" | FR-050~FR-052 |
| **US-07** | "作为用户，我希望能确信 AI 不会修改我的原始资料" | NFR-020 |

### B. 用例图（文字版）

```
       ┌──────────────────────────────────────────────────┐
       │                   系统边界                        │
       │                                                  │
       │  ┌──────────┐     ┌──────────┐                  │
       │  │ 信息捕获  │────►│  分拣    │                  │
       │  │ (Capture) │     │ (Triage) │                  │
       │  └──────────┘     └────┬─────┘                  │
       │                        │                         │
       │         ┌──────────────┼──────────────┐         │
       │         ▼              ▼              ▼         │
       │  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
       │  │ ephemeral│  │operational│  │reference │      │
       │  └──────────┘  └──────────┘  └────┬─────┘      │
       │                                   │             │
       │                                   ▼             │
       │                           ┌──────────┐         │
       │                           │   编译    │         │
       │                           │(Compile)  │         │
       │                           └────┬─────┘         │
       │                                │                │
       │              ┌─────────────────┼───────┐        │
       │              ▼                 ▼       ▼        │
       │       ┌──────────┐    ┌──────────┐ ┌──────────┐ │
       │       │ concepts │    │ entities │  │ sources  │ │
       │       └──────────┘    └──────────┘ └──────────┘ │
       │                                                  │
       │  ┌──────────┐     ┌──────────┐                  │
       │  │  检索    │◄────│  索引    │                  │
       │  │(Retrieve)│     │ (Index)  │                  │
       │  └──────────┘     └──────────┘                  │
       │                                                  │
       │  ┌──────────────────────────────────────────┐   │
       │  │   状态管理 (/context) + 健康检查 (/lint)    │   │
       │  └──────────────────────────────────────────┘   │
       └──────────────────────────────────────────────────┘
```

### C. DDC 子库完整列表

| DDC | 子库                    | 路径                                           | 状态    | 核心需求覆盖         |
| --- | --------------------- | -------------------------------------------- | ----- | -------------- |
| 000 | Knowledge-Systems     | `3 Resources/000 Knowledge/`                 | 🟢 活跃 | FR-050~FR-052  |
| 100 | Philosophy-Psychology | `3 Resources/100 Philosophy & Psychology/`   | 🟢 活跃 | FR-021~FR-025  |
| 200 | Religion-Theology     | `3 Resources/200 Religion & Theology/`       | 🟡 框架 | FR-020~FR-027  |
| 300 | Social-Sciences       | `3 Resources/300 Social Sciences/`           | 🟡 框架 | FR-020~FR-027  |
| 400 | Language              | `3 Resources/400 Language/`                  | 🟢 活跃 | FR-020~FR-027  |
| 500 | Natural-Sciences      | `3 Resources/500 Natural Sciences/`          | 🟢 活跃 | FR-020~FR-027  |
| 600 | Applied-Sciences      | `3 Resources/600 Applied Sciences/`          | 🟢 活跃 | FR-020~FR-027  |
| 700 | Arts                  | `3 Resources/700 Arts/`                      | 🟢 活跃 | FR-020~FR-027  |
| 800 | Literature            | `3 Resources/800 Literature/`                | 🟢 活跃 | FR-020~FR-027  |
| 900 | History-Geography     | `3 Resources/900 History & Geography/`       | 🟡 框架 | FR-020~FR-027  |
| —   | People                | `0 Inbox/people/`                            | 🟢 活跃 | FR-012, FR-013 |

> ⚠️ **注**: DDC 600 目录存在疑似重复 `3 Resources/600 Applied Sciences Engineering/`，待确认去重。

### D. 版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| v1.0 | 2026-05-31 | 初始发布，完整的系统需求规格 |

### E. 后续迭代规划

| 优先级 | 需求 ID | 描述 | 目标版本 |
|--------|---------|------|----------|
| P1 | FR-052 | 完善所有子库的 MOC 页面 | v1.1 |
| P2 | FR-028 | 页面合并与去重（多源合并） | v1.2 |
| P2 | NFR-053 | 非 Markdown 内容支持（PDF、图片分析） | v2.0 |
| P3 | — | 自动化定时分拣（Cron Job） | v1.3 |
| P3 | — | Wiki 页面自动更新检测（源文件变更触发） | v1.3 |

---

**文档维护者**: AI (Claude Code)
**下次审查**: 2026-06-30
**状态**: ✅ 需求已确认，对应架构设计 v1.0 已实施

---

> 📎 关联文档:
> - [[1 Projects/📁 已完成/PARA+LLM-Wiki 整合系统架构设计文档 v1.0]] — 从需求到设计的追溯
> - [[CLAUDE.md]] — 系统运行规则
