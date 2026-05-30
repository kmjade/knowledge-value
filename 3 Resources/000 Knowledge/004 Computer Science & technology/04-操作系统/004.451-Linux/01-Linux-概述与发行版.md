---
aliases: [Linux Overview, Linux 歷史與發行版, Linux Distros]
tags: [DDC/004.451, linux, distro, history]
created: 2026-05-30
---

# 01 Linux 概述與發行版 Overview & Distros

> 從 1991 年 Linus Torvalds 的「just a hobby」到如今驅動全球伺服器、手機 (Android)、超級電腦的開源奇蹟。

## 歷史時間線 History Timeline

| 年份 | 事件 Event |
|:---:|------|
| 1969 | Ken Thompson & Dennis Ritchie 開發 Unix (AT&T Bell Labs) |
| 1983 | Richard Stallman 啟動 GNU 專案 (GNU's Not Unix) |
| 1991 | Linus Torvalds 發布 Linux kernel 0.01 |
| 1992 | Linux 採用 GPL 授權 |
| 1993 | Slackware / Debian 誕生 |
| 1994 | Linux 1.0 發布 |
| 2003 | RHEL / Fedora 誕生；Android 成立 |
| 2011 | Linux 3.0；Android 成為最大行動 OS |
| 2015 | Linux 4.0 (live patching) |
| 2019 | Linux 5.0 |
| 2022 | Linux 6.0 (Rust 支援初步合併) |

## 套件管理生態 Package Ecosystem

| 家族 | 套件格式 | 底層工具 | 高層工具 | 代表 Distro |
|------|:---:|:---:|:---:|------|
| **Debian** | .deb | dpkg | apt / apt-get | Ubuntu, Debian, Kali |
| **Red Hat** | .rpm | rpm | dnf / yum | RHEL, Fedora, CentOS |
| **Arch** | .pkg.tar.zst | pacman | pacman / yay | Arch, Manjaro, EndeavourOS |
| **Alpine** | .apk | apk | apk | Alpine (容器首選) |
| **SUSE** | .rpm | rpm | zypper | openSUSE, SLES |
| **通用** | Snap/Flatpak/AppImage | — | snap/flatpak | 跨 distro |

## 常用指令 Quick Commands

```bash
# 查看發行版資訊
cat /etc/os-release          # 通用
lsb_release -a               # Debian 系
hostnamectl                  # systemd 系統

# 查看內核版本
uname -r                     # 例: 6.8.0-40-generic
uname -a                     # 完整系統資訊

# 查看硬體
lscpu                        # CPU 資訊
lsmem                        # 記憶體
lsblk                        # 區塊裝置
```

## 選擇指南 Distro Selection Guide

| 場景 | 推薦 | 原因 |
|------|------|------|
| 桌面入門 | Ubuntu / Linux Mint | 開箱即用、社群龐大 |
| 伺服器穩定 | Debian Stable / RHEL | 長期支援、安全性更新 |
| 企業環境 | RHEL / Ubuntu LTS | 商業支援、合規認證 |
| 容器化 | Alpine | 極小 (5MB)、安全 |
| 學習底層 | Arch / Gentoo | 手動建構、深入理解 |
| 滲透測試 | Kali Linux | 預裝安全工具 |

## 關鍵概念 Key Concepts

- **內核 (Kernel)**：Linux 本身只是內核；distro = kernel + GNU 工具 + 套件管理 + 桌面環境
- **滾動更新 (Rolling)** vs **固定發布 (Point Release)**：Arch 持續更新 vs Ubuntu 半年/LTS
- **LTS (Long Term Support)**：Ubuntu LTS 5 年支援、RHEL 10 年生命週期
