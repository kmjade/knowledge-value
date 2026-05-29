---
aliases:
  - NVIDIA
  - NVIDIA Corporation
created: 2026-05-30
type: entity
category: hardware-vendor
domain: cg
status: reviewed
---

# NVIDIA GPU

## 定義 Definition

NVIDIA 是全球最大的 GPU 製造商與圖形技術公司（1993 年創立），其 GPU 架構迭代深刻塑造了電腦圖形學的發展軌跡，從可程式化 Shader 到硬體光線追蹤。

## 核心貢獻 Key Contributions

### 圖形學里程碑

| 年份 | 貢獻 | 影響 |
|:---:|------|------|
| 1999 | GeForce 256 — 首款 GPU | 定義 GPU 概念，硬體 T&L |
| 2006 | CUDA (G80/Tesla) | GPGPU 革命，GPU 通用計算 |
| 2009 | Fermi | L1/L2 Cache 層級，ECC |
| 2018 | Turing + RT Core | **首次硬體即時光線追蹤** |
| 2018 | DLSS (Deep Learning Super Sampling) | AI 超解析度渲染 |
| 2020 | Ampere (RTX 30) | 2× FP32, 第三代 Tensor Core |
| 2022 | Ada Lovelace (RTX 40) | SER, DLSS 3 Frame Generation, OMM/DMM |
| 2024 | Blackwell (RTX 50) | 第四代 RT Core, DLSS 4 Multi Frame Gen |

### 關鍵技術

| 技術 | 說明 |
|------|------|
| **RT Core** | 硬體加速 BVH 遍歷 + Ray-Triangle/Box 相交 |
| **Tensor Core** | FP16/INT8/INT4 矩陣運算，驅動 DLSS 與 AI 降噪 |
| **SER** (Shader Execution Reordering) | 動態重排 Warp，減少 RT divergent rays |
| **OMM/DMM** (Opacity/Displacement Micro-Mesh) | 加速透明/位移幾何光追 |
| **CUDA / OptiX** | GPU 通用計算 + 光線追蹤 SDK |
| **Omniverse** | 基於 USD 的協作式 3D 平台 |

### 競爭格局

| 對手 | 領域 |
|------|------|
| **AMD (RDNA/CDNA)** | 遊戲 GPU + ROCm 計算 |
| **Intel (Arc/Xe)** | 獨立 GPU 市場新進者 |
| **Apple (M-series GPU)** | 行動/桌面整合 GPU (Metal) |

## 相關 Connections

- [[../concepts/GPU-Architecture-GPU架構\|GPU Architecture]] — GPU 架構概念
- [[../concepts/Ray-Tracing-光線追蹤\|Ray Tracing]] — RT Core 應用
- [[../concepts/Real-Time-Rendering-即時渲染\|Real-Time Rendering]] — NVIDIA GPU 驅動即時渲染

## 來源 Sources

- [[../sources/source-CG-KB\|CG KB 來源]]
- NVIDIA Developer Blog, GPU Technology Conference (GTC)
