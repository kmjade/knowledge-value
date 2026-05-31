---
aliases:
  - Open Graphics Library
created: 2026-05-30
type: concept
topic: cg-api
status: reviewed
---

# OpenGL

## 定義 Definition

OpenGL (Open Graphics Library) 是最廣泛使用的跨平台 2D/3D 圖形 API，由 Khronos Group 維護。它為開發者提供抽象化的 GPU 操作介面，是學習電腦圖形學的經典入口。

## 核心內容 Core Content

### 版本演進

| 版本 | 年份 | 關鍵特性 |
|:---:|:---:|------|
| 1.0 | 1992 | 固定功能管線 (Fixed-Function Pipeline) |
| 2.0 | 2004 | **GLSL** 可程式化 Shader |
| 3.0 | 2008 | 棄用固定功能，需 Shader |
| 3.3 | 2010 | 現代 OpenGL 基礎，Core Profile |
| 4.0 | 2010 | Tessellation Shader |
| 4.3 | 2012 | Compute Shader |
| 4.5 | 2014 | Direct State Access (DSA) |
| 4.6 | 2017 | SPIR-V 支援 |

### 核心概念

| 概念 | 說明 |
|------|------|
| **VAO** (Vertex Array Object) | 封裝頂點屬性狀態 |
| **VBO** (Vertex Buffer Object) | GPU 端頂點資料儲存 |
| **IBO/EBO** (Element Buffer Object) | 索引緩衝，減少重複頂點 |
| **FBO** (Framebuffer Object) | 離屏渲染目標 |
| **UBO** (Uniform Buffer Object) | 批次 Uniform 傳遞 |
| **Texture Units** | 硬體紋理採樣槽位 |

### OpenGL vs Vulkan

| 面向 | OpenGL | Vulkan |
|------|:---:|:---:|
| 學習曲線 | 低 | 高 |
| 驅動開銷 | 高（隱式驗證） | 極低 |
| 多執行緒 | ❌ | ✅ |
| 光線追蹤 | ❌ | ✅ |
| 適合 | 學習/原型 | 高效能產品 |

## 相關 Connections

- [[Shader-著色器]] — GLSL Shader 語言
- [[GPU-Architecture-GPU架構]] — 硬體支援
- [[Rendering-Pipeline-渲染管線]] — API 控制管線

## 來源 Sources

- [[../sources/source-CG-KB\|CG KB 來源]]
- learnopengl.com, OpenGL 4.6 Specification
