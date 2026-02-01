---
title: Obsidian Tools Overview
created: 2026-01-30
updated: 2026-01-30
tags:
  - digital-organization
  - tools
  - obsidian
---

# 🛠️ Obsidian Tools Overview

> 本页面汇总在 **Digital Organization** 区域中使用的所有 Obsidian 相关工具、插件与脚本，帮助快速定位、安装与使用说明。

## 📦 已安装插件（核心）

| 插件 | 功能简介 | 推荐配置 |
|------|----------|----------|
| **QuickAdd** | 快速捕获、模板生成 | 参考《快速捕获》模板，启用 `Append link` 与 `Open file` |
| **Templater** | 动态模板、变量替换 | 使用 `{{date}}`、`{{title}}` 等变量，配合 `tp.user` 自定义函数 |
| **Dataview** | 强大查询、生成表格/列表 | 示例：`dataview table title, tags from "2 Areas/Digital Organization"`
| **Tasks** | 任务管理、过滤视图 | `status: active`、`priority: high` 等属性 |
| **Obsidian AI** | AI 助手（ChatGPT、Claude） | 在插件设置中添加自定义 `systemPrompt` |
| **Excalidraw** | 手绘图表与思维导图 | 用于可视化工作流与概念图 |

## 📂 子目录概览

- `Obsidian Tools/Plugins` – 各插件的详细介绍、安装指南、配置截图。
- `Obsidian Tools/Workflows` – 基于插件的典型工作流（如每日笔记、项目模板、任务回顾等）。
- `Obsidian Tools/Scripts` – 自动化脚本（如备份、同步、批量重命名）。
- `Obsidian Tools/Resources` – 官方文档、社区资源链接、教学视频。

## 🔧 常用工作流示例

### 1️⃣ 快速捕获 + 双链笔记
```markdown
---
title: "{{title}}"
created: {{date}}
updated: {{date}}
tags: [digital-organization, capture]
---

# {{title}}

> 通过 QuickAdd 自动生成并放入 `2 Areas/Digital Organization/0 Inbox/`，随后使用双链链接到目标区域。
```
- 使用 QuickAdd 捕获后，手动或自动在 `Digital Organization Index.md` 中添加 `[[{{title}}]]` 链接。

### 2️⃣ 项目模板自动生成
```yaml
# templater template for new project
---
title: "{{title}}"
created: {{date}}
updated: {{date}}
tags: [digital-organization, project]
---

# {{title}} 项目概览

## 目标
- 

## 关键里程碑
- 

## 资源链接
- [[Obsidian Tools/Resources/...]]
```
- 通过 Templater 创建新项目笔记，自动填充结构。

### 3️⃣ 自动备份脚本（PowerShell 示例）
```powershell
# Obsidian Vault Backup
$src = "D:\Knowledge\knowledge-value"
$dest = "D:\Backups\Obsidian_$(Get-Date -Format 'yyyyMMdd')"
Copy-Item -Path $src -Destination $dest -Recurse -Force
Write-Host "Backup completed to $dest"
```
- 保存为 `Obsidian Tools/Scripts/Backup.ps1`，可在 Windows 任务计划程序中每日自动执行。

## 📚 参考资源
- 官方文档：<https://help.obsidian.md>
- 插件库：<https://obsidian.md/plugins>
- 社区指南：《Obsidian 完整使用手册》（PDF）
- 视频教程：YouTube 频道 *Effective Obsidian*（中文/英文）

---

> **提示**：在每个子目录（Plugins、Workflows、Scripts、Resources）中使用 **Dataview** 自动生成文件列表，保持内容同步更新。
