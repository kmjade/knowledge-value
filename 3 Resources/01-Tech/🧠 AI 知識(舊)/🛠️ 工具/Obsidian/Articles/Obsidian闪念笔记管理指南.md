---
# 管理
aliases:
  - Obsidian Fleeting Notes Guide
  - 闪念筆記
  - 快速筆記
type: guide
created: 2026-01-29
tags:
  - obsidian
  - note-taking
  - 闪念筆記
  - PARA
# 工作流
interest-level: 3
study-status: completed
# 整理
para: resources
language: zh-cn
---

# 管理

> [!info] 概述
> 闪念筆記（Fleeting Notes）是指快速記錄转瞬即逝的想法和灵感，不追求完美的结构和格式，專注于快速捕捉思想火花。

---

## 什么是闪念筆記？

| 特點 | 說明 |
|------|------|
| **快速性** | 最重要，30秒内完成記錄 |
# 整理
| **暂时性** | 理解这是临时記錄，稍后需要转移或展开 |
| **無压力** | 不追求完美的标题和分類 |

---

# 工作流

```
┌─────────────────────────────────────┐
│     💡 灵感/想法产生           │
│              ↓                  │
│   ⚡ 快速記錄（<30秒）          │
│              ↓                  │
│   📋 定期回顧（每日/每周）        │
│              ↓                  │
│  🔄 转化为正式筆記或行动      │
└─────────────────────────────────────┘
```

---

# 方法

# 方法

1. **創建快速捕获模板**
   在 `_templates/fleeting/_template-闪念筆記.md` 中：

   ```markdown
   ---
   created: {{tp.date.now("YYYY-MM-DD")}}
   tags: [fleeting, 想法]
   ---

   # {{title}}

   ## 核心想法
   {{tp.file.cursor}}


   ## 相關背景
   - [[]]


   ## 後續行动
   - [ ] 待辦1
   - [ ] 待辦2
   ```

# 配置
   - Settings → QuickAdd → Manage Choices → Add new choice
   - 設置快捷键：`Ctrl+Shift+F` (快速闪念)

# 方法

創建快捷命令模板：

```markdown
<%*
// 闪念筆記快速捕获
let title = await tp.system.prompt("闪念标题");
tR += `---
created: ${tp.date.now("YYYY-MM-DD")}
tags: [fleeting, 想法]
---

# ${title}

## 核心想法
${tp.file.cursor}
```
%>
```

---

## 与PARA系統的整合

### 捕获到Inbox

所有闪念筆記先进入 `0 Inbox`，作为临时儲存区。

### 定期回顧

| 频率 | 操作 |
|------|------|
| 每日睡前 | 處理当天的闪念筆記 |
# 整理

### 归位決策树

```
闪念筆記
     ↓
有行动潜力？
  ├─ 是 → 转化为待辦事項
  │     ├─ 紧急 → 今日待辦
  │     └─ 不紧急 → 新增到專案任務列表
  │
  └─ 否 → 有參考價值？
          ├─ 是 → 转化为資源筆記 (Resources)
          └─ 否 → 歸檔或刪除
```

---

## 最佳實踐

### 捕获原則

1. **30秒原則** - 捕获時間不超过30秒
# 修改
# 整理

### 回顧原則

1. **每日回顧** - 睡前處理当日闪念
# 整理
3. **定期清空** - 保持Inbox清空狀態

### 分類標籤建議

使用以下標籤帮助分類：

```
#fleeting
├── #灵感       # 突然的想法
├── #想法       # 有待擴展的想法
├── #待辦       # 需要行动的想法
├── #參考       # 需要儲存的想法
└── #歸檔       # 已處理的想法
```

---

## 相關資源

- [[0 Inbox/超快速捕获]] - 3秒快速捕获模板
# 指南
- [[0 Inbox/Inbox Dashboard.md]] - Inbox 仪表盘
# 指南
