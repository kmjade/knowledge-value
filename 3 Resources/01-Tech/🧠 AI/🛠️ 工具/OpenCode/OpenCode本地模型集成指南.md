---
title: OpenCode本地模型集成指南
aliases:
  - OpenCode Local Model Guide
  - OpenCode 本地模型配置
created: 2026-01-29
tags:
  - OpenCode
  - ollama
  - GLM
  - Claude Code
  - 本地部署
  - 配置指南
type: tutorial
interest-level: 5
study-status: completed
source: 网络收集
para: resources
language: zh-cn
---

# OpenCode本地模型集成指南

> [!info] 概述
> 本指南介绍如何将 OpenCode 与本地大模型（Ollama、GLM等）集成，实现在本地终端中使用 AI 辅助进行编码和开发的完整闭环。

---

## 快速开始

### 安装步骤

1. **安装 Ollama**
   ```bash
   # macOS (Homebrew)
   brew install ollama

   # Linux
   curl -fsSL https://ollama.com/install.sh | sh

   # Windows
   # 下载 Ollama for Windows
   ```

2. **安装 OpenCode**
   ```bash
   # macOS/Linux
   curl -fsSL https://opencode.ai/install.sh | bash

   # Windows
   # 下载 Windows 安装包
   ```

3. **拉取本地模型**
   ```bash
   # 拉取 GLM 模型
   ollama pull glm-4-flash

   # 拉取其他可用模型
   ollama list
   ```

---

## 配置方法

### 方法一：手动配置（推荐新手）

1. **启动 Ollama 服务**
   ```bash
   ollama serve
   ```

2. **配置 OpenCode**
   - 打开 OpenCode
   - 进入 Settings → Model Settings
   - 选择 Custom Model
   - 填写：
     - Base URL: `http://localhost:11434`
     - Model Name: `glm-4-flash`

3. **测试连接**
   ```bash
   # 测试 Ollama 是否运行
   curl http://localhost:11434/api/tags
   ```

### 方法二：配置文件方式（适合自动化）

1. **创建配置文件**
   在 `~/.config/opencode/opencode.json` 中添加：

   ```json
   {
     "$schema": "https://opencode.ai/config.json",
     "provider": {
       "ollama": {
         "npm": "@ai-sdk/openai-compatible",
         "name": "Ollama",
         "options": {
           "baseURL": "http://localhost:11434"
         },
         "models": {
           "glm-4-flash": {
             "name": "glm-4-flash"
           }
         }
       }
     }
   }
   }
   ```

2. **重启 OpenCode**
   ```bash
   # 关闭当前 OpenCode
   opencode

   # 重新打开，它会加载新配置
   ```

---

## 常用本地模型

| 模型名 | 大小 | 特点 | 推荐场景 |
|--------|------|----------|
| glm-4-flash | ~9GB | 快速、中文优化 | 日常对话、快速编程 |
| glm-4-chat | ~9GB | 平衡性能 | 综合任务处理 |
| qwen2.5-14b | ~14GB | 长文本 | 长文本生成、代码编写 |
| deepseek-coder | ~16GB | 编程专用 | 代码编写、调试 |

---

## 工作流示例

### 场景一：本地编码助手

1. **启动服务**
   ```bash
   ollama serve --model glm-4-flash
   ```

2. **在 OpenCode 中编写代码**
   - 打开 OpenCode
   - 选择 glm-4-flash 模型
   - 开始编码对话

### 场景二：代码审查

```bash
# 代码审查命令示例
opencode --model glm-4-flash --message "请审查以下代码并提供改进建议：" --file /path/to/code.js
```

### 场景三：批量处理

```bash
# 批量代码生成或重构
opencode batch-process --model glm-4-flash --source-folder ./src
```

---

## 故障排除

| 问题 | 可能原因 | 解决方案 |
|------|----------|----------|
| 无法连接 | Ollama 未启动 | 运行 `ollama serve` |
| 响应慢 | 网络问题 | 检查 Base URL 是否正确 |
| 内存不足 | 模型太大 | 使用更小的模型或增加系统内存 |
| 编码问题 | 特殊字符 | 确保终端编码为 UTF-8 |

---

## 上下文窗口优化

> [!tip] 重要提示
> OpenCode 推荐使用至少 64k tokens 的上下文窗口。本地模型可能需要调整。

```bash
# 增加上下文窗口（如支持）
export OPENCODE_CONTEXT_SIZE=65536
```

---

## 高级配置

### 多模型切换

在 OpenCode 中可以配置多个本地模型，根据任务类型自动切换：

```json
{
  "coding": "glm-4-flash",
  "chat": "glm-4-chat",
  "code-review": "qwen2.5-14b"
}
```

### 自定义提示词

在 `AGENTS.md` 中添加本地模型的特性：

```markdown
## 模型配置

- **首选模型**: glm-4-flash (本地运行，速度快)
- **备用模型**: 指定云 API (如需要时切换)
- **编码风格**: 简洁、注重可读性
- **特殊指令**: 优先使用本地处理，减少网络请求
```

---

## 相关资源

- [[2 Areas/ai-knowledge/ai-knowledge.md]] - AI 知识库领域（Area）
- [[OpenCode-智能体搭建教程]] - OpenCode 完整教程
- [[AI员工搭建全流程指南]] - AI 员工系统开发指南
- [[Ollama 文档]] - Ollama 官方文档
- [[GLM 模型仓库]] - GLM 模型列表
