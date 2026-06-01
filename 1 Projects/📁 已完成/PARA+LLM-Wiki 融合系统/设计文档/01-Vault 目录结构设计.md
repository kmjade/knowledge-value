---
title: PARA × LLM-Wiki 融合系统 — 第一章：Vault 目录结构设计
source: https://mp.weixin.qq.com/s/uEAegrqhsM1WKcqlVfuE2w
author:
created: 2026-05-26
tags:
  - clippings
  - llm-wiki
  - vault-structure
chapter: 1
parent: "[[PARA+LLM-Wiki 融合系统]]"
---

## 第一章：Vault 目录结构设计（物理层）

### 1.1 完整目录树

```
~/ObsidianVault/               ← Vault 根目录（= Claude Code 工作目录）
│
├── CLAUDE.md                  ← 🧠 Agent 宪法（最重要的文件）
├── .gitignore                 ← Git 版本控制配置
│
├── .claude/                   ← Claude Code 配置目录
│   ├── skills/                ← 所有 Skills（/triage、/wiki-compile 等）
│   │   ├── triage.md          ← 核心：Inbox 分拣 Skill
│   │   ├── wiki-compile.md    ← 知识编译 Skill
│   │   ├── daily-open.md      ← 每日开启仪式 Skill
│   │   ├── weekly-review.md   ← 每周回顾 Skill
│   │   ├── context.md         ← 会话状态加载 Skill
│   │   └── lint.md            ← 系统健康检查 Skill
│   └── hooks/
│       └── hooks.json         ← SessionStart/Stop 自动钩子
│
├── 0-Inbox/                   ← 📥 唯一入口（永远只往这里扔东西）
│   ├── _processed/            ← 已分拣存档（不删除，留痕迹）
│   └── [新内容直接扔这里]
│
├── 1-Projects/                ← 🎯 活跃项目（有截止日期、有结果）
│   ├── _INDEX.md              ← 所有项目快照（Dataview 自动生成）
│   ├── [项目名]/
│   │   ├── README.md          ← 项目定义：目标、截止、状态
│   │   ├── tasks.md           ← 任务列表（Obsidian Tasks 格式）
│   │   ├── log.md             ← 追加式进展日志
│   │   └── refs/              ← 项目相关参考资料
│   └── ...
│
├── 2-Areas/                   ← 🏠 持续领域（无截止日期、持续维护）
│   ├── health/                ← 健康领域
│   ├── finance/               ← 财务领域
│   ├── family/                ← 家庭领域
│   ├── career/                ← 职业领域
│   └── [其他领域]/
│
├── 3-Resources/               ← 📚 资源库（LLM-Wiki 子库挂载点）
│   ├── _META-INDEX.md         ← 🗺️ 全局知识图谱入口（跨 Wiki 导航）
│   │
│   ├── [wiki-topic-1]/        ← 例：000 Knowledge/
│   │   ├── CLAUDE.md          ← 该 Wiki 子库的 schema（覆盖根 CLAUDE.md）
│   │   ├── raw/               ← 原始资料（LLM 只读，人类维护）
│   │   │   ├── articles/      ← 文章、网页剪辑
│   │   │   ├── papers/        ← 论文 PDF 或 MD
│   │   │   ├── books/         ← 书摘、读书笔记
│   │   │   └── conversations/ ← AI 对话记录（值得保留的部分）
│   │   ├── wiki/              ← LLM 编译产物（人类只读）
│   │   │   ├── index.md       ← 该主题总索引（每次编译更新）
│   │   │   ├── log.md         ← 编译日志（追加式）
│   │   │   ├── concepts/      ← 概念页
│   │   │   ├── entities/      ← 实体页（人物、工具、机构）
│   │   │   ├── sources/       ← 来源摘要页
│   │   │   └── comparisons/   ← 对比分析页
│   │   └── outputs/           ← 基于 Wiki 生成的制品（报告、文章草稿）
│   │
│   ├── [wiki-topic-2]/        ← 例：300 Social Sciences/
│   ├── [wiki-topic-3]/        ← 例：400 Language/
│   ├── [wiki-topic-4]/        ← 例：500 Natural Sciences/
│   └── people/                ← 人物 CRM（特殊 Wiki，GBrain 模式）
│       ├── CLAUDE.md          ← 人物 Wiki schema
│       ├── raw/               ← 原始人物信息（会议记录、聊天记录）
│       └── wiki/
│           ├── index.md
│           └── [person-name].md  ← 人物页（分级丰富）
│
├── 04-Archive/                ← 🗄️ 归档（已完结项目、过期内容）
│   ├── projects/              ← 已完结项目
│   ├── ephemeral/             ← 过期 ephemeral 内容
│   └── [year]/                ← 按年归档
│
├── Periodic/                  ← 📅 周期笔记
│   ├── daily/
│   │   └── 2026/
│   │       └── 2026-05-11.md  ← 日记格式（LifeOS 模板）
│   ├── weekly/
│   ├── monthly/
│   ├── quarterly/
│   └── yearly/
│
├── 99-Meta/                   ← ⚙️ 系统元数据（不放内容）
│   ├── assets/                ← 图片、附件
│   ├── templates/             ← Templater 模板文件
│   ├── bases/                 ← Obsidian Bases 数据库视图
│   ├── scripts/               ← Python/Shell 辅助脚本
│   └── graphs/                ← 自定义 D3 图谱（可选）
│
└── AI-Log/                    ← 🤖 Agent 操作日志（审计追踪）
    ├── sessions/              ← 每次 Claude Code 会话摘要
    ├── triage-log.md          ← 分拣操作追加日志
    └── compile-log.md         ← Wiki 编译操作追加日志
```

### 1.2 目录设计的关键决策解释

**为什么 `03-Resources/` 是 Wiki 子库的挂载点？**

标准 LLM-Wiki 的三层架构是： `raw/` （不可修改的源文件）、 `wiki/` （LLM 生成的页面）、 `CLAUDE.md` （schema 配置）。LLM 读取这些文件但永远不修改它们。它们是核实基线：wiki 中的每个声明都可以追溯到 raw/ 中的某个文件。 将这个结构嵌套在 `03-Resources/[topic]/` 下，天然契合 PARA 的 Resources 层级。

**为什么有 `AI-Log/` 目录？**

/AI `文件夹（本设计中为` AI-Log/\`）是 Claude Code 写入其输出的地方——会话摘要、生成的草稿、任务日志。随着时间推移，这个文件夹成为 Agent 为你做过所有事情的完整记录。

**为什么有 `_META-INDEX.md` ？**

当你有多个 Wiki 子库时，需要一个跨域入口。LLM-Wiki 的 deep 查询深度会读取所有内容、搜索原始来源、并查看兄弟 Wiki——用于复杂问题。 `_META-INDEX.md` 是这个跨域查询的导航地图。

---

> 📂 返回 [[4 Archives/by-type/Projects/LifeOS × LLM-Wiki 融合系统|目录索引]]
