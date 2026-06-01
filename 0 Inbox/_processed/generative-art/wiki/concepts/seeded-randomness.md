---
aliases:
  - Seed Randomness
  - 种子随机性
  - Art Blocks Pattern
created: 2026-05-30
type: concept
topic: generative-art
source: "[[0 Inbox/_processed/generative-art/raw/algorithmic-art-skill]]"
---

# Seeded Randomness · 种子随机性

> 可复现的随机——生成艺术的基石范式。源自 Art Blocks 链上生成艺术平台。

## 定义

种子随机性是生成艺术中确保**可复现性**的核心机制：给定相同的种子值，算法始终产生完全相同的输出——同时每个种子解锁一个独特、不可预测的视觉世界。

```javascript
let seed = 12345;
randomSeed(seed);   // 所有 random() 调用由此决定
noiseSeed(seed);    // 所有 noise() 调用由此决定
```

## 为什么重要

| 维度 | 说明 |
|------|------|
| **可复现性** | 同一 seed = 同一作品，支持收藏、分享、验证 |
| **可探索性** | 改变 seed 探索算法的表达空间——"同一算法的无限变体" |
| **可策展性** | 艺术家可以挑选最佳 seed 作为"官方"版本 |
| **链上兼容** | Art Blocks 等平台依赖此范式——token ID 即 seed |

## 在 Cartographic Drift 中的应用

在 [[0 Inbox/_processed/generative-art/wiki/concepts/cartographic-drift]] 中，种子决定了：
- Perlin 噪声地形的具体形态（哪些区域是"开阔"的，哪些是"迷宫"的）
- 代理的初始位置和朝向
- 随机扰动的时机和方向

同一算法、不同种子 → 完全不同的"探索世界"。

## 种子探索 UX

标准交互制品提供：
- **Prev/Next** — 顺序浏览相邻种子
- **Random** — 随机跳跃到新种子
- **Jump** — 输入特定种子值
- **100 变体** — 批量生成 seeds 1-100

## 相关

- [[0 Inbox/_processed/generative-art/wiki/concepts/algorithmic-philosophy]] — 种子是算法哲学的核心表达工具
- [[0 Inbox/_processed/generative-art/wiki/concepts/generative-art-artifact]] — 交互制品中种子导航的标准实现
- [[0 Inbox/_processed/generative-art/wiki/entities/p5js|p5.js]] — `randomSeed()` / `noiseSeed()` API
