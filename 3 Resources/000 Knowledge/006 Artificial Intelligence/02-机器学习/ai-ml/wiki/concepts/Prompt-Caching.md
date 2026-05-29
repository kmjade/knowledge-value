---
aliases:
  - Prompt 缓存
created: 2026-05-27
type: concept
topic: ai-ml
---

# Prompt 缓存

Prompt 缓存（Prompt Caching）是一种 LLM API 优化机制——重复使用的 system prompt 在首次调用后会以大幅折扣价格计费。

## 工作原理

- 首次调用正常计费，缓存未命中
- 后续相同或相似 prompt 命中缓存，仅按缓存命中价计费
- 适用场景：固定 system prompt、重复上下文、Agent 多轮对话

## 各厂商缓存定价

| 厂商 | 缓存命中输入价 | 降低幅度 |
|------|---------------|---------|
| Anthropic | 缓存后降低 90% | 约 1/10 |
| OpenAI | 缓存命中输入约 $0.50/M | 约 1/10 |
| DeepSeek V4 Flash | $0.0028/M | - |
| Xiaomi MiMo | 公开区分缓存命中价 | - |

## 实际影响

- 对于反复发送仓库上下文的 Coding Agent，缓存命中价更接近真实账单
- Agent 场景下缓存收益最大（固定系统提示 + 频繁的上下文重复）

## 相关概念
- [[LLM-Pricing-Model]] - LLM 定价模型

## Sources
- [[3 Resources/000 Knowledge/Computer-Science/Artificial-Intelligence/02-机器学习/ai-ml/raw/articles/2026 大模型 API 价格对比（5月更新）：40+ 模型一表看清]]
