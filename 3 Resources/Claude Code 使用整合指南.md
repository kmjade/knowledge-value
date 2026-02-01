---
title: 🤖 Claude Code 使用整合指南
status: active
priority: high
tags: [Claude Code, AI编程, 开发工具, 国内使用]
aliases: [Claude Code Integration Guide, Claude Code Tutorial]
created: 2026-01-31
modified: 2026-01-31
---

# 🤖 Claude Code 使用整合指南

> Claude Code 是 Anthropic 推出的 agentic 编码工具，可在命令行或 IDE 中运行，借助 Claude 的语言模型能力来辅助写代码、重构、调试、维护和理解代码库。本文檔整合所有 Claude Code 相關資源，提供完整的使用指南。

## 📋 目錄

- [Claude Code 概述](#claude-code-概述)
- [快速開始](#快速開始)
- [安裝指南](#安裝指南)
- [國內使用方案](#國內使用方案)
- [高級功能](#高級功能)
- [開發實踐](#開發實踐)
- [故障排除](#故障排除)

---

## Claude Code 概述

### Claude Code 是什麼？

**定義**: Claude Code 是一個 AI 輔助編程工具，可以在終端或 IDE 中運行，利用 Claude 的語言模型能力幫助開發者完成各種編程任務。

### 核心特點

```
智能編碼能力
├── 理解整個代碼庫（不只是單個文件）
├── 支持自然語言命令（"說"的方式）
├── 執行命令/運行 shell 或 bash 命令
└── 支持項目記憶（CLAUDE.md 文件）
```

### 主要功能

| 功能 | 說明 | 應用場景 |
|------|------|----------|
| **智能代碼生成** | 快速生成高質量代碼 | 新功能開發、腳本編寫 |
| **代碼分析** | 深度理解和分析代碼結構 | 代碼審查、架構理解 |
| **調試助手** | 智能發現和修復代碼問題 | Bug 修復、錯誤定位 |
| **文檔生成** | 自動生成代碼文檔 | API 文檔、README 編寫 |
| **命令行集成** | 無縫集成到開發流程 | CI/CD、自動化腳本 |

---

## 快速開始

### 5 分鐘快速開始

```
步驟 1：安裝 Node.js
  ↓
步驟 2：全局安裝 Claude Code
  ↓
步驟 3：配置 API 密鑰（國內用戶需要）
  ↓
步驟 4：進入項目目錄
  ↓
步驟 5：啟動 Claude Code
```

### 首次啟動

```bash
# 進入項目目錄
cd your-project-folder

# 啟動 Claude Code
claude
```

**首次啟動後需要**:
- 選擇喜歡的主題（回車）
- 確認安全須知（回車）
- 使用默認 Terminal 配置（回車）
- 信任工作目錄（回車）
- **開始編程！🚀**

---

## 安裝指南

### Windows 安裝

#### 系統要求
- 操作系統: Windows 10/11
- 終端: PowerShell 或 Windows Terminal
- 網絡: 需要訪問 API（首次使用時）

#### 安裝步驟

**1. 安裝 Node.js**
```
訪問 Node.js 官網，下載並安裝 LTS 版本
驗證安裝: node -v
```

**2. 設置 npm 配置**
```powershell
# 設置 npm 在安裝包時忽略執行腳本
setx NPM_CONFIG_IGNORE_SCRIPTS true
```

**3. 全局安裝 Claude Code**
```powershell
npm install -g @anthropic-ai/claude-code
```

**4. 驗證安裝**
```powershell
claude-code --version
```

#### 配置環境變量

**方法一：圖形化配置（推薦，永久生效）**

1. 右鍵點擊「此電腦」→ 選擇「屬性」
2. 點擊「高級系統設置」
3. 在「系統屬性」窗口中點擊「環境變量」
4. **重要**: 在「系統變量」部分點擊「新建」（多人共用電腦可選擇「用戶變量」）
5. 添加以下兩個變量：
   - 變量名：`ANTHROPIC_AUTH_TOKEN`，變量值：`sk-your-api-key`
   - 變量名：`ANTHROPIC_BASE_URL`，變量值：`https://api.whatai.cc`
6. 點擊「確定」保存

**方法二：PowerShell（永久設置）**
```powershell
[Environment]::SetEnvironmentVariable("ANTHROPIC_AUTH_TOKEN", "sk-your-api-key", "User")
[Environment]::SetEnvironmentVariable("ANTHROPIC_BASE_URL", "https://api.whatai.cc", "User")
```

**方法三：通過 settings.json 設置**

```powershell
# 找到 settings.json 文件
C:\Users\{user}\.claude\settings.json

# 設置 API 信息
{
  "env": {
    "ANTHROPIC_MODEL": "claude-sonnet-4-20250514",
    "ANTHROPIC_SMALL_FAST_MODEL": "claude-sonnet-4-20250514",
    "ANTHROPIC_BASE_URL": "https://api.whatai.cc",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-api-key"
  }
}
```

**方法四：命令提示符（臨時設置）**
```cmd
set ANTHROPIC_AUTH_TOKEN=sk-your-api-key
set ANTHROPIC_BASE_URL=https://api.whatai.cc
claude
```

**注意**: 永久設置後需要重啟終端才能生效。推薦使用永久配置方式。

---

### macOS & Linux 安裝

#### 系統要求
- 操作系統: macOS 10.14+ 或 Linux
- 終端: Bash 或 Zsh
- 包管理器: Homebrew（推薦）

#### 安裝步驟

**1. 安裝 Homebrew（如未安裝）**
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

**2. 安裝 Node.js**
```bash
brew install node
```

**3. 安裝 Claude Code**
```bash
npm install -g @anthropic-ai/claude-code
```

#### 配置 API 密鑰

**獲取 Auth Token（參考神馬中轉 API 文檔）**

**方法一：使用 Bash（推薦）**
```bash
echo 'export ANTHROPIC_AUTH_TOKEN="sk-your-api-key"' >> ~/.bash_profile
echo 'export ANTHROPIC_BASE_URL="https://api.whatai.cc"' >> ~/.bash_profile
source ~/.bash_profile
```

**方法二：使用 Zsh（如果使用 Oh My Zsh）**
```bash
echo 'export ANTHROPIC_AUTH_TOKEN="sk-your-api-key"' >> ~/.zshrc
echo 'export ANTHROPIC_BASE_URL="https://api.whatai.cc"' >> ~/.zshrc
source ~/.zshrc
```

**注意**: 永久設置後需要重啟終端才能生效。

---

## 國內使用方案

### 神馬中轉 API

**為什麼需要神馬中轉？**

Claude Code 官方 API 在國內可能無法直接訪問，神馬中轉 API（api.whatai.cc）提供了國內可訪問的轉發服務。

**特點**:
- ✅ 國內直接訪問，無需 VPN
- ✅ 支持 Claude Code 所有功能
- ✅ 穩定的服務質量
- ✅ 按用量計費，透明計價

### 配置神馬中轉

**獲取 API 密鑰**:
1. 訪問 [神馬中轉 API](https://api.whatai.cc/)
2. 註冊並獲取 API 密鑰（格式：`sk-xxxx`）

**配置環境變量**:

**Windows**:
```powershell
setx ANTHROPIC_AUTH_TOKEN "sk-your-api-key"
setx ANTHROPIC_BASE_URL "https://api.whatai.cc"
```

**macOS/Linux**:
```bash
echo 'export ANTHROPIC_AUTH_TOKEN="sk-your-api-key"' >> ~/.bash_profile
echo 'export ANTHROPIC_BASE_URL="https://api.whatai.cc"' >> ~/.bash_profile
source ~/.bash_profile
```

### API 密鑰管理建議

- **令牌分組**: 在神馬中轉創建令牌時，建議選擇「企業分組中轉分組」
- **密鑰安全**: 不要將 API 密鑰提交到版本控制系統
- **定期更換**: 建議定期更換 API 密鑰
- **用量監控**: 定期檢查 API 使用量，避免超額費用

---

## 高級功能

### IDE 集成

**支持的 IDE**:
- VS Code - 通過擴展集成
- Cursor - 內置 Claude Code 支持
- JetBrains 系列 - 通過插件支持
- 其他支持終端的 IDE

**VS Code 集成示例**:
```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Run Claude Code on current file",
      "type": "shell",
      "command": "claude-code",
      "args": ["analyze", "${file}"],
      "problemMatcher": []
    }
  ]
}
```

### MCP 服務器

**擴展 Agent 能力**

MCP (Model Context Protocol) 服務器允許 Claude Code 與外部工具和數據源集成。

**配置示例**:
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem"]
    },
    "database": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"]
    }
  }
}
```

### CI/CD 集成

**GitHub Actions 示例**:
```yaml
name: Code Review with Claude Code
on: [pull_request]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code
      - name: Run code review
        env:
          ANTHROPIC_AUTH_TOKEN: ${{ secrets.ANTHROPIC_AUTH_TOKEN }}
          ANTHROPIC_BASE_URL: ${{ secrets.ANTHROPIC_BASE_URL }}
        run: |
          claude-code review src/
```

### 團隊規範

**通過 CLAUDE.md 文件定義團隊規範**

```markdown
# 項目規範

## 代碼風格
- 使用 TypeScript 嚴格模式
- 遵循 ESLint 規則
- 統一命名約定

## 項目結構
- src/ - 源代碼
- tests/ - 測試文件
- docs/ - 文檔
- scripts/ - 構建腳本

## 常用腳本
- npm run dev - 開發服務器
- npm run test - 運行測試
- npm run build - 構建生產版本
```

---

## 開發實踐

### 快速項目初始化

**場景**: 需要快速搭建一個包含前後端的完整項目結構，包括配置文件、Docker 支持、測試框架等。

**操作步驟**:
```bash
# 在終端中打開目標目錄，然後啟動 Claude
claude
```

**Prompt 示例**:
```markdown
請幫我創建一個全棧應用的項目結構，要求：

1. 後端：Node.js + Express + TypeScript + Prisma ORM
2. 前端：React + TypeScript + Vite + TailwindCSS
3. 包含 Docker Compose 配置（前端、後端、PostgreSQL、Redis）
4. 包含 ESLint、Prettier 配置
5. 包含 GitHub Actions CI/CD 配置
6. 包含完整的 README.md

項目名稱：task-manager
請生成完整的目錄結構和所有必要的配置文件。
```

**預期輸出結構**:
```
task-manager/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── index.ts
│   ├── prisma/
│   │   └── schema.prisma
│   ├── tests/
│   ├── .env.example
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── Dockerfile
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
├── docker-compose.yml
├── .github/
│   └── workflows/
│       └── ci.yml
└── README.md
```

### 智能 API 端點與文檔生成

**場景**: 基於數據模型生成完整的 RESTful API

**Prompt 示例**:
```markdown
基於以下數據模型，生成完整的 RESTful API：

模型：
- User (id, email, name, role, createdAt, updatedAt)
- Task (id, title, description, status, priority, assigneeId, createdAt, updatedAt)
- Comment (id, taskId, userId, content, createdAt)

要求：
1. 為每個模型生成完整的 CRUD 端點
2. 包含身份驗證中間件（JWT）
3. 包含輸入驗證（使用 Joi 或 Zod）
4. 包含分頁、排序、過濾功能
5. 生成 OpenAPI/Swagger 文檔
6. 包含示例請求和響應
7. 輸出格式：完整的 routes 文件和 controller 文件
```

### 性能優化分析

**場景**: 發現代碼性能問題，需要 Claude 分析並提供優化方案。

**Prompt 示例**:
```markdown
分析以下 React 組件的性能問題並提供優化方案：

[粘貼你的代碼]

請從以下角度分析：
1. 不必要的重渲染
2. 內存洩漏風險
3. 大列表渲染優化
4. 異步操作優化
5. Bundle size 優化

輸出：
- 問題清單（按嚴重程度排序）
- 每個問題的具體優化方案
- 優化後的完整代碼
- 性能提升預期
```

### 代碼現代化升級

**場景**: 將舊版 JavaScript 代碼升級為現代 TypeScript

**Prompt 示例**:
```markdown
將以下 JavaScript 代碼升級為現代 TypeScript，要求：

1. 添加完整的類型定義
2. 使用 ES6+ 特性（async/await、解構、模板字符串等）
3. 改進錯誤處理
4. 添加 JSDoc 註釋
5. 遵循 TypeScript 最佳實踐

[粘貼舊代碼]

額外要求：
- 保持向後兼容
- 列出所有破壞性變更
- 提供遷移指南
```

### 測試代碼生成

**場景**: 為模塊生成完整的測試套件

**Prompt 示例**:
```markdown
為以下模塊生成完整的測試套件：

[粘貼你的代碼模塊]

測試要求：
1. 單元測試（Jest/Vitest）
2. 集成測試
3. 邊界條件測試
4. 錯誤場景測試
5. Mock 外部依賴
6. 測試覆蓋率目標：>90%

輸出：
- 完整的測試文件
- 測試用例說明表格
- Mock 數據生成函數
- 測試運行配置
```

---

## 常用命令

### 基礎命令

| 命令 | 說明 |
|------|------|
| `claude-code --help` | 顯示幫助信息 |
| `claude-code --version` | 顯示版本號 |
| `claude-code --chat` | 進入交互式對話模式 |
| `claude-code --prompt "<prompt>"` | 直接發送提示並獲取回覆 |
| `claude-code --diff <file1> <file2>` | 比較兩個文件差異 |

### 文件操作命令

| 命令 | 說明 |
|------|------|
| `claude-code read <file>` | 讀取文件內容 |
| `claude-code write <file> <content>` | 寫入文件內容 |
| `claude-code edit <file>` | 使用默認編輯器編輯文件 |

### 代碼分析命令

| 命令 | 說明 |
|------|------|
| `claude-code analyze <file>` | 分析代碼文件 |
| `claude-code explain <code>` | 解釋代碼片段 |
| `claude-code refactor <file>` | 重構代碼文件 |

---

## 切換模型

### 模型選擇

**默認模型**: `Sonnet 4`

**效果更好的模型**:
```bash
# Opus（最強）
claude-code /model opus

# Sonnet 3.7
claude-code /model claude-3-7-sonnet-20250219

# Sonnet 3.5
claude-code /model claude-3-5-sonnet-20250219
```

### 其他 LLM 模型支持

**Claude Code 也支持其他模型**:

- **Kimi K2 支持**: 啟動 Claude Code 之後，只需要運行指令
```bash
/model moonshotai/kimi-k2-instruct
```

- **其他模型**: OpenAI、Gemini、Qwen、DeepSeek 等均支持使用

---

## 故障排除

### 常見問題

| 問題 | 可能原因 | 解決方案 |
|------|----------|----------|
| 命令未找到 | 未在系統 PATH 中 | 重啟終端或使用完整路徑 |
| 認證失敗 | API 密鑰無效 | 檢查密鑰格式，重新登錄 |
| 網絡錯誤 | 防火牆或網絡限制 | 檢查網絡連接，使用代理 |
| 文件訪問權限 | 文件訪問權限 | 以管理員身份運行 PowerShell |
| 配額不足 | Claude Code API 配額用盡 | 檢查 API 使用量，升級套餐 |

### 調試建議

**1. API 密鑰配置**
- 請將 `sk-your-api-key` 替換為您在本站生成的實際 API 密鑰
- 令牌分組：在本站創建令牌時，建議選擇「企業分組中轉分組」
- 網絡連接：確保網絡連接穩定，工具需要與 API 服務器通信
- 項目目錄：建議在具體項目目錄下使用，以獲得更好的上下文理解

**2. 安裝問題**
- Windows: 確保以管理員身份運行 PowerShell
- Node.js: 確認 Node.js 版本 >= 18
- 環境變量: 重啟終端使環境變量生效

**3. 使用問題**
- 上下文文件: 通過 `--context` 參數傳遞項目配置
- 模型選擇: 使用 `/model` 命令切換模型
- 對話歷史: 使用 `/clear` 清除對話歷史

---

## 相關資源

### Claude Code 官方資源

- [Claude Code 官方文檔](https://docs.anthropic.com/en/docs/claude-code)
- [Claude Code GitHub](https://github.com/anthropics/claude-code)
- [API 參考](https://docs.anthropic.com/en/api/)

### 國內資源

- [神馬中轉 API](https://api.whatai.cc/) - 國內 API 轉發服務
- [Claude Code 國內使用教程](https://www.cnblogs.com/whatai/p/19108865) - 完整教學
- [Claude Code 安裝指南](https://www.cnblogs.com/whatai/p/19108866) - Windows 安裝

### AI 輔助相關

- [[3 Resources/01-Tech/🧠 AI 知识/🛠️ 工具/OpenCode/OpenCode+Ollama集成指南/README.md]] - OpenCode + Ollama 集成
- [[3 Resources/03-Productivity/🚀 生產力資源整合指南]] - 生產力工具整合

---

## 更新日誌

### 2026-01-31
- ✅ 創建 Claude Code 使用整合指南
- ✅ 整理現有 Claude Code 教程資源
- ✅ 提供完整的安裝和配置指南
- ✅ 包含國內使用方案（神馬中轉 API）
- ✅ 添加高級功能和開發實踐示例
- ✅ 完善故障排除知識庫

### 待辦事項
- [ ] 定期更新 Claude Code 教程資源
- [ ] 收集更多開發實踐案例
- [ ] 充實故障排除知識庫
- [ ] 跟蹤 Claude Code 新功能更新

---

## 快速參考卡

### Claude Code 命令

```
基礎命令
├── claude-code                - 啟動交互模式
├── claude-code "task"        - 執行任務
├── claude-code commit          - Git 提交
├── /help                     - 顯示幫助
└── /clear                    - 清除歷史

文件操作
├── claude-code read <file>     - 讀取文件
├── claude-code write <file>    - 寫入文件
├── claude-code edit <file>     - 編輯文件
└── claude-code analyze <file>  - 分析文件

模型切換
├── /model sonnet             - 默認模型
├── /model opus              - 最強模型
├── /model claude-3.7         - Sonnet 3.7
└── /model moonshotai/kimi-k2  - Kimi 模型
```

### 配置檢查清單

```
安裝檢查
☐ Node.js 已安裝 (node -v)
☐ Claude Code 已安裝 (claude-code --version)
☐ 環境變量已設置
☐ API 密鑰有效

使用檢查
☐ 能夠正常啟動 claude-code
☐ API 調用正常
☐ 項目訪問權限正常
☐ 網絡連接穩定
```

---

*創建時間: 2026-01-31*
*最後更新: 2026-01-31*
*分類: 3 Resources*
