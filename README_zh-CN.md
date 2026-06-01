---
language: zh-cn
updated: 2026-05-31
---

# 🧠 knowledge-value — PARA × LLM-Wiki 融合系统

![PARA Method](https://img.shields.io/badge/PARA-Method-blue?style=for-the-badge)
![Obsidian](https://img.shields.io/badge/Obsidian-📎-7C3AED?style=for-the-badge)
![Claude Code](https://img.shields.io/badge/Claude-Code-🤖-10B981?style=for-the-badge)
![License](https://img.shields.io/badge/License-Apache--2.0-FF6B6B?style=for-the-badge)

[English](README.md) | [[README_zh-CN|简体中文]] | [[README_zh-TW|繁体中文]]

---

## 概述

> 基于 **PARA 方法论** 与 **LLM-Wiki** 深度融合的个人知识管理系统。Claude Code 作为 AI Agent，在 Obsidian Vault 中承担信息路由与知识编译的职责——从「检索」到「编译」，将维护成本降到零。

**核心理念**：一个 Vault、全部 Markdown、Claude Code 完全可访问。人类是信息的生产者和消费者，AI 负责中间所有的整理工作。

---

## 目录

- [系统架构](#-系统架构)
- [Vault 结构](#-vault-结构)
- [PARA 分类法](#-para-分类法)
- [DDC Wiki 子库](#-ddc-wiki-子库)
- [_INDEX 导航系统](#-index-导航系统)
- [核心规则](#-核心规则)
- [工作流程](#-工作流程)
- [Skills 技能库](#-skills-技能库)
- [标签系统](#-标签系统)
- [快速开始](#-快速开始)
- [文档资源](#-文档资源)

---

## 🏗️ 系统架构

```
┌─────────────────────────────────────────────────────────────┐
│                 📥 Layer 1 — 信息捕获层                      │
│            0 Inbox/ → /triage 智能分拣                       │
└──────────────────────────┬──────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                 🧭 Layer 2 — PARA 行动管理层                 │
│    1 Projects/ → 2 Areas/ → 3 Resources/ → 4 Archives/     │
└──────────────────────────┬──────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                 📚 Layer 3 — Wiki 知识编译层                 │
│        raw/ → /wiki-compile → wiki/ → outputs/              │
│          (人类写入·AI只读)      (AI独占·人类只读)            │
└─────────────────────────────────────────────────────────────┘
                           ↕
                   🧠 CLAUDE.md 根宪法
                   Skills 技能库驱动
```

![[_meta/diagram/para-llm-wiki-architecture.svg]]

---

## 📁 Vault 结构

```
knowledge-value/
├── 📥 0 Inbox/                  # 唯一入口 — 所有信息汇集处
│   ├── _INDEX.md               #   收件箱快速导航
│   ├── _processed/             #   已分拣存档
│   ├── Clippings/              #   网页剪藏
│   └── [临时文件直接放这里]
│
├── 🎯 1 Projects/              # 有截止日期的短期任务
│   ├── _INDEX.md               #   项目快速导航
│   ├── Creative/               #   创作类
│   ├── Learning/               #   学习类 (AutoCAD, ESP32, Python…)
│   ├── Personal/               #   个人类
│   ├── Work/                   #   工作类
│   └── 📁 已完成/              #   已完成项目
│
├── 🧭 2 Areas/                 # 持续维护的生活责任
│   ├── _INDEX.md               #   领域快速导航
│   ├── 01-Health/              #   健康
│   ├── 02-Career/              #   职业
│   ├── 03-Finance/             #   财务
│   ├── 04-Relationships/       #   人际
│   ├── 05-Learning/            #   学习
│   └── 06-Lifestyle/           #   生活
│
├── 📚 3 Resources/             # 知识资源库 + DDC Wiki 子库
│   ├── _INDEX.md               #   资源快速导航
│   ├── _META-INDEX.md          #   全局知识图谱入口
│   ├── 000 Knowledge/          #   知识组织 (DDC 000)
│   ├── 300 Social Sciences/    #   社会科学 (DDC 300)
│   ├── 400 Language/           #   语言 (DDC 400)
│   ├── 500 Natural Sciences/   #   自然科学 (DDC 500)
│   ├── 600 Applied Sciences/   #   应用科学 (DDC 600)
│   └── 700 Arts/               #   艺术 (DDC 700)
│
├── 🗄️ 4 Archives/              # 已完成项目 · 过时资源
│   └── _INDEX.md               #   归档快速导航
│
├── ⚙️ _meta/                   # 系统元数据
│   ├── _INDEX.md               #   Vault 总仪表板
│   ├── ⚙️ 系统配置/            #   模板·标签·结构配置
│   └── 🔗 知识关联/            #   Dashboard & Index
│
├── 📋 _templates/              # 模板库
├── 🤖 AI-Log/                  # AI 操作日志 (sessions, triage-log, compile-log)
├── 📐 CLAUDE.md                # Agent 根宪法 (最重要的文件)
└── 📖 README.md                # 本文件
```

---

## 📊 PARA 分类法

| 分类 | 文件夹 | 说明 | 判断标准 |
|:---:|--------|------|----------|
| 🔴 **Projects** | `1 Projects/` | 有明确目标和截止日期的短期任务 | "有截止日期吗？"→ 是 |
| 🟢 **Areas** | `2 Areas/` | 持续维护，没有「完成」状态 | "需要持续维护吗？"→ 是 |
| 🔵 **Resources** | `3 Resources/` | 感兴趣的主题、参考资料 | "感兴趣但不需要立即行动？"→ 是 |
| ⚪ **Archives** | `4 Archives/` | 已完成/过时/不再需要 | 以上都不是 → 归档 |

### 决策树

```
❓ 有明确目标和截止日期吗？
  └─ ✅ 是 → 1 Projects
  └─ ❌ 否 → 需要持续维护吗？
               └─ ✅ 是 → 2 Areas
               └─ ❌ 否 → 有参考价值吗？
                           └─ ✅ 是 → 3 Resources
                           └─ ❌ 否 → 4 Archives
```

---

## 🏛️ DDC Wiki 子库

知识资源按 **杜威十进分类法 (DDC)** 组织为 Wiki 子库（活跃子库在 `3 Resources/`，已归档子库在 `4 Archives/`）：

| DDC | 子库 | 位置 | 状态 | 说明 |
|:---:|------|------|:---:|------|
| 000 | [[000 Knowledge\|知识组织]] | `3 Resources/` | 🟢 | 信息科学·知识管理·计算机科学 |
| 100 | 哲学·心理学 | `4 Archives/` | 🗄️ | 古典哲学·易经·心理学 |
| 200 | 宗教·神学 | `4 Archives/` | 🗄️ | 基督教神学·宗教哲学 |
| 300 | [[300 Social Sciences\|社会科学]] | `3 Resources/` | 🟢 | 社会学·教育·公共行政 |
| 400 | [[400 Language\|语言学科]] | `3 Resources/` | 🟡 | 语言学概论·汉语·印欧语系 |
| 500 | [[500 Natural Sciences\|自然科学]] | `3 Resources/` | 🟢 | 数学·物理·化学·生物 |
| 600 | [[600 Applied Sciences\|应用科学]] | `3 Resources/` | 🟢 | 医学·工程·制造·管理 |
| 700 | [[700 Arts\|艺术]] | `3 Resources/` | 🟡 | 绘画·音乐·设计·书法 |
| 800 | 文学 | `4 Archives/` | 🗄️ | 中外文学·文学理论 |
| 900 | 历史·地理 | `4 Archives/` | 🗄️ | 传记·世界历史 |

每个子库结构：
```
[Topic]/
├── CLAUDE.md          # 子库 schema
├── raw/               # 原始资料 (人类独占 · AI 只读)
├── wiki/              # 编译产物 (AI 独占 · 人类只读)
│   ├── concepts/      #   概念页面
│   ├── entities/      #   实体页面
│   └── sources/       #   来源溯源
└── outputs/           # 基于 Wiki 生成的制品
```

---

## 🧭 _INDEX 导航系统

每个 PARA 目录配备了 MOC 式 `_INDEX.md` 快速入口：

| 入口 | 用途 |
|------|------|
| [[_meta/_INDEX\|Vault 总仪表板]] | 全局导航 + 信息流图 + 系统链接 |
| [[0 Inbox/_INDEX\|Inbox 入口]] | 待分拣区域 + 分拣工作流 |
| [[1 Projects/_INDEX\|项目入口]] | Creative/Learning/Personal/Work 四分类 |
| [[2 Areas/_INDEX\|领域入口]] | 六大领域 + 检视频率 + 领域↔项目流 |
| [[3 Resources/_INDEX\|资源入口]] | DDC 子库导航 + Wiki 编译流 |
| [[4 Archives/_INDEX\|归档入口]] | 按类型/时间/状态三维归档 |

---

## ⛔ 核心规则

来自 [[CLAUDE]] — 绝对不可违反：

| # | 规则 | 说明 |
|:---:|------|------|
| 1 | **禁止修改 `raw/`** | 原始资料是人类的知识基线，AI 只读 |
| 2 | **永不删除文件** | 只移动到 `4 Archives/`，删除需二次确认 |
| 3 | **Wiki 必须有 Sources** | 每个编译页面标注来源 raw/ 文件 |
| 4 | **Inbox 分拣前不读取** | 防止未分拣信息污染 Wiki |

---

## 🔄 工作流程

### 端到端信息流

```
📥 捕获 ──→ /triage ──→ {1 Projects · 2 Areas · 3 Resources} ──→ raw/
                                                                      │
                                                               /wiki-compile
                                                                      │
                                                                      ▼
                                                                   wiki/
                                                                      │
                                                                      ▼
                                                                 outputs/
```

### 每日工作流

| 时刻 | 操作 | 命令 |
|------|------|------|
| 🌅 早晨 | 加载会话状态 | `/context` |
| 🌅 早晨 | 创建/初始化今日日记 | `/daily-open` |
| 📥 全天 | 所有信息扔进 Inbox | 手动 / Web Clipper |
| 🌙 睡前 | 分拣 Inbox | `/triage` |

### 每周工作流

| 时刻 | 操作 | 命令 |
|------|------|------|
| 📅 周末 | 周回顾 + 知识蒸馏 + 过期归档 | `/weekly-review` |
| 🔍 随时 | 系统健康检查 | `/lint` |

---

## 🤖 Skills 技能库

| 命令 | 功能 | 说明 |
|------|------|------|
| `/triage` | 📥 智能分拣 | 分析 Inbox 文件 → 路由到 PARA + Wiki raw/ |
| `/wiki-compile` | 📚 知识编译 | raw/ → 提取概念/实体 → 写入 wiki/ |
| `/context` | 📍 状态加载 | 加载活跃项目、今日待办、Inbox 状态 |
| `/daily-open` | 🌅 每日开启 | 创建今日日记 + 自动填充任务 |
| `/weekly-review` | 📊 每周回顾 | 汇总周数据 + 批量编译 + 过期归档 |
| `/lint` | 🔍 健康检查 | 死链检测·孤立页·未编译原料·矛盾汇总 |

### 辅助 Skills

| 命令 | 功能 |
|------|------|
| `/search` | 🔍 搜索内容 |
| `/obsidian` | 📎 Obsidian 语法/插件辅助 |
| `/first-cn-zh` | 简体中文优先 |
| `/english-first` | English First |

---

## 🏷️ 标签系统

统一标签体系，覆盖 PARA、状态、知识分类：

| 类别 | 标签示例 | 用途 |
|------|----------|------|
| **PARA** | `#project/`, `#area/`, `#resource/` | 按可执行性分类 |
| **状态** | `#status/active`, `#status/archived` | 生命周期跟踪 |
| **类型** | `#type/concept`, `#type/entity`, `#type/daily` | 笔记类型 |
| **专题** | `#topic/ai-ml`, `#topic/philosophy` | 主题归类 |
| **生命周期** | `#lifecycle/ephemeral`, `#lifecycle/evergreen` | 信息时效分级 |

完整规范见 [[_meta/⚙️ 系统配置/tag-system-guide|标签系统指南]] 和 [[_meta/⚙️ 系统配置/tag-quick-reference|快速参考]]。

---

## 🚀 快速开始

1. **打开 Obsidian** → 加载 `knowledge-value` Vault
2. **启动 Claude Code** → `claude` 在 Vault 根目录
3. **加载状态** → `/context`
4. **开始捕获** → 所有新信息直接扔进 `0 Inbox/`
5. **分拣整理** → `/triage`
6. **编译知识** → `/wiki-compile [topic]`

### 最小可用集

只需三个文件就能启动：

- `CLAUDE.md` — Agent 宪法
- `.claude/skills/triage.md` — 分拣引擎
- `.claude/skills/wiki-compile.md` — 知识编译

---

## 📚 文档资源

### 核心文档

| 文档                                                                                  | 说明                     | 优先级 |
| ----------------------------------------------------------------------------------- | ---------------------- | :-: |
| [[CLAUDE]]                                                                          | Claude Code 根宪法 + 系统指令 | ⭐⭐⭐ |
| [[1 Projects/📁 已完成/PARA+LLM-Wiki 融合系统/PARA+LLM-Wiki 融合系统\|PARA × LLM-Wiki 融合系统]] | 完整架构设计文档 v1.0          | ⭐⭐⭐ |
| [[_meta/_INDEX]]                                                                    | Vault 总仪表板             | ⭐⭐  |
| [[3 Resources/_META-INDEX]]                                                         | 全局 Wiki 导航             | ⭐⭐  |

### 系统配置

| 文档 | 说明 |
|------|------|
| [[_meta/⚙️ 系统配置/⚙️ 系统配置]] | 系统配置总览 |
| [[_meta/⚙️ 系统配置/tag-system-guide]] | 标签系统完整指南 |
| [[_meta/⚙️ 系统配置/知识库结构概览]] | Vault 结构详细说明 |
| [[_meta/⚙️ 系统配置/PARA 模板库]] | 模板索引 |

---

## 常见问题

<details>
<summary>如何开始使用？</summary>

1. 打开 Obsidian，加载本 Vault
2. 所有新信息直接放进 `0 Inbox/`
3. 运行 `/triage` 让 AI 自动分拣
4. 运行 `/wiki-compile [topic]` 编译知识

</details>

<details>
<summary>PARA 和 LLM-Wiki 如何协同？</summary>

- **PARA** — 按可执行性组织（Projects/Areas/Resources/Archives）
- **LLM-Wiki** — 按知识深度组织（raw/ → wiki/ → outputs/）
- 两者通过 `3 Resources/` 融合——它是 Resources 文件夹，也是 Wiki 子库挂载点

</details>

<details>
<summary>AI 能修改我的笔记吗？</summary>

分区域控制：
- `0 Inbox/` — AI 读取并分拣
- `1 Projects/`, `2 Areas/` — AI 辅助整理
- `3 Resources/raw/` — **人类独占**，AI 只读
- `3 Resources/wiki/` — **AI 独占**，人类只读
- `4 Archives/` — AI 自动归档

</details>

<details>
<summary>如何添加新笔记？</summary>

1. 所有内容先进 `0 Inbox/`（手动、Web Clipper、移动端均可）
2. 运行 `/triage` — AI 自动分析时效性/主题/人物，路由到正确位置
3. 参考资料进入 `raw/` 后，运行 `/wiki-compile` 编译为 Wiki 页面

</details>

<details>
<summary>支持多语言吗？</summary>

是的！系统支持 简体中文（默认）、繁体中文、English。

</details>

---

## 联系方式

| 渠道 | 链接 |
|------|------|
| 🐙 **GitHub** | [knowledge-value](https://github.com/kmjade/knowledge-value.git) |
| 🐛 **Issues** | [报告问题](https://github.com/kmjade/knowledge-value/issues) |

---

## 许可证

<div align="center">

Apache License 2.0

</div>

---

> 💡 **提示**：不确定从哪里开始？运行 `/context` 加载当前状态，AI 会告诉你今天该做什么。

**🌟 一个 Vault，全部知识，AI 驱动。**

---

<div align="center">

Made with ❤️ by knowledge-value Team

</div>
