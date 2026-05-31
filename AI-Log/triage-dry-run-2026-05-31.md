---
title: Triage Dry-Run Report
date: 2026-05-31
type: triage-report
scope: full-inbox
mode: dry-run
---

# Triage Dry-Run Report — 2026-05-31

> **Mode:** `--dry-run` (preview only, no files moved)  
> **Scope:** Full Inbox scan — 474 unprocessed + 7 root = **481 files**

## Scan Results

| Category | Count |
|----------|-------|
| Total unprocessed (subdirectories) | 474 .md |
| Root-level files (.md + .pdf) | 7 .md + 10 .pdf |
| Already processed (`_processed/`) | 104 |
| **Total Inbox** | **~580** |

## Classification by Type

| Type | Estimate | Description |
|------|----------|-------------|
| **reference** | ~380 | Knowledge reference materials → `3 Resources/[DDC]/raw/` |
| **evergreen** | ~40 | Concept cards, structured knowledge → `3 Resources/[DDC]/wiki/` |
| **operational** | ~35 | Project management, methodology indices → `1 Projects/` or `060-KM/` |
| **ephemeral** | ~15 | Task logs, temporary notes → `1 Projects/` |

## Routing Plan by DDC Target

### DDC 100 — Philosophy & Psychology (173 files)

| # | Source | Files | Target |
|---|--------|-------|--------|
| A1 | `易學/` (complete I Ching KB) | 87 | `100 Philosophy/180-东方哲学/易经/` |
| A2 | `5 Zettels/📌 permanent/卦象/` (64 hexagrams) | 64 | `180-东方哲学/易经/ram/卦象/` |
| A3 | `5 Zettels/📌 permanent/易经/` (concepts) | 10 | `180-东方哲学/易经/ram/` |
| A4 | `5 Zettels/📁 structures/易经/` (MOCs) | 5 | `180-东方哲学/易经/00-MOCs/` |
| A5 | `5 Zettels/💡 fleeting/易经/` (fleeting) | 2 | `180-东方哲学/易经/ram/` |
| A6 | `5 Zettels/📚 literature/易经/` (text) | 1 | `180-东方哲学/易经/ram/原文/` |
| A7 | `02-Learning/易经/` (hexagrams) | 4 | `180-东方哲学/易经/ram/` |

> ⚠️ `180-东方哲学/易经/` already has 92 files — dedup needed before merge

### DDC 000 — Knowledge/CS/AI (158 files)

| # | Source | Files | Target |
|---|--------|-------|--------|
| B1 | `03-Productivity/Methods/` (GTD/PARA/Zettelkasten) | ~25 | `000 Knowledge/060-KM/07-Personal-KM/` |
| B2 | `03-Productivity/工作技巧/` (Claude Code/Ollama/OpenCode) | ~20 | `000 Knowledge/006 AI/07-Generative AI & LLMs/` |
| B3 | `05-Reference/Documents/PKM/` + `个人管理/` | ~15 | `000 Knowledge/060-KM/07-Personal-KM/` |
| B4 | `05-Reference/📰 参考资料/UDC/` | 12 | `000 Knowledge/050-Classification/04-UDC/` |
| B5 | `05-Reference/📰 参考资料/工具/` | 14 | `000 Knowledge/020-KO/02-Classification/` |
| B6 | `0 Department/` (学科 wiki schema) | 6 | `000 Knowledge/020-KO/` |
| B7 | `02-Learning/数学知识库/` | 11 | `500 Natural Sciences/510-Mathematics/` (note: 500) |
| B8 | `Clippings/` (AI + Git + Embedded) | 7 | `006 AI/` + `005 Software/` + `004 CS/` |
| B9 | `1-输入/` (API pricing + AI demo) | 2 | `006 AI/` |
| B10 | `Programming/` | 1 | `005 Software/` |
| B11 | `Concept Cards/学科-科学-区别.md` | 1 | `010-Prolegomena/` |
| B12 | `5 Zettels/📌 permanent/网络/` | 4 | `004 CS/004.6 计算机网络/` |
| B13 | `5 Zettels/📌 permanent/Dataview.md` | 1 | `005 Software/` |
| B14 | `02-Learning/Courses/` + `Books/三字经/` | 4 | `000 Knowledge/060-KM/` or `400 Language/` |
| B15 | `03-Productivity/MetaTrader/经济日历/` | 2 | `300/330-经济学/332.6-Investment-and-Trading/` |
| B16 | `people/` (CRM schema) | 4 | `000 Knowledge/060-KM/` |
| B17 | `05-Reference/Methods/` | 2 | `000 Knowledge/060-KM/` |
| B18 | `05-Reference/Documents/自动化工具对比.md` | 1 | `005 Software/` |
| B19 | `05-Reference/Documents/Cursor IDE.md` | 1 | `005 Software/` |
| B20 | `05-Reference/Documents/💻 技术知识/` | 4 | `004 CS/004.6 计算机网络/` |
| B21 | `05-Reference/Documents/写作技巧/` + `学习技巧/` | ~8 | `000 Knowledge/060-KM/` |
| B22 | Root — `DDC 004.md` | 1 | `000 Knowledge/050-Classification/` |

### DDC 300 — Social Sciences / Economics (6 files)

| # | Source | Files | Target |
|---|--------|-------|--------|
| C1 | `03-Productivity/MetaTrader/` (calendars) | 2 | `332.6-Investment-and-Trading/raw/` |
| C2 | `05-Reference/Documents/财务技巧/` | 1 | `3 Resources/finance/raw/` |
| C3 | `3-任务/学习IOTO/` | 1 | `060-KM/07-Personal-KM/` |

### DDC 700 — Arts & Recreation (101 files)

| # | Source | Files | Target |
|---|--------|-------|--------|
| D1 | `魔獸世界/` (WoW complete KB) | 101 | `700 Arts/790-体育与休闲/06-电子竞技/World-of-Warcraft/` |

> 🆕 New directory — `790-体育与休闲/06-电子竞技/` currently empty framework

### DDC 600 — Applied Sciences (4 files)

| # | Source | Files | Target |
|---|--------|-------|--------|
| E1 | `03-分離工程/` | 1 | `600 Applied Sciences/660-化学工程/` |
| E2 | `02-Learning/医学/` | 1 | `600 Applied Sciences/610-医学健康/` |
| E3 | Root — `智慧農業.md` | 1 | `600 Applied Sciences/630-农业科学/` |
| E4 | Root — `004.45-嵌入式與即時操作系統.md` | 1 | `000 Knowledge/004 CS/004.45/` |

### Root PDFs (10 files)

| # | File | Target |
|---|------|--------|
| F1 | `金螳螂...pdf` | `600 Applied Sciences/690-建筑科学/` |
| F2 | `精装修工程...pdf` | `600 Applied Sciences/690-建筑科学/` |
| F3 | `MA5620E...EPON配置.pdf` | `000 Knowledge/004 CS/004.6 计算机网络/` |
| F4 | `换猫记V1.1.pdf` | `000 Knowledge/004 CS/004.6 计算机网络/` |
| F5 | `MT45融合EA编程手册.pdf` | `300/330-经济学/332.6-Investment-and-Trading/` |
| F6 | `驾驭交易 原书第2版(高清).pdf` | `300/330-经济学/332.6-Investment-and-Trading/` |
| F7 | `InDesign...pdf` | `700 Arts/760-设计艺术/` |
| F8 | `树莓派驱动板原理图.pdf` | `000 Knowledge/004 CS/` |
| F9 | `苏光芬 三维重建报告.pdf` | `000 Knowledge/004 CS/004.9/` |

### Root .md files

| # | File | Target |
|---|------|--------|
| G1 | `0 Inbox.md` | Keep in Inbox (root descriptor) |
| G2 | `PARA × LLM-Wiki 融合系统.md` | `000 Knowledge/060-KM/` |
| G3 | `技術學習資源.md` | `000 Knowledge/060-KM/` |
| G4 | `属性里如何自动生成uuid.md` | `000 Knowledge/004 CS/` |

## Grand Summary by DDC Destination

| DDC | Destination | Files | Priority |
|-----|-------------|-------|----------|
| **100** | Philosophy — 易经 | **173** | 🔴 Largest |
| **700** | Arts — 魔兽世界 | **101** | 🔴 Second |
| **000** | Knowledge/CS/AI/KM | **158** | 🟡 Distributed |
| **300** | Economics/Trading | **6** | 🟢 Small |
| **600** | Applied Sciences | **4** | 🟢 Small |
| **Root PDFs** | Various | **10** | 🟢 Reference |
| **Root .md** | Various | **4** | 🟢 Cleanup |
| **Total** | | **~456** | |

## Conflict Preview

| Conflict | Detail |
|----------|--------|
| `易经/` duplicates | `5 Zettels` + `易學/` + `02-Learning/易经/` all have hexagram content — need dedup before merge |
| `经济日历/` duplicates | `03-Productivity/MetaTrader/` vs already-moved `332.6/raw/economic-calendar/` |
| `凱撒密碼` duplicates | `5 Zettels` + `05-Reference/💻 技术知识/` — identical topic |
| DDC targets need `raw/` creation | Most 600/700 targets don't have `raw/` subdirectories yet |

## Recommended Execution Order

1. **Wave 1:** 易经 content (173 files) — dedup first, then merge into `180-东方哲学/易经/`
2. **Wave 2:** 魔兽世界 (101 files) — create `790-体育与休闲/06-电子竞技/World-of-Warcraft/`
3. **Wave 3:** Distributed 000/300/600 moves (~182 files) — smaller, independent moves
