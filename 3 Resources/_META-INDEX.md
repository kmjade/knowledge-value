---
aliases:
  - 知识图谱入口
  - Wiki Index
  - Global Navigation
created: 2026-05-26
updated: 2026-06-01
type: meta-index
---

# META-INDEX — 全局知识导航

> 连接所有 DDC Wiki 子库的全局入口。最后更新: 2026-05-31

---

## Wiki 子库总览

| DDC | 子库 | 状态 | MOC | Wiki 索引 | 编译日志 |
|:---:|------|:----:|-----|:---------:|:--------:|
| 000 | Knowledge-Systems | 🟢 | [[000 Knowledge/000 Knowledge.md\|MOC]] | [[000 Knowledge/wiki/index\|索引]] | [[000 Knowledge/wiki/log\|日志]] |
| 100 | Philosophy & Psychology | 🟢 | [[100 Philosophy & Psychology/00-MOCs/100-知识地图\|MOC]] | [[100 Philosophy & Psychology/wiki/index\|索引]] | [[100 Philosophy & Psychology/wiki/log\|日志]] |
| 120 | Epistemology | 🟢 | [[4 Archives/by-type/Resources/epistemology/CLAUDE\|Schema]] | [[4 Archives/by-type/Resources/epistemology/wiki/index\|索引]] | [[4 Archives/by-type/Resources/epistemology/wiki/log\|日志]] |
| 200 | Religion & Theology | 🟡 | [[200 Religion & Theology/00-MOCs/200-知识地图\|MOC]] | [[200 Religion & Theology/wiki/index\|索引]] | [[200 Religion & Theology/wiki/log\|日志]] |
| 300 | Social Sciences | 🟡 | [[300 Social Sciences/00-MOCs/300-知识地图\|MOC]] | [[300 Social Sciences/wiki/index\|索引]] | [[300 Social Sciences/wiki/log\|日志]] |
| 400 | Language | 🟢 | [[400 Language/00-MOCs/400-知识地图\|MOC]] | [[400 Language/wiki/index\|索引]] | [[400 Language/wiki/log\|日志]] |
| 500 | Natural Sciences | 🟢 | [[500 Natural Sciences/00-MOCs/500-知识地图\|MOC]] | [[500 Natural Sciences/wiki/index\|索引]] | [[500 Natural Sciences/wiki/log\|日志]] |
| 600 | Applied Sciences | 🟢 | [[600 Applied Sciences/600 Applied Sciences.md\|MOC]] | [[600 Applied Sciences/wiki/index\|索引]] | [[600 Applied Sciences/wiki/log\|日志]] |
| 700 | Arts | 🟢 | [[700 Arts/00-MOCs/700-知识地图\|MOC]] | [[700 Arts/wiki/index\|索引]] | [[700 Arts/wiki/log\|日志]] |
| 800 | Literature | 🟢 | [[800 Literature/00-MOCs/800-知识地图\|MOC]] | [[800 Literature/wiki/index\|索引]] | [[800 Literature/wiki/log\|日志]] |
| 900 | History & Geography | 🟡 | [[900 History & Geography/00-MOCs/900-知识地图\|MOC]] | [[900 History & Geography/wiki/index\|索引]] | [[900 History & Geography/wiki/log\|日志]] |
| — | People CRM | 🟢 | [[people/people\|MOC]] | [[people/wiki/index\|索引]] | [[people/wiki/log\|日志]] |
| — | Generative Art | 🟢 | [[generative-art/CLAUDE\|Schema]] | [[generative-art/wiki/index\|索引]] | [[generative-art/wiki/log\|日志]] |

---

## 跨库连接矩阵 (FR-051)

| | 000 | 100 | 120 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 |
|:-:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **000** | — | 🟢 | 🟢 | — | — | 🟢 | — | 🟢 | — | — | — |
| **100** | 🟢 | — | 🟢 | 🟢 | — | — | — | — | — | — | — |
| **200** | — | 🟢 | — | — | — | — | — | — | — | — | — |
| **300** | 🟢 | — | — | — | — | — | — | 🟢 | — | — | — |
| **400** | 🟢 | — | — | — | — | — | — | — | — | — | — |
| **500** | 🟢 | — | — | — | — | — | — | 🟢 | — | — | — |
| **600** | 🟢 | — | — | — | — | — | 🟢 | — | — | — | — |
| **700** | — | — | — | — | — | — | — | — | — | 🟢 | — |
| **800** | — | — | — | — | — | — | — | — | 🟢 | — | 🟢 |
| **900** | — | — | — | — | — | — | — | — | — | 🟢 | — |

### 连接说明

| 连接 | 关系 |
|------|------|
| 000 ↔ 100 | 知识组织 ↔ 哲学基础 (认识论) |
| 000 ↔ 120 | 知识系统 ↔ Epistemology (三层模型) |
| 000 ↔ 400 | 知识表示 ↔ 语言学 |
| 000 ↔ 600 | 知识系统 ↔ 计算机科学 |
| 100 ↔ 200 | 哲学 ↔ 宗教哲学 |
| 500 → 600 | 自然科学基础 → 应用科学 |
| 700 ↔ 800 | 艺术 ↔ 文学 |
| 800 ↔ 900 | 文学 ↔ 历史语境 |

---

## 基础设施状态

| 组件 | 覆盖率 |
|------|:------:|
| `wiki/` 目录 | 13/13 |
| `wiki/log.md` | 13/13 |
| `wiki/index.md` | 13/13 |
| `00-MOCs/` | 10/13 |

---

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

---

> 📎 关联:
> - [[开发工作清单]] — 实施进度
> - [[PARA+LLM-Wiki 融合系统需求文档 v1.0]] — SRS
> - [[CLAUDE.md]] — 系统规则
