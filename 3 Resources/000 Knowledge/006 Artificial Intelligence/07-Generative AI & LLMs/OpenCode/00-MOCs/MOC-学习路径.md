---
title: OpenCode 学习路径
tags:
  - para/resource/tech
  - 技术/AI
  - OpenCode
  - MOC
status: active
cssclasses:
  - resource-note
created: 2026-05-24
---

# OpenCode 学习路径

## 新手入门（第1天）

### 目标
完成 OpenCode 安装和基本配置，能够与 AI 进行简单对话。

### 学习内容
1. **了解 OpenCode** → [[1. OpenCode简介]]
   - 核心能力
   - 与其他工具的区别
   - 适用场景

2. **安装 OpenCode** → [[2. 安装指南]]
   - 选择适合你系统的安装方式
   - 验证安装成功

3. **配置 API** → [[3. API设置]]
   - 获取 API Key
   - 使用 `/connect` 配置
   - 选择合适的模型

4. **第一次使用** → [[4. 第一次使用]]
   - 启动 TUI
   - 基本对话交互

---

## 熟练使用（第2-3天）

### 目标
掌握 TUI 和 CLI 的核心命令，能够高效使用 OpenCode。

### 学习内容
1. **TUI 终端界面** → [[1. TUI终端界面]]
   - 所有斜杠命令
   - 文件引用 `@file`
   - 执行命令 `!command`

2. **CLI 命令行** → [[2. CLI命令行使用]]
   - `opencode run` 非交互执行
   - `opencode agent` 代理管理
   - `opencode serve` API 服务

3. **VSCode 集成** → [[4. VSCode集成]]
   - 安装插件
   - 在编辑器中使用

---

## 自定义配置（第4-5天）

### 目标
根据个人习惯和项目需求，定制 OpenCode 行为。

### 学习内容
1. **AGENTS.md 规则** → [[1. AGENTS规则]]
   - 项目级规则
   - 全局规则
   - 让 AI 更懂你的项目

2. **配置文件** → [[2. 配置文件详解]]
   - opencode.json 完整配置
   - 模型、代理、工具配置

3. **主题和快捷键** → [[3. 主题设置]] | [[4. 快捷键配置]]
   - 界面美化
   - 提高操作效率

4. **权限控制** → [[5. 权限配置]]
   - 安全设置
   - 工具权限管理

---

## 高级应用（第6-7天）

### 目标
掌握 Skills、Agent、MCP 等高级功能，构建自动化工作流。

### 学习内容
1. **Skills 技能系统** → [[1. Skills技能系统]]
   - 创建可复用的技能
   - 渐进式加载机制

2. **代理配置** → [[2. 代理(Agent)]]
   - 主代理和子代理
   - 自定义代理

3. **MCP 服务器** → [[3. MCP服务器配置]]
   - 接入外部工具和数据源
   - 本地和远程 MCP

4. **GitHub 集成** → [[1. GitHub集成]]
   - 自动处理 Issue/PR
   - CI/CD 自动化

---

## 学习检查清单

### 基础能力
- [ ] 成功安装 OpenCode
- [ ] 配置好 API Key
- [ ] 能够使用 TUI 进行对话
- [ ] 知道如何引用文件 `@file`
- [ ] 知道如何执行命令 `!command`

### 进阶能力
- [ ] 创建了 AGENTS.md
- [ ] 自定义了快捷键或主题
- [ ] 会使用 `/init` 初始化项目
- [ ] 了解权限配置

### 高级能力
- [ ] 创建了自定义 Skill
- [ ] 配置了 MCP 服务器
- [ ] 设置了 GitHub 集成
- [ ] 使用 `opencode run` 自动化任务
