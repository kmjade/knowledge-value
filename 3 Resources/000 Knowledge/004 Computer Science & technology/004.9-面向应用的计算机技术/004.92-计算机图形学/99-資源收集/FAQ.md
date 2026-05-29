---
aliases:
  - CG FAQ
tags: [DDC/004.92, cg, resource]
created: 2026-05-30
---

# 電腦圖形學 FAQ — Frequently Asked Questions

## 入門

**Q: 學 CG 需要什麼數學基礎？**
A: 線性代數（向量、矩陣、變換）、微積分（積分 → 渲染方程）、基本機率（Monte Carlo）。不需要精通，邊學邊補。

**Q: 初學者應該先學什麼 API？**
A: OpenGL 4.x 適合理解管線概念；想貼近業界直接學 Vulkan/DX12 但門檻高。建議從 OpenGL 入門 → Vulkan 進階。

## 渲染

**Q: Rasterization vs Ray Tracing 何時用哪個？**
A: Rasterization 用於即時渲染（遊戲、VR）；Ray Tracing 用於離線渲染（電影、建築視覺化）；現代 GPU 支援混合模式（Hybrid Rendering）。

**Q: PBR 和傳統 Phong 有什麼本質差別？**
A: Phong 是經驗模型（看起來像），PBR 基於物理原理，滿足能量守恆和 reciprocity，確保在任何光照條件下材質都可信。

## 效能

**Q: 如何提升 Draw Call 效能？**
A: (1) 合併網格 (Static Batching)；(2) GPU Instancing；(3) Indirect Draw；(4) Bindless Textures；(5) Mesh Shading (DX12U/Vulkan 1.3)。

**Q: Shader 效能瓶頸在哪？**
A: 紋理頻寬 (Texture Bandwidth) > ALU。減少紋理採樣、使用 Mipmap、壓縮格式、合併通道。
