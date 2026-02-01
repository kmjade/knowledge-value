---
# 指南
aliases:
  - Automating PARA in Obsidian
  - PARA自動化
  - Obsidian PARA自動化
created: 2026-01-29
tags:
  - obsidian
  - para
  - 自動化
# 工作流
  - templater
  - quickadd
type: tutorial
interest-level: 5
study-status: completed
source: 網路收集
para: resources
language: zh-cn
---

# 指南

> [!info] 概述
# 工作流

---

## 适用人群

# 管理
- 想把"收集‑分類‑复盘"全過程做到点点即自動化
- 对 Obsidian 基礎操作熟悉，愿意尝试社區外掛或微代碼（JS/Dataview）

---

## 一、基礎目錄结构（一次性完成）

在 Vault 根目錄下創建以下 4‑5 个核心資料夾（資料夾名前加数字可保持顺序）：

```
📂 0 Inbox               # 捕获区（所有即时筆記都会先进入这里）
📂 1 Projects            # 專案（有明确開始‑結束日期）
📂 2 Areas               # 持續职责/长期關注（例：健康、學習、运营）
# 教程
📂 4 Archives            # 已完成或不再活跃的內容
# 知識
📂 6 Templates           # 自定义模板
📂 7 Daily               # Daily/Periodic notes（自動生成）
```

> 技巧：如果你已经有了自己的檔案结构，只需要把对应的 功能標籤（如 `#project`、`#area`）加到现有筆記上，然后用后面的自動歸類腳本進行遷移。

---

## 二、統一 YAML 元數據（便于自動化）

在 Inbox 中的每条捕获筆記，使用以下最小元數據（可通過模板自動生成）：

```yaml
---
title: "{{title}}"          # 自動使用檔案名
date: "{{date}}"           # 創建日期，ISO8601
tags: []                    # 由 QuickAdd/Templater 填寫
type: ""                    # 可选值: project / area / resource / archive / zettel
status: "inbox"             # inbox、active、done、archived
---
```

### 字段解釋

- `type` 决定筆記最终归属的 PARA 資料夾
- `status` 用于後續 Dataview / Tasks 查詢（如"active projects"）
- `tags` 用来快速手動覆写（如 `#project/obsidian`、`#area/learning`）

### 生成方式

在 `6 Templates` 里儲存 `Inbox.md`，內容如下（配合 Templater）：

```markdown
---
title: {{tp.file.title}}
date: {{tp.date.now("YYYY-MM-DD")}}
tags: []
type: ""
status: inbox
---

# {{tp.file.title}}

> 这里是捕获的原始想法/會議纪要/灵感……
```

> 快捷捕获：使用社區外掛 **QuickAdd** → 創建一个 "Capture → Inbox" 快捷命令，直接弹出輸入框，生成以上模板并自動儲存到 `0 Inbox`。

---

## 三、自動歸類：从 Inbox → PARA（核心自動化）

### 基本思路

1. 在 Inbox 中完成 "捕获 + 元數據標籤"。
2. 使用 Templater/Obsidian API 腳本檢查 `type`（或 `tags`）字段。
# 更新
4. 对于已完成的專案或不再使用的資源，手動或通過每日/每周复盘将 `status` 改成 `done` → 自動搬到 Archives。

### 推荐實現方式（两种）

| 實現方式 | 适合人群 | 關鍵外掛 | 示例代碼 |
|----------|----------|-----------|----------|
| A. Templater + 触发器（無代碼） | 想保持一切在 Markdown 中 | `Templater`、`QuickAdd` | 详见下方 "Templater 自動搬运腳本" |
| B. Obsidian API（JavaScript）+ Hotkeys | 熟悉 JavaScript、需要更细粒度控制 | `Templater`（運行 JS）、`Obsidian Custom JS`（社區外掛） | 详见下方 "自定义 JavaScript 命令" |

---

### Templater 自動搬运腳本（推荐）

在 `6 Templates/AutoMove.md` 中放置以下內容（仅儲存，不直接使用）：

```markdown
<%*
/*
  自動搬运腳本（Inbox → PARA）
  1. 讀取当前檔案的 YAML
  2. 根据 type 字段决定目標資料夾
# 更新
*/
let file = tp.file.path();
let yaml = tp.frontmatter;

// 檢查 type 必须有值
if (!yaml.type) {
  tp.error("⚠️ type 字段为空，请在 Capture 时手動填寫（project/area/resource）");
  return;
}

// 目標資料夾映射
const map = {
  project: "1 Projects",
  area: "2 Areas",
  resource: "3 Resources",
  archive: "4 Archives",
  zettel: "5 Zettels"
};

let targetFolder = map[yaml.type.toLowerCase()];
if (!targetFolder) {
  tp.error(`⚠️ 未识别的 type: ${yaml.type}`);
  return;
}

// 計算新路徑
let fileName = tp.file.title + ".md";
let newPath = `${targetFolder}/${fileName}`;

// 移动檔案
await app.fileManager.rename(app.vault.getAbstractFileByPath(file), newPath);

# 更新
await tp.file.move(newPath, newPath);
await tp.file.write("---\n" +
  "---\n" +
  tp.file.content.replace(
    /status:\s*inbox/i,
    "status: active"
  )
);
%>
```

# 方法

1. 捕获：QuickAdd → "Capture → Inbox"。
2. 完成筆記后，在筆記里運行模板 `AutoMove.md`（可在右上角的「…」 → "Templater: Run template"），或为它绑定一个 Hotkey（Settings → Hotkeys → Templater: Run template → 设定 `Ctrl+Alt+M`）。
3. 腳本会把该檔案搬到对应的 PARA 資料夾，并把 `status` 改为 `active`。

> 批處理：如果想一次性處理所有 Inbox 中的檔案，可再写一个批處理模板（遍历 `0 Inbox` 下所有檔案）。

---

## 四、周期性复盘 & 自動歸檔（Projects → Archives）

### 使用 Periodic Notes + Dataview 生成「本周复盘」頁面

模板 `Weekly Review.md`（放在 `6 Templates`）：

```markdown
---
date: <% tp.date.now("gggg-[W]WW") %>
type: weekly-review
---

# 本周回顧（<% tp.date.now("gggg-[W]WW") %>）

## 1️⃣ 本周完成的專案
```dataview
TABLE status, file.link AS "專案"
FROM "1 Projects"
WHERE status = "active"
  AND date <= <% tp.date.now("YYYY-MM-DD") %>
  AND date >= <% tp.date.now("-7 days") %>
SORT date DESC
```

## 2️⃣ 待辦任務

```dataview
TABLE file.link, text, due
FROM "0 Inbox"
WHERE contains(tags, "#todo")
  AND (status = "inbox" OR status = "active")
SORT due ASC
```

## 3️⃣ 本周需要歸檔的專案

```dataview
TABLE file.link, completed AS "結束日期"
FROM "1 Projects"
WHERE status = "active"
  AND completed <= <% tp.date.now("-30 days") %>
```
```

> **實現**：在 **Periodic notes** 中设定 **Weekly** 模板路徑为 `6 Templates/Weekly Review.md`。每周打開一次，使用 **Dataview** 实时生成專案完成情况、待辦、可歸檔列表。

### 自動歸檔腳本（基于 `status = "done"`）

**Templater 歸檔腳本 `AutoArchive.md`**（放在 `6 Templates`）：

```markdown
<%*
let all = app.vault.getFiles().filter(f => f.path.startsWith("1 Projects"));
for (let file of all) {
  const cache = app.metadataCache.getFileCache(file);
  const front = cache?.frontmatter;
  if (!front) continue;
  if (front.status?.toLowerCase() === "done") {
    let newPath = `4 Archives/${file.basename}.md`;
    await app.fileManager.rename(file, newPath);
    // 可选：在歸檔时加上歸檔日期標籤
    let content = await app.vault.read(app.vault.getAbstractFileByPath(newPath));
    content = content.replace("---", `---\narchived: ${tp.date.now("YYYY-MM-DD")}\n`);
    await app.vault.modify(app.vault.getAbstractFileByPath(newPath), content);
  }
}
new Notice("✅ 已歸檔所有 status=done 的專案");
%>
```

---

# 工作流

> 下面的演示用 QuickAdd + Templater + Dataview 完成全流程，只需 4 次点击。

### 1️⃣ 捕获

- 按 `Ctrl+Alt+I`（自定义） → 選擇 Capture → Inbox → 輸入标题和內容（自動生成 `Inbox` 模板）。

### 2️⃣ 標記类型（可在捕获时就选）

- 在生成的筆記头部的 `tags` 或 `type` 填寫 `project` / `area` / `resource`。

### 3️⃣ 自動搬迁

- 在筆記中快捷键 `Ctrl+Alt+M`（Templater: Run `AutoMove.md`） → 檔案瞬间出现在对应 PARA 資料夾，狀態变 `active`。

### 4️⃣ 周复盘 & 歸檔

- 每周打開 `Weekly Review`（Periodic notes 自動生成），檢查"本周需要歸檔的專案"。
- 在对应專案筆記里把 `status` 改为 `done` → 儲存 → 在 Weekly Review 中運行 `AutoArchive.md`，專案自動搬到 `4 Archives`。

**結果**：所有資訊始终保持结构化、可追溯、可视化，而且手動操作次数维持在每天 2–3 次（捕获 + 复盘），其余都是自動完成。

---

## 六、常见問題 & 排查

| 問題 | 可能原因 | 解決方案 |
|------|----------|----------|
| 腳本报错 "frontmatter undefined" | 捕获筆記未使用模板，缺少 YAML | 确保所有 Inbox 筆記都有 `---` 包围的 frontmatter（可在 QuickAdd 中强制使用模板）。 |
# 更新
# 顯示
| 每次運行 AutoMove 都提示 "target already exists" | 同名筆記在不同 PARA 下冲突 | 在創建 Inbox 时加入唯一的時間戳（如 `Title 2024-06-01`），或在搬迁腳本里自動加 `-copy`。 |
# 方法

---

## 相關資源

# 管理
- [[超快速捕获]] - 3秒快速捕获模板
# 工作流
# 工作流
