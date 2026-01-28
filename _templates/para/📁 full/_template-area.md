---
title: "{{title}}"
aliases:
  - 领域
para: areas
created: <% tp.date.now("YYYY-MM-DD") %>
updated: <% tp.date.now("YYYY-MM-DD") %>
status: active
tags:
  - area
---

> [!note] 领域 / Area
> 没有截止日期的长期责任领域

## 领域描述 / Area Description
---
> 描述这个责任领域，说明其范围、重要性和长期目标

> [!info] Area 特点
> - 长期持续性：没有明确的结束日期
> - 需要维护：需要定期投入时间和精力
> - 标准导向：维持一定的标准或水平
> - 可衡量性：应该能够评估其健康状态

## 基本信息 / Basic Information
---

| 项目 | 内容 |
|------|------|
| 创建日期 | <% tp.date.now("YYYY-MM-DD") %> |
| 最后更新 | <% tp.date.now("YYYY-MM-DD") %> |
| 状态 | [[#active]] [[#inactive]] [[#archived]] |
| 重要性 | [[#high]] [[#medium]] [[#low]] |

## 关联项目 / Related Projects
---
```dataview
TABLE WITHOUT id
  file.link as "项目",
  status as "状态",
  due as "截止日期"
FROM [[{{title}}]]
WHERE para = "projects"
SORT due ASC
```

- [[Project 1]]
- [[Project 2]]

## 维护目标 / Maintenance Goals

> 定义该领域需要维持的标准或目标
---

| 目标 | 当前状态 | 目标状态 | 目标日期 |
|------|---------|---------|---------|
| 目标 1 | | | YYYY-MM-DD |
| 目标 2 | | | YYYY-MM-DD |
| 目标 3 | | | YYYY-MM-DD |

## 关键指标 / Key Metrics

> 用于衡量该领域健康状态的关键指标
---

| 指标 | 目标值 | 当前值 | 状态 |
|------|--------|--------|------|
| 指标 1 | | | |
| 指标 2 | | | |

## 当前状态 / Current Status

> 记录当前该领域的状态和近期变化
---
### 近期更新
<% tp.date.now("YYYY-MM-DD") %>
> 记录近期的重要更新或变化

### 待办事项
- [ ] 待办事项 1
- [ ] 待办事项 2

## 定期检查 / Regular Reviews
---
### 月度回顾 / Monthly Review

```dataview
TABLE WITHOUT id
  updated as "更新日期",
  summary as "回顾摘要"
FROM [[{{title}}]]
WHERE contains(file.path, "Reviews/Monthly")
SORT updated DESC
LIMIT 3
```

**本月重点：**

> 本月需要关注的重点事项

**完成情况：**

> 上月目标的完成情况

### 季度规划 / Quarterly Planning

| 季度 | 关键目标 | 预期结果 | 完成日期 |
|------|---------|---------|---------|
| Q1 | | | |
| Q2 | | | |
| Q3 | | | |
| Q4 | | | |

### 年度总结 / Annual Summary

> 年度总结和下一年规划

**本年度成就：**

> 列出本年度在该领域取得的主要成就

**待改进项：**

> 需要在下一年改进的方面

**下一年目标：**

> 为下一年设定的目标

## 资源链接 / Resources
---
### 相关文档
- [[Resource 1]]
- [[Resource 2]]

### 参考资料
- [链接](url)

## 笔记与记录 / Notes
---
### 持续记录的重要信息

> 记录该领域持续维护过程中的重要信息

### 改进想法 / Improvement Ideas

| 想法 | 优先级 | 状态 |
|------|--------|------|
| 想法 1 | [[#high]] [[#medium]] [[#low]] | [[#todo]] [[#done]] |
| 想法 2 | | |

### 问题记录 / Issue Log

| 问题 | 发现日期 | 状态 | 解决方案 |
|------|---------|------|---------|
| 问题 1 | | [[#open]] [[#resolved]] | |

---

> [!tip] Area 管理提示
> - 每月回顾一次领域状态
> - 确保有持续的项目在进行
> - 保持指标的可追踪性
> - 定期更新目标状态
