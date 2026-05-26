# Wiki-Compile Skill - 知识编译引擎

将 `raw/` 目录下的原始资料编译成结构化的 Wiki 知识库。

## 使用方式

```
/wiki-compile              # 编译所有子库
/wiki-compile ai-ml        # 编译指定子库
/wiki-compile --dry-run    # 仅预览，不执行
/wiki-compile --incremental  # 仅处理新增/修改的文件
```

## 核心理念

> AI 是"编译器"，不是对话伙伴。它的职责是将原始信息转换为结构化知识。

## 执行流程

### 1. 扫描阶段
扫描指定 Wiki 子库的 `raw/` 目录：
```
3 Resources/[topic]/raw/
├── articles/      # 文章摘录
├── papers/        # 论文笔记
├── books/         # 书籍笔记
└── conversations/ # 对话记录
```

识别未编译的文件（没有 `compiled: true` frontmatter）。

### 2. 提取阶段
对每个原始文件执行：

#### 概念提取
- 识别核心概念和定义
- 提取概念之间的关系
- 识别概念在不同上下文中的应用

#### 实体提取
- 识别关键实体（人名、组织、工具、产品等）
- 提取实体属性
- 识别实体之间的关系

#### 关系提取
- 概念-概念关系（is-a, part-of, related-to）
- 概念-实体关系（implements, uses, created-by）
- 实体-实体关系（collaborates-with, competes-with）

### 3. 编译阶段
在 `wiki/` 目录下创建/更新页面：

```
wiki/
├── index.md       # 更新知识索引
├── log.md         # 记录编译日志
├── concepts/      # 概念页面
│   └── [concept-name].md
├── entities/      # 实体页面
│   └── [entity-name].md
└── sources/       # 来源溯源
    └── [source-name].md
```

### 4. 索引更新
更新 `wiki/index.md`:
- 概念统计
- 实体统计
- 最近更新列表
- 概念分类索引

### 5. 日志记录
更新 `wiki/log.md` 和 `AI-Log/compile-log.md`:

```markdown
## YYYY-MM-DD HH:MM

### 编译: [topic]
- 源文件: 5
- 新概念: 12
- 新实体: 3
- 更新页面: 8
- 耗时: 30s
```

## 编译规则

### 规则 1: raw/ 只读
AI 永远不修改 `raw/` 目录下的文件。
- 原始资料是人类维护的
- AI 只读取和编译

### 规则 2: wiki/ AI 独占
`wiki/` 目录完全由 AI 维护。
- 人类不应直接编辑 wiki/ 下的文件
- 所有更新通过重新编译完成

### 规则 3: Sources 必须标注
每个 wiki 页面必须包含 `Sources` 部分：
```markdown
## Sources
- [[raw/articles/article-name.md]]
- [[raw/papers/paper-name.md]]
```

### 规则 4: 增量更新
优先更新现有页面，而非创建新页面：
- 检查概念是否已存在
- 合并信息，避免重复
- 保留现有链接

### 规则 5: 链接优先
使用 `[[]]` 建立知识连接：
- 概念之间的链接
- 实体之间的链接
- 概念与实体的链接
- 指向原始资料的链接

## 页面模板

### 概念页面
```markdown
---
aliases:
  - [别名1]
  - [别名2]
created: YYYY-MM-DD
type: concept
topic: [topic]
---

# [概念名称]

## 定义
[一句话定义，来自哪个来源]

## 核心原理
[详细解释]

## 关键要点
1. [要点1]
2. [要点2]

## 相关概念
- [[concept-1]] - [关系描述]
- [[concept-2]] - [关系描述]

## 实践应用
[具体案例]

## 参考资源
- [[entity-1]] - [相关工具/产品]

## Sources
- [[raw/path/to/source.md]]
```

### 实体页面
```markdown
---
aliases:
  - [别名]
created: YYYY-MM-DD
type: entity
entity_type: tool/person/company/paper
topic: [topic]
---

# [实体名称]

## 基本信息
- 类型: [类型]
- 创建时间: [时间]
- 状态: active/archived

## 描述
[详细描述]

## 核心特征
- [特征1]
- [特征2]

## 相关概念
- [[concept-1]] - [关系]
- [[concept-2]] - [关系]

## 相关实体
- [[entity-1]] - [关系]

## Sources
- [[raw/path/to/source.md]]
```

## 示例输出

```
🔨 Wiki Compile Report - ai-ml

📂 扫描目录: 3 Resources/ai-ml/raw/
- articles: 5 文件 (2 未编译)
- papers: 3 文件 (1 未编译)
- books: 2 文件 (0 未编译)
- conversations: 8 文件 (5 未编译)

🔍 提取结果:
- 新概念: 8
  - RAG (Retrieval-Augmented Generation)
  - Context Window
  - Tokenization
  - ...
- 新实体: 3
  - Claude 3.5 Sonnet
  - GPT-4o
  - Llama 3

📝 编译完成:
- 创建页面: 11
- 更新页面: 5
- 更新索引: ✓
- 记录日志: ✓

⏱️ 耗时: 45s
✅ 状态: 成功
```

## 子库 Schema 参考

每个子库有自己的 `CLAUDE.md` 定义：
- [[../../3 Resources/ai-ml/CLAUDE.md|ai-ml schema]]
- [[../../3 Resources/people/CLAUDE.md|people schema]]
- [[../../3 Resources/finance/CLAUDE.md|finance schema]]
- [[../../3 Resources/productivity/CLAUDE.md|productivity schema]]

## 注意事项

1. **保持原子性**: 每个概念页面只描述一个概念
2. **避免冗余**: 相同信息只记录一次，其他地方用链接
3. **保持溯源**: 所有信息必须有来源标注
4. **定期回顾**: 定期检查 wiki/ 的质量和完整性

