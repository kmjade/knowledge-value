---
title: LLM-Wiki 概述
aliases: [LLM-Wiki Overview, LLM-Wiki 定義, LLM Wiki Introduction]
tags: [DDC/006.3, llm-wiki, km, concept, overview]
created: 2026-06-01
type: concept
topic: 006.3-LLM-Wiki
---

# 01 — LLM-Wiki 概述

> LLM-Wiki 是一套以 LLM 為核心編譯引擎的知識庫構建方法論。
> 它將 AI 視為「知識編譯器」而非對話夥伴，系統性地將原始資訊轉化為結構化知識。

---

## 一、核心定義

LLM-Wiki = **LLM-driven Knowledge Compilation Pipeline**

| 維度 | 定義 |
|------|------|
| **目的** | 將散亂的原始資訊（raw/）系統化為可查詢、可推理的結構化知識（wiki/） |
| **角色** | LLM 是「編譯器」——非對話助手，而是知識轉化的執行引擎 |
| **產出** | 概念頁（concepts）、實體頁（entities）、來源頁（sources）三類結構化頁面 |
| **維護** | 增量編譯 + 定期 Lint，支持持續演進 |

---

## 二、三層架構詳解

```
Layer 3 ┌── CLAUDE.md ─────────────────────────────┐
        │  Schema · 規則 · 模板 · 三大操作定義         │
        │  角色：人類定義，AI 執行                      │
Layer 2 ├── wiki/ ─────────────────────────────────┤
        │  concepts/ · entities/ · sources/          │
        │  index.md · log.md                         │
        │  角色：AI 獨佔寫入，人類只讀                  │
Layer 1 ├── raw/ ──────────────────────────────────┤
        │  articles/ · papers/ · books/              │
        │  conversations/ · clippings/               │
        │  角色：人類維護，AI 只讀                      │
        └────────────────────────────────────────────┘
```

### Layer 1: raw/ — 原始資料層

- **維護者**：人類（剪藏、筆記、對話記錄）
- **AI 權限**：只讀——絕不寫入，確保原始純淨
- **組織方式**：按類型分目錄（articles/, papers/, books/, conversations/）
- **標記機制**：每篇 raw 文件 frontmatter 含 `compiled: false` 標記，編譯後改為 `true`

### Layer 2: wiki/ — 知識編譯層

- **維護者**：AI（IngestAgent 寫入，QueryAgent 讀取）
- **人類權限**：只讀——可引用但不直接編輯
- **頁面類型**：concepts（概念）、entities（實體）、sources（來源溯源）
- **連接機制**：通過 `[[wikilinks]]` 建立知識網絡

### Layer 3: CLAUDE.md — 配置與約定層

- **定位**：每個子庫的「編譯器配置文件」
- **內容**：概念域定義、實體類型、頁面模板、編譯規則、跨庫映射
- **三大操作**：Ingest（導入）、Query（查詢）、Lint（維護）

---

## 三、與傳統 Wiki 的對比

| 維度 | 傳統 Wiki | LLM-Wiki |
|------|----------|----------|
| **維護方式** | 人類手動撰寫 | AI 自動編譯 |
| **更新速度** | 依賴人力，緩慢 | 批量處理，高效 |
| **一致性** | 風格不一致 | Schema 保證統一 |
| **連接密度** | 稀疏 | 通過 wikilinks 自動建立 |
| **溯源能力** | 弱 | 每個概念可追蹤到 raw 來源 |
| **知識發現** | 被動瀏覽 | AI Query 主動推理 |
| **適用場景** | 團隊協作文檔 | 個人/團隊知識庫 |

---

## 四、與 PARA 的整合關係

LLM-Wiki 不取代 PARA，而是作為 PARA 的知識層補充：

| PARA 層 | 對應 LLM-Wiki | 關係 |
|---------|--------------|------|
| Projects | — | 短期行動，不納入 wiki |
| Areas | raw/ | 長期關注領域的原始資料輸入 |
| Resources | wiki/ | 從 raw 編譯而來的結構化知識 |
| Archives | outputs/ | 基於 wiki 產出的報告、文章等 |

---

## 五、設計哲學

| 原則 | 說明 |
|------|------|
| **Separation of Concerns** | raw 與 wiki 嚴格分離，人類與 AI 各司其職 |
| **Compile Once, Query Many** | 編譯是昂貴操作，查詢應隨時可用 |
| **Progressive Compilation** | 增量編譯——只處理未標記 compiled 的文件 |
| **Source Traceability** | 知識必須可追溯，每條 wiki 都有 source 鏈接 |
| **Evergreen Maintenance** | 定期 Lint 清除過時、矛盾、孤立頁面 |

---

## 相關連結

- [[../006 Artificial Intelligence|006 AI 知識庫]] — 父級入口
- [[006.3-LLM-Wiki]] — 本庫 MOC
- [[02-CLAUDE.md-设计]] — Schema 設計
- [[03-编译工作流]] — 操作流程
- [[../../000 Knowledge/wiki/concepts/LLM-Wiki|LLM-Wiki 概念頁]] — 000 域的 LLM-Wiki 概念
