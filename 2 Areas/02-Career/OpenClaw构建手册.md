---
title: OpenClaw构建手册
status: active
priority: high
tags: [openclaw, build, deployment]
# 指南
created: 2024-01-30
updated: 2024-01-30
---

# OpenClaw构建手册

# 設計

# 系統

```mermaid
graph TB
    subgraph "代码仓库"
        REPO[源代码仓库]
        PLUGINS[插件仓库]
# 文檔
    end
    
    subgraph "构建流水线"
        LINT[代码检查]
# 測試
        BUILD[应用程序构建]
        DOCKER[Docker镜像构建]
    end
    
# 部署
# 開發
# 發佈
        PROD[生产环境]
    end
    
    REPO --> LINT
    LINT --> TEST
    TEST --> BUILD
    BUILD --> DOCKER
    
    DOCKER --> DEV
    DOCKER --> STAGING
    DOCKER --> PROD
    
    PLUGINS --> BUILD
    DOCS --> BUILD
```

# 開發

# 開發

#### 1. 环境准备
```bash
# Linux/macOS
sudo apt-get update
sudo apt-get install python3.9 python3.9-venv python3.9-dev gcc g++ make

# Windows
# 安裝
# 安裝

# 系統
sudo apt-get install -y build-essential libpq-dev libssl-dev libffi-dev
```

#### 2. 源码构建
```bash
# 克隆代码仓库
git clone https://github.com/openclaw/openclaw.git
cd openclaw

# 創建
python3 -m venv venv
source venv/bin/activate  # Linux/macOS
# venv\Scripts\activate     # Windows

# 安裝
pip install --upgrade pip
pip install -r requirements.txt
pip install -r requirements-dev.txt

# 安裝
cd frontend
npm install
npm run build
cd ..

# 配置
cp .env.example .env
# 檔案
```

# 數據
```bash
# 創建
createdb openclaw_dev

# 运行迁移
alembic upgrade head

# 創建
python scripts/create_initial_data.py
```

# 開發
```bash
# 启动基础服务（Redis、PostgreSQL）
docker-compose -f docker-compose.dev.yml up -d

# 启动API服务
export FLASK_ENV=development
export FLASK_DEBUG=1
python run.py

# 或者使用uvicorn（推荐）
uvicorn core.app:app --reload --host 0.0.0.0 --port 8000

# 開發
cd frontend
npm run dev
```

# 開發

#### 1. Dockerfile
```dockerfile
# Dockerfile.dev
FROM python:3.9-slim

WORKDIR /app

# 系統
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    libpq-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# 安裝
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 安裝
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci --only=production

# 构建前端
COPY frontend/ .
RUN npm run build

# 复制应用代码
WORKDIR /app
COPY . .

# 暴露端口
EXPOSE 8000

# 健康检查
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# 启动命令
CMD ["uvicorn", "core.app:app", "--host", "0.0.0.0", "--port", "8000"]
```

# 開發
```yaml
# docker-compose.dev.yml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "8000:8000"
    volumes:
      - .:/app
      - node_modules:/app/frontend/node_modules
    environment:
      - DATABASE_URL=postgresql://postgres:password@postgres:5432/openclaw_dev
      - REDIS_URL=redis://redis:6379/0
      - DEBUG=1
    depends_on:
      - postgres
      - redis
    command: uvicorn core.app:app --reload --host 0.0.0.0 --port 8000

  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: openclaw_dev
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
  node_modules:
```

# 開發
```bash
#!/bin/bash
# scripts/dev-setup.sh

# 開發

# 检查Docker
if ! command -v docker &> /dev/null; then
# 安裝
    exit 1
fi

# 检查Docker Compose
if ! command -v docker-compose &> /dev/null; then
# 安裝
    exit 1
fi

# 開發
# 開發
docker-compose -f docker-compose.dev.yml up -d

# 數據
# 數據
sleep 10

# 數據
# 數據
docker-compose -f docker-compose.dev.yml exec app alembic upgrade head

# 創建
# 創建
docker-compose -f docker-compose.dev.yml exec app python scripts/create_initial_data.py

# 開發
echo "🌐 Web界面: http://localhost:8000"
# 文檔
# 管理

# 获取日志
docker-compose -f docker-compose.dev.yml logs -f app
```

# 系統

# 配置

#### 1. Makefile
```makefile
# Makefile
.PHONY: help install test lint format coverage clean build publish

# 默认目标
help:
	@echo "可用的构建命令:"
# 安裝
# 測試
	@echo "  make lint        - 代码检查"
	@echo "  make format      - 代码格式化"
# 測試
	@echo "  make build       - 构建应用"
# 發佈

# 安裝
install:
	pip install --upgrade pip
	pip install -r requirements.txt
	pip install -r requirements-dev.txt
	cd frontend && npm install

# 測試
test:
	pytest tests/ -v --cov=core --cov-report=html --cov-report=term

# 代码检查
lint:
	pylint core/ --fail-under=7.5
	mypy core/ --disallow-untyped-defs
	black --check core/
	isort --check-only core/

# 代码格式化
format:
	black core/
	isort core/
	cd frontend && npm run format

# 測試
coverage:
	pytest tests/ --cov=core --cov-report=html --cov-fail-under=80

# 檔案
clean:
	find . -name "*.pyc" -delete
	find . -name "__pycache__" -type d -exec rm -rf {} +
	rm -rf .coverage htmlcov/ dist/ build/

# 构建Docker镜像
build:
	docker build -t openclaw/core:latest .
	docker build -t openclaw/frontend:latest -f frontend/Dockerfile frontend/

# 發佈
publish: clean
	python setup.py bdist_wheel
	twine upload dist/*
```

#### 2. pyproject.toml
```toml
[tool.poetry]
name = "openclaw-core"
version = "0.1.0"
description = "OpenClaw核心自动化平台"
authors = ["OpenClaw Team <team@openclaw.dev>"]
license = "MIT"

[tool.poetry.dependencies]
python = "^3.9"
fastapi = "^0.68.0"
uvicorn = "^0.15.0"
pydantic = "^1.8.0"
sqlalchemy = "^1.4.0"
alembic = "^1.6.0"
redis = "^3.5.0"
celery = "^5.2.0"
playwright = "^1.17.0"

[tool.poetry.dev-dependencies]
pytest = "^6.2.0"
pytest-asyncio = "^0.15.0"
pytest-cov = "^2.12.0"
black = "^21.7.0"
isort = "^5.9.0"
mypy = "^0.910"
pylint = "^2.9.0"

[tool.black]
line-length = 88
target-version = ['py39']
include = '\.pyi?$'

[tool.isort]
profile = "black"
multi_line_output = 3

[tool.mypy]
python_version = "3.9"
warn_return_any = true
warn_unused_configs = true
disallow_untyped_defs = true
disallow_untyped_calls = true

[tool.pytest.ini_options]
minversion = "6.0"
addopts = "-ra -q --color=yes"
testpaths = [
    "tests"
]
```

# 工作流
```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: [3.9, 3.10, 3.11]

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: openclaw_test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

      redis:
        image: redis:7
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 6379:6379

    steps:
    - uses: actions/checkout@v3

    - name: Set up Python ${{ matrix.python-version }}
      uses: actions/setup-python@v4
      with:
        python-version: ${{ matrix.python-version }}

    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install -r requirements.txt
        pip install -r requirements-dev.txt

    - name: Install PostgreSQL client
      run: |
        sudo apt-get update
        sudo apt-get install -y postgresql-client

    - name: Run database migrations
      run: |
        export DATABASE_URL=postgresql://postgres:postgres@localhost:5432/openclaw_test
        export REDIS_URL=redis://localhost:6379/0
        alembic upgrade head

    - name: Run tests
      run: |
        export DATABASE_URL=postgresql://postgres:postgres@localhost:5432/openclaw_test
        export REDIS_URL=redis://localhost:6379/0
        pytest tests/ -v --cov=core --cov-report=xml

    - name: Upload coverage
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage.xml
        flags: unittests
        name: codecov-umbrella
        fail_ci_if_error: false

  build:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
    - uses: actions/checkout@v3

    - name: Build Docker images
      run: |
        docker build -t openclaw/core:${{ github.sha }} .
        docker tag openclaw/core:${{ github.sha }} openclaw/core:latest

    - name: Push Docker images
      if: success()
      run: |
        echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
        docker push openclaw/core:${{ github.sha }}
        docker push openclaw/core:latest
```

## 前端构建

### React应用构建

# 配置
```javascript
// frontend/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@mui/material', '@mui/icons-material'],
          api: ['axios', 'react-query'],
        }
      }
    }
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true
      }
    }
  }
})
```

#### 2. 构建脚本
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext .ts,.tsx",
    "lint:fix": "eslint src --ext .ts,.tsx --fix",
    "format": "prettier --write src/**/*.{ts,tsx}"
  }
}
```

#### 3. Dockerfile
```dockerfile
# frontend/Dockerfile
FROM node:18-alpine as builder

WORKDIR /app

# 安裝
COPY package.json package-lock.json ./
RUN npm ci --only=production

# 构建应用
COPY . .
RUN npm run build

# 生产镜像
FROM nginx:alpine

# 复制构建结果
COPY --from=builder /app/dist /usr/share/nginx/html

# 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

# 部署

#### 1. 生产Dockerfile
```dockerfile
# Dockerfile.prod
FROM python:3.9-slim as builder

WORKDIR /app

# 安裝
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# 安裝
COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt
# 新增
ENV PATH=/root/.local/bin:/root/.local:$PATH

# 生产镜像
FROM python:3.9-slim

# 安裝
RUN apt-get update && apt-get install -y \
    libpq5 \
    curl \
    && rm -rf /var/lib/apt/lists/*

# 从builder层复制Python包
COPY --from=builder /root/.local /root/.local
ENV PATH=/root/.local/bin:/root/.local:$PATH

# 新增
WORKDIR /app
COPY . .

# 創建
RUN useradd --create-home --shell /bin/bash openclaw
USER openclaw

# 健康检查
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

EXPOSE 8000

# 启动命令
CMD ["gunicorn", "core.app:app", "-w", "4", "-b", "0.0.0.0:8000"]
```

#### 2. 生产Docker Compose
```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.prod
    restart: unless-stopped
    environment:
      - DATABASE_URL=postgresql://openclaw:${DB_PASSWORD}@postgres:5432/openclaw
      - REDIS_URL=redis://redis:6379/0
      - SECRET_KEY=${SECRET_KEY}
      - DEBUG=false
    depends_on:
      - postgres
      - redis
    networks:
      - app-network
    volumes:
      - media_files:/app/media
      - log_files:/app/logs

  postgres:
    image: postgres:15
    restart: unless-stopped
    environment:
      - POSTGRES_DB=openclaw
      - POSTGRES_USER=openclaw
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    networks:
      - app-network
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql

  redis:
    image: redis:7-alpine
    restart: unless-stopped
    networks:
      - app-network
    volumes:
      - redis_data:/data

  nginx:
    image: nginx:alpine
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
      - media_files:/var/www/media
    depends_on:
      - app
    networks:
      - app-network

  worker:
    build:
      context: .
      dockerfile: Dockerfile.prod
    restart: unless-stopped
    command: celery -A core.tasks worker --loglevel=info
    environment:
      - DATABASE_URL=postgresql://openclaw:${DB_PASSWORD}@postgres:5432/openclaw
      - REDIS_URL=redis://redis:6379/0
    depends_on:
      - postgres
      - redis
    networks:
      - app-network
    volumes:
      - log_files:/app/logs

  scheduler:
    build:
      context: .
      dockerfile: Dockerfile.prod
    restart: unless-stopped
    command: celery -A core.tasks beat --loglevel=info
    environment:
      - DATABASE_URL=postgresql://openclaw:${DB_PASSWORD}@postgres:5432/openclaw
      - REDIS_URL=redis://redis:6379/0
    depends_on:
      - postgres
      - redis
    networks:
      - app-network

networks:
  app-network:
    driver: bridge

volumes:
  postgres_data:
  redis_data:
  media_files:
  log_files:
```

# 部署
```bash
#!/bin/bash
# scripts/deploy-prod.sh

set -e

# 部署

# 检查环境变量
if [ -z "$SECRET_KEY" ] || [ -z "$DB_PASSWORD" ]; then
    echo "❌ 缺少环境变量: SECRET_KEY, DB_PASSWORD"
    exit 1
fi

# 備份
# 備份
docker-compose -f docker-compose.prod.yml exec postgres pg_dump -U openclaw openclaw > backup_$(date +%Y%m%d_%H%M%S).sql

# 拉取最新代码
echo "📥 拉取最新代码..."
git pull origin main

# 构建新镜像
echo "🔨 构建Docker镜像..."
docker-compose -f docker-compose.prod.yml build

# 數據
# 數據
docker-compose -f docker-compose.prod.yml exec -T app alembic upgrade head

# 重启服务
echo "🔄 重启服务..."
docker-compose -f docker-compose.prod.yml up -d

# 健康检查
echo "⏳ 等待服务启动..."
sleep 30

# 检查服务状态
if curl -f http://localhost/health; then
# 部署
else
# 部署
    # 回滚逻辑
    docker-compose -f docker-compose.prod.yml down
    git reset --hard HEAD~1
    docker-compose -f docker-compose.prod.yml up -d
    exit 1
fi

# 清理旧镜像
echo "🧹 清理旧镜像..."
docker image prune -f

# 部署
```

# 部署

# 檔案
```yaml
# k8s/namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: openclaw
---
# k8s/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: openclaw-config
  namespace: openclaw
data:
  DATABASE_HOST: "postgres"
  DATABASE_NAME: "openclaw"
  DATABASE_USER: "openclaw"
  REDIS_HOST: "redis"
  REDIS_DB: "0"
---
# k8s/secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: openclaw-secret
  namespace: openclaw
type: Opaque
data:
  DATABASE_PASSWORD: # base64编码的密码
  SECRET_KEY: # base64编码的密钥
---
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: openclaw-app
  namespace: openclaw
spec:
  replicas: 3
  selector:
    matchLabels:
      app: openclaw-app
  template:
    metadata:
      labels:
        app: openclaw-app
    spec:
      containers:
      - name: openclaw
        image: openclaw/core:latest
        ports:
        - containerPort: 8000
        env:
        - name: DATABASE_URL
          value: "postgresql://$(DATABASE_USER):$(DATABASE_PASSWORD)@$(DATABASE_HOST):5432/$(DATABASE_NAME)"
        - name: REDIS_URL
          value: "redis://$(REDIS_HOST):6379/$(REDIS_DB)"
        envFrom:
        - configMapRef:
            name: openclaw-config
        - secretRef:
            name: openclaw-secret
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
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
---
# k8s/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: openclaw-service
  namespace: openclaw
spec:
  selector:
    app: openclaw-app
  ports:
  - port: 80
    targetPort: 8000
  type: ClusterIP
---
# k8s/ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: openclaw-ingress
  namespace: openclaw
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  tls:
  - hosts:
    - openclaw.example.com
    secretName: openclaw-tls
  rules:
  - host: openclaw.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: openclaw-service
            port:
              number: 80
---
# k8s/postgres.yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
  namespace: openclaw
spec:
  serviceName: postgres
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
      - name: postgres
        image: postgres:15
        env:
        - name: POSTGRES_DB
          valueFrom:
            configMapKeyRef:
              name: openclaw-config
              key: DATABASE_NAME
        - name: POSTGRES_USER
          valueFrom:
            configMapKeyRef:
              name: openclaw-config
              key: DATABASE_USER
        - name: POSTGRES_PASSWORD
          valueFrom:
            secretKeyRef:
              name: openclaw-secret
              key: DATABASE_PASSWORD
        ports:
        - containerPort: 5432
        volumeMounts:
        - name: postgres-storage
          mountPath: /var/lib/postgresql/data
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1000m"
  volumeClaimTemplates:
  - metadata:
      name: postgres-storage
    spec:
      accessModes: ["ReadWriteOnce"]
      resources:
        requests:
          storage: 20Gi
---
# k8s/redis.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: redis
  namespace: openclaw
spec:
  replicas: 1
  selector:
    matchLabels:
      app: redis
  template:
    metadata:
      labels:
        app: redis
    spec:
      containers:
      - name: redis
        image: redis:7-alpine
        ports:
        - containerPort: 6379
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
```

# 部署
```bash
#!/bin/bash
# scripts/k8s-deploy.sh

set -e

NAMESPACE="openclaw"
ENVIRONMENT="production"

# 部署

# 检查kubectl
if ! command -v kubectl &> /dev/null; then
# 安裝
    exit 1
fi

# 創建
# 創建
kubectl create namespace $NAMESPACE --dry-run=client -o yaml | kubectl apply -f -

# 配置
# 配置
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secret.yaml

# 部署
# 部署
kubectl apply -f k8s/postgres.yaml
kubectl apply -f k8s/redis.yaml

# 數據
# 數據
kubectl wait --for=condition=ready pod -l app=postgres -n $NAMESPACE --timeout=300s
kubectl wait --for=condition=ready pod -l app=redis -n $NAMESPACE --timeout=300s

# 部署
# 部署
kubectl apply -f k8s/deployment.yaml

# 等待应用就绪
echo "⏳ 等待应用就绪..."
kubectl wait --for=condition=available deployment/openclaw-app -n $NAMESPACE --timeout=600s

# 暴露服务
echo "🌐 暴露服务..."
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/ingress.yaml

# 部署
# 部署
kubectl get all -n $NAMESPACE

# 健康检查
echo "🔍 健康检查..."
# 获取Ingress IP
INGRESS_IP=$(kubectl get ingress openclaw-ingress -n $NAMESPACE -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
if [ -n "$INGRESS_IP" ]; then
# 部署
    echo "🌐 访问地址: http://$INGRESS_IP"
    echo "🔒 HTTPS地址: https://openclaw.example.com"
else
# 部署
fi

# 數據
# 數據
kubectl exec -n $NAMESPACE deployment/openclaw-app -- alembic upgrade head

# 部署
```

## 监控与运维

# 配置
```yaml
# monitoring/prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'openclaw'
    static_configs:
      - targets: ['app:8000']
    metrics_path: '/metrics'
    scrape_interval: 10s

  - job_name: 'postgres'
    static_configs:
      - targets: ['postgres-exporter:9187']

  - job_name: 'redis'
    static_configs:
      - targets: ['redis-exporter:9121']

rule_files:
  - "/etc/prometheus/rules/*.yml"

alerting:
  alertmanagers:
    - static_configs:
        - targets:
          - alertmanager:9093
```

#### 2. Grafana仪表板
```json
{
  "dashboard": {
    "title": "OpenClaw监控面板",
    "panels": [
      {
        "title": "API请求率",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(http_requests_total[5m])",
            "legendFormat": "{{method}} {{endpoint}}"
          }
        ]
      },
      {
        "title": "响应时间",
        "type": "graph",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, http_request_duration_seconds_bucket)",
            "legendFormat": "95th percentile"
          }
        ]
      },
      {
        "title": "错误率",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(http_requests_errors_total[5m]) / rate(http_requests_total[5m])",
            "legendFormat": "错误率"
          }
        ]
      }
    ]
  }
}
```

# 管理

# 配置
```yaml
# logging/logging.yaml
version: 1
formatters:
  default:
    format: '%(asctime)s %(levelname)s %(name)s %(message)s'
  detailed:
    format: '%(asctime)s %(levelname)s %(name)s %(filename)s:%(lineno)d %(message)s'

handlers:
  console:
    class: logging.StreamHandler
    level: INFO
    formatter: default
    stream: ext://sys.stdout

  file:
    class: logging.handlers.RotatingFileHandler
    level: INFO
    formatter: detailed
    filename: /app/logs/openclaw.log
    maxBytes: 10485760
    backupCount: 5

loggers:
  openclaw:
    level: INFO
    handlers: [console, file]
    propagate: no

root:
  level: INFO
  handlers: [console]
```

#### 2. ELK日志收集
```yaml
# filebeat.yml
filebeat.inputs:
- type: container
  paths:
    - '/var/lib/docker/containers/*/*.log'
  processors:
    - add_docker_metadata:
        host: "unix:///var/run/docker.sock"

output.elasticsearch:
  hosts: ["elasticsearch:9200"]
  index: "openclaw-%{+yyyy.MM.dd}"

logging.level: info
logging.to_files: true
logging.files:
  path: /var/log/filebeat
  name: filebeat
  keepfiles: 7
  permissions: 0644
```

# 文檔

# 專案
# 設計
# 開發
# 開發
# 指南

---
# 創建
# 更新
# 分類