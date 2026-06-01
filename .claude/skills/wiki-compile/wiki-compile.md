# Wiki-Compile Skill - 知识编译引擎

将 `raw/` 目录下的原始资料编译成结构化的 Wiki 知识库。

## 使用方式

```
/wiki-compile [topic]              # 编译指定子库 (默认增量)
/wiki-compile [topic] --dry-run    # 仅预览提取结果，不写入 (CM-08)
/wiki-compile [topic] --incremental # 仅处理新增/未编译文件 (CM-06)
/wiki-compile [topic] --force       # 全量重编译所有源文件 (CM-07)
/wiki-compile --all                 # 编译所有活跃子库
```

### 子模式详解

#### `--dry-run` 预览模式 (CM-08)

仅执行扫描 + 提取阶段，输出预览结果，**不创建/修改任何 wiki/ 文件**。

```markdown
🔍 Compile Dry-Run — [topic]

📂 扫描: raw/articles (N) + raw/papers (M) + raw/books (K)
📋 待编译: X 文件 (Y 未编译 + Z 已修改)

🔮 预期产出:
- 新概念: N → wiki/concepts/*.md
- 新实体: M → wiki/entities/*.md
- 更新页面: K (源文件已修改)
- 新来源: S → wiki/sources/*.md

💡 执行 /wiki-compile [topic] 以开始编译。
```

#### `--incremental` 增量编译 (CM-06) — 默认模式

仅处理 **未编译** 或 **源文件已修改** 的文件。

**判定逻辑**:
1. 扫描 raw/ 目录，读取每个源文件的 Frontmatter
2. 跳过 `compiled: true` 且源文件修改时间 ≤ 编译时间的文件
3. 处理 `compiled: false` 或缺失编译标记的文件
4. 处理源文件修改时间 > 编译时间的文件 (重新编译)

```markdown
🔨 Incremental Compile — [topic]

⏭️ 跳过: X 文件 (已编译且未修改)
📋 处理: Y 文件
├── 🆕 新编译: A
└── 🔄 重编译: B (源文件已更新)
```

#### `--force` 全量重编译 (CM-07)

忽略所有编译标记，**重新处理所有 raw/ 源文件**。

⚠️ **使用前确认**:
```
⚠️ --force 模式将重新编译所有 N 个源文件
   现有 wiki/ 页面将被覆盖。
   继续? (yes/no)
```

```markdown
🔨 Force Compile — [topic]

📋 全量重编译: N 源文件 → M wiki 页面
├── concepts: A
├── entities: B
└── sources: C

⚠️ 已覆盖: K 个现有页面
🆕 新增: L 个页面
```

## 核心理念

> AI 是"编译器"，不是对话伙伴。它的职责是将原始信息转换为结构化知识。

## 执行流程

### 0. 编译前检查 (Preflight)

每次编译前必须执行：

```
1. 读取 3 Resources/[topic]/CLAUDE.md    → 子库 schema + 概念域
2. 读取 3 Resources/[topic]/wiki/index.md → 现有知识结构 + 统计
3. 读取 3 Resources/[topic]/wiki/log.md   → 最近 10 条编译历史
4. 检查 wiki/ 目录结构                     → 缺失则 mkdir -p

if !schema:  warn("无 CLAUDE.md，使用默认规则")
if !index:   warn("无 index.md，将创建")
```

### 1. 扫描阶段 (Scanner)

扫描指定 Wiki 子库的 `raw/` 目录：

```
3 Resources/[topic]/raw/
├── articles/      # 文章摘录
├── papers/        # 论文笔记
├── books/         # 书籍笔记
└── conversations/ # 对话记录
```

**增量模式判定**:
```
for each file in raw/:
    fm = parseFrontmatter(file)
    
    if mode == INCREMENTAL:
        if fm.compiled == true AND file.mtime <= fm.compiled_at:
            continue  // 跳过
    if mode == FORCE:
        // 不跳过任何文件
    
    files.append(file)
```

识别未编译的文件（没有 `compiled: true` frontmatter）。

### 2. 提取阶段 (Extractor)

对每个原始文件执行三层提取：

#### 概念提取

从源文件识别核心概念，优先级:
1. **标题匹配**: `## 定义` / `### 概念` 标题下的首段
2. **术语密度**: 高频专业术语 (≥3 次出现)
3. **命名规范**: PascalCase 命名 (如 `LLM-Pricing-Model`)

#### 实体提取

正则模式自动匹配 5 种实体类型:

#### 关系提取 (FR-023)

从源文件中识别并文档化概念和实体之间的语义关系。

##### 关系类型本体

**概念 → 概念** (C→C):

| 关系 | 含义 | 标记 | 示例 |
|------|------|:----:|------|
| `is-a` | 子类型/继承 | 🅰️→🅱️ | RAG `is-a` [[Information-Retrieval]] |
| `part-of` | 组成部分 | 🧩→🏛️ | [[Tokenization]] `part-of` [[LLM-Pipeline]] |
| `related` | 语义关联 | 🔗 | [[PKM]] `related` [[Zettelkasten-Method]] |
| `precedes` | 前置依赖 | ⬅️ | [[Classification]] `precedes` [[Thesaurus]] |

**概念 → 实体** (C→E):

| 关系 | 含义 | 标记 | 示例 |
|------|------|:----:|------|
| `implements` | 实体实现了概念 | ⚙️→💡 | [[Obsidian]] `implements` [[PKM]] |
| `uses` | 概念使用实体 | 💡→⚙️ | [[RAG]] `uses` [[Vector-Database]] |
| `exemplifies` | 实体例证概念 | 📦→💡 | [[DDC]] `exemplifies` [[Classification-Systems]] |

**实体 → 实体** (E→E):

| 关系 | 含义 | 标记 | 示例 |
|------|------|:----:|------|
| `created` | 创建者关系 | 👤→📦 | [[Paul-Otlet]] `created` [[UDC]] |
| `collaborates` | 协作关系 | 👤↔👤 | [[Tim-Berners-Lee]] `collaborates` [[W3C]] |
| `competes` | 竞争/替代 | ⚔️ | [[Notion]] `competes` [[Obsidian]] |
| `evolved-from` | 演化来源 | 🥚→🐔 | [[DDC]] `evolved-from` [[Decimal-Classification]] |

##### 关系发现启发式

从源文本中识别关系的关键信号：

| 信号模式 | 推断关系 | 置信度 |
|----------|----------|:------:|
| "X 是一种 Y"、"X 属于 Y 类别" | `is-a` | 高 |
| "X 包含 Y"、"X 由 Y 组成" | `part-of` | 高 |
| "X 使用 Y"、"X 基于 Y 技术" | `uses` | 高 |
| "X 创建了 Y"、"X 发明了 Y" | `created` | 高 |
| "X 与 Y 相关"、"X 和 Y 共同" | `related` | 中 |
| "X 替代了 Y"、"X vs Y" | `competes` | 中 |
| 同一段落中多次共现 | `related` | 低→中 |

##### 关系信号正则表 (EX-03)

编译时自动匹配以下模式，提取关系:

```
C→C 概念关系:
  is-a:     /(是一种|属于|是.*类型|继承自|为.*子类)/
  part-of:  /(组成|包含|由.*构成|是.*部分|隶属于)/
  related:  /(相关|关联|参见|参考|涉及|联系)/
  precedes: /(先于|前置|依赖|需要.*先|基于.*之上)/

C→E 概念→实体:
  implements: /(实现|开发|搭建|构建|提供|支持)/
  uses:       /(使用|采用|利用|借助|基于|调用)/
  exemplifies: /(例如|比如|典型|代表|实例|体现)/

E→E 实体关系:
  created:     /(创建|发明|提出|开发|发布|推出)/
  collaborates: /(合作|协作|联合|共同|携手)/
  competes:    /(vs\.?|对比|替代|竞争|对手|挑战)/
  evolved-from: /(源自|演化|前身|继承|基于.*改进)/
```

##### 关系文档化规则

1. **双向链接**: 在 A 页面写 `[[B]]`，同时在 B 页面写 `[[A]]`
2. **标注关系**: 链接后标注关系类型 `[[B]] — is-a`
3. **最少 2 条/页**: 每个 wiki 页面必须有 ≥ 2 个交叉链接
4. **来源追溯**: 关系推断的来源标注在 `## Sources`
5. **置信度标记**: 低置信度的关系标记为 `(推断)`

### 3. 编译阶段
在 `wiki/` 目录下创建/更新页面：

```
wiki/
├── index.md       # 更新知识索引
├── log.md         # 记录编译日志
├── concepts/      # 概念页面
│   └── [concept-name].md
├── entities/      # 实体页面
│   └── [entity-name].md
└── sources/       # 来源溯源
    └── [source-name].md
```

### 4. 索引更新
更新 `wiki/index.md`:
- 概念统计
- 实体统计
- 最近更新列表
- 概念分类索引

### 5. 日志记录 ⚠️ 强制 (FR-026)

**每次编译操作必须同时更新两层日志**：

#### A. 子库级日志 `wiki/log.md`

追加条目到 `3 Resources/[topic]/wiki/log.md`：

```markdown
## YYYY-MM-DD — [操作类型]

### 編譯資訊
- **源庫**: `3 Resources/[topic]/`
- **源文件**: N 個 (articles: X, papers: Y, books: Z, conversations: W)
- **新概念**: N
- **新實體**: N
- **新來源頁**: N
- **更新頁面**: N
- **方法**: 全量 / 增量
- **耗時**: Xs

### 概念產出
| # | 概念 | 源文件 |
|---|------|--------|
| 1 | [[wiki/concepts/Name]] | raw/... |

### 實體產出
| # | 實體 | 類型 |
|---|------|------|
| 1 | [[wiki/entities/Name]] | person/tool/... |

### 品質校驗
- [ ] 所有概念頁包含 `## Sources`
- [ ] 所有實體頁包含 `## Sources`
- [ ] 概念間交叉鏈接已建立
- [ ] wiki/index.md 已更新
```

- 若 `wiki/log.md` 不存在 → 先創建並寫入 frontmatter (`type: log, topic: [topic]`)
- 若首次編譯 → 在條目上方創建 `## YYYY-MM-DD — 首次編譯` 章節

#### B. 全局編譯日誌 `AI-Log/compile-log.md`

追加**精簡摘要**到全局日誌：

```markdown
---

**狀態**: success/failed/partial

**子庫**: [topic] (`3 Resources/[topic]/`)

**源文件** (N):
- `raw/articles/...`
- ...

**概念提取** (N):
- Concept-Name — 描述
- ...

**實體提取** (N):
- Entity-Name — 類型
- ...

**產出** (N 文件):
- `wiki/concepts/` — 創建 X 頁面
- `wiki/entities/` — 創建 Y 頁面
- `wiki/sources/` — 創建 Z 頁面
- `wiki/index.md` — 更新統計
- `wiki/log.md` — 添加編譯記錄

**耗時**: Xs
```

#### 日誌規則
1. **雙寫強制** — 子庫級 + 全局 必須同時更新
2. **原子寫入** — 先寫子庫日誌，再寫全局日誌
3. **來源追溯** — 日誌中的每個頁面必須可追溯到 raw/ 源文件
4. **時間戳** — 使用 ISO 8601 格式 (`YYYY-MM-DDTHH:MM:SS`)

## 编译规则

### 规则 1: raw/ 只读
AI 永远不修改 `raw/` 目录下的文件。
- 原始资料是人类维护的
- AI 只读取和编译

### 规则 2: wiki/ AI 独占
`wiki/` 目录完全由 AI 维护。
- 人类不应直接编辑 wiki/ 下的文件
- 所有更新通过重新编译完成

### 规则 3: Sources 必须标注
每个 wiki 页面必须包含 `Sources` 部分：
```markdown
## Sources
- [[raw/articles/article-name.md]]
- [[raw/papers/paper-name.md]]
```

### 规则 4: 去重合并 (FR-028)

**核心原则**: 一个概念 = 一个页面。多源信息合并而非创建重复。

#### 去重判定流程

```
扫描新概念 → 检查是否已有同名/相似页面
  ├── 完全匹配 (同名) → 合并信息到现有页面，追加 Sources
  ├── 别名匹配 (aliases) → 合并，补充别名
  ├── 高相似 (>80% 关键词重叠) → 合并，标注多来源
  └── 新概念 → 创建新页面
```

#### 合并策略

当发现重复/相似概念时：

1. **保留主页面** — 保留内容最完整的页面作为主页面
2. **追加来源** — 将新来源添加到 `sources` 数组
3. **合并别名** — 将新发现的中英文名称加入 `aliases`
4. **标注多来源** — 在 `## Sources` 中列出所有来源文件
5. **创建重定向** (可选) — 如发现旧版命名 → 创建 `[[old-name]]` 重定向到主页面

```markdown
## Sources
- [[raw/articles/llm-pricing-2026.md]] ← 首次编译
- [[raw/articles/api-comparison-may.md]] ← 合并: 2026-05-31
```

#### 关键词重叠去重 (DD-03)

当概念名称不完全匹配但内容高度相似时，计算 Jaccard 相似度:

```
Jaccard(A, B) = |A.keywords ∩ B.keywords| / |A.keywords ∪ B.keywords|

if Jaccard > 0.8:
    MERGE  // "LLM-Pricing" 与 "LLM-Pricing-Model" → 合并
if Jaccard 0.5-0.8:
    REVIEW // 标记需人工判断
if Jaccard < 0.5:
    CREATE_NEW
```

#### 跨库去重 (DD-04)

编译前扫描其他 DDC 子库的 `wiki/concepts/` 目录:

```
function checkCrossLibrary(concept: Concept): Action {
    for ddc in ["000", "100", "200", ..., "900"]:
        if conceptMatches(ddc.wiki.concepts, concept.name):
            return CROSS_REFERENCE  // 不创建，添加 [[]] 引用
    return CREATE_NEW
}
```

特殊处理: 跨库概念放在概念最核心的 DDC 子库，其他子库通过 `[[]]` 引用。

#### 清理检查

编译完成后检查：
- [ ] 同一概念无重复页面
- [ ] 所有 Sources 指向有效的 raw/ 文件
- [ ] 跨库概念链接正确
- [ ] 无孤立重定向页

### 规则 5: 链接优先
使用 `[[]]` 建立知识连接：
- 概念之间的链接
- 实体之间的链接
- 概念与实体的链接
- 指向原始资料的链接

## 页面模板

### 概念页面
```markdown
---
aliases:
  - [别名1]
  - [别名2]
created: YYYY-MM-DD
type: concept
topic: [topic]
confidence: high | medium | low    ← EX-04: 置信度标注
---

# [概念名称]

## 定义
[一句话定义，来自哪个来源]

## 核心原理
[详细解释]

## 关键要点
1. [要点1]
2. [要点2]

## 相关概念
- [[concept-1]] — `is-a` [子类型描述]
- [[concept-2]] — `part-of` [组成部分]
- [[concept-3]] — `related` [关联描述]

## 相关实体
- [[entity-1]] — `implements` [工具/产品实现]
- [[entity-2]] — `created` [创建者]

## 实践应用
[具体案例]

## Sources
- [[raw/path/to/source.md]]

## Sources
- [[raw/path/to/source.md]]
```

### 实体页面
```markdown
---
aliases:
  - [别名]
created: YYYY-MM-DD
type: entity
entity_type: tool/person/company/paper
topic: [topic]
---

# [实体名称]

## 基本信息
- 类型: [类型]
- 创建时间: [时间]
- 状态: active/archived

## 描述
[详细描述]

## 核心特征
- [特征1]
- [特征2]

## 相关概念
- [[concept-1]] — `exemplifies` [该实体体现了什么概念]
- [[concept-2]] — `related`

## 相关实体
- [[entity-1]] — `collaborates` [协作关系]
- [[entity-2]] — `competes` [竞争关系]

## Sources
- [[raw/path/to/source.md]]
```

## 示例输出

```
🔨 Wiki Compile Report - ai-ml

📂 扫描目录: 3 Resources/ai-ml/raw/
- articles: 5 文件 (2 未编译)
- papers: 3 文件 (1 未编译)
- books: 2 文件 (0 未编译)
- conversations: 8 文件 (5 未编译)

🔍 提取结果:
- 新概念: 8
  - RAG (Retrieval-Augmented Generation)
  - Context Window
  - Tokenization
  - ...
- 新实体: 3
  - Claude 3.5 Sonnet
  - GPT-4o
  - Llama 3

📝 编译完成:
- 创建页面: 11
- 更新页面: 5
- 更新索引: ✓
- 记录日志: ✓

⏱️ 耗时: 45s
✅ 状态: 成功
```

## 子库 Schema 参考

每个子库有自己的 `CLAUDE.md` 定义：
- [[../../3 Resources/ai-ml/CLAUDE.md|ai-ml schema]]
- [[../../3 Resources/people/CLAUDE.md|people schema]]
- [[../../3 Resources/finance/CLAUDE.md|finance schema]]
- [[../../3 Resources/productivity/CLAUDE.md|productivity schema]]

## 注意事项

1. **保持原子性**: 每个概念页面只描述一个概念
2. **避免冗余**: 相同信息只记录一次，其他地方用链接
3. **保持溯源**: 所有信息必须有来源标注
4. **定期回顾**: 定期检查 wiki/ 的质量和完整性

