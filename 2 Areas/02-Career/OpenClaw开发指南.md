---
# 開發
status: active
priority: high
tags: [openclaw, development, tutorial]
# 開發
created: 2024-01-30
updated: 2024-01-30
---

# 開發

# 開發

### 环境要求

# 開發
```yaml
# 基础环境
python: "3.9+"
node: "16+"
git: "2.30+"
docker: "20.10+"
docker-compose: "2.2+"

# 開發
vscode: "推荐"
# 測試
```

# 系統
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install -y python3-dev build-essential libpq-dev

# macOS
brew install postgresql redis python@3.9

# Windows
# 安裝
# 安裝
```

# 專案

#### 1. 克隆仓库
```bash
# 克隆主仓库
git clone https://github.com/openclaw/openclaw.git
cd openclaw

# 克隆示例插件仓库（可选）
git clone https://github.com/openclaw/plugin-examples.git
```

# 創建
```bash
# 創建
python3 -m venv venv
source venv/bin/activate  # Linux/macOS
# 或
venv\Scripts\activate     # Windows

# 安裝
pip install -r requirements.txt
pip install -r requirements-dev.txt
```

# 設置
```bash
# 創建
createdb openclaw_dev

# 配置
cp .env.example .env
# 檔案

# 數據
alembic upgrade head

# 創建
python scripts/create_initial_data.py
```

# 開發
```bash
# 启动基础服务
docker-compose -f docker-compose.dev.yml up -d

# 启动API服务
export FLASK_ENV=development
export FLASK_DEBUG=1
python run.py

# 启动前端服务（新终端）
cd frontend
npm install
npm run dev
```

## 代码结构与架构

# 專案
```
openclaw/
├── core/                   # 核心模块
│   ├── auth/              # 认证授权
│   ├── blockchain/        # 区块链集成
│   ├── cryptos/           # 加密资产
# 數據
│   ├── events/            # 事件处理
# 管理
# 管理
│   ├── http/              # HTTP服务
│   ├── kyc/               # KYC处理
# 管理
│   ├── maintenance/       # 维护模式
# 配置
│   ├── payments/          # 支付处理
# 系統
│   ├── restful/           # REST API
│   ├── shell/             # Shell命令
# 測試
│   ├── trading/           # 交易功能
│   ├── unit_of_account/   # 记账单位
# 管理
│   ├── utils/             # 工具函数
# 管理
├── cli/                   # 命令行工具
# 文檔
├── frontend/              # 前端应用
# 目錄
# 測試
# 開發
└── scripts/              # 脚本工具
```

### 核心模块详解

# 工作流
```python
# core/workflow/engine.py
class WorkflowEngine:
# 工作流
    
    def __init__(self, plugin_manager, task_scheduler):
        self.plugin_manager = plugin_manager
        self.task_scheduler = task_scheduler
        self.state_manager = WorkflowStateManager()
    
    async def execute_workflow(self, workflow, inputs):
# 工作流
        context = ExecutionContext(workflow, inputs)
        
        try:
# 記錄
            execution = await self.state_manager.create_execution(
                workflow.id, inputs
            )
            
            # 按顺序执行步骤
            for step in workflow.steps:
                result = await self._execute_step(step, context)
                context.add_step_result(step.id, result)
            
            # 完成执行
            await self.state_manager.complete_execution(
                execution.id, context.get_outputs()
            )
            
            return ExecutionResult(
                success=True,
                outputs=context.get_outputs(),
                execution_id=execution.id
            )
            
        except Exception as e:
            # 处理执行错误
            await self._handle_error(e, context)
            raise
```

# 系統
```python
# core/plugins/manager.py
class PluginManager:
# 管理
    
    def __init__(self):
        self.registry = PluginRegistry()
        self.loader = PluginLoader()
        self.sandbox = PluginSandbox()
    
    async def load_plugin_from_file(self, plugin_path: str):
# 檔案
        # 验证插件签名
        if not await self._verify_signature(plugin_path):
            raise PluginError("Invalid plugin signature")
        
# 資訊
        metadata = await self.loader.parse_metadata(plugin_path)
        
# 創建
        sandbox_context = self.sandbox.create_context(metadata)
        
        # 加载插件代码
        plugin_code = await self.loader.load_code(plugin_path)
        
        # 在沙箱中执行插件代码
        return await self.sandbox.execute(
            plugin_code, 
            context=sandbox_context
        )
    
    async def execute_plugin(self, plugin_id: str, inputs: Dict):
        """执行插件"""
        plugin = await self.get_plugin(plugin_id)
        
        # 验证插件权限
        if not await self._check_permissions(plugin):
            raise PermissionError("Insufficient permissions")
        
        # 执行插件
        return await plugin.execute(inputs)
```

#### 3. 任务调度
```python
# core/tasks/scheduler.py
class TaskScheduler:
    """任务调度器"""
    
    def __init__(self, redis_client, backend):
        self.redis = redis_client
        self.backend = backend
        self.queue = RedisQueue("task_queue")
    
    async def schedule_task(self, task: Task):
        """调度任务"""
        # 验证任务
        if not await self._validate_task(task):
            raise ValueError("Invalid task")
        
# 新增
        await self.queue.push(task.serialize())
        
        # 触发执行
        await self._trigger_execution()
    
    async def execute_task(self, task_id: str):
        """执行任务"""
        # 获取任务详情
        task = await self._get_task(task_id)
        
        # 获取插件实例
        plugin = await self.plugin_manager.get_plugin(task.plugin_name)
        
        # 执行插件
        result = await plugin.execute(task.inputs)
        
# 更新
        await self._update_task_status(task_id, "completed", result)
        
        return result
```

# 開發

# 開發

#### 环境准备
```bash
# 創建
git checkout -b feature/awesome-feature

# 開發
make dev-setup

# 測試
make test-lint
```

# 開發
```python
# 開發
def feature_implementation():
    """功能实现示例"""
# 數據
    class NewFeatureModel(BaseModel):
        name: str
        config: Dict[str, Any]
    
    # 2. 实现服务层
    class NewFeatureService:
        async def create_feature(self, data: NewFeatureModel) -> Feature:
            # 业务逻辑实现
            pass
    
    # 3. 实现API端点
    @router.post("/api/v1/features")
    async def create_feature_endpoint(data: NewFeatureModel):
        # API逻辑实现
        pass
```

# 測試
```python
# tests/test_feature.py
import pytest
from openclaw.core.feature import NewFeatureService

class TestNewFeature:
# 測試
    
    @pytest.fixture
    def service(self):
        return NewFeatureService()
    
    async def test_create_feature(self, service):
# 創建
        data = {"name": "test", "config": {}}
        result = await service.create_feature(data)
        
        assert result.name == "test"
        assert result.id is not None
    
    async def test_invalid_data(self, service):
# 測試
        invalid_data = {}
        
        with pytest.raises(ValueError):
            await service.create_feature(invalid_data)
```

#### 提交代码
```bash
# 代码格式化
make format
make lint

# 測試
make test-unit
make test-integration

# 提交代码
git add .
git commit -m "feat: add awesome feature"

# 推送分支
git push origin feature/awesome-feature
```

# 開發

# 專案
```bash
# 創建
openclaw create-plugin my-plugin --template basic

# 專案
my-plugin/
├── src/
│   └── my_plugin/
│       ├── __init__.py
# 檔案
# 數據
├── tests/
│   └── test_plugin.py
├── README.md
├── setup.py
└── openclaw.yaml
```

#### 插件实现
```python
# src/my_plugin/plugin.py
from openclaw.plugins import BasePlugin, PluginMetadata

class MyPlugin(BasePlugin):
    """我的自定义插件"""
    
    metadata = PluginMetadata(
        name="my-plugin",
        version="1.0.0",
        description="自定义插件示例",
        category="custom",
        tags=["example", "custom"]
    )
    
    async def execute(self, inputs: Dict, context: ExecutionContext) -> Dict:
        """执行插件逻辑"""
# 輸入
        self._validate_inputs(inputs)
        
        # 执行业务逻辑
        result = await self._process_inputs(inputs)
        
        return result
    
    async def _process_inputs(self, inputs: Dict) -> Dict:
# 數據
        # 实现具体业务逻辑
        processed_data = {}
        for key, value in inputs.items():
            processed_data[key] = self._transform_value(value)
        
        return {"processed_data": processed_data}
    
    def _transform_value(self, value):
# 數據
        return value.upper() if isinstance(value, str) else value
```

# 測試
```python
# tests/test_plugin.py
import pytest
from openclaw_sdk.testing import PluginTestHarness
from src.my_plugin.plugin import MyPlugin

class TestMyPlugin:
# 測試
    
    @pytest.fixture
    def plugin(self):
        config = {"setting1": "value1"}
        return MyPlugin(config)
    
    async def test_basic_execution(self, plugin):
# 測試
        inputs = {"text": "hello"}
        context = PluginTestHarness().create_mock_context()
        
        result = await plugin.execute(inputs, context)
        
        assert "processed_data" in result
        assert result["processed_data"]["text"] == "HELLO"
    
    async def test_error_handling(self, plugin):
# 測試
# 輸入
        
        with pytest.raises(ValidationError):
            await plugin.execute(invalid_inputs, None)
```

# 發佈
```bash
# 构建插件包
openclaw build-plugin

# 發佈
openclaw publish-plugin
```

# 測試

# 測試
```mermaid
graph TB
# 測試
# 測試
# 測試
# 測試
    end
    
# 測試
        PYTEST[pytest]
        TESTCONTAINERS[testcontainers]
        PLAYWRIGHT[playwright]
    end
    
    UNIT --> PYTEST
    INTEGRATION --> TESTCONTAINERS
    E2E --> PLAYWRIGHT
```

# 配置
```python
# tests/conftest.py
import pytest
from openclaw.database import Database
from testcontainers.postgres import PostgresContainer

@pytest.fixture(scope="session")
def test_db():
# 測試
    with PostgresContainer("postgres:14") as pg:
        db = Database(
            host=pg.get_container_host_ip(),
            port=pg.get_exposed_port(5432),
            database="test",
            username="test",
            password="test"
        )
        yield db

@pytest.fixture
async def test_client(test_db):
# 測試
    app = create_app().test_client()
    app.app_context.push()
    yield app
    app.app_context.pop()
```

# 測試
```bash
# 測試
make test-unit

# 測試
make test-integration

# 測試
make test-e2e

# 測試
make test-performance

# 測試
make test-security
```

# 指南

### 代码贡献流程

#### 1. 选择任务
```bash
# 查看
openclaw list-tasks --state open

# 认领任务
openclaw claim-task TASK_ID
```

# 開發

#### 代码风格
```python
# 遵循PEP 8规范
# 使用类型提示
def process_data(data: List[Dict]) -> Dict[str, Any]:
# 數據
    
    Args:
# 數據
        
    Returns:
# 數據
    """
    # 实现...
    pass

# 文檔
class DataProcessor:
# 數據
    
    def __init__(self, config: Dict[str, Any]):
        """初始化处理器
        
        Args:
# 配置
        """
        self.config = config
```

#### 提交规范
```bash
# 資訊
# 新增
# 修復
# 文檔
style: 代码格式调整
refactor: 重构代码
# 新增
chore: 构建工具或辅助工具的变动

# 提交示例
# 工作流
# 修復
```

### Pull Request流程

# 創建
```bash
# 推送分支
git push origin feature/awesome-feature

# 創建
# 創建
# 填写PR模板
```

#### 2. PR模板
```markdown
## 变更描述
简要描述这个PR的内容和目的

## 变更类型
- [ ] 新功能
# 修復
# 文檔
- [ ] 重构
# 優化
- [ ] 其他

# 測試
# 測試
# 測試
# 測試

## 检查清单
- [ ] 代码遵循规范
# 文檔
# 測試
- [ ] 无安全漏洞
```

#### 3. 代码审查
```yaml
# 审查要点
requirements:
  functional:
    - 功能是否正确实现
    - 边界情况是否考虑
    - 错误处理是否完善
  
  code_quality:
    - 代码风格是否一致
    - 命名是否清晰
    - 注释是否充分
    
  performance:
# 效能
# 新增
    
  security:
    - 是否存在安全漏洞
# 資訊
```

### 社区参与

#### 问题报告
```yaml
# Bug报告模板
title: "[Bug] 简要描述问题"
labels:
  - "bug"
  - "needs-triage"

## 问题描述
详细描述遇到的问题

## 复现步骤
# 系統
2. 执行操作
3. 点击某按钮
4. 看到错误

## 期望结果
描述期望的正常行为

## 实际结果
描述实际发生的情况

# 資訊
# 系統
# 版本
# 瀏覽
# 版本

# 資訊
截图、日志等
```

#### 功能请求
```yaml
# Feature请求模板
title: "[Feature] 新功能描述"
labels:
  - "enhancement"
  - "needs-discussion"

## 问题描述
描述要解决的用户需求

## 解决方案
描述期望的解决方案

## 替代方案
描述其他可能的解决方案

# 資訊
# 文檔
```

# 除錯

# 開發

# 除錯
```python
# 除錯
import pdb; pdb.set_trace()

# 使用日志
import logging
logger = logging.getLogger(__name__)
# 除錯

# 分析
import cProfile
cProfile.run('your_function()', 'profile_output.prof')

# 分析
import pstats
p = pstats.Stats('profile_output.prof')
p.sort_stats('cumulative').print_stats(10)
```

# 除錯
```bash
# 查詢
tail -f logs/postgres.log

# 數據
psql -h localhost -U postgres -d openclaw_dev

# 分析
SELECT query, mean_time, calls
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;
```

# 優化

# 效能
```python
# 新增
from functools import lru_cache

@lru_cache(maxsize=128)
def expensive_function(param):
    # 耗时操作
    return result

# 异步处理
import asyncio

async def process_data_async(data_list):
    tasks = [process_item(item) for item in data_list]
    return await asyncio.gather(*tasks)
```

# 優化
```sql
# 新增
CREATE INDEX idx_user_email ON users(email);

# 分析
EXPLAIN ANALYZE SELECT * FROM workflows WHERE user_id = 1;

# 優化
VACUUM ANALYZE workflows;
```

# 資源

# 開發
# 文檔
# 開發
# 設計

# 資源
- [GitHub仓库](https://github.com/openclaw/openclaw)
- [Discord社区](https://discord.gg/openclaw)
# 標籤

# 開發
- [VS Code插件](https://marketplace.visualstudio.com/items?itemName=openclaw.vscode)
- [Docker镜像](https://hub.docker.com/r/openclaw/runtime)
- [云IDE集成](https://github.com/openclaw/cloudide)

---
# 創建
# 更新
# 分類