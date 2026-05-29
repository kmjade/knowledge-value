---
title: HTTP Protocol
tags: [networking, http, protocols]
created: 2026-05-29
aliases: [HTTP協議, Hypertext Transfer Protocol]
---

# HTTP Protocol HTTP 協議

> HTTP (Hypertext Transfer Protocol) is the foundation of data communication on the World Wide Web. From HTTP/1.0 to HTTP/3, each version addresses the limitations of its predecessors.
> HTTP 是萬維網資料通訊的基礎。從 HTTP/1.0 到 HTTP/3，每個版本都在解決前代的限制。

---

## HTTP 版本演進 Version Evolution

| 版本 | 年份 | 核心特性 | 問題 |
|------|------|---------|------|
| **HTTP/1.0** | 1996 | 每個請求建立新 TCP 連線 | 效率極低 |
| **HTTP/1.1** | 1997 | Persistent connection, pipelining | Head-of-line blocking |
| **HTTP/2** | 2015 | Multiplexing, server push, HPACK | TCP-level HOL blocking |
| **HTTP/3** | 2022 | QUIC (UDP-based), 0-RTT | 較新，普及中 |

---

## HTTP 請求/回應結構 Request & Response

### Request 請求

```
GET /index.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0
Accept: text/html
Accept-Language: zh-TW,en
```

| 方法 Method | 用途 |
|------------|------|
| **GET** | 獲取資源（冪等、安全） |
| **POST** | 建立資源 |
| **PUT** | 更新/替換資源（冪等） |
| **DELETE** | 刪除資源（冪等） |
| **PATCH** | 部分更新 |
| **HEAD** | 只取 header |
| **OPTIONS** | 查詢支援的方法 |

### Response 回應

```
HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
Content-Length: 1234

<!DOCTYPE html>...
```

### Status Codes 狀態碼

| 範圍 | 類別 | 常見 |
|------|------|------|
| **1xx** | Informational | 101 Switching Protocols |
| **2xx** | Success | 200 OK, 201 Created, 204 No Content |
| **3xx** | Redirection | 301 Moved Permanently, 302 Found, 304 Not Modified |
| **4xx** | Client Error | 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 429 Too Many Requests |
| **5xx** | Server Error | 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable |

---

## HTTP Headers

### 常用 Request Headers

| Header | 用途 |
|--------|------|
| `Host` | 目標主機名（HTTP/1.1 必需） |
| `User-Agent` | 客戶端資訊 |
| `Accept` | 接受的 MIME 類型 |
| `Authorization` | 認證資訊 |
| `Cookie` | 傳送 cookie |
| `Cache-Control` | 快取指令 |

### 常用 Response Headers

| Header | 用途 |
|--------|------|
| `Content-Type` | 回應的 MIME 類型 |
| `Set-Cookie` | 設定 cookie |
| `Cache-Control` | 快取策略 |
| `ETag` | 資源版本標識 |
| `Location` | 重定向目標 |

---

## HTTPS = HTTP + TLS

```
HTTP                           HTTPS
─────                          ─────
Plaintext                      Encrypted
Port 80                        Port 443
No authentication              Certificate validation
                               ┌──────┐
HTTP → [TLS Handshake] → [Encrypted HTTP]
```

### TLS Handshake (簡化)

```
Client                                    Server
  │── ClientHello (supported ciphers) ──→│
  │←── ServerHello + Certificate ───────│
  │── Key Exchange ────────────────────→│
  │←── Finished ───────────────────────│
  │◄════ Encrypted Data ═══════════►│
```

---

## HTTP/2 vs HTTP/1.1

| 特性 | HTTP/1.1 | HTTP/2 |
|------|----------|--------|
| **連線** | 多個 TCP 連線 | 單一 TCP 連線（multiplexing） |
| **Header** | 純文字，重複傳輸 | Binary + HPACK 壓縮 |
| **Server Push** | ❌ | ✅ 伺服器可主動推送資源 |
| **Priority** | ❌ | ✅ Stream prioritization |

---

## RESTful API with HTTP

| 操作 | HTTP Method | Path | 冪等 |
|------|------------|------|------|
| List | GET | `/users` | ✅ |
| Read | GET | `/users/123` | ✅ |
| Create | POST | `/users` | ❌ |
| Update | PUT | `/users/123` | ✅ |
| Partial Update | PATCH | `/users/123` | ❌ |
| Delete | DELETE | `/users/123` | ✅ |

---

> 💡 HTTP 看似簡單，但它是 Web 的基石。理解 HTTP semantics、caching、和 security 是每個後端工程師的必修課。
