---
title: PARA 自动化工作流
aliases:
  - 工作流
tags:
  - workflow
  - inbox
  - quick-action
---

> [!note] PARA 自动化工作流 / PARA Automated Workflow
> 自动触发 PARA 整理和文档创建的流程配置

## 工作流配置 / Workflow Configuration
---

### 触发器 / Triggers

```dataview
TABLE WITHOUT ID
  trigger_type as "类型",
  trigger_condition as "触发条件",
  trigger_action as "执行动作",
  enabled as "启用"
FROM ""
WHERE contains(tags, "workflow-trigger")
SORT file.mtime DESC
```

| 类型 | 条件 | 动作 | 说明 |
|------|--------|------|----------|
| schedule | 定时 | 归档 | 按计划自动归档 |
| project | 项目完成 | 整理 | 将完成项目自动归档 |
| inbox | 收件箱满 | 整理 | 提醒整理 InBox |
| manual | 手动触发 | 整理 | 执行 `/para-整理收集` |

### 工作流模板 / Workflow Templates
---

#### 项目归档流程

```dataview
TABLE WITHOUT ID
  title as "模板",
  description as "说明",
  steps as "步骤"
FROM ""
WHERE contains(tags, "workflow-template")
```

---

## 实现说明
---

### 触发器实现

```dataview
TABLE WITHOUT ID
  title as "触发器",
  trigger_condition as "触发条件",
  trigger_action as "触发动作",
  file_path as "关联文件"
FROM ""
WHERE contains(tags, "workflow-trigger")
SORT file.mtime DESC
```

---

## 使用方法 / Usage
---

### 手动触发

```
/para-触发: 归档:项目完成
```

### 自动触发

配置好触发器后，系统会自动执行相应的整理命令。

---

> [!tip] 自动化建议
> - 定期触发 InBox 整理
> - 项目完成后自动归档
> - 按周/月自动创建工作流报告
