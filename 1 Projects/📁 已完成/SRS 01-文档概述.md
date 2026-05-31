---
aliases:
  - 文档概述
  - SRS-01
created: 2026-05-31
version: "1.0"
status: stable
type: project
lifecycle: evergreen
parent: "[[PARA+LLM-Wiki 融合系统需求文档 v1.0]]"
tags:
  - architecture
  - requirements
  - para
  - llm-wiki
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
