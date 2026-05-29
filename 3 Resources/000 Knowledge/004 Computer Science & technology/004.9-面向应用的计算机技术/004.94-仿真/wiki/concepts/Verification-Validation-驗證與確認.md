---
aliases: [V&V, Verification & Validation] · created: 2026-05-30
type: concept · category: simulation · status: reviewed
---
# Verification & Validation 驗證與確認

## 定義
V&V 是確保仿真模型可信度 (Credibility) 的系統化過程，貫穿仿真生命週期。

| 概念 | 問題 | 焦點 |
|------|------|------|
| **驗證 Verification** | 「我們建對模型了嗎？」 | 概念模型→計算機實現的正確性 |
| **確認 Validation** | 「我們建了對的模型嗎？」 | 計算機模型 vs 真實系統的一致性 |

## V&V 方法分類

| 階段 | 方法 | 描述 |
|------|------|------|
| **Verification** | 結構化走查 (Structured Walkthrough) | 團隊審查代碼與邏輯 |
| **Verification** | 極端條件測試 (Extreme Condition Test) | 輸入極值觀察行為 |
| **Verification** | 模組化測試 (Modular Testing) | 對子系統獨立驗證 |
| **Validation** | 歷史數據比對 (Historical Data Validation) | 仿真輸出 vs 實際歷史數據 |
| **Validation** | 敏感性分析 (Sensitivity Analysis) | 輸入變化對輸出的影響 |
| **Validation** | 專家面審 (Face Validity) | 領域專家直覺評估 |
| **Validation** | 統計檢驗 (Statistical Tests) | t-test、置信區間比較 |

## 可信度金字塔 Credibility Pyramid: 數據品質 (底層) → 模型正確性 → V&V 證據 → 可用性 → 接受度 (頂層)

## 相關: [[Simulation-仿真]] · [[Discrete-Event-Simulation-離散事件仿真]] · Sources: [[source-Sim-KB]]
