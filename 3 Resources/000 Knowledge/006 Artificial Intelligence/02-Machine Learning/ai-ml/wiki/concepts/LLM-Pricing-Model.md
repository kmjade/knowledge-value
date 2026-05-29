---
aliases:
  - LLM 定价
  - LLM 价格
created: 2026-05-27
type: concept
topic: ai-ml
---

# LLM 定价模型

LLM 厂商按 token 计费，定价分为输入（Input）和输出（Output）两个维度，并分为旗舰级/中端/经济型三个层级。

## 定价层级

### 旗舰级
| 模型 | 输入价 ($/M) | 输出价 ($/M) |
|------|-------------|-------------|
| GPT-5.5 | $5.00 | $30.00 |
| Claude Opus 4.6 | $5.00 | $25.00 |
| Gemini 3.1 Pro | $2.00 | $12.00 |

### 中端（最佳性价比）
| 模型 | 输入价 ($/M) | 输出价 ($/M) |
|------|-------------|-------------|
| Claude Sonnet 4.6 | $3.00 | $15.00 |
| GPT-5.2-Codex | $1.75 | $14.00 |
| Gemini 3.5 Flash | $1.50 | $9.00 |
| DeepSeek V4 Pro | $0.435 | $0.87 |

### 经济型（高吞吐）
| 模型 | 输入价 ($/M) | 输出价 ($/M) |
|------|-------------|-------------|
| DeepSeek V4 Flash | $0.14 | $0.28 |
| MiMo-V2.5-Flash | $0.10 | $0.30 |
| Gemini 2.5 Flash-Lite | $0.10 | $0.40 |
| Mistral Small 3.1 | $0.20 | $0.60 |

## 隐藏成本

- **速率限制**: 低等级账号有 RPM/TPM 限制，需升级 tier
- **Prompt 缓存**: 缓存命中可降低成本 90%+
- **批量 API**: 非实时任务 50% 折扣
- **推理 Token**: 模型内部思考 token 不计入输出但需付费
- **中转代理**: 国内使用海外 API 需加 10-30% 溢价

## 节省策略

1. 按复杂度路由请求（70-80% 请求可用经济型）
2. 启用 Prompt 缓存
3. 非实时任务走批量 API
4. 优化 Prompt 长度（可压缩 30-50%）
5. 重复任务做微调
6. 设置预算上限

## 相关概念
- [[Prompt-Caching]] - 提示缓存机制
- [[Model-Routing]] - 模型路由策略

## 相关实体
- [[OpenAI]]
- [[Anthropic]]
- [[DeepSeek]]
- [[Google-Gemini]]
- [[Meta-Llama]]

## Sources
- [[3 Resources/000 Knowledge/Computer-Science/Artificial-Intelligence/02-机器学习/ai-ml/raw/articles/2026 大模型 API 价格对比（5月更新）：40+ 模型一表看清]]
