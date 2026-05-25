---
tags: [entity, tool]
type: entity
---

# n8n

開源的工作流自動化平台，支持可視化拖拽構建自動化流程。

---

## 核心特點

- **可視化編輯器**：拖拽節點構建工作流
- **400+ 整合**：支持主流應用和服務
- **自託管**：可部署在自己的服務器
- **代碼擴展**：支持 JavaScript/Python 自定義邏輯

---

## 與 Claude Code 的協作

在 [[two-layer-automation]] 模式中：

| 層級 | 角色 |
|------|------|
| 第一層 | n8n 執行工作流（7x24 運行） |
| 第二層 | [[claude-code]] 搭建 n8n 工作流 |

---

## n8n MCP Server

通過 [[mcp-protocol]]，Claude Code 可以：
- 直接調用 n8n API
- 創建和修改工作流
- 配置節點和觸發器
- 運行測試

---

## 相關鏈接

- [[claude-code]]
- [[two-layer-automation]]
- [[mcp-protocol]]
