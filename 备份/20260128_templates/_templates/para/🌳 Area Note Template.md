<%*
area = await tp.system.suggester(tp.user.getAreaList(), tp.user.getAreaListValue(), false, "Area")

path = "/2 Areas/"+area+"/"+tp.file.title
await tp.file.move(path)
-%>
---
aliases:
domain: 
  - "[[<% area %>]]"
subtopic:
creation: <% tp.file.creation_date() %>
---
# <% tp.file.title %>
