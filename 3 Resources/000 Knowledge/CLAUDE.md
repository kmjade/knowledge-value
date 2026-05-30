---
aliases:
  - Knowledge Wiki
  - 知識知識庫
  - DDC 000 Schema
created: 2026-05-25
updated: 2026-05-30
type: wiki-schema
topic: 000 Knowledge
version: "1.1"
---

# DDC 000 — Wiki Schema

> 知識組織系統 (KOS) 的完整知識庫，從分類法到 AI 的知識組織譜系。
> 本文檔遵循 [[3 Resources/PARA+LLM-Wiki 整合系統架構設計文檔 v1.1|v1.1 架構]] 標準。

---

## 子庫結構 (v1.1)

```
3 Resources/000 Knowledge/
├── 000 Knowledge.md                    # MOC 主入口（DDC 000）
├── README.md                           # 簡介與狀態
├── CLAUDE.md                           # 本文件：Schema 定義
│
├── 010-Prolegomena/                    # 知識學導論（認識論）
│   ├── 010-Prolegomena.md             MOC 入口
│   ├── 01-What-is-Knowledge/          Chapter 1
│   ├── 02-Sources-of-Knowledge/       Chapter 2
│   ├── 03-Types-of-Knowledge/         Chapter 3
│   ├── 04-Theories-of-Truth/          Chapter 4
│   ├── 05-Knowledge-and-Culture/      Chapter 5
│   ├── 06-Introduction-to-KO/         Chapter 6
│   ├── 07-Preparatory-Disciplines/    Chapter 7
│   ├── 08-History-of-Epistemology/    Chapter 8
│   ├── 09-Applied-Epistemology/       Chapter 9
│   └── 99-資源收集/                   📦 資源與原始素材
│
├── 020-Knowledge-Organization/         # 知識組織（KOS 譜系）
│   ├── 020-Knowledge-Organization.md  MOC 入口
│   ├── 01-KOS-Overview/              Chapter 1
│   ├── 02-Classification/            Chapter 2
│   ├── 03-Thesaurus/                 Chapter 3
│   ├── 04-Ontology/                  Chapter 4
│   ├── 05-Knowledge-Graph/           Chapter 5
│   ├── 06-Linked-Data/               Chapter 6
│   ├── 07-Knowledge-Management/      Chapter 7
│   ├── 08-AI-and-Knowledge-Systems/  Chapter 8
│   ├── 09-Personal-KM/               Chapter 9
│   └── 99-資源收集/                   📦
│
├── 030-Library-Info-Science/          # 圖書情報學
├── 040-Information-Science/           # 資訊科學
├── 050-Classification-Metadata/       # 分類法與元數據
├── 060-Knowledge-Management/          # 知識管理
├── 070-Digital-Knowledge/             # 數字知識系統
│
├── ram/                               # 原始素材（人類維護，AI 只讀）
│   ├── articles/                      外部文章剪藏
│   ├── books/                         書摘
│   ├── conversations/                 AI 對話記錄
│   ├── GTD/                           GTD 原始資料
│   ├── PARA/                          PARA 原始資料
│   ├── Zettelkasten/                  卡片盒原始資料
│   ├── IOTO/                          IOTO 原始資料
│   ├── Obsidian/                      Obsidian 原始資料
│   ├── Notion/                        Notion 原始資料
│   ├── 飛書/                          飛書原始資料
│   ├── OKR/                           OKR 原始資料
│   └── *.md                           根層方法論文章
│
├── wiki/                              # LLM 編譯產物（AI 獨佔）
│   ├── index.md                       知識索引
│   ├── log.md                         編譯日誌
│   ├── concepts/ (23)                 概念頁
│   ├── entities/ (26)                 實體頁
│   └── sources/ (1)                   來源溯源
│
└── outputs/                           # 基於 Wiki 的製成品
```

---

## DDC 分類體系

此知識庫對應 DDC **000 總類**（Knowledge），涵蓋以下子類：

| DDC | 子庫 | 描述 | 結構標準 |
|:---:|------|------|:--------:|
| 010 | Prolegomena | 認識論、知識理論 | ✅ 9章+資源 |
| 020 | Knowledge Organization | KOS 譜系 | ✅ 9章+資源 |
| 030 | Library & Info Science | 圖書情報學 | ✅ 9章+資源 |
| 040 | Information Science | 資訊科學 | ✅ 9章+資源 |
| 050 | Classification & Metadata | 分類法與元數據 | ✅ 9章+資源 |
| 060 | Knowledge Management | 知識管理 | ✅ 9章+資源 |
| 070 | Digital Knowledge | 數字知識系統 | ✅ 9章+資源 |

---

## 核心概念域

### KOS 譜系 (Knowledge Organization Systems)
- 知識組織系統全景 (KOS)
- DIKW 金字塔
- 分類法體系 (Classification)
- 敘詞表 (Thesaurus)
- 本體論 (Ontology)
- 知識圖譜 (Knowledge Graph)
- 關聯數據 (Linked Data)

### 知識管理
- SECI 模型
- 個人知識管理 (PKM)
- 資訊生命週期 (Information Lifecycle)
- 熵增與反熵 (Entropy & Anti-Entropy)
- 受控詞表 / 敘詞表規劃 (Thesaurus Plan)

### 認識論 (Epistemology)
- 知識、學科與科學的關係
- 知識的定義與分類

### AI + 知識系統
- 檢索增強生成 (RAG)
- LLM Wiki 方法論

### 方法論 (跨域 → Productivity)
- GTD (Getting Things Done)
- PARA Method
- Zettelkasten
- Second Brain
- OKR
- LLM-Wiki

### 工具類型
- 筆記軟體 (Obsidian, Notion, 飛書)
- 任務管理 (Todoist, Things)
- 知識管理 (Readwise)

### 工作流
- 資訊捕獲 → Inbox
- 任務處理 → Projects
- 知識整理 → wiki/compile
- 定期回顧 → /lint

### 系統理論
- KOS 理論 (Knowledge Operating System)
- KOS 架構設計 (Architecture Design)
- 語義污染 (Semantic Pollution)

---

## 多語言策略 (v1.1)

| 層級 | 語言 | 範例 |
|------|------|------|
| **目錄名** | English + 繁體中文 | `010-Prolegomena/` |
| **標題** | 繁體中文 + English | `# 知識組織系統 — KOS (DDC 020)` |
| **內容** | 繁體中文 | 章節正文 |
| **技術術語** | English（保留原文） | KOS, RAG, SECI |
| **章節導航** | 雙語 | `## 快速導航 Quick Navigation` |
| **標點** | 繁體全形 | ，。：；？！「」 |

---

## Wiki 編譯狀態

| 指標 | 數值 |
|------|------|
| 概念頁 | 23 |
| 實體頁 | 26 |
| 來源頁 | 1 |
| 總頁面 | 50 |
| 最後索引更新 | 2026-05-30 |
| 編譯狀態 | ✅ 活躍 |

---

## 概念清單 (23)

### KOS 譜系

| # | 概念 | 域 |
|---|------|-----|
| 1 | [[wiki/concepts/Knowledge-Organization-Systems\|KOS]] 知識組織系統 | knowledge-systems |
| 2 | [[wiki/concepts/DIKW-Pyramid\|DIKW]] 金字塔 | knowledge-systems |
| 3 | [[wiki/concepts/Classification-Systems\|分類法]] 體系 | knowledge-systems |
| 4 | [[wiki/concepts/Thesaurus\|敘詞表]] | knowledge-systems |
| 5 | [[wiki/concepts/Ontology\|本體論]] | knowledge-systems |
| 6 | [[wiki/concepts/Knowledge-Graph\|知識圖譜]] | knowledge-systems |
| 7 | [[wiki/concepts/Linked-Data\|關聯數據]] | knowledge-systems |

### 知識管理

| # | 概念 | 域 |
|---|------|-----|
| 8 | [[wiki/concepts/SECI-Model\|SECI]] 模型 | knowledge-systems |
| 9 | [[wiki/concepts/PKM\|個人知識管理]] | knowledge-systems |
| 10 | [[wiki/concepts/Information-Lifecycle\|資訊生命週期]] | knowledge-systems |
| 11 | [[wiki/concepts/Entropy-Anti-Entropy\|熵增與反熵]] | knowledge-systems |
| 12 | [[wiki/concepts/Vault-Thesaurus-Plan\|敘詞表規劃]] | knowledge-systems |

### AI + 知識

| # | 概念 | 域 |
|---|------|-----|
| 13 | [[wiki/concepts/RAG\|RAG]] 檢索增強生成 | knowledge-systems |

### 認識論

| # | 概念 | 域 |
|---|------|-----|
| 14 | [[wiki/concepts/Knowledge-vs-Discipline\|知識·學科·科學]] | epistemology |

### 方法論（跨域）

| # | 概念 | 源域 |
|---|------|------|
| 15 | [[wiki/concepts/PARA-Method\|PARA]] 方法論 | productivity |
| 16 | [[wiki/concepts/GTD-Method\|GTD]] Getting Things Done | productivity |
| 17 | [[wiki/concepts/OKR-Framework\|OKR]] 框架 | productivity |
| 18 | [[wiki/concepts/Zettelkasten-Method\|Zettelkasten]] 卡片盒筆記法 | productivity |
| 19 | [[wiki/concepts/Second-Brain\|第二大腦]] | productivity |
| 20 | [[wiki/concepts/LLM-Wiki\|LLM-Wiki]] 方法論 | productivity |

### 系統理論

| # | 概念 | 域 |
|---|------|-----|
| 21 | [[wiki/concepts/KOS-Theory\|KOS 理論]] | productivity |
| 22 | [[wiki/concepts/KOS-Architecture-Design\|KOS 架構設計]] | productivity |
| 23 | [[wiki/concepts/Semantic-Pollution\|語義污染]] | productivity |

---

## 實體清單 (26)

### 系統與標準 (8)

| # | 實體 | 類型 | 域 |
|---|------|------|-----|
| 1 | [[wiki/entities/DDC\|DDC]] 杜威十進分類法 | 系統 | knowledge-systems |
| 2 | [[wiki/entities/UDC\|UDC]] 國際十進分類法 | 系統 | knowledge-systems |
| 3 | [[wiki/entities/CLC-中國圖書館分類法\|CLC]] 中國圖書館分類法 | 系統 | knowledge-systems |
| 4 | [[wiki/entities/LCC-國會圖書館分類法\|LCC]] 美國國會圖書館分類法 | 系統 | knowledge-systems |
| 5 | [[wiki/entities/MeSH\|MeSH]] 醫學主題詞表 | 系統 | knowledge-systems |
| 6 | [[wiki/entities/Gene-Ontology\|Gene Ontology]] | 系統 | knowledge-systems |
| 7 | [[wiki/entities/Wikidata\|Wikidata]] 開放知識圖譜 | 平臺 | knowledge-systems |
| 8 | [[wiki/entities/SPARQL\|SPARQL]] 語義網查詢語言 | 標準 | knowledge-systems |

### 方法與工具 (4)

| # | 實體 | 類型 | 域 |
|---|------|------|-----|
| 9 | [[wiki/entities/Zettelkasten\|Zettelkasten]] 卡片盒筆記法 | 方法 | knowledge-systems |
| 10 | [[wiki/entities/IOTO-Framework\|IOTO]] 框架 | 框架 | productivity |
| 11 | [[wiki/entities/Notion\|Notion]] | 工具 | productivity |
| 12 | [[wiki/entities/Obsidian\|Obsidian]] | 工具 | productivity |

### 人物 (12)

| # | 人物 | 貢獻 |
|---|------|------|
| 13 | [[wiki/entities/Karl-Popper-波普爾\|卡爾·波普爾]] | 可證僞性、批判理性主義 |
| 14 | [[wiki/entities/Thomas-Kuhn-庫恩\|托馬斯·庫恩]] | 範式與科學革命 |
| 15 | [[wiki/entities/Imre-Lakatos-拉卡託斯\|伊姆雷·拉卡託斯]] | 研究綱領 |
| 16 | [[wiki/entities/Paul-Feyerabend-費耶阿本德\|保羅·費耶阿本德]] | 認識論無政府主義 |
| 17 | [[wiki/entities/Michael-Polanyi-波蘭尼\|邁克爾·波蘭尼]] | 默會知識 |
| 18 | [[wiki/entities/Robert-Merton-默頓\|羅伯特·默頓]] | 科學社會學 |
| 19 | [[wiki/entities/Bruno-Latour-拉圖爾\|布魯諾·拉圖爾]] | 行動者網絡理論 |
| 20 | [[wiki/entities/David-Bloor-布魯爾\|大衛·布魯爾]] | 強綱領 |
| 21 | [[wiki/entities/Paul-Otlet-奧特萊\|保羅·奧特萊]] | UDC 創始人 |
| 22 | [[wiki/entities/Melvil-Dewey-杜威\|梅爾維爾·杜威]] | DDC 創始人 |
| 23 | [[wiki/entities/SR-Ranganathan-阮岡納贊\|S.R. 阮岡納贊]] | 冒號分類法 |
| 24 | [[wiki/entities/Tim-Berners-Lee\|Tim Berners-Lee]] | 語義網 |

### 學派 (2)

| # | 學派 | 描述 |
|---|------|------|
| 25 | [[wiki/entities/Vienna-Circle-維也納學派\|維也納學派]] | 邏輯實證主義 |
| 26 | [[wiki/entities/Frankfurt-School-法蘭克福學派\|法蘭克福學派]] | 批判理論 |

---

## 編譯規則 (v1.1)

1. **raw/ 唯讀** — AI 不修改原始資料
2. **Sources 必須** — 所有 wiki 頁面必須標註來源
3. **鏈接優先** — 使用 `[[]]` 建立知識連接
4. **增量編譯** — 只處理 `compiled: true` 為 false 的文件
5. **數據脫敏** — 個人數據不進入 wiki/
6. **繁體中文** — 內容使用繁體中文，技術術語保留英文

---

## 標題拆分規則 (Title Splitting)

### 命名規範

| 類型 | 格式 | 範例 |
|------|------|------|
| **概念頁** | `wiki/concepts/[PascalCase-Slug].md` | `Knowledge-Organization-Systems.md` |
| **實體頁** | `wiki/entities/[英文名]-[中文名].md` | `Karl-Popper-波普爾.md` |
| **來源頁** | `wiki/sources/[Source-Name].md` | `Knowledge-Systems.md` |

### 拆分原則

1. **一標題一概念** — 每個 .md 文件只對應一個核心概念/實體
2. **域標註** — 每頁 frontmatter 的 `topic:` 字段標註所屬域
3. **跨域共享** — 跨域概念（如 PARA、GTD）放在 000 Knowledge wiki，標註源域
4. **別名補全** — 中英文別名均需記入 frontmatter `aliases:`
5. **索引同步** — 每次標題拆分後更新 wiki/index.md 和 CLAUDE.md 清單

### 域分類

| topic 值 | 說明 |
|----------|------|
| `knowledge-systems` | KOS 譜系、知識管理、分類系統、人物（主域） |
| `epistemology` | 認識論、知識理論 |
| `productivity` | 生產力方法論、工具（跨域） |

---

## 跨庫關聯

| DDC | 鏈接                                                                           | 說明        |
| :-: | ---------------------------------------------------------------------------- | --------- |
| 004 | [[3 Resources/004-Computer science and technology/README\|Computer Science]] | 計算機科學     |
| 100 | [[3 Resources/100 Philosophy & Psychology/README\|Philosophy & Psychology]]  | 哲學（認識論基礎） |
| 400 | [[3 Resources/400 Language/README\|Language]]                                | 語言（知識表示）  |

---

## 使用命令

- `/wiki-compile 000 knowledge` — 編譯此知識庫
- `/triage` — 將新資料分揀到 ram/
- `/lint` — 健康檢查（鏈接、Frontmatter、結構）

---

*分類: 3 Resources/000 Knowledge · DDC: 000 · Schema v1.1*
