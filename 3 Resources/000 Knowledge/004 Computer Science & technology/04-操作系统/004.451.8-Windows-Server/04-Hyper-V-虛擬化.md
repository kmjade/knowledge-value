---
aliases: [Hyper-V, Virtualization, VM, Virtual Switch, Checkpoints, Live Migration]
tags: [DDC/004.451.8, windows-server, hyper-v, virtualization, live-migration]
created: 2026-05-30
updated: 2026-05-30
type: chapter
topic: Hyper-V Virtualization
---

# 04 — Hyper-V 虛擬化 Hyper-V Virtualization

> Windows Server 原生 Type-1 Hypervisor：架構、VM 設定、虛擬交換器、檢查點、即時移轉與 GPU 虛擬化。

---

## Hyper-V 架構 Architecture

```
┌────────────────────────────────────────┐
│              Parent Partition           │
│  ┌──────────────────────────────────┐  │
│  │   Management OS (Windows Server) │  │
│  │   • VM Management Service        │  │
│  │   • VM Worker Processes          │  │
│  │   • WMI / PowerShell Providers   │  │
│  └──────────────────────────────────┘  │
├────────────────────────────────────────┤
│        Hyper-V Hypervisor (VMM)        │
│   • CPU Scheduler                      │
│   • Memory Manager                     │
│   • Interrupt Controller               │
├────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐           │
│  │ Child     │  │ Child     │  ...     │
│  │ Partition │  │ Partition │          │
│  │ (VM1)     │  │ (VM2)     │          │
│  └──────────┘  └──────────┘           │
│           Hardware Layer               │
└────────────────────────────────────────┘
```

---

## VM 世代比較 VM Generation Comparison

| 特性 Feature | Generation 1 | Generation 2 |
|:------|:---:|:---:|
| **韌體 Firmware** | BIOS (Legacy) | UEFI |
| **開機裝置 Boot Device** | IDE | SCSI (VMBus) |
| **PXE 網路開機** | Legacy Network Adapter | Standard Network Adapter (Synthetic) |
| **Secure Boot** | ❌ | ✅ |
| **vTPM** | ❌ | ✅ (Trusted Platform Module) |
| **磁碟熱插拔 Hot-add Disk** | ❌ | ✅ |
| **支援 OS** | 所有 Windows/Linux | Win 8+/2012+, Linux (modern kernel) |
| **動態記憶體 Dynamic Memory** | ✅ | ✅ |
| **建議使用 Recommended** | 僅舊版 OS Legacy OS only | 🟢 預設選擇 Default |

---

## 虛擬交換器類型 Virtual Switch Types

| 交換器類型 Switch Type | 通訊範圍 Communication | 典型場景 Scenario |
|:------|:---:|------|
| **外部 External** | VM ↔ Host ↔ External Network | 🟢 生產環境 (需外界存取) |
| **內部 Internal** | VM ↔ VM + VM ↔ Host | 管理網路 Management network |
| **私有 Private** | VM ↔ VM only | 完全隔離環境 Fully isolated |

### 建立虛擬交換器

```powershell
# 外部交換器 (繫結到實體 NIC)
New-VMSwitch -Name "ExternalSwitch" -NetAdapterName "Ethernet0" -AllowManagementOS:$true

# 內部交換器
New-VMSwitch -Name "InternalSwitch" -SwitchType Internal

# 私有交換器
New-VMSwitch -Name "PrivateSwitch" -SwitchType Private

# SR-IOV 啟用 (高效能網路)
New-VMSwitch -Name "SRIOVSwitch" -NetAdapterName "Ethernet1" -EnableIov:$true
```

---

## VM 設定最佳實踐 VM Configuration Best Practices

| 設定項 Setting | 建議值 Recommended | 說明 |
|:------|:------|------|
| **vCPU** | vCPU count ≤ physical cores (no overcommit for prod) | 避免過度訂閱 CPU |
| **記憶體 Memory** | Static for prod (or DM with min=max) | 避免記憶體氣球膨脹 overhead |
| **磁碟格式 Disk Format** | VHDX (64 TB max, resilient to corruption) | ❌ VHD (2 TB max, legacy) |
| **磁碟類型 Disk Type** | Fixed Size (production), Dynamic (dev/test) | Fixed 效能較佳 |
| **整合服務 Integration Services** | 全部啟用 All enabled + 定期更新 | 優化驅動與互動 |
| **自動啟停 Auto Start/Stop** | 設定延遲啟動 Start delay (stagger boot) | 避免開機風暴 Boot storm |
| **NUMA topology** | 對齊實體 NUMA Align to physical | 大型 VM (> 16 vCPU) |

---

## 檢查點 Checkpoints

| 類型 Type | 描述 Description | 適用場景 | 一致性 |
|:------|------|------|:---:|
| **標準 Standard** | 儲存 VM 記憶體 + 磁碟狀態 (VM saved state) | 測試/開發 | Crash-consistent |
| **生產 Production** | 使用 VSS (Volume Shadow Copy) 擷取 | 🟢 生產環境 | Application-consistent |

```powershell
# 建立生產檢查點
Checkpoint-VM -Name "SRV01" -SnapshotName "Before Update"

# 還原至檢查點
Restore-VMCheckpoint -VMName "SRV01" -Name "Before Update"

# 移除檢查點 (合併 AVHDX)
Remove-VMCheckpoint -VMName "SRV01" -Name "Before Update"
```

---

## 即時移轉 Live Migration

| 移轉類型 Type | 說明 Description | 需求 Requirements |
|:------|------|------|
| **標準 Live Migration** | VM 無停機移轉 (記憶體 + 狀態) | Failover Cluster 或 Kerberos (constrained delegation) |
| **儲存即時移轉 Storage LM** | 僅移轉 VHDX 至新儲存位置 | 無需叢集 |
| **共享無 Live Migration** | 透過 SMB 3.0 (無需共用儲存) | SMB 3.0 網路 |
| **跨版本 Cross-Version** | Server 2016 → 2019 → 2022 → 2025 | 新硬體相容 |

### 設定即時移轉 Configure Live Migration

```powershell
# 啟用 Live Migration
Enable-VMMigration

# 設定認證通訊協定 (Kerberos 或 CredSSP)
Set-VMMigration -AuthenticationType Kerberos

# 設定同入移轉數量 (預設 2)
Set-VMHost -MaximumVirtualMachineMigrations 4

# 選擇移轉網路
Set-VMHost -VirtualMachineMigrationPerformanceOption SMB
```

---

## GPU 虛擬化 GPU Virtualization (GPU-PV)

| 模式 Mode | 說明 Description | GPU 共享 | 適用場景 |
|:------|:---:|:---:|------|
| **DDA (Discrete Device Assignment)** | 整個 GPU 直通給 VM | ❌ 獨佔 | 高階工作站 High-end workstation |
| **GPU-PV (GPU Partitioning)** | GPU 分割給多個 VM | ✅ 共享 | VDI / RDS 多使用者 |
| **GPU-PV Live Migration** | GPU-PV VM 可即時移轉 (Server 2025) | ✅ | HA 生產環境 |

---

> **Next:** [[05-IIS-Web伺服器]] → IIS 架構與 Web 服務部署

> **Back to MOC:** [[004.451.8-Windows-Server]]
