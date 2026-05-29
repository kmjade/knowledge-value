---
aliases:
  - UE5
  - Unreal Engine 5
  - Epic Games 引擎
created: 2026-05-30
type: entity
category: game-engine
domain: cg
status: reviewed
---

# Unreal Engine

## 定義 Definition

Unreal Engine 是由 Epic Games 開發的即時 3D 引擎，是全球最廣泛使用的遊戲與即時圖形引擎之一，以領先的圖形技術（Nanite、Lumen）和完整的工具鏈著稱。

## 核心內容 Core Content

### 版本演進

| 版本 | 年份 | 圖形里程碑 |
|:---:|:---:|------|
| UE1 | 1998 | 軟體渲染 + 早期 Glide/D3D |
| UE2 | 2002 | 硬體 T&L，法線貼圖 |
| UE3 | 2006 | Deferred Rendering，PhysX |
| UE4 | 2014 | **PBR 管線**，開源（源碼可用） |
| UE5 | 2022 | **Nanite** + **Lumen** + MetaHuman |

### UE5 核心圖形技術

| 技術 | 說明 |
|------|------|
| **Nanite** | 虛擬化微多邊形幾何（Virtualized Geometry），自動 LOD，從數百萬到數十億三角形無縫渲染 |
| **Lumen** | 即時全域照明 (Real-Time GI)，支援無限反彈，混合 Surface Cache + Screen-Space + HW RT |
| **MetaHuman** | 高保真數位人類框架（Rigging/Skinning/Animation） |
| **Temporal Super Resolution (TSR)** | 引擎原生時序超解析度（對標 DLSS/FSR） |
| **Virtual Shadow Maps (VSM)** | 高解析度虛擬化陰影（取代 CSM） |
| **World Partition** | 開放世界自動分區管理 |

### Shader 管線

- **Material Editor**（節點式）：藝術家友善 PBR 材質
- **Material Instancing**：執行時高效材質變體
- **HLSL 跨平台編譯**：FShaderCompiler 產生 Vulkan SPIR-V / DX12 / Metal

### 生態系統

| 領域 | UE5 應用 |
|------|----------|
| 🎮 遊戲 | Fortnite, Black Myth: Wukong, Senua's Saga |
| 🎬 虛擬製片 | The Mandalorian (LED Volume + UE) |
| 🏗️ 建築視覺化 | Twinmotion, Archviz |
| 🥽 XR | VR/AR 應用開發 |

## 相關 Connections

- [[../concepts/PBR-物理基礎渲染\|PBR]] — UE5 的 Metallic/Roughness 工作流
- [[../concepts/Real-Time-Rendering-即時渲染\|Real-Time Rendering]] — UE5 是即時渲染的標竿
- [[../concepts/Shader-著色器\|Shader]] — Material Editor ↔ Shader 編譯

## 來源 Sources

- [[../sources/source-CG-KB\|CG KB 來源]]
- Epic Games Documentation, *Unreal Engine 5 Revealed*
