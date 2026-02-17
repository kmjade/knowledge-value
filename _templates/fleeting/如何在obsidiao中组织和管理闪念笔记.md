
# 筆記

# 管理
# 知識

---

### 1️⃣ 先设定：结构 + 必装插件

|步骤|操作|说明|
|---|---|---|
# 檔案
# 安裝
# 檔案

# 搜尋

---

# 目錄

bash

```
flash/
├─ flash‑notes/
├─ ideas/
├─ archives/
└─ Templates/
```

# 檔案

---

### 2️⃣ 快速捕捉：模板 & 快捷键

# 筆記

#### 2.1 触发热键

|目标|热键|说明|
|---|---|---|
# 筆記
|归档闪念|`Ctrl+Shift+Alt+F`|通过 QuickAdd 调用“归档脚本”。|

# 筆記

---

#### 2.2 Templater 模板：flash.md

> 1️⃣ 前置 YAML 里自动生成 UUID（唯一 ID）与 日期  
> 2️⃣ 用 `t.uuid()` 生成 32 位随机字符串  
# 記錄

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

# 記錄

来源：<%- tp.prompt("来源（会议、书本、灵感）") %>
```

> 如何放到 Templater  
# 檔案
> 2️⃣ 在 Settings → Templater → Template folder location 设为 `flash/Templates`。

---

# 配置

# 筆記

- Add command → “Create Flash Note”
- 选择 Template → `flash/Templates/flash.md`
- 设定 File location → `flash/flash‑notes/`
- Hotkey → `Ctrl+Shift+F`

# 筆記

---

#### 2.4 示例：一次“键入闪念”

```
Ctrl+Shift+F
```

```
# 優化
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

# 儲存

---

### 3️⃣ 结构化 + 关联化：Zettelkasten 思路

|目的|操作|工具/代码|
|---|---|---|
|生成唯一 ID|`uuid` 前置字段|`uuid: <%= tp.uuid() %>`|
# 新增
# 標籤
# 顯示

---

# 查詢

markdown

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
# 瀏覽
# 筆記
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
# 瀏覽
# 筆記
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

# 筆記

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

# 筆記

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
# 寫入
# 筆記

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
    
# 記錄
    
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
    
# 記錄
    
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

# 筆記

1. 打开 Obsidian → 进入 FlashVault
# 檔案
    
    ```
    一句话：尝试把 OLED 亮度与光敏电阻做能耗互补
    来源：会议
    ```
    
    ```
    一句话：尝试把 OLED 亮度与光敏电阻做能耗互补
    来源：会议
    ```
    
# 檔案
4. 每天晚些时候打开 Daily.md，粘贴 `![[daily-flash]]`，你就能看到前一天的闪念列表，随时决定是否搬到 `ideas/`。

---

# 系統

# 儲存
- 回顾：每日/每周自动生成列表
- 归档：脚本/插件批量移动，保持 Vault 整洁

# 配置