---
title: Obsidian Bases 示例说明
date: 2026-01-27
tags: [Obsidian, Bases, 数据库, 示例]
---

# Obsidian Bases 示例说明

> 概述：介绍三个实用的 Obsidian Bases 示例，帮助你快速上手 Bases 功能

---

## 📋 创建的 Base 文件

### 1. [[1 Projects/01-Learning/阅读追踪库.base]] - 阅读管理

**用途**：追踪所有阅读内容的进度和状态

**主要功能**：
- 📖 管理书籍、文章、论文等阅读内容
- 📊 按状态分组（待读、阅读中、已完成）
- ⭐ 优先级排序和筛选
- 📈 阅读统计和评分管理
- 🎴 卡片视图浏览内容

**视图说明**：
- **所有阅读内容**：完整的表格视图，按状态分组
- **书籍卡片**：卡片形式展示所有书籍
- **正在阅读**：当前阅读的内容列表
- **待读清单**：待处理的内容队列
- **已完成**：历史阅读记录
- **按类型浏览**：按内容类型分组浏览
- **高评分内容**：评分 4 星以上的精选内容

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
tags: [reading, 书籍, 知识管理]
---
```

---

### 2. [[2 Areas/学习/知识卡片库.base]] - 知识卡片管理

**用途**：管理和浏览所有知识卡片

**主要功能**：
- 💡 管理概念、方法、案例等不同类型的卡片
- 🎯 按重要性级别排序
- 🔄 定期回顾提醒（30 天未更新）
- 📂 按领域分组管理
- 🔖 按标签浏览和筛选

**视图说明**：
- **所有卡片**：卡片形式展示所有知识卡片
- **概念卡片**：只显示概念类型的卡片
- **方法卡片**：只显示方法类型的卡片
- **案例卡片**：只显示案例类型的卡片
- **高重要性卡片**：重要性 4 星以上的卡片
- **需要回顾**：超过 30 天未更新的卡片
- **按领域分组**：按知识领域分组
- **按标签浏览**：按标签分组浏览
- **最近创建**：最新创建的 20 张卡片

**需要的前置属性（frontmatter）**：
```yaml
---
title: 概念名
type: concept/method/case/viewpoint
domain: 知识管理/学习/工作
importance: 1-5
difficulty: easy/medium/hard
status: learning/mastered
tags: [知识卡片, 概念, 重要]
aliases: [别名1, 别名2]
---
```

---

### 3. [[项目管理看板.base]] - 项目和任务管理

**用途**：项目和任务的看板管理系统

**主要功能**：
- ✅ 完整的看板系统（待办、进行中、审核、完成）
- ⚡ 优先级管理和颜色标记
- 📊 进度追踪和统计
- 📅 截止日期和逾期提醒
- 👥 按项目分组管理
- 👤 按负责人筛选

**视图说明**：
- **全部任务**：完整的任务表格，按项目分组
- **待办事项**：高优先级的待办任务
- **进行中**：当前正在进行的任务
- **待审核**：等待审核的任务
- **已完成**：历史任务记录
- **已逾期**：已过期且未完成的任务
- **按项目分组**：项目维度的任务列表
- **我的任务**：分配给我的任务
- **高优先级**：高优先级且未完成的任务

**需要的前置属性（frontmatter）**：
```yaml
---
title: 任务标题
status: todo/in-progress/review/done
priority: high/medium/low
progress: 0-100 (百分比)
due_date: YYYY-MM-DD
assignee: 负责人姓名
project: 所属项目名
tags: [task, 项目, 待办]
---
```

---

## 🚀 使用方法

### 1. 安装 Obsidian Bases 插件

1. 在 Obsidian 中打开 **Community Plugins** 设置
2. 搜索并安装 **Bases** 插件
3. 启用插件并重启 Obsidian

### 2. 创建笔记并添加属性

使用上面的模板格式创建笔记，Bases 会自动读取 frontmatter 中的属性。

### 3. 在 Base 中查看

在文件列表中找到 `.base` 文件，点击即可打开 Base 视图。

### 4. 自定义视图

你可以：
- 修改 `.base` 文件中的 `views` 部分来自定义视图
- 调整 `order` 来改变排序
- 修改 `filters` 来筛选内容
- 更改 `groupBy` 来改变分组方式
- 设置 `limit` 来限制显示数量

### 5. 使用高级功能

**公式示例**：
```yaml
formulas:
  # 状态图标
  status_icon: 'if(done, "✅", "⏳")'

  # 计算剩余天数
  days_left: '((due_date - today()) / 86400000).round(0)'

  # 进度百分比
  progress_text: 'progress + "%"'
```

**筛选示例**：
```yaml
filters:
  # 复合筛选
  and:
    - priority == "high"
    - status != "done"
    - file.mtime > now() - "7d"
```

---

## 💡 最佳实践

### 1. 属性命名规范
- 使用有意义的属性名（如 `due_date` 而非 `date1`）
- 保持命名一致性（如都使用 `_date` 后缀）
- 避免特殊字符和空格

### 2. 视图设计原则
- 每个视图应该有明确的用途
- 优先显示最重要的信息
- 使用合适的视图类型（table/cards/list）
- 合理使用分组和排序

### 3. 性能优化
- 使用全局过滤器减少每个视图的计算
- 对大型库使用 `limit` 限制显示数量
- 合理使用 `groupBy` 避免过度分组

### 4. 维护建议
- 定期清理已完成的任务和项目
- 保持属性值的一致性
- 及时更新过期的截止日期
- 定期归档不需要的内容

---

## 🔗 相关资源

- [[0 Inbox/阅读分析拆解工作流.md]] - 阅读工作流文档
- [[2 Areas/05-Learning/PARA方法论-知识卡片.md]] - PARA 方法论
- [[3 Resources/Obsidian/Obsidian.md]] - Obsidian 使用指南

---

**创建日期**：2026-01-27
**更新日期**：2026-01-27
