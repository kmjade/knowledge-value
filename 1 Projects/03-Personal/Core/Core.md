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
# 專案

# 專案

---

# 專案

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

# 分類

| 类别 | 数量 | 占比 |
|------|------|------|
| 方案卡 | - | -% |
| 已完成概念 | - | -% |
# 記錄

---

## 🎯 进行中的方案

```dataview
TABLE WITHOUT ID
  file.link AS "方案",
# 創建
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
# 創建
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

# 創建

```
# 創建
```

**模板位置**: `_templates_/Core/✅ 方案卡模板.md`

# 儲存

---

# 資源

# 工作流

# 專案
- [[收件箱处理流程]] - 收件箱处理标准流程
# 知識
# 系統

### PARA 相关

# 設置
# 工作流

# 資源

- `_templates_/Core/✅ 方案卡模板.md` - 方案卡模板
# 專案
- `_templates_/Card/概念卡模板.md` - 概念卡模板

---

## 📅 定期维护

| 维护任务 | 频率 | 最后执行 | 状态 |
|---------|------|---------|------|
| 归档完成超过 30 天的方案卡 | 每月 | - | ⏳ |
| 将稳定概念转化为 Resources | 每月 | - | ⏳ |
# 刪除
# 查詢

---

## 💡 使用提示

# 專案

| 位置                  | 用途          | 内容类型         | 生命周期       |
| ------------------- | ----------- | ------------ | ---------- |
| **1 Projects/Core** | 存放已完成/归档的内容 | 方案卡、已完成概念、复盘 | 短期 → 长期归档  |
# 筆記

# 工作流
```
0 Personals/02_Core (活跃概念）
  ↓ 完成理解/应用
# 標記
# 專案
1 Projects/Core/✅ Completed Concepts (归档）
  ↓ 长期稳定后
评估是否转化为 Resources
  ↓ 归档/转化
3 Resources/[领域]/[类别]/ (参考资料）
或
# 筆記
```

# 管理

# 場景
|------|---------|---------|
| **in_progress** | 方案执行中 | 开始执行时 |
| **done** | 方案已完成 | 完成所有任务后 |
| **archived** | 方案已归档 | 30 天后归档时 |

---

## 🎯 快速开始

### 今天就可以做

# 創建
   ```
# 創建
   ```

# 查看
# 瀏覽
# 查看
# 查看

# 指南
# 指南
# 工作流

---

# 查詢

# 檔案

```dataview
# 檔案
WHERE contains(file.path, this.file.folder) AND file.name != this.file.name
FLATTEN type
GROUP BY type
SORT type, file.name
```

# 專案

```dataview
# 檔案
FROM [[]]
WHERE !contains(file.folder, this.file.name)
# 檔案
```

---

# 更新
# 專案
# 版本
