---
title: OpenClaw技术架构
status: in-progress
priority: high
tags: [architecture, openclaw, technical]
aliases: [OpenClaw系统设计, 技术白皮书]
created: 2024-01-30
updated: 2024-01-30
---

# OpenClaw技术架构

## 架构概览

### 设计原则
- **微服务架构**: 松耦合、高可扩展的模块化设计
- **云原生**: 支持容器化部署和编排
- **事件驱动**: 基于消息队列的异步处理
- **可观测性**: 全链路监控和日志追踪
- **多租户**: 企业级多租户支持

### 系统架构图
```mermaid
graph TB
    subgraph "客户端层"
        WEB[Web界面]
        MOBILE[移动端]
        DESKTOP[桌面客户端]
        API_CLIENT[REST/GraphQL API]
    end
    
    subgraph "网关层"
        KONG[API网关]
        NGINX[负载均衡器]
        CDN[内容分发网络]
    end
    
    subgraph "应用服务层"
        AUTH[认证服务]
        USER[用户管理]
        WORKFLOW[工作流引擎]
        PLUGIN[插件管理] 
        TASK[任务调度]
        NOTIFICATION[通知服务]
    end
    
    subgraph "数据层"
        POSTGRES[(PostgreSQL)]
        REDIS[(Redis Cluster)]
        MINIO[(对象存储)]
        ES[(Elasticsearch)]
    end
    
    subgraph "基础设施层"
        K8S[Kubernetes集群]
        PROMETHEUS[监控系统]
        GRAFANA[可视化]
        JAEGER[链路追踪]
    end
    
    WEB --> KONG
    MOBILE --> KONG
    API_CLIENT --> KONG
    
    KONG --> NGINX
    NGINX --> AUTH
    NGINX --> WORKFLOW
    NGINX --> PLUGIN
    
    WORKFLOW --> POSTGRES
    TASK --> REDIS
    PLUGIN --> MINIO
    
    PROMETHEUS --> GRAFANA
```

## 核心模块设计

### 1. 工作流引擎 (Workflow Engine)

#### 架构设计
```mermaid
graph TB
    subgraph "工作流引擎组件"
        DESIGNER[流程设计器]
        PARSER[流程解析器]
        EXECUTOR[执行器]
        STATE[状态管理]
        ERROR[错误处理]
    end
    
    subgraph "执行环境"
        CONTEXT[执行上下文]
        VARIABLES[变量管理]
        STEP_QUEUE[步骤队列]
    end
    
    subgraph "存储后端"
        WORKFLOW_DB[(工作流存储)]
        EXECUTION_DB[(执行历史)]
        CACHE[(Redis缓存)]
    end
    
    DESIGNER --> PARSER
    PARSER --> EXECUTOR
    EXECUTOR --> STATE
    STATE --> ERROR
    
    EXECUTOR --> CONTEXT
    CONTEXT --> VARIABLES
    EXECUTOR --> STEP_QUEUE
    
    STATE --> WORKFLOW_DB
    EXECUTOR --> EXECUTION_DB
    VARIABLES --> CACHE
```

#### 核心代码结构
```python
# core/workflow/engine.py
from typing import List, Dict, Optional
from dataclasses import dataclass
from enum import Enum

class StepType(Enum):
    """步骤类型枚举"""
    PLUGIN = "plugin"
    CONDITION = "condition"
    LOOP = "loop"
    PARALLEL = "parallel"
    DELAY = "delay"

@dataclass
class WorkflowStep:
    """工作流步骤数据结构"""
    id: str
    type: StepType
    config: Dict
    next_steps: List[str] = None
    on_failure: str = None
    timeout: int = 300

class WorkflowEngine:
    """工作流执行引擎"""
    
    def __init__(self, plugin_manager, task_scheduler):
        self.plugin_manager = plugin_manager
        self.task_scheduler = task_scheduler
        self.state_manager = WorkflowStateManager()
        self.error_handler = ErrorHandler()
    
    async def execute_workflow(
        self, 
        workflow: Workflow, 
        input_data: Dict = None
    ) -> WorkflowResult:
        """执行工作流"""
        # 创建执行上下文
        context = ExecutionContext(
            workflow_id=workflow.id,
            input_data=input_data or {},
            variables={}
        )
        
        try:
            # 记录执行开始
            await self.state_manager.create_execution(context)
            
            # 执行工作流步骤
            result = await self._execute_steps(workflow.steps, context)
            
            # 保存执行结果
            await self.state_manager.complete_execution(
                context, result
            )
            
            return WorkflowResult(
                success=True,
                execution_id=context.id,
                outputs=result
            )
            
        except Exception as e:
            # 错误处理
            error_result = await self._handle_error(e, context)
            return WorkflowResult(
                success=False,
                execution_id=context.id,
                error=str(e)
            )
    
    async def _execute_steps(
        self, steps: List[WorkflowStep], 
        context: ExecutionContext
    ) -> Dict:
        """执行工作流步骤"""
        current_step_map = {step.id: step for step in steps}
        step_queue = Queue()
        
        # 添加起始步骤
        start_steps = self._get_start_steps(steps)
        for step in start_steps:
            await step_queue.put(step)
        
        # 执行步骤循环
        while not step_queue.empty():
            step = await step_queue.get()
            
            # 跳过已完成的步骤
            if context.is_step_completed(step.id):
                continue
            
            # 执行当前步骤
            result = await self._execute_step(step, context)
            context.add_step_result(step.id, result)
            
            # 根据结果确定下一步
            next_steps = self._get_next_steps(step, result)
            for next_step in next_steps:
                if next_step in current_step_map:
                    await step_queue.put(current_step_map[next_step])
        
        return context.get_outputs()
    
    async def _execute_step(
        self, step: WorkflowStep, 
        context: ExecutionContext
    ) -> StepResult:
        """执行单个步骤"""
        start_time = time.time()
        
        try:
            # 设置超时
            async with timeout(step.timeout):
                # 根据步骤类型执行
                if step.type == StepType.PLUGIN:
                    result = await self._execute_plugin_step(step, context)
                elif step.type == StepType.CONDITION:
                    result = await self._execute_condition_step(step, context)
                elif step.type == StepType.LOOP:
                    result = await self._execute_loop_step(step, context)
                elif step.type == StepType.PARALLEL:
                    result = await self._execute_parallel_step(step, context)
                else:
                    raise ValueError(f"Unsupported step type: {step.type}")
                
                return StepResult(
                    success=True,
                    data=result,
                    execution_time=time.time() - start_time
                )
                
        except TimeoutError:
            return StepResult(
                success=False,
                error="Step execution timeout",
                execution_time=time.time() - start_time
            )
        except Exception as e:
            return StepResult(
                success=False,
                error=str(e),
                execution_time=time.time() - start_time
            )
```

### 2. 插件系统 (Plugin System)

#### 插件架构
```mermaid
graph TB
    subgraph "插件生态系统"
        MARKETPLACE[插件市场]
        REGISTRY[插件注册中心]
        DEVELOPER_SDK[开发SDK]
    end
    
    subgraph "插件管理器"
        LOADER[插件加载器]
        SANDBOX[沙箱环境]
        VALIDATOR[插件验证器]
    end
    
    subgraph "运行时环境"
        PLUGIN_RUNTIME[插件运行时]
        RESOURCE_MANAGER[资源管理]
        SECURITY_POLICY[安全策略]
    end
    
    MARKETPLACE --> LOADER
    DEVELOPER_SDK --> LOADER
    LOADER --> SANDBOX
    SANDBOX --> VALIDATOR
    
    VALIDATOR --> PLUGIN_RUNTIME
    PLUGIN_RUNTIME --> RESOURCE_MANAGER
    RESOURCE_MANAGER --> SECURITY_POLICY
```

#### 插件接口定义
```python
# core/plugins/base.py
from abc import ABC, abstractmethod
from typing import Dict, Any, List
from pydantic import BaseModel, Field

class PluginMetadata(BaseModel):
    """插件元数据"""
    name: str = Field(..., description="插件名称")
    version: str = Field(..., description="插件版本")
    description: str = Field(..., description="插件描述")
    author: str = Field(..., description="插件作者")
    category: str = Field(..., description="插件分类")
    tags: List[str] = Field(default_factory=list, description="标签")
    dependencies: List[str] = Field(default_factory=list, description="依赖")
    permissions: List[str] = Field(default_factory=list, description="所需权限")

class PluginConfig(BaseModel):
    """插件配置"""
    enabled: bool = Field(default=True, description="是否启用")
    settings: Dict[str, Any] = Field(default_factory=dict, description="插件设置")
    resources: Dict[str, Any] = Field(default_factory=dict, description="资源限制")

class BasePlugin(ABC):
    """插件基类"""
    
    metadata: PluginMetadata
    config: PluginConfig
    
    @abstractmethod
    async def execute(
        self, 
        inputs: Dict[str, Any], 
        context: ExecutionContext
    ) -> Dict[str, Any]:
        """执行插件逻辑"""
        pass
    
    @abstractmethod
    async def validate_config(self, config: Dict) -> bool:
        """验证配置"""
        pass
    
    async def on_install(self):
        """安装时回调"""
        pass
    
    async def on_uninstall(self):
        """卸载时回调"""
        pass
    
    async def on_enable(self):
        """启用时回调"""
        pass
    
    async def on_disable(self):
        """禁用时回调"""
        pass

# 示例插件实现
class WebScrapingPlugin(BasePlugin):
    """网页抓取插件"""
    
    metadata = PluginMetadata(
        name="web-scraping",
        version="1.0.0",
        description="网页数据抓取工具",
        author="OpenClaw Team",
        category="data-collection",
        tags=["web", "scraping", "automation"],
        dependencies=["playwright"],
        permissions=["network", "javascript"]
    )
    
    async def execute(
        self, 
        inputs: Dict[str, Any], 
        context: ExecutionContext
    ) -> Dict[str, Any]:
        """执行网页抓取"""
        url = inputs.get("url")
        selector = inputs.get("selector")
        
        # 使用Playwright进行网页抓取
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()
            await page.goto(url)
            
            # 提取数据
            elements = await page.query_selector_all(selector)
            data = [await element.text_content() for element in elements]
            
            await browser.close()
        
        return {"data": data, "count": len(data)}
    
    async def validate_config(self, config: Dict) -> bool:
        """验证配置"""
        required_fields = ["url", "selector"]
        return all(field in config for field in required_fields)
```

### 3. 任务调度系统

#### 调度架构
```mermaid
graph TB
    subgraph "调度组件"
        SCHEDULER[主调度器]
        QUEUE[任务队列]
        WORKER_POOL[工作线程池]
    end
    
    subgraph "队列管理"
        PRIORITY_QUEUE[优先级队列]
        DELAYED_QUEUE[延迟队列]
        FAILED_QUEUE[失败队列]
    end
    
    subgraph "执行环境"
        EXECUTOR[任务执行器]
        MONITOR[执行监控]
        RETRY[重试机制]
    end
    
    SCHEDULER --> QUEUE
    QUEUE --> PRIORITY_QUEUE
    QUEUE --> DELAYED_QUEUE
    QUEUE --> FAILED_QUEUE
    
    QUEUE --> WORKER_POOL
    WORKER_POOL --> EXECUTOR
    EXECUTOR --> MONITOR
    MONITOR --> RETRY
```

#### 调度器实现
```python
# core/tasks/scheduler.py
import asyncio
import time
from datetime import datetime, timedelta
from typing import Dict, List, Optional
from dataclasses import dataclass
from enum import Enum

class TaskStatus(Enum):
    """任务状态"""
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"
    DELAYED = "delayed"

class TaskPriority(Enum):
    """任务优先级"""
    LOW = 1
    NORMAL = 2
    HIGH = 3
    CRITICAL = 4

@dataclass
class Task:
    """任务数据结构"""
    id: str
    plugin: str
    inputs: Dict
    priority: TaskPriority = TaskPriority.NORMAL
    retry_count: int = 0
    max_retries: int = 3
    timeout: int = 300
    scheduled_at: Optional[datetime] = None
    created_at: datetime = None
    
    def __post_init__(post_init):
        if not self.created_at:
            self.created_at = datetime.now()

class TaskScheduler:
    """任务调度器"""
    
    def __init__(self, redis_client, plugin_manager):
        self.redis = redis_client
        self.plugin_manager = plugin_manager
        self.queues = {
            'pending': RedisQueue("tasks:pending"),
            'delayed': RedisQueue("tasks:delayed", sorted=True),
            'failed': RedisQueue("tasks:failed")
        }
        self.workers = []
        self.running = False
        self.stats = SchedulerStats()
    
    async def start(self, max_workers: int = 10):
        """启动调度器"""
        self.running = True
        
        # 启动工作线程
        for i in range(max_workers):
            worker = TaskWorker(f"worker-{i}", self)
            self.workers.append(worker)
            asyncio.create_task(worker.run())
        
        # 启动延迟任务检查
        asyncio.create_task(self._process_delayed_tasks())
        
        # 启动统计任务
        asyncio.create_task(self._update_stats())
    
    async def submit_task(self, task: Task):
        """提交任务"""
        # 验证任务
        if not await self._validate_task(task):
            raise ValueError(f"Invalid task: {task}")
        
        # 根据调度时间放入相应队列
        if task.scheduled_at and task.scheduled_at > datetime.now():
            await self.queues['delayed'].push(
                task.scheduled_at, task.id
            )
        else:
            await self.queues['pending'].push(
                task.priority.value, task.id
            )
        
        self.stats.submitted_tasks += 1
        return task.id
    
    async def cancel_task(self, task_id: str):
        """取消任务"""
        # 从队列中移除
        await self.redis.lrem("tasks:pending", 0, task_id)
        await self.redis.lrem("tasks:delayed", 0, task_id)
        
        # 更新任务状态
        await self._update_task_status(task_id, TaskStatus.CANCELLED)
    
    async def _process_delayed_tasks(self):
        """处理延迟任务"""
        while self.running:
            now = datetime.now()
            
            # 查看需要执行的任务
            while True:
                score, task_id = await self.queues['delayed'].peek()
                if not score or score > now:
                    break
                
                # 移动到普通队列
                await self.queues['delayed'].pop()
                await self.queues['pending'].push(TaskPriority.NORMAL.value, task_id)
            
            await asyncio.sleep(60)  # 每分钟检查一次
    
    async def _execute_task(self, task_id: str):
        """执行具体任务"""
        try:
            # 获取任务详情
            task = await self._get_task(task_id)
            await self._update_task_status(task_id, TaskStatus.RUNNING)
            
            # 执行插件
            plugin = await self.plugin_manager.get_plugin(task.plugin)
            result = await plugin.execute(task.inputs)
            
            # 标记成功
            await self._update_task_status(
                task_id, 
                TaskStatus.COMPLETED,
                result=result
            )
            
            self.stats.completed_tasks += 1
            
        except Exception as e:
            # 执行失败
            await self._handle_task_failure(task_id, task, e)
    
    async def _handle_task_failure(self, task_id: str, task: Task, error: Exception):
        """处理任务失败"""
        # 检查重试次数
        if task.retry_count < task.max_retries:
            # 重试任务
            task.retry_count += 1
            task.scheduled_at = datetime.now() + timedelta(seconds=60 * task.retry_count)
            await self.queues['delayed'].push(task.scheduled_at, task_id)
            
            self.stats.retry_tasks += 1
        else:
            # 放入失败队列
            await self.queues['failed'].push(0, task_id)
            self.stats.failed_tasks += 1
        
        await self._update_task_status(
            task_id, 
            TaskStatus.FAILED,
            error=str(error)
        )

class TaskWorker:
    """任务工作线程"""
    
    def __init__(self, name: str, scheduler: TaskScheduler):
        self.name = name
        self.scheduler = scheduler
    
    async def run(self):
        """运行工作线程"""
        while True:
            try:
                # 从队列获取任务
                task_id = await self.scheduler.queues['pending'].pop()
                if not task_id:
                    await asyncio.sleep(1)
                    continue
                
                # 执行任务
                await self.scheduler._execute_task(task_id)
                
            except Exception as e:
                # 记录错误
                print(f"Worker {self.name} error: {e}")
                await asyncio.sleep(5)
```

## 数据存储设计

### 数据模型
```sql
-- 用户表
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT current_timestamp,
    updated_at TIMESTAMP DEFAULT current_timestamp
);

-- 工作流表
CREATE TABLE workflows (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    definition JSONB NOT NULL,
    status VARCHAR(20) DEFAULT 'draft',
    owner_id UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT current_timestamp,
    updated_at TIMESTAMP DEFAULT current_timestamp
);

-- 执行历史表
CREATE TABLE workflow_executions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id UUID REFERENCES workflows(id),
    status VARCHAR(20) NOT NULL,
    inputs JSONB,
    outputs JSONB,
    error_message TEXT,
    started_at TIMESTAMP DEFAULT current_timestamp,
    completed_at TIMESTAMP,
    created_by UUID REFERENCES users(id)
);

-- 任务表
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_execution_id UUID REFERENCES workflow_executions(id),
    plugin_name VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL,
    inputs JSONB,
    outputs JSONB,
    error_message TEXT,
    retry_count INTEGER DEFAULT 0,
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT current_timestamp
);

-- 插件表
CREATE TABLE plugins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) UNIQUE NOT NULL,
    version VARCHAR(20) NOT NULL,
    metadata JSONB NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT current_timestamp,
    updated_at TIMESTAMP DEFAULT current_timestamp
);
```

### 缓存策略
```yaml
# Redis缓存配置
cache:
  # 会话缓存
  sessions:
    key: "session:{user_id}"
    ttl: 86400  # 24小时
    
  # 工作流配置缓存
  workflow_definitions:
    key: "workflow:{workflow_id}"
    ttl: 3600   # 1小时
    
  # 执行上下文缓存
  execution_context:
    key: "execution:{execution_id}"
    ttl: 86400  # 24小时
    
  # 插件元数据缓存
  plugin_metadata:
    key: "plugin:{plugin_name}"
    ttl: 604800 # 7天
    
  # 系统配置缓存
  system_config:
    key: "config:{namespace}"
    ttl: 3600   # 1小时
```

## 安全设计

### 认证授权体系
```mermaid
graph TB
    subgraph "认证层"
        OAUTH[OAuth2.0]
        JWT[JWT令牌]
        SAML[SAML集成]
    end
    
    subgraph "授权层"
        RBAC[角色权限模型]
        RESOURCE[资源权限]
        API_SCOPE[API权限范围]
    end
    
    subgraph "审计层"
        AUDIT_LOG[审计日志]
        ACCESS_LOG[访问日志]
        SECURITY_EVENTS[安全事件]
    end
    
    OAUTH --> RBAC
    JWT --> RESOURCE
    SAML --> API_SCOPE
    
    RBAC --> AUDIT_LOG
    RESOURCE --> ACCESS_LOG
    API_SCOPE --> SECURITY_EVENTS
```

### 插件安全沙箱
```python
# security/sandbox.py
class PluginSandbox:
    """插件安全沙箱"""
    
    def __init__(self, plugin_id: str):
        self.plugin_id = plugin_id
        self.permissions = {}
        self.resource_limits = {}
        self.is_active = False
    
    async def execute(self, code: str, context: Dict):
        """在沙箱中执行代码"""
        # 设置资源限制
        limits = ResourceLimits(
            memory_mb=self.resource_limits.get("memory", 512),
            cpu_time=self.resource_limits.get("cpu_time", 30),
            network_access=self.permissions.get("network", False)
        )
        
        try:
            # 创建沙箱环境
            sandbox_env = SockerSandbox(
                plugin_id=self.plugin_id,
                limits=limits
            )
            
            # 执行代码
            result = await sandbox_env.run(code, context)
            
            return result
            
        except SecurityViolation as e:
            # 记录安全违规
            await self._log_security_violation(e)
            raise
```

## 监控与运维

### 监控指标体系
```yaml
# Prometheus监控指标
metrics:
  # 系统指标
  system:
    cpu_usage: cpu_usage_percent
    memory_usage: memory_usage_percent
    disk_usage: disk_usage_percent
    network_io: network_io_bytes_total
    
  # 应用指标
  application:
    request_count: http_requests_total
    response_time: http_request_duration_seconds
    error_rate: http_requests_errors_total
    active_connections: active_connections_total
    
  # 业务指标
  business:
    workflows_executed: workflows_executed_total
    tasks_processed: tasks_processed_total
    plugin_usage: plugin_usage_total
    user_active: active_users_total
    
  # 自定义指标
  custom:
    workflow_execution_time: workflow_execution_duration_seconds
    plugin_execution_success: plugin_execution_success_rate
    queue_depth: task_queue_depth
```

### 日志管理策略
```yaml
# 日志配置
logging:
  # 日志级别
  level: INFO
  
  # 日志格式
  format: json
  
  # 输出目标
  outputs:
    console: false
    file: true
    elasticsearch: true
    
  # 日志存储
  retention:
    files: 30  # 天数
    
  # 日志字段
  fields:
    - timestamp
    - level
    - service
    - request_id
    - user_id
    - workflow_id
    - message
    - error
    - execution_time
```

### 健康检查
```python
# health/checkers.py
class HealthChecker:
    """健康检查器"""
    
    def __init__(self, dependencies):
        self.dependencies = dependencies
    
    async def check_health(self) -> HealthStatus:
        """执行健康检查"""
        checks = {
            "database": await self._check_database(),
            "redis": await self._check_redis(),
            "storage": await self._check_storage(),
            "plugins": await self._check_plugins()
        }
        
        overall_status = all(
            check.status == "healthy" 
            for check in checks.values()
        )
        
        return HealthStatus(
            status="healthy" if overall_status else "unhealthy",
            checks=checks,
            timestamp=datetime.now()
        )
    
    async def _check_database(self) -> ComponentStatus:
        """检查数据库连接"""
        try:
            await self.dependencies["database"].execute("SELECT 1")
            return ComponentStatus(status="healthy")
        except Exception as e:
            return ComponentStatus(status="unhealthy", error=str(e))
```

## 扩展设计

### 微服务拆分
```yaml
# 微服务规划
services:
  # 基础服务
  auth-service:
    port: 8001
    description: 用户认证和授权
    
  user-service:
    port: 8002
    description: 用户管理
    
  # 核心服务
  workflow-service:
    port: 8101
    description: 工作流管理
    
  task-service:
    port: 8102
    description: 任务调度和执行
    
  plugin-service:
    port: 8103
    description: 插件管理
    
  # API服务
  gateway-service:
    port: 8000
    description: API网关
    
  # 支撑服务
  notification-service:
    port: 8201
    description: 通知和消息
    
  monitoring-service:
    port: 8202
    description: 监控和告警
```

### API版本管理
```python
# api/versioning.py
from fastapi import FastAPI
from fastapi.routing import APIRouter

# API版本路由
v1_router = APIRouter(prefix="/api/v1")
v2_router = APIRouter(prefix="/api/v2")

# 版本映射
API_VERSIONS = {
    "default": "v2",
    "supported": ["v1", "v2"],
    "deprecated": ["v1"]
}

# 版本兼容性处理器
async def version_handler(request: Request, response: Response):
    """API版本处理"""
    accept_header = request.headers.get("Accept", "")
    version = extract_version_from_accept(accept_header) or "v2"
    
    if version not in API_VERSIONS["supported"]:
        raise HTTPException(406, "Unsupported API version")
    
    if version in API_VERSIONS["deprecated"]:
        response.headers["X-API-Deprecated"] = version
        response.headers["X-API-Sunset"] = "2024-12-31"
```

## 相关文档

- [[OpenClaw项目]] - 项目总览和规划
- [[OpenClaw开发指南]] - 开发入门指南
- [[OpenClaw部署文档]] - 生产环境部署
- [[微服务架构实践]] - 分布式系统设计
- [[API设计规范]] - 接口设计标准

---
*创建时间: 2024-01-30*
*更新时间: 2024-01-30*
*分类: 2 Areas*