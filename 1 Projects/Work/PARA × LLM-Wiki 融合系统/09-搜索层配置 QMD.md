---
title: PARA × LLM-Wiki 融合系统 — 第九章：搜索层配置（QMD）
source: https://mp.weixin.qq.com/s/uEAegrqhsM1WKcqlVfuE2w
author:
created: 2026-05-26
tags:
  - clippings
  - llm-wiki
  - search
  - qmd
chapter: 9
parent: "[[0 Inbox/PARA × LLM-Wiki 融合系统]]"
---

## 第九章：搜索层配置（QMD）
---
当 Wiki 子库增长超过 100 个页面后，纯文件系统搜索会变慢。

Shopify CEO Tobi Lutke 构建了 QMD——一个用于 markdown 文件的本地搜索引擎，使用混合 BM25/向量搜索加 LLM 重排序。Karpathy 推荐它作为 LLM Wiki 的搜索层。它同时提供 CLI 和 MCP 服务器，让 Claude Code 能高效导航大型 Wiki。通过将 `qmd` 命令教给 Claude Code，可让其搜索 Vault 中的笔记，这比 Obsidian 内置搜索快得多。

**配置方法**（在根 CLAUDE.md 中添加）：

```markdown
## 搜索工具配置
当需要搜索 Vault 内容时：
1. 优先使用 `qmd search "[查询词]" --path ~/ObsidianVault/03-Resources/[topic]/` 进行 Wiki 子库内搜索
2. 跨 Wiki 搜索：`qmd search "[查询词]" --path ~/ObsidianVault/03-Resources/`
3. 全 Vault 搜索：`qmd search "[查询词]" --path ~/ObsidianVault/`
4. 如 qmd 未安装，退化为 grep 搜索

qmd 安装：brew install qmd（macOS）
```

---

> 📂 返回 [[4 Archives/by-type/Projects/LifeOS × LLM-Wiki 融合系统|目录索引]]
