---
title: 分类法应用
aliases: [Classification Applications, 分类实践]
tags: [classification, application]
created: 2026-05-28
updated: 2026-06-01
---

# 分类法应用

> 分类无处不在——从图书馆排架到个人知识管理。

---

## 一、传统应用

| 场景 | 分类法 | 作用 |
|------|:---:|------|
| 图书馆排架 | DDC/CLC | 物理位置=分类号，浏览即发现 |
| 书目检索 | LCSH/MeSH | 主题词表实现跨库统一检索 |
| 档案管理 | 来源分类 | 按组织机构·时间·主题归档 |

---

## 二、数字应用

| 场景 | 技术 | 与传统分类的区别 |
|------|------|------|
| 数据库索引 | B-Tree/Hash | 性能优先而非浏览优先 |
| 电商导航 | 面分类+标签 | 一件商品可同时属于多个类目 |
| 搜索引擎 | 关键词+语义 | 不需要预定义类目——查询即分类 |

---

## 三、个人知识管理

### PARA 分类

```
Projects  → 有截止日期的行动
Areas     → 持续维护的责任
Resources → 可检索的参考资料
Archives  → 已完成的内容
```

按 **可执行性** 而非主题分类——这是与传统分类法的根本区别。

### Zettelkasten

```
不依赖预定义类目
链接代替层级
意外相遇产生新想法
```

本质上是放弃树状分类，改用网络结构。

### 本Vault的混合策略

| 层级 | 方法 | 工具 |
|------|------|------|
| 宏观骨架 | DDC十进分类 | 文件夹结构 |
| 中观导航 | MOC + _INDEX | `[[wikilink]]` |
| 微观检索 | 标签 + 搜索 | #tag · Dataview |
| AI辅助 | `/triage` 自动分拣 | Claude Code |

---

## 四、AI时代的分类

传统分类需要人做决策。AI改变了这一点：

| 之前 | 之后 |
|------|------|
| 手动打标签 | AI从内容自动提取 |
| 预先定义类目 | 动态生成分类 |
| 单一归类 | 多重标签+语义关联 |
| 人找内容 | 内容找人 |

> 分类的未来不是更精密的树，而是更智能的网络。

---

## 相关

- [[01-Classification-Overview|分类法概述]]
- [[03-DDC-in-Depth|DDC 详解]]
- [[09-Digital-Age-Classification|数字时代分类]]
- [[wiki/concepts/分类原理|Wiki: 分類原理]]
- [[wiki/concepts/CLC|CLC]]
- [[wiki/concepts/LCC|LCC]]
- [[050-Classification-Metadata|050 分類法與元數據]]
