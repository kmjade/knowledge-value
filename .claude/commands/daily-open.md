每日開啟儀式：檢查/創建今日日記，自動填充活躍任務、Inbox 狀態及昨日回顧。

## 使用方式

```
/daily-open              # 檢查/創建今日日記並填充上下文
/daily-open --dry-run    # 僅預覽，不創建文件
```

## 執行步驟

### Step 1：檢查今日日記是否存在

路徑：`Periodic/daily/YYYY/YYYY-MM-DD.md`（YYYY-MM-DD 為今日日期）

- 已存在 → 跳到 Step 5（輸出摘要）
- 不存在 → 繼續

### Step 2：確保目錄存在

如 `Periodic/daily/YYYY/` 不存在，自動創建。

### Step 3：從模板創建日記

使用以下模板（替換日期佔位符為實際值）：

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

日期轉換：
- `星期幾` 使用中文：Monday→星期一 ... Sunday→星期日
- `YYYY-Www` 使用 ISO 8601 週數

### Step 4：自動填充上下文

#### 📋 任務

1. 掃描 `1 Projects/` 下所有目錄
2. 對每個活躍項目，查找 tasks 或待辦事項
3. 提取截止日期為今日或已過期的未完成任務
4. 若無活躍任務，顯示 `> 今日無活躍任務 🎉`

#### 📥 Inbox

1. 統計 `0 Inbox/` 下 `.md` 文件數量（排除子目錄）
2. 列出前 5 個文件名
3. 若 Inbox 為空，顯示 `> Inbox 為空 ✨`

#### 🔄 昨日回顧

1. 計算昨日日期
2. 讀取昨日日記 `Periodic/daily/YYYY/YYYY-MM-DD.md`
3. 提取 `## 🌙 日終回顧` 內容，寫入今日日記
4. 若昨日日記不存在，跳過此區塊

### Step 5：輸出摘要

```markdown
✅ 今日日記已就緒：Periodic/daily/YYYY/YYYY-MM-DD.md

📋 活躍任務：N 個
📥 Inbox 待處理：N 個文件
🔄 昨日回顧：[有/無]
```

## 注意事項

- **永不覆蓋**已存在的日記
- `--dry-run` 模式只輸出預覽不創建文件
- 日期計算需正確處理月末、年末邊界
