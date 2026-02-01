---
# 管理
tags: [obsidian, knowledge-management]
created: {{date}}
updated: {{date}}
---

# 管理

# 管理

## 📂 PARA 结构回顧

- **0 Inbox** – 快速捕获想法、灵感、待辦。
- **1 Projects** – 有明确目標、截止日期的專案。
- **2 Areas** – 持續的职责和關注领域。
- **3 Resources** – 參考资料、學習筆記、工具文檔。
- **4 Archives** – 已完成或不再活跃的內容。

## 🛠️ 核心工具 & 外掛

# 配置
|------|------|----------|
| **QuickAdd** | 快速捕获到 `0 Inbox`，使用模板 | 参见 `[[快速捕获]]` 模板 |
| **Templater** | 動態模板、变量替换 | 使用 `{{date}}`、`{{title}}` 等变量 |
| **Dataview** | 强大查詢 & 报表 | 示例：`dataview table status, updated from "#knowledge-management"`
# 管理
# 指南

## 📋 標準 Frontmatter（統一模板）

```yaml
---
title: "{{title}}"
created: {{date}}
updated: {{date}}
tags: ["{{tag}}"]
status: active   # active | on-hold | completed | cancelled
priority: medium # high | medium | low
aliases: []
---
```
> 以上 Frontmatter 已儲存为 `_templates/standard_note.md`，建議所有新筆記使用该模板。

## 🔗 常用模板索引

- **快速捕获** – `[[想法捕获.md]]`、`[[問題卡.md]]`
- **專案啟動** – `[[專案.md]]`
# 管理
- **資源收集** – `[[資源收集.md]]`
- **歸檔** – `[[歸檔.md]]`

# 工作流

1. **捕获**：使用 QuickAdd 快速創建到 `0 Inbox`，自動新增 `created`、`updated`。
# 整理
# 知識
4. **复盘**：每周使用 Dataview 生成狀態報告，例如：
   ```dataview
   table status, updated
   from "#knowledge-management"
   sort updated desc
   ```
5. **歸檔**：專案完成後，移动到 `4 Archives` 并更改 `status` 为 `completed`。

## 📈 監控与改进

# 管理
# 更新
# 版本

# 配置

| 外掛 | 进阶功能 | 推荐設置 |
|------|----------|----------|
| **QuickAdd** | 多步骤捕获、自動標籤 | 在 `quickAdd` 中启用 “Append link” 与 “Open file” 选项 |
| **Templater** | JavaScript 腳本、条件渲染 | 在模板中使用 `tp.user` 辅助函数 |
| **Dataview** | 查詢跨 folder、聚合 | 使用 `GROUP BY` 与 `FLATTEN` 進行統計 |
| **Tasks** | 自動重复、过滤视图 | 在 `tasks` 中使用 `filter` 表达式 |
| **Obsidian AI** | 自定义系統提示 | 在外掛設置中新增 `systemPrompt` 来統一风格 |

## 💡 實踐技巧

# 管理
- **双向連結策略**：在專案筆記的末尾新增 `[[相關資源]]`，資源筆記中新增 `[[所属專案]]`，形成閉環。
- **模板快捷键**：为常用模板绑定快捷键（Settings → Hotkeys），提升捕获速度。
- **自動歸檔腳本**：使用 Templater 或 QuickAdd 編寫腳本，将符合 `status = "completed"` 且 `updated` 超过 30 天的筆記移动至 `4 Archives`。
# 版本

## 📚 參考資源

- [[Obsidian 官方文檔]]
- [[Dataview 官方手册]]
# 指南
# 教程

---

> 🛎️ **提示**：将此页固定在侧边栏，作为日常參考手册。
