---
aliases: [VS Code Overview, VS Code 概述, Visual Studio Code Introduction]
tags: [DDC/004.43, vscode, tools, electron, overview]
created: 2026-06-01
updated: 2026-06-01
---

# 01 — VS Code 概述 Overview

> Electron 架構的開源輕量編輯器，2015 年由 Microsoft 發布，GitHub Stars 165k+，月活 2600 萬+。

---

## 定位與哲學 Positioning

| 屬性 | 說明 |
|------|------|
| **定位** | 輕量編輯器 + 擴展生態 = 類 IDE 體驗 |
| **核心理念** | Code editing. Redefined. — 開箱即用、按需擴展 |
| **開源** | MIT License，GitHub [microsoft/vscode](https://github.com/microsoft/vscode) |
| **維護方** | Microsoft + 社群 |
| **發布週期** | 每月穩定版 + 每日 Insiders 版 |

---

## Electron 架構

```
┌─────────────────────────────────────────────────┐
│                  VS Code (Electron)              │
│  ┌──────────────────┐  ┌──────────────────────┐  │
│  │   Chromium       │  │   Node.js Runtime    │  │
│  │   (Render UI)    │  │   (File I/O, Process)│  │
│  │   HTML/CSS/JS    │  │   Extension Host      │  │
│  └──────────────────┘  └──────────────────────┘  │
│  ┌──────────────────────────────────────────┐    │
│  │          VS Code Core (TypeScript)        │    │
│  │  Editor · Workbench · Language Server    │    │
│  │  Debugger · Terminal · Extension API     │    │
│  └──────────────────────────────────────────┘    │
└─────────────────────────────────────────────────┘
```

| 層 | 技術 | 責任 |
|----|------|------|
| **Shell** | Electron | 視窗管理、原生選單、系統整合 |
| **Render** | Chromium + Monaco Editor | UI 渲染、編輯器核心 |
| **Backend** | Node.js | 檔案系統、子程序、LSP 通訊 |
| **Core** | TypeScript | 編輯器邏輯、API、擴展宿主 |

---

## 跨平台支援 Cross-Platform

| 平台 | 支援方式 | 備註 |
|------|---------|------|
| **Windows** | 原生 .exe / winget / choco | Windows 10/11 |
| **macOS** | 原生 .dmg / Homebrew | Apple Silicon 原生支援 |
| **Linux** | .deb / .rpm / Snap / Flatpak | Ubuntu / Fedora / Arch |
| **Web** | vscode.dev (有限功能) | 無終端、無擴展原生模組 |
| **Remote** | SSH / Containers / WSL / Tunnels | 後端在遠端，UI 在本地 |

---

## 市場份額 Market Share

| 年份 | Stack Overflow 市佔 | 備註 |
|:---:|:---:|------|
| 2016 | 7.2% | 發布一年 |
| 2018 | 34.9% | 超越 Sublime |
| 2019 | 50.7% | 首次過半 |
| 2021 | 71.1% | 壓倒性第一 |
| 2023 | 73.7% | 穩定領先 |
| 2024 | 75%+ | 無人撼動 |

---

## VS Code 家族

| 產品 | 說明 | 開源 |
|------|------|:---:|
| **VS Code** | 核心編輯器 | ✅ |
| **VS Code Insiders** | 每日構建預覽版 | ✅ |
| **VSCodium** | 去除 MS 遙測的社群構建 | ✅ |
| **Cursor** | 基於 VS Code 的 AI-first 編輯器 | ❌ |
| **Windsurf** | Codeium 的 AI IDE (VS Code fork) | ❌ |
| **GitHub Codespaces** | 瀏覽器版雲端 VS Code | — |
| **Visual Studio** | 重量級 IDE (非 Electron) | ❌ |

---

## 相關

- [[../VS Code|VS Code MOC]] — 章節導航
- [[02-安装与配置]] — 安裝與 settings.json
- [[03-编辑器核心]] — 編輯器核心功能
