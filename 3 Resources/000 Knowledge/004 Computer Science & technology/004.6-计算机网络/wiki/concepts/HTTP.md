---
aliases: [HTTP, HTTPS] · created: 2026-05-30
type: concept · category: 計算機網絡 · status: reviewed
---
# HTTP 超文本傳輸協議

## 定義
Web 的基礎協議 — 客戶端 (瀏覽器) 與伺服器之間的請求-響應模型。

## HTTP/1.1 vs HTTP/2 vs HTTP/3
| 版本 | 特點 |
|:----:|------|
| HTTP/1.1 | 文本協議、Keep-Alive、管線化 |
| HTTP/2 | 二進制、多路復用 (mux)、Header 壓縮 |
| HTTP/3 | 基於 QUIC (UDP)、0-RTT 握手 |

## 關鍵概念: 無狀態 (Cookie/Session 補償)、REST API、CORS、緩存 (Cache-Control/ETag)

## 相關: [[DNS]]、[[TCP-IP]] · Sources: [[source-網絡-KB]]
