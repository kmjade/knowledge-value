---
title: Index
type: meta
tags:
  - meta
  - navigation
  - index
  - alphabet
  - knowledge-base
created: 2026-01-30
updated: 2026-02-16
---

# 📑 Knowledge Index

## 📝 什么是 Index？

Index 是知识库的字母索引，提供按字母顺序快速定位主题的功能。它与 MOC (Map of Content) 配合使用，实现从主题到具体笔记的完整导航。

## 📚 如何使用

1. **浏览目录** - 选择目标首字母快速定位
2. **使用 MOC** - 按主题探索知识体系
3. **搜索功能** - 利用 Obsidian 的全局搜索查找特定内容

## 🗂️ 目录

### A-C
- 📚 **Areas** - 领域分类
- 🎯 **Projects** - 项目管理
- 📖 **Resources** - 资源收藏

### D-F
- 🛠️ **Digital Tools** - 数字工具
- 📝 **Documents** - 文档管理

### G-I
- 🧠 **Knowledge** - 知识体系
- 🔄 **Ideas** - 创意收集

### J-L
- 📋 **Journal** - 日志记录
- 🔗 **Links** - 链接收藏

### M-O
- 🗂️ **Methods** - 方法论
- 🔍 **Organization** - 组织管理

### P-R
- 📅 **Planning** - 规划工具
- 🎪 **Resources** - 资源汇总

### S-U
- 📊 **Statistics** - 统计分析
- 🌟 **Systems** - 系统思维

### V-Z
- ⚙️ **Value** - 价值创造
- 🎯 **Goals** - 目标管理

## 💡 使用提示

- **Index 与 MOC 配合使用**：Index 用于按字母查找，MOC 用于按主题探索
- **动态内容更新**：使用 Dataview 查询自动显示最新内容
- **定期维护**：保持索引结构更新，确保信息准确完整
- **多维度导航**：结合字母索引、主题分类、时间线等多种查找方式

## 📊 最新内容

```dataview
TABLE title, created
FROM "2 Areas" OR "1 Projects" OR "3 Resources"
WHERE contains(tags, "meta") OR contains(tags, "index") OR contains(tags, "alphabet")
SORT created DESC
LIMIT 10
```

## 🔗 相关资源

- [[_meta/🔗 知識关联/🔗 知識关联.md|返回知識关联]]
- [[_meta/🔗 知識关联/MOCs/MOCs.md|MOCs - 主题地图]]
- [[_meta/🔗 知識关联/Areas-Index.md|领域索引]]
- [[_meta/🔗 知識关联/Projects-Index.md|项目索引]]
- [[_meta/🔗 知識关联/Resources-Index.md|资源索引]]
