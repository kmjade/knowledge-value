# Skills 核心特性 / Skills Core Features

## 概述

深入了解 Claude Skills 的核心特性，包括 Token 效率优化、知识注入方法、一致性和速度优势。

---

## 1. Token 效率优化

### 惰性加载机制（Lazy Loading）

Claude Skills 采用惰性加载机制，最大化 Token 效率：

```
传统方式（CLAUDE.md）:
每次对话加载全部内容
├─ 25,000 tokens 固定消耗
├─ 无论任务类型
├─ 无论需要与否
└─ 资源浪费严重

Skills 方式:
按需渐进式加载
├─ 只加载相关内容
├─ 平均 7,000 tokens
├─ 根据任务动态调整
└─ 节省 72% Token
```

### 加载策略

#### 初始阶段（First Phase）

**Claude 初始时仅看到技能名称和描述：**

```
.claude/skills/
├── chinese-first-rule/
│   └── SKILL.md
│       ├── 名称：中文优先规范
│       ├── 描述：强制所有交流使用简体中文
│       └── 简短摘要
│
├── context-retrieval-checklist/
│   └── SKILL.md
│       ├── 名称：上下文检索强制清单
│       ├── 描述：7步强制检索流程
│       └── 简短摘要
│
└── ...

初始加载：只读取名称和描述（约 500 tokens）
完整内容：仅在需要时加载
```

#### 按需加载（On-Demand Loading）

**完整内容仅在与当前任务相关时加载：**

```
场景：编写 README 文档

加载的 Skills:
✅ chinese-first-rule（完整内容 200 行）

未加载的 Skills:
❌ context-retrieval-checklist（不相关）
❌ five-stage-workflow（不相关）
❌ mandatory-verification（不相关）
❌ mall-crud-generator（不相关）
...

Token 消耗：约 2,000 tokens（节省 92%）
```

#### 部分加载（Partial Loading）

**大型 Skill 可以部分加载：**

```
mall-api-development Skill（645 行）

第 1 轮：加载摘要和核心原则（约 100 行）
第 2 轮：如果需要，加载 API 设计规范（约 300 行）
第 3 轮：如果需要，加载错误处理标准（约 100 行）
第 4 轮：如果需要，加载其他部分（约 145 行）

总消耗：根据需要逐步加载，不是一次性加载全部
```

### 渐进式披露（Progressive Disclosure）

**通过"渐进式披露"防止上下文窗口过载：**

```
传统方式：
一次性加载全部
└─ 628 行 × 所有内容
    └─ 上下文过载

渐进式披露：
分批加载
├─ 第 1 批：高相关性（约 1,000 tokens）
├─ 第 2 批：中相关性（约 500 tokens，按需）
└─ 第 3 批：低相关性（约 200 tokens，按需）

总消耗：根据实际需要动态调整
```

### 未使用的 Skills 不消耗 Token

**重要原则：未使用的 skills 不消耗对话 token**

```
假设有 8 个 Skills，每个平均 400 行（约 15,000 tokens）

使用传统方式：
每次对话：8 × 15,000 = 120,000 tokens ❌

使用 Skills 方式（仅加载 2 个相关 Skills）：
每次对话：2 × 15,000 = 30,000 tokens ✅
节省：75%
```

---

## 2. 知识注入方法

### 多种注入方式

Skills 通过多种方式将知识注入到 Claude 中：

| 方法 | 说明 | 用途 | 示例 |
|------|------|------|------|
| **直接专业知识** | 嵌入在 SKILL.md 文件中 | 核心流程和最佳实践 | API 设计规范、代码质量标准 |
| **操作一致性** | 确保跨交互的稳定质量 | 标准化输出 | 语言规范、命名规范 |
| **参考文档** | 存储在专用目录中 | 按需访问的详细材料 | 技术文档、设计模式说明 |
| **模板资产** | 位于指定文件夹内 | 可重用的模板和资源 | 代码模板、文档模板 |

### 详细说明

#### 方法 1：直接专业知识（Direct Expertise）

**嵌入在 SKILL.md 文件中：**

```markdown
# mall-api-development/SKILL.md

## API 设计原则

### RESTful 标准

所有 API 必须遵循 RESTful 标准：

#### 1. 资源命名

- 使用名词，不是动词
- 使用复数形式
- 使用小写字母和连字符

✅ 正确示例：
GET /api/v1/products
POST /api/v1/orders
PUT /api/v1/users/123

❌ 错误示例：
GET /api/v1/getProducts
POST /api/v1/createOrder
PUT /api/v1/updateUser/123

#### 2. HTTP 方法使用

| HTTP 方法 | 用途 | 幂等性 |
|-----------|------|--------|
| GET | 获取资源 | 是 |
| POST | 创建资源 | 否 |
| PUT | 更新资源（完整） | 是 |
| PATCH | 更新资源（部分） | 否 |
| DELETE | 删除资源 | 是 |
```

**特点：**
- ✅ 直接、清晰
- ✅ Claude 立即可用
- ✅ 适合核心流程和标准

#### 方法 2：操作一致性（Operational Consistency）

**确保跨交互的稳定质量：**

```markdown
# chinese-first-rule/SKILL.md

## 语言规范（绝对强制）

### 基本规则

**所有交流、文档、注释必须使用简体中文**

#### 1. 用户交流

✅ 正确：
"我理解您的需求，现在开始分析代码..."

❌ 错误：
"I understand your requirements. Now I'll analyze the code..."

#### 2. 代码注释

```java
// ✅ 正确
/**
 * 创建订单服务
 * @param orderDTO 订单数据传输对象
 * @return 创建的订单ID
 */
public Long createOrder(OrderDTO orderDTO) {
    // ...
}

// ❌ 错误
/**
 * Create order service
 * @param orderDTO Order data transfer object
 * @return Created order ID
 */
public Long createOrder(OrderDTO orderDTO) {
    // ...
}
```

#### 3. 文档编写

✅ 正确：
```markdown
# API 文档

## 接口说明

创建商品评论接口，允许用户对购买的商品进行评价。
```

❌ 错误：
```markdown
# API Documentation

## Interface Description

Create product comment interface, allowing users to review purchased products.
```
```

**特点：**
- ✅ 强制一致性
- ✅ 标准化输出
- ✅ 适合所有任务

#### 方法 3：参考文档（Reference Documentation）

**存储在专用目录中，按需访问：**

```
.claude/skills/mall-api-development/
├── SKILL.md              # 主要技能文件
├── reference/
│   ├── restful-api-guide.md      # RESTful API 指南
│   ├── http-status-codes.md      # HTTP 状态码参考
│   ├── api-versioning.md        # API 版本控制策略
│   └── authentication.md        # 认证机制说明
└── examples/
    └── api-examples.md          # API 示例代码
```

**SKILL.md 中引用参考文档：**

```markdown
# mall-api-development/SKILL.md

## API 设计规范

### 核心 API 设计

参考：[[reference/restful-api-guide.md]]

### HTTP 状态码使用

参考：[[reference/http-status-codes.md]]

### API 版本控制

参考：[[reference/api-versioning.md]]

### 认证机制

参考：[[reference/authentication.md]]
```

**特点：**
- ✅ 详细但不占用主空间
- ✅ 按需加载
- ✅ 适合详细材料和扩展内容

#### 方法 4：模板资产（Template Assets）

**位于指定文件夹内，提供可重用模板：**

```
.claude/skills/mall-crud-generator/
├── SKILL.md              # 主要技能文件
├── templates/
│   ├── entity.java.template         # Entity 模板
│   ├── mapper.java.template        # Mapper 模板
│   ├── service.java.template       # Service 模板
│   ├── service-impl.java.template # ServiceImpl 模板
│   └── controller.java.template   # Controller 模板
└── examples/
    └── generated-examples.md     # 生成示例
```

**SKILL.md 中使用模板：**

```markdown
# mall-crud-generator/SKILL.md

## CRUD 代码生成

### 生成流程

1. 分析需求
2. 选择模板：[[templates/entity.java.template]]
3. 填充模板参数
4. 生成代码

### 模板说明

- **Entity 模板**：[[templates/entity.java.template]]
- **Mapper 模板**：[[templates/mapper.java.template]]
- **Service 模板**：[[templates/service.java.template]]
- **ServiceImpl 模板**：[[templates/service-impl.java.template]]
- **Controller 模板**：[[templates/controller.java.template]]

### 使用示例

参考：[[examples/generated-examples.md]]
```

**特点：**
- ✅ 可重用
- ✅ 标准化输出
- ✅ 适合代码模板和文档模板

---

## 3. 一致性和速度

### 一致的执行（Consistent Execution）

**按照预定义的工作流程和标准执行任务：**

```
传统方式（无 Skills）:
每次对话都可能有不同的执行方式
├─ 第 1 次：使用方法 A
├─ 第 2 次：使用方法 B
├─ 第 3 次：使用方法 C
└─ 输出不一致 ❌

Skills 方式:
所有任务都按照 Skill 中的标准执行
├─ 第 1 次：使用标准方法
├─ 第 2 次：使用标准方法
├─ 第 3 次：使用标准方法
└─ 输出一致 ✅
```

**实际示例：**

```java
// Skill 定义：所有实体必须有 created_by 和 updated_by

// 第 1 次生成
@Entity
@Table(name = "product")
public class Product {
    @Column(name = "created_by")
    private Long createdBy;  // ✅ 符合规范

    @Column(name = "updated_by")
    private Long updatedBy;  // ✅ 符合规范
}

// 第 2 次生成
@Entity
@Table(name = "order")
public class Order {
    @Column(name = "created_by")
    private Long createdBy;  // ✅ 符合规范

    @Column(name = "updated_by")
    private Long updatedBy;  // ✅ 符合规范
}

// 第 100 次生成
@Entity
@Table(name = "comment")
public class Comment {
    @Column(name = "created_by")
    private Long createdBy;  // ✅ 符合规范

    @Column(name = "updated_by")
    private Long updatedBy;  // ✅ 符合规范
}
```

### 提升速度（Speed Improvement）

**通过预加载的知识减少思考时间：**

```
传统方式:
1. 接收任务
2. 思考如何执行
3. 查找相关规范
4. 分析最佳实践
5. 执行任务
   └─ 耗时：较长 ❌

Skills 方式:
1. 接收任务
2. 加载相关 Skills（已包含最佳实践）
3. 直接执行任务
   └─ 耗时：较短 ✅
```

**速度提升原因：**

| 原因 | 说明 | 效果 |
|------|------|------|
| **预加载知识** | Skills 包含最佳实践和标准 | 减少查找时间 |
| **标准流程** | 预定义的工作流程 | 减少思考时间 |
| **一致输出** | 已知的标准和规范 | 减少验证时间 |
| **按需加载** | 只加载必要内容 | 减少加载时间 |

**实际效果：**

```
任务：创建商品评论功能

传统方式：
├─ 思考：如何设计 API？
├─ 查找：项目规范在哪里？
├─ 分析：需要考虑哪些方面？
├─ 执行：开始编码...
└─ 总耗时：较长

Skills 方式：
├─ 加载：mall-api-development Skill（已知 API 设计标准）
├─ 应用：直接按照标准设计 API
├─ 加载：mall-multi-tenant Skill（已知多租户隔离标准）
├─ 应用：直接按照标准实现隔离
├─ 加载：mall-crud-generator Skill（已知 CRUD 生成规则）
├─ 应用：直接按照规则生成代码
└─ 总耗时：较短（节省 60% 以上）
```

### 质量保证（Quality Assurance）

**确保输出符合组织或个人标准：**

```
质量保证机制：

1. 语言规范
   └─ 所有输出使用简体中文 ✅

2. 代码规范
   └─ 符合项目编码标准 ✅

3. API 规范
   └─ 遵循 RESTful 标准 ✅

4. 多租户规范
   └─ 正确实现租户隔离 ✅

5. 文档规范
   └─ 包含必要的使用说明 ✅

结果：所有输出都符合标准 ✅
```

**实际示例：**

```java
// 输出：符合所有规范的代码

@Service
public class ProductCommentService {

    /**
     * 创建商品评论
     * 符合规范：
     * 1. 简体中文注释 ✅
     * 2. 标准命名 ✅
     * 3. 多租户隔离 ✅
     * 4. 完整文档 ✅
     */
    public Long createComment(ProductCommentDTO dto) {
        // 1. 验证租户权限
        validateTenantPermission(dto.getTenantId());

        // 2. 业务逻辑处理
        ProductComment comment = new ProductComment();
        comment.setProductId(dto.getProductId());
        comment.setUserId(dto.getUserId());
        comment.setContent(dto.getContent());
        comment.setTenantId(dto.getTenantId());

        // 3. 保存数据
        productCommentMapper.insert(comment);

        // 4. 返回结果
        return comment.getId();
    }
}
```

---

## Token 消耗对比

### 详细对比表

| 场景 | 传统 CLAUDE.md | Skills 方案 | 节省比例 |
|------|---------------|-------------|----------|
| 简单文档编写 | 25,000 tokens | 2,000 tokens | **92%** |
| 功能开发 | 25,000 tokens | 12,000 tokens | **52%** |
| 代码审查 | 25,000 tokens | 6,500 tokens | **74%** |
| Bug 修复 | 25,000 tokens | 8,000 tokens | **68%** |
| **平均消耗** | **25,000 tokens** | **约 7,000 tokens** | **约 72%** |

### 每日成本对比

**假设每日 50 次对话：**

```
传统方式：
50 次 × 25,000 tokens = 1,250,000 tokens/天 ❌

Skills 方案：
50 次 × 7,000 tokens = 350,000 tokens/天 ✅

每日节省：900,000 tokens
每月节省：27,000,000 tokens
```

---

## 相关主题

- **Skills 简介**：[[./skills-introduction/theme.md|了解 Claude Skills 的基本概念]]
- **Skills 工作原理**：[[./skills-mechanism/theme.md|了解加载机制和执行流程]]
- **Skills vs MCP**：[[./skills-vs-mcp/theme.md|比较 Skills 和 MCP 的区别]]
- **Skills 实施方案**：[[./skills-implementation/theme.md|学习如何实施 Skills]]
- **Skills 优化效果**：[[./skills-optimization/theme.md|Token 消耗对比和实际收益]]

---

## 总结

Claude Skills 的核心特性：

### 1. Token 效率优化
- ✅ 惰性加载机制
- ✅ 渐进式披露
- ✅ 按需加载
- ✅ 节省 72% Token

### 2. 知识注入方法
- ✅ 直接专业知识
- ✅ 操作一致性
- ✅ 参考文档
- ✅ 模板资产

### 3. 一致性和速度
- ✅ 一致的执行
- ✅ 提升速度（60% 以上）
- ✅ 质量保证
- ✅ 标准化输出

这些特性共同构成了 Skills 强大的知识管理能力，既节省了 Token，又提升了效率和质量。
