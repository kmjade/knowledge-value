---
title: 匯入任何 Linux 發行版
aliases: [Import Linux Distro, WSL Custom Distro]
tags: [wsl, distro, import, custom]
created: 2026-05-25
updated: 2026-05-25
status: active
source: https://learn.microsoft.com/zh-tw/windows/wsl/use-custom-distro
---

# 匯入任何 Linux 發行版

> [!info] 說明
> 將任何 Linux 發行版匯入到 WSL 中使用。

## 支援的來源格式

| 格式 | 說明 |
|------|------|
| `.tar` | TAR 封存檔 |
| `.tar.gz` | 壓縮的 TAR 封存檔 |
| Docker 映像檔 | 從 Docker Hub 匯入 |

## 從 TAR 檔匯入

### 基本語法

```bash
wsl --import <發行版名稱> <安裝位置> <來源檔案>
```

### 匯入步驟

```powershell
# 1. 建立 TAR 檔 (在 Linux 系統中)
# 或下載現成的發行版 TAR 檔

# 2. 匯入到 WSL
wsl --import MyDistro D:\WSL\MyDistro C:\Downloads\distro.tar.gz

# 3. 啟動發行版
wsl -d MyDistro
```

### 取得發行版 TAR 檔

#### 從 Docker 匯出

```bash
# 從 Docker 容器建立 TAR
docker export container_name > distro.tar

# 或從 Docker 映像檔
docker run --name temp alpine
docker export temp > alpine.tar
docker rm temp
```

#### 從現有 Linux 系統建立

```bash
# 在 Linux 系統中
sudo tar --numeric-owner -czvf distro.tar.gz /
```

## 從 Docker Hub 匯入

### 直接匯入 Docker 映像檔

```powershell
# 1. 拉取 Docker 映像檔
docker pull alpine:latest

# 2. 匯出為 TAR
docker run --name temp alpine
docker export temp > alpine.tar

# 3. 匯入到 WSL
wsl --import Alpine D:\WSL\Alpine alpine.tar

# 4. 清理
docker rm temp
```

## 設定預設使用者

匯入的發行版預設會以 root 登入。需要設定一般使用者。

### 建立 .wslconfig (方法一)

```bash
# 在匯入的發行版中
# 建立使用者
useradd -m -s /bin/bash username
passwd username
usermod -aG sudo username

# 建立 /etc/wsl.conf
cat > /etc/wsl.conf << 'EOF'
[user]
default = username
EOF
```

### 使用登錄檔 (方法二)

```powershell
# 在 Windows PowerShell 中
# 取得發行版 ID
$distro = "MyDistro"
$id = (Get-ChildItem "HKCU:\Software\Microsoft\Windows\CurrentVersion\Lxss" | Where-Object { $_.GetValue("DistributionName") -eq $distro }).PSChildName

# 設定預設使用者 (需要使用者 UID)
Set-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Lxss\$id" -Name "DefaultUid" -Value 1000
```

## 常見發行版匯入範例

### Alpine Linux

```powershell
# 下載 Alpine minirootfs
Invoke-WebRequest -Uri https://dl-cdn.alpinelinux.org/alpine/v3.19/releases/x86_64/alpine-minirootfs-3.19.0-x86_64.tar.gz -OutFile alpine.tar.gz

# 匯入
wsl --import Alpine D:\WSL\Alpine alpine.tar.gz

# 設定
wsl -d Alpine
# 在 Alpine 內
apk update
apk add bash sudo
adduser -D -s /bin/bash username
addgroup username wheel
echo '%wheel ALL=(ALL) ALL' >> /etc/sudoers
```

### Arch Linux

```powershell
# 下載 Arch Linux bootstrap
Invoke-WebRequest -Uri https://archive.archlinux.org/iso/2024.01.01/archlinux-bootstrap-2024.01.01-x86_64.tar.gz -OutFile arch.tar.gz

# 匯入
wsl --import Arch D:\WSL\Arch arch.tar.gz

# 設定
wsl -d Arch
# 在 Arch 內
pacman-key --init
pacman-key --populate archlinux
pacman -Syu
useradd -m -G wheel -s /bin/bash username
```

### CentOS

```powershell
# 使用 Docker 匯出
docker pull centos:stream9
docker run --name temp centos:stream9
docker export temp > centos.tar
docker rm temp

# 匯入
wsl --import CentOS D:\WSL\CentOS centos.tar
```

## 匯出發行版

```powershell
# 匯出為 TAR 檔
wsl --export Ubuntu D:\Backup\ubuntu-backup.tar

# 匯出並壓縮
wsl --export Ubuntu D:\Backup\ubuntu-backup.tar
# 然後使用 7-Zip 或其他工具壓縮
```

## 管理匯入的發行版

### 列出所有發行版

```powershell
wsl --list --verbose
```

### 設定預設發行版

```powershell
wsl --set-default MyDistro
```

### 刪除發行版

```powershell
# 取消註冊 (會刪除所有資料)
wsl --unregister MyDistro
```

### 移動發行版位置

```powershell
# 1. 匯出
wsl --export MyDistro mydistro.tar

# 2. 取消註冊
wsl --unregister MyDistro

# 3. 匯入到新位置
wsl --import MyDistro D:\NewLocation\ mydistro.tar

# 4. 刪除暫存檔
del mydistro.tar
```

## 疑難排解

### 匯入失敗

```powershell
# 檢查 TAR 檔案格式
# 確保是完整的 rootfs

# 檢查磁碟空間
# 確保目標位置有足夠空間
```

### 無法啟動

```bash
# 檢查發行版狀態
wsl --list --verbose

# 查看詳細錯誤
wsl -d MyDistro --debug
```

### 權限問題

```bash
# 確保 TAR 檔案包含正確的權限
# 建立 TAR 時使用 --numeric-owner 選項
sudo tar --numeric-owner -czvf distro.tar.gz /
```

## 相關主題

- [[建置自訂發行版]] - 建立自訂發行版
- [[基本WSL命令]] - WSL 命令參考
- [[安裝WSL]] - 安裝指南

---
> 📚 返回 [[0 Inbox/_processed/01-Tech/WSL/00-MOCs/MOC-總覽|WSL 知識庫總覽]]
