---
aliases:
  - Triage 详细设计
  - 分拣详细设计
created: 2026-05-31
updated: 2026-05-31
type: design-detail
topic: triage
parent: "[[Skill-triage v1.0]]"
tags:
  - design
  - triage
  - architecture
---

# /triage 详细设计 v2.0

> 基于 [[SRS-triage-原型设计|原型]] → 可执行技术规格

---

## 1. 架构

```
                    ┌──────────────┐
                    │  /triage CLI │
                    └──────┬───────┘
           ┌───────────────┼───────────────┐
           ▼               ▼               ▼
    FullPipeline    DryRunPipeline   SingleFilePipeline
           │               │               │
           └───────────────┼───────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                  ▼
   Scanner            Analyzer            Router
   (文件发现)         (四维分析)          (路由决策)
        │                  │                  │
        └──────────────────┼──────────────────┘
                           ▼
                        Writer
                   (事务写入+回滚)
                           │
                           ▼
                        Logger
                   (结构化日志)
```

### 流水线对比

| Pipeline | Scanner | Analyzer | Router | Writer |
|----------|:-------:|:--------:|:------:|:------:|
| Full | ✅ | ✅ | ✅ | ✅ |
| DryRun | ✅ | ✅ | ✅ | ❌ |
| SingleFile | ✅(1) | ✅ | ✅ | ✅ |
| Scoped | ✅(subset) | ✅ | ✅ | ✅ |

---

## 2. Scanner — 文件发现

### 算法

```
function scan(scope: Scope, targetFile: string?): File[] {
    dirs = SCOPE_MAP[scope]          // 根据 scope 选择子目录
    files = []
    
    for dir in dirs:
        for entry in ls(base + dir):
            if entry.isDir():  continue
            if not entry.ext in [".md"]:  continue
            if shouldSkip(entry):  continue
            files.push(File(entry))
    
    if targetFile:
        files = files.filter(f => f.name == targetFile)
    
    return files.sortBy(modified desc)
}

function shouldSkip(f: File): bool {
    if f.path.contains("_processed/"):   return true   // 已处理
    if f.size < 10:                      log.warn(f)   // 空文件
    fm = parseFrontmatter(f)
    if fm?.triaged == true:              return true   // 已分拣
    return false
}
```

### 排除规则

| # | 条件 | 动作 | 日志级别 |
|:--:|------|------|:--------:|
| 1 | 路径含 `_processed/` | 跳过 | — |
| 2 | `triaged: true` | 跳过 | — |
| 3 | 非 `.md` 文件 | 跳过 | DEBUG |
| 4 | 空文件 (< 10B) | 警告+跳过 | WARN |
| 5 | 二进制内容 | 跳过 | WARN |

---

## 3. Analyzer — 四维分析

### 3.1 时效性分类

**加权评分公式**:

```
S(file, type) = keyword_score + date_signal + length_factor

type = argmax(S(file, ephemeral), S(file, operational), 
              S(file, reference),  S(file, evergreen))
confidence = max(S) / sum(all S)
```

**完整权重表**:

| 分类 | 信号 | 权重 | 说明 |
|------|------|:----:|------|
| **ephemeral** | 明天/今天/现在 | ×8 | 时间紧迫 |
| | 买/订/约/交/发送/提醒 | ×5 | 动作动词 |
| | `\d{1,2}[月/]\d{1,2}` 日期模式 | ×8 | 明确日期 |
| | "截止" "DDL" "deadline" | ×6 | 截止信号 |
| | 字数 < 200 | ×2 | 典型短任务 |
| **operational** | 项目/任务/会议/进度/报告 | ×4 | 项目术语 |
| | 方案/需求/设计/评审 | ×3 | 工作文档 |
| | 字数 200-1000 | ×3 | 中等长度 |
| | 有日期但非紧迫 | ×3 | 时间信号弱 |
| **reference** | `http://` `https://` `www.` | ×10 | URL 强信号 |
| | `source:` `author:` 字段 | ×8 | Frontmatter |
| | 摘要/参考/引用/来源 | ×5 | 文本信号 |
| | 字数 > 1000 | ×5 | 长文典型 |
| **evergreen** | 定义/原理/概念/方法/框架 | ×6 | 知识术语 |
| | 模型/理论/范式/定律 | ×5 | 学术术语 |
| | 术语密度 > 3/100字 | ×3 | 高信息密度 |
| | 无日期 | ×3 | 无时效性 |

### 3.2 主题识别

**动态主题映射** (从 CLAUDE.md 加载):

```
TOPIC_KEYWORDS = loadFromClaudeMd()

match(file, topic) = Σ(word ∈ file ∩ TOPIC_KEYWORDS[topic] × weight)
confidence = max_match / total_keywords

if confidence < CONFIDENCE_THRESHOLD:
    route → "0 Inbox/_review/"
    reason = "主题不明确 (置信度 {confidence:.0%})"
```

**CLAUDE.md 加载逻辑**:

```
function loadTopicKeywords(): Map<Topic, Keyword[]> {
    topics = {}
    for claude in glob("3 Resources/*/CLAUDE.md"):
        topic = parseFrontmatter(claude).topic
        keywords = extractKeywords(claude)  // 从概念域/实体域提取
        topics[topic] = keywords
    return topics
}
```

### 3.3 人物识别

```
patterns = {
    phone: /1[3-9]\d{9}/,
    email: /\S+@\S+\.\S+/,
    name_tag:  /(姓名|联系人|名字)[：:]\s*(\S+)/,
    wechat:  /(微信|WeChat)[：:]\s*(\S+)/,
    company: /(公司|单位|组织)[：:]\s*(\S+)/
}

for pattern in patterns:
    if match := pattern.exec(file.content):
        person[pattern.key] = match[2]

if person has ≥ 2 fields:
    flag.people = true
```

### 3.4 双重属性检测

```
dual = (
    (ephemeral_score > 0 OR operational_score > 0) 
    AND 
    (reference_score > 0 OR evergreen_score > 0)
)

if dual:
    // 拆分为两个实体
    task_part = extractTaskPart(file)      → tasks.md
    knowledge_part = extractKnowledgePart(file) → raw/articles/
    
    // 双向引用
    task_part += "\n📎 参考资料: [[knowledge_part]]"
    knowledge_part += "\n📎 关联任务: [[task_part]]"
```

---

## 4. Router — 路由决策

### 路由表 (完整)

| 分类 | 目标路径 | 操作 | 格式 |
|------|----------|------|------|
| ephemeral | `1 Projects/{proj}/tasks.md` | 追加行 | `- [ ] {title} 📅 {date}` |
| operational | `1 Projects/{proj}/` | 移动文件 | 保持原名 |
| reference | `3 Resources/{topic}/raw/articles/` | 复制+标记 | 保持原名 |
| evergreen | `3 Resources/{topic}/wiki/` | 队列 | — |
| people | `0 Inbox/people/raw/` | 提取信息 | `{name}.md` |
| low_conf | `0 Inbox/_review/` | 移动 | 追加 `status: needs-review` |

**项目匹配算法**:

```
function matchProject(file): string {
    // 1. 显式标记优先
    if file contains "[[1 Projects/X]]":  return X
    
    // 2. 关键词匹配项目 CLAUDE.md
    for proj in activeProjects():
        if match(file, proj.keywords) > 0.5:
            return proj.name
    
    // 3. 默认
    return "2 Areas/"  // 放到领域层待人工归类
}
```

### 安全校验

```
function preflight(target: Path): Result {
    checks = [
        Check("目录存在",   () => exists(target.parent) OR mkdir(target.parent)),
        Check("无同名冲突", () => !exists(target) OR rename_with_suffix(target)),
        Check("源可读",     () => isReadable(source)),
        Check("非 raw/",    () => !target.startsWith("3 Resources/*/raw/")) // AI 只读区
    ]
    return checks.allPassed() ? OK : Fail(failed_checks)
}
```

---

## 5. Writer — 事务写入

### 状态机

```
                 ┌─────────┐
     开始 ──────►│  COPY   │
                 └────┬────┘
                      │ 成功         失败
                      ▼              ▼
                 ┌─────────┐    ┌──────────┐
                 │  TAG    │    │ ROLLBACK │
                 └────┬────┘    └──────────┘
                      │ 成功         失败
                      ▼              ▼
                 ┌─────────┐    ┌──────────┐
                 │ ARCHIVE │    │  WARN    │
                 └────┬────┘    └──────────┘
                      │
                      ▼
                 ┌─────────┐
                 │  LOG    │
                 └─────────┘
```

### 伪代码

```
function write(file: File, route: Route): Result {
    tx = Transaction()
    
    try {
        // 1. 复制到目标
        tx.step("copy", () => copy(file.path, route.target))
        
        // 2. 更新目标 Frontmatter
        fm = { triaged: true, triaged_at: now(), triaged_to: route.target }
        tx.step("tag", () => updateFrontmatter(route.target, fm))
        
        // 3. 归档源文件
        archive = "0 Inbox/_processed/" + file.name
        tx.step("archive", () => move(file.path, archive))
        
        // 4. 记录日志
        tx.step("log", () => appendLog(route.summary))
        
        return tx.commit()
        
    } catch (e) {
        tx.rollback()
        return Error(e.message)
    }
}
```

---

## 6. 错误矩阵

| 场景 | 严重度 | 用户输出 | 恢复 |
|------|:------:|----------|------|
| Inbox 为空 | ℹ️ | `📥 Inbox 为空 ✨` | 退出 |
| 低置信度 < 60% | ⚠️ | `已移至 _review/ (N 文件)` | 人工分拣 |
| 目标同名 | ⚠️ | `重命名: file.md → file_1.md` | 自动 |
| 目录缺失 | ℹ️ | (静默) | `mkdir -p` |
| 写入失败 | 🔴 | `❌ 写入失败: {path}` | 回滚整个事务 |
| 权限不足 | 🔴 | `🔴 权限不足: {path}` | 跳过+报告 |
| > 50 文件 | ⚠️ | `⚠️ {N} 文件，建议分步` | 提示分批 |
| 非 Markdown | ℹ️ | (静默) | 跳过 |
| raw/ 写入 | 🔴 | `🔴 禁止写入 raw/` | 阻断 |

---

## 7. 性能分析

| 阶段 | 20 文件 | 50 文件 | 瓶颈 |
|------|:------:|:------:|------|
| Scanner | < 2s | < 5s | I/O |
| Analyzer | < 30s | < 60s | LLM 调用 |
| Router | < 1s | < 2s | 内存 |
| Writer | < 5s | < 10s | I/O |
| Logger | < 1s | < 2s | I/O |
| **总计** | **< 40s** | **< 80s** | ✅ NFR-001 |

**LLM Token 预算** (20 文件):

| 操作 | 输入 Token | 输出 Token |
|------|:---------:|:---------:|
| 时效性分析 | ~500/file | ~50/file |
| 主题识别 | ~300/file | ~30/file |
| 人物识别 | ~200/file | ~20/file |
| **总计** | **~20K** | **~2K** |

---

## 8. 配置

```yaml
# .claude/skills/triage/config.yaml (建议)
triage:
  max_files: 50
  confidence_threshold: 0.6
  inbox_warn_days: 7
  dry_run_default: false
  auto_compile_trigger: true        # 分拣后提示编译
  scope_dirs:
    all:       [".", "Clippings/", "1-输入/", "3-任务/"]
    clippings: ["Clippings/"]
    fleeting:  ["5 Zettels/💡 fleeting/"]
    tasks:     ["3-任务/"]
```

---

## 9. 测试策略

| 测试类型 | 场景数 | 验收标准 |
|----------|:------:|----------|
| 单元测试 | Scanner: 8, Analyzer: 12, Router: 6 | 覆盖率 > 80% |
| 集成测试 | 5 条完整流水线 | 全部通过 |
| 准确率测试 | 20 样本人工标注 | ≥ 85% |
| 性能测试 | 20/50/100 文件基准 | < 2min/5min/— |
| 异常测试 | 9 种错误场景 | 优雅降级 |
| 回归测试 | 每次发布前 | 全绿 |

---

> 📎 关联: [[Skill-triage v1.0\|设计概要]] | [[SRS-triage-原型设计\|原型]] | [[SRS-triage-需求说明书\|需求]] | [[triage-使用指南\|使用指南]]
