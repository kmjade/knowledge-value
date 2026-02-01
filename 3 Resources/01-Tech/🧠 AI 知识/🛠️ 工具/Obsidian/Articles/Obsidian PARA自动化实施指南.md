---
title: Obsidian PARA自动化实施指南
aliases:
  - Automating PARA in Obsidian
  - PARA自动化
  - Obsidian PARA自动化
created: 2026-01-29
tags:
  - obsidian
  - para
  - 自动化
  - 工作流
  - templater
  - quickadd
type: tutorial
interest-level: 5
study-status: completed
source: 网络收集
para: resources
language: zh-cn
---

# Obsidian PARA自动化实施指南

> [!info] 概述
> 本指南提供在 Obsidian 中实现自动化 PARA 框架（Projects‑Areas‑Resources‑Archives）的完整实操手册，从文件结构、元数据、模板、插件 + 脚本四个层面入手，帮助你把"手工搬砖式"的 PARA 工作流，变成一键捕获、自动归类、实时查询、周期归档的全自动系统。

---

## 适用人群

- 需要在同一 Vault 中管理项目、职责、参考资料的专业人士、学生、自由职业者
- 想把"收集‑分类‑复盘"全过程做到点点即自动化
- 对 Obsidian 基础操作熟悉，愿意尝试社区插件或微代码（JS/Dataview）

---

## 一、基础目录结构（一次性完成）

在 Vault 根目录下创建以下 4‑5 个核心文件夹（文件夹名前加数字可保持顺序）：

```
📂 0 Inbox               # 捕获区（所有即时笔记都会先进入这里）
📂 1 Projects            # 项目（有明确开始‑结束日期）
📂 2 Areas               # 持续职责/长期关注（例：健康、学习、运营）
📂 3 Resources           # 参考资料（文献、教程、工具）
📂 4 Archives            # 已完成或不再活跃的内容
📂 5 Zettels             # Zettelkasten 原子笔记（可选，帮助知识网络化）
📂 6 Templates           # 自定义模板
📂 7 Daily               # Daily/Periodic notes（自动生成）
```

> 技巧：如果你已经有了自己的文件结构，只需要把对应的 功能标签（如 `#project`、`#area`）加到现有笔记上，然后用后面的自动归类脚本进行迁移。

---

## 二、统一 YAML 元数据（便于自动化）

在 Inbox 中的每条捕获笔记，使用以下最小元数据（可通过模板自动生成）：

```yaml
---
title: "{{title}}"          # 自动使用文件名
date: "{{date}}"           # 创建日期，ISO8601
tags: []                    # 由 QuickAdd/Templater 填写
type: ""                    # 可选值: project / area / resource / archive / zettel
status: "inbox"             # inbox、active、done、archived
---
```

### 字段解释

- `type` 决定笔记最终归属的 PARA 文件夹
- `status` 用于后续 Dataview / Tasks 查询（如"active projects"）
- `tags` 用来快速手动覆写（如 `#project/obsidian`、`#area/learning`）

### 生成方式

在 `6 Templates` 里保存 `Inbox.md`，内容如下（配合 Templater）：

```markdown
---
title: {{tp.file.title}}
date: {{tp.date.now("YYYY-MM-DD")}}
tags: []
type: ""
status: inbox
---

# {{tp.file.title}}

> 这里是捕获的原始想法/会议纪要/灵感……
```

> 快捷捕获：使用社区插件 **QuickAdd** → 创建一个 "Capture → Inbox" 快捷命令，直接弹出输入框，生成以上模板并自动保存到 `0 Inbox`。

---

## 三、自动归类：从 Inbox → PARA（核心自动化）

### 基本思路

1. 在 Inbox 中完成 "捕获 + 元数据标签"。
2. 使用 Templater/Obsidian API 脚本检查 `type`（或 `tags`）字段。
3. 按 `type` 将文件移动到对应的 PARA 文件夹，并更新 `status` 为 `active`（project / area / resource）。
4. 对于已完成的项目或不再使用的资源，手动或通过每日/每周复盘将 `status` 改成 `done` → 自动搬到 Archives。

### 推荐实现方式（两种）

| 实现方式 | 适合人群 | 关键插件 | 示例代码 |
|----------|----------|-----------|----------|
| A. Templater + 触发器（无代码） | 想保持一切在 Markdown 中 | `Templater`、`QuickAdd` | 详见下方 "Templater 自动搬运脚本" |
| B. Obsidian API（JavaScript）+ Hotkeys | 熟悉 JavaScript、需要更细粒度控制 | `Templater`（运行 JS）、`Obsidian Custom JS`（社区插件） | 详见下方 "自定义 JavaScript 命令" |

---

### Templater 自动搬运脚本（推荐）

在 `6 Templates/AutoMove.md` 中放置以下内容（仅保存，不直接使用）：

```markdown
<%*
/*
  自动搬运脚本（Inbox → PARA）
  1. 读取当前文件的 YAML
  2. 根据 type 字段决定目标文件夹
  3. 移动文件、更新 status
*/
let file = tp.file.path();
let yaml = tp.frontmatter;

// 检查 type 必须有值
if (!yaml.type) {
  tp.error("⚠️ type 字段为空，请在 Capture 时手动填写（project/area/resource）");
  return;
}

// 目标文件夹映射
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

// 计算新路径
let fileName = tp.file.title + ".md";
let newPath = `${targetFolder}/${fileName}`;

// 移动文件
await app.fileManager.rename(app.vault.getAbstractFileByPath(file), newPath);

// 更新 status
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

#### 使用方法

1. 捕获：QuickAdd → "Capture → Inbox"。
2. 完成笔记后，在笔记里运行模板 `AutoMove.md`（可在右上角的「…」 → "Templater: Run template"），或为它绑定一个 Hotkey（Settings → Hotkeys → Templater: Run template → 设定 `Ctrl+Alt+M`）。
3. 脚本会把该文件搬到对应的 PARA 文件夹，并把 `status` 改为 `active`。

> 批处理：如果想一次性处理所有 Inbox 中的文件，可再写一个批处理模板（遍历 `0 Inbox` 下所有文件）。

---

## 四、周期性复盘 & 自动归档（Projects → Archives）

### 使用 Periodic Notes + Dataview 生成「本周复盘」页面

模板 `Weekly Review.md`（放在 `6 Templates`）：

```markdown
---
date: <% tp.date.now("gggg-[W]WW") %>
type: weekly-review
---

# 本周回顾（<% tp.date.now("gggg-[W]WW") %>）

## 1️⃣ 本周完成的项目
```dataview
TABLE status, file.link AS "项目"
FROM "1 Projects"
WHERE status = "active"
  AND date <= <% tp.date.now("YYYY-MM-DD") %>
  AND date >= <% tp.date.now("-7 days") %>
SORT date DESC
```

## 2️⃣ 待办任务

```dataview
TABLE file.link, text, due
FROM "0 Inbox"
WHERE contains(tags, "#todo")
  AND (status = "inbox" OR status = "active")
SORT due ASC
```

## 3️⃣ 本周需要归档的项目

```dataview
TABLE file.link, completed AS "结束日期"
FROM "1 Projects"
WHERE status = "active"
  AND completed <= <% tp.date.now("-30 days") %>
```
```

> **实现**：在 **Periodic notes** 中设定 **Weekly** 模板路径为 `6 Templates/Weekly Review.md`。每周打开一次，使用 **Dataview** 实时生成项目完成情况、待办、可归档列表。

### 自动归档脚本（基于 `status = "done"`）

**Templater 归档脚本 `AutoArchive.md`**（放在 `6 Templates`）：

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
    // 可选：在归档时加上归档日期标签
    let content = await app.vault.read(app.vault.getAbstractFileByPath(newPath));
    content = content.replace("---", `---\narchived: ${tp.date.now("YYYY-MM-DD")}\n`);
    await app.vault.modify(app.vault.getAbstractFileByPath(newPath), content);
  }
}
new Notice("✅ 已归档所有 status=done 的项目");
%>
```

---

## 五、完整工作流演示（从捕获到归档）

> 下面的演示用 QuickAdd + Templater + Dataview 完成全流程，只需 4 次点击。

### 1️⃣ 捕获

- 按 `Ctrl+Alt+I`（自定义） → 选择 Capture → Inbox → 输入标题和内容（自动生成 `Inbox` 模板）。

### 2️⃣ 标记类型（可在捕获时就选）

- 在生成的笔记头部的 `tags` 或 `type` 填写 `project` / `area` / `resource`。

### 3️⃣ 自动搬迁

- 在笔记中快捷键 `Ctrl+Alt+M`（Templater: Run `AutoMove.md`） → 文件瞬间出现在对应 PARA 文件夹，状态变 `active`。

### 4️⃣ 周复盘 & 归档

- 每周打开 `Weekly Review`（Periodic notes 自动生成），检查"本周需要归档的项目"。
- 在对应项目笔记里把 `status` 改为 `done` → 保存 → 在 Weekly Review 中运行 `AutoArchive.md`，项目自动搬到 `4 Archives`。

**结果**：所有信息始终保持结构化、可追溯、可视化，而且手动操作次数维持在每天 2–3 次（捕获 + 复盘），其余都是自动完成。

---

## 六、常见问题 & 排查

| 问题 | 可能原因 | 解决方案 |
|------|----------|----------|
| 脚本报错 "frontmatter undefined" | 捕获笔记未使用模板，缺少 YAML | 确保所有 Inbox 笔记都有 `---` 包围的 frontmatter（可在 QuickAdd 中强制使用模板）。 |
| 文件搬迁后丢失标签 | 在移动时手动改了文件路径，导致插件缓存未更新 | 在搬迁后手动刷新（Ctrl+R）或使用 Obsidian → Reload plugins。 |
| Dataview 查询不显示最近的项目 | `status` 字段拼写错误或大小写不统一 | 统一使用小写 `status: active`，并在模板里写死。 |
| 每次运行 AutoMove 都提示 "target already exists" | 同名笔记在不同 PARA 下冲突 | 在创建 Inbox 时加入唯一的时间戳（如 `Title 2024-06-01`），或在搬迁脚本里自动加 `-copy`。 |
| 想把某类笔记（如"阅读笔记"）同时归入 Resources 与 Zettels | 同一笔记只能有一个 `type` | 采用多标签方法：在 `tags` 中加入 `#resource`、`#zettel`，并在查询时使用 `contains(tags, "#resource")`。 |

---

## 相关资源

- [[Obsidian知识管理全攻略]] - 完整的 Obsidian 知识管理指南
- [[超快速捕获]] - 3秒快速捕获模板
- [[快速捕获工作流设置指南]] - QuickAdd 和 Templater 配置指南
- [[3 Resources/05-Reference/Methods/PARA 自动化工作流]] - PARA 方法论详解
