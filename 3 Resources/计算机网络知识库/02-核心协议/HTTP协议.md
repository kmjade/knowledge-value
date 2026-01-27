---
title: HTTP协议
aliases:
  - HyperText Transfer Protocol
  - HTTPS
  - Web协议
para: resource
tags:
  - 核心协议
  - HTTP
  - HTTPS
  - 应用层协议
  - 计算机网络
created: 2026-01-21
---

> [!summary] HTTP协议概述
> HTTP (HyperText Transfer Protocol) 是应用层协议，用于在Web浏览器和Web服务器之间传输超文本数据。

---

## 📋 目录

- [HTTP基础](#http基础)
- [HTTP方法](#http方法)
- [HTTP状态码](#http状态码)
- [HTTP头部](#http头部)
- [HTTPS](#https)
- [HTTP版本](#http版本)

---

## 🔍 HTTP基础

### 定义

HTTP是一个**无状态**的**请求-响应**协议，运行在**TCP协议**之上（默认端口80）。

### 工作流程

```
客户端                         服务器
  │                              │
  │─── 1.建立TCP连接 ────────────→│
  │                              │
  │─── 2.发送HTTP请求 ───────────→│
  │                              │
  │←── 3.处理请求 ───────────────│
  │                              │
  │←── 4.返回HTTP响应 ───────────│
  │                              │
  │─── 5.渲染页面 ───────────────→│
  │                              │
  │─── 6.关闭连接 ───────────────→│
  │                              │
```

### 特点

| 特性 | 说明 |
|------|------|
| **无状态** | 服务器不保存客户端的任何状态 |
| **请求-响应** | 客户端发起请求，服务器返回响应 |
| **灵活** | 可以传输任意类型的数据 |
| **可扩展** | 通过头部字段扩展功能 |

---

## 📤 HTTP方法

### 常用方法

| 方法 | 说明 | 幂等性 | 请求体 |
|------|------|--------|--------|
| GET | 获取资源 | ✅ 是 | ❌ 无 |
| POST | 创建/提交数据 | ❌ 否 | ✅ 有 |
| PUT | 更新资源（整体替换） | ✅ 是 | ✅ 有 |
| DELETE | 删除资源 | ✅ 是 | ❌ 无 |
| PATCH | 部分更新资源 | ❌ 否 | ✅ 有 |
| HEAD | 获取响应头（无响应体） | ✅ 是 | ❌ 无 |
| OPTIONS | 获取服务器支持的方法 | ✅ 是 | ❌ 无 |
| CONNECT | 建立隧道（常用于HTTPS代理） | ❌ 否 | ❌ 无 |
| TRACE | 回显服务器收到的请求 | ✅ 是 | ❌ 无 |

### 方法详解

#### GET
```
GET /index.html HTTP/1.1
Host: www.example.com
```
- 用于获取资源
- 参数在URL中
- 可被缓存

#### POST
```
POST /api/users HTTP/1.1
Host: www.example.com
Content-Type: application/json

{
  "name": "John",
  "email": "john@example.com"
}
```
- 用于创建资源或提交数据
- 参数在请求体中
- 不可缓存

#### PUT
```
PUT /api/users/1 HTTP/1.1
Host: www.example.com
Content-Type: application/json

{
  "name": "John Updated",
  "email": "john@example.com"
}
```
- 用于更新资源（整体替换）
- 幂等：多次PUT结果相同

#### DELETE
```
DELETE /api/users/1 HTTP/1.1
Host: www.example.com
```
- 用于删除资源
- 幂等：多次DELETE结果相同

---

## 📊 HTTP状态码

### 状态码分类

```
1xx 信息性 - 请求已接收，继续处理
2xx 成功 - 请求成功处理
3xx 重定向 - 需要进一步操作
4xx 客户端错误 - 客户端请求错误
5xx 服务器错误 - 服务器处理错误
```

### 常见状态码

#### 2xx 成功

| 状态码 | 说明 | 使用场景 |
|--------|------|----------|
| 200 OK | 请求成功 | GET/POST成功 |
| 201 Created | 资源创建成功 | POST成功 |
| 204 No Content | 成功但无返回内容 | DELETE成功 |
| 206 Partial Content | 部分内容 | 断点续传 |

#### 3xx 重定向

| 状态码 | 说明 | 使用场景 |
|--------|------|----------|
| 301 Moved Permanently | 永久重定向 | URL永久改变 |
| 302 Found | 临时重定向 | URL临时改变 |
| 304 Not Modified | 未修改 | 缓存验证 |
| 307 Temporary Redirect | 临时重定向（保留方法） | URL临时改变 |

#### 4xx 客户端错误

| 状态码 | 说明 | 使用场景 |
|--------|------|----------|
| 400 Bad Request | 请求错误 | 请求格式错误 |
| 401 Unauthorized | 未认证 | 需要登录 |
| 403 Forbidden | 禁止访问 | 权限不足 |
| 404 Not Found | 资源不存在 | URL错误 |
| 405 Method Not Allowed | 方法不允许 | 不支持的HTTP方法 |
| 409 Conflict | 冲突 | 资源冲突 |
| 429 Too Many Requests | 请求过多 | 超出速率限制 |

#### 5xx 服务器错误

| 状态码 | 说明 | 使用场景 |
|--------|------|----------|
| 500 Internal Server Error | 服务器内部错误 | 服务器故障 |
| 502 Bad Gateway | 网关错误 | 网关不可用 |
| 503 Service Unavailable | 服务不可用 | 服务器过载 |
| 504 Gateway Timeout | 网关超时 | 响应超时 |

---

## 📦 HTTP头部

### 请求头示例

```
GET /index.html HTTP/1.1
Host: www.example.com              # 主机名
User-Agent: Mozilla/5.0...          # 浏览器信息
Accept: text/html,application/xhtml+xml  # 可接受的类型
Accept-Language: zh-CN,en-US        # 可接受的语言
Accept-Encoding: gzip, deflate      # 可接受的编码
Connection: keep-alive              # 连接方式
Cookie: session=abc123              # Cookie
Cache-Control: no-cache             # 缓存控制
```

### 响应头示例

```
HTTP/1.1 200 OK
Date: Tue, 21 Jan 2026 14:00:00 GMT  # 日期
Server: nginx/1.18.0                # 服务器信息
Content-Type: text/html             # 内容类型
Content-Length: 1234                # 内容长度
Connection: keep-alive              # 连接方式
Set-Cookie: session=xyz789; Secure   # 设置Cookie
Cache-Control: max-age=3600         # 缓存控制
```

### 常见头部

#### 请求头

| 头部 | 说明 |
|------|------|
| Host | 请求的主机名（必填） |
| User-Agent | 客户端信息 |
| Accept | 可接受的内容类型 |
| Authorization | 认证信息 |
| Content-Type | 请求体的内容类型 |
| Content-Length | 请求体的长度 |
| Cookie | 客户端Cookie |
| Referer | 来源页面 |

#### 响应头

| 头部 | 说明 |
|------|------|
| Server | 服务器信息 |
| Content-Type | 响应体的内容类型 |
| Content-Length | 响应体的长度 |
| Set-Cookie | 设置Cookie |
| Location | 重定向的URL |
| Cache-Control | 缓存策略 |
| ETag | 资源标识 |

---

## 🔒 HTTPS

### 定义

HTTPS (HTTP Secure) 是 HTTP 的安全版本，通过 **TLS/SSL** 加密通信内容。

### 工作原理

```
客户端                         服务器
  │                              │
  │─── 1.发送ClientHello ──────→│
  │←── 2.返回ServerHello ───────│
  │←── 3.返回数字证书 ──────────│
  │                              │
  │─── 4.验证证书 ───────────────│
  │                              │
  │─── 5.发送预主密钥(加密) ─────→│
  │                              │
  │─── 6.双方生成会话密钥 ───────→│
  │                              │
  │─── 7.加密通信 ───────────────→│
  │←─────────────────────────────│
```

### HTTPS vs HTTP

| 特性 | HTTP | HTTPS |
|------|------|-------|
| 端口 | 80 | 443 |
| 加密 | ❌ 无 | ✅ 有 |
| 认证 | ❌ 无 | ✅ 有 |
| 数据安全 | ⚠️ 明文传输 | ✅ 加密传输 |
| SEO排名 | 低 | 高 |
| 成本 | 低 | 高（证书费用） |

### TLS/SSL握手过程

1. **ClientHello**: 客户端发送支持的加密套件和随机数
2. **ServerHello**: 服务器选择加密套件和发送随机数
3. **证书验证**: 服务器发送数字证书，客户端验证
4. **密钥交换**: 客户端生成预主密钥，用服务器公钥加密发送
5. **会话密钥生成**: 双方使用预主密钥和随机数生成会话密钥
6. **加密通信**: 使用会话密钥加密后续通信

---

## 📈 HTTP版本

### HTTP/1.0

- 每次请求都需要建立新连接
- 无持久连接

### HTTP/1.1

```
Connection: keep-alive  # 持久连接
```
- 默认持久连接
- 支持管道化（Pipeline）
- 分块传输编码（Chunked Transfer）
- 缓存控制增强

### HTTP/2

```
特性：
- 多路复用（Multiplexing）
- 二进制协议
- 头部压缩（HPACK）
- 服务器推送（Server Push）
```

### HTTP/3

```
特性：
- 基于QUIC协议（UDP）
- 解决队头阻塞
- 更快的连接建立
```

---

## 🛠️ 实践示例

### 示例1：使用curl查看HTTP请求

```bash
# 发送GET请求
curl -v https://www.example.com

# 查看响应头
curl -I https://www.example.com

# 发送POST请求
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John"}'
```

### 示例2：浏览器开发者工具

1. 打开浏览器开发者工具（F12）
2. 切换到"Network"标签
3. 刷新页面
4. 查看请求和响应的详细信息

---

## 💡 性能优化

### 1. 减少HTTP请求数
- 合并CSS/JS文件
- 使用雪碧图（Sprite）
- 内联小资源

### 2. 利用缓存
```
Cache-Control: max-age=3600
ETag: "abc123"
```

### 3. 压缩内容
```
Accept-Encoding: gzip, deflate
Content-Encoding: gzip
```

### 4. 使用CDN
- 就近访问
- 减少延迟

### 5. 使用HTTP/2
- 多路复用
- 头部压缩

---

## 📝 学习检查清单

- [ ] 能说出HTTP是无状态的请求-响应协议
- [ ] 掌握常用的HTTP方法（GET, POST, PUT, DELETE）
- [ ] 能识别常见的HTTP状态码
- [ ] 了解HTTP头部的作用
- [ ] 理解HTTPS的加密原理
- [ ] 知道HTTP各版本的差异

---

## 🔗 相关链接

- 🔙 [[02-核心协议|返回核心协议]]
- 🔒 [[HTTPS]]
- 🔐 [[TLS SSL]]
- 🛠️ [[06-实践工具]]

---

最后更新：2026-01-21
