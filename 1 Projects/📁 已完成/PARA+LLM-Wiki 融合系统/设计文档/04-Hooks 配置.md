---
title: LifeOS × LLM-Wiki 融合系统 — 第四章：Hooks 配置
source: https://mp.weixin.qq.com/s/uEAegrqhsM1WKcqlVfuE2w
author:
created: 2026-05-26
tags:
  - clippings
  - llm-wiki
  - hooks
chapter: 4
parent: "[[PARA+LLM-Wiki 融合系统]]"
---

## 第四章：Hooks 配置（自动化钩子）

**文件路径**：`.claude/hooks/hooks.json`

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": ".*",
        "hooks": [
          {
            "type": "command",
            "command": "echo '=== Session Start ===' && ls 00-Inbox/ | wc -l | xargs -I{} echo 'Inbox 待处理文件数：{}'",
            "description": "显示 Inbox 待处理文件数"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write|Edit|Create",
        "hooks": [
          {
            "type": "command",
            "command": "echo \"[$(date '+%Y-%m-%d %H:%M')] 文件修改\" >> AI-Log/sessions/current-session.log",
            "description": "记录所有文件写入操作"
          }
        ]
      }
    ]
  }
}
```

Hooks 使用 `SessionStart` 和 `Stop` 钩子实现热缓存，这使得 Agent 在每次会话启动时能自动预加载上下文。

---

> 📂 返回 [[4 Archives/by-type/Projects/LifeOS × LLM-Wiki 融合系统|目录索引]]
