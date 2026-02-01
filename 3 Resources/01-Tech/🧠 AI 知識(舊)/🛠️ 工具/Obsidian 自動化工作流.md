---
# 工作流
status: active
tags: [Obsidian, automation, workflow]
aliases: [Obsidian Automation Workflows]
created: 2026-02-01
modified: 2026-02-01
---

# 工作流

## 定義

# 工作流

## 核心工具

### 1. n8n 自動化
# 工作流

**常見場景**:
- RSS → AI 摘要 → Obsidian 筆記
- 郵件 → 分類 → 對應檔案夾
- Webhook → 格式化 → 筆記創建

# 指南
# 指南

### 2. Claude Code 整合
# 分析

# 工作流
```
# 分析
```

# 指南
# 指南

### 3. Local REST API
詳見：[[Obsidian Local REST API]]

**用途**: 通過 HTTP API 操作筆記

**應用場景**:
- 批量處理筆記
- 自動生成摘要
- 自動分類和標籤
- 自動生成索引

## 自動化場景

### 內容自動化

#### RSS 自動摘要
```yaml
# 更新
處理:
  1. 獲取新文章
  2. AI 生成摘要
  3. 創建 Obsidian 筆記
  4. 新增標籤和分類
輸出: 標準化的閱讀筆記
```

#### 郵件自動歸檔
```yaml
觸發: 新郵件到達
處理:
# 分析
  2. 提取關鍵資訊
  3. 創建對應筆記
  4. 連接到相關項目
輸出: 結構化的郵件記錄
```

#### 智能標籤
```yaml
觸發: 新筆記創建
處理:
# 分析
  2. 識別關鍵詞
  3. 自動新增標籤
  4. 建議相關連結
輸出: 標籤化的筆記
```

### 任務自動化

#### 任務自動創建
```yaml
觸發: 項目筆記創建
處理:
  1. 創建標準任務列表
  2. 設置截止日期
  3. 新增優先級
  4. 連接到看板視圖
輸出: 完整的任務結構
```

#### 進度自動追蹤
```yaml
# 更新
處理:
# 更新
  2. 計算完成百分比
# 更新
  4. 發送通知
輸出: 實時進度報告
```

### 數據自動化

#### 自動生成索引
```yaml
觸發: 定時（每週）
處理:
  1. 掃描所有筆記
# 整理
  3. 生成索引筆記
# 更新
輸出: 完整的知識庫索引
```

#### 統計報告
```yaml
觸發: 定時（每月）
處理:
  1. 統計筆記數量
# 分析
  3. 計算學習進度
  4. 生成報告筆記
輸出: 月度知識庫報告
```

## 實現方式

### Templater 腳本
詳見：[[Obsidian Templater 外掛]]

**示例: 自動生成日期**
```javascript
<%*
let today = moment().format("YYYY-MM-DD");
let weekAgo = moment().subtract(7, "days").format("YYYY-MM-DD");

tR += `# 週報 (${today})\n`;
tR += `## 本週完成\n`;
tR += `\n`;
tR += `## 下週計劃\n`;
%>
```

### 外部腳本
**Python 示例**:
```python
import requests
import datetime

API_URL = "http://localhost:27124/v1/files/"
API_KEY = "your-password"

def create_note(title, content):
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    data = {
        "filename": f"{title}.md",
        "content": content
    }
    response = requests.post(API_URL, json=data, headers=headers)
    return response.json()

# 創建日記
today = datetime.date.today().isoformat()
content = f"# 日記 {today}\n\n## 今日筆記\n\n## 明日計劃"
create_note(f"日記-{today}", content)
```

### GitHub Actions
**用途**: 定時任務和自動化腳本

**示例: 自動備份**
```yaml
name: Auto Backup
on:
  schedule:
    - cron: '0 0 * * *'  # 每天午夜
jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Push to remote
        run: |
          git config user.name "GitHub Actions"
          git add .
          git commit -m "Auto backup"
          git push
```

## 最佳實踐

### 自動化原則
- 自動化重複性任務
- 保留人工審核步驟
- 避免過度自動化
- 定期維護和優化

### 錯誤處理
- 新增錯誤捕獲和重試
- 記錄自動化日誌
- 設置失敗通知
- 備份重要數據

### 安全性
- 保護 API 密鑰
- 使用環境變量
- 限制訪問權限
- 定期審計自動化

## 高級技巧

### AI 整合
- 使用 AI 自動生成摘要
- 使用 AI 進行分類
- 使用 AI 提供建議
- 使用 AI 輔助寫作

### 條件邏輯
```python
# 根據筆記內容決定處理方式
if "會議" in note_title:
    create_meeting_note(note_content)
elif "項目" in note_title:
    create_project_note(note_content)
else:
    create_general_note(note_content)
```

### 定時任務
- 使用 cron 或定時器
- 設置合理的執行頻率
- 考慮時區問題
- 記錄執行歷史

## 相關筆記

- [[Obsidian Local REST API]]
- [[Obsidian Templater 外掛]]
- [[Obsidian Dataview 外掛]]
- [[Obsidian 效能優化]]

## 參考資源

- [n8n 官方文檔](https://docs.n8n.io/)
- [Obsidian API 文檔](https://github.com/obsidianmd/obsidian-api)
- [自動化最佳實踐](https://www.buildingasecondbrain.com/basics/)
