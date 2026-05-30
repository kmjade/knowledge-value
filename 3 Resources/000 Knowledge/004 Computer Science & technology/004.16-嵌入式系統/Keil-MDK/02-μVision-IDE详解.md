---
aliases: [uVision IDE, Keil IDE, μVision5]
tags: [DDC/004.16, keil, uvision, ide]
---

# 02 μVision IDE 詳解 (μVision IDE Deep Dive)

## 專案結構 Project Structure

| 檔案 | 說明 |
|:-----|:-----|
| `*.uvprojx` | Project file (XML, μVision v5) |
| `*.uvoptx` | Project options / session (workspace layout) |
| `*.uvguix.*` | User-specific GUI settings |
| `*.sct` | Scatter-loading 腳本 (linker script) |
| `*.scvd` | Watch window variable file |

### 專案視窗組成 Project Windows

```
┌─────────────────────────────────────────────┐
│  Menu Bar: File Edit View Project Debug     │
│  Toolbar: [Build F7] [Debug Ctrl+F5] ...    │
├───────────┬────────────────┬────────────────┤
│  Project  │  Editor Window │  Target/       │
│  Tree     │  (source code) │  Registers     │
│  (groups) │                │  /Watch/       │
│           │                │  Memory        │
├───────────┴────────────────┴────────────────┤
│  Build Output / Error Messages               │
└─────────────────────────────────────────────┘
```

## 配置精靈 Configuration Wizard

使用 `Options for Target` (Alt+F7) 設定:

| 分頁 Tab | 關鍵設定 |
|:---------|:---------|
| **Target** | Xtal (MHz), ARM Compiler v5/v6, ST-Link 選項 |
| **Output** | HEX 檔生成 `Create HEX File` |
| **Listing** | Assembly listing, map file |
| **C/C++** | Optimization (-O0~-Ofast), defines, include paths |
| **Linker** | Scatter file (.sct), R/O/R/W Base |
| **Debug** | ULINK / ST-Link / J-Link, 初始化腳本 `.ini` |
| **Utilities** | Flash Download 算法 |

## 建置流程 Build Flow

```
Source Code (*.c/*.s)
    │
    ├── C Compiler (armclang -c)
    │   └── *.o
    ├── Assembler (armasm)
    │   └── *.o
    │
    ├── Linker (armlink + scatter file)
    │   └── *.axf (ELF executable)
    │
    └── FromELF (hex/bin)
        └── *.hex / *.bin
```

## 快捷鍵 Shortcuts (必記)

| 快捷鍵 | 功能 |
|:-------|:-----|
| **F7** | Build (編譯修改過的文件) |
| **Ctrl+F7** | Compile current file |
| **Ctrl+Alt+F7** | Rebuild All |
| **Ctrl+F5** | Start Debug Session |
| **F5** | Run (全速執行) |
| **F10** | Step Over (逐過程) |
| **F11** | Step Into (逐語句) |
| **Ctrl+F10** | Run to Cursor |
| **F9** | Toggle Breakpoint |
| **Ctrl+B** | Build Target |
| **Alt+F7** | Options for Target |

## 編輯器功能 Editor Features

- **Dynamic Syntax Checking** — 即時語法檢查 (紅波浪線)
- **Code Completion** — 結構體/枚舉成員自動補全
- **Go To Definition** (F12) — 跳轉到定義
- **Go To Reference** — 查找所有引用
- **Bookmarks** (Ctrl+F2) — 代碼書籤導航
- **Configuration Wizard** — `// <<< Use Configuration Wizard >>>` 註解配置介面
