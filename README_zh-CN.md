---
language: zh-cn
---

# 管理

![PARA Method](https://img.shields.io/badge/PARA-Method-blue?style=for-the-badge)
![Obsidian](https://img.shields.io/badge/Obsidian-📎-7C3AED?style=for-the-badge)
![Claude Code](https://img.shields.io/badge/Claude-Code-🤖-10B981?style=for-the-badge)
![License](https://img.shields.io/badge/License-Apache--2.0-FF6B6B?style=for-the-badge)

 [English](README.md) | [[README_zh-CN|简体中文]] | [[README_zh-TW| 繁体中文]]
 
---
## 概述

# 知識

# 管理
---

# 目錄

- [特性亮点](#-特性亮点)
# 系統
# 方法
# 工作流
- [Claude Code 命令](#-claude-code-命令)
- [最佳实践](#-最佳实践)
# 文檔
# 指南
- [常见问题](#-常见问题)

---

## 特性亮点

| 特性 | 说明 | 状态 |
|------|------|------|
# 筆記
# 資訊
# 知識
# 管理
# 系統
| 🌐 **多语言支持** | 简体中文/繁体中文/English | ✅ 已启用 |

---

# 系統

```
AI-value/
# 專案
│   └── 📥 00_InBox/           #   快速捕获 / Inbox
# 專案
├── 📁 2 Areas/                  # 🌳 长期责任领域
├── 📁 3 Resources/              # 📚 持续感兴趣的主题
├── 📁 4 Archives/               # 🗃️ 已完成或非活跃内容
# 筆記
# 筆記
# 筆記
# 筆記
# 筆記
├── 📁 _Template/                # 📋 模板库
# 系統
# 配置
```

---

# 方法

# 檔案
|------|--------|------|------|
# 專案
# 管理
| 🔵 **Resources** | `3 Resources/` | 持续感兴趣的主题 | "Obsidian技巧", "AI资讯", "生产力技巧", "烹饪食谱", "市场调研" |
# 專案

# 分類

```
❓ 这件事有明确的目标和截止日期吗？
# 專案
  └─ ❌ 否 → 继续

❓ 这件事需要持续维护吗？
  └─ ✅ 是 → Areas（长期责任）
  └─ ❌ 否 → 继续

❓ 这件事我感兴趣但不需要立即行动？
  └─ ✅ 是 → Resources（感兴趣话题）
  └─ ❌ 否 → 归档
```

---

# 工作流

# 工作流

```mermaid
flowchart LR
# 整理
    B --> C[👀 复查]
    C --> D[📦 归档]

# 新增
# 整理
    C -.-> |"/para-库概览"| C1[审查状态]
    D -.-> |"移动到"| D1[4 Archives/]
```

| 步骤 | 操作 | 命令 |
|------|------|------|
# 新增
# 分類
| 3️⃣ 复查 | 审查库状态 | `/para-库概览` |
| 4️⃣ 归档 | 移至已完成 | 手动移动 |

# 工作流

```mermaid
flowchart LR
    A[💡 闪念] --> B[📌 处理]
# 連結
    C --> D[📚 发展]
    D --> E[📁 结构化]

    A -.-> |"5 Zettels/💡 fleeting/"| A1[捕获灵感]
# 筆記
# 連接
# 新增
# 創建
```

| 步骤 | 操作 | 位置 |
|------|------|------|
# 創建
# 筆記
# 連結
# 筆記
# 筆記

---

## Claude Code 命令

# 管理

| 命令 | 功能 | 说明 |
|------|------|------|
# 檔案
# 整理
# 檔案

### 辅助命令

| 命令 | 功能 | 说明 |
|------|------|------|
# 搜尋
# 檔案
# 管理
| `/导出: 周报` | 📅 导出周报 | 从日报生成周报 |
| `/导出: 月报` | 📆 导出月报 | 从周报生成月报 |

### 快速操作

```bash
# 筆記
/search Obsidian

# 查看
/para-库概览

# 整理
# 整理

# 自动选择技能
/obsidian
```

---

## 最佳实践

### 使用 InBox

- 📝 **快速捕获** - 不要担心格式，先记下来
# 整理
- 🧹 **清空原则** - 保持 InBox 最小化

# 分類

- 🎯 **有截止日期** → Projects
- 🌳 **长期责任** → Areas
- 📚 **感兴趣话题** → Resources
- 📦 **已完成** → Archives

### Zettelkasten 原则

# 筆記
- 🔢 **独特 ID** - 使用 `YYYYMMDD-XXXX`
# 連結
- 📦 **自包含** - 独立可理解

# 檔案

- 📛 **描述性名称** - 清晰描述内容
- ␣ **使用空格** - Obsidian wikilinks 支持
- 🚫 **避免特殊字符** - `: * ? " < > | /`
- 📋 **模板前缀** - `_template-`

---

# 文檔

# 文檔

# 文檔
| --------------------------------------------------------- | ---------------- | --- |
| [📘 CLAUDE.md](CLAUDE.md)                                 | Claude Code 核心规则 | ⭐⭐⭐ |
# 方法
| [📎 Obsidian 语法](.claude/skills/obsidian-syntax/SKILL.md) | 语法参考             | ⭐⭐⭐ |

# 文檔

| Skill | 说明 |
|-------|------|
# 工作流
| [obsidian-syntax](.claude/skills/obsidian-syntax/SKILL.md) | Wikilinks、提示块、属性 |
| [repo-context](.claude/skills/repo-context/SKILL.md) | 仓库结构、路径、Git |
# 檔案
# 工作流
# 筆記

---

# 指南

欢迎贡献！您可以：

- 📝 **提交改进建议** - 报告问题或功能请求
# 文檔
- 💬 **参与讨论** - 在 Issues 中交流

---

## 常见问题

<details>
<summary>如何开始使用？</summary>

1. 打开 Obsidian
2. 导入 AI-value 仓库
3. 开始在 `0 Personals/📥 00_InBox/` 中捕获想法
# 整理

</details>

<details>
<summary>PARA 和 Zettelkasten 有什么区别？</summary>

# 資訊
# 知識

两者可以结合使用！

</details>

<details>
# 筆記

1. 在收件箱捕获想法
# 分類
# 檔案

</details>

<details>
<summary>支持多语言吗？</summary>

# 系統
- 简体中文（默认）
- 繁体中文
- English

</details>

---

## 联系方式

# 連結
|------|------|
| 🐙 **GitHub** | [AI-value](https://github.com/kmjade/AI-value.git) |
| 🐛 **Issues** | [报告问题](https://github.com/kmjade/AI-value/issues) |

---

## 许可证

<div align="center">

Apache License 2.0

</div>

---

# 檔案

# 管理

---

<div align="center">

Made with ❤️ by AI-value Team

</div>
