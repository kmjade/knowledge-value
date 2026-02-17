---
title: oh-my-opencode Hooks 工作流
tags: [tool, ai, productivity, opencode, oh-my-opencode, hooks]
created: 2026-02-16
updated: 2026-02-16
---

# oh-my-opencode Hooks 工作流

> 20+ 内置工作流自动化钩子详解。

---

## 🪝 Hooks 概览

Hooks 是自动化工作流的核心，可以在特定事件触发时执行自定义操作。

### 核心 Hooks 列表

| Hook | 功能 |
|------|------|
| `todo-continuation-enforcer` | 确保任务完成 |
| `context-window-monitor` | 监控上下文窗口 |
| `session-recovery` | 自动恢复会话 |
| `session-notification` | 会话事件通知 |
| `comment-checker` | 验证代码注释 |
| `grep-output-truncator` | 截断大型 grep 输出 |
| `tool-output-truncator` | 管理工具输出大小 |
| `directory-agents-injector` | 注入目录特定代理 |
| `directory-readme-injector` | 自动添加 README 上下文 |
| `empty-task-response-detector` | 检测空响应 |
| `think-mode` | 启用思考模式 |
| `anthropic-context-window-limit-recovery` | 处理 Anthropic 限制 |
| `rules-injector` | 注入自定义规则 |
| `background-notification` | 后台进程通知 |
| `auto-update-checker` | 自动检查更新 |
| `startup-toast` | 启动通知 |
| `keyword-detector` | 关键词检测 |
| `agent-usage-reminder` | 代理使用提醒 |
| `non-interactive-env` | 非交互环境处理 |
| `interactive-bash-session` | 交互式 Bash 会话 |
| `empty-message-sanitizer` | 清理空消息 |
| `compaction-context-injector` | 上下文压缩注入 |
| `thinking-block-validator` | 验证思考块 |

---

## ⚙️ 常用 Hooks 详解

### 1. context-window-monitor

监控和管理上下文窗口使用。

**功能**：
- 实时监控 token 使用
- 提前预警即将达到限制
- 自动触发压缩

### 2. session-recovery

自动从错误中恢复。

**功能**：
- 自动恢复错误会话
- 恢复思考块违规
- 保存进度

### 3. directory-agents-injector

根据目录结构自动注入代理。

**功能**：
- 目录特定代理配置
- 自动上下文注入
- 项目结构感知

### 4. directory-readme-injector

自动添加 README 上下文。

**功能**：
- 读取目录 README
- 自动注入项目信息
- 提供项目背景

### 5. rules-injector

注入自定义规则。

**功能**：
- 自定义开发规范
- 代码风格规则
- 项目特定要求

### 6. auto-update-checker

自动检查更新。

**功能**：
- 检查新版本
- 提示更新
- 可选通知

---

## 🔧 配置 Hooks

### 启用/禁用 Hooks

在配置文件中设置：

```json
{
  "hooks": {
    "enabled": ["todo-continuation-enforcer", "session-recovery"],
    "disabled": ["startup-toast"]
  }
}
```

### 自定义 Hooks

创建自定义 Hook：

```javascript
// hooks/custom-hook.js
module.exports = {
  name: 'custom-hook',
  trigger: 'on:task-complete',
  execute: async (context) => {
    // 自定义逻辑
    console.log('Task completed:', context.task);
  }
};
```

---

## 🎯 使用技巧

### 1. 关键词触发

使用特定关键词触发 Hook：

| 关键词 | 触发的 Hook |
|--------|-------------|
| `ultrawork` | 启用多代理模式 |
| `quick` | 使用快速模型 |
| `ultrabrain` | 使用最强模型 |

### 2. 后台任务

```
在提示中使用：
- 启动后台任务
- 并行执行多个任务
```

### 3. 思考模式

启用深度思考：

```
think carefully about the architecture
```

---

## 🔄 工作流示例

### 示例 1: 自动代码审查

```
1. Hook: directory-agents-injector 检测到代码目录
2. Hook: rules-injector 加载代码规范
3. Agent: 执行代码审查
4. Hook: todo-continuation-enforcer 确保审查完成
```

### 示例 2: 复杂任务处理

```
1. 检测到复杂任务 (ultrabrain)
2. Hook: context-window-monitor 监控资源
3. Agent: Sisyphus 分解任务
4. 多个 Agent 并行执行
5. Hook: session-recovery 处理错误
6. Hook: compaction-context-injector 管理上下文
```

---

## 📊 Hooks 状态监控

### 查看活跃 Hooks

```bash
opencode hooks list
```

### Hook 执行日志

Hooks 执行记录在日志中：

```
~/.config/opencode/logs/hooks.log
```

---

## 🐛 故障排除

### Hook 不工作

1. 检查是否启用：`opencode hooks list`
2. 检查配置：查看 `oh-my-opencode.json`
3. 查看日志：检查 Hook 执行日志

### 冲突的 Hooks

如果多个 Hook 冲突：
1. 禁用不需要的 Hook
2. 调整 Hook 优先级
3. 自定义 Hook 逻辑

---

## 📚 下一步

- 阅读 [[04-MCP集成]] 了解 MCP 集成
- 阅读 [[05-技巧和最佳实践]] 了解使用技巧
