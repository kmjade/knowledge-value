---
aliases:
  - 接口需求
  - SRS-05
created: 2026-05-31
version: "1.0"
status: stable
type: project
lifecycle: evergreen
parent: "[[PARA+LLM-Wiki 融合系统需求文档 v1.0]]"
tags:
  - architecture
  - requirements
  - para
  - llm-wiki
---

## 5. 接口需求

### 5.1 Skill 命令接口

| 命令 | 触发方式 | 输入 | 输出 |
|------|----------|------|------|
| `/triage [options]` | Claude Code 会话 | `0 Inbox/` 目录 | 文件移动 + `AI-Log/triage-log.md` |
| `/wiki-compile [topic] [options]` | Claude Code 会话 | `3 Resources/[topic]/raw/` | `wiki/` 页面 + `AI-Log/compile-log.md` |
| `/context [options]` | Claude Code 会话 | Vault 文件系统 | Markdown 状态摘要 |
| `/lint [options]` | Claude Code 会话 | Vault 全部文件 | Markdown 检查报告 |

### 5.2 Skill 选项接口

```
/triage:
  (无参数)         完整扫描
  --dry-run         仅预览
  --file "<path>"   单文件处理
  --scope <name>    限定范围 (clippings|fleet-notes|tasks)

/wiki-compile:
  <topic>           必选：指定子库
  --dry-run         仅预览
  --incremental     增量编译
  --force           全量重新编译

/context:
  --quick           快速概览 (默认)
  --projects        项目状态
  --inbox           Inbox 状态  
  --summary         建议摘要

/lint:
  --quick           快速检查
  --fix             自动修复
  --report          详细报告
```

### 5.3 文件系统接口

| 接口 | 说明 |
|------|------|
| 文件读取 | AI 可读取 Vault 中任何 `.md` 文件 |
| 文件写入 | AI 可写入 `wiki/`、`AI-Log/`、`1-4 Projects|Areas|Resources|Archives/` |
| 文件移动 | AI 可移动 `0 Inbox/` 中的文件到目标位置 |
| 文件删除 | AI 禁止随意删除，需二次确认 |
| 目录创建 | AI 可在授权目录下创建新目录 |

### 5.4 Git 接口

| 操作 | 触发条件 | 权限 |
|------|----------|------|
| `git status` | 操作前后自动 | ✅ 自动 |
| `git add` | 用户确认后 | ⚠️ 需确认 |
| `git commit` | 用户确认后 | ⚠️ 需确认 |
| `git push` | 提交后 | ⚠️ 需确认 |
| `git pull` | 会话开始 | ⚠️ 需确认 |
