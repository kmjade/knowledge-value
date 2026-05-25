---
title: Markdown 速查表
tags: [markdown/cheatsheet]
created: 2026-05-25
---

# Markdown 速查表

> 打印或收藏，随时查阅

## 基础

| 语法         | 效果      |
| ---------- | ------- |
| `# H1`     | 一级标题    |
| `## H2`    | 二级标题    |
| `### H3`   | 三级标题    |
| `**粗体**`   | **粗体**  |
| `*斜体*`     | *斜体*    |
| `~~删除线~~`  | ~~删除线~~ |
| `==高亮==`   | ==高亮==  |
| `` `代码` `` | `代码`    |



## 链接与图片

```markdown
[链接文字](URL)
![替代文字](图片URL)
[[笔记名称]]            Obsidian
[[笔记名|显示]]          Obsidian
```

## 列表

```markdown
- 无序
  - 嵌套

1. 有序
2. 有序

- [ ] 待办
- [x] 完成
```

## 引用

```markdown
> 一级引用
>> 二级引用
```

## 代码

````markdown
`单行代码`

```python
多行代码块
```
````

## 表格

```markdown
| 头 | 头 |
|---|----|
| 格 | 格 |
```

## 分隔线

```markdown
---
***
```

## Callout (Obsidian)

```markdown
> [!note] 笔记
> [!warning] 警告
> [!tip] 提示
> [!danger] 危险
> [!question] 问题
> [!success] 成功
> [!example] 示例
> [!quote] 引用
```

## 数学公式

```markdown
行内：$E=mc^2$

块级：
$$
\sum_{i=1}^n x_i
$$
```

## Mermaid

````markdown
```mermaid
flowchart LR
  A --> B
```
````

## 嵌入 (Obsidian)

```markdown
![[笔记名]]        嵌入笔记
![[图片.png]]      嵌入图片
```

## Frontmatter

```yaml
---
title: 标题
tags: [tag1, tag2]
created: 2026-05-25
aliases: [别名]
---
```

## 其他

```markdown
%% 隐藏注释 %%
\* 转义 \*
<kbd>Ctrl+C</kbd>
H~2~O  X^2^            上下标
```
