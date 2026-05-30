---
aliases: [Windows Versions, Windows 版本歷史, Windows Lifecycle]
tags: [DDC/004.451.8, windows, versions, lifecycle]
created: 2026-05-30
updated: 2026-05-30
type: chapter
chapter: 01
topic: Windows Overview & Versions
---

# 01 — Windows 概述與版本 Overview & Versions

> Windows 桌面作業系統的版本演進、版本分支、更新通道與生命週期政策。
> Covers from Windows 1.0 to Windows 11, edition matrix, update channels, and support lifecycle.

---

## 版本譜系 Version Genealogy

| 世代 | 版本 | 發佈 | NT Kernel | 標誌性特性 |
|:----:|:-----|:----:|:---------:|:-----------|
| DOS-based | 1.0 → 3.11 | 1985-1993 | — | 圖形 Shell on MS-DOS |
| 9x | 95 → ME | 1995-2000 | 4.x (hybrid) | Start Menu, Plug & Play, USB |
| NT 早期 | NT 3.1 → 2000 | 1993-2000 | 3.1→5.0 | 純 32-bit, HAL, NTFS |
| XP/Vista | XP, Vista | 2001-2007 | 5.1, 6.0 | Luna/Aero, UAC, 主題引擎 |
| 7/8 時代 | 7, 8, 8.1 | 2009-2013 | 6.1→6.3 | Superbar, Metro, UEFI |
| 10/11 現代 | 10, 11 | 2015-now | 10.0 | WSL, Windows Hello, Widgets |

---

## 版本詳細對照 Edition Comparison

| 特性 | Home | Pro | Enterprise | Pro Workstation |
|:-----|:----:|:---:|:----------:|:---------------:|
| BitLocker | 裝置加密 | ✅ 完整 | ✅ | ✅ |
| RDP Host | ❌ | ✅ | ✅ | ✅ |
| Hyper-V | ❌ | ✅ | ✅ | ✅ |
| Windows Sandbox | ❌ | ✅ | ✅ | ✅ |
| GPEdit (gpedit.msc) | 手動安裝 | ✅ | ✅ | ✅ |
| AppLocker | ❌ | ❌ | ✅ | ❌ |
| DirectAccess | ❌ | ❌ | ✅ | ❌ |
| BranchCache | ❌ | ❌ | ✅ | ❌ |
| LTSC 可用 | ❌ | ❌ | ✅ | ❌ |
| ReFS | ❌ | ❌ | ❌ | ✅ |
| SMB Direct | ❌ | ❌ | ❌ | ✅ |
| 最大 RAM | 128 GB | 2 TB | 6 TB | 6 TB |
| 最大 CPU 插座 | 1 | 2 | 4 | 4 |

---

## 更新通道詳解 Update Channels

| 通道 | 目標受眾 | 功能成熟度 | 適合場景 |
|:-----|:---------|:----------|:---------|
| **GA (正式版)** | 所有用戶 | 生產就緒 | 日常使用、企業部署 |
| **Release Preview** | IT 管理員、進階用戶 | 接近完成 | 驗證下一次累積更新 |
| **Beta** | 進階用戶 | 相對穩定 | 提前體驗新功能 |
| **Dev** | 開發者、愛好者 | 實驗性 | 追蹤最新 API、測試 |
| **Canary** | 平臺開發者 | 極早期 | 核心變更、驅動開發 |

### Windows Insider 方案

```
Canary → Dev → Beta → Release Preview → GA
  快                         慢
  高風險                     低風險
```

---

## 生命週期政策 Lifecycle Policy

| 政策 | 主流支援 | 延伸支援 | 適用版本 |
|:-----|:--------|:--------|:---------|
| 現代生命週期 | 18-36 月 | — | Win 10/11 半年通道 |
| 固定生命週期 | 5 年 | 10 年 | Win 10/11 Enterprise LTSC |
| ESU (付費延伸) | — | +3 年 | Win 10 Enterprise (2025 後) |

### Windows 10 關鍵日期

| 里程碑 | 日期 |
|:-------|:----:|
| 初始發佈 (1507) | 2015-07-29 |
| 最終版本 (22H2) | 2022-10-18 |
| 主流支援結束 | 2020-10-13 (已過) |
| 延伸支援結束 | **2025-10-14** |

### Windows 11 關鍵日期

| 里程碑 | 日期 |
|:-------|:----:|
| 初始發佈 (21H2) | 2021-10-05 |
| 最新版本 (24H2) | 2024-10-01 |
| 主流支援結束 | TBD |
| 延伸支援結束 | TBD |

---

## Windows 11 硬體需求 Hardware Requirements

| 需求 | 最低規格 |
|:-----|:---------|
| CPU | 相容的 64-bit 處理器 (1 GHz+, 2+ cores) |
| RAM | 4 GB |
| Storage | 64 GB+ |
| TPM | TPM 2.0 (信任平臺模組) |
| Secure Boot | UEFI Secure Boot 支援 |
| GPU | DirectX 12 / WDDM 2.x |

---

## 升級路徑 Upgrade Paths

| 來源 → 目標 | 支援方式 |
|:------------|:---------|
| Win 10 Home → Win 11 Home | 直接升級、保留資料 |
| Win 10 Pro → Win 11 Pro | 直接升級、保留資料 |
| Win 10 → Win 11 | Windows Update + 安裝助手 |
| Win 7/8.1 → Win 10/11 | 全新安裝（無直接升級路徑） |

---

## 啟動與授權 Activation & Licensing

| 授權類型 | 適用對象 | 說明 |
|:---------|:---------|:-----|
| OEM | 預裝裝置 | 綁定主機板，不可轉移 |
| Retail (FPP) | 個人購買 | 可轉移至新裝置 |
| Volume (VL) | 企業 | KMS / MAK 啟用 |
| Digital License | Win 10/11 | 綁定 Microsoft 帳戶或硬體 |
| Subscription | 企業 | Windows 365 / E3/E5 |

---

## 兄弟條目
- [[../004.451.8-Windows-Server/004.451.8-Windows-Server|Windows Server]] — 伺服器版本對照
