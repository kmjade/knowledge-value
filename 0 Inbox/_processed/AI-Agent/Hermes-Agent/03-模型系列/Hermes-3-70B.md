---
title: Hermes 3 70B
aliases:
  - Hermes-3-Llama-3.1-70B
  - Hermes 3 70B 模型詳解
tags:
  - topic/hermes
  - topic/llm
  - topic/ai-agent
created: 2026-05-25
modified: 2026-05-25
---

# Hermes 3 70B

> [!info] 模型简介
> Hermes 3 70B 是 Hermes 3 系列中的平衡版本，基于 Llama 3.1 70B 架构，在性能和资源需求之间取得最佳平衡。

> [!warning] 这是 LLM 模型，不是框架

---

## 快速導航

| 主題 | 說明 |
|------|------|
| [[#模型規格]] | 詳細技術規格參數 |
| [[#性能基準]] | 各項基準測試結果 |
| [[#部署方案]] | 多種部署方式指南 |
| [[#API 使用]] | API 調用示例 |
| [[#最佳實踐]] | 使用建議與優化技巧 |

---

## 模型規格

### 核心參數

| 規格項目 | 數值 |
|----------|------|
| **參數量** | 70.6B |
| **層數** | 80 |
| **隱藏層維度** | 8192 |
| **注意力頭數** | 64 |
| **KV頭數 (GQA)** | 8 |
| **中間層維度** | 28672 |
| **上下文長度** | 128K tokens |
| **詞表大小** | 128,256 |
| **RoPE 縮放** | 動態 NTK |
| **激活函數** | SwiGLU |
| **歸一化** | RMSNorm |

### 模型文件

| 格式 | 文件大小 | 說明 |
|------|----------|------|
| FP16 | ~141 GB | 原始精度 |
| BF16 | ~141 GB | Brain Float16 |
| FP8 | ~71 GB | 8-bit 浮點 |
| INT8 | ~75 GB | 8-bit 整數 |
| GPTQ-INT4 | ~42 GB | GPTQ 4-bit 量化 |
| AWQ-INT4 | ~40 GB | AWQ 4-bit 量化 |
| GGUF Q4_K_M | ~42 GB | 推薦量化格式 |
| GGUF Q5_K_M | ~50 GB | 更高精度 |
| GGUF Q8_0 | ~76 GB | 接近原始精度 |

---

## 性能基準

### 通用能力測試

| 基準測試 | 分數 | 說明 |
|----------|------|------|
| **MMLU** | 82.4% | 多領域知識理解 |
| **MMLU-Pro** | 58.6% | 進階多領域測試 |
| **HellaSwag** | 88.7% | 常識推理 |
| **ARC-Challenge** | 81.2% | 科學問題推理 |
| **TruthfulQA** | 61.8% | 事實準確性 |
| **Winogrande** | 83.5% | 常識推理 |
| **PIQA** | 86.9% | 物理常識推理 |

### 編程能力測試

| 基準測試 | 分數 | 說明 |
|----------|------|------|
| **HumanEval** | 65.8% | Python 代碼生成 |
| **HumanEval+** | 58.2% | 增強版代碼測試 |
| **MBPP** | 72.4% | Python 編程問題 |
| **MultiPL-E (Python)** | 61.3% | 多語言編程 |
| **MultiPL-E (JavaScript)** | 58.7% | JavaScript 編程 |
| **MultiPL-E (Java)** | 54.2% | Java 編程 |

### 函數調用能力

| 基準測試 | 分數 | 說明 |
|----------|------|------|
| **ToolBench** | 92.1% | 工具調用基準 |
| **API-Bank** | 87.3% | API 調用能力 |
| **Gorilla** | 90.6% | API 函數調用 |
| **Nexus** | 85.4% | 複雜工具鏈 |
| **ToolAlpaca** | 88.9% | 工具學習基準 |

### 數學與推理

| 基準測試 | 分數 | 說明 |
|----------|------|------|
| **GSM8K** | 85.6% | 小學數學 |
| **MATH** | 48.2% | 高中數學 |
| **GPQA** | 42.7% | 研究級問題 |
| **BBH** | 68.4% | Big-Bench Hard |

### 與其他模型對比

| 模型 | MMLU | HumanEval | 函數調用 |
|------|------|-----------|----------|
| Hermes 3 70B | 82.4% | 65.8% | 92.1% |
| GPT-3.5-turbo | 70.0% | 48.1% | 85.0% |
| Claude 3 Sonnet | 79.0% | 73.0% | 88.0% |
| Llama 3.1 70B | 83.6% | 65.5% | 78.0% |

---

## 部署方案

### 硬件需求

| 配置類型 | GPU 配置 | 顯存總計 | 適用量化 |
|----------|----------|----------|----------|
| **最低配置** | 2x RTX 4090 | 48 GB | GPTQ-INT4 |
| **推薦配置** | 4x RTX 4090 | 96 GB | INT8 / Q5_K_M |
| **最佳配置** | 2x A100 80GB | 160 GB | FP16 |
| **雲端配置** | A100 80GB | 80 GB | INT8 |
| **Mac 配置** | M2 Ultra 192GB | 192 GB 統一內存 | GGUF Q4 |

### 多 GPU 部署

```python
# vLLM 多 GPU 推理
from vllm import LLM

llm = LLM(
    model="NousResearch/Hermes-3-Llama-3.1-70B",
    tensor_parallel_size=4,  # 使用 4 GPU
    gpu_memory_utilization=0.9,
    max_model_len=8192
)
```

### API 服務部署

```bash
# vLLM 啟動 OpenAI 兼容 API 服務
python -m vllm.entrypoints.openai.api_server \
    --model NousResearch/Hermes-3-Llama-3.1-70B \
    --tensor-parallel-size 4 \
    --port 8000 \
    --host 0.0.0.0
```

### Kubernetes 部署

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hermes-70b
spec:
  replicas: 1
  selector:
    matchLabels:
      app: hermes-70b
  template:
    metadata:
      labels:
        app: hermes-70b
    spec:
      containers:
      - name: vllm
        image: vllm/vllm-openai:latest
        args:
        - --model
        - NousResearch/Hermes-3-Llama-3.1-70B
        - --tensor-parallel-size
        - "4"
        resources:
          limits:
            nvidia.com/gpu: 4
```

---

## API 使用

### OpenRouter API

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key="your-api-key"
)

response = client.chat.completions.create(
    model="nousresearch/hermes-3-llama-3.1-70b",
    messages=[
        {"role": "system", "content": "你是一個專業的AI助手。"},
        {"role": "user", "content": "解釋量子計算的基本原理。"}
    ],
    temperature=0.7,
    max_tokens=1024
)
```

### Together AI

```python
import os
from together import Together

client = Together(api_key=os.environ.get("TOGETHER_API_KEY"))

response = client.chat.completions.create(
    model="NousResearch/Hermes-3-Llama-3.1-70B",
    messages=[{"role": "user", "content": "寫一個Python爬蟲示例"}]
)
```

### Fireworks AI

```python
from fireworks.client import Fireworks

client = Fireworks(api_key="your-api-key")

response = client.chat.completions.create(
    model="accounts/nousresearch/models/hermes-3-llama-3-1-70b",
    messages=[{"role": "user", "content": "你好"}]
)
```

### 複雜函數調用示例

```python
tools = [
    {
        "type": "function",
        "function": {
            "name": "search_database",
            "description": "搜索公司數據庫",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {"type": "string", "description": "搜索關鍵詞"},
                    "department": {"type": "string", "enum": ["銷售", "技術", "市場"]},
                    "date_range": {
                        "type": "object",
                        "properties": {
                            "start": {"type": "string", "format": "date"},
                            "end": {"type": "string", "format": "date"}
                        }
                    }
                },
                "required": ["query"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "send_email",
            "description": "發送電子郵件",
            "parameters": {
                "type": "object",
                "properties": {
                    "to": {"type": "array", "items": {"type": "string"}},
                    "subject": {"type": "string"},
                    "body": {"type": "string"}
                },
                "required": ["to", "subject", "body"]
            }
        }
    }
]

response = client.chat.completions.create(
    model="nousresearch/hermes-3-llama-3.1-70b",
    messages=[
        {"role": "user", "content": "搜索銷售部門上個月的客戶投訴，然後發送摘要給銷售經理"}
    ],
    tools=tools,
    tool_choice="auto"
)
```

---

## 最佳實踐

### 參數調優建議

| 場景 | temperature | top_p | max_tokens | 說明 |
|------|-------------|-------|------------|------|
| 代碼生成 | 0.2 | 0.9 | 2048 | 低溫度確保準確 |
| 數據分析 | 0.3 | 0.9 | 4096 | 平衡創意與準確 |
| 函數調用 | 0.4 | 0.9 | 1024 | 穩定工具選擇 |
| 創意寫作 | 0.8 | 0.95 | 2048 | 鼓勵多樣性 |
| 問答對話 | 0.5 | 0.9 | 512 | 平衡模式 |

### 提示詞工程

```python
# 角色扮演提示
ROLE_PROMPT = """你是一位資深軟件架構師，擁有20年系統設計經驗。
在回答問題時：
1. 先分析問題的核心需求
2. 提供多種可行方案
3. 比較各方案的優缺點
4. 給出最終建議和理由"""

# 多步推理提示
CHAIN_OF_THOUGHT = """請按以下步驟思考：
1. 理解問題的核心
2. 識別關鍵信息
3. 制定解決方案
4. 驗證方案的可行性
5. 給出最終答案

請詳細展示每一步的思考過程。"""
```

### 批處理優化

```python
# 批量處理請求
from vllm import LLM, SamplingParams

llm = LLM(model="NousResearch/Hermes-3-Llama-3.1-70B")

prompts = [
    "翻譯成英文：你好世界",
    "翻譯成英文：機器學習",
    "翻譯成英文：人工智能"
]

sampling_params = SamplingParams(temperature=0.3, max_tokens=100)
outputs = llm.generate(prompts, sampling_params)

for output in outputs:
    print(output.outputs[0].text)
```

---

## 成本估算

### API 調用成本

| 平台 | 輸入價格 | 輸出價格 | 說明 |
|------|----------|----------|------|
| OpenRouter | $0.60/1M tokens | $0.60/1M tokens | 參考價格 |
| Together AI | $0.80/1M tokens | $0.80/1M tokens | 參考價格 |
| Fireworks AI | $0.90/1M tokens | $0.90/1M tokens | 參考價格 |

### 自托管成本估算

| 項目 | 月成本 (USD) | 說明 |
|------|--------------|------|
| 4x RTX 4090 服務器 | $800-1200 | 購買攤銷 |
| 2x A100 80GB 雲端 | $3000-5000 | AWS/GCP 租賃 |
| 電力成本 | $200-400 | 視地區而定 |

---

## 限制與注意事項

### 已知限制

| 限制項 | 說明 |
|--------|------|
| **資源需求** | 需要多 GPU 或高顯存配置 |
| **推理速度** | 比 8B 模型慢約 8-10 倍 |
| **知識截止** | 訓練數據有截止日期 |
| **語言偏好** | 英語表現最佳 |

### 適用場景對比

| 場景 | Hermes 3 70B | Hermes 3 8B | 建議 |
|------|--------------|-------------|------|
| 快速原型 | ⚠️ 過度 | ✅ 適合 | 使用 8B |
| 生產環境 | ✅ 適合 | ⚠️ 可能不足 | 使用 70B |
| 複雜推理 | ✅ 適合 | ❌ 不足 | 使用 70B |
| 邊緣部署 | ❌ 不適合 | ✅ 適合 | 使用 8B |

---

## 相關鏈接

- [[Hermes-3概览|Hermes 3 系列概覽]]
- [[Hermes-3-8B|Hermes 3 8B 詳解]]
- [[Hermes-3-405B|Hermes 3 405B 詳解]]
- [[Agent-API|Agent API 參考]]
- [[LangChain集成|LangChain 集成指南]]

---

## 外部資源

- [Hugging Face - Hermes-3-70B](https://huggingface.co/NousResearch/Hermes-3-Llama-3.1-70B)
- [Hugging Face - GGUF 版本](https://huggingface.co/NousResearch/Hermes-3-Llama-3.1-70B-GGUF)
- [OpenRouter](https://openrouter.ai/nousresearch/hermes-3-llama-3.1-70b)
- [Together AI](https://api.together.xyz/models/NousResearch/Hermes-3-Llama-3.1-70B)
