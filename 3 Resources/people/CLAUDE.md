---
aliases:
  - People Wiki
  - People CRM
  - 人物库
  - 人物关系管理
created: 2026-06-01
type: wiki-schema
topic: people
status: active
---

# People Wiki Schema — 人物 CRM 子库

> 管理所有与你有交集的人物信息。不是通讯录，而是**关系智能层**——记录每个人的背景、互动历史、可能的协作点。

---

## 子库定位

| 维度 | 说明 |
|------|------|
| **DDC** | `060` 知识管理 — 人物是知识图谱的实体节点 |
| **互补层** | `2 Areas/04-Relationships/` 行动层 — 关系维护与跟进 |
| **历史人物** | `3 Resources/900/920-传记与人物/` 研究层 — 历史人物传记 |

---

## 目录结构

```
3 Resources/people/
├── CLAUDE.md              ← 本文件 — 子库 schema
├── people.md              ← MOC 入口
├── raw/                   ← 原始资料（人类维护·AI 只读）
│   ├── conversations/     ← 对话记录
│   └── meetings/          ← 会议笔记
├── wiki/                  ← LLM 编译产物（AI 独占写入）
│   ├── index.md           ← 人物索引
│   ├── log.md             ← 编译日志
│   ├── entities/          ← 人物实体页面
│   ├── concepts/          ← CRM 概念页面
│   └── sources/           ← 来源溯源
└── outputs/               ← 基于 Wiki 生成的制品
```

---

## 人物分级系统 (Tier System)

### Tier 3 — 存根（自动创建）

触发：某人在任意 Inbox 内容中被提及 1 次

```yaml
---
type: wiki-entity
entity_type: person
tier: 3
created: YYYY-MM-DD
mentioned-in: [来源文件]
---
# [姓名]
> [!stub] Tier 3 存根 — 仅被提及一次，待丰富
提及上下文：[简短描述]
```

### Tier 2 — 基础信息（半自动）

触发：同一人被 ≥2 个不同来源提及，或手动标记

- 补充职位、机构、公开信息
- 建立与其他 wiki 页面的关联链接

### Tier 1 — 深度档案（人工驱动）

触发：手动标记为 Tier 1（重要合作者、导师、关键人脉）

```yaml
---
tier: 1
---
# [姓名]

## 背景
[详细背景]

## 互动历史
| 日期 | 事件 | 关联 |
|------|------|------|

## 共同项目
[[项目1]] · [[项目2]]

## 价值观/风格观察
[你对这个人的判断和洞察]

## 待跟进
- [ ] [事项]
```

---

## 人物页面模板

```markdown
# [姓名]

## 基本信息
- 类型: family | friend | colleague | mentor | network
- 认识时间: YYYY-MM
- 状态: active | dormant | archived

## 联系方式
- Email:
- Phone:

## 专业背景
- 职业:
- 公司:

## 互动记录
- YYYY-MM-DD: [事件描述]

## 共同话题
- [[话题1]]

## 相关人物
- [[related-person]]

## Sources
- [[source-file-name]]
```

---

## 编译规则

1. **隐私优先** — 私人对话内容不直接进入 wiki/，只提取结构化字段
2. **raw/ 只读** — AI 不修改原始资料
3. **Sources 必须** — 所有 wiki 页面标注来源
4. **增量丰富** — Tier 3 → Tier 2 → Tier 1 逐级升级
5. **双向链接** — 人物 ↔ 项目 ↔ 领域 ↔ 概念

---

## 跨库关联

| 关联子库 | 链接 | 关系 |
|----------|------|------|
| 关系维护 (Area) | `[[2 Areas/04-Relationships/]]` | 行动层 — 互动跟进 |
| 历史传记 | `[[3 Resources/900/920-传记与人物/]]` | 研究层 — 历史人物 |
| 知识管理 | `[[060-Knowledge-Management/]]` | 方法层 — KM 理论 |

---

## 使用命令

- `/wiki-compile people` — 编译此知识库
- `/triage` — 将新人物的原始信息分拣到 raw/

---

*分类: 3 Resources/people · DDC: 060 · 状态: 🟢 活跃*
