---
title: 六边形AI数字大脑 — 完整模板文件包
aliases: [Hexagon AI Digital Brain Template]
tags: [template, pkm, ai, starter-kit]
created: 2026-06-01
type: template-pack
---

# 六边形AI数字大脑 — 完整模板文件包

> 一键部署你的 AI 知识管理系统。6 个核心模板，30 分钟启动。

---

## 六边形架构

```
         📥 捕获
          ╱    ╲
    📚 编译    🧭 组织
       ╲      ╱
    🔍 检索    🔗 连接
          ╲    ╱
         🌱 生长
```

---

## 模板 1：CLAUDE.md（根宪法）

```yaml
# CLAUDE.md

## Vault 架构
三层架构：Inbox → PARA 行动层 → Wiki 知识层

## 核心规则
1. 永远不修改 raw/ 目录 — 原始资料人类独占
2. 永远不删除文件 — 只移动到 Archives/
3. 所有 Wiki 页面必须标注 Sources
4. Inbox 分拣前不读取

## 信息生命周期
ephemeral → operational → reference → evergreen
```

📁 位置：`CLAUDE.md`

---

## 模板 2：日记模板

```yaml
---
type: daily
date: {{date}}
week: {{week}}
created: {{date}}
lifecycle: ephemeral
---

# {{date}} {{day}}

## 🌅 今日意图
> 今天最重要的一件事：

## 📋 任务
## 📥 Inbox
## 📝 工作日志
## 💡 Fleeting Ideas
## 🤖 Agent 操作记录
## 🌙 日终回顾
- 完成了什么：
- 明日最重要：
```

📁 位置：`_templates/daily.md`

---

## 模板 3：项目启动模板

```yaml
---
title: [项目名]
type: project
status: active
created: {{date}}
deadline: {{deadline}}
---

# [项目名]

## 🎯 目标
一句话描述项目要达成的结果。

## 📋 任务
- [ ] 任务1
- [ ] 任务2

## 📝 日志
| 日期 | 进展 |
|------|------|

## 🔗 关联
- 所属领域：[[2 Areas/xxx]]
- 参考资料：[[3 Resources/xxx]]
```

📁 位置：`_templates/project.md`

---

## 模板 4：概念卡片

```yaml
---
aliases: [英文别名]
created: {{date}}
type: concept
topic: [领域]
status: evergreen
---

# [概念名称]

## 一句话
[核心定义]

## 关键要素
- 

## 为什么重要
- 

## 相关
- [[]] · [[]]
```

📁 位置：`_templates/concept.md`

---

## 模板 5：Wiki 编译模板

```yaml
---
aliases: []
created: {{date}}
type: wiki-concept
topic: [topic]
sources: []
---

# [概念]

## 定义
[1-2句]

## 核心原理

## 与其他概念的关系
- [[]] — 

## Sources
- [[]]
```

📁 位置：`_templates/wiki-concept.md`

---

## 模板 6：Inbox 快速捕获

```markdown
# {{title}}

> 捕获时间：{{datetime}}

## 内容

## 来源
- URL:
- 作者:

## 初步判断
- [ ] ephemeral（任务/待办）
- [ ] operational（项目相关）
- [ ] reference（参考资料）
- [ ] evergreen（长期知识）
```

📁 位置：`_templates/inbox-capture.md`

---

## 完整目录结构

```
my-vault/
├── CLAUDE.md                  ✅ 根宪法
├── 0 Inbox/                   📥 唯一入口
├── 1 Projects/                🎯 有截止日期的任务
├── 2 Areas/                   🧭 持续维护的责任
│   ├── 01-Health/
│   ├── 02-Career/
│   ├── 03-Finance/
│   ├── 04-Relationships/
│   └── 05-Learning/
├── 3 Resources/               📚 知识资源
│   └── [topic]/
│       ├── raw/               (人类写入)
│       ├── wiki/              (AI 写入)
│       └── outputs/
├── 4 Archives/                🗄️ 归档
├── _templates/                📋 模板库
├── Periodic/                  📅 周期笔记
│   └── daily/
└── AI-Log/                    🤖 操作日志
```

---

## 30 分钟启动清单

| 时间 | 任务 |
|:---:|------|
| 0-5min | 创建目录结构 |
| 5-10min | 复制 CLAUDE.md |
| 10-15min | 创建 6 个模板 |
| 15-20min | 配置 Obsidian |
| 20-30min | 写第一份日记 + 丢第一条 Inbox |

---

## 六边形检查清单

- [ ] 📥 捕获 — Inbox 是否唯一入口？
- [ ] 🧭 组织 — PARA 四目录是否已建立？
- [ ] 🔗 连接 — 是否开始使用 [[wikilink]]？
- [ ] 📚 编译 — wiki/ 是否已有第一个概念页？
- [ ] 🔍 检索 — 能否 3 秒内找到上周的笔记？
- [ ] 🌱 生长 — AI Log 是否在持续记录？
