---
title: Hermes+LLM Wiki +Obsidian 工作流
aliases:
  - Hermes LLM Wiki Obsidian 整合工作流
  - 智能知识管理工作流
para: resource
domain:
  - "[[AI-Agent]]"
  - "[[0 Inbox/_processed/01-Tech/LLM-Tech/wiki/concepts/LLM-Wiki]]"
  - "[[0 Inbox/_processed/01-Tech/LLM-Tech/wiki/entities/Hermes-Agent]]"
tags:
  - para/resource/tech
  - topic/ai-agent
  - topic/knowledge-management
  - topic/workflow
  - type/guide
created: 2026-05-25
modified: 2026-05-25
---

# Hermes+LLM Wiki +Obsidian 工作流

> [!summary] 概述
> 整合 **Hermes Agent** 的工具調用能力、**LLM Wiki** 的知識庫方法論、**Obsidian** 的筆記管理，構建一個自動化、持續積累的智能知識管理工作流。

---

## 一、三大支柱

### 1. Hermes Agent

| 项目 | 说明 |
|------|------|
| **定位** | AI 智能体框架（同类：Claude Code、Codex CLI） |
| **核心能力** | Skills 技能系统、Memory 持久记忆、Gateway 多平台、20+ Provider |
| **安装** | `curl ... | bash` 一键安装 |
| **协议** | OpenAI 兼容 function calling（标准工具调用） |

> [!tip] Hermes Agent 是框架，不是模型
> Hermes Agent 通过 API 调用任何 LLM（Claude、GPT、DeepSeek 等），无需本地 GPU。
> 它内置了 terminal、file、web、browser 等 20+ 工具集，通过自然语言驱动。

### 2. LLM Wiki

| 項目 | 說明 |
|------|------|
| **定位** | 知識庫構建方法論 |
| **核心理念** | Obsidian 是 IDE，LLM 是程序員，Wiki 是代碼庫 |
| **三大操作** | Ingest（導入）、Query（查詢）、Lint（維護） |
| **特點** | 復利增長、持續積累 |

### 3. Obsidian

| 項目 | 說明 |
|------|------|
| **定位** | 知識存儲與編輯器 |
| **核心能力** | 雙向鏈接、圖譜視圖、插件生態 |
| **數據格式** | Markdown |
| **擴展性** | Dataview、Templater、Web Clipper |

---

## 二、整合架構

```
┌─────────────────────────────────────────────────────────────────┐
│                    整合工作流架構                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   📚 Raw Sources                                                │
│   ├── 網頁剪藏 (Web Clipper)                                    │
│   ├── PDF 文檔                                                  │
│   ├── 會議記錄                                                  │
│   └── 外部 API 數據                                             │
│         │                                                       │
│         ▼                                                       │
│   ┌─────────────────────────────────────────┐                  │
│   │          Hermes Agent 層                │                  │
│   │  ┌─────────┐  ┌─────────┐  ┌─────────┐ │                  │
│   │  │ Ingest  │  │  Query  │  │  Lint   │ │                  │
│   │  │ Agent   │  │  Agent  │  │  Agent  │ │                  │
│   │  └────┬────┘  └────┬────┘  └────┬────┘ │                  │
│   └───────┼─────────────┼─────────────┼─────┘                  │
│           │             │             │                         │
│           ▼             ▼             ▼                         │
│   ┌─────────────────────────────────────────┐                  │
│   │            Obsidian Wiki                │                  │
│   │  ├── wiki/index.md      # 索引          │                  │
│   │  ├── wiki/log.md        # 日誌          │                  │
│   │  ├── wiki/source-*.md   # 摘要頁        │                  │
│   │  ├── wiki/entity-*.md   # 實體頁        │                  │
│   │  └── wiki/concept-*.md  # 概念頁        │                  │
│   └─────────────────────────────────────────┘                  │
│                     │                                           │
│                     ▼                                           │
│   🧠 持續積累的知識庫                                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 三、工作流設計

### 3.1 Ingest 工作流

```
┌────────────────────────────────────────────────────────────┐
│                    Ingest 工作流                            │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  📥 輸入: raw/文章.md                                       │
│       │                                                    │
│       ▼                                                    │
│  ┌─────────────┐                                           │
│  │ 1. 解析文檔  │  Hermes Agent 調用 read_file 工具        │
│  └──────┬──────┘                                           │
│         │                                                  │
│         ▼                                                  │
│  ┌─────────────┐                                           │
│  │ 2. 提取實體  │  LLM 識別關鍵實體和概念                   │
│  └──────┬──────┘                                           │
│         │                                                  │
│         ▼                                                  │
│  ┌─────────────┐                                           │
│  │ 3. 創建頁面  │  Hermes Agent 調用 write_file 工具       │
│  │    - 摘要頁  │  - wiki/source-xxx.md                    │
│  │    - 實體頁  │  - wiki/entity-xxx.md                    │
│  │    - 概念頁  │  - wiki/concept-xxx.md                   │
│  └──────┬──────┘                                           │
│         │                                                  │
│         ▼                                                  │
│  ┌─────────────┐                                           │
│  │ 4. 建立鏈接  │  更新所有相關頁面的 [[雙向鏈接]]          │
│  └──────┬──────┘                                           │
│         │                                                  │
│         ▼                                                  │
│  ┌─────────────┐                                           │
│  │ 5. 更新索引  │  更新 wiki/index.md 和 wiki/log.md       │
│  └─────────────┘                                           │
│                                                            │
│  📤 輸出: 5-8 個 Wiki 頁面                                   │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

#### Hermes Agent 实现方式

> [!info] Hermes Agent 通过 CLI 驱动，不是 Python SDK
> Hermes Agent 内置了 terminal、file、web、browser 等工具。
> 以下展示实际的工作流驱动方式。

```bash
# 方式一：交互式会话
hermes

# 然后在会话中直接说：
# "读取 inbox/新文章.md，提取关键实体，
#  创建对应的 wiki 页面，更新索引和日志"

# 方式二：单次任务
hermes chat -q "读取 ~/wiki/inbox/新文章.md 的内容，
  分析提取关键实体和概念，
  为每个实体创建 wiki/entity-xxx.md，
  为每个概念创建 wiki/concept-xxx.md，
  创建 wiki/source-xxx.md 摘要页，
  更新 wiki/index.md 和 wiki/log.md"

# 方式三：加载 Wiki 技能后执行
hermes -s llm-wiki "导入 inbox/新文章.md 到知识库"
```

### 3.2 Query 工作流

```
┌────────────────────────────────────────────────────────────┐
│                    Query 工作流                             │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ❓ 輸入: 用戶問題                                          │
│       │                                                    │
│       ▼                                                    │
│  ┌─────────────┐                                           │
│  │ 1. 解析問題  │  LLM 理解問題意圖                         │
│  └──────┬──────┘                                           │
│         │                                                  │
│         ▼                                                  │
│  ┌─────────────┐                                           │
│  │ 2. 定位頁面  │  讀取 wiki/index.md 找相關頁面            │
│  └──────┬──────┘                                           │
│         │                                                  │
│         ▼                                                  │
│  ┌─────────────┐                                           │
│  │ 3. 深度閱讀  │  讀取相關實體頁和概念頁                   │
│  └──────┬──────┘                                           │
│         │                                                  │
│         ▼                                                  │
│  ┌─────────────┐                                           │
│  │ 4. 綜合回答  │  整合信息，引用來源                       │
│  └──────┬──────┘                                           │
│         │                                                  │
│         ▼                                                  │
│  ┌─────────────┐                                           │
│  │ 5. 可選回寫  │  有價值的洞見可回寫為新頁面               │
│  └─────────────┘                                           │
│                                                            │
│  📤 輸出: 綜合回答 + 可選新頁面                              │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

#### Python 實現

```python
class QueryAgent:
    """知識查詢 Agent"""
    
    def __init__(self, wiki_path: str):
        self.wiki_path = Path(wiki_path)
        self.agent = Agent(model="hermes-3-70b")  # 查詢用更大模型
    
    def query(self, question: str) -> str:
        """執行查詢工作流"""
        
        # 1. 讀取索引
        index = self._read_index()
        
        # 2. 讓 Agent 定位相關頁面
        relevant_pages = self._find_relevant_pages(question, index)
        
        # 3. 讀取相關頁面內容
        context = self._gather_context(relevant_pages)
        
        # 4. 綜合回答
        prompt = f"""
        基於以下知識庫內容回答問題：
        
        ## 相關頁面
        {context}
        
        ## 問題
        {question}
        
        請提供綜合回答，並引用來源頁面。
        """
        
        return self.agent.run(prompt)
    
    def _read_index(self) -> str:
        index_path = self.wiki_path / "wiki" / "index.md"
        return index_path.read_text(encoding='utf-8')
    
    def _find_relevant_pages(self, question: str, index: str) -> list:
        # 使用 LLM 從索引中找出相關頁面
        prompt = f"""
        根據以下索引，找出與問題相關的頁面：
        
        索引：
        {index}
        
        問題：{question}
        
        返回相關頁面的文件名列表。
        """
        # ... 實現
        pass
    
    def _gather_context(self, pages: list) -> str:
        context = []
        for page in pages:
            path = self.wiki_path / "wiki" / page
            if path.exists():
                context.append(f"### {page}\n{path.read_text()}")
        return "\n\n".join(context)
```

### 3.3 Lint 工作流

```
┌────────────────────────────────────────────────────────────┐
│                    Lint 工作流                              │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  🔍 觸發: 定期或手動                                        │
│       │                                                    │
│       ▼                                                    │
│  ┌─────────────┐                                           │
│  │ 1. 掃描 Wiki │  遍歷所有 Wiki 頁面                       │
│  └──────┬──────┘                                           │
│         │                                                  │
│         ▼                                                  │
│  ┌─────────────┐                                           │
│  │ 2. 檢查項目  │                                           │
│  │   ✅ 矛盾檢查│  不同頁面的衝突內容                       │
│  │   ✅ 過時信息│  被新資料取代的內容                       │
│  │   ✅ 孤立頁面│  無入站鏈接的頁面                         │
│  │   ✅ 缺失引用│  可補充的交叉引用                         │
│  │   ✅ 缺失頁面│  被提及但無專屬頁面的概念                 │
│  └──────┬──────┘                                           │
│         │                                                  │
│         ▼                                                  │
│  ┌─────────────┐                                           │
│  │ 3. 生成報告  │  按嚴重程度排序                           │
│  └──────┬──────┘                                           │
│         │                                                  │
│         ▼                                                  │
│  ┌─────────────┐                                           │
│  │ 4. 自動修復  │  可自動修復的問題（如更新鏈接）           │
│  └──────┬──────┘                                           │
│         │                                                  │
│         ▼                                                  │
│  ┌─────────────┐                                           │
│  │ 5. 標註待處理│  需要人工審核的問題                       │
│  └─────────────┘                                           │
│                                                            │
│  📤 輸出: 健康報告 + 自動修復                                │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

#### Python 實現

```python
class LintAgent:
    """知識庫維護 Agent"""
    
    def __init__(self, wiki_path: str):
        self.wiki_path = Path(wiki_path)
        self.agent = Agent(model="hermes-3-8b")
    
    def lint(self) -> dict:
        """執行維護檢查"""
        
        report = {
            "errors": [],      # 高嚴重程度
            "warnings": [],    # 中嚴重程度
            "info": [],        # 低嚴重程度
            "fixed": []        # 已自動修復
        }
        
        # 1. 收集所有頁面
        all_pages = self._collect_pages()
        
        # 2. 構建鏈接圖
        link_graph = self._build_link_graph(all_pages)
        
        # 3. 檢查各項問題
        report["errors"] = self._check_contradictions(all_pages)
        report["warnings"] = self._check_outdated(all_pages)
        report["info"] = self._check_orphaned(link_graph)
        report["info"].extend(self._check_missing_links(all_pages))
        report["warnings"].extend(self._check_missing_pages(all_pages, link_graph))
        
        # 4. 自動修復
        report["fixed"] = self._auto_fix(report)
        
        return report
    
    def _collect_pages(self) -> list:
        """收集所有 Wiki 頁面"""
        wiki_dir = self.wiki_path / "wiki"
        return list(wiki_dir.glob("**/*.md"))
    
    def _build_link_graph(self, pages: list) -> dict:
        """構建雙向鏈接圖"""
        import re
        link_pattern = re.compile(r'\[\[([^\]]+)\]\]')
        
        graph = {"outgoing": {}, "incoming": {}}
        
        for page in pages:
            content = page.read_text(encoding='utf-8')
            links = link_pattern.findall(content)
            page_name = page.stem
            
            graph["outgoing"][page_name] = links
            for link in links:
                if link not in graph["incoming"]:
                    graph["incoming"][link] = []
                graph["incoming"][link].append(page_name)
        
        return graph
    
    def _check_orphaned(self, link_graph: dict) -> list:
        """檢查孤立頁面"""
        orphaned = []
        for page in link_graph["outgoing"]:
            if page not in link_graph["incoming"]:
                orphaned.append({
                    "page": page,
                    "issue": "無入站鏈接"
                })
        return orphaned
    
    def _auto_fix(self, report: dict) -> list:
        """自動修復問題"""
        fixed = []
        # ... 實現自動修復邏輯
        return fixed
```

---

## 四、多 Agent 協作模式

### 4.1 分層協作

```
        ┌─────────────────────┐
        │   Coordinator Agent  │  總調度
        │   (Hermes 3 70B)     │
        └──────────┬──────────┘
                   │
       ┌───────────┼───────────┐
       │           │           │
       ▼           ▼           ▼
┌──────────┐ ┌──────────┐ ┌──────────┐
│ Ingest   │ │  Query   │ │   Lint   │
│  Agent   │ │  Agent   │ │  Agent   │
└──────────┘ └──────────┘ └──────────┘
```

### 4.2 Python 實現

```python
class KnowledgeManager:
    """知識庫管理器 - 協調多 Agent"""
    
    def __init__(self, wiki_path: str):
        self.ingest_agent = IngestAgent(wiki_path)
        self.query_agent = QueryAgent(wiki_path)
        self.lint_agent = LintAgent(wiki_path)
        
        # 協調器使用更大模型
        self.coordinator = Agent(model="hermes-3-70b")
    
    def process(self, command: str):
        """處理用戶命令"""
        
        # 讓協調器決定使用哪個 Agent
        decision = self.coordinator.run(f"""
        用戶命令：{command}
        
        請判斷應該使用哪個 Agent：
        - ingest: 導入新資料
        - query: 查詢知識庫
        - lint: 維護檢查
        
        返回 JSON: {{"agent": "xxx", "params": {{}}}}
        """)
        
        agent_name = decision["agent"]
        params = decision["params"]
        
        if agent_name == "ingest":
            return self.ingest_agent.ingest(**params)
        elif agent_name == "query":
            return self.query_agent.query(**params)
        elif agent_name == "lint":
            return self.lint_agent.lint()
```

---

## 五、Obsidian 集成

### 5.1 文件結構

```
vault/
├── raw/                    # 原始資料（不可變）
│   ├── assets/             # 圖片、附件
│   └── articles/           # 剪藏的文章
│
├── wiki/                   # LLM 生成維護
│   ├── index.md            # 內容索引
│   ├── log.md              # 操作日誌
│   ├── source-*.md         # 資料摘要
│   ├── entity-*.md         # 實體頁
│   └── concept-*.md        # 概念頁
│
├── .obsidian/              # Obsidian 配置
│   └── plugins/
│       └── hermes-sync/    # Hermes 同步插件
│
└── CLAUDE.md               # LLM Wiki Schema
```

### 5.2 CLAUDE.md 配置示例

```markdown
# CLAUDE.md - LLM Wiki Schema

## Wiki 結構

- `raw/` - 原始資料，只讀
- `wiki/` - LLM 生成維護

## 頁面類型

| 類型 | 命名 | 用途 |
|------|------|------|
| source | `source-*.md` | 資料摘要 |
| entity | `entity-*.md` | 工具、產品、人物 |
| concept | `concept-*.md` | 方法論、模式 |

## Frontmatter 規範

```yaml
tags: [source-summary, domain]
source: "原文標題"
author: 作者
date: YYYY-MM-DD
url: "原始鏈接"
```

## 工作流命令

- "導入 raw/xxx.md" → Ingest
- "知識庫關於 X" → Query
- "檢查知識庫健康" → Lint
```

### 5.3 Obsidian 插件推薦

| 插件 | 用途 | 優先級 |
|------|------|--------|
| **Web Clipper** | 一鍵剪藏網頁 | 🔴 必需 |
| **Dataview** | 動態表格查詢 | 🟡 推薦 |
| **Templater** | 頁面模板 | 🟡 推薦 |
| **Graph Analysis** | 知識圖譜分析 | 🟢 可選 |
| **Omnisearch** | 全文搜索 | 🟢 可選 |

---

## 六、實踐案例

### 案例 1: 競品分析知識庫

```python
# 初始化
manager = KnowledgeManager("/path/to/vault")

# 導入競品資料
manager.process("導入 raw/notion-analysis.md")
manager.process("導入 raw/obsidian-comparison.md")

# 查詢對比
result = manager.process("對比 Notion 和 Obsidian 的差異")

# 定期維護
manager.process("檢查知識庫健康狀態")
```

### 案例 2: 學習筆記庫

```python
# 導入課程筆記
manager.process("導入 raw/ai-course-lesson1.md")

# 查詢複習
manager.process("總結目前所有 AI 相關的概念")

# 洞見回寫
manager.process("將關於 Transformer 的洞見保存為新頁面")
```

---

## 七、最佳實踐

### 7.1 工作流設計原則

| 原則 | 說明 |
|------|------|
| **單一職責** | 每個 Agent 只負責一種操作 |
| **明確邊界** | raw/ 只讀，wiki/ LLM 寫入 |
| **錯誤處理** | 所有工具調用都有錯誤處理 |
| **可觀測性** | log.md 記錄所有操作 |

### 7.2 模型選擇建議

| 任務 | 推薦模型 | 原因 |
|------|----------|------|
| 協調器 | Hermes 3 70B | 需要更好的理解能力 |
| Query | Hermes 3 70B | 需要更好的推理能力 |
| Ingest | Hermes 3 8B | 任務明確，成本更低 |
| Lint | Hermes 3 8B | 任務簡單，批量處理 |

### 7.3 性能優化

```python
# 1. 使用緩存
from functools import lru_cache

@lru_cache(maxsize=100)
def get_entity_page(entity_name: str):
    return wiki_path / f"wiki/entity-{entity_name}.md"

# 2. 批量處理
def batch_ingest(sources: list):
    with ThreadPoolExecutor() as executor:
        futures = [executor.submit(ingest, s) for s in sources]
        return [f.result() for f in futures]

# 3. 增量更新
def incremental_lint(last_check: datetime):
    pages = [p for p in wiki_pages if p.mtime > last_check]
    return lint_pages(pages)
```

---

## 八、監控與運維

### 8.1 健康指標

| 指標 | 說明 | 閾值 |
|------|------|------|
| 頁面增長率 | 每周新增頁面數 | > 5 |
| 鏈接密度 | 平均每頁鏈接數 | 3-10 |
| 孤立率 | 孤立頁面佔比 | < 10% |
| 矛盾率 | 有矛盾的頁面佔比 | < 5% |

### 8.2 告警配置

```python
def check_health():
    report = lint_agent.lint()
    
    if len(report["errors"]) > 0:
        send_alert(f"🚨 發現 {len(report['errors'])} 個嚴重問題")
    
    if len(report["warnings"]) > 10:
        send_alert(f"⚠️ 發現 {len(report['warnings'])} 個警告")
```

---

## 九、相關鏈接

### 內部鏈接

- [[0 Inbox/_processed/01-Tech/LLM-Tech/wiki/entities/Hermes-Agent]] - Hermes Agent 知識庫
- [[0 Inbox/_processed/01-Tech/LLM-Tech/wiki/concepts/LLM-Wiki]] - LLM Wiki 方法論
- [[三大操作]] - Ingest/Query/Lint 詳解
- [[工作流]] - Hermes 工作流設計

### 外部鏈接

- [Hermes Agent 官方文檔](https://hermes-agent.nousresearch.com/docs/)
- [LLM Wiki GitHub](https://github.com/luotwo/llm-wiki)
- [Obsidian 官網](https://obsidian.md/)

---

## 十、更新日誌

| 日期 | 更新內容 |
|------|----------|
| 2026-05-25 | 創建完整工作流文檔 |
