---
title: PARA 模板使用指南 (Templater 版本)
created: 2026-01-28
tags:
  - template
  - para
  - templater
---

> [!info] PARA 模板使用指南
> 使用 Templater 插件的 PARA 模板完整使用说明

---

## 📋 目录

1. [前置要求](#前置要求)
2. [插件配置](#插件配置)
3. [模板使用流程](#模板使用流程)
4. [各模板详细说明](#各模板详细说明)
5. [常见问题](#常见问题)
6. [最佳实践](#最佳实践)

---

## 前置要求

### 必需插件

在使用 PARA 模板之前，需要安装以下 Obsidian 插件：

1. **Templater** - 模板引擎，负责动态内容生成
   - 下载地址：https://github.com/SilentVoid13/Templater
   - 社区插件设置中搜索 "Templater"

2. **Obsidian Tasks** - 任务管理插件
   - 下载地址：https://github.com/obsidian-tasks-group/obsidian-tasks
   - 社区插件设置中搜索 "Tasks"

3. **Dataview** - 数据查询插件
   - 下载地址：https://github.com/blacksmithgu/obsidian-dataview
   - 社区插件设置中搜索 "Dataview"

### 安装步骤

1. 打开 Obsidian 设置（`Ctrl/Cmd + ,`）
2. 进入 **社区插件** (Community Plugins)
3. 关闭安全模式 (Safe Mode)
4. 浏览插件 (Browse)，搜索并安装上述三个插件
5. 安装完成后，依次启用每个插件

---

## 插件配置

### Templater 配置

在设置中找到 **Templater** 插件，配置以下选项：

#### 基础设置

```
Template folder location: _templates/
Date format: YYYY-MM-DD
Time format: HH:mm:ss
```

#### 可选设置

```
Trigger Templater on new file creation: ✅ (推荐启用)
Enable System Command Functions: ✅ (可选，用于高级功能)
```

#### 模板文件夹设置

确保 Templater 的模板文件夹指向 `_templates/`：
- 设置 → Templater → Template folder location
- 选择 `_templates/` 文件夹

### Obsidian Tasks 配置

在设置中找到 **Tasks** 插件，推荐配置：

```
Global filter: ✅ 启用
Global task filter: (可选)
```

Tasks 插件会自动识别以下格式：
- `- [ ]` - 未完成任务
- `- [x]` - 已完成任务
- `📅 日期` - 截止日期
- `🏷️ #tag` - 标签

### Dataview 配置

Dataview 插件通常开箱即用，推荐配置：

```
Enable JavaScript queries: ✅ 启用
Enable inline queries: ✅ 启用
```

---

## 模板使用流程

### 方法一：快捷键应用模板（推荐）

1. **创建新文件** - 在 Obsidian 中创建新 Markdown 文件
2. **打开命令面板** - 按 `Ctrl/Cmd + P`
3. **选择命令** - 输入 "Templater: Insert template"
4. **选择模板** - 从列表中选择需要的模板
   - `_template-project` - 项目模板
   - `_template-area` - 领域模板
   - `_template-resource` - 资源模板
   - `_template-archive` - 归档模板
   - `_template-zettel` - Zettelkasten 模板

### 方法二：右键菜单应用模板

1. **创建新文件** - 在文件浏览器中右键点击空白处
2. **选择命令** - 选择 "Templates" → "Insert template"
3. **选择模板** - 从弹出的菜单中选择模板

### 方法三：自动触发（已配置）

如果已启用 "Trigger Templater on new file creation"：

1. **创建新文件** - 在对应文件夹创建新文件
2. **选择模板** - 创建时会自动弹出模板选择器
3. **确认选择** - 选择需要的模板，Templater 会自动应用

### 填写模板内容

模板应用后，需要填写以下内容：

#### 必填字段

- `{{title}}` - 文件标题（需要手动替换）
- 任务列表 - 填写具体的任务项
- 目标描述 - 填写项目/领域/资源的目标

#### 自动生成字段

- `created` - 创建日期（自动生成）
- `zettel_id` - 唯一 ID（仅 Zettel 模板，自动生成）
- `updated` / `last_accessed` / `archived` - 各种日期（自动生成）

---

## 各模板详细说明

### 1. 项目模板 (_template-project.md)

**用途**：管理有明确目标和截止日期的项目

**特点**：
- ✅ 自动生成创建日期和开始日期
- ✅ 集成 Tasks 插件，支持任务管理
- ✅ 内置任务查询（显示当前文件的任务）
- ✅ SMART 原则指导目标设定
- ✅ 里程碑管理
- ✅ 项目回顾和总结

**使用步骤**：
1. 应用模板
2. 将 `{{title}}` 替换为项目名称
3. 填写 `due`（截止日期）
4. 填写项目目标和任务列表
5. 根据需要添加里程碑和资源链接

**任务格式示例**：
```markdown
- [ ] 完成 UI 设计 📅 2026-02-15 🏷️ #high
- [ ] 开发后端 API 📅 2026-02-28 🏷️ #medium
- [ ] 编写测试用例 📅 2026-03-10 🏷️ #low
```

---

### 2. 领域模板 (_template-area.md)

**用途**：管理没有截止日期的长期责任领域

**特点**：
- ✅ 自动生成创建和更新日期
- ✅ 关联项目自动查询（Dataview）
- ✅ 维护目标追踪表格
- ✅ 关键指标监控
- ✅ 定期回顾结构（月度/季度/年度）
- ✅ 问题记录和改进想法

**使用步骤**：
1. 应用模板
2. 将 `{{title}}` 替换为领域名称
3. 填写领域描述和范围
4. 设置维护目标和关键指标
5. 关联相关项目（Dataview 会自动查询）
6. 按需填写月度/季度/年度回顾

**Dataview 查询说明**：
模板中包含 Dataview 查询，会自动显示：
- 关联的项目列表
- 月度回顾记录
- 这些查询会在 Dataview 插件启用后自动工作

---

### 3. 资源模板 (_template-resource.md)

**用途**：收集和整理有价值的参考资料

**特点**：
- ✅ 自动生成创建和访问日期
- ✅ 支持多种资源类型（文章/书籍/视频/播客/课程/工具）
- ✅ 完整的笔记和摘录结构
- ✅ 标签分类系统
- ✅ 个人理解和应用场景
- ✅ 评分系统

**使用步骤**：
1. 应用模板
2. 将 `{{title}}` 替换为资源标题
3. 选择资源类型（article/book/video 等）
4. 填写来源信息和作者
5. 提取关键信息和要点
6. 记录个人理解和应用场景
7. 添加标签以便检索

**资源类型选择**：
```yaml
type:
  - article    # 文章/博客/论文
  - book       # 书籍/电子书
  - video      # 视频/教程
  - podcast    # 播客/音频
  - course     # 课程/教程
  - tool       # 工具/软件
```

---

### 4. 归档模板 (_template-archive.md)

**用途**：归档已完成或不再活跃的内容

**特点**：
- ✅ 自动生成归档日期
- ✅ 归档原因分类系统
- ✅ 归档后行动计划
- ✅ 未来参考价值评估
- ✅ 定期审查机制

**使用步骤**：
1. 应用模板
2. 将 `{{title}}` 替换为归档内容标题
3. 选择原始分类（projects/areas/resources）
4. 选择归档原因（completed/cancelled/obsolete/merged/moved）
5. 记录原始内容摘要
6. 填写归档原因详细说明
7. 完成归档后的行动清单
8. 设置未来参考价值

**归档原因说明**：
```yaml
archive_reason:
  - completed   # 项目或任务已完成
  - cancelled   # 取消或放弃
  - obsolete    # 内容已过时
  - merged      # 合并到其他文件
  - moved       # 移动到其他位置
```

---

### 5. Zettelkasten 模板 (_template-zettel.md)

**用途**：创建原子化笔记，构建知识网络

**特点**：
- ✅ 自动生成唯一 Zettel ID（时间戳格式：YYYYMMDDHHmmss）
- ✅ 支持 4 种卡片类型（临时/文献/永久/结构）
- ✅ 反向链接自动查询（Dataview）
- ✅ 完整的关联和反思机制
- ✅ 来源和出处追踪
- ✅ 应用场景记录

**使用步骤**：
1. 应用模板
2. 选择 Zettel 类型（fleeting/literature/permanent/structure）
3. 将 `{{title}}` 替换为卡片标题（核心思想）
4. 填写核心思想和详细阐述
5. 记录来源和出处
6. 添加前向链接和关联的 PARA 内容
7. 添加标签分类
8. 填写反思与迭代记录

**Zettel 类型选择**：
```yaml
type:
  - fleeting      # 临时笔记 - 快速记录想法、灵感
  - literature    # 文献笔记 - 记录学习内容、读书笔记
  - permanent     # 永久笔记 - 标准化的核心思想
  - structure     # 结构笔记 - 组织卡片关系、主题索引
```

**Zettelkasten 原则**：
- **原子性** - 每张卡片只记录一个思想
- **自主性** - 卡片可以独立理解
- **链接性** - 通过链接建立知识网络
- **唯一性** - 使用唯一标识符

---

## 常见问题

### Q1: Templater 命令找不到？

**原因**：Templater 插件未正确安装或模板文件夹配置错误

**解决方案**：
1. 检查 Templater 插件是否已启用
2. 确认 Templater 的模板文件夹指向 `_templates/`
3. 重启 Obsidian

### Q2: 日期没有自动生成？

**原因**：Templater 的日期格式配置错误

**解决方案**：
1. 进入 Templater 设置
2. 确保 Date format 为 `YYYY-MM-DD`
3. 确保 Time format 为 `HH:mm:ss`

### Q3: Dataview 查询不显示数据？

**原因**：Dataview 插件未启用或查询语法错误

**解决方案**：
1. 确保 Dataview 插件已启用
2. 检查 Dataview 设置中是否启用了 JavaScript queries
3. 等待 Dataview 索引完成（首次使用可能需要几分钟）

### Q4: Tasks 任务不显示？

**原因**：Tasks 插件未启用或任务格式错误

**解决方案**：
1. 确保 Tasks 插件已启用
2. 确认任务格式正确：`- [ ] 任务描述 📅 日期 🏷️ #tag`
3. 检查 Tasks 插件的全局过滤设置

### Q5: 模板中的 {{title}} 没有替换？

**原因**：{{title}} 是占位符，需要手动替换

**解决方案**：
- 应用模板后，手动将 `{{title}}` 替换为实际的标题
- 或者使用 Obsidian 的标题设置（Settings → File & Links → Default location for new attachments）

### Q6: 如何快速切换模板？

**解决方案**：
1. 为常用模板设置快捷键（Settings → Hotkeys）
2. 或者使用命令面板（`Ctrl/Cmd + P`）快速搜索
3. 或者将常用模板添加到侧边栏

---

## 最佳实践

### 1. 模板选择策略

```
遇到问题？
├─ 是 → 使用问题卡 (general/问题卡.md)
│
└─ 否
   有明确目标和截止日期？
   ├─ 是 → 使用 _template-project
   │
   └─ 否
      需要构建知识网络？
      ├─ 是 → 使用 _template-zettel
      │
      └─ 否
         是持续的责任？
         ├─ 是 → 使用 _template-area
         │
         └─ 否 → 使用 _template-resource
```

### 2. 文件组织建议

**Projects** - 项目文件应放在 `1 Projects/` 下
```
1 Projects/
├── 01-Work/
│   └── 养生馆项目规划.md
├── 02-Learning/
│   └── 学习项目管理.md
└── 03-Personal/
    └── 个人健康计划.md
```

**Areas** - 领域文件应放在 `2 Areas/` 下
```
2 Areas/
├── 健康管理.md
├── 财务管理.md
└── 职业发展.md
```

**Resources** - 资源文件应放在 `3 Resources/` 下
```
3 Resources/
├── 技术文档/
├── 学习笔记/
└── 参考资料/
```

**Archives** - 归档文件应放在 `4 Archives/` 下
```
4 Archives/
├── 2026/
└── 按年份归档/
```

### 3. 任务管理最佳实践

- ✅ 使用 Tasks 插件管理所有项目任务
- ✅ 为任务设置合理的截止日期和优先级
- ✅ 定期回顾和更新任务状态
- ✅ 使用标签分类任务类型

### 4. Zettelkasten 使用建议

- ✅ 保持卡片短小精悍，每张卡片一个思想
- ✅ 及时建立卡片之间的链接
- ✅ 定期回顾和整理卡片
- ✅ 使用唯一 ID 便于引用
- ✅ 将永久笔记融入 PARA 系统

### 5. 定期回顾周期

- **Projects** - 每周回顾
- **Areas** - 每月回顾
- **Resources** - 按需回顾
- **Archives** - 每季度清理
- **Zettels** - 按需整理和链接

### 6. 标签使用建议

**项目标签**：
- `#project` - 项目相关
- `#active` / `#on-hold` / `#completed` - 项目状态
- `#high` / `#medium` / `#low` - 优先级

**资源标签**：
- `#resource` - 资源相关
- `#article` / `#book` / `#video` - 资源类型
- `#to-read` / `#reading` / `#done` - 阅读状态

**领域标签**：
- `#area` - 领域相关
- `#health` / `#finance` / `#career` - 领域分类

**Zettel 标签**：
- `#zettel` - 卡片相关
- `#fleeting` / `#literature` / `#permanent` / `#structure` - 卡片类型
- `#draft` / `#refined` / `#verified` - 卡片状态

---

## 🔗 相关资源

### 模板文件

- [[_templates/_templates.md]] - 模板系统总索引
- [[_templates/para/📁 full/_template-project]] - 项目模板
- [[_templates/para/📁 full/_template-area]] - 领域模板
- [[_templates/para/📁 full/_template-resource]] - 资源模板
- [[_templates/para/📁 full/_template-archive]] - 归档模板
- [[_templates/para/📁 full/_template-zettel]] - Zettelkasten 模板

### 使用指南

- [[0 Inbox]] - Inbox 使用指南
- [[PARA工作流 1]] - PARA 系统完整指南
- [[Inbox 工作流]] - Inbox 详细工作流
- [[问题卡指南]] - 问题卡使用指南

### 外部参考

- [The PARA Method](https://fortelabs.com/blog/para/) - PARA 方法论官方介绍
- [Building a Second Brain](https://www.buildingasecondbrain.com/) - 第二大脑
- [Templater Documentation](https://silentvoid13.github.io/Templater/) - Templater 插件文档
- [Obsidian Tasks](https://github.com/obsidian-tasks-group/obsidian-tasks) - Tasks 插件文档
- [Dataview Plugin](https://blacksmithgu.github.io/obsidian-dataview/) - Dataview 插件文档

---

## 📝 更新日志

| 日期 | 版本 | 更新内容 |
|------|------|----------|
| 2026-01-28 | 1.0 | 初始版本 - 完整的 Templater PARA 模板系统 |

---

**创建时间**：2026-01-28
**最后更新**：2026-01-28
**状态**：[x] 完成
