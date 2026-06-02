---
aliases:
  - LLM-Wiki 方法论
  - PARA × LLM-Wiki 融合系统
  - AI 知识编译
created: 2026-06-01
type: concept
topic: knowledge-systems
status: evergreen
confidence: high
---

# LLM-Wiki

## 定义

LLM-Wiki 是一种将 LLM 作为**知识编译器**（而非对话伙伴）的个人知识管理方法论。它通过三层架构（raw/ → wiki/ → outputs/）将原始信息自动编译为结构化知识网络。

## 核心架构

```
raw/ (人类写入·AI 只读)
  │
  ▼ /wiki-compile
wiki/ (AI 独占·人类只读)
  │
  ▼
outputs/ (基于 Wiki 生成的制品)
```

## 在 KOS 谱系中的位置

| 层级 | 传统方法 | LLM-Wiki |
|------|------|------|
| 知识捕获 | 手动摘录 | Inbox → /triage 自动分拣 |
| 知识组织 | 手动分类 | DDC + PARA 双轨 |
| 知识存储 | 文件夹 | wikilink 网络 |
| 知识检索 | 搜索 | 遍历链接 + AI 查询 |
| 知识维护 | 人工回顾 | /lint 自动健康检查 |

## 关键概念

- **AI 是编译器** — 从"帮我找到"到"帮我理解并连接"
- **信息生命周期** — ephemeral → operational → reference → evergreen
- **反熵** — 主动编译防止知识腐烂
- **知识复利** — 每次投入放大整张网络的价值

## 项目文档

- [[1 Projects/📁 已完成/PARA+LLM-Wiki 融合系统/PARA+LLM-Wiki 融合系统\|系统架构设计 v1.0]]
- [[1 Projects/📁 已完成/PARA+LLM-Wiki 融合系统/需求文档/PARA+LLM-Wiki 融合系统需求文档 v1.0\|需求文档]]
- [[3 Resources/PARA+LLM-Wiki 整合系统架构设计文档 v1.1\|架构 v1.1]]

## 相关

- [[KOS-Architecture-Design]] · [[Knowledge-Organization-Systems]]
- [[Knowledge-Compound-Interest-知识复利]] · [[Entropy-Anti-Entropy-熵增与反熵]]
- [[PARA-Method]] · [[Zettelkasten-Method]]
