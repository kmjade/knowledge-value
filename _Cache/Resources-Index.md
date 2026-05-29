---
title: Resources Cache
date: 2026-05-28
updated: 2026-05-28
tags: [cache, resources]
type: cache
---

# Resources 缓存索引

## 统计

| 指标 | 数值 |
|------|------|
| 总笔记数 | 2517 |
| 顶级子库数 | 20 |
| 子目录数 | 200+ |

## 按子库分类

### DDC 知识分类体系

| 子库 | 路径 | 文件数 | 状态 |
|------|------|--------|------|
| 000 Knowledge | `000 Knowledge/` | 536 | 🟢 活跃 |
| 100 Philosophy & Psychology | `100 Philosophy. Psychology/` | 200 | 🟢 活跃 |
| 200 Religion & Theology | `200 Religion & Theology/` | 126 | 🟡 框架 |
| 300 Social Sciences | `300 Social Sciences/` | 102 | 🟡 框架 |
| 400 Language | `400 Language/` | 100 | 🟡 框架 |
| 500 Natural Sciences | `500 Natural Sciences/` | 107 | 🟢 活跃 |
| 600 Applied Sciences | `600 Applied Sciences/` | 207 | 🟢 活跃 |
| 700 Arts | `700 Arts/` | 100 | 🟡 框架 |
| 800 Literature | `800 Literature/` | 100 | 🟡 框架 |
| 900 History & Geography | `900 History & Geography/` | 100 | 🟡 框架 |

### 技术类

| 子库 | 路径 | 文件数 | 状态 |
|------|------|--------|------|
| 01-Tech | `01-Tech/` | 290 | 🟢 活跃 |
| 0 Department | `0 Department/` | 6 | 🟡 迁移中 |

### 学习与生产力

| 子库 | 路径 | 文件数 | 状态 |
|------|------|--------|------|
| 02-Learning | `02-Learning/` | 52 | 🟢 活跃 |
| 03-Productivity | `03-Productivity/` | 67 | 🟢 活跃 |
| productivity | `productivity/` | 137 | 🟢 活跃 |

### 兴趣与参考

| 子库 | 路径 | 文件数 | 状态 |
|------|------|--------|------|
| 04-Interests | `04-Interests/` | 192 | 🟢 活跃 |
| 05-Reference | `05-Reference/` | 59 | 🟢 活跃 |

### 专项

| 子库 | 路径 | 文件数 | 状态 |
|------|------|--------|------|
| finance | `finance/` | 29 | 🟡 规划中 |
| people | `people/` | 4 | 🟡 规划中 |

---

## 按状态分类

| 状态 | 子库数 | 占比 |
|------|--------|------|
| 🟢 活跃 | 11 | 55% |
| 🟡 框架/规划中 | 9 | 45% |

---

## 热门资源 (Top 10 子库按文件数)

| 排名 | 子库 | 文件数 |
|------|------|--------|
| 1 | 000 Knowledge | 536 |
| 2 | 01-Tech | 290 |
| 3 | 600 Applied Sciences | 207 |
| 4 | 100 Philosophy & Psychology | 200 |
| 5 | 04-Interests | 192 |
| 6 | productivity | 137 |
| 7 | 200 Religion & Theology | 126 |
| 8 | 500 Natural Sciences | 107 |
| 9 | 300 Social Sciences | 102 |
| 10 | 400/700/800/900 (并列) | 100 |

---

## 关联项目和领域

```dataview
TABLE without ID
  file.link AS "资源",
  file.outlinks.length AS "链接数",
  filter(file.outlinks, (l) => startswith(l.path, "1 Projects")) AS "关联项目"
FROM "3 Resources"
WHERE file.name != this.file.name AND !startswith(file.name, "_Cache")
SORT file.outlinks.length DESC
LIMIT 10
```

---

## 待处理项目

- [ ] 完成 DDC 框架子库的内容填充（200/300/400/700/800/900）
- [ ] 整理 0 Department/ 迁移至对应 DDC 分类
- [ ] 清理 學習AI/ 空目录
- [ ] 为顶级笔记添加 frontmatter 属性

---

## 维护

**最后更新**: 2026-05-28
**维护者**: Claudian
**下次更新**: 2026-06-04
