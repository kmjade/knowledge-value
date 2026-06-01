---
tags: [entity, tool]
type: entity
---

# Claude Code

Anthropic 出品的命令行 AI 助手。在終端裡用自然語言交互，能寫代碼、操作文件、調 API、安裝依賴、運行腳本。

---

## 核心特點

- 不是聊天機器人，是能**直接執行操作**的 AI
- 通過 [[mcp-protocol]] 可連接外部工具（如 [[n8n MCP Server]]）
- 支持 [[skills-files|Skills]] 文件（.md），讀取後理解用戶的業務環境和習慣
- 命令行界面，所有操作通過終端完成

---

## 在工作流場景中的角色

| 角色 | 說明 |
|------|------|
| 傳統 AI（ChatGPT、Gemini） | **顧問** — 告訴你怎麼做，操作還是你自己來 |
| Claude Code | **操盤手** — 直接上手建工作流、改參數、跑測試 |

與 [[n8n]] 配合構成 [[two-layer-automation]]：
- Claude Code 負責搭建（需要動腦子的部分）
- n8n 負責執行（固定流程的部分）

---

## 實戰案例

| 案例 | 說明 |
|------|------|
| **搭建 n8n 工作流** | 用自然語言描述需求，直接調 n8n API 創建工作流、配節點、測試 |
| **競品分析** | 配合 [[agent-browser]] 實時抓取競品網頁信息，配合分析 Skill 生成結構化報告，5 個競品從 2 天壓縮到 2 小時 |
| **產品圖批量生成** | 讀取飛書表格 → 調 AI 生圖 → 自動裁剪 → 回寫，成本降低 99% |

---

## 來源

- [[source-claude-code-n8n-workflow]]
- [[source-competitive-analysis-skill]]
