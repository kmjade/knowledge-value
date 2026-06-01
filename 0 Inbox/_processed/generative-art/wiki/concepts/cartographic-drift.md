---
aliases: [制图漂移, 智能小车算法艺术]
created: 2026-05-30
type: concept
topic: generative-art
source: "[[1 Projects/富福-履带式智能小车/算法哲学-Cartographic-Drift]]"
---

# Cartographic Drift · 制图漂移

> 一种基于传感器代理探索的生成艺术运动。虚拟智能小车在隐形地形中穿行，通过 LiDAR 式射线扫描积累概率密度地图。

## 算法核心

Cartographic Drift 将智能小车的感知-建图-导航循环转译为三层算法架构：

### 1. 感知层 (Perception)

从代理位置辐射出扇形射线束（模拟 LiDAR/超声波），每束射线沿多层 Perlin 噪声场步进搜索：

```javascript
// 多八度噪声模拟地形复杂度
let nv = noise(nx, ny);
nv += 0.5 * noise(nx * 2.3, ny * 2.3);
nv += 0.25 * noise(nx * 4.7, ny * 4.7);
// 超过阈值 → 碰撞点（模拟障碍物）
```

### 2. 积累层 (Accumulation)

碰撞点在半透明画布上留下标记——多帧叠加形成概率密度图：
- **暗区** = 反复确认的"墙壁"（高密度）
- **亮区** = 开放空间（低密度）
- **渐变带** = 探索的边界（密度梯度）

### 3. 运动层 (Motion)

代理在密度梯度场中漂移——偏好低密度方向（＝未探索区域），辅以随机扰动打破对称性。停滞检测机制确保代理不会困在死胡同。

## 概念映射：智能小车 → 算法

| 智能小车组件 | 算法对应 |
|------------|---------|
| LiDAR 扫描 | 扇形射线 + 步进碰撞检测 |
| SLAM 建图 | 碰撞点时间累积 → 概率密度地图 |
| 自主导航 | 密度梯度下降 → 趋向未探索空间 |
| 避障 | 射线在噪声阈值处终止 |
| 履带运动 | 代理平滑转向 + 速度调制 |

## 参数空间

| 参数 | 算法意义 | 美学影响 |
|------|---------|---------|
| Sensor Rays (8–120) | 感知分辨率 | 少=印象派稀疏点云，多=致密技术绘图 |
| Sensor Range (30–300) | 探测距离 | 近=细腻局部纹理，远=宏大城市地图 |
| Scan Angle (30°–360°) | 扫描张角 | 窄=定向超声指纹，宽=旋转LiDAR全景 |
| Terrain Complexity (1–10) | 噪声阈值 | 低=开阔平原，高=迷宫走廊 |
| Trail Opacity (2–30) | 痕迹浓度 | 淡=幽灵般的地图，浓=厚重的档案 |

## 制品

完整交互制品：[[1 Projects/富福-履带式智能小车/cartographic-drift.html|cartographic-drift.html]]

## 相关

- [[0 Inbox/_processed/generative-art/wiki/concepts/algorithmic-philosophy]] — 父概念：算法哲学方法论
- [[0 Inbox/_processed/generative-art/wiki/concepts/seeded-randomness]] — 每次种子生成独一无二的探索世界
- [[1 Projects/富福-履带式智能小车/富福-v1-方案|富福智能小车]] — 灵感来源
