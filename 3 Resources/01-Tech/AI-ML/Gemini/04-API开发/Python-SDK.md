---
title: Python SDK
aliases:
  - google-generativeai
  - Gemini Python SDK
tags:
  - #topic/gemini
  - #topic/python
  - #topic/api
  - #type/guide
created: 2026-05-25
updated: 2026-05-25
---

# Python SDK

## 安装

```bash
pip install google-generativeai
```

---

## 初始化

```python
import google.generativeai as genai

# 方式一：直接配置
genai.configure(api_key="YOUR_API_KEY")

# 方式二：使用环境变量
# export GEMINI_API_KEY=your-key
# genai.configure()  # 自动读取环境变量
```

---

## 基本使用

### 创建模型实例

```python
# 使用 Gemini 2.5 Pro
model = genai.GenerativeModel('gemini-2.5-pro')

# 使用 Gemini 2.5 Flash
model = genai.GenerativeModel('gemini-2.5-flash')
```

### 单次生成

```python
response = model.generate_content("解释什么是机器学习")
print(response.text)
```

### 流式生成

```python
response = model.generate_content("写一个长故事", stream=True)
for chunk in response:
    print(chunk.text, end="")
```

---

## 多轮对话

### 基本对话

```python
chat = model.start_chat()

response = chat.send_message("你好")
print(response.text)

response = chat.send_message("请记住我的名字是小明")
print(response.text)

response = chat.send_message("你还记得我的名字吗？")
print(response.text)
```

### 带历史记录的对话

```python
chat = model.start_chat(history=[
    {
        "role": "user",
        "parts": ["我喜欢编程"]
    },
    {
        "role": "model",
        "parts": ["很好！编程是一项很有趣的技能。你喜欢哪种编程语言？"]
    }
])

response = chat.send_message("我喜欢 Python")
print(response.text)
```

---

## 多模态处理

### 图像输入

```python
import PIL.Image

# 加载图像
image = PIL.Image.open("photo.jpg")

# 分析图像
model = genai.GenerativeModel('gemini-2.5-pro')
response = model.generate_content(["描述这张图片", image])
print(response.text)
```

### 多图像输入

```python
image1 = PIL.Image.open("before.png")
image2 = PIL.Image.open("after.png")

response = model.generate_content([
    "比较这两张图片的差异",
    image1,
    image2
])
```

### 视频输入

```python
# 上传视频
video_file = genai.upload_file(path="video.mp4")

# 等待处理完成
import time
while video_file.state.name == "PROCESSING":
    print("处理中...")
    time.sleep(10)
    video_file = genai.get_file(video_file.name)

# 分析视频
model = genai.GenerativeModel('gemini-2.5-pro')
response = model.generate_content([
    "总结这个视频的内容",
    video_file
])
print(response.text)

# 清理文件
genai.delete_file(video_file.name)
```

---

## 系统指令

```python
model = genai.GenerativeModel(
    'gemini-2.5-pro',
    system_instruction="""
    你是一位专业的代码审查专家。
    在审查代码时，请关注：
    1. 代码风格和可读性
    2. 潜在的安全漏洞
    3. 性能问题
    4. 最佳实践
    """
)

response = model.generate_content("""
请审查以下代码：
def calc(a, b):
    return a + b
""")
```

---

## 生成配置

```python
response = model.generate_content(
    "写一首诗",
    generation_config=genai.types.GenerationConfig(
        temperature=0.7,      # 创造性 (0-1)
        top_p=0.9,            # 核采样
        top_k=40,             # Top-K 采样
        max_output_tokens=500, # 最大输出长度
        stop_sequences=["###"] # 停止序列
    )
)
```

### 参数说明

| 参数 | 范围 | 说明 |
|------|------|------|
| temperature | 0-1 | 创造性，越高越随机 |
| top_p | 0-1 | 核采样概率阈值 |
| top_k | 1-100 | Top-K 采样数量 |
| max_output_tokens | 1-65536 | 最大输出 token 数 |

---

## 安全设置

```python
safety_settings = [
    {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    }
]

response = model.generate_content(
    "一些内容",
    safety_settings=safety_settings
)
```

---

## Token 计算

```python
# 计算输入 token 数
text = "这是一段测试文本"
token_count = model.count_tokens(text)
print(f"Token 数量: {token_count.total_tokens}")
```

---

## Embedding 生成

```python
result = genai.embed_content(
    model="models/embedding-001",
    content="什么是机器学习？",
    task_type="retrieval_document"
)
print(result['embedding'])
```

---

## 错误处理

```python
from google.api_core import retry

# 重试配置
retry_policy = {
    "retry": retry.Retry(
        predicate=retry.if_transient_error,
        initial=1.0,
        maximum=10.0,
        multiplier=2.0,
        timeout=60
    )
}

try:
    response = model.generate_content("你好", request_options=retry_policy)
except Exception as e:
    print(f"错误: {e}")
```

---

## 相关链接

- [[API快速开始]]
- [[认证与配额]]
- [[代码示例]]
- [[../README|Gemini 知识库导航]]
- [官方文档](https://ai.google.dev/tutorials/python_quickstart)
