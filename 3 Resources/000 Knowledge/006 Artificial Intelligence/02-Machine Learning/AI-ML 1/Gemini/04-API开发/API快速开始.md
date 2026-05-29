---
title: API 快速开始
aliases:
  - Gemini API 入门
  - Gemini API 快速开始
tags:
  - #topic/gemini
  - #topic/api
  - #type/quickstart
created: 2026-05-25
updated: 2026-05-25
---

# API 快速开始

## 获取 API Key

### 步骤 1：访问 AI Studio

前往 [AI Studio API Key 页面](https://aistudio.google.com/apikey)

### 步骤 2：创建 API Key

1. 点击「Create API Key」
2. 选择或创建 Google Cloud 项目
3. 复制生成的 Key

> [!warning] 安全提示
> 不要将 API Key 提交到代码仓库。使用环境变量或密钥管理服务存储。

---

## 快速测试

### 使用 curl

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=YOUR_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{
    "contents": [{
      "parts": [{
        "text": "你好，介绍一下你自己"
      }]
    }]
  }'
```

### 使用 Python

```python
import google.generativeai as genai

# 配置 API Key
genai.configure(api_key="YOUR_API_KEY")

# 创建模型
model = genai.GenerativeModel('gemini-2.5-pro')

# 生成内容
response = model.generate_content("你好，介绍一下你自己")
print(response.text)
```

### 使用 JavaScript

```javascript
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("YOUR_API_KEY");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

async function run() {
  const result = await model.generateContent("你好，介绍一下你自己");
  console.log(result.response.text());
}

run();
```

---

## 安装 SDK

### Python

```bash
pip install google-generativeai
```

### JavaScript/Node.js

```bash
npm install @google/generative-ai
```

### 其他语言

| 语言 | SDK |
|------|-----|
| Go | `github.com/google/generative-ai-go` |
| Java | `com.google.ai:google-ai-generativelanguage` |
| REST API | 直接 HTTP 调用 |

---

## 基本使用

### 文本生成

```python
model = genai.GenerativeModel('gemini-2.5-pro')
response = model.generate_content("写一首关于春天的诗")
print(response.text)
```

### 多轮对话

```python
chat = model.start_chat(history=[])

response = chat.send_message("你好，我是小明")
print(response.text)

response = chat.send_message("你还记得我的名字吗？")
print(response.text)
```

### 流式输出

```python
response = model.generate_content("写一个长故事", stream=True)
for chunk in response:
    print(chunk.text, end="")
```

---

## 可用模型

| 模型 | 用途 |
|------|------|
| `gemini-2.5-pro` | 复杂任务，最强能力 |
| `gemini-2.5-flash` | 快速响应，成本优化 |
| `gemini-3-pro` | 最新模型（如可用） |

---

## 免费配额

| 方式 | 限制 |
|------|------|
| API Key 免费层 | 100 请求/天 |
| 付费 | 按使用量计费 |

---

## 下一步

- [[Python-SDK]] - Python SDK 详细使用
- [[认证与配额]] - 认证和配额说明
- [[代码示例]] - 更多代码示例

---

## 相关链接

- [[0 Inbox/_processed/AI-ML/Gemini/README|Gemini 知识库导航]]
- [AI Studio](https://aistudio.google.com/)
- [API 文档](https://ai.google.dev/docs)
