---
aliases:
  - 可追溯矩阵
  - SRS-09
created: 2026-05-31
version: "1.0"
status: stable
type: project
lifecycle: evergreen
parent: "[[PARA+LLM-Wiki 融合系统需求文档 v1.0]]"
tags:
  - architecture
  - requirements
  - para
  - llm-wiki
---

## 9. 可追溯矩阵

### 9.1 需求 → 架构组件追溯

| 需求 ID | 需求描述 | 对应架构组件 | 实施状态 |
|----------|----------|--------------|----------|
| FR-001 | 网页剪藏 | `0 Inbox/Clippings/` + Web Clipper 插件 | ✅ |
| FR-002 | 手动笔记 | `0 Inbox/1-输入/` | ✅ |
| FR-010 | 扫描 Inbox | `/triage` Skill | ✅ |
| FR-011 | 时效性分类 | `/triage` 分析引擎 | ✅ |
| FR-012 | 主题识别 | `/triage` 路由决策 | ✅ |
| FR-013 | 路由执行 | `/triage` 执行引擎 | ✅ |
| FR-020 | 源文件扫描 | `/wiki-compile` 扫描模块 | ✅ |
| FR-021 | 概念提取 | `/wiki-compile` 提取引擎 | ✅ |
| FR-022 | 实体提取 | `/wiki-compile` 提取引擎 | ✅ |
| FR-025 | 来源追溯 | wiki/ 页面标准格式 | ✅ |
| FR-030 | 状态概览 | `/context` Skill | ✅ |
| FR-040 | 目录检查 | `/lint` 检查模块 | ✅ |
| FR-041 | 断链检测 | `/lint` 检查模块 | ✅ |
| FR-050 | Wiki 索引 | `wiki/index.md` | ⚠️ 部分 |
| FR-052 | MOC 页面 | `00-MOCs/` | ⚠️ 部分 |
| NFR-020 | AI 权限隔离 | `raw/` 只读规则（CLAUDE.md 规则 1） | ✅ |
| NFR-021 | 敏感信息保护 | 禁止行为（CLAUDE.md 规则 4） | ✅ |
| NFR-033 | 日志可审计 | AI-Log/ 日志系统 | ✅ |

### 9.2 需求 → 验收追溯

（参见第 8 章验收标准中的 VA-xx 编号，每个验收项对应上述功能/非功能需求）
