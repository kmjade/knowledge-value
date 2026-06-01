---
aliases: [VS Code 知識庫導航, VS Code Knowledge Base, Visual Studio Code MOC]
tags: [DDC/004.43, vscode, tools, editor, MOC]
created: 2026-06-01
updated: 2026-06-01
type: moc
topic: vscode
---

# VS Code 知識庫導航 — VS Code Knowledge Base MOC

> 🟦 Visual Studio Code：Electron 架構的免費開源編輯器，全球 75%+ 開發者首選。
> **DDC 004.43** · **當前版本 1.95** · **月活用戶 2600 萬+**

---

## VS Code vs IDE 對比 Comparison

| 維度 | VS Code | JetBrains IDE | Vim/Neovim | Sublime Text |
|------|:-------:|:------------:|:----------:|:------------:|
| **類型** | 輕量編輯器 + 擴展 | 重量級 IDE | 模態編輯器 | 輕量編輯器 |
| **啟動速度** | 🟡 ~2-5s | 🔴 ~10-30s | 🟢 ~0.1s | 🟢 ~0.3s |
| **語言支援** | 擴展 (500+ 語言) | 內建深度支援 | 外掛 | 外掛 |
| **重構能力** | 🟡 基本重構 | 🟢 深度重構 | 🔴 極少 | 🔴 極少 |
| **記憶體佔用** | ~300-800 MB | ~1-3 GB | ~10-30 MB | ~50-150 MB |
| **遠端開發** | 🟢 Remote SSH/Container/WSL | 🟡 Gateway | 🟢 SSH | ❌ |
| **AI 集成** | Copilot/Cline/Continue | AI Assistant | Copilot 外掛 | 有限 |
| **免費** | ✅ 完全免費 | ❌ 社群版免費 | ✅ | ❌ $99 |

---

## 關鍵統計 Key Stats

| 指標 | 數值 |
|------|:---:|
| 月活用戶 | 2600 萬+ |
| Stack Overflow 市佔 | 75%+ (2024) |
| Marketplace 擴展數 | 50,000+ |
| 支援語言 | 500+ (經擴展) |
| 首次發布 | 2015-04-29 |
| GitHub Stars | 165,000+ |
| 底層技術 | Electron (Chromium + Node.js) |

---

## 章節導航 Chapter Navigation

| # | 章節 | 文件 | 難度 | 關鍵字 |
|:-:|------|------|:--:|-------|
| 1 | 概述 | [[01-VS-Code-概述]] | 🟢 | Electron, 跨平台, 市場份額 |
| 2 | 安裝與配置 | [[02-安装与配置]] | 🟢 | settings.json, Settings Sync, code CLI |
| 3 | 編輯器核心 | [[03-编辑器核心]] | 🟡 | IntelliSense, Snippets, Emmet, Multi-cursor |
| 4 | 工作區與專案 | [[04-工作区与项目管理]] | 🟡 | .code-workspace, tasks.json, Terminal |
| 5 | 擴展生態 | [[05-扩展生态]] | 🟢 | Marketplace, Top 20, Themes |
| 6 | Git 與協作 | [[06-Git与协作]] | 🟡 | GitLens, Live Share, Remote Development |
| 7 | 調試與診斷 | [[07-调试与诊断]] | 🟡🔴 | Breakpoints, Watch, Per-language Debug |
| 8 | 效率技巧 | [[08-效率技巧]] | 🟢 | Command Palette, Shortcuts, Profiles |
| 9 | AI 集成 | [[09-AI集成]] | 🟡 | Copilot, Cline, AI Code Review |
| 99 | 資源收集 | [[3 Resources/000 Knowledge/004 Computer Science & technology/004.43-计算机语言/VS Code/99-資源收集/FAQ]] [[3 Resources/000 Knowledge/004 Computer Science & technology/004.43-计算机语言/VS Code/99-資源收集/資源總覽]] | 🟢 | FAQ, 工具, 書籍, 社群 |

---

## 核心快速鍵速查 Essential Shortcuts

| 快速鍵 | Windows/Linux | macOS | 功能 |
|--------|:------------:|:-----:|------|
| Command Palette | `Ctrl+Shift+P` | `Cmd+Shift+P` | 所有命令入口 |
| Quick Open | `Ctrl+P` | `Cmd+P` | 快速開啟檔案 |
| 設定 | `Ctrl+,` | `Cmd+,` | 開啟設定 UI |
| 終端機 | `` Ctrl+` `` | `` Cmd+` `` | 開/關集成終端 |
| 搜尋 | `Ctrl+Shift+F` | `Cmd+Shift+F` | 全域搜尋 |
| Zen Mode | `Ctrl+K Z` | `Cmd+K Z` | 全螢幕無干擾 |
| Toggle Sidebar | `Ctrl+B` | `Cmd+B` | 側欄開關 |
| 重新載入視窗 | `Ctrl+Shift+P` → `Reload` | — | 重載 VS Code |

---

## 目錄結構

```
VS Code/
├── VS Code.md ◀ 你在这里
├── 01-VS-Code-概述.md       Electron 架構、跨平台、市場定位
├── 02-安装与配置.md          settings.json、Settings Sync、code CLI
├── 03-编辑器核心.md          IntelliSense、Snippets、Emmet、Multi-cursor
├── 04-工作区与项目管理.md     .code-workspace、tasks.json、Terminal
├── 05-扩展生态.md            Marketplace、Top 20 擴展、Themes
├── 06-Git与协作.md           GitLens、Live Share、Remote (SSH/WSL)
├── 07-调试与诊断.md          斷點、Watch、Python/Node/C++ 調試
├── 08-效率技巧.md            Shortcuts、Command Palette、Profiles
├── 09-AI集成.md              Copilot/Cline、AI Code Review、Prompt
└── 99-資源收集/
    ├── FAQ.md                常見問題
    └── 資源總覽.md            書籍、外掛、社群資源
```

---

## 相關

- [[../004.43-计算机语言|004.43-计算机语言]] — 程式語言原理總覽
- [[../Markdown/Markdown|Markdown KB]] — VS Code 原生支援的標記語言
- [[3 Resources/000 Knowledge/004 Computer Science & technology/004.43-计算机语言/Python/99-資源收集/计算机语言-分类码|计算机语言分类码]]
