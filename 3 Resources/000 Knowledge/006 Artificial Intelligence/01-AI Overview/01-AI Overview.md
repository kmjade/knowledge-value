---
title: AI Overview
tags: [ai, foundation]
created: 2026-05-29
aliases: [人工智能概述, 什麼是AI, AI入門, 01-AI]
---

# 01 — AI Overview 人工智慧概述

> Artificial Intelligence is a branch of computer science that aims to create systems capable of perceiving their environment, reasoning, and taking actions to achieve goals.
> 人工智慧是電腦科學的一個分支，目標是創建能感知環境、進行推理、採取行動以實現目標的系統。

---

## AI 的核心定義 Core Definitions

| 定義維度 Dimension | 關注「像人一樣」Human-like | 關注「理性」Rational |
|-------------------|------------------------|-------------------|
| **思考 Thinking** | 像人一樣思考（認知建模） | 理性思考（邏輯、機率） |
| **行動 Acting** | 像人一樣行動（圖靈測試） | 理性行動（最大化目標達成） |

> 現代 AI 的主流範式是**理性行動 (Rational Action)**——設計在給定環境中做出最佳決策的系統。不一定「像人」。

---

## AI 的類型 Types of AI

| 類型 Type | 別名 Alias | 描述 Description | 現狀 Status |
|-----------|-----------|-----------------|------------|
| **ANI** (Artificial Narrow Intelligence) | 弱 AI / Narrow AI | 在特定任務上表現優秀，但無泛化能力 | ✅ 已實現（圍棋、翻譯、推薦系統） |
| **AGI** (Artificial General Intelligence) | 強 AI / General AI | 擁有與人類同等的通用智能，能處理任何智力任務 | ❌ 未實現。2026：LLM 在某些維度接近但爭議巨大 |
| **ASI** (Artificial Superintelligence) | 超級智能 | 在所有領域遠超人類智能 | ❌ 純理論階段 |

### AGI 的爭議 The AGI Debate

| 樂觀派 Optimists | 謹慎派 Skeptics |
|-----------------|----------------|
| "Scaling 繼續有效，更大模型 = 更多湧現能力" | "LLM 沒有世界模型，模式匹配 ≠ 理解" |
| 代表：Ilya Sutskever, Sam Altman | 代表：Yann LeCun, Gary Marcus |

---

## AI 的三大範式 Three Paradigms

| 範式 Paradigm | 核心理念 Core Idea | 代表方法 Methods | 時代 Era |
|--------------|-------------------|-----------------|---------|
| **符號 AI (Symbolic AI)** | 用符號和規則表示知識，邏輯推理 | 專家系統、知識圖譜 | 1950s–1980s |
| **機器學習 (Machine Learning)** | 從資料中學習模式和規則 | 決策樹、SVM、神經網路 | 1990s–2010s |
| **深度學習 (Deep Learning)** | 用多層神經網路自動學習階層化特徵 | CNN、RNN、Transformer | 2012–至今 |

> 現代 AI 以**深度學習**為主流，符號 AI 在特定場景（如推理、知識表示）仍有價值。混合系統是活躍研究方向。

---

## AI 簡史 A Brief History

| 時期 Period | 階段 Phase | 關鍵事件 Key Events |
|------------|-----------|-------------------|
| 1950s | 誕生 Birth | 圖靈測試 (1950)、達特茅斯會議 (1956)、感知機 (1958) |
| 1960s–70s | 第一次 AI 寒冬 | 感知機局限性被證明、符號 AI 遇到瓶頸、資金縮減 |
| 1980s | 專家系統熱潮 | 專家系統商業化、反向傳播演算法重新被發現 |
| 1987–1993 | 第二次 AI 寒冬 | 專家系統維護成本高、Lisp 機器市場崩潰 |
| 1997–2011 | 穩步積累 | Deep Blue (1997)、統計 NLP、ImageNet (2009) |
| 2012–2017 | 深度學習革命 | AlexNet (2012)、GAN (2014)、AlphaGo (2016)、Transformer (2017) |
| 2018–2022 | 大模型時代 | BERT (2018)、GPT-3 (2020)、DALL-E (2021) |
| 2022–至今 | AI 民主化 | ChatGPT (2022)、開源 LLM 爆發、多模態、AI Agent、AI 程式設計 |

---

## AI、ML、DL 的關係 The Relationship

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

**AI ⊃ ML ⊃ DL** — 深度學習是機器學習的子集，機器學習是人工智慧的子集。

---

## 相關模組 Related Modules

| 模組 Module | 關聯 |
|------------|------|
| [[02-Machine Learning]] — ML 的核心概念和演算法 | 機器學習基礎 |
| [[03-Deep Learning]] — 神經網路的原理 | 深度學習深入 |
| [[07-Generative AI & LLMs]] — 21 世紀 AI 的旗艦應用 | GenAI 前沿 |
| [[08-AI Ethics & Safety]] — AI 治理 | 倫理與安全 |
| [[AI FAQ]] — AI ≠ 人類思維 | 常見誤解 |
| [[3 Resources/000 Knowledge/005 Software/005 Software\|Software (DDC 005)]] — AI 輔助軟體開發 | 跨域應用 |

---

> 💡 **Key Insight**: AI is not magic — it's math, data, and engineering. Understanding the fundamentals is the first step to building responsibly.
> AI 不是魔法——它是數學、資料與工程。理解基礎是負責任地構建 AI 的第一步。
