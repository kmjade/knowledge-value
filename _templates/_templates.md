---
title: 模板系统索引
created: 2026-01-28
---

> [!info] 模板系统总览
> PARA 系统的多语言模板索引

---

## 📂 模板文件夹结构

```
_templates/
├── _templates.md                    # 本文件 - 模板索引
├── general/                          # 通用模板文件夹
│   ├── 问题卡.md                   # 简体中文
│   ├── 問題卡_繁體.md             # 繁体中文
│   ├── Problem Card.md              # English
│   ├── 想法捕获.md                   # 简体中文
│   ├── 想法捕獲_繁體.md             # 繁体中文
│   ├── Idea Capture.md             # English
│   ├── 资源收集.md                   # 简体中文
│   ├── 資源收集_繁體.md             # 繁体中文
│   ├── Resource Collection.md       # English
│   └── Tool Evaluation.md         # 工具评估模板
│
└── para/                             # PARA 专用模板文件夹 (三模板模式)
    ├── 📁 quick/                    # 快速模板 (纯 Markdown + 占位符)
    │   ├── Project.md               # 项目模板
    │   ├── Area.md                 # 领域模板
    │   ├── Resource.md              # 资源模板
    │   └── Archive.md              # 归档模板
    │
    ├── 📁 full/                     # 完整模板 (Templater + Dataview + Tasks)
    │   ├── _template-project.md      # 项目模板 (Templater)
    │   ├── _template-area.md        # 领域模板 (Templater)
    │   ├── _template-resource.md     # 资源模板 (Templater)
    │   ├── _template-archive.md     # 归档模板 (Templater)
    │   └── _template-zettel.md     # Zettelkasten 模板 (Templater)
    │
    ├── 📁 advanced/                 # 高级模板 (预留)
    │   └── (预留位置)
    │
    ├── para.md                       # PARA 选择指南
    ├── README.md                     # PARA 模板详细索引
    └── TEMPLATER_GUIDE.md         # Templater 使用指南
```

---

## 📋 模板分类

### 核心模板 (Core Templates - 10 个)

#### 1. 问题卡 (Problem Card)
| 语言 | 文件路径 | 用途 |
|------|----------|------|
| 简体中文 | [[_templates/general/问题卡]] | 系统化追踪和解决问题 |
| 繁体中文 | [[_templates/general/問題卡_繁體]] | 系統化追蹤和解決問題 |
| English | [[_templates/general/Problem Card]] | Systematically track and solve problems |

**使用场景**：技术故障、流程问题、业务问题、学习问题

---

#### 2. 想法捕获 (Idea Capture)
| 语言 | 文件路径 | 用途 |
|------|----------|------|
| 简体中文 | [[_templates/general/想法捕获]] | 快速捕获突发想法和灵感 |
| 繁体中文 | [[_templates/general/想法捕獲_繁體]] | 快速捕獲突發想法和靈感 |
| English | [[_templates/general/Idea Capture]] | Quickly capture sudden ideas and inspirations |

**使用场景**：突发灵感、创意想法、概念探索、问题解决方案、学习心得

---

#### 3. 资源收集 (Resource Collection)
| 语言 | 文件路径 | 用途 |
|------|----------|------|
| 简体中文 | [[_templates/general/资源收集]] | 收集有价值的资源和参考资料 |
| 繁体中文 | [[_templates/general/資源收集_繁體]] | 收集有價值的資源和參考資料 |
| English | [[_templates/general/Resource Collection]] | Collect valuable resources and reference materials |

**使用场景**：文章收藏、书籍记录、视频保存、工具收集、课程资源、研究资料

---

#### 3. 资源收集 (Resource Collection)
| 语言 | 文件路径 | 用途 |
|------|----------|------|
| 简体中文 | [[_templates/general/资源收集]] | 收集有价值的资源和参考资料 |
| 繁体中文 | [[_templates/general/資源收集_繁體]] | 收集有價值的資源和參考資料 |
| English | [[_templates/general/Resource Collection]] | Collect valuable resources and reference materials |

**使用场景**：文章收藏、书籍记录、视频保存、工具收集、课程资源、研究资料

---

#### 4. 工具评估 (Tool Evaluation)
| 语言 | 文件路径 | 用途 |
|------|----------|------|
| 简体中文 | [[_templates/general/Tool Evaluation]] | 系统化评估和记录各类工具 |

**使用场景**：软件评估、插件选择、服务对比、框架选型、工具采购决策

**功能特点**：
- ✅ 综合评分系统（6 个维度加权评分）
- ✅ 成本分析和 ROI 评估
- ✅ 替代方案对比表
- ✅ 使用统计和效果评估
- ✅ 完整的学习资源和配置指南
- ✅ 问题记录和解决方案

---

#### 5. 工作流模板 (Workflow Template)
| 语言 | 文件路径 | 用途 |
|------|----------|------|
| 简体中文 | [[_templates/general/Workflow Template]] | 记录、分析和优化各类工作流程 |

**使用场景**：日常工作流程、项目管理流程、学习流程、创作流程、管理流程

**功能特点**：
- ✅ 流程图和步骤详细说明
- ✅ 效率分析和痛点识别
- ✅ 优化方案和实施计划
- ✅ KPI 监控和绩效追踪
- ✅ 风险管理和应急方案
- ✅ 版本历史和反馈记录

---

### PARA 模板 (PARA Templates - 三模板模式)

#### 三模板系统说明

**三模板模式** - 提供 3 套 PARA 模板，满足不同使用需求和技能水平：

| 模板类型 | 文件夹 | 技术栈 | 适用场景 |
|----------|---------|--------|----------|
| **快速模板** (`quick/`) | 📁 quick/ | 纯 Markdown + 占位符 | 快速开始，无插件依赖，新手友好 |
| **完整模板** (`full/`) | 📁 full/ | Templater + Dataview + Tasks | 功能完善，自动化程度高，适合深度使用 |
| **高级模板** (`advanced/`) | 📁 advanced/ | (预留) | 未来扩展，高级功能 |

**选择建议**：
- ⚡ **快速开始，不需要插件** → 使用 `quick/` 文件夹中的模板
- 🚀 **追求自动化和强大功能** → 使用 `full/` 文件夹中的模板
- 🔮 **未来高级功能** → 使用 `advanced/` 文件夹（预留）

---

#### 4. 项目模板 (Project)

**完整模板**（full/ - 推荐）：
| 文件路径 | 使用技术 | 用途 |
|----------|----------|------|
| [[_templates/para/📁 full/_template-project]] | Templater + Tasks + Dataview | 管理有明确目标和截止日期的项目（自动日期、任务管理） |

**快速模板**（quick/）：
| 文件路径 | 使用技术 | 用途 |
|----------|----------|------|
| [[_templates/para/📁 quick/Project]] | 纯 Markdown + 占位符 | 快速创建项目（手动填写） |

**使用场景**：新产品开发、课程学习、活动组织、写作项目

**功能特点（完整模板）**：
- ✅ 自动生成创建日期和截止日期
- ✅ 集成 Tasks 插件支持
- ✅ 内置任务查询和里程碑管理
- ✅ SMART 原则指导

---

#### 5. 领域模板 (Area)

**完整模板**（full/ - 推荐）：
| 文件路径 | 使用技术 | 用途 |
|----------|----------|------|
| [[_templates/para/📁 full/_template-area]] | Templater + Dataview | 管理持续的责任和职责（自动日期、动态查询） |

**快速模板**（quick/）：
| 文件路径 | 使用技术 | 用途 |
|----------|----------|------|
| [[_templates/para/📁 quick/Area]] | 纯 Markdown + 占位符 | 快速创建领域（手动填写） |

**使用场景**：健康管理、财务管理、职业发展、家庭关系

**功能特点（完整模板）**：
- ✅ 自动生成创建和更新日期
- ✅ 关联项目自动查询（Dataview）
- ✅ 维护目标追踪
- ✅ 定期回顾结构（月度/季度/年度）

---

#### 6. 资源模板 (Resource)

**完整模板**（full/ - 推荐）：
| 文件路径 | 使用技术 | 用途 |
|----------|----------|------|
| [[_templates/para/📁 full/_template-resource]] | Templater | 收集和整理有价值的参考资料（自动日期、多类型支持） |

**快速模板**（quick/）：
| 文件路径 | 使用技术 | 用途 |
|----------|----------|------|
| [[_templates/para/📁 quick/Resource]] | 纯 Markdown + 占位符 | 快速创建资源（手动填写） |

**使用场景**：技术文档、学习笔记、参考资料、最佳实践

**功能特点（完整模板）**：
- ✅ 自动生成创建和访问日期
- ✅ 支持多种资源类型（文章/书籍/视频/播客等）
- ✅ 完整的笔记和摘录结构
- ✅ 标签分类系统

---

#### 7. 归档模板 (Archive)

**完整模板**（full/ - 推荐）：
| 文件路径 | 使用技术 | 用途 |
|----------|----------|------|
| [[_templates/para/📁 full/_template-archive]] | Templater | 归档已完成或不再活跃的项目（自动日期、归档原因分类） |

**快速模板**（quick/）：
| 文件路径 | 使用技术 | 用途 |
|----------|----------|------|
| [[_templates/para/📁 quick/Archive]] | 纯 Markdown + 占位符 | 快速创建归档（手动填写） |

**使用场景**：已完成的项目、暂停的项目、取消的项目、历史资料

**功能特点（完整模板）**：
- ✅ 自动生成归档日期
- ✅ 归档原因分类系统
- ✅ 归档后行动计划
- ✅ 定期审查机制

---

#### 8. Zettelkasten 模板 (Zettel)

| 文件路径 | 使用技术 | 用途 |
|----------|----------|------|
| [[_templates/para/📁 full/_template-zettel]] | Templater + Dataview | 创建原子化笔记（唯一ID、自动日期、知识网络） |

**使用场景**：构建知识网络、核心概念、思想演变追踪

**功能特点**：
- ✅ 自动生成唯一 Zettel ID（时间戳）
- ✅ 支持 4 种卡片类型（临时/文献/永久/结构）
- ✅ 反向链接自动查询（Dataview）
- ✅ 完整的关联和反思机制

---

## 📊 模板统计

### 按模板统计

| 模板类型 | 技术栈 | 小计 |
|---------|--------|------|
| 通用模板 | ✅ 纯 Markdown | 5 (问题卡、想法捕获、资源收集、工具评估、工作流) × 3 语言 = 15 |
| PARA 快速模板 (quick/) | ✅ 纯 Markdown + 占位符 | 4 |
| PARA 完整模板 (full/) | ✅ Templater + Dataview + Tasks | 5 |
| PARA 高级模板 (advanced/) | 🚧 预留 | 0 |
| PARA 文档 | ✅ | 3 (para.md, README.md, TEMPLATER_GUIDE.md) |
| **总计** | | **27** |

### 按复杂度分类

| 复杂度 | 模板 | 说明 |
|--------|------|------|
| ⭐ | quick/ (Project, Area, Resource, Archive) | 简单占位符模板（无插件依赖）|
| ⭐⭐ | full/_template-archive | 基础归档模板（Templater）|
| ⭐⭐⭐ | full/_template-zettel | Zettelkasten 原子笔记（Templater + Dataview）|
| ⭐⭐⭐⭐ | full/_template-resource | 资源管理模板（Templater + 多类型支持）|
| ⭐⭐⭐⭐⭐ | full/_template-area | 领域管理模板（Templater + Dataview + 动态查询）|
| ⭐⭐⭐⭐⭐⭐ | full/_template-project | 项目管理模板（Templater + Tasks + Dataview + 里程碑）|

---

## 🎯 使用指南

### 选择合适的模板

```
遇到问题？
├─ 是 → 使用问题卡
│   简体：general/问题卡.md
│   繁体：general/問題卡_繁體.md
│   English：general/Problem Card.md
│
└─ 否
   需要构建知识网络？
   ├─ 是 → 使用 Zettel 模板
   │   para/📁 full/_template-zettel.md (Templater + Dataview)
   │
   └─ 否
      有明确目标和截止日期？
      ├─ 是 → 使用项目模板
      │   需要自动化和强大功能？
      │   ├─ 是 → para/📁 full/_template-project.md (Templater + Tasks + Dataview)
      │   └─ 否 → para/📁 quick/Project.md (快速模板)
      │
      └─ 否
         是持续的责任？
         ├─ 是 → 使用领域模板
         │   需要自动化和动态查询？
         │   ├─ 是 → para/📁 full/_template-area.md (Templater + Dataview)
         │   └─ 否 → para/📁 quick/Area.md (快速模板)
         │
         └─ 否
            收集资源和信息？
            ├─ 是 → 使用资源模板
            │   需要自动化和多类型支持？
            │   ├─ 是 → para/📁 full/_template-resource.md (Templater)
            │   └─ 否 → para/📁 quick/Resource.md (快速模板)
            │
            └─ 否 → 使用 Resource Collection
               简体：general/资源收集.md
               繁体：general/資源收集_繁體.md
               English：general/Resource Collection.md
      └─ 否
         需要评估工具？
         ├─ 是 → 使用工具评估模板
         │   简体：general/Tool Evaluation.md
         └─ 否 → 手动创建或使用其他模板
```

### 模板使用流程

1. **选择模板版本** - 根据需求选择 quick/ 或 full/ 模板
   - ⚡ **快速开始** → 使用 `📁 quick/` 文件夹中的模板
   - 🚀 **功能强大** → 使用 `📁 full/` 文件夹中的模板（需安装插件）
2. **安装插件（如使用 full/ 模板）** - 确保已安装 Templater、Tasks 和 Dataview 插件
3. **选择模板** - 根据需求选择合适的模板
4. **应用模板** - 使用 Templater 插件应用模板（按 `Ctrl/Cmd + E` 或配置的快捷键）
5. **填写内容** - 根据模板结构填写信息
6. **保存到 Inbox** - 先保存到 `0 Inbox/`
7. **定期整理** - 按照工作流处理和分类

### Templater 配置要求

**必需插件**：
- ✅ [Templater](https://github.com/SilentVoid13/Templater) - 模板引擎
- ✅ [Obsidian Tasks](https://github.com/obsidian-tasks-group/obsidian-tasks) - 任务管理
- ✅ [Dataview](https://github.com/blacksmithgu/obsidian-dataview) - 数据查询

**Templater 设置**：
```yaml
Template folder location: _templates/
Trigger Templater on new file creation: ✅ (可选)
Date format: YYYY-MM-DD
Time format: HH:mm:ss
```

---

## 🔗 相关资源

### 详细索引

- [[_templates/para/README]] - PARA 模板详细索引
- [[para/TEMPLATER_GUIDE.md]] - PARA 模板使用指南（Templater 版本）

### 使用指南

- [[0 Inbox]] - Inbox 使用指南
- [[3 Resources/05-Reference/Methods/PARA 自动化工作流]] - PARA 系统完整指南
- [[Inbox 工作流]] - Inbox 详细工作流
- [[问题卡指南]] - 问题卡使用指南

### 外部参考

- [The PARA Method](https://fortelabs.com/blog/para/)
- [Building a Second Brain](https://www.buildingasecondbrain.com/)

---

## 💡 最佳实践

### 模板使用技巧

1. **快速开始** - 不要追求完美，先创建再完善
2. **保持一致** - 使用统一的模板保持格式一致
3. **定期更新** - 根据使用情况优化模板
4. **多语言支持** - 根据需要选择合适的语言版本

### 模板维护建议

- **定期回顾** - 每月回顾模板使用情况
- **收集反馈** - 记录使用中的问题和建议
- **持续改进** - 根据反馈优化模板结构
- **版本控制** - 使用 Git 追踪模板变化

---

## 🎉 总结

现在你拥有一个**完整的多语言三模板 PARA 系统**，包含：

✅ **27 个模板文件**（15 个通用模板 + 9 个 PARA 模板 + 3 个 PARA 文档）
✅ **三模板模式** - quick/（快速）、full/（完整）、advanced/（预留）
✅ **3 种语言支持**（简体中文、繁体中文、English）- 通用模板
✅ **Templater 插件集成** - full/ 模板使用 Templater + Dataview + Tasks
✅ **清晰的文件夹结构**（general/、fleeting/ 和 para/quick/full/advanced/）
✅ **统一的模板索引**（_templates.md）
✅ **自动化功能** - 自动日期生成、任务管理、动态查询
✅ **完整的 PARA 方法论支持** - Project、Area、Resource、Archive、Zettel
✅ **新增工具评估模板** - 系统化评估和对比各类工具
✅ **新增工作流模板** - 记录、分析和优化各类工作流程

### 技术栈说明

**通用模板**（general/）：
- 纯 Markdown 模板
- 无插件依赖
- 多语言支持（简体/繁体/英文）

**快速捕获模板**（fleeting/）：
- 轻量级快速记录模板
- 用于临时捕获和初步评估
- 包含工具快速捕获等专项模板

**PARA 模板** - 三模板模式：

1. **快速模板**（`quick/`）：
   - 纯 Markdown + 占位符
   - 无插件依赖
   - 手动填写内容
   - 快速简单，轻量级使用
   - 新手友好

2. **完整模板**（`full/`）：
   - 使用 **Templater** 插件
   - 集成 **Dataview** 用于动态查询
   - 集成 **Tasks** 用于任务管理
   - 自动生成日期、ID 和元数据
   - 功能强大，自动化程度高

3. **高级模板**（`advanced/`）：
   - 🚧 预留位置
   - 未来扩展高级功能

### 三模板模式优势

🎯 **灵活性** - 根据需求选择合适的模板版本（quick/full/advanced）
🚀 **功能强大** - full/ 模板提供完整的自动化和查询功能
⚡ **快速使用** - quick/ 模板无需插件，快速开始
🔮 **可扩展性** - advanced/ 文件夹预留未来高级功能
🔄 **平滑过渡** - 可以从 quick/ 升级到 full/，逐步使用高级功能
📚 **学习友好** - 新手可以从 quick/ 开始，逐步学习 full/ 的功能

---

**创建时间**：2026-01-28
**最后更新**：2026-01-28
**状态**：[x] 完成
