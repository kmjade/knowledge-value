---
aliases:
  - 著色器
  - Shader Program
created: 2026-05-30
type: concept
category: cg-core
status: reviewed
---

# Shader 著色器

## 定義 Definition

著色器 (Shader) 是在 GPU 上執行的可程式化小程式，控制渲染管線中特定階段的計算行為。現代圖形程式設計的核心。

## 核心內容 Core Content

### Shader 類型

| 類型 | 執行頻率 | 功能 |
|------|:---:|------|
| **Vertex Shader** | 每頂點 | 座標變換、傳遞屬性 |
| **Fragment (Pixel) Shader** | 每片段 | 顏色計算、紋理採樣、光照 |
| **Geometry Shader** | 每圖元 | 產生/修改幾何體（可選） |
| **Tessellation Shader** | 每 Patch | Hull Shader + Tessellator + Domain Shader |
| **Compute Shader** | 任意 | 通用 GPU 計算（非圖形） |
| **Mesh Shader** | 每 Meshlet | GPU-driven 管線 (DX12U/Vulkan 1.3) |
| **Ray Generation / Hit Shaders** | 每光線 | 光線追蹤 (DXR/Vulkan RT) |

### Shader 語言

| 語言 | 生態 |
|------|------|
| **GLSL** | OpenGL / Vulkan |
| **HLSL** | DirectX / Vulkan (via SPIR-V) |
| **MSL** | Apple Metal |
| **WGSL** | WebGPU |

### Shader 最佳化原則

- 減少紋理採樣 (Texture Fetch = 主要瓶頸)
- 使用 Mipmap 減少 Cache Miss
- 避免動態分支（Wave Divergence）
- 利用 `min16float` / `half` 節省 ALU
- 合併通道 (Pack grayscale maps into RGBA)

## 相關 Connections

- [[Rendering-Pipeline-渲染管線]] — Shader 在管線中的位置
- [[GPU-Architecture-GPU架構]] — Shader Core 硬體執行
- [[PBR-物理基礎渲染]] — PBR Shader 實現
- [[OpenGL]] — GLSL Shader API

## 來源 Sources

- [[../sources/source-CG-KB\|CG KB 來源]]
- *Real-Time Rendering* (4th Ed.), Chapter 3
