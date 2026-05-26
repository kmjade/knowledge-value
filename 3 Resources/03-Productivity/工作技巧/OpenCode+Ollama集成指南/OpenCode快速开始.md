---
tags:
  - opencode
  - ollama
  - installation
  - quickstart
  - guide
created: 2026-01-15
---

# OpenCode+Ollama 快速开始指南

> 5分钟配置本地AI编程环境

## 📋 前置条件

### 系统要求
| 组件 | 最低要求 | 推荐配置 |
|------|----------|----------|
| **操作系统** | Windows 10/11, macOS, Linux | 最新版本 |
| **内存** | 16GB RAM | 32GB+ RAM |
| **GPU** | NVIDIA GPU (8GB+ VRAM) | NVIDIA GPU (16GB+ VRAM) |
| **存储** | 20GB 可用空间 | 50GB+ SSD |
| **网络** | 首次安装需要 | 稳定连接 |

## 🚀 安装步骤

### 步骤 1: 安装 OpenCode

```bash
# 方法 1: 官方安装脚本
curl -fsSL https://opencode.ai/install | bash

# 方法 2: NPM 安装
npm install -g @opencode-ai/cli

# 方法 3: Yarn 安装
yarn global add @opencode-ai/cli
```

### 步骤 2: 安装 Ollama

```bash
# macOS/Linux
curl -fsSL https://ollama.ai/install.sh | sh

# Windows (PowerShell)
iwr -useb https://ollama.ai/install.ps1 | iex

# 验证安装
ollama --version
```

### 步骤 3: 下载模型

```bash
# 启动 Ollama 服务
ollama serve

# 下载编程专用模型（推荐）
ollama pull qwen2.5-coder:7b

# 或下载更小的模型（硬件要求低）
ollama pull qwen2.5:3b
```

### 步骤 4: 配置 OpenCode

创建或编辑配置文件 `~/.config/opencode/opencode.json`:

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

### 步骤 5: 首次测试

```bash
# 启动 OpenCode
opencode

# 在 OpenCode 界面中测试
/models  # 选择模型
创建一个简单的 Python 函数
```

## ✅ 成功标志

- [ ] OpenCode 启动无错误
- [ ] 能看到本地模型选项
- [ ] 成功生成代码
- [ ] 工具调用正常工作

## 🔗 相关文档

- [[OpenCode模型选择指南]] - 如何选择合适的本地模型
- [[OpenCode配置详解]] - 高级配置选项
- [[OpenCode故障排除]] - 常见问题解决

## 📚 参考资源

- [OpenCode Documentation](https://opencode.ai/docs)
- [Ollama Library](https://ollama.ai/library)
