---
aliases:
  - RAG
  - Retrieval-Augmented Generation
  - 检索增强生成
created: 2026-05-28
type: concept
topic: knowledge-systems
status: reviewed
sources:
  - "[[3 Resources/000 Knowledge/ram/Knowledge-Systems/08-AI与知识系统/08-AI与知识系统.md]]"
---

# Retrieval-Augmented Generation (RAG)

## 定义

RAG (检索增强生成) 是一种将信息检索与 LLM 生成相结合的架构——先检索知识库中的相关事实，再让 LLM 基于检索结果生成带引用的回答，从而减少幻觉、提升可信度。

> 来源: [[3 Resources/000 Knowledge/ram/Knowledge-Systems/08-AI与知识系统/08-AI与知识系统.md|08-AI 与知识系统]]

## 核心原理

### LLM vs 知识图谱

| 维度 | LLM | 知识图谱 |
|------|-----|----------|
| 知识存储 | 模型参数 (隐式) | 三元组 (显式) |
| 更新方式 | 重训练 | 实时添加 |
| 推理方式 | 统计 | 逻辑 |
| 可解释性 | 弱 | 强 |
| 幻觉风险 | 有 | 无 |

> **趋势**: LLM + KG = RAG——检索知识图谱中的事实，LLM 生成自然语言回答。

### RAG 工作流

```
用户提问 → 检索相关文档/图谱 → 拼入 Prompt → LLM 生成 → 带引用回答
```

### 向量数据库 — 新型知识系统

| 数据库 | 特点 | 许可 |
|--------|------|------|
| **Pinecone** | 商业、全托管 | 闭源 |
| **Chroma** | 轻量、开源 | Apache 2.0 |
| **Weaviate** | 开源、GraphQL 接口 | BSD-3 |
| **Milvus** | 中国开源、高性能 | Apache 2.0 |

> 向量数据库是"非结构化的索引"——不靠分类号，靠语义相似度。

## 关键要点

1. RAG 是 2024-2026 AI 应用的核心架构
2. LLM 负责"表达"，KG 负责"事实"——两者互补
3. 向量数据库让非结构化文本也能被语义检索
4. 本 Vault 的 Claudian Agent + wiki 知识库 = RAG 的个人版实现
5. 关键挑战: 检索质量决定 RAG 效果上限

## 相关概念

- [[Knowledge-Graph]] - KG 作为 RAG 的事实基础
- [[Knowledge-Organization-Systems]] - RAG 是现代 KOS 的演进方向
- [[PKM]] - RAG 在个人知识管理中的应用

## Sources

- [[3 Resources/000 Knowledge/ram/Knowledge-Systems/08-AI与知识系统/08-AI与知识系统.md]]
