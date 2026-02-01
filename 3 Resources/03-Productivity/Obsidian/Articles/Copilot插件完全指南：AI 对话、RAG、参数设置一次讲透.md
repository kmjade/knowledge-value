
[Copilot插件完全指南：AI 对话、RAG、参数设置一次讲透](https://www.bilibili.com/video/BV1aymeBTE6A?t=64.6)

[Obsidian+Copilot+插件参数设置.md](https://file.notion.so/f/f/59598ac9-9811-819f-adcd-000369d5acbf/dfacdebf-6600-4d4a-af1d-221c477dd68d/Obsidian_Copilot_%E6%8F%92%E4%BB%B6%E5%8F%82%E6%95%B0%E8%AE%BE%E7%BD%AE.md?table=block&id=2c798ac9-9811-8045-9dec-cc3c48afc915&spaceId=59598ac9-9811-819f-adcd-000369d5acbf&expirationTimestamp=1768629600000&signature=O8PvdUBSS7unNaXQ0rTruuX_k3y17vplGf6foPt6mxs&downloadName=Obsidian+Copilot+%E6%8F%92%E4%BB%B6%E5%8F%82%E6%95%B0%E8%AE%BE%E7%BD%AE.md)

### 1. General (常规/基础设置)

这部分决定了插件的基础行为模式和文件管理逻辑。

- **Copilot Plus (License Key)**:
    - 如果你购买了 Copilot Plus 订阅，在这里输入密钥。激活后可解锁免 Key 的模型、云端索引和 Agent 功能。

- **API Keys (API 密钥)**:
    - 点击 Set Keys 按钮，会弹出一个列表，让你分别输入 OpenAI, Anthropic, Google Gemini 等厂商的 API Key。

- **Default Chat Model (默认聊天模型)**:
    - 决定了你每次打开侧边栏时，默认加载哪个模型。
    - **建议**：设为你最常用且性价比最高的模型（如GLM，Qwen，Gemini）。

- **Default Mode (默认模式)**:
    - **Chat**: 普通聊天模式（仅依赖上下文轮数）。
    - **Vault QA**: 知识库问答模式（RAG 模式）。
    - **Copilot Plus**: Plus订阅用户能使用，拥有多模态能力的强大AI模式。
    - **建议**：如果你主要用来问笔记，设为 Vault QA；主要用来闲聊或润色，设为 Chat。

- **Open Plugin In (插件打开位置)**:
    - **Sidebar View**: 固定在右侧边栏（推荐，更稳定）。
    - **Editor**: 编辑器模式。

- **Send Shortcut (发送快捷键)**:
    - **Enter**: 回车发送，Shift+Enter 换行（适合短对话）。
    - **Shift+Enter**: Shift+Enter 发送，Enter 换行（适合写长 Prompt）。

- **Include Current Note in Context Menu (在上下文菜单中包含当前笔记)**:
    - 开启后，在侧边栏聊天时，AI 会默认读取你当前**正在编辑**的那篇笔记内容。
    - **场景**：当你需要 AI 帮你“总结这篇文章”或“润色这段话”时，**必须开启**。

- **Auto-Add Text Selection to Context (自动将选中文本添加到上下文)**:
    - 开启后，当你在编辑器里选中一段文字，这段文字会自动出现在聊天框的输入栏上方。
    - **场景**：针对性润色或翻译某段话时非常方便。

- **Images in Markdown (Markdown 中的图片)**:
    - 允许 AI 读取笔记语法 `![[]]` 中的图片。
    - **注意**：需要当前模型支持 Vision（视觉）能力（如Gemini）。

- **Suggested Prompts (建议提示词)**:
    - 在聊天框空闲时，显示一些预设的建议（如“总结这篇笔记”）。
    - **评价**：可以开启。

- **Relevant Notes (相关笔记)**:
    - 在 RAG (Vault QA) 模式下，AI 回答完问题后，会在底部列出它参考了哪些笔记（Source Documents）。
    - **建议**：**务必开启**。这是查证 AI 是否胡说八道的依据。

- **Autosave Chat (自动保存聊天)**:
    - 开启后，你的每一次对话都会被存为一个 Markdown 文件。
    - **建议**：可以开启，防止意外关闭插件导致思路丢失。

- **Generate AI Chat Title on Save (保存时生成 AI 标题)**:
    - 开启后，AI 会根据聊天内容自动起个名字（如“关于RAG的讨论”）。关闭则使用默认时间戳或前几个字。
    - **建议**：开启，方便日后查找。

- **Default Conversation Folder Name (默认对话文件夹名称)**:
    - 设置聊天记录存放在 Obsidian 的哪个文件夹下。默认是 `copilot-conversations`。

- **Default Conversation Tag (默认对话标签)**:
    - 给保存的聊天文件自动打上 tag（如 `#ai-conversations`），方便通过 Graph View 或 Dataview 检索。

- **Conversation Filename Template (对话文件名模版)**:
    - 自定义保存文件的命名规则。
    - `{topic}`: AI 生成的标题。
    - `{date}`, `{time}`: 日期时间变量。

**速查表：General 基础设置**

| 参数 (Parameter)              | 概括 (Summary)                          |
| :-------------------------- | :------------------------------------ |
| **Copilot Plus**            | 订阅激活码输入处，解锁高级功能。                      |
| **API Keys**                | 配置 OpenAI, Anthropic 等厂商 API Key 的入口。 |
| **Default Chat Model**      | 侧边栏默认启动的模型。                           |
| **Default Mode**            | 默认模式：聊天 (Chat) 或 查库 (Vault QA)。       |
| **Open Plugin In**          | 界面位置：侧边栏 (Sidebar) 或 编辑模式 (Editor)。   |
| **Send Shortcut**           | 发送键设置：Enter 或 Shift+Enter。            |
| **Include Current Note**    | **重要**：是否让 AI 读取当前正在编辑的笔记。            |
| **Auto-Add Text Selection** | **重要**：选中文字是否自动投喂给 AI。                |
| **Images in Markdown**      | 是否允许 AI 读取笔记中的图片 (需模型支持)。             |
| **Suggested Prompts**       | 是否显示“建议提示词”气泡。                        |
| **Relevant Notes**          | **重要**：RAG 模式下是否展示参考来源。               |
| **Autosave Chat**           | 是否自动保存聊天记录为 Markdown 文件。              |
| **Generate AI Chat Title**  | 是否让 AI 自动生成对话标题。                      |
| **Default Folder/Tag**      | 设置聊天记录的保存路径和标签。                       |

---

### 2. Model (模型管理)

这里管理你的AI模型和向量模型。

- **Refresh Built-ins (按钮，刷新内置模型)**: 获取插件开发者更新的最新模型列表。
- **Add Model (按钮，添加模型)**: 手动添加自定义模型（比如本地 Ollama 的特定模型）。
- **列表参数详解**:
    - **Model**: 模型名称（传给 API 的字符串）。
    - **Provider**: 供应商（OpenAI, Ollama, etc.）。
    - **Capabilities (能力)**:
        - 👁️ (Vision): 能看图。
        - 💡 (Reasoning): 具备强推理能力。
        - 🌐 (Web Search): 网络搜索能力。
    - **Enable (启用)**: 只有勾选的才会出现在聊天界面的下拉菜单中。
    - **CORS (跨域资源共享)**:
        - **解释**：如果你连接的是本地服务器（如 Ollama 或 LM Studio）且遇到连接错误，尝试勾选这个。通常云端 API 不需要勾选。
    - **Actions (操作)**: 编辑参数或删除模型。
- **Conversation turns in context (上下文轮数)**:
    - **默认 15**。指 AI 能“记住”之前的多少轮对话。
    - **逻辑**：数值越大，AI 记性越好，但消耗 Token 越多（越贵），且可能超出上下文窗口限制。


**速查表：Model 常规管理参数 (列表与设置)**

| 参数 (Parameter) | 概括 (Summary) |
| :--- | :--- |
| **Refresh Built-ins** | 获取插件官方最新的内置模型列表。 |
| **Add Model** | 打开添加自定义模型的窗口 (见上表)。 |
| **List: Enable** | 勾选后，模型才会显示在聊天界面的下拉列表中。 |
| **List: CORS** | 针对列表中的模型单独开启跨域支持 (用于本地模型)。 |
| **Conversation turns** | 上下文记忆轮数 (默认 15)，数值越大越费 Token。 |


#### 窗口： Add Custom Chat Model (添加自定义聊天模型)

- **Model Name (模型名称) [必填]**
    - **深度释义**：这是 API 请求体（JSON Body）中 model 字段的**精确字符串值**。
    - **避坑**：这不是给你随便起名字的地方。
        - 比如 **Gemini** 的API Key，填 `gemini-3.0-pro-preview`。
        - 如果是 **Ollama**，你必须填 `qwen2.5:14b`（必须和你本地 `ollama list` 显示的一模一样）。
        - 如果是 **LM Studio**，同理，填 `Qwen/Qwen2.5-72B-Instruct`，和你LM Studio中的模型名一样。
    - **后果**：填错的话API就会报错。

- **Display Name (显示名称)**
    - **深度释义**：这是给人类看的 UI 标签。
    - **建议**：起一个短一点的名字，比如 Qwen-72B 或 DS-V3，因为它会显示在侧边栏狭窄的下拉菜单里。

- **Provider (供应商)**
    - **深度释义**：决定了插件底层使用哪种 **API 协议/SDK** 来发送请求。
    - **选项逻辑**：
        - **OpenAI**: 标准格式。绝大多数第三方（DeepSeek, SiliconFlow, Moonshot）都兼容这个格式。**首选**。
        - **Ollama**: 针对 Ollama 的原生接口（有时 Ollama 的 OpenAI 兼容接口会有流式传输 Bug，选这个更稳）。
        - **Azure / Google / Anthropic**: 对应各家私有协议。
        - **OpenRouter**: 实际上也是 OpenAI 格式，但插件可能会自动处理一些 OpenRouter 特有的 Header（如 Referer）。

- **Base URL (基础 URL)**
    - **深度释义**：API 的接入点（Endpoint），通常以 `/v1` 结尾。
    - **配置作业**：
        - **官方 OpenAI**: `https://api.openai.com/v1` (默认，可留空)。
        - **硅基流动**: `https://api.siliconflow.cn/v1`。
        - **本地 Ollama**: `http://localhost:11434/v1`。
        - **DeepSeek 官方**: `https://api.deepseek.com` (注意 DeepSeek 有时不需要 `/v1`，视 SDK 而定，通常加 `/v1` 没错)。

- **API Key (API 密钥)**
    - **深度释义**：鉴权令牌（Bearer Token）。
    - **注意**：如果你连接的是本地 Ollama，这里通常可以留空，或者随便填个 `sk-123`（有些 SDK 强制要求 Key 不为空）。

- **Model Capabilities (模型能力)**
    - **Reasoning (推理)**:
        - **功能**：勾选后，插件会适配“思维链”的展示方式（类似 **DeepSeek-R1**）。它可能会增加特定的超时设置，或者在 UI 上折叠 `<think>` 标签的内容。
    - **Vision (视觉)**:
        - **功能**：勾选后，聊天框会出现“上传图片”的按钮。
        - **警告**：只有当你确信这个模型支持多模态（如 GPT-4o, Claude 3.5, Gemini, Qwen-VL）时才勾选。如果给纯文本模型传图片，会直接报错。
    - **Websearch (联网搜索)**:
        - **功能**：这是 Copilot 插件的一个特殊标记。勾选后，如果你在 Agent 模式下，插件会更倾向于认为这个模型有能力处理搜索任务（或者是为了标记 Copilot Plus 提供的带搜索功能的模型）。对于自定义模型，通常不勾选，除非你接的是 Perplexity 的 API。

- **CORS (跨域资源共享)**
    - **深度释义**：**救命开关**。
    - **原理**：Obsidian 也是基于浏览器内核（Chromium）的。浏览器有安全策略，禁止网页随便向本地（localhost）或其他域名发请求。
    - **场景**：
        - 连接 **LM Studio或Ollama (localhost)** 时：**必须勾选**，或者你在 Ollama 启动参数里设置了环境变量 `OLLAMA_ORIGINS="*"`。
        - 连接 **云端 API** 时：通常不用勾选，除非该厂商的服务器没配置好 CORS 头。
    - **Test 按钮**：配置完点一下，显示 Success 再点 Add。


### 总结表格：Add Custom Chat Model 参数详解 (添加自定义聊天模型)

| 项名称 (Item Name)  | 中文名称   | 深度解析与配置建议 (Best Practice)                                                                                               |
| ---------------- | ------ | ----------------------------------------------------------------------------------------------------------------------- |
| **Model Name**   | 模型名称   | **【最关键】** 必须填写 API 要求的**精确模型 ID**（如 `gemini-3.0-pro-preview` / `qwen2.5:14b` / `Qwen/Qwen2.5-72B-Instruct`）。填错 API 会报错。 |
| **Display Name** | 显示名称   | UI 中展示的友好名称，**建议简短**（如 Qwen）。                                                                                           |
| **Provider**     | 供应商    | 决定 API 协议：**OpenAI**（通用，首选）、Ollama（本地原生接口）、Azure/Google/Anthropic（各家私有协议）、OpenRouter（OpenAI 格式但含额外 Header 处理）。          |
| **Base URL**     | 基础地址   | API 访问入口，如 `https://api.siliconflow.cn/v1`、`http://localhost:11434/v1`、`https://api.openai.com/v1` 等。                   |
| **API Key**      | API 密钥 | 鉴权 Token。连接本地模型可留空或填任意值（如 `sk-123`）。                                                                                    |
| **Reasoning**    | 推理能力   | 勾选后 UI 会显示 `<think>` 折叠内容，适配 DeepSeek-R1 等推理模型。非推理模型一般不勾选。                                                              |
| **Vision**       | 视觉能力   | 勾选后启用图片上传按钮。**仅限支持视觉输入的模型**（GPT / Gemini / Qwen-VL）。否则必报错。                                                              |
| **Websearch**    | 联网搜索   | Copilot 特有标记。多数自定义模型不要勾选。仅当接入 Perplexity 或具备真实联网能力的模型才勾选。                                                               |
| **CORS**         | 跨域开关   | 连接 **本地 Ollama/LM Studio (localhost)** 时必须勾选；云端 API 通常不需要。                                                              |
| **Test**         | 测试按钮   | 提交前必须点击验证连通性。成功后显示绿色 Success。                                                                                           |


#### 窗口： Add Custom Embedding Model (添加自定义嵌入模型)

这是配置 RAG “索引器”的地方。

- **Model Name (模型名称) [核心] **
    - **配置**：填你所使用的向量模型名称，比如`text-embedding-3-small`。列表中已经列出主流向量模型，建议使用列表中的，比如谷歌的Gemini向量模型，填写谷歌Gemini的API Key即可使用。

- **Provider (供应商)**
    - **配置**：下拉列表，选择你使用的向量模型的供应商。

- **Base URL & API Key**
    - 同上。填写你所使用的向量模型的URL和API Key。

- **Model Capabilities (模型能力)**
    - **Reasoning / Vision / Websearch**:
        - **深度建议**：**全部不要勾选！**
        - **原因**：这是插件 UI 复用了 Chat Model 的弹窗代码。Embedding 模型的工作是“把文字变成向量”，它不需要推理，不需要联网，目前的插件架构也不支持多模态向量化（Vision Embedding）。勾选这些可能会导致插件发送错误的参数给 API，导致报错。

- **Additional OpenAI Settings (额外的 OpenAI 设置)**
    - **功能**：点击展开后，通常允许你添加自定义 Headers（如 Organization-ID）。
    - **场景**：99% 的个人用户用不到。除非你是企业版 OpenAI 用户，需要指定计费归属的组织。

---

### 总结表格：Add Custom Embedding Model 参数详解 (添加自定义向量模型)

| 项名称 (Item Name)  | 中文名称 | 深度解析与配置建议 (Best Practice)                                             |
| :--------------- | :--- | :-------------------------------------------------------------------- |
| **Model Name**   | 模型名称 | **【最关键】** 必须填入 API 提供商规定的精确字符串 ID (如 `text-embedding-3-small`)，不能自定义。 |
| **Display Name** | 显示名称 | **自定义**。建议简短易读 (如 gemini-001)。                                        |
| **Provider**     | 供应商  | 填写所使用向量模型的供应商名称。                                                      |
| **Base URL**     | 基础地址 | 填写所使用向量模型的Base URL。                                                   |
| **API Key**      | 密钥   | 填写所使用向量模型的API Key，本地模型留空。                                             |
| **Reasoning**    | 推理能力 | 留空不勾选。                                                                |
| **Vision**       | 视觉能力 | 留空不勾选。                                                                |
| **Websearch**    | 联网搜索 | 留空不勾选。                                                                |
| **CORS**         | 跨域开关 | 连接 Localhost (本地模型) 报错时**必选**；云端 API 通常不选。                            |
| **Test**         | 测试按钮 | 提交前务必点击。Chat 模型会发一条 "Hello"，Embedding 会试着向量化一个词，成功后会变绿。               |


---

### 3. QA (问答/RAG 核心设置)

这是 RAG 的配置区域。

- **Enable Semantic Search (启用语义搜索)**:
    - **总开关**。开启后，插件才会去扫描你的笔记并建立向量索引。不开启就没法用 Vault QA。

- **Embedding Model (嵌入模型)**:
    - 选择用于将文字转化为向量的模型。
    - **注意**：一旦选定并建立了索引，**不要随意更换**。如果换了模型，必须点击 Force Re-index Vault 重建整个索引，否则搜不到任何东西。

- **Auto-Index Strategy (自动索引策略)**:
    - **ON MODE SWITCH**: 当你从 Chat 模式切换到 QA 模式时，插件检查是否有新笔记需要索引。
    - **ON STARTUP**: 插件加载时，后台立马索引。
    - **NEVER**: 只有你手动执行命令，才会索引。

- **Max Sources (最大引用源)**:
    - **默认 15**。检索时，选出相关性最高的多少个片段喂给 AI。
    - **建议**：对于 Gemini / GPT 这种大窗口模型，建议**调大至 30-50**。给的信息越多，AI 综合总结的能力越强。

- **Lexical Search RAM Limit (词法搜索 RAM 限制)**:
    - **默认 100MB**。这是给 **BM25（关键词搜索）** 分配的内存。
    - **建议**：如果你的笔记数量超过 5000 篇，建议拉大到 **200MB - 500MB**，防止关键词搜索因为内存不足而遗漏。

- **Enable Folder and Graph Boosts (启用文件夹与图谱增强)**:
    - **Copilot 独家技术**。开启后，如果笔记 A 和笔记 B 在同一个文件夹，或者有双向链接，检索时会提高它们的相关性权重。
    - **建议**：**开启**。这让 RAG 更懂 Obsidian 的结构。

- **Exclusions (排除项)**:
    - 点击 Manage 设置不想被索引的文件夹、标签或文件类型。
    - **建议**：排除 Assets (附件), Templates (模版), Excalidraw (绘图文件)。

- **Inclusions (包含项)**:
    - 白名单模式。设置后，**只**索引这里面的内容。通常不建议用，除非你只想针对某个特定项目做 RAG。

- **Enable Obsidian Sync for Copilot index (为 Copilot 索引启用 Obsidian Sync)**:
    - 把庞大的向量索引文件放入官方同步列表。
    - **建议**：**关闭**。索引文件通常很大（几百 MB），同步很慢且浪费空间。建议每台设备自己在本地跑索引。

- **Disable index loading on mobile (在移动端禁用索引加载)**:
    - **建议**：**开启**。手机内存小，加载几百兆的索引容易闪退。手机上尽量只用 Chat 模式，或者订阅 Plus 用云端索引。

**速查表：QA (RAG) 设置**

| 参数 (Parameter)              | 概括 (Summary)                  |
| :-------------------------- | :---------------------------- |
| **Enable Semantic Search**  | **核心开关**。启用后才能进行知识库问答。        |
| **Embedding Model**         | 向量模型。选定后更换需重建索引 (Re-index)。   |
| **Auto-Index Strategy**     | 索引时机。推荐 **NEVER** (然后手动索引)。   |
| **Max Sources**             | 喂给 AI 的参考片段数量。建议大模型设为 30-50。  |
| **Lexical Search RAM**      | 关键词搜索分配内存。大库建议调大至 200MB+。     |
| **Folder/Graph Boosts**     | 利用文件夹和双链关系优化搜索结果。**建议开启**。    |
| **Exclusions**              | 排除不需要索引的文件夹/标签 (如附件、模版)。      |
| **Enable Obsidian Sync**    | 是否同步索引文件。**建议关闭** (文件大，浪费空间)。 |
| **Disable index on mobile** | 移动端是否禁用索引。**建议开启** (防闪退)。     |

---

### 4. Command (自定义指令)

这里配置快捷指令（Slash Commands）。

- **Custom Prompts Folder Name (自定义提示词文件夹)**:
    - 指定一个文件夹存放你的 `.md` 提示词文件。插件会自动读取该文件夹下的文件作为指令。

- **Custom Prompt Templating (自定义提示词模版化)**:
    - **开关**。开启后，支持解析 `{activenote}`, `{selection}` 等变量。
    - **建议**：开启。

- **Custom Prompts Sort Strategy (排序策略)**:
    - **Recency**: 最近用的排前面。
    - **Alphabetical**: 按字母排序。
    - **Manual**: 手动排序

- **Commands List (指令列表)**:
    - 列出了所有已加载的指令（如 Fix grammar, Summarize）。
    - **In Menu**: 是否显示在右键菜单里。
    - **Slash Cmd**: 是否可以通过 `/` 呼出。
    - **Actions**: 编辑或删除。

**速查表：Command 指令设置**

| 参数 (Parameter) | 概括 (Summary) |
| :--- | :--- |
| **Custom Prompts Folder** | 存放自定义 .md 提示词文件的文件夹路径。 |
| **Prompt Templating** | 开启变量支持 (如 `{selection}` 自动填入选中文本)。 |
| **Sort Strategy** | 指令排序方式 (按名称或按最近使用)。 |
| **Commands List** | 管理具体指令在右键菜单或 Slash 命令中的可见性。 |

---

### 5. Plus (Plus 会员功能)

这部分主要针对 Agent 和记忆功能。部分功能如果你配置了本地模型且算力足够，也可能在未来开放，但目前主要针对 Plus。

- **Enable Autonomous Agent (启用自主智能体)**:
    - **核心开关**。开启后，在 Plus 模型下，AI 不再是单纯的回答者，而是**行动者**。它会根据问题拆解步骤：搜索网络 -> 搜索本地 -> 整合答案。
    - **注意**：Agent 模式速度较慢，适合复杂任务。

- **Memory Folder Name (记忆文件夹名称)**:
    - 存放 AI 长期记忆数据的路径。

- **Reference Recent Conversation (参考最近对话)**:
    - 让 AI 在新的聊天窗口中，也能“想起”你上一次聊天聊了什么。

- **Max Recent Conversations (最大最近对话数)**:
    - **默认 30**。AI 会扫描最近 30 个聊天文件作为背景上下文。
    - **警告**：数值过大会显著增加 Token 消耗和延迟。

- **Reference Saved Memories (参考保存的记忆)**:
    - 开启后，AI 会读取你明确要求它“记住”的信息（比如“记住我只用 TypeScript 写代码”）。

- **Autocomplete (自动补全)**:
    - 截图显示暂时不可用。类似于 GitHub Copilot 的行内代码/文本补全功能。

**速查表：Plus 高级功能**

| 参数 (Parameter) | 概括 (Summary) |
| :--- | :--- |
| **Enable Autonomous Agent**| 开启智能体模式，允许 AI 联网搜索和规划任务。 |
| **Memory Folder** | 长期记忆文件的存储位置。 |
| **Ref. Recent Conversation**| 允许 AI 读取之前的对话记录作为背景。 |
| **Max Recent Conversations**| 读取最近对话的数量限制 (默认 30)。 |
| **Ref. Saved Memories** | 允许 AI 读取用户显式保存的记忆点。 |

---

### 6. Advanced (高级设置)

- **User System Prompt (用户系统提示词)**:
    - **全局人设**。无论你选哪个模型，这个提示词都会作为 System Message 发送给 AI。
    - **用法举例**：填入“你是一个 Obsidian 专家，回答请使用 Markdown，不要啰嗦”。

- **Enable Encryption (启用加密)**:
    - 对存储在 `data.json` 中的 API Key 进行加密。
    - **建议**：如果你会分享你的 Obsidian 库给别人，或者使用同步盘，**务必开启**，防止 Key 泄露。

- **Debug Mode (调试模式)**:
    - 开启后，控制台（Ctrl+Shift+I）会输出大量日志。仅在报错求助时开启。

- **Create Log File (创建日志文件)**:
    - 一键生成诊断日志，方便发给开发者报 Bug。

**速查表：Advanced 高级设置**

| 参数 (Parameter) | 概括 (Summary) |
| :--- | :--- |
| **User System Prompt** | 设置全局通用的 System Message (AI 人设)。 |
| **Enable Encryption** | 加密本地存储的 API Key，提升安全性。 |
| **Debug Mode** | 开启控制台详细日志 (排错用)。 |
| **Create Log File** | 生成用于反馈 Bug 的日志文件。 |

---

[AI+API+Key属性.md](https://file.notion.so/f/f/59598ac9-9811-819f-adcd-000369d5acbf/1a91d7ae-9918-4314-a304-8107774c0480/AI_API_Key%E5%B1%9E%E6%80%A7.md?table=block&id=2c798ac9-9811-8029-b769-d467be823a03&spaceId=59598ac9-9811-819f-adcd-000369d5acbf&expirationTimestamp=1768629600000&signature=MTV9zF2gQnuEkMKnhJP9OMmiafHSVzHRmX9iiB5Jbm0&downloadName=AI+API+Key%E5%B1%9E%E6%80%A7.md)

| 厂商/模型 (Vendor)            | 核心模型名称 (API Model Name)                                                                 | 官方 Native Base URL                          | OpenAI 兼容 Base URL (推荐)                                    | 推理 (Reasoning) | 视觉 (Vision) | 搜索 (Web Search) | 备注 (Remarks)                                             |
| :------------------------ | :-------------------------------------------------------------------------------------- | :------------------------------------------ | :--------------------------------------------------------- | :------------: | :---------: | :-------------: | :------------------------------------------------------- |
| **OpenAI**                | `gpt-5.1`<br>`gpt-5.1-chat`<br>`gpt-5.1-codex`<br>`o3-2025-04-16` / `o3-pro-2025-06-10` | `https://api.openai.com/v1`                 | `https://api.openai.com/v1`                                |       ✅        |      ✅      |        ❌        | 最新主推 GPT-5.1 系列，支持推理与视觉，原生无联网搜索（需插件）。                    |
| **Google (Gemini)**       | `gemini-3-pro`<br>`gemini-2.5-pro`<br>`gemini-2.5-flash`<br>`gemini-2.5-flash-lite`     | `https://generativelanguage.googleapis.com` | `https://generativelanguage.googleapis.com/v1beta/openai/` |       ✅        |      ✅      |        ✅        | Gemini 3 Pro 为最新旗舰，2.5 系列为主力高性价比模型，多模态与 Grounding 支持完善。  |
| **Anthropic (Claude)**    | `claude-opus-4-5-20251101`<br>`claude-sonnet-4-5-20250929`                              | `https://api.anthropic.com`                 | 无原生兼容（建议用中间层如 OpenRouter）                                  |       ✅        |      ✅      |        ❌        | 4.5 系列命名带日期 tag，推理与视觉能力强，但无原生联网搜索能力。                     |
| **Perplexity**            | `sonar-pro`<br>`sonar-search`<br>`sonar-reasoning-pro`                                  | `https://api.perplexity.ai`                 | `https://api.perplexity.ai`                                |       ✅        |      ❌      |        ✅        | Perplexity API 以实时搜索为核心，`sonar-reasoning-pro` 结合推理与搜索能力。 |
| **xAI (Grok)**            | `grok-4`<br>`grok-4-1`                                                                  | `https://api.x.ai/v1`                       | `https://api.x.ai/v1`                                      |       ✅        |      ✅      |        ✅        | 最新 Grok 4 系列，兼容 OpenAI API 结构，支持视觉与实时搜索（Live Search）。    |
| **Alibaba (通义千问 / Qwen)** | `qwen3-max`<br>`qwen3-vl-30b`<br>`qwen2.5-max`                                          | `https://dashscope.aliyuncs.com`            | `https://dashscope.aliyuncs.com/compatible-mode/v1`        |       ✅        |      ✅      |        ✅        | Qwen 3 系列为最新主推，具备强视觉与搜索能力。VL 系列支持多模态。                    |
| **Moonshot (Kimi)**       | `kimi-k2-thinking`<br>`moonshot-k2`                                                     | `https://api.moonshot.cn/v1`                | `https://api.moonshot.cn/v1`                               |       ✅        |      ✅      |        ✅        | Moonshot K2 专注长上下文与深度推理，多模态支持良好，并内置 Web Search 工具调用。     |
| **DeepSeek (深度求索)**       | `deepseek-v3.2`<br>`deepseek-reasoner`<br>`deepseek-chat`                               | `https://api.deepseek.com`                  | `https://api.deepseek.com`                                 |       ✅        |      ❌      |        ❌        | DeepSeek 主力为推理模型，API 多为纯文本，不支持视觉与内置搜索。                   |
| **Doubao (字节豆包)**         | `doubao-1.5-pro-32k`<br>`doubao-thinking`                                               | `https://ark.cn-beijing.volces.com/api/v3`  | `https://ark.cn-beijing.volces.com/api/v3`                 |       ✅        |      ✅      |        ✅        | 豆包 Endpoint ID 依控制台设置不同而变化，具备多模态与联网能力，性价比高。              |
| **Zhipu AI (智谱 GLM)**     | `glm-4.6`<br>`glm-4-flash`                                                              | `https://open.bigmodel.cn/api/paas/v4`      | `https://open.bigmodel.cn/api/paas/v4/`                    |       ✅        |      ✅      |        ✅        | GLM-4.6 为当前最新旗舰模型，GLM-4-Flash 为轻量高效版本，多模态能力完善。           |
