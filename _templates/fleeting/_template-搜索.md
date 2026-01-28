---
type: template
category: search
---

# 🔍 搜索閃念筆記

## 搜索關鍵詞：`{{搜索詞}}`

```dataview
TABLE WITHOUT ID
  file.link AS "筆記",
  split(file.name, "-")[0] AS "主題",
  dateformat(file.mtime, "yyyy-MM-dd") AS "最後修改"
FROM "5 Zettels/💡 fleeting"
WHERE contains(file.content, "{{搜索詞}}") AND contains(file.name, "-闪念") AND file.name != "💡 fleeting.md"
SORT file.mtime DESC
```

## 搜索結果摘要

- 找到 `{{count}}` 個相關筆記
- 搜索時間：`{{date}}`

---

> [!info] 提示
> 修改第一行的 `{{搜索詞}}` 即可重新搜索
