---
aliases:
  - GPU 架構
  - GPU Hardware
  - Graphics Processing Unit
created: 2026-05-30
type: concept
category: cg-hardware
status: reviewed
---

# GPU Architecture GPU 架構

## 定義 Definition

GPU (Graphics Processing Unit) 是專為大規模平行計算設計的處理器，透過數千個核心同時執行 Shader 程式來實現高效圖形渲染與通用計算。

## 核心內容 Core Content

### GPU 演進

| 世代 | 代表架構 | 里程碑 |
|:---:|------|------|
| 1999 | NVIDIA GeForce 256 | 首款 GPU，硬體 T&L |
| 2006 | NVIDIA G80 (Tesla) | 統一 Shader 架構 + CUDA |
| 2012 | NVIDIA Kepler | Bindless Textures, 動態並行 |
| 2016 | NVIDIA Pascal | Simultaneous Multi-Projection |
| 2018 | NVIDIA Turing | **RT Core** (硬體光追) + Tensor Core |
| 2020 | NVIDIA Ampere | 2× FP32, 第三代 Tensor Core |
| 2022 | NVIDIA Ada Lovelace | SER (Shader Execution Reordering), DLSS 3 |

### GPU 微架構關鍵組件

| 組件 | 功能 |
|------|------|
| **SM** (Streaming Multiprocessor) | 基本運算單元，含 CUDA Cores + Tensor Cores + RT Cores |
| **Warp / Wavefront** | 32 線程為一組 (NVIDIA Warp, AMD Wave64/Wave32) |
| **Texture Unit (TMU)** | 紋理採樣、濾波、Mipmap LOD 計算 |
| **ROP** (Render Output Unit) | 深度測試、混合、寫入 Framebuffer |
| **L1/L2 Cache** | 紋理/幾何資料快取 |
| **VRAM (GDDR6X/HBM3)** | 高頻寬顯存，紋理/網格/BVH 儲存 |

### 平行執行模型

- **SIMT** (Single Instruction, Multiple Threads): Warp 內所有線程執行相同指令
- **Wave Divergence**: 分支導致部分線程閒置 — 效能殺手
- **Occupancy**: SM 上活躍 Warp 數 / 最大 Warp 數，影響延遲隱藏

## 相關 Connections

- [[Rendering-Pipeline-渲染管線]] — 管線在 GPU 上的實現
- [[Shader-著色器]] — 在 SM 上執行的程式
- [[../entities/NVIDIA-GPU\|NVIDIA GPU]] — NVIDIA 實體

## 來源 Sources

- [[../sources/source-CG-KB\|CG KB 來源]]
- *GPU Gems* series, NVIDIA developer docs
