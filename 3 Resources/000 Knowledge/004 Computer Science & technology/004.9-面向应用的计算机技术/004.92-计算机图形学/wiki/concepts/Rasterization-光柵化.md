---
aliases:
  - 光柵化
  - Scanline Conversion
created: 2026-05-30
type: concept
topic: cg-core
status: reviewed
---

# Rasterization 光柵化

## 定義 Definition

光柵化 (Rasterization) 是將向量圖形（三角形、線段）轉換為像素/片段 (Fragments) 的過程，是即時渲染管線的核心階段。它決定哪些螢幕像素被幾何圖元覆蓋。

## 核心內容 Core Content

### 光柵化步驟

| 步驟 | 說明 |
|------|------|
| **三角形設置 Triangle Setup** | 計算邊方程（Edge Functions），用於判斷像素是否在三角形內 |
| **掃描線轉換 Scanline Conversion** | 遍歷三角形包圍盒內的所有像素 |
| **重心座標插值 Barycentric Interpolation** | 計算像素在三角形內的參數（顏色、UV、法線、深度） |
| **透視校正 Perspective Correction** | 螢幕空間線性插值 ≠ 世界空間線性插值，需除以 $w$ |

### 邊方程 Edge Function

對於三角形頂點 $(v_0, v_1, v_2)$，邊方程 $E_{ij}(p)$ 判斷點 $p$ 位於邊 $v_i \to v_j$ 的哪一側。若三個邊方程同號，則 $p$ 在三角形內。

### 關鍵問題

| 問題 | 解決方案 |
|------|----------|
| **Aliasing 鋸齒** | MSAA, SSAA, FXAA, TAA |
| **Shared Edges** | Top-Left 填充規則 (Direct3D/Vulkan) |
| **Sub-pixel Triangles** | 小三角形需保守光柵化 (Conservative Rasterization) |

## 相關 Connections

- [[Rendering-Pipeline-渲染管線]] — 管線中的光柵化階段
- [[Ray-Tracing-光線追蹤]] — 對比：光柵化 vs 光追
- [[Shader-著色器]] — Fragment Shader 消費光柵化輸出的片段
- [[GPU-Architecture-GPU架構]] — 硬體光柵化單元 (ROP)

## 來源 Sources

- [[../sources/source-CG-KB\|CG KB 來源]]
- *Real-Time Rendering* (4th Ed.), Chapter 5
