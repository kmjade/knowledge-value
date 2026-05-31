---
aliases:
  - Inbox Index
  - 收集箱入口
created: 2026-05-31
type: index
tags:
  - index/inbox
---

# 📥 Inbox 收集箱

> 唯一入口 — 永远只往这里扔东西

← [[_meta/_INDEX|总览]] | [[0 Inbox/0 Inbox|Inbox 主页]]

---

## 📂 待分拣区域

| 目录 | 说明 | 文件 |
|------|------|:---:|
| [[0 Department/]] | 学科基础 | — |
| [[02-Learning/]] | 学习资料 | — |
| [[02-工具製造/]] | 工具制造 | — |
| [[03-Productivity/]] | 生产力 | — |
| [[03-分離工程/]] | 分离工程 | — |
| [[05-Reference/]] | 参考资料 | — |
| [[1-输入/]] | 输入捕获 | — |
| [[3-任务/]] | 任务 | — |
| [[5 Zettels/]] | 卡片笔记 | — |
| [[Clippings/]] | 网页剪藏 | — |
| [[Concept Cards/]] | 概念卡片 | — |
| [[Programming/]] | 编程相关 | — |
| [[people/]] | 人物 | — |

---

## 📋 待处理文件

```dataview
LIST
FROM "0 Inbox"
WHERE file.name != this.file.name
  AND file.name != "0 Inbox"
  AND !startswith(file.folder, "0 Inbox/_processed")
  AND file.folder != "0 Inbox"
SORT file.ctime DESC
LIMIT 20
```

---

## 🔄 分拣工作流

1. 📥 **捕获** → 任何东西先进 Inbox
2. 🏷️ **判断** → 项目 / 领域 / 资源 / 归档 / 删除
3. 📂 **移动** → `/triage` 自动分拣
4. ✅ **清空** → 保持 Inbox ≤ 10 个文件

---

## ⚡ 快捷入口

- [[_processed/]] — 已处理项
- [[0 Inbox/0 Inbox|Inbox 主页]] — Dataview 查询视图
