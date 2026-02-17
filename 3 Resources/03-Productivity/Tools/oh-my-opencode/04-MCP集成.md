---
title: oh-my-opencode MCP 集成
tags: [tool, ai, productivity, opencode, oh-my-opencode, mcp]
created: 2026-02-16
updated: 2026-02-16
---

# oh-my-opencode MCP 集成

> Model Context Protocol 集成配置和使用。

---

## 🔌 MCP 概览

MCP (Model Context Protocol) 为 oh-my-opencode 提供扩展能力。

### 默认启用的 MCP

| MCP | 功能 | 状态 |
|-----|------|------|
| **Context7** | 获取最新的官方文档 | ✅ 默认 |
| **grep.app** | 超快代码搜索 | ✅ 默认 |

---

## 📚 Context7

获取最新的官方文档。

### 功能
- 实时获取库的最新文档
- 确保文档是最新的
- 支持多种编程语言和框架

### 使用

```bash
# 在对话中直接使用
查找 React useState hook 的最新用法
```

### 配置

```json
{
  "mcp": {
    "context7": {
      "enabled": true
    }
  }
}
```

---

## 🔍 grep.app

超快代码搜索。

### 功能
- 搜索数百万公共 GitHub 仓库
- 快速找到代码示例
- 解决编程问题

### 使用

```bash
# 在对话中直接使用
搜索 Python 异步编程的示例代码
```

### 配置

```json
{
  "mcp": {
    "grep-app": {
      "enabled": true
    }
  }
}
```

---

## ⚙️ 自定义 MCP

### 添加新的 MCP 服务器

1. 创建 MCP 配置文件：

```json
{
  "mcpServers": {
    "my-custom-mcp": {
      "command": "npx",
      "args": ["-y", "@custom/mcp-server"],
      "env": {
        "API_KEY": "your-api-key"
      }
    }
  }
}
```

2. 重启 opencode

### 常用 MCP 服务器

| MCP 服务器 | 用途 |
|-----------|------|
| `@modelcontextprotocol/server-filesystem` | 文件系统访问 |
| `@modelcontextprotocol/server-github` | GitHub API |
| `@modelcontextprotocol/server-brave-search` | 网络搜索 |
| `@modelcontextprotocol/server-slack` | Slack 集成 |

---

## 🔧 高级配置

### MCP 优先级

设置 MCP 服务器优先级：

```json
{
  "mcp": {
    "priority": {
      "context7": 1,
      "grep-app": 2,
      "custom-mcp": 3
    }
  }
}
```

### 超时设置

```json
{
  "mcp": {
    "timeout": 30000
  }
}
```

### 缓存配置

```json
{
  "mcp": {
    "cache": {
      "enabled": true,
      "ttl": 3600
    }
  }
}
```

---

## 📋 故障排除

### MCP 不工作

1. **检查 MCP 状态**：

```bash
opencode mcp list
```

2. **查看错误日志**：

```bash
opencode mcp logs
```

3. **重新配置**：

```bash
opencode mcp reset
opencode mcp setup
```

### 连接超时

- 检查网络连接
- 增加超时时间
- 检查 MCP 服务器状态

---

## 🎯 最佳实践

### 1. 合理使用

- Context7 用于获取官方文档
- grep.app 用于搜索代码示例
- 自定义 MCP 用于特定需求

### 2. 性能优化

- 启用缓存减少重复请求
- 设置合理的超时时间
- 禁用不需要的 MCP

### 3. 安全考虑

- 不在配置中存储敏感信息
- 使用环境变量
- 定期轮换 API 密钥

---

## 📚 下一步

- 阅读 [[05-技巧和最佳实践]] 了解使用技巧
- 阅读 [[06-故障排除]] 解决问题
