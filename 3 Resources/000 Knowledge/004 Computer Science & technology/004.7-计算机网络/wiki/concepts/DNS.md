---
aliases: [Domain Name System] · created: 2026-05-30
type: concept · category: 計算機網絡 · status: reviewed
---
# DNS 域名系統

## 定義
Internet 的「電話簿」— 將人類可讀域名 (google.com) 轉換為機器可讀 IP (142.250.x.x)。

## 查詢過程: 瀏覽器緩存 → OS 緩存 → 遞迴 DNS → Root DNS (.) → TLD DNS (.com) → Authoritative DNS

## 記錄類型
| 類型 | 用途 | 例子 |
|:----:|------|------|
| A | IPv4 地址 | example.com → 93.184.216.34 |
| AAAA | IPv6 地址 | → 2606:2800:220:1:... |
| CNAME | 別名 | www → example.com |
| MX | 郵件伺服器 | @ → mail.example.com |
| TXT | 文字 (SPF/DKIM) | 驗證記錄 |

## 相關: [[HTTP]]、[[TCP-IP]] · Sources: [[source-網絡-KB]]
