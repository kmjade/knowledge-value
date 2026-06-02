---
aliases: [Retrieval-Augmented Generation, 檢索增強生成, RAG]
created: 2026-06-02
ddc: "006.3"
udc: "004.8"
tags:
  - #udc/004.8
type: concept
topic: knowledge-systems
category: 資訊科學
status: reviewed
---
# RAG 檢索增強生成

## 定義
將資訊檢索 (Retrieval) 與文本生成 (Generation) 結合的 AI 架構。先從知識庫中檢索相關文檔，再讓 LLM 基於檢索結果生成答案。

## 流程
```
Query → 向量檢索 → 相關文檔 → LLM 生成 → 附來源的答案
```

## 優勢
- 緩解 LLM 幻覺（基於真實文檔生成）
- 可更新知識（替換檢索庫而非重新訓練模型）
- 來源可追溯

## Sources
- Lewis 等〈檢索增強生成用於知識密集型 NLP〉(2020)
