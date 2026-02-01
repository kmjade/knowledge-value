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
updated: 2026-01-28
---

> [!info] Inbox 是什么？
> Inbox 是 PARA 系统的第一站，用于快速捕获想法、收集未整理的信息、临时存放待处理项目，避免思维中断。

---

## 📊 快速概览

| 当前状态 | 目标 | 操作 |
|---------|------|------|
| 📋 待处理笔记数 | < 20 | [[Inbox Dashboard\|查看仪表盘]] |
| 🔄 本周转化率 | > 80% | `/para-整理收集` |
| ⏱️ 平均处理时间 | < 2 天 | 优化处理流程 |

> [!tip] 快速操作
> - 查看实时状态：[[Inbox Dashboard]]
> - 批量整理：执行 `/para-整理收集` 命令
> - 创建新笔记：使用下方快速模板

---

## 📋 Inbox 结构

```
0 Inbox/
├── 0 Inbox.md              # 本文件 - Inbox 使用指南
├── Inbox Dashboard.md      # 实时监控仪表盘
├── Journal/                # 日记文件夹（按日期组织）
│   └── 2026/
│       └── 01-January/
│           ├── 2026-01-26.md
│           └── 2026-01-27.md
└── [待处理笔记]            # 待分类和整理的临时笔记
```

---

## 🚀 Inbox 工作流

### 三步法核心流程

```
1️⃣ 捕获 → 随时记录（3分钟原则）
2️⃣ 处理 → 定期整理（每日10分钟 + 每周30分钟）
3️⃣ 归位 → 放入 PARA 对应位置（自动化辅助）
```

> [!important] 流程核心
> **快速捕获，定期处理，自动归位** - 让想法不被遗忘，但也不堆积

### 工作流循环图

```
┌─────────────────────────────────────────────────────────┐
│                    📥 Inbox 系统                        │
└─────────────────────────────────────────────────────────┘
                          ↓
    ┌─────────────────────────────────────────────┐
    │  1️⃣ 捕获阶段              │
    │  - 灵感/想法 → 想法模板                      │
    │  - 资源/链接 → 资源模板                      │
    │  - 问题/挑战 → 问题卡模板                    │
    │  - 快速笔记 → 快速记录模板                   │
    └─────────────────────────────────────────────┘
                          ↓
    ┌─────────────────────────────────────────────┐
    │  2️⃣ 处理阶段（每日/每周）                    │
    │  - 评估价值（三问法）                        │
    │  - 确定优先级（Eisenhower 矩阵）              │
    │  - 优化内容（标题/标签/链接）                  │
    │  - 决定去向（PARA 分类）                      │
    └─────────────────────────────────────────────┘
                          ↓
    ┌─────────────────────────────────────────────┐
    │  3️⃣ 归位阶段（自动化辅助）                    │
    │  - Projects: 有目标+截止日期                  │
    │  - Areas: 持续责任领域                        │
    │  - Resources: 参考资料                        │
    │  - Archives: 归档或删除                       │
    └─────────────────────────────────────────────┘
```

---

## 📝 第一步：捕获

### 捕获原则（3分钟原则）

**原则 1：立即记录**
- 想法出现时立即记下（< 3分钟）
- 不要依赖记忆力
- 先记录后处理

**原则 2：保持简单**
- 不要追求完美
- 用最简单的方式记录
- 重点不在格式，在于不遗忘

**原则 3：快速分类**
- 添加简单标签或分类
- 便于后续整理
- 预估处理时间（5min/30min/2h）

### 捕获方法对比

| 方法 | 适用场景 | 优势 | 工具 |
|------|---------|------|------|
| 快速笔记 | 突发想法 | 最快，无模板 | Ctrl+N |
| 想法模板 | 有价值的想法 | 结构化，易整理 | Template |
| 资源模板 | 收集资料 | 便于后续研究 | Template |
| 问题卡 | 解决问题 | 系统化追踪 | Template |

### 快速捕获模板

#### 🧠 想法捕获模板

> **适用场景**：突然的想法、灵感、创意

```markdown
---
type: idea
created: 2026-01-28
tags: [inbox, idea]
priority: 🔵 # 🔵低 🟡中 🔴高
estimated: 5min
---

# 想法标题

## 💡 核心想法
快速描述这个想法...

## 🎯 行动潜力
- [ ] 需要立即行动
- [ ] 需要进一步探索
- [ ] 暂时保存参考

## 🔗 相关
- [[]] 相关的项目/领域/资源
- [[]]
```

#### 📚 资源收集模板

> **适用场景**：文章、视频、书籍、工具推荐

```markdown
---
type: resource
created: 2026-01-28
tags: [inbox, resource]
url: https://example.com
category: #tech/learning/productivity
---

# 资源标题

## 📝 摘要
资源的主要内容...

## 🏷️ 分类预判
- [ ] Tech - 技术相关
- [ ] Learning - 学习资料
- [ ] Productivity - 效率提升
- [ ] Interests - 兴趣爱好

## ✅ 行动项
- [ ] 需要进一步研究
- [ ] 可以立即使用
- [ ] 分享给他人
```

#### ❓ 问题卡模板

> **适用场景**：遇到问题、需要解决的挑战

```markdown
---
type: problem
created: 2026-01-28
tags: [inbox, problem]
status: 🔴 # 🔴待解决 🟡处理中 🟢已解决
---

# 问题标题

## 📋 问题描述
<!-- 详细描述问题的症状和现象 -->
- 症状 1
- 症状 2

## 🔍 初步分析
<!-- 初步判断问题可能的原因 -->
- 原因 1
- 原因 2

## 💡 可能的解决方案
- [ ] 方案 1
- [ ] 方案 2

## 🔗 相关链接
- [[相关问题]]
- [[相关笔记]]
```

#### ⚡ 快速记录模板

> **适用场景**：会议记录、对话要点、临时笔记

```markdown
---
type: quicknote
created: 2026-01-28
tags: [inbox, quicknote]
---

# 标题

## 📌 要点
- 要点 1
- 要点 2
- 要点 3

## 📅 后续行动
- [ ] 行动 1
- [ ] 行动 2
```

---

## 🔄 第二步：处理

### 处理频率

| 类型 | 推荐频率 | 时长 | 说明 |
|------|----------|------|------|
| **每日微整理** | 每天早晚 | 5-10分钟 | 处理当日新增 |
| **每周大整理** | 每周日 | 30-60分钟 | 深度清空 Inbox |
| **每月优化** | 每月底 | 60-90分钟 | 回顾和优化流程 |

> [!warning] 处理红线
> - Inbox 笔记数 > 30 时触发警告
> - 逾期笔记（> 7天）必须优先处理
- 每周必须清空一次 Inbox

### 处理三问 + 优先级矩阵

#### 处理三问（PARA 决策）

对每个 Inbox 项目，依次回答：

```
❓ Q1: 是否需要下一步行动？
├─ 是 → 继续问 Q2
└─ 否 → 跳到 Q3

❓ Q2: 有明确的截止日期吗？
├─ 是 → 🎯 创建 Project
└─ 否 → 🎯 创建 Area（持续责任）

❓ Q3: 是否是有价值的参考资料？
├─ 是 → 📚 移入 Resources（按主题分类）
└─ 否 → 继续

❓ Q4: 是否需要保留但不常用？
├─ 是 → 📦 移入 Archives
└─ 否 → 🗑️ 删除或合并
```

#### Eisenhower 优先级矩阵

> 在处理时，使用这个矩阵确定处理优先级：

| | 紧急 | 不紧急 |
|---|---|---|
| **重要** | 🔴 **P1: 立即处理**<br>• 优先级：最高<br>• 动作：现在就做<br>• 示例：今日必须完成的任务 | 🟡 **P2: 计划安排**<br>• 优先级：高<br>• 动作：放入日程表<br>• 示例：重要但不紧急的项目 |
| **不重要** | 🔵 **P3: 委托处理**<br>• 优先级：中<br>• 动作：委派他人<br>• 示例：琐碎但紧急的事 | ⚪ **P4: 删除/归档**<br>• 优先级：低<br>• 动作：删除或归档<br>• 示例：无价值信息 |

> [!tip] 处理技巧
> 按 P1 → P2 → P3 → P4 的顺序处理，P4 可以批量删除或归档

### 分类决策树（详细版）

```
开始处理 Inbox 笔记
         ↓
┌─────────────────────────────┐
│ 有下一步行动吗？              │
└─────────────────────────────┘
   │ 是              │ 否
   ↓                 ↓
┌──────────────────┐  ┌─────────────────────────────┐
│ 有明确截止日期？  │  │ 是有价值的参考资料吗？        │
└──────────────────┘  └─────────────────────────────┘
  │ 是      │ 否       │ 是              │ 否
  ↓         ↓          ↓                 ↓
🎯 Projects  🎯 Areas  📚 Resources    ┌──────────────────┐
  ├─ 01-Learning  ├─ 01-Health    ├─ 01-Tech       │ 需要保留吗？    │
  ├─ 02-Work     ├─ 02-Career    ├─ 02-Learning  └──────────────────┘
  ├─ 03-Personal ├─ 03-Finance   ├─ 03-Productivity │ 是    │ 否
  └─ 04-Creative └─ 04-Relationships├─ 04-Interests   ↓      ↓
                  ├─ 05-Learning  └─ 05-Reference  📦 Archives 🗑️ 删除
                  └─ 06-Lifestyle
```

### 处理检查清单

对每个笔记处理前，快速检查：

```markdown
## 📋 处理检查清单

### 基础信息
- [ ] 标题清晰明确
- [ ] 有简短摘要（2-3句话）
- [ ] 创建日期正确

### 分类决策
- [ ] 已回答处理三问
- [ ] 已确定 PARA 分类
- [ ] 已设置优先级（🔴P1/🟡P2/🔵P3/⚪P4）

### 内容优化
- [ ] 添加相关标签
- [ ] 关联相关笔记（至少1个）
- [ ] 去除重复或无用内容
- [ ] 预估处理时间

### 行动项
- [ ] 提取可行动任务（如果有）
- [ ] 设置截止日期（如果是 Project）
- [ ] 关联到现有项目/领域
```

---

## 📂 第三步：归位

### 移动笔记的方法

#### 方法 1：手动移动（适用于单个笔记）

1. 在 Obsidian 中打开笔记
2. 点击文件名 → "移动文件"（或拖拽）
3. 选择目标位置（PARA 对应文件夹）
4. 更新 frontmatter（见下方）
5. Obsidian 会自动更新内部链接

#### 方法 2：使用快速命令（推荐）

**安装 Templater 插件后，创建以下命令**：

```javascript
<%*
// PARA 快速移动脚本
const targetFolders = {
  '#project': '1 Projects',
  '#area': '2 Areas',
  '#resource': '3 Resources',
  '#archive': '4 Archives'
};

let targetFolder = null;
let tags = tp.file.tags;

// 检查标签确定目标
for (let tag of tags) {
  if (targetFolders[tag]) {
    targetFolder = targetFolders[tag];
    break;
  }
}

if (!targetFolder) {
  // 如果没有明确标签，让用户选择
  const choices = ['Projects', 'Areas', 'Resources', 'Archives'];
  const choice = await tp.system.suggester(choices, choices);
  if (choice) {
    targetFolder = {
      'Projects': '1 Projects',
      'Areas': '2 Areas',
      'Resources': '3 Resources',
      'Archives': '4 Archives'
    }[choice];
  }
}

if (targetFolder) {
  const newPath = tp.file.path.replace(/^0 Inbox\//, targetFolder + '/');
  await tp.file.move(newPath);
  tR += `✅ 已移动到 ${targetFolder}`;
} else {
  tR += '❌ 未选择目标文件夹';
}
%>
```

**使用方法**：
1. 在笔记中添加相应标签（如 `#project`）
2. 运行脚本或设置快捷键
3. 自动移动到对应位置

#### 方法 3：批量整理（使用 `/para-整理收集` 命令）

这个命令会自动分析 Inbox 内容，智能建议分类，支持批量操作。

### 更新属性（移动后必做）

移动后，必须更新 frontmatter 以匹配目标分类：

#### 移动到 Projects
```yaml
---
# 移动前（Inbox）
tags: [inbox, 待整理]

# 移动后（Projects）
tags: [project/learning]  # 更新为项目标签
status: active            # 添加状态
due: 2026-02-01          # 添加截止日期
priority: 3              # 添加优先级（1-5）
created: 2026-01-28      # 保留创建日期
updated: 2026-01-28      # 添加更新日期
---
```

#### 移动到 Areas
```yaml
---
# 移动后（Areas）
tags: [area/health]      # 更新为领域标签
status: active           # Areas 持续活跃
review_frequency: weekly # 设置回顾频率
last_review: 2026-01-28
next_review: 2026-02-04
created: 2026-01-28
---
```

#### 移动到 Resources
```yaml
---
# 移动后（Resources）
tags: [resource/tech]    # 更新为资源标签
interest-level: ⭐⭐⭐⭐  # 添加兴趣级别
last-reviewed: 2026-01-28
created: 2026-01-28
url: https://...         # 如果是链接，保留 URL
---
```

#### 移动到 Archives
```yaml
---
# 移动后（Archives）
tags: [archived]
archived_date: 2026-01-28
archived_reason: "已完成/过时"
created: 2026-01-28
---
```

### 自动化归位设置

#### Obsidian 设置

1. **设置默认附件位置**：
   - 设置 → 文件与链接 → 默认附件位置 → 指定文件夹 → `0 Inbox`

2. **设置新笔记位置**：
   - 设置 → 文件与链接 → 新笔记的存放位置 → 指定文件夹 → `0 Inbox`

3. **设置快捷键**：
   - 设置 → 快捷键 → 创建新笔记 → `Ctrl+N`（指向 0 Inbox）

#### 自动归档规则（可选）

使用 Obsidian 插件 **Auto Note Mover** 设置自动规则：

```javascript
// 自动归档超过 30 天的 Inbox 笔记到 Archives
const daysThreshold = 30;
const targetFolder = '4 Archives';
```

---

## 🎯 最佳实践

### 📅 每日例行（15分钟）

#### 早晨例程（5分钟）- 启动仪式
```
☐ 打开 [[Inbox Dashboard]] 查看状态
☐ 处理昨日新增的 P1（紧急重要）项目
☐ 快速浏览其他项目，标记优先级
☐ 选择 1-2 个今日要完成的行动
```

#### 晚间例程（10分钟）- 收尾仪式
```
☐ 查看今日新增的 Inbox 笔记
☐ 快速分类到 PARA（< 3分钟的项目）
☐ 标记未处理项目的优先级
☐ 记录今日完成情况
☐ 预览明天的重点任务
```

> [!tip] 每日检查清单
> - Inbox 笔记数 < 20 ✅
> - 今日新增已分类 ✅
> - 无 P1 逾期项目 ✅

### 📅 每周例行（30-60分钟）- 深度整理

#### 周日回顾（建议固定时间）

```
📊 状态检查（5分钟）
☐ 查看 [[Inbox Dashboard]] 统计
☐ 检查 PARA 转化率（目标 > 80%）
☐ 识别积压项目（> 7天）

🔄 清空 Inbox（20-40分钟）
☐ 按优先级处理所有项目（P1 → P2 → P3 → P4）
☐ 批量移动相似类型的笔记
☐ 删除或合并无价值内容
☐ 确保 Inbox 完全清空

📈 流程优化（5-10分钟）
☐ 回顾本周处理效率
☐ 识别重复出现的笔记类型
☐ 考虑是否需要新模板
☐ 更新处理检查清单
```

> [!success] 每周目标
> - Inbox 完全清空 ✅
> - 所有笔记已归位到 PARA ✅
> - 转化率 > 80% ✅

### 📅 每月例行（60-90分钟）- 系统优化

#### 月底复盘

```
📊 数据分析（20分钟）
☐ 查看 Inbox 趋势图（Dashboard）
☐ 统计各类型笔记数量
☐ 计算转化率和处理效率
☐ 识别瓶颈问题

🔍 流程审查（30分钟）
☐ 评估捕获流程是否顺畅
☐ 检查处理时间是否合理
☐ 审查模板使用情况
☐ 测试自动化脚本

⚙️ 系统优化（20分钟）
☐ 更新模板和分类规则
★ 调整自动化脚本
☐ 清理无用标签
☐ 优化文件夹结构

📝 文档更新（10分钟）
☐ 记录本月发现的问题
★ 更新工作流文档
☐ 分享最佳实践
```

### 🎯 季度目标（每季度检查）

| 指标 | 目标值 | 当前值 | 状态 |
|------|--------|--------|------|
| Inbox 清空率 | 100% | ___% | ___ |
| 平均处理时间 | < 2天 | ___天 | ___ |
| PARA 转化率 | > 80% | ___% | ___ |
| 笔记利用率 | > 85% | ___% | ___ |

---

## 📊 监控指标与仪表盘

### 关键性能指标（KPIs）

| 指标 | 目标值 | 当前值 | 状态 |
|------|--------|--------|------|
| **Inbox 清空率** | 每周 | ___% | ⏳ |
| **平均处理时间** | < 2天 | ___天 | ⏳ |
| **PARA 转化率** | > 80% | ___% | ⏳ |
| **笔记利用率** | > 85% | ___% | ⏳ |
| **删除率** | < 15% | ___% | ⏳ |

> [!info] 如何获取当前值
> 打开 [[Inbox Dashboard]] 查看实时数据，或使用下方 Dataview 查询

### 实时仪表盘

> 📊 **完整仪表盘**：[[Inbox Dashboard]]
>
> 仪表盘包含以下视图：
> - 📋 待处理笔记列表（按时间排序）
> - 📅 今日/本周/本月新增统计
> - 🔴 逾期项目预警（> 7天）
> - 📊 按类型分类统计
> - 📈 30天趋势分析
> - ✅ 处理检查清单

### 快速 Dataview 查询

#### 1. 查看所有待处理笔记

```dataview
TABLE WITHOUT ID
  file.link AS "笔记",
  dateformat(file.ctime, "MM-dd") AS "创建",
  (date(today) - file.ctime).days AS "天数",
  tags AS "标签"
FROM "0 Inbox"
WHERE file.path != "0 Inbox/0 Inbox.md" AND file.path != "0 Inbox/Inbox Dashboard.md"
SORT (date(today) - file.ctime).days DESC
LIMIT 20
```

#### 2. 查看逾期项目（> 7天）

```dataview
TABLE WITHOUT ID
  file.link AS "逾期笔记",
  dateformat(file.ctime, "MM-dd") AS "创建",
  (date(today) - file.ctime).days AS "逾期天数"
FROM "0 Inbox"
WHERE (date(today) - file.ctime).days > 7
  AND file.path != "0 Inbox/0 Inbox.md"
  AND file.path != "0 Inbox/Inbox Dashboard.md"
SORT (date(today) - file.ctime).days DESC
```

#### 3. 统计本周新增

```dataview
LIST rows.file.link
FROM "0 Inbox"
WHERE (date(today) - file.ctime).days <= 7
  AND file.path != "0 Inbox/0 Inbox.md"
  AND file.path != "0 Inbox/Inbox Dashboard.md"
SORT file.ctime DESC
```

#### 4. PARA 转化率计算

```dataview
TABLE WITHOUT ID
  length(filter(rows, (r) => (date(today) - r.file.ctime).days <= 7)) AS "本周新增",
  length(filter(rows, (r) => (date(today) - r.file.ctime).days <= 30)) AS "本月新增",
  length(rows) AS "当前总数"
FROM "0 Inbox"
WHERE file.path != "0 Inbox/0 Inbox.md" AND file.path != "0 Inbox/Inbox Dashboard.md"
```

### 手动记录表（可选）

如果你更喜欢手动跟踪，可以创建这个表格：

| 日期 | 新增 | 处理 | 删除 | 转化率 | 备注 |
|------|------|------|------|--------|------|
| 2026-01-21 | 5 | 4 | 0 | 80% | 正常 |
| 2026-01-22 | 8 | 7 | 1 | 88% | 好 |
| 2026-01-23 | 3 | 3 | 0 | 100% | 优秀 |
| 2026-01-24 | 12 | 10 | 2 | 83% | 忙碌 |
| 2026-01-25 | 6 | 6 | 0 | 100% | 正常 |
| 2026-01-26 | 4 | 3 | 1 | 75% | 待处理 |
| 2026-01-27 | 7 | ___ | ___ | ___% | ___ |
| 2026-01-28 | ___ | ___ | ___ | ___% | ___ |

---

## 🛠️ 自动化与工具

### Templater 脚本集

#### 1. 快速捕获脚本

**功能**：快速创建 Inbox 笔记，支持选择模板类型

```javascript
<%*
// 快速捕获脚本
const templateTypes = {
  '💡 想法': '想法模板',
  '📚 资源': '资源模板',
  '❓ 问题': '问题卡模板',
  '⚡ 快速笔记': '快速记录模板'
};

let choice = await tp.system.suggester(
  Object.keys(templateTypes),
  Object.values(templateTypes)
);

let title = await tp.system.prompt("标题");
tR += `---
title: ${title}
created: ${tp.date.now("YYYY-MM-DD")}
tags: [inbox]
---

# ${title}

## 内容

## 后续行动
- [ ]
`;
%>
```

#### 2. 批量处理脚本

**功能**：批量为 Inbox 笔记添加 PARA 标签

```javascript
<%*
// 批量添加 PARA 标签
const paraOptions = ['project', 'area', 'resource', 'archive'];

let notes = app.vault.getMarkdownFiles()
  .filter(f => f.path.startsWith('0 Inbox'))
  .filter(f => f.path !== '0 Inbox/0 Inbox.md');

for (let note of notes) {
  let choice = await tp.system.suggester(
    paraOptions,
    paraOptions,
    false,
    `处理: ${note.basename}`
  );
  if (choice) {
    let content = await app.vault.read(note);
    let newContent = content.replace(
      /tags: \[inbox\]/,
      `tags: [inbox, ${choice}]`
    );
    await app.vault.modify(note, newContent);
  }
}
%>
```

### Obsidian 插件推荐

| 插件 | 用途 | 必需度 |
|------|------|--------|
| **Templater** | 模板和自动化 | ⭐⭐⭐⭐⭐ 必需 |
| **Dataview** | 数据查询和仪表盘 | ⭐⭐⭐⭐⭐ 必需 |
| **QuickAdd** | 快速捕获和命令 | ⭐⭐⭐⭐ 推荐 |
| **Tasks** | 任务管理 | ⭐⭐⭐ 推荐 |
| **Calendar** | 日历视图 | ⭐⭐ 可选 |
| **Heatmap Calendar** | 活动热力图 | ⭐⭐ 可选 |

### 快捷键设置

| 操作 | 默认快捷键 | 建议快捷键 |
|------|-----------|-----------|
| 创建新笔记 | Ctrl+N | Ctrl+N |
| 快速打开命令 | Ctrl+P | Ctrl+P |
| 插入模板 | 无 | Ctrl+Shift+T |
| 移动文件 | 无 | Ctrl+Shift+M |
| 搜索 | Ctrl+Shift+F | Ctrl+Shift+F |

### 命令面板集成

在 `.obsidian/commands.json` 中添加自定义命令（如果需要）：

```json
{
  "commands": [
    {
      "id": "inbox-quick-capture",
      "name": "Inbox: 快速捕获",
      "callback": "() => { ... }"
    },
    {
      "id": "inbox-batch-process",
      "name": "Inbox: 批量处理",
      "callback": "() => { ... }"
    }
  ]
}
```

---

## 📚 模板资源

### 可用模板

在 `0 Inbox/` 或 `_templates/PARA/` 中应包含以下模板：

| 模板名称 | 文件名 | 用途 | 状态 |
|---------|--------|------|------|
| 想法捕获模板 | `想法模板.md` | 记录灵感和想法 | ✅ 已在文档中 |
| 资源收集模板 | `资源模板.md` | 收集资料和链接 | ✅ 已在文档中 |
| 问题卡模板 | `问题卡模板.md` | 追踪问题和解决方案 | ✅ 已在文档中 |
| 快速记录模板 | `快速记录模板.md` | 快速笔记和要点 | ✅ 已在文档中 |
| Project 模板 | `Project.md` | 创建新项目 | 📄 外部引用 |
| Area 模板 | `Area.md` | 创建新领域 | 📄 外部引用 |
| Resource 模板 | `Resource.md` | 创建新资源 | 📄 外部引用 |

### 使用方法

1. **安装 Templates 插件**：
   - 设置 → 社区插件 → 浏览 → 搜索 "Templates"
   - 安装并启用

2. **设置模板文件夹**：
   - 设置 → Templates → Template folder location
   - 选择 `0 Inbox/.templates/` 或 `_templates/PARA/`

3. **使用快捷键或命令**：
   - 设置 → 快捷键 → Templates: Insert template
   - 设置快捷键（如 `Ctrl+Shift+T`）

4. **创建模板文件**：
   - 将上方的模板代码复制到对应文件
   - 保存到模板文件夹

---

## ❌ 常见问题与解决方案

### Q1: Inbox 积压太多，不知道从何开始？

**A**: 使用「5分钟启动法」：
1. 设置 5 分钟计时器
2. 只处理最旧的 1-2 个项目
3. 不追求完美，只求移动
4. 每天重复，直到清空

> [!tip] 积压处理策略
> - 按优先级：P1 → P2 → P3 → P4
> - 按时间：最旧的优先
> - 按类型：同类批量处理

### Q2: 不知道如何分类到 PARA？

**A**: 使用「三问法 + 决策树」：
```
1. 需要行动？→ 是 → 有截止日期？
                              ├─ 有 → Projects
                              └─ 无 → Areas
   └─ 否 → 有参考价值？
              ├─ 有 → Resources
              └─ 无 → Archives 或删除
```

> [!example] 实战案例
> - "学习 Python" → 需要行动 + 无截止日期 → Areas
> - "完成年度报告" → 需要行动 + 有截止日期 → Projects
> - "Obsidian 使用技巧" → 无需行动 + 有参考价值 → Resources

### Q3: 经常忘记处理 Inbox？

**A**: 建立提醒机制：
1. **手机日历提醒**：每天晚上 9 点提醒处理
2. **Obsidian 插件**：使用 "Review" 插件设置提醒
3. **环境暗示**：在 Inbox 文件夹添加 `0_待处理` 前缀
4. **习惯绑定**：与现有习惯绑定（如刷牙后、睡觉前）

### Q4: 笔记格式不一致，难以整理？

**A**: 标准化方案：
1. 统一使用模板（见上方模板部分）
2. 处理时统一优化（见处理检查清单）
3. 使用 Templater 脚本自动格式化
4. 定期审查和清理不规范笔记

### Q5: 移动笔记后链接失效？

**A**: Obsidian 会自动更新内部链接，但注意：
- 使用 `[[Note]]` 格式（Obsidian 自动更新）
- 避免使用绝对路径
- 移动后检查 `[[Inbox]]` 链接是否需要更新

### Q6: 如何避免 Inbox 成为垃圾场？

**A**: 防护措施：
1. **捕获时把关**：只在有价值时记录
2. **定期清理**：每周清空，删除无用内容
3. **设置上限**：Inbox 笔记数 > 30 时强制停止捕获
4. **质量评估**：处理时问自己"这个笔记真的有用吗？"

---

## 🔗 相关资源

### PARA 系统文档
- [[2 Areas/🛠️ 工作流优化/PARA 工作流指南]] - 完整 PARA 说明
- [[3 Resources/03-Productivity/Methods/Inbox 工作流]] - 详细的 Inbox 工作流
- [[3 Resources/03-Productivity/Methods/PARA工作流]] - PARA 方法论

### 仪表盘与监控
- [[Inbox Dashboard]] - 实时监控 Inbox 状态
- `/para-库概览` - 查看 PARA 库整体状态
- `/para-整理收集` - 按 PARA 原则整理 Inbox

### 模板与工具
- [[问题卡指南]] - 问题卡使用指南
- [[_templates/general/问题卡]] - 问题卡模板
- [[问题卡_20260127]] - 问题卡示例

### 外部参考
- [The PARA Method](https://fortelabs.com/blog/para/) - PARA 方法论原版
- [Building a Second Brain](https://www.buildingasecondbrain.com/) - 第二大脑理论
- [Getting Things Done](https://gettingthingsdone.com/) - GTD 方法论

---

## ✅ 快速参考卡

### 🎯 核心原则
- **快速捕获** - 3分钟原则，不追求完美
- **定期处理** - 每日微整理，每周大清空
- **自动归位** - 使用脚本和工具辅助移动

### 📝 处理三问
1. **需要行动？** → 是 → 有截止日期？
   - 有 → Projects 🎯
   - 无 → Areas 🎯
2. **有参考价值？** → 是 → Resources 📚
3. **都不是？** → Archives 📦 或删除 🗑️

### ⚡ 优先级矩阵（Eisenhower）
| | 紧急 | 不紧急 |
|---|---|---|
| **重要** | 🔴 P1 立即处理 | 🟡 P2 计划安排 |
| **不重要** | 🔵 P3 委托处理 | ⚪ P4 删除/归档 |

### 📅 频率建议
- **每日**：早晚各 5-10 分钟处理
- **每周**：周日 30-60 分钟清空 Inbox
- **每月**：月底 60-90 分钟优化流程

### 🎨 快捷键（建议）
| 操作 | 快捷键 |
|------|--------|
| 创建新笔记 | Ctrl+N |
| 插入模板 | Ctrl+Shift+T |
| 打开仪表盘 | Ctrl+Shift+D |
| 批量整理 | `/para-整理收集` |

---

> [!tip] 核心目标
> Inbox 的核心目标是「快速捕获，定期处理」，不要让它成为垃圾场。
>
> **记住**：空 Inbox 是健康 Inbox 的标志！✅

---

**创建时间**：2026-01-27
**最后更新**：2026-01-28
**下次回顾**：2026-02-28
**状态**：✅ 已优化
