---
aliases:
  - Skill-wiki-compile
  - 知识编译引擎
created: 2026-05-31
type: design
topic: wiki-compile
parent: "[[03-Skills 完整设计]]"
tags:
  - design
  - wiki-compile
  - skill
---

# Skill: `/wiki-compile` — 知识编译引擎

> 从 [[03-Skills 完整设计]] 提取

**文件路径**: `.claude/skills/wiki-compile/wiki-compile.md`

---

## 使用方式

```
/wiki-compile [topic]              # 编译指定子库
/wiki-compile [topic] --dry-run    # 仅预览，不执行
/wiki-compile [topic] --incremental # 仅处理新增/修改
/wiki-compile [topic] --force       # 全量重编译
```

## 核心理念

> AI 是"编译器"，不是对话伙伴。它的职责是将原始信息转换为结构化知识。

## 触发方式

- 手动: `/wiki-compile [topic]`
- 自动: `/triage` 结束后，如有新 reference 材料进入 raw/

---

## 编译前检查

1. 读取 `3 Resources/[topic]/CLAUDE.md`（子库 schema）
2. 读取 `3 Resources/[topic]/wiki/index.md`（现有知识结构）
3. 读取 `3 Resources/[topic]/wiki/log.md` 末尾 10 条（最近编译历史）
4. 扫描 raw/ 目录，找出 `compiled: false` 或无 compiled 字段的文件

---

## 编译流程

### Phase A: 来源分析

| 提取项 | 说明 |
|--------|------|
| 核心主张 | 3-5 条 |
| 概念实体 | 名词识别 |
| 人物/工具/机构 | 命名实体 |
| 潜在关联 | 与已有 Wiki 页面的关系 |
| 可信度 | 学术/媒体/个人/未知 |

### Phase B: 页面创建/更新

**概念页模板** (`wiki/concepts/[concept].md`):

```yaml
---
type: concept
created: YYYY-MM-DD
topic: [topic]
confidence: [high|medium|low]
sources:
  - ../raw/articles/xxx.md
---
```

```markdown
# [概念名称]

## 核心定义
[1-2 句精确定义]

## 关键要素
[要点列表]

## 相关概念
- [[concept]] — [关系描述]

## Sources
- [[raw/path/source.md]]
```

**实体页模板** (`wiki/entities/[entity].md`):

```yaml
---
type: entity
entity_type: [person|tool|organization|paper]
created: YYYY-MM-DD
topic: [topic]
sources: []
---
```

```markdown
# [实体名称]

## 基本信息
[关键事实]

## 关联
- [[concept]] — [关系]

## Sources
- [[raw/path/source.md]]
```

### Phase C: 交叉引用更新

1. 扫描新增/修改页面中的 `[[wikilink]]`
2. 对引用目标追加反向引用
3. 不存在的目标 → 加入 wiki/index.md「待创建页面」

### Phase D: 索引更新

更新 `wiki/index.md`: 概念统计、实体统计、最近更新、待创建列表、知识空白

### Phase E: 原始文件标记

```yaml
compiled: true
compiled_at: YYYY-MM-DD
compiled_to:
  - wiki/concepts/xxx.md
  - wiki/entities/yyy.md
```

### Phase F: 日志写入

追加到 `wiki/log.md` + `AI-Log/compile-log.md`

---

## 子模式

| 标志 | 功能 |
|------|------|
| `--dry-run` | 仅预览提取结果，不写入 |
| `--incremental` | 仅处理新增/修改 (默认) |
| `--force` | 全量重编译 (⚠️ 确认) |

## 成本控制

| 模式 | 说明 |
|------|------|
| 单文件编译 (默认) | 每次 1 个 raw 文件 |
| 批量编译 | `--batch 5` |
| 仅索引 | `--index-only` |

---

## 关系提取 (8 类型)

| 关系 | 示例 |
|------|------|
| `is-a` | RAG `is-a` IR |
| `part-of` | Token `part-of` Pipeline |
| `uses` | RAG `uses` Vector-DB |
| `created` | Author `created` Tool |

---

## 去重策略

1. 检查概念是否已存在 (同名/别名/关键词)
2. 已存在 → 合并信息 + 追加 Sources
3. 新概念 → 创建新页面
4. 跨库概念 → 主 DDC 存放，其他 `[[]]` 引用

---

> 📎 关联:
> - [[wiki-compile-使用指南\|使用指南]]
> - [[../../.claude/skills/wiki-compile/wiki-compile.md\|Skill 实现]]
> - [[开发工作清单\|Phase 2: 100%]]
