---
title: "标签系统使用指南"
created: 2026-02-11
tags:
  - #system/template
  - #system/navigation
aliases:
  - 标签系统
  - tag-system
---

# 标签系统使用指南

> [!info] 概述
> 本指南定义了 Obsidian vault 中统一的标签体系，涵盖 PARA、Zettelkasten、报告、系统功能和专用知识库等各个维度。

---

## 标签体系架构

```
┌─────────────────────────────────────────────────────────────────┐
│                    统一标签体系                        │
└─────────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
   PARA 核心               专用知识库             通用功能
   标签体系                标签系统                辅助标签
        │                     │                     │
   ┌────┴────┐           ┌────┴────┐           ┌────┴────┐
   │         │           │         │           │         │
 #para   #status   #type   #system   #report  #zettel
           #priority  #topic   #workflow
                     #discipline  #method
```

---

## 一、PARA 核心标签体系

PARA 标签以 `#para/` 为前缀，使用英文命名，用于组织和分类笔记。

### 1.1 Area (领域) 标签

```
#para/area/                # 领域
├── #para/area/health       # 健康
├── #para/area/career       # 职业发展
├── #para/area/finance      # 财务管理
├── #para/area/relationships # 人际关系
├── #para/area/learning     # 学习成长
└── #para/area/lifestyle   # 生活方式
```

**使用场景**：记录某个领域相关的知识、资源和思考，不依赖特定项目。

**示例**：
```yaml
---
tags:
  - #para/area/health
  - #zettel/type/permanent
aliases:
  - 健康领域
  - 健康
---
```

### 1.2 Project (项目) 标签

```
#para/project/              # 项目
├── #para/project/work       # 工作项目
├── #para/project/learning   # 学习项目
├── #para/project/personal   # 个人项目
└── #para/project/creative  # 创作项目
```

**使用场景**：跟踪具有明确目标和时间限制的项目。

**示例**：
```yaml
---
tags:
  - #para/project/work
  - #status/active
  - #priority/high
aliases:
  - 工作项目
---
```

### 1.3 Resource (资源) 标签

```
#para/resource/             # 资源
├── #para/resource/tech     # 技术资源
│   └── #para/resource/tech/programming # 编程
│       ├── #para/resource/tech/programming/python
│       └── #para/resource/tech/programming/mql
├── #para/resource/learning # 学习资源
├── #para/resource/productivity # 生产力资源
├── #para/resource/interest # 兴趣资源
└── #para/resource/reference # 参考资料
```

**使用场景**：存储可重用的参考资料、工具和资源。

**示例**：
```yaml
---
tags:
  - #para/resource/tech
  - #para/resource/tech/programming/python
aliases:
  - 技术资源
  - Python编程
---
```

### 1.4 Archive (归档) 标签

```
#para/archive/              # 归档
├── #para/archive/completed  # 已完成
├── #para/archive/on-hold   # 搁置
└── #para/archive/cancelled # 取消
```

**使用场景**：标记已完成或不再活跃的内容。

---

## 二、状态标签

状态标签用于表示笔记或项目的当前状态。

```
#status/                         # 状态根标签
├── #status/active               # 进行中
├── #status/on-hold             # 搁置中
├── #status/completed           # 已完成
├── #status/cancelled          # 已取消
├── #status/planning            # 计划中
└── #status/review             # 待审核
```

**使用场景**：与 PARA 项目标签结合使用，跟踪项目进度。

---

## 三、优先级标签

优先级标签用于标记任务或项目的重要性。

```
#priority/                       # 优先级根标签
├── #priority/high              # 高优先级
├── #priority/medium           # 中优先级
├── #priority/low              # 低优先级
└── #priority/urgent           # 紧急
```

**使用场景**：与项目标签结合使用，帮助确定工作优先顺序。

---

## 四、专用知识库标签

专用知识库标签纳入主标签体系，具有特定用途。

### 4.1 Type (内容类型) - 耳穴知识库

```
#type/                          # 内容类型
├── #type/concept               # 概念性笔记
├── #type/clinical              # 临床相关
├── #type/research              # 研究性内容
├── #type/treatment             # 治疗方案
├── #type/moc                   # 内容地图
├── #type/template              # 模板
├── #type/reference             # 参考资料
├── #type/guide                 # 指导性内容
└── #type/summary               # 总结性内容
```

### 4.2 Topic (主题分类) - 耳穴知识库

```
#topic/                         # 主题分类
├── #topic/basics                # 基础理论
├── #topic/anatomy               # 解剖相关
├── #topic/physiology            # 生理学
├── #topic/diagnosis             # 诊断学
└── #topic/treatment            # 治疗
```

### 4.3 Discipline (学科分类) - 耳穴知识库

```
#discipline/                    # 学科分类
├── #discipline/tcm             # 中医学
└── #discipline/western-medicine # 西医学
```

### 4.4 Method (研究方法) - 耳穴知识库

```
#method/                        # 研究方法
├── #method/clinical-trial      # 临床试验
└── #method/rct                 # 随机对照试验
```

### 4.5 Yixue (易学知识库)

```
#yixue/                         # 易学知识库
├── #yixue/basics/              # 基础概念
├── #yixue/hexagram/            # 六十四卦
├── #yixue/philosophy/          # 哲学思想
├── #yixue/application/         # 实践应用
└── #yixue/divination/          # 占卜方法
```

**使用场景**：标记特定知识库的内容类型和主题。

**示例**：
```yaml
---
tags:
  - #type/concept
  - #topic/basics
  - #discipline/tcm
aliases:
  - 耳穴概念
  - 基础理论
  - 中医
---
```

---

## 五、Zettelkasten 标签系统

Zettelkasten 标签用于标记卡片笔记的类型、状态和分类。

### 5.1 卡片类型

```
#zettel/type/              # 卡片类型
├── #zettel/type/fleeting     # 闪念笔记
├── #zettel/type/literature   # 文献笔记
├── #zettel/type/permanent    # 永久笔记
└── #zettel/type/structure   # 结构笔记
```

### 5.2 卡片状态

```
#zettel/status/            # 卡片状态
├── #zettel/status/draft       # 草稿
├── #zettel/status/refined     # 已润色
└── #zettel/status/verified   # 已验证
```

### 5.3 卡片分类

```
#zettel/category/          # 卡片分类
├── #zettel/category/philosophy # 哲学
├── #zettel/category/science     # 科学
├── #zettel/category/technology # 技术
├── #zettel/category/literature # 文学
└── #zettel/category/other      # 其他
```

**使用场景**：组织卡片笔记系统。

**示例**：
```yaml
---
tags:
  - #zettel/type/permanent
  - #zettel/status/verified
aliases:
  - 永久笔记
  - 已验证
---
```

---

## 六、报告/日志标签

报告标签用于标记各种定期报告和日志。

```
#report/                         # 报告根标签
├── #report/daily               # 日报
├── #report/weekly              # 周报
├── #report/monthly             # 月报
├── #report/quarterly           # 季报
├── #report/annual              # 年报
└── #report/reflection          # 反思
```

**使用场景**：
```markdown
日常记录: #report/daily #journal
周回顾: #report/weekly #review
月总结: #report/monthly #reflection
年回顾: #report/annual #reflection
```

---

## 七、系统功能标签

系统功能标签用于标记具有特定系统功能的笔记。

```
#system/                         # 系统功能根标签
├── #system/template            # 模板
├── #system/index               # 索引页
├── #system/cache               # 缓存页
├── #system/moc                # 内容地图（MOC）
├── #system/dashboard           # 仪表板
└── #system/navigation          # 导航页
```

---

## 八、工作流标签

工作流标签用于标记笔记在工作流中的位置。

```
#workflow/                       # 工作流根标签
├── #workflow/inbox             # 收件箱
├── #workflow/review            # 回顾
├── #workflow/processing        # 处理中
├── #workflow/automation        # 自动化
└── #workflow/quickadd          # 快速添加
```

---

## 中英文标签规范

### 规则

1. **英文标签为主标签** - 用于分类和系统查询
2. **中文标签作为 aliases** - 通过 frontmatter 的 `aliases` 字段实现搜索便利性
3. **中英文标签可并存** - 在 frontmatter 中同时使用，但英文标签作为 tags 的主值

### 示例格式

```yaml
---
tags:
  - #para/area/health
  - #type/clinical
aliases:
  - 健康领域
  - 健康
  - 临床相关
---
```

### 映射关系表

| 英文主标签 | 中文 aliases |
|-----------|-------------|
| `#para/area/health` | 健康领域、健康 |
| `#para/area/career` | 职业发展、职业 |
| `#para/area/finance` | 财务管理、财务 |
| `#para/area/relationships` | 人际关系、人脉 |
| `#para/area/learning` | 学习成长、学习 |
| `#para/area/lifestyle` | 生活方式 |
| `#para/project/work` | 工作项目 |
| `#para/resource/tech` | 技术资源 |
| `#type/clinical` | 临床相关 |
| `#topic/basics` | 基础理论 |

---

## 标签命名规范

| 规则 | 说明 | 示例 |
|------|------|------|
| 小写字母 | 统一使用小写 | `#para/area` 而非 `#PARA/area` |
| 连字符分隔 | 使用 `-` 分隔单词 | `#zettel/type/fleeting` |
| 层次化结构 | 使用 `/` 分层，最多3级 | `#para/resource/tech/programming` |
| 英文为主 | 优先使用英文标签 | `#status/active` |
| 语义明确 | 标签名有明确含义 | `#priority/high` |
| 避免重复 | 避免语义重复 | 不同时使用 `#active` 和 `#in-progress` |

---

## 标签组合最佳实践

### 项目笔记完整标签组合

```yaml
---
tags:
  - #para/project/work
  - #status/active
  - #priority/high
  - #zettel/type/permanent
aliases:
  - 工作项目
  - 高优先级
---
```

### 领域笔记标签组合

```yaml
---
tags:
  - #para/area/health
  - #type/clinical
  - #zettel/type/permanent
aliases:
  - 健康领域
  - 健康
---
```

### 资源笔记标签组合

```yaml
---
tags:
  - #para/resource/tech
  - #zettel/type/literature
aliases:
  - 技术资源
  - 文献笔记
---
```

### 耳穴知识库笔记标签组合

```yaml
---
tags:
  - #type/concept
  - #topic/basics
  - #discipline/tcm
aliases:
  - 耳穴概念
  - 基础理论
  - 中医
---
```

### 易学知识库笔记标签组合

```yaml
---
tags:
  - #yixue/basics
  - #yixue/philosophy
aliases:
  - 易学基础
  - 易学哲学
---
```

---

## 标签使用场景速查

### PARA 标签使用场景

| 场景 | 使用标签 | 示例 |
|------|----------|------|
| 领域笔记 | `#para/area/` + 子分类 | `#para/area/health` |
| 项目笔记 | `#para/project/` + 子分类 + `#status/` + `#priority/` | `#para/project/work #status/active #priority/high` |
| 资源笔记 | `#para/resource/` + 子分类 | `#para/resource/tech` |
| 归档笔记 | `#para/archive/` + 子分类 | `#para/archive/completed` |

### Zettelkasten 标签使用场景

| 卡片类型 | 标签组合 |
|----------|-----------|
| 闪念笔记 | `#zettel/type/fleeting #zettel/status/draft` |
| 文献笔记 | `#zettel/type/literature #zettel/category/[分类]` |
| 永久笔记 | `#zettel/type/permanent #zettel/status/verified` |
| 结构笔记 | `#zettel/type/structure` |

### 报告标签使用场景

```markdown
日常记录: #report/daily #journal
周回顾: #report/weekly #review
月总结: #report/monthly #reflection
年回顾: #report/annual #reflection
```

### 专用知识库标签使用场景

```markdown
耳穴知识库: #type/[类型] #topic/[主题] #discipline/[学科] #method/[方法]
易学知识库: #yixue/[分类]
```

---

## 实施注意事项

1. **本规范仅建立标签体系标准**，不进行大规模现有标签迁移
2. **新创建的笔记应直接使用新规范**
3. **用户可手动选择何时更新现有笔记的标签**
4. **专用知识库标签纳入主体系后**，保留了其特殊用途和分类逻辑
5. **中英文标签通过 aliases 实现搜索便利性**，英文标签作为系统查询的主键

---

## 相关文档

- [[tag-quick-reference.md]] - 标签速查表
- [[示例笔记-领域标签使用.md]] - 领域标签使用示例
- [[示例笔记-项目标签使用.md]] - 项目标签使用示例
- [[示例笔记-资源标签使用.md]] - 资源标签使用示例
- [[示例笔记-Zettelkasten标签使用.md]] - Zettelkasten 标签使用示例
