---
title: Hermes 3 概览
aliases:
  - Hermes 3 Overview
  - Hermes 3 系列介紹
tags:
  - topic/hermes
  - topic/llm
  - topic/ai-agent
created: 2026-05-25
modified: 2026-05-25
---

# Hermes 3 概覽

> [!info] 模型简介
> Hermes 3 是 Nous Research 基于 Llama 3.1 架构开发的开源大语言模型系列，专门针对智能体能力（Agentic Capabilities）进行优化，包括函数调用、工具使用和结构化输出。

> [!warning] 这是 LLM 模型，不是框架
> **Hermes 3** 是 LLM 模型系列。**Hermes Agent** 是 AI 智能体框架。
> Hermes Agent 框架可以调用 Hermes 3 模型，也可以调用任何其他模型。

---

## 系列概覽

| 模型 | 參數量 | 基礎架構 | 適用場景 |
|------|--------|----------|----------|
| [[Hermes-3-8B]] | 80億 | Llama 3.1 8B | 本地運行、邊緣設備 |
| [[Hermes-3-70B]] | 700億 | Llama 3.1 70B | 平衡性能與資源 |
| [[Hermes-3-405B]] | 4050億 | Llama 3.1 405B | 最強性能、複雜任務 |

---

## 核心特性

### 1. 原生函數調用

Hermes 3 支持结构化的函数调用格式（这是**模型**层面的原生格式，不同于 Hermes Agent 框架的 OpenAI function calling）：

```xml
<tool_call]>
{"name": "function_name", "arguments": {"arg1": "value1"}}
</tool_call]>
```

> 此 XML 格式仅在直接使用 Hermes 3 模型时需要手动解析。
> 使用 Hermes Agent 框架时，框架自动处理 OpenAI 兼容的 function calling。

### 2. 工具使用能力

- 自動工具選擇
- 參數類型驗證
- 多工具並行調用
- 錯誤處理與重試

### 3. 結構化輸出

- JSON Schema 支持
- 可靠的格式化輸出
- 多語言代碼生成

### 4. 智能體能力

- 多輪對話記憶
- 任務規劃與分解
- 自我反思與修正
- 上下文理解

---

## 技術規格

### 模型架構

| 特性 | 說明 |
|------|------|
| **基礎模型** | Llama 3.1 |
| **上下文長度** | 128K tokens |
| **詞表大小** | 128,256 |
| **訓練數據** | 公開數據集 + 合成數據 |

### 訓練方法

1. **預訓練**: 基於 Llama 3.1 基礎模型
2. **監督微調 (SFT)**: 使用函數調用和工具使用數據
3. **人類反饋強化學習 (RLHF)**: 優化對話質量

### 各模型詳細規格

#### Hermes 3 8B

| 規格項目 | 數值 |
|----------|------|
| 參數量 | 8.03B |
| 層數 | 32 |
| 隱藏層維度 | 4096 |
| 注意力頭數 | 32 |
| KV頭數 (GQA) | 8 |
| 中間層維度 | 14336 |
| 上下文長度 | 128K tokens |
| 詞表大小 | 128,256 |
| RoPE 縮放 | 動態 NTK |
| 激活函數 | SwiGLU |
| 歸一化 | RMSNorm |

#### Hermes 3 70B

| 規格項目 | 數值 |
|----------|------|
| 參數量 | 70.6B |
| 層數 | 80 |
| 隱藏層維度 | 8192 |
| 注意力頭數 | 64 |
| KV頭數 (GQA) | 8 |
| 中間層維度 | 28672 |
| 上下文長度 | 128K tokens |
| 詞表大小 | 128,256 |
| RoPE 縮放 | 動態 NTK |
| 激活函數 | SwiGLU |
| 歸一化 | RMSNorm |

#### Hermes 3 405B

| 規格項目 | 數值 |
|----------|------|
| 參數量 | 405B |
| 層數 | 126 |
| 隱藏層維度 | 16384 |
| 注意力頭數 | 128 |
| KV頭數 (GQA) | 8 |
| 中間層維度 | 53248 |
| 上下文長度 | 128K tokens |
| 詞表大小 | 128,256 |
| RoPE 縮放 | 動態 NTK |
| 激活函數 | SwiGLU |
| 歸一化 | RMSNorm |

### 訓練數據詳情

| 數據類型 | 說明 |
|----------|------|
| **函數調用數據** | 包含多輪工具調用對話的合成數據集 |
| **代碼數據** | 高質量代碼庫和編程問答數據 |
| **通用指令數據** | 多領域指令微調數據 |
| **合成數據** | 使用 GPT-4 生成的工具調用場景 |
| **安全數據** | 經過過濾和審核的安全對話數據 |

### 量化選項

| 量化格式 | 8B模型大小 | 70B模型大小 | 說明 |
|----------|------------|-------------|------|
| FP16 | ~16 GB | ~140 GB | 原始精度 |
| FP8 | ~8 GB | ~70 GB | 8-bit浮點 |
| INT8 | ~8 GB | ~70 GB | 8-bit整數 |
| INT4 (GPTQ) | ~5 GB | ~40 GB | 4-bit量化 |
| GGUF Q4_K_M | ~5 GB | ~40 GB | 推薦量化格式 |
| GGUF Q5_K_M | ~6 GB | ~48 GB | 更高精度 |
| GGUF Q8_0 | ~8.5 GB | ~75 GB | 接近原始精度 |

---

## 版本比較

### 性能對比

| 基準測試 | Hermes 3 8B | Hermes 3 70B | Hermes 3 405B |
|----------|-------------|--------------|---------------|
| MMLU | ~68% | ~82% | ~88% |
| HumanEval | ~45% | ~65% | ~75% |
| 函數調用準確率 | ~85% | ~92% | ~96% |

### 資源需求

| 模型 | GPU 顯存 (推理) | GPU 顯存 (微調) |
|------|-----------------|-----------------|
| 8B | ~16 GB | ~40 GB |
| 70B | ~140 GB | ~280 GB |
| 405B | ~800 GB | ~1.5 TB |

---

## 使用場景

### Hermes 3 8B
- 本地開發與測試
- 邊緣設備部署
- 實時響應場景

### Hermes 3 70B
- 生產環境部署
- 複雜推理任務
- 平衡成本與性能

### Hermes 3 405B
- 研究與開發
- 最複雜任務
- 最高準確性要求

---

## 支持框架

### 推理框架

| 框架 | 說明 | 支持度 |
|------|------|--------|
| **vLLM** | 高吞吐量推理引擎 | ✅ 完全支持 |
| **llama.cpp** | C++ 推理庫，支持 GGUF | ✅ 完全支持 |
| **Ollama** | 本地模型運行工具 | ✅ 完全支持 |
| **Text Generation WebUI** | Gradio Web界面 | ✅ 完全支持 |
| **TensorRT-LLM** | NVIDIA 優化推理 | ✅ 支持 |
| **LM Studio** | 桌面應用 | ✅ 支持 |

### 應用框架

| 框架 | 集成方式 | 說明 |
|------|----------|------|
| **LangChain** | 原生支持 | 通過 ChatOpenAI 或 LlamaCpp |
| **LlamaIndex** | 原生支持 | RAG 應用開發 |
| **AutoGen** | 多智能體框架 | 函數調用兼容 |
| **CrewAI** | 多智能體協作 | 工具調用支持 |
| **Semantic Kernel** | 微軟框架 | 通過 OpenAI 兼容 API |
| **Haystack** | RAG 框架 | 通過 Hugging Face |

### 部署選項

| 部署方式 | 說明 | 適用模型 |
|----------|------|----------|
| **本地 CPU** | llama.cpp / Ollama | 8B (量化版) |
| **本地 GPU** | vLLM / Text Generation WebUI | 8B, 70B |
| **雲端 API** | OpenRouter / Together AI | 全部 |
| **私有雲** | Kubernetes + vLLM | 70B, 405B |
| **邊緣設備** | llama.cpp (移動端) | 8B (量化版) |

---

## 獲取方式

### Hugging Face

```bash
# 下載模型
pip install huggingface_hub
huggingface-cli download NousResearch/Hermes-3-Llama-3.1-8B
```

### API 服務

| 平台 | 支持模型 | 說明 |
|------|----------|------|
| **OpenRouter** | 8B, 70B, 405B | 多模型聚合 API |
| **Together AI** | 8B, 70B | 高性能推理 |
| **Fireworks AI** | 8B, 70B | 低延遲推理 |
| **Groq** | 8B | 極速推理 (LPU) |

---

## 相關鏈接

- [[Hermes-3-8B|Hermes 3 8B 詳細介紹]]
- [[Hermes-3-70B|Hermes 3 70B 詳細介紹]]
- [[Hermes-3-405B|Hermes 3 405B 詳細介紹]]
- [[工具系统|工具系統概述]]
- [[工具调用格式|工具調用格式]]

---

## 外部資源

- [Nous Research 官網](https://nousresearch.com/)
- [Hugging Face - NousResearch](https://huggingface.co/NousResearch)
- [Hermes Agent 文檔](https://hermesagent.org.cn/)
