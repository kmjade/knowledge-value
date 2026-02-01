
# 指南


## 1. n8n 的安裝与啟動

# 方法

### 1.1 通過 Node.js 安裝 (推荐新手)

# 版本

1.  **驗證安裝**: 打開命令行终端 (CMD, PowerShell, or Terminal)，执行以下命令驗證 Node.js 和 npm 是否安裝成功。
    ```bash
    node -v
    npm -v
    ```
# 顯示

2.  **安裝 n8n**: 在命令行终端中执行以下命令来全局安裝 n8n。
    ```bash
    npm install -g n8n
    ```

3.  **啟動 n8n**: 安裝完成後，执行以下命令啟動 n8n 服务。
    ```bash
    n8n
    ```
# 顯示

### 1.2 通過 Docker 安裝

**前置条件**: 安裝 Docker Desktop。

1.  **拉取并運行 n8n 容器**: 打開命令行终端，执行以下 Docker 命令。
    ```bash
    docker run -it --rm --name n8n -p 5678:5678 -v ~/.n8n:/home/node/.n8n n8nio/n8n
    ```
2.  **访问 n8n**: 容器運行后，同样在瀏覽器中访问 `http://localhost:5678`。

# 管理

---

## 2. 在 n8n 中整合 Obsidian

整合的核心是利用 Obsidian 的社區外掛 `Local REST API` 对外暴露接口，然后在 n8n 中使用 `HTTP Request` 节点来調用这些接口。

# 配置

1.  **安裝外掛**: 在 Obsidian 中，进入 `設置` -> `第三方外掛` -> `社區外掛市场`，搜尋并安裝 `Local REST API` 外掛。
# 配置
    *   安裝后启用该外掛。
    *   进入外掛的設置頁面。
    *   **开启 HTTP 服务**: 找到并打開 `Enable Non-encrypted (HTTP) Server` 這個开关。
# 顯示
    *   **確認 API 地址**: 记下 `Non-encrypted (HTTP) API URL`，默认为 `http://127.0.0.1:27123/`。

# 配置

# 工作流
2.  **新增 HTTP 节点**: 新增一个 `HTTP Request` 节点。
# 配置
    *   **Method**: `GET`
    *   **URL**: `http://127.0.0.1:27123/vault/` (此地址用于获取 Vault 内所有檔案和資料夾列表)。
    *   **Authentication**: `Generic Credential Type`
    *   **Generic Auth Type**: `Bearer Auth`
    *   **Bearer Auth account**: 点击 `Create New` 創建新凭证。
        *   **Name**: `Obsidian API Key`
        *   **Bearer Token**: 貼上上一步从 Obsidian 複製的 `API Key`。
        *   儲存凭证。
# 顯示

# 配置

# 修改

# 修改
# 知識
# 配置
    *   **开启 `Send Headers` 开关**。
    *   新增一个 Header:
        *   **Name**: `Content-Type`
        *   **Value**: `text/plain`
# 配置
    *   **开启 `Send Body` 开关**。
    *   **Body Content Type**: `Raw`。
    *   **Body**: **必须将輸入模式切換为 `Expression`**，以保留 Markdown 的换行格式。然后輸入Markdown 內容。
    ```markdown
    # 这是筆記的标题

    这篇筆記是通過 n8n 自動創建的。

    ## 待辦事項
# 工作流
    - [ ] 學習更多 n8n 技巧

    当前創建時間：{{ $now }}
    ```
5.  **执行測試**: 点击 `Execute step`。成功后，在您的 Obsidian Vault 中即可看到这篇新創建的筆記。

# 更新

---

# 工作流

这是一个简单的实例，用于演示如何将多個节点串联起来，形成自動化生产线。

### 3.1 步骤一：新增 RSS 讀取节点

# 工作流
2.  在 `URL` 字段中，輸入您想訂閱的 RSS 源地址。例如 IT之家的 RSS 地址。
3.  执行节点，您将获取到最新的10篇文章列表。

### 3.2 步骤二：新增 AI 處理节点 (以智谱 GLM 为例)

1.  新增一个 `OpenAI` 节点。
# 配置
    *   点击 `Credential` -> `Create New`。
    *   **Name**: `Zhipu GLM Key`
    *   **API Key**: 貼上您的智谱 AI API Key。
    *   **新增 Base URL**: 点击 `Add Option` -> `Base URL`，填入智谱的 OpenAI 相容接口地址: `https://open.bigmodel.cn/api/paas/v1beta/`
    *   儲存凭证 (忽略可能出现的連接错误)。
# 配置
    *   **Resource**: `Chat`。
    *   **Model**: 将輸入模式切換为 `Expression`，并輸入模型ID，例如 `"glm-4-flash"`。
# 配置
    *   在 `Messages` -> `Content` 中編寫您的提示词。
    *   **關鍵操作**: 从左侧 `INPUT` 面板中，将上一步 RSS 节点的文章內容 (如 `description` 字段) 拖拽到提示词中，以實現數據的動態传递。
    *   示例 Prompt: 
    ```markdown
# 知識
	文案內容： {{ $json.contentSnippet }}
    ```

### 3.3 步骤三：連接到 Obsidian 节点

# 配置
# 修改
    *   例如: `http://127.0.0.1:27123/vault/新聞資料夾/{{ $('RSS Read').item.json.title.replace(/[\/\\:*?"<>|%]/g, '-') }}.md`
# 修改
    *   例如: `{{ $json.message.content }}`
# 工作流

---

# 工作流

# 工作流

# 工作流

# 工作流

# 工作流

# 工作流
2.  点击右上角的三个点 `...` 選單，選擇 `Import from File`。
3.  選擇您获取到的 `.json` 檔案進行导入。
# 工作流