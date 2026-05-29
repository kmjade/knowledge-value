---
type: wiki-schema
topic: traditional-chinese-medicine
domain: 619.1
created: 2026-05-29
version: "1.0"
---

# 中醫學 Wiki Schema — CLAUDE.md

本文件定義 619.1 中醫學知識庫的 LLM-Wiki 子庫結構、編譯規則與頁面模板。

## 目錄結構

```
619.1 中醫學/
├── CLAUDE.md                    ← 本文件
├── 619.1 中醫學.md               ← KB MOC 入口
├── 01-陰陽五行/ ~ 09-中醫經典/    ← KB 標準章節
│
├── 09-中醫經典與歷史/
│   └── 619.1(093)-1 黄帝内经/
│       ├── 00-MOCs/
│       ├── 01-成書與傳承/~ 11-現代研究/
│       ├── 99-資源收集/
│       └── ram/                  ← 原始素材（人類/AI 收集）
│           └── 灵枢/             ← 靈樞 87 篇章節原文 (~30 篇已入庫)
│
├── wiki/                        ← LLM 編譯產物（AI 維護）
│   ├── index.md                  ← 知識索引
│   ├── log.md                    ← 編譯日誌
│   ├── concepts/                 ← 中醫概念頁
│   ├── entities/                 ← 經典/人物/方劑實體頁
│   └── sources/                  ← 來源溯源頁
│
└── outputs/                     ← 基於 Wiki 生成的製品
```

## 核心概念域

### 基礎理論
- 陰陽學說 (Yin-Yang Theory)
- 五行學說 (Five Elements)
- 氣血津液 (Qi, Blood, Body Fluids)
- 臟腑學說 (Zang-Fu Organs)
- 經絡學說 (Meridian Theory)

### 診斷方法
- 四診 (Four Diagnostic Methods)：望聞問切
- 八綱辨證 (Eight Principles)
- 臟腑辨證 (Zang-Fu Pattern Differentiation)

### 治療原則
- 治未病 (Preventive Treatment)
- 標本緩急 (Root vs. Manifestation)
- 扶正祛邪 (Strengthen Upright, Expel Pathogens)
- 同病異治 / 異病同治

### 經典著作
- 黃帝內經 (Huangdi Neijing) — 素問 + 靈樞
- 神農本草經 (Shennong Bencao Jing)
- 傷寒雜病論 (Shanghan Zabing Lun)
- 溫病學說 (Wenbing Theory)

## 頁面模板

### 概念頁面 (wiki/concepts/)

```markdown
---
aliases: [英文別名]
created: YYYY-MM-DD
type: concept
category: [基礎理論|診斷方法|治療原則|經典概念]
status: draft | reviewed | evergreen
---

# [概念中文名] [English Name]

## 定義 Definition
[一句話核心定義]

## 經典原文 Classical Source
> 「[原文引用]」——《[出處]》

## 闡釋 Explanation
[現代語言解釋，繁體中文]

## 臨床應用 Clinical Application
[如何應用於臨床]

## 相關概念 Related Concepts
- [[related-concept-1]]
- [[related-concept-2]]

## Sources
- [[source-ram-灵枢-xxx]]
```

### 實體頁面 (wiki/entities/)

```markdown
---
aliases: [別名]
created: YYYY-MM-DD
type: entity
entity_type: classic | person | formula | herb
era: [朝代]
status: draft | reviewed | evergreen
---

# [實體名稱]

## 基本信息
- 類型: classic / person / formula / herb
- 年代: [朝代]
- 作者: [如適用]

## 概述
[繁體中文描述]

## 核心貢獻
[主要學術貢獻或內容要點]

## 相關概念
- [[concept-1]]

## Sources
- [[source-xxx]]
```

### 來源頁面 (wiki/sources/)

```markdown
---
aliases: []
created: YYYY-MM-DD
type: source
source_type: classical-text | ram-chapter | external-article
---

# [來源名稱]

## 來源信息
- 類型: classical-text
- 典籍: 黃帝內經·靈樞
- 章節: [篇名]

## 內容摘要
[已編譯概念列表]

## 編譯狀態
- [x] 概念提取完成
- [ ] 關係建立完成
- [ ] 交叉引用完成
```

## 編譯規則

### 1. 數據脫敏
- 個人醫療記錄不進入 wiki/
- 臨床案例需匿名化處理

### 2. ram/ 只讀
- `ram/灵枢/` 為經典原文，AI 不修改
- 編譯時以原文為權威來源

### 3. 來源必須
- 所有 wiki 頁面必須標註 sources
- 引用經典原文時標註篇章名稱

### 4. 鏈接優先
- 使用 `[[]]` 建立概念→經典→人物關聯
- 優先鏈接到 vault 內已存在的 TCM KB 章節

### 5. 增量編譯
- 只處理 `compiled: false` 的 ram/ 文件
- 更新已有 wiki 頁面而非覆蓋

## 使用命令

- `/wiki-compile tcm` — 完整編譯中醫學 Wiki
- `/wiki-compile tcm --incremental` — 增量編譯（僅新素材）
- `/wiki-compile tcm --dry-run` — 預覽，不寫入文件
