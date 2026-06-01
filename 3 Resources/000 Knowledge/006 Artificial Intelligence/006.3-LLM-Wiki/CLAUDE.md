---
aliases:
  - LLM-Wiki Schema
  - LLM-Wiki 知识库
created: 2026-06-01
type: wiki-schema
topic: 006.3-LLM-Wiki
---

# LLM-Wiki Schema — DDC 006.3

> LLM-Wiki 方法论：让 AI 从对话伙伴变为知识编译器。三层架构：raw → wiki → outputs。

## Directory Structure

```
006.3-LLM-Wiki/
├── CLAUDE.md                          ← Schema definition
├── 006.3-LLM-Wiki.md                  ← MOC entry
├── 00-MOCs/                           ← Overviews & learning paths
├── 01-LLM-Wiki-概述.md                ← What is LLM-Wiki?
├── 02-CLAUDE.md-设计.md               ← CLAUDE.md design patterns
├── 03-编译工作流.md                    ← Compilation workflow
├── 04-页面模板体系.md                   ← Page templates
├── 05-概念域设计.md                    ← Concept domain design
├── 06-跨库连接.md                      ← Cross-library linking
├── 07-部署模式.md                      ← Deployment patterns
├── 08-质量保障.md                      ← Quality assurance
├── 09-工具与自动化.md                   ← Tools & automation
├── 99-資源收集/                        ← External resources
├── raw/                               ← Raw materials (human, AI read-only)
│   ├── articles/
│   ├── papers/
│   ├── books/
│   └── conversations/
├── wiki/                              ← AI-compiled (AI exclusive)
│   ├── index.md
│   ├── log.md
│   ├── concepts/   (5)
│   ├── entities/    (2)
│   └── sources/     (2)
└── outputs/                           ← Wiki-based artifacts
```

## Core Concepts

| # | Concept | Page |
|---|---------|------|
| 1 | Agent Browser | [[wiki/concepts/agent-browser\|Agent Browser]] |
| 2 | Competitive Analysis Workflow | [[wiki/concepts/competitive-analysis-workflow\|Competitive Analysis]] |
| 3 | MCP Protocol | [[wiki/concepts/mcp-protocol\|MCP Protocol]] |
| 4 | Skills Files | [[wiki/concepts/skills-files\|Skills Files]] |
| 5 | Two-Layer Automation | [[wiki/concepts/two-layer-automation\|Two-Layer Automation]] |

## Core Entities

| # | Entity | Type | Page |
|---|--------|------|------|
| 1 | Claude Code | Tool | [[wiki/entities/claude-code\|Claude Code]] |
| 2 | n8n | Platform | [[wiki/entities/n8n\|n8n]] |

## Compilation Rules

1. **raw/ Read-only**: AI never modifies raw materials
2. **Sources Required**: All wiki pages must have `## Sources`
3. **Link Priority**: Use `[[]]` for knowledge connections
4. **Incremental Compile**: Update existing pages, avoid duplicates
5. **Three-Layer Architecture**: raw (input) → wiki (compile) → outputs (artifacts)

## Cross-Library Links

| Library | Link |
|---------|------|
| 006 AI Parent | [[../006 Artificial Intelligence\|006 AI]] |
| 000 Knowledge | [[../../000 Knowledge\|000 Knowledge]] |
| Productivity | [[3 Resources/productivity/\|Productivity]] |
| People CRM | [[3 Resources/people/\|People]] |

## Commands

- `/wiki-compile 006.3` — Compile this knowledge base
- `/triage 006.3` — Triage new materials to raw/
