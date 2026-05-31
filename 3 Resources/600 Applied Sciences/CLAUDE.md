---
type: wiki-schema
topic: applied-sciences
domain: 600
created: 2026-05-29
version: "1.0"
---

# 600 Applied Sciences — LLM-Wiki Schema Template

> 本文件為 DDC 600 Applied Sciences 領域下所有子庫的 **LLM-Wiki Schema 模板**。各子庫可基於此模板創建自己的 `CLAUDE.md`。

## 通用目錄結構

```
[DDD] [名稱]/
├── CLAUDE.md                    ← 子庫 Schema（基於本模板）
├── [DDD] [名稱].md               ← KB MOC 入口
├── 00-MOCs/                     ← 總覽 + 學習路徑
├── 01~09 章節/                   ← 標準章節
├── 99-資源收集/
│   └── ram/                     ← 原始素材
│       ├── Book/                ← PDF 書籍
│       ├── articles/            ← 網頁文檔
│       ├── papers/              ← 學術論文
│       └── [自定義]/            ← 領域特定素材
│
├── wiki/                        ← LLM 編譯產物
│   ├── index.md                  ← 知識索引
│   ├── log.md                    ← 編譯日誌
│   ├── concepts/                 ← 概念頁面
│   ├── entities/                 ← 實體頁面
│   └── sources/                  ← 來源頁面
│
└── outputs/                     ← 生成製品（報告、文章）
```

## 頁面模板

### 概念頁面

```markdown
---
aliases: [英文別名]
created: YYYY-MM-DD
type: concept
category: [領域分類]
status: draft | reviewed | evergreen
---

# [概念名稱] [English Name]

## 定義 Definition
[一句話核心定義]

## 核心原理 Core Principles
[詳細解釋，繁體中文 + English 技術術語]

## 應用/實踐 Application
[具體案例或使用方法]

## 相關概念 Related Concepts
- [[concept-1]]

## Sources
- [[source-xxx]]
```

### 實體頁面（硬體/工具/產品）

```markdown
---
aliases: [別名]
created: YYYY-MM-DD
type: entity
entity_type: hardware | software | tool | product | person
status: draft | reviewed | evergreen
---

# [實體名稱]

## 規格 Specifications

| 參數 | 值 |
|------|-----|
| 項目 | 數值 |

## 功能 Features
[功能描述]

## 使用指南 Usage
[使用步驟]

## 相關概念
- [[concept-1]]

## Sources
- [[source-xxx]]
```

### 實體頁面（算法/協議）

```markdown
---
aliases: [縮寫]
created: YYYY-MM-DD
type: entity
entity_type: algorithm | protocol | standard
status: draft | reviewed | evergreen
---

# [算法/協議名稱]

## 定義
[一句話描述]

## 算法流程 / 協議規範

```language
偽代碼或協議圖
```

## 性能指標

| 指標 | 值 |
|------|-----|

## 相關概念
- [[concept-1]]

## Sources
- [[source-xxx]]
```

### 來源頁面

```markdown
---
aliases: []
created: YYYY-MM-DD
type: source
source_type: pdf | web-article | paper | documentation
url: https://...
---

# [來源名稱]

## 來源信息
- **類型**: [pdf/web/paper]
- **URL**: [原始鏈接]
- **路徑**: `ram/[子目錄]/[文件名]`

## 內容摘要
[關鍵知識點列表]

## 編譯狀態
- [ ] 概念提取
- [ ] 實體提取
- [ ] 交叉引用
```

## 編譯規則

### 通用規則
1. **數據脫敏**：個人/敏感數據不進入 wiki/
2. **ram/ 只讀**：AI 不修改原始素材
3. **來源必須**：所有 wiki 頁面標註 sources
4. **鏈接優先**：使用 `[[]]` 建立知識關聯
5. **增量編譯**：只處理 `compiled: false` 的文件

### 600 領域特定規則

| 規則 | 說明 |
|------|------|
| **繁體中文** | 所有 wiki 頁面使用繁體中文 |
| **技術術語保留原文** | BPU、PWM、MQTT 等保留英文 |
| **程式碼區塊** | 使用 fenced code block + 語言標記 |
| **硬體規格** | 使用表格呈現參數 |
| **來源可追溯** | PDF 來源標註頁碼、Web 來源標註 URL |

## 子庫部署狀態

| 子庫 | CLAUDE.md | wiki/ | ram/ | 狀態 |
|------|:---:|:---:|:---:|:---:|
| 619.1 中醫學 | ✅ | ✅ | ✅ 30 篇 | 🟢 首次部署完成 |
| 689 電子DIY | ⬜ | ⬜ | ✅ 12 PDF | 🟡 可部署 |
| 610 醫學健康 | ⬜ | ⬜ | ⬜ | ⚪ 待素材 |
| 620 工程科學 | ⬜ | ⬜ | ⬜ | ⚪ 待素材 |

## 使用命令

```bash
# 為子庫創建 Wiki 基礎設施
# 1. 複製本模板到子庫目錄
# 2. 修改領域特定內容
# 3. 創建 wiki/ 目錄結構
# 4. 執行編譯

# 編譯特定子庫
/wiki-compile tcm        # 中醫學
/wiki-compile electronics # 電子DIY

# 編譯選項
--incremental  # 增量編譯
--dry-run      # 預覽模式
```
