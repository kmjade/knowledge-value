---
language: en-US
updated: 2026-06-01
---

# 🧠 knowledge-value — PARA × LLM-Wiki Fusion System

![PARA Method](https://img.shields.io/badge/PARA-Method-blue?style=for-the-badge)
![Obsidian](https://img.shields.io/badge/Obsidian-📎-7C3AED?style=for-the-badge)
![Claude Code](https://img.shields.io/badge/Claude-Code-🤖-10B981?style=for-the-badge)
![License](https://img.shields.io/badge/License-Apache--2.0-FF6B6B?style=for-the-badge)

[English](README.md) | [[README_zh-CN|简体中文]] | [[README_zh-TW|繁体中文]]

---

## Overview

> A personal knowledge management system based on deep **PARA + LLM-Wiki** fusion. Claude Code serves as the AI Agent within an Obsidian Vault, handling information routing and knowledge compilation — shifting from "retrieval" to "compilation", driving maintenance costs to zero.

**Core philosophy**: One Vault. All Markdown. Fully accessible to Claude Code. Humans produce and consume information; AI handles everything in between.

---

## TOC

- [System Architecture](#-system-architecture)
- [Vault Structure](#-vault-structure)
- [PARA Methodology](#-para-methodology)
- [DDC Wiki Sub-Libraries](#-ddc-wiki-sub-libraries)
- [_INDEX Navigation](#-index-navigation)
- [Core Rules](#-core-rules)
- [Workflows](#-workflows)
- [Skills](#-skills)
- [Tag System](#-tag-system)
- [Quick Start](#-quick-start)
- [Documentation](#-documentation)

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                 📥 Layer 1 — Information Capture             │
│            0 Inbox/ → /triage intelligent routing            │
└──────────────────────────┬──────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                 🧭 Layer 2 — PARA Action Management          │
│    1 Projects/ → 2 Areas/ → 3 Resources/ → 4 Archives/     │
└──────────────────────────┬──────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                 📚 Layer 3 — Wiki Knowledge Compilation      │
│        raw/ → /wiki-compile → wiki/ → outputs/              │
│       (human-write·AI-read)   (AI-write·human-read)         │
└─────────────────────────────────────────────────────────────┘
                           ↕
                   🧠 CLAUDE.md Root Constitution
                   Skills System Driving
```

![[_meta/diagram/para-llm-wiki-architecture.svg]]

---

## 📁 Vault Structure

```
knowledge-value/
├── 📥 0 Inbox/                  # Sole entry point — all info lands here
│   ├── _INDEX.md               #   Inbox quick navigation
│   ├── _processed/             #   Processed archive
│   ├── Clippings/              #   Web clips
│   └── [temp files go here]
│
├── 🎯 1 Projects/              # Short-term tasks with deadlines
│   ├── _INDEX.md               #   Project quick navigation
│   ├── Creative/               #   Creative
│   ├── Learning/               #   Learning (AutoCAD, ESP32, Python…)
│   ├── Personal/               #   Personal
│   ├── Work/                   #   Work
│   └── 📁 已完成/              #   Completed projects
│
├── 🧭 2 Areas/                 # Ongoing life responsibilities
│   ├── _INDEX.md               #   Area quick navigation
│   ├── 01-Health/              #   Health
│   ├── 02-Career/              #   Career
│   ├── 03-Finance/             #   Finance
│   ├── 04-Relationships/       #   Relationships
│   ├── 05-Learning/            #   Learning
│   └── 06-Lifestyle/           #   Lifestyle
│
├── 📚 3 Resources/             # Knowledge base + DDC Wiki sub-libraries
│   ├── _INDEX.md               #   Resource quick navigation
│   ├── _META-INDEX.md          #   Global knowledge graph entry
│   ├── 000 Knowledge/          #   Knowledge organization (DDC 000)
│   ├── 300 Social Sciences/    #   Social sciences (DDC 300)
│   ├── 400 Language/           #   Language (DDC 400)
│   ├── 500 Natural Sciences/   #   Natural sciences (DDC 500)
│   ├── 600 Applied Sciences/   #   Applied sciences (DDC 600)
│   └── 700 Arts/               #   Arts (DDC 700)
│
├── 🗄️ 4 Archives/              # Completed projects · outdated resources
│   └── _INDEX.md               #   Archive quick navigation
│
├── ⚙️ _meta/                   # System metadata
│   ├── _INDEX.md               #   Vault dashboard
│   ├── ⚙️ 系统配置/            #   Templates·Tags·Structure config
│   └── 🔗 知识关联/            #   Dashboard & Index
│
├── 📋 _templates/              # Template library
├── 🤖 AI-Log/                  # AI operation logs (sessions, triage, compile)
├── 📐 CLAUDE.md                # Agent root constitution (most important)
└── 📖 README.md                # This file
```

---

## 📊 PARA Methodology

| Category | Folder | Description | Decision Rule |
|:---:|--------|------|------|
| 🔴 **Projects** | `1 Projects/` | Short-term tasks with clear goals & deadlines | "Has a deadline?" → Yes |
| 🟢 **Areas** | `2 Areas/` | Ongoing maintenance, no "done" state | "Needs ongoing maintenance?" → Yes |
| 🔵 **Resources** | `3 Resources/` | Topics of interest, reference materials | "Interested but no immediate action?" → Yes |
| ⚪ **Archives** | `4 Archives/` | Completed / outdated / no longer needed | None of the above → Archive |

### Decision Tree

```
❓ Has a clear goal and deadline?
  └─ ✅ Yes → 1 Projects
  └─ ❌ No → Needs ongoing maintenance?
               └─ ✅ Yes → 2 Areas
               └─ ❌ No → Has reference value?
                           └─ ✅ Yes → 3 Resources
                           └─ ❌ No → 4 Archives
```

---

## 🏛️ DDC Wiki Sub-Libraries

Knowledge resources organized by **Dewey Decimal Classification** (active in `3 Resources/`, archived in `4 Archives/`):

| DDC | Sub-Library | Location | Status | Description |
|:---:|------|------|:---:|------|
| 000 | [[000 Knowledge\|Knowledge Org.]] | `3 Resources/` | 🟢 | Info science·KM·Computer science |
| 100 | Philosophy & Psychology | `4 Archives/` | 🗄️ | Classical philosophy·I Ching·Psychology |
| 200 | Religion & Theology | `4 Archives/` | 🗄️ | Christian theology·Philosophy of religion |
| 300 | [[300 Social Sciences\|Social Sciences]] | `3 Resources/` | 🟢 | Sociology·Education·Public admin |
| 400 | [[400 Language\|Language]] | `3 Resources/` | 🟡 | Linguistics·Chinese·Indo-European |
| 500 | [[500 Natural Sciences\|Natural Sciences]] | `3 Resources/` | 🟢 | Math·Physics·Chemistry·Biology |
| 600 | [[600 Applied Sciences\|Applied Sciences]] | `3 Resources/` | 🟢 | Medicine·Engineering·Manufacturing |
| 700 | [[700 Arts\|Arts]] | `3 Resources/` | 🟡 | Painting·Music·Design·Calligraphy |
| 800 | Literature | `4 Archives/` | 🗄️ | World literature·Literary theory |
| 900 | History & Geography | `4 Archives/` | 🗄️ | Biography·World history |

Each sub-library structure:
```
[Topic]/
├── CLAUDE.md          # Sub-library schema
├── raw/               # Raw materials (human-write · AI-read)
├── wiki/              # Compiled output (AI-write · human-read)
│   ├── concepts/      #   Concept pages
│   ├── entities/      #   Entity pages
│   └── sources/       #   Source tracing
└── outputs/           # Wiki-based artifacts
```

---

## 🧭 _INDEX Navigation

Each PARA directory has an MOC-style `_INDEX.md` quick entry:

| Entry | Purpose |
|------|------|
| [[_meta/_INDEX\|Vault Dashboard]] | Global navigation + info flow + system links |
| [[0 Inbox/_INDEX\|Inbox Entry]] | Pending sort areas + triage workflow |
| [[1 Projects/_INDEX\|Project Entry]] | Creative/Learning/Personal/Work categories |
| [[2 Areas/_INDEX\|Area Entry]] | Six areas + review frequency + area↔project flow |
| [[3 Resources/_INDEX\|Resource Entry]] | DDC sub-library nav + Wiki compile flow |
| [[4 Archives/_INDEX\|Archive Entry]] | By type/time/status navigation |

---

## ⛔ Core Rules

From [[CLAUDE]] — absolutely must not be violated:

| # | Rule | Description |
|:---:|------|------|
| 1 | **Never modify `raw/`** | Raw materials are the human knowledge baseline, AI read-only |
| 2 | **Never delete files** | Only move to `4 Archives/`, deletion requires confirmation |
| 3 | **Wiki must have Sources** | Every compiled page must cite its source raw/ files |
| 4 | **Don't read Inbox before triage** | Prevents un-triaged info from contaminating Wiki |

---

## 🔄 Workflows

### End-to-End Information Flow

```
📥 Capture ──→ /triage ──→ {1 Projects · 2 Areas · 3 Resources} ──→ raw/
                                                                         │
                                                                  /wiki-compile
                                                                         │
                                                                         ▼
                                                                      wiki/
                                                                         │
                                                                         ▼
                                                                    outputs/
```

### Daily Workflow

| Time | Action | Command |
|------|------|------|
| 🌅 Morning | Load session state | `/context` |
| 🌅 Morning | Create today's journal | `/daily-open` |
| 📥 All day | Dump everything into Inbox | Manual / Web Clipper |
| 🌙 Evening | Triage Inbox | `/triage` |

### Weekly Workflow

| Time | Action | Command |
|------|------|------|
| 📅 Weekend | Weekly review + batch compile + archive | `/weekly-review` |
| 🔍 Anytime | System health check | `/lint` |

---

## 🤖 Skills

| Command | Function | Description |
|------|------|------|
| `/triage` | 📥 Smart Triage | Analyze Inbox → route to PARA + Wiki raw/ |
| `/wiki-compile` | 📚 Knowledge Compile | raw/ → extract concepts/entities → write to wiki/ |
| `/context` | 📍 State Load | Load active projects, today's tasks, Inbox status |
| `/daily-open` | 🌅 Daily Open | Create today's journal + auto-fill tasks |
| `/weekly-review` | 📊 Weekly Review | Summarize week + batch compile + expire archive |
| `/lint` | 🔍 Health Check | Dead links·Orphan pages·Uncompiled raw·Contradictions |

### Auxiliary Skills

| Command | Function |
|------|------|
| `/search` | 🔍 Search content |
| `/obsidian` | 📎 Obsidian syntax/plugin help |
| `/first-cn-zh` | Simplified Chinese first |
| `/english-first` | English first |

---

## 🏷️ Tag System

Unified tagging covering PARA, status, and knowledge classification:

| Category | Tag Examples | Purpose |
|------|----------|------|
| **PARA** | `#project/`, `#area/`, `#resource/` | By actionability |
| **Status** | `#status/active`, `#status/archived` | Lifecycle tracking |
| **Type** | `#type/concept`, `#type/entity`, `#type/daily` | Note type |
| **Topic** | `#topic/ai-ml`, `#topic/philosophy` | Subject classification |
| **Lifecycle** | `#lifecycle/ephemeral`, `#lifecycle/evergreen` | Information lifespan |

Full specs: [[_meta/⚙️ 系统配置/tag-system-guide|Tag Guide]] / [[_meta/⚙️ 系统配置/tag-quick-reference|Quick Reference]].

---

## 🚀 Quick Start

1. **Open Obsidian** → load `knowledge-value` Vault
2. **Start Claude Code** → `claude` in vault root
3. **Load state** → `/context`
4. **Start capturing** → dump everything into `0 Inbox/`
5. **Triage** → `/triage`
6. **Compile knowledge** → `/wiki-compile [topic]`

### Minimum Viable Set

Just three files to get started:

- `CLAUDE.md` — Agent constitution
- `.claude/skills/triage.md` — Triage engine
- `.claude/skills/wiki-compile.md` — Knowledge compiler

---

## 📚 Documentation

### Core Docs

| Doc                                                    | Description                             | Priority |
| ------------------------------------------------------ | --------------------------------------- | :------: |
| [[CLAUDE]]                                             | Root constitution + system instructions |   ⭐⭐⭐    |
| [[1 Projects/📁 已完成/PARA+LLM-Wiki 融合系统/PARA+LLM-Wiki 融合系统\|PARA × LLM-Wiki Architecture]] | Full architecture design v1.0           |   ⭐⭐⭐    |
| [[_meta/_INDEX]]                                       | Vault dashboard                         |    ⭐⭐    |
| [[3 Resources/_META-INDEX]]                            | Global Wiki navigation                  |    ⭐⭐    |

### System Configuration

| Doc | Description |
|------|------|
| [[_meta/⚙️ 系统配置/⚙️ 系统配置]] | System config overview |
| [[_meta/⚙️ 系统配置/tag-system-guide]] | Tag system guide |
| [[_meta/⚙️ 系统配置/知识库结构概览]] | Vault structure detail |
| [[_meta/⚙️ 系统配置/PARA 模板库]] | Template index |

---

## FAQ

<details>
<summary>How do I get started?</summary>

1. Open Obsidian, load this Vault
2. Put all new info into `0 Inbox/`
3. Run `/triage` for AI auto-sorting
4. Run `/wiki-compile [topic]` to compile knowledge

</details>

<details>
<summary>How do PARA and LLM-Wiki work together?</summary>

- **PARA** — Organize by actionability (Projects/Areas/Resources/Archives)
- **LLM-Wiki** — Organize by knowledge depth (raw/ → wiki/ → outputs/)
- They fuse at `3 Resources/` — it's both a Resources folder and Wiki sub-library mount point

</details>

<details>
<summary>Can AI modify my notes?</summary>

Zone-based control:
- `0 Inbox/` — AI reads and sorts
- `1 Projects/`, `2 Areas/` — AI assists organization
- `3 Resources/raw/` — **Human exclusive**, AI read-only
- `3 Resources/wiki/` — **AI exclusive**, human read-only
- `4 Archives/` — AI auto-archives

</details>

<details>
<summary>Is multi-language supported?</summary>

Yes! Simplified Chinese (default), Traditional Chinese, English.

</details>

---

## Contact

| Channel | Link |
|------|------|
| 🐙 **GitHub** | [knowledge-value](https://github.com/kmjade/knowledge-value.git) |
| 🐛 **Issues** | [Report issues](https://github.com/kmjade/knowledge-value/issues) |

---

## License

<div align="center">

Apache License 2.0

</div>

---

> 💡 **Tip**: Not sure where to start? Run `/context` to load current state — the AI will tell you what to do today.

**🌟 One Vault. All Knowledge. AI-Powered.**

---

<div align="center">

Made with ❤️ by knowledge-value Team

</div>
