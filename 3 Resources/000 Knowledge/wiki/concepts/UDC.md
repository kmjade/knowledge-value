---
aliases:
  - 國際十進分類法
  - Universal Decimal Classification
  - UDC
  - UDK
  - Classification décimale universelle
created: 2026-06-02
updated: 2026-06-02
type: concept
topic: knowledge-systems
category: 分類系統
status: reviewed
ddc: "001"
udc: "001"
confidence: high
tags:
  - #udc/001
  - #udc/025.4
  - #ddc/001
---
# UDC 國際十進分類法

> **Universal Decimal Classification** — 第一個分面分類系統，知識組織史上從「單維層級」到「多維分面」的範式轉變。

---

## 定義

UDC（國際十進分類法）由 [[entities/Paul-Otlet-奥特勒|Paul Otlet]] 和 [[entities/Henri-La-Fontaine|Henri La Fontaine]] 於 **1895-1905** 年間基於 DDC 擴展而成的**分面分類系統**。其核心創新是引入符號組合機制，讓單一分類號能表達**複合主題**、**地理維度**、**時間維度**和**形式類型**。

> "UDC is not merely an enumeration of classes, but a **language for expressing subjects** through the combination of notations." — UDC Consortium

---

## 核心原理

### 分面分類哲學

DDC 是**層級樹狀**結構——每個主題只有一個固定位置。UDC 的革命性在於引入**分面組合**：

```
DDC 思維: 書只有一個位置 → 放在 63 (農業) 或 669 (冶金)
UDC 思維: 主題可以組合 → 669.14:631 (鋼纜:農業用途)
```

**分面分類的三個核心原則**：

1. **分析性** — 將複雜主題分解為獨立分面（what · where · when · how）
2. **組合性** — 用符號將分面重新組合為精確表達
3. **可擴展性** — 新概念通過已有分面組合表達，無需重構體系

### 與 LLM-Wiki 的類比

```
分面分類                  LLM-Wiki
────────────             ─────────
分面 = 概念維度           概念頁面 = 獨立知識單元
複合號 = 分面組合           [[wikilink]] = 概念連結
:: 固定順序關聯            有序連結列表
[ ] 分組                 嵌套概念結構
```

---

## 12 種分面符號

UDC 的核心競爭力在其**符號系統**。以下是完整的 12 種符號及其在 LLM-Wiki 中的等價表達：

| # | 符號 | 名稱 | 含義 | 範例 | LLM-Wiki 等價 |
|:-:|:----:|:----|:-----|:-----|:-------------|
| 1 | `+` | 並列號 | 兩個不相關主題 | `59+636` 動物學+畜牧業 | 兩個獨立概念頁面 |
| 2 | `/` | 擴展號 | 連續範圍 | `592/599` 動物學全部 | 分類層級索引 |
| 3 | `:` | **關聯號** | 主題間關係 | `37:004` 教育中使用電腦 | `[[Education]] uses [[Computer]]` |
| 4 | `::` | 固定關聯 | 永久順序關係 | `51::62` 數學應用於工程 | 固定排序的交叉連結 |
| 5 | `[ ]` | 組合號 | 子分組 | `[37:004]:63` 教育技術:農業 | 巢狀概念分組 |
| 6 | `*` | 星號 | 非 UDC 編號 | `629.4***4` | 外部編號引用 |
| 7 | `A/Z` | **字母擴展** | 專名細分 | `004.451Linux` | 實體名直接擴展 |
| 8 | `(0...)` | 形式復分 | 文獻類型 | `(03)` 百科全書 | type: reference |
| 9 | `(1/9)` | **地理復分** | 地點 | `(510)` 中國 | raw/ 地理分類 |
| 10 | `(=...)` | 種族/語言 | 民族 | `(=512.1)` 突厥民族 | people/ 屬性 |
| 11 | `"..."` | **時間復分** | 日期 | `"2026"` 2026年 | periodic/ 日期 |
| 12 | `-0...` | 通用特性 | 屬性 | `-021` 人工製品 | concept 屬性字段 |

> ⭐ 標記為最常用的 5 種符號

---

## DDC ↔ UDC 對比

| 維度 | DDC | UDC | 互補關係 |
|:----|:----|:----|:---------|
| 發明者 | Melvil Dewey (1876) | Paul Otlet + Henri La Fontaine (1905) | Otlet 基於 Dewey 擴展 |
| 分類哲學 | 層級樹狀 | 分面組合 | 骨架 vs 關節 |
| 核心符號 | 數字 (3 位) | 數字 + 12 種符號 | DDC 是 UDC 的子集 |
| 複合表達 | ❌ 不可複合 | ✅ `:` `+` `-` 等 | UDC 表達能力更強 |
| 輔助表 | ❌ 有限 | ✅ 獨立輔助表 (7 種) | 時間/地點/語言/形式 |
| 維護機構 | OCLC (美國) | UDC Consortium (荷蘭) | 兩個獨立體系 |
| 使用範圍 | 圖書館 (140+ 國家) | 專業文獻·專利·標準 | 互補 |
| 最新版本 | DDC 23 (2021) | UDC 中版 (2015+) | 各自演進 |
| 本 Vault 角色 | Wiki 子庫組織 | 細粒度標籤 + 分面 | 宏觀 + 微觀分類 |

### DDC 與 UDC 的符號差異

```
DDC:  63[0]          — 農業 (3 位)
      636            — 畜牧業
      636.7          — 狗
      → 純層級，無複合

UDC:  63             — 農業 (2 位)
      636.7          — 狗
      636.7:37       — 狗在教育中的使用 (複合)
      636.7(100)     — 全世界的狗 (地理復分)
      636.7"2026"    — 2026 年的狗 (時間復分)
      636.7:37(100)"2026" — 2026 年全世界狗在教育中的使用
      → 層級 + 分面，表達能力指數級增強
```

---

## 核心人物

- [[entities/Paul-Otlet-奥特勒|Paul Otlet]] — `created` UDC 共同創始人 (Tier 1)
- [[entities/Henri-La-Fontaine|Henri La Fontaine]] — `co-created` UDC 共同創始人 (Tier 2)

---

## 本 Vault 的 UDC 實踐

本 Vault 在 [[UDC+LLM-Wiki 整合系统 v1.0]] 中將 UDC 集成到知識管理系統：

### 三層集成

| 層次 | 集成方式 | 對應文檔 |
|:----|:---------|:---------|
| **標籤層** | `#udc/` 標籤系統 — 92 wiki 頁面含 ddc+udc 字段 | [[UDC 標籤體系]] |
| **映射層** | DDC↔UDC 雙向映射 — 60+ 條目 | [[DDC-UDC 映射表]] |
| **分面層** | 地理/時間/形式復分索引 — 7 輔助表 | [[UDC 辅助表索引]] |

### Skills 自動化

| Skill | UDC 功能 | 實現 |
|:------|:---------|:-----|
| `/triage` | 分揀時自動寫入 udc + #udc/ | Step 4a |
| `/wiki-compile` | 編譯時自動生成 ddc + udc | Phase 2.5 |
| `/lint --udc` | 驗證 UDC 完整性 + 格式 | Section 7 |

> 詳見 [[UC-09]] · [[UC-07]] · [[UC-08]]

---

## 相關概念

- [[DDC]] — `evolved-from` DDC 是 UDC 的基礎
- [[Classification-Systems]] — `is-a` 分類系統
- [[Knowledge-Organization]] — `part-of` 知識組織方法
- [[Documentation]] — `used-by` 文獻學運動
- [[Mundaneum]] — `used-by` 人類知識索引
- [[Faceted-Classification]] — `exemplifies` 分面分類
- [[Semantic-Web]] — `anticipated` 語義網的前驅

## 相關實體

- [[entities/Paul-Otlet-奥特勒|Paul Otlet]] — `created` UDC 共同創始人
- [[entities/Henri-La-Fontaine|Henri La Fontaine]] — `co-created` UDC 共同創始人
- [[Melvil-Dewey]] — `evolved-from` DDC 發明人
- [[SR-Ranganathan]] — `influenced` 冒號分類法的靈感來源

---

## Sources

- [[entities/Paul-Otlet-奥特勒]] — UDC 創始人實體
- [[entities/Henri-La-Fontaine]] — UDC 共同創始人實體
- [[_meta/⚙️ 系统配置/DDC-UDC 映射表]]
- [[_meta/⚙️ 系统配置/UDC 辅助表索引]]
- [[_meta/⚙️ 系统配置/UDC 標籤體系]]
- [[UDC+LLM-Wiki 整合系统 v1.0]]
- UDC Consortium (UDCC) — udcc.org

---

*UDC 概念頁 · v2 (豐富版) · 2026-06-02*
