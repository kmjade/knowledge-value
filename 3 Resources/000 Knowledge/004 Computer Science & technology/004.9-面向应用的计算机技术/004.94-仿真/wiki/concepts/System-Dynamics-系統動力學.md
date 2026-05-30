---
aliases: [System Dynamics, SD] 
created: 2026-05-30
type: concept
category: simulation
status: reviewed
---
# System Dynamics 系統動力學

## 定義
由 Jay Forrester (MIT, 1950s) 創立的自頂向下 (Top-Down) 建模方法。將系統視為**存量 (Stock)** 與**流量 (Flow)** 的封閉反饋迴路結構，分析結構如何產生行為 (Structure → Behavior)。

## 核心概念

| 概念 | 圖示 | 描述 |
|------|------|------|
| **存量 Stock** | 矩形 □ | 累積量 (人口、庫存、現金) |
| **流量 Flow** | 閥門符號 | 存量變化率 (出生/死亡、進貨/出貨) |
| **正反饋 Positive Loop** | R → | 自我增強 (複利) |
| **負反饋 Negative Loop** | B → | 目標尋求 (恆溫器) |
| **延遲 Delay** | 雙豎線 ‖ | 因果的時間滯後 |

## 與 ABM/DES 的差異

| 面向 | SD | ABM | DES |
|------|:--:|:--:|:--:|
| 視角 | 自上而下 | 自底向上 | 流程/事件 |
| 粒度 | 聚合 | 個體 | 實體/資源 |
| 建模單元 | 存量-流量 | 代理-環境 | 事件-隊列 |
| 隨機性 | 大多確定性 | 隨機 | 隨機 |
| 典型應用 | 政策分析 | 湧現行為 | 排程/物流 |

## 相關: [[Simulation-仿真]] · [[Agent-Based-Modeling-代理建模]] · Sources: [[source-Sim-KB]]
