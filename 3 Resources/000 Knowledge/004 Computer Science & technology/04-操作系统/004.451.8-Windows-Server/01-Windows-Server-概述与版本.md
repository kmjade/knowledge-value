---
aliases: [Windows Server Overview, Windows Server Editions, Server 2025 comparison]
tags: [DDC/004.451.8, windows-server, editions, server-core, nano-server]
created: 2026-05-30
updated: 2026-05-30
type: chapter
topic: Windows Server Overview & Editions
---

# 01 — Windows Server 概述與版本 Overview & Editions

> 從 Server 2016 到 Server 2025 的完整版本譜系、授權模式與部署選項比較。

---

## 版本演進時間線 Version Evolution Timeline

| 版本 Version | 發佈 Release | 核心 Build | 代號 Codename | EOL 主流 Mainstream | EOL 延伸 Extended |
|:------|:---:|:---:|------|:---:|:---:|
| **Server 2025** | 2024-11 | 26100 (24H2) | — | ~2029-10 | ~2034-10 |
| **Server 2022** | 2021-08 | 20348 (21H2) | Iron | 2026-10-13 | 2031-10-14 |
| **Server 2019** | 2018-10 | 17763 | Redstone 5 | 2024-01-09 | 2029-01-09 |
| **Server 2016** | 2016-10 | 14393 | Redstone 1 | 2022-01-11 | 2027-01-12 |
| **Server 2012 R2** | 2013-10 | 9600 | Blue | 2018-10-09 | 2023-10-10 (ESU 至 2026) |

---

## 安裝選項 Installation Options

| 特性 Feature | Server Core | Server with Desktop Experience | Nano Server (Container) |
|:------|:---:|:---:|:---:|
| **GUI 桌面** | ❌ | ✅ | ❌ |
| **磁碟佔用 Disk Footprint** | ~6 GB | ~12 GB | ~300 MB |
| **攻擊面 Attack Surface** | 最小 Minimal | 較大 Larger | 極小 Tiny |
| **管理方式 Management** | PowerShell, WAC, RSAT, sconfig | GUI + all Core methods | Docker / K8s only |
| **重啟頻率 Reboot Frequency** | 較少 Less | 較多 More | 極少 Rare |
| **角色支援 Roles** | 大多數 All major | 全部 All | Container workloads only |
| **建議場景** | 生產伺服器 | 開發/測試/小型部署 | 雲原生 .NET apps |
| **就地轉換 In-place Conversion** | ↔ Desktop 可轉 | ↔ Core 可轉 | ❌ 獨立路徑 |

### Server Core ↔ Desktop Experience 轉換 Conversion

```powershell
# Core → Desktop Experience (需要 ISO)
Install-WindowsFeature Server-Gui-Mgmt-Infra,Server-Gui-Shell -Source <path>\sources\sxs

# Desktop Experience → Core
Uninstall-WindowsFeature Server-Gui-Mgmt-Infra,Server-Gui-Shell -Restart
```

---

## 授權模式 Licensing Models

| 模式 Model | 單位 Unit | 適用場景 Scenario |
|:------|:------|------|
| **Per Core** | 實體核心 (min 8 core/CPU, 16 core/server) | Datacenter / Standard 標準授權 |
| **CAL (Client Access License)** | 使用者/裝置 | Standard + Essentials |
| **Pay-as-you-go** | 小時計費 | Azure Edition (Azure Stack HCI) |
| **SPLA** | 月訂閱 | 服務提供商 Service Providers |
| **OEM** | 隨硬體 | 預裝伺服器 Pre-installed servers |

---

## Server 2025 新功能 What's New in Server 2025

| 功能 Feature | 說明 Description | 影響 Impact |
|:------|------|:---:|
| **Hotpatching** | 無需重啟的安全性更新 (Arc-enabled) | 🔴 High |
| **SMB over QUIC 預設啟用** | SMB 3.1.1 over UDP 443 (替代 445) | 🔴 High |
| **NVMe 儲存效能提升** | 原生的 NVMe 驅動效能提升 60%+ IOPS | 🟡 Med |
| **GPU-PV 增強** | GPU Partitioning 支援 Live Migration | 🟡 Med |
| **Credential Guard 預設啟用** | 基於虛擬化的隔離 | 🔴 High |
| **Active Directory 功能等級** | Forest/Domain Level 10 | 🟡 Med |
| **Bluetooth / Wi-Fi 支援** | Desktop Experience 支援無線網路 | 🟢 Low |
| **Winget 內建** | 套件管理器預裝 | 🟢 Low |
| **VBS Enclaves** | 虛擬化安全區隔離 (confidential computing) | 🟡 Med |

---

## 選擇決策矩陣 Decision Matrix

| 需求 Requirement | 建議版本 Recommended | 建議安裝選項 |
|:------|:------|:------|
| DC 網域控制站 Domain Controller | 2025 / 2022 | **Core** |
| Hyper-V 主機 Hyper-V Host | 2025 / 2022 | **Core** (或 Desktop + WAC) |
| 檔案伺服器 File Server | 2025 / 2022 | **Core** |
| IIS Web 伺服器 Web Server | 2025 / 2022 | **Core** |
| RDS 遠端桌面 Remote Desktop | 2025 / 2022 | Desktop Experience |
| 小型企業 (< 25 users) | 2025 / 2022 Essentials | Desktop Experience |
| Azure 混合部署 | Azure Edition (hotpatch) | Core |
| 容器 Host | 2025 | Core (containers) |
| 開發/測試 Dev/Test | 2025 / 2022 (Eval) | Desktop Experience |

---

## 指令速查 Quick Commands

```powershell
# 查看版本
Get-ComputerInfo | Select WindowsProductName, WindowsVersion, OsHardwareAbstractionLayer

# 查看安裝類型
Get-ComputerInfo | Select WindowsInstallationType   # "Server Core" / "Server"

# 查看功能層級 (AD DS)
Get-ADDomain | Select DomainMode
Get-ADForest | Select ForestMode

# 查看授權狀態
slmgr /dlv     # CMD
Get-CimInstance SoftwareLicensingProduct -Filter "Name like 'Windows%'" | Select Name, LicenseStatus

# sconfig (Server Core 管理選單)
sconfig
```

---

> **Next:** [[02-安裝與部署]] → ADK/WDS/MDT 與自動化安裝

> **Back to MOC:** [[004.451.8-Windows-Server]]
