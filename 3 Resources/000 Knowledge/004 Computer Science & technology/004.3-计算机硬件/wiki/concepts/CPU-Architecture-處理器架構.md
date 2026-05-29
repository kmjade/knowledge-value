---
aliases: [CPU Architecture] · created: 2026-05-30
type: concept · category: hardware · status: reviewed
---

# CPU Architecture 處理器架構

## 定義
中央處理器 (CPU) 的指令集架構 (ISA) 與微架構 (Microarchitecture) 設計，決定處理器如何解碼與執行指令，為計算機硬體的核心。

## 核心內容

### ISA 三大譜系
| ISA | 設計哲學 | 代表 | 特點 |
|-----|----------|------|------|
| **x86-64** | CISC (複雜指令集) | Intel Core / AMD Ryzen | 高單核性能、龐大生態、高功耗 |
| **ARM** | RISC (精簡指令集) | Apple M / Qualcomm Snapdragon | 高效能/瓦、手機/筆電/伺服器 |
| **RISC-V** | RISC (開源) | SiFive / 各客製晶片 | 免授權費、可擴展、新興生態 |

### 微架構演進
- **Intel**: Core → Nehalem → Sandy Bridge → Haswell → Skylake → Sunny Cove → Golden Cove → Lion Cove
- **AMD**: K8 → Bulldozer → Zen → Zen 2 → Zen 3 → Zen 4 → Zen 5
- **Apple**: A 系列 → M 系列 (M1 → M4)
- **關鍵趨勢**: 製程微縮 (nm↓)、Chiplet 設計、3D V-Cache、大小核混合架構 (big.LITTLE / P-core+E-core)

### 核心參數
- **Cores/Threads**: 物理核心與 SMT/HT 邏輯執行緒
- **Clock**: 基礎頻率 vs Boost 頻率
- **Cache**: L1 (每核獨立) → L2 (每核/每叢集) → L3 (共享)
- **TDP**: 熱設計功耗 → 散熱需求指標

## 相關
[[wiki/concepts/RAM-Memory-記憶體|RAM Memory]] · [[wiki/concepts/Cooling-散熱|Cooling]] · [[wiki/entities/Intel-Core|Intel Core]] · [[wiki/entities/AMD-Ryzen|AMD Ryzen]]

## Sources
[[wiki/sources/source-HW-KB|Source: HW-KB]] · [[../03-计算机组成原理/03-计算机组成原理|计算机组成原理]]
