---
aliases: [數據庫 FAQ]
tags: [DDC/004.6, faq]
---
# 數據庫 FAQ

### SQL vs NoSQL？
結構化、交易需求、強一致性 → SQL。靈活 schema、大規模水平擴展 → NoSQL。

### 索引越多越好？
否。索引加速查詢但拖慢寫入 (INSERT/UPDATE)，且佔用空間。

### 垂直 vs 水平擴展？
垂直: 升級硬體 (CPU/RAM)，簡單但有上限。水平: 增加節點 (分片)，複雜但無限擴展。

### OLTP vs OLAP？
OLTP: 高併發交易 (訂單系統)。OLAP: 複雜分析查詢 (BI 報表)。

### 何時用 Graph DB？
高度互聯數據 — 社交關係、推薦系統、知識圖譜 → Neo4j。
