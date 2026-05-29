---
aliases:
  - Graphics APIs & Engines
  - 圖形引擎
tags: [DDC/004.92, cg, chapter-09]
created: 2026-05-30
---

# 09 圖形 API 與引擎 — Graphics APIs & Engines

> 從底層圖形 API 到商業遊戲引擎的圖形技術棧全景。

---

## 9.1 圖形 API 對比 Graphics API Comparison

| 特性 | **OpenGL** | **Vulkan** | **DirectX 12** | **Metal** |
|------|:---:|:---:|:---:|:---:|
| 平台 | 跨平台 | 跨平台 | Windows/Xbox | Apple (macOS/iOS) |
| 設計 | 高階狀態機 | 低階顯式控制 | 低階顯式控制 | 低階顯式控制 |
| 多執行緒 | ❌ 受限 | ✅ 原生 | ✅ 原生 | ✅ 原生 |
| 光線追蹤 | ❌ (需 Extension) | ✅ VK_KHR_ray_tracing | ✅ DXR | ✅ Metal RT |
| 驅動開銷 | 高 (隱式驗證) | 極低 | 極低 | 極低 |
| 學習曲線 | 平緩 | 陡峭 | 中等 | 中等 |
| Shader 語言 | GLSL | GLSL / HLSL (SPIR-V) | HLSL | MSL (Metal Shading Language) |
| 典型應用 | 遺留/教學/CAE | AAA 遊戲、模擬器 | AAA 遊戲 | iOS/macOS 應用 |

> **WebGPU**: 新一代 Web 圖形 API（繼承 Vulkan/Metal/DX12 設計理念，WGSL Shader）

---

## 9.2 Shader 語言 Shader Languages

| 語言 | 生態 | 特點 |
|------|------|------|
| **GLSL** (OpenGL Shading Language) | OpenGL/Vulkan | C-like，跨平台 |
| **HLSL** (High-Level Shading Language) | DirectX/Vulkan | 微軟生態，支援 SM 6.x Wave Intrinsics |
| **MSL** (Metal Shading Language) | Apple Metal | C++14 基礎，整合 Apple GPU 特性 |
| **WGSL** (WebGPU Shading Language) | WebGPU | Rust 風格語法，安全 |
| **SPIR-V** | Vulkan/OpenCL | 中間表示 (IR)，多語言前端均可編譯 |

---

## 9.3 遊戲引擎圖形棧 Game Engine Graphics Stack

| 引擎 | 圖形亮點 | 渲染管線 |
|------|----------|----------|
| **Unreal Engine 5** | Nanite (虛擬幾何)、Lumen (即時 GI)、MetaHuman | Deferred → Forward+ for translucency |
| **Unity** (HDRP/URP) | HDRP: PBR + RT; URP: 輕量跨平台 | 可程式化 SRP (Scriptable Render Pipeline) |
| **Godot 4** | Vulkan 原生、Clustered Forward、SDFGI | Forward+/Mobile |
| **CryEngine** | Voxel-based GI (SVOGI 先驅) | Deferred |
| **O3DE** (Open 3D Engine) | Atom Renderer (模組化), DX12/Vulkan/Metal | 可客製 Forward/Deferred |

---

## 9.4 渲染架構 Renderer Architectures

| 架構 | 說明 | 適用 |
|------|------|------|
| **Forward Rendering** | 逐物體逐光源，簡單直觀 | 行動平台、VR |
| **Forward+** (Tiled Forward) | 螢幕分 Tile，每 Tile 只計算影響光源 | 中量光源 |
| **Deferred Rendering** | 分離幾何 Pass (G-Buffer) + 光照 Pass | 大量動態光源 |
| **Clustered Forward/Deferred** | 3D 空間分簇 (Frustum Voxels) | 高效處理大量光源 |
| **Tile-Based Deferred (TBDR)** | Apple GPU 原生延遲渲染 | iOS/macOS Metal |

---

## 9.5 效能分析與調試 Performance & Debugging

| 工具 | 平台 | 功能 |
|------|------|------|
| **RenderDoc** | 跨平台 | 幀擷取、Draw Call 分析、Shader 除錯 |
| **NVIDIA Nsight** | NVIDIA GPU | GPU Trace、Shader Profiling、RT 分析 |
| **PIX** | Xbox/Windows | DirectX 調試與效能分析 |
| **Xcode GPU Frame Capture** | Apple | Metal 幀擷取與分析 |
| **Unreal Insights / Unity Profiler** | 引擎級 | CPU/GPU 協同分析 |
