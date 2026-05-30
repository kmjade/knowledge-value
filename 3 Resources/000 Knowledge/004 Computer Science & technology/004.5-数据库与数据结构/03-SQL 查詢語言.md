---
aliases: [SQL]
tags: [DDC/004.6, sql]
---
# 03 SQL 查詢語言

## DDL (資料定義) vs DML (資料操作)
```sql
-- DDL
CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(100));
ALTER TABLE users ADD COLUMN email VARCHAR(255);
DROP TABLE users;

-- DML
SELECT * FROM users WHERE age > 18;
INSERT INTO users VALUES (1, 'Alice');
UPDATE users SET age = 30 WHERE id = 1;
DELETE FROM users WHERE id = 1;
```

## JOIN 類型
- **INNER JOIN** — 兩表匹配的行
- **LEFT JOIN** — 左表全部 + 右表匹配
- **RIGHT JOIN** — 右表全部 + 左表匹配
- **FULL OUTER JOIN** — 兩表全部

## 進階: 子查詢、聚合 (GROUP BY/HAVING)、視圖、交易控制 (BEGIN/COMMIT/ROLLBACK)
