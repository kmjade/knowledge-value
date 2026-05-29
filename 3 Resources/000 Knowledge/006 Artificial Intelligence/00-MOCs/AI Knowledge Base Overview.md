---
title: AI 知識庫總覽
tags: [ai, moc, overview]
created: 2026-05-29
aliases: [AI Overview, AI Knowledge Base Map, AI 全景地圖]
---

# AI 知識庫總覽 Overview

> DDC 006 全景地圖 — 人工智慧的完整知識圖譜，從符號推理到深度學習，從 LLM 到 AI Agent。
> Complete knowledge map for DDC 006 — from symbolic reasoning to deep learning, from LLMs to AI Agents.

---

## 知識領域圖譜 Domain Map

```
                    ┌──────────────────────────────────────┐
                    │   Artificial Intelligence (DDC 006)   │
                    └──────────────────────────────────────┘
                                      │
          ┌───────────────────────────┼───────────────────────────┐
          │                           │                           │
    ┌─────┴─────┐              ┌─────┴─────┐              ┌─────┴─────┐
    │ Foundations  │              │  Domains     │              │  Practice    │
    │  基礎理論       │              │  應用領域       │              │  工程實踐       │
    └─────┬─────┘              └─────┬─────┘              └─────┬─────┘
          │                           │                           │
  ┌───────┼───────┐            ┌──────┼──────┐           ┌───────┼───────┐
  │       │       │            │      │      │           │       │       │
 AI概述    ML      DL        NLP    CV     RL       GenAI    Ethics   Tools
 基礎    機器學習  深度學習    自然語言  電腦視覺  強化學習    生成式AI   倫理    工具鏈
```

---

## 子領域總覽 Subdomain Overview

### 1. 基礎理論 Foundations

| 模組 Module | 核心問題 Core Question | 關鍵概念 Key Concepts |
|-------------|----------------------|----------------------|
| [[01-AI Overview]] | What is AI and where did it come from? | ANI/AGI/ASI, 三大範式, AI 簡史 |
| [[02-Machine Learning]] | How do machines learn from data? | 監督/非監督/強化學習, 經典演算法, 特徵工程 |
| [[03-Deep Learning]] | How do neural networks work? | MLP, CNN, RNN, Transformer, 反向傳播 |

### 2. 應用領域 Domains

| 模組 Module | 核心問題 Core Question | 關鍵概念 Key Concepts |
|-------------|----------------------|----------------------|
| [[04-Natural Language Processing]] | How do machines understand language? | NLP 五個時代, BERT vs GPT, 核心任務 |
| [[05-Computer Vision]] | How do machines see? | CNN 骨幹, YOLO, ViT, Diffusion |
| [[06-Reinforcement Learning]] | How do agents learn from interaction? | Q-Learning, PPO, RLHF |
| [[07-Generative AI & LLMs]] | How does Generative AI work? | LLM, Prompt Engineering, RAG, AI Agent |

### 3. 工程實踐 Practice

| 模組 Module | 核心問題 Core Question | 關鍵概念 Key Concepts |
|-------------|----------------------|----------------------|
| [[08-AI Ethics & Safety]] | How do we make AI safe and fair? | 偏見, 對齊 (RLHF/DPO), 隱私, 監管 |
| [[09-AI Applications & Tools]] | How do we deploy AI in production? | MLOps, 模型部署, 成本最佳化 |

---

## 技術里程碑 Technology Milestones

| 年份 Year | 里程碑 Milestone | 影響 Impact |
|-----------|-----------------|------------|
| 1950 | Turing Test proposed | AI 的哲學起點 |
| 1956 | Dartmouth Conference | "Artificial Intelligence" 術語誕生 |
| 1958 | Perceptron (Rosenblatt) | 第一個神經網路 |
| 1969 | *Perceptrons* (Minsky & Papert) | 第一次 AI 寒冬的催化劑 |
| 1986 | Backpropagation (Rumelhart et al.) | 神經網路復興 |
| 1997 | Deep Blue beats Kasparov | AI 在特定領域超越人類 |
| 2006 | Deep Learning (Hinton) | 深度學習革命的起點 |
| 2012 | AlexNet wins ImageNet | CNN + GPU 時代開始 |
| 2014 | GANs (Goodfellow) | 生成模型的突破 |
| 2016 | AlphaGo beats Lee Sedol | 強化學習的里程碑 |
| 2017 | "Attention Is All You Need" | Transformer 架構誕生 |
| 2018 | BERT (Google) | NLP 的預訓練革命 |
| 2020 | GPT-3 (OpenAI) | LLM 湧現能力的首次展示 |
| 2022 | ChatGPT | AI 民主化，全球 1 億用戶 |
| 2023 | GPT-4, Claude, Gemini | 多模態、長上下文 |
| 2024 | Open-source LLM explosion | Llama 3, Qwen 2, DeepSeek-V3 |
| 2025 | AI Agents & tool use | 自主規劃、多步推理、程式碼生成 |
| 2026 | AI-native development | LLM-driven software engineering |

---

## AI、ML、DL 的關係 The AI Venn Diagram

```
┌──────────────────────────────────┐
│      Artificial Intelligence      │
│  ┌────────────────────────────┐  │
│  │     Machine Learning        │  │
│  │  ┌──────────────────────┐  │  │
│  │  │   Deep Learning       │  │  │
│  │  │  CNN RNN Transformer  │  │  │
│  │  └──────────────────────┘  │  │
│  │  SVM Decision Trees ...     │  │
│  └────────────────────────────┘  │
│  Expert Systems Knowledge Graphs │
└──────────────────────────────────┘
```

---

## 學習路徑建議 Learning Path

```
入門 Beginner          中階 Intermediate        進階 Advanced
──────────────────────────────────────────────────────────
 01 AI概述        →    02 ML           →    03 DL
                         04 NLP              07 GenAI & LLM
                         05 CV               06 RL + RLHF
                         08 Ethics           09 MLOps & Tools
```

詳見 [[AI 學習路徑]]。

---

## 跨庫關聯 Cross-KB Links

| 相關知識庫 | 關聯說明 |
|-----------|---------|
| [[3 Resources/000 Knowledge/004 Computer Science & technology/README\|CS (DDC 004)]] | 電腦科學基礎 — AI 的理論與工程根基 |
| [[3 Resources/000 Knowledge/005 Software/005 Software\|Software (DDC 005)]] | 軟體工程 — AI 輔助開發、MLOps 實務 |
| [[3 Resources/000 Knowledge/000 Knowledge\|Knowledge (DDC 000)]] | 知識組織與分類體系 |

---

> 💡 **Pro Tip**: 建議從里程碑圖譜建立時間線感知，再深入各子領域模組。The best way to understand AI is to trace its evolution.
