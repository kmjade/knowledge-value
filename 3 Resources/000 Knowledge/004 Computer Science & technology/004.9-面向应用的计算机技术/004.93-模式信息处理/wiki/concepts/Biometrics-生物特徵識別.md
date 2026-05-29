---
aliases: [Biometrics] · created: 2026-05-30
type: concept · category: pattern-recog · status: reviewed
---
# Biometrics 生物特徵識別

## 定義
利用人體生理特徵 (指紋、人臉、虹膜) 或行為特徵 (聲紋、簽名、步態) 進行身份認證的技術。

## 主要模態
| 模態 | 特徵 | 優點 | 缺點 |
|------|------|------|------|
| **指紋** | Minutiae (端點/分叉) | 成熟、低成本 | 接觸式、破損 |
| **人臉** | 深度嵌入 (ArcFace) | 非接觸、便捷 | 光照/遮擋/隱私 |
| **虹膜** | IrisCode | 極高準確率 | 需配合、成本高 |
| **聲紋** | i-vector/x-vector | 遠程可用 | 噪聲、健康影響 |

## 評估: FAR (假接受率) · FRR (假拒絕率) · EER (等錯誤率) · ROC/DET 曲線

## 安全議題: 生物特徵不可撤銷 → 模板保護 (Fuzzy Vault/同態加密) · 活體檢測

## 相關: [[Pattern-Recognition-模式識別]]、[[Image-Processing-圖像處理]] · Sources: [[source-Pattern-KB]]
