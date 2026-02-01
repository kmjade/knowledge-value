---
title: Ollama + Clawdbot 免費本地 AI 智能体
type: article
category: AI/LM/AI Agent
resource_type: article
status: done
source: 微信公众号
url: https://mp.weixin.qq.com/s/B4KzgiBN60hJOz83cKk25w
tags:
  - AI
  - Ollama
  - Clawdbot
  - local-llm
  - agent
  - free
  - tutorial
  - npm
created: 2026-01-30
---

# Ollama + Clawdbot 免費本地 AI 智能体

> [!info] 資源說明
# 部署

---

## 📄 基本資訊

# 教程

**發佈時間**：2026-01-30

**来源**：微信公众号

**連結**：[原文連結](https://mp.weixin.qq.com/s/B4KzgiBN60hJOz83cKk25w)

**相關工具**：
- [Ollama](https://ollama.com) - 本地 LLM 運行平台
- [Clawdbot](https://github.com/clawdbot/clawdbot) - AI 智能体框架

---

## 📋 核心內容

### 概述

Clawdbot 是一个强大的 AI 智能体框架，通過 Ollama 可以實現本地運行，無需付费 API，完全免費且方便。

### 優勢

- ✅ **完全免費** - 使用本地模型，無需 API 費用
- ✅ **隱私安全** - 數據完全在本地處理
# 配置
- ✅ **后台運行** - 支持 daemon 模式
# 配置

---

## 🛠️ 技術實現

### 1. 安裝 Clawdbot

# 方法

```bash
npm install -g clawdbot@latest
```

**前置条件**：需要安裝 Node.js

# 方法

```powershell
iwr -useb https://molt.bot/install.ps1 | iex
```

**适用場景**：未安裝 Node.js 的環境

---

# 配置

# 配置

```bash
clawdbot onboard --install-daemon
```

**参数說明**：
- `--install-daemon` - 安裝后台服务，让 Clawdbot 在后台運行

# 配置
- 模型選擇
# 配置
# 配置

---

### 3. 運行 Clawdbot

#### 命令 1：首次運行（選擇模型）

```bash
ollama launch clawdbot
```

**功能**：首次運行时会提示選擇模型

# 配置

```bash
ollama launch clawdbot --config
```

# 修改

---

## 🤖 模型選擇

### 推荐模型

| 模型名称 | 特點 | 适用場景 |
|---------|------|----------|
| `glm-4.7` | ⭐⭐⭐⭐⭐ | **强烈推荐**，针对智能体工具調用訓練，支持现代 AI Agent 功能 |
| `qwen3-coder` | ⭐⭐⭐ | 代碼任務，但对现代智能体工具調用支持有限 |
| `gpt-oss:20b` | ⭐⭐⭐ | 通用任務，20B 参数 |
| `gpt-oss:120b` | ⭐⭐ | 通用任務，120B 参数（需要强大硬體） |

### 選擇建議

**首选**：`glm-4.7`
- ✅ 针对智能体工具調用专门訓練
- ✅ 支持现代 AI Agent 功能
- ✅ 平衡效能和資源占用

**备选**：`qwen3-coder`
- 适合代碼相關任務
- 不推荐用于通用智能体場景

**不推荐**：`qwen3` 和 `gpt-oss`
- 对现代智能体工具調用支持不佳
- 缺乏 Agent 专项優化

---

# 配置

### 上下文长度設置

**推荐設置**：32K - 64K

**設置步骤**：
1. 登入 Ollama 帳戶
# 配置
3. 拖动到 32K 或 64K

**說明**：
- 上下文长度越大，模型能處理的資訊越多
- 32K 适合大多数場景
- 64K 适合长文檔處理
- 更大的上下文需要更多記憶體

---

## 💻 系統要求

### 硬體要求

# 配置
|------|---------|----------|
| CPU | 4 核 | 8 核以上 |
| 記憶體 | 8GB | 16GB 以上 |
| 儲存 | 10GB 可用空間 | 50GB 以上（SSD） |
| GPU | 無 | 8GB VRAM 以上（可选） |

### 軟體要求

- **操作系統**：Windows, macOS, Linux
# 版本
# 版本

---

## 🎯 應用程式場景

### 适合場景

- [x] 本地開發環境
- [x] 數據敏感場景（隱私要求高）
- [x] 離線工作環境
- [x] 成本敏感專案
- [x] 智能体開發和測試
- [x] 工具链調用实验

### 不适合場景

- [ ] 需要最高效能的場景
- [ ] 超大规模并发请求
- [ ] 实时性要求极高的應用程式
- [ ] 硬體資源受限的環境

---

## 📝 筆記和總結

### 關鍵要點

1. **安裝简单**：一条 npm 命令即可完成安裝
# 配置
3. **模型選擇**：glm-4.7 是最佳選擇，针对智能体優化
# 配置
5. **完全本地**：無需網路，數據安全

### 實踐建議

#### 開發流程

1. **環境准备**
   - 安裝 Node.js
   - 安裝 Ollama
   - 下載推荐模型（glm-4.7）

# 部署
   - 運行安裝命令
# 配置
# 配置

3. **測試驗證**
   - 運行基本命令測試
   - 驗證工具調用功能
   - 檢查效能和稳定性

#### 效能優化

- **使用 GPU**：如果有 GPU，显著提升推理速度
# 版本
- **批量處理**：合理安排请求，避免频繁切換模型

---

## 🔍 与其他方案對比

### vs. 使用 API 服务（OpenAI, Claude 等）

| 维度 | Ollama + Clawdbot | API 服务 |
|------|-------------------|----------|
| 成本 | ✅ 免費 | ❌ 按量付费 |
| 隱私 | ✅ 完全本地 | ⚠️ 數據上傳 |
| 稳定性 | ⚠️ 依赖本地硬體 | ✅ 雲端稳定 |
# 配置
| 延遲 | ✅ 低延遲 | ⚠️ 網路延遲 |
| 離線 | ✅ 支持離線 | ❌ 需要網路 |

### vs. 其他本地方案（如 LM Studio）

| 维度 | Ollama + Clawdbot | LM Studio |
|------|-------------------|-----------|
| 易用性 | ✅ 命令行简单 | ⚠️ GUI 较复杂 |
| 整合性 | ✅ 支持智能体框架 | ⚠️ 通用模型運行器 |
| 社區支持 | ✅ 活跃社區 | ⚠️ 社區较小 |
| 文檔品質 | ✅ 詳細文檔 | ⚠️ 文檔较少 |

---

# 指南

# 部署

```bash
# 1. 安裝 Clawdbot
npm install -g clawdbot@latest

# 配置
clawdbot onboard --install-daemon

# 3. 啟動（選擇 glm-4.7 模型）
ollama launch clawdbot

# 配置
# 拖动到 32K 或 64K
```

### 測試命令

```bash
# 測試基本功能
echo "Hello" | clawdbot

# 測試工具調用
clawdbot "帮我創建一个測試檔案"
```

---

## 📚 學習資源

### 官方文檔

- [Clawdbot GitHub](https://github.com/clawdbot/clawdbot)
- [Ollama 官方文檔](https://ollama.com/docs)
# 指南

# 教程

- [Clawdbot 快速入门](https://clawdbot.com/quickstart)
- [Ollama 模型库](https://ollama.com/library)
# 指南

---

## 🐛 常见問題

### 安裝問題

**Q: npm install 失败？**
# 版本

**Q: PowerShell 腳本执行失败？**
A: 運行 `Set-ExecutionPolicy RemoteSigned` 允许腳本执行

### 運行問題

**Q: 模型加载很慢？**
A: 首次運行需要下載模型，耐心等待

**Q: 記憶體不足？**
A: 尝试使用量化模型或减小上下文长度

### 功能問題

**Q: 工具調用不工作？**
A: 确保使用 glm-4.7 模型，它支持智能体工具調用

**Q: 后台服务停止？**
# 配置

---

## 🔗 相關資源

### 相關筆記

# 指南
# 分析
# AI 知識

### 相關專案

- [[1 Projects/03-Personal/Core/📖 [渐进] Google Gemini 模型概览.md]]

### 相關工具

- [[0 Inbox/Obsidian 工具評估示例.md]] - Obsidian 工具評估
- [[Cursor IDE - 快速捕获示例]] - Cursor IDE 快速捕获

### 外部連結

- [Ollama 官网](https://ollama.com)
- [Clawdbot GitHub](https://github.com/clawdbot/clawdbot)
- [GLM-4.7 模型文檔](https://ollama.com/library/glm-4.7)

---

## ✅ 評估和總結

### 資源價值

**學習價值**：⭐⭐⭐⭐⭐
- 詳細的技術實現步骤
- 清晰的模型選擇建議
# 配置

**实用價值**：⭐⭐⭐⭐⭐
# 配置
# 部署
# 指南

**創新價值**：⭐⭐⭐⭐
- 结合 Ollama 和 Clawdbot 的創新用法
- 免費實現 AI 智能体的实用方案

### 个人總結

# 部署

1. **完全免費** - 無需 API 費用
2. **隱私安全** - 數據完全本地
# 配置
4. **功能强大** - 支持现代 AI Agent 工具調用

**最佳實踐**：
- 使用 glm-4.7 模型，它针对智能体優化
# 配置
- 优先考虑使用場景：開發環境、數據敏感、離線工作

**适用人群**：
- 開發者和技術爱好者
- 需要本地 AI 環境的使用者
- 數據隱私敏感的專案
- 成本敏感的个人或小團隊

### 行动計劃

# 部署
- [ ] 測試 glm-4.7 模型的智能体功能
- [ ] 開發一个简单的 Agent 應用程式
- [ ] 編寫詳細的使用筆記和示例
# 分享

---

# 整理
# 教程
# 部署
> - 建議創建相關的實踐筆記和專案記錄
