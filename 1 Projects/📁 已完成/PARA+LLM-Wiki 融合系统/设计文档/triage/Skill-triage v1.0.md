---
aliases:
  - Skill 1 /triage
  - Inbox 分拣引擎
created: 2026-05-31
type: design
topic: triage
parent: "[[03-Skills 完整设计]]"
---

# Skill 1: `/triage` — Inbox 分拣引擎

**文件路径**: `.claude/skills/triage/triage.md`

---

## 使用方式

```
/triage                    # 扫描所有未处理文件
/triage --dry-run          # 仅预览，不执行移动
/triage --file "name.md"   # 处理单个文件
/triage --scope clippings  # 仅扫描指定子目录
```

## 触发方式

- 手动: 用户输入 `/triage`
- 自动: SessionStart hook 检测到 `0 Inbox/` 有新文件时提示
- 定时: Cron Job 每日 09:03 自动检查

## 输入

`0 Inbox/` 目录下所有 `status != "_processed"` 的文件

---

## 执行流程

### Step 1: 扫描 Inbox

列出 `0 Inbox/` 中所有文件（排除 `_processed/` 子目录）。

### Step 2: 内容分析

**2a. 时效性分析**

| 分类 | 判定标准 | 示例 |
|------|----------|------|
| ephemeral | 含日期 + 动作动词 | "明天买灯泡" |
| operational | 项目 + 任务，无截止 | 会议记录 |
| reference | 技术/论文/书摘 | 文章摘录 |
| evergreen | 方法论/核心观点 | 知识条目 |

**2b. 主题识别** — 匹配 CLAUDE.md 子库目录，低置信度 → `_review/`

**2c. 人物识别** — 检测人名/联系人 → 标记 people/

**2d. 双重属性** — 任务+知识 → 分开路由

### Step 3: 路由决策

| 判定 | 目标 |
|------|------|
| ephemeral | `1 Projects/[project]/tasks.md` |
| operational | `1 Projects/[project]/` |
| reference | `3 Resources/[topic]/raw/` |
| evergreen | `3 Resources/[topic]/wiki/` |
| 人物 | `0 Inbox/people/raw/` |

### Step 4: 写入 + Frontmatter

```yaml
triaged: true
triaged_at: 2026-05-31T14:30:00
triaged_to: 3 Resources/ai-ml/raw/articles/
```

### Step 5: 生成报告

追加到 `AI-Log/triage-log.md`

### Step 6: 提示用户

- 是否触发 `/wiki-compile`
- 需人工确认的路由

---

## 子模式

| 标志 | 功能 |
|------|------|
| `--dry-run` | 仅预览分析，不移动 |
| `--file` | 单文件处理 |
| `--scope` | clippings / fleeting / tasks |

---

## 错误处理

- 无法分类 → `status: needs-review`
- < 50 字无类型 → 日记 Fleeting Ideas

## 安全检查

1. 检查目标是否存在同名文件
2. 检查文件是否有未保存修改
3. 确认不破坏 wikilinks

---

> 📎 关联: [[triage-使用指南\|使用指南]] | [[../.claude/skills/triage/triage.md\|Skill 实现]] | [[开发工作清单\|Phase 1: 100%]]
