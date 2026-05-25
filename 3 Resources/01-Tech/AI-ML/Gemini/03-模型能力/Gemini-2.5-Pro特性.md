---
title: Gemini 2.5 Pro 特性
aliases:
  - Gemini 2.5 特性
  - Gemini 2.5 Pro 能力
tags:
  - #topic/gemini
  - #type/reference
created: 2026-05-25
updated: 2026-05-25
---

# Gemini 2.5 Pro 特性

## 概述

Gemini 2.5 Pro 于 2025 年 3 月发布，是一个高性能模型，以 100 万 token 上下文窗口和出色的代码能力著称。

---

## 核心特性

### 📏 100万 Token 上下文窗口

- 处理超长文档
- 分析整个代码库
- 长期记忆保持
- 复杂上下文理解

### 🧠 思考模式 (Thinking Mode)

- 内部推理过程
- 更准确的问题解决
- 复杂任务分解

### 💻 出色代码能力

- SWE-Bench: 63.8%
- 多语言代码生成
- 代码理解和调试

### 🔍 多模态处理

- 文本生成和理解
- 图像分析
- 视频理解
- 音频处理

---

## 技术规格

| 规格 | 参数 |
|------|------|
| 上下文窗口 | 100万 tokens |
| 最大输出 | 65536 tokens |
| 多模态 | 文本、图像、音频、视频 |
| 代理能力 | 支持 |

---

## 能力详解

### 长上下文处理

#### 适用场景

| 场景 | 示例 |
|------|------|
| 文档分析 | 分析整本书、长篇报告 |
| 代码库分析 | 理解大型项目结构 |
| 法律文档 | 合同审查、法律分析 |
| 研究论文 | 文献综述、论文分析 |

#### 最佳实践

```python
# 处理长文档
model = genai.GenerativeModel('gemini-2.5-pro')
response = model.generate_content([
    "分析以下文档的核心观点：",
    open("long_document.pdf", "rb").read()
])
```

### 代码能力

#### 支持的语言

| 语言 | 能力 |
|------|------|
| Python | ⭐⭐⭐⭐⭐ |
| JavaScript/TypeScript | ⭐⭐⭐⭐⭐ |
| Java | ⭐⭐⭐⭐ |
| Go | ⭐⭐⭐⭐ |
| Rust | ⭐⭐⭐⭐ |
| C/C++ | ⭐⭐⭐⭐ |

#### 代码任务示例

```bash
# 代码审查
gemini "审查这段代码，检查安全漏洞和性能问题" --file app.py

# 代码重构
gemini "重构这个函数，使其更易读和高效" --file utils.py

# 生成测试
gemini "为这个模块生成单元测试" --file calculator.py
```

### 多模态能力

#### 图像处理

```python
import PIL.Image
import google.generativeai as genai

model = genai.GenerativeModel('gemini-2.5-pro')
image = PIL.Image.open('diagram.png')
response = model.generate_content(["分析这张图表", image])
```

#### 视频理解

```python
# 上传视频
video_file = genai.upload_file(path="video.mp4")

# 等待处理完成
while video_file.state.name == "PROCESSING":
    time.sleep(10)
    video_file = genai.get_file(video_file.name)

# 分析视频
response = model.generate_content(["总结这个视频的内容", video_file])
```

---

## 思考模式

### 什么是思考模式

模型在回答前会进行内部推理，类似于人类"思考"的过程。

### 启用思考模式

```python
response = model.generate_content(
    "解决这个复杂的数学问题...",
    generation_config={"thinking": True}
)
```

### 适用场景

- 复杂推理问题
- 多步骤任务
- 需要高准确性的场景

---

## API 使用

### 价格

| 类型 | 价格 |
|------|------|
| 输入 | $1.25/百万 tokens |
| 输出 | $10/百万 tokens |
| 上下文缓存 | 折扣 75% |

### 免费额度

| 方式 | 限制 |
|------|------|
| Google 登录 | 60次/分钟, 1000次/天 |
| API Key | 100次/天 |

---

## 相关链接

- [[Gemini-3-Pro特性]]
- [[多模态能力]]
- [[模型版本对比]]
- [[../README|Gemini 知识库导航]]
