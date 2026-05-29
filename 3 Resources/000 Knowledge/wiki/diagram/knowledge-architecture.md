---
created: 2026-05-28
type: diagram
topic: knowledge-architecture
---

# Knowledge Architecture / 知识架构全景图

```mermaid
graph TB
    %% ========== 样式定义 ==========
    classDef inbox fill:#f9f0ff,stroke:#7c3aed,stroke-width:2px,color:#4c1d95
    classDef skill fill:#fef3c7,stroke:#d97706,stroke-width:2px,color:#92400e
    classDef para fill:#dbeafe,stroke:#2563eb,stroke-width:2px,color:#1e3a5f
    classDef wiki fill:#d1fae5,stroke:#059669,stroke-width:2px,color:#064e3b
    classDef ddcBuilt fill:#dcfce7,stroke:#16a34a,stroke-width:2px,color:#14532d
    classDef ddcPending fill:#fef3c7,stroke:#ca8a04,stroke-width:2px,color:#713f12
    classDef ddcStub fill:#f3f4f6,stroke:#9ca3af,stroke-width:1px,color:#6b7280
    classDef log fill:#fce7f3,stroke:#db2777,stroke-width:1px,color:#9d174d

    %% ========== 信息输入层 ==========
    subgraph INBOX["📥 信息输入层 (Inbox Layer)"]
        direction LR
        I1["📎 Clippings<br/>网页剪藏"]:::inbox
        I2["📝 Fleeting Notes<br/>碎片笔记"]:::inbox
        I3["📌 Zettels<br/>永久卡片"]:::inbox
        I4["📋 Tasks<br/>任务清单"]:::inbox
    end

    %% ========== 操作引擎 ==========
    TRIAGE["🔍 /triage<br/>分拣引擎<br/>──────<br/>ephemeral → operational<br/>→ reference → evergreen"]:::skill
    COMPILE["🔨 /wiki-compile<br/>知识编译引擎<br/>──────<br/>raw/ → wiki/<br/>concepts · entities · sources"]:::skill
    LINT["✅ /lint<br/>健康检查"]:::skill

    %% ========== PARA 行动管理层 ==========
    subgraph PARA["📂 行动管理层 (PARA Layer)"]
        direction TB
        
        subgraph RES["3 Resources/ 知识资源"]
            direction TB
            
            subgraph DDC["📚 DDC 分类体系"]
                direction TB
                D000["000 知识组织 🟢<br/>KOS · DDC · UDC · 五维分类"]:::ddcBuilt
                D100["100 哲学·心理学 🟢<br/>7 子库 · 形而上学 · 伦理 · 东方哲学"]:::ddcBuilt
                D200["200 宗教·神学 🟡"]:::ddcStub
                D300["300 社会科学 🟡"]:::ddcStub
                D500["500 自然科学 🟢<br/>510 数学 (17 文件)"]:::ddcBuilt
                D600["600 应用科学 🟢<br/>207 文件 · 医学 · 工程 · 生物科技"]:::ddcBuilt
            end
            
            subgraph PARA_OLD["🗂️ PARA 传统分类"]
                direction LR
                P01["01-Tech<br/>编程 · AI · 数据科学"]:::para
                P02["02-Learning<br/>课程 · 书籍 · 数学→DDC 510"]:::para
                P03["03-Productivity<br/>工具 · 方法论"]:::para
                P04["04-Interests<br/>易学 · 魔兽世界"]:::para
            end
        end
        
        PROJ["1 Projects/"]:::para
        AREAS["2 Areas/"]:::para
        ARCH["4 Archives/"]:::para
    end

    %% ========== Wiki 知识编译层 ==========
    subgraph WIKI["🧠 知识编译层 (Wiki Layer)"]
        direction TB
        W1["000 Knowledge/wiki/<br/>11 concepts · 8 entities<br/>KOS · DIKW · RAG · PKM"]:::wiki
        W2["epistemology/wiki/<br/>认识论深度知识库<br/>DDC 120 覆盖"]:::wiki
        W3["productivity/wiki/<br/>生产力方法知识库"]:::wiki
        W4["ai-ml/wiki/<br/>AI/ML 知识库"]:::wiki
    end

    %% ========== 日志层 ==========
    LOG["📋 AI-Log/<br/>triage-log · compile-log<br/>optimization-reports"]:::log

    %% ========== 连线：信息流 ==========
    I1 --> TRIAGE
    I2 --> TRIAGE
    I3 --> TRIAGE
    I4 --> TRIAGE
    
    TRIAGE -->|"ephemeral"| PROJ
    TRIAGE -->|"operational"| AREAS
    TRIAGE -->|"reference"| RES
    TRIAGE -->|"evergreen"| WIKI
    TRIAGE -->|"记录"| LOG
    
    RES -->|"raw/ (只读)"| COMPILE
    COMPILE -->|"wiki/ (AI独占)"| WIKI
    COMPILE -->|"记录"| LOG
    
    WIKI --> LINT
    RES --> LINT
    LINT -->|"报告"| LOG
    
    %% ========== 连线：DDC 关系 ==========
    D500 -->|"「为什么」<br/>基础科学"| D600
    D600 -->|"「怎么做」<br/>应用科学·技术·工程"| D600
    D000 -.->|"知识组织"| D100
    D000 -.->|"分类法"| D500
    D100 -.->|"科学哲学"| D500
    D100 -->|"DDC 120 认识论"| W2
```

---

## 图例

| 颜色 | 含义 |
|------|------|
| 🟣 紫色边框 | Inbox 输入层 — 待分拣的原始信息 |
| 🟡 橙色 | Skills 操作引擎 — /triage /wiki-compile /lint |
| 🔵 蓝色 | PARA 行动管理层 — Projects / Areas / Resources / Archives |
| 🟢 绿色 | Wiki 知识编译层 — AI 生产的知识页面 |
| 🟢 深绿实心 | DDC 已建设子库 |
| 🟡 黄色 | DDC 待建设子库 |
| ⬜ 灰色 | DDC 空壳（仅 stub） |

---

## 三层架构

```
┌─────────────────────────────────────────────────────────────┐
│                    信息输入层 (Inbox)                        │
│   Clippings · Fleeting Notes · Zettels · Tasks              │
│   0 Inbox/  ← 唯一的信息入口                                │
└────────────────────────┬────────────────────────────────────┘
                         │ /triage (分拣引擎)
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                    行动管理层 (PARA)                         │
│                                                             │
│  1 Projects/  →  2 Areas/  →  3 Resources/  →  4 Archives/ │
│    (有截止日)      (持续责任)     (知识资源)       (归档)     │
│                                                             │
│   3 Resources/ 内部采用 DDC 分类：                           │
│   ┌──────────┬──────────┬──────────┬──────────┬──────────┐  │
│   │ 000 知识  │ 100 哲心 │ 500 自然 │ 600 应用 │ 更多...  │  │
│   │   🟢     │   🟢     │   🟢     │   🟢     │          │  │
│   └──────────┴──────────┴──────────┴──────────┴──────────┘  │
│                                                             │
│   raw/ 目录 ← 人类独占写入，AI 只读                          │
└────────────────────────┬────────────────────────────────────┘
                         │ /wiki-compile (知识编译引擎)
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                    知识编译层 (Wiki)                         │
│                                                             │
│  wiki/  目录 ← AI 独占写入，人类只读                         │
│                                                             │
│  ┌──────────────┬──────────────┬──────────────────────┐     │
│  │  concepts/   │  entities/   │  sources/            │     │
│  │  概念页面     │  实体页面     │  来源溯源            │     │
│  │  KOS · DIKW  │  DDC · UDC   │  关联原始资料         │     │
│  │  RAG · PKM   │  Wikidata    │                      │     │
│  └──────────────┴──────────────┴──────────────────────┘     │
│                                                             │
│  outputs/  ← 基于 Wiki 生成的制品（博客、报告...）           │
└─────────────────────────────────────────────────────────────┘
```

---

## DDC 建设进度

```
DDC Class 0 — Knowledge (000)
  000 Knowledge/  🟢🟢🟢🟢🟢🟢🟢🟢  ████████████████████ 82 文件

DDC Class 1 — Philosophy & Psychology (100)
  100 Phil. Psy/  🟢🟢🟢🟢🟢🟢🟢🟡  ████████████████░░░░ 7/8 子库

DDC Class 2 — Religion (200)
  200 Religion/   🟡🟡🟡🟡🟡🟡🟡🟡  ░░░░░░░░░░░░░░░░░░░░ stub

DDC Class 3 — Social Sciences (300)
  300 Social/     🟡🟡🟡🟡🟡🟡🟡🟡  ░░░░░░░░░░░░░░░░░░░░ stub

DDC Class 5 — Natural Sciences (500)
  500 Natural/    🟢🟡🟡🟡🟡🟡🟡🟡  ██░░░░░░░░░░░░░░░░░░ 1/9 子库

DDC Class 6 — Applied Sciences (600)
  06 Applied/     🟢🟢🟢🟢🟢🟢🟢🟢  ████████████████████ 207 文件
```

---

## 核心数据流

```
用户捕获 ──→ Inbox ──→ /triage ──→ 分类路由 ──→ PARA 目录
                                                  │
                                     raw/ (原始资料，人类维护)
                                                  │
                                     /wiki-compile (AI 编译)
                                                  │
                                     wiki/ (结构化知识，AI 维护)
                                                  │
                                     /lint (健康检查)
                                                  │
                                     AI-Log/ (操作日志)
```

---

*分类: 知识架构 · DDC · PARA · LLM-Wiki*
