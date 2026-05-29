---
aliases:
  - 即時渲染
  - Real-Time Graphics
  - Interactive Rendering
created: 2026-05-30
type: concept
category: cg-core
status: reviewed
---

# Real-Time Rendering 即時渲染

## 定義 Definition

即時渲染 (Real-Time Rendering) 是指在嚴格時間限制內（通常 16.6ms/幀 @ 60fps 或 8.3ms @ 120fps）生成互動式 3D 圖形的技術。它是遊戲、VR/AR、模擬器的核心圖形技術。

## 核心內容 Core Content

### 效能目標 Performance Targets

| 頻率 | 幀時間 | 典型應用 |
|:---:|:---:|------|
| 30 fps | 33.3ms | 主機電影模式 |
| 60 fps | 16.6ms | 標準遊戲 |
| 90–120 fps | 11.1–8.3ms | VR (避免暈眩) |
| 144–240 fps | 6.9–4.2ms | 競技遊戲 |

### 關鍵技術棧

| 層級 | 技術 |
|------|------|
| **API** | Vulkan, DirectX 12, Metal, WebGPU |
| **管線** | Rasterization (主) + Hybrid RT |
| **光照** | PBR + Light Probes + SSGI/SSAO |
| **陰影** | CSM + RT Shadows |
| **幾何** | LOD + GPU-driven Culling + Nanite |
| **後處理** | TAA/FSR/DLSS + Tone Mapping + Bloom |
| **降噪** | SVGF + DLSS Ray Reconstruction (for RT) |

### 即時 vs 離線 Real-Time vs Offline

| 面向 | 即時渲染 | 離線渲染 |
|------|:---:|:---:|
| 每幀時間 | < 16.6ms | 數分鐘~數小時 |
| 演算法 | Rasterization + 近似 | Path Tracing (無偏) |
| 品質 | 逼近真實 | 物理精確 |
| 代表 | Unreal Engine 5, Unity | Arnold, RenderMan, Cycles |

### 即時光線追蹤 Hybrid RT

現代 GPU (RTX 20+) 支援光柵化 + 光線追蹤混合：
- **Rasterization**: 主要幾何 Pass (G-Buffer)
- **RT**: 反射、陰影、全域照明、Ambient Occlusion
- **Denoising**: DLSS Ray Reconstruction 或 SVGF

## 相關 Connections

- [[Rendering-Pipeline-渲染管線]] — 即時管線基礎
- [[Rasterization-光柵化]] — 即時渲染主力演算法
- [[PBR-物理基礎渲染]] — 即時 PBR 實現
- [[GPU-Architecture-GPU架構]] — 硬體限制與優化

## 來源 Sources

- [[../sources/source-CG-KB\|CG KB 來源]]
- *Real-Time Rendering* (4th Ed.), Akenine-Möller et al.
