---
title: IOTO Dashboard
aliases:
  - IOTO 儀表板
  - IOTO 生產大屏
  - IOTO 工作台
para: resource
domain:
  - "[[IOTO]]"
subtopic:
  - 插件使用
tags:
  - para/resource/tech
  - topic/ioto
  - type/guide
  - difficulty/beginner
created: 2026-05-23
modified: 2026-05-23
---

# IOTO Dashboard

> [!summary] 概述
> IOTO Dashboard 是 IOTO 框架的核心插件，提供可視化界面管理和追蹤 IOTO 工作流，讓知識資產分布和狀態一目了然。

---

## 插件信息

> [!info] 基本信息
> - **插件 ID**: `ioto-dashboard`
> - **作者**: Obsidian
> - **最低版本**: Obsidian 0.15.0
> - **跨平台**: ✅ 支持
> - **許可證**: BSD Zero Clause License (0BSD)

### 版本信息

| 項目 | 信息 |
|------|------|
| **最新版本** | v2.0.3 |
| **發布日期** | 2026-03-23 |
| **GitHub** | [shawndotty/ioto-dashboard](https://github.com/shawndotty/ioto-dashboard) |

### 統計數據

| 指標 | 數值 |
|------|------|
| ⭐ Stars | 1 |
| 🍴 Forks | 0 |
| 📥 下載量 | 214+ |

---

## 核心功能

### 工作流導航

輕鬆在 IOTO 四個階段之間切換：
- 📥 **Input** - 輸入階段
- 📤 **Output** - 輸出階段
- 📅 **Task** - 任務階段
- 🎯 **Outcome** - 成果階段

### 雙視圖模式

| 視圖 | 功能 |
|------|------|
| **Notes View** | 瀏覽工作流文件夾中的文件，顯示元數據（項目、日期） |
| **Tasks View** | 聚合任務文件夾中的任務，按類別標題分類過濾 |

### 高級過濾功能

| 過濾器 | 說明 |
|--------|------|
| **名稱/內容過濾** | 按文件名或內容搜索 |
| **Project Filter** | 按項目過濾，支持自動完成 |
| **Date Filter** | 按創建/修改日期過濾，支持日期範圍 |
| **Task Status** | 按完成/未完成狀態過濾任務 |
| **Subject 過濾** | v2.0.3 新增，按主題過濾 |

### 多語言支持

- 🇺🇸 English
- 🇨🇳 简体中文
- 🇹🇼 繁體中文

---

## 安裝指南

### 方法一：Obsidian 社區插件市場

1. 打開 **設置** → **第三方插件**
2. 關閉「安全模式」
3. 點擊 **瀏覽** 搜索「IOTO Dashboard」
4. 點擊 **安裝** → **啟用**

### 方法二：手動安裝

從 [GitHub Releases](https://github.com/shawndotty/ioto-dashboard/releases/latest) 下載：

| 文件 | 說明 | 大小 |
|------|------|------|
| [main.js](https://github.com/shawndotty/ioto-dashboard/releases/download/v2.0.3/main.js) | 主腳本 | 96 KB |
| [manifest.json](https://github.com/shawndotty/ioto-dashboard/releases/download/v2.0.3/manifest.json) | 插件清單 | 294 B |
| [styles.css](https://github.com/shawndotty/ioto-dashboard/releases/download/v2.0.3/styles.css) | 樣式文件 | 7.3 KB |
| [ioto-dashboard.zip](https://github.com/shawndotty/ioto-dashboard/releases/download/v2.0.3/ioto-dashboard.zip) | 完整包 | 21 KB |

---

## 配置設置

進入 **設置 > IOTO Dashboard** 配置文件夾路徑：

| 設置項 | 默認值 | 說明 |
|--------|--------|------|
| **Input Folder** | `1-Input` | 輸入文件夾路徑 |
| **Output Folder** | `2-Output` | 輸出文件夾路徑 |
| **Outcome Folder** | `4-Outcome` | 成果文件夾路徑 |
| **Task Folder** | `3-Task` | 任務筆記存儲文件夾 |

---

## 使用方法

### 打開 Dashboard

**方法一**：點擊側邊欄的 **Dashboard 圖標**

**方法二**：使用命令面板
```
Ctrl/Cmd + P → 搜索 "IOTO Dashboard: Open Dashboard"
```

### 任務聚合邏輯

插件掃描 **Task Folder** 中的文件，根據特定標題分類任務：

| 類別 | 標題 | 說明 |
|------|------|------|
| **Input** | `輸入 LEARN` | 學習相關任務 |
| **Output** | `輸出 THINK` | 思考輸出任務 |
| **Outcome** | `成果 DO` | 行動成果任務 |

> [!tip] 提示
> 標題匹配不區分大小寫，支持中英文混合。

---

## 界面展示

### Dashboard 結構

```
┌─────────────────────────────────────┐
│  IOTO Dashboard                     │
├─────────────────────────────────────┤
│  [Input] [Output] [Task] [Outcome]  │  ← 工作流切換
├─────────────────────────────────────┤
│  過濾器:                            │
│  ├── 名稱搜索: [_______]            │
│  ├── 項目: [選擇項目 ▼]             │
│  ├── 日期: [日期範圍]                │
│  └── 狀態: [全部 ▼]                 │
├─────────────────────────────────────┤
│  📝 筆記視圖  |  ✅ 任務視圖         │  ← 視圖切換
├─────────────────────────────────────┤
│  文件/任務列表...                    │
│                                     │
└─────────────────────────────────────┘
```

---

## 更新日誌

### v2.0.3 (2026-03-23)

- 🎉 支持 Subject 過濾

### 歷史版本

| 版本 | 日期 | 說明 |
|------|------|------|
| v2.0.3 | 2026-03-23 | 支持 Subject 過濾 |
| v2.0.2 | - | 穩定版本 |

---

## 常見問題

### Q: Dashboard 顯示空白？

1. 檢查文件夾路徑配置是否正確
2. 確認對應文件夾中存在文件
3. 嘗試刷新 Dashboard

### Q: 任務沒有正確分類？

確認任務筆記中使用了正確的標題格式：
- `輸入 LEARN`
- `輸出 THINK`
- `成果 DO`

### Q: 項目過濾器沒有選項？

項目列表從筆記的 frontmatter 中讀取，確保筆記包含 `project` 字段。

---

## 相關鏈接

- [[IOTO Update]] - 框架更新插件
- [[Template Generator]] - 模板生成器
- [[../插件体系]] - 插件體系總覽
- [[../../99-资源收集/官方文档]] - 官方文檔資源
- [[../../IOTO]] - 返回 IOTO 首頁

---

## 外部鏈接

- [GitHub 倉庫](https://github.com/shawndotty/ioto-dashboard)
- [問題反饋](https://github.com/shawndotty/ioto-dashboard/issues)
