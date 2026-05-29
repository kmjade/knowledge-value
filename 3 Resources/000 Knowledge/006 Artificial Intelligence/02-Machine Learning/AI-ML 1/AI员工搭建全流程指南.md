---
# 指南
aliases:
  - AI Employee Setup Guide
# 指南
  - AI Agent Development
created: 2026-01-29
tags:
  - AI
  - 智能体
  - LangChain
  - RAG
# 部署
type: tutorial
interest-level: 5
study-status: completed
source: 網路收集
para: resources
language: zh-cn
---

# 指南

> [!info] 概述
# 指南

---

## 前期准备：明确角色与目標

| 步骤 | 關鍵問題 | 产出 |
|------|----------|------|
# 分析
# 知識庫
| 3️⃣ 成功指标 | 通過哪种 KPI 判斷 AI员工是否达标？（響應时长、准确率、召回率、使用者满意度） | 評價体系 |
| 4️⃣ 合规要求 | 數據隱私、审计日志、行业合规（GDPR、HIPAA、PCI） | 合规清單 |

> 建議：先选一个"MVP"場景（例如内部文檔檢索 + 简单问答），後續再逐步擴展功能。

---

## 技術选型与整體架構

### 主体大模型（LLM）

| 选项 | 優勢 | 劣势 | 适用場景 |
|------|------|------|----------|
| OpenAI GPT‑4 / GPT‑4o | 高品質、强鲁棒性、官方 API、支持 function calling | 成本相对较高、受網路限制 | 通用对话、代碼生成、函数調用 |
| Anthropic Claude 3 (Sonnet / Opus) | 对话安全、可控性强 | 費用略高、中文能力略逊于 GPT | 对话客服、敏感資訊處理 |
# 部署
| 其他開源模型（Gemini‑Pro、Mistral‑Large、Qwen） | 多样化、国内雲端服务友好 | 文檔、社區支持相对薄弱 | 特定语言或成本敏感場景 |

> 默认推荐：如果公司已有 Cloud 预算，首选 OpenAI GPT‑4（或 Claude 3 Sonnet）做原型；后期可遷移至本地 Llama‑3（Ollama）實現成本与安全双赢。

### 框架层（业务逻辑 & Tool Integration）

| 框架 | 主要特性 | 适配場景 |
|--------|----------|----------|
| LangChain（Python / TypeScript） | 链式調用、工具整合、RAG、Agent、记忆 | 对话 + 調用外部 API（電子郵件、日历、資料庫） |
| LlamaIndex (GPT‑Index) | 文檔索引、向量檢索、Chunk Splitter | 大量文檔（内部手册、合同）檢索 |
# 工作流
# 管理
| OpenAI Function Calling / Claude Tool Use | 结构化輸出、直接調用函数 | 预约會議、查詢資料庫、执行腳本 |

> 推荐组合：LangChain + LlamaIndex（文檔檢索）+ OpenAI Function Calling（结构化任務）。

### 向量資料庫（儲存 Embedding）

# 部署
|------|----------|------|
| Pinecone | SaaS | 免运维，跨区複製，企业版有安全审计 |
# 部署
| Milvus | K8s / 雲端原生 | 超大规模、GPU 加速 |
| Qdrant | Docker / SaaS | 中文分词友好，轻量级 |

> 快速上手：使用 Pinecone 或 Qdrant 的免費 tier 即可完成 MVP。

### 触达渠道（前端）

| 渠道 | 實現方式 |
|------|----------|
| 企业内部 Slack / Teams | 使用官方 Bot API（Python `slack_sdk`、`microsoft‑bot‑framework`） |
| Web Chat | 前端 React + Socket.io，后端提供 `/chat` 接口 |
| 電子郵件 | IMAP/SMTP 轮询或使用 SendGrid、Mailgun |
| API | REST/GraphQL 接口供其他系統調用 |
| 電話/语音 | 结合 Whisper + text‑to‑speech（ElevenLabs、Azure Speech） |

---

## 開發實現（以"内部文檔问答 + 任務调度"为例）

> 前置条件
> 1. 註冊 OpenAI 并获取 `OPENAI_API_KEY`。
> 2. 註冊 Pinecone 并創建 `index_name`。
> 3. 安裝依赖：`pip install openai langchain langchain-community pinecone-client tqdm python-dotenv`

### 1️⃣ 環境变量（`.env`）

```env
OPENAI_API_KEY=sk-...
PINECONE_API_KEY=...
PINECONE_ENV=us-west1-gcp
PINECONE_INDEX=ai-employee-kb
```

### 2️⃣ 數據准备（文檔导入）

假设你有一批内部手册（Markdown、PDF）放在 `docs/` 目錄。

```python
import os, glob, pathlib
from langchain.document_loaders import UnstructuredMarkdownLoader, PyPDFLoader
from langchain.text_splitter import RecursiveCharacterSplitter

def load_docs(folder="docs"):
    docs = []
    for md_path in glob.glob(f"{folder}/**/*.md", recursive=True):
        loader = UnstructuredMarkdownLoader(md_path)
        docs.extend(loader.load())
    for pdf_path in glob.glob(f"{folder}/**/*.pdf", recursive=True):
        loader = PyPDFLoader(pdf_path)
        docs.extend(loader.load())
    return docs

raw_docs = load_docs()
splitter = RecursiveCharacterSplitter(chunk_size=800, chunk_overlap=100)
chunks = splitter.split_documents(raw_docs)
print(f"Loaded {len(chunks)} chunks")
```

### 3️⃣ 向量化 & 寫入 Pinecone

```python
from langchain.embeddings import OpenAIEmbeddings
import pinecone

# 初始化 Pinecone
pinecone.init(api_key=os.getenv("PINECONE_API_KEY"), environment=os.getenv("PINECONE_ENV"))
index_name = os.getenv("PINECONE_INDEX")
if index_name not in pinecone.list_indexes():
    pinecone.create_index(name=index_name, dimension=1536, metric="cosine")
index = pinecone.Index(index_name)

# 向量化
embedder = OpenAIEmbeddings()
vectors = embedder.embed_documents([c.page_content for c in chunks])

# 批量 upsert
ids = [f"doc-{i}" for i in range(len(chunks))]
upserts = [(ids[i], vectors[i], {"text": chunks[i].page_content}) for i in range(len(chunks))]
batch_size = 100
for i in range(0, len(upserts), batch_size):
    batch = upserts[i:i+batch_size]
    index.upsert(vectors=batch)
print("向量寫入 Pinecone 完成")
```

### 4️⃣ 構建檢索+生成链（RAG）

```python
from langchain.vectorstores import Pinecone
from langchain.llms import OpenAI
from langchain.chains import RetrievalQA

# 讀取向量库
vector_store = Pinecone(
    index=index,
    embedding_function=embedder.embed_query,
    text_key="text"
)

retriever = vector_store.as_retriever(search_type="similarity", search_kwargs={"k": 5})

qa_chain = RetrievalQA.from_chain_type(
    llm=OpenAI(temperature=0.0, model_name="gpt-4o-mini"),
    retriever=retriever,
    return_source_documents=True
)

def ask(question: str):
    res = qa_chain({"query": question})
    answer = res["result"]
    sources = res["source_documents"]
    return answer, sources
```

### 5️⃣ 功能擴展 – 調用内部系統（函数調用）

OpenAI 的 function calling 让模型生成结构化 JSON，直接調用业务 API。

```python
import json
import requests
from langchain.tools import tool
from langchain.agents import OpenAIAgentExecutor, AgentExecutor, initialize_agent

def schedule_meeting(date: str, participants: str, agenda: str):
    # 示例：調用内部 Calendar API
    payload = {"date": date, "participants": participants, "agenda": agenda}
    r = requests.post("https://internal.api/calendar/create", json=payload, headers={"Authorization": "Bearer xxx"})
    return r.json()

@tool
def schedule_meeting_tool(date: str, participants: str, agenda: str):
    """Create a calendar meeting."""
    participants_list = json.loads(participants)
    return schedule_meeting(date, participants_list, agenda)

# 将 tool 注入链
agent = initialize_agent(
    tools=[schedule_meeting_tool],
    llm=OpenAI(temperature=0.0, model_name="gpt-4o"),
    agent_type="openai-functions"
)

# 使用：
response = agent.run("帮我安排下周一上午 10 点与张三、李四的專案进度會議，议程是'需求確認 + 风险评审'")
print(response)
```

### 6️⃣ 接口封装（FastAPI）

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI(title="AI Employee Service")

class ChatRequest(BaseModel):
    query: str

@app.post("/chat")
async def chat(req: ChatRequest):
    answer, sources = ask(req.query)
    return {
        "answer": answer,
        "sources": [s.page_content[:200] + "…" for s in sources]
    }

# 運行：uvicorn main:app --host 0.0.0.0 --port 8000
```

---

# 部署

# 配置
|------|----------|----------|
| 容器化 | Docker + Docker‑Compose（把 `api`, `vector_db`, `worker` 放在同一網路） | `Dockerfile` 基于 `python:3.11-slim`，安裝依赖；使用 `docker-compose.yml` 串联 Pinecone（如使用 Cloud）或本地 Milvus。 |
# 配置
| 日志 & 監控 | Prometheus + Grafana（收集 API latency、错误率）<br>ELK（日志审计） | 在 `FastAPI` 中加入 `Middleware` 記錄请求 ID、使用者、耗时。 |
| 安全 | - API‑Key 加密儲存（Vault / AWS Secrets Manager）<br>- HTTPS（Let's Encrypt）<br>- 輸入审计（防止 Prompt Injection）<br>- 角色权限控制（RBAC） | OpenAI / Claude 關鍵参数不写在代碼里，使用 `.env` 或 K8s Secret。 |
| 備份 | 定期快照向量資料庫（Pinecone 自動備份），模型調用日志持久化至 S3/OSS。 | |
| 成本控制 | - 设定每日/每月調用上限（OpenAI → `max_tokens`、`rate_limit`）<br>- 使用低成本模型（GPT‑4o‑mini、Claude Sonnet）做弱化場景<br>- 缓存热点查詢結果（Redis） | 在 `LangChain` 中使用 `Cache` 組件。 |

---

## 持續迭代 & 品質保障

# 方法
|------|------|
| Prompt 優化 | 使用 Prompt Layer、Prompt Versioning，記錄每次实验的变化与指标。 |
# 更新
| 評估体系 | - 自動化回归測試：准备一套 QA 問題集合，定时跑評估准确率、召回率。<br>- 人审评：邀请业务专家每月抽样 20 条答案，打分并提供回饋。 |
| 人‑机協作 | 对高风险或需要確認的答案使用 Human-in-the-Loop（如 Slack 訊息 @human_check 提示）。 |
| 模型遷移 | 当需求提升或成本需要降低，可从 GPT‑4 → GPT‑4o-mini 或 Claude Sonnet → Claude Haiku，通過 A/B 測試确保效能不下降。 |
| 合规审计 | 記錄所有調用日志（请求、模型、返回），定期审计是否有泄露或不当資訊輸出。 |

---

## 核心步骤速查表

| 步骤 | 關鍵动作 | 常用工具 |
|------|----------|----------|
| 1️⃣ 需求 & 角色 | 明确 Use-Case、KPI、合规 | 需求文檔、Miro、OKR |
| 2️⃣ 选型 | LLM、向量库、框架、渠道 | OpenAI / Claude、Pinecone / Qdrant、LangChain、Slack |
| 3️⃣ 數據准备 | 文檔抓取 → 切分 → Embedding → 上線 | LangChain DocumentLoaders、RecursiveSplitter |
| 4️⃣ 核心實現 | RAG + Function Calling（或 Tool） | LangChain RetrievalQA、OpenAI Function |
| 5️⃣ API / Bot | FastAPI / Flask + WebSocket / Slack Bot | FastAPI、Docker, Slack SDK |
# 部署
| 7️⃣ 監控 & 安全 | 日志、指标、限流、审计 | Prometheus, Grafana, Loki, Vault |
| 8️⃣ 迭代 | Prompt 调优 → 數據增量 → A/B 測試 | PromptLayer, LangChain Eval, Human‑in‑Loop |

---

## 相關資源

# 教程
# 指南
# 指南
