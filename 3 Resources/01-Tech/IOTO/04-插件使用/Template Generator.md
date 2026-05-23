---
title: Template Generator
aliases:
  - IOTO Template Generator
  - 模板生成器
  - IOTO 模板编辑器
para: resource
domain:
  - "[[IOTO]]"
subtopic:
  - 插件使用
tags:
  - para/resource/tech
  - topic/ioto
  - type/guide
  - difficulty/intermediate
created: 2026-05-23
modified: 2026-05-23
---

# Template Generator

> [!summary] 概述
> Template Generator 是 IOTO 框架的增強插件，提供可視化界面創建和管理個人模板，讓用戶無需編寫代碼即可定制專屬模板。

---

## 插件信息

> [!info] 基本信息
> - **插件 ID**: `ioto-template-generator`
> - **作者**: Obsidian
> - **最低版本**: Obsidian 0.15.0
> - **跨平台**: ✅ 支持
> - **許可證**: BSD Zero Clause License (0BSD)

### 版本信息

| 項目 | 信息 |
|------|------|
| **最新版本** | v2.0.5 |
| **發布日期** | 2026-04-17 |
| **GitHub** | [shawndotty/ioto-template-generator](https://github.com/shawndotty/ioto-template-generator) |

### 統計數據

| 指標 | 數值 |
|------|------|
| ⭐ Stars | 2 |
| 🍴 Forks | 0 |
| 📥 下載量 | 46+ |

---

## 核心功能

### 主要功能

| 功能 | 說明 |
|------|------|
| **可視化編輯** | 圖形界面創建模板，無需編寫代碼 |
| **自定義模板** | 創建專屬的筆記模板 |
| **模板管理** | 統一管理所有 IOTO 模板 |
| **快捷鍵配置** | 自動關聯模板與快捷鍵 |
| **Plan 模式支持** | v2.0.5 新增，支持計劃模式模板 |

### 功能詳解

#### 可視化模板編輯

```
Template Generator
├── 模板類型選擇
│   ├── 項目模板
│   ├── 筆記模板
│   └── 任務模板
│
├── 模板內容編輯
│   ├── Frontmatter 配置
│   ├── 正文結構設計
│   └── 變量插入
│
└── 模板預覽與保存
```

#### 模板類型

| 模板類型 | 用途 |
|----------|------|
| 項目模板 | 創建新項目時自動生成結構 |
| 筆記模板 | 不同類型筆記的格式模板 |
| 任務模板 | 任務追蹤和管理模板 |
| Plan 模式 | v2.0.5 新增，計劃與規劃模板 |

---

## 安裝指南

### 方法一：Obsidian 社區插件市場

1. 打開 **設置** → **第三方插件**
2. 關閉「安全模式」
3. 點擊 **瀏覽** 搜索「IOTO Template Generator」
4. 點擊 **安裝** → **啟用**

### 方法二：手動安裝

從 [GitHub Releases](https://github.com/shawndotty/ioto-template-generator/releases/latest) 下載：

| 文件 | 說明 | 大小 |
|------|------|------|
| [main.js](https://github.com/shawndotty/ioto-template-generator/releases/download/v2.0.5/main.js) | 主腳本 | 276 KB |
| [manifest.json](https://github.com/shawndotty/ioto-template-generator/releases/download/v2.0.5/manifest.json) | 插件清單 | 322 B |
| [styles.css](https://github.com/shawndotty/ioto-template-generator/releases/download/v2.0.5/styles.css) | 樣式文件 | 17 KB |
| [ioto-template-generator.zip](https://github.com/shawndotty/ioto-template-generator/releases/download/v2.0.5/ioto-template-generator.zip) | 完整包 | 71 KB |

**安裝步驟**：
1. 下載 `main.js`、`manifest.json`、`styles.css`
2. 放入 `.obsidian/plugins/ioto-template-generator/` 目錄
3. 重啟 Obsidian 並啟用插件

---

## 使用方法

### 創建新模板

```
1. 打開命令面板 (Ctrl/Cmd + P)
2. 輸入 "Template Generator"
3. 選擇「新建模板」
4. 選擇模板類型
5. 在可視化界面編輯模板內容
6. 保存並配置快捷鍵
```

### 編輯現有模板

1. 打開 Template Generator 面板
2. 選擇要編輯的模板
3. 修改模板內容
4. 保存更改

### 模板變量

支持在模板中插入動態變量：

| 變量 | 說明 |
|------|------|
| `{{title}}` | 筆記標題 |
| `{{date}}` | 當前日期 |
| `{{time}}` | 當前時間 |
| `{{folder}}` | 當前文件夾路徑 |

---

## 更新日誌

### v2.0.5 (2026-04-17)

- 🎉 增加對 Plan 模式的支持

### 歷史版本

| 版本 | 日期 | 說明 |
|------|------|------|
| v2.0.5 | 2026-04-17 | 增加 Plan 模式支持 |
| v2.0.4 | - | 穩定版本 |

---

## 常見問題

### Q: 如何導入已有的模板？

Template Generator 支持導入標準 Markdown 模板文件，將 `.md` 文件放入模板目錄後重新加載即可。

### Q: 模板與快捷鍵如何關聯？

在模板設置中可以配置快捷鍵，保存後自動在 Obsidian 快捷鍵設置中生效。

### Q: 創建的模板存儲在哪裡？

模板默認存儲在 `0-輔助/IOTO/Templates/MyIOTO/` 目錄下。

---

## 相關鏈接

- [[IOTO Update]] - 框架更新插件
- [[../插件体系]] - 插件體系總覽
- [[../../99-资源收集/官方文档]] - 官方文檔資源
- [[../../IOTO]] - 返回 IOTO 首頁

---

## 外部鏈接

- [GitHub 倉庫](https://github.com/shawndotty/ioto-template-generator)
- [問題反饋](https://github.com/shawndotty/ioto-template-generator/issues)
