---
aliases:
  - Classification
  - Classifier
created: 2026-05-30
type: concept
category: pattern-recog
status: reviewed
---
# Classification 分類器

## 定義
將輸入特徵向量映射到離散類別標籤的決策函數或模型。是模式識別系統的核心決策組件。

## 主要分類器
| 分類器 | 決策邊界 | 特性 |
|--------|---------|------|
| **Bayes** | 後驗概率最大 | 最優理論、需知分佈 |
| **SVM** | 最大間隔超平面 | 核技巧、高維有效 |
| **KNN** | 最近鄰投票 | 無訓練、懶惰學習 |
| **決策樹** | 軸對齊超矩形 | 可解釋、易過擬合 |
| **Random Forest** | Bagging 集成 | 抗過擬合、並行 |
| **XGBoost** | Gradient Boosting | 表格 SOTA |
| **Logistic Regression** | 線性 + sigmoid | 基線、可解釋 |
| **MLP** | 非線性層疊 | 通用近似器 |
| **CNN/Transformer** | 深度特徵 + 分類 | 端到端感知 |

## 評估指標
- **Accuracy**: (TP+TN)/Total — 類別均衡時
- **Precision/Recall/F1**: 不平衡數據
- **ROC-AUC**: 排序質量、閾值無關
- **Confusion Matrix**: 每類錯誤分析

## 相關: [[Pattern-Recognition-模式識別]]、[[Feature-Extraction-特徵提取]] · Sources: [[source-Pattern-KB]]
