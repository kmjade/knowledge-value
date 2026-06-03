---
aliases:
  - 知识质量框架
  - Knowledge Quality Framework
created: 2026-06-02
version: "1.0"
status: stable
type: design
parent: "[[PARA+LLM-Wiki 融合系统]]"
tags: [architecture, quality, lint]
---

# 知识质量框架

> 知识完整性、准确性、可追溯性的质量保障体系
> 拆分自 [[1 Projects/PARA+LLM-Wiki 融合系统/设计文档/PARA+LLM-Wiki 整合系统架构设计文档 v1.0]]

## 六维质量模型

| 维度 | 指标 | 阈值 |
|:-----|:-----|:----:|
| 完整性 | Frontmatter 必填字段 | 100% |
| 准确性 | 来源置信度 | ≥ 80% high/med |
| 可追溯性 | Sources 标注 | 100% |
| 链接密度 | wikilinks/页 | ≥ 2 |
| 时效性 | 最近编译时间 | ≤ 90 天 |
| 一致性 | UDC 编码规范 | 100% |

## 置信度规则

| 置信度 | 来源 | 标记 |
|:------:|:-----|:----:|
| high | 论文/官方文档 | 🟢 |
| medium | 技术博客/报告 | 🟡 |
| low | 新闻/社交/观点 | 🔴 |

## 评分公式

```
总分 = Σ(维度得分 × 权重) / 权重总和 × 100

目录 13% · 链接 25% · FM 20% · UDC 10% · 编译 12% · 日志 10% · 配置 10%
```

## /lint 集成

- `--quick` 快速检查
- `--report` 详细报告
- `--fix` 自动修复
- `--udc` UDC 专项验证
