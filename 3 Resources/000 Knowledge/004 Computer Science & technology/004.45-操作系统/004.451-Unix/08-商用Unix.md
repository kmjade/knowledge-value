---
title: 商用 Unix — Commercial Unix
aliases: [Commercial Unix, Solaris, AIX, HP-UX, macOS Unix, 商用Unix]
tags: [DDC/004.451, unix, os, commercial]
created: 2026-05-30
updated: 2026-05-30
---

# 商用 Unix — Commercial Unix

> 1980-2000 年代，商用 Unix 主導了企業伺服器市場。Solaris、AIX、HP-UX 各自發展出獨特的技術創新，其中許多至今仍無可替代。

## Sun Solaris — 技術創新的巔峰

Solaris (原 SunOS) 是最具影響力的商用 Unix。Sun Microsystems 於 1992 年將 BSD 基礎的 SunOS 4 轉向 SVR4 基礎的 Solaris 2 (SunOS 5)。

### Solaris 核心技術

| 技術 | 年份 | 描述 | 影響 |
|------|:----:|------|------|
| **NFS** | 1984 | 網路檔案系統 Network File System | 成為業界標準 |
| **ZFS** | 2005 | 128-bit 檔案系統，快照，自動修復 | 革命性設計，移植到 FreeBSD/Linux |
| **DTrace** | 2005 | 動態追蹤框架 Dynamic Tracing | 生產環境即時除錯，無效能損失 |
| **Zones** | 2005 | 作業系統層級虛擬化 | 現代容器技術 (Docker/LXC) 的先驅 |
| **SMF** | 2005 | 服務管理框架 Service Management Facility | 取代 init，依賴管理，自動重啟 |

### Solaris 命令速查

```bash
# SMF 服務管理
svcs -a                     # 列出所有服務
svcadm enable apache22      # 啟用服務
svcadm restart apache22     # 重新啟動

# ZFS 操作
zfs list                    # 列出所有資料集
zfs snapshot pool/data@now  # 建立快照
zfs rollback pool/data@now  # 回滾快照

# DTrace (一行腳本)
dtrace -n 'syscall:::entry { @[execname] = count(); }'  # 各程式系統呼叫統計
```

## IBM AIX — 企業級可靠性

AIX (Advanced Interactive eXecutive) 於 1986 年發布，運行於 IBM POWER (原 RS/6000) 架構。特色是結合 SVR3、SVR4 和 BSD 元素。

### AIX 核心特性

- **SMIT / smitty**：全螢幕系統管理工具，極大降低了 Unix 管理門檻
- **LVM (Logical Volume Manager)**：1989 年引入，動態磁碟管理——可線上擴展、鏡像、遷移
- **JFS / JFS2**：日誌檔案系統 (Journaled File System)，保證崩潰後快速恢復
- **WPAR (Workload Partitions)**：應用層級虛擬化
- **trace / tprof**：效能追蹤和分析工具

```bash
# AIX 管理命令
smitty              # 啟動全螢幕管理介面
lsvg                # 列出卷組
lspv                # 列出實體卷
lsfs                # 列出檔案系統
errpt               # 查看錯誤報告
```

## HP-UX — 高可用性先驅

HP-UX (Hewlett-Packard Unix) 於 1984 年發布，運行於 HP 9000 伺服器（PA-RISC，後轉 Itanium）。

### HP-UX 核心特性

- **ServiceGuard**：企業級高可用性集群方案
- **VxFS (Veritas File System)**：高效能日誌檔案系統
- **nPartitions / vPars**：硬體分割區和虛擬分割區
- **SAM (System Administration Manager)**：圖形化管理工具
- **HP-UX 11i**：網際網路時代的旗艦版本

## macOS — Mach + BSD 的融合

macOS (原 Mac OS X，2001) 的核心是 Darwin，基於 XNU 核心：

```
XNU Core:
├── Mach 3.0 微核心 (CMU)
│   └── 進程管理、記憶體管理、IPC
├── BSD 層 (FreeBSD)
│   └── POSIX API, VFS, 網路棧, 權限模型
└── I/O Kit
    └── 物件導向驅動框架 (C++, Apple)
```

macOS 是官方的 UNIX® 認證系統（自 Leopard 10.5 通過 SUS V3 認證），這使 Apple 成為最大的 Unix 供應商。

## 商用 Unix 的興衰 Rise and Fall

| 年代 | 事件 |
|:----:|------|
| 1980s | 商用 Unix 崛起：SunOS, AIX, HP-UX, IRIX, Ultrix |
| 1990s | Unix Wars：各廠商爭奪 Unix 標準話語權 |
| 2000s | Linux 在 x86 伺服器市場取代商用 Unix |
| 2010s | Oracle 收購 Sun (2009)，Solaris 逐步沒落 |
| 2020s | AIX 和 HP-UX 在遺留系統中維持；Linux 成為主導 |

## 技術遺產對比

| 技術 | 來源 | 現狀 |
|------|------|------|
| ZFS | Solaris | FreeBSD/Linux (OpenZFS) |
| DTrace | Solaris | FreeBSD/macOS/Linux |
| Zones | Solaris | Docker/LXC/Podman 的設計靈感 |
| LVM | AIX | Linux LVM2 |
| NFS | Sun | 無所不在 |
| ServiceGuard | HP-UX | 各種 HA 方案的先驅 |

---

> "Solaris was 20 years ahead of its time. ZFS, DTrace, and Zones in 2005 — Linux is still catching up." — Many Unix veterans
