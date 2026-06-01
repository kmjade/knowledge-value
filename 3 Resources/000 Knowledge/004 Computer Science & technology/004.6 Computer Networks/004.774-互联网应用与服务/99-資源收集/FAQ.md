---
aliases: [FAQ, 常見問題]
tags: [DDC/004.774, faq]
created: 2026-06-01
---

# 99 — FAQ 常見問題

> 004.774 互聯網應用與服務領域的常見問題速查。

---

## 架構與協議 Architecture & Protocol

| 問題 | 簡答 |
|------|------|
| REST vs GraphQL 何時選哪個？ | 公開 API / CRUD → REST；複雜 UI / 多客戶端 → GraphQL |
| HTTP/2 vs HTTP/3 主要差異？ | HTTP/3 用 QUIC(UDP)，解決 TCP HOL 阻塞，0-RTT 握手 |
| WebSocket 何時優於輪詢？ | 低延遲雙向通訊（聊天、遊戲、行情即時報價） |
| PWA 是否已取代原生 App？ | 大部分場景可替代，但 iOS 推送/藍牙等仍有局限 |

---

## 雲端與基礎設施 Cloud & Infrastructure

| 問題 | 簡答 |
|------|------|
| IaaS / PaaS / SaaS / FaaS 選哪個？ | 控制力需求愈高 → 愈底層；速度優先 → 愈上層 |
| 為什麼選 R2 而非 S3？ | R2 免流量費（egress），適合頻繁下載場景 |
| Serverless 冷啟動如何解決？ | Provisioned Concurrency (AWS) / min instances (GCP) |
| CDN 如何選擇？ | 前端站 → Vercel/Netlify；AWS 生態 → CloudFront；全球防護 → Cloudflare |

---

## API 與整合 API & Integration

| 問題 | 簡答 |
|------|------|
| OAuth2 Auth Code + PKCE 何時用？ | SPA / 移動端（無法安全保存 client secret） |
| gRPC 能在瀏覽器中用嗎？ | 需要 gRPC-Web 代理轉換，不支援原生 HTTP/2 frames |
| Webhook vs Polling？ | Webhook：事件驅動，即時但需公網端點；Polling：簡單但延遲高 |
| API 版本控制最佳做法？ | URL 版本（/v1/），或 Header 版本（Accept: vnd.api+v2） |

---

## 安全 Security

| 問題 | 簡答 |
|------|------|
| JWT 存在 localStorage 安全嗎？ | 不推薦（XSS 風險）；優先 httpOnly cookie + CSRF token |
| CORS 如何安全配置？ | 白名單 Origin，不與 credentials 共用萬用字元 |
| Let's Encrypt 證書限制？ | 90 天有效期，每週每域名 50 張，僅 DV 驗證 |
| GDPR 對 API 設計的影響？ | 日誌匿名化 / 偽匿名化，提供資料刪除 API |

---

## 相關筆記 Related Notes

- [[../004.774-互联网应用与服务|004.774 MOC]] — 回主導航
- [[資源總覽]] — 工具與資源收集
