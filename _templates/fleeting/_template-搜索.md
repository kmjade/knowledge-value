---
type: template
category: search
---

# 搜尋

# 搜尋

```dataview
TABLE WITHOUT ID
  file.link AS "筆記",
  split(file.name, "-")[0] AS "主題",
# 修改
FROM "5 Zettels/💡 fleeting"
# 搜尋
SORT file.mtime DESC
```

# 搜尋

- 找到 `{{count}}` 個相關筆記
# 搜尋

---

> [!info] 提示
# 搜尋
