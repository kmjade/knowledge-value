---
aliases: [SSD Storage] · created: 2026-05-30
type: concept · category: hardware · status: reviewed
---

# SSD Storage 固態存儲

## 定義
固態硬碟 (SSD: Solid State Drive) 使用 NAND Flash 非揮發性記憶體儲存數據，無機械部件，速度、功耗、抗震性遠優於傳統 HDD。

## 核心內容

### NAND Flash 技術
| 類型 | 每單元位元 | P/E 壽命 | 相對成本 | 典型應用 |
|:----:|:---------:|:--------:|:--------:|----------|
| SLC | 1 | ~100,000 | $$$$$ | 企業級/工業 |
| MLC | 2 | ~10,000 | $$$ | 企業級 |
| TLC | 3 | ~3,000 | $$ | 消費級主流 |
| QLC | 4 | ~1,000 | $ | 大容量/讀取密集 |

- **3D NAND**: 垂直堆疊層數 (64L → 128L → 176L → 232L → 300L+)，提升密度與成本效率
- **3D XPoint (Optane)**: Intel/Micron 新記憶體類型，性能接近 DRAM (已停產)

### NVMe 協議 (Non-Volatile Memory Express)
- **對比 AHCI**: NVMe 專為 NAND 設計，支援多佇列 (64K 佇列 × 64K 命令)，延遲更低
- **PCIe 頻寬**: Gen3×4 (~3.5 GB/s) → Gen4×4 (~7.4 GB/s) → Gen5×4 (~14 GB/s)
- **M.2 尺寸**: 2280 (22×80mm) 最主流，還有 2242/2230 (Steam Deck)

### 關鍵技術
- **DRAM Cache**: 內建 DRAM 緩存 FTL 映射表 (無 DRAM = HMB 借用主機記憶體)
- **SLC Cache**: 動態 SLC 區作為寫入緩衝 → 寫爆後速度下降
- **TRIM**: OS 告知 SSD 哪些區塊可回收，維持長期性能
- **Wear Leveling**: 平均磨損各 NAND 區塊，延長壽命
- **TBW** (Total Bytes Written): 寫入壽命指標 (e.g., 600 TBW)

## 相關
[[wiki/concepts/PCIe-Bus-PCIe總線|PCIe Bus]] · [[wiki/concepts/Motherboard-Chipset-主機板芯片組|Motherboard Chipset]]

## Sources
[[wiki/sources/source-HW-KB|Source: HW-KB]]
