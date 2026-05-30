---
aliases: [macOS Learning Path, macOS 學習路徑]
tags: [DDC/004.451, macos, learning-path]
created: 2026-05-30
---

# macOS 學習路徑 Learning Path

> 從零到進階的 macOS 系統管理與開發學習路線，涵蓋終端操作、架構理解、安全與效能調優。
> A structured learning path from beginner to advanced macOS system administration and development.

## 路線圖 Roadmap

| 階段 | 章節 | 目標 | 預計時間 |
|:---:|------|------|:---:|
| **🔰 入門** | 01 概述與版本 | 理解 macOS 歷史、Apple Silicon 生態 | 2h |
| | 03 終端與 Shell | 熟練 zsh、Homebrew、CLI 工具鏈 | 6h |
| | 05 應用與包管理 | Homebrew cask/mas、Gatekeeper 機制 | 3h |
| **🟡 中級** | 04 檔案系統 | APFS 快照/克隆、Time Machine、iCloud | 4h |
| | 06 網路與安全 | pf firewall、FileVault、TCC 隱私 | 5h |
| | 07 開發環境 | Xcode CLT、Rosetta 2、Docker Desktop | 4h |
| **🔴 進階** | 02 系統架構 | XNU/Mach/BSD、SIP、launchd 深層 | 6h |
| | 08 自動化 | AppleScript、launchd plist、Automator | 4h |
| | 09 效能診斷 | Activity Monitor、sysdiagnose、DTrace | 5h |

## 必備前置知識 Prerequisites

- 基本的電腦操作概念
- 一台 Mac 電腦（Intel 或 Apple Silicon）
- 願意使用命令列介面 (CLI)
- 基本的 Unix/Linux 概念（可選但加分）

## 實作環境建議 Lab Environment

| 方案 | 適合 | 說明 |
|------|------|------|
| **原生 Mac** | 日常使用與開發 | 直接使用現有 macOS 系統 |
| **macOS VM** | 隔離測試環境 | UTM (Apple Silicon) / VMware Fusion |
| **Hackintosh** | 硬體實驗（非官方） | OpenCore 引導，僅限學習用途 |
| **GitHub Actions** | CI/CD 測試 | `runs-on: macos-latest` |

## 學習技巧 Tips

1. **動手做**：每個指令都自己敲一遍，終端是最好的老師
2. **讀 man page**：`man command` 獲取官方文件
3. **善用 Spotlight**：`Cmd+Space` 快速查找任何設定
4. **理解差異**：macOS 是 Unix，但不是 Linux — API/工具鏈不同
5. **關注 WWDC**：每年 6 月 Apple 開發者大會公布新技術方向

## 相關連結 Related

- [[004.451-macOS|macOS MOC 主入口]]
- [[../004.451-Linux/004.451-Linux|Linux 知識庫]]
- [[../04-操作系统|作業系統總覽]]
