---
# 知識庫
date: 2026-02-01
type: index
tags: [AI, index, knowledge-base]
---

# AI 知識

> [!info] 說明
# 知識庫

---

# 知識庫

```
# AI 知識
# 知識
# 分析
├── 📚 研究/           - 论文、研究報告（待补充）
├── 🔧 技術/           - 技術實現与架構文檔
# 指南
└── 📖 學習/           - 學習路徑与資源（待补充）
```

---

# 更新

| 日期 | 筆記 | 类型 | 狀態 |
|------|------|------|------|
| 2026-02-01 | [[Ollama + Clawdbot 免費本地 AI 智能体]] | 技術文檔 | ✅ |
# 教程
| 2026-01-30 | [[2026-01-30-Ollama一个命令運行Clawdbot，免費又方便！]] | 技術文檔 | ✅ |
# 分析

---

## 🤖 基礎概念

# 知識

| 檔案 | 說明 |
|------|------|
# AI 知識

---

## 📰 新聞与動態

# 分析

| 标题 | 日期 | 影响等级 |
|------|------|----------|
# 分析

> [!summary] 核心洞察
> Apple 選擇 Google Gemini 而非 OpenAI，揭示企业 AI 采购中數據隱私、供应商依赖和战略自主性的關鍵考量。

---

## 📚 研究与论文

学术论文、研究報告（待补充）。

> [!todo] 待完善
> - 论文收集
# 整理

---

## 🔧 技術文檔

AI 技術實現、架構設計和工程實踐。

### 智能体与企业 AI

| 檔案 | 描述 |
|------|------|
# 教程
# 指南
# 指南
| [[🔧 技術/2026-01-29-通用智能体 + MCP Servers + Skills 構建企业智能体落地新范式]] | 企业智能体架構 |

---

# 指南

# 指南

### Claude-Code

| 檔案 | 描述 |
|------|------|
# 教程
# 指南

### ClawBot

| 檔案 | 描述 |
|------|------|
# 指南
# 指南
# 指南
| [[🛠️ 工具/ClawBot/自動化場景案例]] | 自動化應用程式案例 |
| [[🛠️ 工具/ClawBot/外掛安全規範]] | 安全規範 |

### Obsidian + AI

| 檔案 | 描述 |
|------|------|
# 管理
# 指南
| [[🛠️ 工具/Obsidian/Articles/Obsidian 终极玩法：打造你的 AI 指挥中心 (Smart Composer + MCP)]] | AI 指挥中心 |
| [[🛠️ 工具/Obsidian/Articles/Obsidian+AI=让所有app听你指挥]] | 應用程式整合 |

### OpenCode

| 檔案 | 描述 |
|------|------|
# 教程
| [[🛠️ 工具/OpenCode/2026-01-29-玩转 OpenCode(二)：Agent Skills 深度解析——怎么写SKILL,怎么調用SKILL？]] | Skills 解析 |
| [[🛠️ 工具/OpenCode/2026-01-29-OpenCode 使用本地模型]] | 本地模型整合 |

### 其他工具

| 檔案 | 描述 |
|------|------|
# 指南

---

## 📖 學習資源

學習路徑和資源（待补充）。

---

## 🏷️ 主題分類

### 按技術领域

| 標籤 | 說明 |
|------|------|
| #agent | AI 智能体 |
| #local-llm | 本地大语言模型 |
# 管理
# 工作流

### 按工具

| 工具 | 描述 |
|------|------|
| #Clawdbot | AI 智能体框架 |
| #Ollama | 本地 LLM 平台 |
| #Claude-Code | Claude CLI 工具 |
# 管理
| #OpenCode | 智能 Agent 開發框架 |

---

## 🚀 快速导航

### 新手入门

# 部署
# 指南
# 管理

### 企业應用程式

# 分析
# 教程
3. [[🔧 技術/2026-01-29-通用智能体 + MCP Servers + Skills 構建企业智能体落地新范式]] - 企业智能体架構

### 工具開發

# 指南
2. [[🛠️ 工具/OpenCode/2026-01-29-玩转 OpenCode(二)：Agent Skills 深度解析]] - Agent Skills 開發
3. [[🛠️ 工具/ClawBot/效能優化實踐]] - 效能優化實踐

---

# 知識庫

```dataviewjs
# AI 知識

const counts = {
  "基礎概念": aiPages.where(p => p.file.folder.includes('基礎概念')).length,
  "新聞動態": aiPages.where(p => p.file.folder.includes('新聞')).length,
  "技術研究": aiPages.where(p => p.file.folder.includes('研究')).length,
  "技術文檔": aiPages.where(p => p.file.folder.includes('技術')).length,
# 指南
  "學習資源": aiPages.where(p => p.file.folder.includes('學習')).length
};

dv.table(['类别', '数量'], Object.entries(counts).map(([k, v]) => [k, v.toString()]));
dv.paragraph(`**总计**: ${aiPages.length} 篇筆記`);
```

---

## 🔗 相關資源

# 管理

# 管理
# 管理
# 管理

### 專案相關

- [[1 Projects/02-Work/Claudian]] - Claudian 專案
# 知識

---

## 📌 快速操作

### 新增新內容

1. **捕获新聞**: 新增到 `0 Personals/📥 00_InBox/`
# 分析
3. **技術文檔**: 儲存到 `🔧 技術/`
4. **工具评测**: 儲存到 `🛠️ 工具/` 对应子目錄

### 搜尋內容

- 使用 `/search` 命令搜尋
- 或使用 Obsidian 全局搜尋

---

# 更新
