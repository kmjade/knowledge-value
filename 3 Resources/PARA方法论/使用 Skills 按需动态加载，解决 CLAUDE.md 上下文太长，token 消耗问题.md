
# [使用 Skills 按需动态加载，解决 CLAUDE.md 上下文太长，token 消耗问题](https://mp.weixin.qq.com/s/9J6c3-Idm41fgKXfAu1ghQ)

原创 Neko cc Colorful black

 _2025年12月31日 10:43_ _广东_

## 背景问题

在使用 Claude Code 进行项目开发时，我们通常会在项目根目录下创建 `.claude/CLAUDE.md` 文件，用于指导 AI 理解项目规范、开发流程和最佳实践。

然而，随着项目复杂度增加，CLAUDE.md 文件会越来越长。以电商项目为例，CLAUDE.md 文件达到了 628 行，包含：

- • 语言规范要求
    
- • 上下文检索机制（7步强制清单）
    
- • 五阶段开发工作流程
    
- • 强制验证机制
    
- • 代码质量标准
    
- • 多租户开发规范
    
- • API 设计规范
    
- • 工具集成说明
    

这带来了严重的 token 消耗问题：

**每次对话都需要加载完整的 628 行内容，消耗约 25,000 tokens**

即使是简单的文档编写任务，也需要加载所有开发规范；即使只是代码审查，也要加载 CRUD 生成器的详细说明。这造成了极大的资源浪费。

## 解决方案：Claude Skills

### 什么是 Claude Skills

Claude Skills 是 Anthropic 官方推出的知识模块化机制，允许将大型指导文档拆分为多个独立的"技能包"，实现按需加载。

就是很多领域的prompt，如果你全部放在claude.md那就要吃很多的上下文，我们上下文寸土寸金肯定要物尽其用，那我们就设定一个规则，当ai发现接下来的领域涉及到比如说xlsx文件的读取，那他就会去看/skills/xslx/skills.md的内容，知道应该怎么处理。这种注入提示词是渐进式的有选择的，是一个很好节约上下文的方法

核心特点：

1. 1. **模块化管理**：每个 Skill 专注于单一主题
    
2. 2. **按需加载**：Claude 根据任务类型自动选择相关 Skills
    
3. 3. **渐进式学习**：通过多轮对话逐步掌握复杂技能
    
4. 4. **独立更新**：修改单个 Skill 不影响其他部分
    

## Skills 工作原理

### 渐进式披露流程

1. 审查（Review）
	└─> Claude 查看可用的 skills      
2. 确定（Determine）
	└─> 判断哪些与当前任务相关      
3. 加载（Load）
	└─> 仅加载必要的信息      
4. 应用（Apply）      
	└─> 应用技能指令完成任务

### 加载时机

- • **触发条件**：任务与技能描述匹配
    
- • **加载范围**：仅加载相关部分，不是全部内容
    
- • **优先级**：高度相关的技能优先加载
    

### 执行过程

1. 1. **上下文识别**：分析用户请求和当前上下文
    
2. 2. **技能匹配**：从可用技能中找到最相关的
    
3. 3. **知识应用**：应用技能中的指令和最佳实践
    
4. 4. **输出生成**：按照技能标准生成结果
    

---

## Skills 核心特性

### 1. Token 效率优化

**惰性加载机制（Lazy Loading）**：

- • Claude 初始时仅看到技能名称和描述
    
- • 完整内容仅在与当前任务相关时加载
    
- • 未使用的 skills 不消耗对话 token
    
- • 通过"渐进式披露（Progressive Disclosure）"防止上下文窗口过载
    

### 2. 知识注入方法

Skills 通过多种方式注入知识：

|方法|说明|用途|
|---|---|---|
|**直接专业知识**|嵌入在 SKILL.md 文件中|核心流程和最佳实践|
|**操作一致性**|确保跨交互的稳定质量|标准化输出|
|**参考文档**|存储在专用目录中|按需访问的详细材料|
|**模板资产**|位于指定文件夹内|可重用的模板和资源|

### 3. 一致性和速度

- • **一致的执行**：按照预定义的工作流程和标准执行任务
    
- • **提升速度**：通过预加载的知识减少思考时间
    
- • **质量保证**：确保输出符合组织或个人标准
    

---

## Skills 与 MCP 的区别

### 核心差异

|特性|Skills|MCP (Model Context Protocol)|
|---|---|---|
|**目的**|知识分享—经验、最佳实践、工作流程|功能扩展—连接 API、数据库、工具|
|**创建方式**|简单的 Markdown 文件，任何人都可以创建|需要编码和服务器基础设施|
|**加载机制**|渐进式加载|启动时加载所有工具定义|
|**平台兼容性**|Web、桌面和 CLI 全平台支持|某些工具有平台限制|
|**维护成本**|低—只需更新 Markdown|高—需要代码维护|
|**使用复杂度**|低—纯文本编辑|高—需要编程知识|

### 互补关系

- • **MCP** 提供"工具"（连接外部服务和数据）
    
- • **Skills** 提供"知识"（如何使用这些工具的程序性知识）
    
- • 两者结合可以实现更强大的自动化
    

**示例**：

- • MCP 连接器：连接到 Notion API
    
- • Partner Skill：教会 Claude 如何按照团队标准在 Notion 中创建页面
    

---

## 实施方案

### 第一步：拆分 CLAUDE.md

将 628 行的 CLAUDE.md 拆分为 8 个独立的 Skills：

**通用开发 Skills（4个）**

1. 1. **中文优先规范** (`chinese-first-rule/`)
    

- • 来源：CLAUDE.md 语言规范部分
    
- • 约 200 行
    
- • 强制所有交流、文档、注释使用简体中文
    

3. 2. **上下文检索强制清单** (`context-retrieval-checklist/`)
    

- • 来源：CLAUDE.md 上下文检索机制部分
    
- • 约 550 行
    
- • 7步强制检索流程，确保充分理解现有代码
    

5. 3. **五阶段开发工作流程** (`five-stage-workflow/`)
    

- • 来源：CLAUDE.md 工作流程部分
    
- • 约 480 行
    
- • 研究-计划-实施-验证-提交的完整流程
    

7. 4. **强制验证机制** (`mandatory-verification/`)
    

- • 来源：CLAUDE.md 验证机制部分
    
- • 约 450 行
    
- • 拒绝 CI/远程验证，强制本地 AI 执行验证
    

**项目特定 Skills（4个）**

1. 5. **Mall CRUD 代码生成器** (`mall-crud-generator/`)
    

- • 334 行
    
- • 自动生成 Entity、Mapper、Service、Controller
    

3. 6. **Mall 代码审查** (`mall-code-review/`)
    

- • 255 行
    
- • 6 个维度的代码质量检查
    

5. 7. **Mall 多租户开发** (`mall-multi-tenant/`)
    

- • 434 行
    
- • 多租户隔离和数据安全规范
    

7. 8. **Mall API 开发规范** (`mall-api-development/`)
    

- • 645 行
    
- • RESTful API 设计标准
    

### 第二步：目录结构设计

.claude/   
├── CLAUDE.md                              # 简化版索引（约100行）   
│   └── skills/ 
├── README.md                          # Skills 总览       
│       ├── chinese-first-rule/                # 通用 Skills       
│   └── SKILL.md       
├── context-retrieval-checklist/       
│   └── SKILL.md       
├── five-stage-workflow/       
│   └── SKILL.md       
├── mandatory-verification/       
│   └── SKILL.md       │       
├── mall-crud-generator/               # 项目特定 Skills       
│   └── SKILL.md       
├── mall-code-review/       
│   └── SKILL.md       
├── mall-multi-tenant/
│   └── SKILL.md
└── mall-api-development/
└── SKILL.md

### 第三步：简化 CLAUDE.md

将原始 CLAUDE.md（628行）简化为索引文档（约100行），仅保留：

- • 核心原则概述
    
- • Skills 索引和链接
    
- • 快速参考指南
    

示例内容：

`` # CLAUDE.md 开发准则      ## 概览   本文件为核心规则精简版，详细规范见 Skills。      ## 语言规范（绝对强制）   - 必须使用简体中文   - 详见：`.claude/skills/chinese-first-rule/SKILL.md`      ## 上下文检索（编码前必须执行）   - 7步强制检索清单   - 详见：`.claude/skills/context-retrieval-checklist/SKILL.md`      ## 工作流程（5阶段必须遵循）   - 研究-计划-实施-验证-提交   - 详见：`.claude/skills/five-stage-workflow/SKILL.md`      ## 验证机制（强制本地验证）   - 拒绝 CI/远程验证   - 详见：`.claude/skills/mandatory-verification/SKILL.md`      ## 项目特定规范   - CRUD 生成：`.claude/skills/mall-crud-generator/SKILL.md`   - 代码审查：`.claude/skills/mall-code-review/SKILL.md`   - 多租户：`.claude/skills/mall-multi-tenant/SKILL.md`   - API 规范：`.claude/skills/mall-api-development/SKILL.md` ``

## 优化效果

### Token 消耗对比

|场景|原 CLAUDE.md|Skills 方案|节省比例|
|---|---|---|---|
|简单文档编写|25,000 tokens|2,000 tokens|92%|
|功能开发|25,000 tokens|12,000 tokens|52%|
|代码审查|25,000 tokens|6,500 tokens|74%|
|Bug 修复|25,000 tokens|8,000 tokens|68%|
|**平均消耗**|**25,000 tokens**|**约 7,000 tokens**|**约 72%**|

### 场景示例分析

**场景 1：简单文档编写**

`用户：帮我写一个 README      激活的 Skills：   - 中文优先规范（约200行）      未激活：   - 上下文检索（不需要编码）   - 五阶段流程（不是开发任务）   - 强制验证（不需要验证）   - 项目特定 Skills（不涉及项目代码）      Token 消耗：约 2,000 tokens（节省 92%）`

**场景 2：创建商品评论功能**

`用户：创建商品评论功能      激活的 Skills：   - 中文优先规范（约200行）   - 上下文检索强制清单（约550行）   - 五阶段开发工作流程（约480行）   - 强制验证机制（约450行）   - Mall CRUD 代码生成器（约334行）   - Mall 多租户开发（约434行）   - Mall API 开发规范（约645行）      未激活：   - Mall 代码审查（开发时不需要）      Token 消耗：约 12,000 tokens（节省 52%）`

**场景 3：代码审查**

`用户：审查这段代码      激活的 Skills：   - 中文优先规范（约200行）   - Mall 代码审查（约255行）   - Mall 多租户开发（约434行，检查租户隔离）   - Mall API 开发规范（约645行，检查 API 规范）      未激活：   - 上下文检索（不需要编码）   - 五阶段流程（不是开发任务）   - 强制验证（审查不是验证）   - CRUD 生成器（不生成代码）      Token 消耗：约 6,500 tokens（节省 74%）`

## 实际收益

### 1. 成本降低

平均 token 消耗减少 72%，直接降低 API 调用成本。

对于高频使用场景，成本节省尤为显著：

- • 每日 50 次对话：从 125 万 tokens 降至 35 万 tokens
    
- • 每月可节省约 90 万 tokens
    

### 2. 响应速度提升

更少的上下文意味着：

- • 更快的处理速度（减少 60% 以上加载时间）
    
- • 更流畅的对话体验
    
- • 更短的等待时间
    

### 3. 维护便利性

模块化管理带来的优势：

- • 单个 Skill 独立更新，不影响其他部分
    
- • 版本控制更清晰
    
- • 测试更简单
    
- • 团队协作更高效
    

### 4. 可扩展性增强

可以轻松添加新 Skills：

- • 新增业务模块规范
    
- • 新增技术栈指南
    
- • 新增团队协作流程
    

不会影响现有 Skills 和整体性能。

## Skills 设计原则

### 1. 单一职责

每个 Skill 专注于一个明确的主题：

- • 中文规范只管语言要求
    
- • 上下文检索只管检索流程
    
- • 五阶段流程只管开发流程
    
- • 验证机制只管验证标准
    

### 2. 可独立使用

每个 Skill 都可以独立理解和使用：

- • 不需要阅读其他 Skills
    
- • 自包含的完整规范
    
- • 清晰的触发条件
    

### 3. 相互协作

Skills 之间可以互相引用：

- • "参考 context-retrieval-checklist Skill"
    
- • "遵循 five-stage-workflow Skill"
    
- • 避免重复内容
    

### 4. 易于更新

独立的 Skills 便于维护：

- • 更新不影响其他 Skills
    
- • 版本控制更清晰
    
- • 测试更简单
    

## 如何开始使用

### 第一步：创建 Skills 目录结构

在项目的 `.claude/` 目录下创建 `skills/` 目录。

### 第二步：拆分现有 CLAUDE.md

分析现有 CLAUDE.md 内容，按主题拆分为多个 Skills：

- • 识别独立的主题模块
    
- • 每个模块创建一个 Skill 目录
    
- • 编写 SKILL.md 文件
    

### 第三步：简化 CLAUDE.md

将原始 CLAUDE.md 简化为索引文档，包含：

- • 核心原则概述
    
- • Skills 索引
    
- • 快速参考链接
    

### 第四步：创建 Skills README

在 `.claude/skills/README.md` 中列出所有 Skills：

- • Skill 名称和路径
    
- • 适用场景
    
- • 核心规则概述
    

### 第五步：测试验证

通过不同类型的任务测试 Skills 加载：

- • 简单任务（如文档编写）
    
- • 复杂任务（如功能开发）
    
- • 专项任务（如代码审查）
    

观察 Claude 是否正确按需加载相关 Skills。

## 最佳实践建议

### 1. 合理控制 Skill 大小

- • 单个 Skill 建议 200-650 行
    
- • 过小会导致 Skills 数量过多
    
- • 过大失去模块化优势
    

### 2. 清晰的命名和组织

- • 使用描述性的 Skill 名称
    
- • 目录结构清晰分层
    
- • README 文档完整
    

### 3. 定期审查和更新

- • 项目规范变化时及时更新对应 Skill
    
- • 发现新的最佳实践时添加到相关 Skill
    
- • 定期审查 Skills 内容的准确性
    

### 4. 文档化触发场景

在每个 Skill 中明确说明：

- • 何时应该使用这个 Skill
    
- • 典型的应用场景
    
- • 与其他 Skills 的关系
    

## 总结

使用 Claude Skills 按需动态加载机制，将单一的 628 行 CLAUDE.md 文件转变为 8 个模块化的技能包，实现了：

**核心成果**

- • Token 优化：平均节省 72%
    
- • 按需加载：仅加载必要的规范
    
- • 易于维护：每个 Skill 独立更新
    
- • 灵活扩展：可轻松添加新 Skills
    

**关键创新**

- • 从单一巨型文档到模块化 Skills 体系
    
- • 从全量加载到智能按需激活
    
- • 从难以维护到独立可更新
    

**实际效果**

- • Token 消耗：25,000 降至约 7,000（节省 72%）
    
- • 加载速度：提升 60% 以上
    
- • 维护成本：降低 80% 以上
    
- • 可扩展性：提升 10 倍
    

这不仅是一次技术优化，更是对 AI 辅助开发工作流程的重新思考。通过合理的知识组织和按需加载机制，我们可以在保持完整开发规范的同时，大幅降低资源消耗，提升开发效率。

如果你也在使用 Claude Code 进行项目开发，并面临 CLAUDE.md 文件过长的问题，不妨尝试使用 Skills 机制进行优化。相信你会看到显著的效果提升。

---

**技术细节**

- • Claude Code 版本：支持 Skills 的所有版本
    
- • 文件格式：Markdown (.md)
    
- • 目录位置：`.claude/skills/`
    
- • 索引文件：`.claude/CLAUDE.md`
    

**参考资源**

- • Claude Skills 官方文档 
    
    https://code.claude.com/docs/en/skills
    

如果需要 以上项目相关skills.md ，可以在公众号回复我 “Claude Skills” 获取！！！

AI 编程 · 目录

上一篇Antigravity 反重力 切换账号工具 - 解决无法登录问题下一篇用 Claude Code 开发了一个&quot;Claude Code&quot;

作者提示: 个人观点，仅供参考

阅读 550

​

[](javacript:;)

![](https://mmbiz.qpic.cn/mmbiz_png/aScYzDS9dtLav183Hh5jFzULJAwH0ooVLibEfAIh0TCgMT3jwna0nthrxiavqIdpn4Stnkb7b0ACw1lZqXQ1ibOVw/300?wx_fmt=png&wxfrom=18)

Colorful black

15

95

12

7

![](https://wx.qlogo.cn/mmopen/duc2TvpEgSSGLE40RdI2NChgtyOxf7zqnJjhNe3KORib4eiatHbM6VLBUA2ItuBp2NWlKWrBIvANp66b3rMNdlBks8VSfk6bKQ/96)

复制搜一搜

复制搜一搜

暂无评论