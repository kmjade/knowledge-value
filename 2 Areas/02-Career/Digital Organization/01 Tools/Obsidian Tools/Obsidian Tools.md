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

# 安裝

# 安裝

# 配置
|------|----------|----------|
| **QuickAdd** | 快速捕获、模板生成 | 参考《快速捕获》模板，启用 `Append link` 与 `Open file` |
| **Templater** | 动态模板、变量替换 | 使用 `{{date}}`、`{{title}}` 等变量，配合 `tp.user` 自定义函数 |
# 查詢
# 管理
# 新增
# 工作流

# 目錄

# 指南
# 專案
# 備份
# 文檔

# 工作流

# 筆記
```markdown
---
title: "{{title}}"
created: {{date}}
updated: {{date}}
tags: [digital-organization, capture]
---

# {{title}}

# 連結
```
# 連結

# 專案
```yaml
# templater template for new project
---
title: "{{title}}"
created: {{date}}
updated: {{date}}
tags: [digital-organization, project]
---

# 專案

## 目标
- 

## 关键里程碑
- 

# 連結
- [[Obsidian Tools/Resources/...]]
```
# 專案

# 備份
```powershell
# Obsidian Vault Backup
$src = "D:\Knowledge\knowledge-value"
$dest = "D:\Backups\Obsidian_$(Get-Date -Format 'yyyyMMdd')"
Copy-Item -Path $src -Destination $dest -Recurse -Force
Write-Host "Backup completed to $dest"
```
# 儲存

# 資源
# 文檔
- 插件库：<https://obsidian.md/plugins>
# 指南
# 教程

---

# 檔案
