---
aliases:
  - Wiki-Compile 详细设计
  - 编译详细设计
created: 2026-05-31
type: design-detail
topic: wiki-compile
parent: "[[Skill-wiki-compile v1.0]]"
tags:
  - design
  - wiki-compile
  - architecture
---

# /wiki-compile 详细设计 v2.0

> 基于 [[SRS-wiki-compile-原型设计|原型]] → 技术实现规格

---

## 1. 架构

```
/wiki-compile [topic]
        │
        ├──[--dry-run]──► DryRunPipeline (跳过 Write)
        ├──[--incremental]──► IncrementalPipeline (默认)
        └──[--force]──► ForcePipeline (全量)

每个 Pipeline:
  Preflight → Scanner → Extractor → Deduplicator → Writer → Indexer → Logger
```

---

## 2. Preflight — 前检查

```
function preflight(topic: string): Context {
    schema   = read(f"3 Resources/{topic}/CLAUDE.md")
    index    = read(f"3 Resources/{topic}/wiki/index.md")
    log      = readLast(f"3 Resources/{topic}/wiki/log.md", 10)
    
    if !schema:  warn("无 CLAUDE.md，使用默认规则")
    if !index:   warn("无 index.md，将创建")
    
    return { schema, index, log }
}
```

---

## 3. Scanner — 源文件扫描

```
SCAN_DIRS = ["articles", "papers", "books", "conversations"]

function scan(topic: string, mode: Mode): File[] {
    base = f"3 Resources/{topic}/raw/"
    files = []
    
    for dir in SCAN_DIRS:
        for f in ls(f"{base}/{dir}/*.md"):
            fm = parseFrontmatter(f)
            
            if mode == INCREMENTAL:
                if fm.compiled == true && f.mtime <= fm.compiled_at:
                    continue  // 跳过已编译未修改
            if mode == FORCE:
                // 不跳过任何文件
            
            files.append(f)
    
    return files.sortBy(modified)
}
```

---

## 4. Extractor — 提取器

### 4.1 概念提取

```
function extractConcepts(file: File): Concept[] {
    concepts = []
    
    // 1. 标题匹配: ## 定义 / ### 概念
    for heading in findHeadings(file, "定义|概念|原理"):
        name = slugify(heading.title)  // PascalCase
        definition = heading.nextParagraph()
        related = extractWikilinks(heading.section)
        
        concepts.append({
            name, definition, related,
            confidence: heading.level == 2 ? HIGH : MEDIUM
        })
    
    // 2. 术语密度: 高频专业术语
    terms = extractTerms(file, minFreq=3)
    for term in terms where isNew(term):
        concepts.append({ name: term, confidence: LOW })
    
    return concepts
}
```

### 4.2 实体提取

```
ENTITY_PATTERNS = {
    person:      /(作者|提出者|创始人|发明人)[：:]\s*(.+)/,
    company:     /(公司|企业|平台|厂商)[：:]\s*(.+)/,
    tool:        /(工具|软件|框架|库)[：:]\s*(.+)/,
    paper:       /(论文|发表|期刊|会议)[：:]\s*(.+)/,
}

function extractEntities(file: File): Entity[] {
    entities = []
    for (type, pattern) in ENTITY_PATTERNS:
        if match := pattern.exec(file.content):
            entities.append({ type, name: match[2] })
    return entities
}
```

### 4.3 关系提取

```
RELATION_SIGNALS = {
    "is-a":        ["是一种", "属于", "是.*类型"],
    "part-of":     ["组成", "包含", "由.*构成"],
    "uses":        ["使用", "基于", "采用", "利用"],
    "created":     ["创建", "发明", "提出", "开发"],
    "competes":    ["vs", "对比", "替代", "竞争"],
    "related":     ["相关", "关联", "参见", "参考"],
}

function extractRelations(concepts, entities, file): Relation[] {
    relations = []
    for (type, signals) in RELATION_SIGNALS:
        for signal in signals:
            if match := regex(signal).exec(file.content):
                // 识别主语和宾语
                subject = findSubject(match)
                object = findObject(match)
                relations.append({ type, subject, object, source: file })
    return relations
}
```

---

## 5. Deduplicator — 去重器

```
function deduplicate(newConcept: Concept, existing: Concept[]): Action {
    // 1. 同名匹配
    if match := findByName(existing, newConcept.name):
        return MERGE(match, newConcept)
    
    // 2. 别名匹配
    if match := findByAlias(existing, newConcept.name):
        return MERGE(match, newConcept)
    
    // 3. 关键词重叠 > 80%
    if match := findByOverlap(existing, newConcept.keywords, 0.8):
        return MERGE(match, newConcept)
    
    // 4. 跨库检查
    if crossLibrary := checkOtherLibraries(newConcept):
        return CROSS_REFERENCE(crossLibrary)
    
    return CREATE_NEW
}

function MERGE(target, source):
    target.sources.append(source.source)
    target.aliases.extend(source.aliases)
    target.updated = now()
    target.content = mergeContent(target, source)
```

---

## 6. Writer — 写入器

```
function write(concept: Concept, topic: string): Path {
    path = f"3 Resources/{topic}/wiki/concepts/{concept.name}.md"
    
    template = f"""---
type: concept
topic: {topic}
created: {now()}
sources:
  - {concept.source}
---

# {concept.name}

## 定义
{concept.definition}

## 相关概念
{formatRelations(concept.relations)}

## Sources
- [[{concept.source}]]
"""
    writeFile(path, template)
    return path
}
```

---

## 7. Indexer — 索引更新

```
function updateIndex(topic: string, newPages: Page[]):
    index = read(f"3 Resources/{topic}/wiki/index.md")
    
    // 更新统计
    index.stats.concepts += newPages.count(type=concept)
    index.stats.entities  += newPages.count(type=entity)
    index.stats.updated = now()
    
    // 追加新页面链接
    for page in newPages:
        index.addLink(page)
    
    write(index)
```

---

## 8. Logger — 双写日志

```
function logCompile(topic: string, result: CompileResult):
    // 子库日志
    append(f"3 Resources/{topic}/wiki/log.md", formatEntry(result))
    
    // 全局日志
    append("AI-Log/compile-log.md", formatGlobalEntry(result))

function formatEntry(r: CompileResult): string {
    return f"""## {now()}
- 源文件: {r.files}
- 新概念: {r.newConcepts}
- 新实体: {r.newEntities}
- 更新: {r.updated}
- 耗时: {r.duration}
"""
}
```

---

## 9. 性能预算

| 阶段 | 10 文件 | 瓶颈 |
|------|:------:|------|
| Preflight | < 2s | I/O |
| Scanner | < 3s | I/O |
| Extractor | < 120s | LLM |
| Deduplicator | < 5s | 内存 |
| Writer | < 10s | I/O |
| Indexer | < 3s | I/O |
| Logger | < 2s | I/O |
| **总计** | **< 150s** | ✅ |

---

> 📎 关联: [[Skill 2-wiki-compile\|设计]] | [[SRS-wiki-compile-原型设计\|原型]] | [[SRS-wiki-compile-需求说明书\|需求]]
