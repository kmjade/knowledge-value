---
title: CRM 分类码对照 — DDC · UDC · CLC · LCC
aliases: [CRM Classification Codes, 客户关系管理分类码, People CRM Classification]
tags: [classification, crm, people-crm, salesforce, ddc, udc, clc, lcc]
created: 2026-06-01
---

# CRM 分类码对照

> 客户关系管理 (CRM) 在四大图书馆分类体系中的精确分类号——覆盖企业 CRM 软件与 People CRM 个人关系管理双重维度。

---

## 一、四体系总览

| 体系 | 类号 | 名称 | 分类逻辑 |
|:---:|:---:|------|------|
| **DDC** | `658.812` | Customer relations (CRM) | 以「管理职能」分类 |
| **UDC** | `658.89` | Customer relations. After-sales | 以「业务流程」分类 |
| **CLC** | `F274` | 企业供销管理·客户关系 | 以「经济管理」分类 |
| **LCC** | `HF5415.5` | Customer relations. Customer service | 以「商业·营销」分类 |

---

## 二、CRM 的双重维度

在本 Vault 中，"CRM" 有两层含义，分别归属不同体系：

| 维度 | 含义 | DDC | CLC | 目录 |
|------|------|:---:|:---:|------|
| **企业 CRM** | Salesforce·HubSpot 客户管理 | `658.812` | `F274` | 管理科学 (DDC 650) |
| **People CRM** | 个人关系智能层 (GBrain) | `658.4` | `C931.2` | `3 Resources/people/` (计划) |

> 企业 CRM 是业务流程软件，People CRM 是知识管理——分类体系需要区分这两者。

---

## 三、DDC 层级详解

```
600 — 技术·应用科学 (Technology. Applied sciences)
  └── 650 — 管理与辅助服务 (Management & auxiliary services)
       └── 658 — 一般管理 (General management)
            ├── 658.8 — 营销管理 (Marketing management)
            │    └── 658.81 — 销售管理 (Sales management)
            │         └── 658.812 — 客户关系 (Customer relations) ★
            ├── 658.4 — 行政管理 (Executive management)
            └── 658.05 — 管理中的计算机应用 (Computer applications)
```

### DDC CRM 备选

| 类号 | 名称 | 适用场景 |
|:---:|------|------|
| `658.812` | **Customer relations** | ✦ 主分类 — 企业 CRM |
| `658.4` | Executive management | People CRM / 人际管理 |
| `658.4038` | Information management | 知识管理视角 |
| `005.5` | General purpose software | CRM 软件技术视角 |
| `006.78` | Multimedia/CMS | SaaS CRM 平台 |

---

## 四、UDC 层级详解

```
6 — 应用科学·医学·技术 (Applied sciences)
  └── 65 — 管理与组织 (Management and organization)
       └── 658 — 企业管理 (Business management)
            ├── 658.8 — 营销·销售 (Marketing. Sales)
            │    └── 658.89 — 客户关系·售后服务 ☆
            └── 658.3 — 人事管理 (Personnel management) ← People CRM
```

### UDC 维度组合

| 维度 | UDC 组合 | 示例 |
|------|:---:|------|
| CRM + 软件 | `658.89:004.4` | Salesforce |
| CRM + 云 | `658.89:004.774` | SaaS CRM |
| People CRM | `005.95:658.3` | 个人关系管理 |
| CRM + 数据分析 | `658.89:004.6` | 客户数据分析 |

---

## 五、CLC 层级详解（中图法）

```
F — 经济 (Economics)
  └── F27 — 企业经济 (Enterprise economy)
       └── F274 — 企业供销管理 (Supply & marketing management)
            ├── 客户关系管理 (CRM) ☆
            ├── 供应链管理 (SCM)
            └── 市场营销
```

### CLC 两种 CRM

```
F274      企业 CRM     Salesforce·HubSpot·Zoho
C931.2    人际关系      People CRM·沟通管理
TP317     应用软件      CRM 软件实现
```

| CLC | 层次 | 含义 |
|:---:|------|------|
| `F274` | 经济·企业 | CRM 作为企业管理职能 — 最准确 |
| `C931.2` | 社科·管理 | 人际关系与沟通管理 — People CRM |
| `TP317` | 技术·软件 | CRM 软件程序包 |

---

## 六、LCC 层级详解

```
H — 社会科学 (Social Sciences)
  └── HF — 商业 (Commerce)
       └── HF5410-5417.5 — 营销 (Marketing)
            └── HF5415.5 — 客户关系·客服 (Customer relations. Customer service) ☆
                 ├── HF5415.5.S25 — Salesforce
                 └── HF5415.5.H83 — HubSpot
```

### LCC People CRM

```
HD — 产业·劳动·管理 (Industries. Labor. Management)
  └── HD28-70 — 管理 (Management)
       └── HD30.3 — 管理沟通 (Communication in management) ← People CRM
```

---

## 七、CRM 工具分类号对照

| 工具 | DDC | UDC | CLC | LCC | 类型 |
|------|:---:|:---:|:---:|:---:|------|
| **Salesforce** | `658.812` | `658.89` | `F274` | `HF5415.5.S25` | SaaS CRM |
| HubSpot | `658.812` | `658.89` | `F274` | `HF5415.5.H83` | SaaS CRM |
| Zoho CRM | `658.812` | `658.89` | `F274` | `HF5415.5.Z64` | SaaS CRM |
| Microsoft Dynamics | `658.812` | `658.89` | `F274` | `HF5415.5.M53` | 企业 CRM |
| Pipedrive | `658.81` | `658.89` | `F274` | `HF5415.5.P57` | 销售 CRM |
| Airtable | `005.57` | `004.91` | `TP317.6` | `QA76.76.I58` | 轻量 CRM |
| Notion (as CRM) | `005.57` | `004.91` | `TP317.1` | `QA76.76.I58` | 通用工具 |
| **People CRM** | `658.4` | `005.95` | `C931.2` | `HD30.3` | 个人关系 (GBrain) |

---

## 八、CRM vs 相关概念分类对照

| 概念 | DDC | UDC | CLC | LCC |
|------|:---:|:---:|:---:|:---:|
| **CRM** | `658.812` | `658.89` | `F274` | `HF5415.5` |
| 营销自动化 (MA) | `658.872` | `658.8:004` | `F713.36` | `HF5415.1265` |
| 销售管理 (Sales) | `658.81` | `658.81` | `F274` | `HF5438` |
| 客服系统 (CS) | `658.812` | `658.89` | `F274` | `HF5415.5` |
| 企业资源规划 (ERP) | `658.05` | `658:004` | `F270.7` | `HD30.28` |
| 供应链管理 (SCM) | `658.7` | `658.7` | `F274` | `HD38.5` |
| 人力资源管理 (HRM) | `658.3` | `658.3` | `F272.92` | `HF5549` |
| 知识管理 (KM) | `658.4038` | `005.94` | `F270.7` | `HD30.2` |
| **People CRM** | `658.4` | `005.95` | `C931.2` | `HD30.3` |

---

## 九、People CRM 分类（本 Vault 专用）

People CRM 在图书馆分类中尚无精确对应类号——它是最接近「人际关系智能层」的概念：

| 体系 | People CRM 类号 | 最接近的传统范畴 |
|:---:|:---:|------|
| **DDC** | `658.4` | 行政管理·人际沟通 |
| **UDC** | `005.95` | 人员管理·人际技能 |
| **CLC** | `C931.2` | 人际关系·管理沟通 |
| **LCC** | `HD30.3` | 管理中的沟通 |

> People CRM 本质上是一个新概念——它融合了 CRM（关系管理）、PKM（个人知识管理）、Social Network Analysis（社交网络分析）三个传统范畴。四体系均无精确对应，需用多个类号组合标引。

### People CRM 复合类号

```
DDC  658.4            行政管理
    + 006.78          计算应用
    = 658.4006        管理沟通中的计算辅助

CLC  C931.2            人际关系管理
    + TP317.1          办公自动化
    = C931.2/TP317.1   双类号标引

UDC  005.95:004.91     人员管理 + 文档处理
```

---

## 十、四体系 CRM 分类哲学对比

| 体系 | CRM 归属 | 分类逻辑 | 优势 |
|------|:---:|------|------|
| **DDC** | 658（一般管理） | 以「管理职能」分类 | CRM 在营销管理下 — 位置合理 |
| **UDC** | 658.89（客户关系） | 以「业务流程」分类 | CRM 独占子类 — 最精确 |
| **CLC** | F274（企业供销） | 以「经济管理」分类 | CRM 与 SCM 并列 — 业务视角 |
| **LCC** | HF5415.5（客户服务） | 以「商业职能」分类 | CRM 与营销并列 — 市场视角 |

> **UDC 最精确**：`658.89` 是 CRM 的专属子类号——DDC 的 `658.812` 需要下到第6位，CLC 的 `F274` 与 SCM 共享，LCC 归入客服。

---

## 十一、在本 Vault 中的对应

| 主题 | Vault 位置 | 状态 |
|------|-----------|:---:|
| People CRM 设计 | [[06-People CRM 子库设计]] | ✅ 设计文档 |
| People 分类码 | [[People 分类码]] | ✅ 已创建 |
| 传记 KB | [[920-传记与人物]] | ✅ 9章 |
| 知识管理 KB | [[060-Knowledge-Management/]] | 🟡 规划中 |
| CRM 分类码 | 本页 | ✅ 新创建 |

---

## 参考

- [[People 分类码]] — 人物/传记四体系分类码总览（含 People CRM 传统传记对比）
- [[CMS 分类码]] — 内容管理系统分类码（同为应用软件类）
- [[CLC-中國圖書館分類法]] · [[DDC]] · [[UDC]] · [[LCC]]
- 国家图书馆.《中国图书馆分类法》（第五版，2010）
- OCLC. *Dewey Decimal Classification* (DDC 23, 2011)
