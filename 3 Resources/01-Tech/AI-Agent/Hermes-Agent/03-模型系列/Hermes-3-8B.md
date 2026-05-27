---
title: Hermes 3 8B
aliases:
  - Hermes-3-Llama-3.1-8B
  - Hermes 3 8B 模型詳解
tags:
  - topic/hermes
  - topic/llm
  - topic/ai-agent
created: 2026-05-25
modified: 2026-05-25
---

# Hermes 3 8B

> [!info] 模型简介
> Hermes 3 8B 是 Hermes 3 系列中最轻量的版本，基于 Llama 3.1 8B 架构，适合本地运行和边缘设备部署，同时保持出色的函数调用和工具使用能力。

> [!warning] 这是 LLM 模型
> Hermes 3 8B 是一个 LLM 模型，可在 Hermes Agent 框架中通过 Ollama 等本地运行。

---

## 快速導航

| 主題 | 說明 |
|------|------|
| [[#模型規格]] | 詳細技術規格參數 |
| [[#性能基準]] | 各項基準測試結果 |
| [[#本地部署]] | 本地運行指南 |
| [[#API 使用]] | API 調用示例 |
| [[#最佳實踐]] | 使用建議與優化技巧 |

---

## 模型規格

### 核心參數

| 規格項目 | 數值 |
|----------|------|
| **參數量** | 8.03B |
| **層數** | 32 |
| **隱藏層維度** | 4096 |
| **注意力頭數** | 32 |
| **KV頭數 (GQA)** | 8 |
| **中間層維度** | 14336 |
| **上下文長度** | 128K tokens |
| **詞表大小** | 128,256 |
| **RoPE 縮放** | 動態 NTK |
| **激活函數** | SwiGLU |
| **歸一化** | RMSNorm |

### 模型文件

| 格式 | 文件大小 | 說明 |
|------|----------|------|
| FP16 | ~15.5 GB | 原始精度 |
| BF16 | ~15.5 GB | Brain Float16 |
| FP8 | ~8.0 GB | 8-bit 浮點 |
| INT8 | ~8.5 GB | 8-bit 整數 |
| GPTQ-INT4 | ~5.0 GB | GPTQ 4-bit 量化 |
| AWQ-INT4 | ~4.8 GB | AWQ 4-bit 量化 |
| GGUF Q4_K_M | ~4.9 GB | 推薦量化格式 |

---

## 性能基準

### 通用能力測試

| 基準測試 | 分數 | 說明 |
|----------|------|------|
| **MMLU** | 68.2% | 多領域知識理解 |
| **MMLU-Pro** | 41.5% | 進階多領域測試 |
| **HellaSwag** | 82.1% | 常識推理 |
| **ARC-Challenge** | 73.8% | 科學問題推理 |
| **TruthfulQA** | 52.3% | 事實準確性 |
| **Winogrande** | 76.4% | 常識推理 |

### 編程能力測試

| 基準測試 | 分數 | 說明 |
|----------|------|------|
| **HumanEval** | 45.2% | Python 代碼生成 |
| **HumanEval+** | 38.7% | 增強版代碼測試 |
| **MBPP** | 52.8% | Python 編程問題 |
| **MultiPL-E (Python)** | 42.1% | 多語言編程 |

### 函數調用能力

| 基準測試 | 分數 | 說明 |
|----------|------|------|
| **ToolBench** | 85.3% | 工具調用基準 |
| **API-Bank** | 78.6% | API 調用能力 |
| **Gorilla** | 82.4% | API 函數調用 |
| **Nexus** | 76.9% | 複雜工具鏈 |

### 數學與推理

| 基準測試 | 分數 | 說明 |
|----------|------|------|
| **GSM8K** | 71.5% | 小學數學 |
| **MATH** | 32.8% | 高中數學 |
| **GPQA** | 31.2% | 研究級問題 |

---

## 本地部署

### 硬件需求

| 配置類型 | GPU | 顯存 | 適用量化 |
|----------|-----|------|----------|
| **最低配置** | RTX 3060 12GB | 12 GB | GGUF Q4 |
| **推薦配置** | RTX 4070 16GB | 16 GB | GGUF Q5/Q8 |
| **最佳配置** | RTX 4090 24GB | 24 GB | FP16 |
| **Mac 配置** | M2 Pro 16GB | 16 GB 統一內存 | GGUF Q4 |

### Ollama 部署

```bash
# 安裝 Ollama
curl -fsSL https://ollama.com/install.sh | sh

# 運行 Hermes 3 8B
ollama run hermes3:8b

# 指定量化版本
ollama run hermes3:8b-q4_K_M
ollama run hermes3:8b-q5_K_M
ollama run hermes3:8b-q8_0
```

### llama.cpp 部署

```bash
# 下載 GGUF 模型
wget https://huggingface.co/NousResearch/Hermes-3-Llama-3.1-8B-GGUF/resolve/main/Hermes-3-Llama-3.1-8B-Q4_K_M.gguf

# 編譯 llama.cpp
git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp && make

# 運行推理
./llama-cli -m Hermes-3-Llama-3.1-8B-Q4_K_M.gguf \
    -p "你好，請介紹一下你自己。" \
    -n 512 \
    --temp 0.7
```

### vLLM 部署

```python
from vllm import LLM, SamplingParams

# 加載模型
llm = LLM(
    model="NousResearch/Hermes-3-Llama-3.1-8B",
    tensor_parallel_size=1,  # GPU 數量
    gpu_memory_utilization=0.9,
    max_model_len=8192# 可根據需求調整
)

# 設置採樣參數
sampling_params = SamplingParams(
    temperature=0.7,
    top_p=0.9,
    max_tokens=512
)

# 生成回復
outputs = llm.generate(["你好！"], sampling_params)
print(outputs[0].outputs[0].text)
```

### Text Generation WebUI

```bash
# 克隆項目
git clone https://github.com/oobabooga/text-generation-webui
cd text-generation-webui

# 安裝依賴
pip install -r requirements.txt

# 啟動 WebUI
python server.py --model NousResearch_Hermes-3-Llama-3.1-8B \
    --load-in-4bit \
    --chat
```

---

## API 使用

### OpenAI 兼容 API

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://api.openrouter.ai/v1",
    api_key="your-api-key"
)

response = client.chat.completions.create(
    model="nousresearch/hermes-3-llama-3.1-8b",
    messages=[
        {"role": "system", "content": "你是一個有用的助手。"},
        {"role": "user", "content": "解釋什麼是函數調用。"}
    ],
    temperature=0.7,
    max_tokens=512
)

print(response.choices[0].message.content)
```

### 函數調用示例

```python
response = client.chat.completions.create(
    model="nousresearch/hermes-3-llama-3.1-8b",
    messages=[
        {"role": "user", "content": "台北今天天氣如何？"}
    ],
    tools=[{
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "獲取指定城市的天氣信息",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {
                        "type": "string",
                        "description": "城市名稱"
                    }
                },
                "required": ["city"]
            }
        }
    }],
    tool_choice="auto"
)

# 處理工具調用
if response.choices[0].message.tool_calls:
    tool_call = response.choices[0].message.tool_calls[0]
    print(f"調用工具: {tool_call.function.name}")
    print(f"參數: {tool_call.function.arguments}")
```

### LangChain 集成

```python
from langchain_community.llms import Ollama
from langchain_core.tools import tool

# 本地 Ollama
llm = Ollama(model="hermes3:8b")

# 或使用 API
from langchain_openai import ChatOpenAI
llm = ChatOpenAI(
    model="nousresearch/hermes-3-llama-3.1-8b",
    base_url="https://api.openrouter.ai/v1",
    api_key="your-api-key"
)

# 綁定工具
@tool
def get_weather(city: str) -> str:
    """獲取城市天氣"""
    return f"{city}今天天氣晴朗，25°C"

llm_with_tools = llm.bind_tools([get_weather])
response = llm_with_tools.invoke("台北天氣如何？")
print(response.tool_calls)
```

---

## 最佳實踐

### 提示詞優化

```python
# 推薦的系統提示詞
SYSTEM_PROMPT = """你是一個智能助手，具備以下能力：
1. 準確理解和執行用戶請求
2. 使用提供的工具獲取信息
3. 給出清晰、有條理的回答

當需要使用工具時，請確保：
- 提供完整的參數
- 確認參數類型正確
- 必要時詢問缺失信息"""

# 工具調用優化提示
TOOL_PROMPT = """在調用工具前，請先思考：
1. 是否真的需要調用工具？
2. 用戶是否提供了所有必需參數？
3. 參數值是否合理？

如果信息不足，請先向用戶詢問。"""
```

### 參數調優建議

| 場景 | temperature | top_p | 建議 |
|------|-------------|-------|------|
| 精確任務 | 0.1 - 0.3 | 0.9 | 代碼生成、數據提取 |
| 平衡模式 | 0.5 - 0.7 | 0.9 | 一般對話 |
| 創意任務 | 0.8 - 1.0 | 0.95 | 故事創作、頭腦風暴 |
| 工具調用 | 0.3 - 0.5 | 0.9 | 函數調用場景 |

### 量化選擇指南

| 量化格式 | 精度損失 | 速度 | 適用場景 |
|----------|----------|------|----------|
| FP16/BF16 | 無 | 基準 | 最高精度需求 |
| Q8_0 | 極小 | +10% | 接近原始精度 |
| Q6_K | 小 | +15% | 高精度需求 |
| Q5_K_M | 中等 | +20% | 推薦平衡選擇 |
| Q4_K_M | 可接受 | +30% | 資源受限環境 |
| Q3_K_M | 明顯 | +40% | 極度資源受限 |

---

## 限制與注意事項

### 已知限制

| 限制項 | 說明 |
|--------|------|
| **複雜推理** | 在多步推理任務上表現不如更大模型 |
| **知識截止** | 訓練數據有知識截止日期 |
| **長上下文** | 128K 上下文下記憶可能衰減 |
| **幻覺** | 可能產生不準確信息 |
| **多語言** | 非英語表現略遜於英語 |

### 不適用場景

- 需要最高準確性的關鍵決策
- 極複雜的多步推理任務
- 需要廣泛領域知識的任務
- 實時翻譯等高精度需求

---

## 版本歷史

| 版本 | 發布日期 | 更新內容 |
|------|----------|----------|
| v1.0 | 2024-07 | 初始發布 |
| v1.1 | 2024-08 | 改進函數調用能力 |
| v1.2 | 2024-09 | 優化工具選擇準確性 |

---

## 相關鏈接

- [[Hermes-3概览|Hermes 3 系列概覽]]
- [[Hermes-3-70B|Hermes 3 70B 詳解]]
- [[Hermes-3-405B|Hermes 3 405B 詳解]]
- [[Agent-API|Agent API 參考]]
- [[LangChain集成|LangChain 集成指南]]

---

## 外部資源

- [Hugging Face - Hermes-3-8B](https://huggingface.co/NousResearch/Hermes-3-Llama-3.1-8B)
- [Hugging Face - GGUF 版本](https://huggingface.co/NousResearch/Hermes-3-Llama-3.1-8B-GGUF)
- [Ollama Model Library](https://ollama.com/library/hermes3)
- [vLLM 文檔](https://docs.vllm.ai/)
