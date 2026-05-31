# Weekly Review — 每週回顧與知識蒸餾

每週末生成週記、批量編譯本週知識、歸檔過期內容、審查專案狀態。

## 使用方式

```
/weekly-review              # 執行完整週回顧（六步驟）
/weekly-review --dry-run    # 僅預覽，不寫入任何文件
/weekly-review --quick      # 快速版：僅 Step 1-2（匯總 + 週記）
/weekly-review --step 1     # 僅執行指定步驟（1-6）
```

## 執行流程

### Step 1：本週數據匯總

掃描 `Periodic/daily/YYYY/` 下本週七天（週一～週日）的日記：

1. **任務統計**：從每日 `## 📋 任務` 提取完成/未完成數
2. **Inbox 吞吐量**：統計本週新進文件（`created` 在本週範圍）+ 每日 Inbox 數量
3. **編譯產出**：從 `AI-Log/compile-log.md` 提取本週編譯記錄
4. **日記覆蓋率**：檢查 7 天中哪些缺失
5. **Fleeting Ideas**：從每日 `## 💡 Fleeting Ideas` 匯總，標記應升級為 Project 的想法

### Step 2：生成週記

建立或更新 `Periodic/weekly/YYYY/YYYY-Www.md`：

**週記結構**：
```markdown
---
type: weekly
week: YYYY-Www
date_range: YYYY-MM-DD ~ YYYY-MM-DD
created: YYYY-MM-DD
lifecycle: ephemeral
status: active
tags: [weekly-review]
---

# Week Ww — YYYY-MM-DD ~ YYYY-MM-DD

## 📊 本週數據
| 指標 | 數值 |
|------|------|
| 活躍專案 / 完成任務 / 未完成任務 / Inbox 進出 / Wiki 新建/更新 / 日記覆蓋率 |

## 🎯 專案進展
### 活躍專案
| 專案 | 狀態 | 本週進展 | 下週行動 |

### 停滯/待審查
<!-- status: stalled 或過期 -->

## 📚 知識積累
### 本週新編譯頁面（按子庫分組）
### 本週新入 raw/ 資料（待編譯）

## 🔮 下週優先級
> AI 建議 Top 3

## 💡 本週閃念回顧

## 🔍 Wiki 健康報告
| 檢查項 | 結果 |
|--------|------|
| 死鏈 / 孤立頁 / 矛盾標記 / 低置信度頁面 / 未編譯 raw |

## 🤔 反思
> [人類手動填寫]
```

**合併規則**：
- 已存在 → 更新 AI 區塊，保留 `## 🤔 反思` 人類內容
- 不存在 → 創建新文件

### Step 3：批量知識編譯

對所有 `3 Resources/*/raw/` 子庫：
1. 篩選本週新入 raw/ 的文件（`created` 在本週範圍 + `compiled: false`）
2. 每子庫最多編譯 10 個文件
3. 超出部分記錄到週記待編譯列表
4. 更新 `AI-Log/compile-log.md`

`--quick` 模式下跳過此步驟。

### Step 4：過期內容歸檔

掃描條件：`lifecycle: ephemeral` + `created > 14天前` + `status != archived`

**排除**：`Periodic/daily/`、`Periodic/weekly/`、`0 Inbox/`、模板、`keep: true` 標記文件

**操作**：
1. 移入 `4 Archives/ephemeral/YYYY-MM/`
2. 添加 frontmatter：`archived: true`、`archived_date`、`archived_reason`
3. 被其他非日記文件透過 wikilink 引用 → 不歸檔，改標記 `status: review`

`--quick` 模式下跳過此步驟。

### Step 5：專案狀態審查

掃描 `1 Projects/`：

| 檢查 | 條件 | 動作 |
|------|------|------|
| 過期專案 | `deadline` 已過 + `status != completed` | 列入週記待審查，提示確認 |
| 停滯專案 | >30 天無更新 + `status: active` | 標記 ⚠️，提示更新狀態 |
| 活躍專案 | `status: active` | 摘要本週進展 + 建議下週行動 |

### Step 6：Wiki 健康檢查

對所有 Wiki 子庫執行快速 lint：

- **死鏈**：`[[wikilink]]` 目標不存在 → 列出前 5 個
- **孤立頁**：沒有被任何頁面引用的 wiki 頁面
- **矛盾標記**：所有 `[!contradiction]` callout 匯總
- **低置信度**：`confidence: low` 的概念頁列表
- **未編譯原料**：各子庫 `compiled: false` 數量

結果寫入週記 `## 🔍 Wiki 健康報告` + `AI-Log/lint-[日期].md`

`--quick` 模式下跳過此步驟。

---

## 輸出摘要

```markdown
✅ 週回顧完成 — Week Ww (YYYY-MM-DD ~ YYYY-MM-DD)

📊 本週數據：
- 活躍專案 N | 完成任務 N | Inbox N 進/N 出
- Wiki 新建 N 頁 | 更新 N 頁

📝 週記：Periodic/weekly/YYYY/YYYY-Www.md
🗂️ 歸檔：N 個過期文件 → 4 Archives/ephemeral/YYYY-MM/

⚠️ 待確認：
- 過期專案 N | 停滯專案 N | 死鏈 N | 孤立頁 N

💡 建議下週優先：1. ... 2. ... 3. ...
```

## 注意事項

- **永不刪除文件**：歸檔 = 移動，非刪除
- **保留人類內容**：週記 `## 🤔 反思` 永不覆蓋
- **成本控制**：Step 3 每子庫上限 10 個文件
- **可中斷**：`--step N` 從指定步驟恢復
- **日期計算**：正確處理跨月、跨年邊界
- `--dry-run` 僅輸出預覽，不寫入任何文件
