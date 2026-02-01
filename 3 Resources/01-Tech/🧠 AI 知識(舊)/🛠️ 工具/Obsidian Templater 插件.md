---
title: Obsidian Templater 外掛
status: active
tags: [Obsidian, Templater, plugin, templates]
aliases: [Obsidian Templater Plugin]
created: 2026-02-01
modified: 2026-02-01
---

# Obsidian Templater 外掛

## 定義

Templater 是 Obsidian 中的模板引擎外掛，支持 JavaScript 腳本，可快速創建標準化的筆記模板。

## 核心功能

### 動態變量
- `{{date}}` - 當前日期
- `{{title}}` - 筆記標題
- `{{tags}}` - 筆記標籤
- 自定義變量和函數

### 命令面板
- 快速執行 JavaScript 命令
- 動態插入內容
# 工作流

### 用戶命令
- 從筆記中執行腳本
- 創建自定義命令
- 整合其他外掛

## 模板示例

### 每日日記模板
```markdown
---
title: {{date}}
created: {{date}}
tags: #daily-note
---

## 今日計劃
- [ ]

## 筆記

## 明日計劃
```

### 會議記錄模板
```markdown
---
title: 會議記錄 - {{title}}
date: {{date}}
attendees:
tags: #meeting
---

## 會議主題

## 參與人員
- [ ]

## 討論內容

## 行動項目
- [ ] 行動項 1
- [ ] 行動項 2

## 下次會議
```

### 項目計劃模板
```markdown
---
title: {{title}}
created: {{date}}
status: active
due: {{due}}
tags: #project
priority: high
---

## 🎯 目標
項目的具體目標和成功標準

## 📋 任務清單
- [ ] 任務 1
- [ ] 任務 2

## 📅 里程碑
- [ ] 里程碑 1
- [ ] 里程碑 2

## ✅ 進度
進度：0%
```

### 閱讀筆記模板
```markdown
---
title: 閱讀筆記 - {{title}}
author: {{author}}
read-date: {{date}}
tags: #reading-note
---

## 書籍資訊
- 作者：
- 出版年：
- ISBN：

## 核心觀點

## 重點筆記

## 個人思考

## 行動項目
```

## 高級用法

### JavaScript 腳本
```javascript
<%*
// 自動生成日期
let today = moment().format("YYYY-MM-DD");
tR += today;

// 計算截止日期
let dueDate = moment().add(7, "days").format("YYYY-MM-DD");
%>
```

### 條件邏輯
```javascript
<%* if (tp.file.title.includes("會議")) { %>
## 會議記錄
<%* } else { %>
## 筆記
<%* } %>
```

## 最佳實踐

### 模板組織
- 將模板存放在統一的檔案夾
- 使用清晰的命名規範
# 更新

# 管理
- 保持腳本簡單可讀
- 新增註釋說明用途
- 測試腳本的可靠性

## 相關筆記

- [[Obsidian 外掛生態]]
# 工作流
- [[Obsidian 筆記組織原則]]

## 參考資源

- [Templater 官方文檔](https://silentvoid13.github.io/Templater/)
- [Templater GitHub](https://github.com/SilentVoid13/Templater)
