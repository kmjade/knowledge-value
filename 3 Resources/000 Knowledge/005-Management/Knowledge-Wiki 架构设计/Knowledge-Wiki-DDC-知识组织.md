---
aliases:
  - DDC 知识组织架构
  - DDC Knowledge Organization
created: 2026-06-02
version: "1.0"
status: stable
type: design
parent: "[[PARA+LLM-Wiki 融合系统]]"
tags: [architecture, ddc, classification]
---

# DDC 知识组织架构

> 杜威十进分类法 (DDC) 作为知识组织骨架的设计规范
> 拆分自 [[1 Projects/PARA+LLM-Wiki 融合系统/设计文档/PARA+LLM-Wiki 整合系统架构设计文档 v1.0]]

## DDC 分类体系

| DDC | 子库 | 状态 |
|:---:|:-----|:----:|
| 000 | Knowledge-Systems | 🟢 |
| 060 | Knowledge-Management | 🟢 |
| 100 | Philosophy-Psychology | 🟢 |
| 200 | Religion-Theology | 🟡 |
| 300 | Social-Sciences | 🟡 |
| 400 | Language | 🔴 |
| 500 | Natural-Sciences | 🟢 |
| 600 | Applied-Sciences | 🟢 |
| 700 | Arts | 🟡 |
| 800 | Literature | 🟡 |
| 900 | History-Geography | 🟢 |

## 分类规则

1. 一个概念一个主要 DDC 位置
2. 分类深度 = 知识成熟度
3. 子库命名 `DDC三位码 + 空格 + 英文名`

## DDC 覆盖矩阵

```
DDC 000 ████████████░░ 60%  活跃
DDC 005 ██████████████ 70%  活跃
DDC 100 ██████████████ 70%  活跃
DDC 200 ████░░░░░░░░░░ 20%  框架
DDC 300 ████░░░░░░░░░░ 20%  框架
DDC 400 ░░░░░░░░░░░░░░  0%  未创建
DDC 500 ████████░░░░░░ 40%  活跃
DDC 600 ████████░░░░░░ 40%  活跃
DDC 700 ████░░░░░░░░░░ 20%  部分
DDC 800 ████░░░░░░░░░░ 20%  框架
DDC 900 ██████████████ 70%  活跃
```
