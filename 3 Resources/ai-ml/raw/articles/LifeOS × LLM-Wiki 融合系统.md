---
title: "LifeOS × LLM-Wiki 融合系统"
created: 2026-05-26
source: "https://mp.weixin.qq.com/s/uEAegrqhsM1WKcqlVfuE2w"
tags: [clippings, topic/productivity, topic/llm]
compiled: true
compiled-date: 2026-05-27
compiled-pages:
  - wiki/sources/source-LifeOS-Fusion.md
---

# LifeOS × LLM-Wiki 融合系统

从零开始的完整架构设计文档 v1.0。

## 核心设计哲学

### 公理一：单一 Vault，永不分裂
所有内容进入同一个 Obsidian Vault，一个 Vault 全部 Markdown，全部对 Claude Code 可访问。在单一 Vault 内建立明确的隔离边界。

### 公理二：AI 是编译器，不是对话伙伴
对生活信息，AI 是路由器；对专业知识，AI 是编译器。所有中间整理工作由 AI 承担。

### 公理三：信息有生命周期
知识管理系统失败的根源不是工具，是维护成本。核心设计目标是把维护成本降到零。

## Vault 结构设计

```
ObsidianVault/
├── CLAUDE.md                  # Agent 宪法
├── .claude/skills/            # Skills 定义
│   ├── triage.md              # Inbox 分拣
│   ├── wiki-compile.md        # 知识编译
│   ├── daily-open.md          # 每日开启仪式
│   ├── weekly-review.md       # 每周回顾
│   ├── context.md             # 会话状态加载
│   └── lint.md                # 系统健康检查
├── 00-Inbox/                  # 唯一入口
├── 01-Projects/               # 活跃项目
├── 02-Areas/                  # 持续领域
├── 03-Resources/              # 资源库（LLM-Wiki 子库挂载点）
│   ├── _META-INDEX.md         # 全局知识图谱入口
│   ├── [topic]/               # Wiki 子库
│   │   ├── CLAUDE.md          # 子库 schema
│   │   ├── raw/               # 原始资料
│   │   └── wiki/              # 编译产物
│   └── people/                # 人物 CRM
├── 04-Archive/                # 归档
├── Periodic/                  # 周期笔记
├── 99-Meta/                   # 系统元数据
└── AI-Log/                    # 操作日志
```

## 核心 Skills 定义

完整定义了 /triage、/wiki-compile、/context、/daily-open、/weekly-review、/lint 六个 Skills，以及 SessionStart/Stop Hooks。

## 其他主题

- Wiki 子库专属 CLAUDE.md 设计
- People CRM 子库（人物分级 Tier 1-3）
- 周期笔记模板（日/周）
- Obsidian 插件配置清单
- QMD 搜索层配置
- 移动端快速捕获方案（usememos/Telegram Bot/iOS Shortcuts）
- 系统启动手册（Phase 0-6）
- 已知风险与防御设计

## 相关概念
- [[3 Resources/ai-ml/raw/articles/LLM-Wiki/LLM-Wiki]]
- [[Three-Layer-Architecture]]
- [[Ingest-Workflow]]
- [[Query-Workflow]]
- [[Lint-Workflow]]

## 相关实体
- [[Obsidian]]
- [[0 Inbox/_processed/AI-Agent/Hermes-Agent/Hermes-Agent]]

## Sources
- [[raw/articles/LifeOS × LLM-Wiki 融合系统.md]]
