---
# 指南
date: 2026-01-23
# 工作流
para: resources
status: active
language: zh-tw
---

# 指南

> [!info] 概述
# 工作流

---

## 一、n8n 的安裝與啟動

# 方法

#### 前置條件

# 版本

```bash
node -v
npm -v
```

# 版本

#### 全域安裝 n8n

```bash
npm install -g n8n
```

#### 啟動 n8n

```bash
n8n
```

當終端顯示服務已啟動後，在瀏覽器中訪問 `http://localhost:5678` 即可進入 n8n 介面。

---

# 方法

#### 前置條件

安裝 Docker Desktop。

#### 拉取並運行 n8n 容器

```bash
docker run -it --rm --name n8n -p 5678:5678 -v ~/.n8n:/home/node/.n8n n8nio/n8n
```

容器運行後，同樣在瀏覽器中訪問 `http://localhost:5678`。

#### 首次設置

# 管理

---

# 配置

### 安裝外掛

在 Obsidian 中，進入 `設定` → `第三方外掛` → `社群外掛市集`，搜尋並安裝 `Local REST API` 外掛。

# 配置

安裝後啟用該外掛：

- **開啟 HTTP 服務**：找到並開啟 `Enable Non-encrypted (HTTP) Server` 開關
- **獲取 API Key**：複製頁面上的 `Your API Key`（這是後續操作的身份憑證）
- **確認 API 地址**：記下 `Non-encrypted (HTTP) API URL`，預設為 `http://127.0.0.1:27123/`

---

# 工作流

# 工作流

# 工作流

# 配置

| 項定 | 設定 |
|------|--------|
| **Method** | `GET` |
| **URL** | `http://127.0.0.1:27123/vault/`（獲取 Vault 內所有檔案和資料夾列表） |
| **Authentication** | `Generic Credential Type` |
| **Generic Auth Type** | `Bearer Auth` |
| **Bearer Auth account** | 點擊 `Create New` 建立新憑證 |
| **Name** | `Obsidian API Key` |
| **Bearer Token** | 粘上步驟中複製的 API Key |

# 配置

---

# 工作流

# 修改

| 設定 | 新值 |
|------|------|
| **Method** | `POST` |
| **URL** | `http://127.0.0.1:27123/vault/我的第一篇n8n知識筆記.md`（自訂檔名） |
| **Headers** | �啟 `Send Headers` 開關，新增 Header：<br>• **Name**: `Content-Type`<br>• **Value**: `text/plain` |
| **Body** | 開啟 `Send Body` 開關，設定：<br>• **Body Content Type**: `Raw`<br>• **輸入模式**: 必須切換為 `Expression` 以保留 Markdown 換行格式。然後輸入 Markdown 內容。 |

**Body 範例：**
```markdown
# 這是筆記的標題

這是筆記是透過 n8n 自動建立的。
```

**測試：** 點擊 `Execute step`。成功後，在您的 Obsidian Vault 中即可看到這篇新建立的筆記。

---

# 工作流

# 工作流

```mermaid
flowchart LR
RSS[訂閱源] -->|AI智譜 GLM]
RSS[讀取節點] -->|AI摘要生成節點]
AI摘要節點[摘要文案] -->|HTTP請求節點]
HTTP請求節點] -->|Obsidian筆記建立節點]
Obsidian筆記建立節點[筆記內容] -->|完成
```

### 步驟一：新增 RSS 讀取節點

# 工作流

# 配置
- **URL**: 輸入您想訂閱的 RSS 來源地址

**執行：** 點擊節點右上角的 `Execute step`

---

### 步驟二：新增 AI 處理節點

# 配置

# 配置
- **Resource**: `Chat`
- **Model**: 將輸入模型 ID，例如 `"glm-4-flash"`

# 配置

**範例提示詞：**
```markdown
對以下文案進行歸納總結，並將總結出的摘要生成 markdown 格式的知識筆記。

文案內容：{{ $json.contentSnippet }}
```

---

### 步驟三：新增 HTTP 請求節點

# 配置

# 修改

| 設定 | 新值 |
|------|------|
| **Method** | `POST` |
| **URL** | `http://127.0.0.1:27123/vault/新聞資料夾/{{ $('RSS Read').item.json.title.replace(/[\/\\:*?"<>|%]/g, '-') }}.md` |
| **Body** | `{{ $json.message.content }}` |

**URL 表達式說明**：
  - 檔名部分使用正則表達式動態獲取 RSS 文章標題
  - 內容部分使用表達式動態獲取 AI 摘要的摘要

---

### 步驟四：連接到 Obsidian 筆記建立節點

# 配置

# 工作流

**注意：** 如果提示詞中包含特殊字元字（如 `:`、"<>|%]`），需要在 URL 表達式中加入正則表達式來處理。

---

# 工作流

# 工作流

# 工作流

# 工作流

---

# 工作流

# 工作流
2. 點擊右上角 `...` 選擇 `Import from File`
3. 選擇您下載的 `.json` 檔案
# 工作流

---

## 六、n8n 使用技巧

### �見問題與解答

| 問題 | 解答 |
|------|------|
| RSS �錯誤 | �案路徑不正確 | 確認 URL 是否正確，支援 `https://` 或 `http://` |
| AI 摘要太短/不準確 | 在 Prompt 中加入 **「請保持每點不超過 30 字」**，並確保原始內容完整貼上。 |
| 搬錯資料夾 | �認筆記前置 **#tag**（如 `#project`、`#area`、`#resource`），腳本會優先使用標籤決定目標子資料夾。 |
| 歸檔後找不到 | 所有歸檔均保留完整路徑，可在 Obsidian **搜尋** `path:"04_Archives"` 再次定位。 |

---

## 七、相關連結

### 內部資源

| 來源 | 連結 |
|------|------|
| n8n 官方檔案 | https://docs.n8n.io/ |
| Local REST API 外掛 | Obsidian 社群外掛市集 |
| Obsidian Wiki | https://help.obsidian.md/ |

### 相關主題

# 方法
# 教程
# 指南
