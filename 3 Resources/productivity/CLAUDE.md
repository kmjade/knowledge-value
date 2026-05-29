---
aliases:
  - Productivity Wiki
  - 生产力知识库
created: 2026-05-26
type: wiki-schema
topic: productivity
---

# Productivity Wiki Schema

生产力工具与方法知识库，采用 LLM-Wiki 方法论组织。

## 目录结构

```
productivity/
├── CLAUDE.md          # 本文件 - 子库 schema
├── raw/               # 原始资料（人类维护，AI 只读）
│   ├── articles/      # 文章摘录
│   ├── papers/        # 论文笔记
│   ├── books/         # 书籍笔记
│   └── conversations/ # 对话记录
├── wiki/              # LLM 编译产物（AI 独占写入）
│   ├── index.md       # 知识索引
│   ├── log.md         # 编译日志
│   ├── concepts/      # 概念页面
│   ├── entities/      # 实体页面（工具、方法等）
│   └── sources/       # 来源溯源
└── outputs/           # 基于 Wiki 生成的制品
```

## 核心概念域

### 方法论
- GTD(Getting Things Done)
- PARA Method
- Zettelkasten
- Second Brain
- OKR
- Time Blocking

### 工具类型
- 笔记软件 (Obsidian, Notion, Roam, 飞书)
- 任务管理 (Todoist, Things, Tasks)
- 时间追踪 (Toggl, RescueTime)
- 知识管理 (Readwise, Pocket)

### 工作流
- 信息捕获
- 任务处理
- 知识整理
- 定期回顾

### 习惯养成
- 晨间惯例
- 深度工作
- 定期回顾
- 知识分享

## 页面模板

### 方法论页面
```markdown
# [方法论名称]

## 核心理念
[一句话概括]

## 关键原则
1. [原则1]
2. [原则2]

## 实施步骤
1. [步骤1]
2. [步骤2]

## 适用场景
- [场景1]
- [场景2]

## 相关工具
- [[tool-1]]

## Sources
- [[source-file-name]]
```

### 工具实体页面
```markdown
# [工具名称]

## 基本信息
- 类型: app/method/service
- 平台:
- 价格:

## 核心功能
- [功能1]
- [功能2]

## 优势
- [优势1]

## 劣势
- [劣势1]

## 使用技巧
[实践心得]

## 替代方案
- [[alternative-1]]

## Sources
- [[source-file-name]]
```

## 编译规则

1. **实践经验**: 鼓励加入个人实践心得
2. **raw/ 只读**: AI 不修改原始资料
3. **sources 必须**: 所有 wiki 页面必须标注来源
4. **链接优先**: 使用 `[[]]` 建立知识连接

## 使用命令

- `/wiki-compile productivity` - 编译此知识库
- `/triage` - 将新资料分拣到 raw/

