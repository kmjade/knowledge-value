---
# AI 知識
aliases:
  - AI Knowledge Base Area
  - AI Knowledge Area
para: areas
created: 2026-01-30
updated: 2026-01-30
status: active
importance: high
tags:
  - area
  - ai
  - knowledge-base
  - llm
  - agent
  - prompt-engineering
review-frequency: monthly
---

# AI 知識

# AI 知識

---

## 领域描述 / Area Description

### 范围

# 知識

# 部署
# 工作流
# 方法
# 配置
# 部署
- **行业动态**: AI 行业新闻、研究论文、技术趋势

### Area 特点

> [!info] Area 特点
> - **长期持续性**: AI 技术快速发展，需要持续跟踪
# 學習
# 知識
# 專案

---

# 資訊

# 專案
|------|------|
# 創建
# 更新
| 状态 | `[[#active]]` |
| 重要性 | `[[#high]]` |
| 回顾频率 | 每月 |

---

# 專案

```dataview
TABLE WITHOUT id
# 專案
  status as "状态",
# 創建
FROM [[]]
WHERE para = "projects"
SORT created DESC
```

---

## 维护目标 / Maintenance Goals

| 目标 | 当前状态 | 目标状态 | 目标日期 |
|------|---------|---------|---------|
# 筆記
| 掌握至少 2 个本地模型 | Ollama | 3+ 模型 | 2026-03 |
# 專案
| 建立完整的 Prompt 模板库 | 进行中 | 20+ 模板 | 2026-03 |
| 定期参与 AI 社区讨论 | 偶尔 | 每周 | 持续 |
# 筆記

---

## 关键指标 / Key Metrics

```dataviewjs
# 筆記
const aiResources = dv.pages('"3 Resources/01-Tech"').where(p =>
  p.file.path.includes('AI') ||
  p.file.path.includes('OpenCode') ||
  (Array.isArray(p.tags) && p.tags.some(t => ['AI', 'LLM', 'agent', 'prompt-engineering'].includes(t)))
);

const aiInbox = dv.pages('"0 Inbox"').where(p =>
  p.file.name.toLowerCase().includes('ai') ||
  p.file.name.toLowerCase().includes('llm') ||
  p.file.name.toLowerCase().includes('ollama')
);

dv.table(['指标', '当前值'], [
# 筆記
# 筆記
  ['总计', aiResources.length + aiInbox.length]
]);
```

| 指标 | 目标值 | 当前值 | 状态 |
|------|--------|--------|------|
# 筆記
# 專案
| Prompt 模板数 | 20+ | 5 | 📈 进行中 |
| 本地模型数 | 3+ | 1 | 📈 进行中 |
# 筆記
# 知識庫

---

## 当前状态 / Current Status

# 更新

**2026-01-30**
# AI 知識

### 本周重点

# 筆記
2. 完善 Prompt 模板库
# 配置

### 待办事项
# 筆記
# 知識
- [ ] 建立月度回顾模板
# 學習

---

## 定期检查 / Regular Reviews

### 月度回顾 / Monthly Review

**本月重点：**
# 學習

**完成情况：**
# 分析

**下月计划：**
# 學習

### 季度规划 / Quarterly Planning

| 季度 | 关键目标 | 预期结果 | 完成日期 |
|------|---------|---------|---------|
| Q1 2026 | 掌握基础 LLM 使用 | 能熟练使用 3+ 模型 | 2026-03-31 |
# 專案
# 開發
# AI 知識

### 年度总结 / Annual Summary

**本年度成就：**
# 記錄

**待改进项：**
> 需要在下一年改进的方面

**下一年目标：**
> 为下一年设定的目标

---

# 連結

# 文檔

# AI 知識
- [[3 Resources/01-Tech/AI-ML/Prompt模板.md]] - Prompt 模板库
# 指南

# 文檔
# 教程
# 筆記
# 指南

# 學習
# 指南
# 知識

---

## 子主题组织 / Subtopics

```dataview
# 筆記
WHERE contains(file.path, this.file.folder) AND file.name != this.file.name
FLATTEN subtopic
GROUP BY subtopic
SORT subtopic
```

---

# 筆記

### 改进想法 / Improvement Ideas

| 想法 | 优先级 | 状态 |
|------|--------|------|
# 學習
| 建立 AI 技术指标追踪表 | `[[#medium]]` | `[[#todo]]` |
# 創建
# 分享

# 記錄

| 问题 | 发现日期 | 状态 | 解决方案 |
|------|---------|------|---------|
| 本地模型内存占用高 | 2026-01-29 | `[[#open]]` | 考虑使用量化模型 |
# 設計

# 學習

#### 阶段一：基础入门 (进行中)
- [x] 了解 LLM 基本概念
# 配置
- [ ] 掌握基础 Prompt 技巧
# 專案

#### 阶段二：进阶实践
- [ ] 深入理解 Transformer 架构
- [ ] 掌握 RAG (检索增强生成)
# 開發
# 優化

#### 阶段三：深度应用
- [ ] 构建企业级 AI 解决方案
- [ ] 研究 Fine-tuning 技术
# 專案
# 分享

---

# 工作流

# 知識

# 新增
# 分類
# 目錄
# 筆記

```mermaid
graph LR
# 新增
# 分類
    C -->|新闻| D[3 Resources/🧠 AI/新闻/]
    C -->|技术| E[3 Resources/🧠 AI/技术/]
    C -->|工具| F[3 Resources/🧠 AI/工具/]
    C -->|实践| G[1 Projects/]
    D & E & F & G --> H[关联到本Area]
```

# 專案

# 專案
2. **技术选型**: 选择合适的模型和工具
# 開發
# 記錄

### 快速操作

# 筆記
# 搜尋
# 檔案
# 筆記

---

# 筆記

```dataview
TABLE WITHOUT id
# 筆記
# 標籤
FROM [[]]
WHERE !contains(file.folder, this.file.folder)
SORT file.mtime DESC
LIMIT 20
```

---

# 管理
# 更新
# 分類
# 學習
# 系統
# 更新
