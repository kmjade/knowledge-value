---
aliases: [macOS Terminal, zsh, Homebrew, iTerm2, macOS CLI]
tags: [DDC/004.451, macos, terminal, zsh, homebrew, cli]
created: 2026-05-30
---

# 03 終端與 Shell Terminal & Shell

> macOS Catalina (10.15) 起預設 shell 為 zsh。Homebrew 是 macOS 的第三方套件管理器。macOS 特有 CLI 工具：pbcopy/pbpaste、mdfind、open、caffeinate 等。

## Shell 環境 Shell Environment

| 項目 | 說明 | 路徑 |
|------|------|------|
| **預設 Shell** | zsh (10.15+) / bash (10.14 以下) | `/bin/zsh` |
| **設定檔** | `~/.zshrc`, `~/.zprofile` | 使用者自訂 |
| **系統設定** | `/etc/zshrc`, `/etc/zshenv` | 全域設定 |
| **變更 Shell** | `chsh -s /bin/zsh` | 立即生效 |

## 終端應用 Terminal Apps

| 應用 | 特點 | 適用場景 |
|------|------|------|
| **Terminal.app** | 系統內建，穩定 | 日常使用 |
| **iTerm2** | 分割視窗、熱鍵喚出、GPU 渲染 | 進階開發者 |
| **Warp** | Rust-based，AI 輔助、團隊共享 | 現代終端體驗 |
| **Alacritty** | GPU 加速，極簡高效 | 極客/vim 用戶 |

## Homebrew 快速設定 Homebrew Quick Setup

```bash
# 安裝 Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 基礎套件
brew install git wget curl htop bat fd ripgrep jq fzf
brew install --cask iterm2 visual-studio-code

# 維護
brew update && brew upgrade      # 更新並升級
brew cleanup                     # 清理舊版
brew doctor                      # 診斷問題
```

## macOS 特有 CLI 工具 Unique macOS CLI Tools

```bash
# pbcopy / pbpaste — 系統剪貼簿
echo "hello" | pbcopy            # 複製到剪貼簿
pbpaste > clipboard.txt          # 貼出剪貼簿內容

# mdfind — Spotlight 搜尋
mdfind "kind:pdf 發票"           # 搜尋 PDF 含"發票"
mdfind -onlyin ~/Documents "kMDItemDisplayName == *report*"

# open — 從終端開啟檔案/應用
open .                            # Finder 開啟目前目錄
open -a "Google Chrome" url       # 指定應用開啟
open -e file.txt                  # TextEdit 開啟

# caffeinate — 防止休眠
caffeinate -i make -j8            # 編譯期間不讓系統休眠
caffeinate -d -t 3600             # 螢幕不休眠 1 小時

# say / screencapture / shortcuts
say "Build complete"              # 語音通知
screencapture -C screen.png       # 截圖到剪貼簿
```
