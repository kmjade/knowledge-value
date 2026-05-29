# 属性里如何自动生成 UUID

## 快速方案

在笔记的前置 YAML（frontmatter）里添加：

```yaml
---
uuid: <%= tp.uuid() %>
---
```

---

## 方法一：Templater 插件（推荐）

| 步骤 | 操作 | 说明 |
| --- | --- | --- |
| ① | 安装插件 | Community Plugins → 搜索并安装 Templater |
| ② | 创建模板文件 | 在模板文件夹中新建 `uuid.md` |
| ③ | 配置 Templates | Settings → Templates → 指定模板文件夹 |
| ④ | 绑定热键 | Settings → Hotkeys → "Templater: Open template" → 设 `Ctrl+Shift+U` |

### 模板示例（uuid.md）

```markdown
---
uuid: <%= tp.uuid() %>
created: <% tp.date.now("YYYY-MM-DD HH:mm:ss") %>
tags:
---

## <%- tp.file.title %>

```

**为什么要放在模板里？**  
模板确保每次新建笔记时自动生成 UUID，无需手动添加。

---

## 方法二：QuickAdd + Templater

适合需要更自定义流程的场景。

| 步骤 | 操作 |
| --- | --- |
| ① | 安装 QuickAdd 插件 |
| ② | 创建 Choice → 类型选 Template |
| ③ | 设定 Template → 选择模板文件 |
| ④ | 设定 File location → 指定输出文件夹 |
| ⑤ | 绑定热键 |

---

## 查看所有 UUID（Dataview）

```dataviewjs
dv.table(["uuid", "title"],
  dv.pages('"flash/flash-notes"')
    .where(p => p.file.frontmatter && p.file.frontmatter.uuid)
    .map(p => [p.file.frontmatter.uuid, p.file.link]));
```

---

## 批量添加 UUID

为现有笔记批量补充 UUID：

```javascript
<%*
const file = app.vault.getMarkdownFiles();
for (const f of file) {
  const content = await tp.file.read(f.path);
  if (!/uuid:/.test(content)) {
    const uuidLine = `uuid: ${tp.uuid()}\n`;
    await tp.file.write(uuidLine + content, f.path);
  }
}
%>
```

> 这段脚本会在插件加载时检查所有 Markdown 并补上 UUID。

---

## 方案对比

| 需求 | 推荐方案 | 关键代码 |
| --- | --- | --- |
| 一次敲字 + 自动 UUID | Templater + QuickAdd | `uuid: <%= tp.uuid() %>` |
| 在视图里看到 UUID | DataviewJS | `dv.table(...)` |

---

## 小贴士

**为什么用 `tp.uuid()`？**  
`tp.uuid()` 是 Templater 内置的 GUID 生成器，返回符合 RFC 4122 的 UUID（例如 `b5f3b1d9-8c8b-4e73-9b7a-2e2b3d3e0f45`）。
