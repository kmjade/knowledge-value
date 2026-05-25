---
title: WSL 開放原始碼
aliases: [WSL Open Source, WSL GitHub]
tags: [wsl, opensource, github, community]
created: 2026-05-25
updated: 2026-05-25
status: active
source: https://learn.microsoft.com/zh-tw/windows/wsl/opensource
---

# WSL 開放原始碼

> [!info] 說明
> WSL 的部分元件已開放原始碼，社群可以參與貢獻和問題回報。

## 開源元件

### WSL 核心元件

WSL 2 的 Linux 核心是開放原始碼的，基於穩定的 Linux 核心。

### GitHub 儲存庫

| 儲存庫 | 說明 |
|--------|------|
| [microsoft/WSL](https://github.com/microsoft/WSL) | WSL 問題追蹤和功能請求 |
| [microsoft/WSL2-Linux-Kernel](https://github.com/microsoft/WSL2-Linux-Kernel) | WSL 2 Linux 核心原始碼 |
| [microsoft/wslg](https://github.com/microsoft/wslg) | WSLg GUI 支援 |

## 如何參與

### 問題回報

如果您遇到 WSL 相關問題：

1. 前往 [WSL GitHub Issues](https://github.com/microsoft/WSL/issues)
2. 搜尋是否已有相同問題
3. 如果沒有，建立新的 Issue

#### 問題回報範本

```markdown
## 問題描述
[清楚描述遇到的問題]

## 重現步驟
1.
2.
3.

## 預期行為
[應該發生什麼]

## 實際行為
[實際發生了什麼]

## 環境資訊
- Windows 版本:
- WSL 版本: (wsl --version)
- Linux 發行版:
- 核心版本: (uname -a)

## 診斷日誌
wsl --diagnostic-info 輸出
```

### 功能請求

如果您希望新增功能：

1. 前往 [WSL GitHub Discussions](https://github.com/microsoft/WSL/discussions)
2. 描述您的使用情境和需求
3. 說明為什麼這個功能對您重要

### 程式碼貢獻

WSL 核心的貢獻方式：

```bash
# 複製儲存庫
git clone https://github.com/microsoft/WSL2-Linux-Kernel.git

# 建立分支
git checkout -b feature/my-contribution

# 進行修改...

# 提交 Pull Request
```

## 社群資源

### 官方資源

- [WSL 文檔](https://learn.microsoft.com/zh-tw/windows/wsl/)
- [WSL 部落格](https://devblogs.microsoft.com/commandline/)
- [WSL GitHub](https://github.com/microsoft/WSL)

### 社群討論區

| 平台 | 連結 |
|------|------|
| Stack Overflow | [wsl 標籤](https://stackoverflow.com/questions/tagged/wsl) |
| Reddit | [r/bashonubuntuonwindows](https://www.reddit.com/r/bashonubuntuonwindows/) |
| Twitter | [@WindowsDocs](https://twitter.com/WindowsDocs) |

## 版本發布

WSL 的更新透過以下方式發布：

### Microsoft Store

主要更新管道，提供最新功能和修正。

### Windows Update

系統級更新，包含安全性修正。

### 手動更新

```bash
# 檢查並安裝更新
wsl --update

# 更新到預覽版本
wsl --update --pre-release
```

## 授權

WSL 核心使用 GNU General Public License v2 (GPL-2.0)。

其他元件可能使用不同的開源授權。

## 相關主題

- [[故障排除]] - 問題診斷
- [[一般版本資訊]] - 版本更新記錄

---
> 📚 返回 [[../00-MOCs/MOC-總覽|WSL 知識庫總覽]]
