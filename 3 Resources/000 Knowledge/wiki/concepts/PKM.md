---
aliases:
  - PKM
  - Personal Knowledge Management
  - 个人知识管理
created: 2026-05-28
type: concept
topic: knowledge-systems
status: reviewed
sources:
  - "[[3 Resources/000 Knowledge/ram/Knowledge-Systems/09-个人知识管理/09-个人知识管理.md]]"
---

# Personal Knowledge Management (PKM)

## 定义

个人知识管理 (PKM) 是将 KOS 理论应用于个人层面的实践——通过系统化的方法捕获、组织、提炼和表达个人知识，构建"第二大脑"。

> 来源: [[3 Resources/000 Knowledge/ram/Knowledge-Systems/09-个人知识管理/09-个人知识管理.md|09-个人知识管理]]

## 核心原理

### PKM 方法论

| 方法 | 核心思想 | 代表工具 |
|------|----------|----------|
| **Zettelkasten** | 原子笔记 + 双向链接 | Obsidian |
| **PARA** | 项目/领域/资源/归档 | 文件夹结构 |
| **GTD** | 清空大脑 → 执行 | Todoist |
| **数字花园** | 公开笔记、持续生长 | 个人网站 |

### 设计原则

本 Vault 采用 **PARA + LLM-Wiki 融合架构**，遵循五大原则：

1. **人机分工**: `raw/` 人类独占 → PARA 层混合 → `wiki/` AI 独占
2. **分层不重复**: 同一知识在不同层有不同形态 (reference / evergreen / ephemeral)
3. **渐进结构化**: 捕获 → 分拣 → 链接 → 编译 → 表达
4. **链接优先于分类**: 文件夹是物理位置，链接是语义关系
5. **可审计**: 每个 wiki 页面必须有 Sources，每次操作必须有日志

### Onsidian 即 KOS

| 你做的 | KOS 等价 |
|--------|----------|
| PARA 文件夹 | 分类法 |
| `tags:` frontmatter | 受控词表 / 标签系统 |
| `aliases:` frontmatter | 叙词表入口词 |
| `[[wikilink]]` | 关联索引 / 语义关系 |
| YAML `type:` `topic:` | 本体属性 |
| MOC 导航页 | 分类导航 / 地图 |
| Dataview 查询 | 推理 / 跨库检索 |
| `/triage` `/wiki-compile` | 知识管理流程 |
| Claudian Agent | AI 驱动的知识引擎 |

## 关键要点

1. PKM 不是工具选择问题，而是**系统设计**问题
2. 好的 PKM 系统应该有明确的人机边界
3. 链接优于文件夹——允许一个笔记同时属于多个上下文
4. 本 Vault 的 KOS 理论不是"学习对象"，而是**设计蓝图**
5. 维护节奏至关重要: 日清 Inbox、周 Triaging、月 Review、季 Compile

## 相关概念

- [[Knowledge-Organization-Systems]] - PKM 的理论基础
- [[SECI-Model]] - 组织知识管理，PKM 的个人版
- [[RAG]] - AI 驱动的 PKM 增强
- [[PARA-Method]] - 本 Vault 的核心组织方法

## Sources

- [[3 Resources/000 Knowledge/ram/Knowledge-Systems/09-个人知识管理/09-个人知识管理.md]]
- [[3 Resources/000 Knowledge/ram/Knowledge-Systems/Knowledge-Systems.md]]
