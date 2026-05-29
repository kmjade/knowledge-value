---
# 配置
status: active
priority: high
tags: [resource/tech/programming/python, python/setup, python/beginner]
aliases: [Python環境搭建]
created: 2026-02-01
---

# 配置

# 管理

# 配置

# 版本
|-----------|----------|----------|----------|
| Python解釋器 | 3.9+ | 基礎運行環境 | ⭐ |
# 管理
| 虚拟環境 | venv/conda | 專案隔离 | ⭐⭐ |
| 代碼編輯器 | VS Code/PyCharm | 開發工具 | ⭐⭐ |
# 管理

## 🐍 Python解釋器安裝

### Windows系統

# 方法
```bash
# 1. 下載Python安裝包
# 访问 https://python.org/downloads/
# 版本

# 2. 安裝步骤
# ✅ 勾选"Add Python to PATH"
# ✅ 選擇"Install for all users"
# ✅ 自定义安裝路徑（推荐C:\Python39）

# 3. 驗證安裝
python --version
pip --version
```

# 方法
```powershell
# 使用Chocolatey
choco install python

# 使用Scoop
scoop install python

# 使用winget
winget install Python.Python.3.9
```

### macOS系統

# 方法
```bash
# 1. 安裝Homebrew（如果没有）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. 安裝Python
brew install python@3.9

# 配置
echo 'export PATH="/usr/local/opt/python@3.9/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

# 方法
```bash
# 安裝pyenv
brew install pyenv

# 安裝Python 3.9
pyenv install 3.9.16

# 版本
pyenv global 3.9.16
```

### Linux系統

#### Ubuntu/Debian
```bash
# 管理
sudo apt update

# 安裝Python和相關工具
sudo apt install python3.9 python3.9-venv python3.9-dev python3-pip

# 創建符号連結
sudo ln -s /usr/bin/python3.9 /usr/bin/python
```

#### CentOS/RHEL/Fedora
```bash
# CentOS/RHEL
sudo yum install python39 python39-devel python3-pip

# Fedora
sudo dnf install python39 python39-devel python3-pip
```

# 管理

# 配置

# 配置
```bash
# 版本
pip install --upgrade pip

# 配置
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
pip config set global.trusted-host pypi.tuna.tsinghua.edu.cn

# 配置
pip config list
```

# 管理
```bash
# 生成依赖檔案
pip freeze > requirements.txt

# 安裝專案依赖
pip install -r requirements.txt

# 生成最小依赖檔案
pip install pipreqs
pipreqs --encoding=utf8 /path/to/project
```

# 配置

#### 安裝Anaconda
```bash
# 下載安裝包
# Windows: https://repo.anaconda.com/archive/Anaconda3-2023.09-0-Windows-x86_64.exe
# macOS: https://repo.anaconda.com/archive/Anaconda3-2023.09-0-MacOSX-x86_64.pkg
# Linux: https://repo.anaconda.com/archive/Anaconda3-2023.09-0-Linux-x86_64.sh

# 安裝后驗證
conda --version
python --version
```

#### Conda基礎命令
```bash
# 創建虚拟環境
conda create -n myenv python=3.9

# 激活環境
conda activate myenv

# 安裝包
conda install numpy pandas matplotlib

# 配置
conda env export > environment.yml

# 配置
conda env create -f environment.yml
```

# 管理

### venv（Python内置）
```bash
# 創建虚拟環境
python -m venv myenv

# Windows激活
myenv\Scripts\activate

# macOS/Linux激活
source myenv/bin/activate

# 查看
which python

# 停用環境
deactivate
```

# 管理
```bash
# 安裝poetry
curl -sSL https://install.python-poetry.org | python3

# 配置
export PATH="$HOME/.local/bin:$PATH"

# 創建新專案
poetry new myproject

# 安裝依赖
poetry install

# 激活環境
poetry shell

# 新增依赖
poetry add requests
```

# 配置

# 配置

#### 必装擴展
```json
{
  "recommendations": [
    "ms-python.python",
    "ms-python.black-formatter", 
    "ms-python.flake8",
    "ms-python.autopep8",
    "batisteo.vscode-django",
    "ms-vscode.powerShell"
  ]
}
```

# 配置
```json
{
  "python.defaultInterpreterPath": "python",
  "python.linting.enabled": true,
  "python.linting.flake8Enabled": true,
  "python.formatting.provider": "black",
  "python.testing.pytestEnabled": true,
  "python.testing.pytestArgs": ["tests"],
  "[python]": {
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.organizeImports": true
    }
  }
}
```

# 配置
```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Python: Current File",
            "type": "python",
            "request": "launch",
            "program": "${file}",
            "console": "integratedTerminal",
            "justMyCode": true
        }
    ]
}
```

# 配置

#### 環境設置
```python
# 專案創建步骤
# 1. File → New Project
# 2. 選擇Pure Python
# 配置
# 配置
# 5. 選擇"Previously configured interpreter"
# 6. 選擇安裝的Python解釋器
```

# 配置
```python
# 配置
# Settings → Editor → Code Style → Python
# - 設置缩进为4空格
# - 設置行长度为88
# - 启用PEP 8檢查
# 配置
```

# 管理

# 配置
```bash
# 配置
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 配置
echo "__pycache__/" >> .gitignore
echo "*.pyc" >> .gitignore
echo ".venv/" >> .gitignore
echo ".env" >> .gitignore
```

# 管理
```bash
# 安裝pyenv
curl https://pyenv.run | bash

# 安裝Python 3.8, 3.9, 3.10
pyenv install 3.8.16
pyenv install 3.9.16  
pyenv install 3.10.11

# 版本
echo "3.9.16" > .python-version

# 查看
pyenv versions
```

# 配置

# 配置
```bash
# 安裝Jupyter Lab
pip install jupyterlab

# 安裝常用擴展
pip install jupyterlab-language-pack-zh-CN

# 啟動Jupyter Lab
jupyter lab

# 配置
# 創建 ~/.jupyter/jupyter_lab_config.py
# 配置
```

### Docker環境（容器化開發）
```dockerfile
# Dockerfile示例
FROM python:3.9-slim

WORKDIR /app

# 複製依赖檔案
COPY requirements.txt .
RUN pip install -r requirements.txt

# 複製代碼
COPY . .

# 啟動命令
CMD ["python", "main.py"]
```

# 配置
```yaml
# docker-compose.yml
version: '3.8'

services:
  web:
    build: .
    volumes:
      - .:/app
    ports:
      - "8000:8000"
    environment:
      - FLASK_ENV=development
    command: python main.py
```

## 🔧 環境故障排除

### 常见問題及解決方案

#### 1. "python不是内部或外部命令"
```bash
# Windows解決方案
# 1. 檢查Python安裝路徑
where python

# 2. 手動新增到PATH
# 打開系統属性 → 環境变量 → 系統变量 → Path
# 新增: C:\Python39; C:\Python39\Scripts

# 3. 重新啟動命令提示符
```

#### 2. pip缓慢或失败
```bash
# 更换为国内镜像源
pip install -i https://pypi.douban.com/simple/ package-name

# 配置
pip config set global.index-url https://pypi.douban.com/simple/
```

#### 3. 依赖冲突
```bash
# 查看
pip list

# 版本
pip install --upgrade pip

# 重新安裝環境
pip uninstall -r requirements.txt -y
pip install -r requirements.txt
```

#### 4. 虚拟環境不激活
```bash
# Windows PowerShell执行策略問題
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# 或者使用PowerShell Core
# 下載Windows Terminal并使用PowerShell 7+
```

## 📚 推荐工具和外掛

### 瀏覽器擴展
- **Python Docs**：快速尋找Python文檔
- **Python Tutor**：可视化代碼执行
- **Online Python**：線上Python運行環境

### 命令行工具
```bash
# 安裝有用的全局工具
pip install ipython           # 交互式Python
pip install black           # 代碼格式化
pip install flake8          # 代碼檢查
pip install mypy            # 类型檢查
pip install pytest          # 測試框架
```

### IDE外掛推荐
- **GitLens**：GitHub代碼可视化
- **Python Docstring Generator**：自動生成文檔字符串
- **Tabnine**：AI代碼自動补全
# 顯示

## 🎯 下一步學習路徑

# 配置

### 📈 建議學習顺序
1. [[基礎语法与數據类型]] - 掌握Python基礎语法
2. [[控制流与函数]] - 學習程式逻辑控制
# 管理
4. [[面向对象編程]] - 进阶到面向对象思维

### 💡 學習建議
- **代碼實踐**：每个概念都要写代碼驗證
- **循序渐进**：不要跳跃學習，打好基礎
- **善用工具**：充分利用IDE和除錯工具
# 知識

---

## 🧪 測試你的安裝

# 配置

```python
# 環境測試腳本
import sys
import platform
import requests

# 版本
print(f"系統平台: {platform.platform()}")

# 測試常用库
try:
    import numpy as np
# 版本
except ImportError:
    print("NumPy未安裝，可使用: pip install numpy")

# 測試網路请求
try:
    response = requests.get("https://python.org")
    print("網路連接正常")
except Exception as e:
    print(f"網路問題: {e}")

# 配置
```

## 🔗 相關資源

# 配置
# 指南
# 管理

---
# 更新
*分類: 3 Resources*