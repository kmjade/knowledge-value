---
aliases: [Windows Server Learning Path, 學習路徑]
tags: [DDC/004.451.8, windows-server, readme]
created: 2026-05-30
updated: 2026-05-30
type: readme
topic: Windows Server Learning Path
---

# Windows Server — 學習路徑 README (Learning Path)

> 從零開始到企業級 Windows Server 管理的系統化學習路徑。Suitable for beginners to intermediate admins.

---

## 使用指南 Usage Guide

| 場景 Scenario | 建議路徑 Suggested Path |
|:------|------|
| **零基礎初學者 Beginner** | README → Ch 1 → Ch 2 (安裝) → Ch 6 (DNS/DHCP) → Ch 3 (AD) |
| **有 Linux/Win 經驗 Admin** | Ch 1 快速瀏覽 → Ch 3 (AD) → Ch 4 (Hyper-V) → Ch 8 (安全) |
| **考前複習 Exam Prep (AZ-800/801)** | MOC 表格速查 → Ch 3, 4, 7, 9 深入 |
| **架構師/決策者 Architect** | MOC 產品矩陣 → Ch 1 版本選型 → Ch 9 HA |

---

## 前置知識 Prerequisites

| 知識域 Domain | 必備 Required | 建議 Recommended |
|:------|:---:|:---:|
| TCP/IP 網路基礎 | ✅ | CCNA-level |
| 基本 PowerShell | — | ✅ |
| 虛擬化概念 Hypervisor 概念 | — | ✅ |
| 身分驗證概念 (Kerberos, LDAP) | — | ✅ |
| 儲存概念 (SAN/NAS, RAID) | — | ✅ |
| PKI / 證書基礎 | — | ✅ (Ch 8) |

---

## 實驗環境建議 Lab Environment

| 選項 Option | 硬體需求 Hardware | 適用場景 Scenario |
|:------|------|------|
| **單機 Hyper-V** | 16 GB RAM, 4 cores, SSD | 個人學習，2-3 VM |
| **VMware Workstation** | 同上 | 跨平台學習 |
| **Azure 試用帳戶 Azure Free Trial** | $200 credit | 雲端實驗，不消耗本機資源 |
| **實體伺服器 Physical Server** | 32+ GB RAM, 多核 | 進階 Lab，HA 實驗 |

### 建議 Lab 部署拓撲 Recommended Lab Topology

```
                     Internet (NAT)
                          │
                  ┌───────┴───────┐
                  │   pfSense VM  │  (路由/防火牆)
                  └───────┬───────┘
              ┌───────────┼───────────┐
        Internal: 192.168.100.0/24
              │                       │
     ┌────────┴────────┐     ┌───────┴────────┐
     │  DC01 (AD DS)   │     │  SRV01 (App)   │
     │  Server 2025    │     │  Server 2025   │
     │  2 GB RAM       │     │  2 GB RAM      │
     │  DNS + DHCP     │     │  IIS + Files   │
     └────────┬────────┘     └───────┬────────┘
              │                       │
              └───────────┬───────────┘
                          │
                 ┌────────┴────────┐
                 │  HV01 (Hyper-V) │
                 │  Server 2025    │
                 │  4 GB RAM       │
                 │  Nested VMs     │
                 └─────────────────┘
```

---

## 學習里程碑 Learning Milestones

| # | 里程碑 Milestone | 驗證方式 Verification | 目標章節 |
|:--:|------|------|:--:|
| 1 | **完成基本安裝** | 用 sconfig 設定 IP/hostname/domain join | Ch 2 |
| 2 | **建置第一個 DC** | DCDiag 全通過，可複寫 AD | Ch 3 |
| 3 | **部署第一個 GPO** | gpupdate /force；gpresult 驗證 | Ch 3 |
| 4 | **建立第一台 VM** | VM 可開機、有網路連線 | Ch 4 |
| 5 | **部署 IIS 站點** | HTTPS 可訪問 | Ch 5 |
| 6 | **DNS 區域傳送** | 次要 DNS 同步成功 | Ch 6 |
| 7 | **建立 SMB 共用** | 從客戶端 \\server\share 存取 | Ch 7 |
| 8 | **設定 LAPS** | Get-LapsADPassword 可擷取 | Ch 8 |
| 9 | **建立容錯移轉叢集** | Validate-Cluster 通過；可手動移轉 | Ch 9 |

---

## 關鍵認證對照 Certification Mapping

| 認證 Certification | 涵蓋範圍 Coverage | 相關章節 Relevant Ch |
|:------|------|:--:|
| **AZ-800** Administering Windows Server Hybrid Core Infrastructure | AD, Hyper-V, Storage, DNS, HA | Ch 3, 4, 6, 7, 9 |
| **AZ-801** Configuring Windows Server Hybrid Advanced Services | Security, Migration, Monitoring | Ch 4, 7, 8, 9 |
| **AZ-104** Azure Administrator | Azure integration | Ch 1, 3 (Azure AD Connect) |
| **MS-102** Microsoft 365 Administrator | Hybrid identity | Ch 3 (Azure AD Connect) |

---

## 維護狀態 Maintenance Status

| 指標 Metric | 數值 Value |
|:------|------|
| 建立日期 Created | 2026-05-30 |
| 最後更新 Last Updated | 2026-05-30 |
| 總檔案數 Total Files | 12 |
| 涵蓋 Server 版本 Versions | 2016 / 2019 / 2022 / 2025 |
| 語言 Language | 繁體中文 + English |

---

> **Start here:** [[01-Windows-Server-概述與版本]] → 了解各版本差異與選型策略
