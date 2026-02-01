
## 🚀 让 Obsidian 变成 “闪念笔记” 超级大脑

下面把 从零开始 到 日常高效管理 的完整流程拆成 三大阶段，每一步都配上代码、截图思路与可直接拷贝的插件配置。  
只要你跟着 “先设定 → 快速捕捉 → 周期回顾” 的三步走，你的闪念就会从“闪现”变成“可操作”的知识。

---

### 1️⃣ 先设定：结构 + 必装插件

|步骤|操作|说明|
|---|---|---|
|1.1|创建 Vault → 叫 FlashVault 或你喜欢的名字|所有文件都在此 Vault 里|
|1.2|安装插件（Community Plugins 必须开启）|① Templater ② QuickAdd ③ Dataview ④ Calendar ⑤ Note Refactor（归档） ⑥（可选） Obsidian AI|
|1.3|文件夹结构|`flash/flash‑notes/`  <br>`flash/ideas/`  <br>`flash/archives/`  <br>`Templates/`|

> Tip：打开 `Settings → Community Plugins → Browse`，搜索插件名，点击 Install → Enable。

---

#### 1.4 目录结构（手动或通过插件脚本创建）

bash

```
flash/
├─ flash‑notes/
├─ ideas/
├─ archives/
└─ Templates/
```

```
flash/
├─ flash‑notes/
├─ ideas/
├─ archives/
└─ Templates/
```

> 在 `flash/archives/` 里可再细分月/年子文件夹，便于归档。

---

### 2️⃣ 快速捕捉：模板 & 快捷键

> 核心理念：一次键入 → 立即保存。不需要写完整笔记，只记录“一句话+时间+来源”。

#### 2.1 触发热键

|目标|热键|说明|
|---|---|---|
|打开空白闪念笔记|`Ctrl+Shift+F`（Windows/Linux）  <br>`⌘⇧F`（macOS）|在 Settings → Hotkeys 搜索 “Templater: Open template”，给它自定义上面热键。|
|归档闪念|`Ctrl+Shift+Alt+F`|通过 QuickAdd 调用“归档脚本”。|

> 若你喜欢 语音/手写，在手机端先用语音笔记转文本，再粘贴进空白模板，标记 `[[flash]]` 即可。

---

#### 2.2 Templater 模板：flash.md

> 1️⃣ 前置 YAML 里自动生成 UUID（唯一 ID）与 日期  
> 2️⃣ 用 `t.uuid()` 生成 32 位随机字符串  
> 3️⃣ 记录 `[[flash]]` 标签、来源标签与空白占位

markdown

```
---
uuid: <% tp.uuid() %>
created: <% tp.date.now("YYYY-MM-DD HH:mm") %>
tags: [[flash]]
source: [[source-%TP_TAGS]]
uuid: <%= tp.uuid() %>
---
## <%- tp.file.title %>（闪念标题）

一句话：<% tp.prompt("一句话记录（按回车即可）") %>

来源：<%- tp.prompt("来源（会议、书本、灵感）") %>
```

```
---
uuid: <% tp.uuid() %>
created: <% tp.date.now("YYYY-MM-DD HH:mm") %>
tags: [[flash]]
source: [[source-%TP_TAGS]]
uuid: <%= tp.uuid() %>
---
## <%- tp.file.title %>（闪念标题）

一句话：<% tp.prompt("一句话记录（按回车即可）") %>

来源：<%- tp.prompt("来源（会议、书本、灵感）") %>
```

> 如何放到 Templater  
> 1️⃣ 在 `flash/Templates` 新建文件 flash.md，粘贴上面代码。  
> 2️⃣ 在 Settings → Templater → Template folder location 设为 `flash/Templates`。

---

#### 2.3 QuickAdd 配置（可选，进一步自动化）

> 先让 QuickAdd 绑定热键，内部调用 Templater 生成闪念笔记。

- Add command → “Create Flash Note”
- 选择 Template → `flash/Templates/flash.md`
- 设定 File location → `flash/flash‑notes/`
- Hotkey → `Ctrl+Shift+F`

> 这样你只需按 `Ctrl+Shift+F`，弹窗里直接敲一句话就行，整个笔记会自动保存。

---

#### 2.4 示例：一次“键入闪念”

```
Ctrl+Shift+F
```

```
Ctrl+Shift+F
```

```
一句话：探究光敏电阻与 OLED 的能耗优化方案
来源：会议
```

```
一句话：探究光敏电阻与 OLED 的能耗优化方案
来源：会议
```

> 自动生成的 YAML：

yaml

```
---
uuid: 4b2f7c3e-2d5a-4f4d-9e9b-1a5d2f7c3e8b
created: 2025-08-23 10:14
tags: [[flash]]
source: [[source-meeting]]
---
```

```
---
uuid: 4b2f7c3e-2d5a-4f4d-9e9b-1a5d2f7c3e8b
created: 2025-08-23 10:14
tags: [[flash]]
source: [[source-meeting]]
---
```

> 直接点击 Ctrl+S 保存（默认已保存）。

---

### 3️⃣ 结构化 + 关联化：Zettelkasten 思路

|目的|操作|工具/代码|
|---|---|---|
|生成唯一 ID|`uuid` 前置字段|`uuid: <%= tp.uuid() %>`|
|添加主题标签|`project‑X`|在闪念里直接写 `[[project‑light‑sensor]]`|
|来源标签|`[[source‑meeting]]`|让后续检索更细粒度|
|Backlinks & Graph|只显示 `flash` 标签|① Dataview table ② Graph View 过滤|

---

#### 3.1 Dataview 查询：展示所有闪念

markdown

````
```dataview
table created, title, source
from "flash/flash‑notes"
where contains(file.tags, "flash")
sort file.mtime desc
````

````
```dataview
table created, title, source
from "flash/flash‑notes"
where contains(file.tags, "flash")
sort file.mtime desc
````

````

> 把这段放在 **Daily Review** 模板里，或者直接放在你喜欢的 “闪念汇总” 页面。

---

### 4️⃣ 周期回顾 & 归档

| 频率 | 回顾目标 | 工具 | 示例 |
|------|----------|------|------|
| **每天** | 浏览当日闪念，快速判断 | Daily notes + Dataview | `![[flash::today]]` |
| **每周** | 选 3–5 条闪念 → 转正式笔记 (`ideas/`) | QuickAdd “Create note from flash” | `move("flash/ideas/")` |
| **每月** | 归档无用闪念 | Note Refactor (Move) | `flash/archives/YYYY‑MM/` |

---

#### 4.1 Daily Review 模板（拷贝到 `Templates/daily-flash.md`）

```markdown
## 今日闪念回顾 ({{date}})
```dataview
table created, file.link as "闪念标题", source
from "flash/flash‑notes"
where file.mtime >= dateadd(today, -1 day, "days")
sort file.mtime desc
````

````

> 把这段放在 **Daily Review** 模板里，或者直接放在你喜欢的 “闪念汇总” 页面。

---

### 4️⃣ 周期回顾 & 归档

| 频率 | 回顾目标 | 工具 | 示例 |
|------|----------|------|------|
| **每天** | 浏览当日闪念，快速判断 | Daily notes + Dataview | `![[flash::today]]` |
| **每周** | 选 3–5 条闪念 → 转正式笔记 (`ideas/`) | QuickAdd “Create note from flash” | `move("flash/ideas/")` |
| **每月** | 归档无用闪念 | Note Refactor (Move) | `flash/archives/YYYY‑MM/` |

---

#### 4.1 Daily Review 模板（拷贝到 `Templates/daily-flash.md`）

```markdown
## 今日闪念回顾 ({{date}})
```dataview
table created, file.link as "闪念标题", source
from "flash/flash‑notes"
where file.mtime >= dateadd(today, -1 day, "days")
sort file.mtime desc
````

````

> 在每天的 `Daily` 笔记中插入 `![[daily-flash]]` 即可自动显示前一天的闪念列表。

---

#### 4.2 归档脚本（Templater 自动批量归档）

```templater
<%*
const now = new Date();
const month = now.getMonth() + 1;   // 1‑12
const year = now.getFullYear();
t.file.move(`flash/archives/${year}-${month < 10 ? "0"+month : month}/`);
%>
````

````

> 在每天的 `Daily` 笔记中插入 `![[daily-flash]]` 即可自动显示前一天的闪念列表。

---

#### 4.2 归档脚本（Templater 自动批量归档）

```templater
<%*
const now = new Date();
const month = now.getMonth() + 1;   // 1‑12
const year = now.getFullYear();
t.file.move(`flash/archives/${year}-${month < 10 ? "0"+month : month}/`);
%>
````

> 把上面代码放在 `flash/Templates/archive.md`，通过 QuickAdd 绑定 “归档闪念” 命令即可。

---

### 5️⃣ 进阶技巧（可选）

|目的|插件/工具|快速操作|
|---|---|---|
|AI 自动扩展|Obsidian AI (ChatGPT/Claude)|选中闪念 → `Ctrl+Alt+A` → “Expand with AI”|
|语音/手写|Mobile + Voice Note|先在手机录音 → 转文本 → 粘贴进 `flash/flash‑notes/`|
|批量导入|Zapier/IFTTT|Gmail 星标 → 自动写入 `flash‑notes`|
|Canvas 草图 → Markdown|Canvas → `Paste as Markdown` → 添加 `[[flash]]`|直观画图后转笔记|

---

### ✅ 快速启动清单（复制后在 Obsidian 里执行）

1. 结构
    
    bash
    
    ```
    flash/
    ├─ flash‑notes/
    ├─ ideas/
    ├─ archives/
    └─ Templates/
    ```
    
    ```
    flash/
    ├─ flash‑notes/
    ├─ ideas/
    ├─ archives/
    └─ Templates/
    ```
    
2. 热键
    - `Ctrl+Shift+F` → 打开闪念模板
    - `Ctrl+Shift+Alt+F` → 归档（可先手动或绑定脚本）
3. 模板（在 `flash/Templates/flash.md`）
    
    markdown
    
    ```
    ---
    uuid: <%= tp.uuid() %>
    created: <% tp.date.now("YYYY-MM-DD HH:mm") %>
    tags: [[flash]]
    source: [[source-%TP_TAGS]]
    ---
    ## <%- tp.file.title %>（闪念标题）
    
    一句话：<% tp.prompt("一句话记录（按回车即可）") %>
    
    来源：<% tp.prompt("来源（会议/书籍/灵感）") %>
    ```
    
    ```
    ---
    uuid: <%= tp.uuid() %>
    created: <% tp.date.now("YYYY-MM-DD HH:mm") %>
    tags: [[flash]]
    source: [[source-%TP_TAGS]]
    ---
    ## <%- tp.file.title %>（闪念标题）
    
    一句话：<% tp.prompt("一句话记录（按回车即可）") %>
    
    来源：<% tp.prompt("来源（会议/书籍/灵感）") %>
    ```
    
4. Daily Review（在 Daily notes 里加入）
    
    markdown
    
    ````
    ## 今日闪念回顾 ({{date}})
    ```dataview
    table created, title, source
    from "flash/flash‑notes"
    where file.mtime >= dateadd(today, -1 day, "days")
    sort file.mtime desc
    ````
    
    ````
    ## 今日闪念回顾 ({{date}})
    ```dataview
    table created, title, source
    from "flash/flash‑notes"
    where file.mtime >= dateadd(today, -1 day, "days")
    sort file.mtime desc
    ````
    
5. 周/月归档（手动或脚本）
    - 选定闪念 → 右键 → `Move to Folder` → `flash/ideas/`
    - 归档脚本自动移动到 `flash/archives/YYYY‑MM/`

---

## 🎉 让我们一起完成第一天的闪念笔记

1. 打开 Obsidian → 进入 FlashVault
2. 按 `Ctrl+Shift+F` → 在弹出的空白文件中输入
    
    ```
    一句话：尝试把 OLED 亮度与光敏电阻做能耗互补
    来源：会议
    ```
    
    ```
    一句话：尝试把 OLED 亮度与光敏电阻做能耗互补
    来源：会议
    ```
    
3. `Ctrl+S` 保存，文件会自动在 `flash/flash‑notes/` 里出现。
4. 每天晚些时候打开 Daily.md，粘贴 `![[daily-flash]]`，你就能看到前一天的闪念列表，随时决定是否搬到 `ideas/`。

---

### 🚀 你现在已经有了完整的闪念笔记系统

- 捕捉：一次敲字 → 立即保存
- 回顾：每日/每周自动生成列表
- 归档：脚本/插件批量移动，保持 Vault 整洁

如果你遇到任何插件配置、模板代码或热键冲突，随时告诉我，我会帮你调试。祝你闪念不断、创意爆棚 🚀！