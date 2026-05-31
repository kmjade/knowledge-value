---
aliases:
  - Artifact Structure
  - 交互制品
  - Interactive Artifact
created: 2026-05-30
type: concept
topic: generative-art
source: "[[0 Inbox/generative-art/raw/algorithmic-art-skill]]"
---

# Generative Art Artifact · 生成艺术制品

> 自包含的 HTML + p5.js 交互生成艺术作品——从算法哲学到可运行代码的最终产物。

## 制品结构

```
┌─────────────────────────────────────────────┐
│  <!DOCTYPE html>                            │
│  <html>                                     │
│  ├── <head>                                 │
│  │   ├── p5.js CDN (1.7.0)                  │
│  │   ├── Google Fonts (Poppins + Lora)       │
│  │   └── <style> Anthropic 品牌 CSS         │
│  ├── <body>                                 │
│  │   ├── .sidebar                           │
│  │   │   ├── Seed (固定)                    │
│  │   │   ├── Parameters (可变)              │
│  │   │   ├── Colors (可选)                  │
│  │   │   └── Actions (固定)                 │
│  │   └── .canvas-area                       │
│  │       └── #canvas-container              │
│  └── <script>                               │
│      ├── params 对象                        │
│      ├── setup() / draw()                   │
│      ├── 类定义 (Particle, Agent, etc.)     │
│      └── UI 控制函数                        │
└─────────────────────────────────────────────┘
```

## 固定 vs 可变

| 层级 | 固定（不可改） | 可变（每次创作定制） |
|------|:---|:---|
| **布局** | Header + Sidebar + Canvas | — |
| **品牌** | Anthropic 色板/字体/渐变 | — |
| **Seed** | 显示 + Prev/Next/Random/Jump | — |
| **Parameters** | `.control-section` 容器 | 控件数量、名称、范围 |
| **Colors** | `.color-group` 容器 | 是否包含、几个颜色 |
| **Actions** | Reset + Download PNG | — |
| **算法** | — | 全部 p5.js 代码 |
| **参数对象** | — | 字段定义和默认值 |

## 工艺标准

一个大师级制品应满足：

| 标准 | 要求 |
|------|------|
| **自包含** | 除 p5.js CDN 外无外部依赖，全部内联 |
| **即时可用** | 浏览器打开即运行，无需服务器 |
| **可复现** | 同 seed = 同输出 |
| **流畅** | 60fps（动画）/ 快速渲染（静态） |
| **可分享** | 单个 HTML 文件即可传播 |

## 参数设计原则

参数应从算法哲学中**自然涌现**：

- **Quantities** — 多少？（粒子数、射线数）
- **Scales** — 多大？多快？（范围、速度）
- **Probabilities** — 多可能？（分支概率、变异率）
- **Ratios** — 什么比例？（黄金比、噪声八度权重）
- **Angles** — 什么方向？（扫描张角、旋转范围）
- **Thresholds** — 行为何时改变？（噪声阈值、密度界限）

## 相关

- [[0 Inbox/generative-art/wiki/concepts/algorithmic-philosophy]] — 制品是哲学的执行
- [[0 Inbox/generative-art/wiki/concepts/seeded-randomness]] — 种子 UX 的标准实现
- [[0 Inbox/generative-art/wiki/concepts/cartographic-drift]] — 完整制品案例
- [[0 Inbox/generative-art/wiki/entities/p5js|p5.js]] — 底层技术
