---
aliases: [CPU Processors]
tags: [DDC/004.3, cpu]
---

# 02 CPU 處理器

## 指令集架構 (ISA) 三大陣營

| ISA | 類型 | 特點 | 典型應用 |
|-----|------|------|----------|
| **x86-64** | CISC | 高單核性能、廣泛相容 | PC、伺服器 (Intel/AMD) |
| **ARM** | RISC | 低功耗、高效能/瓦 | 手機、Apple Silicon、伺服器 |
| **RISC-V** | RISC (開源) | 免授權費、可定制 | 嵌入式、IoT、新興伺服器 |

## Intel Core vs AMD Ryzen 世代對比

| 世代 | Intel | 製程 | AMD | 製程 |
|:----:|-------|:----:|-----|:----:|
| 2020 | 10th Gen (Comet Lake) | 14nm | Ryzen 5000 (Zen 3) | 7nm |
| 2021 | 11th Gen (Rocket Lake) | 14nm | — | — |
| 2021 | 12th Gen (Alder Lake) | Intel 7 | Ryzen 6000 (Zen 3+) | 6nm |
| 2022 | 13th Gen (Raptor Lake) | Intel 7 | Ryzen 7000 (Zen 4) | 5nm |
| 2023 | 14th Gen (Raptor Lake Refresh) | Intel 7 | — | — |
| 2024 | Core Ultra 200 (Arrow Lake) | TSMC N3B | Ryzen 9000 (Zen 5) | 4nm |

## 核心規格參數

| 參數 | 說明 | 典型值 |
|------|------|--------|
| **Cores / Threads** | 核心數 / 執行緒數 (SMT/HT) | 4C/8T ~ 24C/48T |
| **Base / Boost Clock** | 基礎頻率 / 加速頻率 | 3.0 GHz / 5.7 GHz |
| **L3 Cache** | 末級快取，影響遊戲性能 | 16MB ~ 128MB |
| **TDP** (Thermal Design Power) | 散熱設計功耗 | 65W ~ 253W |
| **Process Node** | 製程節點 (nm) | TSMC N3B / Intel 7 |
| **Memory Support** | 原生支援記憶體規格 | DDR4-3200 / DDR5-5600 |
| **PCIe Lanes** | CPU 直連 PCIe 通道數 | 20 ~ 28 (x16 GPU + x4 NVMe) |

## CPU 選購要點

| 用途 | 推薦 CPU | 關鍵指標 |
|------|----------|----------|
| 辦公/文書 | i3 / Ryzen 3 | 4C+ 即可 |
| 遊戲 | i5 / Ryzen 5 (X3D) | 單核性能 + 3D V-Cache |
| 內容創作 | i7-i9 / Ryzen 7-9 | 多核性能 |
| 工作站 | Threadripper / Xeon | PCIe 通道、ECC |
| 伺服器 | EPYC / Xeon Scalable | 核心密度、能效 |

## 超頻 (Overclocking)

- **Intel**: K 系列 + Z 系列晶片組 → 可調倍頻
- **AMD**: 全系列可超 (Ryzen Master / PBO)
- **風險**: 溫度↑、功耗↑、壽命↓、穩定性↓
- **工具**: Intel XTU / AMD Ryzen Master / BIOS
