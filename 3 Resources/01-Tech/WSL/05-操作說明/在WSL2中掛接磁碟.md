---
title: 在 WSL 2 中掛接磁碟
aliases: [Mount Disk in WSL, WSL Disk Mount]
tags: [wsl, disk, mount, storage]
created: 2026-05-25
updated: 2026-05-25
status: active
source: https://learn.microsoft.com/zh-tw/windows/wsl/wsl2-mount-disk
---

# 在 WSL 2 中掛接磁碟

> [!info] 說明
> 在 WSL 2 中掛接 Windows 磁碟或 VHD 檔案。

## 支援的磁碟類型

| 類型 | 說明 |
|------|------|
| VHD/VHDX | 虛擬硬碟檔案 |
| 實體磁碟 | Windows 磁碟分割區 |
| ISO 檔案 | 光碟映像檔 |

## 掛接 VHD 檔案

### 建立 VHD

```powershell
# 在 Windows PowerShell (系統管理員) 中
# 建立 10GB 的 VHD
New-VHD -Path "D:\disks\data.vhdx" -SizeBytes 10GB -Dynamic
```

### 掛接 VHD 到 WSL

```powershell
# 掛接 VHD
wsl --mount --vhd "D:\disks\data.vhdx" --bare

# 掛接並格式化 (首次使用)
wsl --mount --vhd "D:\disks\data.vhdx" --type ext4
```

### 在 WSL 中使用

```bash
# 查看掛接的磁碟
lsblk

# 格式化 (如果需要)
sudo mkfs.ext4 /dev/sdx

# 建立掛載點
sudo mkdir /mnt/data

# 掛載
sudo mount /dev/sdx /mnt/data

# 設定權限
sudo chown $USER:$USER /mnt/data
```

## 掛接實體磁碟

### 查看可用磁碟

```powershell
# 列出所有磁碟
wmic diskdrive list brief

# 或使用 PowerShell
Get-Disk | Format-Table Number, FriendlyName, Size
```

### 掛接磁碟

```powershell
# 掛接整個磁碟
wsl --mount \\.\PHYSICALDRIVE0

# 掛接特定分割區
wsl --mount \\.\PHYSICALDRIVE0 --partition 1
```

### 查看分割區

```powershell
# 列出磁碟分割區
Get-Partition -DiskNumber 0 | Format-Table PartitionNumber, Size, Type
```

## 掛接 ISO 檔案

### 方法一：透過 Windows

```powershell
# 先在 Windows 掛接 ISO
Mount-DiskImage -ImagePath "C:\iso\ubuntu.iso"

# ISO 會掛接為磁碟機 (如 E:)
# 然後在 WSL 中存取
ls /mnt/e/
```

### 方法二：直接在 WSL 中掛接

```bash
# 建立掛載點
sudo mkdir -p /mnt/iso

# 掛接 ISO
sudo mount -o loop /mnt/c/path/to/file.iso /mnt/iso
```

## 自動掛載

### 使用 /etc/fstab

```bash
# 編輯 fstab
sudo nano /etc/fstab

# 加入掛載設定
/dev/sdx1    /mnt/data    ext4    defaults    0    2
```

### 使用 systemd (如果啟用)

```ini
# /etc/systemd/system/mnt-data.mount
[Unit]
Description=Mount data disk

[Mount]
What=/dev/sdx1
Where=/mnt/data
Type=ext4
Options=defaults

[Install]
WantedBy=multi-user.target
```

```bash
# 啟用掛載單元
sudo systemctl enable mnt-data.mount
sudo systemctl start mnt-data.mount
```

## 卸載磁碟

### 在 WSL 中卸載

```bash
# 卸載掛載點
sudo umount /mnt/data

# 強制卸載 (如果忙碌)
sudo umount -l /mnt/data
```

### 從 WSL 移除磁碟

```powershell
# 卸載 VHD
wsl --unmount --vhd "D:\disks\data.vhdx"

# 卸載實體磁碟
wsl --unmount \\.\PHYSICALDRIVE0
```

## 掛接選項

### 常用掛接選項

```bash
# 唯讀
sudo mount -o ro /dev/sdx1 /mnt/data

# 讀寫
sudo mount -o rw /dev/sdx1 /mnt/data

# 不更新存取時間
sudo mount -o noatime /dev/sdx1 /mnt/data

# 指定檔案系統類型
sudo mount -t ext4 /dev/sdx1 /mnt/data
sudo mount -t ntfs /dev/sdx1 /mnt/data
```

### NTFS 掛接

```bash
# 掛接 NTFS 磁碟
sudo mount -t ntfs-3g /dev/sdx1 /mnt/ntfs

# 如果 ntfs-3g 未安裝
sudo apt install ntfs-3g
```

## 檔案系統維護

### 檢查檔案系統

```bash
# 檢查 ext4 檔案系統
sudo e2fsck /dev/sdx1

# 檢查並修復
sudo e2fsck -p /dev/sdx1

# 強制檢查
sudo e2fsck -f /dev/sdx1
```

### 調整檔案系統大小

```bash
# 調整 ext4 檔案系統大小
sudo resize2fs /dev/sdx1

# 調整到特定大小
sudo resize2fs /dev/sdx1 5G
```

## 疑難排解

### 磁碟忙碌無法卸載

```bash
# 查看誰在使用
lsof /mnt/data

# 或使用 fuser
fuser -v /mnt/data

# 終止使用程序
fuser -k /mnt/data
```

### 掛接權限問題

```bash
# 掛接時指定權限
sudo mount -o uid=1000,gid=1000 /dev/sdx1 /mnt/data

# 或在 fstab 中設定
/dev/sdx1    /mnt/data    ext4    defaults,uid=1000,gid=1000    0    2
```

### 磁碟未顯示

```powershell
# 確認磁碟已正確掛接
wsl --mount --vhd "D:\disks\data.vhdx" --bare

# 在 WSL 中重新掃描
lsblk
```

## 相關主題

- [[管理可用的磁碟空間]] - 磁碟空間管理
- [[跨文件系統工作]] - 跨系統檔案操作
- [[故障排除]] - 常見問題

---
> 📚 返回 [[../00-MOCs/MOC-總覽|WSL 知識庫總覽]]
