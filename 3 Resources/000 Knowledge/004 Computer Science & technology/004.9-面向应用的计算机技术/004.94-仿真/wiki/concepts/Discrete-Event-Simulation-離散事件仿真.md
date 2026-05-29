---
aliases: [DES, Discrete-Event Simulation] · created: 2026-05-30
type: concept · category: simulation · status: reviewed
---
# Discrete-Event Simulation 離散事件仿真

## 定義
DES 是一種建模方法，系統狀態僅在**離散事件點**發生瞬時變化，事件間狀態保持不變。核心由事件 (Event)、實體 (Entity)、隊列 (Queue)、資源 (Resource) 和仿真時鐘 (Simulation Clock) 構成。

## 核心架構 Core Architecture
- **未來事件列表 (FEL)**: 按時間排序待執行事件
- **事件排程 vs 流程互動**: 兩大世界觀 (Event Scheduling / Process Interaction)
- **排隊系統要素**: 到達過程 (λ)、服務過程 (μ)、隊列紀律 (FIFO/LIFO/優先級)
- **關鍵指標**: 吞吐量 (Throughput)、平均等待時間、資源利用率 ρ = λ/μ、WIP

## Little's Law: L = λW（平均系統內數量 = 到達率 × 平均停留時間）— 排隊論基石

## 相關: [[Simulation-仿真]] · [[Verification-Validation-驗證與確認]] · Sources: [[source-Sim-KB]]
