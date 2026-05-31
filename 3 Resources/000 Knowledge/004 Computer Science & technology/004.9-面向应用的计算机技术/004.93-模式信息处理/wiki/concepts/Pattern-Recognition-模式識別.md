---
aliases:
  - Pattern Recognition
created: 2026-05-30
type: concept
topic: pattern-recog
status: reviewed
---
# Pattern Recognition 模式識別

## 定義
從數據中自動發現規律 (Pattern) 並進行分類或描述的科學。核心是將原始感知信號映射到類別標籤或結構化描述。

## 核心組件
| 組件 | 功能 |
|------|------|
| **傳感器** | 採集物理世界信號 |
| **預處理** | 降噪、歸一化、增強 |
| **特徵提取** | 原始數據 → 判別性向量 |
| **分類器** | 特徵 → 類別決策 |
| **後處理** | 利用上下文修正錯誤 |

## 三大流派
- **統計模式識別**: 概率模型、判別函數 (Bayes, SVM)
- **句法模式識別**: 結構化語法規則 (形式語言、語法解析)
- **神經網絡**: 端到端可微學習 (CNN, Transformer)

## 相關: [[Feature-Extraction-特徵提取]]、[[Classification-分類器]] 

· Sources: [[source-Pattern-KB]]
