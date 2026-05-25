---
title: Obsidian Bases 快速參考
date: 2026-01-27
tags: [Obsidian, Bases, 速查, 參考]
---

# Obsidian Bases 快速參考

> [!tip] 速查表
> 常用的 Obsidian Bases 语法和功能快速參考

---

## 📊 Base 檔案结构

```yaml
---
filters:    # 全局篩選
formulas:   # 公式定义
# 配置
summaries:  # 彙總公式
views:      # 视图定义
---
```

---

## 🎯 三种视图类型

### Table 表格视图
最适合：列表、數據對比、統計

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
最适合：展示、瀏覽、视觉化

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
最适合：简洁列表、快速瀏覽

```yaml
views:
  - type: list
    name: 列表名称
    order:
      - file.name
      - property1
```

---

## 🔍 篩選器语法

### 基礎比较
```yaml
filters:
  'status == "done"'           # 等于
  'priority > 3'                # 大于
  'due_date < today()'          # 小于
  'rating >= 4'                 # 大于等于
  'status != "completed"'        # 不等于
```

### 逻辑運算
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

# NOT：排除满足条件的內容
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

### 檔案属性篩選
```yaml
file.hasTag("tag1", "tag2")        # 有这些標籤
file.inFolder("Projects")              # 在資料夾中
file.ext == "md"                     # 檔案擴展名
file.hasLink("Note Name")             # 連結到指定筆記
# 修改
file.size > 10000                     # 檔案大小大于 10KB
```

---

## 📐 公式语法

### 条件公式
```yaml
if_done: 'if(status == "done", "✅", "⏳")'
if_priority_high: 'if(priority == "high", "🔴", "⚪")'
if_has_due: 'if(due_date, due_date, "無截止日期")'
```

### 数学運算
```yaml
total: 'price * quantity'
average: '(sum / count).round(2)'
progress_percent: '(completed / total * 100).round(0)'
```

### 日期運算
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

## 📦 常用檔案属性

| 属性 | 类型 | 說明 | 示例 |
|------|------|------|------|
| `file.name` | String | 檔案名 | "筆記名.md" |
| `file.basename` | String | 不含擴展名的檔案名 | "筆記名" |
| `file.path` | String | 完整路徑 | "folder/note.md" |
| `file.folder` | String | 父資料夾路徑 | "folder" |
| `file.ext` | String | 檔案擴展名 | "md" |
| `file.size` | Number | 檔案大小（字节） | 10240 |
| `file.ctime` | Date | 創建時間 | 2026-01-27 |
# 修改
| `file.tags` | List | 所有標籤 | ["tag1", "tag2"] |
| `file.links` | List | 内部連結 | [["note1"], ["note2"]] |
| `file.backlinks` | List | 反向連結 | [["note3"]] |
| `file.embeds` | List | 嵌入內容 | [["note4"]] |
| `file.properties` | Object | 所有 frontmatter 属性 | {author: "xxx"} |

---

## 🎨 常用函数

### 全局函数
```yaml
today(): date              # 今日日期
now(): date                # 当前時間
date("2026-01-27"): date # 解析日期字符串
duration("1d"): duration   # 解析時間长度
if(condition, true, false)  # 条件判斷
min(1, 2, 3): number     # 最小值
max(1, 2, 3): number     # 最大值
# 顯示
icon("name"): icon          # Lucide 圖示
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
# 排序
list.reverse(): list           # 反转
list.unique(): list           # 去重
list.slice(0, 5): list       # 切片
```

---

## 📊 默认彙總函数

| 函数名 | 輸入 | 說明 |
|---------|------|------|
| `Average` | Number | 数学平均值 |
| `Min` | Number | 最小值 |
| `Max` | Number | 最大值 |
| `Sum` | Number | 求和 |
| `Range` | Number | 最大值-最小值 |
| `Median` | Number | 中位数 |
| `Stddev` | Number | 標準差 |
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

### 優先級可视化
```yaml
formulas:
  priority_icon: 'if(priority == "high", "🔴", if(priority == "medium", "🟡", "🟢"))'
  priority_sort: 'if(priority == "high", 1, if(priority == "medium", 2, 3))'
```

# 管理
```yaml
formulas:
  days_remaining: 'if(due_date, ((due_date - today()) / 86400000).round(0), "")'
  is_overdue: 'if(due_date && status != "done", due_date < today(), false)'
  urgency: 'if(days_remaining < 0, "🚫", if(days_remaining < 3, "⚠️", "✅"))'
```

### 檔案資訊
```yaml
formulas:
  file_size_kb: '(file.size / 1024).round(1) + " KB"'
  created_days_ago: '((now() - file.ctime) / 86400000).round(0) + " days ago"'
  modified_time: 'file.mtime.format("YYYY-MM-DD HH:mm")'
```

---

## 💡 效能優化技巧

1. **使用全局过滤器**：在 `filters` 部分定义，而不是每个视图中
# 顯示
3. **避免复杂計算**：簡化公式，避免嵌套过深
4. **合理使用分组**：只在需要时使用 `groupBy`
5. **缓存常用值**：将常用計算定义为公式，重复使用

---

## 🔧 常见問題解決

# 顯示
A: 檢查：
1. `.base` 檔案是否在正确的位置
2. 筆記是否新增了必要的 frontmatter 属性
3. 篩選条件是否过于严格

### Q: 公式报错？
A: 檢查：
1. 引号是否正确匹配
2. 括号是否平衡
3. 属性名是否拼写正确
4. 數據类型是否匹配（如字符串比较不能和数字比较）

### Q: 顺序不符合预期？
A: 檢查：
1. `order` 中的属性顺序
2. 是否需要使用 `direction: ASC/DESC`
# 排序

---

**創建日期**：2026-01-27
# 更新
