---
aliases:
  - Wiki-Compile 使用指南
  - 编译指南
created: 2026-05-31
type: guide
topic: wiki-compile
parent: "[[PARA+LLM-Wiki 融合系统]]"
tags:
  - skill
  - wiki-compile
  - guide
---

# /wiki-compile 使用指南

> AI 知识编译引擎 — raw/ → wiki/ 结构化知识生成

---

## 快速开始

```bash
/wiki-compile [topic]              # 编译指定子库 (默认增量)
/wiki-compile [topic] --dry-run    # 仅预览，不写入
/wiki-compile [topic] --incremental # 仅处理新增/修改
/wiki-compile [topic] --force       # 全量重编译 (⚠️确认)
```

---

## 使用场景

| 场景 | 命令 | 说明 |
|------|------|------|
| 常规编译 | `/wiki-compile ai-ml` | 只处理未编译源文件 |
| 首次编译 | `/wiki-compile 400 language --incremental` | 全量扫描 |
| 预览计划 | `/wiki-compile 000 knowledge --dry-run` | 先看产出 |
| 内容更新 | `/wiki-compile ai-ml --force` | 源文件已修改 |

---

## 编译产出

| 产物 | 路径 | 说明 |
|------|------|------|
| 概念页 | `wiki/concepts/[name].md` | PascalCase 命名 |
| 实体页 | `wiki/entities/[name].md` | 中文+英文 |
| 来源页 | `wiki/sources/[name].md` | 溯源记录 |
| 索引 | `wiki/index.md` | 知识地图 |
| 日志 | `wiki/log.md` + `AI-Log/compile-log.md` | 双写 |

---

## 关系提取

编译时自动识别 8 种关系：

| 关系 | 示例 |
|------|------|
| `is-a` | RAG `is-a` Information-Retrieval |
| `part-of` | Tokenization `part-of` LLM-Pipeline |
| `uses` | RAG `uses` Vector-Database |
| `created` | Paul-Otlet `created` UDC |

---

## 可用子库

| DDC | 子库 | 命令 |
|:---:|------|------|
| 000 | Knowledge | `/wiki-compile 000 knowledge` |
| 100 | Philosophy | `/wiki-compile 100 philosophy` |
| 400 | Language | `/wiki-compile 400 language` |
| 600 | Applied Sciences | `/wiki-compile 600 applied-sciences` |

---

## 工作流建议

```
/triage                    ← 先分拣新资料
/wiki-compile [topic]      ← 编译知识库
/lint --quick              ← 检查合规
```

---

> 📎 关联: [[03-Skills 完整设计\|设计文档]] | [[开发工作清单\|Phase 2: 100%]]
