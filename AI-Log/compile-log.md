---
created: 2026-05-26
type: log
purpose: compile
---

# Compile Log

记录 Wiki 知识编译操作的日志。

## 格式说明

每次编译操作记录：
- **时间**: 操作时间戳
- **来源**: raw/ 目录下的源文件
- **产出**: wiki/ 目录下创建/更新的页面
- **概念提取**: 提取的主要概念
- **状态**: success/failed/partial

---

## 2026-05-27

**状态**: success

**子库**: ai-ml (`3 Resources/ai-ml/`)

**源文件** (3):
- `raw/articles/2026 大模型 API 价格对比（5月更新）：40+ 模型一表看清.md`
- `raw/articles/LifeOS × LLM-Wiki 融合系统.md`
- `raw/articles/封神组合！Claude Code+LLM Wiki+Obsidian 一站式打通 AI 知识库.md`

**概念提取** (3):
- LLM-Pricing-Model — LLM 定价模型
- Prompt-Caching — 提示缓存机制
- Model-Routing — 模型路由策略

**实体提取** (6):
- OpenAI — GPT 系列模型
- Anthropic — Claude 系列模型
- DeepSeek — DeepSeek V4 系列
- Google-Gemini — Gemini 系列模型
- Meta-Llama — Llama 开源模型
- Claude-Code — AI 编程 Agent

**产出** (13 文件):
- `wiki/concepts/` — 创建 3 页面
- `wiki/entities/` — 创建 6 页面
- `wiki/sources/` — 创建 3 页面
- `wiki/index.md` — 更新统计
- `wiki/log.md` — 添加编译记录

---

**状态**: success

**子库**: LLM-Tech (`3 Resources/01-Tech/LLM-Tech/`)

**源文件** (7):
- `raw/articles/Hermes-LLM-Wiki-方法论.md`
- `raw/articles/LLM-Wiki-三层架构.md`
- `raw/articles/LLM-Wiki-Ingest流程.md`
- `raw/articles/LLM-Wiki-Query流程.md`
- `raw/articles/LLM-Wiki-Lint流程.md`
- `raw/articles/Hermes-Agent简介.md`
- `raw/articles/LLM基础概念.md`

**概念提取** (6):
- LLM-Wiki — LLM Wiki 方法论核心概念
- Three-Layer-Architecture — 三层架构设计
- Ingest-Workflow — 导入工作流
- Query-Workflow — 查询工作流
- Lint-Workflow — 维护工作流
- LLM-Fundamentals — LLM 基础概念

**实体提取** (5):
- Hermes-Agent — AI Agent 框架
- Obsidian — 知识库 IDE 平台
- IngestAgent — Ingest 参考实现
- QueryAgent — Query 参考实现
- LintAgent — Lint 参考实现

**产出** (14 文件):
- `wiki/concepts/` — 创建 6 页面
- `wiki/entities/` — 创建 5 页面
- `wiki/sources/` — 创建 1 页面
- `wiki/index.md` — 更新统计
- `wiki/log.md` — 添加 ingest 记录

**耗时**: 约 2 分钟

---

## 2026-05-26

系统初始化，等待第一次编译操作...

