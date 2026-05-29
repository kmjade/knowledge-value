---
title: AI FAQ
tags: [ai, faq]
created: 2026-05-29
aliases: [AI 常見問題, AI FAQ]
---

# AI 常見問題 FAQ

> 人工智慧領域最常見的十大誤解與辨析。
> Top 10 common misconceptions about AI — debunked.

---

## 1. 「AI 會思考，像人類一樣」

**誤解 Misconception**：AI（特別是 LLM）具有意識和真正的理解能力。

**事實 Reality**：
- LLM 是**模式補全引擎**（pattern completion engines），不是思考的實體
- 它們預測下一個 token，而非「理解」或「推理」——至少在傳統意義上
- "Stochastic parrots" — 隨機鸚鵡（Bender et al., 2021）
- Chinese Room Argument (Searle, 1980): 語法 ≠ 語義
- 判斷力、因果推理、世界模型仍是開放問題

---

## 2. 「更多參數 = 更好的模型」

**誤解 Misconception**：參數量是模型品質的唯一指標。

**事實 Reality**：
- 資料品質往往比參數規模更重要（Microsoft Phi 系列證明小模型 + 高品質資料可以很強）
- 推理速度、部署成本、延遲都是關鍵考量
- 一個 fine-tuned 7B 模型可能在特定任務上超越通用 70B 模型
- Evaluation benchmark ≠ real-world performance

---

## 3. 「AI 模型是客觀、沒有偏見的」

**誤解 Misconception**：AI 是純數學，所以客觀中立。

**事實 Reality**：
- 模型學習訓練資料中的**所有**模式——包括偏見
- 偏見來源：historical bias, representation bias, measurement bias
- 沒有「無偏見」的模型——只有認真管理偏見的模型
- 「公平」沒有單一絕對定義

---

## 4. 「AI 會取代所有工作」

**誤解 Misconception**：AI 將導致大規模失業。

**事實 Reality**：
- 歷史上，技術消滅某些工作但創造了更多新工作（農業革命、工業革命）
- AI 更可能**增強**而非取代（augment > replace）
- 重複性任務會被自動化，但需要創造力、同理心、策略思維的工作仍然需要人類
- 人類+AI 協作通常優於純 AI 或純人類（"Centaur" model）

---

## 5. 「AGI 就在眼前」

**誤解 Misconception**：AGI（通用人工智慧）即將在幾年內實現。

**事實 Reality**：
- AI 研究社群對 AGI 的時間線有**極大分歧**
- 樂觀派（Altman, Sutskever）: 5–10 年
- 謹慎派（LeCun, Marcus）: 數十年或更長
- LLM 在許多任務上很強，但缺乏：因果推理、世界模型、持續學習、常識
- 我們甚至還沒有一個公認的 AGI 定義或測試標準

---

## 6. 「LLM 能可靠地回答事實問題」

**誤解 Misconception**：LLM 是事實查詢工具。

**事實 Reality**：
- LLM 的訓練目標是預測下一個 token，而非「說出真相」
- 幻覺 (hallucination) 是 LLM 的固有特性，不是 bug
- LLM 更擅長「聽起來合理的文字」而非「正確的事實」
- 對於事實查詢，應使用 RAG 或讓 LLM 引用來源
- 永遠驗證 LLM 的關鍵事實陳述

---

## 7. 「AI 越強，風險越大 → 需要停止開發」

**誤解 Misconception**：暫停 AI 開發是唯一的風險管理方式。

**事實 Reality**：
- 有效的風險管理是更好的方法：安全研究、監管、紅隊測試
- 暫停開發可能讓不負責任的開發者取得優勢
- AI 也有巨大的正面潛力（醫療、氣候、科學發現）
- 關鍵是**負責任的開發**而非停止開發

---

## 8. 「Fine-tuning = 訓練一個新模型」

**誤解 Misconception**：微調等同於從頭訓練。

**事實 Reality**：
- Fine-tuning 是在預訓練模型基礎上的少量訓練（通常是預訓練成本的 <1%）
- LoRA/QLoRA 等技術讓微調可以在消費級 GPU 上完成
- Fine-tuning 改變模型的行為和風格，但很少大幅增加新知識
- 對於新增知識，RAG 通常比 fine-tuning 更有效

---

## 9. 「開源模型不如閉源模型」

**誤解 Misconception**：只有閉源模型（GPT-4, Claude）是頂級的。

**事實 Reality**：
- 開源與閉源的差距在快速縮小（Llama 3, DeepSeek-V3, Qwen 3）
- 開源模型的優勢：可自訂、資料隱私、低成本、透明度
- 對於許多應用場景，開源模型已足夠好
- 閉源模型的優勢：前沿推理能力、多模態、生態整合

---

## 10. 「RAG 解決了 LLM 的所有問題」

**誤解 Misconception**：加上 RAG，LLM 就能完美回答事實問題。

**事實 Reality**：
- RAG 提升事實性，但引入新問題：檢索品質、上下文窗口限制、引用準確性
- 糟糕的檢索 → RAG 給出與問題無關的上下文 → LLM 可能被誤導
- RAG 不是靈丹妙藥——需要精心設計 pipeline（chunking、embedding、reranking）
- 評估 RAG 的忠實度（輸出是否忠於檢索到的文檔）仍是open problem

---

## 相關模組 Related Modules

- [[AI 资源收集]] — 學習資源與工具
- [[01-AI概述]] — 從基礎了解 AI
- [[08-AI伦理与安全]] — AI 的倫理與風險管理

---

> 💡 **One More Thing**: The best way to cut through AI hype is to build something yourself. Nothing demystifies AI faster than training a model and seeing where it fails. 自己做一個專案是破除 AI 迷思的最佳方式。
