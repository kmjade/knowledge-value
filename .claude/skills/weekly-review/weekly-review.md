# Skill: /weekly-review — 每週回顧與知識蒸餾

## 使用方式

```
/weekly-review              # 執行完整週回顧（六步驟）
/weekly-review --dry-run    # 僅預覽，不寫入任何文件
/weekly-review --quick      # 快速版：僅 Step 1-2（匯總 + 週記），跳過編譯與歸檔
/weekly-review --step 1     # 僅執行指定步驟（1-6）
```

## 觸發方式
- 手動：用戶輸入 `/weekly-review`
- 建議：每週日運行

## 用途
每週末完成四件事：
1. 匯總本週數據 + 生成週記
2. 批量編譯本週積累的 raw 資料
3. 過期 ephemeral 內容歸檔
4. 專案狀態審查 + Wiki 健康檢查

---

## 前置檢查

執行前先確認：
1. 取得本週日期範圍（週一 ~ 週日，ISO 8601）
2. 計算本週週數 `YYYY-Www`
3. 確認 `Periodic/weekly/` 目錄存在，不存在則創建
4. 確認 `AI-Log/` 目錄存在

---

## 執行流程

### Step 1：本週數據匯總

掃描 `Periodic/daily/YYYY/` 下本週七天（週一至週日）的日記，提取：

1. **任務統計**：
   - 從每日 `## 📋 任務` 區塊提取任務總數、完成數、未完成數
   - 區分「今日截止」、「已過期」、「無截止日期」三類

2. **Inbox 吞吐量**：
   - 從每日 `## 📥 Inbox` 區塊提取每日待處理數量
   - 計算本週新進 Inbox 文件總數（掃描 `0 Inbox/` 中 `created` 日期在本週範圍內的文件）

3. **編譯產出**：
   - 讀取 `AI-Log/compile-log.md`，統計本週範圍內的編譯記錄
   - 提取本週新建/更新的 Wiki 頁面列表

4. **日記覆蓋率**：
   - 檢查本週 7 天中哪些天有日記、哪些缺失
   - 缺失日列表記錄在週記中

5. **Fleeting Ideas 匯總**：
   - 從每日 `## 💡 Fleeting Ideas` 區塊收集所有閃念
   - 檢查是否有應升級為 Project 的想法（標記）

### Step 2：生成週記

建立或更新 `Periodic/weekly/YYYY/YYYY-Www.md`，結構如下：

```markdown
---
type: weekly
week: YYYY-Www
date_range: YYYY-MM-DD ~ YYYY-MM-DD
created: YYYY-MM-DD
lifecycle: ephemeral
status: active
tags:
  - weekly-review
---

# Week Ww — YYYY-MM-DD ~ YYYY-MM-DD

## 📊 本週數據

| 指標 | 數值 |
|------|------|
| 活躍專案 | N 個 |
| 完成任務 | N 個 |
| 未完成任務 | N 個（已滾動到下週） |
| Inbox 新進 | N 個文件 |
| Inbox 已分揀 | N 個文件 |
| Wiki 新建頁面 | N 個 |
| Wiki 更新頁面 | N 個 |
| 日記覆蓋率 | N/7 天 |

## 🎯 專案進展

### 活躍專案
<!-- 從 1 Projects/ 掃描 status: active 的專案 -->

| 專案 | 狀態 | 本週進展 | 下週行動 |
|------|------|----------|----------|
| [[專案名]] | active | [摘要] | [下一步] |

### 停滯/待審查
<!-- status: stalled 或 30 天無更新 -->

## 📚 知識積累

### 本週新編譯頁面
<!-- 按子庫分組列出 -->

#### [子庫名稱]
- [[wiki/concepts/xxx]] — [一句話描述]

### 本週新入 raw/ 資料（待編譯）
<!-- 列出尚未編譯的 -->

## 🔮 下週優先級

> AI 建議的下週 Top 3 優先事項

1. **[優先級 1]** — 原因：[截止日期/遺留/重要性]
2. **[優先級 2]** — 原因：[...]
3. **[優先級 3]** — 原因：[...]

## 💡 本週閃念回顧

<!-- 從每日 Fleeting Ideas 匯總，標記值得跟進的 -->

- [閃念內容] — 來自 [[日記]]  🔼 建議升級為專案
- [閃念內容] — 來自 [[日記]]

## 🔍 Wiki 健康報告

<!-- Step 6 的 lint 結果摘要 -->

| 檢查項 | 結果 |
|--------|------|
| 死鏈 | N 個 |
| 孤立頁 | N 個 |
| 矛盾標記 | N 個 |
| 低置信度頁面 | N 個 |
| 未編譯 raw 資料 | N 個 |

## 🤔 反思

> [留給人類手動填寫]

```

**寫入規則**：
- 如週記已存在 → **更新**現有文件，保留人類手寫的 `## 🤔 反思` 區塊內容
- 如不存在 → 創建新文件
- `## 📊 本週數據` 和 `## 🎯 專案進展` 每次覆蓋更新
- `## 💡 本週閃念回顧` 追加，不覆蓋

### Step 3：批量知識編譯

對所有 Wiki 子庫，篩選本週新進入 `raw/` 的文件（`created` 日期在本週範圍內），執行編譯：

```
/wiki-compile [topic] --incremental
```

**執行策略**：
1. 掃描所有 `3 Resources/*/raw/` 目錄，找出 `compiled: false` 或無 `compiled` 字段的文件
2. 優先處理 `created` 日期在本週範圍內的文件
3. 每個子庫最多編譯 10 個文件（`--batch 10`），避免單次運行成本過高
4. 如文件超過 10 個，記錄到週記的 `## 📚 知識積累 > 本週新入 raw/ 資料（待編譯）` 中，提示用戶下週繼續

**編譯後操作**：
- 更新 `AI-Log/compile-log.md`
- 更新週記的「本週新編譯頁面」區塊

### Step 4：過期內容歸檔

掃描全 Vault，找出符合以下條件的文件：

1. **條件**：`lifecycle: ephemeral` + `created` 日期 > 14 天前 + `status != archived`
2. **排除**：`Periodic/daily/`、`Periodic/weekly/`、`0 Inbox/`、模板文件、系統配置文件
3. **排除**：frontmatter 中有 `keep: true` 標記的文件

**操作**：
- 將符合條件的文件移入 `4 Archives/ephemeral/YYYY-MM/`
- 在 frontmatter 添加：
  ```yaml
  archived: true
  archived_date: YYYY-MM-DD
  archived_reason: "過期 ephemeral 內容，/weekly-review 自動歸檔"
  ```
- 記錄歸檔數量到週記

**安全檢查**（移動前）：
1. 檢查是否有其他文件透過 wikilink 引用該文件
2. 如有引用 → 不歸檔，改為標記 `status: review`，在週記中列出供人工處理
3. 如有引用但引用來自 `Periodic/daily/` → 可安全歸檔（日記中的引用視為過期引用）

### Step 5：專案狀態審查

掃描 `1 Projects/` 下所有專案目錄：

**5a. 過期專案檢查**：
- 掃描每個專案的主文檔 frontmatter
- 如有 `deadline` 字段且已過期 + `status != completed`：
  - 在週記 `## 🎯 專案進展 > 停滯/待審查` 中列出
  - 提示用戶確認：延期 / 關閉 / 取消

**5b. 停滯專案檢查**：
- 檢查專案目錄中最新的文件修改日期
- 如 > 30 天無任何更新 且 `status: active`：
  - 在週記中標記為 ⚠️ 停滯
  - 提示用戶確認是否更新狀態為 `stalled`

**5c. 活躍專案進展**：
- 對每個 `status: active` 的專案：
  - 讀取最近的 tasks 或主文檔
  - 摘要 1-2 句本週進展
  - 建議 1 個下週行動

### Step 6：Wiki 健康檢查（Lint）

對所有 Wiki 子庫執行快速健康檢查：

**6a. 死鏈檢測**：
- 掃描 `wiki/` 下所有頁面中的 `[[wikilink]]`
- 檢查目標文件是否存在
- 列出斷鏈數量及前 5 個斷鏈

**6b. 孤立頁檢測**：
- 找出沒有被任何其他頁面引用的 wiki 頁面
- 列出孤立頁面列表

**6c. 矛盾標記匯總**：
- 掃描所有 `wiki/` 頁面中的 `[!contradiction]` callout
- 匯總到一個列表

**6d. 低置信度頁面**：
- 掃描 `confidence: low` 的概念頁
- 列出供人工審查

**6e. 未編譯原料統計**：
- 各子庫 `raw/` 中 `compiled: false` 的文件數量

**輸出**：
- 結果寫入週記 `## 🔍 Wiki 健康報告` 區塊
- 同時追加到 `AI-Log/lint-[YYYY-MM-DD].md`（如當日尚無 lint 記錄）

---

## 輸出摘要

執行完成後輸出：

```markdown
✅ 週回顧完成 — Week Ww (YYYY-MM-DD ~ YYYY-MM-DD)

📊 本週數據：
- 活躍專案 N 個 | 完成任務 N | Inbox 吞吐 N 進/N 出
- Wiki 新建 N 頁 | 更新 N 頁

📝 週記：`Periodic/weekly/YYYY/YYYY-Www.md`

🗂️ 歸檔：N 個過期文件 → `4 Archives/ephemeral/YYYY-MM/`

⚠️ 待確認：
- 過期專案：N 個（[列表]）
- 停滯專案：N 個（[列表]）
- 死鏈：N 個
- 孤立頁：N 個

💡 建議下週優先：
1. [優先級 1]
2. [優先級 2]
3. [優先級 3]
```

---

## 錯誤處理

- **無本週日記**：跳過 Step 1 數據匯總，在週記中標記「本週無日記記錄」，仍執行 Step 5-6
- **raw/ 目錄不存在**：跳過 Step 3，不報錯
- **無過期內容**：Step 4 顯示「無需歸檔的過期內容」
- **權限不足**：任何寫入失敗時，記錄錯誤並繼續執行後續步驟
- **週記已存在**：合併模式 — 保留人類填寫區塊，更新 AI 生成區塊

## 注意事項

- **永不刪除文件**：歸檔操作是移動，不是刪除
- **保留人類內容**：週記中的 `## 🤔 反思` 和 `## 📝 工作日誌` 等人類填寫區塊永不覆蓋
- **日期計算**：正確處理跨月、跨年邊界
- **成本控制**：Step 3 批量編譯限制每子庫 10 個文件，超出部分排入下週
- **可中斷設計**：每個 Step 完成後輸出進度，用戶可隨時中斷並從指定步驟恢復（`--step N`）
