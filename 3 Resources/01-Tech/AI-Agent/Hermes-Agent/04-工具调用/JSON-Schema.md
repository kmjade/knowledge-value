---
title: JSON-Schema
aliases:
  - JSON Schema
  - 参数定义规范
para: resource
domain:
  - "[[Hermes-Agent]]"
tags:
  - para/resource/tech
  - topic/ai-agent
  - topic/hermes
  - topic/tool-calling
  - type/reference
created: 2026-05-24
modified: 2026-05-25
---

# JSON-Schema

> [!summary] 概述
> Hermes Agent 工具参数的 JSON Schema 定义规范。

---

## 概述

JSON Schema 用于定义函数参数的格式和约束。在 Hermes Agent 中，每个工具的 `parameters` 字段就是一个 JSON Schema。

```json
{
  "name": "get_weather",
  "description": "获取天气信息",
  "parameters": {
    "type": "object",
    "properties": {
      "location": {
        "type": "string",
        "description": "城市名称"
      },
      "unit": {
        "type": "string",
        "enum": ["celsius", "fahrenheit"],
        "default": "celsius"
      }
    },
    "required": ["location"]
  }
}
```

---

## 类型系统

| 类型 | JSON Schema | 示例 |
|------|-----------|------|
| 字符串 | `{"type": "string"}` | `"hello"` |
| 整数 | `{"type": "integer"}` | `42` |
| 浮点数 | `{"type": "number"}` | `3.14` |
| 布尔值 | `{"type": "boolean"}` | `true` |
| 数组 | `{"type": "array", "items": {...}}` | `[1, 2, 3]` |
| 对象 | `{"type": "object", "properties": {...}}` | `{"a": 1}` |
| 枚举 | `{"type": "string", "enum": [...]}` | `"celsius"` |

---

## 常用约束

| 约束 | 说明 | 示例 |
|------|------|------|
| `description` | 参数说明（帮助 LLM 理解） | `"城市名称"` |
| `required` | 必需参数列表 | `["location"]` |
| `default` | 默认值 | `"celsius"` |
| `enum` | 允许值列表 | `["low", "medium", "high"]` |
| `minimum/maximum` | 数值范围 | `1` / `100` |
| `minLength/maxLength` | 字符串长度 | `1` / `256` |

---

## 完整示例

### terminal 工具

```json
{
  "name": "terminal",
  "parameters": {
    "type": "object",
    "properties": {
      "command": {
        "type": "string",
        "description": "The command to execute"
      },
      "timeout": {
        "type": "integer",
        "description": "Max seconds to wait",
        "minimum": 1,
        "default": 180
      },
      "background": {
        "type": "boolean",
        "description": "Run in background",
        "default": false
      },
      "workdir": {
        "type": "string",
        "description": "Working directory"
      }
    },
    "required": ["command"]
  }
}
```

### read_file 工具

```json
{
  "name": "read_file",
  "parameters": {
    "type": "object",
    "properties": {
      "path": {
        "type": "string",
        "description": "File path to read"
      },
      "offset": {
        "type": "integer",
        "description": "Line to start from (1-indexed)",
        "default": 1,
        "minimum": 1
      },
      "limit": {
        "type": "integer",
        "description": "Max lines to return",
        "default": 500,
        "minimum": 1,
        "maximum": 2000
      }
    },
    "required": ["path"]
  }
}
```

---

## 相关链接

- [[工具调用格式]] - 完整调用格式
- [[../02-核心概念/工具系统|工具系统]] - 内置工具集
