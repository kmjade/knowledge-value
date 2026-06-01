---
aliases: [CRM Prototype]
created: 2026-06-01
type: prototype
topic: crm-integration
tags: [prototype, crm]
---

# CRM+PARA+LLM-Wiki 原型设计

## 1. 人物发现

```
/triage
```

```
🔍 分拣中...

file.md ████████████ reference → ai-ml/raw/
        👤 检测到人物: 张三 138xxxx xxxx@mail.com 腾讯

→ 路由: 0 Inbox/people/raw/张三.md
```

## 2. 人物编译

```
/wiki-compile people
```

```
🔨 编译 People...

张三.md → wiki/entities/张三.md
  ✅ 基本信息: 张三 / 腾讯 / 138xxxx
  ✅ 关联项目: [[ESP32 机器人]]
  ✅ 关联概念: [[嵌入式系统]]

🔗 双向链接: 项目 ←→ 人物 ←→ 概念
```

## 3. 人物页面

```
[[0 Inbox/people/wiki/entities/张三]]

# 张三
- 📱 138xxxx | ✉️ mail.com | 💼 腾讯
- 🔗 [[ESP32 机器人]] — collaborates
- 🔗 [[嵌入式系统]] — expertise
```

---

> 📎 关联: [[SRS-CRM-PARA-LLM-Wiki-需求说明书\|需求]] | [[../设计文档/CRM+PARA+LLM-Wiki-整合架构设计v1.0\|架构]]
