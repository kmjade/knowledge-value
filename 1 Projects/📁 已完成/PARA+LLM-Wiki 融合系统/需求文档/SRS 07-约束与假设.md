---
aliases:
  - 约束与假设
  - SRS-07
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

## 7. 约束与假设

### 7.1 技术约束

| ID | 约束 | 说明 |
|----|------|------|
| **TC-01** | 纯 Markdown 存储 | 不使用数据库，不使用 JSON/YAML 元数据文件（除 Frontmatter 外） |
| **TC-02** | 单 Vault 架构 | 所有内容在同一 Obsidian Vault，不跨 Vault 引用 |
| **TC-03** | Git 版本控制 | 必须保持 Git 兼容性，避免二进制文件 |
| **TC-04** | Claude Code 依赖 | AI 功能完全依赖 Claude Code，不支持其他 AI 引擎 |
| **TC-05** | Obsidian 兼容 | 不使用 Obsidian 不支持的 Markdown 语法 |
| **TC-06** | 文件路径长度 | Windows 路径限制 260 字符，文件名 ≤ 255 字符 |

### 7.2 业务约束

| ID | 约束 | 说明 |
|----|------|------|
| **BC-01** | 单用户系统 | 不支持多用户协作，无需权限系统 |
| **BC-02** | 中文优先 | 用户界面和输出以中文为主 |
| **BC-03** | 无实时协作 | 同一时刻只有一个 Claude Code 会话操作 Vault |
| **BC-04** | 不处理媒体文件 | 图片、视频等仅存储引用，不进行内容分析 |

### 7.3 假设

| ID | 假设 | 影响 |
|----|------|------|
| **AS-01** | 用户使用 Obsidian 作为主编辑器 | 影响：文件格式和插件依赖 |
| **AS-02** | Claude Code 的 session 长度足够完成编译任务 | 影响：大型编译可能需要分批 |
| **AS-03** | Git 远程仓库可用且已配置 | 影响：同步功能 |
| **AS-04** | 用户理解基本的 Markdown 和 Obsidian 操作 | 影响：错误恢复 |
| **AS-05** | raw/ 内容质量由人类负责 | 影响：wiki/ 编译质量依赖 raw/ 质量 |
