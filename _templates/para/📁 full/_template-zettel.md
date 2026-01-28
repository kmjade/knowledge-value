---
zettel_id: <% tp.date.now("YYYYMMDDHHmmss") %>
created: <% tp.date.now("YYYY-MM-DD HH:mm:ss") %>
type:
  - fleeting
  - literature
  - permanent
  - structure
tags:
  - zettel
---

> [!note] Zettel / 卡片
> 原子化笔记系统

## Zettel 类型 / Zettel Type
---

| 类型 | 说明 | 使用场景 |
|------|------|---------|
| [[#fleeting]] | 临时笔记 | 快速记录想法、灵感 |
| [[#literature]] | 文献笔记 | 记录学习内容、读书笔记 |
| [[#permanent]] | 永久笔记 | 标准化的核心思想 |
| [[#structure]] | 结构笔记 | 组织卡片关系、主题索引 |

> [!info] Zettelkasten 原则
> - **原子性** - 每张卡片只记录一个思想
> - **自主性** - 卡片可以独立理解
> - **链接性** - 通过链接建立知识网络
> - **唯一性** - 使用唯一标识符

## 核心思想 / Core Idea
---
> **这是这张卡片的核心思想**

> 用简洁、清晰的语言表达一个独立的想法或观点

### 背景 / Context
---
> 提供理解这个思想所需的背景信息

### 问题 / Problem
---
> 这个思想要解决的问题或回答的问题

### 答案/观点 / Answer/Viewpoint
---
> 你的答案、观点或解决方案

## 详细阐述 / Detailed Explanation
---
> 展开说明核心思想

### 关键概念
- 概念 1：说明
- 概念 2：说明

### 论据或例证
1. 例证 1
2. 例证 2

### 公式/代码（如适用）
```language
code here
```

## 来源与出处 / Sources
---
### 来源类型
| 来源 | 链接/引用 |
|------|-----------|
| 个人思考 | - |
| 书籍/文章 | [[Source Note]] |
| 视频/音频 | [链接](url) |
| 对话/会议 | |

### 原始摘录
> {{content}}

> 如果基于其他内容，记录原文摘录或要点

## 关联链接 / Links
---
### 反向链接
```dataview
TABLE WITHOUT id file.link as "引用这张卡片的笔记"
FROM [[{{title}}]]
WHERE file.link != this.file.link
SORT file.mtime DESC
LIMIT 10
```

### 前向链接
- [[Note 1]] - 关联说明
- [[Note 2]] - 关联说明
- [[Note 3]] - 关联说明

### 关联的 PARA 内容
- [[Project]] - 相关项目
- [[Area]] - 相关领域
- [[Resource]] - 相关资源

## 标签 / Tags

### 按主题分类
- #主题1
- #主题2

### 按领域分类
- #领域1
- #领域2

### 按状态分类
- #draft
- #refined
- #verified

## 反思与迭代 / Reflection & Iteration
---
### 最初想法
> 记录最初的想法，便于对比演进

### 迭代历史
| 日期 | 变化内容 |
|------|---------|
| | |

### 待完善
> 这张卡片还需要完善的部分

- [ ] 补充例证
- [ ] 验证观点
- [ ] 完善表述

## 应用场景 / Applications
---
> 这个思想可以应用在哪些场景

### 实际应用
1. 场景 1 - 应用说明
2. 场景 2 - 应用说明

### 潜在应用
- 潜在应用 1
- 潜在应用 2

## 相关概念 / Related Concepts
---
### 同义词
- 同义词 1
- 同义词 2

### 反义词
- 反义词 1

### 相关概念
- [[Concept 1]]
- [[Concept 2]]

---

> [!tip] Zettel 管理提示
> - 保持卡片短小精悍
> - 使用清晰的标题
> - 及时建立链接
> - 定期回顾和整理
> - 使用唯一 ID 便于引用
> - 融入 PARA 系统
