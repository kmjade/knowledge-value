---
language: zh-tw
updated: 2026-05-31
---

# 🧠 knowledge-value — PARA × LLM-Wiki 融合系統

![PARA Method](https://img.shields.io/badge/PARA-Method-blue?style=for-the-badge)
![Obsidian](https://img.shields.io/badge/Obsidian-📎-7C3AED?style=for-the-badge)
![Claude Code](https://img.shields.io/badge/Claude-Code-🤖-10B981?style=for-the-badge)
![License](https://img.shields.io/badge/License-Apache--2.0-FF6B6B?style=for-the-badge)

[English](README.md) | [[README_zh-CN|簡體中文]] | [[README_zh-TW|繁體中文]]

---

## 概述

> 基於 **PARA 方法論** 與 **LLM-Wiki** 深度融合的個人知識管理系統。Claude Code 作為 AI Agent，在 Obsidian Vault 中承擔資訊路由與知識編譯的職責——從「檢索」到「編譯」，將維護成本降為零。

**核心理念**：一個 Vault、全部 Markdown、Claude Code 完全可存取。人類是資訊的生產者和消費者，AI 負責中間所有的整理工作。

---

## 目錄

- [系統架構](#-系統架構)
- [Vault 結構](#-vault-結構)
- [PARA 分類法](#-para-分類法)
- [DDC Wiki 子庫](#-ddc-wiki-子庫)
- [_INDEX 導航系統](#-index-導航系統)
- [核心規則](#-核心規則)
- [工作流程](#-工作流程)
- [Skills 技能庫](#-skills-技能庫)
- [標籤系統](#-標籤系統)
- [快速開始](#-快速開始)
- [文件資源](#-文件資源)

---

## 🏗️ 系統架構

```
┌─────────────────────────────────────────────────────────────┐
│                 📥 Layer 1 — 資訊擷取層                      │
│            0 Inbox/ → /triage 智慧分揀                       │
└──────────────────────────┬──────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                 🧭 Layer 2 — PARA 行動管理層                  │
│    1 Projects/ → 2 Areas/ → 3 Resources/ → 4 Archives/     │
└──────────────────────────┬──────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                 📚 Layer 3 — Wiki 知識編譯層                  │
│        raw/ → /wiki-compile → wiki/ → outputs/              │
│          (人類寫入·AI 唯讀)      (AI 獨占·人類唯讀)           │
└─────────────────────────────────────────────────────────────┘
                           ↕
                   🧠 CLAUDE.md 根憲法
                   Skills 技能庫驅動
```

![[_meta/diagram/para-llm-wiki-architecture.svg]]

---

## 📁 Vault 結構

```
knowledge-value/
├── 📥 0 Inbox/                  # 唯一入口 — 所有資訊匯集處
│   ├── _INDEX.md               #   收件匣快速導航
│   ├── _processed/             #   已分揀存檔
│   ├── Clippings/              #   網頁剪藏
│   └── [暫存檔案直接放這裡]
│
├── 🎯 1 Projects/              # 有截止日期的短期任務
│   ├── _INDEX.md               #   專案快速導航
│   ├── Creative/               #   創作類
│   ├── Learning/               #   學習類 (AutoCAD, ESP32, Python…)
│   ├── Personal/               #   個人類
│   ├── Work/                   #   工作類
│   └── 📁 已完成/              #   已完成專案
│
├── 🧭 2 Areas/                 # 持續維護的生活責任
│   ├── _INDEX.md               #   領域快速導航
│   ├── 01-Health/              #   健康
│   ├── 02-Career/              #   職業
│   ├── 03-Finance/             #   財務
│   ├── 04-Relationships/       #   人際
│   ├── 05-Learning/            #   學習
│   └── 06-Lifestyle/           #   生活
│
├── 📚 3 Resources/             # 知識資源庫 + DDC Wiki 子庫
│   ├── _INDEX.md               #   資源快速導航
│   ├── _META-INDEX.md          #   全域知識圖譜入口
│   ├── 000 Knowledge/          #   知識組織 (DDC 000)
│   ├── 300 Social Sciences/    #   社會科學 (DDC 300)
│   ├── 400 Language/           #   語言 (DDC 400)
│   ├── 500 Natural Sciences/   #   自然科學 (DDC 500)
│   ├── 600 Applied Sciences/   #   應用科學 (DDC 600)
│   └── 700 Arts/               #   藝術 (DDC 700)
│
├── 🗄️ 4 Archives/              # 已完成專案 · 過時資源
│   └── _INDEX.md               #   歸檔快速導航
│
├── ⚙️ _meta/                   # 系統中繼資料
│   ├── _INDEX.md               #   Vault 總儀表板
│   ├── ⚙️ 系統配置/            #   範本·標籤·結構配置
│   └── 🔗 知識關聯/            #   Dashboard & Index
│
├── 📋 _templates/              # 範本庫
├── 🤖 AI-Log/                  # AI 操作日誌 (sessions, triage-log, compile-log)
├── 📐 CLAUDE.md                # Agent 根憲法 (最重要的檔案)
└── 📖 README.md                # 本檔案
```

---

## 📊 PARA 分類法

| 分類 | 資料夾 | 說明 | 判斷標準 |
|:---:|--------|------|----------|
| 🔴 **Projects** | `1 Projects/` | 有明確目標和截止日期的短期任務 | 「有截止日期嗎？」→ 是 |
| 🟢 **Areas** | `2 Areas/` | 持續維護，沒有「完成」狀態 | 「需要持續維護嗎？」→ 是 |
| 🔵 **Resources** | `3 Resources/` | 感興趣的主題、參考資料 | 「感興趣但不需要立即行動？」→ 是 |
| ⚪ **Archives** | `4 Archives/` | 已完成/過時/不再需要 | 以上都不是 → 歸檔 |

### 決策樹

```
❓ 有明確目標和截止日期嗎？
  └─ ✅ 是 → 1 Projects
  └─ ❌ 否 → 需要持續維護嗎？
               └─ ✅ 是 → 2 Areas
               └─ ❌ 否 → 有參考價值嗎？
                           └─ ✅ 是 → 3 Resources
                           └─ ❌ 否 → 4 Archives
```

---

## 🏛️ DDC Wiki 子庫

知識資源按 **杜威十進分類法 (DDC)** 組織為 Wiki 子庫（活躍子庫在 `3 Resources/`，已歸檔子庫在 `4 Archives/`）：

| DDC | 子庫 | 位置 | 狀態 | 說明 |
|:---:|------|------|:---:|------|
| 000 | [[000 Knowledge\|知識組織]] | `3 Resources/` | 🟢 | 資訊科學·知識管理·電腦科學 |
| 100 | 哲學·心理學 | `4 Archives/` | 🗄️ | 古典哲學·易經·心理學 |
| 200 | 宗教·神學 | `4 Archives/` | 🗄️ | 基督教神學·宗教哲學 |
| 300 | [[300 Social Sciences\|社會科學]] | `3 Resources/` | 🟢 | 社會學·教育·公共行政 |
| 400 | [[400 Language\|語言學科]] | `3 Resources/` | 🟡 | 語言學概論·漢語·印歐語系 |
| 500 | [[500 Natural Sciences\|自然科學]] | `3 Resources/` | 🟢 | 數學·物理·化學·生物 |
| 600 | [[600 Applied Sciences\|應用科學]] | `3 Resources/` | 🟢 | 醫學·工程·製造·管理 |
| 700 | [[700 Arts\|藝術]] | `3 Resources/` | 🟡 | 繪畫·音樂·設計·書法 |
| 800 | 文學 | `4 Archives/` | 🗄️ | 中外文學·文學理論 |
| 900 | 歷史·地理 | `4 Archives/` | 🗄️ | 傳記·世界歷史 |

每個子庫結構：
```
[Topic]/
├── CLAUDE.md          # 子庫 schema
├── raw/               # 原始資料 (人類獨占 · AI 唯讀)
├── wiki/              # 編譯產物 (AI 獨占 · 人類唯讀)
│   ├── concepts/      #   概念頁面
│   ├── entities/      #   實體頁面
│   └── sources/       #   來源溯源
└── outputs/           # 基於 Wiki 生成的製品
```

---

## 🧭 _INDEX 導航系統

每個 PARA 目錄配備了 MOC 式 `_INDEX.md` 快速入口：

| 入口 | 用途 |
|------|------|
| [[_meta/_INDEX\|Vault 總儀表板]] | 全域導航 + 資訊流圖 + 系統連結 |
| [[0 Inbox/_INDEX\|Inbox 入口]] | 待分揀區域 + 分揀工作流 |
| [[1 Projects/_INDEX\|專案入口]] | Creative/Learning/Personal/Work 四分類 |
| [[2 Areas/_INDEX\|領域入口]] | 六大領域 + 檢視頻率 + 領域↔專案流 |
| [[3 Resources/_INDEX\|資源入口]] | DDC 子庫導航 + Wiki 編譯流 |
| [[4 Archives/_INDEX\|歸檔入口]] | 按類型/時間/狀態三維歸檔 |

---

## ⛔ 核心規則

來自 [[CLAUDE]] — 絕對不可違反：

| # | 規則 | 說明 |
|:---:|------|------|
| 1 | **禁止修改 `raw/`** | 原始資料是人類的知識基線，AI 唯讀 |
| 2 | **永不刪除檔案** | 只移動到 `4 Archives/`，刪除需二次確認 |
| 3 | **Wiki 必須有 Sources** | 每個編譯頁面標註來源 raw/ 檔案 |
| 4 | **Inbox 分揀前不讀取** | 防止未分揀資訊污染 Wiki |

---

## 🔄 工作流程

### 端到端資訊流

```
📥 擷取 ──→ /triage ──→ {1 Projects · 2 Areas · 3 Resources} ──→ raw/
                                                                      │
                                                               /wiki-compile
                                                                      │
                                                                      ▼
                                                                   wiki/
                                                                      │
                                                                      ▼
                                                                 outputs/
```

### 每日工作流

| 時刻 | 操作 | 命令 |
|------|------|------|
| 🌅 早晨 | 載入會話狀態 | `/context` |
| 🌅 早晨 | 建立/初始化今日日記 | `/daily-open` |
| 📥 全天 | 所有資訊丟進 Inbox | 手動 / Web Clipper |
| 🌙 睡前 | 分揀 Inbox | `/triage` |

### 每週工作流

| 時刻 | 操作 | 命令 |
|------|------|------|
| 📅 週末 | 週回顧 + 知識蒸餾 + 過期歸檔 | `/weekly-review` |
| 🔍 隨時 | 系統健康檢查 | `/lint` |

---

## 🤖 Skills 技能庫

| 命令 | 功能 | 說明 |
|------|------|------|
| `/triage` | 📥 智慧分揀 | 分析 Inbox 檔案 → 路由到 PARA + Wiki raw/ |
| `/wiki-compile` | 📚 知識編譯 | raw/ → 提取概念/實體 → 寫入 wiki/ |
| `/context` | 📍 狀態載入 | 載入活躍專案、今日待辦、Inbox 狀態 |
| `/daily-open` | 🌅 每日開啟 | 建立今日日記 + 自動填充任務 |
| `/weekly-review` | 📊 每週回顧 | 匯總週數據 + 批量編譯 + 過期歸檔 |
| `/lint` | 🔍 健康檢查 | 死鏈檢測·孤立頁·未編譯原料·矛盾匯總 |

### 輔助 Skills

| 命令 | 功能 |
|------|------|
| `/search` | 🔍 搜尋內容 |
| `/obsidian` | 📎 Obsidian 語法/外掛輔助 |
| `/first-cn-tw` | 繁體中文優先 |
| `/english-first` | English First |

---

## 🏷️ 標籤系統

統一標籤體系，覆蓋 PARA、狀態、知識分類：

| 類別 | 標籤範例 | 用途 |
|------|----------|------|
| **PARA** | `#project/`, `#area/`, `#resource/` | 按可執行性分類 |
| **狀態** | `#status/active`, `#status/archived` | 生命週期追蹤 |
| **類型** | `#type/concept`, `#type/entity`, `#type/daily` | 筆記類型 |
| **專題** | `#topic/ai-ml`, `#topic/philosophy` | 主題歸類 |
| **生命週期** | `#lifecycle/ephemeral`, `#lifecycle/evergreen` | 資訊時效分級 |

完整規範見 [[_meta/⚙️ 系统配置/tag-system-guide|標籤系統指南]] 和 [[_meta/⚙️ 系统配置/tag-quick-reference|快速參考]]。

---

## 🚀 快速開始

1. **開啟 Obsidian** → 載入 `knowledge-value` Vault
2. **啟動 Claude Code** → `claude` 在 Vault 根目錄
3. **載入狀態** → `/context`
4. **開始擷取** → 所有新資訊直接丟進 `0 Inbox/`
5. **分揀整理** → `/triage`
6. **編譯知識** → `/wiki-compile [topic]`

### 最小可用集

只需三個檔案就能啟動：

- `CLAUDE.md` — Agent 憲法
- `.claude/skills/triage.md` — 分揀引擎
- `.claude/skills/wiki-compile.md` — 知識編譯

---

## 📚 文件資源

### 核心文件

| 文件 | 說明 | 優先級 |
| --- | --- | :-: |
| [[CLAUDE]] | Claude Code 根憲法 + 系統指令 | ⭐⭐⭐ |
| [[1 Projects/Work/PARA × LLM-Wiki 融合系统/PARA × LLM-Wiki 融合系统\|PARA × LLM-Wiki 融合系統]] | 完整架構設計文件 v1.0 | ⭐⭐⭐ |
| [[_meta/_INDEX]] | Vault 總儀表板 | ⭐⭐ |
| [[3 Resources/_META-INDEX]] | 全域 Wiki 導航 | ⭐⭐ |

### 系統配置

| 文件 | 說明 |
|------|------|
| [[_meta/⚙️ 系统配置/⚙️ 系统配置]] | 系統配置總覽 |
| [[_meta/⚙️ 系统配置/tag-system-guide]] | 標籤系統完整指南 |
| [[_meta/⚙️ 系统配置/知识库结构概览]] | Vault 結構詳細說明 |
| [[_meta/⚙️ 系统配置/PARA 模板库]] | 範本索引 |

---

## 常見問題

<details>
<summary>如何開始使用？</summary>

1. 開啟 Obsidian，載入本 Vault
2. 所有新資訊直接放進 `0 Inbox/`
3. 執行 `/triage` 讓 AI 自動分揀
4. 執行 `/wiki-compile [topic]` 編譯知識

</details>

<details>
<summary>PARA 和 LLM-Wiki 如何協同？</summary>

- **PARA** — 按可執行性組織（Projects/Areas/Resources/Archives）
- **LLM-Wiki** — 按知識深度組織（raw/ → wiki/ → outputs/）
- 兩者透過 `3 Resources/` 融合——它是 Resources 資料夾，也是 Wiki 子庫掛載點

</details>

<details>
<summary>AI 能修改我的筆記嗎？</summary>

分區控制：
- `0 Inbox/` — AI 讀取並分揀
- `1 Projects/`、`2 Areas/` — AI 輔助整理
- `3 Resources/raw/` — **人類獨占**，AI 唯讀
- `3 Resources/wiki/` — **AI 獨占**，人類唯讀
- `4 Archives/` — AI 自動歸檔

</details>

<details>
<summary>如何新增筆記？</summary>

1. 所有內容先進 `0 Inbox/`（手動、Web Clipper、行動端均可）
2. 執行 `/triage` — AI 自動分析時效性/主題/人物，路由到正確位置
3. 參考資料進入 `raw/` 後，執行 `/wiki-compile` 編譯為 Wiki 頁面

</details>

<details>
<summary>支援多語言嗎？</summary>

是的！系統支援簡體中文（預設）、繁體中文、English。

</details>

---

## 聯絡方式

| 管道 | 連結 |
|------|------|
| 🐙 **GitHub** | [knowledge-value](https://github.com/kmjade/knowledge-value.git) |
| 🐛 **Issues** | [報告問題](https://github.com/kmjade/knowledge-value/issues) |

---

## 授權條款

<div align="center">

Apache License 2.0

</div>

---

> 💡 **提示**：不確定從哪裡開始？執行 `/context` 載入當前狀態，AI 會告訴你今天該做什麼。

**🌟 一個 Vault，全部知識，AI 驅動。**

---

<div align="center">

Made with ❤️ by knowledge-value Team

</div>
