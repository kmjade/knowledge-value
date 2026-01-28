# Python Web应用项目示例
# Python Web Application Project Example

## 📋 项目描述 / Project Description

这是一个使用Flask构建的简单任务管理Web应用，展示了如何使用OpenCode + Ollama进行Python开发。

This is a simple task management web application built with Flask, demonstrating Python development with OpenCode + Ollama.

## 🎯 学习目标 / Learning Objectives

- Flask Web框架应用
- RESTful API设计
- 数据库集成
- 前端交互
- 部署配置

---

## 📁 项目结构 / Project Structure

```
flask_task_manager/
├── app.py                 # 主应用文件
├── requirements.txt        # Python依赖
├── config.py             # 配置文件
├── models.py             # 数据模型
├── routes.py             # 路由定义
├── static/               # 静态文件
│   ├── css/
│   ├── js/
│   └── images/
├── templates/            # HTML模板
│   ├── base.html
│   ├── index.html
│   ├── add_task.html
│   └── edit_task.html
├── tests/               # 测试文件
│   ├── test_app.py
│   └── test_models.py
├── instance/            # 实例配置
├── .env                 # 环境变量
└── README.md            # 项目说明
```

---

## 🐍 使用OpenCode + Ollama生成代码示例
# Code Generation Examples Using OpenCode + Ollama

### 示例1: 生成Flask基础应用结构

**OpenCode提示词**:
```
创建一个Flask任务管理应用的基础结构，包含以下功能：
1. 任务列表显示
2. 添加新任务
3. 编辑任务
4. 删除任务
5. 任务状态管理
使用SQLAlchemy作为ORM，Bootstrap作为前端框架。
```

**预期输出**:
```python
# app.py
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-key')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///tasks.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    status = db.Column(db.String(20), default='pending')
    priority = db.Column(db.String(10), default='medium')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'status': self.status,
            'priority': self.priority,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

@app.route('/')
def index():
    tasks = Task.query.order_by(Task.created_at.desc()).all()
    return render_template('index.html', tasks=tasks)

@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.order_by(Task.created_at.desc()).all()
    return jsonify([task.to_dict() for task in tasks])

@app.route('/api/tasks', methods=['POST'])
def create_task():
    data = request.get_json()
    
    if not data or not 'title' in data:
        return jsonify({'error': 'Title is required'}), 400
    
    task = Task(
        title=data['title'],
        description=data.get('description', ''),
        priority=data.get('priority', 'medium')
    )
    
    db.session.add(task)
    db.session.commit()
    
    return jsonify(task.to_dict()), 201

@app.route('/api/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    task = Task.query.get_or_404(task_id)
    data = request.get_json()
    
    if 'title' in data:
        task.title = data['title']
    if 'description' in data:
        task.description = data['description']
    if 'status' in data:
        task.status = data['status']
    if 'priority' in data:
        task.priority = data['priority']
    
    task.updated_at = datetime.utcnow()
    db.session.commit()
    
    return jsonify(task.to_dict())

@app.route('/api/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    task = Task.query.get_or_404(task_id)
    db.session.delete(task)
    db.session.commit()
    
    return jsonify({'message': 'Task deleted successfully'})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
```

### 示例2: 生成前端模板

**OpenCode提示词**:
```
为Flask任务管理应用创建Bootstrap 5的前端模板，包含：
1. 响应式设计
2. 任务卡片展示
3. 添加任务表单
4. 编辑任务模态框
5. 状态和优先级筛选
6. 现代化UI设计
```

**预期输出**:
```html
<!-- templates/base.html -->
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{% block title %}任务管理系统{% endblock %}</title>
    
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <!-- 自定义CSS -->
    <link href="{{ url_for('static', filename='css/style.css') }}" rel="stylesheet">
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <a class="navbar-brand" href="{{ url_for('index') }}">
                <i class="fas fa-tasks"></i> 任务管理系统
            </a>
            
            <div class="navbar-nav ms-auto">
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-outline-light" id="filterAll">
                        全部任务
                    </button>
                    <button type="button" class="btn btn-outline-light" id="filterPending">
                        待处理
                    </button>
                    <button type="button" class="btn btn-outline-light" id="filterCompleted">
                        已完成
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <main class="container mt-4">
        {% block content %}{% endblock %}
    </main>

    <!-- 添加任务按钮 -->
    <button type="button" class="btn btn-primary btn-lg rounded-circle position-fixed bottom-0 end-0 m-4" 
            data-bs-toggle="modal" data-bs-target="#addTaskModal">
        <i class="fas fa-plus"></i>
    </button>

    <!-- Bootstrap 5 JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <!-- 自定义JS -->
    <script src="{{ url_for('static', filename='js/app.js') }}"></script>
    
    {% block scripts %}{% endblock %}
</body>
</html>
```

### 示例3: 生成API测试代码

**OpenCode提示词**:
```
为Flask任务管理API创建全面的测试用例，包含：
1. 所有API端点测试
2. 错误处理测试
3. 边界条件测试
4. 数据验证测试
使用pytest框架
```

**预期输出**:
```python
# tests/test_app.py
import pytest
import json
from app import app, db, Task

@pytest.fixture
def client():
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
            yield client
            db.drop_all()

def test_index_page(client):
    """测试主页访问"""
    response = client.get('/')
    assert response.status_code == 200
    assert b'任务管理系统' in response.data

def test_get_tasks_empty(client):
    """测试获取空任务列表"""
    response = client.get('/api/tasks')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data == []

def test_create_task_valid(client):
    """测试创建有效任务"""
    task_data = {
        'title': '测试任务',
        'description': '这是一个测试任务',
        'priority': 'high'
    }
    
    response = client.post('/api/tasks', 
                         data=json.dumps(task_data),
                         content_type='application/json')
    
    assert response.status_code == 201
    data = json.loads(response.data)
    assert data['title'] == '测试任务'
    assert data['priority'] == 'high'
    assert 'id' in data

def test_create_task_missing_title(client):
    """测试缺少标题的任务创建"""
    task_data = {
        'description': '没有标题的任务'
    }
    
    response = client.post('/api/tasks',
                         data=json.dumps(task_data),
                         content_type='application/json')
    
    assert response.status_code == 400
    data = json.loads(response.data)
    assert 'error' in data
    assert 'Title is required' in data['error']

def test_update_task(client):
    """测试更新任务"""
    # 先创建一个任务
    task = Task(title='原任务', description='原描述')
    db.session.add(task)
    db.session.commit()
    
    update_data = {
        'title': '更新后的任务',
        'status': 'completed'
    }
    
    response = client.put(f'/api/tasks/{task.id}',
                        data=json.dumps(update_data),
                        content_type='application/json')
    
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['title'] == '更新后的任务'
    assert data['status'] == 'completed'

def test_delete_task(client):
    """测试删除任务"""
    # 先创建一个任务
    task = Task(title='待删除任务')
    db.session.add(task)
    db.session.commit()
    
    response = client.delete(f'/api/tasks/{task.id}')
    
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'Task deleted successfully' in data['message']

def test_get_nonexistent_task(client):
    """测试获取不存在的任务"""
    response = client.get('/api/tasks/99999')
    
    assert response.status_code == 404

if __name__ == '__main__':
    pytest.main([__file__])
```

---

## 🚀 部署指南 / Deployment Guide

### 本地开发环境

**OpenCode提示词**:
```
创建Flask应用的开发环境配置脚本，包含：
1. 虚拟环境设置
2. 依赖安装
3. 环境变量配置
4. 开发服务器启动
5. 数据库初始化
```

```bash
#!/bin/bash
# setup_dev.sh

echo "🚀 设置Flask应用开发环境..."

# 1. 创建虚拟环境
python3 -m venv venv
source venv/bin/activate

# 2. 升级pip
pip install --upgrade pip

# 3. 安装依赖
pip install flask flask-sqlalchemy pytest python-dotenv

# 4. 创建环境变量文件
cat > .env << EOF
FLASK_APP=app.py
FLASK_ENV=development
SECRET_KEY=dev-secret-key-change-in-production
DATABASE_URL=sqlite:///tasks.db
EOF

# 5. 初始化数据库
python3 -c "
from app import app, db
with app.app_context():
    db.create_all()
print('数据库初始化完成')
"

# 6. 启动开发服务器
echo "启动Flask开发服务器..."
flask run --host=0.0.0.0 --port=5000 --debug
```

### Docker部署配置

**OpenCode提示词**:
```
创建Flask应用的Docker部署配置，包含：
1. 多阶段构建
2. 生产环境优化
3. 健康检查
4. 数据库集成
5. 环境变量管理
```

```dockerfile
# Dockerfile
FROM python:3.11-slim as builder

WORKDIR /app

# 安装依赖
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 生产阶段
FROM python:3.11-slim as production

WORKDIR /app

# 复制依赖
COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin

# 复制应用代码
COPY . .

# 创建非root用户
RUN useradd --create-home --shell /bin/bash app
RUN chown -R app:app /app
USER app

# 暴露端口
EXPOSE 5000

# 健康检查
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:5000/api/tasks || exit 1

# 启动命令
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "4", "app:app"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "5000:5000"
    environment:
      - FLASK_ENV=production
      - SECRET_KEY=${SECRET_KEY}
      - DATABASE_URL=postgresql://user:password@db:5432/taskdb
    depends_on:
      - db
    volumes:
      - ./instance:/app/instance
    restart: unless-stopped

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=taskdb
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
  instance:
```

---

## 📊 性能优化建议 / Performance Optimization

### OpenCode提示词示例:
```
分析Flask应用的性能瓶颈并提供优化建议，重点关注：
1. 数据库查询优化
2. 缓存策略
3. 异步处理
4. 静态文件优化
5. 数据库连接池
```

**预期优化代码**:
```python
# optimized_app.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_caching import Cache
from werkzeug.contrib.fixers import ProxyFix
import os

app = Flask(__name__)

# 性能优化配置
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
    'pool_size': 10,
    'pool_recycle': 120,
    'pool_pre_ping': True
}

# 缓存配置
cache = Cache(app, config={
    'CACHE_TYPE': 'redis',
    'CACHE_REDIS_URL': os.environ.get('REDIS_URL', 'redis://localhost:6379/0'),
    'CACHE_DEFAULT_TIMEOUT': 300
})

db = SQLAlchemy(app)

# 代理修复
app.wsgi_app = ProxyFix(app.wsgi_app)

# 缓存装饰器
@cache.memoize(timeout=300)
def get_task_statistics():
    """获取任务统计（缓存5分钟）"""
    total_tasks = Task.query.count()
    pending_tasks = Task.query.filter_by(status='pending').count()
    completed_tasks = Task.query.filter_by(status='completed').count()
    
    return {
        'total': total_tasks,
        'pending': pending_tasks,
        'completed': completed_tasks,
        'completion_rate': (completed_tasks / total_tasks * 100) if total_tasks > 0 else 0
    }

@app.route('/api/tasks')
@cache.cached(timeout=60, query_string=True)
def get_tasks():
    """获取任务列表（缓存1分钟）"""
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 20, type=int)
    
    tasks = Task.query.paginate(
        page=page, per_page=per_page, error_out=False
    )
    
    return jsonify({
        'tasks': [task.to_dict() for task in tasks.items],
        'total': tasks.total,
        'pages': tasks.pages,
        'current_page': tasks.page
    })
```

---

## 🧪 测试和质量保证 / Testing & Quality Assurance

### 使用OpenCode进行代码审查

**提示词**:
```
审查Flask应用代码，检查以下方面：
1. 安全漏洞
2. 性能问题
3. 代码规范
4. 错误处理
5. 可维护性
提供具体的改进建议和代码示例。
```

### 自动化测试脚本

**OpenCode提示词**:
```
创建Flask应用的CI/CD测试脚本，包含：
1. 单元测试执行
2. 代码覆盖率检查
3. 安全漏洞扫描
4. 代码质量分析
5. 依赖漏洞检查
```

---

## 📚 学习要点总结 / Learning Points Summary

### Flask框架核心概念
- 路由和视图函数
- 模板渲染
- 请求和响应处理
- 会话管理
- 中间件使用

### 数据库设计最佳实践
- SQLAlchemy ORM使用
- 数据模型定义
- 关系设计
- 迁移管理
- 查询优化

### RESTful API设计
- HTTP方法正确使用
- 状态码规范
- 错误处理
- API版本控制
- 文档生成

### 前端集成技巧
- Bootstrap组件使用
- AJAX请求处理
- 响应式设计
- 用户体验优化

### 部署和运维
- Docker容器化
- 环境配置管理
- 日志和监控
- 性能优化
- 安全配置

---

> [!tip] 💡 最佳实践建议 / Best Practice Tips
> 
> 1. **使用虚拟环境**隔离项目依赖
> 2. **环境变量管理**敏感配置信息
> 3. **编写全面测试**确保代码质量
> 4. **版本控制**所有配置文件
> 5. **定期更新**依赖包和框架
> 6. **监控生产环境**性能和错误
> 7. **文档化**所有API端点和功能
> 8. **安全编码**防范常见漏洞

---

*这个示例展示了如何使用OpenCode + Ollama进行完整的Python Web应用开发*