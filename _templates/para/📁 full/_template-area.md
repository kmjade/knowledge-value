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

# 資訊
---

# 專案
|------|------|
# 創建
# 更新
| 状态 | [[#active]] [[#inactive]] [[#archived]] |
| 重要性 | [[#high]] [[#medium]] [[#low]] |

# 專案
---
```dataview
TABLE WITHOUT id
# 專案
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

# 記錄
---
# 更新
<% tp.date.now("YYYY-MM-DD") %>
# 記錄

### 待办事项
- [ ] 待办事项 1
- [ ] 待办事项 2

## 定期检查 / Regular Reviews
---
### 月度回顾 / Monthly Review

```dataview
TABLE WITHOUT id
# 更新
  summary as "回顾摘要"
FROM [[{{title}}]]
WHERE contains(file.path, "Reviews/Monthly")
SORT updated DESC
LIMIT 3
```

**本月重点：**

# 關注

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

# 連結
---
# 文檔
- [[Resource 1]]
- [[Resource 2]]

### 参考资料
# 連結

# 筆記
---
# 記錄

# 記錄

### 改进想法 / Improvement Ideas

| 想法 | 优先级 | 状态 |
|------|--------|------|
| 想法 1 | [[#high]] [[#medium]] [[#low]] | [[#todo]] [[#done]] |
| 想法 2 | | |

# 記錄

| 问题 | 发现日期 | 状态 | 解决方案 |
|------|---------|------|---------|
| 问题 1 | | [[#open]] [[#resolved]] | |

---

# 管理
> - 每月回顾一次领域状态
# 專案
> - 保持指标的可追踪性
# 更新
