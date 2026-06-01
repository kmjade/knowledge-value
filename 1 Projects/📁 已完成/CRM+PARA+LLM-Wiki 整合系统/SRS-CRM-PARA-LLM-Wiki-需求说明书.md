---
aliases: [CRM SRS, 整合系统需求]
created: 2026-06-01
type: srs
topic: crm-integration
parent: "[[PARA+LLM-Wiki 融合系统需求文档 v1.0]]"
tags: [srs, crm, integration]
---

# CRM+PARA+LLM-Wiki 整合系统 需求说明书

> 基于 [[../设计文档/CRM+PARA+LLM-Wiki-整合架构设计v1.0|整合架构 v1.0]]

**状态**: ✅ 基础就绪 | **Phase**: People 子库已部署

---

## 1. 概述

将人物关系管理 (CRM) 嵌入 PARA+LLM-Wiki 系统，实现：联系人自动识别 → 人物页面创建 → 项目/知识双向关联。

---

## 2. 功能需求

### CR-01: 人物信号检测

| 信号 | 正则 | 优先级 |
|------|------|:------:|
| 手机号 | `1[3-9]\d{9}` | P0 |
| 邮箱 | `\S+@\S+\.\S+` | P0 |
| 姓名标记 | `姓名:\|联系人:\|微信:` | P0 |
| 公司标记 | `公司:\|单位:` | P1 |

### CR-02: 人物路由

检测到人物信号 → `/triage` 路由到 `0 Inbox/people/raw/`

### CR-03: 人物编译

`/wiki-compile people` → 生成 `wiki/entities/[name].md`

### CR-04: 双向关联

人物页面 ↔ 项目页面 ↔ 概念页面，wikilink 互链

---

## 3. 验收

| 条件 | ✅ |
|------|:--:|
| /triage 正确检测人物信号 | |
| 人物信息路由到 people/raw/ | |
| /wiki-compile people 生成实体页 | |
| 人物-项目-概念 双向链接 | |

---

> 📎 关联: [[../设计文档/CRM+PARA+LLM-Wiki-整合架构设计v1.0\|架构]] | [[06-People CRM 子库设计\|CRM 设计]]
