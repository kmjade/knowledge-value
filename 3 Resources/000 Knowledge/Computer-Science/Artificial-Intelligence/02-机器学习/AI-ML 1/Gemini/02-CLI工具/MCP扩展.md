---
title: MCP 扩展
aliases:
  - Model Context Protocol
  - Gemini CLI MCP
tags:
  - #topic/gemini
  - #topic/cli
  - #topic/mcp
  - #type/guide
created: 2026-05-25
updated: 2026-05-25
---

# MCP 扩展

## 什么是 MCP

MCP（Model Context Protocol）是一个开放协议，允许 AI 模型与外部工具和数据源进行交互。Gemini CLI 支持 MCP 协议，可以扩展其能力。

---

## 内置 MCP 工具

### 默认可用工具

| 工具 | 功能 |
|------|------|
| Google Search | 实时搜索信息 |
| File Operations | 文件读写操作 |
| Shell Commands | 执行系统命令 |
| Web Fetch | 获取网页内容 |

---

## 安装 MCP 服务器

### 媒体生成 MCP

支持 Imagen、Veo、Lyria 等媒体生成：

```bash
# 安装媒体生成 MCP
git clone https://github.com/GoogleCloudPlatform/vertex-ai-creative-studio
cd vertex-ai-creative-studio/experiments/mcp-genmedia
npm install
```

### 配置

在 Gemini CLI 配置中添加 MCP 服务器：

```json
{
  "mcpServers": {
    "genmedia": {
      "command": "node",
      "args": ["./mcp-genmedia/index.js"],
      "env": {
        "GOOGLE_CLOUD_PROJECT": "your-project-id"
      }
    }
  }
}
```

---

## 常用 MCP 服务器

### 数据库连接

```json
{
  "mcpServers": {
    "postgres": {
      "command": "mcp-server-postgres",
      "args": ["postgresql://user:pass@localhost/db"]
    }
  }
}
```

### 文件系统

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "mcp-server-filesystem",
      "args": ["/path/to/allowed/directory"]
    }
  }
}
```

### Git 操作

```json
{
  "mcpServers": {
    "git": {
      "command": "mcp-server-git",
      "args": ["--repository", "/path/to/repo"]
    }
  }
}
```

---

## 使用 MCP 工具

### 基本用法

启动 Gemini CLI 后，MCP 工具会自动加载：

```bash
gemini
> 使用 genmedia 工具生成一张图片，主题是"日落时的海滩"
```

### 查看可用工具

```bash
gemini
> /tools
```

---

## 创建自定义 MCP 服务器

### 基本结构

```typescript
// custom-mcp-server.ts
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const server = new Server({
  name: 'custom-server',
  version: '1.0.0',
}, {
  capabilities: {
    tools: {}
  }
});

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [{
    name: 'custom_tool',
    description: '自定义工具描述',
    inputSchema: {
      type: 'object',
      properties: {
        param: { type: 'string' }
      }
    }
  }]
}));

const transport = new StdioServerTransport();
await server.connect(transport);
```

### 配置到 Gemini CLI

```json
{
  "mcpServers": {
    "custom": {
      "command": "node",
      "args": ["./custom-mcp-server.js"]
    }
  }
}
```

---

## MCP 配置文件位置

| 平台 | 路径 |
|------|------|
| macOS | `~/.config/gemini-cli/mcp.json` |
| Linux | `~/.config/gemini-cli/mcp.json` |
| Windows | `%APPDATA%\gemini-cli\mcp.json` |

---

## 调试 MCP

### 启用调试日志

```bash
DEBUG=mcp:* gemini
```

### 测试 MCP 服务器

```bash
# 直接运行 MCP 服务器
node ./mcp-server/index.js
```

---

## 最佳实践

1. **安全考虑**
   - 仅启用信任的 MCP 服务器
   - 限制文件系统访问范围
   - 使用环境变量存储敏感信息

2. **性能优化**
   - 避免加载过多 MCP 服务器
   - 使用异步操作
   - 缓存常用数据

3. **错误处理**
   - 检查 MCP 服务器状态
   - 提供降级方案
   - 记录错误日志

---

## 相关链接

- [[高级功能]]
- [[GitHub集成]]
- [[0 Inbox/_processed/AI-ML/Gemini/README|Gemini 知识库导航]]
- [MCP 官方文档](https://modelcontextprotocol.io/)
- [媒体生成 MCP](https://github.com/GoogleCloudPlatform/vertex-ai-creative-studio/tree/main/experiments/mcp-genmedia)
