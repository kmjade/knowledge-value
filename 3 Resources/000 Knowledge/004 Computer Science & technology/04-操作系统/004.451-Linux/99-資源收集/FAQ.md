---
aliases: [Linux FAQ, Linux 常见问题, Linux Troubleshooting]
tags: [DDC/004.451, linux, faq, troubleshooting]
created: 2026-05-30
---

# Linux 常見問題 FAQ

> 收錄日常使用與管理中最常見的 Linux 問題與快速解答。
> Frequently asked questions and quick answers for Linux administration.

## 安裝與啟動 Installation & Boot

**Q: 如何製作 USB 開機碟？**
```bash
# Linux
dd if=ubuntu.iso of=/dev/sdb bs=4M status=progress
# Windows: 使用 Rufus 或 balenaEtcher
```

**Q: GRUB 選單不顯示 / 直接進入 Windows？**
```bash
# 從 Live USB 進入，掛載 EFI 分割區
mount /dev/nvme0n1p1 /mnt
grub-install --target=x86_64-efi --efi-directory=/mnt --bootloader-id=GRUB
update-grub
```

**Q: 忘記 root 密碼怎麼辦？**
1. GRUB 選單按 `e` 編輯
2. 在 `linux` 行末加 `init=/bin/bash`
3. `mount -o remount,rw /`
4. `passwd` 修改密碼後重啟

## 套件管理 Package Management

**Q: `apt update` 報 GPG 錯誤？**
```bash
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys <KEY_ID>
# 或重新添加 repository GPG key
```

**Q: dpkg 鎖定錯誤 (lock)？**
```bash
sudo lsof /var/lib/dpkg/lock-frontend    # 查看誰在鎖定
sudo kill -9 <PID>
sudo rm /var/lib/dpkg/lock-frontend
sudo dpkg --configure -a                  # 修復中斷的安裝
```

**Q: 如何降級套件？**
```bash
# Debian/Ubuntu
apt install package=version
# Arch — 從 cache 或 downgrade 工具
pacman -U /var/cache/pacman/pkg/package-old.pkg.tar.zst
```

## 網路網路 Networking

**Q: 如何設定靜態 IP？**
```bash
# Netplan (Ubuntu 18.04+) — /etc/netplan/01-netcfg.yaml
network:
  ethernets:
    eth0:
      addresses: [192.168.1.100/24]
      routes:
        - to: default
          via: 192.168.1.1
      nameservers:
        addresses: [8.8.8.8, 1.1.1.1]
sudo netplan apply
```

**Q: DNS 無法解析？**
```bash
# systemd-resolved 常見問題
resolvectl status
sudo systemctl restart systemd-resolved
# 檢查 /etc/resolv.conf 是否指向 127.0.0.53
```

## 磁碟與檔案系統 Disk & FS

**Q: 磁碟滿了但找不到大檔案？**
```bash
du -sh /* 2>/dev/null | sort -rh | head -20    # 根目錄大小排名
ncdu /                                          # 互動式磁碟分析 (需安裝)
# 檢查已刪除但行程仍佔用的檔案
lsof +L1 | grep deleted
```

**Q: inode 用完了怎麼辦？**
```bash
df -i                     # 查看 inode 使用率
# 常見原因：大量小檔案 (cache, tmp files, 舊核心模組)
find /path -type f -size 0 -delete   # 刪除空檔案
apt autoremove --purge               # 清理舊核心
```

## 效能 Performance

**Q: 系統很慢，如何診斷？**
```bash
top                     # → 看 load average / CPU / 哪個行程吃資源
iostat -x 1             # → 看 %iowait 判斷是否 I/O 瓶頸
free -h                 # → 看 swap 使用量
dmesg | tail -20        # → 看核心是否有異常
```

## 使用者與權限 Users

**Q: 不小心執行了 `chmod -R 777 /` 怎麼辦？**
> 這是非常危險的操作，最好的恢復方式是從備份還原。沒有備份的情況下，重裝系統、保留 `/home` 是最現實的方案。**千萬不要做。**

**Q: 如何新增 sudo 使用者？**
```bash
adduser newuser
usermod -aG sudo newuser       # Debian/Ubuntu
usermod -aG wheel newuser      # RHEL/Fedora/Arch
```
