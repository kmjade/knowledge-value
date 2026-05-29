<%*
area = await tp.system.suggester(tp.user.getAreaList(), tp.user.getAreaListValue(), false, "Area")
-%>
---
aliases:
para: project
domain: 
  - "[[<% area %>]]"
creation:
  - <% tp.file.creation_date() %>
start: 
by-when: 
achieve: 

---
# {{VALUE:🎯 Add Project}}
---

## Desired outcome（预期结果）
- 

## Action Plan（行动计划）
1. 
2. 
3. 

---
## All files
```dataview
Table without id type as Type, rows.file.link as File
WHERE contains(file.path, this.file.folder) AND file.name != this.file.name
FLATTEN type
GROUP BY type
SORT type, file.name
```

## Linked notes
```dataview
Table sort(rows.file.link) as File
FROM [[]]
WHERE !contains(file.folder, this.file.name)
GROUP BY file.folder as Folder
```