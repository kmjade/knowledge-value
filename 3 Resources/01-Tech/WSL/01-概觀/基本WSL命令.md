---
title: 基本 WSL 命令
aliases: [WSL Commands, WSL 命令參考]
tags: [wsl, commands, cli, reference]
created: 2026-05-25
updated: 2026-05-25
status: active
source: https://learn.microsoft.com/zh-tw/windows/wsl/basic-commands
---

# 基本 WSL 命令

> [!info] 說明
> 本頁整理常用的 WSL 命令，方便快速查詢和使用。

## 命令總覽

所有 WSL 命令都在 Windows 命令提示字元或 PowerShell 中執行。

## 安裝與設定

### 安裝 WSL

```bash
# 安裝 WSL (預設 Ubuntu)
wsl --install

# 安裝完成後需要重新啟動電腦
```

### 安裝特定發行版

```bash
# 列出可用的 Linux 發行版
wsl --list --online

# 安裝特定發行版
wsl --install -d Ubuntu-22.04

# 安裝多個發行版
wsl --install -d Debian
wsl --install -d kali-linux
```

### 更新 WSL

```bash
# 更新 WSL 到最新版本
wsl --update

# 檢查 WSL 版本
wsl --version

# 更新狀態
wsl --status
```

## 發行版管理

### 列出發行版

```bash
# 列出已安裝的發行版
wsl --list
# 或
wsl -l

# 詳細列表 (包含版本和狀態)
wsl --list --verbose
# 或
wsl -l -v
```

輸出範例：
```
  NAME            STATE           VERSION
* Ubuntu          Running         2
  Ubuntu-22.04    Stopped         2
  Debian          Stopped         1
```

### 設定預設發行版

```bash
# 設定預設發行版
wsl --set-default Ubuntu-22.04
# 或
wsl -s Ubuntu-22.04
```

### 刪除發行版

```bash
# 取消註冊/刪除發行版 (警告: 會刪除所有資料)
wsl --unregister Debian
```

### 匯入與匯出

```bash
# 匯出發行版為 tar 檔
wsl --export Ubuntu ubuntu-backup.tar

# 匯入發行版
wsl --import Ubuntu-Backup D:\WSL\ ubuntu-backup.tar
```

## 版本管理

### WSL 版本設定

```bash
# 設定特定發行版使用 WSL 2
wsl --set-version Ubuntu 2

# 設定特定發行版使用 WSL 1
wsl --set-version Ubuntu 1

# 設定預設版本 (新安裝的發行版)
wsl --set-default-version 2
```

## 執行與關閉

### 執行命令

```bash
# 啟動預設發行版
wsl

# 啟動特定發行版
wsl -d Ubuntu-22.04

# 執行特定命令
wsl ls -la

# 以特定使用者執行
wsl -u root

# 執行多個命令
wsl echo "Hello" && wsl echo "World"
```

### 關閉 WSL

```bash
# 關閉所有 WSL 實例
wsl --shutdown

# 終止特定發行版
wsl --terminate Ubuntu
# 或
wsl -t Ubuntu
```

## 檔案與目錄操作

### 從 Windows 存取 Linux 檔案

```bash
# 在檔案總管中開啟 Linux 目錄
wslpath -w /home/user/
explorer.exe .
```

### 從 Linux 存取 Windows 檔案

```bash
# Windows 磁碟機掛載在 /mnt/
cd /mnt/c/Users/
ls /mnt/d/
```

## 網路相關

### 查看網路資訊

```bash
# 顯示 WSL 網路設定
wsl --network-settings
```

## 命令速查表

| 命令 | 說明 |
|------|------|
| `wsl --install` | 安裝 WSL |
| `wsl --install -d <發行版>` | 安裝特定發行版 |
| `wsl --list --online` | 列出可用發行版 |
| `wsl --list --verbose` | 列出已安裝發行版 |
| `wsl --set-default <發行版>` | 設定預設發行版 |
| `wsl --set-version <發行版> <版本>` | 設定發行版 WSL 版本 |
| `wsl --set-default-version <版本>` | 設定預設 WSL 版本 |
| `wsl --shutdown` | 關閉所有 WSL |
| `wsl --terminate <發行版>` | 終止特定發行版 |
| `wsl --unregister <發行版>` | 刪除發行版 |
| `wsl --export <發行版> <檔案>` | 匯出發行版 |
| `wsl --import <發行版> <位置> <檔案>` | 匯入發行版 |
| `wsl --update` | 更新 WSL |
| `wsl --status` | 查看 WSL 狀態 |
| `wsl --version` | 查看 WSL 版本 |
| `wsl -d <發行版>` | 啟動特定發行版 |
| `wsl -u <使用者>` | 以特定使用者執行 |

## 進階命令

### 記憶體與資源設定

```bash
# 顯示 WSL 記憶體使用
wsl --show-memory-usage

# 設定記憶體限制 (需要在 .wslconfig 中設定)
```

### Debug 模式

```bash
# 啟用 debug 模式
wsl --debug

# 診斷輸出
wsl --diagnostic-info
```

## 常見操作範例

### 完整安裝流程

```bash
# 1. 安裝 WSL
wsl --install

# 2. 重新啟動電腦

# 3. 檢查安裝狀態
wsl --status

# 4. 安裝其他發行版
wsl --list --online
wsl --install -d Debian

# 5. 設定預設發行版
wsl --set-default Ubuntu
```

### 備份與還原

```bash
# 備份
wsl --export Ubuntu D:\backup\ubuntu-$(date +%Y%m%d).tar

# 還原
wsl --import Ubuntu-Restored D:\WSL\ D:\backup\ubuntu-20260525.tar

# 設定預設使用者 (匯入後需要)
# 在 Linux 內執行:
# /etc/wsl.conf 添加:
# [user]
# default = username
```

## 相關主題

- [[安裝WSL]] - 詳細安裝指南
- [[進階設定組態]] - .wslconfig 設定
- [[故障排除]] - 常見問題解決

---
> 📚 返回 [[../00-MOCs/MOC-總覽|WSL 知識庫總覽]]
