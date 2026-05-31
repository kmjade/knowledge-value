---
title: LifeOS × LLM-Wiki 融合系统 — 第五章：Wiki 子库专属 CLAUDE.md
source: https://mp.weixin.qq.com/s/uEAegrqhsM1WKcqlVfuE2w
author:
created: 2026-05-26
tags:
  - clippings
  - llm-wiki
  - wiki-sub-library
chapter: 5
parent: "[[0 Inbox/PARA × LLM-Wiki 融合系统]]"
---

## 第五章：Wiki 子库专属 CLAUDE.md（以 ai-ml 为例）

**文件路径**：`03-Resources/ai-ml/CLAUDE.md`

此文件覆盖根 CLAUDE.md 中的 Wiki 相关规则。

```markdown
# Wiki 子库：ai-ml（机器学习与 AI）

## 子库定位
本子库管理所有与 AI/ML 相关的专业知识。
覆盖范围：大语言模型、深度学习、AI 应用架构、AI 产品设计

## 排除范围（不属于本子库）
- AI 工具的使用教程（属于 3 Resources/tools/）
- AI 相关商业新闻（属于  2 Areas/career/ 或日记）
- AI 相关任务和项目（属于 1 Projects/）

## 页面类型
本子库特有的页面类型（在通用类型之外）：
- `wiki-paper`：论文页（包含 arxiv 链接、引用数、核心贡献）
- `wiki-model`：模型页（包含参数规模、发布日期、能力评测）
- `wiki-benchmark`：基准测试页

## 置信度规则
- `high`：来自同行评审论文或官方文档
- `medium`：来自知名博客、技术报告
- `low`：来自新闻报道、社交媒体、个人观点

## 实体分级（人物）
- Tier 1：核心研究者（> 5 篇被引用论文进入本库）
- Tier 2：重要贡献者（> 2 次被不同来源提及）
- Tier 3：存根（仅被提及 1 次）

## 编译优先级
优先编译：papers/ > books/ > articles/
低优先级：conversations/（AI 对话记录）

## 特殊处理规则
- 论文类文件：必须提取 Abstract、核心贡献、局限性三个字段
- 模型类文件：必须建立对应 wiki-model 页面，并追加到 wiki/entities/models-index.md
- 有明确发布日期的技术：在页面 frontmatter 中标注 `release-date`
```

---

> 📂 返回 [[4 Archives/by-type/Projects/LifeOS × LLM-Wiki 融合系统|目录索引]]
