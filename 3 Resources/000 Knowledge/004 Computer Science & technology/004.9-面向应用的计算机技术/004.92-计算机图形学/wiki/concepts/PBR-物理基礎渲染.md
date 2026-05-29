---
aliases:
  - 物理基礎渲染
  - Physically Based Rendering
  - PBR 材質
created: 2026-05-30
type: concept
category: cg-lighting
status: reviewed
---

# PBR 物理基礎渲染

## 定義 Definition

PBR (Physically Based Rendering) 是一種基於物理光學原理的渲染方法，透過滿足能量守恆和微表面理論的 BRDF 模型，確保材質在任何光照條件下都呈現逼真可信的外觀。

## 核心內容 Core Content

### 核心原則

| 原則 | 說明 |
|------|------|
| **能量守恆 Energy Conservation** | 反射光總量 ≤ 入射光總量（Fresnel + Diffuse 能量分配） |
| **微表面理論 Microfacet Theory** | 表面由無數微小鏡面組成，粗糙度控制法線分佈 |
| **Fresnel 效應** | 反射率隨入射角增大而升高（掠射角接近全反射） |

### Cook-Torrance BRDF

$$f(l, v) = \frac{D(h) \cdot F(v, h) \cdot G(l, v, h)}{4 (n \cdot l) (n \cdot v)}$$

| 項 | 說明 | 常用實現 |
|:---:|------|------|
| **D** | 法線分佈函數 (NDF) | GGX / Trowbridge-Reitz |
| **F** | Fresnel 反射率 | Schlick 近似 |
| **G** | 幾何遮蔽函數 | Smith GGX |

### PBR 工作流

| 工作流 | 參數 | 生態 |
|------|------|------|
| **Metallic/Roughness** | Albedo + Metallic + Roughness + AO + Normal | UE5, Substance, glTF 2.0 |
| **Specular/Glossiness** | Diffuse + Specular + Glossiness | 舊版 Unity, 傳統管線 |

### Disney Principled BRDF

藝術家友善參數集：Base Color, Metallic, Roughness, Specular, Specular Tint, Anisotropic, Sheen, Clearcoat, Clearcoat Gloss...

## 相關 Connections

- [[Rendering-Pipeline-渲染管線]] — Fragment Shader 中的 PBR 實現
- [[Ray-Tracing-光線追蹤]] — 光追中的 PBR 材質
- [[Real-Time-Rendering-即時渲染]] — 即時 PBR 應用

## 來源 Sources

- [[../sources/source-CG-KB\|CG KB 來源]]
- *PBRT v4*, Chapter 9 (Materials)
- Disney Principled BRDF (Burley, SIGGRAPH 2012)
