---
title: Google Gemini 使用指南
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

# Google Gemini 使用指南

> [!info] 完整的 Gemini AI 使用指南
> 涵盖从入门到高级的完整使用方法，包括 API 集成和 Workspace 集成

---

## 📋 目录

1. [快速开始](#快速开始)
2. [Google AI Studio 使用](#google-ai-studio-使用)
3. [API 集成](#api-集成)
4. [Workspace 集成](#workspace-集成)
5. [高级功能](#高级功能)
6. [最佳实践](#最佳实践)
7. [常见问题](#常见问题)
8. [相关资源](#相关资源)

---

## 🚀 快速开始

### Gemini 版本概览

| 版本 | 状态 | 上下文 | 主要特点 |
|------|------|--------|----------|
| **Gemini 2.5 Pro** | ✅ 可用 | 1M token | 多模态、长上下文、代码能力强 |
| **Gemini 2.5 Flash** | ✅ 可用 | 1M token | 更快响应、适合快速迭代 |
| **Gemini 2.0** | ✅ 可用 | 1M token | 基础功能 |
| **Gemini 3.0 Pro** | 🔮 未发布 | 2M+ token (预估) | 更强推理、自主代理 |

### 快速访问

#### 方式 1：Google AI Studio（在线，推荐新手）

**访问地址**：[aistudio.google.com](https://aistudio.google.com/)

**优势**：
- ✅ 无需安装，直接使用
- ✅ 免费额度可用
- ✅ 实时测试和调试
- ✅ 多模型切换

#### 方式 2：Google One AI Premium（订阅）

**访问地址**：[one.google.com](https://one.google.com/)

**优势**：
- ✅ 完整功能访问
- ✅ Google Workspace 集成
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
│  📁 新对话        │  💬 聊天窗口    │
│  📂 历史记录      │                 │
│  ⚙️ 设置         │  🎛️ 参数调整     │
│  📊 使用统计      │                 │
└─────────────────────────────────────────────┘
```

### 基础功能

#### 1. 文本对话

**操作步骤**：
1. 打开 Google AI Studio
2. 点击"新对话"
3. 输入提示词
4. 查看响应

**提示词技巧**：
```markdown
# 清晰描述任务
"帮我分析这篇文档，提取关键观点：[文档内容]"

# 指定输出格式
"请用以下格式输出：JSON、表格、项目符号"

# 提供上下文
"背景：我正在做一个 [项目]
任务：[具体需求]
要求：[期望输出]"
```

#### 2. 多模态输入

**图像分析**：
```markdown
1. 点击输入框的 📷 图标
2. 上传图片（支持 JPG, PNG, GIF）
3. 输入分析请求
   - "描述这张图片"
   - "图片中的文字是什么？"
   - "帮我重新设计这个界面"
```

**视频分析**：
```markdown
1. 上传视频文件（支持 MP4, WebM）
2. 输入分析请求
   - "总结视频内容"
   - "提取视频中的关键帧"
   - "视频的节奏如何？"
```

**音频处理**：
```markdown
1. 上传音频文件（支持 MP3, WAV）
2. 输入处理请求
   - "转录这段音频"
   - "总结演讲要点"
   - "翻译成英文"
```

#### 3. 代码生成和调试

**代码生成**：
```markdown
"用 Python 写一个函数，实现快速排序算法。
要求：
- 添加注释
- 包含测试用例
- 时间复杂度说明"
```

**代码调试**：
```markdown
"帮我调试这段代码：
[代码块]
错误信息：[错误日志]

请说明：
1. 问题所在
2. 原因分析
3. 修复方案
4. 改进建议"
```

**代码优化**：
```markdown
"优化这段代码的性能：
[代码块]

当前性能：[基准数据]
目标性能：[期望提升]

请提供：
1. 优化后的代码
2. 性能对比
3. 优化原理说明"
```

---

## 🔌 API 集成

### API 密钥获取

#### 步骤 1：创建 Google Cloud 项目

1. 访问 [console.cloud.google.com](https://console.cloud.google.com/)
2. 点击"创建项目"
3. 命名项目（如：gemini-integration）
4. 选择或创建计费账户

#### 步骤 2：启用 API

1. 在项目中搜索 "Generative Language API"
2. 点击"启用"
3. 等待激活完成

#### 步骤 3：创建 API 密钥

1. 进入 API 凭证页面
2. 点击"创建凭据" > "API 密钥"
3. 复制生成的密钥
4. **重要**：安全存储密钥，不要泄露

### Python 集成

#### 安装 SDK

```bash
pip install google-generativeai
```

#### 基础使用

```python
import google.generativeai as genai

# 配置 API
genai.configure(api_key="YOUR_API_KEY")

# 创建模型实例
model = genai.GenerativeModel('gemini-2.5-pro')

# 生成内容
response = model.generate_content("写一个 Python 函数，计算斐波那契数列")
print(response.text)
```

#### 高级使用 - 流式响应

```python
# 流式生成
response = model.generate_content(
    "写一篇关于 AI 的技术文章",
    stream=True
)

for chunk in response:
    print(chunk.text, end="")
```

#### 高级使用 - 多模态

```python
from PIL import Image

# 图像输入
image = Image.open("example.jpg")

response = model.generate_content([
    "描述这张图片中的场景",
    image
])
print(response.text)
```

### JavaScript/Node.js 集成

#### 安装 SDK

```bash
npm install @google/generative-ai
```

#### 基础使用

```javascript
import { GoogleGenerativeAI } from '@google/generative-ai';

// 初始化
const genAI = new GoogleGenerativeAI('YOUR_API_KEY');
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });

// 生成内容
const response = await model.generateContent('写一个 React 组件');
console.log(response.response.text());
```

### REST API 直接调用

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

### API 参数说明

#### 常用参数

| 参数 | 类型 | 说明 | 示例 |
|------|------|------|------|
| `model` | string | 模型名称 | `"gemini-2.5-pro"` |
| `temperature` | number | 随机性 (0-1) | `0.7` |
| `topP` | number | 核采样 (0-1) | `0.9` |
| `topK` | number | 采样词数 | `40` |
| `maxOutputTokens` | number | 最大输出 tokens | `2048` |

#### 参数配置建议

**创意写作**：
```python
temperature=0.9,
topP=0.95,
topK=50
```

**代码生成**：
```python
temperature=0.3,
topP=0.8,
topK=30
```

**信息提取**：
```python
temperature=0.1,
topP=0.5,
topK=10
```

---

## 📧 Workspace 集成

### Gmail 集成

#### 功能

- ✅ 智能邮件起草
- ✅ 邮件总结
- ✅ 智能回复建议
- ✅ 邮件分类

#### 使用方法

1. **激活 Google One AI Premium**
   ```
   Settings > Google One AI > "Get started"
   ```

2. **在 Gmail 中使用**
   - **撰写邮件**：点击 ✨ AI 图标生成草稿
   - **总结邮件**：选中邮件 → "Summarize"
   - **智能回复**：点击 💬 "Smart reply"

3. **最佳实践**
   - 提供清晰上下文
   - 指定回复风格（正式/非正式）
   - 检查和编辑 AI 生成内容

### Google Docs 集成

#### 功能

- ✅ 文档生成
- ✅ 内容扩展
- ✅ 语法检查
- ✅ 风格调整

#### 使用方法

1. **激活 AI 功能**
   ```
   Tools > AI assistants
   ```

2. **在 Docs 中使用**
   - **生成内容**：`@` → "Help me write"
   - **扩展段落**：选中文字 → "Expand"
   - **重写**：选中文字 → "Rewrite" → 选择风格
   - **总结文档**：`@` → "Summarize this document"

3. **使用场景**

**场景 1：大纲生成**
```
@ "帮我创建一个技术文档大纲，主题：[主题]"
```

**场景 2：内容补充**
```
选中段落 → "Help me write more"
```

**场景 3：格式调整**
```
选中内容 → "Rewrite" → "More formal"
```

### Google Sheets 集成

#### 功能

- ✅ 公式生成
- ✅ 数据分析
- ✅ 图表创建
- ✅ 趋势预测

#### 使用方法

1. **在 Sheets 中使用**
   - **公式生成**：`=AI("计算列 A 的平均值")`
   - **数据分析**：选中数据 → `@` → "Analyze trends"
   - **创建图表**：`@` → "Create chart from data"

2. **实用示例**

**公式生成**：
```
@ "写一个公式，计算列 A 和列 B 的乘积"
```

**数据洞察**：
```
选中数据 → @ "告诉我这个数据的趋势和异常值"
```

**数据清洗**：
```
选中列 → @ "清理这些数据，去除重复和空值"
```

### Google Slides 集成

#### 功能

- ✅ 幻灯片生成
- ✅ 内容建议
- ✅ 设计优化
- ✅ 演讲稿生成

#### 使用方法

1. **在 Slides 中使用**
   - **生成幻灯片**：`@` → "Create a presentation about [topic]"
   - **优化内容**：选中幻灯片 → "Improve this slide"
   - **生成演讲稿**：`@` → "Write speaker notes for this slide"

---

## 🎓 高级功能

### 1. 长上下文处理

#### 超长文档处理

**场景**：处理 500K+ token 的文档

**方法 1：分块处理**
```python
# 将文档分成块
chunks = split_document(document, chunk_size=100000)

# 逐块处理
summaries = []
for chunk in chunks:
    summary = model.generate_content(f"总结这一部分：\n{chunk}")
    summaries.append(summary)

# 合并总结
final_summary = model.generate_content(f"合并这些总结：\n{summaries}")
```

**方法 2：RAG（检索增强生成）**
```python
# 1. 向量化文档
vectors = embed_documents(chunks)

# 2. 检索相关片段
query = "用户问题"
relevant_chunks = retrieve_similar(query, vectors, top_k=5)

# 3. 基于检索内容生成
context = "\n".join(relevant_chunks)
response = model.generate_content(
    f"基于以下上下文回答问题：\n{context}\n\n问题：{query}"
)
```

### 2. 多轮对话

#### 对话历史管理

```python
# 存储对话历史
conversation_history = []

# 添加新消息
def add_message(role, content):
    conversation_history.append({
        "role": role,  # "user" or "model"
        "parts": [{"text": content}]
    })

# 生成响应（带历史）
def chat_with_gemini(user_input):
    add_message("user", user_input)
    response = model.generate_content(conversation_history)
    add_message("model", response.text)
    return response.text
```

#### 上下文窗口优化

```python
# 限制历史长度，避免超上下文
MAX_HISTORY_TOKENS = 800000

def trim_history(history):
    total_tokens = sum(len(msg["parts"][0]["text"]) for msg in history)
    while total_tokens > MAX_HISTORY_TOKENS:
        history.pop(0)
        total_tokens = sum(len(msg["parts"][0]["text"]) for msg in history)
    return history
```

### 3. 工具调用（Function Calling）

#### 定义工具

```python
# 定义可用的工具
tools = [
    {
        "name": "search_database",
        "description": "在数据库中搜索信息",
        "parameters": {
            "type": "object",
            "properties": {
                "query": {
                    "type": "string",
                    "description": "搜索查询"
                }
            },
            "required": ["query"]
        }
    }
]

# 配置模型使用工具
model = genai.GenerativeModel(
    'gemini-2.5-pro',
    tools=tools
)
```

#### 工具调用流程

```python
# 1. 用户请求
user_request = "搜索产品信息：iPhone 15"

# 2. 模型决定是否需要工具
response = model.generate_content(user_request)

# 3. 如果模型调用工具
if response.candidates[0].function_calls:
    for call in response.candidates[0].function_calls:
        function_name = call.name
        arguments = call.args

        # 4. 执行工具
        if function_name == "search_database":
            result = search_database(arguments["query"])

        # 5. 将结果返回给模型
        final_response = model.generate_content(
            f"工具返回结果：{result}\n\n原请求：{user_request}"
        )
```

### 4. 自定义微调（需要 Enterprise）

#### 准备数据

```json
{
  "training_examples": [
    {
      "text_input": "写一个排序算法",
      "text_output": "以下是几种常见的排序算法及其 Python 实现..."
    }
  ]
}
```

#### 微调模型（需要 Enterprise 许可）

```python
# 注意：此功能需要 Google Cloud AI Platform Enterprise
# 示例代码仅供参考

from google.cloud import aiplatform

# 上传训练数据
aiplatform.Model.upload(
    project="your-project",
    location="us-central1",
    display_name="custom-gemini",
    training_data="gs://your-bucket/training-data.jsonl"
)

# 开始微调
aiplatform.Model.create_tuning_job(
    project="your-project",
    location="us-central1",
    base_model_id="gemini-2.5-pro",
    training_data="gs://your-bucket/training-data.jsonl"
)
```

---

## 🎯 最佳实践

### 1. 提示词工程

#### CLEAR 框架

```
C - Context（上下文）：提供背景信息
L - Limit（限制）：明确输出限制
E - Examples（示例）：给出期望的示例
A - Ask（提问）：清晰的具体任务
R - Refine（优化）：迭代优化提示词
```

#### 实际应用

**❌ 不好的提示**：
```
"帮我写个代码"
```

**✅ 好的提示**：
```
"上下文：我正在开发一个 Web 应用，使用 React 和 TypeScript

任务：写一个 React 组件，实现用户登录表单

要求：
- 使用 TypeScript
- 包含表单验证
- 支持邮箱和密码输入
- 添加提交按钮和加载状态

输出格式：完整的 React 组件代码，包含类型定义和样式"
```

### 2. 成本优化

#### Token 计算策略

```python
# 估算 token 使用量
def estimate_tokens(text):
    # 英文：约 1 token = 4 字符
    # 中文：约 1 token = 1.5 字符
    return len(text) / 4  # 粗略估算

# 监控使用量
total_tokens = estimate_tokens(input_text) + estimate_tokens(output_text)
cost = total_tokens * 0.000002  # 假设价格
```

#### 优化建议

**输入优化**：
- 去除无关信息
- 使用简洁表达
- 避免重复上下文

**输出优化**：
- 限制输出长度：`maxOutputTokens=1024`
- 使用结构化输出
- 启用流式输出

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

### 3. 错误处理

#### 常见错误和解决方案

| 错误 | 原因 | 解决方案 |
|------|------|----------|
| `401 Unauthorized` | API 密钥无效 | 检查密钥配置 |
| `429 Too Many Requests` | 超出速率限制 | 实现重试逻辑 |
| `400 Invalid Argument` | 参数错误 | 检查请求参数 |
| `500 Internal Error` | 服务器错误 | 稍后重试 |

#### 重试逻辑实现

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

### 4. 安全和隐私

#### 内容过滤

```python
# 配置安全设置
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

#### 数据隐私

- ✅ 不要在提示词中包含敏感信息
- ✅ 使用数据脱敏
- ✅ 遵守 GDPR 和其他隐私法规
- ✅ 定期审查 API 日志

---

## 🐛 常见问题

### 安装和配置

**Q: API 密钥在哪里获取？**
A: 访问 Google Cloud Console，创建项目并启用 API，然后创建 API 密钥。

**Q: 如何在本地环境使用？**
A: 使用环境变量存储 API 密钥：`export GOOGLE_API_KEY="your-key"`

### 功能使用

**Q: 支持哪些语言？**
A: 支持中文、英文、日语、韩语等 100+ 种语言

**Q: 上下文窗口有多大？**
A: Gemini 2.5 Pro 支持 1M token 上下文，约等于 750K 英文单词

**Q: 可以处理多大的文件？**
A: 支持最大 32MB 的文件上传，建议分块处理超长文档

### 计费和限额

**Q: 免费额度是多少？**
A: Google AI Studio 有免费额度，具体数量根据区域和账户类型而异

**Q: 如何查看使用量？**
A: 在 Google Cloud Console 的 API 使用页面查看详细统计

**Q: 超出限制会怎样？**
A: 会收到 429 错误，需要等待或升级到付费计划

### 技术问题

**Q: 如何提高响应速度？**
A: 1. 使用 Gemini 2.5 Flash 模型；2. 限制输出长度；3. 优化网络连接

**Q: 为什么有时候响应质量不一致？**
A: 1. 降低 temperature；2. 提供更详细的上下文；3. 优化提示词

**Q: 如何处理超长上下文？**
A: 使用分块处理或 RAG（检索增强生成）方法

---

## 📊 使用统计和监控

### Google Cloud Console 监控

**访问位置**：[console.cloud.google.com/apis/dashboard](https://console.cloud.google.com/apis/dashboard)

**监控指标**：
- 每日请求数
- Token 使用量
- 错误率
- 延迟统计

### 自定义监控（Python）

```python
import logging
import time

# 配置日志
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

## 🚀 性能优化建议

### 1. 批量请求

```python
# 并行处理多个请求
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

### 2. 连接复用

```python
# 使用连接池
from google.generativeai import configure, GenerativeModel

# 一次配置，多次使用
configure(api_key="YOUR_API_KEY")
model = GenerativeModel('gemini-2.5-pro')

# 多次调用，复用连接
for prompt in prompts:
    response = model.generate_content(prompt)
```

### 3. 响应缓存

```python
# 使用 Redis 或内存缓存
import hashlib
import json

def get_cache_key(prompt):
    return hashlib.md5(prompt.encode()).hexdigest()

def cache_response(prompt, response, ttl=3600):
    key = get_cache_key(prompt)
    # 存储到缓存，TTL 为 1 小时
    # 实现取决于你的缓存系统

def get_cached_response(prompt):
    key = get_cache_key(prompt)
    # 从缓存获取
    # 实现取决于你的缓存系统
```

---

## 🔗 相关资源

### 官方资源

- [Google AI Studio](https://aistudio.google.com/) - 在线平台
- [AI 文档](https://ai.google.dev/docs) - 完整文档
- [API 参考](https://ai.google.dev/docs/gemini-api-reference) - API 参考
- [GitHub 示例](https://github.com/google/generative-ai-python) - 代码示例
- [Google Cloud Console](https://console.cloud.google.com/) - 控制台

### 教程和指南

- [快速开始指南](https://ai.google.dev/docs/quickstart)
- [Prompt 工程](https://ai.google.dev/docs/prompt-engineering)
- [多模态使用](https://ai.google.dev/docs/multimodal)
- [工具调用](https://ai.google.dev/docs/function-calling)

### 社区和支持

- [Google AI Community](https://ai.google.dev/community) - 社区论坛
- [Stack Overflow](https://stackoverflow.com/questions/tagged/google-gemini) - 技术问答
- [GitHub Issues](https://github.com/google/generative-ai-python/issues) - 问题反馈

### 相关笔记

- `[[1 Projects/03-Personal/Core/📖 [渐进] Google Gemini 模型概览.md]]` - 模型概览
- `[[2 Areas/ai-knowledge/ai-knowledge.md]]` - AI 知识管理
- `[[3 Resources/01-Tech/AI/]]` - AI 技术资源

---

## ✅ 快速参考

### 常用命令

```bash
# Python 安装
pip install google-generativeai

# Node.js 安装
npm install @google/generative-ai

# 测试 API（curl）
curl -X POST \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -d '{
    "contents": [{"parts": [{"text": "Hello"}]}]
  }' \
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent'
```

### 模型选择指南

| 场景 | 推荐模型 | 原因 |
|------|---------|------|
| 创意写作 | Gemini 2.5 Pro | 高 temperature，创意生成 |
| 代码生成 | Gemini 2.5 Pro | 强代码能力 |
| 快速原型 | Gemini 2.5 Flash | 响应更快 |
| 长文档处理 | Gemini 2.5 Pro | 1M 上下文 |
| 实时对话 | Gemini 2.5 Flash | 低延迟 |

### 参数速查

| 场景 | Temperature | TopP | TopK |
|------|-------------|-------|------|
| 创意 | 0.9 | 0.95 | 50 |
| 代码 | 0.3 | 0.8 | 30 |
| 分析 | 0.1 | 0.5 | 10 |
| 翻译 | 0.2 | 0.6 | 20 |

---

> 💡 **使用提示**：
> 1. 先在 Google AI Studio 免费测试，确认效果后再集成 API
> 2. 优化提示词是提高输出质量的关键
> 3. 监控 API 使用量和成本，设置预算警告
> 4. 实现错误处理和重试逻辑，提高稳定性
> 5. 遵循最佳实践，保护 API 密钥和用户数据

---

**创建日期**：2026-01-30
**最后更新**：2026-01-30
**文档版本**：v1.0
**状态**：✅ 完成
