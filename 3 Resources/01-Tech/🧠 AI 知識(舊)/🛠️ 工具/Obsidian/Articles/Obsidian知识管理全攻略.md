---
# 管理
aliases:
  - Obsidian PKM Guide
# 知識庫
  - 第二大脑
created: 2026-01-29
tags:
  - obsidian
  - PKM
# 管理
  - Zettelkasten
  - PARA
type: guide
interest-level: 5
study-status: completed
source: 網路收集
para: resources
language: zh-cn
---

# 管理

> [!info] 一句话概括
# 管理

---

## 什么是 Obsidian？

| 特點 | 說明 |
|------|------|
| 本地檔案 | 所有筆記都是普通的 `.md`（Markdown）檔案，放在任意資料夾，随时打開、備份、遷移。 |
| 双向連結 | `[[筆記标题]]` 自動創建出链与入链，形成网状结构。 |
# 知識
# 管理
| 完全離線 | 不依赖雲端服务，隱私安全。 |
| 跨平台 | Windows、macOS、Linux、iOS、Android 都能無缝同步（通過 iCloud、Dropbox、Syncthing 等）。 |

> 核心理念：让筆記之间相互連接，而不是孤立存放。当你在写新筆記时，自然地寻找相關連結，久而久之形成自己的「第二大脑」。

---

# 管理

| 概念 | 解釋 | 在 Obsidian 中的實現 |
|------|------|---------------------|
| 原子筆記（Atomic Note） | 每条筆記只表达一个完整的概念或想法，便于复用。 | 使用 Zettelkasten 编号或标题即可，例如 `20240531-001 解釋双向連結的意义`。 |
| 連結（Link） | 将两条筆記关联。 | `[[筆記标题]]`、`[[筆記标题\|别名]]` |
| 標籤（Tag） | 主題或属性的快速分類。 | `#project/obsidian`、`#reference`、`#todo`。 |
| 索引页（Index / MOC） | "Map of Content"，彙總同类筆記的导航頁面。 | 使用 Markdown 列表或嵌入块（`![[筆記]]`）創建。 |
| 查詢（Query） | 動態檢索、生成视图。 | Dataview、Tasks、Meta‑Query 等外掛提供。 |
| 周期性筆記 | 每日/每周/每月的结构化記錄。 | 官方外掛 Daily notes + Periodic notes + Templater。 |
| 引用（Citation） | 文獻、網頁等的標準化記錄。 | 外掛 Obsidian Cite、Zotero Integration。 |

---

## 常见 PKM 框架与 Obsidian 的对应映射

| 框架 | 核心要素 | 在 Obsidian 中的落地方式 |
|--------|----------|---------------------|
| Zettelkasten | 原子筆記 + 連結 + 编号 | - 使用時間戳或递增编号做 ID<br>- 每条筆記只写一个想法<br>- 通過 `[[link]]` 形成網路 |
# 教程
# 知識
| Luhmann 的 ZK 结构化编码 | 基于上下文的关联 | - 使用 Backlink + Graph 發現上下文关联<br>- 用 Dataview 生成「同主題」视图 |

---

## 基礎設置 + 推荐的目錄结构

# 知識庫

1. 打開 Obsidian → Create new vault
2. 選擇本地目錄（建議使用同步資料夾，如 `Dropbox/ObsidianVault`）
3. 勾选 Safe Mode（關閉后可以安裝社區外掛）

> Tip：在 macOS/Linux 建議把 Vault 放在 `~/Documents/Obsidian/`，方便 Terminal 操作。

### 推荐的資料夾层次（基于 PARA）

```
📂 MyVault
 ├─ 📂 0 Inbox          # 临时收集，后期歸類
 ├─ 📂 1 Projects       # 專案資料夾（每个專案一个子資料夾）
 ├─ 📂 2 Areas          # 持續职责（學習、健康、工作）
 ├─ 📂 3 Resources      # 參考资料（书籍、網路文章、工具）
 ├─ 📂 4 Archives       # 已完成/不活跃內容
 ├─ 📂 5 Zettels        # Zettelkasten 原子筆記（可再细分年份/月）
 ├─ 📂 6 Templates      # 模板檔案（日記、阅读筆記、會議纪要）
 ├─ 📂 7 Daily          # Daily notes（自動生成）
# 配置
```

> Folder Naming Tips
# 管理
> - 用英文 + 下划线，避免在跨平台同步时出现编码問題。

### 筆記命名规则

| 类别 | 推荐命名 | 示例 |
|------|----------|------|
| Inbox | `YYYYMMDD-HHMM-标题` | `20240601-0930-會議纪要` |
| Zettel | `YYYYMMDDHHMMSS-简短标题` | `20240601123045-双向連結的好处` |
| 專案 | `專案名 - 子主題` | `Obsidian-外掛開發` |
# 管理
| 每日筆記 | 自動生成 `YYYY-MM-DD` | `2024-06-01` |

---

## 基礎功能实战

### 双向連結 & Backlink

- **創建連結**：在編輯区輸入 `[[`，自動弹出匹配列表，回车確定。
# 查看
- **嵌入块**：`![[筆記标题]]` 将整篇筆記內容嵌入当前頁面，适合彙總（MOC）或引用段落。

### 標籤（Tag）

- **写法**：`#tag`（单词），层级標籤使用斜杠：`#project/obsidian`。
- **搜尋**：在左侧搜尋框輸入 `tag:#project/obsidian` 或使用 Tag Pane。

### MOC（Map of Content）索引页

```markdown
# 知識庫

## 📅 日記
- [[2024-06-01]]
- [[2024-06-02]]

## 📂 專案
- [[Obsidian-外掛開發]]
- [[个人網站建设]]

## 📖 阅读筆記
# 管理
- [[《深度工作》]]

## 🧠 Zettelkasten
- [[20240601123045-双向連結的好处]]
- [[20240602141012-如何写原子筆記]]
```

> 技巧：使用 `[[!2024-06-01]]`（感叹号）直接嵌入每日筆記的全部內容，形成日記总览。

### Graph View（图谱）使用技巧

# 顯示
- **聚焦**：选中任意节点 → Ctrl+Click 可锁定该节点的邻居，帮助聚焦特定主題。
- **自定义**：設置 → Appearance → Graph view（节点大小、颜色、连线透明度）让视觉更清晰。

---

## 必装外掛清單（官方 + 社區）

| 类别 | 外掛 | 功能简述 | 安裝方式 |
|------|------|----------|----------|
| 日記/周期 | Daily notes（官方） | 自動生成每日筆記 | Settings → Core Plugins |
| | Periodic notes（社區） | 支持 Weekly/Monthly/Quarterly 模板 | Community Plugins → Search |
| 模板 | Templater（社區） | 高级模板（JavaScript、变量） | 同上 |
| | QuickAdd（社區） | 快速創建筆記、执行腳本 | 同上 |
| 任務/待辦 | Tasks（社區） | 强大的任務查詢、过滤、日历视图 | 同上 |
| | Obsidian Reminder（社區） | 在筆記中直接設置提醒 | 同上 |
| 數據查詢 | Dataview（社區） | 用类似SQL的语法生成表格、列表、日历 | 同上 |
| | Meta bind（社區） | 将 YAML 元數據绑定到 UI 控件 | 同上 |
| 引用/文獻 | Obsidian Cite（社區） | 与 Zotero、Better BibTeX 整合 | 同上 |
| | Zotero Integration（社區） | 直接在筆記中插入文獻条目 | 同上 |
| 视觉 | Obsidian Hover Editor（社區） | 鼠标悬停即可預覽連結內容 | 同上 |
| | Obsidian Icons（社區） | 为資料夾/筆記新增圖示 | 同上 |
| 自動化 | Shell commands（社區） | 在 Obsidian 中運行系統命令（批量改名、同步） | 同上 |
# 版本
# 管理
| | Excalidraw（社區） | 手绘思维导图、流程图直接嵌入 | 同上 |

---

# 工作流

下面以 **學習一本技術书籍** 为例，展示完整的 PKM 流程。

### 捕获（Capture）——Inbox

1. 阅读时，使用 QuickAdd + Capture Template，快速把灵感/摘录存入 `0 Inbox/20240602-1300-阅读筆記.md`。
2. 在網頁或 PDF 中选中文字，使用 Obsidian Clip Plugin（或瀏覽器外掛）直接儲存为 Markdown。

# 整理

1. 每天結束前，打開 Inbox，把每条記錄通過 Templater 转为 Zettel（原子筆記），統一放入 `5 Zettels/2024/06/`。
2. 给每条 Zettel 新增 YAML 元數據：

```yaml
---
tags: #reading #book/Obsidian
source: "《Obsidian使用者手册》"
date: 2024-06-02
---
```

### 創建（Create）——形成網路

1. 在每条 Zettel 中使用 `[[` 关联已存在的概念或創建新概念連結。
2. 在 MOC `📖 书籍筆記` 頁面中，使用 Dataview Table 自動列出该书的所有 Zettel：

```dataview
TABLE date AS "日期", file.link AS "筆記"
FROM "5 Zettels"
WHERE contains(tags, "#book/Obsidian")
SORT date DESC
```

### 輸出（Share）——写作或演示

1. 創建一个專案筆記 `1 Projects/Obsidian-Book-Summary`，在其中使用嵌入块彙總關鍵 Zettel：

```markdown
## 核心概念
![[20240601153000-Obsidian的双向連結]]
![[20240602114500-外掛系統原理]]

## 待写作章节
- 章节 1：Obsidian 基礎
- 章节 2：进阶外掛開發
```

2. 导出为 PDF（右上角 Export to PDF）或通過 Obsidian Publish 直接發佈到个人網站。

> Tip：使用 Tasks 与 Dataview 配合，可以自動生成「待写作」任務列表，保持产出节奏。

---

## 高级技巧

### Dataview 高级查詢

```dataview
TABLE length(file.inlinks) AS "被引用次数", file.link
FROM "5 Zettels"
WHERE contains(tags, "#project/obsidian")
SORT length(file.inlinks) DESC
LIMIT 10
```

```dataview
TABLE file.link, date AS "日期"
FROM "5 Zettels"
WHERE date >= date(today) - dur(7 days)
SORT date DESC
```

### 自動化腳本（Templater + JS）

```javascript
<%*
let folder = "5 Zettels/2024/06";
let existing = app.vault.getFiles().filter(f => f.path.startsWith(folder) && f.extension === "md");
let max = existing.reduce((m, f) => {
  let mnum = parseInt(f.basename.split("-")[0]);
  return (mnum > m) ? mnum : m;
}, 0);
let next = max + 1;
tR = `202406${tp.date("DD")}-${String(next).padStart(3, "0")}-${tp.file.title}`;
%>
```

### 与外部工具的整合

| 外部工具 | 用途 | 整合方式 |
|----------|------|----------|
# 管理
| Readwise | 朗读高亮同步 | 使用 Readwise Official 外掛，把高亮导入 Reading 資料夾 |
| Notion | 團隊協作 | 使用 Notion Sync（第三方腳本）把 Notion 頁面导出为 MD，放入 Vault |
# 版本
# 管理

---

## 遷移、備份与同步

1. **本地備份**：`Vault/.obsidian`（設置）+ `Vault/**/*.md`（所有筆記）
   - 推荐使用 Time Machine（macOS）或 rsync 定期快照。

2. **雲端同步**：
   - iCloud（Apple 生態）→ 自動同步資料夾。
   - Dropbox / OneDrive → 确保檔案名不含特殊字符。
   - Syncthing（跨平台、開源）→ 实时点对点同步。

3. **Git 備份（推荐）**：
   - 初始化仓库：`git init && git add . && git commit -m "init"`
   - 远程仓库（GitHub/Gitea）`git remote add origin <url>`
   - 使用 Obsidian Git 設置每天自動 commit & push。

> 安全提示：如果筆記中有敏感內容，建議加密（使用 Obsidian Encrypt 外掛）或在 Git 中不推送（使用 `.gitignore` 忽略相应資料夾）。

---

## 快速參考卡

### 核心步骤

| 步骤 | 操作 | 目標 |
|------|------|------|
| 1️⃣ 捕获 | 用 QuickAdd 捕获瞬间灵感 → 放入 Inbox | 0% 資訊遺失 |
# 知識
# 更新
# 知識庫

### PARA 決策树

```
有下一步行动？
├─ 是 → 有明确截止日期？
│   ├─ 有 → Projects
│   └─ 無 → Areas
└─ 否 → 有參考價值？
    ├─ 是 → Resources
    └─ 否 → Archives 或刪除
```

---

## 相關資源

# 指南
- [[超快速捕获]] - 3秒快速捕获模板
# 工作流
- [[Claudian]] - AI 辅助筆記創建工具
