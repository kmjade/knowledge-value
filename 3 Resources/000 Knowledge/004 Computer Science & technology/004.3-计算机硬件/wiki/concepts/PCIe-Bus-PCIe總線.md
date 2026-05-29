---
aliases: [PCIe Bus] · created: 2026-05-30
type: concept · category: hardware · status: reviewed
---

# PCIe Bus PCIe 總線

## 定義
PCI Express (Peripheral Component Interconnect Express) 為高速序列點對點互連標準，是現代計算機內部擴展設備（GPU、NVMe SSD、網卡）的主要總線介面。

## 核心內容

### 架構特性
- **序列點對點**: 取代並列 PCI 共享匯流排，每設備獨享頻寬
- **通道 (Lane)**: 基本單位 ×1，可聚合 ×1/×2/×4/×8/×16
- **全雙工**: 發送/接收獨立通道
- **向下相容**: PCIe 5.0 插槽可插 PCIe 3.0 設備 (降速運行)

### 世代頻寬演進
| 世代 | 速率 (GT/s) | ×1 頻寬 | ×4 | ×16 | 編碼 | 年代 |
|:----:|:-----------:|:-------:|:-----:|:----:|:----:|:----:|
| 3.0 | 8 | ~1 GB/s | ~4 GB/s | ~16 GB/s | 128b/130b | 2010 |
| 4.0 | 16 | ~2 GB/s | ~8 GB/s | ~32 GB/s | 128b/130b | 2017 |
| 5.0 | 32 | ~4 GB/s | ~16 GB/s | ~64 GB/s | 128b/130b | 2019 |
| 6.0 | 64 | ~8 GB/s | ~32 GB/s | ~128 GB/s | PAM4+FEC | 2022 |
| 7.0 | 128 | ~16 GB/s | ~64 GB/s | ~256 GB/s | PAM4 | 2025(E) |

### 通道分配 (Consumer Platform)
- **CPU 直連**: GPU ×16 + NVMe ×4 (共 20-28 lanes)
- **PCH/Chipset 轉接**: 額外 NVMe、網卡、USB4 控制器
- **注意**: Chipset 轉接頻寬受 DMI 限制 (Intel DMI 4.0 ×8 ≈ 16 GB/s)

### 供電規格
- **插槽供電**: ×16 插槽最高 75W
- **輔助供電**: 6-pin (75W) / 8-pin (150W) / 12VHPWR 12+4-pin (600W)
- **GPU 總供電**: 插槽 + 輔助 = 實際可用功耗

## 相關
[[wiki/concepts/Motherboard-Chipset-主機板芯片組|Motherboard Chipset]] · [[wiki/concepts/SSD-Storage-固態存儲|SSD Storage]]

## Sources
[[wiki/sources/source-HW-KB|Source: HW-KB]]
