---
title: 原子任務：設置快速分類機制
type: atomic-task
difficulty: intermediate
estimated-time: 30-45 minutes
completion-criteria:
  - 快速分類機制已設置
  - 能快速分類新資訊
  - 測試通過 3 個範例
---

# 任務目標
建立快速分類機制，減少分類決策時間

## 快速分類的重要性

### 為什麼需要快速分類？

**問題**：收集的資訊堆積在收件箱，不知道如何處理

**解決**：快速分類機制讓你能在幾秒鐘內決定資訊的歸屬

**好處**：
- **減少決策時間**：不用每次都思考三問測試
- **提高處理速度**：加快收件箱清理速度
- **保持一致性**：使用相同的分類標準
- **降低心理負擔**：減少分類的決策疲勞

---

## 分類機制設計

### 選項 1：標籤系統

#### PARA 標籤設計

**基礎標籤**：
- `#para/project` - 項目
- `#para/area` - 領域
- `#para/resource` - 資源
- `#para/archive` - 歸檔

**細分標籤**：
- `#para/project/work` - 工作項目
- `#para/project/learning` - 學習項目
- `#para/project/personal` - 個人項目
- `#para/area/health` - 健康領域
- `#para/area/finance` - 財務領域
- `#para/area/career` - 職業領域
- `#para/resource/tech` - 技術資源
- `#para/resource/hobby` - 興趣資源

**狀態標籤**：
- `#status/active` - 活躍
- `#status/on-hold` - 暫停中
- `#status/completed` - 已完成
- `#status/cancelled` - 已取消

**優先級標籤**：
- `#priority/high` - 高優先級
- `#priority/medium` - 中優先級
- `#priority/low` - 低優先級

---

### 選項 2：QuickAdd 模板（Obsidian）

#### QuickAdd 選擇設置

**設置步驟**：
1. 安裝 QuickAdd 插件
2. 建立 QuickAdd Choice
3. 設定四個類別選項
4. 設定對應的模板

**QuickAdd Choice 範例**：

```javascript
// QuickAdd Settings
{
  "choices": [
    {
      "id": "project",
      "name": "🎯 Project",
      "type": "template",
      "templatePath": "_templates/para/quick/Project.md"
    },
    {
      "id": "area",
      "name": "🔴 Area",
      "type": "template",
      "templatePath": "_templates/para/quick/Area.md"
    },
    {
      "id": "resource",
      "name": "📚 Resource",
      "type": "template",
      "templatePath": "_templates/para/quick/Resource.md"
    },
    {
      "id": "archive",
      "name": "📦 Archive",
      "type": "template",
      "templatePath": "_templates/para/quick/Archive.md"
    }
  ]
}
```

---

### 選項 3：快速鍵配置

#### 數位工具快速鍵設置

**Obsidian 快速鍵配置**：

| 快速鍵 | 動作 | 說明 |
|---------|------|------|
| `Ctrl/Cmd + Shift + P` | 創建 Project | 建立新項目筆記 |
| `Ctrl/Cmd + Shift + A` | 創建 Area | 建立新領域筆記 |
| `Ctrl/Cmd + Shift + R` | 創建 Resource | 建立新資源筆記 |
| `Ctrl/Cmd + Shift + I` | 打開收件箱 | 快速打開收件箱 |

**Notion 快速鍵配置**：

| 快速鍵 | 動作 | 說明 |
|---------|------|------|
| `Ctrl/Cmd + N` | 新增頁面 | 建立新頁面 |
| `Ctrl/Cmd + Shift + P` | 複製 Project 模板 | 複製項目模板 |
| `Ctrl/Cmd + Shift + A` | 複製 Area 模板 | 複製領域模板 |
| `Ctrl/Cmd + Shift + R` | 複製 Resource 模板 | 複製資源模板 |

---

### 選項 4：工作流程自動化

#### 自動化分類建議

**使用 Dataview 自動分類**：

```dataview
TABLE
  file.link as "項目",
  status as "狀態",
  priority as "優先級",
  due as "截止日期"
FROM #para/project
WHERE status = "active"
SORT priority DESC, due ASC
```

**使用 Templater 自動分類**：

```javascript
<%*
// 獲取使用者輸入
let type = await tp.system.suggester(
  ["🎯 Project", "🔴 Area", "📚 Resource", "📦 Archive"],
  ["project", "area", "resource", "archive"]
);

// 根據選擇設定標籤
let tags = {
  project: ["#para/project", "#status/active"],
  area: ["#para/area", "#status/active"],
  resource: ["#para/resource"],
  archive: ["#para/archive"]
};

tR += `tags: ${tags[type].join(", ")}`;
%>
```

---

## 設置步驟

### 步驟 1：選擇分類機制（10 分鐘）

#### 決策清單
- [ ] 我使用什麼工具？（Obsidian/Notion/其他）
- [ ] 我偏好什麼方式？（標籤/QuickAdd/快速鍵）
- [ ] 我需要自動化嗎？
- [ ] 我的技術水平如何？

#### 推薦選擇

**Obsidian 用戶：**
- 初級：使用標籤系統
- 中級：使用 QuickAdd 模板
- 高級：使用 Templater 自動化

**Notion 用戶：**
- 初級：使用標籤和模板
- 中級：使用資料庫和屬性
- 高級：使用 Notion API 自動化

---

### 步驟 2：設置標籤系統（15 分鐘）

#### 建立基礎標籤

**在筆記中添加標籤**：

```markdown
---
tags:
  - #para/project
  - #status/active
  - #priority/high
---
```

**標籤使用規則**：
- 英文主標籤 + 中文子標籤
- 使用連字符分隔單詞
- 使用斜槓分層
- 保持 3-4 層深度

---

### 步驟 3：設置 QuickAdd（15 分鐘）

#### Obsidian QuickAdd 設置

**安裝 QuickAdd 插件**：
1. 設定 → 社群插件 → 瀏覽 → 搜索「QuickAdd」
2. 安裝並啟用 QuickAdd
3. 開啟 QuickAdd 設定

**建立 QuickAdd Choice**：
1. 點擊「Manage Choices」
2. 點擊「Create new choice」
3. 設定 Choice 名稱和 ID
4. 選擇「Template」類型
5. 設定模板路徑

**建立快速鍵**：
1. QuickAdd 設定 → Hotkeys
2. 為每個 Choice 設定快速鍵
3. 測試快速鍵是否正常運作

---

### 步驟 4：測試快速分類（5 分鐘）

#### 測試範例 1：Project
**內容**：完成季度銷售報告

**測試步驟**：
1. 開啟快速分類工具
2. 選擇 Project
3. 輸入內容
4. 檢查標籤是否正確

**預期結果**：
- 標籤：`#para/project`, `#status/active`, `#priority/high`
- 分類時間 < 10 秒

---

#### 測試範例 2：Area
**內容**：維持運動習慣

**測試步驟**：
1. 開啟快速分類工具
2. 選擇 Area
3. 輸入內容
4. 檢查標籤是否正確

**預期結果**：
- 標籤：`#para/area`, `#area/health`, `#status/active`
- 分類時間 < 10 秒

---

#### 測試範例 3：Resource
**內容**：收集 Python 學習資源

**測試步驟**：
1. 開啟快速分類工具
2. 選擇 Resource
3. 輸入內容
4. 檢查標籤是否正確

**預期結果**：
- 標籤：`#para/resource`, `#resource/tech`, `#resource/python`
- 分類時間 < 10 秒

---

## 快速分類檢查清單

### Project 檢查
- [ ] 有明確的完成目標嗎？
- [ ] 需要連續執行嗎？
- [ ] 有截止日期嗎？
- [ ] 產出具體成果嗎？

### Area 檢查
- [ ] 沒有「完成」狀態嗎？
- [ ] 需要持續投入嗎？
- [ ] 是生活的重要領域嗎？
- [ ] 有最低標準需要達成嗎？

### Resource 檢查
- [ ] 沒有完成壓力嗎？
- [ ] 純粹收集資訊嗎？
- [ ] 可自由探索嗎？
- [ ] 未來可能使用嗎？

---

## 驗證標準

- [ ] 分類機制已設置（標籤/QuickAdd/快速鍵）
- [ ] 快速鍵已配置
- [ ] 3 個測試範例通過
- [ ] 分類時間 < 10 秒

## 下一步

完成此原子任務後，繼續學習：
- [[Daily-Inbox-Processing.md]] - 學習每日收件箱處理
- [[Decision-Flow-Application.md]] - 學習決策流程應用
- [[Setup-Collection-Points.md]] - 復習收集點建立
