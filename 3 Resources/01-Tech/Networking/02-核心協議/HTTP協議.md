---
title: HTTP協議
aliases:
  - HyperText Transfer Protocol
  - HTTPS
  - Web協議
para: resource
tags:
  - #para/resource/tech
  - #topic/networking
  - #topic/protocols
  - #protocol/http
  - #protocol/https
  - #layer/application
  - #type/concept
  - #zettel/type/permanent
  - #difficulty/intermediate
  - #learning/mastered
created: 2026-01-21
updated: 2026-02-15
---

> [!summary] HTTP协议概述
> HTTP (HyperText Transfer Protocol) 是應用程式层协议，用于在Web瀏覽器和Web伺服器之间傳輸超文本數據。

---

## 📋 目錄

- [HTTP基礎](#http基礎)
- [HTTP狀態码](#http狀態码)
- [HTTP头部](#http头部)
- [HTTPS](#https)
- [HTTP版本演進](#http版本演進)

---

## 🔍 HTTP基礎

### 定义

HTTP是一个**無狀態**的**请求-響應**协议，運行在**TCP协议**之上（默认端口80）。

```
客户端                         伺服器
  │                              │
  │─── 1.建立TCP連接 ────────────→│
  │                              │
  │─── 2.發送HTTP请求 ───────────→│
  │                              │
  │←── 3.處理请求 ───────────────│
  │                              │
  │←── 4.返回HTTP響應 ───────────│
  │                              │
  │─── 5.渲染頁面 ───────────────→│
  │                              │
  │─── 6.關閉連接 ───────────────→│
  │                              │
```

### 特點

| 特性 | 說明 |
|------|------|
| **無狀態** | 伺服器不儲存客户端的任何狀態 |
| **请求-響應** | 客户端发起请求，伺服器返回響應 |
| **灵活** | 可以傳輸任意类型的數據 |
| **可擴展** | 通過头部字段擴展功能 |

---

## 📝 HTTP请求方法

| 方法 | 功能 | 安全 | 幂等 |
|------|------|--------|--------|
| GET | 获取資源 | ✅ 是 | ✅ 是 |
| POST | 創建/提交數據 | ❌ 否 | ❌ 無 |
| PUT | 更新資源 | ❌ 否 | ✅ 是 |
| DELETE | 刪除資源 | ✅ 是 | ✅ 是 |
| HEAD | 获取響應头（無響應体） | ✅ 是 | ✅ 是 |
| CONNECT | 建立隧道（常用于HTTPS代理） | ❌ 否 | ❌ 無 |
| TRACE | 回显伺服器收到的请求 | ✅ 是 | ✅ 是 |
| OPTIONS | 查询支持的HTTP方法 | ✅ 是 | ✅ 是 |

#### GET
```
GET /index.html HTTP/1.1
Host: www.example.com
```
- 用于获取資源
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
- 用于創建資源或提交數據
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
- 用于更新資源（整體更新）
- 幂等：多次PUT結果相同

#### DELETE
```
DELETE /api/users/1 HTTP/1.1
Host: www.example.com
```
- 用于刪除資源
- 幂等：多次DELETE結果相同

---

## 📊 HTTP狀態码

### 狀態码分類

```
1xx 資訊性 - 请求已接收，繼續處理
2xx 成功 - 请求成功處理
3xx 重定向 - 需要进一步操作
4xx 客户端错误 - 客户端请求错误
5xx 伺服器错误 - 伺服器處理错误
```

### 常见狀態码

#### 2xx 成功

| 狀態码 | 說明 | 使用場景 |
|--------|------|----------|
| 200 OK | 请求成功 | GET/POST成功 |
| 201 Created | 資源創建成功 | POST成功 |
| 204 No Content | 成功但無返回內容 | DELETE成功 |
| 206 Partial Content | 部分內容 | 断点续传 |

#### 3xx 重定向

| 狀態码 | 說明 | 使用場景 |
|--------|------|----------|
| 301 Moved Permanently | 永久重定向 | URL永久改变 |
| 302 Found | 临时重定向 | URL临时改变 |
| 303 See Other | 查看其他位置 | 提交後重定向到GET |
| 307 Temporary Redirect | 临时重定向 | 保持請求方法 |
| 308 Permanent Redirect | 永久重定向 | 保持請求方法 |

#### 4xx 客户端错误

| 狀態码 | 說明 | 使用場景 |
|--------|------|----------|
| 400 Bad Request | 请求错误 | 请求格式错误 |
| 401 Unauthorized | 未认证 | 需要登入 |
| 403 Forbidden | 禁止访问 | 权限不足 |
| 404 Not Found | 資源不存在 | URL错误 |
| 405 Method Not Allowed | 方法不允许 | 請求方法不支持 |
| 409 Conflict | 冲突 | 資源冲突 |
| 429 Too Many Requests | 请求过多 | 超出速率限制 |

#### 5xx 伺服器错误

| 狀態码 | 說明 | 使用場景 |
|--------|------|----------|
| 500 Internal Server Error | 伺服器内部错误 | 伺服器故障 |
| 502 Bad Gateway | 网关错误 | 网关不可用 |
| 503 Service Unavailable | 服务不可用 | 伺服器过载 |
| 504 Gateway Timeout | 网关超时 | 響應超时 |

---

## 📦 HTTP头部

### 请求头示例

```
GET /index.html HTTP/1.1
Host: www.example.com              # 主机名
User-Agent: Mozilla/5.0...          # 瀏覽器資訊
Accept: text/html,application/xhtml+xml  # 可接受的类型
Accept-Language: zh-CN,en-US        # 可接受的语言
Accept-Encoding: gzip, deflate      # 可接受的编码
Connection: keep-alive              # 連接方式
Cookie: session=abc123              # Cookie
Cache-Control: no-cache             # 缓存控制
```

### 響應头示例

```
HTTP/1.1 200 OK
Date: Tue, 21 Jan 2026 14:00:00 GMT  # 日期
Server: nginx/1.18.0                # 伺服器資訊
Content-Type: text/html             # 內容类型
Content-Length: 1234                # 內容长度
Connection: keep-alive              # 連接方式
Set-Cookie: session=xyz789; Secure   # 設置Cookie
Cache-Control: max-age=3600         # 缓存控制
```

### 常见头部

#### 请求头

| 头部 | 說明 |
|------|------|
| Host | 请求的主机名（必填） |
| User-Agent | 客户端資訊 |
| Accept | 可接受的內容类型 |
| Authorization | 认证資訊 |
| Content-Type | 请求体的內容类型 |
| Content-Length | 请求体的长度 |
| Cookie | 客户端Cookie |
| Referer | 来源頁面 |

#### 響應头

| 头部 | 說明 |
|------|------|
| Server | 伺服器資訊 |
| Content-Type | 響應体的內容类型 |
| Content-Length | 響應体的长度 |
| Set-Cookie | 設置Cookie |
| Location | 重定向的URL |
| Cache-Control | 缓存策略 |
| ETag | 資源标识 |

---

## 🔒 HTTPS

### 定义

HTTPS (HTTP Secure) 是HTTP的安全版本，通過SSL/TLS協議對數據進行加密傳輸，確保數據的機密性、完整性和認證性。

### 工作原理

```
客户端                         伺服器
  │                              │
  │─── 1.發送ClientHello ──────→│
  │←── 2.返回ServerHello ───────│
  │←── 3.返回数字证书 ──────────│
  │                              │
  │─── 4.驗證证书 ───────────────│
  │                              │
  │─── 5.發送预主密钥(加密) ─────→│
  │                              │
  │─── 6.双方生成会话密钥 ───────→│
  │                              │
  │─── 7.加密通訊 ───────────────→│
  │←─────────────────────────────│
```

### HTTPS vs HTTP

| 特性 | HTTP | HTTPS |
|------|------|-------|
| 端口 | 80 | 443 |
| 加密 | ❌ 無 | ✅ 有 |
| 认证 | ❌ 無 | ✅ 有 |
| 數據安全 | ⚠️ 明文傳輸 | ✅ 加密傳輸 |
| SEO排名 | 低 | 高 |
| 成本 | 低 | 高（证书費用） |

### TLS/SSL握手過程

1. **ClientHello**: 客户端發送支持的加密套件和随机数
2. **ServerHello**: 伺服器選擇加密套件和發送随机数
3. **证书驗證**: 伺服器發送数字证书，客户端驗證
4. **密钥交换**: 客户端生成预主密钥，用伺服器公钥加密發送
5. **会话密钥生成**: 双方使用预主密钥和随机数生成会话密钥
6. **加密通訊**: 使用会话密钥加密後續通訊

---

## 📡 HTTP版本演進

### HTTP/1.0

- 每次请求都需要建立新連接
- 無持久連接

### HTTP/1.1

```
Connection: keep-alive  # 持久連接
```
- 默认持久連接
- 支持管道化（Pipeline）
- 分块傳輸编码（Chunked Transfer）
- 缓存控制增强

### HTTP/2

```
特性：
- 多路复用（Multiplexing）
- 二进制协议
- 头部压缩（HPACK）
- 伺服器推送（Server Push）
```

### HTTP/3

```
特性：
- 基于QUIC协议（UDP）
- 解決队头阻塞
- 更快的連接建立
```

---

## 🛠️ 實踐示例

### 示例1：使用 curl 命令

```bash
# 發送GET请求（詳細輸出）
curl -v https://www.example.com

# 只查看響應頭
curl -I https://www.example.com

# 發送POST请求
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John"}'

# 發送JSON並保存響應
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John"}' \
  -o response.json
```

### 示例2：瀏覽器開發者工具

1. 打開瀏覽器開發者工具（F12）
2. 切換到"Network"標籤
3. 刷新頁面
4. 點擊任意請求查看詳細資訊：
   - 請求/響應頭
   - 請求/響應體
   - 時間線
   - 大小

---

## 💡 效能優化

### 1. 减少HTTP请求数
- 合并CSS/JS檔案
- 使用雪碧图（Sprite）
- 内联小資源

### 2. 利用缓存
```
Cache-Control: max-age=3600
ETag: "abc123"
```

### 3. 压缩內容
```
Accept-Encoding: gzip, deflate
Content-Encoding: gzip
```

### 4. 使用CDN
- 就近访问
- 减少延遲

### 5. 使用HTTP/2
- 多路复用
- 头部压缩

---

## 📝 學習檢查清單

- [ ] 能說出HTTP是無狀態的請求-響應協議
- [ ] 能列出並解釋所有的HTTP請求方法
- [ ] 能識別常見的HTTP狀態碼
- [ ] 了解HTTP頭部的作用
- [ ] 理解HTTPS的加密原理
- [ ] 知道HTTP/1.1、HTTP/2、HTTP/3的主要特點

---

## 🔗 相關連結

- 🔙 [[02-核心協議|返回核心協議]]
- 🔐 [[加密與認證|TLS/SSL]]
- 🛠️ [[06-實踐工具]]
