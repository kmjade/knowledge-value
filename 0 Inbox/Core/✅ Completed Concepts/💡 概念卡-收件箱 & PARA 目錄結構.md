---
aliases:
  - Concept Card
title: 💡 概念卡-收件箱 & PARA 目錄結構
type: concept
status: inbox
tags:
  - inbox
  - concept
source: 手動捕獲 / QuickAdd 宏
created: 2026-01-11
updated: 2026-01-12
achieve: "false"
---

# 💡概念卡 
---

> [!question] **問題**  
> 收件箱 & PARA 目錄結構

> [!answer] **答案**  
> （在此寫下對問題的完整說明、定義或解釋）

## 2️⃣ 繁體中文（Traditional Chinese）
---

_meta_

```
_meta_/

0 Personals/
│	├─ 📥 00_InBox/                ← 收件箱（所有新捕獲的筆記）
│   │   ├─ 快速捕獲.md
│   │   └─ 收件箱回顧.md
│   ├─ 已完成/                      ← 完成後搬移的筆記（可選）
│   └─ 日誌/                        ← 每日捕獲日誌或週/月回顧
├─ 📂 Projects/                     ← 專案資料夾
│   ├─ Project‑A/
│   └─ Project‑B/
├─ 📂 Areas/                       ← 持續運營的領域
│   ├─ Health/
│   ├─ Career/
│   └─ Learning/
├─ 📂 Resources/                   ← 參考資料、書籍、文章等
│   ├─ Books/
│   ├─ Articles/
│   └─ Tools/
├─ 📂 Archives/                    ← 已完成或過期的專案
│   ├─ 2025‑Archive/
│   └─ 2024‑Archive/
└─ _templates_/                    ← 全域模板庫（可選）
    ├─ InBox/
    │   ├─ 快速捕獲模板.md
    │   ├─ 搬移宏說明.md
    |	└─ concept-card-with-summary.md
    └─ PARA/
        ├─ Project模板.md
        ├─ Area模板.md
        └─ Resource模板.md
```
## 3️⃣ English (English)
---
0 Personals/
├─ 📥 00_InBox/                     ← Inbox (newly captured notes)
│   ├─ Templates/                   ← Quick Capture, Review, etc.
│   │   ├─ Quick Capture.md
│   │   └─ Inbox Review.md
│   ├─ Completed/                   ← Finished notes (optional)
│   └─ Logs/                        ← Daily capture logs / weekly‑monthly reviews
├─ 📂 Projects/                     ← Project folders
│   ├─ Project‑A/
│   └─ Project‑B/
├─ 📂 Areas/                       ← Ongoing domains (Health, Career, Learning, …)
│   ├─ Health/
│   ├─ Career/
│   └─ Learning/
├─ 📂 Resources/                   ← Reference material, books, articles, tools
│   ├─ Books/
│   ├─ Articles/
│   └─ Tools/
├─ 📂 Archives/                    ← Completed or archived projects
│   ├─ 2025‑Archive/
│   └─ 2024‑Archive/
└─ _templates_/                    ← Global template library (optional)
    ├─ InBox/
    │   ├─ Quick Capture Template.md
    │   ├─ Move Macro Guide.md
     |	 └─ concept-card-with-summary.md
    └─ PARA/
        ├─ Project Template.md
        ├─ Area Template.md
        └─ Resource Template.md
## 📚 相關參考 (Related References)
---
- [[相關筆記1]]
- [[相關筆記2]]
- [[外部連結|https://example.com]]

## 🏷️ 標籤與分類
---
- **領域**：`#領域/XXX`（依你的 PARA/Area 結構自行填寫）  
- **關鍵字**：`#keyword1 #keyword2`  

## 📅 後續行動（可選）
---
- [ ] 需要進一步研究的方向  
- [ ] 交叉引用到其他概念卡  

---

### 3️⃣ 使用說明

| 步驟                     | 操作方式                                                                                                              | 說明                                                                      |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **A. 建立新概念卡**          | **QuickAdd → Choose Template → 「💡 概念卡」** 或使用自訂快捷鍵（如 `Ctrl+Shift+K`）                                              | 系統會彈出「輸入檔名」對話框，輸入 **卡片標題**（例如 `什麼是時間管理`），檔案會自動生成在當前資料夾（或指定的 `00_InBox`） |
| **B. 編輯內容**            | 直接在新筆記中填寫 **問題**、**答案**、**相關參考** 等欄位                                                                              | 前置欄位已自動帶入 `title`、`created`、`updated`，只需要補完正文                           |
| **C. 完成後搬移**           | 在筆記底部的 **後續行動** 勾選完成 → 手動把 `status` 改為 `completed`（或在清單最後加 `completed: true`）<br>然後執行 **QuickAdd → 「搬移已完成概念卡」** 宏 | 宏會把筆記搬到 `0 Personals/✅ Completed Concepts`（或你自訂的目標資料夾）                  |
| **D. 在 Dashboard 中追蹤** | 在 `📥 Inbox Dashboard` 加入以下 Dataview 查詢即可看到概念卡統計                                                                  | 參見第 5 節                                                                 |

---

### 4️⃣ QuickAdd **搬移已完成概念卡** 宏（JSON 範例）

把下面的 JSON 直接貼到 **QuickAdd → Settings → Macros → Import / Paste**：

```json
{
  "macros": [
    {
      "name": "搬移已完成概念卡",
      "type": "macro",
      "command": "quickAdd",
      "args": {
        "macroName": "Move Completed Concept",
        "file": "{{file.path}}",
        "targetFolder": "0 Personals/✅ Completed Concepts"
      }
    }
  ]
}
```