---
title: Inbox 使用指南
aliases:
  - 收件箱
  - 0 Inbox
tags:
  - inbox
  - para
  - workflow
created: 2026-01-27
---

> [!info] Inbox 是什么？
> Inbox 是 PARA 系统的第一站，用于快速捕获想法、收集未整理的信息、临时存放待处理项目，避免思维中断。

---

## 📋 Inbox 结构

```
0 Inbox/
├── 0 Inbox.md              # 本文件 - Inbox 使用指南
├── Journal/                # 日记文件夹（按日期组织）
│   ├── 2026/
│   │   └── 01-January/
│   │       └── 2026-01-26.md
│       └── 2026-01-27.md
└── [待处理笔记]            # 待分类和整理的临时笔记
```

---

## 🚀 Inbox 工作流

### 三步法核心流程

```
1️⃣ 捕获 → 随时记录
2️⃣ 处理 → 定期整理（建议每日/每周）
3️⃣ 归位 → 放入 PARA 对应位置
```

---

## 📝 第一步：捕获

### 捕获原则

**原则 1：立即记录**
- 想法出现时立即记下
- 不要依赖记忆力
- 先记录后处理

**原则 2：保持简单**
- 不要追求完美
- 用最简单的方式记录
- 重点不在格式，在于不遗忘

**原则 3：快速分类**
- 添加简单标签或分类
- 便于后续整理
- 预估处理时间

### 快速捕获模板

#### 想法捕获模板

```markdown
---
type: idea
created: 2026-01-27
tags: [inbox]
---

# 想法标题

## 核心想法
快速描述这个想法...

## 可行动
- [ ] 这个想法需要后续处理
- [ ] 相关联的主题或项目

## 相关
- [[]]
```

#### 资源收集模板

```markdown
---
type: resource
created: 2026-01-27
tags: [inbox, resource]
url:
---

# 资源标题

## 摘要
资源的主要内容...

## 分类
- [ ] Tech
- [ ] Learning
- [ ] Productivity
- [ ] Interests

## 行动项
- [ ] 需要进一步研究
- [ ] 可以立即使用
```

#### 问题卡模板

```markdown
---
type: problem
created: 2026-01-27
tags: [inbox, problem]
---

# 问题标题

## 问题描述
<!-- 详细描述问题的症状和现象 -->

## 初步分析
<!-- 初步判断问题可能的原因 -->

## 相关链接
- [[相关问题]]
- [[相关笔记]]
```

---

## 🔄 第二步：处理

### 处理频率

| 类型 | 推荐频率 | 说明 |
|------|----------|------|
| 每日 | 每天 | 处理当日的新笔记 |
| 每周 | 每周日 | 深度整理和分类 |
| 每月 | 每月底 | 回顾和优化流程 |

### 处理三问

对每个 Inbox 项目，依次回答：

```
❓ 是否需要行动？
├─ 是 → 创建 Project（有目标和截止日期）
└─ 否 → 继续

❓ 是否是持续责任？
├─ 是 → 创建 Area（没有完成状态）
└─ 否 → 继续

❓ 是否是有价值的参考资料？
├─ 是 → 移入 Resources（根据主题分类）
└─ 否 → 继续

❓ 是否需要保留但不常用？
├─ 是 → 移入 Archives
└─ 否 → 删除或合并
```

### 分类决策树

```
有明确目标和截止日期？
├─ 是 → 1 Projects
│   └─ 选择子类别：
│       ├─ 01-Learning
│       ├─ 02-Work
│       ├─ 03-Personal
│       └─ 04-Creative
└─ 否
   是持续的责任？
   ├─ 是 → 2 Areas
   │   └─ 选择子类别：
   │       ├─ 01-Health
   │       ├─ 02-Career
   │       ├─ 03-Finance
   │       ├─ 04-Relationships
   │       ├─ 05-Learning
   │       └─ 06-Lifestyle
   └─ 否
      是有价值的资料？
      ├─ 是 → 3 Resources
      │   └─ 选择子类别：
      │       ├─ 01-Tech
      │       ├─ 02-Learning
      │       ├─ 03-Productivity
      │       ├─ 04-Interests
      │       └─ 05-Reference
      └─ 否
         需要保留但已过时？
         ├─ 是 → 4 Archives
         └─ 否 → 删除
```

---

## 📂 第三步：归位

### 移动笔记的方法

#### 方法 1：手动移动
1. 在 Obsidian 中打开笔记
2. 点击文件名 → "移动文件"
3. 选择目标位置
4. 更新内部链接（Obsidian 自动处理）

#### 方法 2：使用插件
**Templater 脚本移动**：
```javascript
<%*
let targetFolder = "";
if (tp.file.tags.includes("#project")) {
  targetFolder = "1 Projects";
} else if (tp.file.tags.includes("#area")) {
  targetFolder = "2 Areas";
} else if (tp.file.tags.includes("#resource")) {
  targetFolder = "3 Resources";
} else if (tp.file.tags.includes("#archive")) {
  targetFolder = "4 Archives";
}
await tp.file.move(tp.file.path.replace("0 Inbox", targetFolder));
%>
```

### 更新属性

移动后更新 frontmatter：

```yaml
---
# 移动前（Inbox）
tags: [inbox, 待整理]

# 移动后（Projects）
tags: [project/learning]
status: active
due: 2026-02-01
priority: 3
---
```

---

## 🎯 最佳实践

### 每日例行

```
早晨（5 分钟）:
☐ 查看昨天的 Inbox 笔记
☐ 处理 3-5 个最紧急的项目

晚上（10 分钟）:
☐ 回顾今天的 Inbox 捕获
☐ 移动已完成的项目
☐ 添加明天的待办事项
```

### 每周例行

```
周末（30-60 分钟）:
☐ 清空整个 Inbox
☐ 评估每个项目的价值
☐ 移动到 PARA 对应位置
☐ 删除不再需要的笔记
☐ 回顾工作流效率
```

### 每月例行

```
月底（60-90 分钟）:
☐ 分析 Inbox 的笔记类型
☐ 优化捕获和处理流程
☐ 更新模板和分类规则
☐ 评估 PARA 系统整体健康度
```

---

## 📊 监控指标

### 跟踪这些指标

| 指标 | 目标 | 说明 |
|------|------|------|
| Inbox 清空频率 | 每周 | 保持 Inbox 精简 |
| 平均处理时间 | <2 天 | 快速响应想法 |
| 笔记利用率 | >80% | 大部分笔记有价值 |
| 删除率 | <20% | 减少无用捕获 |

### Dataview 监控查询

```dataview
TABLE without ID
  file.link AS "笔记",
  dateformat(file.ctime, "MM-dd") AS "创建日期",
  (date(today) - file.ctime).days AS "天数"
FROM "0 Inbox"
SORT file.ctime DESC
```

```dataview
TABLE without ID
  (length(filter(rows, (r) => (date(today) - r.file.ctime).days <= 7))) AS "本周新增",
  (length(filter(rows, (r) => (date(today) - r.file.ctime).days <= 30))) AS "本月新增",
  length(rows) AS "总数"
FROM "0 Inbox"
```

---

## 📚 模板资源

### 可用模板

在 `_templates/PARA/` 中有以下模板：

1. **问题卡** `[[_templates/PARA/问题卡.md]]` - 通用问题追踪模板
2. **Project** `[[_templates/PARA/Project.md]]` - 项目管理模板
3. **Area** `[[_templates/PARA/Area.md]]` - 领域管理模板
4. **Resource** `[[_templates/PARA/Resource.md]]` - 资源管理模板
5. **Archive** `[[_templates/PARA/Archive.md]]` - 归档模板

### 使用方法

1. 在 Obsidian 中安装 Templates 插件
2. 设置模板文件夹为 `_templates/PARA/`
3. 使用快捷键或命令插入模板
4. 填写内容后保存到 Inbox

---

## 🔗 相关资源

### PARA 系统
- [[PARA工作流]] - 完整 PARA 说明
- [[3 Resources/03-Productivity/Methods/Getting Things Done]] - GTD 方法论
- [[Inbox 工作流]] - 详细的 Inbox 工作流指南

### 模板
- [[问题卡指南]] - 问题卡使用指南
- [[问题卡]] - 问题卡模板
- [[问题卡_20260127]] - 问题卡示例

### 外部参考
- [The PARA Method](https://fortelabs.com/blog/para/)
- [Building a Second Brain](https://www.buildingasecondbrain.com/)

---

## ✅ 快速参考卡

### 捕获原则
- 立即记录
- 保持简单
- 快速分类

### 处理三问
1. 是否需要行动？→ Projects
2. 是否是持续责任？→ Areas
3. 是否有价值？→ Resources
4. 都不是？→ 删除或归档

### 频率建议
- 每日：处理当日新增
- 每周：清空 Inbox
- 每月：优化流程

---

> [!tip] 核心目标
> Inbox 的核心目标是「快速捕获，定期处理」，不要让它成为垃圾场。

---

**创建时间**：2026-01-27
**最后更新**：2026-01-27
**状态**：[ ] 草稿 [ ] 完成 [ ] 需要更新
