---
title: Clawdbot命令大全
status: reference
priority: medium
tags: [clawdbot, commands, cli, reference]
aliases: [Clawdbot CLI, 命令参考]
created: 2024-01-30
---

# Clawdbot命令大全

## CLI命令行工具

### 基础命令

#### 启动服务
```bash
# 启动API服务
clawdbot serve [OPTIONS]

选项:
  --host TEXT          监听地址 (默认: 0.0.0.0)
  --port INTEGER       端口号 (默认: 8000)
  --workers INTEGER    工作进程数 (默认: 1)
  --reload             开发模式自动重载
  --config PATH        配置文件路径

示例:
clawdbot serve --port 8080 --workers 4
```

#### 任务执行
```bash
# 执行单个任务
clawdbot execute [OPTIONS] TASK_FILE

选项:
  --async             异步执行
  --timeout INTEGER   超时时间(秒)
  --output PATH       结果保存路径
  --format TEXT       输出格式(json|yaml)

示例:
clawdbot execute task.yaml --async --timeout 60
```

#### 项目管理
```bash
# 创建新项目
clawdbot init [PROJECT_NAME]

选项:
  --template TEXT     项目模板类型
  --path PATH         项目保存路径
  --git               初始化Git仓库

示例:
clawdbot init my-automation --template basic --git

# 构建项目
clawdbot build [OPTIONS]

选项:
  --target TEXT       构建目标(docker|k8s|static)
  --prod             生产模式构建
  --optimize         优化构建结果

示例:
clawdbot build --target docker --prod

# 部署项目
clawdbot deploy [OPTIONS] ENV

选项:
  --force            强制部署
  --rollback         回滚到上一版本
  --config PATH      部署配置文件

示例:
clawdbot deploy production --force
```

### 配置管理

#### 配置命令
```bash
# 查看配置
clawdbot config show [SECTION]

示例:
clawdbot config show database
clawdbot config show redis

# 设置配置
clawdbot config set KEY VALUE

示例:
clawdbot config set database.url "postgresql://localhost/clawdbot"
clawdbot config set redis.host "redis.example.com"

# 验证配置
clawdbot config validate

选项:
  --strict           严格模式验证
  --fix              自动修复配置问题
```

#### 环境管理
```bash
# 环境切换
clawdbot env [ENV_NAME]

示例:
clawdbot env development
clawdbot env production

# 查看当前环境
clawdbot env

# 创建环境配置
clawdbot env create ENV_NAME

选项:
  --from-copy PATH   从文件复制配置
  --from-env TEXT    从现有环境复制
```

### 任务管理

#### 任务操作
```bash
# 列出任务
clawdbot task list [OPTIONS]

选项:
  --status TEXT      按状态筛选(pending|running|completed|failed)
  --type TEXT        按类型筛选
  --limit INTEGER    限制显示数量
  --format TEXT      输出格式(table|json|yaml)

示例:
clawdbot task list --status pending --limit 10

# 创建任务
clawdbot task create [OPTIONS] TASK_DATA

选项:
  --file PATH        从文件读取
  --template TEXT    使用模板
  --now              立即执行

示例:
clawdbot task create --file task.json --now

# 查看任务详情
clawdbot task show TASK_ID

选项:
  --logs             包含执行日志
  --results          包含执行结果

# 取消任务
clawdbot task cancel TASK_ID [TASK_ID...]

# 重试任务
clawdbot task retry TASK_ID

选项:
  --force            强制重试(无冷却时间)
```

#### 任务模板
```bash
# 创建模板
clawdbot template create TEMPLATE_NAME TEMPLATE_DATA

# 列出模板
clawdbot template list

选项:
  --category TEXT    按分类筛选

# 使用模板创建任务
clawdbot task create --template TEMPLATE_NAME

# 编辑模板
clawdbot template edit TEMPLATE_NAME
```

### Web界面控制

#### 界面启动
```bash
# 启动Web控制台
clawdbot ui [OPTIONS]

选项:
  --port INTEGER     端口号(默认: 3000)
  --host TEXT        监听地址
  --skip-browser     不自动打开浏览器
  --theme TEXT       界面主题(light|dark|auto)

示例:
clawdbot ui --port 3000 --theme dark
```

#### API调试
```bash
# API测试
clawdbot api test [OPTIONS] ENDPOINT

选项:
  --method TEXT      HTTP方法
  --data PATH        请求数据文件
  --headers PATH     请求头文件
  --verbose          详细输出

示例:
clawdbot api test /api/tasks --method POST --data task.json --verbose

# 生成API文档
clawdbot api docs [OPTIONS]

选项:
  --output PATH      保存路径
  --format TEXT      格式(html|markdown|swagger)

示例:
clawdbot api docs --output docs/ --format html
```

### 调试与监控

#### 调试工具
```bash
# 调试模式
clawdbot debug [OPTIONS] TASK_FILE

选项:
  --step-by-step     单步执行
  --breakpoints TEXT 断点位置
  --trace            显示详细跟踪

示例:
clawdbot debug task.json --step-by-step --trace

# 性能分析
clawdbot profile [OPTIONS] TASK_FILE

选项:
  --output PATH      分析结果保存路径
  --format TEXT      输出格式(json|html)

示例:
clawdbot profile task.json --output profile.html --format html

# 日志查看
clawdbot logs [OPTIONS]

选项:
  --follow           实时跟踪
  --tail INTEGER     显示最后N行
  --level TEXT       日志级别
  --component TEXT   组件筛选

示例:
clawdbot logs --follow --level error --component executor
```

#### 系统监控
```bash
# 系统状态
clawdbot status

选项:
  --json             JSON格式输出
  --detailed         详细信息

# 资源使用
clawdbot stats [OPTIONS]

选项:
  --live             实时监控
  --interval INTEGER 刷新间隔(秒)
  --export PATH      导出数据

示例:
clawdbot stats --live --interval 5

# 健康检查
clawdbot health-check

选项:
  --timeout INTEGER  检查超时时间
  --all              检查所有组件
```

### 数据管理

#### 数据库操作
```bash
# 数据库迁移
clawdbot migrate [OPTIONS] VERSION

选项:
  --dry-run         预览迁移
  --force           强制迁移
  --skip-backup     跳过备份

示例:
clawdbot migrate --dry-run
clawdbot migrate --force

# 数据备份
clawdbot backup [OPTIONS] TARGET

选项:
  --compress        压缩备份
  --include TEXT     包含特定表
  --exclude TEXT     排除特定表
  --format TEXT      备份格式

示例:
clawdbot backup db_backup --compress --format sql

# 数据恢复
clawdbot restore SOURCE [OPTIONS]

选项:
  --force           强制恢复
  --no-validation   跳过数据验证

示例:
clawdbot restore db_backup --force
```

#### 缓存管理
```bash
# 缓存操作
clawdbot cache COMMAND [OPTIONS]

命令:
  clear             清空缓存
  size              查看缓存大小
  keys              查看缓存键列表
  get KEY           获取缓存值
  set KEY VALUE     设置缓存值
  delete KEY        删除缓存项

示例:
clawdbot cache clear
clawdbot cache keys --pattern "task:*"
```

### 插件管理

#### 插件操作
```bash
# 插件列表
clawdbot plugin list [OPTIONS]

选项:
  --installed        仅显示已安装
  --category TEXT    按分类筛选
  --tag TEXT         按标签筛选

# 安装插件
clawdbot plugin install PLUGIN_NAME [OPTIONS]

选项:
  --version TEXT     指定版本
  --force            强制安装
  --dev              开发版本

示例:
clawdbot plugin install webhook-plugin --version 1.2.0

# 卸载插件
clawdbot plugin uninstall PLUGIN_NAME [OPTIONS]

选项:
  --force            强制卸载
  --purge            删除配置和数据

# 更新插件
clawdbot plugin update [PLUGIN_NAME]

示例:
clawdbot plugin update
clawdbot plugin update webhook-plugin

# 插件信息
clawdbot plugin info PLUGIN_NAME
```

### 扩展与集成

#### API调用示例

```bash
# REST API调用
curl -X POST http://localhost:8000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "type": "web_automation",
    "params": {
      "url": "https://example.com",
      "action": "screenshot"
    }
  }'

# WebSocket连接
wscat -c ws://localhost:8000/ws/events
```

#### Python API使用

```python
import clawdbot

# 初始化客户端
client = clawdbot.Client("http://localhost:8000")

# 创建任务
task = client.create_task({
    "type": "batch_processing",
    "params": {"files": ["file1.pdf", "file2.pdf"]}
})

# 执行任务
result = await client.execute(task.id)
print(f"任务结果: {result}")
```

## 快速参考卡

### 常用命令速查
```bash
# 启动开发环境
clawdbot serve --reload --port 8000

# 快速执行任务
clawdbot execute task.json --async

# 查看系统状态
clawdbot status

# 启动Web界面
clawdbot ui

# 安装插件
clawdbot plugin install PLUGIN_NAME

# 查看日志
clawdbot logs --follow --level error
```

### 配置文件位置
```
# 系统配置
~/.clawdbot/config.yaml
/etc/clawdbot/config.yaml

# 项目配置
./clawdbot.yaml
./config/config.yaml

# 环境变量
CLAWDBOT_CONFIG_PATH
CLAWDBOT_ENV
```

### 常用端口
| 服务 | 默认端口 |
|------|----------|
| API服务 | 8000 |
| Web界面 | 3000 |
| 监控面板 | 8080 |
| Redis | 6379 |
| PostgreSQL | 5432 |

---
*创建时间: 2024-01-30*
*分类: 3 Resources*