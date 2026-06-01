# Skill: /triage — Inbox 智能分拣引擎

> v2.0 | 基于 [[Skill 1-triage-详细设计]]

将 `0 Inbox/` 中的未分类信息自动分析、分类并路由到正确的 PARA 目标位置。

## 使用方式

```
/triage                    # 完整扫描 0 Inbox/ 所有文件
/triage --dry-run          # 仅预览分析结果，不移动
/triage --file "name.md"   # 处理单个文件
/triage --scope clippings  # 仅扫描 Clippings/ 子目录
/triage --scope fleeting   # 仅扫描 fleeting/ 子目录
/triage --scope tasks      # 仅扫描 tasks/ 子目录
```

---

## 执行流程

### Step 1: 扫描 Inbox

遍历 `0 Inbox/` 下指定范围的 `.md` 文件，排除已处理文件。

**排除规则**:
- ❌ 路径含 `_processed/` — 已归档
- ❌ Frontmatter `triaged: true` — 已分拣
- ❌ 非 `.md` 文件 — 不支持格式
- ⚠️ 文件 < 10 bytes — 空文件警告 + 跳过

**子目录映射** (`--scope`):
| scope | 扫描路径 |
|-------|----------|
| `all` (默认) | `.` `Clippings/` `1-输入/` `3-任务/` `5 Zettels/💡 fleeting/` |
| `clippings` | `Clippings/` |
| `fleeting` | `5 Zettels/💡 fleeting/` |
| `tasks` | `3-任务/` |

输出: 已排序的文件列表（按修改时间）。

---

### Step 2: 内容分析

对每个文件执行四维分析，输出分类结果 + 置信度。

#### 2a. 时效性分类 — 加权评分

根据关键词权重、日期信号、长度因子计算四个维度的得分，选最高分分类。

| 分类 | 关键信号 | 典型示例 |
|------|----------|----------|
| **ephemeral** | 时间紧迫词(明天/今天/截止) + 动作动词(买/交/提醒) + 日期模式 + 短文本 | "明天买灯泡" "周五前交报告" |
| **operational** | 项目术语(项目/任务/会议) + 日期但不紧迫 + 中等长度 | 会议记录、工作笔记 |
| **reference** | URL + `source:` + 作者 + 长文本 > 1000字 | 文章摘录、论文笔记 |
| **evergreen** | 定义/原理/概念/方法/框架 + 术语密度高 + 无日期 | 知识条目、方法论 |

**置信度**: 最高分 / 总分。低于 60% → 标记 `needs-review`。

#### 2b. 主题识别 — 动态加载 CLAUDE.md

**算法**: 从各子库 `CLAUDE.md` 动态提取主题关键词，加权匹配。

**加载流程**:

```
1. 扫描 3 Resources/*/CLAUDE.md
2. 从每个 CLAUDE.md 提取:
   - Frontmatter: topic 值
   - 概念域章节: 核心概念名称 + 别名
   - 实体域章节: 实体名称
3. 构建关键词→topic 映射表
4. 对目标文件: 文本匹配 → 加权 → 选最高分 topic
```

**关键来源** (每个 CLAUDE.md):
| 来源 | 示例 | 权重 |
|------|------|:----:|
| Frontmatter `topic:` | `knowledge-systems` | ×3 |
| `## 核心概念域` 章节 | 概念名 + 别名列表 | ×5 |
| `## 概念清單` 表格 | 表格中每行概念名 | ×5 |
| `## 實體清單` 表格 | 工具/系统/人物名 | ×3 |
| 章节目录名 (DDC) | `510-Mathematics` | ×2 |

**匹配逻辑**:

```
对于目标文件内容:
  for each topic in topic_map:
    score = 0
    for each keyword in topic.keywords:
      if keyword appears in file.content:
        score += keyword.weight
    
  best_topic = max(topic_scores)
  confidence = max_score / sum(all_scores)
  
  if confidence < 0.6:
    route → "0 Inbox/_review/"
    reason = "主题不明确"
  else:
    route → f"3 Resources/{best_topic}/raw/"
```

**14 个已知子库** (从 CLAUDE.md 加载):

| topic | 子库 | 关键词来源 |
|-------|------|-----------|
| `knowledge-systems` | DDC 000 | KOS/DDC/PKM/RAG/SECI/DIKW... |
| `philosophy-psychology` | DDC 100 | 哲学/认识论/心理学/CBT/形而上学... |
| `epistemology` | DDC 120 | 三层模型/范式/可证伪性/科学革命... |
| `religion-theology` | DDC 200 | 神学/宗教哲学/圣经/释经... |
| `social-sciences` | DDC 300 | 经济/投资/MQL/金融/社会... |
| `language` | DDC 400 | 语言学/语法/语音/汉藏/印欧... |
| `natural-sciences` | DDC 500 | 数学/物理/化学/天文/生物... |
| `applied-sciences` | DDC 600 | 医学/工程/制造/化工/中医学... |
| `arts` | DDC 700 | 绘画/雕塑/建筑/音乐/设计... |
| `literature` | DDC 800 | 文学/诗歌/小说/批评/古典... |
| `history-geography` | DDC 900 | 历史/地理/文明/世界史... |
| `ai-ml` | AI/ML | GPT/LLM/token/model/API... |
| `people` | People | 人物/联系人/CRM... |
| `generative-art` | Gen Art | p5.js/算法/生成艺术/flow-field... |

**首次加载缓存**: 结果缓存到内存，会话期间复用。

#### 2c. 人物识别

检测文件中是否包含人物信息:
- 手机号模式: `1[3-9]\d{9}`
- 邮箱模式: `\S+@\S+\.\S+`
- 元标记: `姓名:` `联系人:` `电话:` `微信:` `公司:`

命中 ≥ 2 个字段 → 标记为人物信息，路由到 `0 Inbox/people/raw/`

#### 2d. 双重属性检测

如果文件同时满足:
- 任务属性 (ephemeral/operational 得分 > 0)
- 知识属性 (reference/evergreen 得分 > 0)

则拆分为两部分处理:
- 任务部分 → `1 Projects/{proj}/tasks.md` 追加
- 知识部分 → `3 Resources/{topic}/raw/articles/` 复制
- 两部分互相添加 `[[wikilink]]` 引用

---

### Step 3: 路由决策

| 分类 | 目标路径 | 操作 | 格式 |
|------|----------|------|------|
| **ephemeral** | `1 Projects/{proj}/tasks.md` | 追加行 | `- [ ] {title} 📅 {date}` |
| **operational** | `1 Projects/{proj}/` | 移动文件 | 保持原名 |
| **reference** | `3 Resources/{topic}/raw/articles/` | 复制+标记 | 保持原名 |
| **evergreen** | `3 Resources/{topic}/wiki/` | 队列编译 | 提示 `/wiki-compile` |
| **人物信息** | `0 Inbox/people/raw/` | 提取+创建 | `{name}.md` |
| **低置信度** | `0 Inbox/_review/` | 移动+标记 | `status: needs-review` |

**项目匹配优先级**:
1. 文件中显式 `[[wikilink]]` 指向某项目
2. 关键词匹配活跃项目 `CLAUDE.md`
3. 默认: 放到 `2 Areas/` 领域层

---

### Step 4: 写入目标 + 更新元数据

**事务性写入**:

```
1. 复制源文件到目标路径
2. 更新目标文件 Frontmatter (triaged 标记)
3. 更新源文件 Frontmatter
4. 移动源文件到 0 Inbox/_processed/
5. 记录到 AI-Log/triage-log.md

任一步骤失败 → 回滚已执行步骤
```

**Frontmatter 模板**:
```yaml
triaged: true
triaged_at: 2026-05-31T14:30:00+08:00
triaged_to: 3 Resources/ai-ml/raw/articles/
triaged_from: 0 Inbox/Clippings/article.md
```

**安全校验 (写入前)**:
- 目标目录存在? → 否: 自动 `mkdir -p`
- 目标已有同名文件? → 追加 `_1` 后缀
- ⛔ 目标在 `raw/` 目录? → **阻断** (AI 只读区)

---

### Step 5: 生成报告

追加到 `AI-Log/triage-log.md`:

```markdown
## 2026-05-31 14:30

| 指标 | 数值 |
|------|:----:|
| 处理文件 | 12 |
| ephemeral | 3 |
| operational | 0 |
| reference | 6 |
| 需确认 | 2 |
| 人物 | 1 |
| 耗时 | 45s |
| 状态 | success |

### 路由详情
- `file-1.md` → `1 Projects/Personal/tasks.md`
- `file-2.md` → `3 Resources/ai-ml/raw/articles/`
```

---

### Step 6: 提示用户

输出分拣摘要:

```
✅ 分拣完成 — 2026-05-31 14:30

📊 摘要:
  🏃 ephemeral:    3 → tasks.md
  📚 reference:    6 → raw/
  ⚠️ 需确认:       2 → _review/
  👤 人物:         1 → people/

⏱️ 耗时: 45s

💡 下一步:
  /wiki-compile ai-ml       ← 3 新资料待编译
  /wiki-compile productivity ← 2 新资料待编译
```

---

## 子模式

### `--dry-run` 预览模式

仅执行 Step 1-3 (扫描+分析+路由决策)，**不执行任何文件操作**。

输出预览后提示: `💡 执行 /triage 确认以上路由`

### `--file "name.md"` 单文件

仅处理指定文件，完整执行 6 步流程。输出单文件分析详情。

### `--scope <name>` 范围限定

仅扫描指定 Inbox 子目录 (见 Step 1 子目录映射表)。

---

## 错误处理

| 场景 | 操作 |
|------|------|
| Inbox 为空 | 输出 `📥 Inbox 为空 ✨` 退出 |
| 低置信度 (< 60%) | 移至 `_review/`，标记 `needs-review` |
| 目标同名冲突 | 追加 `_1` 后缀 + 警告 |
| 目录缺失 | 静默 `mkdir -p` |
| 写入失败 | 🔴 回滚整个事务 + 报告 |
| 超过 50 文件 | ⚠️ 提示分批处理 |

---

## 配置参数

| 参数 | 默认值 | 说明 |
|------|:------:|------|
| `MAX_FILES` | 50 | 单次处理上限 |
| `CONFIDENCE_THRESHOLD` | 0.6 | 分类置信度阈值 |
| `INBOX_WARN_DAYS` | 7 | 积压警告天数 |

---

## 与其他 Skill 配合

```
/context --inbox    ← 分拣前查看状态
/triage             ← 执行分拣
/wiki-compile [t]   ← 分拣后编译新资料
/lint --quick       ← 分拣后验证
```
