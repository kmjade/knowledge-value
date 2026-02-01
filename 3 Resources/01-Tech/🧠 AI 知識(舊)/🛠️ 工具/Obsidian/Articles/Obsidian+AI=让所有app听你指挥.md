---
title: Obsidian+AI=让所有app听你指挥
aliases: [Obsidian AI, Smart Composer, MCP]
created: 2026-01-25
# 教程
source: https://file.notion.so/f/f/59598ac9-9811-819f-adcd-000369d5acbf
type: tutorial
interest-level: 5
study-status: completed
para: resources
language: zh-cn
---

# [Obsidian+Smart+Composer+MCP指挥中枢.md](https://file.notion.so/f/f/59598ac9-9811-819f-adcd-000369d5acbf/da2c1f5b-a6fb-409e-98d7-51fd59295f83/Obsidian_Smart_Composer_MCP%E6%8C%87%E6%8C%A5%E4%B8%AD%E6%9E%A2.md?table=block&id=29698ac9-9811-80ae-8ff1-f71dde9f10ff&spaceId=59598ac9-9811-819f-adcd-000369d5acbf&expirationTimestamp=1768629600000&signature=fDyIg8Z3kO8GuRO2FdIkzptlzhHrCNaESMF4JWoZCno&downloadName=Obsidian+Smart+Composer+MCP%E6%8C%87%E6%8C%A5%E4%B8%AD%E6%9E%A2.md)


## 一、核心原理：MCP 是什么？

你不需要记住 MCP 的全称，只需要理解它的比喻：**一个「万能翻译官」或「通用遥控器」**。

- **过去**：Obsidian, Notion, Outlook... 每个 App 都说自己的"方言"，互相無法沟通。
- **现在**：通過 MCP 這個"翻译官"，AI 可以将你在 Obsidian 中下达的指令，精准地"翻译"成各个 App 能听懂的命令，并让它们去执行。

我们使用的 `Smart Composer` 外掛，就是把這個"万能翻译官"直接内置到了 Obsidian 里，让 Obsidian 从一个筆記孤岛，变成了能夠号令万物的指挥部。

---

# 配置

### Step 1: 安裝外掛

在 Obsidian 的第三方外掛市场中，搜尋 `Smart Composer`，点击安裝并启用。

# 配置

外掛本身只是一个"躯壳"，我们需要为它装上一个 AI "大脑"，才能让它思考。

1.  **新增 AI 供应商 (Provider)**
    - 打開 `Smart Composer` 外掛設置。
    - 找到 `Providers` 选项，点击 `Add custom provider`。
    - 填寫以下資訊 (以智谱 GLM 为例):
        - **ID**: `GLM` (可自定义)
        - **Provider Type**: `OpenAI Compatible` (相容 OpenAI 协议)
        - **Base URL**: `https://open.bigmodel.cn/api/paas/v4/`
        - **API Key**: 填入你自己的智谱 API Key。
    - 点击 `Add` 儲存。

2.  **新增 AI 模型 (Model)**
    - 向下找到 `Models` 选项，点击 `Add custom model`。
    - 填寫以下資訊:
        - **ID**: `glm-4.5` (可自定义)
        - **Provider ID**: 選擇上一步創建的 `GLM`。
        - **Model Name**: `glm-4.5-flash` (或其他你需要的模型，如 `glm-4.6`)
    - 点击 `Add` 儲存。

3.  **启用模型**
    - 回到設置顶部，将 `Chat model` 和 `Apply model` 都選擇为我们刚刚創建的 `glm-4.5`。

4.  **測試**
    - 在 Obsidian 左侧選單栏点击 Smart Composer 圖示，打開对话框。
# 配置

---

# 配置

这是最激动人心的一步，我们将为 Obsidian 連接上 Notion 和 Microsoft 365。

### 1. 連接 Notion

1.  回到 `Smart Composer` 設置，拉到最下方找到 `MCP (Meta Control Protocol)` 部分。
2.  点击 `Add MCP Server`。
3.  填寫以下資訊：
    - **Name**: `Notion`
    - **Parameters**: 貼上下面的 JSON 代碼。

```
{
  "command": "npx",
  "args": [
    "-y",
    "@notionhq/notion-mcp-server"
  ],
  "env": {
    "OPENAPI_MCP_HEADERS": "{\"Authorization\": \"Bearer YOUR_NOTION_API_KEY\", \"Notion-Version\": \"2022-06-28\"}"
  }
}
```


**参数說明:**
- `YOUR_NOTION_API_KEY`: 替换为你自己的 Notion Internal Integration Token (Secret)。

# 配置

**測試指令**:
> 讀取我的 notion，列出我 notion 中所有資料庫和頁面的名称。

### 2. 連接 Microsoft 365 (Outlook, Calendar 等)

1.  再次点击 `Add MCP Server`。
2.  填寫以下資訊：
    - **Name**: `MS-365`
    - **Parameters**: 貼上下面的 JSON 代碼。

```
{
  "command": "npx",
  "args": [
    "-y",
    "@softeria/ms-365-mcp-server"
  ],
  "env": {}
}
```

# 配置

**首次使用授权**:
当你第一次使用 MS-365 的 MCP 时，AI 会返回一个網址和一个设备代碼。在瀏覽器中打開该網址，輸入代碼并登入你的微软帳戶，即可完成授权。这是一次性操作。

**測試指令**:
> 讀取我 outlook 收件箱中最近的 3 封電子郵件标题。

---

# 管理

现在，万事俱备。让我们用一个真实案例来感受它的威力。

### Step 1: 准备專案筆記

在 Obsidian 中創建一篇筆記，貼上以下內容：

```markdown
# 專案：活力咖啡线上新品發佈会

## 1. 專案概览
- **客户**: 活力咖啡 (Vitality Coffee)
- **專案目標**: 成功策划并执行一场线上發佈会。
- **關鍵联系人**: 客户方市场经理，王杰森 (jason.wang@vitalitycoffee.com)
- **專案周期**: 2025年10月15日 - 2025年11月15日

## 2. 核心任務分解
- **策划階段**: 敲定發佈会创意主題和流程。
- **宣发階段**: 在社交媒体發佈预热內容。
- **执行階段**: 正式举办线上發佈会。

## 3. 重要會議安排
- **會議主題**: 專案啟動会
- **會議時間**: 下周三下午两点
```

### Step 2: 在 Smart Composer 中下达指令

打開 Smart Composer 对话框，确保 AI 能夠讀取当前筆記的上下文，然后依次下达以下指令：

**指令一：創建 Notion 任務**
# 管理

**指令二：發送 Outlook 電子郵件**
> 根据專案概览里的資訊，起草一封專案啟動電子郵件，發送给客户经理王杰森，電子郵件內容要显得专业正式。

**指令三：創建日历會議**
> 根据專案概览和會議安排，在我的 outlook calendar 里，創建一个專案啟動會議，時間定在下周三下午两点。

观察 AI 逐一完成这些操作，感受从筆記到行动的無缝衔接。

## 五、總結

# 知識

# 工作流


## 附录

# 配置
| :-------------------- | :---------------------------------------------------------------- | :--------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
# 效率
# 效率
# 管理
# 效率
| Adfin                 | 支付平台，提供发票和会计核对功能。                                                 | 日常办公             | [github.com/Adfin-Engineering/mcp-server-adfin](https://github.com/Adfin-Engineering/mcp-server-adfin)                                   |
# 管理
| Airtable              | 对 Airtable 資料庫的读写访问。                                              | 日常办公             | [github.com/domdomegg/airtable-mcp-server](https://github.com/domdomegg/airtable-mcp-server)                                             |
# 管理
# 管理
# 效率
# 管理
| Baserow               | 提供对 Baserow 表格的读写访问。                                              | 日常办公             | [baserow.io/user-docs/mcp-server](https://baserow.io/user-docs/mcp-server)                                                               |
# 管理
# 效率
# 效率
# 管理
# 管理
# 管理
# 效率
# 管理
| Data Exploration      | 对基于 .csv 的數據集進行自主數據探索，提供智能见解。                                     | 日常办公             | [github.com/reading-plus-ai/mcp-server-data-exploration](https://github.com/reading-plus-ai/mcp-server-data-exploration)                 |
# 管理
# 管理
# 工作流
# 管理
| Email Send MCP        | 通過各种提供商發送电子電子郵件，并支持附件。                                              | 日常办公             | [github.com/YUHAI0/email-send-mcp](https://github.com/YUHAI0/email-send-mcp)                                                             |
# 管理
# 效率
# 管理
| Fibery                | 在您的 Fibery 工作区中执行查詢和实体操作。                                         | 日常办公             | [github.com/Fibery-inc/fibery-mcp-server](https://github.com/Fibery-inc/fibery-mcp-server)                                               |
# 管理
# 管理
| GrowthBook            | 創建和讀取功能标志、審查实验、搜尋文檔等。                                             | 日常办公             | [github.com/growthbook/growthbook-mcp](https://github.com/growthbook/growthbook-mcp)                                                     |
# 管理
# 管理
# 效率
# 管理
# 管理
# 管理
# 管理
# 管理
# 管理
# 效率
| Lingo.dev             | 使您的 AI 代理能夠使用 Lingo.dev 本地化引擎"说"地球上的每种语言。                         | 日常办公 / 个人學習      | [github.com/lingodotdev/lingo.dev](https://github.com/lingodotdev/lingo.dev)                                                             |
# 管理
# 效率
# 效率
# 管理
# 管理
# 效率
# 效率
| Miro                  | 访问 MIRO 白板，批量創建和讀取專案。                                             | 日常办公 / 个人學習      | [github.com/k-jarzyna/mcp-miro](https://github.com/k-jarzyna/mcp-miro)                                                                   |
| Google Chat           | 連接 AI 助手到 Google Chat。                                            | 日常办公             | [github.com/siva010928/multi-chat-mcp-server](https://github.com/siva010928/multi-chat-mcp-server)                                       |
# 管理
| Notion (Official)     | Notion 官方 MCP 伺服器。                                                | 日常办公 / 个人學習      | [github.com/makenotion/notion-mcp-server](https://github.com/makenotion/notion-mcp-server)                                               |
# 管理
# 工作流
| Pandoc                | 用于無缝文檔格式转换，支持 Markdown、HTML、PDF、csv 和 docx 等格式。                   | 日常办公 / 个人學習      | [github.com/vivekVells/mcp-pandoc](https://github.com/vivekVells/mcp-pandoc)                                                             |
# 管理
# 管理
| Plane                 | 官方 MCP 伺服器，實現 Plane 專案、工作项和周期的全面 AI 自動化。                          | 日常办公             | [github.com/makeplane/plane-mcp-server](https://github.com/makeplane/plane-mcp-server)                                                   |
# 效率
# 管理
# 效率
# 管理
# 效率
# 效率
# 管理
# 效率
# 工作流
# 工作流
# 效率
# 效率
# 管理
| Tldv                  | 将您的 AI 代理連接到 Google-Meet、Zoom 和 Microsoft Teams。                  | 日常办公             | [gitlab.com/tldv/tldv-mcp-server](https://gitlab.com/tldv/tldv-mcp-server)                                                               |
# 效率
| Trello                | 處理 Trello 看板、列表和卡片。                                               | 日常办公             | [github.com/m0xai/trello-mcp-server](https://github.com/m0xai/trello-mcp-server)                                                         |
# 管理
# 管理
# 管理
# 效率
| Xero (Official)       | 与您的业务会计數據進行交互。                                                    | 日常办公             | [github.com/XeroAPI/xero-mcp-server](https://github.com/XeroAPI/xero-mcp-server)                                                         |
# 效率
# 管理
# 效率
# 管理
# 管理
# 效率
# 管理
| Slack                 | 功能强大的社區版 Slack 伺服器，支持收发訊息等工作空間操作。                                 | 日常办公             | [github.com/korotovsky/slack-mcp-server](https://github.com/korotovsky/slack-mcp-server)                                                 |
