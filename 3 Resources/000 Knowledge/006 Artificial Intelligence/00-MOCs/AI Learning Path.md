---
title: AI 學習路徑
tags: [ai, learning-path]
created: 2026-05-29
aliases: [AI Learning Path, AI 學習路線]
---

# AI 學習路徑 Learning Path

> 從零到 AI 從業者的系統學習路線。
> A structured learning path from beginner to AI practitioner.

---

## 路線總覽 Path Overview

```
Phase 1            Phase 2             Phase 3              Phase 4
入門基礎            中階實務              進階專業               前沿探索
(2–4 weeks)        (4–8 weeks)          (8–12 weeks)         (ongoing)
────────────────────────────────────────────────────────────────────
  Foundations   →   ML + DL       →    Specialization    →    Frontiers
  AI 基礎概念          機器學習 + 深度學習      專業領域深入             前沿追蹤
```

---

## Phase 1：入門基礎 Foundations (2–4 weeks)

**目標 Goal**: 理解 AI 的核心概念、歷史脈絡與思維方式

| 順序 | 模組 Module | 學習重點 Focus | 預計時間 |
|------|------------|---------------|---------|
| 1.1 | [[01-AI Overview]] | What is AI? ANI/AGI/ASI, three paradigms, AI history | 3–5 hrs |
| 1.2 | [[AI FAQ]] | 破除常見誤解：AI ≠ 人類思維、LLM 不是全知 | 1–2 hrs |
| 1.3 | [[08-AI Ethics & Safety]] (skim) | AI 偏見、對齊問題的基本概念 | 2–3 hrs |

**檢驗 Checkpoint**: 能用自己的話解釋 AI/ML/DL 的區別，能說出 AI 發展的三個範式。

---

## Phase 2：中階實務 Core ML + DL (4–8 weeks)

**目標 Goal**: 掌握機器學習與深度學習的核心演算法與實作能力

| 順序 | 模組 Module | 學習重點 Focus | 預計時間 |
|------|------------|---------------|---------|
| 2.1 | [[02-Machine Learning]] | 監督/非監督/強化學習、經典演算法（LR/SVM/RF/XGBoost） | 10–15 hrs |
| 2.2 | [[03-Deep Learning]] | MLP、CNN、RNN、Transformer、訓練技巧 | 12–18 hrs |
| 2.3 | [[09-AI Applications & Tools]] (partial) | Jupyter、PyTorch/TensorFlow 基礎、實驗管理 | 5–8 hrs |

**檢驗 Checkpoint**: 能用 PyTorch 訓練一個 CNN 做影像分類，能用 scikit-learn 完成特徵工程 + 模型訓練 + 評估。

---

## Phase 3：進階專業 Specialization (8–12 weeks)

**目標 Goal**: 深入至少一個 AI 子領域，具備專業級能力

### Track A: NLP 路線

| 順序 | 模組 Module | 學習重點 Focus |
|------|------------|---------------|
| A.1 | [[04-Natural Language Processing]] | NLP 五個時代、核心任務、BERT vs GPT |
| A.2 | [[07-Generative AI & LLMs]] | LLM、Prompt Engineering、RAG、AI Agent |
| A.3 | Practice | 構建一個 RAG 應用 |

### Track B: CV 路線

| 順序 | 模組 Module | 學習重點 Focus |
|------|------------|---------------|
| B.1 | [[05-Computer Vision]] | CNN 骨幹演進、YOLO、ViT、Diffusion |
| B.2 | Practice | 訓練物件檢測模型、Fine-tune 影像生成模型 |

### Track C: RL + Agent 路線

| 順序 | 模組 Module | 學習重點 Focus |
|------|------------|---------------|
| C.1 | [[06-Reinforcement Learning]] | Q-Learning、Policy Gradient、PPO、RLHF |
| C.2 | [[07-Generative AI & LLMs]] (Agent section) | AI Agent 架構、工具調用、多步推理 |
| C.3 | Practice | 構建一個簡單的 RL 環境或 AI Agent |

**檢驗 Checkpoint**: 能在選定領域獨立完成一個中等複雜度的專案。

---

## Phase 4：前沿探索 Frontiers (ongoing)

**目標 Goal**: 追蹤前沿、工程化能力、技術領導力

| 順序 | 主題 Topic | 說明 Description |
|------|-----------|-----------------|
| 4.1 | 論文閱讀 Paper Reading | 追蹤 arXiv、頂會論文（NeurIPS, ICML, ICLR） |
| 4.2 | MLOps 深度實踐 | 模型部署、監控、A/B 測試、成本最佳化 |
| 4.3 | 開源貢獻 Open Source | 貢獻 PyTorch、Hugging Face、LangChain 等專案 |
| 4.4 | 跨領域應用 | AI + Software Engineering（見 [[3 Resources/000 Knowledge/005 Software/005 Software\|DDC 005]]） |

---

## 推薦資源 Recommended Resources

| 類型 Type | 資源 Resource | 適合階段 Phase |
|-----------|-------------|---------------|
| 📖 書籍 | *Artificial Intelligence: A Modern Approach* (Russell & Norvig) | Phase 1–2 |
| 📖 書籍 | *Deep Learning* (Goodfellow, Bengio, Courville) | Phase 2–3 |
| 📖 書籍 | *Speech and Language Processing* (Jurafsky & Martin) | Phase 3 (NLP) |
| 🎓 課程 | Andrew Ng — Machine Learning (Coursera) | Phase 1–2 |
| 🎓 課程 | Fast.ai — Practical Deep Learning | Phase 2 |
| 🎓 課程 | Stanford CS224n — NLP with Deep Learning | Phase 3 (NLP) |
| 🎓 課程 | Stanford CS231n — CNNs for Visual Recognition | Phase 3 (CV) |
| 🛠️ 實踐 | Kaggle competitions | Phase 2+ |
| 🛠️ 實踐 | Hugging Face — build and share models | Phase 3+ |

完整資源清單見 [[AI Resources]]。

---

## 進度追蹤 Progress Tracker

| Phase | 狀態 Status | 完成日期 |
|-------|-----------|---------|
| Phase 1: Foundations | ⬜ | — |
| Phase 2: Core ML + DL | ⬜ | — |
| Phase 3: Specialization | ⬜ | — |
| Phase 4: Frontiers | ⬜ | — |

---

> 💡 **學習建議**: Theory without practice is hollow. 每個 Phase 建議搭配一個 hands-on project 來鞏固所學。理論 + 實踐 = 真正掌握。
