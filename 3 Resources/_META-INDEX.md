---
aliases:
  - 知识图谱入口
  - Wiki Index
created: 2026-05-26
---

# META-INDEX

全局知识导航入口，连接所有 Wiki 子库。

## Wiki 子库

| 子库 | 路径 | 状态 | 描述 |
|------|------|------|------|
| AI/ML | [[ai-ml/CLAUDE.md\|ai-ml]] | 🟢 活跃 | AI 与机器学习知识库 |
| People | [[people/CLAUDE.md\|people]] | 🟡 规划中 | 人物 CRM 与关系管理 |
| Finance | [[finance/CLAUDE.md\|finance]] | 🟡 规划中 | 财务理财知识 |
| Productivity | [[productivity/CLAUDE.md\|productivity]] | 🟡 规划中 | 生产力工具与方法 |

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
```

## 信息生命周期

| 阶段 | 描述 | 存放位置 |
|------|------|---------|
| **ephemeral** | 短期任务、临时信息 | `1 Projects/[项目]/tasks.md` |
| **operational** | 项目运行笔记 | `1 Projects/[项目]/` |
| **reference** | 参考资料、素材 | `3 Resources/[主题]/raw/` |
| **evergreen** | 长期知识、Wiki 页面 | `3 Resources/[主题]/wiki/` |

---

*最后更新: 2026-05-26*

