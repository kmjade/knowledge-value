# Python Web應用程式專案示例
# Python Web Application Project Example

## 📋 專案描述 / Project Description

# 管理

This is a simple task management web application built with Flask, demonstrating Python development with OpenCode + Ollama.

## 🎯 學習目標 / Learning Objectives

- Flask Web框架應用程式
- RESTful API設計
- 資料庫整合
- 前端交互
# 配置

---

## 📁 專案结构 / Project Structure

```
flask_task_manager/
├── app.py                 # 主應用程式檔案
├── requirements.txt        # Python依赖
# 配置
├── models.py             # 數據模型
├── routes.py             # 路由定义
├── static/               # 静态檔案
│   ├── css/
│   ├── js/
│   └── images/
├── templates/            # HTML模板
│   ├── base.html
│   ├── index.html
│   ├── add_task.html
│   └── edit_task.html
├── tests/               # 測試檔案
│   ├── test_app.py
│   └── test_models.py
# 配置
├── .env                 # 環境变量
└── README.md            # 專案說明
```

---

## 🐍 使用OpenCode + Ollama生成代碼示例
# Code Generation Examples Using OpenCode + Ollama

### 示例1: 生成Flask基礎應用程式结构

**OpenCode提示词**:
```
# 管理
# 顯示
2. 新增新任務
3. 編輯任務
4. 刪除任務
# 管理
使用SQLAlchemy作为ORM，Bootstrap作为前端框架。
```

**预期輸出**:
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
# 管理
1. 響應式設計
2. 任務卡片展示
3. 新增任務表单
4. 編輯任務模态框
5. 狀態和優先級篩選
6. 现代化UI設計
```

**预期輸出**:
```html
<!-- templates/base.html -->
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
# 管理
    
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
# 管理
            </a>
            
            <div class="navbar-nav ms-auto">
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-outline-light" id="filterAll">
                        全部任務
                    </button>
                    <button type="button" class="btn btn-outline-light" id="filterPending">
                        待處理
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

    <!-- 新增任務按鈕 -->
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

### 示例3: 生成API測試代碼

**OpenCode提示词**:
```
# 管理
1. 所有API端点測試
2. 错误處理測試
3. 边界条件測試
4. 數據驗證測試
使用pytest框架
```

**预期輸出**:
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
    """測試主页访问"""
    response = client.get('/')
    assert response.status_code == 200
# 管理

def test_get_tasks_empty(client):
    """測試获取空任務列表"""
    response = client.get('/api/tasks')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data == []

def test_create_task_valid(client):
    """測試創建有效任務"""
    task_data = {
        'title': '測試任務',
        'description': '这是一个測試任務',
        'priority': 'high'
    }
    
    response = client.post('/api/tasks', 
                         data=json.dumps(task_data),
                         content_type='application/json')
    
    assert response.status_code == 201
    data = json.loads(response.data)
    assert data['title'] == '測試任務'
    assert data['priority'] == 'high'
    assert 'id' in data

def test_create_task_missing_title(client):
    """測試缺少标题的任務創建"""
    task_data = {
        'description': '没有标题的任務'
    }
    
    response = client.post('/api/tasks',
                         data=json.dumps(task_data),
                         content_type='application/json')
    
    assert response.status_code == 400
    data = json.loads(response.data)
    assert 'error' in data
    assert 'Title is required' in data['error']

def test_update_task(client):
# 更新
    # 先創建一个任務
    task = Task(title='原任務', description='原描述')
    db.session.add(task)
    db.session.commit()
    
    update_data = {
# 更新
        'status': 'completed'
    }
    
    response = client.put(f'/api/tasks/{task.id}',
                        data=json.dumps(update_data),
                        content_type='application/json')
    
    assert response.status_code == 200
    data = json.loads(response.data)
# 更新
    assert data['status'] == 'completed'

def test_delete_task(client):
    """測試刪除任務"""
    # 先創建一个任務
    task = Task(title='待刪除任務')
    db.session.add(task)
    db.session.commit()
    
    response = client.delete(f'/api/tasks/{task.id}')
    
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'Task deleted successfully' in data['message']

def test_get_nonexistent_task(client):
    """測試获取不存在的任務"""
    response = client.get('/api/tasks/99999')
    
    assert response.status_code == 404

if __name__ == '__main__':
    pytest.main([__file__])
```

---

# 指南

### 本地開發環境

**OpenCode提示词**:
```
# 配置
1. 虚拟環境設置
2. 依赖安裝
# 配置
4. 開發伺服器啟動
5. 資料庫初始化
```

```bash
#!/bin/bash
# setup_dev.sh

echo "🚀 設置Flask應用程式開發環境..."

# 1. 創建虚拟環境
python3 -m venv venv
source venv/bin/activate

# 2. 升級pip
pip install --upgrade pip

# 3. 安裝依赖
pip install flask flask-sqlalchemy pytest python-dotenv

# 4. 創建環境变量檔案
cat > .env << EOF
FLASK_APP=app.py
FLASK_ENV=development
SECRET_KEY=dev-secret-key-change-in-production
DATABASE_URL=sqlite:///tasks.db
EOF

# 5. 初始化資料庫
python3 -c "
from app import app, db
with app.app_context():
    db.create_all()
print('資料庫初始化完成')
"

# 6. 啟動開發伺服器
echo "啟動Flask開發伺服器..."
flask run --host=0.0.0.0 --port=5000 --debug
```

# 配置

**OpenCode提示词**:
```
# 配置
1. 多階段構建
2. 生产環境優化
3. 健康檢查
4. 資料庫整合
# 管理
```

```dockerfile
# Dockerfile
FROM python:3.11-slim as builder

WORKDIR /app

# 安裝依赖
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 生产階段
FROM python:3.11-slim as production

WORKDIR /app

# 複製依赖
COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin

# 複製應用程式代碼
COPY . .

# 創建非root使用者
RUN useradd --create-home --shell /bin/bash app
RUN chown -R app:app /app
USER app

# 暴露端口
EXPOSE 5000

# 健康檢查
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:5000/api/tasks || exit 1

# 啟動命令
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

## 📊 效能優化建議 / Performance Optimization

### OpenCode提示词示例:
```
# 分析
1. 資料庫查詢優化
2. 缓存策略
3. 异步處理
4. 静态檔案優化
5. 資料庫連接池
```

**预期優化代碼**:
```python
# optimized_app.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_caching import Cache
from werkzeug.contrib.fixers import ProxyFix
import os

app = Flask(__name__)

# 配置
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
    'pool_size': 10,
    'pool_recycle': 120,
    'pool_pre_ping': True
}

# 配置
cache = Cache(app, config={
    'CACHE_TYPE': 'redis',
    'CACHE_REDIS_URL': os.environ.get('REDIS_URL', 'redis://localhost:6379/0'),
    'CACHE_DEFAULT_TIMEOUT': 300
})

db = SQLAlchemy(app)

# 代理修復
app.wsgi_app = ProxyFix(app.wsgi_app)

# 缓存装饰器
@cache.memoize(timeout=300)
def get_task_statistics():
    """获取任務統計（缓存5分钟）"""
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
    """获取任務列表（缓存1分钟）"""
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

## 🧪 測試和品質保证 / Testing & Quality Assurance

### 使用OpenCode進行代碼審查

**提示词**:
```
審查Flask應用程式代碼，檢查以下方面：
1. 安全漏洞
2. 效能問題
3. 代碼規範
4. 错误處理
5. 可維護性
提供具体的改进建議和代碼示例。
```

### 自動化測試腳本

**OpenCode提示词**:
```
創建Flask應用程式的CI/CD測試腳本，包含：
1. 单元測試执行
2. 代碼覆盖率檢查
3. 安全漏洞扫描
# 分析
5. 依赖漏洞檢查
```

---

## 📚 學習要點總結 / Learning Points Summary

### Flask框架核心概念
- 路由和视图函数
- 模板渲染
- 请求和響應處理
# 管理
- 中间件使用

### 資料庫設計最佳實踐
- SQLAlchemy ORM使用
- 數據模型定义
- 关系設計
# 管理
- 查詢優化

### RESTful API設計
# 方法
- 狀態码規範
- 错误處理
# 版本
- 文檔生成

### 前端整合技巧
- Bootstrap組件使用
- AJAX请求處理
- 響應式設計
- 使用者體驗優化

# 部署
- Docker容器化
# 管理
- 日志和監控
- 效能優化
# 配置

---

> [!tip] 💡 最佳實踐建議 / Best Practice Tips
> 
> 1. **使用虚拟環境**隔离專案依赖
# 管理
> 3. **編寫全面測試**确保代碼品質
# 配置
# 更新
> 6. **監控生产環境**效能和错误
> 7. **文檔化**所有API端点和功能
> 8. **安全编码**防范常见漏洞

---

*這個示例展示了如何使用OpenCode + Ollama進行完整的Python Web應用程式開發*