---
# 工作流
aliases:
# 工作流
tags:
  - workflow
  - inbox
  - quick-action
---

# 工作流
# 文檔

# 工作流
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
# 專案
# 整理
# 整理

# 工作流
---

# 專案

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
# 檔案
FROM ""
WHERE contains(tags, "workflow-trigger")
SORT file.mtime DESC
```

---

# 方法
---

### 手动触发

```
# 專案
```

### 自动触发

# 系統

---

> [!tip] 自动化建议
# 整理
# 專案
# 工作流
