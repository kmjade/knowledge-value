---
aliases: [API Design & Integration, API 設計]
tags: [DDC/004.774, api, integration]
created: 2026-06-01
---

# 04 — API 設計與集成 API Design & Integration

> API 是現代互聯網服務的「合約層」。選擇正確的協議與風格，決定系統的可擴展性與開發體驗。

---

## RESTful vs GraphQL vs gRPC

| 維度 | RESTful | GraphQL | gRPC |
|------|---------|---------|------|
| **協議** | HTTP/1.1 JSON | HTTP POST JSON | HTTP/2 Protobuf |
| **查詢** | 固定端點，多次請求 | 單一端點，自訂查詢 | 固定 RPC，嚴格契約 |
| **過度/不足獲取** | 常見 | 精準獲取 | 精準（Protobuf） |
| **緩存** | HTTP 原生緩存 | 需自訂（Persisted Query） | 不適用瀏覽器 |
| **版本管理** | URL 版本 (/v2/) | Schema 演進（@deprecated） | Protobuf 欄位編號 |
| **類型安全** | 需 OpenAPI/JSON Schema | 原生 Schema + 型別 | 原生 Protobuf |
| **適用** | 公開 API、CRUD | 複雜 UI、移動端 | 微服務內部通訊 |
| **工具生態** | Swagger, Postman | Apollo, GraphiQL | buf, grpcurl |

---

## API 規格與網關 Specifications & Gateway

| 工具/概念 | 作用 | 說明 |
|-----------|------|------|
| **OpenAPI (Swagger)** | REST API 文檔 & 代碼生成 | v3.1 支援 JSON Schema |
| **GraphQL Schema** | 型別定義 + 內省 | 前端自助查詢 |
| **Protobuf (proto3)** | IDL，跨語言序列化 | gRPC 基礎 |
| **API Gateway** | 路由、限流、認證、聚合 | Kong, Apigee, AWS API GW |
| **Webhook** | 事件回調（push-based） | Stripe/ GitHub webhooks |
| **OAuth 2.0 / OIDC** | 授權委託 + 身份認證 | 見下面 → |

---

## OAuth 2.0 / OIDC 授權流 Authorization Flows

| Flow | 適用 | 步驟 |
|------|------|------|
| **Authorization Code + PKCE** | SPA / 移動端 | 授權碼 → Token（含 PKCE 校驗） |
| **Client Credentials** | M2M / 後端服務 | Client ID + Secret → Token |
| **Device Code** | IoT / TV 設備 | 設備碼 → 用戶在手機授權 |
| **Implicit** | ⚠️ 已廢棄 | 不安全，改用 PKCE |

---

## API 設計最佳實踐 Best Practices

1. **向後兼容**——只新增欄位，不改/刪已有欄位
2. **分頁 (Pagination)**——Cursor-based 優於 Offset（大數據集）
3. **速率限制 (Rate Limiting)**——429 狀態碼 + `Retry-After` Header
4. **冪等性 (Idempotency)**——PUT/DELETE 冪等；POST 使用 `Idempotency-Key`
5. **錯誤格式**——統一 `{ error: { code, message, details } }` 結構

---

## 相關筆記 Related Notes

- [[02-HTTP与Web协议]] — HTTP 協議基礎
- [[03-云服务与基础设施]] — API Gateway 部署於雲端
- [[09-安全与合规]] — OAuth 安全考量
