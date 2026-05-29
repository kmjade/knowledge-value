---
created: 2026-05-27
type: compile-report
topic: productivity
status: completed
---

# Productivity Wiki 首次编译报告

**日期**: 2026-05-27
**子库**: productivity
**版本**: v1.0

---

## 编译摘要

首次编译 productivity Wiki 子库，从 103 个原始文件中提取了 8 个核心概念、4 个关键实体和 3 个来源页面。

### 关键指标

| 指标 | 值 |
|------|------|
| 扫描源文件 | 103 |
| 提取概念 | 8 |
| 提取实体 | 4 |
| 创建来源页 | 3 |
| 总产出文件 | 15 |
| 概念关系 | 7 组 |

---

## 编译详情

### 概念页 (8)

| 文件 | 核心要点 |
|------|----------|
| `PARA-Method.md` | Projects/Areas/Resources/Archives 四层框架 |
| `LLM-Wiki.md` | AI 编译器角色，raw→wiki 编译流程 |
| `GTD-Method.md` | 收集→理清→整理→回顾→执行 五步工作流 |
| `Zettelkasten-Method.md` | 原子化+链接+编号 卡片盒体系 |
| `OKR-Framework.md` | O+KR 目标管理，Google 十大原则 |
| `Second-Brain.md` | CODE 流程 + 渐进式摘要 |
| `Information-Lifecycle.md` | ephemeral/operational/reference/evergreen |
| `Semantic-Pollution.md` | 异构信息混合的检索质量危机 |

### 实体页 (4)

| 文件 | 类型 | 关键属性 |
|------|------|----------|
| `Obsidian.md` | 工具 | 本地 Markdown, 2000+ 插件, 双向链接 |
| `Claude-Code.md` | 工具 | AI Agent, Skills 系统, LLM-Wiki 编译引擎 |
| `Notion.md` | 工具 | 云端, 数据库, 协作, AI 功能 |
| `IOTO-Framework.md` | 框架 | Input→Organize→Track→Output 工作流 |

### 来源页 (3)

| 文件 | 来源 | 贡献概念 |
|------|------|----------|
| `source-LifeOS-Fusion.md` | 一只阿木木 2026-05-26 | LLM-Wiki, 三条公理, 完整架构 |
| `source-PARA-LLM-Wiki.md` | 一只阿木木 2026-05-24 | Semantic-Pollution, 范式转移 |
| `source-Claude-Code-Wiki.md` | 偶偶偶偶偶然 2026-05-26 | Claude Code + Skills 实践 |

---

## 概念关系网络

```
                    LLM-Wiki (核心)
                         │
        ┌────────────────┼────────────────┐
        │                │                │
   PARA-Method    Information-     Semantic-
                   Lifecycle       Pollution
        │
   ┌────┼────┐
   │    │    │
  GTD  ZK   OKR

Second-Brain ── 围绕以上所有
```

### 关系明细

| 关系 | 类型 |
|------|------|
| LLM-Wiki ↔ PARA-Method | 融合互补 |
| LLM-Wiki → Information-Lifecycle | 核心维度 |
| LLM-Wiki → Semantic-Pollution | 解决目标 |
| LLM-Wiki → Second-Brain | AI 增强 |
| PARA-Method ↔ GTD-Method | 互补（组织+执行） |
| PARA-Method ↔ Zettelkasten-Method | 互补（管理+创造） |
| PARA-Method ↔ OKR-Framework | 对接（项目→目标） |

---

## 源码分布

```
3 Resources/productivity/raw/articles/
├── IOTO/           17 文件
├── 飞书/           12 文件
├── Obsidian/       12 文件
├── OKR/            12 文件
├── Notion/         12 文件
├── Zettelkasten/   11 文件
├── PARA/           11 文件
├── GTD/            11 文件
└── 独立文章/        5 文件
```

---

## 后续计划

- [ ] 为 GTD 创建子概念页（收集/理清/整理/回顾/执行）
- [ ] 为 Zettelkasten 创建子概念页（原子笔记/链接/编号/写作）
- [ ] 为 PARA 创建子概念页（Projects/Areas/Resources/Archives）
- [ ] 添加 飞书 实体页
- [ ] 迭代更新概念间的链接关系

---

*报告生成: 2026-05-27*
