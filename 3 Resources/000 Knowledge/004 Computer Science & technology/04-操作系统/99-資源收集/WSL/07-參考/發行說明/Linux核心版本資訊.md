---
title: Linux 核心版本資訊
aliases: [WSL Kernel Release, WSL 核心]
tags: [wsl, kernel, linux, release-notes]
created: 2026-05-25
updated: 2026-05-25
status: active
source: https://learn.microsoft.com/zh-tw/windows/wsl/kernel-release-notes
---

# Linux 核心版本資訊

> [!info] 說明
> WSL 2 使用的 Linux 核心版本更新記錄。

## 查看核心版本

```bash
# 在 WSL 中
uname -r
# 輸出: 5.15.133.1-microsoft-standard-WSL2

# 或查看完整資訊
uname -a
```

## 核心來源

WSL 2 核心基於 [Linux 核心穩定分支](https://github.com/microsoft/WSL2-Linux-Kernel)，由 Microsoft 維護。

## 版本歷史

### 5.15.x (當前)

#### 5.15.133.1 (2024年1月)

**新功能**:
- 改善記憶體管理
- 支援更多硬體
- 安全性修正

**修正**:
- CVE 安全性更新
- 效能改善

#### 5.15.90.1 (2023年11月)

**新功能**:
- 改善網路效能
- 支援新 USB 裝置

**修正**:
- 修正檔案系統問題
- 安全性修正

### 5.10.x

#### 5.10.102.1 (2022年)

**新功能**:
- GPU 支援改善
- 效能優化

### 5.4.x

#### 5.4.91.1 (2021年)

**新功能**:
- GUI 應用支援
- 穩定性改善

## 核心功能

### 內建模組

WSL 核心包含以下模組：

| 模組 | 說明 |
|------|------|
| ext4 | Linux 檔案系統 |
| vfat | FAT 檔案系統 |
| ntfs3 | NTFS 檔案系統 |
| overlayfs | 聯合掛載 |
| bridge | 網路橋接 |
| tun/tap | 虛擬網路 |

### GPU 支援

WSL 2 核心包含：
- NVIDIA CUDA 支援
- DirectML 支援
- OpenGL 支援

## 自訂核心

### 編譯自訂核心

```bash
# 取得核心原始碼
git clone https://github.com/microsoft/WSL2-Linux-Kernel.git
cd WSL2-Linux-Kernel

# 設定
make menuconfig KCONFIG_CONFIG=Microsoft/config-wsl

# 編譯
make -j$(nproc)

# 複製核心
cp arch/x86/boot/bzImage /mnt/c/WSL/custom-kernel
```

### 使用自訂核心

```ini
# .wslconfig
[wsl2]
kernel=C:\\WSL\\custom-kernel
```

## 核心參數

### 預設參數

```bash
# 查看核心參數
cat /proc/cmdline
```

### 自訂參數

```ini
# .wslconfig
[wsl2]
kernelCommandLine = vsyscall=emulate
```

## 更新核心

### 自動更新

核心會隨 WSL 更新自動更新。

```powershell
wsl --update
```

### 手動更新

```powershell
# 下載最新核心
Invoke-WebRequest -Uri "https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi" -OutFile "wsl_update.msi"

# 安裝
Start-Process msiexec.exe -ArgumentList "/i wsl_update.msi" -Wait
```

## 安全性

### CVE 修正

WSL 核心會定期修補安全性漏洞。

查看已修補的 CVE：
- [WSL2-Linux-Kernel Security Advisories](https://github.com/microsoft/WSL2-Linux-Kernel/security/advisories)

### 啟用安全功能

WSL 核心已啟用：
- Kernel Address Space Layout Randomization (KASLR)
- Stack Protector
- Hardened Usercopy

## 疑難排解

### 核心模組問題

```bash
# 查看已載入模組
lsmod

# 載入模組
sudo modprobe module_name

# 查看模組資訊
modinfo module_name
```

### 效能問題

```bash
# 檢查核心訊息
dmesg | tail -50

# 檢查系統資源
cat /proc/meminfo
cat /proc/cpuinfo
```

## 相關主題

- [[一般版本資訊]] - WSL 更新記錄
- [[設定GPU加速]] - GPU 支援
- [[進階設定組態]] - 核心設定

---
> 📚 返回 [[../00-MOCs/MOC-總覽|WSL 知識庫總覽]]
