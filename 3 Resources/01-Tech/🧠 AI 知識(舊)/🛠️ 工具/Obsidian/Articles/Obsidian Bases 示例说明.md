---
title: Obsidian Bases 示例說明
date: 2026-01-27
tags: [Obsidian, Bases, 資料庫, 示例]
---

# Obsidian Bases 示例說明

> 概述：介紹三个实用的 Obsidian Bases 示例，帮助你快速上手 Bases 功能

---

## 📋 創建的 Base 檔案

# 管理

**用途**：追踪所有阅读內容的进度和狀態

**主要功能**：
# 管理
- 📊 按狀態分组（待读、阅读中、已完成）
# 排序
# 管理
- 🎴 卡片视图瀏覽內容

**视图說明**：
- **所有阅读內容**：完整的表格视图，按狀態分组
- **书籍卡片**：卡片形式展示所有书籍
- **正在阅读**：当前阅读的內容列表
- **待读清單**：待處理的內容队列
- **已完成**：歷史阅读記錄
- **按类型瀏覽**：按內容类型分组瀏覽
- **高评分內容**：评分 4 星以上的精选內容

**需要的前置属性**（frontmatter）**：
```yaml
---
title: 书名/文章标题
type: book/article/paper
status: to-read/reading/completed
priority: high/medium/low
rating: 1-5
author: 作者名
read_date: 阅读日期
pages: 页数
# 管理
---
```

---

# 知識卡片

# 知識卡片

**主要功能**：
# 方法
# 排序
# 更新
# 管理
- 🔖 按標籤瀏覽和篩選

**视图說明**：
# 知識卡片
# 顯示
# 方法
# 顯示
- **高重要性卡片**：重要性 4 星以上的卡片
# 更新
# 知識
- **按標籤瀏覽**：按標籤分组瀏覽
- **最近創建**：最新創建的 20 张卡片

**需要的前置属性（frontmatter）**：
```yaml
---
title: 概念名
type: concept/method/case/viewpoint
# 管理
importance: 1-5
difficulty: easy/medium/hard
status: learning/mastered
# 知識卡片
aliases: [别名1, 别名2]
---
```

---

# 管理

# 管理

**主要功能**：
- ✅ 完整的看板系統（待辦、進行中、審核、完成）
# 管理
- 📊 进度追踪和統計
- 📅 截止日期和逾期提醒
# 管理
- 👤 按负责人篩選

**视图說明**：
- **全部任務**：完整的任務表格，按專案分组
- **待辦事項**：高優先級的待辦任務
- **進行中**：当前正在進行的任務
- **待審核**：等待審核的任務
- **已完成**：歷史任務記錄
- **已逾期**：已过期且未完成的任務
- **按專案分组**：專案维度的任務列表
- **我的任務**：分配给我的任務
- **高優先級**：高優先級且未完成的任務

**需要的前置属性（frontmatter）**：
```yaml
---
title: 任務标题
status: todo/in-progress/review/done
priority: high/medium/low
progress: 0-100 (百分比)
due_date: YYYY-MM-DD
assignee: 负责人姓名
project: 所属專案名
tags: [task, 專案, 待辦]
---
```

---

# 方法

### 1. 安裝 Obsidian Bases 外掛

1. 在 Obsidian 中打開 **Community Plugins** 設置
2. 搜尋并安裝 **Bases** 外掛
3. 启用外掛并重启 Obsidian

### 2. 創建筆記并新增属性

使用上面的模板格式創建筆記，Bases 会自動讀取 frontmatter 中的属性。

# 查看

在檔案列表中找到 `.base` 檔案，点击即可打開 Base 视图。

### 4. 自定义视图

你可以：
# 修改
# 排序
# 修改
- 更改 `groupBy` 来改变分组方式
# 顯示

### 5. 使用高级功能

**公式示例**：
```yaml
formulas:
  # 狀態圖示
  status_icon: 'if(done, "✅", "⏳")'

  # 計算剩余天数
  days_left: '((due_date - today()) / 86400000).round(0)'

  # 进度百分比
  progress_text: 'progress + "%"'
```

**篩選示例**：
```yaml
filters:
  # 复合篩選
  and:
    - priority == "high"
    - status != "done"
    - file.mtime > now() - "7d"
```

---

## 💡 最佳實踐

### 1. 属性命名規範
- 使用有意义的属性名（如 `due_date` 而非 `date1`）
- 保持命名一致性（如都使用 `_date` 后缀）
- 避免特殊字符和空格

### 2. 视图設計原則
- 每个视图應該有明确的用途
# 顯示
- 使用合适的视图类型（table/cards/list）
# 排序

### 3. 效能優化
- 使用全局过滤器减少每个视图的計算
# 顯示
- 合理使用 `groupBy` 避免过度分组

### 4. 維護建議
- 定期清理已完成的任務和專案
- 保持属性值的一致性
# 更新
- 定期歸檔不需要的內容

---

## 🔗 相關資源

# 工作流
# 方法
# 指南

---

**創建日期**：2026-01-27
# 更新
