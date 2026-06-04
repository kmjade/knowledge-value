---
title: 體驗-Hermes卸載360安全衛士
tags: [AI/Hermes, tools/uninstall, experience]
created: 2026-06-05
aliases: [Hermes Uninstall 360 Experience]
---

# 體驗：用 Hermes 卸載 360安全衛士

## 背景

Windows 系統上安裝了 **360安全衛士 v13.0.1.2002**，想測試 Hermes Agent 從 WSL 終端是否能完成這個出了名困難的卸載任務。

## 執行過程

### Phase 1：偵測（成功 ✅）

Hermes 先用 PowerShell 掃描註冊表，找到：
- 卸載程序路徑：`C:\Program Files (x86)\360\360Safe\uninst.exe`
- 無 `QuietUninstallString`（無法靜默卸載）
- 3 個內核驅動：`360AntiHijack`、`360AntiSteal`、`360FsFlt`
- 1 個服務：`Q360AMPPL`

### Phase 2：嘗試靜默卸載（失敗 ❌）

直接執行 `uninst.exe /S` 等常見靜默參數 — 全部無效。360 的卸載程序**強制彈出 GUI**，不接受任何 CLI 靜默參數。

### Phase 3：winget 卸載（部分成功 ⚠️）

用 `winget uninstall --id "ARP\Machine\X86\360安全卫士" --silent`，報告 `Successfully uninstalled`。但實際情況：
- ✅ 註冊表卸載條目已清理
- ✅ 360 進程全部終止
- ❌ 15 個檔案殘留（被內核驅動鎖定）
- ❌ 3 個驅動處於 "Stop Pending" 狀態
- ❌ `C:\Program Files (x86)\360\` 目錄未刪除

### Phase 4：手動清理（部分成功 ⚠️）

Hermes 嘗試了：
- `sc.exe stop/delete` → 驅動進入 Stop Pending
- `Remove-Item -Force` → 檔案被鎖定，無法刪除
- `takeown` + `icacls` → 同樣被驅動阻止
- PowerShell SendKeys 模擬點擊卸載 GUI → 找到視窗但按鍵未觸發卸載
- `MoveFileEx` → 失敗
- `PendingFileRenameOperations` 註冊表 → **成功排程**

### Phase 5：最終手段（待重啟驗證 ⏳）

設置了 `PendingFileRenameOperations` 註冊表鍵，Windows 重啟後會自動刪除 `C:\Program Files (x86)\360\`。同時添加了 RunOnce 備用清理腳本。

## 當前狀態

| 項目 | 狀態 |
|------|:----:|
| 進程 | ✅ 全部終止 |
| 註冊表卸載條目 | ✅ 已清理 |
| 驅動 | ⏳ Stop Pending |
| 殘留檔案 (15個) | ⏳ 待重啟刪除 |
| winget 報告 | ✅ Successfully uninstalled |

## 關鍵發現

1. **360 的卸載是故意設計成難以自動化的** — 無靜默參數、GUI 強制互動、內核級驅動自保護
2. **winget 比預期有用** — 雖然卸載不徹底，但至少跑完了卸載程序的主要邏輯
3. **內核驅動是最大的障礙** — `360AntiHijack`、`360AntiSteal`、`360FsFlt` 三個驅動鎖定了 15 個核心 DLL，只有重啟才能釋放
4. **WSL 操控 Windows GUI 不可靠** — SendKeys 找到視窗但無法可靠地觸發卸載流程
5. **PendingFileRenameOperations 是正確的 CLI 解決方案** — 重啟後自動清理

## 結論

Hermes 從 WSL 終端**幾乎完全卸載了 360**，唯一卡住的是內核驅動鎖定的殘留檔案 — 這需要重啟才能解決，不是 Hermes 的問題。對於一個以難卸載聞名的軟體，winget + 手動清理的組合策略基本有效。

⚠️ **待重啟後驗證**：殘留檔案是否被 PendingFileRenameOperations 完全清除。

---

## 相關筆記

- [[AI工具体验]] — 其他 AI 工具的實戰體驗
- [[../02-Career/Digital Organization/01 Tools/01 Tools|工具目錄]]
- [[../../05-Learning|學習領域]]
