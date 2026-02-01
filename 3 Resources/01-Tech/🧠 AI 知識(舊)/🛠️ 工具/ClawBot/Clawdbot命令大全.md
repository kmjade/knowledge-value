---
title: Clawdbot命令大全
status: reference
priority: medium
tags: [clawdbot, commands, cli, reference]
aliases: [Clawdbot CLI, 命令參考]
created: 2024-01-30
---

# Clawdbot命令大全

## CLI命令行工具

### 基礎命令

#### 啟動服务
```bash
# 啟動API服务
clawdbot serve [OPTIONS]

选项:
  --host TEXT          监听地址 (默认: 0.0.0.0)
  --port INTEGER       端口号 (默认: 8000)
  --workers INTEGER    工作进程数 (默认: 1)
  --reload             開發模式自動重载
# 配置

示例:
clawdbot serve --port 8080 --workers 4
```

#### 任務执行
```bash
# 执行单个任務
clawdbot execute [OPTIONS] TASK_FILE

选项:
  --async             异步执行
  --timeout INTEGER   超时時間(秒)
  --output PATH       結果儲存路徑
  --format TEXT       輸出格式(json|yaml)

示例:
clawdbot execute task.yaml --async --timeout 60
```

# 管理
```bash
# 創建新專案
clawdbot init [PROJECT_NAME]

选项:
  --template TEXT     專案模板类型
  --path PATH         專案儲存路徑
  --git               初始化Git仓库

示例:
clawdbot init my-automation --template basic --git

# 構建專案
clawdbot build [OPTIONS]

选项:
  --target TEXT       構建目標(docker|k8s|static)
  --prod             生产模式構建
  --optimize         優化構建結果

示例:
clawdbot build --target docker --prod

# 部署
clawdbot deploy [OPTIONS] ENV

选项:
# 部署
# 版本
# 配置

示例:
clawdbot deploy production --force
```

# 管理

# 配置
```bash
# 查看
clawdbot config show [SECTION]

示例:
clawdbot config show database
clawdbot config show redis

# 配置
clawdbot config set KEY VALUE

示例:
clawdbot config set database.url "postgresql://localhost/clawdbot"
clawdbot config set redis.host "redis.example.com"

# 配置
clawdbot config validate

选项:
  --strict           严格模式驗證
# 配置
```

# 管理
```bash
# 環境切換
clawdbot env [ENV_NAME]

示例:
clawdbot env development
clawdbot env production

# 查看
clawdbot env

# 配置
clawdbot env create ENV_NAME

选项:
# 配置
  --from-env TEXT    从现有環境複製
```

# 管理

#### 任務操作
```bash
# 列出任務
clawdbot task list [OPTIONS]

选项:
  --status TEXT      按狀態篩選(pending|running|completed|failed)
  --type TEXT        按类型篩選
# 顯示
  --format TEXT      輸出格式(table|json|yaml)

示例:
clawdbot task list --status pending --limit 10

# 創建任務
clawdbot task create [OPTIONS] TASK_DATA

选项:
  --file PATH        从檔案讀取
  --template TEXT    使用模板
  --now              立即执行

示例:
clawdbot task create --file task.json --now

# 查看
clawdbot task show TASK_ID

选项:
  --logs             包含执行日志
  --results          包含执行結果

# 取消任務
clawdbot task cancel TASK_ID [TASK_ID...]

# 重试任務
clawdbot task retry TASK_ID

选项:
  --force            强制重试(無冷却時間)
```

#### 任務模板
```bash
# 創建模板
clawdbot template create TEMPLATE_NAME TEMPLATE_DATA

# 列出模板
clawdbot template list

选项:
  --category TEXT    按分類篩選

# 使用模板創建任務
clawdbot task create --template TEMPLATE_NAME

# 編輯模板
clawdbot template edit TEMPLATE_NAME
```

### Web界面控制

#### 界面啟動
```bash
# 啟動Web控制台
clawdbot ui [OPTIONS]

选项:
  --port INTEGER     端口号(默认: 3000)
  --host TEXT        监听地址
  --skip-browser     不自動打開瀏覽器
  --theme TEXT       界面主題(light|dark|auto)

示例:
clawdbot ui --port 3000 --theme dark
```

#### API除錯
```bash
# API測試
clawdbot api test [OPTIONS] ENDPOINT

选项:
# 方法
  --data PATH        请求數據檔案
  --headers PATH     请求头檔案
  --verbose          詳細輸出

示例:
clawdbot api test /api/tasks --method POST --data task.json --verbose

# 生成API文檔
clawdbot api docs [OPTIONS]

选项:
  --output PATH      儲存路徑
  --format TEXT      格式(html|markdown|swagger)

示例:
clawdbot api docs --output docs/ --format html
```

### 除錯与監控

#### 除錯工具
```bash
# 除錯模式
clawdbot debug [OPTIONS] TASK_FILE

选项:
  --step-by-step     单步执行
  --breakpoints TEXT 断点位置
# 顯示

示例:
clawdbot debug task.json --step-by-step --trace

# 分析
clawdbot profile [OPTIONS] TASK_FILE

选项:
# 分析
  --format TEXT      輸出格式(json|html)

示例:
clawdbot profile task.json --output profile.html --format html

# 查看
clawdbot logs [OPTIONS]

选项:
  --follow           实时跟踪
# 顯示
  --level TEXT       日志级别
  --component TEXT   組件篩選

示例:
clawdbot logs --follow --level error --component executor
```

#### 系統監控
```bash
# 系統狀態
clawdbot status

选项:
  --json             JSON格式輸出
  --detailed         詳細資訊

# 資源使用
clawdbot stats [OPTIONS]

选项:
  --live             实时監控
  --interval INTEGER 刷新间隔(秒)
  --export PATH      导出數據

示例:
clawdbot stats --live --interval 5

# 健康檢查
clawdbot health-check

选项:
  --timeout INTEGER  檢查超时時間
  --all              檢查所有組件
```

# 管理

#### 資料庫操作
```bash
# 資料庫遷移
clawdbot migrate [OPTIONS] VERSION

选项:
  --dry-run         預覽遷移
  --force           强制遷移
  --skip-backup     跳过備份

示例:
clawdbot migrate --dry-run
clawdbot migrate --force

# 數據備份
clawdbot backup [OPTIONS] TARGET

选项:
  --compress        压缩備份
  --include TEXT     包含特定表
  --exclude TEXT     排除特定表
  --format TEXT      備份格式

示例:
clawdbot backup db_backup --compress --format sql

# 數據恢復
clawdbot restore SOURCE [OPTIONS]

选项:
  --force           强制恢復
  --no-validation   跳过數據驗證

示例:
clawdbot restore db_backup --force
```

# 管理
```bash
# 缓存操作
clawdbot cache COMMAND [OPTIONS]

命令:
  clear             清空缓存
# 查看
# 查看
  get KEY           获取缓存值
  set KEY VALUE     設置缓存值
  delete KEY        刪除缓存项

示例:
clawdbot cache clear
clawdbot cache keys --pattern "task:*"
```

# 管理

#### 外掛操作
```bash
# 外掛列表
clawdbot plugin list [OPTIONS]

选项:
# 顯示
  --category TEXT    按分類篩選
  --tag TEXT         按標籤篩選

# 安裝外掛
clawdbot plugin install PLUGIN_NAME [OPTIONS]

选项:
# 版本
  --force            强制安裝
# 版本

示例:
clawdbot plugin install webhook-plugin --version 1.2.0

# 移除外掛
clawdbot plugin uninstall PLUGIN_NAME [OPTIONS]

选项:
  --force            强制移除
# 配置

# 更新
clawdbot plugin update [PLUGIN_NAME]

示例:
clawdbot plugin update
clawdbot plugin update webhook-plugin

# 外掛資訊
clawdbot plugin info PLUGIN_NAME
```

### 擴展与整合

#### API調用示例

```bash
# REST API調用
curl -X POST http://localhost:8000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "type": "web_automation",
    "params": {
      "url": "https://example.com",
      "action": "screenshot"
    }
  }'

# WebSocket連接
wscat -c ws://localhost:8000/ws/events
```

#### Python API使用

```python
import clawdbot

# 初始化客户端
client = clawdbot.Client("http://localhost:8000")

# 創建任務
task = client.create_task({
    "type": "batch_processing",
    "params": {"files": ["file1.pdf", "file2.pdf"]}
})

# 执行任務
result = await client.execute(task.id)
print(f"任務結果: {result}")
```

## 快速參考卡

### 常用命令速查
```bash
# 啟動開發環境
clawdbot serve --reload --port 8000

# 快速执行任務
clawdbot execute task.json --async

# 查看
clawdbot status

# 啟動Web界面
clawdbot ui

# 安裝外掛
clawdbot plugin install PLUGIN_NAME

# 查看
clawdbot logs --follow --level error
```

# 配置
```
# 配置
~/.clawdbot/config.yaml
/etc/clawdbot/config.yaml

# 配置
./clawdbot.yaml
./config/config.yaml

# 環境变量
CLAWDBOT_CONFIG_PATH
CLAWDBOT_ENV
```

### 常用端口
| 服务 | 默认端口 |
|------|----------|
| API服务 | 8000 |
| Web界面 | 3000 |
| 監控面板 | 8080 |
| Redis | 6379 |
| PostgreSQL | 5432 |

---
*創建時間: 2024-01-30*
*分類: 3 Resources*