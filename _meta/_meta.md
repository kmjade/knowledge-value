---
aliases:
  - 元数据
tags:
  - meta
  - index
created: 2026-01-30
---

# 📋 Meta 文件夹

> 此文件夹包含关于知识库本身的结构、配置和管理信息。

---

## 📁 文件夹结构

```text
_meta/                    # 元数据文件夹
├── _meta.md             # 元数据索引页
├── ⚙️ 系统配置/           # 系统配置
│   └── ⚙️ 系统配置.md
├── 🔗 知识关联/          # 知识关联
│   ├── 🔗 知识关联.md
│   ├── MOCs/
│   │   └── MOCs.md
│   ├── Index/
│   │   └── Index.md
│   └── Dashboard/
│       └── Dashboard.md
└── scripts/             # 自动化脚本
```

> 📌 **说明**：此结构展示 `_meta` 文件夹的组织方式。

---

## 🔗 按目录分组

此表格按文件夹分组展示所有文件，便于快速查看每个目录下的内容。

```dataview
TABLE WITHOUT ID
  link(file.path, split(file.folder, "/")[-1]) as "目录",
  rows.file.link as "文件列表"
WHERE contains(file.path, this.file.folder)
  AND file.name != this.file.name
  AND !contains(file.name, "meta")
GROUP BY file.folder
SORT file.folder
```

> 📌 **说明**：点击目录名可跳转到对应文件夹，点击文件名可打开具体文件。

---

## 📊 文件统计

统计 `_meta` 文件夹中的文件数量，了解知识库元数据的规模。

```dataview
TABLE WITHOUT ID length(rows) as "文件数量"
WHERE contains(file.path, this.file.folder)
  AND file.name != this.file.name
GROUP BY "总计"
```

> 📌 **说明**：此统计不包括 `_meta.md` 自身，仅计算子文件夹中的文件。

---

## 🗂️ 使用说明

### 子目录功能介绍

- **⚙️ 系统配置**：包含插件配置、模板、技能和命令设置
  - 管理知识库的技术基础设施
  - 配置自动化工具和工作流

- **🔗 知识关联**：包含 MOCs（Map of Contents）、Index 和 Dashboard 等知识导航工具
  - **MOCs**：高层次的领域地图，提供主题导航
  - **Index**：字母索引，快速定位特定内容
  - **Dashboard**：知识库仪表板，提供整体概览

- **scripts**：存储自动化脚本和工具
  - 定制化脚本和自动化任务
  - 辅助知识管理的实用工具

### 视图选择指南

- **文件夹结构**：查看文件夹的树型组织结构
- **按目录分组**：适合查看每个目录的具体文件
- **文件统计**：快速了解元数据规模

---

> 💡 **提示**：此页面自动更新，反映 `_meta` 文件夹的最新结构。
