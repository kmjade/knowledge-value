---
# 指南
aliases:
  - Claude Code Installation Guide
  - Claude Code Setup
created: 2026-01-29
tags:
  - Claude Code
# 指南
  - Windows
  - 终端工具
type: tutorial
interest-level: 4
study-status: completed
source: 網路收集
para: resources
language: zh-cn
---

# 指南

> [!info] 概述
# 指南

---

## 系統要求

- **操作系統**: Windows 10/11
- **终端**: PowerShell 或 Windows Terminal
- **網路**: 需要访问 API（首次使用时需要驗證）

---

## 安裝步骤

# 方法

1. **安裝 Node.js**
   - 访问 https://nodejs.org/
# 版本

2. **全局安裝 Claude Code**
   ```powershell
   npm install -g @anthropic-ai/claude-code
   ```

3. **驗證安裝**
   ```powershell
   claude-code --version
   ```

# 方法

1. **下載安裝腳本**
   ```powershell
   # 下載 Windows 安裝腳本
   Invoke-WebRequest -Uri "https://install.anthropic.com" -OutFile "install.ps1"

# 管理
   Set-ExecutionPolicy Bypass -Scope Process -Force
   .\install.ps1
   ```

---

# 配置

# 配置

首次運行时，Claude Code 会引导你進行认证：

```powershell
# 運行 Claude Code，首次使用会提示登入
claude-code
```

在瀏覽器中按照提示完成认证。

# 配置

在使用者目錄下創建工作資料夾：

```powershell
# 創建工作目錄
mkdir claude-workspace

# 創建專案目錄
mkdir claude-workspace\projects

# 設置環境变量（可选）
setx CLAUDE_WORKSPACE %USERPROFILE%\claude-workspace
```

# 配置

Claude Code 支持传递上下文檔案，提升代碼理解能力：

```powershell
# 創建上下文檔案
echo "这是一个示例專案..." > context.md

# 使用时传递上下文
claude-code --context context.md project.md
```

---

## 常用命令

### 基礎命令

| 命令 | 說明 |
|------|------|
# 顯示
# 顯示
| `claude-code --chat` | 进入交互式对话模式 |
| `claude-code --prompt "<prompt>"` | 直接發送提示并获取回覆 |
| `claude-code --diff <file1> <file2>` | 比较两个檔案差异 |

### 檔案操作命令

| 命令 | 說明 |
|------|------|
| `claude-code read <file>` | 讀取檔案內容 |
| `claude-code write <file> <content>` | 寫入檔案內容 |
| `claude-code edit <file>` | 使用默认編輯器編輯檔案 |

# 分析

| 命令 | 說明 |
|------|------|
# 分析
| `claude-code explain <code>` | 解釋代碼片段 |
| `claude-code refactor <file>` | 重构代碼檔案 |

---

## 使用場景

### 場景一：專案初始化

```powershell
# 創建新專案
claude-code create my-project

# 生成專案结构
cd my-project
claude-code scaffold --template web
```

### 場景二：代碼審查

```powershell
# 審查代碼
claude-code review src/main.js

# 生成修復建議
claude-code --fix src/main.js
```

### 場景三：除錯辅助

```powershell
# 解釋错误資訊
claude-code explain "TypeError: Cannot read property 'undefined'"

# 生成除錯代碼
claude-code debug --file src/utils.js --line 45
```

---

## 高级技巧

### 1. 使用别名

```powershell
# 在 PowerShell 中設置别名
function claude { claude-code $args }
Set-Alias -Name cc -Value claude

# 使用别名
cc create new-project
```

### 2. 批量操作

```powershell
# 批量處理多個檔案
foreach ($file in Get-ChildItem -Path . -Filter *.js) {
  claude-code analyze $file.Name
}
```

### 3. 整合開發環境

# 配置

```json
// .vscode/tasks.json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Run Claude Code on current file",
      "type": "shell",
      "command": "claude-code analyze ${file}",
      "problemMatcher": []
    }
  ]
}
```

---

## 故障排除

| 問題 | 可能原因 | 解決方案 |
|------|----------|----------|
| 命令未找到 | 未在系統 PATH 中 | 重启终端或使用完整路徑 |
| 认证失败 | API 密钥無效 | 檢查密钥格式，重新登入 |
| 網路错误 | 防火墙或網路限制 | 檢查網路連接，使用代理 |
# 管理

---

# 更新

```powershell
# 更新
npm update -g @anthropic-ai/claude-code
```

---

## 相關資源

# 指南
# 教程
# 指南
