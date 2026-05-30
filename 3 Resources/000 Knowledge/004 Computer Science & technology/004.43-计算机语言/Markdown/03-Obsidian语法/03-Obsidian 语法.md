---
title: 03-Obsidian 语法
tags: [markdown/obsidian, syntax]
created: 2026-05-25
---

# 03 - Obsidian 专属语法

Obsidian 在标准 Markdown 基础上扩展了知识管理特性。
以下语法仅在 Obsidian 中生效。

## Wikilink（双向链接）

```markdown
[[笔记名称]]              链接到笔记
[[笔记名称|显示文字]]      自定义显示文字
[[笔记名称#标题]]          链接到笔记内标题
[[笔记名称#^block-id]]     链接到笔记内段落块
[[#当前笔记标题]]          链接到当前笔记内的标题
```

> Wikilink 是 Obsidian 的核心机制。链接的笔记不存在时会显示为灰色。

## Callout（标注块）

```markdown
> [!note] 标题
> 这是普通信息标注

> [!warning] 警告
> 这是警告内容

> [!tip] 提示
> 这是一个有用的提示

> [!danger] 危险
> 这是危险警告

> [!question]- 可折叠问题
> 点击展开查看答案
```

**所有 Callout 类型**：

| 类型 | 用途 |
|------|------|
| `note` | 笔记/信息 |
| `info` | 信息 |
| `todo` | 待办 |
| `tip` / `hint` | 提示/技巧 |
| `success` / `check` / `done` | 成功/完成 |
| `question` / `help` / `faq` | 问题 |
| `warning` / `caution` / `attention` | 警告 |
| `failure` / `fail` / `missing` | 失败 |
| `danger` / `error` | 危险/错误 |
| `bug` | 缺陷 |
| `example` | 示例 |
| `quote` / `cite` | 引用 |

**折叠**：加 `-` 如 `> [!note]-` 默认折叠；加 `+` 如 `> [!note]+` 默认展开。

## Properties（YAML Frontmatter）

```yaml
---
title: 笔记标题
tags: [ai, ml]
created: 2026-05-25
aliases: [别名1, 别名2]
cssclasses: [custom-class]
---
```

**常用 Property 类型**：

| 类型 | 语法示例 |
|------|----------|
| 文本 | `key: value` |
| 列表 | `tags: [a, b, c]` |
| 数字 | `count: 42` |
| 日期 | `date: 2026-05-25` |
| 布尔 | `draft: true` |

## 嵌入

```markdown
![[笔记名称]]            嵌入整个笔记
![[笔记#标题]]           嵌入笔记段落
![[图片.png]]            嵌入图片
![[音频.mp3]]            嵌入音频
![[视频.mp4]]            嵌入视频
![[PDF文件.pdf]]         嵌入 PDF
![[笔记#^block-id]]      嵌入段落块
```

> 嵌入默认渲染内容。想显示为链接而非嵌入：`!` 前加 `\` 转义。

## Dataview（需插件）

```markdown
```dataview
TABLE title, created
FROM "3 Resources"
WHERE contains(tags, "ai")
SORT created DESC
```
```

## 标签

```markdown
#tag                     普通标签
#nested/tag              嵌套标签
#中文标签                支持中文
```

> Obsidian 的 `tags` property 和正文中的 `#tag` 都会纳入标签系统。

## 注释

```markdown
这是可见文字 %%这是隐藏注释%%
```

## 块引用 ID

```markdown
这是一段文字 ^block-id
```

然后可以用 `[[笔记#^block-id]]` 引用。

---

## 相关笔记

- [[01-基础语法]] — 通用语法基础
- [[02-扩展语法]] — 表格、代码块
- [[04-高级技巧]]
