---
aliases:
  - Weekly-Review 详细设计
created: 2026-06-01
type: design-detail
topic: weekly-review
parent: "[[Skill-weekly-review]]"
tags:
  - design
  - weekly-review
  - architecture
---

# /weekly-review 详细设计 v1.0

> 基于 [[Skill 6-weekly-review|设计]] → 技术实现

---

## 1. 架构

```
/weekly-review
    │
    ├── Step 1: 汇总本周数据
    ├── Step 2: 生成周记
    ├── Step 3: 批量编译
    ├── Step 4: 过期归档
    ├── Step 5: 项目审查
    └── Step 6: Wiki Lint
```

---

## 2. 核心函数

```
function aggregate():
    diaries = readDailyRange(monday, sunday)
    return {
        tasks_done: countCompleted(diaries),
        inbox_new: countNewInbox(monday..sunday),
        wiki_compiled: countCompiled(monday..sunday),
        projects_active: scanActive(),
    }

function archiveEphemeral():
    files = find("lifecycle: ephemeral AND created > 14d")
    for f in files:
        move(f, f"4 Archives/ephemeral/{f.month}/")

function reviewProjects():
    for proj in scan("1 Projects/"):
        if proj.deadline < today AND !proj.completed:
            warn(f"🔴 {proj.name} 已过期")
        if daysSince(proj.mtime) > 30:
            warn(f"🟡 {proj.name} 停滞 30 天")
```

---

> 📎 关联: [[Skill 6-weekly-review\|设计]]
