---
aliases: [CRM+PARA+LLM-Wiki Architecture, 整合系统架构]
created: 2026-06-01
type: architecture
parent: "[[PARA+LLM-Wiki 融合系统]]"
tags: [architecture, crm, integration]
---

# CRM+PARA+LLM-Wiki 整合系统架构设计 v1.0

> 人物关系管理 (CRM) × 知识管理 (PARA) × AI 编译 (LLM-Wiki) 三维融合

---

## 1. 三维架构

```
                    ┌──────────────┐
                    │   LLM-Wiki   │  ← AI 编译层
                    │  wiki/compile │
                    └──────┬───────┘
                           │ 知识提取
              ┌────────────┼────────────┐
              ▼            ▼            ▼
        ┌──────────┐ ┌──────────┐ ┌──────────┐
        │ concepts │ │ entities │ │ people   │  ← 知识层
        └──────────┘ └──────────┘ └────┬─────┘
                                       │
                          ┌────────────┼────────────┐
                          │  PARA 方法论              │  ← 组织层
                          │  Projects/Areas/Resources │
                          └───────────────────────────┘
                                       │
                          ┌────────────┴────────────┐
                          │  0 Inbox/ (统一入口)      │  ← 输入层
                          └─────────────────────────┘
```

---

## 2. CRM 维度

### 人物类型

| 类型 | 标识 | 路由 |
|------|:----:|------|
| family | 🏠 | `0 Inbox/people/raw/family/` |
| friend | 🤝 | `0 Inbox/people/raw/friend/` |
| colleague | 💼 | `0 Inbox/people/raw/colleague/` |
| mentor | 🎓 | `0 Inbox/people/raw/mentor/` |
| network | 🌐 | `0 Inbox/people/raw/network/` |

### 关系维度

| 关系 | 描述 | Wiki 链接 |
|------|------|-----------|
| professional | 专业关系 | → entities/ |
| personal | 个人关系 | → entities/ |
| collaborative | 协作关系 | ↔ projects |

---

## 3. 整合流程

```
0 Inbox/  (内容 + 人物混合)
    │
    ▼ /triage
┌─────────────────────────────────────┐
│ 时效性 × 主题 × 人物 三维分析        │
│                                      │
│ ephemeral → projects/tasks.md        │
│ reference → Resources/raw/           │
│ 人物信息 → people/raw/               │  ← CRM 路由
│ 双重属性 → 分离处理                   │
└─────────────────────────────────────┘
    │
    ▼ /wiki-compile
┌─────────────────────────────────────┐
│ raw/ → wiki/                         │
│                                      │
│ concepts/   → 概念知识               │
│ entities/   → 人物实体               │  ← CRM 编译
│ sources/    → 来源追溯               │
│ people/     → 人物 CRM               │
└─────────────────────────────────────┘
    │
    ▼ /context
人物关联项目 + 活跃度 + 最近互动
```

---

## 4. 人物页面模板

```yaml
---
type: entity
entity_type: person
tier: 1 | 2 | 3
created: YYYY-MM-DD
topic: people
relations:
  - [[project-x]]  # 关联项目
  - [[concept-y]]  # 关联知识
---
```

---

## 5. 数据流

```
/triage 检测人物信号
    │
    ├── 手机/邮箱/微信 → 提取
    ├── 人名匹配 → 更新已有
    └── 新人物 → people/raw/
         │
         ▼ /wiki-compile
    people/wiki/entities/
         │
         ▼ 双向链接
    [[项目]] ↔ [[人物]] ↔ [[概念]]
```

---

> 📎 关联: [[PARA-System-架构设计文档\|系统架构]] | [[06-People CRM 子库设计\|CRM 设计]] | [[Skill 1-triage\|triage 人物识别]]
