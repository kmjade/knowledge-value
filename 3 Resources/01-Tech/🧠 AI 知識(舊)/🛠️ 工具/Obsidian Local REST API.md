---
title: Obsidian Local REST API
status: active
tags: [Obsidian, API, automation, integration]
aliases: [Obsidian Local REST API Plugin]
created: 2026-02-01
modified: 2026-02-01
---

# Obsidian Local REST API

## 定義

# 工作流

## 核心功能

### API 端點
- CRUD 筆記（增刪改查）
- 讀取筆記內容
- 執行命令
- 搜尋和檢索
- 獲取筆記列表

# 方法
- `GET` - 讀取數據
- `POST` - 創建數據
# 更新
- `DELETE` - 刪除數據
# 更新

# 配置

# 配置
```json
{
  "port": 27124,
  "password": "your-password",
  "allowedOrigins": ["http://localhost", "http://127.0.0.1"]
}
```

### 安全建議
- 設置強密碼保護
- 限制允許的來源網網域名稱稱
- 不要暴露到公網
- 定期更換密碼

## API 使用示例

### 獲取所有筆記
```bash
curl -X GET "http://localhost:27124/v1/files/" \
  -H "Authorization: Bearer your-password"
```

### 創建新筆記
```bash
curl -X POST "http://localhost:27124/v1/files/" \
  -H "Authorization: Bearer your-password" \
  -H "Content-Type: application/json" \
  -d '{"filename": "new-note.md", "content": "# 新筆記\n這是新筆記的內容"}'
```

### 搜尋筆記
```bash
curl -X POST "http://localhost:27124/v1/search/simple" \
  -H "Authorization: Bearer your-password" \
  -H "Content-Type: application/json" \
  -d '{"query": "keyword"}'
```

### 執行命令
```bash
curl -X POST "http://localhost:27124/v1/commands" \
  -H "Authorization: Bearer your-password" \
  -H "Content-Type: application/json" \
  -d '{"cmdId": "obsidian-tasks-plugin:toggle-done"}'
```

## 應用場景

# 工作流
- n8n 自動化：RSS → AI 摘要 → Obsidian 筆記
- 腳本自動化：批量處理筆記
- 定時任務：自動生成日報、週報

### 外部整合
- 將其他應用的數據同步到 Obsidian
- 從外部 API 獲取數據並創建筆記
- 與其他生產力工具整合（Notion、Jira 等）

### 數據處理
- 自動生成筆記摘要
- 批量分類和標籤
- 自動生成索引

## 最佳實踐

### 安全性
- 始終使用密碼認證
- 限制 API 訪問範圍
- 使用 HTTPS（如果需要）
- 定期審計 API 使用情況

### 效能優化
- 批量操作而非單次請求
- 使用緩存減少請求次數
- 避免在短時間內發送大量請求
- 處理錯誤和重試邏輯

### 錯誤處理
- 捕獲和處理 API 錯誤
- 實現請求重試機制
- 記錄 API 調用日誌
- 監控 API 效能

## 相關筆記

- [[Obsidian 外掛生態]]
# 工作流
- [[Obsidian 效能優化]]

## 參考資源

- [Local REST API 文檔](https://github.com/obsidianmd/obsidian-local-rest-api)
- [Obsidian API 參考](https://github.com/obsidianmd/obsidian-api)
