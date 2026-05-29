---
aliases: [BIOS, UEFI] · created: 2026-05-30
type: concept · category: hardware · status: reviewed
---

# BIOS/UEFI 韌體

## 定義
BIOS (Basic Input/Output System) 與其現代繼任者 UEFI (Unified Extensible Firmware Interface) 為主機板上的底層韌體，負責系統開機初始化 (POST)、硬體檢測、以及引導操作系統啟動。

## 核心內容

### BIOS vs UEFI
| 特性 | Legacy BIOS | UEFI |
|------|:-----------:|:----:|
| 年代 | 1981 (IBM PC) | 2005 (EFI 1.10) |
| 韌體大小 | 受限 (實模式) | 無限制 |
| 磁碟分區 | MBR (≤2.2TB) | GPT (≤9.4ZB) |
| 開機速度 | 慢 (逐項檢測) | 快 (並行初始化) |
| 介面 | 鍵盤純文字 | 圖形化 + 滑鼠 |
| 網路功能 | 無 | PXE / HTTP Boot |
| 安全 | 無 | Secure Boot / TPM |

### 開機流程 (UEFI Boot Flow)
```
通電 → UEFI 韌體載入 (SPI Flash)
  → SEC Phase (Security): 初始化快取為 CAR (Cache-as-RAM)
  → PEI Phase (Pre-EFI Initialization): 記憶體初始化、CPU 初始化
  → DXE Phase (Driver Execution Environment): 載入驅動、PCIe 枚舉
  → BDS Phase (Boot Device Selection): 選擇開機裝置
  → TSL (Transient System Load): 引導 OS Boot Loader
  → RT (Runtime): OS 接手 → UEFI Runtime Services
```

### 關鍵設定項
| 設定 | 說明 | 建議 |
|------|------|------|
| **XMP / EXPO** | 記憶體超頻設定檔 | 開啟 (以達標稱頻率) |
| **Resizable BAR** | GPU 直接存取全部 VRAM | 開啟 (性能提升) |
| **Secure Boot** | 只允許簽章 OS 啟動 | 開啟 (安全) |
| **CSM** | 相容性支援模組 (模擬 BIOS) | 關閉 (純 UEFI 安裝) |
| **Above 4G Decoding** | 支援 >4GB BAR 定址 | 開啟 (搭配 ReBAR) |
| **Fan Curve** | 風扇曲線設定 | 自定義 (平衡噪音/溫度) |
| **Boot Order** | 開機順序 | USB → OS SSD |

### CMOS 與設定儲存
- **CMOS**: 由 CR2032 電池供電的 SRAM，儲存 UEFI 設定
- **Clear CMOS**: 短接跳線或移除電池 → 恢復出廠值 (超頻失敗救援)
- **BIOS Flashback**: 無 CPU/無 RAM 狀態下更新 BIOS (USB + 專用按鈕)

## 相關
[[wiki/concepts/Motherboard-Chipset-主機板芯片組|Motherboard Chipset]] · [[wiki/concepts/CPU-Architecture-處理器架構|CPU Architecture]]

## Sources
[[wiki/sources/source-HW-KB|Source: HW-KB]]
