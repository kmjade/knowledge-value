---
# 指南
aliases:
  - Gemini Guide
  - Gemini Tutorial
tags:
  - gemini
  - google-ai
  - tutorial
  - guide
  - ai-models
  - api
  - workspace
created: 2026-01-30
last_updated: 2026-01-30
resource_type: guide
status: done
---

# 指南

# 指南
# 方法

---

## 📋 目錄

1. [快速開始](#快速開始)
2. [Google AI Studio 使用](#google-ai-studio-使用)
3. [API 整合](#api-整合)
4. [Workspace 整合](#workspace-整合)
5. [高级功能](#高级功能)
6. [最佳實踐](#最佳實踐)
7. [常见問題](#常见問題)
8. [相關資源](#相關資源)

---

## 🚀 快速開始

# 版本

# 版本
|------|------|--------|----------|
| **Gemini 2.5 Pro** | ✅ 可用 | 1M token | 多模态、长上下文、代碼能力强 |
| **Gemini 2.5 Flash** | ✅ 可用 | 1M token | 更快響應、适合快速迭代 |
| **Gemini 2.0** | ✅ 可用 | 1M token | 基礎功能 |
| **Gemini 3.0 Pro** | 🔮 未發佈 | 2M+ token (预估) | 更强推理、自主代理 |

### 快速访问

#### 方式 1：Google AI Studio（線上，推荐新手）

**访问地址**：[aistudio.google.com](https://aistudio.google.com/)

**優勢**：
- ✅ 無需安裝，直接使用
- ✅ 免費额度可用
- ✅ 实时測試和除錯
- ✅ 多模型切換

#### 方式 2：Google One AI Premium（訂閱）

**访问地址**：[one.google.com](https://one.google.com/)

**優勢**：
- ✅ 完整功能访问
- ✅ Google Workspace 整合
- ✅ 更高的使用限额
- ✅ 优先服务

**定价**：约 $20/月

---

## 🎨 Google AI Studio 使用

### 界面导览

```
┌─────────────────────────────────────────────┐
│  左侧面板          │  主对话区域     │
│                  │                 │
│  📁 新对话        │  💬 聊天視窗    │
│  📂 歷史記錄      │                 │
│  ⚙️ 設置         │  🎛️ 参数调整     │
│  📊 使用統計      │                 │
└─────────────────────────────────────────────┘
```

### 基礎功能

#### 1. 文本对话

**操作步骤**：
1. 打開 Google AI Studio
2. 点击"新对话"
3. 輸入提示词
# 查看

**提示词技巧**：
```markdown
# 清晰描述任務
# 分析

# 指定輸出格式
"请用以下格式輸出：JSON、表格、專案符号"

# 提供上下文
"背景：我正在做一个 [專案]
任務：[具体需求]
要求：[期望輸出]"
```

#### 2. 多模态輸入

# 分析
```markdown
1. 点击輸入框的 📷 圖示
2. 上傳圖片（支持 JPG, PNG, GIF）
# 分析
   - "描述这张圖片"
   - "圖片中的文字是什么？"
   - "帮我重新設計這個界面"
```

# 分析
```markdown
1. 上傳視訊檔案（支持 MP4, WebM）
# 分析
   - "總結視訊內容"
   - "提取視訊中的關鍵帧"
   - "視訊的节奏如何？"
```

**音頻處理**：
```markdown
1. 上傳音頻檔案（支持 MP3, WAV）
2. 輸入處理请求
   - "转录这段音頻"
   - "總結演讲要點"
   - "翻译成英文"
```

#### 3. 代碼生成和除錯

**代碼生成**：
```markdown
# 排序
要求：
- 新增注释
- 包含測試用例
- 時間复杂度說明"
```

**代碼除錯**：
```markdown
"帮我除錯这段代碼：
[代碼块]
错误資訊：[错误日志]

请說明：
1. 問題所在
# 分析
3. 修復方案
4. 改进建議"
```

**代碼優化**：
```markdown
"優化这段代碼的效能：
[代碼块]

当前效能：[基准數據]
目標效能：[期望提升]

请提供：
1. 優化后的代碼
2. 效能對比
3. 優化原理說明"
```

---

## 🔌 API 整合

### API 密钥获取

#### 步骤 1：創建 Google Cloud 專案

1. 访问 [console.cloud.google.com](https://console.cloud.google.com/)
2. 点击"創建專案"
3. 命名專案（如：gemini-integration）
4. 選擇或創建计费帳戶

#### 步骤 2：启用 API

1. 在專案中搜尋 "Generative Language API"
2. 点击"启用"
3. 等待激活完成

#### 步骤 3：創建 API 密钥

1. 进入 API 凭证頁面
2. 点击"創建凭据" > "API 密钥"
3. 複製生成的密钥
4. **重要**：安全儲存密钥，不要泄露

### Python 整合

#### 安裝 SDK

```bash
pip install google-generativeai
```

#### 基礎使用

```python
import google.generativeai as genai

# 配置
genai.configure(api_key="YOUR_API_KEY")

# 創建模型实例
model = genai.GenerativeModel('gemini-2.5-pro')

# 生成內容
response = model.generate_content("写一个 Python 函数，計算斐波那契数列")
print(response.text)
```

#### 高级使用 - 流式響應

```python
# 流式生成
response = model.generate_content(
    "写一篇关于 AI 的技術文章",
    stream=True
)

for chunk in response:
    print(chunk.text, end="")
```

#### 高级使用 - 多模态

```python
from PIL import Image

# 图像輸入
image = Image.open("example.jpg")

response = model.generate_content([
    "描述这张圖片中的場景",
    image
])
print(response.text)
```

### JavaScript/Node.js 整合

#### 安裝 SDK

```bash
npm install @google/generative-ai
```

#### 基礎使用

```javascript
import { GoogleGenerativeAI } from '@google/generative-ai';

// 初始化
const genAI = new GoogleGenerativeAI('YOUR_API_KEY');
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });

// 生成內容
const response = await model.generateContent('写一个 React 組件');
console.log(response.response.text());
```

### REST API 直接調用

#### 端点

```
POST https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent
```

#### 请求示例

```bash
curl -X POST \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -d '{
    "contents": [{
      "parts": [{
        "text": "Hello, Gemini!"
      }]
    }]
  }' \
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent'
```

### API 参数說明

#### 常用参数

| 参数 | 类型 | 說明 | 示例 |
|------|------|------|------|
| `model` | string | 模型名称 | `"gemini-2.5-pro"` |
| `temperature` | number | 随机性 (0-1) | `0.7` |
| `topP` | number | 核采样 (0-1) | `0.9` |
| `topK` | number | 采样词数 | `40` |
| `maxOutputTokens` | number | 最大輸出 tokens | `2048` |

# 配置

**创意写作**：
```python
temperature=0.9,
topP=0.95,
topK=50
```

**代碼生成**：
```python
temperature=0.3,
topP=0.8,
topK=30
```

**資訊提取**：
```python
temperature=0.1,
topP=0.5,
topK=10
```

---

## 📧 Workspace 整合

### Gmail 整合

#### 功能

- ✅ 智能電子郵件起草
- ✅ 電子郵件總結
- ✅ 智能回覆建議
- ✅ 電子郵件分類

# 方法

1. **激活 Google One AI Premium**
   ```
   Settings > Google One AI > "Get started"
   ```

2. **在 Gmail 中使用**
   - **撰写電子郵件**：点击 ✨ AI 圖示生成草稿
   - **總結電子郵件**：选中電子郵件 → "Summarize"
   - **智能回覆**：点击 💬 "Smart reply"

3. **最佳實踐**
   - 提供清晰上下文
   - 指定回覆风格（正式/非正式）
   - 檢查和編輯 AI 生成內容

### Google Docs 整合

#### 功能

- ✅ 文檔生成
- ✅ 內容擴展
- ✅ 语法檢查
- ✅ 风格调整

# 方法

1. **激活 AI 功能**
   ```
   Tools > AI assistants
   ```

2. **在 Docs 中使用**
   - **生成內容**：`@` → "Help me write"
   - **擴展段落**：选中文字 → "Expand"
   - **重写**：选中文字 → "Rewrite" → 選擇风格
   - **總結文檔**：`@` → "Summarize this document"

3. **使用場景**

**場景 1：大纲生成**
```
@ "帮我創建一个技術文檔大纲，主題：[主題]"
```

**場景 2：內容补充**
```
选中段落 → "Help me write more"
```

**場景 3：格式调整**
```
选中內容 → "Rewrite" → "More formal"
```

### Google Sheets 整合

#### 功能

- ✅ 公式生成
# 分析
- ✅ 圖表創建
- ✅ 趨勢预测

# 方法

1. **在 Sheets 中使用**
   - **公式生成**：`=AI("計算列 A 的平均值")`
# 分析
   - **創建圖表**：`@` → "Create chart from data"

2. **实用示例**

**公式生成**：
```
@ "写一个公式，計算列 A 和列 B 的乘积"
```

**數據洞察**：
```
选中數據 → @ "告诉我這個數據的趨勢和异常值"
```

**數據清洗**：
```
选中列 → @ "清理这些數據，去除重复和空值"
```

### Google Slides 整合

#### 功能

- ✅ 幻灯片生成
- ✅ 內容建議
- ✅ 設計優化
- ✅ 演讲稿生成

# 方法

1. **在 Slides 中使用**
   - **生成幻灯片**：`@` → "Create a presentation about [topic]"
   - **優化內容**：选中幻灯片 → "Improve this slide"
   - **生成演讲稿**：`@` → "Write speaker notes for this slide"

---

## 🎓 高级功能

### 1. 长上下文處理

#### 超长文檔處理

**場景**：處理 500K+ token 的文檔

# 方法
```python
# 将文檔分成块
chunks = split_document(document, chunk_size=100000)

# 逐块處理
summaries = []
for chunk in chunks:
    summary = model.generate_content(f"總結这一部分：\n{chunk}")
    summaries.append(summary)

# 合并總結
final_summary = model.generate_content(f"合并这些總結：\n{summaries}")
```

# 方法
```python
# 1. 向量化文檔
vectors = embed_documents(chunks)

# 2. 檢索相關片段
query = "使用者問題"
relevant_chunks = retrieve_similar(query, vectors, top_k=5)

# 3. 基于檢索內容生成
context = "\n".join(relevant_chunks)
response = model.generate_content(
    f"基于以下上下文回答問題：\n{context}\n\n問題：{query}"
)
```

### 2. 多轮对话

# 管理

```python
# 儲存对话歷史
conversation_history = []

# 新增新訊息
def add_message(role, content):
    conversation_history.append({
        "role": role,  # "user" or "model"
        "parts": [{"text": content}]
    })

# 生成響應（带歷史）
def chat_with_gemini(user_input):
    add_message("user", user_input)
    response = model.generate_content(conversation_history)
    add_message("model", response.text)
    return response.text
```

#### 上下文視窗優化

```python
# 限制歷史长度，避免超上下文
MAX_HISTORY_TOKENS = 800000

def trim_history(history):
    total_tokens = sum(len(msg["parts"][0]["text"]) for msg in history)
    while total_tokens > MAX_HISTORY_TOKENS:
        history.pop(0)
        total_tokens = sum(len(msg["parts"][0]["text"]) for msg in history)
    return history
```

### 3. 工具調用（Function Calling）

#### 定义工具

```python
# 定义可用的工具
tools = [
    {
        "name": "search_database",
        "description": "在資料庫中搜尋資訊",
        "parameters": {
            "type": "object",
            "properties": {
                "query": {
                    "type": "string",
                    "description": "搜尋查詢"
                }
            },
            "required": ["query"]
        }
    }
]

# 配置
model = genai.GenerativeModel(
    'gemini-2.5-pro',
    tools=tools
)
```

#### 工具調用流程

```python
# 1. 使用者请求
user_request = "搜尋产品資訊：iPhone 15"

# 2. 模型决定是否需要工具
response = model.generate_content(user_request)

# 3. 如果模型調用工具
if response.candidates[0].function_calls:
    for call in response.candidates[0].function_calls:
        function_name = call.name
        arguments = call.args

        # 4. 执行工具
        if function_name == "search_database":
            result = search_database(arguments["query"])

        # 5. 将結果返回给模型
        final_response = model.generate_content(
            f"工具返回結果：{result}\n\n原请求：{user_request}"
        )
```

### 4. 自定义微调（需要 Enterprise）

#### 准备數據

```json
{
  "training_examples": [
    {
# 排序
# 排序
    }
  ]
}
```

#### 微调模型（需要 Enterprise 许可）

```python
# 注意：此功能需要 Google Cloud AI Platform Enterprise
# 示例代碼仅供參考

from google.cloud import aiplatform

# 上傳訓練數據
aiplatform.Model.upload(
    project="your-project",
    location="us-central1",
    display_name="custom-gemini",
    training_data="gs://your-bucket/training-data.jsonl"
)

# 開始微调
aiplatform.Model.create_tuning_job(
    project="your-project",
    location="us-central1",
    base_model_id="gemini-2.5-pro",
    training_data="gs://your-bucket/training-data.jsonl"
)
```

---

## 🎯 最佳實踐

### 1. 提示词工程

#### CLEAR 框架

```
C - Context（上下文）：提供背景資訊
L - Limit（限制）：明确輸出限制
E - Examples（示例）：给出期望的示例
A - Ask（提问）：清晰的具体任務
R - Refine（優化）：迭代優化提示词
```

#### 实际應用程式

**❌ 不好的提示**：
```
"帮我写个代碼"
```

**✅ 好的提示**：
```
"上下文：我正在開發一个 Web 應用程式，使用 React 和 TypeScript

任務：写一个 React 組件，實現使用者登入表单

要求：
- 使用 TypeScript
- 包含表单驗證
- 支持邮箱和密碼輸入
- 新增提交按鈕和加载狀態

輸出格式：完整的 React 組件代碼，包含类型定义和樣式"
```

### 2. 成本優化

#### Token 計算策略

```python
# 估算 token 使用量
def estimate_tokens(text):
    # 英文：约 1 token = 4 字符
    # 中文：约 1 token = 1.5 字符
    return len(text) / 4  # 粗略估算

# 監控使用量
total_tokens = estimate_tokens(input_text) + estimate_tokens(output_text)
cost = total_tokens * 0.000002  # 假设价格
```

#### 優化建議

**輸入優化**：
- 去除無关資訊
- 使用简洁表达
- 避免重复上下文

**輸出優化**：
- 限制輸出长度：`maxOutputTokens=1024`
- 使用结构化輸出
- 启用流式輸出

**缓存策略**：
```python
# 缓存常见请求
cache = {}

def get_cached_or_generate(prompt):
    if prompt in cache:
        return cache[prompt]
    response = model.generate_content(prompt)
    cache[prompt] = response
    return response
```

### 3. 错误處理

#### 常见错误和解決方案

| 错误 | 原因 | 解決方案 |
|------|------|----------|
# 配置
| `429 Too Many Requests` | 超出速率限制 | 實現重试逻辑 |
| `400 Invalid Argument` | 参数错误 | 檢查请求参数 |
| `500 Internal Error` | 伺服器错误 | 稍后重试 |

#### 重试逻辑實現

```python
import time
from tenacity import retry, stop_after_attempt, wait_exponential

@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=2, max=10)
)
def generate_with_retry(prompt):
    return model.generate_content(prompt)
```

### 4. 安全和隱私

#### 內容过滤

```python
# 配置
safety_settings = [
    {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    }
]

model = genai.GenerativeModel(
    'gemini-2.5-pro',
    safety_settings=safety_settings
)
```

#### 數據隱私

- ✅ 不要在提示词中包含敏感資訊
- ✅ 使用數據脱敏
- ✅ 遵守 GDPR 和其他隱私法规
- ✅ 定期審查 API 日志

---

## 🐛 常见問題

# 配置

**Q: API 密钥在哪里获取？**
A: 访问 Google Cloud Console，創建專案并启用 API，然后創建 API 密钥。

**Q: 如何在本地環境使用？**
A: 使用環境变量儲存 API 密钥：`export GOOGLE_API_KEY="your-key"`

### 功能使用

**Q: 支持哪些语言？**
A: 支持中文、英文、日语、韩语等 100+ 种语言

**Q: 上下文視窗有多大？**
A: Gemini 2.5 Pro 支持 1M token 上下文，约等于 750K 英文单词

**Q: 可以處理多大的檔案？**
A: 支持最大 32MB 的檔案上傳，建議分块處理超长文檔

### 计费和限额

**Q: 免費额度是多少？**
A: Google AI Studio 有免費额度，具体数量根据区域和帳戶类型而异

# 查看
# 查看

**Q: 超出限制会怎样？**
A: 会收到 429 错误，需要等待或升級到付费計劃

### 技術問題

**Q: 如何提高響應速度？**
A: 1. 使用 Gemini 2.5 Flash 模型；2. 限制輸出长度；3. 優化網路連接

**Q: 为什么有时候響應品質不一致？**
A: 1. 降低 temperature；2. 提供更詳細的上下文；3. 優化提示词

**Q: 如何處理超长上下文？**
# 方法

---

## 📊 使用統計和監控

### Google Cloud Console 監控

**访问位置**：[console.cloud.google.com/apis/dashboard](https://console.cloud.google.com/apis/dashboard)

**監控指标**：
- 每日请求数
- Token 使用量
- 错误率
- 延遲統計

### 自定义監控（Python）

```python
import logging
import time

# 配置
logging.basicConfig(
    filename='gemini_usage.log',
    level=logging.INFO,
    format='%(asctime)s - %(message)s'
)

def track_api_call(prompt, response):
    start_time = time.time()
    tokens_used = len(prompt) + len(response.text)
    duration = time.time() - start_time

    logging.info(
        f"Tokens: {tokens_used}, "
        f"Duration: {duration:.2f}s, "
        f"Status: success"
    )
```

---

## 🚀 效能優化建議

### 1. 批量请求

```python
# 并行處理多個请求
import concurrent.futures

def process_batch(prompts):
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
        futures = [
            executor.submit(model.generate_content, prompt)
            for prompt in prompts
        ]
        results = [
            future.result()
            for future in concurrent.futures.as_completed(futures)
        ]
    return results
```

### 2. 連接复用

```python
# 使用連接池
from google.generativeai import configure, GenerativeModel

# 配置
configure(api_key="YOUR_API_KEY")
model = GenerativeModel('gemini-2.5-pro')

# 多次調用，复用連接
for prompt in prompts:
    response = model.generate_content(prompt)
```

### 3. 響應缓存

```python
# 使用 Redis 或記憶體缓存
import hashlib
import json

def get_cache_key(prompt):
    return hashlib.md5(prompt.encode()).hexdigest()

def cache_response(prompt, response, ttl=3600):
    key = get_cache_key(prompt)
    # 儲存到缓存，TTL 为 1 小时
    # 實現取决于你的缓存系統

def get_cached_response(prompt):
    key = get_cache_key(prompt)
    # 从缓存获取
    # 實現取决于你的缓存系統
```

---

## 🔗 相關資源

### 官方資源

- [Google AI Studio](https://aistudio.google.com/) - 線上平台
- [AI 文檔](https://ai.google.dev/docs) - 完整文檔
- [API 參考](https://ai.google.dev/docs/gemini-api-reference) - API 參考
- [GitHub 示例](https://github.com/google/generative-ai-python) - 代碼示例
- [Google Cloud Console](https://console.cloud.google.com/) - 控制台

# 指南

# 指南
- [Prompt 工程](https://ai.google.dev/docs/prompt-engineering)
- [多模态使用](https://ai.google.dev/docs/multimodal)
- [工具調用](https://ai.google.dev/docs/function-calling)

### 社區和支持

- [Google AI Community](https://ai.google.dev/community) - 社區論壇
- [Stack Overflow](https://stackoverflow.com/questions/tagged/google-gemini) - 技術问答
- [GitHub Issues](https://github.com/google/generative-ai-python/issues) - 問題回饋

### 相關筆記

- `[[1 Projects/03-Personal/Core/📖 [渐进] Google Gemini 模型概览.md]]` - 模型概览
# AI 知識
- `[[3 Resources/01-Tech/AI/]]` - AI 技術資源

---

## ✅ 快速參考

### 常用命令

```bash
# Python 安裝
pip install google-generativeai

# Node.js 安裝
npm install @google/generative-ai

# 測試 API（curl）
curl -X POST \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -d '{
    "contents": [{"parts": [{"text": "Hello"}]}]
  }' \
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent'
```

# 指南

| 場景 | 推荐模型 | 原因 |
|------|---------|------|
| 创意写作 | Gemini 2.5 Pro | 高 temperature，创意生成 |
| 代碼生成 | Gemini 2.5 Pro | 强代碼能力 |
| 快速原型 | Gemini 2.5 Flash | 響應更快 |
| 长文檔處理 | Gemini 2.5 Pro | 1M 上下文 |
| 实时对话 | Gemini 2.5 Flash | 低延遲 |

### 参数速查

| 場景 | Temperature | TopP | TopK |
|------|-------------|-------|------|
| 创意 | 0.9 | 0.95 | 50 |
| 代碼 | 0.3 | 0.8 | 30 |
# 分析
| 翻译 | 0.2 | 0.6 | 20 |

---

> 💡 **使用提示**：
> 1. 先在 Google AI Studio 免費測試，確認效果后再整合 API
> 2. 優化提示词是提高輸出品質的關鍵
> 3. 監控 API 使用量和成本，設置预算警告
> 4. 實現错误處理和重试逻辑，提高稳定性
> 5. 遵循最佳實踐，保護 API 密钥和使用者數據

---

**創建日期**：2026-01-30
# 更新
# 版本
**狀態**：✅ 完成
