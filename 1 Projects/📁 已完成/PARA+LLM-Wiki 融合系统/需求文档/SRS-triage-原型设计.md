---
aliases:
  - Triage Prototype
  - 分拣原型
created: 2026-05-31
type: prototype
topic: triage
parent: "[[SRS-triage-需求说明书]]"
tags:
  - prototype
  - triage
  - ux
---

# /triage 原型设计

> 基于 [[SRS-triage-需求说明书]] 的交互原型

---

## 1. 用户流程

```
用户触发 /triage
        │
        ├─[无参数]──► 完整扫描流程
        ├─[--dry-run]──► 预览流程
        ├─[--file]──► 单文件流程
        └─[--scope]──► 范围扫描流程
```

---

## 2. 主流程原型: `/triage`

### 输入

```
用户: /triage
```

### 阶段 1: 扫描

```
🔍 正在扫描 0 Inbox/ ...

📂 发现 12 个文件:
  Clippings/    ████████ 8
  fleeting/     ██ 2
  根目录         ██ 2
  _processed/   (跳过)
```

### 阶段 2: 分析

```
🧠 分析中 ...

file-1.md   ████████████ ephemeral → 1 Projects/Personal/tasks.md
file-2.md   ████████████ reference → 3 Resources/ai-ml/raw/articles/
file-3.md   ██████░░░░░░ reference → ⚠️ 需确认 (置信度 62%)
...
```

### 阶段 3: 路由预览

```
📋 分拣预览:

🏃 ephemeral (3):
  → 1 Projects/Personal/tasks.md         "明天买灯泡"
  → 1 Projects/Work/tasks.md              "提交Q2报告"
  → 2 Areas/finance/tasks.md              "缴信用卡"

📚 reference (6):
  → 3 Resources/ai-ml/raw/articles/       "LLM 价格对比"
  → 3 Resources/productivity/raw/          "GTD 实践"
  → ...

⚠️ 需确认 (2):
  → file-x.md   [reference?operational?]   置信度 62%
  → file-y.md   [ephemeral?operational?]   置信度 58%

👤 人物检测: 1 人 (张三)

💡 执行 /triage 确认以上路由
```

### 阶段 4: 执行确认

```
⚠️ 即将移动 12 个文件。确认? (yes/no)
> yes
```

### 阶段 5: 执行 + 结果

```
✅ 分拣完成 — 2026-05-31 14:30

📊 摘要:
  🏃 ephemeral:    3 → 追加到 tasks.md
  📚 reference:    6 → raw/ (待编译: ai-ml×3, productivity×2, finance×1)
  ⚠️ 需确认:       2 → 0 Inbox/_review/
  👤 人物:         1 → 0 Inbox/people/raw/

📝 日志: AI-Log/triage-log.md
⏱️ 耗时: 45s

💡 下一步:
  /wiki-compile ai-ml      ← 3 新资料待编译
  /wiki-compile productivity ← 2 新资料待编译
```

---

## 3. 子模式原型

### 3.1 `--dry-run` 预览

```
用户: /triage --dry-run
```

```
🔍 Triage Dry-Run — 2026-05-31

📂 扫描: 12 文件
📋 计划路由:
  🏃 ephemeral:    3
  📚 reference:    6
  ⚠️ 需确认:       2
  👤 人物:         1

⚠️ 预览模式 — 未执行任何移动
💡 执行 /triage 确认路由
```

### 3.2 `--file` 单文件

```
用户: /triage --file "LLM 价格对比.md"
```

```
📄 单文件分拣: LLM 价格对比.md

🔍 分析:
  时效性: reference (置信度 91%)
  主题:   ai-ml (关键词: API, token, 模型)
  人物:   无

📋 路由:
  → 3 Resources/ai-ml/raw/articles/

✅ 已执行
```

### 3.3 `--scope` 范围

```
用户: /triage --scope clippings
```

```
🔍 范围扫描: Clippings/

📂 扫描: 8 文件 (仅 Clippings/)
📋 路由:
  🏃 ephemeral:    1
  📚 reference:    7

✅ 执行完成 (8/8)
⏭️ 跳过: fleeting/ (2 文件), 根目录 (2 文件)
```

---

## 4. 错误状态

### 4.1 Inbox 为空

```
用户: /triage
```

```
📥 Inbox 为空 ✨

无待处理文件。
💡 使用 Web Clipper 捕获网页，或手动创建笔记到 0 Inbox/
```

### 4.2 无法分类

```
⚠️ 低置信度文件 (2):

file-x.md   置信度 62%   [reference?operational?]
  匹配关键词: 项目, API  ← 矛盾信号
file-y.md   置信度 58%   [ephemeral?operational?]
  匹配关键词: 任务, 学习  ← 模糊

已移至 0 Inbox/_review/，请手动分拣。
```

### 4.3 目标冲突

```
⚠️ 目标冲突:

file-z.md → 3 Resources/ai-ml/raw/articles/
  目标已存在同名文件!
  操作: 跳过 (保留原文件)
  建议: 手动合并后删除重复
```

---

## 5. 状态转换图

```
Inbox 文件状态机:

  [未处理] ──/triage──► [已分拣: triaged=true]
                              │
                    ┌─────────┼─────────┐
                    ▼         ▼         ▼
               ephemeral  operational  reference
               → tasks    → projects   → raw/
                    │         │         │
                    └─────────┴────┬────┘
                                   ▼
                            [已编译: compiled=true]
                                   │
                                   ▼
                            [evergreen: wiki/]
```

---

> 📎 关联: [[SRS-triage-需求说明书\|需求]] | [[Skill-triage v1.0\|设计]] | [[triage-使用指南\|使用指南]]
