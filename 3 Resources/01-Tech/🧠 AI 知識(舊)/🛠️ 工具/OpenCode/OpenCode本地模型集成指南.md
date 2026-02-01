---
# 指南
aliases:
  - OpenCode Local Model Guide
# 配置
created: 2026-01-29
tags:
  - OpenCode
  - ollama
  - GLM
  - Claude Code
# 部署
# 指南
type: tutorial
interest-level: 5
study-status: completed
source: 網路收集
para: resources
language: zh-cn
---

# 指南

> [!info] 概述
# 指南

---

## 快速開始

### 安裝步骤

1. **安裝 Ollama**
   ```bash
   # macOS (Homebrew)
   brew install ollama

   # Linux
   curl -fsSL https://ollama.com/install.sh | sh

   # Windows
   # 下載 Ollama for Windows
   ```

2. **安裝 OpenCode**
   ```bash
   # macOS/Linux
   curl -fsSL https://opencode.ai/install.sh | bash

   # Windows
   # 下載 Windows 安裝包
   ```

3. **拉取本地模型**
   ```bash
   # 拉取 GLM 模型
   ollama pull glm-4-flash

   # 拉取其他可用模型
   ollama list
   ```

---

# 方法

# 方法

1. **啟動 Ollama 服务**
   ```bash
   ollama serve
   ```

# 配置
   - 打開 OpenCode
   - 进入 Settings → Model Settings
   - 選擇 Custom Model
   - 填寫：
     - Base URL: `http://localhost:11434`
     - Model Name: `glm-4-flash`

3. **測試連接**
   ```bash
   # 測試 Ollama 是否運行
   curl http://localhost:11434/api/tags
   ```

# 方法

# 配置
   在 `~/.config/opencode/opencode.json` 中新增：

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
   # 關閉当前 OpenCode
   opencode

# 配置
   ```

---

## 常用本地模型

| 模型名 | 大小 | 特點 | 推荐場景 |
|--------|------|----------|
| glm-4-flash | ~9GB | 快速、中文優化 | 日常对话、快速編程 |
| glm-4-chat | ~9GB | 平衡效能 | 综合任務處理 |
| qwen2.5-14b | ~14GB | 长文本 | 长文本生成、代碼編寫 |
| deepseek-coder | ~16GB | 編程专用 | 代碼編寫、除錯 |

---

# 工作流

### 場景一：本地编码助手

1. **啟動服务**
   ```bash
   ollama serve --model glm-4-flash
   ```

2. **在 OpenCode 中編寫代碼**
   - 打開 OpenCode
   - 選擇 glm-4-flash 模型
   - 開始编码对话

### 場景二：代碼審查

```bash
# 代碼審查命令示例
opencode --model glm-4-flash --message "请審查以下代碼并提供改进建議：" --file /path/to/code.js
```

### 場景三：批量處理

```bash
# 批量代碼生成或重构
opencode batch-process --model glm-4-flash --source-folder ./src
```

---

## 故障排除

| 問題 | 可能原因 | 解決方案 |
|------|----------|----------|
| 無法連接 | Ollama 未啟動 | 運行 `ollama serve` |
| 響應慢 | 網路問題 | 檢查 Base URL 是否正确 |
| 記憶體不足 | 模型太大 | 使用更小的模型或增加系統記憶體 |
| 编码問題 | 特殊字符 | 确保终端编码为 UTF-8 |

---

## 上下文視窗優化

> [!tip] 重要提示
> OpenCode 推荐使用至少 64k tokens 的上下文視窗。本地模型可能需要调整。

```bash
# 增加上下文視窗（如支持）
export OPENCODE_CONTEXT_SIZE=65536
```

---

# 配置

### 多模型切換

# 配置

```json
{
  "coding": "glm-4-flash",
  "chat": "glm-4-chat",
  "code-review": "qwen2.5-14b"
}
```

### 自定义提示词

在 `AGENTS.md` 中新增本地模型的特性：

```markdown
# 配置

- **首选模型**: glm-4-flash (本地運行，速度快)
- **备用模型**: 指定雲端 API (如需要时切換)
- **编码风格**: 简洁、注重可读性
- **特殊指令**: 优先使用本地處理，减少網路请求
```

---

## 相關資源

# AI 知識
# 教程
# 指南
- [[Ollama 文檔]] - Ollama 官方文檔
- [[GLM 模型仓库]] - GLM 模型列表
