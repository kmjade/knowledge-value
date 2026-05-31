# Skills 与 MCP 的区别 / Skills vs MCP

## 概述

理解 Claude Skills 和 MCP (Model Context Protocol) 的核心差异，以及它们如何互补使用。

---

## 核心差异对比

### 详细对比表

| 特性 | Skills | MCP (Model Context Protocol) |
|------|--------|----------------------------|
# 知識
# 知識
# 檔案
| **技术栈** | 纯文本（Markdown） | 需要编程（Python, Node.js, 等） |
| **加载机制** | 渐进式加载，按需激活 | 启动时加载所有工具定义 |
| **平台兼容性** | Web、桌面和 CLI 全平台支持 | 某些工具有平台限制 |
# 更新
# 知識
# 更新
# 網路
# 專案

# 分析

#### 1. 目的不同

# 管理

```
Skills 提供什么？
# 開發
# 工作流
├─ 最佳实践
├─ 团队标准
└─ 经验总结

示例：
└─ chinese-first-rule Skill
   └─ 教会 Claude 如何用简体中文交流
# 知識
```

**MCP：功能扩展**

```
MCP 提供什么？
# 連接
# 數據
# 系統
├─ 云服务集成
└─ 自定义工具

示例：
└─ Notion MCP Connector
   └─ 允许 Claude 访问 Notion API
# 知識
```

# 創建

# 創建

```
# 目錄
.claude/skills/my-skill/

步骤 2：编写 SKILL.md
# My Skill

这是我的自定义技能...

步骤 3：完成！

├─ 无需编程
├─ 无需服务器
# 更新
# 創建
```

**MCP：需要技术实现**

```
步骤 1：选择语言（Python, Node.js, 等）
步骤 2：编写服务器代码
步骤 3：实现 MCP 协议
# 部署
# 配置
# 測試
# 更新

# 知識
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

# 系統

```
MCP 工具示例：

1. Notion MCP Connector
# 連接
# 創建
# 數據

2. Database MCP Server
# 數據
# 查詢
# 查詢

3. File System MCP
# 系統
# 檔案
# 檔案
```

# 知識

Skills 教会 Claude 如何正确使用这些工具：

```
# 知識

1. Notion Workflow Skill
# 知識
# 標籤
   └─ 作用：确保 Notion 页面符合团队规范

2. Database Query Skill
# 知識
# 優化
# 查詢

3. File Organization Skill
# 知識
# 文檔
# 檔案
```

### 结合使用的威力

**MCP + Skills = 强大的自动化**

```
# 文檔

# 文檔

第 1 步：MCP 提供工具
├─ Notion MCP Connector
# 創建

# 知識
├─ Notion Workflow Skill
# 創建
├─ API Documentation Skill
# 文檔
└─ chinese-first-rule Skill
   └─ 知道所有内容必须使用简体中文

第 3 步：执行任务
# 創建
├─ 按照 Notion Workflow Skill 组织结构
├─ 按照 API Documentation Skill 填充内容
└─ 按照 chinese-first-rule Skill 使用中文

# 文檔
```

---

## 实际应用示例

# 數據

# 數據

```
Database MCP Server
# 數據
├─ 工具：execute_query()
# 查詢
```

# 知識

```
Database Query Skill
# 知識
├─ 规范：
# 查詢
# 新增
# 查詢
# 新增
# 查詢
```

**结合使用：**

```
# 查詢

Claude 执行：
# 分析
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
# 查詢
5. 返回结果

# 查詢
```

---

# 系統

# 檔案

```
File System MCP
# 系統
├─ 工具：
│  ├─ read_file()
│  ├─ write_file()
│  ├─ list_directory()
│  └─ search_files()
# 檔案
```

# 知識

```
File Organization Skill
# 知識
├─ 规范：
# 檔案
# 目錄
# 文檔
│  └─ 注释规范：使用简体中文
# 檔案
```

**结合使用：**

```
# 檔案

Claude 执行：
# 分析
2. 加载 File Organization Skill
# 檔案
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
# 檔案
# 檔案

# 檔案
```

---

### 示例 3：外部 API 集成

# 連接

```
API Gateway MCP
# 連接
├─ 工具：
│  ├─ send_request()
│  └─ handle_response()
└─ 作用：调用外部 API
```

# 知識

```
API Integration Skill
# 知識
├─ 规范：
│  ├─ 请求重试机制
│  ├─ 错误处理策略
# 方法
│  ├─ 安全认证方式
# 記錄
└─ 作用：确保 API 集成稳定可靠
```

**结合使用：**

```
用户："集成第三方支付接口"

Claude 执行：
# 分析
2. 加载 API Integration Skill
# 設計
# 新增
   ├─ 实现错误处理（捕获异常、返回友好提示）
# 數據
   ├─ 安全认证（使用 API Key）
# 記錄
4. 使用 API Gateway MCP 调用支付 API
5. 按照 Skill 规范处理响应

结果：稳定可靠的 API 集成 ✅
```

---

# 指南

### 何时使用 Skills

✅ **推荐使用 Skills 的情况：**

# 專案
# 開發
   - 团队协作标准
# 專案

# 知識
# 分享
# 工作流
   - 经验总结

3. **质量保证**
   - 代码规范
# 設計
# 文檔

4. **快速上手**
# 專案
   - 团队新人培训
# 指南

### 何时使用 MCP

✅ **推荐使用 MCP 的情况：**

# 系統
# 數據
   - 调用外部 API
   - 访问云服务

2. **工具扩展**
# 系統
# 版本
   - CI/CD 工具

# 數據
# 查詢
# 檔案
# 數據

4. **自动化任务**
   - 定时任务
   - 批量处理
# 工作流

### 何时同时使用两者

✅ **推荐同时使用的情况：**

1. **复杂自动化**
   - 需要外部访问 + 团队规范
# 文檔

2. **规范化集成**
# 系統
   - 例如：按照团队标准集成第三方支付接口

3. **质量保证**
# 數據
# 查詢

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
# 專案

Skills：
└─ 不依赖特定 MCP
   └─ 可以独立使用
```

# 文檔

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
# 效率
- **Skills 实施方案**：[[./skills-implementation/theme.md|學習如何实施 Skills]]

---

## 总结

**Skills 和 MCP 的关系：**

| 方面 | Skills | MCP |
|------|--------|-----|
# 知識
| **价值** | 告诉"如何做" | 提供能力去做 |
# 管理
| **互补** | ✅ 可以结合使用 | ✅ 可以结合使用 |

**核心要点：**

# 管理
# 系統
3. **两者结合**可以实现强大的自动化
4. **合理选择**：根据实际需求选择使用 Skills、MCP 或两者

**记住：**
- 需要传授规范？使用 Skills
- 需要访问外部？使用 MCP
- 需要两者？结合使用！
