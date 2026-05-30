---
title: IOTO Update
aliases:
  - IOTO Update Plugin
  - IOTO 更新插件
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

# IOTO Update

> [!summary] 概述
> IOTO Update 是 IOTO 框架的核心插件，用於更新 IOTO Framework 和個人同步模板，確保生產環境始終保持最新狀態。

---

## 插件信息

> [!info] 基本信息
> - **插件 ID**: `ioto-update`
> - **作者**: Johnny
> - **最低版本**: Obsidian 0.15.0
> - **跨平台**: ✅ 支持
> - **許可證**: BSD Zero Clause License (0BSD)

### 版本信息

| 項目 | 信息 |
|------|------|
| **最新版本** | v2.0.7 |
| **發布日期** | 2026-04-24 |
| **GitHub** | [shawndotty/ioto-update](https://github.com/shawndotty/ioto-update) |
| **贊助作者** | [Bilibili](https://space.bilibili.com/432408734) |

### 統計數據

| 指標 | 數值 |
|------|------|
| ⭐ Stars | 21 |
| 🍴 Forks | 4 |
| 📥 下載量 | 2,937+ |

---

## 核心功能

### 主要功能

| 功能 | 說明 |
|------|------|
| **更新 IOTO Framework** | 一鍵更新框架到最新版本 |
| **更新同步模板** | 同步個人模板配置到最新 |
| **一鍵下載** | 模板、腳本、CSS 片段批量下載 |
| **熱更新** | 無需重啟即可應用更新 |
| **樣式注入** | 自動應用 IOTO 樣式到筆記 |
| **插件管理** | 確保依賴插件正確安裝 |

### 功能詳解

#### 更新 IOTO Framework

```
插件 → IOTO Update → 更新框架
                    ↓
              下載最新模板
                    ↓
              更新腳本文件
                    ↓
              注入 CSS 樣式
```

#### 更新同步模板

支持多種同步場景：
- Notion 同步 ✅ (v2.0.7 優化)
- 個人模板同步
- 腳本配置同步

---

## 安裝指南

### 方法一：Obsidian 社區插件市場

1. 打開 **設置** → **第三方插件**
2. 關閉「安全模式」
3. 點擊 **瀏覽** 搜索「IOTO Update」
4. 點擊 **安裝** → **啟用**

### 方法二：手動安裝

從 [GitHub Releases](https://github.com/shawndotty/ioto-update/releases/latest) 下載：

| 文件 | 說明 | 大小 |
|------|------|------|
| [main.js](https://github.com/shawndotty/ioto-update/releases/download/v2.0.7/main.js) | 主腳本 | 85.8 KB |
| [manifest.json](https://github.com/shawndotty/ioto-update/releases/download/v2.0.7/manifest.json) | 插件清單 | 299 B |
| [styles.css](https://github.com/shawndotty/ioto-update/releases/download/v2.0.7/styles.css) | 樣式文件 | 1.0 KB |
| [ioto-update.zip](https://github.com/shawndotty/ioto-update/releases/download/v2.0.7/ioto-update.zip) | 完整包 | 24.7 KB |

**安裝步驟**：
1. 下載 `main.js`、`manifest.json`、`styles.css`
2. 放入 `.obsidian/plugins/ioto-update/` 目錄
3. 重啟 Obsidian 並啟用插件

---

## 使用方法

### 首次使用

```
1. 安裝插件後，側邊欄會出現 IOTO 圖標
2. 點擊圖標打開 IOTO Update 面板
3. 選擇「更新 Framework」開始下載
4. 等待下載完成後自動配置
```

### 日常更新

- **檢查更新**: 插件會自動檢測新版本
- **執行更新**: 點擊「更新」按鈕即可
- **更新模板**: 如有個性化模板，選擇「更新同步模板」

---

## 更新日誌

### v2.0.7 (2026-04-24)

- 🎉 優化 Notion 同步功能

### 歷史版本

| 版本 | 日期 | 說明 |
|------|------|------|
| v2.0.7 | 2026-04-24 | 優化 Notion 同步功能 |
| v2.0.6 | - | 穩定版本 |

---

## 常見問題

### Q: 更新失敗怎麼辦？

1. 檢查網絡連接
2. 確認有寫入權限
3. 嘗試手動下載安裝

### Q: 更新後樣式沒有生效？

1. 重啟 Obsidian
2. 檢查 CSS 片段是否啟用
3. 清除緩存後重試

### Q: 如何回退到舊版本？

從 [Releases](https://github.com/shawndotty/ioto-update/releases) 頁面下載對應版本的文件覆蓋即可。

---

## 相關鏈接

- [[../插件体系]] - 插件體系總覽
- [[../../99-资源收集/官方文档]] - 官方文檔資源
- [[../../IOTO]] - 返回 IOTO 首頁

---

## 外部鏈接

- [GitHub 倉庫](https://github.com/shawndotty/ioto-update)
- [問題反饋](https://github.com/shawndotty/ioto-update/issues)
- [作者 Bilibili](https://space.bilibili.com/432408734)
