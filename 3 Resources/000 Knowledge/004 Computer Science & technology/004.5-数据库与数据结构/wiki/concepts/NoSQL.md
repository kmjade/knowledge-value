---
aliases: [NoSQL]
created: 2026-05-30
type: concept · category: 數據庫 · status: reviewed
---
# NoSQL 非關聯式數據庫

## 定義
非關聯式數據庫系統，犧牲 ACID 部分保證換取**水平擴展、靈活 schema 和高併發**。

## 四種類型
| 類型 | 代表 | 適合場景 |
|------|------|---------|
| Document | MongoDB | JSON 文檔儲存 |
| Key-Value | Redis | 快取、計數器 |
| Wide-Column | Cassandra | 時間序列、IoT |
| Graph | Neo4j | 社交網絡、推薦 |

## CAP 選擇: MongoDB (CP)、Cassandra (AP) — 多數 NoSQL 選擇 AP (可用+容錯，犧牲強一致)

## 相關: [[SQL]] (對比) · [[05-NoSQL 數據庫]]
## Sources: [[source-數據庫-KB]]
