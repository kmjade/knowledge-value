---
title: Deep Learning
tags: [ai, deep-learning]
created: 2026-06-01
aliases: [深度學習, DL, 神經網路, Neural Networks]
---

# 03 — Deep Learning 深度學習

> Deep Learning is a subfield of ML that uses multi-layered neural networks to automatically learn hierarchical representations from data. It powers modern AI breakthroughs from image recognition to LLMs.
> 深度學習是機器學習的子領域，使用多層神經網路從資料中自動學習階層化表徵。從影像辨識到 LLM，它驅動了現代 AI 的突破。

---

## 神經網路基礎 Neural Network Basics

| 概念 Concept | 說明 Description |
|-------------|-----------------|
| **Perceptron 感知機** | 最簡單的神經元：y = σ(w·x + b)，線性分類的基礎單元 |
| **MLP 多層感知機** | 多層全連接神經網路，通過隱藏層學習非線性映射 |
| **Activation 激活函數** | ReLU / GELU / Sigmoid / Tanh，引入非線性 |
| **Backpropagation 反向傳播** | 鏈式法則計算梯度，從輸出層逐層回傳誤差 |
| **Gradient Descent 梯度下降** | 沿損失函數梯度方向更新權重：w ← w − η·∇L |

---

## CNN 卷積神經網路 Evolution

| 架構 Architecture | 年份 Year | 關鍵創新 Key Innovation |
|------------------|----------|----------------------|
| **LeNet-5** | 1998 | 首個成功 CNN，手寫數字辨識 |
| **AlexNet** | 2012 | ReLU + Dropout + GPU，ImageNet 冠軍，DL 革命引爆點 |
| **VGGNet** | 2014 | 小卷積核 (3×3) 堆疊，簡單但參數量大 |
| **GoogLeNet / Inception** | 2014 | Inception 模組，多尺度並行卷積 |
| **ResNet** | 2015 | 殘差連接 (Skip Connection)，解決梯度消失，可訓練 152 層 |
| **EfficientNet** | 2019 | 複合縮放 (深度/寬度/分辨率)，效率→精度最優 |

---

## RNN 序列模型 Sequence Models

| 架構 Architecture | 特點 Feature | 問題 Issue |
|------------------|-------------|-----------|
| **RNN** | 循環連接，處理序列資料 | 梯度消失/爆炸，長期依賴差 |
| **LSTM** | 遺忘門 + 輸入門 + 輸出門 | 參數多，訓練慢 |
| **GRU** | 簡化版 LSTM（重置門 + 更新門） | 參數少，效果接近 LSTM |

---

## Transformer 注意力機制 Attention Mechanism

| 組件 Component | 作用 Role |
|---------------|----------|
| **Self-Attention 自注意力** | 每個 token 與序列中所有 token 計算關聯權重 |
| **Multi-Head Attention 多頭注意力** | 多組並行注意力，捕捉不同子空間的關係 |
| **Q/K/V 查詢/鍵/值** | Attention(Q,K,V) = softmax(QKᵀ/√dₖ)V |
| **Positional Encoding 位置編碼** | 注入序列位置資訊（Transformer 無內建順序感知） |
| **Layer Norm + Residual** | 穩定訓練，防止梯度問題 |

---

## 訓練技巧 Training Techniques

| 技巧 Technique | 作用 Purpose |
|---------------|-------------|
| **Dropout** | 隨機丟棄神經元，防止過擬合 |
| **Batch Normalization (BN)** | 每層輸入標準化，加速收斂、允許更高學習率 |
| **Layer Normalization (LN)** | Transformer 標配，對每個樣本獨立歸一化 |
| **Residual Connection 殘差連接** | 跳層連接，讓深層網路可訓練 |
| **Transfer Learning 遷移學習** | 預訓練模型 → 微調下游任務，節省資料與算力 |
| **Data Augmentation 資料增強** | 旋轉/翻轉/裁剪/雜訊，擴充訓練集多樣性 |

---

## 優化器 Optimizers

| 優化器 Optimizer | 特點 Feature |
|-----------------|-------------|
| **SGD + Momentum** | 經典方法，動量加速收斂 |
| **Adam** | 自適應學習率 + 動量，預設首選 |
| **AdamW** | Adam + 解耦權重衰減，Transformer 訓練標配 |
| **RMSprop** | 自適應學習率，適合 RNN |
| **LAMB / LARS** | 大批量訓練 (>32K batch) 專用 |

---

## 相關模組 Related Modules

| 模組 Module | 關聯 |
|------------|------|
| [[02-Machine Learning]] — ML 基礎理論 | 深度學習的基礎 |
| [[04-NLP]] — Transformer 在 NLP 的應用 | NLP 核心架構 |
| [[05-Computer Vision]] — CNN 架構深入 | CV 骨幹網路 |
| [[07-Generative AI & LLMs]] — LLM = 超大 Transformer | 深度學習的前沿應用 |

---

> 💡 **Key Insight**: Deep Learning is not magic — it's just gradient descent over a very large computational graph. 深度學習不是魔法——它只是在一個非常大的計算圖上做梯度下降。Scale matters, but fundamentals rule.
