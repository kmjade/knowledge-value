---
created: 2026-05-30
type: source
domain: cg
covers:
  - concepts (8)
  - entities (2)
  - chapters (9)
---

# CG KB 編譯來源 — Source Documentation

## 來源概述

本知識庫基於以下主要來源編譯，涵蓋電腦圖形學的理論基礎、即時渲染技術、API 標準與業界實踐。

## 主要來源 Primary Sources

### 教科書 Textbooks

| 書名 | 作者 | 版次 | 使用範圍 |
|------|------|:---:|------|
| *Real-Time Rendering* | Akenine-Möller, Haines, Hoffman | 4th (2018) | 即時渲染管線、光照、著色、GPU |
| *Physically Based Rendering: From Theory to Implementation* | Pharr, Jakob, Humphreys | 4th (2023) | 光線追蹤、路徑追蹤、BRDF、取樣 |
| *Fundamentals of Computer Graphics* | Shirley, Marschner | 5th (2022) | 數學基礎、光柵化、曲線曲面 |
| *GPU Gems* 1–3 | NVIDIA | — | GPU 程式設計技巧與案例 |
| *Game Engine Architecture* | Jason Gregory | 3rd (2018) | 引擎圖形棧架構 |

### 業界標準 Industry Standards

| 標準 | 組織 | 說明 |
|------|------|------|
| OpenGL 4.6 Specification | Khronos Group | 跨平台圖形 API |
| Vulkan 1.3 Specification | Khronos Group | 現代低階圖形 API |
| DirectX 12 Ultimate | Microsoft | DXR, Mesh Shaders, VRS, Sampler Feedback |
| Metal 3 | Apple | Apple GPU 圖形與計算 API |
| glTF 2.0 | Khronos Group | PBR 材質傳輸格式 (Metallic/Roughness) |
| SPIR-V | Khronos Group | Shader 中間表示 |

### 硬體文獻 Hardware Documentation

| 來源 | 使用範圍 |
|------|------|
| NVIDIA GPU Architecture Whitepapers (Turing → Blackwell) | GPU 架構、RT Core、Tensor Core |
| AMD RDNA/CDNA Architecture Guides | GPU 架構對比 |
| Apple GPU Family Documentation | TBDR 架構、Metal 特性 |

### 線上資源 Online

- learnopengl.com — OpenGL 教學參考
- scratchapixel.com — CG 數學與演算法
- NVIDIA Developer Blog / GPUOpen (AMD) — GPU 技術文章
- SIGGRAPH / Eurographics / HPG 會議論文

## 編譯方法 Compilation Method

1. 提取核心概念：從教科書與文獻中提取 8 個核心概念
2. 結構化組織：按 DDC 004.92 層級，9 章從基礎到應用
3. 雙語標註：繁體中文正文 + English 技術術語保留
4. 交叉引用：Wiki 概念 ↔ 章節 ↔ 實體 互連
