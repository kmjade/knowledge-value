---
aliases: [macOS FAQ, macOS 常见问题, macOS Troubleshooting]
tags: [DDC/004.451, macos, faq, troubleshooting]
created: 2026-05-30
---

# macOS 常見問題 FAQ

> 收錄日常使用與管理中最常見的 macOS 問題與快速解答。
> Frequently asked questions and quick answers for macOS administration.

## 安裝與開機 Installation & Boot

**Q: 無法開機，如何進入 Recovery 模式？**
| Mac 類型 | 按鍵 |
|------|------|
| Intel Mac | 開機按住 `Cmd+R` |
| Apple Silicon | 關機後按住電源鍵直到出現「啟動選項」 |

**Q: 系統檔案損壞，如何重新安裝 macOS 但保留資料？**
Recovery 模式 → 重新安裝 macOS → 選擇相同版本，系統會保留使用者資料與設定。

**Q: 如何製作 macOS USB 安裝碟？**
```bash
# 下載 macOS installer 後
sudo /Applications/Install\ macOS\ Sequoia.app/Contents/Resources/createinstallmedia \
  --volume /Volumes/MyUSB
```

## Homebrew 與套件管理

**Q: Homebrew 安裝後 `brew: command not found`？**
```bash
# Apple Silicon 預設路徑未加入 PATH
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zshrc
source ~/.zshrc
```

**Q: M1/M2/M3/M4 Mac 上 Homebrew 在哪？**
Intel Mac：`/usr/local/Homebrew/`
Apple Silicon：`/opt/homebrew/`

**Q: brew 安裝很慢？**
```bash
# 更換上游鏡像 (中科大)
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.ustc.edu.cn/brew.git"
export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.ustc.edu.cn/homebrew-core.git"
brew update
```

## 終端與權限

**Q: `Operation not permitted` 錯誤？**
可能是 SIP 保護或 TCC 權限不足。檢查：
1. 系統設定 → 隱私權 → 完整磁碟存取 → 加入 Terminal.app
2. 檢查 SIP：`csrutil status`

**Q: 如何讓終端可以存取整個磁碟？**
系統設定 → 隱私權與安全性 → 完整磁碟存取 → 加入 Terminal.app (或 iTerm2.app)

## 磁碟與備份

**Q: 磁碟空間不足，但找不到大檔案？**
```bash
# 檢查系統資料
sudo du -sh /System/Volumes/Data/* 2>/dev/null | sort -rh | head -20

# 檢查 Time Machine 本機快照
tmutil listlocalsnapshots /
sudo tmutil deletelocalsnapshots /   # 刪除所有本機快照

# 檢查 iOS 備份
du -sh ~/Library/Application\ Support/MobileSync/Backup/
```

**Q: 「您的系統已用完應用程式記憶體」錯誤？**
macOS 虛擬記憶體不足 (swap 耗盡)。檢查：
```bash
sysctl vm.swapusage                  # swap 使用量
vm_stat                              # 虛擬記憶體詳情
# 解法：關閉高記憶體應用、釋放 swap (重啟)
```

## 開發環境

**Q: `xcode-select: error: tool 'xcodebuild' requires Xcode`？**
```bash
xcode-select --install               # 僅安裝 CLT (1.5GB)
# 若需要完整 Xcode (SwiftUI preview 等)
# mas install 497799835 (約 12GB)
```

**Q: Rosetta 2 不安裝怎麼辦？**
```bash
# 執行任意 x86 程式即可觸發安裝提示
softwareupdate --install-rosetta
```

**Q: `xcrun: error: unable to find utility "xcodebuild"`？**
```bash
sudo xcode-select --reset            # 重置 Xcode 路徑
sudo xcode-select -s /Applications/Xcode.app
```

## 網路與安全

**Q: 如何完全關閉防火牆？**
```bash
sudo pfctl -d                        # 停用 pf
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setglobalstate off
```

**Q: SSH 連線總是斷？**
```bash
# ~/.ssh/config
Host *
    ServerAliveInterval 60
    ServerAliveCountMax 5
    TCPKeepAlive yes
```

## 系統自訂

**Q: 顯示隱藏檔案？**
```bash
# Finder 顯示隱藏檔
defaults write com.apple.finder AppleShowAllFiles TRUE
killall Finder
# 快速切換：Cmd+Shift+. (macOS Sierra+)
```

**Q: Dock 動畫太慢？**
```bash
defaults write com.apple.dock autohide-time-modifier -float 0
defaults write com.apple.dock autohide-delay -float 0
killall Dock
```
