---
title: Claudian MCP 服务器
date: 2026-01-22
tags: [Claudian, MCP, AI能力扩展, 视觉理解, 联网搜索]
para: areas
status: in-progress
language: zh-cn
---

# Claudian MCP 服务器

> **核心理念**: MCP 服务器就像给 AI 装上的「眼睛」和「网线」，让它能看到、能上网、能读网页、能访问代码。

## 什么是 MCP？

### 简单理解

**MCP = Model Context Protocol（模型上下文协议）**

智谱 AI 模型虽然很聪明，但原生能力有限：
- ❌ 看不了图片
- ❌ 上不了网
- ❌ 读不了网页
- ❌ 访问不了代码仓库

**MCP 服务器的价值**
- ✅ 视觉理解：看懂截图、图片、视频
- ✅ 联网搜索：获取实时信息
- ✅ 网页读取：抓取网页内容
- ✅ 开源仓库：访问 GitHub 等平台

### MCP 工作原理

```
你的请求
    ↓
Claudian
    ↓
智谱 AI (GLM 模型)
    ↓
MCP 服务器 (扩展能力)
    ↓
外部服务 (视觉/网络/网页/代码)
    ↓
返回结果
    ↓
整合回复
```

---

## 已配置的 MCP 服务器

### 1. zai-mcp-server（视觉理解）

**功能**
- 看懂截图和图片
- 分析视频内容
- 识别图片中的文字（OCR）
- 理解图表、流程图

**使用场景**
```bash
# 分析截图错误
@zai-mcp-server 帮我看看这个截图里的错误

# 识别图片文字
@zai-mcp-server 识别这张图片中的文字

# 分析图表
@zai-mcp-server 分析这个流程图的结构
```

**示例对话**
```
用户: @zai-mcp-server 分析这张图片

[上传图片]

AI: 这是一张架构图，包含：
- 前端层（React）
- API 层（Express）
- 数据层（MongoDB）
- 缓存层（Redis）
...
```

### 2. web-search-prime（联网搜索）

**功能**
- 联网搜索最新信息
- 获取实时资讯
- 搜索技术文档
- 查找学习资源

**使用场景**
```bash
# 搜索最新技术
@web-search-prime 搜索 2026 年最新的 AI 工具

# 查找学习资源
@web-search-prime 找一些学习 Rust 的好资源

# 获取实时资讯
@web-search-prime 今天有什么科技新闻
```

**示例对话**
```
用户: @web-search-prime 搜索 Obsidian 1.10 的新功能

AI: 找到了以下信息：
1. 新增 Canvas 白板功能
2. 性能优化提升 30%
3. 改进了插件 API
4. ...
```

### 3. web-reader（网页读取）

**功能**
- 抓取网页完整内容
- 提取结构化数据
- 过滤广告和无关内容
- 保存为 Markdown

**使用场景**
```bash
# 读取博客文章
@web-reader 读取这篇文章的内容 https://example.com/post

# 提取文档
@web-reader 抓取这个文档 https://docs.example.com

# 保存为笔记
@web-reader 把这个网页保存到笔记
```

**示例对话**
```
用户: @web-reader 读取 https://example.com/guide

AI: 已读取网页内容，标题：《如何学习编程》
内容概要：
1. 第一章：编程思维
   - ...
2. 第二章：选择语言
   - ...
...
是否保存为笔记？
```

### 4. zread（开源仓库）

**功能**
- 访问 GitHub 等代码平台
- 读取项目文档
- 分析代码结构
- 查找特定代码片段

**使用场景**
```bash
# 查找代码示例
@zread 在 React 官方仓库中找到 useEffect 的使用示例

# 阅读文档
@zread 读取这个仓库的 README https://github.com/user/repo

# 分析代码
@zread 分析这个项目的代码结构
```

**示例对话**
```
用户: @zread 找一些使用 Tailwind CSS 的示例项目

AI: 找到以下示例项目：
1. tailwindcss/examples
   - 包含 10+ 个示例
   - 地址：https://github.com/tailwindlabs/examples

2. vercel/nextjs-portfolio
   - 个人网站模板
   - 地址：https://github.com/vercel/nextjs-portfolio
...
```

---

## 如何使用 MCP

### 基本调用方式

**步骤**
1. 在 Claudian 对话框中输入 `@`
2. 系统弹出 MCP 列表
3. 选择需要的 MCP 服务器
4. 输入你的需求

**示例**
```
用户: @web-search-prime 搜索 2026 年最新的 Obsidian 插件

AI: [开始搜索...]

[搜索结果]
```

### 组合使用多个 MCP

可以同时调用多个 MCP 服务器：

```
用户: @web-search-prime 搜索教程，然后 @web-reader 读取这个网页

AI: [搜索教程...]
[读取网页内容...]

[整合结果]
```

### MCP 与技能结合

在 Skill 中使用 MCP：

```markdown
# SKILL.md

## 工作流程
1. 使用 @web-search-prime 搜索最新资讯
2. 使用 @web-reader 读取相关网页
3. 整理信息并生成笔记
4. 保存到指定位置
```

---

## 如何添加新的 MCP 服务器

### 方法一: 手动添加

**步骤**
1. 打开 Obsidian 设置
2. 找到「Claudian」插件设置
3. 点击「MCP 服务器」
4. 添加新的 MCP 配置

**配置格式**
```json
{
  "name": "mcp-name",
  "command": "path/to/executable",
  "args": ["--arg1", "--arg2"]
}
```

### 方法二: 对话添加（推荐）

直接让 Claudian 帮你添加：

```
用户: 帮我添加一个新的 MCP 服务器，用于...

AI: 好的，我需要知道：
1. MCP 服务器的名称
2. 执行命令路径
3. 需要的参数

[配置完成后]
```

### 常用开源 MCP 服务器

| MCP 服务器 | 功能 | 安装命令 |
|-----------|------|---------|
| mcp-server-filesystem | 文件系统操作 | `npm install -g @modelcontextprotocol/server-filesystem` |
| mcp-server-github | GitHub 操作 | `npm install -g @modelcontextprotocol/server-github` |
| mcp-server-sqlite | SQLite 数据库 | `npm install -g @modelcontextprotocol/server-sqlite` |

---

## MCP 最佳实践

### 1. 按需选择

不是所有任务都需要 MCP，简单的文本处理不需要调用：
- ❌ 「总结这篇文章」（不需要 MCP）
- ✅ 「总结这个网页内容」（需要 web-reader）

### 2. 明确需求

告诉 AI 具体要用哪个 MCP：
```
使用 web-search 搜索最新的 AI 工具
```

### 3. 组合使用

多个 MCP 可以组合完成复杂任务：
```
搜索教程 → 读取网页 → 保存为笔记
```

### 4. 注意权限

某些 MCP 可能需要额外配置（如 GitHub Token）：
- ⚠️ 确保 API Key 安全
- ⚠️ 不要泄露敏感信息

---

## MCP 性能优化

### 减少不必要的调用

**低效**
```bash
@web-search 搜索 1
@web-search 搜索 2
@web-search 搜索 3
```

**高效**
```bash
@web-search 搜索 1、2、3 的相关信息
```

### 缓存结果

对于常用查询，可以让 AI 记住结果：
```
记住这个查询的结果，下次直接使用
```

---

## 故障排除

### MCP 不工作

**检查项**
1. MCP 服务器是否已配置
2. 配置路径是否正确
3. 是否有必要的权限（API Key）
4. 服务器是否正在运行

**验证方法**
```
测试 MCP 是否可用：@mcp-name 你好
```

### 调用失败

**可能原因**
- 网络连接问题
- API Key 过期
- 配置错误
- 服务器崩溃

**解决方案**
- 检查网络连接
- 更新 API Key
- 重新配置 MCP
- 重启服务器

---

## 常见问题

### Q: MCP 有费用吗？
**A**: MCP 本身免费，但某些功能可能依赖付费 API（如 GitHub API）

### Q: MCP 可以离线使用吗？
**A**: 部分可以（如 filesystem），大部分需要网络

### Q: MCP 数据安全吗？
**A**: 通过官方 MCP 服务器，数据不会保存。自建 MCP 需注意隐私

### Q: 可以同时运行多个 MCP 吗？
**A**: 可以，配置多个 MCP 服务器即可

---

## 相关主题

- [[1 Projects/Claudian/智谱 AI 配置实战.md]] - MCP 配置说明
- [[2 Areas/Claudian/Claudian 技能系统.md]] - MCP 与技能的结合
- [[2 Areas/Claudian/Claudian 命令体系.md]] - MCP 在命令中的应用

---

**状态**: ✅ 4 个 MCP 服务器已配置
**下一步**: 根据需求添加自定义 MCP
