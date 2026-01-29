---
title: Obsidian 知识管理概览
tags: [obsidian, knowledge-management]
created: {{date}}
updated: {{date}}
---

# Obsidian 知识管理概览

> 🎯 **目标**：提供一套统一的 Obsidian 知识管理最佳实践，帮助您在 PARA 框架下高效组织、检索和维护笔记。

## 📂 PARA 结构回顾

- **0 Inbox** – 快速捕获想法、灵感、待办。
- **1 Projects** – 有明确目标、截止日期的项目。
- **2 Areas** – 持续的职责和关注领域。
- **3 Resources** – 参考资料、学习笔记、工具文档。
- **4 Archives** – 已完成或不再活跃的内容。

## 🛠️ 核心工具 & 插件

| 插件 | 用途 | 推荐配置 |
|------|------|----------|
| **QuickAdd** | 快速捕获到 `0 Inbox`，使用模板 | 参见 `[[快速捕获]]` 模板 |
| **Templater** | 动态模板、变量替换 | 使用 `{{date}}`、`{{title}}` 等变量 |
| **Dataview** | 强大查询 & 报表 | 示例：`dataview table status, updated from "#knowledge-management"`
| **Tasks** | 任务管理与视图 | 配合 `status`、`priority` 前置属性 |
| **Obsidian AI（AI Assistant）** | AI 辅助写作、笔记生成 | 参考 `[[AI Assistant 使用指南]]`

## 📋 标准 Frontmatter（统一模板）

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
> 以上 Frontmatter 已保存为 `_templates/standard_note.md`，建议所有新笔记使用该模板。

## 🔗 常用模板索引

- **快速捕获** – `[[想法捕获.md]]`、`[[问题卡.md]]`
- **项目启动** – `[[项目.md]]`
- **领域管理** – `[[领域.md]]`
- **资源收集** – `[[资源收集.md]]`
- **归档** – `[[归档.md]]`

## 📑 工作流建议

1. **捕获**：使用 QuickAdd 快速创建到 `0 Inbox`，自动添加 `created`、`updated`。
2. **整理**：每日回顾 Inbox，依据内容移动到对应的 PARA 区域。
3. **链接**：使用 wikilink `[[Note Name]]` 进行双向链接，形成知识网络。
4. **复盘**：每周使用 Dataview 生成状态报告，例如：
   ```dataview
   table status, updated
   from "#knowledge-management"
   sort updated desc
   ```
5. **归档**：项目完成后，移动到 `4 Archives` 并更改 `status` 为 `completed`。

## 📈 监控与改进

- **Dataview 仪表板**：创建仪表板笔记 `[[知识管理仪表板]]`，实时展示待办、项目进度、资源统计。
- **定期回顾**：每月检视模板使用情况，更新 `standard_note.md` 或添加新模板。
- **版本控制**：所有模板与关键笔记均在 Git 中，使用 Conventional Commits 记录更改。

---

> 🛎️ **提示**：将此页固定在侧边栏，作为日常参考手册。
