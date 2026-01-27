---
para: project
domain:
  - "[[Knowledge Management]]"
created: 2026-01-17
start-date:
by-when:
achieve-date:
status: active
---
# Core 项目管理

> [!info] Core 项目是 PARA 系统中的**核心工作区**，用于管理短期方案卡、已完成的概念和复盘记录。

---

## 📊 项目概览

### 方案卡统计

```dataview
TABLE WITHOUT ID
  "**总方案数**" AS Total,
  "**已完成**" AS Completed,
  "**进行中**" AS InProgress,
  "**完成率**" AS Rate
FROM "1 Projects/Core"
WHERE type = "plan-card"
FLATTEN file.lists as L
WHERE L.item.text = "✅"
GROUP BY file.link
```

### 分类统计

| 类别 | 数量 | 占比 |
|------|------|------|
| 方案卡 | - | -% |
| 已完成概念 | - | -% |
| 复盘记录 | - | -% |

---

## 🎯 进行中的方案

```dataview
TABLE WITHOUT ID
  file.link AS "方案",
  created AS "创建日期"
FROM "1 Projects/Core"
WHERE type = "plan-card" AND status = "in_progress"
SORT created ASC
```

---

## ✅ 最近完成的方案

```dataview
TABLE WITHOUT ID
  file.link AS "方案",
  completed AS "完成日期"
FROM "1 Projects/Core"
WHERE type = "plan-card" AND status = "done"
SORT completed DESC
LIMIT 10
```

---

## 💡 已完成的概念

```dataview
TABLE WITHOUT ID
  file.link AS "概念",
  created AS "创建日期"
FROM "1 Projects/Core/✅ Completed Concepts"
SORT created DESC
LIMIT 10
```

---

## 📋 最近的复盘

```dataview
TABLE WITHOUT ID
  file.link AS "复盘",
  completed AS "完成日期"
FROM "1 Projects/Core/✅ Completed Plans"
SORT completed DESC
LIMIT 5
```

---

## 🔗 快速操作

> [!tip] 创建新方案卡

```
QuickAdd → ✅ 创建方案卡
```

**模板位置**: `_templates_/Core/✅ 方案卡模板.md`

**保存位置**: `1 Projects/Core/`

---

## 🔗 相关资源

### 工作流文档

- [[3 Resources/Obsidian/Core/Core 项目使用指南]] - Core 项目完整使用指南
- [[收件箱处理流程]] - 收件箱处理标准流程
- [[渐进式总结工作流]] - 知识内化完整流程
- [[知识管理仪表板的设计要素]] - 监控整体系统状态

### PARA 相关

- [[基于 frontmatter 的 PARA 层级关联]] - 如何正确设置 frontmatter
- [[PARA 工作流]] - PARA 系统整体使用指南

### 模板资源

- `_templates_/Core/✅ 方案卡模板.md` - 方案卡模板
- `_templates_/PARA/🎯 Project Template.md` - 项目模板
- `_templates_/Card/概念卡模板.md` - 概念卡模板

---

## 📅 定期维护

| 维护任务 | 频率 | 最后执行 | 状态 |
|---------|------|---------|------|
| 归档完成超过 30 天的方案卡 | 每月 | - | ⏳ |
| 将稳定概念转化为 Resources | 每月 | - | ⏳ |
| 删除过期复盘卡 | 每月 | - | ⏳ |
| 更新 Dataview 查询 | 每月 | - | ⏳ |

---

## 💡 使用提示

### Core 项目 vs 0 Personals/02_Core

| 位置 | 用途 | 内容类型 | 生命周期 |
|------|------|---------|---------|
| **1 Projects/Core** | 存放已完成/归档的内容 | 方案卡、已完成概念、复盘 | 短期 → 长期归档 |
| **0 Personals/02_Core** | 存放活跃内容 | 概念、想法、临时笔记 | 活跃 → 完成后归档 |

**工作流**：
```
0 Personals/02_Core (活跃概念）
  ↓ 完成理解/应用
标记 status: completed
  ↓ 移动到 Core 项目
1 Projects/Core/✅ Completed Concepts (归档）
  ↓ 长期稳定后
评估是否转化为 Resources
  ↓ 归档/转化
3 Resources/[领域]/[类别]/ (参考资料）
或
5 Zettels/[概念].md (原子笔记）
```

### 方案卡状态管理

| 状态 | 使用场景 | 标记时机 |
|------|---------|---------|
| **in_progress** | 方案执行中 | 开始执行时 |
| **done** | 方案已完成 | 完成所有任务后 |
| **archived** | 方案已归档 | 30 天后归档时 |

---

## 🎯 快速开始

### 今天就可以做

1. ✅ **创建第一个方案卡**
   ```
   QuickAdd → ✅ 创建方案卡
   ```

2. ✅ **查看现有 Core 内容**
   - 浏览已完成的方案卡
   - 查看已完成的概念
   - 查看最近的复盘

3. ✅ **阅读使用指南**
   - 打开 `[[3 Resources/Obsidian/Core/Core 项目使用指南]]`
   - 了解完整的工作流程

---

## 📚 Dataview 查询参考

### 查看所有文件（按类型）

```dataview
TABLE WITHOUT ID type AS "类型", rows.file.link AS "文件"
WHERE contains(file.path, this.file.folder) AND file.name != this.file.name
FLATTEN type
GROUP BY type
SORT type, file.name
```

### 查看链接到此项目的笔记

```dataview
TABLE WITHOUT ID sort(rows.file.link) AS "文件"
FROM [[]]
WHERE !contains(file.folder, this.file.name)
GROUP BY file.folder AS "文件夹"
```

---

**最后更新**: 2026-01-17
**项目状态**: Active
**模板版本**: v1.0
