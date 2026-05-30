---
title: Unix 概述與歷史 — Unix Overview & History
aliases: [Unix History, Unix 歷史, Bell Labs Unix, Unix 概述]
tags: [DDC/004.451, unix, os, history]
created: 2026-05-30
updated: 2026-05-30
---

# Unix 概述與歷史 — Unix Overview & History

> Unix 的故事始於 1969 年 Bell Labs，一台閒置的 PDP-7，和 Ken Thompson 對太空旅行遊戲的熱愛。The story of Unix begins at Bell Labs in 1969 with a PDP-7 and a passion for Space Travel.

## Bell Labs 1969：創世紀

1960 年代，MIT、Bell Labs、GE 合作開發 Multics（多工資訊計算系統），目標是建立一個強大的分時系統。但 Multics 過於複雜，Bell Labs 於 1969 年退出。Ken Thompson 在 PDP-7 上用組合語言寫了一個簡單的作業系統——Unix 誕生了。1973 年，Dennis Ritchie 用 C 語言重寫核心（kernel），實現了可移植性（portability），這是 Unix 成功的關鍵。

## Unix 哲學 Unix Philosophy

1. **KISS (Keep It Simple, Stupid)**：每個程式只做一件事，並把它做好
2. **Everything is a file**：一切皆檔案——裝置、進程、網路都用檔案介面
3. **Small is beautiful**：小工具透過 pipe (`|`) 組合，完成複雜任務
4. **Portability over efficiency**：1973 年從組合語言遷移到 C，讓 Unix 能在不同硬體上運行
5. **Worse is better** (Richard Gabriel)：簡單的實作勝過完美的設計

## System V vs BSD 大分裂 The Great Schism

1975-1983 年間，Unix 分裂為兩大陣營：
- **System V** (AT&T)：商業授權，init 系統、SVR4 整合、STREAMS 框架
- **BSD** (UC Berkeley)：學術自由，TCP/IP 網路棧、vi 編輯器、csh、sockets API

這場分裂成為 Unix Wars 的根源，但也推動了標準化。

## POSIX 標準化

1988 年，IEEE 發布 POSIX (Portable Operating System Interface)，定義 Unix 相容系統的最小 API 集合。POSIX.1 定義系統呼叫（system calls），POSIX.2 定義 Shell 和工具。Linus Torvalds 在開發 Linux 時嚴格遵循 POSIX，確保生態兼容。

## Unix 家族樹 Family Tree 簡圖

```
Unix v1 (1969, Bell Labs)
 ├── Research Unix v1-v10 (1971-1989)
 │    └── Plan 9 (Bell Labs, 1992)
 ├── BSD (1977, UC Berkeley)
 │    ├── SunOS → Solaris
 │    ├── FreeBSD / NetBSD / OpenBSD
 │    └── NeXTSTEP → Darwin → macOS / iOS
 ├── System V (1983, AT&T)
 │    ├── AIX (IBM)
 │    ├── HP-UX (HP)
 │    ├── IRIX (SGI)
 │    └── UnixWare (Novell → SCO)
 └── Linux (1991, Linus Torvalds)
      └── 不是 Unix 衍生，但遵循 POSIX
```

## 關鍵人物 Key Figures

| 人物 | 貢獻 |
|------|------|
| Ken Thompson | Unix 創始人，B 語言，UTF-8，Go 語言 |
| Dennis Ritchie | C 語言發明者，Unix 核心重寫 |
| Brian Kernighan | awk 共同作者，「Hello, World」第一人 |
| Bill Joy | vi 編輯器，csh，BSD TCP/IP |
| Linus Torvalds | Linux 核心作者 |

## 關鍵里程碑 Key Milestones

| 年份 | 事件 |
|:----:|------|
| 1969 | Unix v1 誕生於 PDP-7 |
| 1973 | C 語言重寫 Unix，版本 4 |
| 1975 | 版本 6 向外發布，大學授權 |
| 1977 | 1BSD 發布 |
| 1983 | System V 發布；GNU 計畫啟動 |
| 1988 | POSIX 標準發布 |
| 1991 | Linux 0.01 發布 |
| 2001 | macOS X 發布（Darwin/BSD 核心） |

---

> "Those who don't understand Unix are condemned to reinvent it, poorly." — Henry Spencer
