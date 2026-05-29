---
title: LLM Wiki
aliases:
  - LLM Wiki 方法论
  - LLM 知识库
para: resource
domain:
  - "[[AI-Agent]]"
subtopic:
  - 知识管理
tags:
  - para/resource/tech
  - topic/ai
  - topic/knowledge-management
  - type/guide
created: 2026-05-24
modified: 2026-05-24
source: https://github.com/luotwo/llm-wiki
---

# LLM Wiki

> [!summary] 概述
> LLM Wiki 是一種用 LLM 構建個人知識庫的方法論。與傳統 RAG（每次查詢從頭檢索）不同，LLM 會**持續構建並維護一個結構化的 Markdown Wiki**，知識隨每次導入和查詢不斷積累，形成復利效應。

---

## 核心理念

### 與 RAG 的區別

| 特性 | 傳統 RAG | LLM Wiki |
|------|----------|----------|
| 知識存儲 | 原始文檔 | 結構化 Wiki |
| 查詢方式 | 每次從頭檢索 | 直接讀取已整理的知識 |
| 知識積累 | 無積累 | 復利增長 |
| 交叉引用 | 臨時關聯 | 永久鏈接 |
| 矛盾處理 | 無 | 明確標註 |

### 核心比喻

> **Obsidian 是 IDE，LLM 是程序員，Wiki 是代碼庫。**

- **人類的工作**：策劃資料來源、引導分析方向、提出好問題、思考意義
- **LLM 的工作**：總結、交叉引用、歸檔、記賬——其餘一切

---

## 三層架構

```
┌─────────────────────────────────────────────┐
│                  Schema                      │
│    (CLAUDE.md / AGENTS.md 配置文件)          │
│    告訴 LLM 如何組織和維護 Wiki              │
├─────────────────────────────────────────────┤
│                   Wiki                       │
│    LLM 生成維護的知識庫頁面                   │
│    摘要、實體頁、概念頁、比較、綜合           │
├─────────────────────────────────────────────┤
│               Raw Sources                    │
│    原始資料（不可變）                         │
│    文章、論文、圖片、數據文件                 │
└─────────────────────────────────────────────┘
```

### 1. Raw Sources（原始資料）

- 文章、論文、圖片、數據文件
- **不可變**：LLM 只讀，永不修改
- 這是真實來源

### 2. Wiki（知識庫）

- LLM 生成的 Markdown 文件
- 摘要、實體頁、概念頁、比較、概覽、綜合
- LLM 完全擁有此層
- 你閱讀，LLM 編寫

### 3. Schema（配置）

- 文檔（如 CLAUDE.md 或 AGENTS.md）
- 告訴 LLM Wiki 結構、約定、工作流
- 這是關鍵配置文件

---

## 目錄結構

```
項目根目錄/
  raw/                  # 原始資料（不可變，LLM 只讀）
    assets/             # 圖片、附件
    文章標題.md          # 剪藏的文章
  wiki/                 # LLM 生成維護的知識庫頁面
    index.md            # 內容索引目錄
    log.md              # 操作日誌（按時間追加）
    source-xxx.md       # 資料摘要頁
    實體名.md            # 實體頁（工具、產品、人物）
    概念名.md            # 概念頁（方法論、模式）
    xxx-workflow.md     # 工作流頁面
  skill/                # Skill 文件備份
    SKILL.md
```

---

## 頁面規範

### 頁面類型

| 頁面類型 | 命名格式 | 示例 |
|----------|---------|------|
| 資料摘要 | `source-{關鍵詞}.md` | `source-claude-code-n8n-workflow.md` |
| 實體頁 | `{實體名}.md` | `claude-code.md`、`n8n.md` |
| 概念頁 | `{概念名}.md` | `two-layer-automation.md` |
| 工作流 | `{場景}-workflow.md` | `competitive-analysis-workflow.md` |

### Frontmatter 模板

```yaml
# 資料摘要頁
---
tags: [source-summary, 領域標籤1, 領域標籤2]
source: "原文標題"
author: 作者名
date: YYYY-MM-DD
url: "原始鏈接"
---

# 實體頁
---
tags: [entity, tool]
type: entity
---

# 概念頁
---
tags: [concept]
type: concept
---
```

---

## 三大操作

### 1. Ingest（導入資料）

#### 導入流程

將資料放入 `raw/` 目錄後，告訴 Claude：

```
請導入 raw/文章標題.md 到知識庫
```

Claude 會執行以下操作（一篇 2000-3000 字的文章通常觸及 5-8 個文件）：

1. 閱讀資料，與你討論關鍵要點
2. 創建摘要頁 `wiki/source-xxx.md`
3. 創建/更新相關實體頁和概念頁（通常 1-3 個新頁面）
4. 在所有頁面之間建立 `[[雙向鏈接]]` 交叉引用
5. 更新 `wiki/index.md` 索引
6. 在 `wiki/log.md` 追加導入記錄
7. 標註新資料與已有內容的矛盾或補充關係

#### 復利效應

從第二篇開始，Claude 會額外做：

- **更新已有頁面**：新案例/數據補充到已有的實體頁和概念頁
- **標註跨資料關聯**：多篇資料出現相似觀點時明確標註
- **標註矛盾**：不同資料的衝突觀點會被標註，不會偷偷覆蓋

### 2. Query（查詢）

直接向 Claude 提問：

```
根據知識庫，對比 X 和 Y 的區別
知識庫裡關於 XX 有什麼要點？
總結一下目前所有資料的核心觀點
```

Claude 會先讀 `wiki/index.md` 定位相關頁面，再深入閱讀後綜合回答。

> [!tip] 重要
> 有價值的回答可以回寫為新 Wiki 頁面，讓探索也能積累。

### 3. Lint（維護健康）

定期讓 Claude 檢查：

```
請檢查知識庫的健康狀態
```

#### 檢查項目

| 檢查項 | 說明 |
|--------|------|
| 頁面間矛盾 | 不同頁面的衝突內容 |
| 過時信息 | 被新資料取代的內容 |
| 孤立頁面 | 無入站鏈接的頁面 |
| 缺失頁面 | 被提及但缺少專屬頁面的重要概念 |
| 缺失引用 | 可補充的交叉引用 |
| 數據空白 | 可填補的數據空白 |

---

## 快速開始

### Step 1：初始化

```
請幫我初始化一個 LLM Wiki 知識庫
```

### Step 2：放入第一份資料

用 Obsidian Web Clipper 剪藏一篇文章，放到 `raw/` 目錄：

```
請導入 raw/文章標題.md 到知識庫
```

### Step 3：開始提問

```
知識庫中關於 XX 話題有哪些要點？
```

### 日常使用速查

| 你做什麼 | 說什麼 |
|----------|--------|
| 剛開始 | "初始化一個知識庫" |
| 加了新資料 | "導入 raw/文件名.md" |
| 想了解什麼 | 直接問 |
| 維護檢查 | "檢查知識庫健康狀態" |

---

## 推薦工具

| 工具 | 用途 | 必要性 |
|------|------|--------|
| **Obsidian** | 瀏覽 Wiki、查看圖譜視圖、實時預覽頁面關聯 | 強烈推薦 |
| **Obsidian Web Clipper** | 瀏覽器一鍵剪藏網頁文章為 Markdown | 強烈推薦 |
| **Git** | 版本控制，天然擁有歷史記錄 | 推薦 |
| **Dataview** | 基於 frontmatter 生成動態表格和列表 | 可選 |
| **Marp** | 從 Wiki 內容生成演示文稿 | 可選 |
| **qmd** | Wiki 頁面搜索引擎（BM25 + 向量混合檢索） | 大規模時需要 |

### Obsidian 推薦設置

- **附件目錄**：Settings → Files and links → Attachment folder path → 設為 `raw/assets/`
- **下載附件快捷鍵**：Settings → Hotkeys → 搜索 "Download" → 綁定 `Ctrl+Shift+D`
- **圖譜視圖**：查看 Wiki 結構——哪些是樞紐頁、哪些是孤立頁

---

## 適用場景

| 場景 | 說明 |
|------|------|
| **個人成長** | 追蹤目標、健康、心理、自我提升 |
| **研究** | 深入某個主題，持續數周/月，逐步構建全面 Wiki |
| **讀書** | 按章節記錄，構建人物、主題、情節線索頁 |
| **商業/團隊** | 從 Slack、會議、項目文檔中維護內部 Wiki |
| **競品分析** | 持續追蹤競爭對手動態 |
| **盡職調查** | 系統化整理調查資料 |
| **旅行規劃** | 積累旅行資訊和經驗 |
| **課程筆記** | 結構化課程知識 |

---

## 索引與日誌

### index.md（內容索引）

- 面向內容的目錄
- Wiki 中所有頁面的列表
- 每頁一行，包含鏈接、一行摘要、可選元數據
- 按類別組織（實體、概念、來源等）
- LLM 在每次導入時更新

### log.md（操作日誌）

- 按時間順序的追加記錄
- 記錄導入、查詢、lint 檢查
- 格式：`## [2026-04-02] ingest | Article Title`
- 可用簡單 Unix 工具解析
- 提供知識庫演進時間線

---

## 為什麼這有效

> 維護知識庫的繁重工作不是閱讀和思考，而是記賬——更新交叉引用、保持摘要最新、標註矛盾、維護一致性。人類因維護負擔增長快於價值而放棄 Wiki。LLM 不會厭倦，不會忘記更新引用，一次操作可以觸及 15 個文件。維護成本趨近於零，Wiki 就能持續運轉。

---

## 相關鏈接

- [[3 Resources/000 Knowledge/Computer-Science/Artificial-Intelligence/02-机器学习/ai-ml/raw/articles/LLM-Wiki/wiki/index]] - 知識庫索引
- [[3 Resources/000 Knowledge/Computer-Science/Artificial-Intelligence/02-机器学习/ai-ml/raw/articles/LLM-Wiki/wiki/log]] - 操作日誌
- [[two-layer-automation]] - 兩層自動化概念
- [[3 Resources/000 Knowledge/Computer-Science/Artificial-Intelligence/02-机器学习/ai-ml/raw/articles/LLM-Wiki/wiki/claude-code]] - Claude Code 實體頁

---

## 外部鏈接

- [GitHub 倉庫](https://github.com/luotwo/llm-wiki)
- [Tolkien Gateway](https://tolkiengateway.net/wiki/Main_Page) - 粉絲 Wiki 範例
