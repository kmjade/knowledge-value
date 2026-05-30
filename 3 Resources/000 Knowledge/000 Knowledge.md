---
aliases:
  - 知識入口
  - Knowledge Index
  - DDC 000 Index
created: 2026-05-28
updated: 2026-05-30
type: directory-index
topic: knowledge-systems
---

# DDC 000 — 知識總論 Knowledge

> [!info] DDC 001 · Knowledge Organization Systems
> 從分類法到知識圖譜，從敘詞表到 AI——知識如何被組織、檢索與理解。
> 本目錄是 DDC 000 知識庫群的主入口，串接 010 知識學導論至 070 數字知識系統共七個子庫。

---

## 📂 目錄結構 (v1.1)

```
3 Resources/000 Knowledge/           ← DDC 000 知識總論
│
├── 000 Knowledge.md                 ← MOC 主入口（本文件）
├── README.md                        ← 簡介與狀態
├── CLAUDE.md                        ← Schema 定義
│
├── 010-Prolegomena/                 ← 知識學導論
│   ├── 010-Prolegomena.md           MOC 入口
│   ├── 01-What-is-Knowledge/        📖 第1章
│   ├── 02-Sources-of-Knowledge/     📖 第2章
│   ├── ...                          📖 第3-8章
│   ├── 09-Applied-Epistemology/     📖 第9章
│   └── 99-資源收集/                 📦 資源與原始素材
│
├── 020-Knowledge-Organization/      ← 知識組織
├── 030-Library-Info-Science/        ← 圖書情報學
├── 040-Information-Science/         ← 資訊科學
├── 050-Classification-Metadata/     ← 分類法與元數據
├── 060-Knowledge-Management/        ← 知識管理
├── 070-Digital-Knowledge/           ← 數字知識系統
│
├── ram/                             ← 原始素材（跨子庫未分類）
│   ├── articles/                    網頁剪藏
│   ├── books/                       書摘
│   ├── conversations/               AI 對話記錄
│   ├── GTD/                         GTD 原始資料
│   ├── PARA/                        PARA 原始資料
│   ├── Zettelkasten/                卡片盒原始資料
│   ├── IOTO/                        IOTO 原始資料
│   ├── Obsidian/                    Obsidian 原始資料
│   ├── Notion/                      Notion 原始資料
│   ├── 飛書/                        飛書原始資料
│   └── OKR/                         OKR 原始資料
│
├── wiki/                            ← LLM-Wiki 編譯產物
│   ├── index.md                     知識索引
│   ├── log.md                       編譯日誌
│   ├── concepts/ (23)               概念頁
│   ├── entities/ (26)               實體頁
│   └── sources/ (1)                 來源溯源
│
└── outputs/                         ← 基於 Wiki 的製成品
```

---

## 🧭 DDC 子庫速覽

| DDC | 子庫 | 英文名 | 核心內容 | 狀態 |
|:---:|------|--------|---------|:----:|
| 010 | [[010-Prolegomena/010-Prolegomena\|知識學導論]] | Prolegomena | 認識論：什麼是知識？真理·信念·確證 | 🟢 |
| 020 | [[020-Knowledge-Organization/020-Knowledge-Organization\|知識組織]] | Knowledge Organization | KOS 譜系：分類法→敘詞表→本體→知識圖譜 | 🟢 |
| 030 | [[030-Library-Info-Science/030-Library-Info-Science\|圖書情報學]] | Library & Info Science | 圖書館學、信息檢索、信息服務 | 🟢 |
| 040 | [[040-Information-Science/040-Information-Science\|資訊科學]] | Information Science | 資訊理論、資訊架構、資訊行為 | 🟢 |
| 050 | [[050-Classification-Metadata/050-Classification-Metadata\|分類法與元數據]] | Classification & Metadata | DDC·UDC·CLC·LCC、元數據標準 | 🟢 |
| 060 | [[060-Knowledge-Management/060-Knowledge-Management\|知識管理]] | Knowledge Management | SECI·CoP·PKM·PARA·LLM-Wiki | 🟢 |
| 070 | [[070-Digital-Knowledge/070-Digital-Knowledge\|數字知識系統]] | Digital Knowledge | 語義網·RAG·LLM·知識工程 | 🟢 |

---

## 🧠 Wiki 編譯產物

> AI 從 `ram/` 原始素材編譯而來，保證可溯源。

| 類型 | 數量 | 入口 |
|:----|:---:|------|
| 概念 | 23 | [[3 Resources/000 Knowledge/wiki/index#概念索引\|概念索引]] |
| 實體 | 26 | [[3 Resources/000 Knowledge/wiki/index#實體索引\|實體索引]] |
| 來源 | 1 | [[wiki/sources/Knowledge-Systems\|知識庫溯源]] |

### 概念域分布

```
KOS 譜系 (7)        知識管理 (5)        AI+知識 (1)        認識論 (1)
├─ KOS               ├─ SECI            ├─ RAG              └─ 知識·學科·科學
├─ DIKW              ├─ PKM
├─ 分類法            ├─ 信息生命週期
├─ 敘詞表            ├─ 熵增與反熵
├─ 本體論            └─ 敘詞表規劃
├─ 知識圖譜
└─ 關聯數據

方法論/跨域 (6)      系統理論 (3)
├─ PARA              ├─ KOS 理論
├─ GTD               ├─ KOS 架構設計
├─ OKR               └─ 語義污染
├─ Zettelkasten
├─ 第二大腦
└─ LLM-Wiki
```

> 完整清單：[[3 Resources/000 Knowledge/wiki/index\|Wiki 知識索引]] · Schema：[[CLAUDE]]

---

## 📦 三大數據流

```
ram/（原始素材）          wiki/（編譯產物）          outputs/（製成品）
  人類/AI 收集              AI 獨佔寫入               基於 Wiki 生成
  ┌──────────┐   /wiki-    ┌──────────┐   /query    ┌──────────┐
  │ articles │  ──compile─▶│ concepts │  ──query──▶│ 報告     │
  │ books    │             │ entities │             │ 圖表     │
  │ convos   │             │ sources  │             │ 簡報     │
  └──────────┘             └──────────┘             └──────────┘
```

---

## 🔗 跨庫連接

| 方向   | 連結                                                   |
| ---- | ---------------------------------------------------- |
| 父節點  | [[3 Resources\|資源總覽]]                                |
| 同層關聯 | [[004 Computer science & technology\|DDC 004 計算機科學]] |
| 同層關聯 | [[100 Philosophy & Psychology\|DDC 100 哲學]]          |
| 同層關聯 | [[400 Language\|DDC 400 語言]]                         |
| 外部   | [[5 Zettels\|Zettels 卡片系統]]                          |

---

## ✅ 維護清單

### 日常
- [ ] 新資料存入 `ram/` 對應目錄
- [ ] 運行 `/triage` 分揀 Inbox 中的 KOS 相關內容

### 按需
- [ ] 運行 `/wiki-compile 000 knowledge` 增量編譯
- [ ] 檢查 `wiki/log.md` 確認編譯品質

### 每季
- [ ] 檢查概念/實體頁的 Sources 完整性
- [ ] 更新子庫 MOC 和學習路徑

---

## 📅 更新日誌

| 日期 | 更新內容 |
|------|----------|
| 2026-05-28 | 創建知識索引入口 |
| 2026-05-28 | **重構**：聚焦三層管道（ram → wiki → outputs） |
| 2026-05-29 | **新增**：CLC、LCC 四大分類法對比 |
| 2026-05-30 | **v1.1 重構**：對齊 DDC 知識分類體系，轉換繁體中文，新增子庫導航 |

---

*分類: 3 Resources/000 Knowledge · DDC: 000 Knowledge*
