---
aliases: [RAM Memory] · created: 2026-05-30
type: concept · category: hardware · status: reviewed
---

# RAM Memory 記憶體

## 定義
隨機存取記憶體 (RAM: Random Access Memory)，為 CPU 提供高速暫存空間，斷電後數據消失 (揮發性)。基於 DRAM 技術，為計算機運算的即時工作區。

## 核心內容

### DRAM 技術原理
- **儲存單元**: 1T1C (1 電晶體 + 1 電容)，需定期刷新
- **陣列結構**: 矩陣式 Row × Column 定址
- **記憶體層次**: SRAM (Cache) > DRAM (RAM) > NAND (SSD) > HDD

### DDR 世代演進
| 世代 | 頻率範圍 | 電壓 | 頻寬 (單通道) | 最大容量/條 | 年代 |
|:----:|:--------:|:----:|:------------:|:----------:|:----:|
| DDR3 | 800–2133 | 1.5V | 6.4–17 GB/s | 8GB | 2007 |
| DDR4 | 2133–5333 | 1.2V | 17–42 GB/s | 32GB | 2014 |
| DDR5 | 4800–8400+ | 1.1V | 38–67 GB/s | 64GB | 2020 |

### 關鍵時序 (Primary Timings)
- **CL** (CAS Latency): 讀延遲 = CL × 2000 / 頻率 (ns)
- DDR5-6000 CL30: 延遲 = 30 × 2000/6000 = 10ns
- **頻率 vs 延遲**: 高頻 = 高頻寬，低時序 = 低延遲

### 通道與配置
- **雙通道 (Dual Channel)**: 2 DIMM 對稱安裝 → 頻寬 ×2
- **四通道**: HEDT/伺服器平台
- **XMP / EXPO**: 記憶體一鍵超頻設定檔 (Intel XMP / AMD EXPO)

## 相關
[[wiki/concepts/CPU-Architecture-處理器架構|CPU Architecture]] · [[wiki/concepts/Motherboard-Chipset-主機板芯片組|Motherboard Chipset]]

## Sources
[[wiki/sources/source-HW-KB|Source: HW-KB]]
