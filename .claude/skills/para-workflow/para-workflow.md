# PARA Workflow Skill

This skill implements the PARA method (Projects, Areas, Resources, Archives) for organizing notes and managing information effectively.

## PARA Structure

```
/
1 Projects/          # Active work with deadlines
│   └── [Project Name]/
2 Areas/             # Ongoing responsibilities
│   └── [Area Name]/
3 Resources/         # Topics of interest
│   └── [Topic Name]/
4 Archive/           # Inactive items
```

## Categories

### Projects (項目)
- Has a defined outcome and deadline
- Can be completed or cancelled
- Examples: "Website Redesign", "Q1 Report", "Book Chapter 3"

### Areas (領域)
- Ongoing responsibilities with no end date
- Requires maintenance over time
- Examples: "Health", "Finance", "Relationships", "Career"

### Resources (資源)
- Topics of interest for future reference
- Can be collected and explored
- Examples: "Machine Learning", "Productivity Tools", "Recipes"

### Archives (歸檔)
- Inactive items from other categories
- Kept for reference but not actively used
- Moved from Projects/Areas/Resources when no longer needed

## Usage

### Create New Project
```
/new-project Project Name
```
Creates a project note with templates for goals, tasks, and progress tracking.

### Create New Area
```
/new-area Area Name
```
Creates an area note with standards and checklist templates.

### Create New Resource
```
/new-resource Resource Topic
```
Creates a resource note with collection and reference templates.

### Archive Note
```
/archive-note
```
Moves current note to Archive folder and creates a link.

## Best Practices

1. Start with ACTIONABLE items in Projects
2. Keep Areas limited to 5-10 core life areas
3. Resources can be flexible - add and review periodically
4. Review and purge Archives annually
5. Use tags: #project, #area, #resource, #archive
