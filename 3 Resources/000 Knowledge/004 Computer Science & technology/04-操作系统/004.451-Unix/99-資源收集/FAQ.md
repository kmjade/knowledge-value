---
title: Unix 常見問題 — Unix FAQ
aliases: [Unix FAQ, Unix 常见问题]
tags: [DDC/004.451, unix, os, faq]
created: 2026-05-30
updated: 2026-05-30
---

# Unix 常見問題 — Unix FAQ

## Q1: Unix 和 Linux 的區別是什麼？
**A**: Unix 是 1969 年於 Bell Labs 誕生的作業系統家族；Linux 是 Linus Torvalds 於 1991 年從頭編寫的類 Unix 核心。Linux 不是 Unix 的衍生程式碼，但遵循 POSIX 標準並複製了 Unix 的設計。簡而言之：Linux is Unix-like, not Unix-derived. Unix 是商標，Linux 是自由軟體。

## Q2: 為什麼說「一切皆檔案」？
**A**: Unix 將幾乎所有資源（磁碟、終端、管線、網路 socket、甚至進程資訊）都抽象為檔案描述符，統一使用 open/read/write/close 操作。這極大簡化了程式設計模型——同一個程式可以操作不同的資源，無需了解其底層細節。

## Q3: System V 和 BSD 的主要區別？
**A**: System V (AT&T) 偏向商業化和標準化——init/runlevel、STREAMS 網路棧、SysV IPC。BSD (Berkeley) 偏學術和創新——TCP/IP Sockets、vi、csh、FFS 檔案系統。最終 BSD 的網路 API 和 System V 的 init/IPC 都成為業界標準。

## Q4: POSIX 是什麼？為什麼重要？
**A**: POSIX (Portable Operating System Interface) 是 IEEE 定義的標準，規範了 Unix 相容系統必須提供的 API 和工具。它讓程式可以在不同的 Unix 系統間移植。Linux、macOS、BSD 都遵循 POSIX。

## Q5: 什麼是 inode？和檔名的關係？
**A**: inode (Index Node) 是儲存檔案中介資料（權限、大小、時間戳、資料區塊位置）的資料結構。檔名存在於目錄中，目錄本質上是一個將檔名映射到 inode 編號的表。一個 inode 可以有多個檔名（hard links），但檔名不是 inode 的一部分。

## Q6: setuid root 程式為什麼危險？
**A**: setuid root 程式以 root 權限執行，任何安全漏洞（如緩衝區溢位）都可能讓攻擊者獲得 root shell。這是 Unix 安全模型的「阿喀琉斯之踵」。現代系統通過將功能拆分成細粒度 capabilities、使用沙箱和減少 setuid 程式來降低風險。

## Q7: fork() 和 exec() 為什麼分成兩個步驟？
**A**: 這是 Unix 最優雅的設計之一。分離 fork（複製）和 exec（替換）允許子進程在執行新程式前進行環境設定：關閉不需要的檔案描述符、設定環境變數、重新導向 stdin/stdout/stderr、設定資源限制等。這在 shell 中極為有用。

## Q8: zombie process (殭屍進程) 怎麼清除？
**A**: 殭屍進程是已終止但未被父進程 wait() 回收的進程。清除方法：(1) 父進程呼叫 wait() 或 waitpid()；(2) 殺死父進程，讓殭屍被 init (PID 1) 收養回收；(3) 父進程安裝 SIGCHLD 信號處理器自動回收。

## Q9: macOS 是真正的 Unix 嗎？
**A**: 是的。macOS 自 Leopard (10.5) 起通過了 Open Group 的 Single UNIX Specification (SUS V3) 認證，是官方的 UNIX® 系統。其 Darwin 核心整合了 Mach 微核心和 FreeBSD 子系統，提供完整的 POSIX API。

## Q10: 學習 Unix 的最佳資源？
**A**: 
- 《The UNIX Programming Environment》(Kernighan & Pike) — 經典入門
- 《Advanced Programming in the UNIX Environment》(Stevens) — APUE，Unix/Linux 程式設計聖經
- 《UNIX Network Programming》(Stevens) — 網路程式設計權威
- 《The Art of Unix Programming》(Raymond) — 設計哲學
- 《The Design of the UNIX Operating System》(Bach) — System V 核心架構
