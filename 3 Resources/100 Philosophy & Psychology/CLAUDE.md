---
type: wiki-schema
topic: philosophy-psychology
domain: 100
created: 2026-05-29
version: "1.0"
---

# 100 Philosophy & Psychology — LLM-Wiki Schema Template

本文件定義 DDC 100 Philosophy & Psychology 領域下各子庫的 LLM-Wiki Schema，提供哲學與心理學領域專用的頁面模板與編譯規則。

## 目錄結構

```
100 Philosophy & Psychology/
├── CLAUDE.md                    ← 本文件（領域級模板）
├── 100 Philosophy. Psychology.md ← 領域 MOC
│
├── 150 心理学/                   ← 心理學子庫
│   ├── CLAUDE.md                 ← 子庫 Schema
│   └── wiki/                     ← LLM 編譯產物
│
├── 130 超心理学/                 ← 超心理學子庫
│   ├── CLAUDE.md
│   └── wiki/
│
└── [其他子庫]/
```

## 頁面模板

### 心理學概念頁面 (wiki/concepts/)

```markdown
---
aliases: [English Name, 縮寫]
created: YYYY-MM-DD
type: concept
category: [認知|發展|社會|人格|臨床|方法|流派]
status: draft | reviewed | evergreen
---

# [概念名稱] [English Name]

## 定義 Definition
[一句話核心定義]

## 核心理論 Core Theory
[理論內容，繁體中文]

## 關鍵研究 Key Studies
| 研究者 | 年份 | 實驗/研究 | 發現 |
|--------|:--:|------|------|
| ... | ... | ... | ... |

## 應用與批評 Applications & Critiques

## 相關概念 Related Concepts
- [[concept-1]]

## Sources
- [[source-心理學-KB]]
- [[150 心理学/0X-章節/0X-章節|KB 章節]]
```

### 心理學人物實體頁面 (wiki/entities/)

```markdown
---
aliases: [English Name]
created: YYYY-MM-DD
type: entity
entity_type: person
era: [年代]
school: [學派]
status: reviewed
---

# [人物名稱] [English Name]

## 基本信息
- **年代**: 18XX–19XX
- **學派**: [行為主義/精神分析/人本主義/認知...]
- **國籍**: [國家]

## 主要貢獻
[理論/實驗/著作]

## 代表著作
- 《XXX》(年份)

## 相關概念
- [[concept-1]]

## Sources
- [[source-心理學-KB]]
```

### 超心理學概念頁面

```markdown
---
aliases: [ESP, PK, NDE...]
created: YYYY-MM-DD
type: concept
category: [超感官知覺|意念致動|意識研究|瀕死體驗|神秘傳統]
status: draft | reviewed | evergreen
---

# [概念名稱] [English Name]

## 定義 Definition

## 現象描述 Phenomenon Description

## 經典實驗 Classic Experiments
| 研究者 | 年份 | 實驗設計 | 結果 |
|--------|:--:|------|------|

## 科學解釋與爭議 Scientific Debate

## 相關概念
- [[concept-1]]

## Sources
- [[source-超心理學-KB]]
```

## 編譯規則

### 通用規則
1. **繁體中文** — 所有 wiki 頁面使用繁體中文
2. **來源必須** — 每頁標註 sources
3. **鏈接優先** — `[[]]` 建立概念網絡
4. **增量編譯** — 只處理新/更新的 KB 章節

### 心理學專用規則

| 規則 | 說明 |
|------|------|
| **標註年代** | 所有研究引用標註年份 |
| **樣本信息** | 重要實驗標註樣本量和人群 |
| **理論對比** | 同一現象的多學派解釋要並列 |
| **避免過時** | DSM 版本、過時理論需標註 |

### 超心理學專用規則

| 規則 | 說明 |
|------|------|
| **平衡呈現** | 支持與批評觀點並列 |
| **實驗方法** | 標註實驗設計的嚴謹度 |
| **避免迷信** | 區分學術研究與民間信仰 |
| **術語精確** | 使用標準超心理學術語 |

## 子庫部署狀態

| 子庫 | CLAUDE.md | wiki/ | 狀態 |
|------|:---:|:---:|:---:|
| 150 心理學 | ✅ | ✅ | 🟢 已部署 |
| 130 超心理學 | ✅ | ✅ | 🟢 已部署 |
| 180 易經 | ⬜ | ⬜ | ⚪ 可選 |
| 其餘子庫 | ⬜ | ⬜ | ⚪ 待內容填充 |

## 使用命令

```bash
/wiki-compile psychology     # 編譯心理學
/wiki-compile parapsychology # 編譯超心理學
```
