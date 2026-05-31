---
aliases:
  - p5.js
  - p5js
  - Processing.js
created: 2026-05-30
type: entity
entity_type: software-library
topic: generative-art
source: "[[0 Inbox/generative-art/raw/algorithmic-art-skill]]"
---

# p5.js

> JavaScript 创意编程库——Processing 的 Web 继承者。algorithmic-art skill 的核心运行时。

## 基本信息

| 属性 | 值 |
|------|-----|
| **名称** | p5.js |
| **类型** | JavaScript 创意编程库 |
| **起源** | Processing Foundation (2013) |
| **灵感** | Processing (Java) |
| **CDN** | `cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js` |
| **许可证** | LGPL 2.1 |

## 在 Algorithmic Art 中的角色

p5.js 是 algorithmic-art skill 的**唯一运行时依赖**。所有生成艺术制品通过 p5.js 的以下 API 实现：

| API | 用途 |
|-----|------|
| `createCanvas(w, h)` | 创建画布 |
| `randomSeed(seed)` | 种子随机（可复现性） |
| `noiseSeed(seed)` | 种子 Perlin 噪声 |
| `noise(x, y)` | Perlin 噪声采样（地形、流场） |
| `random()` / `random(min, max)` | 随机数生成 |
| `color(r, g, b, a)` | 颜色构造 |
| `background()` | 清空画布 |
| `line/stroke/fill/point/ellipse` | 基本绘图 |
| `saveCanvas(name, 'png')` | 下载 PNG |

## 关键设计决策

使用 p5.js 而非其他方案的原因：
- **零构建步骤**：单 CDN 引入即可运行
- **自包含**：HTML 文件＝完整制品
- **创意优先 API**：`setup()`/`draw()` 模式降低认知负担
- **Processing 遗产**：大量教程和社区资源

## 版本

| 版本 | 说明 |
|------|------|
| **1.7.0** | Skill 推荐版本（CDN 稳定） |
| 1.9+ | 更新版本（兼容，但 skill 固定 1.7.0） |

## 相关

- [[0 Inbox/generative-art/wiki/concepts/generative-art-artifact]] — p5.js 是制品的核心引擎
- [[0 Inbox/generative-art/wiki/concepts/seeded-randomness]] — `randomSeed()` / `noiseSeed()` 的底层实现
- [[0 Inbox/generative-art/wiki/concepts/algorithmic-philosophy]] — p5.js 是将哲学转化为代码的媒介
