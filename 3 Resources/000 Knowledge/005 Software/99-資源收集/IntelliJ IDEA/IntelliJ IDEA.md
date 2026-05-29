---
aliases:
  - IntelliJ IDEA Knowledge Base
  - IDEA KB
para: resource
domain:
  - "[[IntelliJ IDEA]]"
tags:
  - #para/resource/tech
  - #topic/intellij
  - #type/moc
created: 2026-05-21
---

## IntelliJ IDEA

---

> [!info] 知識庫概述
> IntelliJ IDEA 是 JetBrains 公司開發的 Java 集成開發環境，本知識庫涵蓋從基礎操作到高級技巧的完整學習體系。

---

## 模塊索引

| 模塊 | 說明 | 狀態 |
|------|------|------|
| [[0 Inbox/_processed/01-Tech/IntelliJ IDEA/00-MOCs/MOC-總覽\|📖 知識體系]] | 完整架構與導航 | `#status/active` |
| [[0 Inbox/_processed/01-Tech/WSL/00-MOCs/MOC-學習路徑\|🎯 學習路徑]] | 推薦學習順序 | `#status/active` |
| [[01-基礎入門\|01 基礎入門]] | 界面、項目、配置 | `#status/to-learn` |
| [[02-代碼編輯\|02 代碼編輯]] | 編輯器技巧、代碼生成 | `#status/to-learn` |
| [[03-調試技巧\|03 調試技巧]] | 斷點、變量監控 | `#status/to-learn` |
| [[04-版本控制\|04 版本控制]] | Git 集成、分支管理 | `#status/to-learn` |
| [[05-重構技巧\|05 重構技巧]] | 代碼重構方法 | `#status/to-learn` |
| [[06-插件系統\|06 插件系統]] | 常用插件推薦 | `#status/to-learn` |
| [[07-Web開發\|07 Web開發]] | Web 項目配置 | `#status/to-learn` |
| [[08-數據庫工具\|08 數據庫工具]] | Database 工具 | `#status/to-learn` |
| [[09-構建工具\|09 構建工具]] | Maven、Gradle | `#status/to-learn` |
| [[10-高級功能\|10 高級功能]] | Live Templates、宏 | `#status/to-learn` |
| [[11-快捷鍵大全\|11 快捷鍵大全]] | 快捷鍵速查 | `#status/reference` |
| [[99-資源收集\|99 資源收集]] | 外部資源索引 | `#status/reference` |

---

## 快速導航

- 📖 [[0 Inbox/_processed/01-Tech/IntelliJ IDEA/00-MOCs/MOC-總覽|知識體系總覽]]
- 🎯 [[0 Inbox/_processed/01-Tech/WSL/00-MOCs/MOC-學習路徑|推薦學習路徑]]
- ⌨️ [[11-快捷鍵大全|快捷鍵速查]]
- 🔌 [[06-插件系統|插件推薦]]
- 📚 [[99-資源收集|學習資源]]

---

## 最近更新

```dataview
Table without id file.link as "文件", file.mtime as "更新時間"
WHERE contains(file.path, this.file.folder) AND file.name != this.file.name
SORT file.mtime DESC
LIMIT 10
```

---

## Linked notes

```dataview
Table sort(rows.file.link) as File
FROM [[]]
WHERE !contains(file.folder, this.file.name)
GROUP BY file.folder as Folder
```
