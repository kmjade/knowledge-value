---
aliases: [NoSQL]
tags: [DDC/004.6, nosql]
---
# 05 NoSQL 數據庫

## 為什麼 NoSQL
關聯式 DB 在大數據、高併發、靈活 schema 場景下的限制 → NoSQL (Not Only SQL)。

## 四大類型
| 類型 | 代表 | 數據模型 | 場景 |
|------|------|---------|------|
| **文檔型** | MongoDB | JSON/BSON | CMS、目錄 |
| **鍵值型** | Redis | Key→Value | 快取、Session |
| **列族型** | Cassandra | Column Family | 時序、IoT |
| **圖型** | Neo4j | Node+Edge | 社交圖譜、推薦 |

## MongoDB 範例
```js
db.users.insertOne({name: "Alice", tags: ["dev", "ai"]})
db.users.find({tags: "ai"})
```
