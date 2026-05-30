---
aliases:
  - People Wiki
  - CRM
  - 人物库
created: 2026-05-26
type: wiki-schema
topic: people
---

# People Wiki Schema

人物 CRM 与关系管理知识库，采用 LLM-Wiki 方法论组织。

## 目录结构

```
people/
├── CLAUDE.md          # 本文件 - 子库 schema
├── raw/               # 原始资料（人类维护，AI 只读）
│   ├── articles/      # 文章摘录
│   ├── papers/        # 论文笔记
│   ├── books/         # 书籍笔记
│   └── conversations/ # 对话记录
├── wiki/              # LLM 编译产物（AI 独占写入）
│   ├── index.md       # 人物索引
│   ├── log.md         # 编译日志
│   ├── concepts/      # 概念页面
│   ├── entities/      # 人物实体页面
│   └── sources/       # 来源溯源
└── outputs/           # 基于 Wiki 生成的制品
```

## 核心概念域

### 人物类型
- family - 家人
- friend - 朋友
- colleague - 同事
- mentor - 导师
- mentee - 学生
- network - 社交网络

### 关系维度
- professional - 专业关系
- personal - 个人关系
- collaborative - 协作关系

### 信息类型
- 基本资料（姓名、联系方式、生日）
- 专业背景（职业、技能、公司）
- 互动记录（会议、对话、协作）
- 共同兴趣与话题

## 页面模板

### 人物实体页面
```markdown
# [姓名]

## 基本信息
- 类型: family/friend/colleague/mentor/network
- 认识时间: YYYY-MM
- 状态: active/dormant/archived

## 联系方式
- Email:
- Phone:
- Social:

## 专业背景
- 职业:
- 公司:
- 技能:

## 互动记录
- YYYY-MM-DD: [事件描述]

## 共同话题
- [话题1]
- [话题2]

## 相关人物
- [[related-person-1]]

## Sources
- [[source-file-name]]
```

## 编译规则

1. **隐私保护**: 敏感信息不进入 wiki/
2. **raw/ 只读**: AI 不修改原始资料
3. **sources 必须**: 所有 wiki 页面必须标注来源
4. **链接优先**: 使用 `[[]]` 建立人物关系网络

## 使用命令

- `/wiki-compile people` - 编译此知识库
- `/triage` - 将新人物信息分拣到 raw/

