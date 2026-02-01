---
# 指南
aliases:
  - Clawdbot Guide
  - Clawdbot Tutorial
tags:
  - clawdbot
  - automation
  - bot
  - ollama
  - local-llm
  - ai-agent
  - tutorial
  - guide
created: 2026-01-30
last_updated: 2026-01-30
resource_type: guide
status: done
---

# 指南

> [!info] Clawdbot 智能自動化平台
> 基于 Ollama 的本地 AI 智能体，實現完全免費的自動化解決方案

---

## 📋 目錄

1. [快速開始](#快速開始)
2. [核心概念](#核心概念)
# 配置
4. [基礎使用](#基礎使用)
5. [高级功能](#高级功能)
# 指南
# 部署
8. [最佳實踐](#最佳實踐)
9. [常见問題](#常见問題)
10. [相關資源](#相關資源)

---

## 🚀 快速開始

### Clawdbot 是什么？

Clawdbot 是一个基于 AI 的自動化智能体平台，支持：

- ✅ **完全本地運行** - 使用 Ollama 本地模型
- ✅ **零成本** - 無需 API 費用
- ✅ **多模态支持** - 文本、图像、視訊、音頻
- ✅ **工具調用** - 支持现代 AI Agent 功能
- ✅ **简单易用** - 一条命令即可啟動

### 核心優勢

| 特性 | Clawdbot + Ollama | 雲端 API（OpenAI 等） |
|------|---------------------|------------------------|
| **成本** | ✅ 完全免費 | ❌ 按量付费 |
| **隱私** | ✅ 完全本地 | ⚠️ 數據上傳 |
| **延遲** | ✅ 低延遲 | ⚠️ 網路延遲 |
| **稳定性** | ⚠️ 依赖本地硬體 | ✅ 雲端稳定 |
| **效能** | ⚠️ 受硬體限制 | ✅ 雲端强大 |
| **離線** | ✅ 支持離線 | ❌ 需要網路 |

### 快速體驗（5 分钟）

#### 方式 1：使用 Ollama 啟動（推荐）

```bash
# 1. 啟動 Clawdbot（首次運行，選擇模型）
ollama launch clawdbot

# 配置
ollama launch clawdbot --config
```

#### 方式 2：使用 npm 直接啟動

```bash
# 1. 全局安裝
npm install -g clawdbot@latest

# 配置
clawdbot onboard --install-daemon
```

---

## 🧠 核心概念

### 系統架構

```mermaid
graph TB
    subgraph 使用者层
        CLI[命令行接口]
        WEB[Web界面]
        API[REST API]
    end

    subgraph 核心层
        ENGINE[AI 引擎]
        TASK[任務调度器]
# 管理
# 管理
    end

    subgraph 执行层
        BROWSER[瀏覽器自動化]
        API_CALL[API 調用]
        FILE_OPS[檔案操作]
        SYS_CALL[系統調用]
    end

    subgraph 儲存层
        REDIS[(Redis 队列)]
        POSTGRES[(PostgreSQL)]
        FILES[檔案系統]
    end

    subgraph 模型层
        OLLAMA[Ollama 本地模型]
        CLAUDE[Claude API]
        GEMINI[Gemini API]
    end

    CLI --> ENGINE
    WEB --> ENGINE
    API --> ENGINE

    ENGINE --> TASK
    TASK --> EXEC

    EXEC --> BROWSER
    EXEC --> API_CALL
    EXEC --> FILE_OPS
    EXEC --> SYS_CALL

    EXEC --> REDIS
    EXEC --> POSTGRES
    EXEC --> FILES

    ENGINE --> OLLAMA
    ENGINE --> CLAUDE
    ENGINE --> GEMINI
```

### 關鍵組件

#### 1. AI 引擎（Engine）

**功能**：
- 解析使用者自然语言请求
- 决定需要执行的任務
- 調用相应的工具或模型
- 整合多個工具的輸出

**支持的模型**：
- Ollama 本地模型（glm-4.7、qwen3-coder、gpt-oss 等）
- Claude API（claude-3.5-sonnet、claude-3-opus）
- Gemini API（gemini-2.5-pro、gemini-2.0-flash）

#### 2. 任務调度器（Scheduler）

**功能**：
# 管理
- 處理并发请求
- 實現重试機制
- 支持定时任務

**特點**：
- 優先級队列
- 速率限制
- 失败重试
- 超时控制

#### 3. 执行器（Executor）

**类型**：
- **BrowserExecutor** - 瀏覽器自動化（表单填寫、網頁抓取）
- **APIExecutor** - API 調用（REST、GraphQL、Webhook）
# 分析
# 管理

---

# 配置

# 方法

#### 安裝 Ollama

**Windows (PowerShell)**：
```powershell
iwr -useb https://ollama.com/install.ps1 | iex
```

**macOS / Linux**：
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

#### 啟動 Clawdbot

```bash
# 首次啟動（選擇模型）
ollama launch clawdbot

# 配置
ollama launch clawdbot --config
```

**推荐模型**：
- `glm-4.7` - ⭐⭐⭐⭐⭐ 强烈推荐（支持工具調用）
- `qwen3-coder` - ⭐⭐⭐ 代碼任務
- `gpt-oss:20b` - ⭐⭐⭐ 通用任務
- `gpt-oss:120b` - ⭐⭐ 高效能（需要强大硬體）

# 方法

#### 全局安裝

```bash
# 安裝 Clawdbot
npm install -g clawdbot@latest

# 驗證安裝
clawdbot --version
```

# 配置

```bash
# 配置
clawdbot onboard --install-daemon
```

# 配置
- **模型選擇**：選擇使用的 AI 模型
# 配置
# 配置
- **Daemon 模式**：后台運行

# 方法

#### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  clawdbot:
    image: clawdbot/clawdbot:latest
    ports:
      - "8000:8000"
    volumes:
      - ./data:/app/data
      - ./config:/app/config
    environment:
      - OLLAMA_HOST=host.docker.internal
      - OLLAMA_PORT=11434
    depends_on:
      - ollama
      - redis

  ollama:
    image: ollama/ollama:latest
    ports:
      - "11434:11434"
    volumes:
      - ./ollama_data:/root/.ollama
    environment:
      - OLLAMA_KEEP_ALIVE=30m

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
```

**啟動服务**：

```bash
# 啟動所有服务
docker-compose up -d

# 查看
docker-compose logs -f clawdbot

# 停止服务
docker-compose down
```

# 配置

```yaml
# config/clawdbot.yaml
# 配置
model:
  provider: "ollama"  # ollama | claude | gemini
  model_name: "glm-4.7"
  api_key: ""  # 留空使用 Ollama 本地模式

# 配置
system:
  max_concurrent_tasks: 10
  task_timeout: 300  # 5 分钟
  retry_attempts: 3
  retry_delay: 5  # 秒

# 配置
browser:
# 顯示
  timeout: 30000  # 30 秒
  viewport:
    width: 1920
    height: 1080

# 配置
storage:
  type: "file"  # file | redis | postgresql
  path: "./data"
  database_url: ""  # 如果使用 postgresql

# 配置
logging:
  level: "INFO"  # DEBUG | INFO | WARNING | ERROR
  format: "json"  # json | text
  file: "./logs/clawdbot.log"
```

---

## 🎮 基礎使用

### 命令行接口

#### 啟動服务

```bash
# 前台運行
clawdbot serve --port 8000

# 后台運行（daemon 模式）
clawdbot serve --daemon --port 8000

# 查看
clawdbot status
```

#### 执行任務

```bash
# 交互式对话模式
clawdbot chat

# 单次任務执行
clawdbot run "帮我創建一个測試資料夾，并写一个 README"

# 檔案模式（批量执行）
clawdbot run -f tasks.txt
```

### Web 界面

#### 访问界面

1. **啟動服务**：`clawdbot serve --port 8000`
2. **打開瀏覽器**：访问 `http://localhost:8000`
3. **開始对话**：在聊天框中輸入请求

#### 界面功能

- **聊天視窗**：自然语言交互
# 查看
# 配置
# 查看
# 查看

### API 接口

#### REST API 基礎調用

```bash
# 健康檢查
curl http://localhost:8000/health

# 創建任務
curl -X POST http://localhost:8000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "type": "web_automation",
    "params": {
      "url": "https://example.com",
      "action": "scrape"
    },
    "priority": "high"
  }'

# 查詢任務狀態
curl http://localhost:8000/api/tasks/{task_id}

# 获取任務結果
curl http://localhost:8000/api/tasks/{task_id}/result
```

#### Python SDK

```python
from clawdbot import Clawdbot

# 初始化客户端
bot = Clawdbot(base_url="http://localhost:8000")

# 創建任務
task = bot.create_task(
    type="web_automation",
    params={
        "url": "https://example.com",
        "action": "scrape"
    },
    priority="high"
)

# 等待任務完成
result = bot.wait_for_task(task.id, timeout=300)

print(f"任務狀態: {result.status}")
print(f"任務結果: {result.data}")
```

---

## ⚡ 高级功能

### 1. 工具調用（Function Calling）

#### 定义自定义工具

```python
# tools/custom_tools.py
from clawdbot.tools import Tool

@tool(name="search_database")
def search_products(query: str, limit: int = 10) -> dict:
    """
    在資料庫中搜尋产品資訊

    Args:
        query: 搜尋關鍵词
        limit: 返回結果数量限制

    Returns:
        产品列表和数量
    """
    # 實現資料庫查詢逻辑
    results = db.query("SELECT * FROM products WHERE name LIKE ?", f"%{query}%")
    return {
        "products": results[:limit],
        "count": len(results)
    }

@tool(name="generate_report")
def generate_sales_report(start_date: str, end_date: str) -> str:
    """
    生成销售報告

    Args:
        start_date: 開始日期（YYYY-MM-DD）
        end_date: 結束日期（YYYY-MM-DD）

    Returns:
        報告檔案路徑
    """
    # 實現報告生成逻辑
    report_path = f"reports/sales_{start_date}_to_{end_date}.pdf"
    generate_report(start_date, end_date, report_path)
    return report_path
```

#### 註冊工具

```python
# 註冊自定义工具
from clawdbot import Clawdbot
from tools.custom_tools import search_products, generate_sales_report

bot = Clawdbot()

# 註冊工具
bot.register_tool(search_products)
bot.register_tool(generate_sales_report)

# 啟動服务
bot.serve(port=8000)
```

### 2. 多模态輸入

#### 图像輸入

```python
# 分析
task = bot.create_task(
    type="image_analysis",
    params={
        "image_path": "./images/product.jpg",
        "questions": [
            "这是什么产品？",
            "价格大概是多少？",
            "包装颜色是什么？"
        ]
    }
)

result = bot.wait_for_task(task.id)
```

#### 文檔輸入

```python
# 處理 PDF 文檔
task = bot.create_task(
    type="document_analysis",
    params={
        "file_path": "./documents/report.pdf",
        "extract_fields": ["title", "summary", "key_points", "action_items"]
    }
)

result = bot.wait_for_task(task.id)
```

#### 視訊輸入

```python
# 分析
task = bot.create_task(
    type="video_analysis",
    params={
        "video_path": "./videos/meeting.mp4",
        "analysis_type": "transcription"  # transcription | summary | key_moments
    }
)

result = bot.wait_for_task(task.id)
```

# 工作流

# 工作流

```python
# 工作流
workflow = Workflow(name="訂單處理流程")

# 步骤 1：查詢库存
workflow.add_step(
    name="check_inventory",
    task_type="database_query",
    params={"query": "SELECT stock FROM products WHERE id = ?"}
)

# 更新
workflow.add_step(
    name="update_order",
    task_type="database_update",
    params={"table": "orders", "status": "processing"},
    depends_on="check_inventory"  # 依赖步骤 1
)

# 步骤 3：發送通知
workflow.add_step(
    name="send_notification",
    task_type="email_send",
    params={"template": "order_confirmation"},
    depends_on="update_order"  # 依赖步骤 2
)

# 工作流
results = workflow.execute(order_id="12345")
```

# 工作流

```python
# 并行执行多個任務
tasks = [
    bot.create_task(type="fetch_weather", params={"city": "北京"}),
    bot.create_task(type="fetch_news", params={"topic": "AI"}),
    bot.create_task(type="fetch_stock", params={"symbol": "AAPL"})
]

# 并行等待所有任務完成
results = bot.wait_for_all_tasks([t.id for t in tasks], timeout=60)
```

#### 条件分支

```python
# 根据条件执行不同任務
workflow = Workflow(name="智能處理流程")

# 条件判斷
workflow.add_condition(
    name="check_priority",
    condition=lambda data: data["priority"] == "high"
)

# 高優先級分支
workflow.add_branch(
    name="high_priority_branch",
    condition="check_priority == true",
    steps=[
        # 立即执行
        {"name": "urgent_process", "task_type": "immediate_action"}
    ]
)

# 普通優先級分支
workflow.add_branch(
    name="normal_priority_branch",
    condition="check_priority == false",
    steps=[
        # 加入队列
        {"name": "queue_task", "task_type": "schedule_for_later"}
    ]
)
```

### 4. 定时任務

#### Cron 表达式

```bash
# 每天凌晨 2 点执行
0 2 * * *

# 每周一早上 9 点执行
0 9 * * 1

# 每月第一天上午 10 点执行
0 10 1 * *

# 每 30 分钟执行一次
*/30 * * * *

# 每天工作時間的每小时执行（9:00-18:00）
0 9-18 * * 1-5
```

# 配置

```python
from clawdbot.scheduler import CronScheduler

scheduler = CronScheduler()

# 每日數據備份
scheduler.add_job(
    name="daily_backup",
    cron="0 2 * * *",  # 每天凌晨 2 点
    task_type="file_backup",
    params={
        "source_dir": "./data",
        "backup_dir": "./backups",
        "compression": "gzip"
    }
)

# 每周報告生成
scheduler.add_job(
    name="weekly_report",
    cron="0 9 * * 1",  # 每周一早上 9 点
    task_type="generate_report",
    params={
        "period": "last_7_days",
        "format": "pdf"
    }
)

# 啟動调度器
scheduler.start()
```

### 5. 數據持久化

#### 檔案儲存

```python
# 使用檔案系統儲存任務結果
from clawdbot.storage import FileStorage

storage = FileStorage(base_path="./data")

# 儲存結果
storage.save(task_id="task-123", result=result_data)

# 讀取結果
result = storage.load(task_id="task-123")
```

#### Redis 缓存

```python
# 使用 Redis 缓存频繁访问的數據
from clawdbot.storage import RedisStorage

storage = RedisStorage(host="localhost", port=6379)

# 設置缓存（TTL 1 小时）
storage.set(key="task-123", value=result_data, ttl=3600)

# 获取缓存
result = storage.get(key="task-123")
```

#### PostgreSQL 資料庫

```python
# 使用 PostgreSQL 持久化任務記錄
from clawdbot.storage import PostgresStorage

storage = PostgresStorage(
    database_url="postgresql://user:password@localhost/clawdbot"
)

# 儲存任務記錄
storage.save_task({
    "id": "task-123",
    "type": "web_automation",
    "status": "completed",
    "result": result_data,
    "created_at": datetime.now(),
    "completed_at": datetime.now()
})

# 查詢任務
tasks = storage.query_tasks(
    filters={"type": "web_automation"},
    limit=10,
    order_by="created_at DESC"
)
```

---

# 指南

### 專案结构

```bash
clawdbot-project/
├── src/                    # 原始碼
│   ├── core/               # 核心模块
│   │   ├── engine.py      # AI 引擎
│   │   ├── scheduler.py   # 任務调度器
# 管理
│   │   └── auth.py       # 认证服务
│   ├── tasks/              # 任務定义
│   │   ├── web.py        # Web 自動化任務
│   │   ├── api.py        # API 調用任務
│   │   └── file.py       # 檔案操作任務
│   ├── executors/          # 执行器實現
│   │   ├── base.py       # 基礎执行器
│   │   ├── browser.py    # 瀏覽器执行器
│   │   ├── api.py        # API 执行器
│   │   └── file.py       # 檔案执行器
│   ├── tools/              # 工具定义
│   │   └── custom.py    # 自定义工具
│   ├── storage/            # 儲存层
│   │   ├── redis.py      # Redis 實現
│   │   ├── postgres.py   # PostgreSQL 實現
│   │   └── file.py      # 檔案系統實現
│   └── api/               # REST API
│       ├── main.py       # FastAPI 應用程式
│       ├── routes.py      # 路由定义
│       └── models.py      # 數據模型
# 配置
# 配置
# 配置
├── tests/                 # 測試代碼
│   ├── unit/           # 单元測試
│   ├── integration/    # 整合測試
│   └── e2e/           # 端到端測試
├── docs/                  # 文檔
├── scripts/                # 腳本
# 配置
```

### 創建自定义执行器

```python
# src/executors/custom_executor.py
from clawdbot.executors import BaseExecutor, Task, Result

class CustomExecutor(BaseExecutor):
    """自定义执行器示例"""

    def __init__(self, config: dict):
        super().__init__(config)
        self.custom_client = None

    async def execute(self, task: Task) -> Result:
        """执行自定义任務"""
        try:
            # 初始化自定义客户端
            await self._init_client()

            # 执行业务逻辑
            data = await self._process_task(task)

            # 返回成功結果
            return Result(success=True, data=data)

        except Exception as e:
            # 返回失败結果
            return Result(success=False, error=str(e))

    async def validate(self, params: dict) -> bool:
        """驗證輸入参数"""
        required_fields = ['param1', 'param2']
        return all(field in params for field in required_fields)

    async def _init_client(self):
        """初始化自定义客户端"""
        self.custom_client = CustomAPIClient(
            api_key=self.config.get('api_key'),
            timeout=self.config.get('timeout', 30)
        )

    async def _process_task(self, task: Task):
        """處理任務逻辑"""
        params = task.params

        # 實現具体的處理逻辑
        result = await self.custom_client.process(params)

        return result
```

### 註冊执行器

```python
# src/plugins/registry.py
from clawdbot import register_executor
from executors.custom_executor import CustomExecutor

# 註冊自定义执行器
register_executor(
    name="custom_executor",
    executor_class=CustomExecutor,
    version="1.0.0",
    author="Your Name"
)
```

### API 開發

```python
# src/api/routes.py
from fastapi import APIRouter, HTTPException
from clawdbot.models import Task, Result

router = APIRouter(prefix="/api/v1")

@router.post("/tasks", response_model=Task)
async def create_task(task: Task):
    """創建新任務"""
    try:
        # 驗證任務参数
        if not task.type:
            raise HTTPException(status_code=400, detail="Task type is required")

        # 創建任務
        created_task = await scheduler.create_task(task)

        return created_task

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/tasks/{task_id}", response_model=Task)
async def get_task(task_id: str):
    """获取任務详情"""
    task = await storage.get_task(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.get("/tasks/{task_id}/result", response_model=Result)
async def get_task_result(task_id: str):
    """获取任務結果"""
    result = await storage.get_result(task_id)
    if not result:
        raise HTTPException(status_code=404, detail="Result not found")
    return result
```

---

# 部署

# 部署

# 部署

```bash
# 構建生产镜像
docker build -t clawdbot-prod:latest .

# 運行生产容器
docker run -d \
  --name clawdbot \
  -p 8000:8000 \
  -v $(pwd)/data:/app/data \
  -v $(pwd)/config:/app/config \
  -v $(pwd)/logs:/app/logs \
  --restart unless-stopped \
  clawdbot-prod:latest
```

# 配置

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  clawdbot:
    image: clawdbot:latest
    container_name: clawdbot
    restart: always
    ports:
      - "8000:8000"
    volumes:
      - ./data:/app/data
      - ./config:/app/config
      - ./logs:/app/logs
    environment:
      - ENV=production
      - LOG_LEVEL=INFO
      - MAX_CONCURRENT_TASKS=20
    depends_on:
      - redis
      - postgres

  redis:
    image: redis:7-alpine
    container_name: clawdbot-redis
    restart: always
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    command: redis-server --appendonly yes

  postgres:
    image: postgres:15-alpine
    container_name: clawdbot-postgres
    restart: always
    ports:
      - "5432:5432"
    environment:
      POSTGRES_DB: clawdbot
      POSTGRES_USER: clawdbot
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  redis_data:
  postgres_data:
```

# 部署

```yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: clawdbot
spec:
  replicas: 3
  selector:
    matchLabels:
      app: clawdbot
  template:
    metadata:
      labels:
        app: clawdbot
    spec:
      containers:
      - name: clawdbot
        image: clawdbot:latest
        ports:
        - containerPort: 8000
        env:
          - name: ENV
            value: "production"
          - name: LOG_LEVEL
            value: "INFO"
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1000m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 5
          periodSeconds: 5

---
apiVersion: v1
kind: Service
metadata:
  name: clawdbot-service
spec:
  selector:
    app: clawdbot
  ports:
    - protocol: TCP
      port: 8000
      targetPort: 8000
  type: LoadBalancer
```

### 監控和日志

# 管理

```bash
# 查看
docker logs -f clawdbot

# 查看
docker logs --tail 100 clawdbot

# 导出日志
docker logs clawdbot > clawdbot.log

# 使用 Docker Compose
docker-compose logs -f clawdbot
```

#### 健康檢查

```bash
# 健康檢查端点
curl http://localhost:8000/health

# 预期響應
{
  "status": "healthy",
  "checks": {
    "database": "ok",
    "redis": "ok",
    "browser": "ok"
  },
  "timestamp": "2026-01-30T10:00:00Z"
}
```

#### Prometheus 監控

```python
# src/api/metrics.py
from prometheus_client import Counter, Histogram, Gauge

# 定义指标
tasks_total = Counter('clawdbot_tasks_total', 'Total number of tasks')
task_duration = Histogram('clawdbot_task_duration_seconds', 'Task execution duration')
active_tasks = Gauge('clawdbot_active_tasks', 'Number of active tasks')
error_rate = Counter('clawdbot_errors_total', 'Total number of errors')

# 使用指标
@tasks_total.time()
@task_duration.time()
async def execute_with_metrics(task: Task):
    active_tasks.inc()
    try:
        result = await execute_task(task)
        return result
    except Exception as e:
        error_rate.inc()
        raise
    finally:
        active_tasks.dec()
```

---

## 🎯 最佳實踐

### 1. 安全實踐

#### 敏感資訊保護

```python
# 使用環境变量儲存敏感資訊
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv('API_KEY')
DB_PASSWORD = os.getenv('DB_PASSWORD')

# 不要硬编码
# BAD: password = "my-password"
# GOOD: password = os.getenv('DB_PASSWORD')
```

#### 輸入驗證

```python
# 驗證使用者輸入
def validate_url(url: str) -> bool:
    """驗證 URL 格式"""
    try:
        result = urlparse(url)
        return all([result.scheme, result.netloc])
    except Exception:
        return False

def sanitize_input(input_str: str) -> str:
    """清理使用者輸入"""
    # 移除危险字符
    dangerous_chars = ['<', '>', '&', '|', ';']
    for char in dangerous_chars:
        input_str = input_str.replace(char, '')
    return input_str.strip()
```

### 2. 效能優化

#### 連接池

```python
from aiohttp import ClientSession

class ConnectionPool:
    def __init__(self):
        self.session = None
        self.max_connections = 10

    async def get_session(self):
        if self.session is None or self.session.closed:
            self.session = ClientSession(
                limit=self.max_connections,
                timeout=aiohttp.ClientTimeout(total=30)
            )
        return self.session
```

#### 缓存策略

```python
from functools import lru_cache

# 使用 LRU 缓存
@lru_cache(maxsize=128)
async def cached_api_call(params):
    """带缓存的 API 調用"""
    # 同样的参数会返回缓存結果
    return await api_call(params)

# 或使用 Redis 缓存
from redis import asyncio as aioredis

redis = await aioredis.from_url("redis://localhost")

async def redis_cached_call(key, func, ttl=3600):
    # 檢查缓存
    cached = await redis.get(key)
    if cached:
        return json.loads(cached)

    # 执行函数
    result = await func()

    # 設置缓存
    await redis.setex(key, ttl, json.dumps(result))
    return result
```

### 3. 错误處理

#### 重试機制

```python
from tenacity import retry, stop_after_attempt, wait_exponential

@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=2, max=10)
)
async def robust_api_call(url: str, data: dict):
    """带重试的 API 調用"""
    async with aiohttp.ClientSession() as session:
        async with session.post(url, json=data) as response:
            response.raise_for_status()
            return await response.json()
```

#### 优雅降級

```python
class FallbackChain:
    def __init__(self):
        self.executors = [
            PrimaryExecutor(),
            SecondaryExecutor(),
            FallbackExecutor()
        ]

    async def execute(self, task: Task) -> Result:
        """尝试多個执行器，直到成功"""
        last_error = None

        for executor in self.executors:
            try:
                result = await executor.execute(task)
                if result.success:
                    return result
            except Exception as e:
                last_error = e
                continue

        # 所有执行器都失败，返回最后一个错误
        raise Exception(f"All executors failed: {last_error}")
```

### 4. 測試策略

#### 单元測試

```python
# tests/unit/test_executor.py
import pytest

class TestBrowserExecutor:
    @pytest.mark.asyncio
    async def test_execute_simple_task(self):
        """測試简单任務执行"""
        executor = BrowserExecutor(config={})
        task = Task(type="simple_action", params={})

        result = await executor.execute(task)

        assert result.success is True
        assert result.data is not None

    @pytest.mark.asyncio
    async def test_execute_with_invalid_params(self):
        """測試無效参数"""
        executor = BrowserExecutor(config={})
        task = Task(type="action", params={})

        # 應該抛出驗證错误
        with pytest.raises(ValueError):
            await executor.validate(task.params)
```

#### 整合測試

```python
# tests/integration/test_workflow.py
import pytest

@pytest.mark.asyncio
async def test_complete_automation_workflow():
    """測試完整自動化流程"""
# 工作流
    workflow = Workflow(name="test_workflow")
    workflow.add_step("step1", task_type="action")
    workflow.add_step("step2", task_type="action", depends_on="step1")

# 工作流
    results = await workflow.execute()

    # 3. 驗證結果
    assert results["step1"].success is True
    assert results["step2"].success is True
    assert results["step2"].data.get("processed") is True
```

---

## 🐛 常见問題

### 安裝問題

**Q: npm install 失败？**
# 版本
```bash
node --version
npm --version
```

**Q: Ollama 連接失败？**
A: 確認 Ollama 正在運行：
```bash
# 檢查 Ollama 狀態
ollama list

# 重启 Ollama
ollama serve
```

### 使用問題

**Q: 任務执行超时？**
# 配置
```yaml
# config/clawdbot.yaml
system:
  task_timeout: 600  # 增加到 10 分钟
```

**Q: 記憶體不足？**
A: 優化并发任務数：
```yaml
system:
  max_concurrent_tasks: 5  # 减少并发数
```

**Q: 工具調用失败？**
A: 确保使用支持工具調用的模型（如 glm-4.7）

### 效能問題

**Q: 響應速度慢？**
A: 優化方案：
1. 使用更快的模型（glm-4.7 比 gpt-oss:120b 快）
2. 增加 Ollama 的 GPU 支持
3. 减少上下文长度
4. 使用缓存

**Q: CPU 占用高？**
A: 優化方案：
1. 使用量化模型
2. 减少并发任務
3. 增加任務间隔

### 除錯問題

# 查看
# 修改
```yaml
logging:
  level: "DEBUG"
  file: "./logs/clawdbot_debug.log"
```

**Q: 如何除錯任務执行？**
A: 使用除錯模式：
```bash
clawdbot run --debug "任務描述"
```

---

## 📚 相關資源

### 官方資源

- [Clawdbot GitHub](https://github.com/clawdbot/clawdbot) - 原始碼
- [Ollama 官方文檔](https://ollama.com/docs) - Ollama 文檔
- [Clawdbot 文檔](https://docs.clawdbot.com) - 完整文檔

### 學習資源

- [Clawdbot 快速上手手册]([[Clawdbot快速上手手册]]) - 快速入门
# 指南
- [Clawdbot 命令大全]([[Clawdbot命令大全]]) - 命令參考
# 指南

### 社區資源

- [Clawdbot 社區論壇](https://forum.clawdbot.com) - 社區讨论
- [Stack Overflow](https://stackoverflow.com/questions/tagged/clawdbot) - 技術问答
- [Discord 社區](https://discord.gg/clawdbot) - 实时交流

### 相關工具

# 分析
- [[自動化工具對比]] - 自動化工具對比
- [[Clawdbot自動化机器人]] - Clawdbot 專案

---

## ✅ 快速參考

### 常用命令

```bash
# 安裝
npm install -g clawdbot@latest

# 配置
clawdbot onboard --install-daemon

# 啟動
clawdbot serve --port 8000

# 后台運行
clawdbot serve --daemon --port 8000

# 健康檢查
curl http://localhost:8000/health

# 查看
clawdbot logs --follow

# 停止服务
clawdbot stop
```

# 配置

```yaml
# 配置
model:
  provider: "ollama"
  model_name: "glm-4.7"

system:
  max_concurrent_tasks: 10
  task_timeout: 300

logging:
  level: "INFO"
```

# 指南

| 場景 | 推荐模型 | 原因 |
|------|---------|------|
| 通用智能体 | glm-4.7 | 支持工具調用 |
| 代碼生成 | qwen3-coder | 代碼優化 |
| 快速響應 | glm-4.7 | 平衡效能 |
| 高品質輸出 | gpt-oss:120b | 强大模型 |

---

> 💡 **使用提示**：
> 1. 新手从 Ollama + npm 方式開始，简单快速
# 指南
# 管理
# 查看
> 5. 使用 glm-4.7 模型以獲得最佳的工具調用體驗

---

**創建日期**：2026-01-30
# 更新
# 版本
**狀態**：✅ 完成
