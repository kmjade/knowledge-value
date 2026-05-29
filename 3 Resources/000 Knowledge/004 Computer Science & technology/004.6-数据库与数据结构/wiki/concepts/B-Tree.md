---
aliases: [B-Tree]
created: 2026-05-30
type: concept · category: 數據結構 · status: reviewed
---
# B-Tree 平衡多路搜尋樹

## 定義
自平衡樹結構，每個節點可有多個鍵 (degree = d)，所有葉節點在同一層。數據庫索引的**核心數據結構**。

## 特性
- 查找/插入/刪除: **O(log n)**
- 每個節點儲存多個鍵值 → 減少磁碟 I/O
- 節點大小通常匹配磁碟頁面 (4KB/8KB)

## B-Tree vs B+Tree
- **B-Tree**: 鍵+數據存於內部和葉節點
- **B+Tree**: 數據僅存於葉節點，葉節點鏈結 (範圍查詢更優) → PostgreSQL/MySQL 默認

## 相關: [[雜湊表]] · [[07-線性與非線性結構]]
## Sources: [[source-數據庫-KB]]
