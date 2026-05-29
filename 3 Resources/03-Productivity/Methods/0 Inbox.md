---
# 指南
aliases:
  - 收件箱
  - 0 Inbox
tags:
  - inbox
  - para
  - workflow
created: 2026-01-27
updated: 2026-01-28
---

> [!info] Inbox 是什么？
# 整理

---

## 📊 快速概览

| 当前狀態 | 目標 | 操作 |
|---------|------|------|
# 查看
# 整理
| ⏱️ 平均處理時間 | < 2 天 | 優化處理流程 |

> [!tip] 快速操作
# 查看
# 整理
> - 創建新筆記：使用下方快速模板

---

## 📋 Inbox 结构

```
0 Inbox/
# 指南
├── Inbox Dashboard.md      # 实时監控仪表盘
├── Journal/                # 日記資料夾（按日期组织）
│   └── 2026/
│       └── 01-January/
│           ├── 2026-01-26.md
│           └── 2026-01-27.md
# 整理
```

---

# 工作流

### 三步法核心流程

```
1️⃣ 捕获 → 随时記錄（3分钟原則）
# 整理
3️⃣ 归位 → 放入 PARA 对应位置（自動化辅助）
```

> [!important] 流程核心
> **快速捕获，定期處理，自動归位** - 让想法不被遗忘，但也不堆积

# 工作流

```
┌─────────────────────────────────────────────────────────┐
│                    📥 Inbox 系統                        │
└─────────────────────────────────────────────────────────┘
                          ↓
    ┌─────────────────────────────────────────────┐
    │  1️⃣ 捕获階段              │
    │  - 灵感/想法 → 想法模板                      │
    │  - 資源/連結 → 資源模板                      │
    │  - 問題/挑戰 → 問題卡模板                    │
    │  - 快速筆記 → 快速記錄模板                   │
    └─────────────────────────────────────────────┘
                          ↓
    ┌─────────────────────────────────────────────┐
    │  2️⃣ 處理階段（每日/每周）                    │
    │  - 評估價值（三问法）                        │
    │  - 確定優先級（Eisenhower 矩阵）              │
    │  - 優化內容（标题/標籤/連結）                  │
    │  - 决定去向（PARA 分類）                      │
    └─────────────────────────────────────────────┘
                          ↓
    ┌─────────────────────────────────────────────┐
    │  3️⃣ 归位階段（自動化辅助）                    │
    │  - Projects: 有目標+截止日期                  │
    │  - Areas: 持續责任领域                        │
    │  - Resources: 參考资料                        │
    │  - Archives: 歸檔或刪除                       │
    └─────────────────────────────────────────────┘
```

---

## 📝 第一步：捕获

### 捕获原則（3分钟原則）

**原則 1：立即記錄**
- 想法出现时立即记下（< 3分钟）
- 不要依赖记忆力
- 先記錄后處理

**原則 2：保持简单**
- 不要追求完美
- 用最简单的方式記錄
- 重点不在格式，在于不遗忘

**原則 3：快速分類**
- 新增简单標籤或分類
# 整理
- 预估處理時間（5min/30min/2h）

# 方法

# 方法
|------|---------|------|------|
| 快速筆記 | 突发想法 | 最快，無模板 | Ctrl+N |
# 整理
| 資源模板 | 收集资料 | 便于後續研究 | Template |
| 問題卡 | 解決問題 | 系統化追踪 | Template |

### 快速捕获模板

#### 🧠 想法捕获模板

> **适用場景**：突然的想法、灵感、创意

```markdown
---
type: idea
created: 2026-01-28
tags: [inbox, idea]
priority: 🔵 # 🔵低 🟡中 🔴高
estimated: 5min
---

# 想法标题

## 💡 核心想法
快速描述這個想法...

## 🎯 行动潜力
- [ ] 需要立即行动
- [ ] 需要进一步探索
- [ ] 暂时儲存參考

## 🔗 相關
- [[]] 相關的專案/领域/資源
- [[]]
```

#### 📚 資源收集模板

> **适用場景**：文章、視訊、书籍、工具推荐

```markdown
---
type: resource
created: 2026-01-28
tags: [inbox, resource]
url: https://example.com
category: #tech/learning/productivity
---

# 資源标题

## 📝 摘要
資源的主要內容...

## 🏷️ 分類预判
- [ ] Tech - 技術相關
- [ ] Learning - 學習资料
# 效率
- [ ] Interests - 兴趣爱好

## ✅ 行动项
- [ ] 需要进一步研究
- [ ] 可以立即使用
# 分享
```

#### ❓ 問題卡模板

> **适用場景**：遇到問題、需要解決的挑戰

```markdown
---
type: problem
created: 2026-01-28
tags: [inbox, problem]
status: 🔴 # 🔴待解決 🟡處理中 🟢已解決
---

# 問題标题

## 📋 問題描述
<!-- 詳細描述問題的症状和现象 -->
- 症状 1
- 症状 2

# 分析
<!-- 初步判斷問題可能的原因 -->
- 原因 1
- 原因 2

## 💡 可能的解決方案
- [ ] 方案 1
- [ ] 方案 2

## 🔗 相關連結
- [[相關問題]]
- [[相關筆記]]
```

#### ⚡ 快速記錄模板

> **适用場景**：會議記錄、对话要點、临时筆記

```markdown
---
type: quicknote
created: 2026-01-28
tags: [inbox, quicknote]
---

# 标题

## 📌 要點
- 要點 1
- 要點 2
- 要點 3

## 📅 後續行动
- [ ] 行动 1
- [ ] 行动 2
```

---

## 🔄 第二步：處理

### 處理频率

| 类型 | 推荐频率 | 时长 | 說明 |
|------|----------|------|------|
# 整理
# 整理
| **每月優化** | 每月底 | 60-90分钟 | 回顧和優化流程 |

> [!warning] 處理红线
> - Inbox 筆記数 > 30 时触发警告
> - 逾期筆記（> 7天）必须优先處理
- 每周必须清空一次 Inbox

### 處理三问 + 優先級矩阵

#### 處理三问（PARA 決策）

对每个 Inbox 專案，依次回答：

```
❓ Q1: 是否需要下一步行动？
├─ 是 → 繼續问 Q2
└─ 否 → 跳到 Q3

❓ Q2: 有明确的截止日期吗？
├─ 是 → 🎯 創建 Project
└─ 否 → 🎯 創建 Area（持續责任）

❓ Q3: 是否是有價值的參考资料？
├─ 是 → 📚 移入 Resources（按主題分類）
└─ 否 → 繼續

❓ Q4: 是否需要保留但不常用？
├─ 是 → 📦 移入 Archives
└─ 否 → 🗑️ 刪除或合并
```

#### Eisenhower 優先級矩阵

> 在處理时，使用這個矩阵確定處理優先級：

| | 紧急 | 不紧急 |
|---|---|---|
| **重要** | 🔴 **P1: 立即處理**<br>• 優先級：最高<br>• 动作：现在就做<br>• 示例：今日必须完成的任務 | 🟡 **P2: 計劃安排**<br>• 優先級：高<br>• 动作：放入日程表<br>• 示例：重要但不紧急的專案 |
| **不重要** | 🔵 **P3: 委托處理**<br>• 優先級：中<br>• 动作：委派他人<br>• 示例：琐碎但紧急的事 | ⚪ **P4: 刪除/歸檔**<br>• 優先級：低<br>• 动作：刪除或歸檔<br>• 示例：無價值資訊 |

> [!tip] 處理技巧
> 按 P1 → P2 → P3 → P4 的顺序處理，P4 可以批量刪除或歸檔

### 分類決策树（詳細版）

```
開始處理 Inbox 筆記
         ↓
┌─────────────────────────────┐
│ 有下一步行动吗？              │
└─────────────────────────────┘
   │ 是              │ 否
   ↓                 ↓
┌──────────────────┐  ┌─────────────────────────────┐
│ 有明确截止日期？  │  │ 是有價值的參考资料吗？        │
└──────────────────┘  └─────────────────────────────┘
  │ 是      │ 否       │ 是              │ 否
  ↓         ↓          ↓                 ↓
🎯 Projects  🎯 Areas  📚 Resources    ┌──────────────────┐
  ├─ 01-Learning  ├─ 01-Health    ├─ 01-Tech       │ 需要保留吗？    │
  ├─ 02-Work     ├─ 02-Career    ├─ 02-Learning  └──────────────────┘
  ├─ 03-Personal ├─ 03-Finance   ├─ 03-Productivity │ 是    │ 否
  └─ 04-Creative └─ 04-Relationships├─ 04-Interests   ↓      ↓
                  ├─ 05-Learning  └─ 05-Reference  📦 Archives 🗑️ 刪除
                  └─ 06-Lifestyle
```

### 處理檢查清單

对每个筆記處理前，快速檢查：

```markdown
## 📋 處理檢查清單

### 基礎資訊
- [ ] 标题清晰明确
- [ ] 有简短摘要（2-3句话）
- [ ] 創建日期正确

### 分類決策
- [ ] 已回答處理三问
- [ ] 已確定 PARA 分類
- [ ] 已設置優先級（🔴P1/🟡P2/🔵P3/⚪P4）

### 內容優化
- [ ] 新增相關標籤
- [ ] 关联相關筆記（至少1个）
- [ ] 去除重复或無用內容
- [ ] 预估處理時間

### 行动项
- [ ] 提取可行动任務（如果有）
- [ ] 設置截止日期（如果是 Project）
- [ ] 关联到现有專案/领域
```

---

## 📂 第三步：归位

# 方法

# 方法

1. 在 Obsidian 中打開筆記
2. 点击檔案名 → "移动檔案"（或拖拽）
3. 選擇目標位置（PARA 对应資料夾）
# 更新
# 更新

# 方法

**安裝 Templater 外掛后，創建以下命令**：

```javascript
<%*
// PARA 快速移动腳本
const targetFolders = {
  '#project': '1 Projects',
  '#area': '2 Areas',
  '#resource': '3 Resources',
  '#archive': '4 Archives'
};

let targetFolder = null;
let tags = tp.file.tags;

// 檢查標籤確定目標
for (let tag of tags) {
  if (targetFolders[tag]) {
    targetFolder = targetFolders[tag];
    break;
  }
}

if (!targetFolder) {
  // 如果没有明确標籤，让使用者選擇
  const choices = ['Projects', 'Areas', 'Resources', 'Archives'];
  const choice = await tp.system.suggester(choices, choices);
  if (choice) {
    targetFolder = {
      'Projects': '1 Projects',
      'Areas': '2 Areas',
      'Resources': '3 Resources',
      'Archives': '4 Archives'
    }[choice];
  }
}

if (targetFolder) {
  const newPath = tp.file.path.replace(/^0 Inbox\//, targetFolder + '/');
  await tp.file.move(newPath);
  tR += `✅ 已移动到 ${targetFolder}`;
} else {
  tR += '❌ 未選擇目標資料夾';
}
%>
```

# 方法
1. 在筆記中新增相应標籤（如 `#project`）
2. 運行腳本或設置快捷键
3. 自動移动到对应位置

# 方法

# 分析

# 更新

# 更新

#### 移动到 Projects
```yaml
---
# 移动前（Inbox）
# 整理

# 移动后（Projects）
# 更新
status: active            # 新增狀態
due: 2026-02-01          # 新增截止日期
priority: 3              # 新增優先級（1-5）
created: 2026-01-28      # 保留創建日期
# 更新
---
```

#### 移动到 Areas
```yaml
---
# 移动后（Areas）
# 更新
status: active           # Areas 持續活跃
review_frequency: weekly # 設置回顧频率
last_review: 2026-01-28
next_review: 2026-02-04
created: 2026-01-28
---
```

#### 移动到 Resources
```yaml
---
# 移动后（Resources）
# 更新
interest-level: ⭐⭐⭐⭐  # 新增兴趣级别
last-reviewed: 2026-01-28
created: 2026-01-28
url: https://...         # 如果是連結，保留 URL
---
```

#### 移动到 Archives
```yaml
---
# 移动后（Archives）
tags: [archived]
archived_date: 2026-01-28
archived_reason: "已完成/过时"
created: 2026-01-28
---
```

### 自動化归位設置

#### Obsidian 設置

1. **設置默认附件位置**：
   - 設置 → 檔案与連結 → 默认附件位置 → 指定資料夾 → `0 Inbox`

2. **設置新筆記位置**：
   - 設置 → 檔案与連結 → 新筆記的存放位置 → 指定資料夾 → `0 Inbox`

3. **設置快捷键**：
   - 設置 → 快捷键 → 創建新筆記 → `Ctrl+N`（指向 0 Inbox）

#### 自動歸檔规则（可选）

使用 Obsidian 外掛 **Auto Note Mover** 設置自動规则：

```javascript
// 自動歸檔超过 30 天的 Inbox 筆記到 Archives
const daysThreshold = 30;
const targetFolder = '4 Archives';
```

---

## 🎯 最佳實踐

### 📅 每日例行（15分钟）

#### 早晨例程（5分钟）- 啟動仪式
```
# 查看
☐ 處理昨日新增的 P1（紧急重要）專案
☐ 快速瀏覽其他專案，標記優先級
☐ 選擇 1-2 个今日要完成的行动
```

#### 晚间例程（10分钟）- 收尾仪式
```
# 查看
☐ 快速分類到 PARA（< 3分钟的專案）
☐ 標記未處理專案的優先級
☐ 記錄今日完成情况
☐ 預覽明天的重点任務
```

> [!tip] 每日檢查清單
> - Inbox 筆記数 < 20 ✅
> - 今日新增已分類 ✅
> - 無 P1 逾期專案 ✅

# 整理

#### 周日回顧（建議固定時間）

```
📊 狀態檢查（5分钟）
# 查看
☐ 檢查 PARA 转化率（目標 > 80%）
☐ 识别积压專案（> 7天）

🔄 清空 Inbox（20-40分钟）
☐ 按優先級處理所有專案（P1 → P2 → P3 → P4）
☐ 批量移动相似类型的筆記
☐ 刪除或合并無價值內容
☐ 确保 Inbox 完全清空

📈 流程優化（5-10分钟）
# 效率
☐ 识别重复出现的筆記类型
☐ 考虑是否需要新模板
# 更新
```

> [!success] 每周目標
> - Inbox 完全清空 ✅
> - 所有筆記已归位到 PARA ✅
> - 转化率 > 80% ✅

### 📅 每月例行（60-90分钟）- 系統優化

#### 月底复盘

```
# 分析
# 查看
☐ 統計各类型筆記数量
# 效率
☐ 识别瓶颈問題

🔍 流程審查（30分钟）
☐ 評估捕获流程是否顺畅
☐ 檢查處理時間是否合理
☐ 審查模板使用情况
☐ 測試自動化腳本

⚙️ 系統優化（20分钟）
# 更新
★ 调整自動化腳本
☐ 清理無用標籤
☐ 優化資料夾结构

# 更新
☐ 記錄本月發現的問題
# 工作流
# 分享
```

### 🎯 季度目標（每季度檢查）

| 指标 | 目標值 | 当前值 | 狀態 |
|------|--------|--------|------|
| Inbox 清空率 | 100% | ___% | ___ |
| 平均處理時間 | < 2天 | ___天 | ___ |
| PARA 转化率 | > 80% | ___% | ___ |
| 筆記利用率 | > 85% | ___% | ___ |

---

## 📊 監控指标与仪表盘

### 關鍵效能指标（KPIs）

| 指标 | 目標值 | 当前值 | 狀態 |
|------|--------|--------|------|
| **Inbox 清空率** | 每周 | ___% | ⏳ |
| **平均處理時間** | < 2天 | ___天 | ⏳ |
| **PARA 转化率** | > 80% | ___% | ⏳ |
| **筆記利用率** | > 85% | ___% | ⏳ |
| **刪除率** | < 15% | ___% | ⏳ |

> [!info] 如何获取当前值
# 查看

### 实时仪表盘

> 📊 **完整仪表盘**：[[Inbox Dashboard]]
>
> 仪表盘包含以下视图：
# 排序
> - 📅 今日/本周/本月新增統計
> - 🔴 逾期專案预警（> 7天）
> - 📊 按类型分類統計
# 分析
> - ✅ 處理檢查清單

### 快速 Dataview 查詢

# 查看

```dataview
TABLE WITHOUT ID
  file.link AS "筆記",
  dateformat(file.ctime, "MM-dd") AS "創建",
  (date(today) - file.ctime).days AS "天数",
  tags AS "標籤"
FROM "0 Inbox"
WHERE file.path != "0 Inbox/0 Inbox.md" AND file.path != "0 Inbox/Inbox Dashboard.md"
SORT (date(today) - file.ctime).days DESC
LIMIT 20
```

# 查看

```dataview
TABLE WITHOUT ID
  file.link AS "逾期筆記",
  dateformat(file.ctime, "MM-dd") AS "創建",
  (date(today) - file.ctime).days AS "逾期天数"
FROM "0 Inbox"
WHERE (date(today) - file.ctime).days > 7
  AND file.path != "0 Inbox/0 Inbox.md"
  AND file.path != "0 Inbox/Inbox Dashboard.md"
SORT (date(today) - file.ctime).days DESC
```

#### 3. 統計本周新增

```dataview
LIST rows.file.link
FROM "0 Inbox"
WHERE (date(today) - file.ctime).days <= 7
  AND file.path != "0 Inbox/0 Inbox.md"
  AND file.path != "0 Inbox/Inbox Dashboard.md"
SORT file.ctime DESC
```

#### 4. PARA 转化率計算

```dataview
TABLE WITHOUT ID
  length(filter(rows, (r) => (date(today) - r.file.ctime).days <= 7)) AS "本周新增",
  length(filter(rows, (r) => (date(today) - r.file.ctime).days <= 30)) AS "本月新增",
  length(rows) AS "当前总数"
FROM "0 Inbox"
WHERE file.path != "0 Inbox/0 Inbox.md" AND file.path != "0 Inbox/Inbox Dashboard.md"
```

### 手動記錄表（可选）

如果你更喜欢手動跟踪，可以創建這個表格：

| 日期 | 新增 | 處理 | 刪除 | 转化率 | 备注 |
|------|------|------|------|--------|------|
| 2026-01-21 | 5 | 4 | 0 | 80% | 正常 |
| 2026-01-22 | 8 | 7 | 1 | 88% | 好 |
| 2026-01-23 | 3 | 3 | 0 | 100% | 優秀 |
| 2026-01-24 | 12 | 10 | 2 | 83% | 忙碌 |
| 2026-01-25 | 6 | 6 | 0 | 100% | 正常 |
| 2026-01-26 | 4 | 3 | 1 | 75% | 待處理 |
| 2026-01-27 | 7 | ___ | ___ | ___% | ___ |
| 2026-01-28 | ___ | ___ | ___ | ___% | ___ |

---

## 🛠️ 自動化与工具

### Templater 腳本集

#### 1. 快速捕获腳本

**功能**：快速創建 Inbox 筆記，支持選擇模板类型

```javascript
<%*
// 快速捕获腳本
const templateTypes = {
  '💡 想法': '想法模板',
  '📚 資源': '資源模板',
  '❓ 問題': '問題卡模板',
  '⚡ 快速筆記': '快速記錄模板'
};

let choice = await tp.system.suggester(
  Object.keys(templateTypes),
  Object.values(templateTypes)
);

let title = await tp.system.prompt("标题");
tR += `---
title: ${title}
created: ${tp.date.now("YYYY-MM-DD")}
tags: [inbox]
---

# ${title}

## 內容

## 後續行动
- [ ]
`;
%>
```

#### 2. 批量處理腳本

**功能**：批量为 Inbox 筆記新增 PARA 標籤

```javascript
<%*
// 批量新增 PARA 標籤
const paraOptions = ['project', 'area', 'resource', 'archive'];

let notes = app.vault.getMarkdownFiles()
  .filter(f => f.path.startsWith('0 Inbox'))
  .filter(f => f.path !== '0 Inbox/0 Inbox.md');

for (let note of notes) {
  let choice = await tp.system.suggester(
    paraOptions,
    paraOptions,
    false,
    `處理: ${note.basename}`
  );
  if (choice) {
    let content = await app.vault.read(note);
    let newContent = content.replace(
      /tags: \[inbox\]/,
      `tags: [inbox, ${choice}]`
    );
    await app.vault.modify(note, newContent);
  }
}
%>
```

### Obsidian 外掛推荐

| 外掛 | 用途 | 必需度 |
|------|------|--------|
| **Templater** | 模板和自動化 | ⭐⭐⭐⭐⭐ 必需 |
| **Dataview** | 數據查詢和仪表盘 | ⭐⭐⭐⭐⭐ 必需 |
| **QuickAdd** | 快速捕获和命令 | ⭐⭐⭐⭐ 推荐 |
# 管理
| **Calendar** | 日历视图 | ⭐⭐ 可选 |
| **Heatmap Calendar** | 活动热力图 | ⭐⭐ 可选 |

### 快捷键設置

| 操作 | 默认快捷键 | 建議快捷键 |
|------|-----------|-----------|
| 創建新筆記 | Ctrl+N | Ctrl+N |
| 快速打開命令 | Ctrl+P | Ctrl+P |
| 插入模板 | 無 | Ctrl+Shift+T |
| 移动檔案 | 無 | Ctrl+Shift+M |
| 搜尋 | Ctrl+Shift+F | Ctrl+Shift+F |

### 命令面板整合

在 `.obsidian/commands.json` 中新增自定义命令（如果需要）：

```json
{
  "commands": [
    {
      "id": "inbox-quick-capture",
      "name": "Inbox: 快速捕获",
      "callback": "() => { ... }"
    },
    {
      "id": "inbox-batch-process",
      "name": "Inbox: 批量處理",
      "callback": "() => { ... }"
    }
  ]
}
```

---

## 📚 模板資源

### 可用模板

在 `0 Inbox/` 或 `_templates/PARA/` 中应包含以下模板：

| 模板名称 | 檔案名 | 用途 | 狀態 |
|---------|--------|------|------|
| 想法捕获模板 | `想法模板.md` | 記錄灵感和想法 | ✅ 已在文檔中 |
| 資源收集模板 | `資源模板.md` | 收集资料和連結 | ✅ 已在文檔中 |
| 問題卡模板 | `問題卡模板.md` | 追踪問題和解決方案 | ✅ 已在文檔中 |
| 快速記錄模板 | `快速記錄模板.md` | 快速筆記和要點 | ✅ 已在文檔中 |
| Project 模板 | `Project.md` | 創建新專案 | 📄 外部引用 |
| Area 模板 | `Area.md` | 創建新领域 | 📄 外部引用 |
| Resource 模板 | `Resource.md` | 創建新資源 | 📄 外部引用 |

# 方法

1. **安裝 Templates 外掛**：
   - 設置 → 社區外掛 → 瀏覽 → 搜尋 "Templates"
   - 安裝并启用

2. **設置模板資料夾**：
   - 設置 → Templates → Template folder location
   - 選擇 `0 Inbox/.templates/` 或 `_templates/PARA/`

3. **使用快捷键或命令**：
   - 設置 → 快捷键 → Templates: Insert template
   - 設置快捷键（如 `Ctrl+Shift+T`）

4. **創建模板檔案**：
   - 将上方的模板代碼複製到对应檔案
   - 儲存到模板資料夾

---

## ❌ 常见問題与解決方案

### Q1: Inbox 积压太多，不知道从何開始？

**A**: 使用「5分钟啟動法」：
1. 設置 5 分钟计时器
2. 只處理最旧的 1-2 个專案
3. 不追求完美，只求移动
4. 每天重复，直到清空

> [!tip] 积压處理策略
> - 按優先級：P1 → P2 → P3 → P4
> - 按時間：最旧的优先
> - 按类型：同类批量處理

### Q2: 不知道如何分類到 PARA？

**A**: 使用「三问法 + 決策树」：
```
1. 需要行动？→ 是 → 有截止日期？
                              ├─ 有 → Projects
                              └─ 無 → Areas
   └─ 否 → 有參考價值？
              ├─ 有 → Resources
              └─ 無 → Archives 或刪除
```

> [!example] 实战案例
> - "學習 Python" → 需要行动 + 無截止日期 → Areas
> - "完成年度報告" → 需要行动 + 有截止日期 → Projects
> - "Obsidian 使用技巧" → 無需行动 + 有參考價值 → Resources

### Q3: 经常忘记處理 Inbox？

**A**: 建立提醒機制：
1. **手机日历提醒**：每天晚上 9 点提醒處理
2. **Obsidian 外掛**：使用 "Review" 外掛設置提醒
3. **環境暗示**：在 Inbox 資料夾新增 `0_待處理` 前缀
4. **习惯绑定**：与现有习惯绑定（如刷牙后、睡觉前）

# 整理

**A**: 標準化方案：
1. 統一使用模板（见上方模板部分）
2. 處理时統一優化（见處理檢查清單）
3. 使用 Templater 腳本自動格式化
4. 定期審查和清理不規範筆記

### Q5: 移动筆記后連結失效？

# 更新
# 更新
- 避免使用绝对路徑
# 更新

### Q6: 如何避免 Inbox 成为垃圾场？

**A**: 防护措施：
1. **捕获时把关**：只在有價值时記錄
2. **定期清理**：每周清空，刪除無用內容
3. **設置上限**：Inbox 筆記数 > 30 时强制停止捕获
4. **品質評估**：處理时问自己"這個筆記真的有用吗？"

---

## 🔗 相關資源

### PARA 系統文檔
# 工作流
# 工作流
# 工作流

### 仪表盘与監控
- [[Inbox Dashboard]] - 实时監控 Inbox 狀態
# 查看
# 整理

### 模板与工具
# 指南
- [[_templates/general/問題卡]] - 問題卡模板
- [[問題卡_20260127]] - 問題卡示例

### 外部參考
# 方法
- [Building a Second Brain](https://www.buildingasecondbrain.com/) - 第二大脑理论
# 方法

---

## ✅ 快速參考卡

### 🎯 核心原則
- **快速捕获** - 3分钟原則，不追求完美
# 整理
- **自動归位** - 使用腳本和工具辅助移动

### 📝 處理三问
1. **需要行动？** → 是 → 有截止日期？
   - 有 → Projects 🎯
   - 無 → Areas 🎯
2. **有參考價值？** → 是 → Resources 📚
3. **都不是？** → Archives 📦 或刪除 🗑️

### ⚡ 優先級矩阵（Eisenhower）
| | 紧急 | 不紧急 |
|---|---|---|
| **重要** | 🔴 P1 立即處理 | 🟡 P2 計劃安排 |
| **不重要** | 🔵 P3 委托處理 | ⚪ P4 刪除/歸檔 |

### 📅 频率建議
- **每日**：早晚各 5-10 分钟處理
- **每周**：周日 30-60 分钟清空 Inbox
- **每月**：月底 60-90 分钟優化流程

### 🎨 快捷键（建議）
| 操作 | 快捷键 |
|------|--------|
| 創建新筆記 | Ctrl+N |
| 插入模板 | Ctrl+Shift+T |
| 打開仪表盘 | Ctrl+Shift+D |
# 整理

---

> [!tip] 核心目標
> Inbox 的核心目標是「快速捕获，定期處理」，不要让它成为垃圾场。
>
> **记住**：空 Inbox 是健康 Inbox 的标志！✅

---

**創建時間**：2026-01-27
# 更新
**下次回顧**：2026-02-28
**狀態**：✅ 已優化
