---
aliases:
  - 知识图谱入口
  - Wiki Index
created: 2026-05-26
---

# META-INDEX

全局知识导航入口，连接所有 Wiki 子库。

## Wiki 子库

| 子库                   | 路径                             | 状态     | 描述    |
| -------------------- | ------------------------------ | ------ | ----- |
| 000 Knowledge        | [[000 Knowledge\|知識入口]]        | 🟢 活跃  | 知識知識库 |
| 300 Social Sciences  | [[300 Social Sciences\|社会科学]]  | 🟡 规划中 | 社会科学  |
| 400 Language         | [[400 Language\|语言学科]]         | 🟡 规划中 | 语言学科  |
| 500 Natural Sciences | [[500 Natural Sciences\|自然科学]] | 🟡 规划中 | 自然科学  |
| 600 Applied Sciences | [[600 Applied Sciences]]       | 🟢 活跃  | 应用科学  |
| 700 Arts             | [[700 Arts\|艺术]]               | 🟡 规划中 |       |

## 其他资源目录

| 目录 | 路径 | 描述 |
|------|------|------|
| Tech | [[01-Tech/]] | 技术相关资源 |
| Learning | [[02-Learning/]] | 学习资料 |
| Productivity | [[03-Productivity/]] | 生产力工具 |
| Interests | [[04-Interests/]] | 兴趣爱好 |
| Reference | [[05-Reference/]] | 参考资料 |

## 快速导航

### 最近更新

```dataview
TABLE file.mtime as "更新时间"
FROM "3 Resources"
WHERE file.mtime >= date(today) - dur(7 days)
SORT file.mtime DESC
LIMIT 10
```

### 活跃项目
```dataview
LIST
FROM "1 Projects"
WHERE !completed
SORT file.mtime DESC
LIMIT 10
```

## 信息生命周期

| 阶段 | 描述 | 存放位置 |
|------|------|---------|
| **ephemeral** | 短期任务、临时信息 | `1 Projects/[项目]/tasks.md` |
| **operational** | 项目运行笔记 | `1 Projects/[项目]/` |
| **reference** | 参考资料、素材 | `3 Resources/[主题]/raw/` |
| **evergreen** | 长期知识、Wiki 页面 | `3 Resources/[主题]/wiki/` |

---

*最后更新: 2026-05-27*

