# Context Skill - 会话状态管理

快速加载当前 Vault 状态，为 AI 会话提供必要的上下文。

## 使用方式

```
/context              # 加载完整上下文
/context --quick      # 快速加载（仅状态概览）
/context --projects   # 仅加载项目状态
/context --inbox      # 仅加载 Inbox 状态
```

## 加载内容

### 1. 系统状态概览

```
📊 Vault 状态 - YYYY-MM-DD

📦 PARA 概览:
- 1 Projects: [X] 个活跃项目
- 2 Areas: [X] 个领域
- 3 Resources: [X] 个资源目录
- 4 Archives: [X] 个归档项目

📥 Inbox 状态:
- 待处理文件: [X]
- 最近新增: [X] (今日)
- 积压天数: [X]

📚 Wiki 子库:
- ai-ml: [X] 概念, [X] 实体
- people: [X] 人物
- finance: [X] 概念, [X] 实体
- productivity: [X] 概念, [X] 实体
```

### 2. 活跃项目

读取 `1 Projects/` 目录，识别活跃项目：
- 项目名称
- 当前状态
- 下一步行动
- 截止日期（如有）

### 3. Inbox 内容摘要

扫描 `0 Inbox/` 目录：
- 文件列表（按时间排序）
- 文件类型分布
- 建议的优先处理项

### 4. 最近活动

从 `AI-Log/` 读取最近的操作：
- 最近分拣操作
- 最近编译操作
- 最近修改的文件

### 5. 待办事项

如果有 Tasks 插件数据，加载：
- 今日待办
- 即将到期
- 已逾期

## 上下文数据结构

```json
{
  "timestamp": "YYYY-MM-DDTHH:MM:SS",
  "vault": {
    "total_notes": 1234,
    "total_attachments": 56
  },
  "para": {
    "projects": {
      "active": 3,
      "list": ["项目A", "项目B", "项目C"]
    },
    "areas": 5,
    "resources": 12,
    "archives": 8
  },
  "inbox": {
    "pending": 15,
    "by_type": {
      "articles": 5,
      "tasks": 3,
      "notes": 7
    },
    "oldest_file": {
      "path": "0 Inbox/file.md",
      "age_days": 7
    }
  },
  "wiki": {
    "ai-ml": { "concepts": 45, "entities": 12 },
    "people": { "concepts": 8, "entities": 30 },
    "finance": { "concepts": 25, "entities": 8 },
    "productivity": { "concepts": 30, "entities": 15 }
  },
  "recent_activity": {
    "last_triage": "YYYY-MM-DD HH:MM",
    "last_compile": "YYYY-MM-DD HH:MM",
    "modified_today": 5
  }
}
```

## 自动触发场景

### Session Start
建议在每次会话开始时自动运行 `/context --quick`：
- 快速了解当前状态
- 识别需要处理的事项
- 为后续操作提供上下文

### Before Triage
在运行 `/triage` 前自动加载相关上下文：
- 了解现有项目结构
- 识别可能的匹配目标

### Before Wiki-Compile
在运行 `/wiki-compile` 前自动加载：
- 现有 Wiki 结构
- 未编译的原始资料

## 示例输出

```
📋 Context Loaded - YYYY-MM-DD HH:MM

🎯 今日焦点:
- [项目A] 需要完成设计稿审核
- Inbox 有 15 个待处理文件
- 本周目标：完成 ai-ml Wiki 编译

📊 快速统计:
| 类别 | 数量 | 状态 |
|------|------|------|
| 活跃项目 | 3 | 🟢 |
| Inbox 待处理 | 15 | 🟡 |
| Wiki 概念 | 108 | 🟢 |
| Wiki 实体 | 65 | 🟢 |

📌 最近活动:
- 2小时前: 分拣 3 个文件到 ai-ml/raw/
- 昨天: 编译 ai-ml Wiki (+5 概念)
- 3天前: 创建新项目 [项目B]

💡 建议:
1. 运行 /triage 处理 Inbox 积压
2. 检查 [项目A] 的截止日期
3. 考虑编译 people Wiki（有 8 个未处理文件）
```

## 配置选项

可在 `.claude/settings.json` 中配置：

```json
{
  "context": {
    "auto_load": true,          // 会话开始时自动加载
    "quick_mode": true,         // 默认使用快速模式
    "show_suggestions": true,   // 显示建议
    "inbox_warning_days": 7     // Inbox 积压警告阈值
  }
}
```

## 与其他 Skills 的配合

- **triage**: 提供路由目标信息
- **wiki-compile**: 提供 Wiki 结构信息
- **lint**: 提供系统健康状态

