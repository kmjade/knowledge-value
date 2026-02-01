---

## 📌 核心內容

### 文檔概述

本文檔記錄了使用 Ollama 和 Claude Code（Claude Desktop）構建完全開源的本地 AI 編程環境的完整過程。通過這個閉環，實現了：

# 部署
# 管理
- ✅ **IDE 整合** - Claude Code 通過 Anthropic API 鰃用本地模型
- ✅ **自動化腳本** - PowerShell 腳本實現模型下載和切換
- ✅ **零成本運行** - 完全離線運行，無 API 消耗

### 核心成果

| 成果 | 說明 | 狀態 |
|------|------|------|
| **環境搭建** | Ollama + Claude Code 完整整合 | ✅ 已完成 |
| **腳本開發** | PowerShell 自動化腳本 | ✅ 已完成 |
# 管理
| **接口驗證** | 成功調用本地模型 | ✅ 已完成 |
# 配置

---

### 文檔概述

本文檔記錄了使用 Ollama 和 Claude Code（Claude Desktop）構建完全開源的本地 AI 編程環境的完整過程。通過這個閉環，實現了：

# 部署
# 管理
- ✅ **IDE 整合** - Claude Code 通過 Anthropic API 調用本地模型
- ✅ **自動化腳本** - PowerShell 腳本實現模型下載和切換
- ✅ **零成本運行** - 完全離線運行，無 API 費用

### 核心成果

| 成果 | 說明 | 狀態 |
|------|------|------|
| **環境搭建** | Ollama + Claude Code 完整整合 | ✅ 已完成 |
| **腳本開發** | PowerShell 自動化腳本 | ✅ 已完成 |
# 管理
| **接口驗證** | 成功調用本地模型 | ✅ 已完成 |
# 配置

---

## 🎯 核心技術方案

### 技術架構

```mermaid
graph TD
    A[使用者需求] --> B[Ollama 本地推理]
    A --> C[Claude Code IDE]
    B --> D[Ollama CLI]
    C --> E[Anthropic API Bridge]
# 管理
    E --> F
    F --> G[自動化腳本]
    G --> H[PowerShell]
    H --> I[使用者交互]

    style B fill:#90EE90
    style C fill:#FF6B6B
    style E fill:#A5D6A7
    style G fill:#FFE4E1
    style I fill:#82C91A
```

### 核心組件

| 組件 | 工具/技術 | 作用 |
|------|-----------|------|
| **推理引擎** | Ollama | 本地運行開源大模型 |
| **開發環境** | Claude Code | Anthropic IDE |
# 管理
| **API 橋接** | Anthropic API | 让 Claude Code 調用本地 Ollama 模型 |
| **自動化工具** | PowerShell | 自動化腳本 |
| **模型列表** | qwen3:latest, glm-4.7-flash | 開源中文模型 |

---

## 📝 詳細技術實現

# 配置

#### 環境变量設置

```powershell
# Configure Claude Code to use local Ollama (Anthropic-compatible API)
$env:ANTHROPIC_AUTH_TOKEN = "ollama"
$env:ANTHROPIC_BASE_URL = "http://localhost:11434"
$env:ANTHROPIC_API_KEY = "ollama"

# Optional: run Claude Code (uncomment to use)
# $model = "qwen3:latest"
# $modelExists = (ollama list | Select-String -SimpleMatch $model)

if (-not $modelExists) {
    Write-Host "Model '$model' not found locally. Pulling via Ollama..."
    ollama pull $model
} else {
    Write-Host "Model '$model' already exists locally. Using Ollama..."
}

# Set the model for Claude Code
$model = "qwen3:latest"

# Run Claude Code
claude --model $model
```

```powershell
# Configure Claude Code to use local Ollama (Anthropic-compatible API)
$env:ANTHROPIC_AUTH_TOKEN = "ollama"
$env:ANTHROPIC_BASE_URL = "http://localhost:11434"
$env:ANTHROPIC_API_KEY = "ollama"

# Optional: run Claude Code (uncomment to use)
# $model = "qwen3:latest"
# $modelExists = (ollama list | Select-String -SimpleMatch $model)

if (-not $modelExists) {
    Write-Host "Model '$model' not found locally. Pulling via Ollama..."
    ollama pull $model
} else {
    Write-Host "Model '$model' already exists locally. Using Ollama..."
}

# Set the model for Claude Code
$model = "gemma3:1b"

# Run Claude Code
claude --model $model
```


# 配置

| 参数 | 說明 | 示例 |
|------|------|------|
| `AUTH_TOKEN` | 认证令牌 | "ollama" |
| `BASE_URL` | API 基礎地址 | "http://localhost:11434" |
| `API_KEY` | API 密钥 | "ollama" |
| `model` | 指定模型 | "qwen3:latest" |

---

# 管理

#### 模型列表

| 模型名称 | 类型 | 用途 | 特點 |
|----------|------|------|
| **qwen3:latest** | 主力模型 | 日常開發 | 对 Claude Code 支持较好 |
| **glm-4.7-flash** | 备用模型 | Claude Code 支持不佳，切換使用 | 開源中文模型 |

#### 命令操作

```powershell
# 拉取模型
ollama pull qwen3:latest
ollama pull glm-4.7-flash

# 列出已安裝模型
ollama list

# 運行指定模型
ollama run qwen3:latest "写一个Python腳本"
```

---

### 3. PowerShell 自動化腳本

#### 腳本名称
`claude-code-ollama-qwen3.ps1`

#### 腳本逻辑

```powershell
# 1. 環境变量設置
$env:ANTHROPIC_AUTH_TOKEN = "ollama"
$env:ANTHROPIC_BASE_URL = "http://localhost:11434"
$env:ANTHROPIC_API_KEY = "ollama"

# 2. 模型存在性檢查
$modelExists = (ollama list | Select-String -SimpleMatch $model)

# 3. 自動拉取模型（如果不存在）
if (-not $modelExists) {
    Write-Host "Model '$model' not found locally. Pulling via Ollama..."
    ollama pull $model
}

# 4. 啟動 Claude Code
claude --model $model
```

# 方法

# 修改
2. **右键運行** - 在 PowerShell 中右键腳本檔案
3. **自動执行** - 腳本会自動檢查和下載模型
4. **模型切換** - 支持在腳本中切換不同模型（如 glm-4.7-flash）

---

# 分析

### 核心观点

1. **創新的技術方案** - 通過 Anthropic API 橋接，让 Claude Code 能夠調用本地 Ollama 模型，这是一个巧妙的解決方案
2. **開源免費閉環** - 完全基于開源工具（Ollama + 開源模型），零成本運行
3. **本地化運行** - 所有推理在本地進行，保護隱私，無需網路傳輸
4. **自動化腳本** - PowerShell 腳本實現了模型的自動檢查和下載，提升開發體驗
5. **多模型支持** - 支持多個開源中文模型，可以根据需要灵活切換

### 个人思考

#### 核心價值是什么？

這個方案的核心價值在于**實現了"雲端 IDE + 本地推理"的完美结合**：

1. **保留 IDE 體驗** - 繼續使用 Claude Code 的優秀 IDE 體驗
2. **降低運行成本** - 使用本地免費模型，零 API 費用
3. **提升響應速度** - 本地推理避免了網路延遲
4. **數據隱私保護** - 代碼和數據都在本地運行
5. **開源生態利用** - 利用豐富的開源大模型生態

#### 技術亮点

| 亮点 | 說明 |
|------|------|
| **API 橋接** | Ollama 實現 Anthropic API 接口，让 Claude Code 無缝調用 |
| **自動拉取** | 腳本自動檢查模型并从 Hugging Face 下載 |
| **模型切換** | 支持在 qwen3 和 glm-4.7-flash 之间切換 |
| **多模型共存** - 可以同时安裝多個開源模型，按需使用 |
# 配置
| **完全離線** - 本地推理，不需要联网 |

---

## 🔑 關鍵要點

| 要點 | 說明 |
|------|------|
# 管理
| **Anthropic API** | Anthropic 提供的標準化 API 接口 |
| **Claude Code** | Anthropic 官方 IDE，支持多种模型調用 |
| **API 橋接** | Ollama 實現的 Anthropic API 相容接口，關鍵創新点 |
# 配置
| **模型拉取** | Ollama 从 Hugging Face 自動下載模型权重 |
| **qwen3:latest** | 通义千问 3（Qwen3）模型，适合 Claude Code |
| **glm-4.7-flash** | 智谱 GLM-4-7-Flash 模型，開源中文模型 |

---

## 🏷️ 分類標籤

### 內容类型
- #技術方案
- #本地開發
- #AI工具
- #Ollama
- #Claude Code
- #自動化腳本

### 领域標籤
# 部署
- #開源模型
- #API橋接
- #技術筆記

### 優先級
- #優先級/高

---

## 🔗 关联連結

### 相關網頁

- [[Ollama 官网]] - https://ollama.com/
- [[Claude Code 官网]] - https://claude.ai/claude-code
- [[Anthropic API 文檔]] - https://docs.anthropic.com/
- [[Hugging Face]] - https://huggingface.co/

### PARA 关联

#### Project - 可能的專案

- [[_templates/para/📁 quick/Project]] - 開發本地 AI 編程環境
  - 目標：優化和完善 Ollama + Claude Code 整合方案
  - 截止日期：待定
  - 进度：已完成基礎閉環

#### Area - 相關领域

- [[_templates/para/📁 quick/Area]] - AI 工具与技術
# 部署
  - 學習频率：每周關注新技術

- [[_templates/para/📁 quick/Area]] - 開發能力提升
  - 維護目標：提升腳本編程和自動化能力
  - 改进方向：學習 Python 腳本編寫

#### Resource - 相關資源

- [[_templates/para/📁 quick/Resource]] - Ollama 技術文檔
  - 类型：工具文檔
  - 用途：Ollama CLI 參考手册

- [[_templates/para/📁 quick/Resource]] - 開源模型库
  - 类型：模型資源
  - 用途：Hugging Face 模型參考

---

## 📋 後續行动

### 待辦事項

- [x] **完成基礎閉環** - 已成功運行 Claude Code 調用本地 Ollama
- [ ] **模型對比測試** - 對比 qwen3 和 glm-4.7 的效能和效果
# 配置
- [ ] **Python 腳本開發** - 考虑開發 Python 腳本替代 PowerShell
- [ ] **模型擴展** - 尝试更多開源模型（如 LLaMA、Mistral 等）
# 配置

# 整理

#### 转化为 Literature Note

- 提取 API 橋接的實現原理和關鍵技術点
# 方法
# 整理
- 收集開源模型的評估和選擇標準

#### 转化为 Permanent Note

- **本地化 AI 方案** - 總結雲端 IDE + 本地推理的技術方案
- **API 橋接模式** - 記錄这种相容性設計的思路和實現
# 方法

#### 归入特定 Area

# 部署
- **開源生態利用** - 作为開源工具使用的參考

---

## 📊 方案評估

### 優勢

| 優勢 | 說明 | 重要程度 |
|------|------|----------|
| **零成本** | 完全免費，無 API 費用 | ⭐⭐⭐⭐⭐ |
| **隱私保護** | 數據和代碼都在本地 | ⭐⭐⭐⭐⭐ |
| **響應速度快** | 本地推理，無網路延遲 | ⭐⭐⭐⭐ |
| **無限制使用** | 無 token 限制 | ⭐⭐⭐⭐⭐ |
| **開源生態** | 利用豐富的開源模型 | ⭐⭐⭐⭐ |
| **IDE 體驗** | 保留 Claude Code 的優秀體驗 | ⭐⭐⭐⭐ |

### 挑戰与改进

| 挑戰 | 說明 | 解決方案 |
|------|------|----------|
| **模型相容性** | 不是所有開源模型都完美相容 Claude Code | 測試和選擇最佳模型 |
| **技術棧复杂度** | 需要多個工具（Ollama、Claude Code、PowerShell） | 簡化腳本，編寫文檔 |
# 教程
# 更新
| **資源占用** | 本地模型占用大量磁碟空間 | 定期清理不需要的模型 |

---

## 💡 創新想法

### 潜在應用程式場景

#### 1. 多 IDE 支持

> **想法**: 開發一个通用的 API 橋接，支持多個 IDE
> **價值**: 不仅限于 Claude Code，还支持 Cursor、Windsurf 等
> **實現**: 使用標準化 Anthropic API 接口

#### 2. 模型效能對比

> **想法**: 開發一个自動化工具，對比不同模型的效能
> **價值**: 科學選擇最佳模型，優化開發體驗
> **實現**: 使用標準化測試集，自動生成效能報告

#### 3. 團隊協作環境

# 配置
> **價值**: 團隊協作，統一開發環境
# 配置

#### 4. 自動化測試

> **想法**: 編寫自動化測試腳本，自動測試模型相容性
> **價值**: 節省手動測試時間，快速發現問題
> **實現**: CI/CD 整合，自動運行測試套件

---

## 📝 备注

# 分析

**技術棧總結**:
# 版本
- Claude Code (支持 Anthropic API)
- PowerShell 5.1+
- qwen3:latest (通义千问)
- glm-4.7-flash (智谱 GLM)
- Windows 11 或更高

**适用場景**:
- 本地 AI 開發
- 開源大模型研究和測試
- 零成本編程環境
- 數據隱私要求高的場景

**學習建議**:
1. 熟悉 Ollama CLI 常用命令
2. 了解 Anthropic API 規範
3. 學習 PowerShell 腳本編程
4. 關注開源模型發展動態
# 更新

---

> [!tip] 技術提示
# 版本
> 2. **硬體要求** - 本地運行需要足夠的 GPU/CPU 資源
> 3. **模型品質** - 選擇經過驗證的高品質開源模型
# 配置

---

> [!info] 使用場景
# 部署
> - 零成本、隱私保護的 AI 開發環境
# 方法
# 管理

---

**報告生成時間**: 2026-01-29
# 版本
**狀態**: ✅ 完成
