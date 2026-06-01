---
title: Natural Language Processing
tags: [ai, nlp]
created: 2026-06-01
aliases: [NLP, 自然語言處理, 文本處理]
---

# 04 — Natural Language Processing 自然語言處理

> NLP enables machines to read, understand, and generate human language. It has evolved from rule-based systems through statistical methods to Transformer-based LLMs that approach human-level performance.
> NLP 使機器能閱讀、理解和生成人類語言。它從規則系統經歷統計方法，演化到接近人類水準的 Transformer 架構 LLM。

---

## NLP 五個時代 Five Eras of NLP

| 時代 Era | 時期 Period | 代表方法 Method | 特點 Feature |
|---------|-----------|----------------|-------------|
| **規則時代 Rule-based** | 1950s–1980s | 手工語法規則、詞典 | 精確但脆弱，覆蓋率低 |
| **統計時代 Statistical** | 1990s–2000s | n-gram、HMM、CRF | 資料驅動，但稀疏性問題嚴重 |
| **詞向量時代 Embeddings** | 2013–2017 | Word2Vec、GloVe | 密集向量捕捉語義關係 |
| **預訓練時代 Pre-training** | 2018–2020 | BERT、GPT-2 | 遷移學習，無需大量標註資料 |
| **大模型時代 LLM Era** | 2020–至今 | GPT-4、Claude、Llama | 湧現能力、In-context Learning |

---

## 文本預處理與分詞 Text Preprocessing & Tokenization

| 步驟 Step | 說明 Description |
|-----------|-----------------|
| **Cleaning 清理** | 去除 HTML/特殊字元、統一字體、處理縮寫 |
| **Tokenization 分詞** | BPE / WordPiece / SentencePiece，子詞級分詞 |
| **Normalization 規範化** | 小寫化、詞形還原 (Lemmatization)、詞幹提取 (Stemming) |
| **Stop Words 停用詞** | 移除高頻低資訊詞（的/了/是/the/a）——對現代模型不必要 |

---

## 詞嵌入 Word Embeddings

| 方法 Method | 核心思想 Core Idea | 特點 Feature |
|-----------|-------------------|-------------|
| **Word2Vec** | CBOW / Skip-gram，預測上下文 | 靜態向量，King−Man+Woman≈Queen |
| **GloVe** | 全局詞共現矩陣分解 | 結合全局統計 + 局部上下文 |
| **FastText** | 子詞 n-gram 嵌入 | 處理 OOV，適合形態豐富的語言 |
| **Contextual Embeddings** | BERT/ELMo 上下文相關 | 同一詞在不同語境有不同向量 |

---

## Transformer → BERT / GPT 演進

| 模型 Model | 架構 Architecture | 預訓練目標 Objective | 適合任務 Best For |
|-----------|-----------------|---------------------|-----------------|
| **BERT** | 雙向 Encoder-only | MLM + NSP | 文本理解：分類、NER、QA |
| **GPT** | 單向 Decoder-only | Autoregressive LM | 文本生成：對話、寫作 |
| **T5** | Encoder-Decoder | Span Corruption | 序列轉換：翻譯、摘要 |
| **BART** | Encoder-Decoder | Text Infilling | 生成 + 理解雙向任務 |

---

## 核心任務 Core NLP Tasks

| 任務 Task | 說明 Description | 評估指標 Metrics |
|----------|-----------------|-----------------|
| **Text Classification 文本分類** | 情感分析、主題分類 | Accuracy, F1 |
| **NER 命名實體識別** | 識別人名/地名/組織名 | F1 (entity-level) |
| **Sequence Labeling 序列標註** | POS 標註、分詞 | Token Accuracy |
| **Machine Translation 機器翻譯** | 跨語言翻譯 | BLEU, COMET |
| **Summarization 摘要** | 長文本 → 短摘要（抽取式/生成式） | ROUGE, BERTScore |
| **Question Answering QA** | 閱讀理解、開放域問答 | EM, F1 |

---

## 提示工程與 RAG Prompt Engineering & RAG

| 技術 Technique | 說明 Description |
|---------------|-----------------|
| **Zero-shot Prompting** | 不給範例，直接提問 |
| **Few-shot Prompting** | 提供 2–5 個範例引導格式 |
| **Chain-of-Thought (CoT)** | 引導模型逐步推理 |
| **RAG 檢索增強生成** | Retrieval → Augment → Generate，外掛知識庫 |
| **HyDE** | 假設文檔嵌入，提升檢索召回率 |

### RAG 架構 Architecture

```
Query → Embedding → Vector Search → Top-K Docs → LLM → Answer
                                           ↑
                                     Vector DB (Chroma/Pinecone/Milvus)
```

---

## 相關模組 Related Modules

| 模組 Module | 關聯 |
|------------|------|
| [[03-Deep Learning]] — Transformer 基礎 | NLP 的技術底座 |
| [[07-Generative AI & LLMs]] — LLM 詳解 | NLP 的前沿應用 |
| [[08-AI Ethics & Safety]] — 偏見與毒性 | NLP 模型的安全挑戰 |

---

> 💡 **Key Insight**: Language is the interface to intelligence. 語言是智慧的介面。NLP 的終極目標不是讓機器「懂文字」，而是讓機器能有效輔助人類的語言相關工作。
