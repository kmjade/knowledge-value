---
title: ClawdBot 完整指南
status: active
priority: high
tags: [clawdbot, guide, reference, automation]
aliases: [ClawdBot手册, ClawdBot综合指南]
created: 2026-01-31
modified: 2026-01-31
---

# ClawdBot 完整指南

> ClawdBot 是一个强大的自动化机器人框架，帮助您快速构建和管理各类自动化任务。

## 📋 目录

- [快速入门](#快速入门)
- [核心概念](#核心概念)
- [常用场景](#常用场景)
- [高级功能](#高级功能)
- [最佳实践](#最佳实践)
- [插件安全规范](#插件安全规范)
- [故障排查](#故障排查)
- [相关资源](#相关资源)

---

## 快速入门

### 5分钟搭建第一个机器人

```bash
# 1. 克隆项目模板
git clone https://github.com/example/clawdbot-template.git my-clawdbot
cd my-clawdbot

# 2. 安装依赖
pip install -r requirements.txt

# 3. 初始化数据库
python manage.py init-db

# 4. 启动服务
python -m clawdbot serve --port 8000
```

### 第一个自动化任务

```python
from clawdbot import Clawdbot, Task

# 初始化机器人
bot = Clawdbot(config="config.yaml")

# 创建简单任务：网页截屏
async def screenshot_task():
    task = Task(
        type="browser_screenshot",
        params={
            "url": "https://example.com",
            "save_path": "screenshots/example.png"
        }
    )

    result = await bot.execute(task)
    return result

# 执行任务
result = await screenshot_task()
print(f"任务结果: {result}")
```

---

## 核心概念

### ClawdBot 架构

```
┌─────────────────────────────────────────────────┐
│                   ClawdBot                      │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌─────────────┐    ┌─────────────┐            │
│  │   Task      │───▶│  Executor   │            │
│  │  Manager    │    │   Engine    │            │
│  └─────────────┘    └─────────────┘            │
│         │                   │                    │
│         ▼                   ▼                    │
│  ┌─────────────┐    ┌─────────────┐            │
│  │   Queue     │    │   Plugin    │            │
│  │   System    │    │   System    │            │
│  └─────────────┘    └─────────────┘            │
│         │                   │                    │
│         └───────────────────┘                    │
│                   │                              │
│                   ▼                              │
│         ┌─────────────┐                          │
│         │  Storage &  │                          │
│         │  Database   │                          │
│         └─────────────┘                          │
│                                                 │
└─────────────────────────────────────────────────┘
```

### 关键组件

| 组件 | 说明 | 用途 |
|------|------|------|
| **Task Manager** | 任务管理器 | 创建、调度、监控任务 |
| **Executor Engine** | 执行引擎 | 运行各类自动化任务 |
| **Queue System** | 队列系统 | 管理任务队列和并发 |
| **Plugin System** | 插件系统 | 扩展功能和支持 |
| **Storage** | 存储层 | 持久化数据和配置 |

---

## 常用场景

### 1. 网页数据抓取

```python
# 抓取电商网站商品信息
products = await bot.scrape_web({
    "url": "https://shop.example.com/products",
    "selectors": {
        "name": ".product-title",
        "price": ".price",
        "image": ".product-image img"
    },
    "pagination": {
        "next_btn": ".next-page",
        "max_pages": 5
    }
})

print(f"抓取到 {len(products)} 个商品")
```

**最佳实践：**
- 使用 CSS 选择器或 XPath 定位元素
- 设置合理的请求间隔避免被封
- 保存中间结果便于断点续传

### 2. 表单自动填写

```python
# 自动填写联系表单
await bot.fill_form({
    "url": "https://contact.example.com",
    "form_fields": {
        "name": "张三",
        "email": "zhangsan@example.com",
        "message": "这是一条自动测试消息"
    },
    "submit_selector": "button[type='submit']"
})
```

**提示：**
- 验证表单字段类型和验证规则
- 处理动态加载的表单元素
- 添加重试机制处理网络问题

### 3. API批量调用

```python
# 批量用户数据同步
users = [
    {"id": 1, "name": "张三"},
    {"id": 2, "name": "李四"}
]

results = await bot.call_apis({
    "method": "POST",
    "url": "https://api.example.com/users",
    "batch_data": users,
    "batch_size": 10
})

print(f"成功同步 {len(results)} 个用户")
```

**优化建议：**
- 使用适当的批量大小平衡速度和稳定性
- 实现指数退避重试策略
- 记录失败的请求便于后续处理

### 4. 定时任务调度

```python
# 每小时执行一次数据备份
bot.schedule_task({
    "cron": "0 * * * *",  # 每小时
    "task": backup_task,
    "max_retries": 3
})

# 每天凌晨2点生成报告
bot.schedule_task({
    "cron": "0 2 * * *",  # 每天凌晨2点
    "task": generate_report,
    "timezone": "Asia/Shanghai"
})
```

**Cron 表达式速查：**
```
* * * * *
│ │ │ │ │
│ │ │ │ └─ 星期几 (0-7)
│ │ │ └─── 月份 (1-12)
│ │ └───── 日期 (1-31)
│ └─────── 小时 (0-23)
└───────── 分钟 (0-59)
```

### 5. 邮件自动化

```python
# 发送带附件的邮件
await bot.send_email({
    "to": ["user1@example.com", "user2@example.com"],
    "cc": "manager@example.com",
    "subject": "自动化报告",
    "body": "报告内容...",
    "attachments": ["reports/sales_weekly.pdf"],
    "template": "weekly_report"
})
```

---

## 高级功能

### 工作流编排

使用可视化界面或 YAML 配置定义复杂的工作流：

```yaml
# workflows/email_report.yml
name: 每周销售报告
steps:
  - name: 获取销售数据
    type: api_call
    params:
      url: /api/sales/data
      date_range: "last_7_days"

  - name: 数据处理
    type: transform
    params:
      template: "sales_analysis"

  - name: 生成PDF报告
    type: generate_report
    params:
      template: "weekly_sales"
      output_path: "reports/sales_weekly.pdf"

  - name: 发送邮件
    type: send_email
    params:
      to: "manager@company.com"
      subject: "本周销售报告"
      attachments: ["reports/sales_weekly.pdf"]

  - name: 归档
    type: archive
    params:
      destination: "archive/reports/"
      timestamp: true
```

### 自定义执行器

```python
# custom_executors/custom_bot.py
from clawdbot.executors import BaseExecutor

class CustomBotExecutor(BaseExecutor):
    """自定义机器人执行器"""

    async def execute(self, task: Task) -> Result:
        try:
            # 连接自定义系统
            client = CustomAPIClient()

            # 执行业务逻辑
            result = await client.process(task.params)

            return Result(success=True, data=result)

        except Exception as e:
            return Result(success=False, error=str(e))

    async def validate(self, params: dict) -> bool:
        # 参数验证
        required_fields = ['username', 'action']
        return all(field in params for field in required_fields)

# 注册执行器
# src/plugins/register.py
from clawdbot import register_executor
from custom_executors.custom_bot import CustomBotExecutor

register_executor("custom_bot", CustomBotExecutor)
```

### 验证码处理

```python
# 集成验证码识别服务
task = Task(
    type="solve_captcha",
    params={
        "image": "captcha.png",
        "provider": "2captcha"  # 支持2captcha, anticaptcha等
    }
)

result = await bot.execute(task)
captcha_solution = result.data
```

### 监控与告警

```yaml
# config/monitoring.yaml
dashboard:
  enabled: true
  metrics:
    - task_completion_rate
    - average_execution_time
    - error_rate
    - resource_usage

  alerts:
    - name: "高失败率告警"
      condition: "error_rate > 0.1"
      action: "send_notification"

    - name: "内存使用告警"
      condition: "memory_usage > 80%"
      action: "send_alert"
```

---

## 最佳实践

### 1. 配置管理

```yaml
# config.yaml
database:
  url: "postgresql://localhost/clawdbot"
  pool_size: 10

redis:
  host: "localhost"
  port: 6379
  db: 0

logging:
  level: "INFO"
  file: "logs/clawdbot.log"

security:
  api_key: "${CLAWDBOT_API_KEY}"
  secret: "${CLAWDBOT_SECRET}"
```

**提示：** 使用环境变量存储敏感信息

### 2. 错误处理

```python
try:
    result = await bot.execute(task)
    if not result.success:
        # 记录错误
        logger.error(f"任务失败: {result.error}")

        # 重试机制
        if task.retries < task.max_retries:
            await bot.retry(task)
        else:
            # 通知管理员
            await notify_admin(task, result)

except Exception as e:
    logger.exception(f"任务执行异常: {e}")
```

### 3. 性能优化

```python
# 使用批量处理
tasks = [Task(...) for _ in range(100)]
results = await bot.execute_batch(tasks, batch_size=10)

# 使用异步并发
import asyncio
await asyncio.gather(*[bot.execute(task) for task in tasks])

# 缓存常用数据
from clawdbot.cache import Cache
cache = Cache()

def get_data(key):
    data = cache.get(key)
    if not data:
        data = fetch_from_api(key)
        cache.set(key, data, ttl=3600)
    return data
```

### 4. 安全建议

- ✅ 使用环境变量存储敏感配置
- ✅ 启用 HTTPS 和 API 密钥认证
- ✅ 定期更新依赖包
- ✅ 限制 API 访问频率
- ✅ 实施日志审计
- ❌ 不要在代码中硬编码密码
- ❌ 不要将配置文件提交到版本控制

---

## 插件安全规范

### 🔐 安全架构概述

ClawdBot 采用多层安全机制保护插件系统：

```
┌─────────────────────────────────────────────────┐
│              安全防护层                          │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌─────────────┐    ┌─────────────┐            │
│  │  权限验证   │    │  沙箱隔离   │            │
│  │  API Gateway│───▶│  Sandbox    │            │
│  └─────────────┘    └─────────────┘            │
│         │                   │                    │
│         ▼                   ▼                    │
│  ┌─────────────┐    ┌─────────────┐            │
│  │  资源限制   │    │  审计日志   │            │
│  │  Rate Limit │    │  Audit Log  │            │
│  └─────────────┘    └─────────────┘            │
│                                                 │
└─────────────────────────────────────────────────┘
```

### 1. 插件权限管理

#### 最小权限原则

插件只授予完成任务所需的最低权限：

```python
# plugin_manifest.yaml
name: email-sender
version: "1.0.0"
permissions:
  - network: ["smtp.gmail.com:587", "smtp.qq.com:587"]
  - filesystem:
      read: ["templates/*"]
      write: ["logs/*"]
  - environment: ["SMTP_USER", "SMTP_PASSWORD"]
  - rate_limit:
      requests_per_minute: 60
```

#### 权限类型说明

| 权限类型 | 说明 | 风险等级 |
|---------|------|---------|
| `network` | 网络访问权限 | 🟡 中等 |
| `filesystem` | 文件系统访问 | 🟠 较高 |
| `environment` | 环境变量访问 | 🔴 高 |
| `database` | 数据库操作 | 🔴 高 |
| `system` | 系统命令执行 | 🔴 严重 |
| `api_key` | 外部 API 调用 | 🟡 中等 |

### 2. 代码安全规范

#### 2.1 输入验证

```python
from clawdbot.security import validate_input, sanitize_data

class SecurePlugin(BasePlugin):
    async def execute(self, inputs: Dict, context: ExecutionContext) -> Dict:
        # ✅ 验证输入参数
        if not validate_input(inputs, {
            "email": r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",
            "message": {"max_length": 1000}
        }):
            raise ValidationError("Invalid input parameters")

        # ✅ 清理用户输入
        clean_message = sanitize_data(inputs["message"], ["html", "sql"])

        # ✅ 防止命令注入
        if any(cmd in inputs.get("command", "") for cmd in ["rm", "sudo", "eval"]):
            raise SecurityError("Potentially dangerous command detected")

        return await self.safe_execute(clean_message)
```

#### 2.2 防止注入攻击

```python
# ❌ 危险：SQL 注入风险
async def unsafe_query(self, user_id: str):
    query = f"SELECT * FROM users WHERE id = {user_id}"
    return await db.execute(query)

# ✅ 安全：参数化查询
async def safe_query(self, user_id: str):
    query = "SELECT * FROM users WHERE id = %s"
    return await db.execute(query, [user_id])

# ❌ 危险：命令注入风险
async def unsafe_command(self, filename: str):
    os.system(f"cat {filename}")

# ✅ 安全：使用安全 API
async def safe_read_file(self, filename: str):
    # 验证文件路径
    if not self.is_safe_path(filename):
        raise SecurityError("Unsafe file path")

    with open(filename, 'r') as f:
        return f.read()
```

#### 2.3 密钥和凭证管理

```python
# ✅ 使用环境变量
import os
from cryptography.fernet import Fernet

class SecureConfig:
    def __init__(self):
        # 从环境变量读取
        self.api_key = os.getenv("API_KEY")
        self.db_password = os.getenv("DB_PASSWORD")

        # 加密存储敏感数据
        self.cipher = Fernet(os.getenv("ENCRYPTION_KEY"))

    def encrypt_sensitive_data(self, data: str) -> bytes:
        return self.cipher.encrypt(data.encode())

    def decrypt_sensitive_data(self, encrypted: bytes) -> str:
        return self.cipher.decrypt(encrypted).decode()

# ❌ 不要硬编码凭证
BAD_CONFIG = {
    "api_key": "sk-1234567890abcdef",  # 绝对禁止！
    "password": "plain_text_password"   # 绝对禁止！
}
```

### 3. 沙箱隔离机制

#### 3.1 进程级隔离

```python
# plugins/sandbox/config.yaml
sandbox:
  enabled: true
  type: "process"  # process | container | vm

  resources:
    cpu_limit: "1"
    memory_limit: "512Mi"
    disk_limit: "1Gi"

  network:
    enabled: true
    allowed_hosts:
      - "api.example.com"
      - "cdn.example.com"
    blocked_ports: [22, 23, 8080]
```

#### 3.2 容器化隔离（推荐）

```yaml
# docker-compose.plugin.yml
version: '3.8'
services:
  my-plugin:
    image: clawdbot/plugin-runtime:latest
    container_name: my-clawdbot-plugin
    security_opt:
      - no-new-privileges:true
    read_only: true
    tmpfs:
      - /tmp
    volumes:
      - ./data:/app/data:ro  # 只读挂载
    networks:
      - plugin-network
    environment:
      - PLUGIN_ID=my-plugin
      - API_KEY=${API_KEY}
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 512M
        reservations:
          cpus: '0.5'
          memory: 256M

networks:
  plugin-network:
    driver: bridge
```

### 4. 数据安全

#### 4.1 数据传输加密

```python
import ssl
import asyncio

async def secure_api_call(self, url: str, data: dict):
    # ✅ 使用 HTTPS 和 TLS
    ssl_context = ssl.create_default_context()
    ssl_context.verify_mode = ssl.CERT_REQUIRED

    async with aiohttp.ClientSession() as session:
        async with session.post(
            url,
            json=data,
            ssl=ssl_context,
            headers={
                "Authorization": f"Bearer {self.get_token()}",
                "Content-Type": "application/json"
            },
            timeout=aiohttp.ClientTimeout(total=30)
        ) as response:
            if response.status == 200:
                return await response.json()
            else:
                raise APIError(f"API call failed: {response.status}")
```

#### 4.2 敏感数据处理

```python
# ✅ 敏感数据脱敏
def mask_sensitive_data(data: dict) -> dict:
    masked = data.copy()
    sensitive_fields = ['password', 'token', 'secret', 'key']

    for field in sensitive_fields:
        if field in masked:
            masked[field] = "***" * 8

    return masked

# ✅ 日志中不记录敏感信息
import logging

logger = logging.getLogger(__name__)

async def log_security_event(self, event_type: str, data: dict):
    masked_data = mask_sensitive_data(data)
    logger.info(f"Security event: {event_type}", extra=masked_data)
```

### 5. 审计和监控

#### 5.1 操作日志

```python
# security/audit_logger.py
import json
from datetime import datetime

class AuditLogger:
    def __init__(self, log_file: str):
        self.log_file = log_file

    def log_plugin_action(self, plugin_id: str, action: str, details: dict):
        log_entry = {
            "timestamp": datetime.utcnow().isoformat(),
            "plugin_id": plugin_id,
            "action": action,
            "details": mask_sensitive_data(details),
            "user_id": self.get_current_user()
        }

        with open(self.log_file, 'a') as f:
            f.write(json.dumps(log_entry) + "\n")

# 在插件中使用
audit_logger = AuditLogger("logs/audit.log")

class SecurePlugin(BasePlugin):
    async def execute(self, inputs, context):
        audit_logger.log_plugin_action(
            self.metadata.name,
            "execute",
            {"inputs": inputs}
        )
        # ... 执行逻辑
```

#### 5.2 异常检测

```yaml
# config/security_monitoring.yaml
monitoring:
  enabled: true

  alerts:
    - name: "可疑API调用"
      condition:
        type: "rate"
        threshold: 100
        window: "1m"
      action: "block_and_notify"

    - name: "异常文件访问"
      condition:
        type: "path_pattern"
        patterns: ["/etc/*", "/root/*", "/home/*"]
      action: "alert_only"

    - name: "资源使用异常"
      condition:
        type: "resource"
        metric: "memory"
        threshold: "90%"
      action: "kill_and_report"
```

### 6. 插件发布和审查流程

#### 6.1 安全检查清单

```markdown
## 插件安全检查清单

### 代码安全
- [ ] 所有用户输入都经过验证和清理
- [ ] 使用参数化查询防止 SQL 注入
- [ ] 没有硬编码的密钥或凭证
- [ ] 敏感数据已加密存储
- [ ] 实现了适当的错误处理（不泄露系统信息）

### 权限管理
- [ ] 插件仅请求必要的权限
- [ ] 文件系统访问限制在指定目录
- [ ] 网络访问限制在必要的域名和端口
- [ ] 环境变量访问经过授权

### 性能和资源
- [ ] 实现了资源使用限制
- [ ] 有合理的超时设置
- [ ] 防止内存泄漏
- [ ] 实现了适当的缓存策略

### 日志和监控
- [ ] 记录关键操作日志
- [ ] 日志不包含敏感信息
- [ ] 实现了错误追踪
- [ ] 提供健康检查端点

### 文档
- [ ] 包含安全最佳实践说明
- [ ] 列出所有依赖项和版本
- [ ] 提供配置示例
- [ ] 说明潜在的安全风险
```

#### 6.2 发布前审查

```bash
# 自动化安全扫描
./scripts/security_scan.sh my-plugin/

# 输出示例
✓ 代码静态分析完成
✓ 依赖漏洞扫描完成
✓ 权限配置验证通过
✓ 敏感信息检查通过

⚠️  发现 2 个警告：
  1. 使用了已弃用的 API: `urllib`
  2. 缺少输入验证的路径: `process_user_input()`

请修复警告后重新提交
```

### 7. 安全最佳实践总结

#### ✅ 推荐做法

```python
# 1. 使用官方安全库
from cryptography.fernet import Fernet
from pydantic import BaseModel, validator

# 2. 实施速率限制
from clawdbot.security import rate_limit

@rate_limit(max_calls=10, period=60)
async def api_endpoint(self, request):
    # ... 业务逻辑
    pass

# 3. 使用安全的数据结构
from collections import defaultdict

class SecureDataStore:
    def __init__(self):
        self._store = defaultdict(dict)

    def get(self, key: str) -> dict:
        return self._store[key].copy()  # 返回副本

# 4. 定期更新依赖
# requirements.txt
cryptography>=41.0.0  # 指定最低版本
pydantic>=2.0.0
```

#### ❌ 禁止做法

```python
# ❌ 不要使用 eval/exec
eval(user_input)  # 极度危险！

# ❌ 不要直接拼接 SQL
query = f"SELECT * FROM {user_table}"  # SQL 注入风险

# ❌ 不要忽略异常
try:
    dangerous_operation()
except:
    pass  # 吞掉所有异常

# ❌ 不要信任所有输入
filename = request.json['filename']  # 可能是 "../../../etc/passwd"
```

### 8. 应急响应

#### 安全事件处理流程

```python
# security/incident_response.py

class SecurityIncidentHandler:
    INCIDENT_TYPES = {
        "UNAUTHORIZED_ACCESS": "severe",
        "DATA_LEAK": "critical",
        "MALICIOUS_CODE": "critical",
        "RESOURCE_ABUSE": "moderate"
    }

    async def handle_incident(self, incident_type: str, details: dict):
        severity = self.INCIDENT_TYPES.get(incident_type, "low")

        # 记录事件
        await self.log_incident(incident_type, severity, details)

        # 根据严重程度采取行动
        actions = {
            "critical": [
                self.block_plugin,
                self.notify_security_team,
                self.preserve_evidence
            ],
            "severe": [
                self.suspend_plugin,
                self.notify_admin
            ],
            "moderate": [
                self.limit_plugin,
                self.send_warning
            ],
            "low": [
                self.log_incident
            ]
        }

        for action in actions[severity]:
            await action(details)
```

---

## 故障排查

### 常见问题

#### 1. 任务执行失败

**症状：** 任务状态显示为 failed

**排查步骤：**
```bash
# 查看任务详情
clawdbot task show TASK_ID --logs

# 查看系统日志
clawdbot logs --level error

# 检查配置
clawdbot config validate
```

#### 2. 性能问题

**症状：** 任务执行缓慢或超时

**解决方案：**
```bash
# 性能分析
clawdbot profile task.json --output profile.html

# 查看资源使用
clawdbot stats --live

# 增加工作进程
clawdbot serve --workers 4
```

#### 3. 数据库连接问题

**症状：** 连接数据库时出错

**检查清单：**
```bash
# 验证数据库配置
clawdbot config show database

# 测试数据库连接
psql -U username -h localhost -d clawdbot

# 检查数据库迁移
clawdbot migrate --dry-run
```

### 调试技巧

```python
# 启用调试模式
bot = Clawdbot(config="config.yaml", debug=True)

# 单步执行
clawdbot debug task.json --step-by-step

# 详细日志
clawdbot logs --follow --level debug --component executor
```

---

## 部署指南

### Docker 部署

```bash
# 构建镜像
docker build -t clawdbot-prod:latest .

# 运行容器
docker run -d \
  -p 8000:8000 \
  -v $(pwd)/data:/app/data \
  --env-file .env \
  --name clawdbot \
  clawdbot-prod:latest
```

### Kubernetes 部署

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
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: clawdbot-secrets
              key: database-url
```

```bash
# 部署到 K8s
kubectl apply -f k8s/
```

---

## CLI 命令速查

```bash
# 启动服务
clawdbot serve --port 8000

# 执行任务
clawdbot execute task.json --async

# 查看状态
clawdbot status

# 启动 Web 界面
clawdbot ui --port 3000

# 任务管理
clawdbot task list --status pending
clawdbot task create --file task.json
clawdbot task cancel TASK_ID

# 插件管理
clawdbot plugin list
clawdbot plugin install PLUGIN_NAME

# 日志查看
clawdbot logs --follow --level error
```

更多命令详情请参考 [[Clawdbot命令大全]]

---

## 相关资源

### 官方资源
- 📚 [官方文档](https://docs.clawdbot.dev)
- 💻 [GitHub 仓库](https://github.com/clawdbot/clawdbot)
- 🎯 [示例项目](https://github.com/clawdbot/examples)
- 🛒 [插件市场](https://marketplace.clawdbot.dev)
- 💬 [社区论坛](https://forum.clawdbot.dev)

### 入门教程
- [[Clawdbot快速上手手册]] - 5分钟快速入门
- [[Clawdbot命令大全]] - 完整命令参考
- [[自动化场景案例]] - 实战案例集合

### 进阶学习
- [[Clawdbot架构设计]] - 深入理解架构
- [[插件开发指南]] - 开发自定义插件
- [[插件安全规范]] - 插件安全最佳实践
- [[性能优化实践]] - 提升执行效率

---

## 版本更新

### v2.0 (2026-01)
- ✨ 新增工作流可视化编辑器
- 🚀 性能优化，执行速度提升 50%
- 🐛 修复多个已知问题
- 📚 改进文档和示例

### v1.5 (2025-12)
- ✨ 支持 Docker 和 K8s 部署
- 🔐 增强安全性功能
- 📊 新增监控面板

---

## 贡献指南

欢迎为 ClawdBot 项目贡献代码！

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

---

## 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

---

*创建时间: 2026-01-31*
*最后更新: 2026-01-31*
*分类: 3 Resources*
