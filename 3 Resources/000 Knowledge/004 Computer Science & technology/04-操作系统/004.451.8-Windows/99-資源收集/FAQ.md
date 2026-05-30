---
aliases: [Windows FAQ, Windows 常見問題, Troubleshooting Quick Reference]
tags: [DDC/004.451.8, windows, faq, troubleshooting, quick-reference]
created: 2026-05-30
updated: 2026-05-30
type: resource
topic: Windows FAQ & Quick Reference
---

# Windows Desktop — FAQ 常見問題

> 實務常見問題速查：系統疑難、快捷鍵、命令速查與常見錯誤解決方案。
> Frequently asked questions, quick fixes, and common error resolutions.

---

## 系統管理 FAQ

### Q: 如何快速開啟系統管理工具？

| 工具 | 指令 | 快捷鍵 |
|:-----|:-----|:-------|
| 工作管理員 | `taskmgr` | `Ctrl + Shift + Esc` |
| 裝置管理員 | `devmgmt.msc` | `Win + X → M` |
| 磁碟管理 | `diskmgmt.msc` | `Win + X → K` |
| 服務 | `services.msc` | — |
| 事件檢視器 | `eventvwr.msc` | — |
| 系統資訊 | `msinfo32` | `Win + Pause` |
| 系統設定 | `msconfig` | — |
| 登錄編輯器 | `regedit` | — |
| 群組原則 | `gpedit.msc` | — |
| 效能監視器 | `perfmon` | — |
| 資源監視器 | `resmon` | — |
| 本機安全性原則 | `secpol.msc` | — |
| 防火牆進階 | `wf.msc` | — |
| 工作排程器 | `taskschd.msc` | — |

### Q: Windows 開機變慢，如何診斷？

1. Task Manager → Startup → 查看啟動影響
2. `msconfig` → 選擇性啟動 → 載入系統服務
3. `perfmon /rel` → 查看可靠性歷史
4. Event Viewer → System 記錄篩選開機事件
5. `powercfg /energy` 能源報告
6. Autoruns (Sysinternals) 完整啟動項掃描

### Q: 如何查看 Windows 是原版還是盜版？

```cmd
slmgr /dli        # 授權資訊 (彈窗)
slmgr /dlv        # 詳細授權資訊
slmgr /xpr        # 啟用到期日
```

### Q: Windows 更新卡住怎麼辦？

```cmd
net stop wuauserv
net stop bits
net stop cryptsvc
del /f /q %SystemRoot%\SoftwareDistribution\*
del /f /q %SystemRoot%\System32\catroot2\*
net start wuauserv
net start bits
net start cryptsvc
wuauclt /detectnow
```

或使用 Windows Update Troubleshooter: `msdt.exe /id WindowsUpdateDiagnostic`

---

## 疑難排解 FAQ

### Q: 藍屏 (BSOD) 發生後如何分析？

1. 查看 `%SystemRoot%\Minidump\` 中的 `.dmp` 檔案
2. 使用 WinDbg → `!analyze -v`
3. 或用 BlueScreenView (NirSoft) 快速查看
4. 對照 BugCheck 代碼表（參見 [[09-故障诊断与优化|09-診斷與優化]]）

### Q: 系統檔案損毀如何修復？

```cmd
# 完整修復流程
DISM /Online /Cleanup-Image /RestoreHealth
sfc /scannow
# 若仍失敗，使用安裝媒體離線修復
```

### Q: 硬碟空間被什麼佔用了？

| 工具 | 指令 |
|:-----|:-----|
| 儲存感知 | Settings → System → Storage |
| 樹狀大小 | TreeSize Free / WinDirStat |
| WizTree | 最快分析 (讀取 MFT) |
| 命令列 | `vssadmin list shadowstorage` (陰影複製) |

```cmd
# 清理 Windows 元件庫
DISM /Online /Cleanup-Image /StartComponentCleanup /ResetBase
```

### Q: 忘記 Windows 密碼怎麼辦？

| 情境 | 解決方案 |
|:-----|:---------|
| Microsoft 帳戶 | https://account.live.com/password/reset |
| 本機帳戶 (有密碼重設磁碟) | 登入畫面 → Reset Password → 插入 USB |
| 本機帳戶 (無密碼重設磁碟) | 需第三方工具或重灌（無官方支援） |

---

## 網路 FAQ

### Q: DNS 解析有問題？

```cmd
ipconfig /flushdns
ipconfig /registerdns
nslookup google.com
# 切換 DNS 為公用
netsh interface ip set dns "乙太網路" static 8.8.8.8
netsh interface ip add dns "乙太網路" 1.1.1.1 index=2
```

### Q: 如何重設整個網路堆疊？

```cmd
ipconfig /release
ipconfig /renew
ipconfig /flushdns
netsh winsock reset
netsh int ip reset
netsh winhttp reset proxy
:: 接著重新開機
```

### Q: RDP 無法連線？

1. 檢查目標電腦 RDP 是否啟用
2. 防火牆 `wf.msc` → 確認 TCP 3389 允許
3. `netstat -ano | findstr 3389` 確認監聽
4. 檢查 Reg: `HKLM\SYSTEM\CurrentControlSet\Control\Terminal Server\fDenyTSConnections` = 0
5. 確認非 Home 版 (Home 無 RDP Host)

---

## 開發環境 FAQ

### Q: WSL 2 和 Docker 衝突？

```
1. Docker Desktop → Settings → Resources → WSL Integration → 啟用正確發行版
2. 確認 .wslconfig 記憶體分配足夠
3. 若 IP 衝突：重啟 WSL → wsl --shutdown
```

### Q: winget 找不到套件？

```powershell
winget source update           # 更新來源
winget search <keyword>        # 重新搜尋
# 或用 scoop / choco 作為互補
```

---

## 快捷鍵速查 Quick Shortcuts

### 系統快捷鍵

| 快捷鍵 | 功能 |
|:-------|:-----|
| `Win + D` | 顯示桌面 (toggle) |
| `Win + E` | 檔案總管 |
| `Win + I` | 設定 |
| `Win + L` | 鎖定 |
| `Win + R` | 執行 |
| `Win + X` | 快速連結選單 |
| `Win + V` | 剪貼簿歷史 |
| `Win + Tab` | 工作檢視 |
| `Win + .` / `Win + ;` | 表情符號 |
| `Win + Shift + S` | 螢幕擷取 |

### 視窗管理

| 快捷鍵 | 功能 |
|:-------|:-----|
| `Win + ←/→` | 視窗靠左/右 |
| `Win + ↑` | 最大化 |
| `Win + ↓` | 最小化/還原 |
| `Win + Ctrl + D` | 新增虛擬桌面 |
| `Win + Ctrl + ←/→` | 切換桌面 |
| `Alt + Tab` | 切換視窗 |
| `Win + Z` | Snap Layouts (Win 11) |

### 常用系統指令 (Win + R)

| 指令 | 工具 |
|:-----|:-----|
| `cmd` | 命令提示字元 |
| `powershell` | PowerShell |
| `wt` | Windows Terminal |
| `control` | 控制臺 |
| `ms-settings:` | 設定應用 |
| `ncpa.cpl` | 網路連線 |
| `appwiz.cpl` | 程式和功能 |
| `sysdm.cpl` | 系統內容 |
| `powercfg.cpl` | 電源選項 |
| `desk.cpl` | 顯示設定 |
| `mmsys.cpl` | 聲音 |
| `main.cpl` | 滑鼠 |
| `timedate.cpl` | 日期時間 |
| `firewall.cpl` | 防火牆 |
| `compmgmt.msc` | 電腦管理 |
| `lusrmgr.msc` | 本機使用者和群組 |

---

## 兄弟條目
- [[../004.451.8-Windows-Server/004.451.8-Windows-Server|Windows Server]]
- [[../004.451.8-Windows/004.451.8-Windows|Windows Desktop MOC]]
