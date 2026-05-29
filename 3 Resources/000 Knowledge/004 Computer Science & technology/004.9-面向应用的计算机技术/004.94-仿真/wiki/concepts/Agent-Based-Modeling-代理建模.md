---
aliases: [ABM, Agent-Based Modeling] · created: 2026-05-30
type: concept · category: simulation · status: reviewed
---
# Agent-Based Modeling 基於代理的建模

## 定義
ABM 是自底向上的建模範式：定義異質**代理 (Agent)** 的行為規則與互動方式，觀察微觀行為如何產生宏觀**湧現 (Emergence)**。經典範例: Reynolds Boids (分離/對齊/凝聚三規則 → 鳥群行為)。

## ABM 設計模式 Design Patterns

| 模式 | 描述 | 範例場景 |
|------|------|----------|
| Agent 狀態機 | 代理有內部狀態轉移 | SIR: Susceptible→Infected→Recovered |
| 局部互動 | 代理僅感知鄰近代理/環境 | 人群疏散 (Social Force) |
| 網路互動 | 代理通過社群網路傳播 | 輿論動態 (有限信任模型) |
| 適應性學習 | 代理根據經驗修改行為 | 人工股市 (策略演化) |
| 環境反饋 | 環境因代理行為而改變 | 捕食者-獵物 (資源消耗) |

## 工具生態: NetLogo (教育原型) · Mesa (Python) · GAMA (空間 ABM) · Repast (學術) · MASON (高性能)

## 相關: [[Simulation-仿真]] · [[System-Dynamics-系統動力學]] · Sources: [[source-Sim-KB]]
