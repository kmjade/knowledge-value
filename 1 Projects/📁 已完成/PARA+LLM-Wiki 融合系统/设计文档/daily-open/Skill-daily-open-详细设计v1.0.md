---
aliases:
  - Daily-Open 详细设计
created: 2026-06-01
type: design-detail
topic: daily-open
parent: "[[Skill-daily-open v1.0]]"
tags:
  - design
  - daily-open
  - architecture
---

# /daily-open 详细设计 v1.0

> 基于 [[SRS-daily-open-原型设计|原型]] → 技术实现

---

## 1. 架构

```
/daily-open
    │
    ├──[日记存在]──► SummaryMode (输出摘要)
    └──[日记不存在]──► CreateMode
                         ├── CreateDir
                         ├── FromTemplate
                         ├── FillTasks
                         ├── FillInbox
                         └── FillYesterday
```

---

## 2. CreateMode

```
function create():
    dir  = f"Periodic/daily/{year}/"
    file = f"{dir}/{today}.md"
    
    mkdir -p(dir)
    
    template = loadTemplate("daily")
    template = replaceDate(template, today)
    template = replaceWeek(template, isoWeek(today))
    
    write(file, template)
    
    fillTasks(file)
    fillInbox(file)
    fillYesterday(file, yesterday())
    
    return file
```

## 3. 填充函数

```
function fillTasks(file):
    tasks = []
    for proj in scanActive("1 Projects/"):
        for task in proj.tasks:
            if task.deadline <= today or task.deadline is None:
                tasks.append(f"- [ ] {task.desc} — 来自 {proj.name}")
    appendToSection(file, "📋 任务", tasks)

function fillInbox(file):
    count = countFiles("0 Inbox/", exclude="_processed")
    files = listFiles("0 Inbox/").slice(0,5)
    appendToSection(file, "📥 Inbox", [f"> {count} 文件", ...files])

function fillYesterday(file, yesterday):
    yd = read(f"Periodic/daily/{year}/{yesterday}.md")
    review = extractSection(yd, "🌙 日終回顧")
    appendToSection(file, "🔄 昨日回顾", review)
```

---

> 📎 关联: [[Skill-daily-open\|设计]] | [[SRS-daily-open-原型设计\|原型]] | [[SRS-daily-open-需求说明书\|需求]]
