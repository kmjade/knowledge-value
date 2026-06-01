---
aliases: [Wiki-Compile Prototype, 编译原型]
created: 2026-05-31
type: prototype
topic: wiki-compile
parent: "[[SRS-wiki-compile-需求说明书]]"
tags: [prototype, wiki-compile, ux]
---

# /wiki-compile 原型设计

> 基于 [[SRS-wiki-compile-需求说明书]] 的交互原型

---

## 1. 用户流程

```
/wiki-compile [topic]
        │
        ├──[--dry-run]──► 预览流程 (只分析不写入)
        ├──[--incremental]──► 增量编译 (默认)
        └──[--force]──► 全量重编译 (⚠️确认)
```

---

## 2. 主流程原型

### 阶段 1: 前检查

```
/wiki-compile ai-ml
```

```
🔍 编译前检查 — ai-ml

📖 Schema: 3 Resources/ai-ml/CLAUDE.md ✅
📊 现有知识: 3 concepts + 6 entities
📜 最近编译: 2026-05-27 (3 文件, 13 页面)

✅ 检查通过，开始扫描...
```

### 阶段 2: 扫描

```
📂 扫描 raw/ — ai-ml

  articles/      ██████ 3 文件 (2 未编译)
  papers/        ░░░░░░ 0
  books/         ░░░░░░ 0
  conversations/ ██░░░░ 1 文件 (1 未编译)

📋 待编译: 3 文件
```

### 阶段 3: 分析预览

```
🧠 分析中...

file-1.md ████████████ 3 概念 + 2 实体
file-2.md ██████░░░░░░ 1 概念 (已存在, 将合并)
file-3.md ████████████ 2 概念 + 1 实体 + 1 来源

🔮 预期产出:
  🆕 新概念: 4
  📝 更新概念: 1 (合并)
  🆕 新实体: 3
  📄 新来源: 1
  📊 索引更新: ✅

⏱️ 预估: ~2 分钟
```

### 阶段 4: 编译执行

```
🔨 编译中...

[████░░░░░░░░░░░░░░░░] file-1.md — 提取概念...
[████████░░░░░░░░░░░░] file-1.md — 生成页面...
[████████████░░░░░░░░] file-2.md — 合并到已有概念...
[████████████████░░░░] file-3.md — 提取实体...
[████████████████████] 更新索引 + 写入日志...

✅ 编译完成 — 2026-05-31 15:00
```

### 阶段 5: 结果

```
✅ Wiki-Compile — ai-ml

📊 摘要:
  📂 源文件:    3
  🆕 新概念:    4  → wiki/concepts/
  📝 更新概念:   1  (合并多来源)
  🆕 新实体:    3  → wiki/entities/
  📄 新来源:    1  → wiki/sources/
  🔗 交叉链接:  12 个新 wikilinks

📊 索引: wiki/index.md 已更新
📝 日志: wiki/log.md + AI-Log/compile-log.md

⏱️ 耗时: 1m 45s
✅ 状态: success

💡 下一步:
  /context --quick     ← 查看更新后状态
  /lint ai-ml          ← 检查新页面合规
```

---

## 3. 子模式原型

### 3.1 `--dry-run`

```
/wiki-compile ai-ml --dry-run
```

```
🔍 Compile Dry-Run — ai-ml

📂 扫描: 3 源文件 (2 未编译 + 0 已修改)
🔮 预期产出:
  🆕 新概念: 4
  📝 更新概念: 1
  🆕 新实体: 3

⚠️ 预览模式 — 未创建任何文件
💡 执行 /wiki-compile ai-ml 开始编译
```

### 3.2 `--incremental` (默认)

```
/wiki-compile ai-ml --incremental
```

```
🔨 Incremental Compile — ai-ml

⏭️ 跳过: 5 文件 (已编译且未修改)
📋 处理: 2 文件
├── 🆕 新编译: 1
└── 🔄 重编译: 1 (源文件已更新)

✅ 完成 (2/7)
```

### 3.3 `--force`

```
/wiki-compile ai-ml --force
```

```
⚠️ --force 模式将重新编译所有 7 个源文件
   现有 wiki/ 页面将被覆盖。
   继续? (yes/no)
> yes

🔨 Force Compile — ai-ml
📋 全量: 7 源 → 13 wiki 页面
⚠️ 覆盖: 8 | 🆕 新增: 5
✅ 完成
```

---

## 4. 特殊场景

### 4.1 无待编译文件

```
/wiki-compile ai-ml
```

```
📂 ai-ml — 所有源文件已编译 ✨

5/5 文件已编译
最后编译: 2026-05-31 14:00

💡 使用 --force 强制重编译
```

### 4.2 概念合并

```
⚠️ 概念冲突: "LLM-Pricing"

来源 A: raw/a.md → LLM-Pricing-Model (5月数据)
来源 B: raw/b.md → LLM-Pricing-Model (6月数据)

操作: 合并到 LLM-Pricing-Model.md
  ✅ 追加来源 B 到 Sources
  ✅ 更新定价数据
  ✅ 标注合并时间
```

### 4.3 跨库概念

```
🔗 跨库概念: "PARA-Method"

已存在于: 000 Knowledge/wiki/concepts/
当前子库: productivity

操作: 不创建重复页面
  → 在当前 wiki/index.md 添加跨库引用
  → [[000 Knowledge/wiki/concepts/PARA-Method]]
```

---

## 5. 状态转换

```
raw/ 文件生命周期:

  [未编译] ──/wiki-compile──► [已编译: compiled=true]
                                    │
                          ┌─────────┼─────────┐
                          ▼         ▼         ▼
                      concepts   entities   sources
                          │         │         │
                          └─────────┴────┬────┘
                                         ▼
                                  [wiki/index.md]
```

---

> 📎 关联: [[SRS-wiki-compile-需求说明书\|需求]] | [[../设计文档/Skill 2-wiki-compile\|设计]] | [[wiki-compile-使用指南\|使用指南]]
