---
aliases:
  - 数据需求
  - SRS-06
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
