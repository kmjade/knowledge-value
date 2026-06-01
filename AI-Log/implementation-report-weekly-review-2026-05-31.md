---
created: 2026-05-31
type: report
topic: weekly-review-skill-implementation
status: completed
tags:
  - implementation-report
  - weekly-review
  - skill
  - command
---

# 實現報告：weekly-review 技能與指令

**日期**: 2026-05-31
**來源設計**: [[03-Skills 完整设计|第三章 Skill 5]]

---

## 一、實現範圍

基於設計文檔中 Skill 5 (`/weekly-review`) 的完整規範，實現了雙軌架構：

| 層級 | 路徑 | 定位 |
|------|------|------|
| **Skill** | `.claude/skills/weekly-review/` | 完整技能包，含 skill.json + 8700 字執行邏輯 |
| **Command** | `.claude/commands/weekly-review.md` | 精簡調用入口，4600 字六步驟概要 |

---

## 二、核心功能

### 六步驟流程

```
Step 1: 本週數據匯總
  ├── 掃描 7 天 Periodic/daily/ 日記
  ├── 統計：任務完成數、Inbox 吞吐量、編譯產出
  ├── 計算日記覆蓋率
  └── 匯總 Fleeting Ideas（標記可升級為 Project 的）

Step 2: 生成週記
  ├── 建立/更新 Periodic/weekly/YYYY/YYYY-Www.md
  ├── 填充 8 個標準區塊（數據、專案、知識、優先級…）
  └── 合併策略：覆蓋 AI 區塊，保留人類 ## 🤔 反思

Step 3: 批量知識編譯
  ├── 篩選本週新入 raw/ 文件（compiled: false + created 本週）
  ├── 調用 /wiki-compile [topic] --incremental
  └── 每子庫上限 10 個文件

Step 4: 過期內容歸檔
  ├── 條件：ephemeral + >14天 + status != archived
  ├── 安全檢查：wikilink 引用檢測
  └── 目標：4 Archives/ephemeral/YYYY-MM/

Step 5: 專案狀態審查
  ├── 過期檢測：deadline 已過 + status != completed
  ├── 停滯檢測：>30天無更新 + status: active
  └── 活躍摘要：每個 active 專案的下週行動建議

Step 6: Wiki 健康檢查
  ├── 死鏈檢測、孤立頁檢測
  ├── 矛盾標記匯總、低置信度頁面列表
  └── 輸出到週記 + AI-Log/lint-[日期].md
```

### 參數支持

| 參數 | 功能 |
|------|------|
| (無) | 執行完整六步驟 |
| `--dry-run` | 僅預覽，不寫入任何文件 |
| `--quick` | 僅 Step 1-2（匯總 + 週記），跳過編譯/歸檔/審查/lint |
| `--step N` | 僅執行指定步驟（1-6），支持中斷恢復 |

---

## 三、技術決策

| 決策 | 說明 |
|------|------|
| **雙軌實現** | Skill 提供完整邏輯和潛在自動觸發能力；Command 提供簡潔 `/weekly-review` 入口 |
| **合併而非覆蓋** | 週記更新時保留人類手寫內容，與 daily-open 設計一致 |
| **wikilink 安全檢測** | 歸檔前檢查引用關係，防止破壞知識網絡 |
| **成本控制上限** | 批量編譯每子庫 10 個上限，超出排入下週隊列 |
| **可中斷架構** | `--step N` 允許從任意步驟恢復，適應長時間運行 |
| **無刪除原則** | 歸檔 = 移動，非刪除，符合 CLAUDE.md 規則 2 |

---

## 四、與現有系統的關係

```
                    ┌──────────────┐
                    │ /weekly-review │
                    └──────┬───────┘
           ┌───────────────┼───────────────┐
           ▼               ▼               ▼
    ┌────────────┐  ┌────────────┐  ┌──────────┐
    │ /wiki-     │  │ /triage    │  │ /lint    │
    │ compile    │  │ (Inbox)    │  │ (檢查)   │
    └────────────┘  └────────────┘  └──────────┘
           │               │               │
           ▼               ▼               ▼
    ┌─────────────────────────────────────────┐
    │            PARA + LLM-Wiki              │
    │  Periodic/ ← 1 Projects/ ← 3 Resources/ │
    └─────────────────────────────────────────┘
```

`/weekly-review` 是系統的**週期性整合層**，在 `/daily-open`（日）和 `/lint`（月）之間提供週級節奏。

---

## 五、測試建議

| 測試場景 | 驗證點 |
|----------|--------|
| `--dry-run` | 所有步驟輸出預覽，無文件變更 |
| `--quick` | 僅生成週記，不觸發編譯和歸檔 |
| 首次運行（無歷史週記） | 正確創建新週記文件 |
| 重複運行（已有週記） | AI 區塊更新，人類區塊保留 |
| 無本週日記 | Step 1 跳過，其他步驟正常執行 |
| 大量過期 ephemeral | 歸檔安全檢查（wikilink 引用）生效 |
| 跨月邊界 | 週一～週日日期計算正確 |

---

## 六、檔案清單

| 檔案 | 狀態 |
|------|------|
| `.claude/skills/weekly-review/skill.json` | ✅ 已創建 |
| `.claude/skills/weekly-review/weekly-review.md` | ✅ 已創建 |
| `.claude/commands/weekly-review.md` | ✅ 已創建 |
| `AI-Log/sessions/2026-05-31-weekly-review-skill-creation.md` | ✅ 已創建 |

---

*由 Claudian 生成，2026-05-31*
