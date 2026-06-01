---
type: wiki-schema
topic: artificial-intelligence
domain: DDC 006
created: 2026-06-01
---

# DDC 006 — AI Schema

## 知识库概述

基于 LLM-Wiki 方法论的 AI 知识库，三層架構：
- **raw/** — 原始資料 (LLM 只读)
- **wiki/** — 编译产物 (LLM 生成)
- **CLAUDE.md** — 本文件

---

## 目录结构

```
006 Artificial Intelligence/
├── CLAUDE.md · README
├── 01-AI Overview/             入门
├── 02-Machine Learning/        52 files
├── 07-Generative AI & LLMs/   164 files (主库)
├── 09-AI Applications/          2 files
├── raw/                         2 files
├── wiki/                       11概念 + 6实体
├── 00-MOCs · 99-Resources
```

## Wiki 状态

| 概念 | 实体 |
|------|------|
| AGI · CNN · LLM · Transformer · 强化学习 | GPT · Hermes-Agent |
| LLM-Fundamentals · LLM-Wiki | Obsidian · IngestAgent |
| Ingest/Query/Lint Workflow | LintAgent · QueryAgent |

## 跨库

| DDC | 子库 | 关系 |
|:---:|------|------|
| 004.43 | Python | 开发工具 |
| 510 | 数学 | 概率·线性代数 |
| 000 | 知识管理 | LLM-Wiki |

## 三大操作

1. **Ingest** — raw/ → wiki/ 编译
2. **Query** — 先读 index → 深入回答
3. **Lint** — 定期检查矛盾·过时·孤立页

## 编译规则

- raw/ 只读 · wiki/ AI 独占
- 繁體中文 + English 術語
- `/wiki-compile 006` 编译
