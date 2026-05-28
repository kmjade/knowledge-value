---
title: LLM Wiki Lint 流程
created: 2026-05-27
source: "[[Hermes+LLM wiki +Obsidian 工作流]]"
tags: [topic/llm, para/resource/tech, workflow]
compiled: false
---

# LLM Wiki Lint 流程

Lint（维护）是定期检查知识库健康的流程。

## Lint 检查项

| 检查项 | 说明 | 自动修复 |
|--------|------|---------|
| 页面间矛盾 | 不同页面的冲突内容 | ⚠️ 需人工确认 |
| 过时信息 | 被新资料取代的内容 | ✅ 可自动更新 |
| 孤立页面 | 无入站链接的页面 | ✅ 可自动链接 |
| 缺失页面 | 被提及但无专属页面的概念 | ⚠️ 需创建 |
| 缺失引用 | 可补充的交叉引用 | ✅ 可自动添加 |

## Lint 步骤

### 1. 扫描阶段
- 扫描所有 wiki 页面
- 检查 frontmatter 完整性
- 检查 wikilink 连通性

### 2. 比对阶段
- 跨页面内容一致性检查
- 新旧资料对比

### 3. 修复阶段
- 自动修复可修复的问题
- 标记需人工确认的问题

## LintAgent 实现

参考 Python 实现 (LintAgent):
- 扫描 wiki 目录所有 md 文件
- 检查矛盾、过时、孤立问题
- 生成 Lint 报告
- 自动修复可用问题

## 相关概念
- [[LLM-Wiki-方法论]]
- [[Ingest流程]]
- [[Query流程]]
