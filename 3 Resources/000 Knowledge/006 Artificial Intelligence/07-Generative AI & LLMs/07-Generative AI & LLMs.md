---
title: Generative AI & LLMs
tags: [ai, generative-ai, llm]
created: 2026-05-29
aliases: [GenAI, 生成式AI, 大語言模型, LLM]
---

# 07 — Generative AI & LLMs 生成式AI與大語言模型

> Generative AI creates new content — text, images, code, audio, video. Since ChatGPT launched in 2022, this field has experienced unprecedented growth.
> 生成式 AI 能創建新內容——文字、影像、程式碼、音頻、影片。自 2022 年 ChatGPT 發布以來，此領域經歷了前所未有的爆發。

---

## 什麼是 LLM？What is a Large Language Model?

LLM 是**大規模自迴歸語言模型**——在海量文本上訓練，學習預測下一個 token。

| 特性 Property | 說明 Description |
|--------------|-----------------|
| 訓練目標 | 預測下一個 token: P(tokenₙ \| token₁, ..., tokenₙ₋₁) |
| 參數規模 | 從 7B 到 1000B+ |
| 訓練資料 | 數萬億 token 的網路文本、書籍、程式碼 |
| 能力來源 | **規模**——模型越大、資料越多、訓練越久，能力越強 (Scaling Laws) |

---

## LLM 的核心能力 Core Capabilities

### 湧現能力 Emergent Abilities

當模型規模超過臨界點（約 10B 參數）時，突然出現訓練時未明確教授的能力：

| 能力 Ability | 說明 Description |
|-------------|-----------------|
| **In-context Learning** | 通過提示中的範例學會新任務，無需微調 |
| **Chain-of-Thought (CoT)** | 展示逐步推理過程，顯著提高複雜推理準確率 |
| **Instruction Following** | 理解並執行自然語言指令 |
| **Tool Use** | 調用 API、搜尋、程式碼解釋器等外部工具 |

### 關鍵局限 Key Limitations

| 局限 Limitation | 說明 Description |
|----------------|-----------------|
| **幻覺 Hallucination** | 生成看似合理但事實錯誤的文本 |
| **知識截止 Knowledge Cutoff** | 訓練資料有截止日期，不知道後續事件 |
| **上下文窗口有限** | 單次對話能「記住」的資訊有上限（從 2K 擴展到 1M+ token） |
| **推理不穩定** | 複雜多步推理可能出錯，尤其數學和邏輯 |
| **偏見 Bias** | 反映訓練資料中的社會偏見 |

---

## 提示工程 Prompt Engineering

> 提示工程是用自然語言「程式設計」LLM 的藝術和科學。
> Prompt engineering is the art and science of "programming" LLMs with natural language.

### 基本技巧 Basic Techniques

| 技巧 Technique | 說明 Description | 範例 Example |
|---------------|-----------------|-------------|
| **Zero-shot** | 直接提問 | "Translate to English: 你好" |
| **Few-shot** | 給幾個範例 | "漢→英：你好→Hello / 再見→Goodbye / 謝謝→" |
| **Chain-of-Thought** | 要求逐步推理 | "Let's think step by step..." |
| **Role-playing** | 指定人格 | "你是一位有 20 年經驗的 Python 工程師..." |
| **Structured Output** | 指定輸出格式 | "用 JSON 格式回答，包含 name 和 age 欄位" |

### 進階技巧 Advanced Techniques

| 技巧 Technique | 說明 Description |
|---------------|-----------------|
| **ReAct** (Reasoning + Acting) | 交替進行思考和行動（調用工具） |
| **Self-Consistency** | 多次採樣 → 投票選出最一致的答案 |
| **Tree of Thoughts** | 探索多個推理路徑，評估後選擇最佳 |
| **Constrained Decoding** | 強制輸出符合某種語法/格式 |

---

## 檢索增強生成 RAG

RAG 將 LLM 與外部知識庫結合——解決幻覺和知識過期問題。

```
User Query
    ↓
Retrieve relevant documents (from vector DB / search engine)
    ↓
Concatenate documents + query into prompt
    ↓
LLM generates response based on retrieved content
    ↓
Return answer (with citations)
```

### RAG 技術棧 RAG Tech Stack

| 組件 Component | 常用工具 Tools |
|---------------|--------------|
| 文檔載入/切分 | LangChain, LlamaIndex |
| 嵌入模型 | text-embedding-3, BGE, Jina |
| 向量資料庫 | Pinecone, Weaviate, Chroma, Milvus |
| LLM | GPT-4, Claude, DeepSeek, 開源模型 |
| 編排框架 | LangChain, LlamaIndex, DSPy |

---

## AI Agent

> AI Agent 是能自主規劃、使用工具、執行多步任務的 LLM 系統。

### Agent 的核心組件 Core Components

| 組件 Component | 作用 Role |
|---------------|----------|
| **LLM 大腦** | 推理和決策核心 |
| **規劃 Planning** | 任務分解、反思、自我修正 |
| **工具 Tools** | 搜尋、程式碼執行、API 調用、檔案操作 |
| **記憶 Memory** | 短期（上下文窗口）、長期（外部儲存） |

### Agent 框架對比 Framework Comparison

| 框架 | 特點 |
|------|------|
| **LangChain** | 最成熟的 LLM 應用框架，生態豐富 |
| **CrewAI** | 多 Agent 協作 |
| **Hermes Agent** | 開源 CLI Agent 框架（見子庫 `06-强化学习/AI-Agent/`） |
| **AutoGPT** | 最早的自主 Agent 嘗試之一 |

---

## 主要模型一覽 Model Landscape (2026)

### 閉源 Closed-Source

| 模型 | 公司 | 特點 |
|------|------|------|
| GPT-4o / GPT-4.1 | OpenAI | 多模態、工具使用、128K 上下文 |
| Claude 4 | Anthropic | 長上下文 (200K+)、安全性、程式設計能力 |
| Gemini 2.5 | Google | 1M 上下文、原生多模態 |
| Grok 3 | xAI | 即時資料接入、推理能力 |

### 開源 Open-Source

| 模型 | 發布者 | 特點 |
|------|--------|------|
| Llama 4 | Meta | 開源標竿，多模態 |
| DeepSeek-V4 | DeepSeek | 強大推理 + 高性價比 |
| Qwen 3 | 阿里 | 中文最佳化、多尺寸 |
| Mistral Large | Mistral | 歐洲開源，效能強勁 |

---

## 多模態模型 Multimodal Models

| 類型 Type | 輸入→輸出 | 代表 |
|-----------|----------|------|
| Text→Image | 文字→影像 | Stable Diffusion, DALL-E 3, Midjourney, Flux |
| Image Understanding | 影像+文字→文字 | GPT-4V, Claude Vision, Qwen-VL |
| Text→Video | 文字→影片 | Sora, Runway Gen-3, Kling |
| Text→Audio/Music | 文字→音頻 | Suno, Udio, MusicGen |
| Omni-modal | 文字+圖+音頻+影片↔全部 | GPT-4o, Gemini |

---

## 相關模組 Related Modules

| 模組 | 關聯 |
|------|------|
| [[03-Deep Learning]] — Transformer 架構 | LLM 的技術基礎 |
| [[04-Natural Language Processing]] — NLP 基礎 | LLM 的前身和演化 |
| [[06-Reinforcement Learning]] — RLHF | LLM 對齊的核心技術 |
| [[08-AI Ethics & Safety]] — 安全與偏見 | LLM 治理 |
| [[3 Resources/000 Knowledge/005 Software/005 Software\|Software (DDC 005)]] — AI 輔助程式設計 | 軟體工程中的 LLM 應用 |

---

> 💡 **Key Insight**: LLMs are not databases — they are pattern completion engines. Understanding this distinction is key to using them effectively. LLM 不是資料庫——它們是模式補全引擎。
