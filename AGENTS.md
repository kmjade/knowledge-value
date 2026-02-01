# AGENTS.md

This file provides guidance for agentic coding agents working in this Obsidian vault repository.

## Repository Overview

This is a **PARA-based Obsidian vault** (Projects, Areas, Resources, Archives) with AI integration via Claude Code. The repository implements personal knowledge management using systematic organization and multi-language support (English, Chinese Simplified, Chinese Traditional).

## Build/Lint/Test Commands

This repository contains content files (Markdown) rather than traditional code, so there are no standard build/test commands. Instead, use these validation methods:

### Content Validation
- **Link validation**: Use `/para-库概览` command to check file structure and broken links
- **Template testing**: Create test notes with `/new-project`, `/new-area`, `/new-resource` commands
- **Dataview validation**: Verify Dataview queries return expected results in individual files
- **Cache refresh**: Run `/para-刷新缓存` to update performance caches

### Git Workflow
```bash
git add .
git commit -m "para: add new project for learning Obsidian"
git push origin main
git pull origin main
```

### Single "Test" Equivalent
To validate a single note or change:
1. Check all wikilinks resolve: `[[wikilink]]` syntax
2. Verify YAML frontmatter is valid
3. Test Dataview queries if present
4. Ensure proper PARA categorization

## Code Style Guidelines

### File Naming Conventions
- **Use descriptive names with spaces**: "My Project Name.md" (Obsidian wikilink compatible)
- **Avoid special characters**: `: * ? " < > | /`
- **Template prefix**: `_template-` for template files
- **Date format**: `YYYY-MM-DD` for daily notes and dated content

### Folder Structure (PARA)
```
0 Inbox/    # Quick capture
1 Projects/ # Active projects with deadlines
2 Areas/    # Long-term responsibility areas  
3 Resources/ # Topics of ongoing interest
4 Archives/ # Completed or inactive content
```

### Markdown Standards (Obsidian Flavored Markdown)

#### Frontmatter Properties
```yaml
---
title: Note Title
tags: [category/subcategory]
status: active|on-hold|completed|cancelled
priority: high|medium|low
due: YYYY-MM-DD
aliases: [Alternative Name]
---
```

#### Wikilinks (Preferred over Markdown links)
```markdown
[[Note Name]]                    # Basic link
[[Note Name|Display Text]]       # With custom text
[[Note Name#Heading]]            # Link to heading
[[Note Name#^block-id]]          # Link to block
[[#Heading in same note]]        # Same-note heading
```

#### Callouts & Tasks
```markdown
> [!note] Informational note
> [!warning] Warning
> [!question]- Collapsible FAQ

- [ ] Incomplete task
- [x] Completed task
```

### Import/Link Guidelines

#### Internal Links
- **Prefer wikilinks**: `[[Note Name]]` over `[Text](note.md)`
- **Use display text**: `[[Long Note Name|Short]]` for readability
- **Block references**: Add `^block-id` to target specific content
- **Hierarchical linking**: Use relative paths like `../Areas/Health/`

#### External Links
- **Descriptive text**: `[AI-ML Research Paper](https://example.com/paper)`
- **URL encoding**: Encode spaces as `%20` in Markdown links
- **Citation format**: Include source in footnote or reference section

### Multi-language Support

#### Language Prioritization
- **Default**: Chinese Simplified (中文简体)
- **Alternatives**: English, Chinese Traditional (繁體中文)
- **Mixing**: Use language-specific commands/skills (`/first-cn-zh`)

#### Content Guidelines
- **Chinese punctuation**: Use full-width punctuation（，。：；？！"")
- **Consistent terminology**: Maintain same translations throughout
- **Tag language**: Use Chinese tags where primary content is Chinese
- **Frontmatter values**: Can use Chinese for titles, aliases, custom properties

### Error Handling

#### Link Validation
- Check for broken wikilinks: `[[Missing Note]]` should resolve
- Verify block references exist: `#^nonexistent-id` should be valid
- Test external links periodically

#### Frontmatter Validation
- Ensure YAML syntax is correct (proper indentation, colons, quotes)
- Verify date formats: `YYYY-MM-DD` or `YYYY-MM-DDTHH:MM:SS`
- Check required properties: `title`, `tags`

#### Dataview Query Testing
- Test queries in live preview mode
- Verify field names match frontmatter properties
- Check for syntax errors in complex queries

### Git Commit Message Style

Follow conventional commits with PARA context:

```
<scope>: <description>
```

Examples:
- `para: add new project for learning Obsidian plugins`
- `resources: update AI-ML notes with recent papers`
- `areas: reorganize health management structure`
- `archive: move completed 2024 projects to archives`

### Claude Code Integration

#### Skills Usage
- `/obsidian` - Auto-select appropriate skill based on file type
- `/para-workflow` - PARA methodology guidance
- `/first-cn-zh` - Chinese-first content creation
- `/english-first` - English-first content creation

#### Command Patterns
# 整理
- **Quick creation**: `/new-project`, `/new-area`, `/new-resource`, `/archive-note`
- **Multi-language**: Use language-specific commands for consistent output

### Testing Checklist

Before completing any work, verify:

✅ **File Structure**: Note is in correct PARA folder  
✅ **Frontmatter**: All required properties present and valid  
✅ **Links**: All wikilinks resolve correctly  
✅ **Formatting**: Follows Obsidian Flavored Markdown standards  
✅ **Language**: Consistent with repository language preferences  
✅ **Tags**: Proper hierarchical tagging  
✅ **Git**: Changes committed with appropriate message  

---

This repository prioritizes systematic knowledge organization and multi-language accessibility. Follow PARA methodology principles and maintain consistency with existing content patterns.