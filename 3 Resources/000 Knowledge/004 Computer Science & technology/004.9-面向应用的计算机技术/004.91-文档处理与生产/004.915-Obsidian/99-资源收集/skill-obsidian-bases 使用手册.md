---
title: skill-obsidian-bases 使用手册
aliases: [Obsidian Bases Skill Manual, Bases 使用指南]
tags: [skill, obsidian-bases, bases, database, reference, manual]
created: 2026-06-01
type: reference
topic: obsidian
status: evergreen
---

# skill-obsidian-bases 使用手册

> Claude Code Skill — 指导 Agent 创建和编辑 Obsidian Bases (`.base` 文件)，包括视图、筛选器、公式和汇总。

---

## Skill 基本信息

| 属性 | 值 |
|------|------|
| **名称** | `obsidian-bases` |
| **路径** | `.claude/skills/obsidian-skills/obsidian-bases/SKILL.md` |
| **触发条件** | 处理 `.base` 文件 · 提及 Bases/表格视图/卡片视图/筛选器/公式 |

---

## 文件格式

Base 文件使用 `.base` 扩展名，包含有效 YAML。可嵌入 Markdown 代码块。

---

## 完整 Schema

```yaml
# 全局筛选器 — 应用于所有视图
filters:
  and: []
  or: []
  not: []

# 公式定义
formulas:
  formula_name: 'expression'

# 属性显示配置
properties:
  property_name:
    displayName: "显示名称"

# 自定义汇总
summaries:
  custom_summary: 'values.mean().round(3)'

# 视图 (1+)
views:
  - type: table | cards | list | map
    name: "视图名称"
    limit: 10
    groupBy:
      property: property_name
      direction: ASC | DESC
    filters:
      and: []
    order:
      - file.name
      - property_name
    summaries:
      property_name: Sum
```

---

## 筛选器 Filters

### 基础语法

```yaml
# 单条件
filters: 'status == "done"'

# AND
filters:
  and:
    - 'status == "done"'
    - 'priority > 3'

# OR
filters:
  or:
    - 'file.hasTag("book")'
    - 'file.hasTag("article")'

# NOT
filters:
  not:
    - 'file.hasTag("archived")'
```

### 嵌套筛选

```yaml
filters:
  or:
    - file.hasTag("important")
    - and:
        - file.hasTag("book")
        - file.hasLink("Textbook")
    - not:
        - file.hasTag("archived")
```

### 操作符

| 操作符 | 含义 |
|:---:|------|
| `==` | 等于 |
| `!=` | 不等于 |
| `>` `<` | 大于/小于 |
| `>=` `<=` | 大于等于/小于等于 |
| `&&` | 逻辑与 |
| `\|\|` | 逻辑或 |
| `!` | 逻辑非 |

---

## 属性类型

### 1. 笔记属性 (Frontmatter)
`author` `status` `priority`

### 2. 文件属性 (File)

| 属性 | 类型 | 说明 |
|------|:---:|------|
| `file.name` | String | 文件名 |
| `file.basename` | String | 无扩展名 |
| `file.path` | String | 完整路径 |
| `file.folder` | String | 文件夹 |
| `file.ext` | String | 扩展名 |
| `file.size` | Number | 文件大小 (bytes) |
| `file.ctime` | Date | 创建时间 |
| `file.mtime` | Date | 修改时间 |
| `file.tags` | List | 所有标签 |
| `file.links` | List | 内部链接 |
| `file.backlinks` | List | 反向链接 |
| `file.embeds` | List | 嵌入内容 |
| `file.properties` | Object | 所有 frontmatter |

### 3. 公式属性
`formula.my_formula` — 由公式计算的动态值

---

## 公式 Formulas

### 基础表达式

```yaml
formulas:
  total: "price * quantity"
  status_icon: 'if(done, "✅", "⏳")'
  formatted: 'if(price, price.toFixed(2) + " dollars")'
  created: 'file.ctime.format("YYYY-MM-DD")'
  days_old: '((now() - file.ctime) / 86400000).round(0)'
```

### 全局函数

| 函数 | 说明 |
|------|------|
| `date(s)` | 解析日期字符串 |
| `duration(s)` | 解析时长字符串 |
| `now()` | 当前日期时间 |
| `today()` | 今天 (00:00) |
| `if(cond, true, false?)` | 条件判断 |
| `min(n1, n2, ...)` | 最小值 |
| `max(n1, n2, ...)` | 最大值 |
| `number(x)` | 转数字 |
| `link(path, display?)` | 创建链接 |
| `list(el)` | 包装为列表 |
| `file(path)` | 获取文件对象 |
| `icon(name)` | Lucide 图标 |
| `html(s)` | 渲染 HTML |

### 日期函数

```yaml
# 日期算术
now() + "1M"           # 加 1 月
now() - "2h"           # 减 2 小时
today() + "7d"         # 一周后
now() + duration('1d') * 2

# 格式化
date.format("YYYY-MM-DD")
date.relative()         # "3 days ago"
```

### 字符串函数

| 函数 | 说明 |
|------|------|
| `.contains(v)` | 包含子串 |
| `.startsWith(q)` | 以…开头 |
| `.isEmpty()` | 空检查 |
| `.lower()` `.title()` | 大小写转换 |
| `.trim()` | 去空格 |
| `.replace(p, r)` | 替换 |
| `.split(sep)` | 分割 |

### 数字函数

| 函数 | 说明 |
|------|------|
| `.abs()` `.ceil()` `.floor()` | 取整 |
| `.round(digits?)` | 四舍五入 |
| `.toFixed(p)` | 定点格式 |

### 列表函数

| 函数 | 说明 |
|------|------|
| `.contains(v)` | 包含元素 |
| `.filter(expr)` | 筛选 (`value`, `index`) |
| `.map(expr)` | 映射 |
| `.reduce(expr, init)` | 归约 (`value`, `index`, `acc`) |
| `.flat()` | 展平 |
| `.join(sep)` | 连接 |
| `.sort()` | 排序 |
| `.unique()` | 去重 |
| `.isEmpty()` `.length` | 空检查/长度 |

### 文件函数

| 函数 | 说明 |
|------|------|
| `.hasTag(...tags)` | 包含标签 |
| `.hasLink(file)` | 链接到某文件 |
| `.hasProperty(name)` | 有某属性 |
| `.inFolder(folder)` | 在某文件夹 |

---

## 视图类型

### Table 表格视图

```yaml
views:
  - type: table
    name: "任务表"
    order: [file.name, status, due]
    summaries:
      price: Sum
```

### Cards 卡片视图

```yaml
views:
  - type: cards
    name: "画廊"
    order: [file.name, cover_image, description]
```

### List 列表视图

```yaml
views:
  - type: list
    name: "简洁列表"
    order: [file.name, status]
```

### Map 地图视图

需要经纬度属性和 Maps 社区插件。

---

## 默认汇总公式

| 名称 | 输入类型 | 说明 |
|------|:---:|------|
| `Average` | Number | 均值 |
| `Min` `Max` | Number | 最小值/最大值 |
| `Sum` | Number | 求和 |
| `Range` | Number / Date | 范围 |
| `Median` | Number | 中位数 |
| `Stddev` | Number | 标准差 |
| `Earliest` `Latest` | Date | 最早/最晚 |
| `Checked` `Unchecked` | Boolean | 计数 |
| `Empty` `Filled` | Any | 空/非空计数 |
| `Unique` | Any | 唯一值计数 |

---

## 常用模式

### 按标签筛选

```yaml
filters:
  and: [file.hasTag("project")]
```

### 按文件夹筛选

```yaml
filters:
  and: [file.inFolder("Projects")]
```

### 按时间范围

```yaml
filters:
  and: ['file.mtime > now() - "7d"']
```

### 按属性值

```yaml
filters:
  and:
    - 'status == "active"'
    - 'priority >= 3'
```

### 复合条件

```yaml
filters:
  or:
    - and:
        - file.hasTag("important")
        - 'status != "done"'
    - and:
        - 'priority == 1'
        - 'due != ""'
```

---

## 嵌入 Base

```markdown
![[MyBase.base]]
![[MyBase.base#View Name]]
```

---

## 参考

- [Bases Syntax](https://help.obsidian.md/bases/syntax)
- [Functions](https://help.obsidian.md/bases/functions)
- [[Obsidian-Markdown 使用手册]] — Markdown 语法参考
- [[skill-obsidian-markdown 使用手册]] — obsidian-markdown Skill 指南

---

*最后更新: 2026-06-01*
