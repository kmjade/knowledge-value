---
title: 04 Automation
created: {{date}}
updated: {{date}}
tags: [digital-organization, automation]
---

# 🤖 自动化脚本

> 本目录收录所有用于数字化组织的自动化脚本、代码片段、GitHub Actions、PowerShell、Python 示例等。每个脚本都有统一的 Front‑matter、使用说明以及关联工具/工作流的双链。

## 已收录脚本（示例）

- **Obsidian Backup Script** – 使用 PowerShell 将 Obsidian Vault 自动备份至云盘
- **GitHub Action: Auto‑Sync** – 自动将仓库同步至 Google Drive
- **Zapier Workflow: Email → Notion** – 将指定标签的 Gmail 邮件自动创建 Notion 页面
- **Python Script: Markdown Link Checker** – 检查 Obsidian 笔记中的死链并生成报告
- **Docker Compose: Self‑Hosted Sync** – 使用 Docker 部署 Obsidian Sync 服务

## 脚本模板（快速捕获）

```markdown
---
title: "{{title}}"
created: {{date}}
updated: {{date}}
tags: [digital-organization, automation]
---

# {{title}}

## 目的

## 使用环境
- 操作系统：
- 依赖库/工具：

## 使用说明
```sh
# 示例命令
{{code}}
```

## 关联工具
- [[工具名称]]

## 关联工作流
- [[工作流名称]]

## 注意事项与常见错误
- 
```
```