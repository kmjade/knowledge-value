---
aliases:
  - 文献学
  - 文献工作
  - Documentação
  - Documentation Science
  - Science of Documentation
created: 2026-06-02
type: concept
topic: knowledge-systems
category: 資訊科學
status: reviewed
ddc: "020"
udc: "001"
confidence: high
tags:
  - #udc/001
  - #udc/025.4
  - #ddc/020
---

# Documentation 文献学

> **信息科学的先驱学科** — Paul Otlet 和 Henri La Fontaine 在 19 世纪末创立的「关于记录的知识」。Documentation 一词在英语中已被 Information Science 取代，但欧洲大陆（特别是法语和葡萄牙语）仍保留这一传统。

---

## 定义

Documentation（文献学/文献工作）是 **19 世纪末至 20 世纪中期**关于**记录信息**的组织、描述、检索和传播的系统化学科。由 [[Paul-Otlet]] 和 [[Henri-La-Fontaine]] 创立，是现代 Information Science、Library Science 和 Knowledge Management 的**共同先驱**。

> "Documentation is the systematic gathering, organization, and dissemination of recorded knowledge in all forms." — Paul Otlet, *Traité de Documentation* (1934)

---

## 核心原理

### 通用知识图谱 (Universal Knowledge Graph)

Otlet 的核心洞见是：**文献之间的关联构成知识本身**。他提出：

```
知识 = 文献 + 关联

文献单元: 书籍·论文·图片·档案·实物
关联类型: 引用·参照·分类·综合
知识图谱: 所有文献 + 其关联 = 通用知识体
```

这一概念比 Semantic Web 早了 **近一个世纪**。

### 文献的泛化定义

Otlet 将「文档」的定义从文字记录扩展到**任何承载信息的载体**：

| 传统文献观 | Otlet 文献观 |
|:-----------|:-------------|
| 书籍·论文 | 书籍·论文·图片**·雕塑·博物馆展品·自然标本** |
| 文字为主 | 文字·图像·声音**·三维物体** |
| 静态 | **动态（含过程记录）** |
| 单一媒介 | **多媒介集成** |

### 国际协作网络

Documentation 运动的核心是**跨国界知识共享**：

- **国际书目学会** (IIB, 1895) — 全球书目协作
- **Mundaneum** — 集中式全球知识索引
- **通用书目目录** (Répertoire Bibliographique Universel) — 1500 万张卡片
- **UDC** — 跨语言的统一分类语言

---

## 历史脉络

### 起源 (1890-1900)

| 年份 | 事件 |
|:----:|:-----|
| 1892 | Otlet 开始研究书目分类 |
| 1895 | 与 La Fontaine 会面，创立 IIB |
| 1895 | 提出「关联文档」概念（超文本原型） |
| 1899 | 开始编译通用书目目录 |

### 黄金时期 (1900-1934)

| 年份 | 事件 |
|:----:|:-----|
| 1905 | UDC 第一版出版 |
| 1910 | Mundaneum 概念提出 |
| 1913 | La Fontaine 获诺贝尔和平奖 |
| 1920 | Mundaneum 在布鲁塞尔建立 |
| 1931 | Otlet 提出「电视书」(Télé-Livre) 概念（互联网原型）|
| 1934 | **《Traité de Documentation》**出版 — Documentation 的奠基著作 |

### 转型 (1935-今)

| 时期 | 发展 |
|:----|:-----|
| 1945-1960 | Documentation 被 Information Science 取代（英语世界）|
| 1960-1990 | 计算机化推动 Information Retrieval 独立成学科 |
| 1990-2010 | WWW 实现 Otlet 的「关联文档」愿景 |
| 2010-今 | Semantic Web · Linked Data · Knowledge Graph 延续 Documentation 传统 |

---

## 与现代信息科学的关系

```
Documentation (1900-1945)
    │
    ├──► Library Science (图书情报学)
    │      └── 分类·编目·索引·OPAC
    │
    ├──► Information Science (信息科学)
    │      ├── Information Retrieval (信息检索)
    │      ├── Knowledge Organization (知识组织)
    │      ├── Bibliometrics (文献计量学)
    │      └── Human-Computer Interaction (人机交互)
    │
    ├──► Knowledge Management (知识管理)
    │      └── PKM · 企业知识库 · 知识图谱
    │
    └──► Web Science (网络科学)
           ├── Semantic Web (语义网)
           ├── Linked Data (关联数据)
           └── Knowledge Graph (知识图谱)
```

### 对现代系统的直接影响

| Documentation 概念 | 现代等价 | 差距 |
|:-------------------|:---------|:-----|
| 通用书目目录 | Google / 搜索引擎 | 广度 ✔ 深度更薄 |
| 关联文档 (1895) | 超文本 / WWW | 实现 ✔ 产权不同 |
| UDC 复合分类 | 分面导航 / 标签体系 | 标准化 ✔ 普及不足 |
| Mundaneum | 知识图谱 / Wikidata | 集中化 ✔ 规模更小 |
| 国际文献协作 | 开放获取 / Creative Commons | 理念 ✔ 商业壁垒 |

---

## 在 LLM-Wiki 系统中的体现

[[PARA+LLM-Wiki 融合系统]] 是 Documentation 思想的现代延续：

| Documentation 概念 | LLM-Wiki 实现 |
|:-------------------|:--------------|
| 文献单元 = raw/ | 原始资料 (raw/) |
| 编译知识 = wiki/ | AI 编译的结构化知识 |
| UDC 分类 = #udc/ | UDC 标签体系 |
| 文献关联 = [[]] | Wikilink 概念链接 |
| 通用书目 = META-INDEX | 全局知识导航 |
| 国际协作 = AI 编译 | AI 辅助知识组织 |

---

## 相关概念

- [[UDC]] — `used-by` 文献学使用的分类工具
- [[Information-Science]] — `evolved-into` 信息科学的直接前身
- [[Knowledge-Organization]] — `part-of` 知识组织方法之一
- [[Mundaneum]] — `manifestation` 文献学思想的物理实现
- [[Classification-Systems]] — `uses` 分类体系
- [[Semantic-Web]] — `anticipated` 语义网的前身
- [[Hypertext]] — `anticipated` 超文本概念 (1895)
- [[Information-Retrieval]] — `preceded` 信息检索的前身
- [[Library-Science]] — `related` 图书馆学

## 相关实体

- [[entities/Paul-Otlet-奥特勒|Paul Otlet]] — `founded` 文献学创始人
- [[entities/Henri-La-Fontaine|Henri La Fontaine]] — `co-founded` 文献学共同创始人
- [[Tim-Berners-Lee]] — `realized` 实现了 Otlet 的愿景

---

## Sources

- Otlet, Paul. *Traité de Documentation* (1934)
- [[entities/Paul-Otlet-奥特勒]] — 创始人实体
- [[entities/Henri-La-Fontaine]] — 共同创始人实体
- [[UDC+LLM-Wiki 整合系统 v1.0]]
- [[3 Resources/000 Knowledge/wiki/concepts/UDC]]

---

*Documentation 概念页 · 2026-06-02*
