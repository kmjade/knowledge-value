---
title: Skills vs MCP
aliases: [Skills vs MCP Comparison, Skills 与 MCP 对比]
tags: [claude-code, skills, mcp, comparison]
created: 2026-05-26
updated: 2026-06-01
type: reference
status: evergreen
---

# Skills vs MCP

> Claude Skills 与 MCP (Model Context Protocol) 的核心差异——两种扩展机制如何互补。

---

## 一、核心差异

| 维度 | Skills | MCP |
|------|------|------|
| **定位** | 传授"如何做" | 提供"能力去做" |
| **内容** | 规范·标准·最佳实践 | 外部 API·数据库·云服务 |
| **格式** | 纯文本 Markdown | 编程实现 (Python/Node.js) |
| **加载** | 渐进式按需加载 | 启动时注册全部工具 |
| **创建** | 写 SKILL.md（无需编程） | 编写服务端代码 |
| **部署** | 无需服务器 | 需要运行 MCP Server |
| **维护** | 纯文本，Git 即可 | 代码维护 + 服务运维 |
| **Token** | 按需消耗 | 工具定义始终占用 |

---

## 二、定位差异

### Skills：传授规范

```
chinese-first-rule Skill:
  → 教会 Claude「用简体中文交流」
  → 提供「语言规范 + 示例 + 强制规则」

mall-api-development Skill:
  → 教会 Claude「如何设计 RESTful API」
  → 提供「路径规范 + 错误处理 + 状态码」
```

### MCP：提供工具

```
Notion MCP Connector:
  → 赋予 Claude「访问 Notion API」的能力
  → 提供「创建页面、查询数据库」等工具

Database MCP Server:
  → 赋予 Claude「查询数据库」的能力
  → 提供「execute_query()」工具
```

---

## 三、创建差异

### Skills：零技术门槛

```
1. mkdir .claude/skills/my-skill/
2. 编写 SKILL.md（Markdown）
3. 完成

无需编程 · 无需服务器 · 无需部署
```

### MCP：需要技术实现

```
1. 选择语言（Python/Node.js）
2. 编写 MCP Server 代码
3. 实现 MCP 协议
4. 部署服务
5. 配置 Claude 连接

需要编程 · 需要服务器 · 需要运维
```

---

## 四、加载差异

### Skills：渐进式

```
任务开始 → 扫描名称 → 匹配 → 按需加载完整内容
→ 智能匹配 · 节省 Token · 动态调整
```

### MCP：预注册

```
启动 MCP Server → 加载所有工具定义 → 注册 → 等待调用
→ 启动时全部加载 · 工具始终可用 · 占用固定内存
```

---

## 五、结合使用

### MCP + Skills = 强大自动化

```
场景：自动创建 Notion 文档

MCP 提供：
  └─ Notion Connector → create_page() · query_database()

Skills 提供：
  ├─ Notion Workflow Skill → 组织结构规范
  ├─ API Doc Skill → 内容标准
  └─ chinese-first-rule → 简体中文

结果：既「能做」又「做得好」
```

### 示例：数据库查询

```
MCP：execute_query() 工具
Skill：
  ├─ 必须加 tenant_id 过滤（多租户隔离）
  ├─ 必须加 LIMIT 防止全表扫描
  └─ 查询前记录日志

→ Skill 确保 MCP 的工具被正确使用
```

---

## 六、选择指南

### ✅ 用 Skills

- 需要统一开发规范
- 需要传授团队标准
- 需要知识传承（最佳实践、经验总结）
- 需要质量保证（代码规范、文档标准）

### ✅ 用 MCP

- 需要访问外部系统（API·数据库·云服务）
- 需要工具扩展（文件操作·CI/CD）
- 需要数据集成（跨平台同步）

### ✅ 两者结合

- 规范化集成外部服务
- 自动化 + 质量保证
- 团队标准 + 外部能力

---

## 七、职责划分

```
MCP 负责：
├── 提供外部访问能力
├── 执行具体操作
└── 返回结果

Skills 负责：
├── 定义操作规范
├── 确保质量标准
└── 指导正确使用
```

> MCP 说了「能做什么」，Skills 说了「该怎么做」。两者互补，互不依赖。

---

## 总结

| 问题 | 答案 |
|------|------|
| 需要传授规范？ | → Skills |
| 需要访问外部？ | → MCP |
| 需要两者？ | → 结合使用 |
| Skills = 知识, MCP = 能力 | → 互补，非替代 |

---

## 相关

- [[skills-introduction|Skills 简介]] · [[skills-features|核心特性]]
- [[skills-implementation|实施方案]] · [[skills-best-practices|最佳实践]]
