---
title: Computer Vision
tags: [ai, computer-vision]
created: 2026-06-01
aliases: [CV, 電腦視覺, 計算機視覺, 影像辨識]
---

# 05 — Computer Vision 電腦視覺

> Computer Vision enables machines to interpret and understand visual information from the world — images, videos, and 3D scenes. It is the "eye" of AI.
> 電腦視覺讓機器能解讀和理解來自世界的視覺資訊——影像、影片和 3D 場景。它是 AI 的「眼睛」。

---

## 影像基礎 Image Fundamentals

| 概念 Concept | 說明 Description |
|-------------|-----------------|
| **像素 Pixel** | 影像最小單元，RGB 三通道 (H×W×3) |
| **卷積 Convolution** | 滑動濾波器提取局部特徵（邊緣/紋理/形狀） |
| **池化 Pooling** | 下採樣：Max Pooling / Average Pooling，降低解析度增加感受野 |
| **通道 Channel** | CNN 中每層輸出的特徵圖數量 |
| **感受野 Receptive Field** | 卷積層中每個像素對應的原始輸入區域大小 |

---

## CNN 骨幹網路演進 Backbone Evolution

| 階段 Stage | 架構 | 貢獻 |
|-----------|------|------|
| 奠基 Foundation | AlexNet → VGG → GoogLeNet | 證明深度 CNN 可行 |
| 深度化 Deepening | **ResNet** (2015) | 殘差連接突破深度瓶頸，ResNet-50/101 成工業標準 |
| 效率化 Efficiency | MobileNet / ShuffleNet | 輕量化，適合移動端和邊緣裝置 |
| 最優化 Optimization | **EfficientNet** (2019) | 複合縮放，精度/效率 Pareto 最優 |
| Transformer 化 | **ViT** (2020) | 純 Transformer 架構處理影像，打破 CNN 壟斷 |

### CNN vs ViT 對比

| 維度 | CNN | Vision Transformer (ViT) |
|------|-----|--------------------------|
| 歸納偏置 Inductive Bias | 強（局部性、平移等變） | 弱（需要更多資料） |
| 資料效率 | 小資料集表現好 | 需要大規模預訓練 |
| 全局建模 | 需逐層擴大感受野 | 自注意力直接全局建模 |
| 計算複雜度 | O(k²·n) | O(n²) |

---

## 目標檢測 Object Detection

| 方法 Method | 類型 Type | 核心思想 Core Idea | 速度 Speed |
|-----------|---------|-------------------|-----------|
| **R-CNN 家族** (R-CNN→Fast→Faster) | Two-stage | 區域提議 → 分類 + 回歸 | 慢，精度高 |
| **YOLO** (v1→v10) | One-stage | 統一網格預測，端到端 | 極快，即時檢測 |
| **SSD** | One-stage | 多尺度特徵圖檢測 | 快，平衡 |
| **DETR** | Transformer | 物件檢測視為集合預測問題 | 中等，端到端 |

---

## 影像分割 Image Segmentation

| 方法 Method | 說明 Description | 應用 Application |
|-----------|-----------------|-----------------|
| **Semantic Segmentation 語義分割** | 每個像素分類（所有車=同一類） | 自動駕駛場景理解 |
| **Instance Segmentation 實例分割** | 區分同一類別的不同個體 | 細胞計數、人群分析 |
| **Panoptic Segmentation 全景分割** | 語義 + 實例的統一 | 完整場景解析 |
| **FCN** | 全卷積網路，首個端到端分割 | 語義分割鼻祖 |
| **U-Net** | 編碼器-解碼器 + 跳連 | 醫學影像、衛星圖 |
| **SAM** (Segment Anything) | Meta 的通用分割基礎模型 | 零樣本分割、互動式標註 |

---

## 影像生成 Image Generation

| 方法 Method | 原理 Principle | 代表 Representative |
|-----------|---------------|-------------------|
| **GAN** | 生成器 vs 判別器對抗訓練 | StyleGAN, CycleGAN |
| **VAE** | 變分自編碼器，機率生成 | Stable Diffusion 的組件 |
| **Diffusion Models** | 逐步去噪馬可夫鏈 | Stable Diffusion, DALL-E 3, Midjourney, Flux |
| **Autoregressive** | 逐像素/區塊預測 | DALL-E (v1) |

---

## 影片理解 Video Understanding

| 任務 Task | 方法 Method |
|----------|------------|
| **Action Recognition 動作識別** | 3D CNN, SlowFast, Video Transformer |
| **Object Tracking 目標追蹤** | SORT, DeepSORT, ByteTrack |
| **Video Generation 影片生成** | Sora, Runway Gen-3, Kling |

---

## 相關模組 Related Modules

| 模組 Module | 關聯 |
|------------|------|
| [[03-Deep Learning]] — CNN / Transformer 基礎 | CV 的技術底座 |
| [[07-Generative AI & LLMs]] — 多模態生成 | 文字→影像/影片 |
| [[09-AI Applications & Tools]] — 模型部署 | CV 模型落地 |

---

> 💡 **Key Insight**: Vision is the richest sensory modality for AI. 視覺是 AI 最豐富的感知模態。從 ImageNet 到 SAM，CV 的核心驅動力一直是：更好的架構 + 更多的資料 + 更強的算力。
