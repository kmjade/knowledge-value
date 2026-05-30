---
aliases: [Linux Shell, Bash, Command Line, Linux 命令行]
tags: [DDC/004.451, linux, shell, bash, cli]
created: 2026-05-30
---

# 03 Shell 與命令列 Shell & CLI

> Shell 是使用者與 Linux kernel 之間的介面。Bash 為預設 shell，Zsh 提供更強的自動補全。管道與重定向是 Unix 哲學「小工具組合」的核心。

## Shell 對比 Shell Comparison

| Shell | 特點 Features | 設定檔 Config |
|------|------|------|
| **Bash** | GNU 標準，相容性最佳 | `~/.bashrc`, `~/.bash_profile` |
| **Zsh** | 更強補全、主題 (Oh My Zsh) | `~/.zshrc` |
| **Fish** | 開箱即用，語法高亮 | `~/.config/fish/config.fish` |
| **Dash** | 精簡 POSIX shell (Debian /bin/sh) | `~/.profile` |
| **Nushell** | 結構化資料 (tables)，跨平台 | `~/.config/nushell/` |

## 管道與重定向 Pipes & Redirections

| 符號 | 作用 | 範例 |
|:---:|------|------|
| `\|` | 管道：前指令 stdout → 後指令 stdin | `ps aux \| grep nginx` |
| `>` | 重定向 stdout (覆寫) | `echo hi > file.txt` |
| `>>` | 重定向 stdout (追加) | `echo hi >> file.txt` |
| `2>` | 重定向 stderr | `cmd 2> err.log` |
| `&>` | 重定向 stdout + stderr | `cmd &> all.log` |
| `<` | 重定向 stdin | `sort < data.txt` |
| `<<` | Here-document | `cat << EOF ... EOF` |
| `<<<` | Here-string | `grep foo <<< "bar"` |

## 文字處理三劍客 grep / awk / sed

```bash
# grep — 搜尋文字
grep -rn "error" /var/log/          # 遞迴搜尋含 error 的行
grep -c "200" access.log            # 計數
grep -v "DEBUG" app.log             # 排除匹配行

# awk — 欄位處理
awk '{print $1, $7}' access.log     # 列印第 1、7 欄
awk '$9 == 500 {count++} END {print count}'  # 統計 500 錯誤
df -h | awk '$5+0 > 80 {print $1, $5}'      # 磁碟使用率 > 80%

# sed — 串流編輯
sed 's/old/new/g' file.txt          # 替換所有
sed -i 's/^#//' /etc/conf           # 移除行首註解 (就地)
sed -n '10,20p' file.txt            # 列印第 10-20 行
```

## 終端機管理 Terminal Multiplexers

| 工具 | 特點 | 常用指令 |
|------|------|------|
| **tmux** | 現代、支援分割視窗 | `tmux new -s`, `Ctrl-b %`, `Ctrl-b "` |
| **screen** | 老牌穩定 | `screen -S`, `Ctrl-a d` detach |

```bash
tmux new -s dev          # 新 session
tmux ls                  # 列出 sessions
tmux attach -t dev       # 重新連接
Ctrl-b d                 # detach (離開但保留)
```

## 環境變數與快捷鍵

```bash
# 環境變數
echo $PATH               # 可執行檔搜尋路徑
export VAR=value         # 設定變數
env                      # 列出所有環境變數

# 常用快捷鍵 (Bash/Readline)
Ctrl-a    # 跳到行首
Ctrl-e    # 跳到行尾
Ctrl-r    # 反向搜尋歷史
Ctrl-l    # 清除螢幕
Ctrl-u    # 刪除游標前全部
Ctrl-k    # 刪除游標後全部
!!        # 重複上一個指令
!$        # 上一個指令的最後參數
```

## 簡單腳本範例 Scripting Basics

```bash
#!/bin/bash
# check_service.sh — 檢查服務狀態
SERVICE="nginx"
if systemctl is-active --quiet "$SERVICE"; then
    echo "$SERVICE is running"
else
    echo "$SERVICE is DOWN — restarting..."
    systemctl restart "$SERVICE"
fi
```
