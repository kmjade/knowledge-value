---
title: Claude Code安装指南
aliases:
  - Claude Code Installation Guide
  - Claude Code Setup
created: 2026-01-29
tags:
  - Claude Code
  - 安装指南
  - Windows
  - 终端工具
type: tutorial
interest-level: 4
study-status: completed
source: 网络收集
para: resources
language: zh-cn
---

# Claude Code安装指南

> [!info] 概述
> 本指南介绍在 Windows 系统上安装和使用 Claude Code CLI 工具的完整步骤，帮助你在本地终端中获得 AI 辅助进行代码开发。

---

## 系统要求

- **操作系统**: Windows 10/11
- **终端**: PowerShell 或 Windows Terminal
- **网络**: 需要访问 API（首次使用时需要验证）

---

## 安装步骤

### 方法一：通过 npm 安装（推荐）

1. **安装 Node.js**
   - 访问 https://nodejs.org/
   - 下载并安装 LTS 版本

2. **全局安装 Claude Code**
   ```powershell
   npm install -g @anthropic-ai/claude-code
   ```

3. **验证安装**
   ```powershell
   claude-code --version
   ```

### 方法二：通过 curl 安装

1. **下载安装脚本**
   ```powershell
   # 下载 Windows 安装脚本
   Invoke-WebRequest -Uri "https://install.anthropic.com" -OutFile "install.ps1"

   # 运行安装脚本（以管理员身份）
   Set-ExecutionPolicy Bypass -Scope Process -Force
   .\install.ps1
   ```

---

## 初始配置

### 1. 认证配置

首次运行时，Claude Code 会引导你进行认证：

```powershell
# 运行 Claude Code，首次使用会提示登录
claude-code
```

在浏览器中按照提示完成认证。

### 2. 工作区配置

在用户目录下创建工作文件夹：

```powershell
# 创建工作目录
mkdir claude-workspace

# 创建项目目录
mkdir claude-workspace\projects

# 设置环境变量（可选）
setx CLAUDE_WORKSPACE %USERPROFILE%\claude-workspace
```

### 3. 上下文窗口配置（重要）

Claude Code 支持传递上下文文件，提升代码理解能力：

```powershell
# 创建上下文文件
echo "这是一个示例项目..." > context.md

# 使用时传递上下文
claude-code --context context.md project.md
```

---

## 常用命令

### 基础命令

| 命令 | 说明 |
|------|------|
| `claude-code --help` | 显示帮助信息 |
| `claude-code --version` | 显示版本号 |
| `claude-code --chat` | 进入交互式对话模式 |
| `claude-code --prompt "<prompt>"` | 直接发送提示并获取回复 |
| `claude-code --diff <file1> <file2>` | 比较两个文件差异 |

### 文件操作命令

| 命令 | 说明 |
|------|------|
| `claude-code read <file>` | 读取文件内容 |
| `claude-code write <file> <content>` | 写入文件内容 |
| `claude-code edit <file>` | 使用默认编辑器编辑文件 |

### 代码分析命令

| 命令 | 说明 |
|------|------|
| `claude-code analyze <file>` | 分析代码文件 |
| `claude-code explain <code>` | 解释代码片段 |
| `claude-code refactor <file>` | 重构代码文件 |

---

## 使用场景

### 场景一：项目初始化

```powershell
# 创建新项目
claude-code create my-project

# 生成项目结构
cd my-project
claude-code scaffold --template web
```

### 场景二：代码审查

```powershell
# 审查代码
claude-code review src/main.js

# 生成修复建议
claude-code --fix src/main.js
```

### 场景三：调试辅助

```powershell
# 解释错误信息
claude-code explain "TypeError: Cannot read property 'undefined'"

# 生成调试代码
claude-code debug --file src/utils.js --line 45
```

---

## 高级技巧

### 1. 使用别名

```powershell
# 在 PowerShell 中设置别名
function claude { claude-code $args }
Set-Alias -Name cc -Value claude

# 使用别名
cc create new-project
```

### 2. 批量操作

```powershell
# 批量处理多个文件
foreach ($file in Get-ChildItem -Path . -Filter *.js) {
  claude-code analyze $file.Name
}
```

### 3. 集成开发环境

在 VS Code 中配置任务运行 Claude Code：

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

| 问题 | 可能原因 | 解决方案 |
|------|----------|----------|
| 命令未找到 | 未在系统 PATH 中 | 重启终端或使用完整路径 |
| 认证失败 | API 密钥无效 | 检查密钥格式，重新登录 |
| 网络错误 | 防火墙或网络限制 | 检查网络连接，使用代理 |
| 权限不足 | 文件访问权限 | 以管理员身份运行 PowerShell |

---

## 更新命令

```powershell
# 更新到最新版本
npm update -g @anthropic-ai/claude-code
```

---

## 相关资源

- [[OpenCode-本地模型集成指南]] - 本地模型配置
- [[OpenCode-智能体搭建教程]] - OpenCode 完整使用教程
- [[AI员工搭建全流程指南]] - AI 员工系统开发
