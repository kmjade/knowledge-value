---
title: System V 與 BSD — System V & BSD
aliases: [System V, BSD, Unix Wars, SVR4, BSD Unix]
tags: [DDC/004.451, unix, os, system-v, bsd]
created: 2026-05-30
updated: 2026-05-30
---

# System V 與 BSD — System V & BSD

> Unix 歷史上最大的分裂：AT&T 的商業 System V 與 UC Berkeley 的學術 BSD。The greatest schism in Unix history — AT&T's commercial System V vs UC Berkeley's academic BSD.

## System V (AT&T, 1983)

System V 是 AT&T 在 Unix 版本 7 之後的商業化路線。SVR4 (System V Release 4, 1989) 是關鍵里程碑，整合了 SunOS 的 BSD 特性和 Xenix，成為統一的商業 Unix 標準。

### System V 核心特性

- **init 系統**：runlevel 啟動模型 (`/etc/inittab` → `rc?.d/`)，控制系統狀態
- **STREAMS**：模組化的 I/O 框架，支援網路協定棧的動態組合
- **SysV IPC**：訊息佇列（message queues）、共享記憶體（shared memory）、號誌（semaphores）
- **System V 檔案系統佈局**：`/etc/rc.d/`, `/etc/init.d/` 標準化布局
- **Package 管理**：pkgadd/pkgrm 套件管理系統

### System V 商用變體

| 系統 | 廠商 | 特性 |
|------|------|------|
| AIX | IBM | SMIT 管理工具，LVM 邏輯卷管理 |
| HP-UX | HP | 高可用性，ServiceGuard 集群 |
| Solaris | Sun/Oracle | ZFS，DTrace，Zones 容器 |
| IRIX | SGI | 圖形工作站，XFS 檔案系統 |
| UnixWare | Novell/SCO | PC 伺服器商業 Unix |

## BSD (UC Berkeley, 1977)

BSD (Berkeley Software Distribution) 始於 Bill Joy 在 1977 年彙編的 Unix 工具和修補程式。BSD 以其學術自由授權著稱，推動了網路技術的革命。

### BSD 核心貢獻

- **TCP/IP 網路棧**：1983 年 4.2BSD 首次整合 TCP/IP，成為網際網路基石
- **Berkeley Sockets API**：`socket()`, `bind()`, `listen()`, `accept()` — 網路程式設計標準
- **vi 編輯器**：Bill Joy 開發的全螢幕文字編輯器
- **csh/tcsh**：C Shell 及其增強版，提供歷史記錄和作業控制
- **Fast File System (FFS)**：UFS 的前身，引入 cylinder groups 優化
- **虛擬記憶體**：4.3BSD 的 mmap() 實作
- **sendmail**：第一個廣泛使用的郵件傳輸代理 (MTA)

### BSD 家族

| 系統 | 描述 |
|------|------|
| FreeBSD | 通用伺服器 OS，ZFS 支援，Netflix CDN 基礎 |
| NetBSD | 可移植性最強，「Of course it runs NetBSD」 |
| OpenBSD | 安全至上，OpenSSH 發源地 |
| DragonFly BSD | FreeBSD 4.x 分支，HAMMER 檔案系統 |
| Darwin | macOS 核心基礎，XNU 核心 (Mach + BSD) |

## System V vs BSD 技術對比

| 面向 | System V | BSD |
|------|----------|-----|
| 啟動 | init/runlevel | rc.d 指令碼 (後遷移) |
| 網路 | STREAMS/TLI | Sockets (勝出) |
| IPC | SysV IPC (msg/shm/sem) | 早期無，後來加入 |
| Shell | Bourne Shell (sh) | C Shell (csh) |
| 列印 | lp 系統 | lpr/lpd |
| 終端 | terminfo | termcap |
| 授權 | 商業 (AT&T) | BSD License (自由) |

## Solaris / HP-UX / AIX 比較

| 特性 | Solaris | AIX | HP-UX |
|------|---------|-----|-------|
| 核心 | SunOS 5 (SVR4) | AIX kernel (SVR3+SVR4) | HP-UX (SVR3+SVR4) |
| 檔案系統 | UFS → ZFS | JFS/JFS2 | HFS → VxFS |
| 管理工具 | SMF (svcadm) | SMIT (smitty) | SAM |
| 容器技術 | Zones (2005) | WPAR | HPVM/nPars |
| 追蹤工具 | DTrace | trace, tprof | Caliper |
| 處理器 | SPARC, x86 | POWER | PA-RISC, Itanium |

---

> BSD gave us the internet; System V gave us enterprise Unix. Together they shaped everything. — The Unix Legacy
