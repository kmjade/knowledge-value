---
title: WSL 知識庫
aliases: [Windows Subsystem for Linux, WSL Documentation]
tags: [wsl, linux, windows, documentation]
created: 2026-05-25
updated: 2026-05-25
status: active
source: https://learn.microsoft.com/zh-tw/windows/wsl/
---

# WSL 知識庫

> [!info] 關於
> 適用於 Linux 的 Windows 子系統 (WSL) 完整知識庫，基於 [Microsoft 官方文檔](https://learn.microsoft.com/zh-tw/windows/wsl/) 整理。

## 快速開始

### 什麼是 WSL？

WSL 讓您可以直接在 Windows 上執行 Linux 環境，無需傳統虛擬機器或雙重開機設定。

### 一鍵安裝

```powershell
wsl --install
```

## 知識庫結構

```
WSL/
├── 00-MOCs/           # 導航與學習路徑
├── 01-概觀/           # 基礎概念與介紹
├── 02-安裝/           # 安裝指南
├── 03-教程/           # 實作教程
├── 04-概念/           # 進階概念
├── 05-操作說明/       # 操作指南
├── 06-企業安全性/     # 企業部署
└── 07-參考/           # 參考資料
```

## 內容導航

### 📚 [[00-MOCs/MOC-總覽|知識庫總覽]]

完整的知識庫地圖和快速導航。

### 🎯 [[00-MOCs/MOC-學習路徑|學習路徑]]

從入門到進階的學習建議。

### 📖 主要章節

| 章節 | 內容 | 適合對象 |
|------|------|----------|
| [[01-概觀/]] | WSL 基礎概念 | 初學者 |
| [[02-安裝/]] | 安裝指南 | 所有使用者 |
| [[03-教程/]] | 實作教程 | 開發者 |
| [[04-概念/]] | 進階概念 | 進階使用者 |
| [[05-操作說明/]] | 操作指南 | 系統管理員 |
| [[06-企業安全性/]] | 企業部署 | IT 管理員 |
| [[07-參考/]] | 參考資料 | 所有使用者 |

## 熱門主題

### 入門必讀

- [[01-概觀/什麼是WSL|什麼是 WSL？]]
- [[01-概觀/比較WSL版本|比較 WSL 版本]]
- [[02-安裝/安裝WSL|安裝 WSL]]

### 開發環境

- [[03-教程/設定最佳實務做法|設定最佳實務做法]]
- [[03-教程/開始使用VSCode|開始使用 VS Code]]
- [[03-教程/開始使用Git|開始使用 Git]]

### 進階主題

- [[04-概念/進階設定組態|進階設定組態]]
- [[04-概念/網路相關考量|網路相關考量]]
- [[04-概念/使用systemd來管理服務|使用 systemd 管理服務]]

### 疑難排解

- [[07-參考/常見問題|常見問題]]
- [[07-參考/故障排除|故障排除]]

## 快速命令參考

### 基本命令

```bash
# 安裝 WSL
wsl --install

# 列出發行版
wsl --list --verbose

# 設定預設版本
wsl --set-default-version 2

# 更新 WSL
wsl --update

# 關閉 WSL
wsl --shutdown
```

### 發行版管理

```bash
# 安裝特定發行版
wsl --install -d Ubuntu-22.04

# 設定預設發行版
wsl --set-default Ubuntu

# 匯出發行版
wsl --export Ubuntu backup.tar

# 匯入發行版
wsl --import Ubuntu D:\WSL\ backup.tar
```

## 外部資源

### 官方資源

- [Microsoft WSL 文檔](https://learn.microsoft.com/zh-tw/windows/wsl/)
- [WSL GitHub Repository](https://github.com/microsoft/WSL)
- [WSL2 Linux Kernel](https://github.com/microsoft/WSL2-Linux-Kernel)

### 社群資源

- [Stack Overflow - WSL](https://stackoverflow.com/questions/tagged/wsl)
- [Reddit - r/bashonubuntuonwindows](https://www.reddit.com/r/bashonubuntuonwindows/)

## 相關知識庫

- [[../Networking/README|Networking 網路知識庫]]
- [[../LLM-Tech/README|LLM-Tech 大語言模型知識庫]]
- [[../Programming/Python/Python知識庫導航|Python 知識庫]]

---

## 更新記錄

| 日期 | 更新內容 |
|------|----------|
| 2026-05-25 | 建立知識庫 |

---

> 📚 **提示**: 從 [[00-MOCs/MOC-學習路徑|學習路徑]] 開始探索 WSL 知識庫！
