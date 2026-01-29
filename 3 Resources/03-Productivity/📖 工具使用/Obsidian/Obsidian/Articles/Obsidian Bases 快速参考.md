---
title: Obsidian Bases 快速参考
date: 2026-01-27
tags: [Obsidian, Bases, 速查, 参考]
---

# Obsidian Bases 快速参考

> [!tip] 速查表
> 常用的 Obsidian Bases 语法和功能快速参考

---

## 📊 Base 文件结构

```yaml
---
filters:    # 全局筛选
formulas:   # 公式定义
properties:  # 属性配置
summaries:  # 汇总公式
views:      # 视图定义
---
```

---

## 🎯 三种视图类型

### Table 表格视图
最适合：列表、数据对比、统计

```yaml
views:
  - type: table
    name: 表格名称
    order:
      - file.name
      - property1
      - property2
    groupBy:
      property: category
      direction: ASC
    limit: 20
```

### Cards 卡片视图
最适合：展示、浏览、视觉化

```yaml
views:
  - type: cards
    name: 卡片名称
    order:
      - cover
      - file.name
      - description
    limit: 20
```

### List 列表视图
最适合：简洁列表、快速浏览

```yaml
views:
  - type: list
    name: 列表名称
    order:
      - file.name
      - property1
```

---

## 🔍 筛选器语法

### 基础比较
```yaml
filters:
  'status == "done"'           # 等于
  'priority > 3'                # 大于
  'due_date < today()'          # 小于
  'rating >= 4'                 # 大于等于
  'status != "completed"'        # 不等于
```

### 逻辑运算
```yaml
# AND：所有条件都满足
filters:
  and:
    - file.hasTag("book")
    - status == "reading"

# OR：任一条件满足
filters:
  or:
    - type == "book"
    - type == "article"

# NOT：排除满足条件的内容
filters:
  not:
    - file.hasTag("archived")

# 嵌套条件
filters:
  and:
    - file.hasTag("important")
    - or:
        - priority == "high"
        - due_date < today()
```

### 文件属性筛选
```yaml
file.hasTag("tag1", "tag2")        # 有这些标签
file.inFolder("Projects")              # 在文件夹中
file.ext == "md"                     # 文件扩展名
file.hasLink("Note Name")             # 链接到指定笔记
file.mtime > now() - "7d"          # 7天内修改
file.size > 10000                     # 文件大小大于 10KB
```

---

## 📐 公式语法

### 条件公式
```yaml
if_done: 'if(status == "done", "✅", "⏳")'
if_priority_high: 'if(priority == "high", "🔴", "⚪")'
if_has_due: 'if(due_date, due_date, "无截止日期")'
```

### 数学运算
```yaml
total: 'price * quantity'
average: '(sum / count).round(2)'
progress_percent: '(completed / total * 100).round(0)'
```

### 日期运算
```yaml
days_until: '((due_date - today()) / 86400000).round(0)'
days_overdue: '((today() - due_date) / 86400000).round(0)'
date_formatted: 'date(due_date).format("YYYY-MM-DD")'
days_old: '((now() - file.ctime) / 86400000).round(0)'
```

### 字符串操作
```yaml
title_case: 'file.name.title()'
short_name: 'file.name.substring(0, 20)'
full_display: 'title + " - " + author'
has_prefix: 'file.name.startsWith("prefix")'
```

### 数组操作
```yaml
tag_count: 'file.tags.length'
link_count: 'file.links.length'
first_tag: 'file.tags.first()'
unique_tags: 'file.tags.unique()'
```

---

## 📦 常用文件属性

| 属性 | 类型 | 说明 | 示例 |
|------|------|------|------|
| `file.name` | String | 文件名 | "笔记名.md" |
| `file.basename` | String | 不含扩展名的文件名 | "笔记名" |
| `file.path` | String | 完整路径 | "folder/note.md" |
| `file.folder` | String | 父文件夹路径 | "folder" |
| `file.ext` | String | 文件扩展名 | "md" |
| `file.size` | Number | 文件大小（字节） | 10240 |
| `file.ctime` | Date | 创建时间 | 2026-01-27 |
| `file.mtime` | Date | 修改时间 | 2026-01-27 |
| `file.tags` | List | 所有标签 | ["tag1", "tag2"] |
| `file.links` | List | 内部链接 | [["note1"], ["note2"]] |
| `file.backlinks` | List | 反向链接 | [["note3"]] |
| `file.embeds` | List | 嵌入内容 | [["note4"]] |
| `file.properties` | Object | 所有 frontmatter 属性 | {author: "xxx"} |

---

## 🎨 常用函数

### 全局函数
```yaml
today(): date              # 今日日期
now(): date                # 当前时间
date("2026-01-27"): date # 解析日期字符串
duration("1d"): duration   # 解析时间长度
if(condition, true, false)  # 条件判断
min(1, 2, 3): number     # 最小值
max(1, 2, 3): number     # 最大值
link("path", "显示"): link  # 创建链接
icon("name"): icon          # Lucide 图标
```

### 日期函数
```yaml
# 从日期中提取
date.year                    # 年份
date.month                   # 月份 (1-12)
date.day                     # 日期 (1-31)
date.hour                    # 小时 (0-23)
date.minute                  # 分钟 (0-59)
date.second                  # 秒 (0-59)

# 日期格式化
date.format("YYYY-MM-DD")      # 2026-01-27
date.format("MMM DD")          # Jan 27
date.time()                  # "14:30:00"
date.relative()               # "2 days ago"
```

### 字符串函数
```yaml
str.length: number            # 字符串长度
str.contains("abc"): boolean # 包含子串
str.startsWith("pre"): boolean # 以...开头
str.endsWith("suf"): boolean # 以...结尾
str.lower(): string           # 转小写
str.upper(): string           # 转大写
str.title(): string           # 标题格式
str.trim(): string            # 去除空格
str.replace("a", "b"): string # 替换
```

### 数组函数
```yaml
list.length: number           # 数组长度
list.contains(value): boolean # 包含元素
list.first(): any             # 第一个元素
list.last(): any              # 最后一个元素
list.sort(): list             # 排序
list.reverse(): list           # 反转
list.unique(): list           # 去重
list.slice(0, 5): list       # 切片
```

---

## 📊 默认汇总函数

| 函数名 | 输入 | 说明 |
|---------|------|------|
| `Average` | Number | 数学平均值 |
| `Min` | Number | 最小值 |
| `Max` | Number | 最大值 |
| `Sum` | Number | 求和 |
| `Range` | Number | 最大值-最小值 |
| `Median` | Number | 中位数 |
| `Stddev` | Number | 标准差 |
| `Earliest` | Date | 最早日期 |
| `Latest` | Date | 最晚日期 |
| `Checked` | Boolean | true 值计数 |
| `Unchecked` | Boolean | false 值计数 |
| `Empty` | Any | 空值计数 |
| `Filled` | Any | 非空值计数 |
| `Unique` | Any | 唯一值计数 |

---

## 🎯 实用示例集合

### 进度追踪
```yaml
formulas:
  progress_bar: 'progress + "%"'
  progress_icon: 'if(progress >= 100, "✅", if(progress >= 50, "🔄", "⏳"))'
```

### 优先级可视化
```yaml
formulas:
  priority_icon: 'if(priority == "high", "🔴", if(priority == "medium", "🟡", "🟢"))'
  priority_sort: 'if(priority == "high", 1, if(priority == "medium", 2, 3))'
```

### 截止日期管理
```yaml
formulas:
  days_remaining: 'if(due_date, ((due_date - today()) / 86400000).round(0), "")'
  is_overdue: 'if(due_date && status != "done", due_date < today(), false)'
  urgency: 'if(days_remaining < 0, "🚫", if(days_remaining < 3, "⚠️", "✅"))'
```

### 文件信息
```yaml
formulas:
  file_size_kb: '(file.size / 1024).round(1) + " KB"'
  created_days_ago: '((now() - file.ctime) / 86400000).round(0) + " days ago"'
  modified_time: 'file.mtime.format("YYYY-MM-DD HH:mm")'
```

---

## 💡 性能优化技巧

1. **使用全局过滤器**：在 `filters` 部分定义，而不是每个视图中
2. **限制结果数量**：使用 `limit: 20` 避免显示过多内容
3. **避免复杂计算**：简化公式，避免嵌套过深
4. **合理使用分组**：只在需要时使用 `groupBy`
5. **缓存常用值**：将常用计算定义为公式，重复使用

---

## 🔧 常见问题解决

### Q: Base 不显示内容？
A: 检查：
1. `.base` 文件是否在正确的位置
2. 笔记是否添加了必要的 frontmatter 属性
3. 筛选条件是否过于严格

### Q: 公式报错？
A: 检查：
1. 引号是否正确匹配
2. 括号是否平衡
3. 属性名是否拼写正确
4. 数据类型是否匹配（如字符串比较不能和数字比较）

### Q: 顺序不符合预期？
A: 检查：
1. `order` 中的属性顺序
2. 是否需要使用 `direction: ASC/DESC`
3. 公式返回的值是否可排序

---

**创建日期**：2026-01-27
**更新日期**：2026-01-27
