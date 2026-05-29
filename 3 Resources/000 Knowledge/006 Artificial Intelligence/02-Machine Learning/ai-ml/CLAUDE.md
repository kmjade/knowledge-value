---
aliases:
  - AI/ML Wiki
  - AI Knowledge Base
created: 2026-05-26
type: wiki-schema
topic: ai-ml
---

# AI/ML Wiki Schema

AI 与机器学习知识库，采用 LLM-Wiki 方法论组织。

## 目录结构

```
ai-ml/
├── CLAUDE.md          # 本文件 - 子库 schema
├── raw/               # 原始资料（人类维护，AI 只读）
│   ├── articles/      # 文章摘录
│   ├── papers/        # 论文笔记
│   ├── books/         # 书籍笔记
│   └── conversations/ # 对话记录
├── wiki/              # LLM 编译产物（AI 独占写入）
│   ├── index.md       # 知识索引
│   ├── log.md         # 编译日志
│   ├── concepts/      # 概念页面
│   ├── entities/      # 实体页面
│   └── sources/       # 来源溯源
└── outputs/           # 基于 Wiki 生成的制品
```

## 核心概念域

### 基础概念
- Machine Learning 基础
- Deep Learning 原理
- Neural Networks 架构
- Training & Optimization

### LLM 特化
- Transformer 架构
- Attention 机制
- Tokenization
- Prompt Engineering
- Fine-tuning 方法
- RAG (检索增强生成)

### 实践应用
- Agent 系统
- Tool Use
- Context Management
- Evaluation Methods

## 页面模板

### 概念页面
```markdown
# [概念名称]

## 定义
[一句话定义]

## 核心原理
[详细解释]

## 相关概念
- [[related-concept-1]]
- [[related-concept-2]]

## 实践应用
[具体案例]

## Sources
- [[source-file-name]]
```

### 实体页面
```markdown
# [实体名称]

## 基本信息
- 类型: paper/model/person/company
- 创建时间: YYYY-MM-DD
- 状态: active/archived

## 描述
[详细描述]

## 关联
- [[related-concept-1]]
- [[related-entity-1]]

## Sources
- [[source-file-name]]
```

## 编译规则

1. **raw/ 只读**: AI 不修改原始资料
2. **sources 必须**: 所有 wiki 页面必须标注来源
3. **增量更新**: 优先更新现有页面，而非创建新页面
4. **链接优先**: 使用 `[[]]` 建立知识连接

## 使用命令

- `/wiki-compile ai-ml` - 编译此知识库
- `/triage` - 将新资料分拣到 raw/

