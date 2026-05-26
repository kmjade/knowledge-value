---
title: IOTO 知識庫
aliases:
  - IOTO Knowledge Base
  - PKM 2.0 知識庫
  - 個人知識生產系統
para: resource
domain:
  - "[[IOTO]]"
tags:
  - para/resource/tech
  - system/moc
  - topic/ioto
  - topic/pkm
  - type/moc
created: 2026-05-22
modified: 2026-05-23
---

# IOTO 知識庫

> [!info] 知識庫概述
> IOTO 是一套基於 Obsidian 的個人知識生產系統（PKM 2.0），核心理念是「成果導向、項目驅動」，幫助你從知識管理走向知識生產。

---

## 核心定位

```
傳統 PKM 1.0          IOTO PKM 2.0
─────────────────    ─────────────────
📦 倉庫模式           ⚙️ 製造模式
知識存儲              知識生產
Fear of Missing Out   Fun of Making Outcome
先存後看              以終為始
收藏堆積              成果交付
```

---

## 模塊索引

| 模塊 | 說明 | 狀態 |
|------|------|------|
| [[0 Inbox/_processed/01-Tech/IOTO/00-MOCs/MOC-總覽\|📖 知識體系]] | 完整架構與導航 | `#status/active` |
| [[0 Inbox/_processed/01-Tech/IOTO/00-MOCs/MOC-學習路徑\|🎯 學習路徑]] | 系統化學習順序 | `#status/active` |
| [[01-核心理念\|01 核心理念]] | PKM 2.0 設計原則 | `#status/learning` |
| [[02-系统构成\|02 系統構成]] | 框架與插件體系 | `#status/to-learn` |
| [[03-核心工作流\|03 核心工作流]] | 項目與筆記流程 | `#status/to-learn` |
| [[04-插件使用\|04 插件使用]] | 配套插件指南 | `#status/to-learn` |
| [[05-快速开始\|05 快速開始]] | 安裝部署指南 | `#status/to-learn` |
| [[06-常见问题\|06 常見問題]] | 常見錯誤修復 | `#status/to-learn` |
| [[07-进阶功能\|07 進階功能]] | 個性化定製 | `#status/to-learn` |
| [[99-资源收集\|99 資源收集]] | 學習資源 | `#status/active` |

---

## 快速導航

- 📖 [[0 Inbox/_processed/01-Tech/IOTO/00-MOCs/MOC-總覽|知識體系總覽]]
- 🎯 [[0 Inbox/_processed/01-Tech/IOTO/00-MOCs/MOC-學習路徑|學習路徑規劃]]
- 🚀 [[05-快速开始|快速開始]]
- 📚 [[99-资源收集|學習資源]]

---

## 核心架構

### 文件夾結構

```
📁 0-輔助/IOTO
├── 📁 Scripts      # 核心腳本
└── 📁 Templates    # 模板文件
    ├── 📁 OBIOTO   # 默認模板
    └── 📁 MyIOTO   # 用戶模板

📁 1-輸入
├── 📁 原始資料
└── 📁 碎片筆記

📁 2-輸出
├── 📁 閃念筆記
└── 📁 卡片筆記

📁 3-任務
├── 📁 項目A
└── 📁 項目B

📁 4-成果
├── 📁 項目A
└── 📁 項目B
```

### 邏輯循環

```
        📥 輸入
       ↗        ↘
  🧠 輸出 ←── 📅 任務
       ↘        ↗
        🎯 成果
```

---

## 學習項目

- [[IOTO学习项目]] - 學習項目主文件

---

## 最近更新

```dataview
Table without id file.link as "文件", file.mtime as "更新時間"
WHERE contains(file.path, this.file.folder) AND file.name != this.file.name
SORT file.mtime DESC
LIMIT 10
```

---

## 版本信息

- **系統版本**: IOTO PKM 2.0
- **適用平台**: Obsidian
- **創建日期**: 2026-05-22
