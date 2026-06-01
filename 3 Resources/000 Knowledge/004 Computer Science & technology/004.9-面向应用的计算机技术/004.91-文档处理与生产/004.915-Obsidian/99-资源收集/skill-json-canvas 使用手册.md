---
title: skill-json-canvas 使用手册
aliases: [JSON Canvas Skill Manual, Canvas 使用指南]
tags: [skill, json-canvas, canvas, obsidian, reference, manual]
created: 2026-06-01
type: reference
topic: obsidian
status: evergreen
---

# skill-json-canvas 使用手册

> Claude Code Skill — 指导 Agent 创建和编辑 JSON Canvas 文件 (`.canvas`)，包括节点、连线、分组和连接。

---

## Skill 基本信息

| 属性 | 值 |
|------|------|
| **名称** | `json-canvas` |
| **路径** | `.claude/skills/obsidian-skills/json-canvas/SKILL.md` |
| **触发条件** | 处理 `.canvas` 文件 · 提及 Canvas/画布/思维导图/流程图 |
| **规范** | [JSON Canvas Spec 1.0](https://jsoncanvas.org/spec/1.0/) |

---

## 文件结构

```json
{
  "nodes": [],   // 节点数组
  "edges": []    // 连线数组
}
```

---

## 节点 Nodes

### 四种节点类型

| 类型 | 用途 | 示例 |
|:---:|------|------|
| `text` | Markdown 文本 | 标题、段落、任务卡 |
| `file` | 文件引用 | 笔记、图片、PDF |
| `link` | 外部 URL | 网页链接 |
| `group` | 容器分组 | 项目区域、阶段标签 |

### 通用属性

| 属性 | 必须 | 类型 | 说明 |
|------|:---:|------|------|
| `id` | ✅ | string | 唯一标识 (16位 hex) |
| `type` | ✅ | string | `text` / `file` / `link` / `group` |
| `x` | ✅ | int | X 坐标 (px) |
| `y` | ✅ | int | Y 坐标 (px) |
| `width` | ✅ | int | 宽度 (px) |
| `height` | ✅ | int | 高度 (px) |
| `color` | — | string | 颜色 (`"1"`~`"6"` 或 hex) |

### 层级顺序

- 数组**第一个**节点 = 最底层
- 数组**最后一个**节点 = 最顶层

---

## Text 文本节点

```json
{
  "id": "6f0ad84f44ce9c17",
  "type": "text",
  "x": 0, "y": 0,
  "width": 400, "height": 200,
  "text": "# 标题\n\n**粗体** 和 *斜体* 支持。"
}
```

---

## File 文件节点

```json
{
  "id": "a1b2c3d4e5f67890",
  "type": "file",
  "x": 500, "y": 0,
  "width": 400, "height": 300,
  "file": "Attachments/diagram.png"
}
```

| 属性 | 必须 | 说明 |
|------|:---:|------|
| `file` | ✅ | 文件路径 |
| `subpath` | — | 指向标题或块 (`#heading`) |

---

## Link 链接节点

```json
{
  "id": "c3d4e5f678901234",
  "type": "link",
  "x": 1000, "y": 0,
  "width": 400, "height": 200,
  "url": "https://obsidian.md"
}
```

---

## Group 分组节点

```json
{
  "id": "d4e5f6789012345a",
  "type": "group",
  "x": -50, "y": -50,
  "width": 1000, "height": 600,
  "label": "项目总览",
  "color": "4"
}
```

| 属性 | 说明 |
|------|------|
| `label` | 分组标签 |
| `background` | 背景图片路径 |
| `backgroundStyle` | `cover` / `ratio` / `repeat` |

---

## 连线 Edges

```json
{
  "id": "f67890123456789a",
  "fromNode": "6f0ad84f44ce9c17",
  "toNode": "a1b2c3d4e5f67890"
}
```

### 完整属性

| 属性 | 必须 | 默认 | 说明 |
|------|:---:|:---:|------|
| `id` | ✅ | — | 唯一标识 |
| `fromNode` | ✅ | — | 起始节点 ID |
| `toNode` | ✅ | — | 目标节点 ID |
| `fromSide` | — | — | `top` / `right` / `bottom` / `left` |
| `toSide` | — | — | 同上 |
| `fromEnd` | — | `none` | `none` / `arrow` |
| `toEnd` | — | `arrow` | `none` / `arrow` |
| `color` | — | — | 颜色 |
| `label` | — | — | 连线标签 |

---

## 颜色

### 预设色

| 预设 | 颜色 |
|:---:|:---:|
| `"1"` | 🔴 Red |
| `"2"` | 🟠 Orange |
| `"3"` | 🟡 Yellow |
| `"4"` | 🟢 Green |
| `"5"` | 🔵 Cyan |
| `"6"` | 🟣 Purple |

### Hex 颜色

```json
{ "color": "#FF5733" }
```

---

## 布局指南

### 坐标系统

```
(0,0) → x 增大 →
   ↓ y 增大
   ↓

- 坐标为左上角
- 可为负数（画布无限延伸）
```

### 推荐尺寸

| 节点类型 | 建议宽 | 建议高 |
|:---:|:---:|:---:|
| 小文本 | 200–300 | 80–150 |
| 中文本 | 300–450 | 150–300 |
| 大文本 | 400–600 | 300–500 |
| 文件预览 | 300–500 | 200–400 |
| 链接预览 | 250–400 | 100–200 |

### 间距

- 分组内边距：20–50px
- 节点间距：50–100px
- 对齐到网格：10 或 20 的倍数

---

## 完整示例

### 思维导图 (中心节点 + 分支)

```json
{
  "nodes": [
    {
      "id": "8a9b0c1d2e3f4a5b",
      "type": "text",
      "x": 0, "y": 0, "width": 300, "height": 150,
      "text": "# 核心议题\n\n这是中心概念。"
    },
    {
      "id": "1a2b3c4d5e6f7a8b",
      "type": "text",
      "x": 400, "y": -100, "width": 250, "height": 100,
      "text": "## 分支 A\n\n详细说明。"
    },
    {
      "id": "2b3c4d5e6f7a8b9c",
      "type": "text",
      "x": 400, "y": 100, "width": 250, "height": 100,
      "text": "## 分支 B\n\n更多内容。"
    }
  ],
  "edges": [
    {
      "id": "3c4d5e6f7a8b9c0d",
      "fromNode": "8a9b0c1d2e3f4a5b",
      "fromSide": "right",
      "toNode": "1a2b3c4d5e6f7a8b",
      "toSide": "left"
    },
    {
      "id": "4d5e6f7a8b9c0d1e",
      "fromNode": "8a9b0c1d2e3f4a5b",
      "fromSide": "right",
      "toNode": "2b3c4d5e6f7a8b9c",
      "toSide": "left"
    }
  ]
}
```

### 项目看板 (Kanban 三列)

```json
{
  "nodes": [
    {
      "id": "5e6f7a8b9c0d1e2f",
      "type": "group",
      "x": 0, "y": 0, "width": 300, "height": 500,
      "label": "待办", "color": "1"
    },
    {
      "id": "6f7a8b9c0d1e2f3a",
      "type": "group",
      "x": 350, "y": 0, "width": 300, "height": 500,
      "label": "进行中", "color": "3"
    },
    {
      "id": "7a8b9c0d1e2f3a4b",
      "type": "group",
      "x": 700, "y": 0, "width": 300, "height": 500,
      "label": "完成", "color": "4"
    },
    {
      "id": "8b9c0d1e2f3a4b5c",
      "type": "text",
      "x": 20, "y": 50, "width": 260, "height": 80,
      "text": "## 任务 1\n\n实现功能 X"
    }
  ],
  "edges": []
}
```

### 流程图 (决策分支)

```
      开始
        ↓
      步骤1
        ↓
     ✅→ 处理 ← 有效吗？
     ↑         ↓ ❌
     └── 重新请求 ←
              ↓
            结束
```

### 研究画布 (文件 + 链接)

```json
{
  "nodes": [
    {
      "id": "1e2f3a4b5c6d7e8f",
      "type": "text",
      "x": 300, "y": 200, "width": 400, "height": 200,
      "text": "# 研究主题\n\n## 关键问题",
      "color": "5"
    },
    {
      "id": "2f3a4b5c6d7e8f9a",
      "type": "file",
      "x": 0, "y": 0, "width": 250, "height": 150,
      "file": "Literature/Paper A.pdf"
    },
    {
      "id": "3a4b5c6d7e8f9a0b",
      "type": "link",
      "x": 0, "y": 400, "width": 250, "height": 100,
      "url": "https://example.com/research"
    }
  ],
  "edges": [
    {
      "id": "6d7e8f9a0b1c2d3e",
      "fromNode": "2f3a4b5c6d7e8f9a",
      "fromSide": "right",
      "toNode": "1e2f3a4b5c6d7e8f",
      "toSide": "left",
      "label": "支撑"
    }
  ]
}
```

---

## 校验规则

1. ✅ 所有 `id` 必须唯一
2. ✅ `fromNode` / `toNode` 必须指向已存在的节点
3. ✅ `type` 只能为 `text` / `file` / `link` / `group`
4. ✅ `backgroundStyle` 只能为 `cover` / `ratio` / `repeat`
5. ✅ `fromSide` / `toSide` 只能为 `top` / `right` / `bottom` / `left`
6. ✅ `fromEnd` / `toEnd` 只能为 `none` / `arrow`
7. ✅ 颜色预设为 `"1"`~`"6"` 或有效 hex

---

## 参考

- [JSON Canvas Spec 1.0](https://jsoncanvas.org/spec/1.0/)
- [JSON Canvas GitHub](https://github.com/obsidianmd/jsoncanvas)
- [[Obsidian-Markdown 使用手册]] — Markdown 语法参考
- [[skill-obsidian-markdown 使用手册]] — obsidian-markdown Skill 指南
- [[skill-obsidian-bases 使用手册]] — obsidian-bases Skill 指南

---

*最后更新: 2026-06-01*
