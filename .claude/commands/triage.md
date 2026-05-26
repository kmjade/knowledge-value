# Triage Skill - Inbox 分拣引擎

自动扫描 `0 Inbox/` 目录，分析文件内容，智能路由到正确位置。

## 使用方式

```
/triage              # 扫描所有未处理文件
/triage --dry-run    # 仅预览，不执行移动
/triage --file "filename.md"  # 处理单个文件
```

## 执行流程

### 1. 扫描阶段
扫描 `0 Inbox/` 目录下所有 `.md` 文件，排除：
- `_processed/` 目录下的文件
- 已有 `triaged: true` frontmatter 的文件

### 2. 分析阶段
对每个文件进行多维度分析：

#### 时效性分类 (Time-Aware Classification)
| 类型 | 特征 | 存放位置 |
|------|------|---------|
| **ephemeral** | 任务、待办、短期信息 | `1 Projects/[项目]/tasks.md` |
| **operational** | 项目笔记、会议记录 | `1 Projects/[项目]/` |
| **reference** | 参考资料、文章摘录 | `3 Resources/[主题]/raw/` |
| **evergreen** | 长期知识、概念笔记 | `3 Resources/[主题]/wiki/` |

#### 主题识别
基于关键词和内容识别主题：
- AI/ML: LLM, GPT, Claude, Machine Learning, AI Agent...
- People: 人物、联系人、协作...
- Finance: 投资、理财、股票...
- Productivity: GTD, PARA, 习惯、工具...

#### 人物识别
提取文档中提及的人物，用于：
- 创建/更新 `3 Resources/people/raw/` 人物卡片
- 建立人物与文档的关联

### 3. 路由阶段
根据分析结果，执行文件移动或创建引用：

```
原始文件 → 目标位置
─────────────────────
任务清单 → 1 Projects/[项目]/tasks.md (追加)
项目笔记 → 1 Projects/[项目]/notes/
参考资料 → 3 Resources/[主题]/raw/
人物信息 → 3 Resources/people/raw/
```

### 4. 记录阶段
将操作记录到 `AI-Log/triage-log.md`:

```markdown
## YYYY-MM-DD HH:MM

### 文件: [filename.md]
- 分类: ephemeral/operational/reference/evergreen
- 主题: [主题]
- 目标: [目标路径]
- 状态: success/failed
- 备注: [可选备注]
```

## 路由规则详解

### Projects 路由
1. 检查 `1 Projects/` 下是否有匹配的活跃项目
2. 如果有，将内容追加到项目相关文件
3. 如果没有，询问用户是否创建新项目

### Resources 路由
1. 根据主题匹配 `3 Resources/` 下的目录
2. 优先匹配 Wiki 子库 (ai-ml, people, finance, productivity)
3. 其次匹配其他资源目录 (01-Tech, 02-Learning...)

### 特殊处理

#### Clippings (网页剪藏)
- 来源 URL → 提取到 frontmatter
- 创建时间 → 保留原始时间戳
- 标签 → 转换为 Obsidian tags

#### 人物信息
- 提取姓名、联系方式
- 创建/更新人物卡片
- 建立双向链接

## Frontmatter 更新

处理后的文件添加：
```yaml
---
triaged: true
triaged_at: YYYY-MM-DDTHH:MM:SS
triaged_to: [目标路径]
original_path: [原始路径]
---
```

## 安全检查

在移动文件前执行：
1. 检查目标位置是否已存在同名文件
2. 检查文件是否有未保存的修改
3. 确认移动不会破坏现有的 wikilinks

## 示例输出

```
🔍 Triage Report - YYYY-MM-DD HH:MM

📊 扫描结果:
- 总文件数: 15
- 已处理: 3
- 待处理: 12

📋 分类统计:
- ephemeral: 4
- operational: 2
- reference: 5
- evergreen: 1

📁 路由计划:
1. [文章] LLM原理详解.md → 3 Resources/ai-ml/raw/articles/
2. [任务] 本周待办.md → 1 Projects/日常/tasks.md
3. [人物] 张三介绍.md → 3 Resources/people/raw/

✅ 已完成: 3 个文件
⚠️ 需要确认: 2 个文件
❌ 失败: 0 个文件
```

## 注意事项

1. **不修改 raw/ 目录**: 原始资料保持原样
2. **保留原始时间戳**: 不覆盖创建时间和修改时间
3. **处理冲突**: 如果目标已存在，选择追加而非覆盖
4. **用户确认**: 对于不确定的分类，询问用户

