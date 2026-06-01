---
aliases: [VS Code Git, VS Code Git与协作, GitLens, Live Share]
tags: [DDC/004.43, vscode, tools, git, collaboration]
created: 2026-06-01
updated: 2026-06-01
---

# 06 — Git 與協作 Git & Collaboration

> 內建 Git GUI、GitLens 深度整合、Live Share 即時協作、Remote Development 遠端開發——VS Code 的協作武器庫。

---

## 內建 Git 功能 Built-in Git

| 操作 | Win/Linux | macOS | 說明 |
|------|:--------:|:-----:|------|
| 開啟 Source Control | `Ctrl+Shift+G` | `Cmd+Shift+G` | Git 面板 |
| Stage 變更 | 點擊 `+` 或 `Ctrl+Enter` | — | 暫存 |
| Commit | `Ctrl+Enter` (輸入訊息後) | — | 提交 |
| Push/Pull | 狀態列同步按鈕 | — | 同步 |
| 查看差異 | 點擊檔案 | — | 行內 Diff |
| 分支切換 | 狀態列點擊分支名 | — | 快速切換 |
| 分支建立 | `Ctrl+Shift+P` → `Git: Create Branch` | — | 新建分支 |
| 解決衝突 | 內建 3-way merge editor | — | 視覺化解決 |

---

## GitLens — Git 超級增強

| 功能 | 說明 |
|------|------|
| **行內 Blame** | 每行末尾顯示最後修改者與時間 |
| **File History** | 檔案級歷史視圖 |
| **Line History** | 選取行的歷史 |
| **Commit Graph** | 視覺化提交圖 (類似 Git Graph) |
| **CodeLens** | 函數/類上方顯示作者與變更數 |
| **Worktree** | 視覺化 Worktree 管理 |
| **側欄視圖** | Commits / File History / Branches / Remotes / Stashes / Tags |

| 快捷鍵 | 功能 |
|:------:|------|
| `Alt+B` | Toggle Blame |
| `Ctrl+Shift+H` | File History |
| `Ctrl+Shift+L` | Line History |

---

## GitHub Pull Requests

| 功能 | 說明 |
|------|------|
| **擴展** | `GitHub.vscode-pull-request-github` |
| **檢視 PR** | 在 VS Code 內瀏覽、審查 PR |
| **建立 PR** | 直接從編輯器建立 Pull Request |
| **Inline Comments** | 在 Diff 上直接添加審查意見 |
| **Checkout PR** | 一鍵將 PR 分支拉取到本地 |

---

## Live Share 即時協作

| 功能 | 說明 |
|------|------|
| **即時編輯** | 多人同時編輯同一個工作區 (類似 Google Docs) |
| **共享終端** | 僅讀或讀寫共享終端機 |
| **共享伺服器** | 自動轉發 localhost 埠口 |
| **語音通話** | 內建音頻通話 (可選) |
| **訪客限制** | 僅讀 / 讀寫權限控制 |
| **啟動** | `Ctrl+Shift+P` → `Live Share: Start Session` |
| **加入** | 點擊主持人分享的連結 |

---

## Remote Development 遠端開發

| 擴展 | ID | 場景 |
|------|----|------|
| **Remote - SSH** | `ms-vscode-remote.remote-ssh` | 連線到遠端 Linux 伺服器 |
| **Dev Containers** | `ms-vscode-remote.remote-containers` | Docker 容器內開發 |
| **Remote - WSL** | `ms-vscode-remote.remote-wsl` | Windows WSL 內開發 |
| **Remote - Tunnels** | `ms-vscode.remote-server` | 透過 tunnel 安全連線任意機器 |

```
Local VS Code (UI)
    │
    │ SSH / Docker / WSL
    ▼
Remote Machine (Server)
    ├── VS Code Server (node)
    ├── Extensions (remote-side)
    ├── Terminal
    ├── File System
    └── Git
```

| 優勢 | 說明 |
|------|------|
| **本地體驗** | UI 無延遲，編輯器響應即時 |
| **遠端執行** | 程式碼、終端、調試全在遠端 |
| **擴展分離** | UI 擴展在本地，工作擴展在遠端 |
| **埠轉發** | 自動轉發遠端 localhost |

---

## 相關

- [[../VS Code|VS Code MOC]] — 章節導航
- [[05-扩展生态]] — 相關擴展
- [[07-调试与诊断]] — 遠端調試
