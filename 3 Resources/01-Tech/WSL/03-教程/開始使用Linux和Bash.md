---
title: 開始使用 Linux 和 Bash
aliases: [Linux 入門, Bash 入門, WSL Linux 基礎]
tags: [wsl, linux, bash, beginner]
created: 2026-05-25
updated: 2026-05-25
status: active
source: https://learn.microsoft.com/zh-tw/windows/wsl/tutorials/linux
---

# 開始使用 Linux 和 Bash

> [!info] 說明
> Linux 和 Bash 的基礎入門指南，適合 Windows 使用者轉換到 WSL。

## Linux 基礎概念

### 檔案系統結構

```
/               # 根目錄
├── home/       # 使用者主目錄
│   └── user/   # 個人目錄
├── etc/        # 系統設定檔
├── var/        # 變數資料 (日誌等)
├── usr/        # 使用者程式
├── bin/        # 基本命令
├── sbin/       # 系統命令
├── tmp/        # 暫存檔
└── mnt/        # 掛載點 (Windows 磁碟)
    ├── c/      # C 槽
    └── d/      # D 槽
```

### 與 Windows 的差異

| Windows | Linux |
|---------|-------|
| `C:\Users\` | `/home/` |
| `\` (反斜線) | `/` (正斜線) |
| 不區分大小寫 | 區分大小寫 |
| `.exe` 副檔名 | 無副檔名要求 |
| 磁碟機代號 | 掛載點 |

## Bash 基本命令

### 檔案與目錄操作

```bash
# 顯示當前目錄
pwd
# /home/username

# 列出檔案
ls
ls -la          # 詳細列表
ls -lh          # 人類可讀大小

# 切換目錄
cd /home/user
cd ..           # 上層目錄
cd ~            # 主目錄
cd -            # 前一個目錄

# 建立目錄
mkdir mydir
mkdir -p a/b/c  # 建立多層目錄

# 建立空檔案
touch file.txt

# 複製
cp file.txt copy.txt
cp -r dir1 dir2  # 複製目錄

# 移動/重新命名
mv old.txt new.txt
mv file.txt /home/user/

# 刪除
rm file.txt
rm -r mydir      # 刪除目錄
rm -rf mydir     # 強制刪除 (小心使用!)
```

### 檔案內容查看

```bash
# 顯示檔案內容
cat file.txt

# 分頁查看
less file.txt
more file.txt

# 查看前幾行
head -n 10 file.txt

# 查看後幾行
tail -n 10 file.txt
tail -f log.txt  # 即時追蹤

# 搜尋內容
grep "keyword" file.txt
grep -r "keyword" ./  # 遞迴搜尋
grep -i "keyword"     # 不區分大小寫
```

### 權限管理

```bash
# 查看權限
ls -l
# -rwxr-xr-x 1 user group 123 Jan 1 file.txt
#  r: 讀取 (4)
#  w: 寫入 (2)
#  x: 執行 (1)

# 變更權限
chmod 755 script.sh   # 數字模式
chmod +x script.sh    # 加入執行權限
chmod u+x script.sh   # 使用者執行權限

# 變更擁有者
sudo chown user:group file.txt

# 變更群組
sudo chgrp group file.txt
```

## 套件管理 (Ubuntu/Debian)

### apt 命令

```bash
# 更新套件清單
sudo apt update

# 升級所有套件
sudo apt upgrade

# 安裝套件
sudo apt install package-name

# 移除套件
sudo apt remove package-name

# 完整移除 (含設定)
sudo apt purge package-name

# 搜尋套件
apt search keyword

# 顯示套件資訊
apt show package-name

# 清理不需要的套件
sudo apt autoremove
sudo apt clean
```

## 進階 Bash 技巧

### 管道與重定向

```bash
# 管道 (|) - 將前一命令的輸出傳給下一命令
cat file.txt | grep "keyword"
ps aux | grep python

# 重定向輸出 (>)
echo "Hello" > file.txt     # 覆蓋
echo "World" >> file.txt    # 附加

# 重定向輸入 (<)
sort < unsorted.txt

# 重定向錯誤 (2>)
command 2> error.log

# 重定向所有輸出 (&>)
command &> all.log
```

### 萬用字元

```bash
# * - 任意字元
ls *.txt
rm file*.log

# ? - 單一字元
ls file?.txt

# [] - 字元範圍
ls file[0-9].txt
ls file[a-z].txt

# {} - 展開
mkdir {dir1,dir2,dir3}
cp file.{txt,bak}
```

### 命令替換

```bash
# $() 語法
echo "Current dir: $(pwd)"
files=$(ls *.txt)

# 反引號 (舊語法)
echo `date`
```

### 別名設定

```bash
# 建立別名
alias ll='ls -la'
alias cls='clear'
alias ..='cd ..'

# 查看所有別名
alias

# 移除別名
unalias ll

# 永久設定 (加入 ~/.bashrc)
echo "alias ll='ls -la'" >> ~/.bashrc
```

## Shell 腳本基礎

### Shebang

```bash
#!/bin/bash
# 腳本開頭，指定解譯器
```

### 變數

```bash
# 定義變數 (等號兩邊不能有空格)
name="John"
age=25

# 使用變數
echo "Name: $name"
echo "Age: ${age}"

# 環境變數
export MY_VAR="value"

# 特殊變數
echo $0      # 腳本名稱
echo $1      # 第一個參數
echo $#      # 參數數量
echo $@      # 所有參數
echo $?      # 上個命令的退出碼
```

### 條件判斷

```bash
# if 語句
if [ -f "file.txt" ]; then
    echo "File exists"
elif [ -d "dir" ]; then
    echo "Directory exists"
else
    echo "Not found"
fi

# 檔案測試
# -f: 檔案存在
# -d: 目錄存在
# -r: 可讀
# -w: 可寫
# -x: 可執行
# -s: 檔案不為空

# 數值比較
if [ $a -eq $b ]; then echo "equal"; fi
# -eq: 等於
# -ne: 不等於
# -gt: 大於
# -lt: 小於
# -ge: 大於等於
# -le: 小於等於

# 字串比較
if [ "$str1" = "$str2" ]; then echo "same"; fi
```

### 迴圈

```bash
# for 迴圈
for i in 1 2 3 4 5; do
    echo $i
done

for file in *.txt; do
    echo "Processing $file"
done

for i in {1..10}; do
    echo $i
done

# while 迴圈
count=0
while [ $count -lt 10 ]; do
    echo $count
    ((count++))
done

# until 迴圈
until [ $count -ge 10 ]; do
    echo $count
    ((count++))
done
```

### 函數

```bash
# 定義函數
greet() {
    echo "Hello, $1!"
}

# 呼叫函數
greet "World"

# 帶回傳值的函數
add() {
    local result=$(($1 + $2))
    echo $result
}

sum=$(add 5 3)
echo "Sum: $sum"
```

## 實用腳本範例

### 備份腳本

```bash
#!/bin/bash
# backup.sh

SOURCE="/home/user/projects"
DEST="/home/user/backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="backup_${DATE}.tar.gz"

# 建立備份目錄
mkdir -p $DEST

# 建立壓縮備份
tar -czf "${DEST}/${BACKUP_NAME}" -C "${SOURCE}" .

echo "Backup created: ${BACKUP_NAME}"
```

### 系統監控

```bash
#!/bin/bash
# monitor.sh

echo "=== System Monitor ==="
echo ""
echo "CPU Usage:"
top -bn1 | grep "Cpu(s)" | awk '{print $2 + $4 "%"}'
echo ""
echo "Memory Usage:"
free -h | grep Mem | awk '{print $3 " / " $2}'
echo ""
echo "Disk Usage:"
df -h | grep -E "^/dev"
echo ""
echo "Active Connections:"
ss -tuln | grep LISTEN | wc -l
```

## 常用快捷鍵

| 快捷鍵 | 功能 |
|--------|------|
| `Ctrl+C` | 中斷當前命令 |
| `Ctrl+D` | 結束輸入/登出 |
| `Ctrl+L` | 清除螢幕 |
| `Ctrl+A` | 游標移到行首 |
| `Ctrl+E` | 游標移到行尾 |
| `Ctrl+U` | 刪除游標前所有內容 |
| `Ctrl+K` | 刪除游標後所有內容 |
| `Ctrl+R` | 搜尋命令歷史 |
| `Tab` | 自動補全 |
| `↑/↓` | 瀏覽命令歷史 |

## 相關主題

- [[安裝WSL]] - WSL 安裝
- [[設定最佳實務做法]] - 環境設定
- [[基本WSL命令]] - WSL 命令參考

---
> 📚 返回 [[../00-MOCs/MOC-總覽|WSL 知識庫總覽]]
