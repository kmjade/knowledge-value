---
title: 提示工程 & Prompt
tags: [ollama, prompts]
---

# 提示工程 & Prompt

## 基础概念
- **Prompt**：向模型发送的文本指令或问题。
- **System Prompt**：在对话开始前设定模型的行为（角色、语气）。
- **User Prompt**：实际用户输入的内容。
- **Assistant Prompt**：模型返回的回复。

## 编写高质量 Prompt 的技巧
1. **明确角色**：在 System Prompt 中指定模型角色，例如：`You are a helpful AI assistant specialized in Python programming.`
2. **分步指示**：将复杂需求拆分为多个步骤，如：`Step 1: Explain the concept. Step 2: Provide a code example.`
3. **限制输出**：使用明确的格式要求，例如：`Respond in JSON with keys "explanation" and "example".`
4. **示例引导**：提供示例输入/输出帮助模型理解期望。
5. **控制长度**：通过 `max_tokens` 参数限制回复长度，防止冗长。

## 示例 Prompt（Obsidian 集成）
```json
{
  "system": "You are an AI assistant integrated into Obsidian, responding in markdown and supporting wikilinks.",
  "prompt": "Explain the difference between a linked note and an embedded note in Obsidian. Use a table format."
}
```

## 常用 Prompt 模板（复制到笔记）
### 代码解释
> 
> ```markdown
> ```prompt
> You are a senior developer. Explain the following code snippet line by line.
> ```
> ```code
> <your code here>
> ```
> ```markdown
>
> ### 文档生成
> ```markdown
> ```prompt
> Generate a concise markdown documentation for the given Python function, including a short description, parameters table, and usage example.
> ```
> ```code
> def foo(bar: int) -> str:
>     return str(bar * 2)
> ```
> ```markdown
>
> ### 知识检索
> ```markdown
> ```prompt
> Summarize the key points from the note titled "[[机器学习概述]]".
> ```
> ```markdown
>
> 将这些模板保存到 `[[提示工程 & Prompt]]` 页面，以便在 Obsidian 中快速复制使用。

> 📌 **提示**：在实际调用 API 时，将上述 JSON 内容放入请求体的 `prompt` 字段即可。
