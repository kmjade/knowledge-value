---
aliases: [CNN, Convolutional Neural Networks] · created: 2026-05-30
type: concept · category: AI · status: reviewed
---
# CNN 卷積神經網路

## 定義
專為**空間/網格數據** (圖像) 設計的神經網路，利用卷積核提取局部特徵。

## 核心層
| 層 | 功能 |
|----|------|
| **卷積層** | 滑動濾波器提取特徵 (邊緣→紋理→物體) |
| **ReLU** | 非線性激活 |
| **池化層** | 降維、平移不變性 (MaxPool/ AvgPool) |
| **全連接層** | 分類輸出 |

## 里程碑: LeNet → AlexNet (2012, ImageNet) → VGG → ResNet (殘差連接, 152 層) → EfficientNet → ViT

## 相關: [[神經網路]]、[[Transformer]] · Sources: [[source-AI-KB]]
