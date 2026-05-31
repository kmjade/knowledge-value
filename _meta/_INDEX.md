---
aliases:
  - Vault Index
  - 总入口
  - Dashboard
created: 2026-05-26
updated: 2026-05-31
type: meta
tags:
  - meta/index
  - meta/dashboard
---

# 🏠 Vault 总览

> PARA × LLM-Wiki 融合系统 — 知识管理中枢

---

## 🧭 PARA 导航

| # | 目录 | 入口 | 职责 |
|---|------|------|------|
| 📥 | **Inbox** | [[0 Inbox/_INDEX\|→ 收集箱]] | 临时捕获，待分拣 |
| 📋 | **Projects** | [[1 Projects/_INDEX\|→ 项目]] | 有截止日期的短期任务 |
| 🧭 | **Areas** | [[2 Areas/_INDEX\|→ 领域]] | 持续维护的生活责任 |
| 📚 | **Resources** | [[3 Resources/_INDEX\|→ 资源]] | 知识库 & Wiki 编译 |
| 🗄️ | **Archives** | [[4 Archives/_INDEX\|→ 归档]] | 已完成 & 过时内容 |

---

## 📊 Vault 状态

```dataview
TABLE WITHOUT ID
  length(rows) AS "文件数",
  sum(rows.file.size) AS "总大小"
FROM "/"
GROUP BY true
```

### 最近更新

```dataview
TABLE file.mtime AS "更新时间"
FROM "/"
WHERE file.name != this.file.name
SORT file.mtime DESC
LIMIT 10
```

---

## ⚙️ 系统

| 模块 | 入口 | 说明 |
|------|------|------|
| 🔧 系统配置 | [[_meta/⚙️ 系统配置/⚙️ 系统配置\|→ 配置]] | 模板、标签、结构 |
| 🔗 知识关联 | [[_meta/🔗 知识关联/🔗 知识关联\|→ 关联]] | Dashboard & Index |
| 📝 AI 日志 | [[AI-Log/]] | 分拣 & 编译日志 |
| 📐 CLAUDE.md | [[CLAUDE]] | 系统指令 |

---

## 🚀 快速操作

- `/triage` — 分拣 Inbox
- `/wiki-compile` — 编译 Wiki
- `/context` — 加载会话状态
- `/lint` — 系统健康检查

---

## 🔄 信息流

```
📥 0 Inbox  ──/triage──▶  1 Projects (短期)
                │
                ├────────▶  2 Areas (持续)
                │
                └────────▶  3 Resources  ──/wiki-compile──▶  wiki/
                              │
                              ▼
                          4 Archives (完成/过时)
```

---

*最后更新: 2026-05-31*
