---
aliases:
  - 渲染管線
  - GPU Pipeline
  - Graphics Pipeline
created: 2026-05-30
type: concept
category: cg-core
status: reviewed
---

# Rendering Pipeline 渲染管線

## 定義 Definition

渲染管線是 GPU 將 3D 場景（幾何、材質、光源）轉換為 2D 像素影像的多階段處理流程。它是即時電腦圖形學的核心概念。

## 核心內容 Core Content

| 階段 | 可程式化 | 功能 |
|------|:---:|------|
| Input Assembler | ❌ | 組裝頂點/索引緩衝為三角形 |
| Vertex Shader | ✅ | 頂點座標變換 (Model→Clip Space) |
| Tessellation | ✅ | 動態細分曲面 (Hull/Domain Shader) |
| Geometry Shader | ✅ | 逐圖元操作，可產生/刪除幾何 |
| Rasterizer | ❌ | 三角形 → 片段 (Fragments) |
| Fragment Shader | ✅ | 像素著色、紋理採樣、光照 |
| Output Merger | ❌ | 深度/模板測試、混合 |

### 關鍵概念

- **固定功能 vs 可程式化**: 現代 GPU 將 Vertex/Fragment/Compute Shader 完全開放
- **Early-Z**: 在 Fragment Shader 前拒絕被遮擋片段
- **TBDR** (Tile-Based Deferred Rendering): 行動 GPU (Apple, Mali, Adreno) 的延遲渲染方式
- **Mesh Shading** (DX12U/Vulkan 1.3): 取代傳統 Vertex→Geometry 管線，支援 GPU-driven 剔除與 LOD

## 相關 Connections

- [[Rasterization-光柵化]] — 光柵化階段詳解
- [[Shader-著色器]] — 可程式化著色器
- [[GPU-Architecture-GPU架構]] — 硬體管線實現
- [[Real-Time-Rendering-即時渲染]] — 即時渲染應用

## 來源 Sources

- [[../sources/source-CG-KB\|CG KB 來源]]
- *Real-Time Rendering* (4th Ed.), Chapter 2–3
