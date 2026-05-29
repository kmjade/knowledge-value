---
aliases: [Digital Twin] · created: 2026-05-30
type: concept · category: simulation · status: reviewed
---
# Digital Twin 數字孿生

## 定義
數字孿生是物理實體的**即時數位鏡像**，透過雙向數據流實現虛擬與實體的同步映射與閉環控制。由 Grieves (2003) 提出概念，Tao et al. 擴展為 5D 模型。

## 5D 模型
- **PE 物理實體 (Physical Entity)**: 真實設備 → 傳感器/執行器
- **VE 虛擬實體 (Virtual Entity)**: 高保真數位模型 → 幾何+物理+行為
- **Ss 服務 (Services)**: 監控/診斷/預測/優化 → API/儀表板
- **DD 孿生數據 (Data)**: 傳感器時序+模型參數+衍生特徵
- **CN 連接 (Connection)**: IoT (MQTT/OPC-UA) + 邊緣計算 + 5G

## 虛擬-物理映射: 物理→數位 (感知/建模) · 數位→物理 (控制/優化) = 閉環孿生

## 核心差異: 傳統仿真 = 離線、假設數據、單向；數字孿生 = 在線、即時數據、雙向、全生命週期

## 相關: [[Simulation-仿真]] · [[Physics-Simulation-物理仿真]] · Sources: [[source-Sim-KB]]
