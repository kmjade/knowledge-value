---
aliases:
  - Image Processing
created: 2026-05-30
type: concept
category: pattern-recog
status: reviewed
---
# Image Processing 圖像處理

## 定義
對數字圖像進行變換以改善質量或提取信息的技術。是計算機視覺和模式識別的基礎。

## 核心操作
| 類別 | 操作 | 用途 |
|------|------|------|
| **空間濾波** | 高斯、中值、雙邊 | 平滑、去噪 |
| **頻率濾波** | FFT → 低通/高通 | 周期性噪聲去除 |
| **邊緣檢測** | Canny、Sobel、LoG | 特徵定位 |
| **形態學** | 膨脹、腐蝕、開閉 | 二值圖處理 |
| **分割** | 閾值、區域生長、分水嶺 | 前景/背景分離 |

## 深度分割
U-Net (編碼-解碼 + 跳躍連接)、DeepLab (空洞卷積)、SAM (Segment Anything) — 從傳統到基礎模型。

## 相關: [[Pattern-Recognition-模式識別]]、[[OpenCV]] · Sources: [[source-Pattern-KB]]
