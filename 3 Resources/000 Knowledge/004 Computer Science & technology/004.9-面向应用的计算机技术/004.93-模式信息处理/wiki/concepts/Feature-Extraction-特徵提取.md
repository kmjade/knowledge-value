---
aliases: [Feature Extraction] · created: 2026-05-30
type: concept · category: pattern-recog · status: reviewed
---
# Feature Extraction 特徵提取

## 定義
將原始數據轉換為判別性特徵向量的過程。好的特徵應具有: 區分性、不變性、魯棒性、緊湊性。

## 主要類型
| 類型 | 方法 | 應用域 |
|------|------|--------|
| **手工特徵** | SIFT, HOG, LBP, Haar, MFCC | 經典 CV、嵌入式 |
| **線性降維** | PCA, LDA, ICA | 可解釋降維 |
| **非線性降維** | t-SNE, UMAP, Autoencoder | 可視化、預訓練 |
| **深度特徵** | CNN 中間層、ViT | 遷移學習 |

## 特徵選擇三策略
- **Filter**: 統計檢驗 (χ²、MI) → 快速、獨立於模型
- **Wrapper**: 子集搜索 + 模型評估 (RFE) → 昂貴但精確
- **Embedded**: 訓練中自動選擇 (Lasso L1、樹重要性) → 平衡

## 相關: [[Pattern-Recognition-模式識別]]、[[Classification-分類器]] · Sources: [[source-Pattern-KB]]
