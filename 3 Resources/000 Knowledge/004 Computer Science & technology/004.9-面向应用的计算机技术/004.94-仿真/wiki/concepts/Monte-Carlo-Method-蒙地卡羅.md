---
aliases: [Monte Carlo, MCMC] 
created: 2026-05-30
type: concept
topic: simulation
status: reviewed
---
# Monte Carlo Method 蒙地卡羅方法

## 定義
利用**隨機抽樣 (Random Sampling)** 解決確定性或隨機性問題的數值方法。核心: 大數法則 (LLN) → 樣本均值收斂於期望值。誤差 ∝ 1/√N，收斂速度與問題維度無關 (維度獨立性)。

## 核心技術

| 技術 | 機制 | 用途 |
|------|------|------|
| **MC 積分** | 隨機點估計高維積分 ∫f(x)dx | 金融定價、物理 |
| **MCMC** | 馬爾可夫鏈構建目標分佈 | 貝葉斯後驗採樣 |
| **Importance Sampling** | 從重要區域偏置抽樣 | 稀有事件模擬 |
| **Latin Hypercube** | 分層多維均勻覆蓋 | 敏感性分析 |

## MCMC 算法: Metropolis-Hastings (通用但需調參) → Gibbs (條件分佈逐維採樣) → HMC/NUTS (梯度驅動，Stan 預設)

## 收斂診斷: Trace Plot、Gelman-Rubin R̂ (<1.1)、Effective Sample Size (ESS)

## 相關: [[Simulation-仿真]] · [[Verification-Validation-驗證與確認]] · Sources: [[source-Sim-KB]]
