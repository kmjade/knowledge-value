---
aliases:
  - 光線追蹤
  - Path Tracing
  - 光跡追蹤
created: 2026-05-30
type: concept
category: cg-core
status: reviewed
---

# Ray Tracing 光線追蹤

## 定義 Definition

光線追蹤 (Ray Tracing) 是一種模擬光線物理行為的渲染技術：從相機視點發射光線，追蹤其與場景交互（反射、折射、散射），計算每個像素的最終顏色。

## 核心內容 Core Content

### 基本流程

1. 從相機通過每個像素發射 Primary Ray
2. 計算光線與場景幾何的最近交點
3. 從交點向光源發射 Shadow Ray（判斷可見性）
4. 根據材質 BRDF 計算反射/折射方向，遞迴追蹤
5. 累積光線貢獻，得到像素顏色

### 關鍵演算法

| 演算法 | 特點 |
|------|------|
| **Whitted Ray Tracing** (1980) | 經典遞迴反射+折射 |
| **Path Tracing** (Kajiya 1986) | Monte Carlo 積分渲染方程 |
| **BDPT** | 雙向追蹤，處理困難光路 |
| **Photon Mapping** | 兩階段：光子散佈 + 密度估計 |

### 硬體加速

- **NVIDIA RT Core** (Turing 2018): 硬體 BVH 遍歷 + Ray-Triangle Intersection
- **DXR / Vulkan RT / Metal RT**: 業界標準光追 API
- **DLSS Ray Reconstruction**: 神經降噪 + 超解析度

## 相關 Connections

- [[Rendering-Pipeline-渲染管線]] — 光柵化管線（對比）
- [[Rasterization-光柵化]] — 即時渲染替代方案
- [[PBR-物理基礎渲染]] — 光追中的材質模型
- [[GPU-Architecture-GPU架構]] — RT Core 硬體實現

## 來源 Sources

- [[../sources/source-CG-KB\|CG KB 來源]]
- *PBRT v4*, Chapters 1, 13–16
