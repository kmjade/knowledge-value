---
aliases:
  - Resources Index
  - 资源入口
  - Wiki Hub
created: 2026-05-31
type: index
tags:
  - index/resources
---

# 📚 Resources 资源

> 知识资源库 & Wiki 编译中心

← [[_meta/_INDEX|总览]] | [[3 Resources/3 Resources|资源主页]] | [[_META-INDEX|Wiki 全局导航]]

---

## 🏛️ DDC 知识子库

| DDC | 子库 | 入口 | 状态 |
|:---:|------|------|:---:|
| 000 | 知识组织 | [[000 Knowledge/000 Knowledge\|→]] | 🟢 |
| 100 | 哲学·心理学 | [[100 Philosophy & Psychology\|→]] | 🟢 |
| 200 | 宗教·神学 | [[200 Religion & Theology\|→]] | 🟡 |
| 300 | 社会科学 | [[300 Social Sciences/300 Social Sciences\|→]] | 🟡 |
| 400 | 语言 | [[400 Language\|→]] | 🟡 |
| 500 | 自然科学 | [[500 Natural Sciences/500 Natural Sciences\|→]] | 🟢 |
| 600 | 应用科学 | [[600 Applied Sciences\|→]] | 🟢 |
| 700 | 艺术 | [[700 Arts\|→]] | 🟡 |

---

## 👥 专题子库

| 子库 | 入口 | 状态 | 定位 |
|------|------|:---:|------|
| People CRM | [[people/people\|→ 人物关系]] | 🟢 | 关系智能层 (GBrain) |
| 传记与人物 | [[../900/920-传记与人物/920-传记与人物\|→ 历史传记]] | 🟢 | 历史人物研究 |

---

## 📂 其他资源目录

| 目录 | 说明 |
|------|------|
| [[03-Productivity/]] | 生产力方法与工具 |
| [[generative-art/]] | 生成艺术 |

---

## 📝 编译产物 (Wiki)

```dataview
LIST
FROM "3 Resources"
WHERE contains(file.folder, "wiki/")
SORT file.mtime DESC
LIMIT 10
```

---

## 📄 系统文档

- [[PARA+LLM-Wiki 整合系统架构设计文档 v1.1 1|系统架构 v1.1]]
- [[4 Archives/Knowledge+PARA+LLM-Wiki融合系统|融合系统说明]]
- [[_META-INDEX|Wiki 全局导航]]

---

## 🔄 知识流

```
raw/ (原始资料) ──人类写入──▶  只读
    │
    ▼ /wiki-compile
wiki/ (编译产物) ──AI 独占──▶  写入
    │
    ▼
outputs/ (制品)   ──基于 Wiki──▶  生成
```

---

## 🔗 相关

- [[0 Inbox/_INDEX|Inbox]] — 待分拣资源来源
- [[1 Projects/_INDEX|项目]] — 资源使用场景
- [[4 Archives/_INDEX|归档]] — 过时资源归档
