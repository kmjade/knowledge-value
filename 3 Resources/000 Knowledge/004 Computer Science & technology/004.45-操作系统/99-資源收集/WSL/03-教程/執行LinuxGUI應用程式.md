---
title: 執行 Linux GUI 應用程式
aliases: [WSL GUI, WSLg, Linux GUI on Windows]
tags: [wsl, gui, wslg, desktop]
created: 2026-05-25
updated: 2026-05-25
status: active
source: https://learn.microsoft.com/zh-tw/windows/wsl/tutorials/gui-apps
---

# 執行 Linux GUI 應用程式

> [!info] 說明
> WSL 2 支援執行 Linux GUI 應用程式 (WSLg)，可直接在 Windows 上使用 Linux 圖形化應用程式。

## WSLg 架構

```mermaid
graph LR
    A[Linux GUI App] --> B[Wayland/X11]
    B --> C[Weston]
    C --> D[RDP]
    D --> E[Windows]
    E --> F[顯示視窗]
```

## 系統需求

| 需求 | 版本 |
|------|------|
| Windows | 10 19044+ / 11 |
| WSL | 2 |
| WSL 版本 | 0.47.1+ |

## 安裝 WSLg

### 檢查 WSL 版本

```bash
# 在 Windows PowerShell
wsl --version

# 輸出應包含:
# WSL 版本: 2.0.x
# 內核版本: 5.x.x
# WSLg 版本: 1.0.x
```

### 啟用 WSLg

WSLg 在較新版本的 WSL 2 中預設已啟用。

```bash
# 更新 WSL 以確保支援
wsl --update
```

## 執行 GUI 應用程式

### 基本範例

```bash
# 安裝並執行 GNOME 計算機
sudo apt install gnome-calculator -y
gnome-calculator

# 安裝並執行 GIMP
sudo apt install gimp -y
gimp

# 安裝並執行 Firefox
sudo apt install firefox -y
firefox
```

### 開發工具

```bash
# VS Code (Linux 版)
sudo snap install code --classic
code

# JetBrains IDE (如 PyCharm)
sudo snap install pycharm-community --classic
pycharm-community

# Gedit 文字編輯器
sudo apt install gedit -y
gedit
```

### 媒體應用

```bash
# VLC 媒體播放器
sudo apt install vlc -y
vlc

# Rhythmbox 音樂播放器
sudo apt install rhythmbox -y
rhythmbox
```

## 從 Windows 啟動

### 建立捷徑

Linux GUI 應用程式會自動出現在 Windows 開始功能表中。

```
開始功能表 → 所有應用程式 → Ubuntu → [應用程式名稱]
```

### 命令列啟動

```powershell
# 在 Windows PowerShell 中
wsl -d Ubuntu gimp

# 或直接使用應用程式名稱
wsl gedit /mnt/c/Users/file.txt
```

## 音訊和麥克風支援

WSLg 支援音訊輸出和輸入。

```bash
# 安裝 PulseAudio 工具
sudo apt install pulseaudio-utils -y

# 測試音訊
speaker-test -t wav -c 2

# 檢查音訊裝置
pactl list sinks
```

## 剪貼簿整合

WSLg 支援 Windows 和 Linux 之間的剪貼簿共用：

- **複製**: Ctrl+C (Linux 應用程式)
- **貼上**: Ctrl+V (Windows 應用程式)

## 檔案關聯

### 設定預設應用程式

Linux GUI 應用程式可以設定為檔案的預設開啟程式。

```bash
# 檢視檔案類型關聯
xdg-mime query default text/plain

# 設定預設應用程式
xdg-mime default gedit.desktop text/plain
```

## WSLg 設定

### 設定檔位置

```
%UserProfile%\.wslconfig
```

### 設定範例

```ini
[wsl2]
# GUI 應用程式支援
guiApplications=true

[snapshot]
# 快照設定
```

## 多視窗支援

### 多視窗模式

WSLg 支援：
- 單一視窗模式
- 多視窗模式 (預設)

```bash
# 應用程式會在獨立視窗中開啟
gimp &
firefox &
```

### HiDPI 支援

```bash
# 設定縮放比例
export GDK_SCALE=2
export QT_SCALE_FACTOR=2

# 啟動應用程式
gedit
```

## 效能優化

### Wayland vs X11

WSLg 預設使用 Wayland，效能較佳。

```bash
# 強制使用 X11 (如果需要)
export WAYLAND_DISPLAY=
export DISPLAY=:0
```

### 硬體加速

WSLg 支援 GPU 加速渲染。

```bash
# 檢查 OpenGL 支援
glxinfo | grep "OpenGL renderer"
```

## 疑難排解

### GUI 應用程式無法啟動

```bash
# 檢查 Wayland 服務
ls -la /mnt/wslg/

# 應該看到:
# drwxrwxrwx 2 root root 0 ... Wayland-0
# drwxrwxrwx 2 root root 0 ... X11-unix
```

### 顯示錯誤

```bash
# 檢查 DISPLAY 環境變數
echo $DISPLAY
# 應該輸出: :0

# 檢查 WAYLAND_DISPLAY
echo $WAYLAND_DISPLAY
# 應該輸出: wayland-0
```

### 音訊問題

```bash
# 檢查 PulseAudio
pactl info

# 重新啟動 WSL
# 在 Windows PowerShell:
wsl --shutdown
wsl
```

### 應用程式模糊

```bash
# 設定 DPI 縮放
export GDK_SCALE=2
export GDK_DPI_SCALE=0.5
```

## 常見應用程式安裝

```bash
# 辦公軟體
sudo apt install libreoffice -y

# 開發工具
sudo apt install codeblocks -y
sudo apt install eclipse -y

# 圖形設計
sudo apt install inkscape -y
sudo apt install blender -y

# 終端機
sudo apt install gnome-terminal -y
```

## 相關主題

- [[安裝WSL]] - 安裝指南
- [[進階設定組態]] - WSL 設定
- [[故障排除]] - 常見問題

---
> 📚 返回 [[0 Inbox/_processed/01-Tech/WSL/00-MOCs/MOC-總覽|WSL 知識庫總覽]]
