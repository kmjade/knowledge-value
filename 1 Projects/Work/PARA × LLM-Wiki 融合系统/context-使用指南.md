---
created: 2026-05-31
type: guide
topic: context
status: active
tags:
  - usage-guide
  - context
  - para-workflow
---

# `/context` 使用指南

> 會話狀態管理 — 讓 AI 瞬間知道你「現在」在做什麼

---

## 快速上手

在 Claude Code 中輸入：

```bash
/context
```

AI 會瞬間建立對你 Vault「當下狀態」的完整感知：活躍專案、Inbox 積壓、今日任務、上次會話遺留。

**建議**：每次新會話開始時第一件事就是 `/context`，或設為 SessionStart 自動運行。

---

## 命令參數

| 命令 | 用途 | 載入時間 |
|------|------|----------|
| `/context` | 完整上下文（五維度） | ~3-5 秒 |
| `/context --quick` | 僅狀態概覽 | ~1 秒 |
| `/context --projects` | 僅專案狀態 | ~1 秒 |
| `/context --inbox` | 僅 Inbox 狀態 | <1 秒 |

---

## 五個載入維度

### 1. 今日日記 📅

讀取 `Periodic/daily/YYYY/YYYY-MM-DD.md`，提取：
- 今日待辦任務
- 昨日遺留（從昨日回顧滾動）
- 今日意圖

### 2. 本週週記 📊

讀取 `Periodic/weekly/YYYY/YYYY-Www.md`，提取：
- 本週目標
- 本週優先級

### 3. 活躍專案 🎯

掃描 `1 Projects/`，識別 `status: active` 的專案：
- 專案名稱與狀態
- 最近截止日期
- 下一步行動

### 4. Inbox 狀態 📥

統計 `0 Inbox/`：
- 待處理文件數量（不讀取內容，只統計）
- 最舊文件的積壓天數

### 5. 上次會話遺留 ⏮️

讀取 `AI-Log/sessions/` 最新 3 個會話記錄，提取：
- 待跟進事項
- 未完成的 AI 建議

---

## 輸出格式

```markdown
📍 當前狀態快照 — 2026-05-31

🎯 活躍專案（3 個）：
- [[專案A]] — active — 截止：2026-06-05
- [[專案B]] — active — 無截止
- [[專案C]] — stalled ⚠️ — 30 天無更新

📋 今日待辦（來自日記）：
- [ ] 提交設計稿 — 截止今天
- [ ] 回覆客戶郵件 — 已過期 1 天

📥 Inbox 待處理：15 個文件（最舊 7 天前）
→ 運行 /triage 處理

⏮️ 上次會話遺留：
- 需要完成 ai-ml Wiki 的知識圖譜章節
- 檢查 [[專案B]] 的里程碑進度

💡 建議本次優先處理：
1. 提交設計稿（今日截止）
2. 運行 /triage 清理 Inbox（積壓 7 天）
3. 繼續上次的 ai-ml Wiki 編譯
```

---

## 典型場景

### 場景一：新會話開始

```bash
/context
```

→ 3 秒建立完整感知。AI 不再是「從零開始」。

### 場景二：只想看專案狀態

```bash
/context --projects
```

→ 快速了解哪些專案活躍、哪些快過期。

### 場景三：快速檢查 Inbox

```bash
/context --inbox
```

→ 看一眼 Inbox 積壓情況，決定是否立即 `/triage`。

### 場景四：會話中需要重新定向

```bash
/context --quick
```

→ 當你在會話中偏離主題後，快速回到當下狀態。

---

## SessionStart 自動化

在 `.claude/settings.json` 中配置，讓每次會話開始時自動載入上下文：

```json
{
  "hooks": {
    "SessionStart": [
      {
        "command": "/context --quick"
      }
    ]
  }
}
```

這樣每次打開 Claude Code，AI 就已經知道你的狀態了。

---

## 與其他命令的協作

```
會話開始
    │
    ▼
/context ────────────── 建立當下感知
    │
    ├── Inbox 有積壓？ ──→ /triage
    │
    ├── 專案快過期？ ──→ 優先處理
    │
    ├── raw/ 有新材料？──→ /wiki-compile
    │
    └── 系統健康？ ──→ /lint
```

`/context` 是所有操作的**起點**。它告訴你「現在該做什麼」。

---

## 推薦工作流中的位置

```
/daily-open     ← 每天早晨：創建日記 + 加載任務
     │
     ▼
  /context      ← 每次會話開始：建立完整感知
     │
     ├──→ /triage       ← Inbox 處理
     ├──→ /wiki-compile ← 知識編譯
     ├──→ /lint         ← 系統檢查
     └──→ 日常工作
     │
     ▼
/weekly-review  ← 每週日：六步驟回顧
```

---

## FAQ

### Q: `/context` 和 `/daily-open` 的區別？
`/daily-open` **創建**日記並填充任務。`/context` **讀取**已有狀態（日記 + 週記 + 專案 + Inbox + 會話歷史）。早晨用 `daily-open`，每次新會話用 `context`。

### Q: 為什麼需要 `/context`？AI 不能直接讀取嗎？
AI 知道 Vault **結構**，但不知道你「現在」的**狀態**——什麼最緊急、上次做到哪、今天重點是什麼。`/context` 把這些分散在各處的資訊匯總成一張快照。

### Q: `--quick` 和完整版的差別？
`--quick` 只輸出狀態概覽（數字儀表板），不讀取日記和會話歷史細節。適合快速確認，不適合深度會話。

### Q: 可以自訂載入哪些維度嗎？
目前支持 `--projects` 和 `--inbox` 單維度載入。如需更細緻控制，可以直接告訴 AI：「幫我看看今天的任務和上週的遺留」。

### Q: 會話歷史存哪裡？
`AI-Log/sessions/`。每次重要會話結束後保存，`/context` 讀取最近 3 個。

---

*由 Claudian 生成，2026-05-31*
*相關文檔：[[1 Projects/Work/PARA × LLM-Wiki 融合系统/03-Skills 完整设计.md|設計規範]] | [[1 Projects/Work/PARA × LLM-Wiki 融合系统/daily-open-使用指南.md|daily-open 使用指南]]*
