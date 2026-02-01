---
tags:
  - opencode
  - ollama
  - local-ai
  - guide
  - tutorial
created: 2026-01-15
---

# 闪念：如何在OpenCode中使用本地大模型

## 🌟 概述 / Overview

本地大模型正在彻底改变開發者与AI的交互方式。通過将OpenCode与Ollama等本地模型提供者整合，您可以建立一个完全私有、零成本、離線可用的AI編程環境。

### 🎯 为什么選擇本地模型？

| 特性 | 本地模型 | 雲端模型 |
|------|----------|----------|
| **隱私保護** | ✅ 100%本地處理 | ❌ 數據上傳到雲端 |
| **成本控制** | ✅ 一次性硬體投入 | ❌ 按使用量付费 |
| **離線使用** | ✅ 無需網路連接 | ❌ 依赖網路 |
| **自定义** | ✅ 可微调和定制 | ❌ 依赖服务商 |
| **響應速度** | ⚡ 硬體限制 | ⚡ 雲端强大 |

### 🎪 适用場景

#### ✅ 推荐使用場景
- **敏感代碼專案** - 不愿上傳到雲端的代碼库
- **離線開發環境** - 無網路或網路受限的環境
- **成本敏感專案** - 长期使用降低成本
- **學習研究** - 深入理解AI模型工作原理

#### ⚠️ 不推荐場景
- **快速原型開發** - 需要最高效能和最新模型
# 部署
# 配置

---

## 🚀 5分钟快速開始 / Quick Start (5 Minutes)

> [!important] 前置条件檢查 / Prerequisites Check
> - **操作系統**: Windows 10/11, macOS, Linux
> - **記憶體**: 至少16GB RAM
> - **GPU**: 推荐NVIDIA GPU (8GB+ VRAM)
> - **儲存**: 至少20GB可用空間
> - **網路**: 首次安裝需要下載模型

### 步骤 1: 安裝OpenCode

```bash
# 方法
curl -fsSL https://opencode.ai/install | bash

# 方法
npm install -g @opencode-ai/cli

# 方法
yarn global add @opencode-ai/cli
```

### 步骤 2: 安裝Ollama

```bash
# macOS/Linux
curl -fsSL https://ollama.ai/install.sh | sh

# Windows (PowerShell)
iwr -useb https://ollama.ai/install.ps1 | iex

# 驗證安裝
ollama --version
```

### 步骤 3: 下載推荐模型

```bash
# 啟動Ollama服务
ollama serve

# 下載最适合編程的模型（推荐）
ollama pull qwen2.5-coder:7b

# 或者下載更小的模型（硬體要求低）
ollama pull qwen2.5:3b
```

# 配置

# 配置

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "ollama": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "Ollama (local)",
      "options": {
        "baseURL": "http://localhost:11434/v1"
      },
      "models": {
        "qwen2.5-coder:7b": {
          "name": "Qwen2.5-Coder 7B (Local)"
        }
      }
    }
  },
  "model": "ollama/qwen2.5-coder:7b"
}
```

### 步骤 5: 首次測試

```bash
# 啟動OpenCode
opencode

# 在OpenCode界面中
/models  # 選擇模型
創建一个简单的Python函数
```

> [!success] 成功标志 / Success Indicators
> - ✅ OpenCode啟動無错误
> - ✅ 能看到本地模型选项
> - ✅ 成功生成代碼
> - ✅ 工具調用正常工作

---

# 指南

### 系統要求详解

#### 硬體要求矩阵

| GPU記憶體 | 推荐模型 | 预期效能 | 适用場景 |
|---------|----------|----------|----------|
| 4GB | Qwen2.5:1.5B | 40-60 tok/s | 基礎編程辅助 |
| 8GB | Qwen2.5:3B | 25-40 tok/s | 轻量级開發 |
| 16GB | Qwen2.5-Coder:7B | 15-25 tok/s | 通用編程任務 |
| 24GB+ | Qwen2.5-Coder:14B | 8-15 tok/s | 复杂專案開發 |

#### 軟體環境要求

```bash
# 版本
node --version  # 需要 v18.0.0 或更高

# 版本
python --version  # 需要 v3.8 或更高

# CUDA支持（NVIDIA GPU）
# 版本
```

# 配置

# 配置

```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "ollama/qwen2.5-coder:7b",
  "provider": {
    "ollama": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "Ollama (Local)",
      "options": {
        "baseURL": "http://localhost:11434/v1",
        "timeout": 120000,
        "maxRetries": 3,
        "headers": {
          "Connection": "keep-alive"
        }
      },
      "models": {
        "qwen2.5-coder:7b": {
          "name": "Qwen2.5-Coder 7B (Local)",
          "options": {
            "temperature": 0.1,
            "top_p": 0.9,
            "extraBody": {
              "num_ctx": 8192,
              "num_batch": 512,
              "repeat_penalty": 1.1
            }
          },
          "limit": {
            "context": 8192,
            "output": 4096
          }
        },
        "qwen2.5-coder:7b-16k": {
          "id": "qwen2.5-coder:7b",
          "name": "Qwen2.5-Coder 7B (16K)",
          "options": {
            "extraBody": {
              "num_ctx": 16384
            }
          },
          "limit": {
            "context": 16384,
            "output": 8192
          }
        }
      }
    }
  },
  "plugin": ["@opencode/file-operations"],
  "tools": {
    "timeout": 60000,
    "maxParallel": 3
  }
}
```

# 配置

#### 環境变量設置

```bash
# ~/.bashrc 或 ~/.zshrc
export OLLAMA_HOST=0.0.0.0:11434
export OLLAMA_ORIGINS=*
export OLLAMA_MODELS=/path/to/models
export OLLAMA_KEEP_ALIVE=24h
export OLLAMA_MAX_LOADED_MODELS=2

# 配置
source ~/.bashrc
```

# 配置

```ini
# /etc/systemd/system/ollama.service
[Unit]
Description=Ollama Service
After=network-online.target

[Service]
ExecStart=/usr/local/bin/ollama serve
User=ollama
Group=ollama
Restart=always
RestartSec=3
Environment="OLLAMA_HOST=0.0.0.0:11434"
Environment="OLLAMA_KEEP_ALIVE=24h"

[Install]
WantedBy=multi-user.target
```

---

## 🤖 推荐模型与選擇 / Recommended Models & Selection

### 模型分類与選擇

#### 🏆 編程专用模型（强烈推荐）

| 模型 | 参数量 | 上下文 | 編程能力 | 工具調用 | 硬體要求 |
|------|--------|--------|----------|----------|----------|
| **Qwen2.5-Coder** | 7B/14B | 32K | ⭐⭐⭐⭐⭐ | ✅ | 中等 |
| **DeepSeek-Coder-V2** | 6.7B/16B | 32K | ⭐⭐⭐⭐ | ✅ | 中等 |
| **CodeLlama** | 7B/13B/34B | 16K | ⭐⭐⭐ | ❌ | 中高 |

#### 🎯 通用对话模型（适合基礎任務）

| 模型 | 参数量 | 上下文 | 編程能力 | 推理能力 | 硬體要求 |
|------|--------|--------|----------|----------|----------|
| **Qwen2.5** | 3B/7B/14B | 32K | ⭐⭐⭐ | ⭐⭐⭐⭐ | 低-中等 |
| **Mistral-Nemo** | 12B | 128K | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 中等 |
| **Llama3.1** | 8B/70B | 128K | ⭐⭐ | ⭐⭐⭐⭐ | 中-高 |

### 模型選擇決策树

```mermaid
graph TD
    A[開始選擇模型] --> B{主要用途是編程?}
    B -->|是| C[選擇編程专用模型]
    B -->|否| D[選擇通用对话模型]
    
    C --> E{GPU記憶體 >= 16GB?}
    E -->|是| F[Qwen2.5-Coder:14B]
    E -->|否| G{GPU記憶體 >= 8GB?}
    G -->|是| H[Qwen2.5-Coder:7B]
    G -->|否| I[Qwen2.5:3B]
    
    D --> J{需要复杂推理?}
    J -->|是| K[Mistral-Nemo:12B]
    J -->|否| L{GPU記憶體 >= 8GB?}
    L -->|是| M[Qwen2.5:7B]
    L -->|否| N[Qwen2.5:3B]
```

# 配置

```bash
# 推荐模型下載命令
ollama pull qwen2.5-coder:7b           # 編程专用，推荐
ollama pull qwen2.5:7b                 # 通用模型，平衡
ollama pull mistral-nemo:12b            # 推理能力强
ollama pull qwen2.5:3b                 # 轻量级選擇

# 版本
ollama run qwen2.5-coder:7b
/set parameter num_ctx 16384
/save qwen2.5-coder:7b-16k
/bye

# 驗證模型
ollama list
```

---

## 💡 实际應用程式場景 / Practical Use Cases

### 場景1: 基礎代碼生成

#### 示例请求
```
創建一个Python函数，用于計算斐波那契数列的前n项，包含错误處理和效能優化
```

#### 预期輸出
```python
def fibonacci(n):
    """
    計算斐波那契数列的前n项
    
    Args:
        n (int): 要計算的项数
        
    Returns:
        list: 斐波那契数列
        
    Raises:
        ValueError: 当n不是正整数时
    """
    if not isinstance(n, int) or n <= 0:
        raise ValueError("n必须是正整数")
    
    if n == 1:
        return [0]
    elif n == 2:
        return [0, 1]
    
    fib_sequence = [0, 1]
    for i in range(2, n):
        fib_sequence.append(fib_sequence[-1] + fib_sequence[-2])
    
    return fib_sequence
```

# 修改

# 工作流
1. 打開需要重构的檔案
2. 使用OpenCode讀取檔案內容
3. 指定重构要求
# 修改

#### 示例请求
```
# 分析
1. 提取重复代碼为函数
2. 改进错误處理
3. 新增类型提示
4. 優化算法效能
```

### 場景3: 專案级代碼理解

# 分析
```bash
# 分析
# 分析

# 生成專案文檔
opencode run "为這個專案生成README文檔，包括安裝說明和使用示例"
```

### 場景4: 批處理自動化

#### 批量代碼審查腳本
```bash
#!/bin/bash
# 批量代碼審查腳本

for file in $(find . -name "*.py" -type f | head -10); do
    echo "審查檔案: $file"
    opencode run "審查這個Python檔案的代碼品質，指出潜在問題" "$file"
    echo "---"
done
```

---

# 工作流

# 配置

# 配置

### Templater模板

整合模板位于：`./Obsidian模板/`

- **OpenCode 请求.md** - 主要请求模板
- **批處理操作.md** - 批量操作模板  
# 配置

### 与PARA系統整合

# 管理
```markdown
---
para: project
domain: 
  - "[[AI Development]]"
created: 2026-01-15
status: active
tags:
  - ai
  - local-models
  - opencode
---

# 🤖 OpenCode本地模型整合專案

## 專案目標
建立完整的本地AI編程環境，實現隱私保護的代碼助手

## 期望成果
# 指南
# 配置
# 工作流
- [ ] 效能優化方案
- [ ] 故障排除手册
```

---

## ⚡ 效能優化技巧 / Performance Optimization

# 配置

#### 量化级别選擇
| 量化级别 | 模型大小 | 效能影响 | 品質损失 |
|----------|----------|----------|----------|
| **FP16** | 100% | 基准 | 無 |
| **INT8** | 50% | +20-30% | 微小 |
| **INT4** | 25% | +50-80% | 明显 |

#### 量化命令示例
```bash
# 使用Ollama自動量化（推荐）
ollama run qwen2.5-coder:7b

# 手動量化（高级使用者）
ollama create qwen2.5-coder:7b-quantized -f ./quantized_model.gguf
```

# 配置

#### NVIDIA GPU優化
```bash
# 檢查CUDA支持
nvidia-smi
export CUDA_VISIBLE_DEVICES=0

# 設置GPU記憶體分配
export OLLAMA_GPU_MEMORY_FRACTION=0.8
```

#### Apple Silicon優化
```bash
# macOS Metal效能設置
export OLLAMA_METAL=1
export OLLAMA_MAX_QUEUE=512
```

# 管理

#### 動態上下文调整
```json
{
  "models": {
    "qwen2.5-coder:7b-adaptive": {
      "options": {
        "extraBody": {
          "num_ctx": "auto",
          "ctx_size": "adaptive"
        }
      }
    }
  }
}
```

#### 內容分块處理
```javascript
// 大檔案自動分块處理
function chunkContent(content, maxTokens = 4000) {
    const estimatedTokens = content.length / 4;
    if (estimatedTokens <= maxTokens) return [content];
    
    const chunks = [];
    const chunkSize = maxTokens * 4;
    
    for (let i = 0; i < content.length; i += chunkSize) {
        chunks.push(content.slice(i, i + chunkSize));
    }
    
    return chunks;
}
```

---

## 🐛 故障排除手册 / Troubleshooting Guide

### 快速诊断清單

#### 啟動問題
- [ ] OpenCode無法啟動
- [ ] Ollama服务未運行
- [ ] 模型加载失败
# 配置

#### 效能問題
- [ ] 響應速度过慢
- [ ] 記憶體使用过高
- [ ] GPU未启用
- [ ] 模型推理中断

#### 功能問題
- [ ] 工具調用失败
# 修改
- [ ] 上下文截断
- [ ] 輸出格式异常

### 常见問題与解決方案

#### 問題1: "Model not found"错误

**症状**：OpenCode報告找不到模型

**原因**：
- 模型未正确下載
# 配置
- Ollama服务路徑問題

**解決方案**：
```bash
# 檢查已安裝模型
ollama list

# 重新下載模型
ollama pull qwen2.5-coder:7b

# 配置
cat ~/.config/opencode/opencode.json

# 重启Ollama服务
pkill ollama && ollama serve &
```

#### 問題2: 工具調用不工作

**症状**：模型無法执行檔案操作

**原因**：
- 使用了不支持工具調用的模型
# 配置
- 权限設置問題

**解決方案**：
```bash
# 檢查模型工具支持
ollama show qwen2.5-coder:7b | grep "tool"

# 更换为支持工具的模型
opencode run "測試工具功能" --model ollama/qwen2.5-coder:7b

# 配置
grep -A 10 '"tools"' ~/.config/opencode/opencode.json
```

#### 問題3: 效能过慢

**症状**：生成速度明显低于预期

**原因**：
- CPU模式運行（GPU未启用）
- 記憶體不足频繁交换
- 模型量化不当

**解決方案**：
```bash
# 檢查GPU使用情况
nvidia-smi

# 强制使用GPU
export OLLAMA_GPU=1

# 调整批處理大小
export OLLAMA_NUM_BATCH=256

# 監控資源使用
htop  # CPU和記憶體
nvtop  # GPU使用
```

#### 問題4: 上下文視窗不足

**症状**：大檔案處理时內容被截断

**原因**：
- 模型默认上下文視窗太小
# 配置

**解決方案**：
```bash
# 創建大上下文模型变体
ollama run qwen2.5-coder:7b
/set parameter num_ctx 16384
/save qwen2.5-coder:7b-16k

# 配置
{
  "models": {
    "qwen2.5-coder:7b-16k": {
      "options": {
        "extraBody": {
          "num_ctx": 16384
        }
      }
    }
  }
}
```

### 除錯工具与命令

#### 日志启用
```bash
# OpenCode詳細日志
export DEBUG=opencode:*
opencode --verbose

# Ollama除錯日志
export OLLAMA_DEBUG=1
ollama serve
```

#### 連接測試
```bash
# 測試Ollama API
curl http://localhost:11434/api/tags

# 測試模型響應
curl -X POST http://localhost:11434/api/generate \
  -H "Content-Type: application/json" \
  -d '{"model": "qwen2.5-coder:7b", "prompt": "Hello"}'
```

#### 效能基准測試
```bash
# 简单效能測試
time opencode run "生成一个简单的Python函数" --model ollama/qwen2.5-coder:7b

# 記憶體使用監控
watch -n 1 'ps aux | grep ollama'
```

---

## 🔮 高级應用程式 / Advanced Applications

# 工作流

#### 模型切換策略
```javascript
// 根据任務类型自動選擇模型
function selectOptimalModel(task) {
    const modelMap = {
        'code-generation': 'qwen2.5-coder:7b',
        'code-review': 'deepseek-coder:6.7b',
        'documentation': 'mistral-nemo:12b',
        'debugging': 'qwen2.5-coder:7b',
        'refactoring': 'qwen2.5-coder:14b'
    };
    
    return modelMap[task] || 'qwen2.5:7b';
}
```

#### 模型整合管道
```bash
#!/bin/bash
# 多模型協作管道

INPUT_FILE=$1
echo "階段1: 代碼生成 (Qwen2.5-Coder)"
opencode run "生成實現功能的代碼" --model ollama/qwen2.5-coder:7b "$INPUT_FILE" > stage1.py

echo "階段2: 代碼審查 (DeepSeek-Coder)"
opencode run "審查代碼品質和安全性" --model ollama/deepseek-coder:6.7b stage1.py > stage2_review.txt

echo "階段3: 文檔生成 (Mistral-Nemo)"
opencode run "生成代碼文檔" --model ollama/mistral-nemo:12b stage1.py > stage3_docs.md
```

### 自定义技能開發

#### OpenCode技能定义
```json
{
  "name": "local-code-review",
  "description": "本地代碼審查技能",
  "parameters": {
    "file_path": {
      "type": "string",
      "description": "要審查的檔案路徑"
    },
    "review_type": {
      "type": "string",
      "enum": ["security", "performance", "style", "logic"],
      "description": "審查类型"
    }
  },
  "handler": "local-code-review.js"
}
```

#### 自定义技能實現
```javascript
// local-code-review.js
module.exports = async function(params, context) {
    const { file_path, review_type } = params;
    
    // 讀取檔案內容
    const content = await context.readFile(file_path);
    
    // 構建審查提示
    const prompt = `请審查這個代碼的${review_type}方面：\n\n${content}`;
    
    // 調用本地模型
    const result = await context.ai.generate(prompt, {
        model: 'qwen2.5-coder:7b',
        temperature: 0.1
    });
    
    return {
        review: result.text,
        suggestions: extractSuggestions(result.text),
        score: calculateScore(result.text)
    };
};
```

### CI/CD整合

# 配置
```yaml
name: Local AI Code Review
on: [pull_request]

jobs:
  ai-review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Ollama
        run: |
          curl -fsSL https://ollama.ai/install.sh | sh
          ollama serve &
          ollama pull qwen2.5-coder:7b
          
      - name: Setup OpenCode
        run: |
          npm install -g @opencode-ai/cli
          echo '{"provider":{"ollama":{"npm":"@ai-sdk/openai-compatible","options":{"baseURL":"http://localhost:11434/v1"}}}}' > ~/.config/opencode/opencode.json
          
      - name: AI Code Review
        run: |
          opencode run "審查這個PR的代碼变更" --model ollama/qwen2.5-coder:7b
```

# 部署

# 部署
```dockerfile
FROM nvidia/cuda:12.1-devel-ubuntu22.04

# 安裝依赖
RUN apt-get update && apt-get install -y \
    curl \
    git \
    python3 \
    nodejs \
    npm

# 安裝Ollama
RUN curl -fsSL https://ollama.ai/install.sh | sh
RUN ollama serve &

# 下載模型
RUN ollama pull qwen2.5-coder:7b

# 安裝OpenCode
RUN npm install -g @opencode-ai/cli

# 配置
COPY opencode.json /root/.config/opencode/
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 11434
ENTRYPOINT ["/entrypoint.sh"]
```

# 配置
```yaml
version: '3.8'
services:
  opencode-ollama:
    build: .
    ports:
      - "11434:11434"
    volumes:
      - ./models:/root/.ollama
      - ./config:/root/.config/opencode
    environment:
      - OLLAMA_HOST=0.0.0.0:11434
      - OLLAMA_GPU_MEMORY_FRACTION=0.8
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
```

---

## 📚 參考資源 / Reference Resources

### 📖 官方文檔

- **[OpenCode Documentation](https://opencode.ai/docs)** - 完整的官方文檔
# 指南
- **[Qwen Models](https://huggingface.co/Qwen)** - Qwen模型系列
- **[AI SDK Documentation](https://ai-sdk.dev/)** - AI開發工具包

### 🛠️ 工具与資源

#### 模型下載站点
- **[Hugging Face](https://huggingface.co/models)** - 開源模型库
- **[Ollama Library](https://ollama.ai/library)** - Ollama官方模型库
- **[ModelScope](https://modelscope.cn/)** - 阿里雲端模型库

#### 效能監控工具
- **[nvtop](https://github.com/Syllo/nvtop)** - GPU監控
- **[htop](https://htop.dev/)** - 系統資源監控
- **[Glances](https://nicolargo.github.io/glances/)** - 综合監控工具

### 🌐 社區資源

#### 讨论社區
- **[OpenCode Discord](https://opencode.ai/discord)** - 官方Discord社區
- **[Ollama GitHub](https://github.com/ollama/ollama/discussions)** - GitHub讨论
- **[Reddit r/LocalLLaMA](https://reddit.com/r/LocalLLaMA)** - 本地模型讨论

# 指南
- **[Local AI Course](https://github.com/danielmiessler/fabric)** - 本地AI课程
# 指南

### 🔧 開發工具

# 配置
# 配置
- **[Ollama Web UI](https://github.com/ollama-webui/ollama-webui)** - Web界面

#### 除錯工具
- **[Model Inspector](https://huggingface.co/spaces/Xenova/model-inspector)** - 模型檢查器
- **[LLM Playground](https://huggingface.co/spaces/Xenova/LLM-Playground)** - 模型測試平台

---

# 更新

# 版本

# 版本
|-------------|------------|----------|------|
| v1.0.x | v0.1.x | Qwen2.5-Coder | ✅ 稳定 |
| v1.1.x | v0.2.x | Qwen2.5-Coder | ✅ 稳定 |
| v1.2.x | v0.3.x | Qwen2.5-Coder | 🔄 測試中 |

# 更新

# 更新
- **新增**: Qwen2.5-Coder系列模型支持
# 管理
- **修復**: 工具調用在某些模型上的相容性問題

# 更新
- **新增**: DeepSeek-Coder-V2支持
# 效率
- **改进**: 批處理效能

### 未来發展路线图

#### Q1 2026計劃
- **多模态支持** - 图像+文本處理
- **分布式推理** - 多GPU并行處理
- **模型热切換** - 運行时無缝切換模型

#### Q2 2026計劃
- **自适应量化** - 動態调整模型精度
- **智能缓存** - 上下文智能缓存機制
# 管理

---

## 🎓 最佳實踐總結 / Best Practices Summary

# 配置

1. **選擇合适的模型** - 根据硬體和需求平衡效能与品質
2. **優化上下文視窗** - 避免不必要的記憶體浪费
3. **启用GPU加速** - 最大化硬體效能
# 更新

### 🛡️ 安全最佳實踐

1. **本地運行** - 确保數據不离开本地網路
# 更新
3. **網路隔离** - 在受限環境中運行敏感專案
# 配置

### 🚀 效能最佳實踐

1. **量化模型** - 在品質和速度间找到平衡
# 效率
3. **缓存策略** - 重用常见查詢結果
4. **資源監控** - 持續監控和優化資源使用

### 🔧 維護最佳實踐

# 配置
2. **日志記錄** - 保持詳細的使用日志
3. **定期清理** - 清理不用的模型和缓存
# 更新

---

## 🔗 相關文檔連結 / Related Documentation Links

### 在本文檔中
# 配置
- **[[OpenCode 请求]]** - 主要请求模板
# 配置

### 在本仓库中
# 指南
# 指南
# 工作流

### 外部資源
- **[OpenCode官网](https://opencode.ai)** - 官方網站和文檔
- **[Ollama官网](https://ollama.ai)** - Ollama模型库和文檔
- **[Hugging Face](https://huggingface.co)** - 開源模型库

---

> [!tip] 💭 最后思考
> 本地AI模型代表着編程辅助的未来方向。虽然目前效能和便利性可能不如雲端方案，但隱私保護、成本控制和離線使用的優勢使其成为特定場景下的最佳選擇。随着硬體效能提升和模型優化，本地模型将会越来越强大。

# 指南

---

# 更新

# 更新
# 版本
**維護者**: OpenCode本地模型整合專案