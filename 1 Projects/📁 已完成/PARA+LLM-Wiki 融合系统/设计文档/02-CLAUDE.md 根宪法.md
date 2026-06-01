---
title: PARA × LLM-Wiki 融合系统 — 第二章：CLAUDE.md 根宪法
source: https://mp.weixin.qq.com/s/uEAegrqhsM1WKcqlVfuE2w
author:
created: 2026-05-26
tags:
  - clippings
  - llm-wiki
chapter: 2
parent: "[[PARA+LLM-Wiki 融合系统]]"
---

## 第二章：CLAUDE.md 根宪法（完整文件）

这是整个系统最重要的文件。Claude Code 在项目根目录查找 `CLAUDE.md` 文件。这是你的 Agent 常驻指令——每次会话都会读取它。把它当作你第二大脑的宪法。

```markdown
# PARA × LLM-Wiki 系统宪法

## 关于我
[在此填写 2-3 句话描述你是谁、你做什么工作、你的核心目标]
例：我是一名产品经理，专注于 AI 领域的创业项目。
我用这个 Vault 管理我的整个人生：工作项目、个人生活、专业知识积累。

## Vault 架构
这个 Vault 采用三层架构：
- **Layer 1（生活管理层）**：00-Inbox → 01-Projects → 02-Areas → 04-Archive + Periodic/
- **Layer 2（路由层）**：AI Agent 负责分拣、路由、维护（技能定义在 .claude/skills/）
- **Layer 3（知识编译层）**：03-Resources/ 下的 LLM-Wiki 子库群

## 目录职责速查
| 目录 | 职责 | 写入者 |
|------|------|--------|
| 0 Inbox/ | 所有信息的唯一入口 | 人类 |
| 1 Projects/ | 有截止日期的活跃项目 | 人类 + AI |
| 2 Areas/ | 持续维护的生活领域 | 人类 + AI |
| 3 Resources/[topic]/raw/ | 原始资料（不可修改） | 人类 |
| 3 Resources/[topic]/wiki/ | 编译后的知识页面 | AI 专属 |
| 4 Archive/ | 已完结/过期内容 | AI 自动 |
| 1 Projects/Periodic/ | 日/周/月周期笔记 | 人类 + AI |
| AI-Log/ | Agent 操作日志 | AI 专属 |

## 核心规则（绝对不可违反）
1. **永远不修改 raw/ 中的文件** — 原始资料是不可变的事实基线
2. **永远不删除文件** — 只移动到 04-Archive/（删除需明确二次确认）
3. **所有 AI 写入 wiki/ 的内容必须有来源标注** — frontmatter 中的 sources 字段
4. **0 Inbox/ 中的文件在分拣前不要读取用于其他目的** — 防止未分拣信息污染 Wiki
5. **每次修改 wiki/ 文件后必须追加到 AI-Log/compile-log.md**

## 信息生命周期分级
- **ephemeral**：生命周期 < 14 天（任务、提醒、临时记录）→ 完成或过期后移入 04-Archive/ephemeral/
- **operational**：项目生命周期内有效 → 项目完结时移入 04-Archive/projects/
- **reference**：持续参考价值，主题明确 → 送入对应 Wiki 子库编译
- **evergreen**：核心概念/原则，长期有效 → Wiki 中的永久页面

## Frontmatter 标准（所有文件必须包含）
```markdowd
---yaml
created: YYYY-MM-DD
updated: YYYY-MM-DD
type: [note|task|wiki-concept|wiki-entity|wiki-source|daily|weekly|project|area]
lifecycle: [ephemeral|operational|reference|evergreen]
status: [inbox|active|review|archived]
tags: []
sources: []      # wiki/ 文件专用，记录来源 raw/ 文件路径
origin: [manual|webclipper|voice|email|ai-generated]
---
```

## Wiki 子库目录

当前已有的 Wiki 子库（在 03-Resources/ 下）：

- [在此列出你的子库，例如：ai-ml、finance、health、cooking、people]

每个子库有独立的 CLAUDE.md，覆盖本文件的 Wiki 相关规则。

## 会话协议

### 会话开始

1. 读取 `AI-Log/sessions/` 最近 3 个会话摘要，了解历史上下文
2. 运行 `/context` 加载当前生命状态（今日待办、活跃项目、当周优先级）
3. 检查 `00-Inbox/` 是否有未处理文件，如有则提示用户运行 `/triage`

### 会话结束

1. 将本次会话的关键行动写入 `AI-Log/sessions/YYYY-MM-DD-HH.md`
2. 更新 `Periodic/daily/[今日].md` 的 Agent 日志区块
3. 如本次编译了 Wiki，更新对应子库的 `wiki/log.md`

## 禁止行为

- 不推断或猜测用户意图后直接执行重大操作，先描述计划等待确认
- 不在未经指令的情况下批量修改 wiki/ 文件（单次会话修改超过 20 个文件需确认）
- 不将 ephemeral 内容（购物清单、临时提醒）编译进 Wiki

> 📂 返回 [[4 Archives/by-type/Projects/LifeOS × LLM-Wiki 融合系统|目录索引]]
> 

