<%*
resource = await tp.system.suggester(tp.user.getResourceList(), tp.user.getResourceListValue(), false, "Resource")

path = "/3 Resources/"+resource+"/"+tp.file.title
await tp.file.move(path)
-%>
---
aliases:
domain: 
  - "[[<% resource %>]]"
subtopic:
creation: <% tp.file.creation_date() %>
---
# <% tp.file.title %>

