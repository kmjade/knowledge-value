---
aliases:
  - 叙词表规划
  - Vault Thesaurus
  - 受控词表设计
created: 2026-05-28
type: concept
topic: knowledge-systems
status: draft
---

# 叙词表规划 (Vault Thesaurus Plan)

> [!abstract] 文档定位
> 为 KOS 知识 Vault 设计一套受控词表（叙词表），统一术语、建立语义关系、消除歧义，提升知识检索精度和 AI 编译一致性。

---

## 1. 为什么要建立叙词表

| 问题 | 现状 | 叙词表解决 |
|------|------|-----------|
| **同义词分散** | "AI Agent" / "智能体" / "AI 代理" 指向同一概念但分散存在 | USE/UF 映射，自动归一 |
| **层级混乱** | "机器学习" 属于 "AI" 还是 "计算机科学"？多父节点问题 | BT/NT 定义层级 |
| **跨域关联弱** | "KOS" 横跨 图书情报学 / 生产力 / AI 三个域，但链接不完整 | RT 关联 |
| **AI 编译歧义** | LLM 编译 wiki 时对同一概念使用不同术语 | 受控词表强制一致性 |
| **搜索召回低** | 搜索 "知识图谱" 找不到 "Knowledge Graph" 页面 | 同义词自动扩展 |

---

## 2. 叙词表架构

### 2.1 总体设计

```
Vault 叙词表
├── 01 概念域 (Concept Domains)     # 顶层主题分类
│   ├── 计算机科学 / AI
│   ├── 信息科学 / 图书情报学
│   ├── 生产力 / 知识管理
│   ├── 认识论 / 哲学
│   └── 金融 / 其他
│
├── 02 概念词表 (Concept Terms)     # 核心概念 + 关系
│   ├── BT/NT 层级关系
│   ├── RT 关联关系
│   └── USE/UF 同义规范
│
├── 03 实体词表 (Entity Terms)      # 实体类型 + 实例
│   ├── 人物 (Person)
│   ├── 组织 (Organization)
│   ├── 工具/平台 (Tool/Platform)
│   ├── 模型 (Model)
│   └── 方法论 (Methodology)
│
└── 04 别名索引 (Alias Index)       # Frontmatter aliases 汇总
    ├── 自动从各页面扫描
    ├── 去重 + 归并
    └── 反向映射 (别名 → 规范名)
```

### 2.2 与 KOS 架构的关系

```
知识组织金字塔中的叙词表位置：

    L4 洞察应用 ←── 叙词表提升检索精度
    L3 Wiki 编译 ←── 叙词表约束 AI 术语一致性
    L2 PARA 组织 ←── 叙词表指导文件夹分类
    L1 raw/ 原始 ←── 叙词表辅助自动标签
```

---

## 3. 概念域 (Concept Domains)

### 3.1 顶层域定义

| 域代码 | 域名 | 对应路径 | 状态 |
|--------|------|----------|------|
| `CS` | 计算机科学 | `0 Department/Computer-Science/` | 🟢 活跃 |
| `AI` | 人工智能 | `01-Tech/AI-Agent/` | 🟢 活跃 |
| `IS` | 信息科学 | `0 Department/05-Information-Science/` | 🟢 活跃 |
| `LIS` | 图书情报学 | `05-图书情报学/` | 🟢 活跃 |
| `KS` | 知识系统 | `000 Knowledge/` | 🟢 活跃 |
| `PD` | 生产力 | `productivity/` | 🟢 活跃 |
| `EP` | 认识论 | `epistemology/` | 🟢 活跃 |
| `FN` | 金融 | `finance/` | 🟡 规划中 |
| `PP` | 人物 | `people/` | 🟡 规划中 |

### 3.2 跨域交叉索引

有些概念跨越多个域，需要在叙词表中标记所有父级：

| 概念 | 主域 | 跨域 |
|------|------|------|
| KOS | KS | IS, LIS, PD |
| 知识图谱 | AI | KS, IS |
| RAG | AI | KS |
| 本体论 | IS | KS, EP |
| PKM | PD | KS |
| 分类法 | LIS | IS, KS |
| LLM | AI | CS |

---

## 4. 概念词表 (Concept Terms)

### 4.1 关系类型

| 关系 | 符号 | Obsidian 实现 |
|------|------|---------------|
| 上位词 | BT | `domain:` frontmatter + MOC 页面 |
| 下位词 | NT | `topic:` 标签 + wikilinks |
| 相关词 | RT | 正文 `[[]]` 交叉引用 |
| 用/代 | USE/UF | `aliases:` frontmatter |
| 范围注 | SN | `> [!note]` callout 中的定义 |

### 4.2 核心概念树（示例）

```
人工智能 (AI)                    # BT: 计算机科学
├── 机器学习 (Machine Learning)  # NT of AI
│   ├── 深度学习 (Deep Learning)  # NT of ML
│   │   ├── Transformer           # NT of DL
│   │   └── Attention             # RT: Transformer
│   └── 强化学习 (RL)
├── 大语言模型 (LLM)              # NT of AI, RT: 深度学习
│   ├── GPT 系列
│   ├── Claude 系列
│   └── Hermes 3                  # RT: 函数调用
├── AI Agent (智能体)             # NT of AI
│   ├── 函数调用 (Function Call)  # RT: 工具使用
│   ├── 工具使用 (Tool Use)      # USE: 工具调用
│   └── Hermes Agent              # RT: CLI, Claude Code
└── 知识图谱 (Knowledge Graph)    # NT of AI, RT: KOS

知识组织系统 (KOS)                 # BT: 信息科学
├── 分类法 (Classification)       # NT of KOS
│   ├── DDC
│   └── UDC
├── 叙词表 (Thesaurus)            # NT of KOS, RT: 受控词表
│   └── MeSH
├── 本体论 (Ontology)             # NT of KOS
└── 知识图谱 (Knowledge Graph)    # NT of KOS, RT: AI

知识管理 (Knowledge Management)    # BT: 生产力
├── 个人知识管理 (PKM)            # NT of KM
│   └── Obsidian
├── PARA 方法论                    # NT of PKM
├── Zettelkasten                  # RT: PKM
└── LLM-Wiki                      # RT: PKM, RT: AI
```

### 4.3 同义词规范表（核心术语）

| 规范词 (USE) | 非规范词 (UF) |
|-------------|---------------|
| AI Agent | 智能体、AI 代理、Agent、AI 助手 |
| 大语言模型 | LLM、大模型、语言模型 |
| 函数调用 | Function Calling、工具调用、Tool Use |
| 知识图谱 | Knowledge Graph、KG、语义网络 |
| 受控词表 | 叙词表、主题词表、Thesaurus |
| 个人知识管理 | PKM、Personal Knowledge Management |
| 检索增强生成 | RAG、Retrieval-Augmented Generation |
| 上下文工程 | Context Engineering、提示工程进阶 |

---

## 5. 实体词表 (Entity Terms)

### 5.1 实体类型定义

| 类型 | Frontmatter | 示例 |
|------|-------------|------|
| 模型 | `type: entity` + `entity_type: model` | Hermes 3, GPT-4o, Llama 3.1 |
| 工具 | `type: entity` + `entity_type: tool` | Obsidian, Claude Code, Ollama |
| 组织 | `type: entity` + `entity_type: org` | Nous Research, Anthropic, OpenAI |
| 人物 | `type: entity` + `entity_type: person` | Karpathy, Garry Tan |
| 方法论 | `type: entity` + `entity_type: method` | PARA, Zettelkasten, GTD |
| 标准 | `type: entity` + `entity_type: standard` | SPARQL, MCP, JSON Schema |

### 5.2 核心实体登记表

| 规范名 | 类型 | 别名 | 所属域 |
|--------|------|------|--------|
| Hermes Agent | 工具 | Hermes CLI | AI |
| Hermes 3 | 模型 | Hermes-3-Llama-3.1 | AI |
| Claude Code | 工具 | Claude CLI | AI |
| Obsidian | 工具 | - | PD |
| Nous Research | 组织 | Nous | AI |
| Karpathy | 人物 | Andrej Karpathy | AI |
| PARA | 方法论 | PARA Method | PD |
| LLM-Wiki | 方法论 | LLM Wiki | KS, PD |
| MCP | 标准 | Model Context Protocol | AI |

---

## 6. 实施路线

### 6.1 Phase 1: 建立索引（当前）

- [ ] 创建 `wiki/concepts/` 下的术语索引页 `Glossary.md`
- [ ] 汇总所有现有页面的 `aliases:` 到别名索引
- [ ] 为跨域概念标注所有父级 domain

### 6.2 Phase 2: 关系标注（1-2 周）

- [ ] 为核心概念添加 BT/NT 关系（通过 wikilinks）
- [ ] 建立跨域 RT 关联
- [ ] 同义词规范：选择 USE 词，其他标为 UF
- [ ] 更新 wiki 页面，确保术语一致性

### 6.3 Phase 3: 自动化（2-4 周）

- [ ] Dataview 查询：显示所有孤立页面（缺少 BT/NT）
- [ ] `/lint` 扩展：检查术语不一致
- [ ] AI 编译时自动校验术语使用规范
- [ ] 定期扫描新页面，自动建议关系

### 6.4 Phase 4: 知识图谱化（远期）

- [ ] 从 wikilinks 提取关系生成图数据
- [ ] 可视化概念层级图谱
- [ ] 支持 SPARQL 类查询（Dataview 增强）
- [ ] 跨子库语义搜索

---

## 7. 维护机制

### 7.1 新增概念流程

```
新概念出现
    │
    ├── 检查是否已存在（别名搜索）
    ├── 确定父级 BT（归属哪个域/概念）
    ├── 标注同义词 USE/UF
    ├── 建立 RT 关联
    └── 更新别名索引
```

### 7.2 定期审计

| 频率 | 检查项 | 工具 |
|------|--------|------|
| 每周 | 新页面是否有别名 | Dataview 查询 |
| 每月 | 术语一致性扫描 | `/lint` |
| 每季度 | 跨域关联完整性 | 手动审查 |

### 7.3 叙词表约束规则

1. **每个概念页必须有 `aliases`**（USE/UF 规范）
2. **每个概念页必须有 `domain` 或 `topic`**（BT 层级）
3. **跨域概念必须标注多个 BT**（图结构，非树）
4. **Wiki 编译时必须使用规范词**（AI 遵守 USE 映射）
5. **新术语加入前检查是否别名已存在**

---

## 8. Obsidian 中的叙事表实现

### 8.1 现有机制映射

| 叙词表功能 | Obsidian 实现 |
|------------|---------------|
| USE/UF | `aliases:` frontmatter |
| BT/NT | `domain:` + `topic:` + wikilinks 到 MOC |
| RT | 正文 `[[]]` 交叉引用 |
| SN (范围注) | 页面开头的 `> [!info]` callout |
| 词表索引 | `wiki/index.md` + `Glossary.md` |
| 层级浏览 | MOC 页面 (Map of Content) |

### 8.2 Frontmatter 标准增强

```yaml
---
aliases:          # USE/UF: 所有同义词
  - AI 代理
  - 智能体
  - Agent
domain:           # BT: 所属知识域
  - "[[AI]]"
  - "[[计算机科学]]"
topic:            # NT: 细化标签
  - topic/ai-agent
type: concept     # 实体类型（概念/实体）
related:          # RT: 相关概念
  - "[[函数调用]]"
  - "[[LLM]]"
---
```

### 8.3 Dataview 叙词表查询

```dataview
TABLE aliases as "同义词", domain as "所属域", type as "类型"
FROM "wiki/concepts"
WHERE aliases
SORT file.name ASC
```

---

## 9. 关键决策记录

| 决策 | 选择 | 理由 |
|------|------|------|
| 叙词表格式 | Obsidian wikilinks + frontmatter | 无需额外工具，零维护成本 |
| 词表集中 vs 分散 | 分散在页面中 + 集中索引 | 符合 Wiki 方法论，避免集中维护 |
| 中英文规范 | 中文规范词 > 英文别名 | 中文优先，英文作为通用别名 |
| 自动化程度 | AI 辅助 + 人类审核 | 全自动风险高，半自动平衡质量 |

---

## 相关概念

- [[Thesaurus]] — 叙词表理论基础
- [[Knowledge-Organization-Systems]] — 知识组织系统总览
- [[Classification-Systems]] — 分类法（叙词表的前身）
- [[Ontology]] — 本体论（叙词表的进化方向）
- [[PKM]] — 个人知识管理中的叙词表实践

## Sources

- [[3 Resources/000 Knowledge/ram/Knowledge-Systems/03-Thesauri/03-Thesauri.md]]
- [[3 Resources/000 Knowledge/ram/Knowledge-Systems/01/01-概述.md]]
