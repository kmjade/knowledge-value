
# 指南

[Obsidian+Copilot+外掛参数設置.md](https://file.notion.so/f/f/59598ac9-9811-819f-adcd-000369d5acbf/dfacdebf-6600-4d4a-af1d-221c477dd68d/Obsidian_Copilot_%E6%8F%92%E4%BB%B6%E5%8F%82%E6%95%B0%E8%AE%BE%E7%BD%AE.md?table=block&id=2c798ac9-9811-8045-9dec-cc3c48afc915&spaceId=59598ac9-9811-819f-adcd-000369d5acbf&expirationTimestamp=1768629600000&signature=O8PvdUBSS7unNaXQ0rTruuX_k3y17vplGf6foPt6mxs&downloadName=Obsidian+Copilot+%E6%8F%92%E4%BB%B6%E5%8F%82%E6%95%B0%E8%AE%BE%E7%BD%AE.md)

### 1. General (常规/基礎設置)

# 管理

- **Copilot Plus (License Key)**:
    - 如果你購買了 Copilot Plus 訂閱，在这里輸入密钥。激活后可解锁免 Key 的模型、雲端索引和 Agent 功能。

- **API Keys (API 密钥)**:
    - 点击 Set Keys 按鈕，会弹出一个列表，让你分别輸入 OpenAI, Anthropic, Google Gemini 等厂商的 API Key。

- **Default Chat Model (默认聊天模型)**:
    - 决定了你每次打開侧边栏时，默认加载哪个模型。
    - **建議**：设为你最常用且性价比最高的模型（如GLM，Qwen，Gemini）。

- **Default Mode (默认模式)**:
    - **Chat**: 普通聊天模式（仅依赖上下文轮数）。
# 知識庫
    - **Copilot Plus**: Plus訂閱使用者能使用，拥有多模态能力的强大AI模式。
    - **建議**：如果你主要用来问筆記，设为 Vault QA；主要用来闲聊或润色，设为 Chat。

- **Open Plugin In (外掛打開位置)**:
    - **Sidebar View**: 固定在右侧边栏（推荐，更稳定）。
    - **Editor**: 編輯器模式。

- **Send Shortcut (發送快捷键)**:
    - **Enter**: 回车發送，Shift+Enter 换行（适合短对话）。
    - **Shift+Enter**: Shift+Enter 發送，Enter 换行（适合写长 Prompt）。

- **Include Current Note in Context Menu (在上下文選單中包含当前筆記)**:
    - 开启后，在侧边栏聊天时，AI 会默认讀取你当前**正在編輯**的那篇筆記內容。
    - **場景**：当你需要 AI 帮你“總結这篇文章”或“润色这段话”时，**必须开启**。

- **Auto-Add Text Selection to Context (自動将选中文本新增到上下文)**:
    - 开启后，当你在編輯器里选中一段文字，这段文字会自動出现在聊天框的輸入栏上方。
    - **場景**：针对性润色或翻译某段话时非常方便。

- **Images in Markdown (Markdown 中的圖片)**:
    - 允许 AI 讀取筆記语法 `![[]]` 中的圖片。
    - **注意**：需要当前模型支持 Vision（视觉）能力（如Gemini）。

- **Suggested Prompts (建議提示词)**:
# 顯示
    - **評價**：可以开启。

- **Relevant Notes (相關筆記)**:
    - 在 RAG (Vault QA) 模式下，AI 回答完問題后，会在底部列出它參考了哪些筆記（Source Documents）。
    - **建議**：**务必开启**。这是查证 AI 是否胡说八道的依据。

- **Autosave Chat (自動儲存聊天)**:
    - 开启后，你的每一次对话都会被存为一个 Markdown 檔案。
    - **建議**：可以开启，防止意外關閉外掛导致思路遺失。

- **Generate AI Chat Title on Save (儲存时生成 AI 标题)**:
    - 开启后，AI 会根据聊天內容自動起个名字（如“关于RAG的讨论”）。關閉则使用默认時間戳或前几个字。
    - **建議**：开启，方便日后尋找。

- **Default Conversation Folder Name (默认对话資料夾名称)**:
    - 設置聊天記錄存放在 Obsidian 的哪个資料夾下。默认是 `copilot-conversations`。

- **Default Conversation Tag (默认对话標籤)**:
    - 给儲存的聊天檔案自動打上 tag（如 `#ai-conversations`），方便通過 Graph View 或 Dataview 檢索。

- **Conversation Filename Template (对话檔案名模版)**:
    - 自定义儲存檔案的命名规则。
    - `{topic}`: AI 生成的标题。
    - `{date}`, `{time}`: 日期時間变量。

**速查表：General 基礎設置**

| 参数 (Parameter)              | 概括 (Summary)                          |
| :-------------------------- | :------------------------------------ |
| **Copilot Plus**            | 訂閱激活码輸入处，解锁高级功能。                      |
# 配置
| **Default Chat Model**      | 侧边栏默认啟動的模型。                           |
| **Default Mode**            | 默认模式：聊天 (Chat) 或 查库 (Vault QA)。       |
| **Open Plugin In**          | 界面位置：侧边栏 (Sidebar) 或 編輯模式 (Editor)。   |
| **Send Shortcut**           | 發送键設置：Enter 或 Shift+Enter。            |
| **Include Current Note**    | **重要**：是否让 AI 讀取当前正在編輯的筆記。            |
| **Auto-Add Text Selection** | **重要**：选中文字是否自動投喂给 AI。                |
| **Images in Markdown**      | 是否允许 AI 讀取筆記中的圖片 (需模型支持)。             |
# 顯示
| **Relevant Notes**          | **重要**：RAG 模式下是否展示參考来源。               |
| **Autosave Chat**           | 是否自動儲存聊天記錄为 Markdown 檔案。              |
| **Generate AI Chat Title**  | 是否让 AI 自動生成对话标题。                      |
| **Default Folder/Tag**      | 設置聊天記錄的儲存路徑和標籤。                       |

---

# 管理

# 管理

# 更新
- **Add Model (按鈕，新增模型)**: 手動新增自定义模型（比如本地 Ollama 的特定模型）。
- **列表参数详解**:
    - **Model**: 模型名称（传给 API 的字符串）。
    - **Provider**: 供应商（OpenAI, Ollama, etc.）。
    - **Capabilities (能力)**:
        - 👁️ (Vision): 能看图。
        - 💡 (Reasoning): 具备强推理能力。
        - 🌐 (Web Search): 網路搜尋能力。
    - **Enable (启用)**: 只有勾选的才会出现在聊天界面的下拉選單中。
    - **CORS (跨域資源共享)**:
        - **解釋**：如果你連接的是本地伺服器（如 Ollama 或 LM Studio）且遇到連接错误，尝试勾选這個。通常雲端 API 不需要勾选。
    - **Actions (操作)**: 編輯参数或刪除模型。
- **Conversation turns in context (上下文轮数)**:
    - **默认 15**。指 AI 能“记住”之前的多少轮对话。
    - **逻辑**：数值越大，AI 记性越好，但消耗 Token 越多（越贵），且可能超出上下文視窗限制。


# 管理

| 参数 (Parameter) | 概括 (Summary) |
| :--- | :--- |
| **Refresh Built-ins** | 获取外掛官方最新的内置模型列表。 |
| **Add Model** | 打開新增自定义模型的視窗 (见上表)。 |
# 顯示
| **List: CORS** | 针对列表中的模型单独开启跨域支持 (用于本地模型)。 |
| **Conversation turns** | 上下文记忆轮数 (默认 15)，数值越大越费 Token。 |


#### 視窗： Add Custom Chat Model (新增自定义聊天模型)

- **Model Name (模型名称) [必填]**
    - **深度释义**：这是 API 请求体（JSON Body）中 model 字段的**精确字符串值**。
    - **避坑**：这不是给你随便起名字的地方。
        - 比如 **Gemini** 的API Key，填 `gemini-3.0-pro-preview`。
# 顯示
        - 如果是 **LM Studio**，同理，填 `Qwen/Qwen2.5-72B-Instruct`，和你LM Studio中的模型名一样。
    - **后果**：填错的话API就会报错。

# 顯示
    - **深度释义**：这是给人类看的 UI 標籤。
# 顯示

- **Provider (供应商)**
    - **深度释义**：决定了外掛底层使用哪种 **API 协议/SDK** 来發送请求。
    - **选项逻辑**：
        - **OpenAI**: 標準格式。绝大多数第三方（DeepSeek, SiliconFlow, Moonshot）都相容這個格式。**首选**。
        - **Ollama**: 针对 Ollama 的原生接口（有时 Ollama 的 OpenAI 相容接口会有流式傳輸 Bug，选這個更稳）。
        - **Azure / Google / Anthropic**: 对应各家私有协议。
        - **OpenRouter**: 实际上也是 OpenAI 格式，但外掛可能会自動處理一些 OpenRouter 特有的 Header（如 Referer）。

- **Base URL (基礎 URL)**
    - **深度释义**：API 的接入点（Endpoint），通常以 `/v1` 结尾。
# 配置
        - **官方 OpenAI**: `https://api.openai.com/v1` (默认，可留空)。
        - **硅基流动**: `https://api.siliconflow.cn/v1`。
        - **本地 Ollama**: `http://localhost:11434/v1`。
        - **DeepSeek 官方**: `https://api.deepseek.com` (注意 DeepSeek 有时不需要 `/v1`，视 SDK 而定，通常加 `/v1` 没错)。

- **API Key (API 密钥)**
    - **深度释义**：鉴权令牌（Bearer Token）。
    - **注意**：如果你連接的是本地 Ollama，这里通常可以留空，或者随便填个 `sk-123`（有些 SDK 强制要求 Key 不为空）。

- **Model Capabilities (模型能力)**
    - **Reasoning (推理)**:
        - **功能**：勾选后，外掛会适配“思维链”的展示方式（类似 **DeepSeek-R1**）。它可能会增加特定的超时設置，或者在 UI 上折叠 `<think>` 標籤的內容。
    - **Vision (视觉)**:
        - **功能**：勾选后，聊天框会出现“上傳圖片”的按鈕。
        - **警告**：只有当你确信這個模型支持多模态（如 GPT-4o, Claude 3.5, Gemini, Qwen-VL）时才勾选。如果给纯文本模型传圖片，会直接报错。
    - **Websearch (联网搜尋)**:
        - **功能**：这是 Copilot 外掛的一个特殊標記。勾选后，如果你在 Agent 模式下，外掛会更倾向于认为這個模型有能力處理搜尋任務（或者是为了標記 Copilot Plus 提供的带搜尋功能的模型）。对于自定义模型，通常不勾选，除非你接的是 Perplexity 的 API。

- **CORS (跨域資源共享)**
    - **深度释义**：**救命开关**。
    - **原理**：Obsidian 也是基于瀏覽器内核（Chromium）的。瀏覽器有安全策略，禁止網頁随便向本地（localhost）或其他網網域名稱稱发请求。
    - **場景**：
        - 連接 **LM Studio或Ollama (localhost)** 时：**必须勾选**，或者你在 Ollama 啟動参数里設置了環境变量 `OLLAMA_ORIGINS="*"`。
# 配置
# 顯示


### 總結表格：Add Custom Chat Model 参数详解 (新增自定义聊天模型)

# 配置
| ---------------- | ------ | ----------------------------------------------------------------------------------------------------------------------- |
| **Model Name**   | 模型名称   | **【最關鍵】** 必须填寫 API 要求的**精确模型 ID**（如 `gemini-3.0-pro-preview` / `qwen2.5:14b` / `Qwen/Qwen2.5-72B-Instruct`）。填错 API 会报错。 |
# 顯示
| **Provider**     | 供应商    | 决定 API 协议：**OpenAI**（通用，首选）、Ollama（本地原生接口）、Azure/Google/Anthropic（各家私有协议）、OpenRouter（OpenAI 格式但含额外 Header 處理）。          |
| **Base URL**     | 基礎地址   | API 访问入口，如 `https://api.siliconflow.cn/v1`、`http://localhost:11434/v1`、`https://api.openai.com/v1` 等。                   |
| **API Key**      | API 密钥 | 鉴权 Token。連接本地模型可留空或填任意值（如 `sk-123`）。                                                                                    |
# 顯示
| **Vision**       | 视觉能力   | 勾选后启用圖片上傳按鈕。**仅限支持视觉輸入的模型**（GPT / Gemini / Qwen-VL）。否则必报错。                                                              |
| **Websearch**    | 联网搜尋   | Copilot 特有標記。多数自定义模型不要勾选。仅当接入 Perplexity 或具备真实联网能力的模型才勾选。                                                               |
| **CORS**         | 跨域开关   | 連接 **本地 Ollama/LM Studio (localhost)** 时必须勾选；雲端 API 通常不需要。                                                              |
# 顯示


#### 視窗： Add Custom Embedding Model (新增自定义嵌入模型)

# 配置

- **Model Name (模型名称) [核心] **
# 配置

- **Provider (供应商)**
# 配置

- **Base URL & API Key**
    - 同上。填寫你所使用的向量模型的URL和API Key。

- **Model Capabilities (模型能力)**
    - **Reasoning / Vision / Websearch**:
        - **深度建議**：**全部不要勾选！**
        - **原因**：这是外掛 UI 复用了 Chat Model 的弹窗代碼。Embedding 模型的工作是“把文字变成向量”，它不需要推理，不需要联网，目前的外掛架構也不支持多模态向量化（Vision Embedding）。勾选这些可能会导致外掛發送错误的参数给 API，导致报错。

- **Additional OpenAI Settings (额外的 OpenAI 設置)**
    - **功能**：点击展开后，通常允许你新增自定义 Headers（如 Organization-ID）。
    - **場景**：99% 的个人使用者用不到。除非你是企业版 OpenAI 使用者，需要指定计费归属的组织。

---

### 總結表格：Add Custom Embedding Model 参数详解 (新增自定义向量模型)

# 配置
| :--------------- | :--- | :-------------------------------------------------------------------- |
| **Model Name**   | 模型名称 | **【最關鍵】** 必须填入 API 提供商规定的精确字符串 ID (如 `text-embedding-3-small`)，不能自定义。 |
# 顯示
| **Provider**     | 供应商  | 填寫所使用向量模型的供应商名称。                                                      |
| **Base URL**     | 基礎地址 | 填寫所使用向量模型的Base URL。                                                   |
| **API Key**      | 密钥   | 填寫所使用向量模型的API Key，本地模型留空。                                             |
| **Reasoning**    | 推理能力 | 留空不勾选。                                                                |
| **Vision**       | 视觉能力 | 留空不勾选。                                                                |
| **Websearch**    | 联网搜尋 | 留空不勾选。                                                                |
| **CORS**         | 跨域开关 | 連接 Localhost (本地模型) 报错时**必选**；雲端 API 通常不选。                            |
| **Test**         | 測試按鈕 | 提交前务必点击。Chat 模型会发一条 "Hello"，Embedding 会试着向量化一个词，成功后会变绿。               |


---

### 3. QA (问答/RAG 核心設置)

# 配置

- **Enable Semantic Search (启用语义搜尋)**:
    - **总开关**。开启后，外掛才会去扫描你的筆記并建立向量索引。不开启就没法用 Vault QA。

- **Embedding Model (嵌入模型)**:
    - 選擇用于将文字转化为向量的模型。
    - **注意**：一旦选定并建立了索引，**不要随意更换**。如果换了模型，必须点击 Force Re-index Vault 重建整个索引，否则搜不到任何东西。

- **Auto-Index Strategy (自動索引策略)**:
    - **ON MODE SWITCH**: 当你从 Chat 模式切換到 QA 模式时，外掛檢查是否有新筆記需要索引。
    - **ON STARTUP**: 外掛加载时，后台立马索引。
    - **NEVER**: 只有你手動执行命令，才会索引。

- **Max Sources (最大引用源)**:
    - **默认 15**。檢索时，选出相關性最高的多少个片段喂给 AI。
    - **建議**：对于 Gemini / GPT 这种大視窗模型，建議**调大至 30-50**。给的資訊越多，AI 综合總結的能力越强。

- **Lexical Search RAM Limit (词法搜尋 RAM 限制)**:
    - **默认 100MB**。这是给 **BM25（關鍵词搜尋）** 分配的記憶體。
    - **建議**：如果你的筆記数量超过 5000 篇，建議拉大到 **200MB - 500MB**，防止關鍵词搜尋因为記憶體不足而遗漏。

- **Enable Folder and Graph Boosts (启用資料夾与图谱增强)**:
    - **Copilot 独家技術**。开启后，如果筆記 A 和筆記 B 在同一个資料夾，或者有双向連結，檢索时会提高它们的相關性权重。
    - **建議**：**开启**。这让 RAG 更懂 Obsidian 的结构。

- **Exclusions (排除项)**:
    - 点击 Manage 設置不想被索引的資料夾、標籤或檔案类型。
    - **建議**：排除 Assets (附件), Templates (模版), Excalidraw (绘图檔案)。

- **Inclusions (包含项)**:
    - 白名单模式。設置后，**只**索引这里面的內容。通常不建議用，除非你只想针对某个特定專案做 RAG。

- **Enable Obsidian Sync for Copilot index (为 Copilot 索引启用 Obsidian Sync)**:
    - 把庞大的向量索引檔案放入官方同步列表。
    - **建議**：**關閉**。索引檔案通常很大（几百 MB），同步很慢且浪费空間。建議每台设备自己在本地跑索引。

- **Disable index loading on mobile (在移动端禁用索引加载)**:
    - **建議**：**开启**。手机記憶體小，加载几百兆的索引容易闪退。手机上尽量只用 Chat 模式，或者訂閱 Plus 用雲端索引。

**速查表：QA (RAG) 設置**

| 参数 (Parameter)              | 概括 (Summary)                  |
| :-------------------------- | :---------------------------- |
# 知識庫
| **Embedding Model**         | 向量模型。选定后更换需重建索引 (Re-index)。   |
| **Auto-Index Strategy**     | 索引时机。推荐 **NEVER** (然后手動索引)。   |
| **Max Sources**             | 喂给 AI 的參考片段数量。建議大模型设为 30-50。  |
| **Lexical Search RAM**      | 關鍵词搜尋分配記憶體。大库建議调大至 200MB+。     |
| **Folder/Graph Boosts**     | 利用資料夾和双链关系優化搜尋結果。**建議开启**。    |
| **Exclusions**              | 排除不需要索引的資料夾/標籤 (如附件、模版)。      |
| **Enable Obsidian Sync**    | 是否同步索引檔案。**建議關閉** (檔案大，浪费空間)。 |
| **Disable index on mobile** | 移动端是否禁用索引。**建議开启** (防闪退)。     |

---

### 4. Command (自定义指令)

# 配置

- **Custom Prompts Folder Name (自定义提示词資料夾)**:
    - 指定一个資料夾存放你的 `.md` 提示词檔案。外掛会自動讀取该資料夾下的檔案作为指令。

- **Custom Prompt Templating (自定义提示词模版化)**:
    - **开关**。开启后，支持解析 `{activenote}`, `{selection}` 等变量。
    - **建議**：开启。

# 排序
    - **Recency**: 最近用的排前面。
# 排序
# 排序

- **Commands List (指令列表)**:
    - 列出了所有已加载的指令（如 Fix grammar, Summarize）。
# 顯示
    - **Slash Cmd**: 是否可以通過 `/` 呼出。
    - **Actions**: 編輯或刪除。

**速查表：Command 指令設置**

| 参数 (Parameter) | 概括 (Summary) |
| :--- | :--- |
| **Custom Prompts Folder** | 存放自定义 .md 提示词檔案的資料夾路徑。 |
| **Prompt Templating** | 开启变量支持 (如 `{selection}` 自動填入选中文本)。 |
# 排序
# 管理

---

### 5. Plus (Plus 会员功能)

# 配置

- **Enable Autonomous Agent (启用自主智能体)**:
    - **核心开关**。开启后，在 Plus 模型下，AI 不再是单纯的回答者，而是**行动者**。它会根据問題拆解步骤：搜尋網路 -> 搜尋本地 -> 整合答案。
    - **注意**：Agent 模式速度较慢，适合复杂任務。

- **Memory Folder Name (记忆資料夾名称)**:
    - 存放 AI 长期记忆數據的路徑。

- **Reference Recent Conversation (參考最近对话)**:
    - 让 AI 在新的聊天視窗中，也能“想起”你上一次聊天聊了什么。

- **Max Recent Conversations (最大最近对话数)**:
    - **默认 30**。AI 会扫描最近 30 个聊天檔案作为背景上下文。
    - **警告**：数值过大会显著增加 Token 消耗和延遲。

- **Reference Saved Memories (參考儲存的记忆)**:
    - 开启后，AI 会讀取你明确要求它“记住”的資訊（比如“记住我只用 TypeScript 写代碼”）。

- **Autocomplete (自動补全)**:
# 顯示

**速查表：Plus 高级功能**

| 参数 (Parameter) | 概括 (Summary) |
| :--- | :--- |
| **Enable Autonomous Agent**| 开启智能体模式，允许 AI 联网搜尋和規劃任務。 |
| **Memory Folder** | 长期记忆檔案的儲存位置。 |
| **Ref. Recent Conversation**| 允许 AI 讀取之前的对话記錄作为背景。 |
| **Max Recent Conversations**| 讀取最近对话的数量限制 (默认 30)。 |
| **Ref. Saved Memories** | 允许 AI 讀取使用者显式儲存的记忆点。 |

---

### 6. Advanced (高级設置)

- **User System Prompt (使用者系統提示词)**:
    - **全局人设**。無论你选哪个模型，這個提示词都会作为 System Message 發送给 AI。
    - **用法举例**：填入“你是一个 Obsidian 专家，回答请使用 Markdown，不要啰嗦”。

- **Enable Encryption (启用加密)**:
    - 对儲存在 `data.json` 中的 API Key 進行加密。
# 分享

- **Debug Mode (除錯模式)**:
    - 开启后，控制台（Ctrl+Shift+I）会輸出大量日志。仅在报错求助时开启。

- **Create Log File (創建日志檔案)**:
    - 一键生成诊断日志，方便发给開發者报 Bug。

**速查表：Advanced 高级設置**

| 参数 (Parameter) | 概括 (Summary) |
| :--- | :--- |
| **User System Prompt** | 設置全局通用的 System Message (AI 人设)。 |
| **Enable Encryption** | 加密本地儲存的 API Key，提升安全性。 |
| **Debug Mode** | 开启控制台詳細日志 (排错用)。 |
| **Create Log File** | 生成用于回饋 Bug 的日志檔案。 |

---

[AI+API+Key属性.md](https://file.notion.so/f/f/59598ac9-9811-819f-adcd-000369d5acbf/1a91d7ae-9918-4314-a304-8107774c0480/AI_API_Key%E5%B1%9E%E6%80%A7.md?table=block&id=2c798ac9-9811-8029-b769-d467be823a03&spaceId=59598ac9-9811-819f-adcd-000369d5acbf&expirationTimestamp=1768629600000&signature=MTV9zF2gQnuEkMKnhJP9OMmiafHSVzHRmX9iiB5Jbm0&downloadName=AI+API+Key%E5%B1%9E%E6%80%A7.md)

| 厂商/模型 (Vendor)            | 核心模型名称 (API Model Name)                                                                 | 官方 Native Base URL                          | OpenAI 相容 Base URL (推荐)                                    | 推理 (Reasoning) | 视觉 (Vision) | 搜尋 (Web Search) | 备注 (Remarks)                                             |
| :------------------------ | :-------------------------------------------------------------------------------------- | :------------------------------------------ | :--------------------------------------------------------- | :------------: | :---------: | :-------------: | :------------------------------------------------------- |
| **OpenAI**                | `gpt-5.1`<br>`gpt-5.1-chat`<br>`gpt-5.1-codex`<br>`o3-2025-04-16` / `o3-pro-2025-06-10` | `https://api.openai.com/v1`                 | `https://api.openai.com/v1`                                |       ✅        |      ✅      |        ❌        | 最新主推 GPT-5.1 系列，支持推理与视觉，原生無联网搜尋（需外掛）。                    |
| **Google (Gemini)**       | `gemini-3-pro`<br>`gemini-2.5-pro`<br>`gemini-2.5-flash`<br>`gemini-2.5-flash-lite`     | `https://generativelanguage.googleapis.com` | `https://generativelanguage.googleapis.com/v1beta/openai/` |       ✅        |      ✅      |        ✅        | Gemini 3 Pro 为最新旗舰，2.5 系列为主力高性价比模型，多模态与 Grounding 支持完善。  |
| **Anthropic (Claude)**    | `claude-opus-4-5-20251101`<br>`claude-sonnet-4-5-20250929`                              | `https://api.anthropic.com`                 | 無原生相容（建議用中间层如 OpenRouter）                                  |       ✅        |      ✅      |        ❌        | 4.5 系列命名带日期 tag，推理与视觉能力强，但無原生联网搜尋能力。                     |
| **Perplexity**            | `sonar-pro`<br>`sonar-search`<br>`sonar-reasoning-pro`                                  | `https://api.perplexity.ai`                 | `https://api.perplexity.ai`                                |       ✅        |      ❌      |        ✅        | Perplexity API 以实时搜尋为核心，`sonar-reasoning-pro` 结合推理与搜尋能力。 |
| **xAI (Grok)**            | `grok-4`<br>`grok-4-1`                                                                  | `https://api.x.ai/v1`                       | `https://api.x.ai/v1`                                      |       ✅        |      ✅      |        ✅        | 最新 Grok 4 系列，相容 OpenAI API 结构，支持视觉与实时搜尋（Live Search）。    |
| **Alibaba (通义千问 / Qwen)** | `qwen3-max`<br>`qwen3-vl-30b`<br>`qwen2.5-max`                                          | `https://dashscope.aliyuncs.com`            | `https://dashscope.aliyuncs.com/compatible-mode/v1`        |       ✅        |      ✅      |        ✅        | Qwen 3 系列为最新主推，具备强视觉与搜尋能力。VL 系列支持多模态。                    |
| **Moonshot (Kimi)**       | `kimi-k2-thinking`<br>`moonshot-k2`                                                     | `https://api.moonshot.cn/v1`                | `https://api.moonshot.cn/v1`                               |       ✅        |      ✅      |        ✅        | Moonshot K2 專注长上下文与深度推理，多模态支持良好，并内置 Web Search 工具調用。     |
| **DeepSeek (深度求索)**       | `deepseek-v3.2`<br>`deepseek-reasoner`<br>`deepseek-chat`                               | `https://api.deepseek.com`                  | `https://api.deepseek.com`                                 |       ✅        |      ❌      |        ❌        | DeepSeek 主力为推理模型，API 多为纯文本，不支持视觉与内置搜尋。                   |
| **Doubao (字节豆包)**         | `doubao-1.5-pro-32k`<br>`doubao-thinking`                                               | `https://ark.cn-beijing.volces.com/api/v3`  | `https://ark.cn-beijing.volces.com/api/v3`                 |       ✅        |      ✅      |        ✅        | 豆包 Endpoint ID 依控制台設置不同而变化，具备多模态与联网能力，性价比高。              |
# 版本
