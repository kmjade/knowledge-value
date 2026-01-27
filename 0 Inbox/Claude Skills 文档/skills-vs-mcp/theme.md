# Skills 与 MCP 的区别 / Skills vs MCP

## 概述

理解 Claude Skills 和 MCP (Model Context Protocol) 的核心差异，以及它们如何互补使用。

---

## 核心差异对比

### 详细对比表

| 特性 | Skills | MCP (Model Context Protocol) |
|------|--------|----------------------------|
| **目的** | 知识分享——经验、最佳实践、工作流程 | 功能扩展——连接 API、数据库、工具 |
| **核心价值** | 传授"如何做"的程序性知识 | 提供访问外部系统和服务的能力 |
| **创建方式** | 简单的 Markdown 文件，任何人都可以创建 | 需要编码和服务器基础设施 |
| **技术栈** | 纯文本（Markdown） | 需要编程（Python, Node.js, 等） |
| **加载机制** | 渐进式加载，按需激活 | 启动时加载所有工具定义 |
| **平台兼容性** | Web、桌面和 CLI 全平台支持 | 某些工具有平台限制 |
| **维护成本** | 低——只需更新 Markdown | 高——需要代码维护和服务器运维 |
| **使用复杂度** | 低——纯文本编辑，无需编程 | 高——需要编程知识和系统架构 |
| **更新频率** | 灵活，随时可更新 | 需要重新部署服务器 |
| **依赖性** | 无外部依赖 | 需要服务器和网络连接 |
| **适用场景** | 项目规范、开发流程、团队标准 | 连接外部 API、数据库、文件系统 |

### 深入分析

#### 1. 目的不同

**Skills：知识管理**

```
Skills 提供什么？
├─ 开发规范
├─ 工作流程
├─ 最佳实践
├─ 团队标准
└─ 经验总结

示例：
└─ chinese-first-rule Skill
   └─ 教会 Claude 如何用简体中文交流
      └─ 这是一种"知识"，不是"功能"
```

**MCP：功能扩展**

```
MCP 提供什么？
├─ 外部 API 连接
├─ 数据库访问
├─ 文件系统操作
├─ 云服务集成
└─ 自定义工具

示例：
└─ Notion MCP Connector
   └─ 允许 Claude 访问 Notion API
      └─ 这是一种"功能"，不是"知识"
```

#### 2. 创建方式不同

**Skills：简单易创建**

```
步骤 1：创建目录
.claude/skills/my-skill/

步骤 2：编写 SKILL.md
# My Skill

这是我的自定义技能...

步骤 3：完成！

├─ 无需编程
├─ 无需服务器
├─ 随时可更新
└─ 任何人都能创建
```

**MCP：需要技术实现**

```
步骤 1：选择语言（Python, Node.js, 等）
步骤 2：编写服务器代码
步骤 3：实现 MCP 协议
步骤 4：部署服务器
步骤 5：配置客户端连接
步骤 6：测试和调试
步骤 7：维护和更新

├─ 需要编程知识
├─ 需要服务器基础设施
├─ 需要持续维护
└─ 技术门槛较高
```

#### 3. 加载机制不同

**Skills：渐进式加载**

```
任务开始
   ↓
扫描可用 Skills（只看名称和描述）
   ↓
识别相关 Skills
   ↓
按需加载完整内容
   ↓
执行任务

特点：
├─ 智能匹配
├─ 按需加载
├─ 节省 Token
└─ 动态调整
```

**MCP：预加载工具**

```
启动 MCP 服务器
   ↓
加载所有工具定义
   ↓
注册可用工具
   ↓
等待任务调用

特点：
├─ 启动时加载全部
├─ 工具始终可用
├─ 快速响应
└─ 但占用内存
```

---

## 互补关系

### MCP 提供"工具"

MCP 扩展了 Claude 的能力，让它能够访问外部系统：

```
MCP 工具示例：

1. Notion MCP Connector
   ├─ 功能：连接到 Notion API
   ├─ 能力：读取、创建、更新 Notion 页面
   └─ 作用：让 Claude 能操作 Notion 数据

2. Database MCP Server
   ├─ 功能：连接到数据库
   ├─ 能力：执行 SQL 查询
   └─ 作用：让 Claude 能查询数据库

3. File System MCP
   ├─ 功能：访问本地文件系统
   ├─ 能力：读取、写入、搜索文件
   └─ 作用：让 Claude 能操作本地文件
```

### Skills 提供"知识"

Skills 教会 Claude 如何正确使用这些工具：

```
Skills 知识示例：

1. Notion Workflow Skill
   ├─ 知识：如何在 Notion 中创建符合团队标准的页面
   ├─ 规范：页面模板、命名规则、标签体系
   └─ 作用：确保 Notion 页面符合团队规范

2. Database Query Skill
   ├─ 知识：如何编写高效的 SQL 查询
   ├─ 规范：查询优化、安全过滤、错误处理
   └─ 作用：确保数据库查询安全高效

3. File Organization Skill
   ├─ 知识：如何组织项目文件结构
   ├─ 规范：文件命名、目录组织、文档格式
   └─ 作用：确保文件结构清晰规范
```

### 结合使用的威力

**MCP + Skills = 强大的自动化**

```
示例：在 Notion 中创建 API 文档

任务："为商品评论功能创建 Notion 文档"

第 1 步：MCP 提供工具
├─ Notion MCP Connector
└─ 能力：创建 Notion 页面

第 2 步：Skills 提供知识
├─ Notion Workflow Skill
│  └─ 知道如何按照团队标准创建页面
├─ API Documentation Skill
│  └─ 知道 API 文档应该包含什么内容
└─ chinese-first-rule Skill
   └─ 知道所有内容必须使用简体中文

第 3 步：执行任务
├─ 使用 Notion MCP Connector 创建页面
├─ 按照 Notion Workflow Skill 组织结构
├─ 按照 API Documentation Skill 填充内容
└─ 按照 chinese-first-rule Skill 使用中文

结果：在 Notion 中创建符合所有标准的 API 文档 ✅
```

---

## 实际应用示例

### 示例 1：数据库操作

**MCP：提供数据库访问**

```
Database MCP Server
├─ 功能：连接 PostgreSQL 数据库
├─ 工具：execute_query()
└─ 作用：执行 SQL 查询
```

**Skills：提供数据库操作知识**

```
Database Query Skill
├─ 知识：如何编写安全的查询
├─ 规范：
│  ├─ 使用参数化查询防止 SQL 注入
│  ├─ 添加租户过滤确保多租户隔离
│  ├─ 限制查询结果数量
│  └─ 添加必要的索引
└─ 作用：确保查询安全高效
```

**结合使用：**

```
用户："查询最近 7 天的订单数据"

Claude 执行：
1. 分析需求
2. 加载 Database Query Skill
3. 按照 Skill 规范编写 SQL：
   ```sql
   SELECT *
   FROM orders
   WHERE tenant_id = :tenantId
     AND created_at >= :sevenDaysAgo
   ORDER BY created_at DESC
   LIMIT 1000
   ```
4. 使用 Database MCP Server 执行查询
5. 返回结果

结果：安全、高效的查询 ✅
```

---

### 示例 2：文件系统操作

**MCP：提供文件访问**

```
File System MCP
├─ 功能：访问本地文件系统
├─ 工具：
│  ├─ read_file()
│  ├─ write_file()
│  ├─ list_directory()
│  └─ search_files()
└─ 作用：读写文件、浏览目录
```

**Skills：提供文件组织知识**

```
File Organization Skill
├─ 知识：如何组织项目文件
├─ 规范：
│  ├─ 文件命名：使用小写字母和连字符
│  ├─ 目录结构：按照功能模块组织
│  ├─ 文档格式：使用 Markdown
│  └─ 注释规范：使用简体中文
└─ 作用：确保文件结构清晰规范
```

**结合使用：**

```
用户："创建商品评论功能的所有文件"

Claude 执行：
1. 分析需求
2. 加载 File Organization Skill
3. 按照 Skill 规范创建文件结构：
   ```
   src/
   ├── main/
   │   ├── java/
   │   │   └── com/
   │   │       └── mall/
   │   │           ├── controller/
   │   │           │   └── ProductCommentController.java
   │   │           ├── service/
   │   │           │   ├── ProductCommentService.java
   │   │           │   └── impl/
   │   │           │       └── ProductCommentServiceImpl.java
   │   │           ├── mapper/
   │   │           │   └── ProductCommentMapper.java
   │   │           └── entity/
   │   │               └── ProductComment.java
   │   └── resources/
   │       └── mapper/
   │           └── ProductCommentMapper.xml
   ```
4. 使用 File System MCP 创建文件
5. 按照 Skill 规范编写文件内容

结果：符合规范的功能文件 ✅
```

---

### 示例 3：外部 API 集成

**MCP：提供 API 连接**

```
API Gateway MCP
├─ 功能：连接外部 API
├─ 工具：
│  ├─ send_request()
│  └─ handle_response()
└─ 作用：调用外部 API
```

**Skills：提供 API 集成知识**

```
API Integration Skill
├─ 知识：如何正确集成外部 API
├─ 规范：
│  ├─ 请求重试机制
│  ├─ 错误处理策略
│  ├─ 响应解析方法
│  ├─ 安全认证方式
│  └─ 日志记录规范
└─ 作用：确保 API 集成稳定可靠
```

**结合使用：**

```
用户："集成第三方支付接口"

Claude 执行：
1. 分析需求
2. 加载 API Integration Skill
3. 按照 Skill 规范设计集成方案：
   ├─ 添加重试机制（最多 3 次）
   ├─ 实现错误处理（捕获异常、返回友好提示）
   ├─ 解析响应（验证签名、提取数据）
   ├─ 安全认证（使用 API Key）
   └─ 记录日志（请求、响应、错误）
4. 使用 API Gateway MCP 调用支付 API
5. 按照 Skill 规范处理响应

结果：稳定可靠的 API 集成 ✅
```

---

## 选择指南

### 何时使用 Skills

✅ **推荐使用 Skills 的情况：**

1. **项目管理**
   - 需要统一开发规范
   - 团队协作标准
   - 项目文档

2. **知识传递**
   - 最佳实践分享
   - 工作流程记录
   - 经验总结

3. **质量保证**
   - 代码规范
   - API 设计标准
   - 文档格式要求

4. **快速上手**
   - 新项目配置
   - 团队新人培训
   - 环境搭建指南

### 何时使用 MCP

✅ **推荐使用 MCP 的情况：**

1. **外部系统集成**
   - 连接数据库
   - 调用外部 API
   - 访问云服务

2. **工具扩展**
   - 文件系统操作
   - 版本控制集成
   - CI/CD 工具

3. **数据处理**
   - 数据库查询
   - 文件处理
   - 数据转换

4. **自动化任务**
   - 定时任务
   - 批量处理
   - 工作流自动化

### 何时同时使用两者

✅ **推荐同时使用的情况：**

1. **复杂自动化**
   - 需要外部访问 + 团队规范
   - 例如：在 Notion 中创建符合团队标准的 API 文档

2. **规范化集成**
   - 需要集成外部系统 + 遵循内部规范
   - 例如：按照团队标准集成第三方支付接口

3. **质量保证**
   - 需要访问外部数据 + 确保数据质量
   - 例如：查询数据库并按照规范生成报告

---

## 最佳实践

### 1. 明确职责划分

```
MCP 负责：
├─ 提供外部访问能力
├─ 执行具体操作
└─ 返回结果

Skills 负责：
├─ 定义操作规范
├─ 确保质量标准
└─ 指导正确使用
```

### 2. 保持独立性

```
MCP 工具：
└─ 不依赖特定 Skills
   └─ 任何项目都可以使用

Skills：
└─ 不依赖特定 MCP
   └─ 可以独立使用
```

### 3. 文档化配合

```
在 Skills 中说明：
├─ 需要哪些 MCP 工具
├─ 如何使用这些工具
└─ 使用时的注意事项

在 MCP 中说明：
├─ 提供了哪些工具
├─ 工具的参数和返回值
└─ 使用示例
```

---

## 相关主题

- **Skills 简介**：[[./skills-introduction/theme.md|了解 Claude Skills 的基本概念]]
- **Skills 工作原理**：[[./skills-mechanism/theme.md|了解加载机制和执行流程]]
- **Skills 核心特性**：[[./skills-features/theme.md|深入了解 Token 效率优化]]
- **Skills 实施方案**：[[./skills-implementation/theme.md|学习如何实施 Skills]]

---

## 总结

**Skills 和 MCP 的关系：**

| 方面 | Skills | MCP |
|------|--------|-----|
| **角色** | 教练（传授知识） | 工人（执行任务） |
| **价值** | 告诉"如何做" | 提供能力去做 |
| **定位** | 知识管理 | 功能扩展 |
| **互补** | ✅ 可以结合使用 | ✅ 可以结合使用 |

**核心要点：**

1. **Skills** 专注于知识管理和最佳实践传递
2. **MCP** 专注于功能扩展和外部系统集成
3. **两者结合**可以实现强大的自动化
4. **合理选择**：根据实际需求选择使用 Skills、MCP 或两者

**记住：**
- 需要传授规范？使用 Skills
- 需要访问外部？使用 MCP
- 需要两者？结合使用！
