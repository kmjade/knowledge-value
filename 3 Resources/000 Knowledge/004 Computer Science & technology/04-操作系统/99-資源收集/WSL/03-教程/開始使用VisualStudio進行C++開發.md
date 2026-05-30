---
title: 開始使用 Visual Studio 進行 C++ 開發
aliases: [WSL C++, Visual Studio WSL]
tags: [wsl, visual-studio, cpp, development]
created: 2026-05-25
updated: 2026-05-25
status: active
source: https://learn.microsoft.com/zh-tw/windows/wsl/tutorials/wsl-cpp
---

# 開始使用 Visual Studio 進行 C++ 開發

> [!info] 說明
> 使用 Visual Studio 在 WSL 中進行 C++ 開發。

## 系統需求

- Visual Studio 2019 16.1+ 或 Visual Studio 2022
- Windows 10 1903+ 或 Windows 11
- WSL 2 已安裝並設定

## 設定 Visual Studio

### 安裝工作負載

1. 開啟 Visual Studio Installer
2. 選擇「使用 C++ 的 Linux 開發」工作負載

```mermaid
graph LR
    A[Visual Studio] --> B[Linux 開發工作負載]
    B --> C[連線管理員]
    C --> D[WSL 連線]
    D --> E[遠端開發]
```

### 連線到 WSL

1. 在 Visual Studio 中，選擇「工具」→「選項」
2. 展開「跨平台」→「連線管理員」
3. 新增連線，選擇「WSL」
4. 選擇已安裝的 Linux 發行版

## 專案設定

### 建立新專案

1. 「檔案」→「新增」→「專案」
2. 選擇「主控台應用程式」
3. 選擇「Linux」平台

### CMake 專案

```cmake
# CMakeLists.txt
cmake_minimum_required(VERSION 3.10)
project(MyProject)

set(CMAKE_CXX_STANDARD 17)

add_executable(myapp main.cpp)

# 如果使用 WSL 特定函式庫
target_link_libraries(myapp pthread)
```

### launch.vs.json

```json
{
    "version": "0.2.1",
    "defaults": {},
    "configurations": [
        {
            "type": "default",
            "project": "CMakeLists.txt",
            "projectTarget": "myapp",
            "name": "myapp"
        }
    ]
}
```

## WSL 端設定

### 安裝必要工具

```bash
# 安裝編譯工具
sudo apt update
sudo apt install build-essential gdb -y

# 安裝 CMake
sudo apt install cmake -y

# 安裝額外函式庫 (視需要)
sudo apt install libssl-dev libcurl4-openssl-dev -y
```

### 設定 SSH (如需要)

```bash
# 安裝 SSH 伺服器
sudo apt install openssh-server -y

# 啟動服務
sudo service ssh start

# 設定開機自動啟動
sudo systemctl enable ssh
```

## 除錯設定

### 遠端除錯

Visual Studio 會自動複製必要的除錯元件到 WSL。

```json
// launch.vs.json for debugging
{
    "version": "0.2.1",
    "configurations": [
        {
            "type": "cppdbg",
            "name": "Debug myapp",
            "project": "CMakeLists.txt",
            "program": "${debugInfo.fullTargetPath}",
            "args": [],
            "stopAtEntry": false,
            "cwd": "${debugInfo.defaultWorkingDirectory}",
            "environment": [],
            "pipeTransport": {
                "pipeProgram": "wsl.exe",
                "pipeArgs": ["-d", "Ubuntu"],
                "debuggerPath": "/usr/bin/gdb"
            }
        }
    ]
}
```

## 常見設定

### include 路徑

Visual Studio 會自動偵測 WSL 的 include 路徑。如需手動設定：

1. 專案屬性 → C/C++ → 一般
2. 設定「其他 Include 目錄」

### 編譯器選項

```json
// CMakeSettings.json
{
    "configurations": [
        {
            "name": "WSL-Debug",
            "generator": "Unix Makefiles",
            "configurationType": "Debug",
            "buildRoot": "${projectDir}\\out\\build\\${name}",
            "installRoot": "${projectDir}\\out\\install\\${name}",
            "cmakeCommandArgs": "",
            "buildCommandArgs": "",
            "ctestCommandArgs": "",
            "inheritEnvironments": [ "linux_x64" ],
            "wslPath": "${defaultWSLPath}"
        }
    ]
}
```

## 智慧感知

### 設定 IntelliSense

Visual Studio 會自動從 WSL 取得標頭檔以提供 IntelliSense。

### 程式碼導航

- `F12`: 移至定義
- `Ctrl+F12`: 移至宣告
- `Shift+F12`: 尋找所有參考

## 效能優化

### 檔案系統

> [!tip] 建議
> 將專案放在 WSL 檔案系統中 (`/home/user/projects/`) 而非 Windows 檔案系統。

### 複製標頭檔

Visual Studio 會快取 WSL 的標頭檔到 Windows，以改善 IntelliSense 效能。

## 疑難排解

### 連線失敗

```bash
# 檢查 WSL 狀態
wsl --status

# 確保 SSH 服務執行中
sudo service ssh status

# 檢查防火牆
sudo ufw status
```

### IntelliSense 問題

1. 刪除 `.vs` 資料夾
2. 關閉並重新開啟專案
3. 等待 IntelliSense 重新索引

### 編譯錯誤

```bash
# 檢查編譯器版本
g++ --version

# 檢查缺少的函式庫
ldd ./myapp
```

## 相關主題

- [[開始使用VSCode]] - VS Code C++ 開發
- [[設定GPU加速]] - CUDA 開發
- [[開始使用Linux和Bash]] - Linux 基礎

---
> 📚 返回 [[0 Inbox/_processed/01-Tech/WSL/00-MOCs/MOC-總覽|WSL 知識庫總覽]]
