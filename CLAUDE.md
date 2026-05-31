# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Type

This is an **Obsidian vault** - a personal knowledge management system containing Markdown notes for knowledge capture and retrieval.

## Git Workflow

This vault is version-controlled with Git and synced to GitHub at https://github.com/kmjade/knowledge-value.git.

- **Commit changes**: Use Obsidian Git plugin commands or `git add` + `git commit`
- **Sync with remote**: `git push` to push changes, `git pull` to fetch
- **Branch strategy**: Multiple feature branches for plugin configurations (e.g., `plugins_Tasks`, `plugins_Copilot`)

### Git 操作护栏 (FR-060, FR-062)

**关键操作前后必须检查 Git 状态**:
1. 操作前: `git status --porcelain` — 确认工作区状态
2. 操作后: `git status --short` — 确认变更范围

**批量保护阈值**:
| 变更文件数 | 行为 |
|-----------|------|
| ≤10 | 自动执行 |
| 11-20 | 显示变更列表 + 确认 |
| >20 | 强制分步，每批 ≤10 |

**Conventional Commits 映射**:
| 操作 | type | 示例 |
|------|------|------|
| 分拣 (/triage) | `triage` | `triage: route 8 files to 3 Resources/` |
| 编译 (/wiki-compile) | `compile` | `compile: ai-ml — 3 concepts, 2 entities` |
| 健康检查 (/lint) | `chore` | `chore: fix N broken wikilinks` |
| 基础设施 | `chore` | `chore: create wiki/log.md for DDC 400` |
| 文档 | `docs` | `docs: update SRS checklist` |

## Key Obsidian Plugins

- **Claudian**: AI-assisted note creation and editing
- **Daily Notes**: Auto-creates daily journal entries
- **Templates**: Pre-defined note templates
- **File Recovery**: Version history for notes
- **Sync**: Cloud sync across devices
- **Bases**: Database-like functionality for structured data

## Vault Structure

- `.obsidian/`: Obsidian configuration and plugin settings
- `.claude/`: Claude Code settings and session history
- `.git/`: Git repository data
- Root level: Markdown notes and knowledge base content

## Development Notes

- All content is in Markdown format (`.md` files)
- Frontmatter properties are used for metadata (tags, dates, etc.)
- Plugin configurations are stored in `.obsidian/*.json` files

---

# PARA+LLM-Wiki 整合系统

## Vault 架构

本 Vault 采用 **PARA 方法** 与 **LLM-Wiki** 融合的三层架构：

```
┌─────────────────────────────────────────────────────────────┐
│                    信息输入层 (Inbox)                        │
│                   0 Inbox/ (捕获与分拣)                      │
└─────────────────────────────────────────────────────────────┘
                              ↓ /triage
┌─────────────────────────────────────────────────────────────┐
│                    行动管理层 (PARA)                         │
│     1 Projects/ → 2 Areas/ → 3 Resources/ → 4 Archives/    │
└─────────────────────────────────────────────────────────────┘
                              ↓ /wiki-compile
┌─────────────────────────────────────────────────────────────┐
│                    知识编译层 (Wiki)                         │
│        3 Resources/[topic]/wiki/ (AI 编译产物)              │
└─────────────────────────────────────────────────────────────┘
```

## 目录职责速查

| 目录 | 职责 | 维护者 | AI 权限 |
|------|------|--------|---------|
| `0 Inbox/` | 临时捕获，待分拣 | 人类写入 | 读取 + 分拣 |
| `1 Projects/` | 有截止日期的任务 | 人类主导 | 辅助整理 |
| `2 Areas/` | 持续责任领域 | 人类主导 | 辅助整理 |
| `3 Resources/` | 知识资源库 | 混合维护 | 编译 Wiki |
| `4 Archives/` | 归档内容 | 只读 | 辅助迁移 |
| `raw/` | 原始资料 | **人类独占** | 只读 |
| `wiki/` | 编译产物 | **AI 独占** | 写入 |
| `AI-Log/` | 操作日志 | AI 维护 | 写入 |

## 核心规则

### 规则 1: raw/ 目录 AI 只读
`raw/` 目录下的所有文件由人类维护，AI 永远**不修改**原始资料。

### 规则 2: wiki/ 目录 AI 独占
`wiki/` 目录下的所有文件由 AI 维护，人类不应直接编辑。

### 规则 3: 所有 Wiki 页面必须有 Sources
每个 Wiki 页面必须包含 `## Sources` 部分，指向原始资料。

### 规则 4: 优先更新而非创建
编译时优先更新现有页面，避免重复内容。

### 规则 5: 使用 Wikilinks 建立连接
使用 `[[]]` 语法连接相关概念和实体。

1. **永远不修改 raw/ 中的文件** — 原始资料是不可变的事实基线
2. **永远不删除文件** — 只移动到 04-Archive/（删除需明确二次确认）
3. **所有 AI 写入 wiki/ 的内容必须有来源标注** — frontmatter 中的 sources 字段
4. **0 Inbox/ 中的文件在分拣前不要读取用于其他目的** — 防止未分拣信息污染 Wiki
5. **每次修改 wiki/ 文件后必须追加到 AI-Log/compile-log.md**

## 信息生命周期

| 阶段 | 描述 | 存放位置 | 保留期 |
|------|------|---------|--------|
| **ephemeral** | 短期任务、临时信息 | `1 Projects/[项目]/tasks.md` | 任务完成后归档 |
| **operational** | 项目运行笔记 | `1 Projects/[项目]/` | 项目结束后归档 |
| **reference** | 参考资料、素材 | `3 Resources/[主题]/raw/` | 长期保留 |
| **evergreen** | 长期知识 | `3 Resources/[主题]/wiki/` | 永久保留 |

## Frontmatter 标准

```
---yaml
created: YYYY-MM-DD
updated: YYYY-MM-DD
type: [note|task|wiki-concept|wiki-entity|wiki-source|daily|weekly|project|area]
lifecycle: [ephemeral|operational|reference|evergreen]
status: [inbox|active|review|archived]
tags: []
sources: []      # wiki/ 文件专用，记录来源 raw/ 文件路径
origin: [manual|webclipper|voice|email|ai-generated]
---
```
### Wiki 页面标准格式
```
---
aliases:
  - [别名1]
  - [别名2]
created: YYYY-MM-DD
type: concept | entity | source
topic: ai-ml | people | finance | productivity
---
```

### 原始资料标准格式
```
---
created: YYYY-MM-DD
source: [来源 URL 或描述]
tags:
  - [标签1]
  - [标签2]
---
```

### 分拣标记
```
---
triaged: true
triaged_at: YYYY-MM-DDTHH:MM:SS
triaged_to: [目标路径]
---
```

## Wiki 子库目录

### 活跃子库
| 子库                    | 路径                                                                                 | Schema                                                                                             | 状态     |
| --------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ------ |
| Epistemology          | `4 Archives/by-type/Resources/epistemology/`                                       | [[4 Archives/by-type/Resources/epistemology/CLAUDE\|schema]]                                       | 🟢 活跃  |
| Knowledge-Systems     | `3 Resources/000 Knowledge/`                                                       | DDC 001 知识组织                                                                                       | 🟢 活跃  |
| Philosophy-Psychology | `4 Archives/by-type/Resources/100 Philosophy & Psychology/`                        | DDC 100 哲学·心理学                                                                                     | 🟢 活跃  |
| Religion-Theology     | `4 Archives/by-type/Resources/200 Religion & Theology/`                            | DDC 200 宗教·神学                                                                                      | 🟡 框架  |
| Social-Sciences       | `3 Resources/300 Social Sciences/`                                                 | DDC 300 社会科学                                                                                       | 🟡 框架  |
| Natural-Sciences      | `3 Resources/500 Natural Sciences/`                                                | DDC 500 自然科学                                                                                       | 🟢 活跃  |
| Applied-Sciences      | `3 Resources/600 Applied Sciences/`                                                | [[3 Resources/600 Applied Sciences/CLAUDE\|schema]]                                                | 🟢 活跃  |
| Literature            | `4 Archives/by-type/Resources/800 Literature/`                                     | DDC 800 文学                                                                                         | 🟡 框架  |
| History-Geography     | `4 Archives/by-type/Resources/900 History & Geography/`                            | DDC 900 历史·地理                                                                                      | 🟡 框架  |
| People                | `0 Inbox/people/`                                                                  | [[0 Inbox/people/CLAUDE\|schema]]                                                                  | 🔴 未创建 |


### 子库结构
```
3 Resources/[topic]/
├── CLAUDE.md          # 子库 schema
├── README.md          # 知识库入口
├── 00-MOCs/           # 总览与学习路径
├── 01~09-章节/        # 核心内容章
├── raw/               # 原始资料（人类维护，AI 只读）
│   ├── articles/      # 文章摘录
│   ├── papers/        # 论文笔记
│   ├── books/         # 书籍笔记
│   └── conversations/ # 对话记录
├── wiki/              # LLM 编译产物（AI 独占写入）
│   ├── index.md       # 知识索引
│   ├── log.md         # 编译日志
│   ├── concepts/      # 概念页面
│   ├── entities/      # 实体页面
│   └── sources/       # 来源溯源
└── outputs/           # 基于 Wiki 生成的制品
```

## 会话协议

### 会话开始
1. 运行 `/context --quick` 加载当前状态
2. 检查 Inbox 是否有积压
3. 确认当前活跃项目

### 会话结束
1. 确认所有修改已记录
2. 检查 Git 状态
3. 更新相关日志

### 推荐工作流
```
开始 → /context → /triage → /wiki-compile → /lint → 结束
```

## 禁止行为

1. **禁止修改 raw/ 目录**: AI 不得编辑、删除或覆盖 `raw/` 下的任何文件
2. **禁止批量删除**: 未经确认不得删除多个文件
3. **禁止修改配置**: 未经确认不得修改 `.obsidian/` 下的配置文件
4. **禁止暴露敏感信息**: 个人财务数据、密码等不进入 wiki/

## 核心 Skills

| Skill | 命令 | 功能 |
|-------|------|------|
| triage | `/triage` | Inbox 分拣引擎 |
| wiki-compile | `/wiki-compile` | Wiki 知识编译引擎 |
| context | `/context` | 会话状态管理 |
| lint | `/lint` | 系统健康检查 |

## 日志系统

所有操作记录到 `AI-Log/`:
- `triage-log.md` - 分拣操作日志
- `compile-log.md` - 编译操作日志
- `sessions/` - 会话记录目录

---

*最后更新: 2026-05-28*

---

## 变更记录

| 日期 | 变更 |
|------|------|
| 2026-05-28 | 新增 Social-Sciences (DDC 300) 框架 + 跨库连接矩阵 |
| 2026-05-28 | 新增 Religion-Theology (DDC 200) 框架 + DDC 180↔200 双向链接 |
| 2026-05-28 | 新增 Natural-Sciences (DDC 500)、Applied-Sciences (DDC 600) 子库 |
| 2026-05-28 | DDC 180 古典哲学：易经知识库整合 (92 文件) |
| 2026-05-28 | 数学知识库迁移：`02-Learning/` → `500 Natural Sciences/510-Mathematics/` (17 文件) |
| 2026-05-28 | 新增 Knowledge-Systems (DDC 001)、Psychology (DDC 150) 子库 |
| 2026-05-28 | 优化 5 个 Areas 入口页面 + 3 个 Resources 入口页面 |
| 2026-05-28 | Inbox 全量分拣（19 文件），修复 MOC 断链 5 处 |
| 2026-05-27 | 初始版本

