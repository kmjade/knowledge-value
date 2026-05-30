---
aliases: [Physics Simulation] 
created: 2026-05-30
type: concept
category: simulation
status: reviewed
---
# Physics Simulation 物理仿真

## 定義
基於物理定律 (牛頓力學、流體力學、連續介質力學) 的數位仿真，使虛擬物體表現真實物理行為。核心要素: 動力學 (Dynamics)、碰撞檢測 (Collision Detection)、約束求解 (Constraint Solving)。

## 三大領域

| 領域 | 核心方程/方法 | 代表性技術 |
|------|---------------|------------|
| **剛體動力學** | F=ma, τ=Iα+ω×Iω | 半隱式 Euler, Featherstone |
| **碰撞檢測** | GJK (最近距離), EPA (穿透深度) | Broad Phase (BVH/SAP) → Narrow Phase |
| **流體仿真** | Navier-Stokes | SPH (粒子), Eulerian Grid (網格), LBM |

## 碰撞檢測管線: Broad Phase (Sweep & Prune/BVH) → Narrow Phase (GJK+EPA) → Contact Generation → Constraint Solving → Integration

## 遊戲物理引擎生態

| 引擎 | 領域 | 關鍵特徵 |
|------|------|----------|
| PhysX (NVIDIA) | 遊戲/機器人 | GPU 加速剛體+流體+布料 |
| Bullet (AMD, 開源) | 電影/遊戲/研究 | 離散+連續碰撞檢測 |
| Havok (Microsoft) | AAA 遊戲 | 主機深度優化 |
| MuJoCo (DeepMind) | 機器人 RL | 精確接觸動力學 |

## 相關: [[Simulation-仿真]] · [[Digital-Twin-數字孿生]] · Sources: [[source-Sim-KB]]
