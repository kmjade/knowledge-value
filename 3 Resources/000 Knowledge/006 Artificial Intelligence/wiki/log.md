---
title: 操作日誌
tags:
  - log
  - topic/llm
created: 2026-05-25
modified: 2026-05-25
---

# 操作日誌

> [!summary] 知識庫演進記錄
> 按時間順序記錄的知識庫操作歷史。

---

## [2026-05-27] ingest | 首批 raw 資料編譯

**操作類型**: ingest

**源文件**: 7 篇 raw 文章
- `raw/articles/Hermes-LLM-Wiki-方法论.md`
- `raw/articles/LLM-Wiki-三层架构.md`
- `raw/articles/LLM-Wiki-Ingest流程.md`
- `raw/articles/LLM-Wiki-Query流程.md`
- `raw/articles/LLM-Wiki-Lint流程.md`
- `raw/articles/Hermes-Agent简介.md`
- `raw/articles/LLM基础概念.md`

**創建頁面** (12):
- `wiki/concepts/LLM-Wiki.md` - LLM Wiki 方法论
- `wiki/concepts/Three-Layer-Architecture.md` - 三层架构
- `wiki/concepts/Ingest-Workflow.md` - 导入工作流
- `wiki/concepts/Query-Workflow.md` - 查询工作流
- `wiki/concepts/Lint-Workflow.md` - 维护工作流
- `wiki/concepts/LLM-Fundamentals.md` - LLM 基础概念
- `wiki/entities/Hermes-Agent.md` - Hermes Agent 实体
- `wiki/entities/Obsidian.md` - Obsidian 实体
- `wiki/entities/IngestAgent.md` - IngestAgent 实体
- `wiki/entities/QueryAgent.md` - QueryAgent 实体
- `wiki/entities/LintAgent.md` - LintAgent 实体
- `wiki/sources/source-Hermes-Workflow.md` - 来源溯源

**說明**: 首次大规模编译，从 7 篇 raw 文章中提取出 6 個概念、5 個實體，建立完整 wikilinks 网络。

---

## [2026-05-25] init | LLM-Tech 知識庫初始化

**操作類型**: init

**創建頁面**:
- `LLM-Tech.md` - 主索引頁
- `CLAUDE.md` - Schema 配置
- `wiki/index.md` - 內容索引
- `wiki/log.md` - 操作日誌
- `00-MOCs/MOC-總覽.md` - 總覽頁
- `00-MOCs/MOC-學習路徑.md` - 學習路徑

**說明**: 初始化 LLM Wiki 知識庫，用於大語言模型技術知識管理。

---

## 日誌統計

| 指標 | 數量 |
|------|------|
| 總操作次數 | 1 |
| 導入次數 | 1 |
| 查詢次數 | 0 |
| 維護次數 | 0 |

---

## 使用說明

日誌格式：
```
## [YYYY-MM-DD] 操作類型 | 標題
```

操作類型：
- `init` - 初始化
- `ingest` - 導入資料
- `query` - 有價值的查詢回寫
- `lint` - 維護檢查
