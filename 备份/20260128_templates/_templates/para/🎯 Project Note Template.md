<%*
project = await tp.system.suggester(tp.user.getProjectList(), tp.user.getProjectListValue(), false, "Project")

var project_frontmatter = this.app.metadataCache.getFileCache(
	tp.file.find_tfile(project)
)?.frontmatter || {};
areas = project_frontmatter.domain

const formatted_areas = areas.map(area => `  - "${area}"`).join("\n");

path = "/1 Projects/"+project+"/"+tp.file.title
await tp.file.move(path)
-%>
---
aliases:
project: 
  - "[[<% project %>]]"
domain: 
<% formatted_areas %>
creation: 
  - <% tp.file.creation_date() %>
---
## <% tp.file.title %>
