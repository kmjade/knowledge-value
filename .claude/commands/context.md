# Context — 会话状态加载

快速加载当前 Vault 状态，为 AI 会话提供必要的上下文感知。

## 使用方式

```
/context              # 加载完整上下文（五维度）
/context --quick      # 快速概览（仅关键指标，< 30s）
/context --projects   # 仅项目状态 — 活跃项目列表 + 进度
/context --inbox      # 仅 Inbox 状态 — 积压详情 + 分类
/context --summary    # 操作建议 — 阈值检查 + 推荐动作
```

## 执行流程

### Pipeline 架构

```
/context ──┬── --quick ────► QuickPipeline    (6 指标表)
           ├── --projects ─► ProjectPipeline  (项目详情)
           ├── --inbox ────► InboxPipeline    (积压详情)
           └── --summary ──► SummaryPipeline   (阈值建议)
```

### QuickPipeline (--quick)

仅统计关键指标，不读取文件内容。目标 < 30s。

```
function quick():
    return {
        projects:   countActive("1 Projects/"),
        inbox:      countFiles("0 Inbox/", exclude="_processed"),
        raw:        countUncompiled("3 Resources/*/raw/"),
        wiki:       countWikiPages("3 Resources/*/wiki/"),
        lastLint:   readLastLintDate(),
        git:        gitStatus()
    }
```

### ProjectPipeline (--projects)

```
function projects():
    for proj in scan("1 Projects/"):
        status = 
            fm.status == "archived":  skip
            days > 30:               "🟡 stalled"
            fm.deadline < today():    "🔴 overdue"
            else:                    "🟢 active"
        
        suggestion = 
            days > 30: "考虑归档"
            fm.deadline < today(): "🔴 已过期"
            else: "继续"
```

### InboxPipeline (--inbox)

```
function inbox():
    files = scan("0 Inbox/", exclude="_processed")
    return {
        total: files.length,
        oldest: max(files.map(daysSince)),
        byDir: groupBy(files, dir),
        preview: files.slice(0,5).map(guessTopic)
    }
```

### SummaryPipeline (--summary)

```
THRESHOLDS = {
    inbox_high:     20,   // 🔴
    inbox_medium:    5,   // 🟡
    raw_uncompiled:  3,   // 🟡
    lint_gap:        7,   // 🟡
    project_stale:  30,   // 🟡
}
```

---

### Step 1：读取今日日记

路径：`Periodic/daily/YYYY/YYYY-MM-DD.md`

提取：
- 今日待办任务
- 昨日遗留（从 `## 🌙 日终回顾` 区块）
- 今日意图

如日记不存在，跳过此维度。

### Step 2：读取本周周记

路径：`Periodic/weekly/YYYY/YYYY-Www.md`

提取：
- 本周目标
- 本周优先级

如周记不存在，跳过此维度。

### Step 3：扫描活跃项目

扫描 `1 Projects/` 目录，识别 `status: active` 的项目：
- 项目名称与状态
- 截止日期（如有）
- 下一步行动（如有）

同时标记过期项目（deadline 已过）和停滞项目（>30 天无更新）。

### Step 4：检查 Inbox 状态

统计 `0 Inbox/` 下 `.md` 文件：
- 待处理文件总数
- 最旧文件的积压天数
- 是否超过警告阈值（默认 7 天）

**不读取文件内容**，仅统计数量和日期。

### Step 5：读取最近会话

读取 `AI-Log/sessions/` 最新 3 个文件，提取：
- 上次会话的待跟进事项
- 未完成的 AI 建议

### Step 6：操作建议生成 (FR-032)

**`--summary` 模式** — 基于阈值规则自动生成操作建议：

| 条件 | 阈值 | 建议 |
|------|:----:|------|
| Inbox 积压文件 | > 5 | 🟡 运行 `/triage` 清理积压 |
| Inbox 积压文件 | > 20 | 🔴 严重积压！立即运行 `/triage` |
| 最旧 Inbox 文件 | > 7 天 | 🟡 有长期未处理文件 |
| raw/ 未编译文件 | > 3 | 🟡 运行 `/wiki-compile [topic]` |
| 距上次 `/lint` | > 7 天 | 🟡 运行 `/lint` 健康检查 |
| 距上次 Git commit | > 1 天 | ℹ️ 建议 `git commit` 保存进度 |
| 有未跟踪 .md 文件 | > 0 | ℹ️ 可能需要 `/triage` 分拣 |

**建议优先级算法**:
1. Inbox 积压 > 20 → **P0** 立即分拣
2. 有 Git 冲突 → **P0** 先解决冲突
3. raw/ 未编译 > 3 → **P1** 编译知识库
4. 距上次 lint > 7 天 → **P1** 系统检查
5. Inbox 积压 > 5 → **P2** 日常分拣

## 输出格式

### `--quick` 快速概览
```markdown
📍 Context — YYYY-MM-DD

| 指标 | 数值 | 状态 |
|------|:----:|:----:|
| 活跃项目 | N | 🟢 |
| Inbox 积压 | N | 🟡/🔴 |
| 待编译 raw/ | N | 🟢/🟡 |
| Wiki 页面 | N | 🟢 |
| 上次 lint | YYYY-MM-DD | 🟢/🟡 |
| Git 状态 | clean/dirty | 🟢/🟡 |

💡 建议: [最高优先级操作]
```

### `--projects` 项目状态
```markdown
🎯 活跃项目（N 个）:

| 项目 | 状态 | 截止 | 最后更新 | 下一步 |
|------|:----:|------|----------|--------|
| [[项目A]] | 🟢 active | YYYY-MM-DD | N天前 | [action] |
| [[项目B]] | 🟡 stalled | — | 30天前 | ⚠️ 需回顾 |
| [[项目C]] | 🔴 overdue | YYYY-MM-DD | N天前 | 🔴 已过期 |
```

### `--inbox` Inbox 状态
```markdown
📥 Inbox 状态:

| 指标 | 数值 |
|------|:----:|
| 总文件 | N |
| 最旧文件 | N 天前 |
| Clippings/ | N |
| fleeting/ | N |
| 已处理 | N |

📂 待处理文件列表:
- file1.md (N天前) — [主题猜测]
- file2.md (N天前) — [主题猜测]

💡 建议: /triage [--dry-run]
```

### `--summary` 操作建议
```markdown
💡 操作建议 — YYYY-MM-DD

**优先级排序**:

🔴 P0 (立即):
1. Inbox 积压 N 个文件 — 运行 `/triage`
2. Git 有未提交更改 — 运行 `git status`

🟡 P1 (今日):
3. N 个 raw/ 待编译 — 运行 `/wiki-compile [topic]`
4. 距上次 /lint N 天 — 运行 `/lint`

ℹ️ P2 (本周):
5. 项目B 停滞 30 天 — 考虑归档到 4 Archives/
```

## 与其他命令的配合

```
/context
  ├── Inbox 有积压？──→ /triage
  ├── 项目快过期？──→ 优先处理
  ├── raw/ 有新材料？──→ /wiki-compile
  └── 系统健康？──→ /lint
```

## 示例输出

```
📋 Context Loaded - 2026-05-31

🎯 今日焦点:
- [项目A] 需要完成设计稿审核
- Inbox 有 15 个待处理文件

📊 快速统计:
| 类别 | 数量 | 状态 |
|------|------|------|
| 活跃项目 | 3 | 🟢 |
| Inbox 待处理 | 15 | 🟡 |

📌 最近活动:
- 2小时前: 分拣 3 个文件到 ai-ml/raw/
- 昨天: 编译 ai-ml Wiki (+5 概念)

💡 建议:
1. 运行 /triage 处理 Inbox 积压
2. 检查 [项目A] 的截止日期
```

## 注意事项

- `--quick` 模式只输出状态概览，不读取日记和会话历史
- Inbox 统计不读取文件内容，仅计数
- 会话历史只读取最近 3 个（控制加载时间）
- 日期计算需正确处理跨月、跨年边界
