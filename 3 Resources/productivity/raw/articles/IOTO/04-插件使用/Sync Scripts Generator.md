---
title: Sync Scripts Generator
aliases:
  - IOTO Sync Script Generator
  - 同步腳本生成器
  - IOTO 同步配置引擎
para: resource
domain:
  - "[[IOTO]]"
subtopic:
  - 插件使用
tags:
  - para/resource/tech
  - topic/ioto
  - type/guide
  - difficulty/advanced
created: 2026-05-23
modified: 2026-05-23
---

# Sync Scripts Generator

> [!summary] 概述
> Sync Scripts Generator 是 IOTO 框架的增強插件，用於生成同步腳本，支持 Notion、OB Sync With MDB 等多平台同步配置，打通 Obsidian 與雲端數據庫的聯動通道。

---

## 插件信息

> [!info] 基本信息
> - **插件 ID**: `sync-script-generator`
> - **作者**: Johnny Learns
> - **最低版本**: Obsidian 0.15.0
> - **跨平台**: ✅ 支持
> - **許可證**: BSD Zero Clause License (0BSD)

### 版本信息

| 項目 | 信息 |
|------|------|
| **最新版本** | v2.0.7 |
| **發布日期** | 2026-04-24 |
| **GitHub** | [shawndotty/sync-script-generator](https://github.com/shawndotty/sync-script-generator) |

### 統計數據

| 指標 | 數值 |
|------|------|
| ⭐ Stars | 1 |
| 🍴 Forks | 0 |
| 📥 下載量 | 552+ |

---

## 核心功能

### 主要功能

| 功能 | 說明 |
|------|------|
| **同步腳本生成** | 為 IOTO 和 OB Sync With MDB 生成同步腳本 |
| **Notion 同步** | 支持 Notion 數據庫同步 |
| **多工作空間支持** | v2.0.7 新增，支持 Notion 多工作空間同步 |
| **高階同步配置** | 細粒度控制同步規則 |
| **自定義同步規則** | 按需配置同步策略 |

### 支持的同步平台

| 平台 | 說明 |
|------|------|
| **Notion** | 支持 Notion 數據庫雙向同步 |
| **OB Sync With MDB** | 支持 OB Sync With MDB 同步配置 |

---

## 安裝指南

### 方法一：Obsidian 社區插件市場

1. 打開 **設置** → **第三方插件**
2. 關閉「安全模式」
3. 點擊 **瀏覽** 搜索「Sync Script Generator」
4. 點擊 **安裝** → **啟用**

### 方法二：手動安裝

從 [GitHub Releases](https://github.com/shawndotty/sync-script-generator/releases/latest) 下載：

| 文件 | 說明 | 大小 |
|------|------|------|
| [main.js](https://github.com/shawndotty/sync-script-generator/releases/download/v2.0.7/main.js) | 主腳本 | 546 KB |
| [manifest.json](https://github.com/shawndotty/sync-script-generator/releases/download/v2.0.7/manifest.json) | 插件清單 | 364 B |
| [styles.css](https://github.com/shawndotty/sync-script-generator/releases/download/v2.0.7/styles.css) | 樣式文件 | 17.5 KB |
| [sync-script-generator.zip](https://github.com/shawndotty/sync-script-generator/releases/download/v2.0.7/sync-script-generator.zip) | 完整包 | 104 KB |

**安裝步驟**：
1. 下載 `main.js`、`manifest.json`、`styles.css`
2. 放入 `.obsidian/plugins/sync-script-generator/` 目錄
3. 重啟 Obsidian 並啟用插件

---

## 使用方法

### 配置 Notion 同步

```
1. 打開插件設置
2. 配置 Notion API Token
3. 選擇目標數據庫
4. 設置字段映射規則
5. 生成同步腳本
6. 執行同步
```

### 多工作空間配置

v2.0.7 新增多工作空間支持，可以：
- 配置多個 Notion 工作空間
- 為不同工作空間設置不同的同步規則
- 在多個數據庫之間同步數據

---

## 同步流程

```
┌─────────────────────────────────────┐
│     Sync Scripts Generator          │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────┐    ┌──────────────┐   │
│  │ Obsidian│ ←→ │ Sync Scripts │   │
│  └─────────┘    └──────────────┘   │
│                       │             │
│                       ↓             │
│  ┌─────────┐    ┌──────────────┐   │
│  │  Notion │ ←→ │ OB Sync MDB  │   │
│  └─────────┘    └──────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

---

## 更新日誌

### v2.0.7 (2026-04-24)

- 🎉 增加 Notion 多工作空間同步的支持

### 歷史版本

| 版本 | 日期 | 說明 |
|------|------|------|
| v2.0.7 | 2026-04-24 | 增加 Notion 多工作空間同步支持 |
| v2.0.6.1 | - | 穩定版本 |

---

## 常見問題

### Q: Notion API Token 如何獲取？

1. 登錄 Notion
2. 進入 Settings → Integrations
3. 創建新的 Integration
4. 複製 Internal Integration Token

### Q: 同步失敗怎麼辦？

1. 檢查 API Token 是否正確
2. 確認數據庫共享給 Integration
3. 檢查網絡連接
4. 查看控制台錯誤日誌

### Q: 如何配置多工作空間？

在插件設置中添加多個工作空間配置，每個工作空間使用不同的 API Token 和數據庫 ID。

---

## 相關鏈接

- [[IOTO Update]] - 框架更新插件
- [[Template Generator]] - 模板生成器
- [[IOTO Dashboard]] - 生產大屏
- [[../插件体系]] - 插件體系總覽
- [[../../99-资源收集/官方文档]] - 官方文檔資源
- [[../../IOTO]] - 返回 IOTO 首頁

---

## 外部鏈接

- [GitHub 倉庫](https://github.com/shawndotty/sync-script-generator)
- [問題反饋](https://github.com/shawndotty/sync-script-generator/issues)
- [Notion API 文檔](https://developers.notion.com/)
