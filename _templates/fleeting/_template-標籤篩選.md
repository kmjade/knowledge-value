---
type: template
category: filter
---

# 🏷️ 按標籤篩選閃念筆記

## 篩選標籤：`{{標籤名}}`

```dataview
TABLE WITHOUT ID
  file.link AS "筆記",
  split(file.name, "-")[0] AS "主題",
  file.tags AS "所有標籤",
# 修改
FROM "5 Zettels/💡 fleeting"
WHERE contains(file.tags, "{{標籤名}}") AND contains(file.name, "-闪念") AND file.name != "💡 fleeting.md"
SORT file.mtime DESC
```

## 篩選結果摘要

- 找到 `{{count}}` 個帶有 `{{標籤名}}` 標籤的筆記
- 篩選時間：`{{date}}`

---

> [!info] 提示
# 修改
