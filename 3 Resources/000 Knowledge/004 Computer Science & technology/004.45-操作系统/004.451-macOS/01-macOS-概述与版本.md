---
aliases: [macOS Overview, macOS 歷史, macOS Versions, Apple Silicon vs Intel]
tags: [DDC/004.451, macos, history, apple-silicon, darwin]
created: 2026-05-30
---

# 01 macOS 概述與版本 Overview & Versions

> 從 2001 年 Mac OS X Cheetah 到 macOS Sequoia，從 PowerPC→Intel→Apple Silicon 的架構遷移，以及 Darwin/XNU/BSD/I/O Kit 核心生態。

## 架構遷移 Architecture Transition

| 遷移 Migration | 年份 | 從 From | 到 To | 相容層 |
|------|:---:|------|------|------|
| 第一次 | 2006 | PowerPC G5 | Intel x86 | Rosetta 1 (PPC→Intel) |
| 第二次 | 2020 | Intel x64 | Apple Silicon (ARM64) | Rosetta 2 (x64→ARM) |
| Universal Binary | 2006- | — | 雙架構 | Fat binary (x86_64 + arm64) |

## Apple Silicon 晶片對比 Apple Silicon Comparison

| 晶片 Chip | CPU 核心 | GPU 核心 | 神經引擎 | 記憶體頻寬 | 代表機型 |
|------|:---:|:---:|:---:|:---:|------|
| **M1** | 8 (4P+4E) | 7-8 | 16-core | 68 GB/s | MacBook Air (2020) |
| **M1 Pro** | 8-10 | 14-16 | 16-core | 200 GB/s | MacBook Pro 14/16 |
| **M1 Max** | 10 | 24-32 | 16-core | 400 GB/s | MacBook Pro 16 高配 |
| **M1 Ultra** | 20 | 48-64 | 32-core | 800 GB/s | Mac Studio |
| **M2** | 8 | 8-10 | 16-core | 100 GB/s | MacBook Air (2022) |
| **M3** | 8 | 8-10 | 16-core | 100 GB/s | MacBook Pro (2023) |
| **M4** | 9-10 | 10 | 16-core | 120 GB/s | MacBook Pro (2024) |

## Darwin 版本對照 Darwin Version Mapping

```bash
# 查看 Darwin kernel 版本
uname -r                    # 例: 24.1.0 (Sequoia)
uname -a                    # Darwin Kernel Version 24.1.0
sw_vers                     # 產品名稱 + 版本號
# ProductName: macOS
# ProductVersion: 15.1
# BuildVersion: 24B83
```

## 關鍵概念 Key Concepts

- **Darwin**：macOS 的核心開源部分 = XNU kernel + BSD userland + I/O Kit
- **XNU** (X is Not Unix)：混合核心 = Mach microkernel + FreeBSD kernel + I/O Kit
- **Apple Silicon**：Apple 自研 ARM-based SoC，統一記憶體架構 (UMA)
- **Rosetta 2**：x86_64 → ARM64 二進位轉譯層，無需使用者介入
- **Universal Binary 2**：單一 .app 同時包含 Intel 和 ARM 二進位碼
