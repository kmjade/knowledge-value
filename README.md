---
language: en-US
updated: 2026-05-31
---

# 🧠 knowledge-value — PARA × LLM-Wiki Fusion System

![PARA Method](https://img.shields.io/badge/PARA-Method-blue?style=for-the-badge)
![Obsidian](https://img.shields.io/badge/Obsidian-📎-7C3AED?style=for-the-badge)
![Claude Code](https://img.shields.io/badge/Claude-Code-🤖-10B981?style=for-the-badge)
![License](https://img.shields.io/badge/License-Apache--2.0-FF6B6B?style=for-the-badge)

[English](README.md) | [[README_zh-CN|简体中文]] | [[README_zh-TW|繁体中文]]

---

## Overview

> A personal knowledge management system deeply integrating the **PARA methodology** with **LLM-Wiki**. Claude Code serves as the AI Agent within an Obsidian Vault, handling information routing and knowledge compilation — moving from "retrieval" to "compilation" for zero-maintenance knowledge management.

**Core Philosophy**: One Vault, all Markdown, fully accessible to Claude Code. Humans produce and consume information; AI handles all the organization in between.

---

## Table of Contents

- [System Architecture](#-system-architecture)
- [Vault Structure](#-vault-structure)
- [PARA Classification](#-para-classification)
- [DDC Wiki Sublibraries](#-ddc-wiki-sublibraries)
- [_INDEX Navigation System](#-index-navigation-system)
- [Core Rules](#-core-rules)
- [Workflows](#-workflows)
- [Skills Library](#-skills-library)
- [Tag System](#-tag-system)
- [Quick Start](#-quick-start)
- [Documentation Resources](#-documentation-resources)

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│               📥 Layer 1 — Information Capture              │
│          0 Inbox/ → /triage Intelligent Sorting               │
└──────────────────────────┬──────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│              🧭 Layer 2 — PARA Action Management             │
│   1 Projects/ → 2 Areas/ → 3 Resources/ → 4 Archives/     │
└──────────────────────────┬──────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│              📚 Layer 3 — Wiki Knowledge Compilation         │
│       raw/ → /wiki-compile → wiki/ → outputs/              │
│    (Human-write · AI-read)   (AI-exclusive · Human-read)    │
└─────────────────────────────────────────────────────────────┘
                           ↕
                   🧠 CLAUDE.md Root Constitution
                   Skills Library Driven
```

![[_meta/diagram/para-llm-wiki-architecture.svg]]

---

## 📁 Vault Structure

```
knowledge-value/
├── 📥 0 Inbox/                  # Single entry point — all info converges here
│   ├── _INDEX.md               #   Inbox quick navigation
│   ├── _processed/             #   Processed archive
│   ├── Clippings/              #   Web clippings
│   └── [temporary files here]
│
├── 🎯 1 Projects/              # Short-term tasks with deadlines
│   ├── _INDEX.md               #   Project quick navigation
│   ├── Creative/               #   Creative projects
│   ├── Learning/               #   Learning (AutoCAD, ESP32, Python…)
│   ├── Personal/               #   Personal projects
│   ├── Work/                   #   Work projects
│   └── 📁 Completed/           #   Completed projects
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
├── 📚 3 Resources/             # Knowledge resources + DDC Wiki sublibraries
│   ├── _INDEX.md               #   Resource quick navigation
│   ├── _META-INDEX.md          #   Global knowledge graph entry
│   ├── 000 Knowledge/          #   Knowledge Organization (DDC 000)
│   ├── 300 Social Sciences/    #   Social Sciences (DDC 300)
│   ├── 400 Language/           #   Language (DDC 400)
│   ├── 500 Natural Sciences/   #   Natural Sciences (DDC 500)
│   ├── 600 Applied Sciences/   #   Applied Sciences (DDC 600)
│   └── 700 Arts/               #   Arts (DDC 700)
│
├── 🗄️ 4 Archives/              # Completed projects · Outdated resources
│   └── _INDEX.md               #   Archive quick navigation
│
├── ⚙️ _meta/                   # System metadata
│   ├── _INDEX.md               #   Vault master dashboard
│   ├── ⚙️ System Config/       #   Templates · Tags · Structural config
│   └── 🔗 Knowledge Links/     #   Dashboard & Index
│
├── 📋 _templates/              # Template library
├── 🤖 AI-Log/                  # AI operation logs (sessions, triage-log, compile-log)
├── 📐 CLAUDE.md                # Agent root constitution (most important file)
└── 📖 README.md                # This file
```

---

## 📊 PARA Classification

| Category | Folder | Description | Decision Criteria |
|:---:|--------|------|----------|
| 🔴 **Projects** | `1 Projects/` | Short-term efforts with clear goals and deadlines | "Has a deadline?" → Yes |
| 🟢 **Areas** | `2 Areas/` | Ongoing maintenance, no "done" state | "Requires ongoing attention?" → Yes |
| 🔵 **Resources** | `3 Resources/` | Topics of interest, reference materials | "Interested but no immediate action?" → Yes |
| ⚪ **Archives** | `4 Archives/` | Completed / outdated / no longer needed | None of the above → Archive |

### Decision Tree

```
❓ Has a clear goal and deadline?
  └─ ✅ Yes → 1 Projects
  └─ ❌ No → Requires ongoing maintenance?
               └─ ✅ Yes → 2 Areas
               └─ ❌ No → Has reference value?
                           └─ ✅ Yes → 3 Resources
                           └─ ❌ No → 4 Archives
```

---

## 🏛️ DDC Wiki Sublibraries

Knowledge resources are organized by **Dewey Decimal Classification (DDC)** as Wiki sublibraries (active in `3 Resources/`, archived in `4 Archives/`):

| DDC | Sublibrary | Location | Status | Description |
|:---:|------|------|:---:|------|
| 000 | [[000 Knowledge\|Knowledge Organization]] | `3 Resources/` | 🟢 | Information Science · KM · CS |
| 100 | Philosophy · Psychology | `4 Archives/` | 🗄️ | Classical Philosophy · I Ching · Psychology |
| 200 | Religion · Theology | `4 Archives/` | 🗄️ | Christian Theology · Religious Philosophy |
| 300 | [[300 Social Sciences\|Social Sciences]] | `3 Resources/` | 🟢 | Sociology · Education · Public Admin |
| 400 | [[400 Language\|Language]] | `3 Resources/` | 🟡 | Linguistics · Chinese · Indo-European |
| 500 | [[500 Natural Sciences\|Natural Sciences]] | `3 Resources/` | 🟢 | Math · Physics · Chemistry · Biology |
| 600 | [[600 Applied Sciences\|Applied Sciences]] | `3 Resources/` | 🟢 | Medicine · Engineering · Manufacturing |
| 700 | [[700 Arts\|Arts]] | `3 Resources/` | 🟡 | Painting · Music · Design · Calligraphy |
| 800 | Literature | `4 Archives/` | 🗄️ | World Literature · Literary Theory |
| 900 | History · Geography | `4 Archives/` | 🗄️ | Biography · World History |

Each sublibrary structure:
```
[Topic]/
├── CLAUDE.md          # Sublibrary schema
├── raw/               # Source materials (Human-exclusive · AI read-only)
├── wiki/              # Compiled output (AI-exclusive · Human read-only)
│   ├── concepts/      #   Concept pages
│   ├── entities/      #   Entity pages
│   └── sources/       #   Source tracing
└── outputs/           # Artifacts generated from Wiki
```

---

## 🧭 _INDEX Navigation System

Each PARA directory includes a MOC-style `_INDEX.md` entry point:

| Entry | Purpose |
|------|------|
| [[_meta/_INDEX\|Vault Master Dashboard]] | Global navigation + information flow + system links |
| [[0 Inbox/_INDEX\|Inbox Entry]] | Pending sort area + triage workflow |
| [[1 Projects/_INDEX\|Project Entry]] | Creative/Learning/Personal/Work quadrants |
| [[2 Areas/_INDEX\|Area Entry]] | Six domains + review frequency + area↔project flow |
| [[3 Resources/_INDEX\|Resource Entry]] | DDC sublibrary navigation + Wiki compile flow |
| [[4 Archives/_INDEX\|Archive Entry]] | Three-dimensional archive (type/time/status) |

---

## ⛔ Core Rules

From [[CLAUDE]] — absolutely inviolable:

| # | Rule | Description |
|:---:|------|------|
| 1 | **Never modify `raw/`** | Source materials are the human knowledge baseline; AI reads only |
| 2 | **Never delete files** | Only move to `4 Archives/`; deletion requires explicit confirmation |
| 3 | **Wiki must have Sources** | Every compiled page must cite its source raw/ files |
| 4 | **Don't read Inbox before triage** | Prevent unsorted information from contaminating the Wiki |

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
| 🌅 Morning | Create/initialize today's journal | `/daily-open` |
| 📥 All day | Drop everything into Inbox | Manual / Web Clipper |
| 🌙 Evening | Triage Inbox | `/triage` |

### Weekly Workflow

| Time | Action | Command |
|------|------|------|
| 📅 Weekend | Weekly review + knowledge distillation + expiry archive | `/weekly-review` |
| 🔍 Anytime | System health check | `/lint` |

---

## 🤖 Skills Library

| Command | Function | Description |
|------|------|------|
| `/triage` | 📥 Intelligent Sorting | Analyze Inbox files → route to PARA + Wiki raw/ |
| `/wiki-compile` | 📚 Knowledge Compilation | raw/ → extract concepts/entities → write to wiki/ |
| `/context` | 📍 State Loading | Load active projects, today's tasks, Inbox status |
| `/daily-open` | 🌅 Daily Opening | Create today's journal + auto-fill tasks |
| `/weekly-review` | 📊 Weekly Review | Summarize weekly data + batch compile + expiry archive |
| `/lint` | 🔍 Health Check | Dead link detection · Orphan pages · Uncompiled materials · Contradiction summary |

### Auxiliary Skills

| Command | Function |
|------|------|
| `/search` | 🔍 Search content |
| `/obsidian` | 📎 Obsidian syntax/plugin assistance |
| `/first-cn-zh` | Simplified Chinese First |
| `/english-first` | English First |

---

## 🏷️ Tag System

Unified tag taxonomy covering PARA, status, and knowledge classification:

| Category | Tag Examples | Purpose |
|------|----------|------|
| **PARA** | `#project/`, `#area/`, `#resource/` | Classify by actionability |
| **Status** | `#status/active`, `#status/archived` | Lifecycle tracking |
| **Type** | `#type/concept`, `#type/entity`, `#type/daily` | Note type |
| **Topic** | `#topic/ai-ml`, `#topic/philosophy` | Thematic categorization |
| **Lifecycle** | `#lifecycle/ephemeral`, `#lifecycle/evergreen` | Information lifespan grading |

Full specifications: see [[_meta/⚙️ 系统配置/tag-system-guide|Tag System Guide]] and [[_meta/⚙️ 系统配置/tag-quick-reference|Quick Reference]].

---

## 🚀 Quick Start

1. **Open Obsidian** → Load the `knowledge-value` Vault
2. **Start Claude Code** → `claude` in the Vault root
3. **Load state** → `/context`
4. **Start capturing** → Drop all new info into `0 Inbox/`
5. **Triage** → `/triage`
6. **Compile knowledge** → `/wiki-compile [topic]`

### Minimum Viable Set

Only three files needed to get started:

- `CLAUDE.md` — Agent Constitution
- `.claude/skills/triage.md` — Triage Engine
- `.claude/skills/wiki-compile.md` — Knowledge Compiler

---

## 📚 Documentation Resources

### Core Documents

| Document | Description | Priority |
| --- | --- | :-: |
| [[CLAUDE]] | Claude Code root constitution + system directives | ⭐⭐⭐ |
| [[1 Projects/Work/PARA × LLM-Wiki 融合系统/PARA × LLM-Wiki 融合系统\|PARA × LLM-Wiki Fusion System]] | Complete architecture design doc v1.0 | ⭐⭐⭐ |
| [[_meta/_INDEX]] | Vault master dashboard | ⭐⭐ |
| [[3 Resources/_META-INDEX]] | Global Wiki navigation | ⭐⭐ |

### System Configuration

| Document | Description |
|------|------|
| [[_meta/⚙️ 系统配置/⚙️ 系统配置]] | System configuration overview |
| [[_meta/⚙️ 系统配置/tag-system-guide]] | Complete tag system guide |
| [[_meta/⚙️ 系统配置/知识库结构概览]] | Vault structure details |
| [[_meta/⚙️ 系统配置/PARA 模板库]] | Template index |

---

## FAQ

<details>
<summary>How do I get started?</summary>

1. Open Obsidian, load this Vault
2. Drop all new info directly into `0 Inbox/`
3. Run `/triage` to let AI auto-sort
4. Run `/wiki-compile [topic]` to compile knowledge

</details>

<details>
<summary>How do PARA and LLM-Wiki work together?</summary>

- **PARA** — Organized by actionability (Projects/Areas/Resources/Archives)
- **LLM-Wiki** — Organized by knowledge depth (raw/ → wiki/ → outputs/)
- They fuse through `3 Resources/` — it's both a Resources folder and the Wiki sublibrary mount point

</details>

<details>
<summary>Can AI modify my notes?</summary>

Zone-based control:
- `0 Inbox/` — AI reads and sorts
- `1 Projects/`, `2 Areas/` — AI assists with organization
- `3 Resources/raw/` — **Human-exclusive**, AI read-only
- `3 Resources/wiki/` — **AI-exclusive**, human read-only
- `4 Archives/` — AI auto-archives

</details>

<details>
<summary>How do I add new notes?</summary>

1. All content enters through `0 Inbox/` (manual, Web Clipper, mobile — all OK)
2. Run `/triage` — AI auto-analyzes temporality/topic/people, routes to correct location
3. Once reference materials enter `raw/`, run `/wiki-compile` to compile into Wiki pages

</details>

<details>
<summary>Is multilingual support available?</summary>

Yes! The system supports Simplified Chinese (default), Traditional Chinese, and English.

</details>

---

## Contact

| Channel | Link |
|------|------|
| 🐙 **GitHub** | [knowledge-value](https://github.com/kmjade/knowledge-value.git) |
| 🐛 **Issues** | [Report Issues](https://github.com/kmjade/knowledge-value/issues) |

---

## License

<div align="center">

Apache License 2.0

</div>

---

> 💡 **Tip**: Not sure where to start? Run `/context` to load the current state, and AI will tell you what to do today.

**🌟 One Vault, All Knowledge, AI-Driven.**

---

<div align="center">

Made with ❤️ by knowledge-value Team

</div>
