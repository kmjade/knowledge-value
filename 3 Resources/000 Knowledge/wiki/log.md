---
created: 2026-05-28
updated: 2026-05-30
type: log
topic: knowledge-systems
version: "1.1"
---

# Wiki 編譯日誌 — DDC 000 Knowledge

## 2026-05-30 — v1.1 重構

### 重構摘要

- **範圍**: 全知識庫對齊 v1.1 架構標準
- **方法**: 結構重組 + 語言轉換 + 標題拆分

### 變更清單

| # | 操作 | 文件/目錄 |
|---|------|-----------|
| 1 | 🆕 重寫 MOC | `000 Knowledge.md` — 繁體中文 + DDC 導航 |
| 2 | 🆕 重寫 Schema | `CLAUDE.md` — v1.1 規則 + 完整清單 |
| 3 | 🆕 重寫索引 | `wiki/index.md` — 繁體中文 + DDC 映射 |
| 4 | 🔄 更名 | `Readme.md` → `README.md` |
| 5 | 🆕 更新子庫 MOC | `010` `020` `030` `040` `050` `060` `070` — 繁體中文 |
| 6 | 🗑️ 刪除重複 | `wiki/concepts/Information-Lifecycle 1.md` |
| 7 | 📋 補全索引 | 概念 11→23，實體 7→26 |
| 8 | 📐 新增規則 | 標題拆分規則、域分類、多語言策略 |

### 概念增補

從首次編譯的 11 概念擴展至 23：

| 新增概念 | 類型 | 來源 |
|----------|------|------|
| GTD-Method, OKR-Framework, Second-Brain, Zettelkasten-Method, LLM-Wiki | 方法論 | ram/ 生產力目錄 |
| KOS-Theory, KOS-Architecture-Design, Semantic-Pollution | 系統理論 | ram/ 根層文章 |
| Information-Lifecycle, Entropy-Anti-Entropy, Vault-Thesaurus-Plan | 知識管理 | ram/ 方法論文章 |
| Knowledge-vs-Discipline | 認識論 | ram/Prolegomena |

### 實體增補

從首次編譯的 8 實體擴展至 26：

| 新增實體 | 類型 | 來源 |
|----------|------|------|
| CLC, LCC | 系統 | ram/articles/ |
| IOTO-Framework, Notion, Obsidian | 工具 | ram/ 工具目錄 |
| Karl-Popper, Thomas-Kuhn, Imre-Lakatos, Paul-Feyerabend, Michael-Polanyi, Robert-Merton, Bruno-Latour, David-Bloor, Paul-Otlet, Melvil-Dewey, SR-Ranganathan | 人物 | ram/Prolegomena |
| Vienna-Circle, Frankfurt-School | 學派 | ram/Prolegomena |

---

## 2026-05-29 — 中英文混排重構

- 合併 epistemology 實體 (8→25)
- 清理孤立目錄
- 雙語命名規範

---

## 2026-05-28 — 首次編譯

### 編譯資訊

- **源庫**: `3 Resources/000 Knowledge/ram/articles/Knowledge-Systems-知識系統/`
- **源文件**: 9 章 + 2 MOC + README (14 文件)
- **新概念**: 11
- **新實體**: 8
- **新來源頁**: 1
- **總頁面**: 20
- **方法**: 全量編譯

### 概念產出

| # | 概念 | 源章節 |
|---|------|--------|
| 1 | [[Knowledge-Organization-Systems]] | 01-概述 |
| 2 | [[DIKW-Pyramid]] | 01-概述 |
| 3 | [[Classification-Systems]] | 02-Classification |
| 4 | [[Thesaurus]] | 03-Thesauri |
| 5 | [[Ontology]] | 04-Ontologies |
| 6 | [[Knowledge-Graph]] | 05-Knowledge-Graphs |
| 7 | [[Linked-Data]] | 06-Linked-Data |
| 8 | [[SECI-Model]] | 07-Knowledge-Management |
| 9 | [[RAG]] | 08-AI-Knowledge-Systems |
| 10 | [[PKM]] | 09-Personal-KM |
| 11 | [[PARA-Method]] | 09-Personal-KM |

### 實體產出

| # | 實體 | 類型 |
|---|------|------|
| 1 | [[DDC]] | 系統 |
| 2 | [[UDC]] | 系統 |
| 3 | [[MeSH]] | 系統 |
| 4 | [[Gene-Ontology]] | 系統 |
| 5 | [[Wikidata]] | 平臺 |
| 6 | [[SPARQL]] | 標準 |
| 7 | [[Zettelkasten]] | 方法 |
| 8 | [[Tim-Berners-Lee]] | 人物 |

### 來源產出

| # | 來源 | 類型 |
|---|------|------|
| 1 | [[wiki/sources/Knowledge-Systems]] | 知識庫 |

### 品質校驗

- [x] 所有概念頁包含 `## Sources`
- [x] 所有實體頁包含 `## Sources`
- [x] 概念間交叉鏈接已建立
- [x] 概念↔實體鏈接已建立

---

*日誌格式: YYYY-MM-DD | 操作: 增量/全量編譯 | 產出統計*
