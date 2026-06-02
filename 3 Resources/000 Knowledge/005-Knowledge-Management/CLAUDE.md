---
title: DDC 060 — Wiki Schema
created: 2026-06-01
updated: 2026-06-02
type: wiki-schema
topic: knowledge-management
version: "1.0"
aliases:
  - KM Schema
  - 知識管理子庫
ddc: "060"
udc: "659.2"
tags:
  - udc
  - ddc
  - classification
  - knowledge-management
---

#  知識管理 Wiki Schema

> 知識管理（Knowledge Management）的完整知識庫，從 SECI 模型到 AI 時代的 KM 新範式。
> 遵循 [[00-索引|PARA+LLM-Wiki 整合系統 v1.2]] 標準。

---

## 子庫結構

```
3 Resources/000 Knowledge/005-Knowledge-Management/
├── 060-Knowledge-Management.md          # MOC 主入口
├── CLAUDE.md                            # 本文件：Schema 定義
├── tasks.md                             # 工作清單
│
├── 01-KM-Overview-KM概述/              # KM 定義與發展
├── 02-SECI-Model-SECI模型/             # 知識創造理論
├── 03-Communities-of-Practice/          # 實踐社區
├── 04-Knowledge-Audit/                  # 知識審計
├── 05-Knowledge-Sharing/                # 知識共享
├── 06-Organizational-Learning/          # 組織學習
├── 07-Personal-KM/                      # 個人知識管理
├── 08-KM-Tools-KM工具/                 # KM 工具與平台
├── 09-Future-of-KM/                     # KM 未來趨勢
├── 99-資源收集/                         # 資源與原始素材
│
├── raw/                                 # 原始資料（人類維護，AI 只讀）
│   └── articles/                        外部文章剪藏
│
├── wiki/                                # LLM 編譯產物（AI 獨佔）
│   ├── index.md                         知識索引
│   ├── log.md                           編譯日誌
│   ├── concepts/                        概念頁面
│   ├── entities/                        實體頁面
│   └── sources/                         來源溯源
│
└── outputs/                             # 基於 Wiki 的製成品
```

---

## DDC 060 分類體系

| DDC | 章節 | 描述 |
|:---:|------|------|
| 060.1 | 01-KM-Overview | KM 定義、發展簡史、核心流派 |
| 060.2 | 02-SECI-Model | Nonaka 知識創造螺旋、Ba 概念 |
| 060.3 | 03-Communities-of-Practice | Wenger 實踐社區理論 |
| 060.4 | 04-Knowledge-Audit | 知識盤點與診斷方法論 |
| 060.5 | 05-Knowledge-Sharing | 共享動機、障礙、機制設計 |
| 060.6 | 06-Organizational-Learning | Senge、Argyris 學習型組織 |
| 060.7 | 07-Personal-KM | PKM 方法論與工具 |
| 060.8 | 08-KM-Tools | KM 工具分類與選型 |
| 060.9 | 09-Future-of-KM | AI+KM、知識激活 |

---

## 核心概念域

### 組織知識管理
- 知識管理 (Knowledge Management)
- SECI 模型 (Socialization / Externalization / Combination / Internalization)
- Ba（場）— 知識創造的共享空間
- 實踐社區 (Communities of Practice)
- 知識審計 (Knowledge Audit)
- 知識共享 (Knowledge Sharing)
- 知識保留 (Knowledge Retention)
- 組織學習 (Organizational Learning)
- 單環/雙環/三環學習 (Single/Double/Triple-Loop Learning)
- 學習型組織 (Learning Organization)
- 知識資產 (Knowledge Assets)
- 隱性知識 vs 顯性知識 (Tacit vs Explicit Knowledge)

### 個人知識管理 (PKM)
- 第二大腦 (Second Brain)
- 卡片盒筆記法 (Zettelkasten)
- 漸進式總結 (Progressive Summarization)
- PARA 方法論
- GTD (Getting Things Done)
- 知識復利 (Knowledge Compound Interest)
- 知識網絡理論 (Knowledge Network Theory)

### AI + KM
- 檢索增強生成 (RAG)
- LLM Wiki 方法論
- AI 驅動的知識編譯
- 知識激活 (Knowledge Activation)

### KM 工具生態
- Obsidian
- Notion
- Roam Research
- Confluence / SharePoint
- 知識圖譜工具

---

## Wiki 頁面模板

### 概念頁面 (concepts/)

```yaml
---
aliases:
  - [英文別名]
created: YYYY-MM-DD
type: concept
topic: knowledge-management
status: draft | reviewed | evergreen
---
```

**必備章節**:
- `## 定義` — 一句話定義
- `## 核心原理` — 詳細說明
- `## 應用場景` — 實際案例
- `## 相關概念` — `[[]]` 鏈接
- `## Sources` — 來源追溯

### 實體頁面 (entities/)

```yaml
---
aliases:
created: YYYY-MM-DD
type: entity
entity_type: person | framework | tool | organization | book
topic: knowledge-management
---
```

**必備章節**:
- `## 基本信息`
- `## 貢獻/特點`
- `## 與 KM 的關聯`
- `## Sources`

### 來源頁面 (sources/)

```yaml
---
source_url: ""
source_author: ""
source_date: YYYY-MM-DD
created: YYYY-MM-DD
type: source
topic: knowledge-management
---
```

**必備章節**:
- `## 摘要`
- `## 關鍵論點`
- `## 衍生概念`
- `## 引用頁面`

---

## 實體類型枚舉

| entity_type | 說明 | 示例 |
|-------------|------|------|
| `person` | 人物 | Ikujiro Nonaka, Peter Senge, Etienne Wenger |
| `framework` | 理論框架 | SECI Model, CoP Framework |
| `tool` | 工具 | Obsidian, Notion, Confluence |
| `organization` | 組織 | KM Institute, APQC |
| `book` | 重要著作 | The Knowledge-Creating Company |

---

## 編譯規則

1. **raw/ 唯讀** — AI 不修改原始資料
2. **Sources 必須** — 所有 wiki 頁面必須標註來源
3. **鏈接優先** — 使用 `[[]]` 建立知識連接
4. **增量編譯** — 只處理 `compiled: false` 的文件
5. **優先更新** — 編譯時優先更新現有頁面，避免重複
6. **繁體中文** — 內容使用繁體中文，技術術語保留英文

---

## 編譯觸發條件

| 條件 | 動作 |
|------|------|
| `raw/articles/` 新增 ≥ 3 個 `compiled: false` 文件 | `/wiki-compile 060 knowledge` |
| 用戶主動要求 | `/wiki-compile 060 knowledge` |
| 章節內容更新後需同步 wiki | `/wiki-compile 060 knowledge --incremental` |

---

## 跨庫關聯

| DDC | 鏈接 | 說明 |
|:---:|------|------|
| 000 | [[../../000 Knowledge/000 Knowledge\|DDC 000 知識總論]] | 知識組織系統 (KOS) |
| 100 | [[../../../100 Philosophy/100 Philosophy\|DDC 100 哲學]] | 認識論基礎 |
| 600 | [[../../../600 Applied/600 Applied\|DDC 600 應用科學]] | 計算機科學·AI |

---

## UDC 映射

| 維度 | UDC | 說明 |
|:----|:---:|:-----|
| **基礎號** | `659.2` | 知識管理 (主分類) |
| **SECI 模型** | `659.2` | 知識創造理論 |
| **組織學習** | `659.2:37` | KM:教育·學習 |
| **PKM** | `659.2:65` | 個人 KM:管理 |
| **AI+KM** | `659.2:004.8` | KM:人工智能 |
| **標籤** | `#udc/060` | DDC 兼容標籤 |

**映射規則**:
1. 概念 frontmatter 使用 `ddc: "060"` + `udc: "659.2"`
2. 跨領域概念使用 `:` 複合 (如 KM+AI → `659.2:004.8`)
3. 標籤使用 `#udc/060` 為基礎，跨域時附加 `#udc/004.8` 等

**Frontmatter 示例**:
```yaml
---
aliases: [知識編譯, Knowledge Compilation]
created: YYYY-MM-DD
type: concept
topic: knowledge-management
ddc: "060"
udc: "659.2"
clc: "G302"
tags:
  - #udc/060
---
```

## 使用命令

- `/wiki-compile 060 knowledge` — 編譯此知識庫
- `/triage` — 將新 KM 相關資料分揀到 raw/
- `/lint` — 健康檢查

---

*分類: 3 Resources/000 Knowledge/060-Knowledge-Management · DDC: 060 · UDC: 659.2 · Schema v1.1*
