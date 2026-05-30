---
title: Unix 檔案系統 — Unix File System
aliases: [UFS, inode, Unix FS, Unix 文件系统]
tags: [DDC/004.451, unix, os, filesystem]
created: 2026-05-30
updated: 2026-05-30
---

# Unix 檔案系統 — Unix File System

> Unix 最革命性的設計之一：一切皆檔案（everything is a file）。從磁碟上的 UFS 到記憶體中的 procfs，統一的檔案抽象統一了整個系統。

## UFS (Unix File System) / FFS

UFS 起源於 BSD 的 Fast File System (FFS, 4.2BSD)，核心設計：

### inode (Index Node)
inode 是 Unix 檔案系統的核心資料結構，儲存檔案的中介資料（metadata）：
- **權限**：rwx 模式 (owner/group/other)
- **擁有者**：UID, GID
- **時間戳**：atime (訪問), mtime (修改), ctime (屬性變更)
- **大小**：檔案位元組數
- **資料區塊指標**：直接區塊（12）、單層間接、雙層間接、三層間接
- **連結計數**：hard link 數量

```
inode 結構簡化：
┌──────────────────────┐
│ mode │ owner │ group │  權限與所有權
│ size │ atime │ mtime │  大小與時間
│ direct[0..11]       │  12 × 直接區塊指標
│ single indirect ──→ │  → 更多區塊指標
│ double indirect ──→ │  → → 更多
│ triple indirect ──→ │  → → → 大量
└──────────────────────┘
```

### Hard Link vs Symbolic Link

| 特性 | Hard Link (硬連結) | Symbolic Link (符號連結) |
|------|-------------------|------------------------|
| 實作 | 指向相同 inode | 指向路徑名稱 (特殊檔案) |
| 跨檔案系統 | ❌ 不行 | ✅ 可以 |
| 目錄連結 | ❌ (通常禁止) | ✅ 可以 |
| 原檔刪除 | 資料仍存在 | 變成懸空連結 (dangling) |
| 建立命令 | `ln target link` | `ln -s target link` |

## 掛載系統 Mount System

Unix 使用單一檔案樹（single tree hierarchy），通過 `mount` 將不同裝置掛載到統一路徑：

```bash
mount /dev/sda1 /home     # 掛載分割區
mount -t tmpfs tmpfs /tmp # 掛載記憶體檔案系統
umount /home              # 解除掛載
```

`/etc/fstab` 定義開機自動掛載的裝置和參數。

## /dev 裝置檔案

一切皆檔案的典範——裝置也以檔案形式存在：
- `/dev/sda` — 第一顆 SCSI/SATA 磁碟
- `/dev/tty` — 終端裝置
- `/dev/null` — 資料黑洞（捨棄所有寫入）
- `/dev/zero` — 無窮零位元組
- `/dev/random`, `/dev/urandom` — 亂數產生器

裝置類型分為 block device（區塊裝置，如磁碟）和 character device（字元裝置，如鍵盤）。

## 特殊檔案系統

| 檔案系統 | 用途 | 描述 |
|----------|------|------|
| **procfs** (`/proc`) | 進程資訊 | `/proc/<pid>/` 下每個進程的即時資訊 |
| **tmpfs** (`/tmp`) | 記憶體檔案系統 | 暫存檔，重新開機後清空 |
| **sysfs** (`/sys`) | 核心物件 | 裝置、驅動、匯流排資訊 |
| **devfs** (`/dev`) | 裝置節點 | 動態裝置管理 |

## VFS (Virtual File System)

SVR4 引入的 VFS 層提供統一的檔案系統介面，允許多種檔案系統共存：
- 上層：系統呼叫介面 (open/read/write/close)
- 中層：VFS 抽象層 (vnode)
- 下層：具體檔案系統實作 (UFS, NFS, procfs, ...)

這一設計後來被 Linux 繼承並發揚光大——Linux 支援超過 50 種檔案系統。

---

> "In Unix, everything is a file. If it's not a file, it's a process." — Common Unix wisdom
