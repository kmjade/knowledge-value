---
aliases: [Motherboard Chipset] · created: 2026-05-30
type: concept · category: hardware · status: reviewed
---

# Motherboard Chipset 主機板芯片組

## 定義
主機板上的核心邏輯晶片組 (Chipset)，負責管理 CPU 與周邊設備之間的資料傳輸、I/O 擴展與系統控制，為計算機平台的中樞神經。

## 核心內容

### 平台控制器架構 (PCH: Platform Controller Hub)
- **傳統南北橋**: 北橋 (記憶體控制器+GPU) + 南橋 (I/O) → 現已整合
- **現代 PCH**: CPU 直連記憶體/PCIe GPU/NVMe，PCH 管理低速 I/O
- **AMD Chiplet**: I/O Die 整合部分 PCH 功能

### 晶片組分級
| 級別 | Intel | AMD | 定位 |
|:----:|-------|-----|------|
| 旗艦 | Z890/Z790 | X870E/X670E | 超頻+完整 PCIe 5.0 |
| 高階 | H770 | X870/X670 | 多 I/O |
| 主流 | B860/B760 | B850/B650 | 性價比+RAM OC |
| 入門 | H810/H610 | A620 | 基本功能 |

### 關鍵技術
- **VRM** (Voltage Regulator Module): 供電相數、DrMOS、散熱
- **PCIe Lanes**: CPU 直連 vs PCH 轉接
- **DMI** (Direct Media Interface): Intel CPU↔PCH 互連頻寬
- **BIOS/UEFI**: 系統初始化和韌體設定介面

## 相關
[[wiki/concepts/CPU-Architecture-處理器架構|CPU Architecture]] · [[wiki/concepts/PCIe-Bus-PCIe總線|PCIe Bus]] · [[wiki/concepts/BIOS-UEFI-韌體|BIOS/UEFI]]

## Sources
[[wiki/sources/source-HW-KB|Source: HW-KB]]
