
# 寫入

> 你只需要在 前置 YAML（`--- ... ---`）里放一行 `uuid: <%= tp.uuid() %>`  
# 檔案
# 整理

---

## 1️⃣ Templater 插件（最直观、最可控）

| 步骤  | 操作  | 说明  |
| --- | --- | --- |
# 安裝
# 檔案
# 配置
|④|绑定热键|Settings → Hotkeys → “Templater: Open template” → 设 `Ctrl+Shift+U`（或你喜欢的组合）|
# 儲存

### uuid.md（模板示例）

markdown

```
---
uuid: <%= tp.uuid() %>
created: <% tp.date.now("YYYY-MM-DD HH:mm:ss") %>
tags: [[flash]]
---

## <%- tp.file.title %>

# 記錄
```

> 为什么要放在模板里？  
# 筆記
# 檔案

---

## 2️⃣ QuickAdd + Templater（适合想要更自定义的流程）

# 安裝
# 創建
3. 设定 _Template_ → 选择 `flash/Templates/uuid.md`。
4. 设定 _File location_ → `flash/flash‑notes/`。
5. 绑定热键（Ctrl+Shift+F 或你想的任何键）。

# 檔案

---

# 檔案

# 檔案
# 筆記

markdown

````
```dataviewjs
dv.table(["uuid", "title"],
  dv.pages('"flash/flash‑notes"')
    .where(p => p.file.frontmatter && p.file.frontmatter.uuid)
    .map(p => [p.file.frontmatter.uuid, p.file.link]));
````

```

# 筆記
# 檔案

---

# 檔案

# 檔案

```javascript
# 新增
<%*
# 搜尋
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
# 檔案

---

## 小贴士

|你想实现|推荐方案|关键代码|
|---|---|---|
|一次敲字 + 自动 UUID|Templater + QuickAdd|`uuid: <%= tp.uuid() %>`|
|在 Daily 视图里看到 UUID|DataviewJS|`dv.table(...)`|
# 檔案

> 为什么用 `tp.uuid()`？  
> `tp.uuid()` 是 Templater 内置的 GUID 生成器，返回的是符合 RFC 4122 的 32 进制字符串（例如 `b5f3b1d9-8c8b-4e73-9b7a-2e2b3d3e0f45`）。  
# 寫入

---

## 🎯 快速开始

# 安裝
# 檔案

yaml

```
uuid: <%= tp.uuid() %>
```

# 筆記
