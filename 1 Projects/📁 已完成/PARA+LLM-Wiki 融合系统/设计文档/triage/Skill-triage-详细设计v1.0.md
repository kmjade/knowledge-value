---
aliases:
  - Triage 详细设计
  - 分拣详细设计
created: 2026-05-31
type: design-detail
topic: triage
parent: "[[Skill-triage v1.0]]"
tags:
  - design
  - triage
  - architecture
---

# /triage 详细设计

> 基于 [[SRS-triage-原型设计|原型设计]] → 技术实现

---

## 1. 架构概览

```
┌─────────────────────────────────────────────────┐
│                  /triage Skill                    │
│                                                   │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌──────┐ │
│  │ Scanner │→│Analyzer │→│ Router  │→│Writer│ │
│  └────┬────┘  └────┬────┘  └────┬────┘  └──┬───┘ │
│       │            │            │           │     │
│  ┌────┴────────────┴────────────┴───────────┴───┐ │
│  │              Logger + Reporter                │ │
│  └──────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

---

## 2. 模块设计

### 2.1 Scanner — 扫描器

**职责**: 遍历 Inbox，返回待处理文件列表

```python
# 伪代码
def scan_inbox(scope="all"):
    files = []
    base = "0 Inbox/"
    
    dirs = {
        "all":       ["", "Clippings/", "fleet-notes/", "tasks/"],
        "clippings": ["Clippings/"],
        "fleeting":  ["fleet-notes/"],
        "tasks":     ["tasks/"]
    }[scope]
    
    for d in dirs:
        for f in list_md_files(base + d):
            if not is_processed(f) and not f.startswith("_processed"):
                files.append(f)
    
    return files
```

**排除规则**:

| 条件 | 动作 |
|------|------|
| `triaged: true` in Frontmatter | 跳过 |
| 路径包含 `_processed/` | 跳过 |
| 文件 < 10 bytes | 警告 + 跳过 |

### 2.2 Analyzer — 分析器

**职责**: 对每个文件执行四维分析

#### 2.2.1 时效性分类算法

```
权重评分模型:

ephemeral_score = Σ(关键词权重)
  "明天"×5 + "买"×3 + "提醒"×4 + "截止"×4 + "完成"×3
  + 有明确日期×8 + <200字×2

operational_score = Σ(关键词权重)
  "项目"×4 + "任务"×3 + "会议"×4 + "进度"×3 + "报告"×3
  + 日期格式×5 + 200-1000字×3

reference_score = Σ(关键词权重)
  URL×10 + "来源"×5 + "作者"×4 + "摘要"×3
  + >1000字×5 + source Frontmatter×8

evergreen_score = Σ(关键词权重)
  "定义"×6 + "原理"×5 + "概念"×4 + "方法"×4 + "框架"×4
  + 无日期×3 + 术语密度高×3

分类 = max(ephemeral, operational, reference, evergreen)
置信度 = max_score / sum(all_scores)
```

#### 2.2.2 主题识别

```
关键词→主题映射表 (~50 条目):

knowledge:     ["UDC", "DDC", "分类法", "本体", "知识组织", "元数据"]

...

匹配 = 加权关键词命中 / 总关键词
置信度 < 60% → _review/
```

#### 2.2.3 人物识别

```
正则模式:
  - 手机号: 1[3-9]\d{9}
  - 邮箱:   \S+@\S+\.\S+
  - 人名标记: "联系人:" "微信:" "电话:" "姓名:"

命中 → 标记 people + 提取信息
```

#### 2.2.4 双重属性检测

```
条件:
  同时包含 任务关键词 AND 知识关键词
  例: "下周前" + "论文" + "读完" + "RAG"

处理: 分离为两条记录
  → 任务: "下周前读完论文" → tasks.md
  → 知识: 论文内容 → raw/articles/
```

### 2.3 Router — 路由器

**职责**: 根据分类结果执行文件移动

```python
ROUTE_TABLE = {
    "ephemeral": {
        "target": "1 Projects/{project}/tasks.md",
        "action": "append_task",
        "format": "- [ ] {title} 📅 {date} #inbox"
    },
    "operational": {
        "target": "1 Projects/{project}/",
        "action": "move_file",
        "fallback": "2 Areas/{area}/"
    },
    "reference": {
        "target": "3 Resources/{topic}/raw/articles/",
        "action": "copy_and_tag",
        "frontmatter": {"triaged": True, "triaged_to": "..."}
    },
    "evergreen": {
        "target": "3 Resources/{topic}/wiki/",
        "action": "queue_compile",
        "trigger": "建议 /wiki-compile {topic}"
    },
    "people": {
        "target": "0 Inbox/people/raw/",
        "action": "extract_and_update"
    }
}
```

**安全检查 (写入前)**:
1. 目标无同名文件 → 继续
2. 目标有同名 → 追加 `_1` 后缀 + 警告
3. 目标目录不存在 → 自动创建

### 2.4 Writer — 写入器

**职责**: 执行文件操作 + 更新元数据

```
操作顺序:
  1. 复制源文件到目标 (reference/operational)
  2. 更新目标文件 Frontmatter
  3. 更新源文件 Frontmatter (triaged: true)
  4. 移动源文件到 _processed/
  5. 记录到 triage-log.md
```

**事务保证**: 任一步骤失败 → 回滚已执行步骤

### 2.5 Logger — 日志器

**输出格式** (`AI-Log/triage-log.md`):

```markdown
## 2026-05-31 14:30

| 指标 | 数值 |
|------|:----:|
| 处理文件 | 12 |
| ephemeral | 3 |
| reference | 6 |
| 需确认 | 2 |
| 人物 | 1 |
| 耗时 | 45s |
| 状态 | success |

### 路由详情
- `file-1.md` → `1 Projects/Personal/tasks.md` (ephemeral)
- `file-2.md` → `3 Resources/ai-ml/raw/articles/` (reference)
- ...
```

---

## 3. 数据流

```
0 Inbox/file.md
     │
     ▼
  Scanner ──► 文件列表
     │
     ▼
  Analyzer ──► {时效性, 主题, 人物, 置信度}
     │
     ▼
  Router ──► 路由决策
     │
     ├─ ephemeral ──► tasks.md (追加)
     ├─ operational ─► 1 Projects/ (移动)
     ├─ reference ──► 3 Resources/raw/ (复制+标记)
     ├─ people ────► 0 Inbox/people/raw/
     └─ low_confidence ─► _review/
     │
     ▼
  Writer ──► Frontmatter 更新 + 日志
     │
     ▼
  原文件 → 0 Inbox/_processed/
```

---

## 4. 错误处理矩阵

| 错误 | 检测 | 处理 |
|------|------|------|
| Inbox 为空 | Scanner | 输出 ✨ 提示 |
| 低置信度 | Analyzer < 60% | → `_review/` |
| 目标冲突 | Router | 重命名 + 警告 |
| 目录缺失 | Writer | 自动 `mkdir -p` |
| 写入失败 | Writer | 回滚 + 报错 |
| 权限不足 | Writer | 跳过 + 报告 |

---

## 5. 性能预算

| 操作 | 预算 | 策略 |
|------|:----:|------|
| 扫描 50 文件 | < 5s | `ls` + Frontmatter 缓存 |
| 单文件分析 | < 2s | 关键词匹配 (非 LLM) |
| 文件移动 | < 0.5s | 本地 FS 操作 |
| 总预算 (20 文件) | < 2min | NFR-001 |

---

> 📎 关联: [[Skill-triage v1.0\|设计概要]] | [[SRS-triage-原型设计\|原型]] | [[SRS-triage-需求说明书\|需求]]
