---
created: 2026-06-01
type: index
topic: people
---

# People Wiki — 人物索引

> 所有已编译的人物实体页面。

---

## 人物列表

```dataview
TABLE WITHOUT ID
  file.link AS "姓名",
  tier AS "Tier",
  entity_type AS "分类",
  status AS "状态",
  file.mtime AS "最近更新"
FROM "3 Resources/people/wiki/entities"
SORT tier ASC, file.name ASC
```

---

## 按 Tier 分组

### Tier 1 — 深度档案
```dataview
LIST FROM "3 Resources/people/wiki/entities" WHERE tier = 1
```

### Tier 2 — 基础信息
```dataview
LIST FROM "3 Resources/people/wiki/entities" WHERE tier = 2
```

### Tier 3 — 存根
```dataview
LIST FROM "3 Resources/people/wiki/entities" WHERE tier = 3
```

---

## 最近更新

```dataview
TABLE file.mtime AS "更新时间" FROM "3 Resources/people/wiki/entities" SORT file.mtime DESC LIMIT 10
```

---

*最后索引更新: 2026-06-01*
