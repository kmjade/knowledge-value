---
aliases: [VS Code FAQ, VS Code 常见问题, VS Code Troubleshooting]
tags: [DDC/004.43, vscode, tools, faq]
created: 2026-06-01
updated: 2026-06-01
---

# VS Code 常見問題 FAQ

> 安裝、設定、效能、擴展——最常遇到的 VS Code 問題與解決方案。

---

## 安裝與更新

**Q: VS Code vs VSCodium 該選哪個？**  
A: VSCodium 去除了 Microsoft 的遙測與品牌，100% 開源。若介意遙測且不需 MS 擴展商店 (Codium 使用 open-vsx)，選 VSCodium。一般用戶選 VS Code。

**Q: code CLI 找不到指令？**  
A: macOS: `Cmd+Shift+P` → `Shell Command: Install 'code' command in PATH`。Windows: 重新安裝並勾選 "Add to PATH"。Linux: 通常自動加入。

**Q: 如何完全移除 VS Code？**  
A: 移除後刪除 `~/.vscode/` (extensions)、`~/.config/Code/` (settings)、`~/.vscode-oss/` (Codium)。

---

## 效能

**Q: VS Code 很慢/卡頓怎麼辦？**  
A: (1) `Ctrl+Shift+P` → `Developer: Show Running Extensions` 查看哪個擴展耗能；(2) `code --disable-extensions .` 測試是否是擴展問題；(3) 關閉 Minimap: `"editor.minimap.enabled": false`；(4) 排除大型目錄: `"files.watcherExclude"` 排除 `node_modules`。

**Q: 記憶體佔用過高 (1GB+)？**  
A: 通常是擴展導致。到 `Help → Process Explorer` 找出高耗進程。限制: `"files.maxMemoryForLargeFilesMB": 4096`。

**Q: 如何加速啟動？**  
A: 禁用不需要的擴展；使用 `"workbench.startupEditor": "none"` 跳過歡迎頁。

---

## 設定與同步

**Q: settings.json vs UI 設定哪個好？**  
A: UI 設定方便瀏覽與搜尋；settings.json 適合版本控制、快速複製、進階設定。兩者等價，隨意切換。

**Q: Settings Sync 衝突如何解決？**  
A: 衝突時 VS Code 會顯示 Diff 對比，可選擇 `Accept Local` / `Accept Remote` / `Merge`。

---

## 擴展

**Q: 擴展安裝失敗？**  
A: 檢查網路代理、防火牆。嘗試手動: `code --install-extension <vsix-file>` 或下載 .vsix。

**Q: 如何匯出/匯入擴展列表？**  
A: 匯出: `code --list-extensions > extensions.txt`；匯入: `cat extensions.txt | xargs -L1 code --install-extension`。

**Q: ESLint/Prettier 沒有生效？**  
A: 確認擴展已安裝；確認根目錄有 `.eslintrc` / `.prettierrc`；`Ctrl+Shift+P` → `ESLint: Restart ESLint Server`。

---

## Git

**Q: Git 面板一片空白？**  
A: (1) 確認目錄是 Git repo (`git status`)；(2) `Ctrl+Shift+P` → `Git: Show Git Output` 查看日誌；(3) Git 路徑: `"git.path"` 設定。

**Q: 如何解決合併衝突？**  
A: VS Code 內建 3-way merge editor。衝突檔案 → 點擊 `Accept Current` / `Accept Incoming` / `Accept Both`。

---

## Remote / WSL

**Q: Remote SSH 連線逾時？**  
A: 檢查 `~/.ssh/config` 設定 KeepAlive: `ServerAliveInterval 60`。在 VS Code 設定: `"remote.SSH.connectTimeout": 60`。

**Q: WSL 中 VS Code 找不到 Git？**  
A: WSL 需獨立安裝 Git: `sudo apt install git`。確認 WSL 內 `git --version` 正常。

---

## 調試

**Q: 調試器無法啟動？**  
A: 確認 `launch.json` 中 `program` 路徑正確；確認擴展已安裝 (Python/Node/C++)；查看 Debug Console 錯誤訊息。

**Q: 斷點不會命中？**  
A: Node.js: 確認無 `--inspect-brk` 衝突。Python: 確認 `"justMyCode": false` 允許進入外部庫。C++: 確認編譯時加入 `-g` 除錯符號。

---

## 相關

- [[../VS Code|VS Code MOC]] — 章節導航
- [[../02-安装与配置|安裝與配置]]
- [[../08-效率技巧|效率技巧]]
