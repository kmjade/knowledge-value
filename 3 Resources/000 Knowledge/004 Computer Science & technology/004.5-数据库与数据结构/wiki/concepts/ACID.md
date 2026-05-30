---
aliases: [ACID]
created: 2026-05-30
type: concept · category: 數據庫 · status: reviewed
---
# ACID 事務特性

## 定義
關聯式數據庫中**交易 (Transaction)** 的四個核心保證，確保數據可靠性。

| 特性 | 含義 | 實現 |
|------|------|------|
| **A**tomicity 原子性 | 全有或全無 | Undo Log |
| **C**onsistency 一致性 | 約束始終滿足 | 應用層 + DB 約束 |
| **I**solation 隔離性 | 並發交易互不干擾 | MVCC / 鎖 |
| **D**urability 持久性 | 已提交永不丟失 | WAL (Write-Ahead Log) |

## 隔離級別: Read Uncommitted → Read Committed → Repeatable Read → Serializable (↑強 ↓效能)

## 相關: [[SQL]] · [[01-數據庫基礎]]
## Sources: [[source-數據庫-KB]]
