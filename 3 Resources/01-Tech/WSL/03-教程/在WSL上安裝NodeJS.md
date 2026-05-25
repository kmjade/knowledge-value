---
title: 在 WSL 上安裝 NodeJS
aliases: [WSL Node.js, Node.js on WSL]
tags: [wsl, nodejs, javascript, development]
created: 2026-05-25
updated: 2026-05-25
status: active
source: https://learn.microsoft.com/zh-tw/windows/wsl/tutorials/nodejs
---

# 在 WSL 上安裝 NodeJS

> [!info] 說明
> 在 WSL 中設定 Node.js 開發環境。

## 安裝方式比較

```mermaid
graph TD
    A[Node.js 安裝方式] --> B[nvm]
    A --> C[n]
    A --> D[apt]
    A --> E[Volta]

    B --> B1[推薦 - 版本管理]
    C --> C1[簡單 - 版本管理]
    D --> D1[不推薦 - 版本舊]
    E --> E1[新選擇 - 自動切換]
```

## 方法一：使用 nvm (推薦)

### 安裝 nvm

```bash
# 使用 curl 安裝
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 或使用 wget
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 重新載入設定
source ~/.bashrc
# 或
source ~/.zshrc

# 驗證安裝
nvm --version
```

### 安裝 Node.js

```bash
# 安裝最新 LTS 版本
nvm install --lts

# 安裝特定版本
nvm install 20.10.0
nvm install 18.19.0

# 查看已安裝版本
nvm list

# 查看可安裝版本
nvm ls-remote

# 設定預設版本
nvm alias default 20.10.0

# 使用特定版本
nvm use 18
```

### 每個專案使用不同版本

```bash
# 在專案根目錄建立 .nvmrc
echo "18.19.0" > .nvmrc

# 使用該版本
nvm use
# 或自動切換 (需要設定 shell hook)
```

## 方法二：使用 n

### 安裝 n

```bash
# 安裝 n
curl -L https://git.io/n-install | bash

# 或透過 npm
npm install -g n
```

### 使用 n

```bash
# 安裝最新版本
n latest

# 安裝 LTS 版本
n lts

# 安裝特定版本
n 20.10.0

# 列出已安裝版本
n ls

# 切換版本
n
```

## 方法三：使用 Volta

### 安裝 Volta

```bash
# 安裝 Volta
curl https://get.volta.sh | bash

# 重新載入 shell
source ~/.bashrc
```

### 使用 Volta

```bash
# 安裝 Node.js
volta install node@20

# 安裝特定版本
volta install node@18.19.0

# 安裝套件管理工具
volta install yarn
volta install pnpm

# 專案固定版本 (在 package.json 中自動設定)
volta pin node@18
```

## 套件管理工具

### npm

```bash
# 更新 npm
npm install -g npm@latest

# 常用命令
npm init
npm install
npm install package-name
npm install -D package-name
npm run script-name
```

### Yarn

```bash
# 安裝 Yarn
npm install -g yarn

# 或使用 Corepack (Node.js 16.10+)
corepack enable
corepack prepare yarn@stable --activate

# 常用命令
yarn init
yarn
yarn add package-name
yarn add -D package-name
yarn script-name
```

### pnpm

```bash
# 安裝 pnpm
npm install -g pnpm

# 或使用 Corepack
corepack enable
corepack prepare pnpm@latest --activate

# 常用命令
pnpm init
pnpm install
pnpm add package-name
pnpm add -D package-name
pnpm script-name
```

## 開發工具

### 全域安裝常用工具

```bash
# TypeScript
npm install -g typescript

# ESLint
npm install -g eslint

# Prettier
npm install -g prettier

# Nodemon
npm install -g nodemon

# PM2 (生產環境程序管理)
npm install -g pm2

# Nx (Monorepo 工具)
npm install -g nx
```

## VS Code 整合

### 安裝擴充功能

```bash
code --install-extension ms-vscode.js-debug
code --install-extension esbenp.prettier-vscode
code --install-extension dbaeumer.vscode-eslint
code --install-extension usernamehw.errorlens
```

### 設定檔

```json
// .vscode/settings.json
{
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": "explicit"
    },
    "typescript.preferences.importModuleSpecifier": "relative"
}
```

### launch.json

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "skipFiles": ["<node_internals>/**"],
            "program": "${workspaceFolder}/src/index.js"
        },
        {
            "type": "node",
            "request": "launch",
            "name": "Debug Jest Tests",
            "runtimeExecutable": "npm",
            "runtimeArgs": ["test", "--", "--runInBand"],
            "console": "integratedTerminal"
        }
    ]
}
```

## 效能優化

### npm 快取

```bash
# 設定 npm 快取
npm config set cache ~/.npm-cache

# 清除快取
npm cache clean --force
```

### pnpm 優勢

```bash
# pnpm 使用硬連結，節省磁碟空間
pnpm install

# 查看儲存位置
pnpm store path

# 清理未使用的套件
pnpm store prune
```

## 常見問題

### 權限問題

```bash
# 修改 npm 預設目錄
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'

# 加入 PATH
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

### node-gyp 編譯問題

```bash
# 安裝編譯工具
sudo apt install build-essential python3 -y

# 設定 Python 版本
npm config set python python3
```

### 網路問題

```bash
# 使用淘寶鏡像 (中國大陸)
npm config set registry https://registry.npmmirror.com

# 或使用 nrm 管理
npm install -g nrm
nrm use taobao
```

## 完整設定腳本

```bash
#!/bin/bash
# setup-node.sh

# 安裝 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc

# 安裝 Node.js LTS
nvm install --lts
nvm use --lts
nvm alias default lts/*

# 更新 npm
npm install -g npm@latest

# 安裝常用全域工具
npm install -g yarn pnpm typescript eslint prettier nodemon

# 驗證安裝
echo "Node.js: $(node -v)"
echo "npm: $(npm -v)"
echo "yarn: $(yarn -v)"
```

## 相關主題

- [[設定最佳實務做法]] - 開發環境設定
- [[開始使用VSCode]] - VS Code 整合
- [[開始使用Git]] - Git 設定

---
> 📚 返回 [[../00-MOCs/MOC-總覽|WSL 知識庫總覽]]
