# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Type

This is an **Obsidian vault** - a personal knowledge management system containing Markdown notes for knowledge capture and retrieval.

## Git Workflow

This vault is version-controlled with Git and synced to GitHub at https://github.com/kmjade/knowledge-value.git.

- **Commit changes**: Use Obsidian Git plugin commands or `git add` + `git commit`
- **Sync with remote**: `git push` to push changes, `git pull` to fetch
- **Branch strategy**: Multiple feature branches for plugin configurations (e.g., `plugins_Tasks`, `plugins_Copilot`)

## Key Obsidian Plugins

- **Claudian**: AI-assisted note creation and editing
- **Daily Notes**: Auto-creates daily journal entries
- **Templates**: Pre-defined note templates
- **File Recovery**: Version history for notes
- **Sync**: Cloud sync across devices
- **Bases**: Database-like functionality for structured data

## Vault Structure

- `.obsidian/`: Obsidian configuration and plugin settings
- `.claude/`: Claude Code settings and session history
- `.git/`: Git repository data
- Root level: Markdown notes and knowledge base content

## Development Notes

- All content is in Markdown format (`.md` files)
- Frontmatter properties are used for metadata (tags, dates, etc.)
- Plugin configurations are stored in `.obsidian/*.json` files
