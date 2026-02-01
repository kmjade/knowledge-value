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
# 配置

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

| 类型 | 条件 | 动作 | 說明 |
|------|--------|------|----------|
| schedule | 定时 | 歸檔 | 按計劃自動歸檔 |
# 整理
# 整理
# 整理

# 工作流
---

#### 專案歸檔流程

```dataview
TABLE WITHOUT ID
  title as "模板",
  description as "說明",
  steps as "步骤"
FROM ""
WHERE contains(tags, "workflow-template")
```

---

## 實現說明
---

### 触发器實現

```dataview
TABLE WITHOUT ID
  title as "触发器",
  trigger_condition as "触发条件",
  trigger_action as "触发动作",
  file_path as "关联檔案"
FROM ""
WHERE contains(tags, "workflow-trigger")
SORT file.mtime DESC
```

---

# 方法
---

### 手動触发

```
/para-触发: 歸檔:專案完成
```

### 自動触发

# 配置

---

> [!tip] 自動化建議
# 整理
> - 專案完成後自動歸檔
# 工作流
