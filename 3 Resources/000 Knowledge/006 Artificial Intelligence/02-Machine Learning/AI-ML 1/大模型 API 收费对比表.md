---
title: 大模型 API 收费对比表
tags: [AI-ML/pricing, resources/comparison]
created: 2026-05-25
updated: 2026-05-25
aliases: [LLM Pricing Comparison, 大模型价格对比, AI模型收费表]
---

# 大模型 API 收费对比表

> **数据来源**：DeepSeek 来自官方 API 文档（2026-05-25 确认）；其他来自全网综合数据，标注「~」为近似值。
> 所有价格单位为 **美元/百万 tokens**（$ / 1M tokens）。

## 核心模型对比

| 厂商 | 模型 | 输入价格 | 缓存命中 | 输出价格 | 上下文 | 备注 |
|------|------|----------|----------|----------|--------|------|
| **DeepSeek** | V4-Flash | $0.14 | $0.0028 | $0.28 | 1M | 极低价格，极高性价比 ✅ |
| **DeepSeek** | V4-Pro | ~~$1.74~~ **$0.435** | ~~$0.0145~~ **$0.0036** | ~~$3.48~~ **$0.87** | 1M | 75%折扣至 2026/5/31 ✅ |
| **DeepSeek** | V4-Pro (折扣后) | $1.74 | $0.0145 | $3.48 | 1M | 折扣结束后恢复 |
| **OpenAI** | GPT-4o | ~$2.50 | ~$1.25 | ~$10.00 | 128K | 多模态旗舰 |
| **OpenAI** | GPT-4o-mini | ~$0.15 | ~$0.075 | ~$0.60 | 128K | 轻量多模态 |
| **OpenAI** | GPT-4.1 | ~$2.00 | ~$1.00 | ~$8.00 | 1M | 最新旗舰 |
| **OpenAI** | GPT-4.1-mini | ~$0.40 | ~$0.10 | ~$1.60 | 1M | 性价比路线 |
| **OpenAI** | GPT-4.1-nano | ~$0.10 | ~$0.025 | ~$0.40 | 1M | 最轻量 |
| **OpenAI** | o3 / o3-mini | ~$1.10 | — | ~$4.40 | 200K | 推理模型 |
| **OpenAI** | o4-mini | ~$1.10 | — | ~$4.40 | 200K | 最新推理 |
| **Anthropic** | Claude Opus 4 | ~$15.00 | ~$3.75 | ~$75.00 | 200K | 最强智能 |
| **Anthropic** | Claude Sonnet 4 | ~$3.00 | ~$0.75 | ~$15.00 | 200K | 平衡之选 |
| **Anthropic** | Claude Haiku 3.5 | ~$0.80 | ~$0.20 | ~$4.00 | 200K | 快速轻量 |
| **Google** | Gemini 2.5 Pro | ~$1.25 | ~$0.31 | ~$5.00 | 1M | 百万上下文 |
| **Google** | Gemini 2.5 Flash | ~$0.15 | ~$0.04 | ~$0.60 | 1M | 高性价比 |
| **Google** | Gemini 2.0 Flash | ~$0.10 | ~$0.025 | ~$0.40 | 1M | 免费额度 |
| **xAI** | Grok-3 | ~$3.00 | — | ~$15.00 | 1M | 实时数据 |
| **Mistral** | Mistral Large | ~$2.00 | — | ~$6.00 | 128K | 开源友好 |
| **Mistral** | Mistral Small | ~$0.20 | — | ~$0.60 | 32K | 轻量选择 |
| **Meta** | Llama 4 (via Groq) | ~$0.20 | — | ~$0.80 | 128K | 开源模型 |

> ✅ = 官方文档确认价格  │  ~ = 近似值，可能已变化

---

## 性价比排行榜 (输出价格)

| 排名 | 模型 | 输入 | 输出 | 性价比评级 |
|------|------|------|------|------------|
| 1 | DeepSeek V4-Flash | $0.14 | $0.28 | ⭐⭐⭐⭐⭐ |
| 2 | GPT-4.1-nano | ~$0.10 | ~$0.40 | ⭐⭐⭐⭐⭐ |
| 3 | Gemini 2.0 Flash | ~$0.10 | ~$0.40 | ⭐⭐⭐⭐⭐ |
| 4 | GPT-4o-mini | ~$0.15 | ~$0.60 | ⭐⭐⭐⭐ |
| 5 | Gemini 2.5 Flash | ~$0.15 | ~$0.60 | ⭐⭐⭐⭐ |
| 6 | Mistral Small | ~$0.20 | ~$0.60 | ⭐⭐⭐⭐ |
| 7 | DeepSeek V4-Pro (折扣) | $0.435 | $0.87 | ⭐⭐⭐⭐ |
| 8 | Claude Haiku 3.5 | ~$0.80 | ~$4.00 | ⭐⭐⭐ |
| 9 | GPT-4.1-mini | ~$0.40 | ~$1.60 | ⭐⭐⭐ |
| 10 | GPT-4.1 | ~$2.00 | ~$8.00 | ⭐⭐⭐ |
| 11 | Claude Sonnet 4 | ~$3.00 | ~$15.00 | ⭐⭐ |
| 12 | Claude Opus 4 | ~$15.00 | ~$75.00 | ⭐ |

---

## 推理模型专项对比

用于数学、编程等复杂推理任务：

| 厂商 | 模型 | 输入 | 输出 | 特点 |
|------|------|------|------|------|
| OpenAI | o4-mini | ~$1.10 | ~$4.40 | 最新推理 |
| OpenAI | o3-mini | ~$1.10 | ~$4.40 | 性价比推理 |
| DeepSeek | V4-Pro (思考模式) | $0.435 | $0.87 | 内置思考 |
| DeepSeek | V4-Flash (思考模式) | $0.14 | $0.28 | 轻量思考 |

---

## 价格速算参考

以 **1M 输出 tokens** ≈ 750 个英文单词 / 500 个中文字为例：

| 使用 DeepSeek V4-Flash | 使用 GPT-4o | 使用 Claude Sonnet |
|---|---|---|
| $0.28 / 百万输出 | ~$10 / 百万输出 | ~$15 / 百万输出 |
| **相差 35-50 倍** | | |

---

## 数据来源

- **DeepSeek**：https://api-docs.deepseek.com/quick_start/pricing （2026-05-25 实测）
- **OpenAI**：https://openai.com/api/pricing/
- **Anthropic**：https://docs.anthropic.com/en/docs/about-claude/pricing
- **Google**：https://ai.google.dev/gemini-api/docs/pricing
- **xAI**：https://x.ai/api
- **Mistral**：https://mistral.ai/technology/#pricing

> ⚠️ 标注「~」的价格基于训练数据记忆，建议访问官方页面确认最新定价。DeepSeek V4-Flash/Pro 价格为官方文档实时获取，准确可靠。

---

## 相关笔记

- [[Hermes-Agent 知识库]]
- [[Gemini]]
- [[DeepSeek API 文档]]
