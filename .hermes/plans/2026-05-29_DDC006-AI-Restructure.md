# Plan: DDC 006 Artificial Intelligence — Full Restructure Update

## Goal

Restructure and update the existing DDC 006 "Artificial Intelligence" knowledge base: convert all content from Simplified Chinese (简体中文) to English + Traditional Chinese (繁體中文) mixed format, fix broken wikilinks, add cross-references to DDC 005 Software, and standardize naming conventions.

## Context

- **Vault**: `/mnt/e/knowledge-value/`
- **Target path**: `3 Resources/000 Knowledge/006 Artificial Intelligence/`
- **Current state**: 14 core files exist with substantial content but all in Simplified Chinese
- **Reference**: DDC 005 Software just completed — serves as the style template (EN + ZH-TW mixed)
- **Neighbors**: DDC 004 (CS), DDC 005 (Software — new), DDC 000 (Knowledge)
- **Language**: English titles, content in English + 繁體中文 mixed

## Issues Found

| # | Issue | Severity |
|---|-------|----------|
| 1 | All content in Simplified Chinese (简体) — not matching new language preference | High |
| 2 | MOC references "Artificial-Intelligence/" folder but actual is "006 Artificial Intelligence" | Medium |
| 3 | Broken path: `3 Resources/000 Knowledge/Computer-Science/Artificial-Intelligence/...` — doesn't exist | High |
| 4 | No cross-links to DDC 005 Software KB | Medium |
| 5 | 99-资源收集 has 8 extra files about LLM-Wiki methodology — should be kept or cleaned? | Low |

## Files to Rewrite (16 files, 2 phases)

### Phase 1 — Core Navigation (5 files)
| # | File | Status | Action |
|---|------|--------|--------|
| 1 | `006 Artificial Intelligence.md` | Exists | Rewrite MOC in EN+ZH-TW, fix paths, add 005 cross-link |
| 2 | `README.md` | Exists | Rewrite in EN+ZH-TW, fix broken paths |
| 3 | `00-MOCs/AI 知识库总览.md` | Exists | Rewrite → "AI Knowledge Base Overview" with milestones |
| 4 | `00-MOCs/AI 学习路径.md` | Exists | Rewrite → "AI Learning Path" |
| 5 | `01-AI概述/01-AI概述.md` | Exists | Rewrite → "01-AI Overview" |

### Phase 2 — Content Chapters + Resources (11 files)
| # | File | Status | Action |
|---|------|--------|--------|
| 6 | `02-机器学习/02-机器学习.md` | Exists | Rewrite → "02-Machine Learning" |
| 7 | `03-深度学习/03-深度学习.md` | Exists | Rewrite → "03-Deep Learning" |
| 8 | `04-自然语言处理/04-自然语言处理.md` | Exists | Rewrite → "04-Natural Language Processing" |
| 9 | `05-计算机视觉/05-计算机视觉.md` | Exists | Rewrite → "05-Computer Vision" |
| 10 | `06-强化学习/06-强化学习.md` | Exists | Rewrite → "06-Reinforcement Learning" |
| 11 | `07-生成式AI与大模型/07-生成式AI与大模型.md` | Exists | Rewrite → "07-Generative AI & LLMs" |
| 12 | `08-AI伦理与安全/08-AI伦理与安全.md` | Exists | Rewrite → "08-AI Ethics & Safety" |
| 13 | `09-AI应用与工具/09-AI应用与工具.md` | Exists | Rewrite → "09-AI Applications & Tools" |
| 14 | `99-资源收集/AI 资源收集.md` | Exists | Rewrite → "AI Resources" |
| 15 | `99-资源收集/AI 常见问题.md` | Exists | Rewrite → "AI FAQ" |
| 16 | `99-资源收集/*` (8 extra files) | Exists | Keep as-is (methodology notes), don't modify |

## Key Changes Per File

### MOC (006 Artificial Intelligence.md)
- Convert all descriptions to EN + ZH-TW
- Fix folder structure diagram (show actual paths, not "Artificial-Intelligence/")
- Add cross-reference section linking to 005 Software
- Update related KBs: add [[005 Software]], fix broken paths

### README.md
- Fix broken path: `3 Resources/000 Knowledge/Computer-Science/Artificial-Intelligence/...` → correct paths
- Add DDC positioning table (004 | 005 | 006)
- Convert to EN+ZH-TW

### 07-Generative AI & LLMs
- Biggest chapter, most substantive content
- Keep all technical depth; convert language only
- Model list may need minor 2026 updates
- Add Agent section cross-ref to 005 Software (programming agents)

### 09-AI Applications & Tools
- Convert language
- Add note about AI-assisted software engineering tools (link to 005)
- Keep MLOps/tools content intact

### Chapter Files (01–06, 08)
- Language conversion only
- Add "Related Modules" cross-links to 005 where relevant
- Preserve all technical content

### 99-资源收集
- Convert AI 资源收集 and AI 常见问题
- Leave the 8 LLM-Wiki methodology files untouched (raw notes)

## Implementation Steps

### Phase 1: Core Navigation (5 files)
1. Rewrite `006 Artificial Intelligence.md` — MOC entry
2. Rewrite `README.md`
3. Rewrite `00-MOCs/AI 知识库总览.md`
4. Rewrite `00-MOCs/AI 学习路径.md`
5. Rewrite `01-AI概述/01-AI概述.md`
→ Commit: `para: restructure DDC 006 AI — Phase 1 (MOC + navigation + overview, EN+ZH-TW)`

### Phase 2: Content Chapters (11 files)
6–15. Rewrite chapters 02–09 + 2 resource files
→ Commit: `para: restructure DDC 006 AI — Phase 2 (chapters 02-09 + resources, EN+ZH-TW)`
→ Push both commits

## Validation

- All wikilinks resolve within vault
- No references to nonexistent `Computer-Science/Artificial-Intelligence/` paths
- Cross-links to 005 Software present
- Cross-links to 004 CS present
- English + Traditional Chinese throughout
- YAML frontmatter valid on all files
- Extra 99-资源收集 files preserved

## Risks

- **Content loss**: Converting language from 简体→繁體 may lose nuance. Approach: rewrite for meaning, not character-by-character conversion
- **06-强化学习 sub-KB**: Contains deep Hermes-Agent sub-KB (50+ files). The main 06-强化学习.md should be rewritten but the sub-KB files left untouched
- **Broken wikilinks**: The current MOC references wikilinks that resolve to files with Chinese names inside the KB. After rewrite, the wikilink targets still exist (file names not changing), so links should still resolve
- **Large rewrite scope**: 15 files × substantial content each. Two phases keeps it manageable
