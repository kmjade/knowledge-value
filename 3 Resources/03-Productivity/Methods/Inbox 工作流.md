---
# 工作流
interest-level: ⭐⭐⭐⭐⭐
last-reviewed: 2026-01-26
tags:
  - resource/productivity
  - para
  - workflow
---

# 工作流

# 工作流

---

## 📖 概述

### Inbox 是什麼？

Inbox 是 PARA 系統的第一站，用於：
- 快速記錄突發想法
# 整理
- 臨時存放在處理項目
- 避免思維中斷

### 為什麼需要 Inbox？

| 沒有 Inbox | 有 Inbox |
|------------|----------|
| 想法容易遺忘 | 立即捕獲不放過 |
# 管理
| 經常被打斷 | 保持心流狀態 |
# 整理

---

# 工作流

### 核心循環

```
# 整理
  ↑                             ↓
  └───────────────────────────────┘
```

### 三步法簡化流程

```
1️⃣ 捕獲 - 隨時記錄
# 整理
3️⃣ 歸位 - 放入 PARA 對應位置
```

---

## 📝 第一步：捕獲

### 捕獲原則

**原則 1：立即記錄**
- 想法出現時立即記下
- 不要依賴記憶力
- 先記錄後處理

**原則 2：保持簡單**
- 不要追求完美
- 用最簡單的方式記錄
- 重點不在格式，在於不遺忘

**原則 3：快速分類**
- 新增簡單標籤或分類
# 整理
- 預估處理時間

# 方法

# 方法

```markdown
---
type: idea
date: 2026-01-26
# 整理
---

# [想法標題]

## 描述
快速描述這個想法...

## 可行動
- [ ] 這個想法需要後續處理
- [ ] 相關聯的主題或項目

---
```

# 方法

創建 `0 Inbox/.templates/` 檔案夾，存放模板：

**想法模板** (`想法模板.md`):
```markdown
---
type: idea
created: {{date}}
tags: [inbox]
---

# {{title}}

## 核心想法
{{content}}

## 行動項目
- [ ]

## 相關
- [[]]
```

**資源模板** (`資源模板.md`):
```markdown
---
type: resource
created: {{date}}
tags: [inbox, resource]
url:
---

# {{title}}

## 摘要
{{content}}

## 分類
- [ ] Tech
- [ ] Learning
- [ ] Productivity
- [ ] Interests
```

# 方法

**Obsidian Mobile 快速筆記**:
1. 長按主頁 "+" 按鈕
2. 選擇 "0 Inbox"
3. 輸入標題和內容
4. 快速儲存

**其他工具整合**:
- Drafts → Obsidian 外掛
- iOS 快捷指令 → 創建筆記
- Android 自動化工具

---

## 🔄 第二步：處理

### 處理頻率

| 類型 | 推薦頻率 | 說明 |
|------|----------|------|
| 每日 | 每天 | 處理當日的新筆記 |
# 整理
| 每月 | 每月底 | 回顧和優化流程 |

### 處理清單

對每個 Inbox 項目，依次回答：

```
❓ 是否需要行動？
├─ 是 → 創建 Project（有目標和截止日期）
└─ 否 → 繼續

❓ 是否是持續責任？
├─ 是 → 創建 Area（沒有完成狀態）
└─ 否 → 繼續

❓ 是否是有價值的參考資料？
├─ 是 → 移入 Resources（根據主題分類）
└─ 否 → 繼續

❓ 是否需要保留但不常用？
├─ 是 → 移入 Archives
└─ 否 → 刪除或合併
```

# 指南

#### 步驟 1：評估

```markdown
# 評估問卷

1. 這個筆記的核心價值是什麼？
2. 它對我有什麼用處？
3. 我會在什麼時候用到它？
4. 它是否與現有的筆記有關聯？
```

#### 步驟 2：優化內容

```markdown
# 內容優化清單

- [ ] 標題清晰明確
- [ ] 有簡短的摘要
- [ ] 新增相關標籤
- [ ] 關聯相關筆記
- [ ] 去除重複或無用內容
```

#### 步驟 3：分類

```markdown
# 分類決策樹

有明確目標和截止日期？
├─ 是 → 1 Projects
│   └─ 選擇子類別：
│       ├─ 01-Learning
│       ├─ 02-Work
│       ├─ 03-Personal
│       └─ 04-Creative
└─ 否
   是持續的責任？
   ├─ 是 → 2 Areas
   │   └─ 選擇子類別：
   │       ├─ 01-Health
   │       ├─ 02-Career
   │       ├─ 03-Finance
   │       ├─ 04-Relationships
   │       ├─ 05-Learning
   │       └─ 06-Lifestyle
   └─ 否
      是有價值的資料？
      ├─ 是 → 3 Resources
      │   └─ 選擇子類別：
      │       ├─ 01-Tech
      │       ├─ 02-Learning
      │       ├─ 03-Productivity
      │       ├─ 04-Interests
      │       └─ 05-Reference
      └─ 否
         需要保留但已過時？
         ├─ 是 → 4 Archives
         └─ 否 → 刪除
```

---

## 📂 第三步：歸位

### 移動筆記

# 方法

1. 在 Obsidian 中打開筆記
2. 點擊檔案名 → "移動檔案"
3. 選擇目標位置
# 更新

# 方法

**Obsidian Git** + 自動化腳本：
```javascript
// 示例：自動移動腳本
const mappings = {
  '#project': '1 Projects',
  '#area': '2 Areas',
  '#resource': '3 Resources',
  '#archive': '4 Archives'
};

// 根據標籤自動分類
```

**Templater 腳本移動**：
```javascript
<%*
let targetFolder = "";
if (tp.file.tags.includes("#project")) {
  targetFolder = "1 Projects";
} else if (tp.file.tags.includes("#area")) {
  targetFolder = "2 Areas";
}
await tp.file.move(tp.file.path.replace("0 Inbox", targetFolder));
%>
```

# 更新

# 更新

```yaml
---
# 移動前（Inbox）
# 整理

# 移動後（Projects）
tags: [project/learning]
status: active
due: 2024-02-01
priority: 3
---
```

---

# 工作流

### 推薦的 Obsidian 設置

#### 1. 設置默認位置

```
設置 → 檔案與連結
默認附件位置 → 指定檔案夾 → "0 Inbox"
新筆記的存放位置 → 指定檔案夾 → "0 Inbox"
```

#### 2. 設置快速捷徑

```
設置 → 快捷鍵
創建新筆記 → Ctrl+N (指向 0 Inbox)
```

#### 3. 設置模板

安裝 Templater 外掛：
```javascript
// 快速捕獲模板
<%*
let title = await tp.system.prompt("標題");
let tags = await tp.system.prompt("標籤（用逗號分隔）");
%>
---
type: inbox
created: <% tp.date.now("YYYY-MM-DD") %>
tags: [<% tags %>, inbox]
---

# <%= title %>

## 內容
```

---

## 🎯 最佳實踐

### 每日例行

```
早晨（5 分鐘）:
# 查看
☐ 處理 3-5 個最緊急的項目

晚上（10 分鐘）:
☐ 回顧今天的 Inbox 捕獲
☐ 移動已完成的項目
☐ 新增明天的待辦事項
```

### 每週例行

```
週末（30-60 分鐘）:
☐ 清空整個 Inbox
☐ 評估每個項目的價值
☐ 移動到 PARA 對應位置
☐ 刪除不再需要的筆記
# 工作流
```

### 每月例行

```
月底（60-90 分鐘）:
# 分析
☐ 優化捕獲和處理流程
# 更新
☐ 評估 PARA 系統整體健康度
```

---

## 📊 監控指標

### 跟踪這些指標

| 指標 | 目標 | 說明 |
|------|------|------|
| Inbox 清空頻率 | 每週 | 保持 Inbox 精簡 |
| 平均處理時間 | <2 天 | 快速響應想法 |
| 筆記利用率 | >80% | 大部分筆記有價值 |
| 刪除率 | <20% | 減少無用捕獲 |

### Dataview 監控查詢

```dataview
TABLE without ID
  file.link AS "筆記",
  dateformat(file.ctime, "MM-dd") AS "創建日期",
  (date(today) - file.ctime).days AS "天數"
FROM "0 Inbox"
SORT file.ctime DESC
```

```dataview
TABLE without ID
  (length(filter(rows, (r) => (date(today) - r.file.ctime).days <= 7))) AS "本周新增",
  (length(filter(rows, (r) => (date(today) - r.file.ctime).days <= 30))) AS "本月新增",
  length(rows) AS "總數"
FROM "0 Inbox"
```

---

## ❌ 常見問題

### 問題 1：Inbox 積壓太多

**解決方案**:
1. 設定 Inbox 項目上限（如 20 個）
2. 每週固定處理時間
3. 簡化捕獲，減少噪音

### 問題 2：不知道如何分類

**解決方案**:
1. 使用「三步法問卷」幫助決策
2. 創建分類參考表
3. 使用標籤輔助分類

### 問題 3：忘記處理 Inbox

**解決方案**:
1. 設置提醒（日曆或待辦應用）
2. 與每週復盤綁定
3. 將 Inbox 顯示在首頁

### 問題 4：筆記格式不一致

**解決方案**:
1. 使用統一的模板
2. 自動化格式化腳本
3. 處理時統一優化

---

## 🔄 自動化技巧

### 1. 使用快速命令

**Obsidian 快速切換外掛**:
```javascript
// 快速移動命令
const commands = [
  { id: "move-to-projects", label: "移動到 Projects" },
  { id: "move-to-areas", label: "移動到 Areas" },
  { id: "move-to-resources", label: "移動到 Resources" }
];
```

### 2. 智能分類建議

使用 AI 外掛（如 Claude）自動建議分類：
```
問：這個筆記應該歸類到哪裡？
# 分析
```

### 3. 定期清理腳本

```javascript
// 自動歸檔超過 30 天的 Inbox 項目
const daysOld = 30;
const cutoffDate = new Date();
cutoffDate.setDate(cutoffDate.getDate() - daysOld);
```

---

## 📚 模板資源

### 基礎模板集

將以下模板儲存到 `_templates/` 或 `0 Inbox/.templates/`：

1. `想法捕獲.md`
2. `資源收集.md`
3. `快速筆記.md`
4. `待辦事項.md`
5. `會議記錄.md`

# 方法

1. 在 Obsidian 中安裝 Templates 外掛
2. 設置模板檔案夾
3. 使用快捷鍵或命令插入模板
4. 填寫內容後儲存到 Inbox

---

## 🔗 相關資源

### PARA 系統
# 工作流
- [[3 Resources/03-Productivity/Methods/Getting Things Done]] (待創建)

### 工具
- [[Obsidian 外掛精選]]
# 管理

### 參考
- [The PARA Method](https://fortelabs.com/blog/para/)
- [Building a Second Brain](https://www.buildingasecondbrain.com/)

---

## ✅ 快速參考卡

### 捕獲原則
- 立即記錄
- 保持簡單
- 快速分類

### 處理三問
1. 是否需要行動？→ Projects
2. 是否是持續責任？→ Areas
3. 是否有價值？→ Resources
4. 都不是？→ 刪除或歸檔

### 頻率建議
- 每日：處理當日新增
- 每週：清空 Inbox
- 每月：優化流程

---

> **提示**: Inbox 的核心目標是「快速捕獲，定期處理」，不要讓它成為垃圾場
