---
aliases: [Context Prototype, 上下文原型]
created: 2026-05-31
type: prototype
topic: context
parent: "[[SRS-context-需求说明书]]"
tags: [prototype, context, ux]
---

# /context 原型设计

> 基于 [[SRS-context-需求说明书]] 的交互原型

---

## 1. `--quick` 快速概览

```
/context --quick
```

```
📍 Context — 2026-05-31

| 指标 | 数值 | 状态 |
|------|:----:|:----:|
| 活跃项目 | 5 | 🟢 |
| Inbox 积压 | 8 | 🟡 |
| 待编译 raw/ | 3 | 🟡 |
| Wiki 页面 | 89 | 🟢 |
| 上次 lint | 2026-05-28 | 🟡 (3天前) |
| Git 状态 | dirty | 🟡 |

💡 建议: 运行 /triage 处理 8 个 Inbox 文件
```

## 2. `--projects`

```
/context --projects
```

```
🎯 活跃项目（5 个）:

| 项目 | 状态 | 截止 | 最后更新 | 建议 |
|------|:----:|------|:--------:|------|
| PARA+LLM-Wiki | ✅ complete | — | 今天 | 已完成 |
| ESP32 机器人 | 🟢 active | 2026-06-15 | 3天前 | 继续开发 |
| AutoCAD 学习 | 🟡 stalled | — | 30天前 | ⚠️ 考虑归档 |
| Hermes Agent | 🟢 active | 2026-07-01 | 1天前 | 继续 |
| IOTO 学习 | 🔴 overdue | 2026-05-15 | 45天前 | 🔴 已过期 |
```

## 3. `--inbox`

```
/context --inbox
```

```
📥 Inbox — 8 文件

| 指标 | 数值 |
|------|:----:|
| 总文件 | 8 |
| 最旧 | 5 天前 |
| Clippings/ | 5 |
| 根目录 | 3 |

📂 待处理:
- Applied Sciences + LLM-Wiki.md (5天前)
- 004.45-嵌入式.md (3天前)
- ...

💡 /triage --dry-run 预览分拣
```

## 4. `--summary`

```
/context --summary
```

```
💡 操作建议 — 2026-05-31

🔴 P0:
1. Inbox 积压 8 文件 — /triage

🟡 P1:
2. 3 raw/ 待编译 — /wiki-compile [topic]
3. 距上次 /lint 3 天 — 建议本周运行

ℹ️ P2:
4. 项目 "IOTO" 过期 45 天 — 考虑归档
```

---

> 📎 关联: [[SRS-context-需求说明书\|需求]] | [[../设计文档/Skill 3-context\|设计]]
