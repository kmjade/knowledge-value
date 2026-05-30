---
aliases:
  - 语义污染
  - Semantic Pollution
created: 2026-05-27
type: concept
topic: productivity
status: reviewed
---

# Semantic Pollution (语义污染)

## 定义

语义污染是指在知识管理系统中，不同类型的异构信息（专业知识、工作任务、生活琐事）不加区分地混入同一检索空间，导致 AI 辅助检索时上下文质量急剧下降的现象。这是传统知识管理系统面临的核心结构性矛盾。

## 核心原理

### 问题本质

```
RAG 检索结果:
  "Transformer 注意力机制的本质是..."
  "明天下午 3 点接孩子放学"
  "Self-Attention 的计算公式如下..."
  
↓

AI 输出质量急剧下降 ← 垃圾进，垃圾出 (GIGO)
```

### 异构信息类型

| 信息类型 | 属性 | 时效性 | 密度 |
|----------|------|--------|------|
| 专业知识 | 结构化、有体系 | 长期有效 | 高 |
| 工作任务 | 碎片化、有时限 | 短期有效 | 中 |
| 生活琐事 | 随机、低结构 | 即时有效 | 低 |
| 创作素材 | 半结构化 | 中长期 | 中高 |

## 关键要点

1. **不是 AI 的问题，是输入数据的问题**
2. **分层存储是唯一的解** — 不同类型信息放在不同层级
3. **Inbox 是污染源，Wiki 是净化器** — 信息必须先经分拣才能编译

## 相关概念

- [[Information-Lifecycle 1]] — 生命周期分类直接解决语义污染
- [[3 Resources/productivity/wiki/concepts/LLM-Wiki]] — LLM-Wiki 通过 raw/wiki 分离消除污染
- [[PARA-Method]] — PARA 按行动性分类是最基础的污染隔离

## 实践应用

- `0 Inbox/` → `/triage` → PARA 分层 → Wiki 编译
- 不同类型信息存放不同层级，避免交叉
- `/wiki-compile` 只处理 `reference` 类型信息

## Sources

- [[3 Resources/productivity/raw/articles/LifeOS × LLM-Wiki 融合系统.md]]
- [[3 Resources/productivity/raw/articles/PARA + LLM-WIKI 架构，实现个人知识与生活管理的自动化革命.md]]
