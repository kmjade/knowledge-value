---
aliases: [HTTP & Web Protocols, 網頁通訊協議]
tags: [DDC/004.774, http, protocol]
created: 2026-06-01
---

# 02 — HTTP 與 Web 協議 HTTP & Web Protocols

> HTTP 是 Web 的根基。三十年三度大版本進化——從純文本到多路復用 QUIC。

---

## HTTP 版本演進 Evolution

| 版本 | 年份 | 傳輸 | 關鍵特性 | 問題 |
|------|------|------|---------|------|
| **HTTP/1.0** | 1996 | TCP | 每個請求新建連接 | 連接開銷大 |
| **HTTP/1.1** | 1997 | TCP | Keep-Alive, 管線化 | Head-of-Line 阻塞 |
| **HTTP/2** | 2015 | TCP | 多路復用、Header 壓縮、Server Push | TCP HOL 阻塞 |
| **HTTP/3** | 2022 | QUIC (UDP) | 0-RTT 握手、無 HOL 阻塞 | 部署成本 |

---

## HTTPS / TLS 1.3

| 階段 | TLS 1.2 | TLS 1.3 |
|------|---------|---------|
| **握手** | 2-RTT | 1-RTT（或 0-RTT） |
| **加密套件** | 舊式（含不安全） | 僅 AEAD |
| **前向安全** | 可選 | 強制 PFS |

---

## 通訊機制 Communication Mechanisms

| 機制 | 特點 | 方向 | 適用場景 |
|------|------|------|---------|
| **Cookie/Session** | 伺服器狀態，瀏覽器自動攜帶 | — | 傳統登入 |
| **JWT** | 無狀態，自包含 Token | — | REST API |
| **WebSocket** | 全雙工持久連接 | 雙向 | 即時聊天、行情 |
| **CORS** | 跨域資源共享策略 | — | 瀏覽器安全 |
| **ETag** | 條件請求，304 Not Modified | — | 緩存驗證 |
| **Cache-Control** | 瀏覽器/CDN 緩存指令 | — | 靜態資源 |

---

## 緩存策略 Caching Strategy

| 指令 | 作用 | 範例 |
|------|------|------|
| `max-age=3600` | 緩存 1 小時，期間不請求 | 靜態 JS/CSS |
| `no-cache` | 緩存但每次需驗證（ETag） | HTML 頁面 |
| `no-store` | 完全不緩存 | 敏感數據 |
| `stale-while-revalidate` | 先返回緩存，後台更新 | API 響應 |

---

## 相關筆記 Related Notes

- [[../004.6-计算机网络/02-Core Protocols/HTTP Protocol Deep Dive|HTTP Protocol Deep Dive]]
- [[01-概述与架构]] — 架構層級使用場景
- [[04-API设计与集成]] — API 層協議選擇
