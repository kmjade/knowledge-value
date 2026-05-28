---
title: LLM-Tech 知識庫配置
---

# CLAUDE.md - LLM-Tech 知識庫 Schema

## 知識庫概述

這是一個基於 LLM Wiki 方法論構建的大語言模型技術知識庫，採用三層架構：
- **Raw Sources** (`raw/`) - 原始資料，LLM 只讀
- **Wiki** (`wiki/`) - LLM 生成維護的知識頁面
- **Schema** (本文件) - 配置與約定

---

## 頁面命名規範

| 頁面類型 | 命名格式 | 示例 |
|----------|---------|------|
| 資料摘要 | `source-{關鍵詞}.md` | `source-transformer-paper.md` |
| 實體頁 | `{實體名}.md` | `gpt-4.md`、`claude-3.md` |
| 概念頁 | `{概念名}.md` | `attention-mechanism.md` |
| 工作流 | `{場景}-workflow.md` | `rag-development-workflow.md` |

---

## Frontmatter 模板

### 資料摘要頁
```yaml
---
title: 標題
tags: [source-summary, 領域標籤]
source: "原文標題"
author: 作者名
date: YYYY-MM-DD
url: "原始鏈接"
---
```

### 實體頁
```yaml
---
title: 實體名稱
tags: [entity, model/tool/company]
type: entity
created: YYYY-MM-DD
modified: YYYY-MM-DD
---
```

### 概念頁
```yaml
---
title: 概念名稱
tags: [concept]
type: concept
created: YYYY-MM-DD
modified: YYYY-MM-DD
---
```

---

## 三大操作

### 1. Ingest（導入資料）

當資料放入 `raw/` 後，執行：

1. 閱讀資料，討論關鍵要點
2. 創建摘要頁 `wiki/source-xxx.md`
3. 創建/更新相關實體頁和概念頁
4. 建立雙向鏈接 `[[wikilinks]]`
5. 更新 `wiki/index.md`
6. 在 `wiki/log.md` 追加記錄
7. 標註新資料與已有內容的矛盾或補充關係

### 2. Query（查詢）

直接提問，Claude 會先讀 `wiki/index.md` 定位相關頁面，再深入閱讀後綜合回答。

> [!tip] 重要
> 有價值的回答可以回寫為新 Wiki 頁面，讓探索也能積累。

### 3. Lint（維護）

定期檢查：

| 檢查項 | 說明 |
|--------|------|
| 頁面間矛盾 | 不同頁面的衝突內容 |
| 過時信息 | 被新資料取代的內容 |
| 孤立頁面 | 無入站鏈接的頁面 |
| 缺失頁面 | 被提及但缺少專屬頁面的重要概念 |
| 缺失引用 | 可補充的交叉引用 |

---

## 相關鏈接

- [[LLM-Tech]] - 主索引頁
- [[0 Inbox/_processed/01-Tech/LLM-Tech/wiki/index]] - Wiki 內容索引
- [[0 Inbox/_processed/01-Tech/LLM-Tech/wiki/log]] - 操作日誌
