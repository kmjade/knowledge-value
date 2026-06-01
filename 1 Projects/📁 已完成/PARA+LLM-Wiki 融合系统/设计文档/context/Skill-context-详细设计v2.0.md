---
aliases: [Context 详细设计, 上下文详细设计]
created: 2026-05-31
type: design-detail
topic: context
parent: "[[Skill 3-context]]"
tags: [design, context, architecture]
---

# /context 详细设计 v2.0

> 基于 [[SRS-context-原型设计|原型]] → 技术实现

---

## 1. 架构

```
/context
    │
    ├──[--quick]────► QuickPipeline (关键指标)
    ├──[--projects]──► ProjectPipeline (项目详情)
    ├──[--inbox]─────► InboxPipeline (积压详情)
    └──[--summary]───► SummaryPipeline (建议)
```

---

## 2. QuickPipeline — 快速概览

```
function quick():
    return {
        projects:   countActive("1 Projects/"),
        inbox:      countFiles("0 Inbox/", exclude="_processed"),
        raw:        countUncompiled("3 Resources/*/raw/"),
        wiki:       countWikiPages("3 Resources/*/wiki/"),
        lastLint:   readLastLintDate(),
        git:        gitStatus()
    }
```

**输出**: 6 指标表 + 1 建议

---

## 3. ProjectPipeline — 项目状态

```
function projects():
    list = []
    for proj in scan("1 Projects/"):
        fm = parseFrontmatter(proj)
        days = daysSince(proj.mtime)
        
        status = 
            fm.status == "archived":  skip
            days > 30:               "🟡 stalled"
            fm.deadline < today():    "🔴 overdue"
            else:                    "🟢 active"
        
        suggestion = 
            days > 30: "考虑归档"
            fm.deadline < today(): "🔴 已过期"
            else: "继续"
        
        list.append({proj, status, fm.deadline, days, suggestion})
    
    return list.sortBy(status_priority)
```

---

## 4. InboxPipeline — 积压详情

```
function inbox():
    files = scan("0 Inbox/", exclude="_processed/")
    stats = {
        total: files.length,
        oldest: max(files.map(f => daysSince(f.created))),
        byDir: groupBy(files, dir),
    }
    
    // 主题猜测
    preview = files.slice(0, 5).map(f => ({
        name: f.name,
        age: daysSince(f.created),
        guess: guessTopic(f.content)  // 快速关键词匹配
    }))
    
    return { stats, preview }
```

---

## 5. SummaryPipeline — 操作建议

```
THRESHOLDS = {
    inbox_high:     20,   // 🔴 立即分拣
    inbox_medium:    5,   // 🟡 日常分拣
    raw_uncompiled:  3,   // 🟡 编译知识库
    lint_gap:        7,   // 🟡 健康检查 (天)
    git_dirty:      true, // ℹ️ 建议提交
    project_stale:  30,   // 🟡 停滞警告 (天)
    project_overdue: 0,   // 🔴 过期 (天)
}

function summary():
    state = quick()  // 复用快速检查
    suggestions = []
    
    if state.inbox >= THRESHOLDS.inbox_high:
        suggestions.push({level: "🔴 P0", action: "/triage", reason: f"积压 {state.inbox} 文件"})
    elif state.inbox >= THRESHOLDS.inbox_medium:
        suggestions.push({level: "🟡 P2", action: "/triage", reason: f"积压 {state.inbox} 文件"})
    
    if state.raw >= THRESHOLDS.raw_uncompiled:
        suggestions.push({level: "🟡 P1", action: "/wiki-compile", reason: f"{state.raw} 待编译"})
    
    if daysSince(state.lastLint) >= THRESHOLDS.lint_gap:
        suggestions.push({level: "🟡 P1", action: "/lint", reason: f"距上次 {daysSince(state.lastLint)} 天"})
    
    for proj in projects():
        if proj.status == "🔴 overdue":
            suggestions.push({level: "🔴 P0", action: "处理或归档", reason: proj.name})
        elif proj.status == "🟡 stalled":
            suggestions.push({level: "ℹ️ P2", action: "考虑归档", reason: proj.name})
    
    return suggestions.sortBy(level)
```

---

## 6. 性能

| 模式 | 目标 | 策略 |
|------|:----:|------|
| `--quick` | < 30s | 仅统计，不读内容 |
| `--projects` | < 60s | 只读 Frontmatter |
| `--inbox` | < 45s | Top 5 文件猜测 |
| `--summary` | < 60s | 复用 quick + projects |

---

> 📎 关联: [[Skill 3-context\|设计]] | [[SRS-context-原型设计\|原型]] | [[SRS-context-需求说明书\|需求]]
