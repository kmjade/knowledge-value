---
title: LLM 基础概念
created: 2026-05-27
source: "[[LLM-Tech]], [[00-MOCs/MOC-總覽]], [[00-MOCs/MOC-學習路徑]]"
tags: [topic/llm, para/resource/tech]
compiled: false
---

# LLM 基础概念

大语言模型（Large Language Model, LLM）是自然语言处理领域的重大突破。

## 核心特性

- **强大的语言理解与生成能力**
- **跨任务的泛化能力**
- **通过提示适应各种应用场景**

## 关键技术

### Transformer 架构
- 自注意力机制（Self-Attention）
- 编码器-解码器结构
- 位置编码

### 训练方法
- **预训练**: 大规模无监督学习
- **指令微调（Instruction Tuning）**: 基于指令数据优化
- **RLHF/DPO**: 人类反馈强化学习

### 提示工程
- Few-shot 学习
- Chain-of-Thought 思维链
- 结构化提示

## 主流模型系列

| 系列 | 代表模型 | 特点 |
|------|----------|------|
| GPT | GPT-4, GPT-4o | OpenAI，闭源 |
| Claude | Claude 3.5, Claude 4 | Anthropic，高效推理 |
| Llama | Llama 3 | Meta，开源 |
| DeepSeek | DeepSeek-V2/V3 | 国产，高性价比 |

## 应用场景

- 智能客服
- 内容生成
- 代码助手
- RAG 检索增强生成
- AI Agent
