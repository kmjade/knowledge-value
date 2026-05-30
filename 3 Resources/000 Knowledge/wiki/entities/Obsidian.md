---
aliases:
  - Obsidian.md
created: 2026-05-27
type: entity
entity_type: tool
topic: productivity
status: reviewed
---

# Obsidian

## 基本信息

| 属性 | 值 |
|------|------|
| **类型** | 笔记/知识库软件 |
| **平台** | Windows, macOS, Linux, iOS, Android |
| **存储格式** | 纯 Markdown（本地优先） |
| **许可** | 个人免费，商业付费 |
| **官网** | https://obsidian.md |

## 描述

Obsidian 是一个基于本地 Markdown 文件的双向链接笔记软件，以"你的第二个大脑"为理念，支持超过 2000 个社区插件，是当前最流行的个人知识管理 (PKM) 工具之一。

## 核心特征

- **本地优先** — 全部数据存储在本地 Markdown 文件，可离线使用
- **双向链接** — `[[]]` 语法建立知识网络图谱
- **图谱视图** — 可视化笔记间的关联关系
- **插件生态** — 2000+ 社区插件，包括 Dataview, Tasks, Templater
- **Canvas** — 无限画布，自由布局
- **Frontmatter** — YAML 元数据支持，可自定义属性

## 优劣势

| 优势 | 劣势 |
|------|------|
| 本地文件，完全控制数据 | 学习曲线陡峭 |
| 极丰富的插件生态 | 移动端体验不如原生 App |
| Markdown 标准格式 | 协作功能弱 |
| Git 版本控制友好 | 无原生数据库视图 |
| 高可定制性 | 需要手动配置 |

## 在本系统中的角色

Obsidian 是 **PARA+LLM-Wiki 系统的宿主平台**：
- 所有 Markdown 文件存储在本地
- Claude Code 通过文件系统直接访问
- Wiki 页面以 `[[]]` 链接连接
- 插件 (Dataview, Tasks) 提供增强功能

## 相关概念

- [[PARA-Method]] — Obsidian 中实现 PARA 的主要工具
- [[Zettelkasten-Method]] — Obsidian 是 Zettelkasten 的完美数字化实现
- [[3 Resources/productivity/wiki/concepts/LLM-Wiki]] — Obsidian 是 LLM-Wiki 的基础设施
- [[GTD-Method]] — Obsidian Tasks 插件实现 GTD 工作流

## 相关实体

- [[Notion]] — 主要竞品，云端 vs 本地
- [[3 Resources/productivity/wiki/entities/Claude-Code]] — AI 编译引擎，直接操作 Obsidian Vault
- [[IOTO-Framework]] — 基于 Obsidian 的完整工作流框架

## Sources

- [[3 Resources/productivity/raw/articles/Obsidian/README.md]]
- [[3 Resources/productivity/raw/articles/LifeOS × LLM-Wiki 融合系统.md]]

## 分类码

| 体系 | 类号 | 说明 |
|:----:|:----:|------|
| **UDC** | `004.91Obsidian` | 文本处理/桌面出版应用 |
| **DDC** | `005.52` | 文字处理 / 桌面出版 |
| **CLC** | `TP317.1` | 办公自动化系统 |
| **LCC** | `QA76.76.T49` | 文本编辑器 |

> 详见 [[3 Resources/000 Knowledge/004 Computer Science & technology/004.43-计算机语言/计算机语言-分类码|计算机语言分类码]]
