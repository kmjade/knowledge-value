---
title: CLAUDE.md 設計規範
aliases: [CLAUDE.md Design, Schema Design, CLAUDE.md 模板]
tags: [DDC/006.3, llm-wiki, km, schema, design]
created: 2026-06-01
type: design
topic: 006.3-LLM-Wiki
---

# 02 — CLAUDE.md 設計

> CLAUDE.md 是 LLM-Wiki 的「編譯器配置文件」，定義每個子庫的編譯規則、概念域、實體類型和模板約定。

---

## 一、CLAUDE.md Schema 模板

```yaml
---
type: wiki-schema
topic: <domain-name>
domain: <DDC-code>
created: YYYY-MM-DD
---

# DDC XXX — <Domain> Schema

## 知識庫概述
- raw/ · wiki/ · CLAUDE.md 三層結構說明
- 目錄結構樹

## 核心概念域
- 域 1：<描述> (N concepts)
- 域 2：<描述> (N concepts)

## Wiki 狀態
| 概念 (N) | 實體 (N) |
|-----------|----------|
| ...       | ...      |

## 跨庫連接
| DDC | 子庫 | 關係 |
|-----|------|------|

## 三大操作
1. Ingest — raw/ → wiki/
2. Query — index → deep answer
3. Lint — 定期檢查

## 編譯規則
- raw/ 只讀 · wiki/ AI 獨佔
- 繁體中文 + English 術語
- /wiki-compile <domain>
```

---

## 二、核心概念域 (Concept Domains)

每個子庫的 CLAUDE.md 必須定義其概念域劃分：

| 域屬性 | 說明 | 範例 |
|--------|------|------|
| **domain_name** | 域標識 | `knowledge-systems`, `productivity` |
| **description** | 域描述 | 「知識組織系統全景」 |
| **concept_count** | 概念數量 | 6–15 個（建議範圍） |
| **key_concepts** | 核心概念列表 | KOS, DIKW, Thesaurus, Ontology |

### 域劃分原則

1. **互斥性**：概念不應跨域重複（必要時用 wikilink 引用）
2. **內聚性**：同域概念有強關聯，域間耦合盡量低
3. **粒度一致**：同域內概念抽象層級相近
4. **可擴展**：預留空間給未來新增概念

---

## 三、實體類型 (Entity Types)

| 類型 | 說明 | 範例 |
|------|------|------|
| **person** | 人物（研究者、作者、思想家） | Karl Popper, Thomas Kuhn |
| **tool** | 工具（軟體、框架、平台） | Obsidian, Notion, Hermes-Agent |
| **platform** | 平台（服務、生態） | GitHub, ArXiv, HuggingFace |
| **protocol** | 協議/標準（規範、格式） | SPARQL, MCP, OpenAI API |
| **system** | 系統（分類體系、框架） | DDC, UDC, MeSH |
| **method** | 方法（方法論、技術） | Zettelkasten, GTD, RAG |

---

## 四、編譯規則 (Compilation Rules)

| 規則 | 說明 |
|------|------|
| **raw/ 只讀** | AI 絕不修改 raw/ 中的任何文件 |
| **wiki/ AI 獨佔** | 人類不直接編輯 wiki/ 頁面，只通過 raw/ 間接影響 |
| **frontmatter 強制** | 每頁必須含 title, tags, type, created |
| **雙語策略** | 正文繁體中文，關鍵術語保留 English |
| **wikilinks 強制** | 所有跨頁引用必須使用 `[[link]]` 語法 |
| **增量標記** | raw 文件處理後 frontmatter `compiled: true` |
| **日誌記錄** | 每次編譯在 wiki/log.md 追加記錄 |

---

## 五、頁面模板 (Page Templates)

### 概念頁 (Concept Page)
```yaml
---
title: <Concept Name>
tags: [concept, <domain-tag>]
type: concept
created: YYYY-MM-DD
---
# <Concept Name>
## 定義 / 核心特徵 / 相關概念 / 相關實體 / Sources
```

### 實體頁 (Entity Page)
```yaml
---
title: <Entity Name>
tags: [entity, <type-tag>]
type: entity
entity_type: <person|tool|platform|protocol|system|method>
created: YYYY-MM-DD
---
# <Entity Name>
## 概述 / 核心功能 / 相關概念 / 相關實體 / Sources
```

### 來源頁 (Source Page)
```yaml
---
title: Source: <Source Name>
tags: [source]
type: source
source_type: <article|paper|book|conversation|webpage>
source_path: raw/<path>
compiled_date: YYYY-MM-DD
---
# Source: <Source Name>
## 摘要 / 關鍵概念 / 提取實體 / 原始連結
```

---

## 六、域級 CLAUDE.md vs 子 KB CLAUDE.md

| 層級 | 文件 | 職責 |
|------|------|------|
| **域級** | `006 Artificial Intelligence/CLAUDE.md` | 定義整個 006 域的概念域、跨子庫規則 |
| **子 KB 級** | `006.3-LLM-Wiki/CLAUDE.md` | 定義本子庫的概念域、模板、編譯規則 |
| **繼承關係** | 子 KB 繼承域級規則，可覆蓋特定配置 | 遵循「就近原則」 |

---

## 相關連結

- [[01-LLM-Wiki-概述]] — 方法論概述
- [[006.3-LLM-Wiki]] — 本庫 MOC
- [[../CLAUDE.md|006 CLAUDE.md]] — 域級 Schema 實例
- [[04-页面模板体系]] — 詳細頁面模板
- [[05-概念域设计]] — 概念域設計方法
