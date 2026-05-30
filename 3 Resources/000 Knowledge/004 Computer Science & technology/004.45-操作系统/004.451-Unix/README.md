---
title: Unix 知識庫 — Unix Knowledge Base
aliases: [Unix Documentation, Unix KB]
tags: [DDC/004.451, unix, os, kb]
created: 2026-05-30
updated: 2026-05-30
status: active
---

# Unix 知識庫 — Unix Knowledge Base

> [!info] 關於
> Unix 作業系統完整知識庫，從 1969 年 Bell Labs 的開創性設計，到現代作業系統的基石。A comprehensive knowledge base covering Unix history, architecture, commercial evolution, and lasting legacy.

## 為什麼要學 Unix？Why Learn Unix?

Unix 不僅是一個作業系統——它是一種設計哲學、一種文化，幾乎所有現代作業系統（Linux、macOS、Android、iOS）都直接或間接繼承了 Unix 的設計思想。理解 Unix，就是理解現代計算的根基。

## 學習路徑 Learning Path

| 順序 | 文件 | 難度 | 類型 |
|:----:|------|:----:|:----:|
| 1 | [[01-Unix-概述与历史]] | ⭐ | 歷史/概念 |
| 2 | [[02-System-V-与BSD]] | ⭐⭐ | 歷史/架構 |
| 3 | [[03-Unix-文件系统]] | ⭐⭐ | 技術 |
| 4 | [[04-Shell与工具链]] | ⭐⭐ | 技術/實用 |
| 5 | [[05-进程与信号]] | ⭐⭐⭐ | 技術 |
| 6 | [[06-网络与IPC]] | ⭐⭐⭐ | 技術 |
| 7 | [[07-安全与权限]] | ⭐⭐ | 技術 |
| 8 | [[08-商用Unix]] | ⭐⭐ | 歷史/產品 |
| 9 | [[09-Unix的遗产]] | ⭐ | 綜述/概念 |

## 核心主題 Core Topics

- **Unix Philosophy**: KISS, everything-is-a-file, composability
- **System V vs BSD**: The great schism that shaped the industry
- **File System**: inode, UFS, VFS — the unified I/O model
- **Shell & Tools**: Bourne Shell, awk/sed/grep, the pipe pattern
- **Process Model**: fork/exec, signals, daemons
- **Networking**: Berkeley Sockets — the API that conquered the internet
- **Security**: UID/GID, setuid, rwx — the original multi-user security model
- **Commercial Unix**: Solaris, AIX, HP-UX — enterprise giants
- **Legacy**: POSIX, Linux, BSD, macOS — how Unix lives on

## 快速命令參考 Quick Reference

```bash
# 查看 Unix 家族 (Linux/BSD)
uname -a                    # 系統資訊
echo $SHELL                 # 當前 Shell
ls -li                     # 顯示 inode 編號
ps aux                     # 進程列表 (BSD style)
df -h                      # 磁碟使用量
```

## 外部資源 External Resources

- [The Unix Heritage Society](https://www.tuhs.org/) — 歷史源碼與文檔
- [POSIX.1-2017](https://pubs.opengroup.org/onlinepubs/9699919799/) — 標準規範
- [The Art of Unix Programming](http://www.catb.org/esr/writings/taoup/) — ESR 經典

---

> 🐧 Unix 的靈魂活在每一台伺服器、每一部手機，和每一個 `|` pipe 中。
