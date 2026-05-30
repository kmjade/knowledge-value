---
aliases: [Windows UI, Windows Shell, Explorer, Taskbar, PowerToys]
tags: [DDC/004.451.8, windows, ui, shell, explorer, powertoys, autohotkey]
created: 2026-05-30
updated: 2026-05-30
type: chapter
chapter: 05
topic: User Interface & Shell
---

# 05 — 用戶界面與 Shell UI & Shell

> Windows 桌面體驗：工作列、開始功能表、虛擬桌面、檔案總管 (Explorer)、Windows Terminal、PowerToys 與 AutoHotkey 自動化。
> Taskbar, Start Menu, Virtual Desktops, Explorer, Windows Terminal, PowerToys, and AutoHotkey.

---

## 桌面體驗核心 Core Desktop Experience

### 工作列 Taskbar

| 功能 | 快捷鍵 | 說明 |
|:-----|:-------|:-----|
| 搜尋 | `Win + S` / `Win + Q` | 開啟搜尋 |
| 工作檢視 | `Win + Tab` | 虛擬桌面 + 時間線 |
| Widgets 面板 | `Win + W` | Win 11 小工具 |
| 快速設定 | `Win + A` | Wi-Fi、藍牙、音量等 |
| 通知中心 | `Win + N` | 通知面板 |
| 鎖定工作列 | Settings | 右鍵工作列 → 工作列設定 |

### 開始功能表 Start Menu

| Win 10 | Win 11 | 功能 |
|:-------|:-------|:-----|
| 左側清單 | 置中圖示 | 應用程式清單 |
| 動態磚 (Live Tiles) | 固定圖示 (Pinned) | 快速啟動 |
| 字母導航 | 字母導航 | 跳轉 |
| 電源選項 | 電源選項 | 關機/重啟/睡眠 |

---

## 虛擬桌面 Virtual Desktops

| 操作 | 快捷鍵 | 備註 |
|:-----|:-------|:-----|
| 新增虛擬桌面 | `Win + Ctrl + D` | |
| 關閉目前桌面 | `Win + Ctrl + F4` | 視窗移至前一桌面 |
| 切換桌面 (往右) | `Win + Ctrl + →` | |
| 切換桌面 (往左) | `Win + Ctrl + ←` | |
| 開啟工作檢視 | `Win + Tab` | 拖曳視窗跨桌面 |
| 重新命名桌面 | Win + Tab → 點擊名稱 | Win 11 |

### 視窗佈局 Snap Layouts (Win 11)

| 佈局 | 快捷鍵 | 說明 |
|:-----|:-------|:-----|
| 靠左半 | `Win + ←` | 左 50% |
| 靠右半 | `Win + →` | 右 50% |
| 最大化 | `Win + ↑` | |
| 最小化 | `Win + ↓` | |
| 象限 | `Win + ←` 再 `↑/↓` | 左上/左下 25% |
| Snap Layouts | `Win + Z` | 視窗上方懸停或快速鍵 |

---

## 檔案總管 Explorer

| 操作 | 快捷鍵 | 說明 |
|:-----|:-------|:-----|
| 開啟 Explorer | `Win + E` | |
| 網址列焦點 | `Alt + D` / `Ctrl + L` | 輸入路徑 |
| 搜尋 | `Ctrl + F` / `Ctrl + E` | Explorer 內搜尋 |
| 上層目錄 | `Alt + ↑` | |
| 重新命名 | `F2` | 選取檔案後 |
| 屬性 | `Alt + Enter` | |
| 顯示隱藏檔 | View → Hidden items | 或 Folder Options |
| 副檔名顯示 | View → File name extensions | |
| 複製路徑 | `Ctrl + Shift + C` | Win 11 (Path Copy) |
| 快速存取 | Pin to Quick Access | 常用目錄 |

---

## Windows Terminal

| 功能 | 快捷鍵 | 說明 |
|:-----|:-------|:-----|
| 新分頁 | `Ctrl + Shift + T` | |
| 新窗格 (垂直) | `Alt + Shift + +` | |
| 新窗格 (水平) | `Alt + Shift + -` | |
| 切換分頁 | `Ctrl + Tab` | |
| 關閉分頁 | `Ctrl + Shift + W` | |
| 搜尋 | `Ctrl + Shift + F` | |
| 放大字型 | `Ctrl + +` | |
| 開啟設定 | `Ctrl + ,` | JSON 設定檔 |

### 安裝與設定

```powershell
winget install Microsoft.WindowsTerminal

# settings.json 位於:
# %LocalAppData%\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\
```

### 設定檔類型 Profiles

| Shell | 路徑 | 圖示 |
|:-----|:-----|:----:|
| PowerShell 7+ | pwsh.exe | 藍 |
| Windows PowerShell 5.1 | powershell.exe | 黑藍 |
| CMD | cmd.exe | 黑 |
| Azure Cloud Shell | az cloud shell | 雲 |
| WSL (Ubuntu) | wsl.exe -d Ubuntu | 🐧 |
| Git Bash | bash.exe | 🍒 |

---

## PowerToys 核心工具

| 工具 | 快捷鍵 | 功能 |
|:-----|:-------|:-----|
| Always On Top | `Win + Ctrl + T` | 視窗置頂 |
| Color Picker | `Win + Shift + C` | 螢幕取色 |
| FancyZones | `Win + Shift + `` ` `` | 自訂視窗佈局 |
| File Locksmith | 右鍵選單 | 查看哪個行程鎖定檔案 |
| Image Resizer | 右鍵選單 | 批次調整圖片大小 |
| Keyboard Manager | — | 重新映射鍵盤 |
| Mouse Utilities | `Win + Shift + H` | 尋找游標/螢光筆 |
| Paste as Plain Text | `Win + Ctrl + Alt + V` | 純文字貼上 |
| PowerRename | 右鍵選單 | 批次重新命名 |
| PowerToys Run | `Alt + Space` | 全域啟動器 |
| Quick Accent | 長按字元 | 重音字元輸入 |
| Screen Ruler | `Win + Shift + M` | 螢幕尺規 |
| Text Extractor | `Win + Shift + T` | OCR 文字擷取 |

```powershell
winget install Microsoft.PowerToys
```

---

## AutoHotkey 快速入門

### 常用腳本範例

```autohotkey
; 快速開啟 Terminal
#t::Run "wt.exe"

; CapsLock → Ctrl
CapsLock::Ctrl

; 快速插入時間戳記
^!d::SendInput FormatTime(, "yyyy-MM-dd HH:mm")

; 文字擴展：@@ → email
::@@::user@example.com

; 視窗透明化 (Alt+Scroll)
!WheelUp::WinSetTrans("+5", "A")
!WheelDown::WinSetTrans("-5", "A")

; 多媒體鍵映射
^!Left::Media_Prev
^!Right::Media_Next
^!Space::Media_Play_Pause
```

---

## Windows 常用快捷鍵總覽

| 類別 | 快捷鍵 | 用途 |
|:----:|:-------|:-----|
| 系統 | `Win + L` | 鎖定 |
| 系統 | `Win + D` | 顯示桌面 (toggle) |
| 系統 | `Win + Pause` | 系統資訊 |
| 系統 | `Win + P` | 投影模式 |
| 系統 | `Ctrl + Shift + Esc` | 工作管理員 |
| 視窗 | `Alt + Tab` | 切換視窗 |
| 視窗 | `Alt + F4` | 關閉視窗 |
| 螢幕 | `Win + Shift + S` | 螢幕截圖 |
| 無障礙 | `Win + +` | 放大鏡 |

---

## 兄弟條目
- [[../004.451.8-Windows-Server/004.451.8-Windows-Server|Windows Server]] — Server Core 無 GUI 管理
