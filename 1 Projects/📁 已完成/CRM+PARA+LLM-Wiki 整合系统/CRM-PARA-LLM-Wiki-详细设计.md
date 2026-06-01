---
aliases: [CRM 详细设计]
created: 2026-06-01
type: design-detail
topic: crm-integration
tags: [design, crm]
---

# CRM+PARA+LLM-Wiki 详细设计 v1.0

## 1. 人物检测 (Triage 集成)

```
PERSON_PATTERNS = {
    phone: /1[3-9]\d{9}/,
    email: /\S+@\S+\.\S+/,
    name:  /(姓名|联系人)[：:]\s*(.+)/,
    wechat: /(微信|WeChat)[：:]\s*(.+)/,
    company: /(公司|单位)[：:]\s*(.+)/,
}

function detectPerson(file): Person? {
    hits = matchPatterns(file, PERSON_PATTERNS)
    if hits.count >= 2:   // 至少2个字段
        return extractPerson(hits)
    return null
}
```

## 2. 路由

```
triaged_to: 0 Inbox/people/raw/
entity_type: person
```

## 3. 编译

`/wiki-compile people` → `wiki/entities/{name}.md`

## 4. 双向链接

```
person ↔ project   (collaborates)
person ↔ concept   (expertise)
person ↔ person    (knows)
```
