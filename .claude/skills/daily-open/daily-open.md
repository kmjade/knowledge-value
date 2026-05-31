# Skill: /daily-open — 每日開啟儀式

## 使用方式

```
/daily-open              # 檢查/創建今日日記並填充上下文
/daily-open --dry-run    # 僅預覽，不創建文件
```

## 觸發方式
- 手動：用戶輸入 `/daily-open`
- 自動：SessionStart hook 檢測到當日日記不存在時自動觸發

## 用途
每天第一次打開 Vault 時運行，創建當日日記並填充上下文。

---

## 執行流程

### Step 1：檢查今日日記是否存在

路徑：`Periodic/daily/YYYY/YYYY-MM-DD.md`

- 已存在 → 跳到 Step 5（輸出摘要）
- 不存在 → 繼續

### Step 2：確保目錄存在

如 `Periodic/daily/YYYY/` 不存在，自動創建。

### Step 3：從模板創建日記

使用以下模板（替換 `YYYY-MM-DD`、`星期幾`、`YYYY-Www` 為實際值）：

```markdown
---
type: daily
date: YYYY-MM-DD
week: YYYY-Www
created: YYYY-MM-DD
lifecycle: ephemeral
status: active
---

# YYYY-MM-DD [星期幾]

## 🌅 今日意圖
> 今天最重要的一件事：

---

## 📋 任務
<!-- /daily-open 自動填充 -->

---

## 📥 Inbox
<!-- /daily-open 自動填充 -->

---

## 📝 工作日誌
<!-- 自由記錄 -->

---

## 💡 Fleeting Ideas
<!-- 閃念捕捉 -->

---

## 🤖 Agent 操作記錄

---

## 🌙 日終回顧
- **完成了什麼**：
- **未完成的原因**：
- **明日最重要**：
- **給 AI 的指令**：
```

**日期轉換規則**：
- `星期幾` 使用中文：Monday → 星期一，Tuesday → 星期二 … Sunday → 星期日
- `YYYY-Www` 為 ISO 8601 週數

### Step 4：自動填充上下文

#### 📋 任務區塊

1. 掃描 `1 Projects/` 下所有目錄
2. 對每個活躍項目（`status: active`），讀取其主文檔或 tasks 相關文件
3. 提取 **截止日期為今日或已過期** 的未完成任務
4. 填充到 `## 📋 任務` 下方：

```markdown
## 📋 任務

### 今日截止
- [ ] [任務描述] — 來自 [[項目名]]

### 已過期
- [ ] [任務描述] — 來自 [[項目名]]（截止 YYYY-MM-DD）

### 無截止日期
- [ ] [任務描述] — 來自 [[項目名]]
```

若無活躍任務，顯示：`> 今日無活躍任務 🎉`

#### 📥 Inbox 區塊

1. 統計 `0 Inbox/` 下所有 `.md` 文件（排除子目錄內的系統文件）
2. 列出前 5 個文件名（不含副檔名）
3. 填充：

```markdown
## 📥 Inbox

Inbox 待處理：**N** 個文件

| 文件 | 日期 |
|------|------|
| [文件名] | [創建日期] |
| ... | ... |

> 使用 `/triage` 進行分揀
```

若 Inbox 為空，顯示：`> Inbox 為空 ✨`

#### 🔄 昨日回顧

1. 計算昨日日期（今天 -1 天，必要時跨月跨年）
2. 讀取 `Periodic/daily/YYYY/YYYY-MM-DD.md`
3. 如昨日日記存在，提取 `## 🌙 日終回顧` 中的內容
4. 在 `## 📋 任務` 之後插入昨日摘要：

```markdown
---

## 🔄 昨日回顧

> 來自 [[昨日日記]]

- 完成：N 個任務
- 未完成（已滾動到今日）：M 個
```

若昨日日記不存在，跳過此區塊。

### Step 5：輸出摘要

```markdown
✅ 今日日記已就緒：`Periodic/daily/YYYY/YYYY-MM-DD.md`

📋 活躍任務：N 個（今日截止 X，已過期 Y）
📥 Inbox 待處理：N 個文件
🔄 昨日回顧：[有/無]
```

---

## 注意事項

- **永不覆蓋**已存在的日記文件
- 日期計算需正確處理月末、年末邊界
- 模板中的 `<!-- 注释 -->` 保留，供用戶參考
- 日記的 `lifecycle: ephemeral` — 任務完成後內容可歸檔或丟棄
- 如 `0 Inbox/` 僅含目錄無 .md 文件，Inbox 計數為 0
