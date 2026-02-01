
## 生成 uuid 的几种“自动写入”方式

> 你只需要在 前置 YAML（`--- ... ---`）里放一行 `uuid: <%= tp.uuid() %>`  
> 然后让 Obsidian 在创建/保存文件时把这行写进去即可。  
> 下面把最常用、最稳定的两种实现方式给你整理成一份可直接拷贝的步骤和代码。

---

## 1️⃣ Templater 插件（最直观、最可控）

|步骤|操作|说明|
|---|---|---|
|①|安装 Templater（Community Plugins → Browse → “Templater” → Install → Enable）|负责「模板」和「宏」功能。|
|②|创建模板文件|在 `flash/Templates/` 新建 uuid.md，内容如下。|
|③|配置 Templater|Settings → Templater → `Template folder location` → `flash/Templates`|
|④|绑定热键|Settings → Hotkeys → “Templater: Open template” → 设 `Ctrl+Shift+U`（或你喜欢的组合）|
|⑤|使用|按热键 → 选择 `uuid.md` → 自动生成并保存。|

### uuid.md（模板示例）

markdown

```
---
uuid: <%= tp.uuid() %>
created: <% tp.date.now("YYYY-MM-DD HH:mm:ss") %>
tags: [[flash]]
---

## <%- tp.file.title %>

一句话记录：<% tp.prompt("一句话记录（按回车即可）") %>
```

```
---
uuid: <%= tp.uuid() %>
created: <% tp.date.now("YYYY-MM-DD HH:mm:ss") %>
tags: [[flash]]
---

## <%- tp.file.title %>

一句话记录：<% tp.prompt("一句话记录（按回车即可）") %>
```

> 为什么要放在模板里？  
> ① 让你可以随时按热键产生“新笔记 + UUID”。  
> ② 生成的 UUID 一经写入文件就永远不会变，满足「唯一标识」需求。

---

## 2️⃣ QuickAdd + Templater（适合想要更自定义的流程）

1. 安装 QuickAdd（Community Plugins → Browse → “QuickAdd” → Install → Enable）。
2. 在 QuickAdd 创建一个 _Command_，命名为 “Create Flash Note with UUID”。
3. 设定 _Template_ → 选择 `flash/Templates/uuid.md`。
4. 设定 _File location_ → `flash/flash‑notes/`。
5. 绑定热键（Ctrl+Shift+F 或你想的任何键）。

> 这一步相当于把 Templater 生成的内容直接写进指定文件夹，适合「一次敲字，直接保存」的需求。

---

## 3️⃣ DataviewJS 方式（仅在渲染时生成，不写入文件）

> 有时你只想在某个视图里显示 UUID，而不想在文件里写入。  
> 例如在 Daily Note 的 “今日闪念” 区块里，你想显示每条笔记的 UUID。

markdown

````
```dataviewjs
dv.table(["uuid", "title"],
  dv.pages('"flash/flash‑notes"')
    .where(p => p.file.frontmatter && p.file.frontmatter.uuid)
    .map(p => [p.file.frontmatter.uuid, p.file.link]));
````

````
```dataviewjs
dv.table(["uuid", "title"],
  dv.pages('"flash/flash‑notes"')
    .where(p => p.file.frontmatter && p.file.frontmatter.uuid)
    .map(p => [p.file.frontmatter.uuid, p.file.link]));
````

````

> 这段代码会读取所有笔记的 frontmatter，拿到 `uuid` 字段，并生成一个表格。  
> 但 **它不会在文件里写入**，如果你想保留在文件中，还是用 Templater。

---

## 4️⃣ 让 UUID 在 **每次文件创建** 时自动写入

如果你想让 Obsidian 在 **每次新建文件** 时自动写入 UUID（不依赖手动调用模板），可以在 **Templater 的 `onload`** 或 **QuickAdd** 里写一个小脚本：

```javascript
// 在 Obsidian 的 Templater 设定中添加一个“自定义代码”模块
<%*
const file = await tp.file.find("*.md", true); // 搜索所有 Markdown
for (const f of file) {
  const content = await tp.file.read(f.path);
  if (!/uuid:/.test(content)) {  // 如果没有 uuid 行
    const uuidLine = `uuid: ${tp.uuid()}\n`;
    await tp.file.write(uuidLine + content, f.path);
  }
}
%>
````

````

> 这段代码会读取所有笔记的 frontmatter，拿到 `uuid` 字段，并生成一个表格。  
> 但 **它不会在文件里写入**，如果你想保留在文件中，还是用 Templater。

---

## 4️⃣ 让 UUID 在 **每次文件创建** 时自动写入

如果你想让 Obsidian 在 **每次新建文件** 时自动写入 UUID（不依赖手动调用模板），可以在 **Templater 的 `onload`** 或 **QuickAdd** 里写一个小脚本：

```javascript
// 在 Obsidian 的 Templater 设定中添加一个“自定义代码”模块
<%*
const file = await tp.file.find("*.md", true); // 搜索所有 Markdown
for (const f of file) {
  const content = await tp.file.read(f.path);
  if (!/uuid:/.test(content)) {  // 如果没有 uuid 行
    const uuidLine = `uuid: ${tp.uuid()}\n`;
    await tp.file.write(uuidLine + content, f.path);
  }
}
%>
````

> 这段脚本会在 插件加载 时检查所有 Markdown 并补上 UUID。  
> 注意：这会改动已有文件，除非你在新文件中使用它；通常更推荐使用模板+热键方式，因为那样更容易控制何时、在哪个文件里写入。

---

## 小贴士

|你想实现|推荐方案|关键代码|
|---|---|---|
|一次敲字 + 自动 UUID|Templater + QuickAdd|`uuid: <%= tp.uuid() %>`|
|在 Daily 视图里看到 UUID|DataviewJS|`dv.table(...)`|
|每次新文件自动写入|Templater onload 或 QuickAdd|见上方脚本|

> 为什么用 `tp.uuid()`？  
> `tp.uuid()` 是 Templater 内置的 GUID 生成器，返回的是符合 RFC 4122 的 32 进制字符串（例如 `b5f3b1d9-8c8b-4e73-9b7a-2e2b3d3e0f45`）。  
> 它会在服务器端直接生成（无网络需求），写入前置 YAML 就是最安全、最持久的做法。

---

## 🎯 快速开始

1. 安装 Templater（或 QuickAdd）。
2. 把下面这段代码粘到你想用的模板文件里：

yaml

```
uuid: <%= tp.uuid() %>
```

```
uuid: <%= tp.uuid() %>
```

3. 按热键（Ctrl+Shift+U 或你绑定的组合）产生新笔记 → 直接看到 `uuid:` 行已写好。

这样，你的每条笔记就都拥有了“唯一、不可变”的 UUID。若还有其他需求（如批量更新、自动迁移等），随时告诉我！祝你笔记整洁、UUID 一目了然 🚀。
