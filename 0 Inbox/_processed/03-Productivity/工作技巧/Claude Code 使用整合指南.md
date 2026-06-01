---
# 指南
status: active
priority: high
tags: [Claude Code, AI編程, 開發工具, 国内使用]
aliases: [Claude Code Integration Guide, Claude Code Tutorial]
created: 2026-01-31
modified: 2026-01-31
---

# 指南

# 指南

## 📋 目錄

- [Claude Code 概述](#claude-code-概述)
- [快速開始](#快速開始)
# 指南
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
├── 理解整個代碼庫（不只是單個檔案）
├── 支持自然語言命令（"說"的方式）
├── 執行命令/運行 shell 或 bash 命令
└── 支持項目記憶（CLAUDE.md 檔案）
```

### 主要功能

| 功能 | 說明 | 應用場景 |
|------|------|----------|
| **智能代碼生成** | 快速生成高質量代碼 | 新功能開發、腳本編寫 |
# 分析
| **調試助手** | 智能發現和修復代碼問題 | Bug 修復、錯誤定位 |
| **文檔生成** | 自動生成代碼文檔 | API 文檔、README 編寫 |
| **命令行整合** | 無縫整合到開發流程 | CI/CD、自動化腳本 |

---

## 快速開始

### 5 分鐘快速開始

```
步驟 1：安裝 Node.js
  ↓
步驟 2：全局安裝 Claude Code
  ↓
# 配置
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
# 配置
- 信任工作目錄（回車）
- **開始編程！🚀**

---

# 指南

### Windows 安裝

#### 系統要求
- 操作系統: Windows 10/11
- 終端: PowerShell 或 Windows Terminal
- 網絡: 需要訪問 API（首次使用時）

#### 安裝步驟

**1. 安裝 Node.js**
```
# 版本
驗證安裝: node -v
```

# 配置
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

# 配置

# 方法

1. 右鍵點擊「此電腦」→ 選擇「屬性」
2. 點擊「高級系統設置」
3. 在「系統屬性」視窗中點擊「環境變量」
4. **重要**: 在「系統變量」部分點擊「新建」（多人共用電腦可選擇「用戶變量」）
5. 新增以下兩個變量：
   - 變量名：`ANTHROPIC_AUTH_TOKEN`，變量值：`sk-your-api-key`
   - 變量名：`ANTHROPIC_BASE_URL`，變量值：`https://api.whatai.cc`
6. 點擊「確定」儲存

# 方法
```powershell
[Environment]::SetEnvironmentVariable("ANTHROPIC_AUTH_TOKEN", "sk-your-api-key", "User")
[Environment]::SetEnvironmentVariable("ANTHROPIC_BASE_URL", "https://api.whatai.cc", "User")
```

# 方法

```powershell
# 找到 settings.json 檔案
C:\Users\{user}\.claude\settings.json

# 設置 API 資訊
{
  "env": {
    "ANTHROPIC_MODEL": "claude-sonnet-4-20250514",
    "ANTHROPIC_SMALL_FAST_MODEL": "claude-sonnet-4-20250514",
    "ANTHROPIC_BASE_URL": "https://api.whatai.cc",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-api-key"
  }
}
```

# 方法
```cmd
set ANTHROPIC_AUTH_TOKEN=sk-your-api-key
set ANTHROPIC_BASE_URL=https://api.whatai.cc
claude
```

# 配置

---

### macOS & Linux 安裝

#### 系統要求
- 操作系統: macOS 10.14+ 或 Linux
- 終端: Bash 或 Zsh
# 管理

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

# 配置

**獲取 Auth Token（參考神馬中轉 API 文檔）**

# 方法
```bash
echo 'export ANTHROPIC_AUTH_TOKEN="sk-your-api-key"' >> ~/.bash_profile
echo 'export ANTHROPIC_BASE_URL="https://api.whatai.cc"' >> ~/.bash_profile
source ~/.bash_profile
```

# 方法
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

# 配置

**獲取 API 密鑰**:
1. 訪問 [神馬中轉 API](https://api.whatai.cc/)
2. 註冊並獲取 API 密鑰（格式：`sk-xxxx`）

# 配置

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

# 管理

- **令牌分組**: 在神馬中轉創建令牌時，建議選擇「企業分組中轉分組」
# 版本
- **定期更換**: 建議定期更換 API 密鑰
- **用量監控**: 定期檢查 API 使用量，避免超額費用

---

## 高級功能

### IDE 整合

**支持的 IDE**:
- VS Code - 通過擴展整合
- Cursor - 內置 Claude Code 支持
- JetBrains 系列 - 通過外掛支持
- 其他支持終端的 IDE

**VS Code 整合示例**:
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

MCP (Model Context Protocol) 服務器允許 Claude Code 與外部工具和數據源整合。

# 配置
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

### CI/CD 整合

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

**通過 CLAUDE.md 檔案定義團隊規範**

```markdown
# 項目規範

## 代碼風格
- 使用 TypeScript 嚴格模式
- 遵循 ESLint 規則
- 統一命名約定

## 項目結構
- src/ - 源代碼
- tests/ - 測試檔案
- docs/ - 文檔
- scripts/ - 構建腳本

## 常用腳本
- npm run dev - 開發服務器
- npm run test - 運行測試
# 版本
```

---

## 開發實踐

### 快速項目初始化

# 配置

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
# 配置
# 配置
# 配置
6. 包含完整的 README.md

項目名稱：task-manager
# 配置
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
# 排序
5. 生成 OpenAPI/Swagger 文檔
6. 包含示例請求和響應
7. 輸出格式：完整的 routes 檔案和 controller 檔案
```

# 分析

# 分析

**Prompt 示例**:
```markdown
# 分析

[粘貼你的代碼]

# 分析
1. 不必要的重渲染
2. 內存洩漏風險
3. 大列表渲染優化
4. 異步操作優化
5. Bundle size 優化

輸出：
# 排序
- 每個問題的具體優化方案
- 優化後的完整代碼
- 效能提升預期
```

### 代碼現代化升級

**場景**: 將舊版 JavaScript 代碼升級為現代 TypeScript

**Prompt 示例**:
```markdown
將以下 JavaScript 代碼升級為現代 TypeScript，要求：

1. 新增完整的類型定義
2. 使用 ES6+ 特性（async/await、解構、模板字符串等）
3. 改進錯誤處理
4. 新增 JSDoc 註釋
5. 遵循 TypeScript 最佳實踐

[粘貼舊代碼]

額外要求：
- 保持向後相容
- 列出所有破壞性變更
# 指南
```

### 測試代碼生成

**場景**: 為模塊生成完整的測試套件

**Prompt 示例**:
```markdown
為以下模塊生成完整的測試套件：

[粘貼你的代碼模塊]

測試要求：
1. 單元測試（Jest/Vitest）
2. 整合測試
3. 邊界條件測試
4. 錯誤場景測試
5. Mock 外部依賴
6. 測試覆蓋率目標：>90%

輸出：
- 完整的測試檔案
- 測試用例說明表格
- Mock 數據生成函數
# 配置
```

---

## 常用命令

### 基礎命令

| 命令 | 說明 |
|------|------|
| `claude-code --help` | 顯示幫助資訊 |
# 版本
| `claude-code --chat` | 進入交互式對話模式 |
| `claude-code --prompt "<prompt>"` | 直接發送提示並獲取回覆 |
| `claude-code --diff <file1> <file2>` | 比較兩個檔案差異 |

### 檔案操作命令

| 命令 | 說明 |
|------|------|
| `claude-code read <file>` | 讀取檔案內容 |
| `claude-code write <file> <content>` | 寫入檔案內容 |
| `claude-code edit <file>` | 使用默認編輯器編輯檔案 |

# 分析

| 命令 | 說明 |
|------|------|
# 分析
| `claude-code explain <code>` | 解釋代碼片段 |
| `claude-code refactor <file>` | 重構代碼檔案 |

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
# 管理
| 配額不足 | Claude Code API 配額用盡 | 檢查 API 使用量，升級套餐 |

### 調試建議

# 配置
- 請將 `sk-your-api-key` 替換為您在本站生成的實際 API 密鑰
- 令牌分組：在本站創建令牌時，建議選擇「企業分組中轉分組」
- 網絡連接：確保網絡連接穩定，工具需要與 API 服務器通訊
- 項目目錄：建議在具體項目目錄下使用，以獲得更好的上下文理解

**2. 安裝問題**
# 管理
# 版本
- 環境變量: 重啟終端使環境變量生效

**3. 使用問題**
# 配置
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
# 教程
# 指南

### AI 輔助相關

# 指南
# 指南

---

# 更新

### 2026-01-31
# 指南
# 教程
# 指南
- ✅ 包含國內使用方案（神馬中轉 API）
- ✅ 新增高級功能和開發實踐示例
- ✅ 完善故障排除知識庫

### 待辦事項
# 教程
- [ ] 收集更多開發實踐案例
- [ ] 充實故障排除知識庫
# 更新

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

檔案操作
├── claude-code read <file>     - 讀取檔案
├── claude-code write <file>    - 寫入檔案
├── claude-code edit <file>     - 編輯檔案
# 分析

模型切換
├── /model sonnet             - 默認模型
├── /model opus              - 最強模型
├── /model claude-3.7         - Sonnet 3.7
└── /model moonshotai/kimi-k2  - Kimi 模型
```

# 配置

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
# 更新
*分類: 3 Resources*
