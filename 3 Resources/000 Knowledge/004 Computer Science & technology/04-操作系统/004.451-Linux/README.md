---
aliases: [Linux Learning Path, Linux 學習路徑]
tags: [DDC/004.451, linux, learning-path]
created: 2026-05-30
---

# Linux 學習路徑 Learning Path

> 從零到進階的 Linux 系統管理學習路線，涵蓋命令列、內核、網路、安全與效能調優。
> A structured learning path from beginner to advanced Linux system administration.

## 路線圖 Roadmap

| 階段 | 章節 | 目標 | 預計時間 |
|:---:|------|------|:---:|
| **🔰 入門** | 01 概述與發行版 | 理解 Linux 歷史、選擇 distro | 2h |
| | 03 Shell 與命令列 | 熟練 Bash、pipes、grep/awk/sed | 8h |
| | 06 套件管理 | 學會 apt/dnf/pacman 安裝軟體 | 3h |
| **🟡 中級** | 04 檔案系統 | 理解 VFS、inode、LVM、mount | 6h |
| | 05 systemd | 服務管理、journalctl、定時任務 | 4h |
| | 08 使用者與權限 | sudo、PAM、SELinux/AppArmor | 4h |
| **🔴 進階** | 02 內核架構 | 行程調度、虛擬記憶體、/proc | 8h |
| | 07 網路與防火牆 | iptables/nftables、SSH、tcpdump | 6h |
| | 09 效能調優 | strace、perf、sysctl、OOM | 6h |

## 必備前置知識 Prerequisites

- 基本的電腦操作概念
- 願意使用命令列介面 (CLI)
- 一台可安裝 Linux 的機器（實體機/VM/WSL）

## 實作環境建議 Lab Environment

| 方案 | 適合 | 指令 |
|------|------|------|
| **WSL2** | Windows 用戶快速體驗 | `wsl --install -d Ubuntu` |
| **VirtualBox** | 完整隔離的 VM | 下載 ISO 安裝 |
| **雲端 VPS** | 遠端伺服器實戰 | AWS EC2 / GCP / 騰訊雲 |
| **Raspberry Pi** | 嵌入式 Linux 體驗 | Raspberry Pi OS |
| **Docker** | 輕量隔離測試 | `docker run -it ubuntu bash` |

## 學習技巧 Tips

1. **動手做**：每個指令都自己敲一遍，不要複製貼上
2. **讀 man page**：`man command` 是最好的老師
3. **破壞再修復**：在 VM 裡大膽嘗試，學著從錯誤中恢復
4. **寫筆記**：把常用的指令和參數記錄下來
5. **參與社群**：Arch Wiki、Stack Overflow、Reddit r/linux

## 相關連結 Related

- [[004.451-Linux|Linux MOC 主入口]]
- [[04-操作系统|作業系統總覽]]
- [[004.6 计算机网络|電腦網路]]
