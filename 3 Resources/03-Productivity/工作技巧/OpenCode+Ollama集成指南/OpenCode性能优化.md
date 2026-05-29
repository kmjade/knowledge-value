---
tags:
  - opencode
  - ollama
  - performance
  - optimization
  - guide
created: 2026-01-15
---

# OpenCode 性能优化技巧

## ⚡ 模型量化

### 量化级别选择

| 量化级别 | 模型大小 | 性能提升 | 质量损失 | 适用场景 |
|----------|----------|----------|----------|----------|
| **FP16** | 100% | 基准 | 无 | 最高质量要求 |
| **INT8** | 50% | +20-30% | 微小 | 日常开发 |
| **INT4** | 25% | +50-80% | 明显 | 快速原型 |

### 量化命令示例

```bash
# 使用 Ollama 自动量化（推荐）
ollama run qwen2.5-coder:7b

# 手动量化（高级用户）
ollama create qwen2.5-coder:7b-quantized -f ./quantized_model.gguf

# 验证量化效果
time ollama run qwen2.5-coder:7b "测试提示"
time ollama run qwen2.5-coder:7b-quantized "测试提示"
```

## 🖥️ GPU 优化

### NVIDIA GPU 优化

```bash
# 检查 CUDA 支持
nvidia-smi

# 强制使用特定 GPU
export CUDA_VISIBLE_DEVICES=0

# 设置 GPU 内存分配比例
export OLLAMA_GPU_MEMORY_FRACTION=0.8

# 调整批处理大小
export OLLAMA_NUM_BATCH=256
export OLLAMA_NUM_GPU=32

# 启用 CUDA 图
export OLLAMA_CUDA_GRAPH=1
```

### GPU 性能监控

```bash
# 实时监控 GPU
nvidia-smi -l 1

# 详细 GPU 信息
nvidia-smi --query-gpu=timestamp,name,temperature.gpu,utilization.gpu,utilization.memory,memory.used,memory.total --format=csv

# 使用 nvtop（推荐）
nvtop
```

## 🍎 Apple Silicon 优化

```bash
# macOS Metal 性能设置
export OLLAMA_METAL=1
export OLLAMA_MAX_QUEUE=512

# 设置最大并发数
export OLLAMA_NUM_THREAD=8

# 启用 MPS (Metal Performance Shaders)
export OLLAMA_MPS=1
```

### Apple Silicon 性能检查

```bash
# 检查 Metal 支持
system_profiler SPDisplaysDataType

# 监控 GPU 使用
sudo powermetrics --samplers gpu_power -i 1000
```

## 💾 内存优化

### 内存管理策略

```json
{
  "models": {
    "qwen2.5-coder:7b-optimized": {
      "options": {
        "extraBody": {
          "num_ctx": 4096,
          "num_batch": 512,
          "num_gpu": 32,
          "num_thread": 8,
          "f16_kv": true,
          "use_mmap": true,
          "use_mlock": false
        }
      }
    }
  }
}
```

### 环境变量优化

```bash
# 限制并发请求
export OLLAMA_MAX_QUEUE=256

# 控制模型加载行为
export OLLAMA_KEEP_ALIVE=30m
export OLLAMA_MAX_LOADED_MODELS=2

# 内存回收策略
export OLLAMA_NUM_THREAD=4
export OLLAMA_NUM_GPU=16
```

## 📊 动态上下文调整

### 自适应上下文配置

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

### 上下文优化策略

```javascript
// 动态上下文选择
function selectContext(task) {
    const contextMap = {
        'simple-query': 2048,
        'code-generation': 4096,
        'code-review': 8192,
        'project-analysis': 16384
    };
    return contextMap[task] || 4096;
}
```

## 🔄 内容分块处理

### 大文件自动分块

```javascript
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

// 智能分块（保持代码完整性）
function smartChunkCode(content) {
    const lines = content.split('\n');
    const chunks = [];
    let currentChunk = [];
    let currentSize = 0;
    const maxTokens = 4000;

    for (const line of lines) {
        const lineTokens = line.length / 4;

        if (currentSize + lineTokens > maxTokens && currentChunk.length > 0) {
            chunks.push(currentChunk.join('\n'));
            currentChunk = [];
            currentSize = 0;
        }

        currentChunk.push(line);
        currentSize += lineTokens;
    }

    if (currentChunk.length > 0) {
        chunks.push(currentChunk.join('\n'));
    }

    return chunks;
}
```

## 🚀 缓存策略

### 查询结果缓存

```javascript
class QueryCache {
    constructor(maxSize = 100) {
        this.cache = new Map();
        this.maxSize = maxSize;
    }

    get(key) {
        const item = this.cache.get(key);
        if (item && Date.now() - item.timestamp < 3600000) { // 1小时过期
            return item.value;
        }
        return null;
    }

    set(key, value) {
        if (this.cache.size >= this.maxSize) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        this.cache.set(key, { value, timestamp: Date.now() });
    }
}
```

### 模型预加载

```bash
# 启动时预加载常用模型
ollama run qwen2.5-coder:7b &
ollama run qwen2.5:3b &

# 使用 Ollama 服务保持模型加载
export OLLAMA_KEEP_ALIVE=24h
```

## 📈 性能基准测试

### 基准测试脚本

```bash
#!/bin/bash
# 性能基准测试

echo "=== OpenCode 性能基准测试 ==="

models=(
    "qwen2.5-coder:7b"
    "qwen2.5:3b"
    "deepseek-coder:6.7b"
)

for model in "${models[@]}"; do
    echo "测试模型: $model"

    # 简单查询测试
    time opencode run "生成一个简单的 Python 函数" --model "ollama/$model"

    # 复杂查询测试
    time opencode run "分析这个项目的架构并提供优化建议" --model "ollama/$model"

    echo "---"
done
```

### 性能监控工具

```bash
# 系统资源监控
htop

# GPU 监控
nvidia-smi dmon -s pucvmet -d 1

# 内存监控
watch -n 1 'free -h && echo "---" && ps aux | grep ollama'

# 网络监控
iftop
```

## 🎯 性能优化检查清单

### 启动阶段
- [ ] 选择合适的量化级别
- [ ] 启用 GPU 加速
- [ ] 配置内存分配
- [ ] 预加载常用模型

### 运行阶段
- [ ] 优化批处理大小
- [ ] 动态调整上下文
- [ ] 启用查询缓存
- [ ] 分块处理大文件

### 监控阶段
- [ ] 监控 GPU 使用率
- [ ] 跟踪内存使用
- [ ] 测量响应时间
- [ ] 记录吞吐量

## 🔗 相关文档

- [[OpenCode模型选择与配置]] - 模型选择指南
- [[OpenCode故障排除]] - 性能问题解决
- [[OpenCode最佳实践]] - 综合优化建议

## 📚 外部资源

- [Ollama Performance Guide](https://github.com/ollama/ollama/blob/main/docs/modelfile.md)
- [CUDA Optimization Guide](https://docs.nvidia.com/deeplearning/performance/)
- [Metal Performance Shaders](https://developer.apple.com/metal/mps/)
