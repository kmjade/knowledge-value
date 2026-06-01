---
title: 01-Obsidian概述与安装
aliases: [Obsidian Overview & Install, Obsidian 概述與安裝]
tags: [obsidian, tools, pkm, basics]
created: 2026-05-30
---

# 01 — Obsidian 概述與安裝

## 哲學理念 Philosophy

> Your thoughts are yours. Your data is yours. Obsidian is the IDE for your knowledge.

| 設計原則 | 說明 |
|----------|------|
| **Local-first** | 所有筆記存為 `.md` 純文字檔案，無雲端綁定 |
| **Longevity** | Markdown 是永續格式 — 50 年後仍可讀取 |
| **Link as first-class citizen** | `[[wikilink]]` 是核心，不是附加功能 |
| **Plugin playground** | 核心輕量，功能由插件擴展，按需加載 |
| **Offline capable** | 無需帳號、無需網路，打開即用 |

## 全平台安裝 Installation

| 平台 | 方式 | 備註 |
|------|------|------|
| **Windows** | [官網 .exe](https://obsidian.md/download) 或 `winget install Obsidian.Obsidian` | 支援 Portable 免安裝版 |
| **macOS** | [官網 .dmg](https://obsidian.md/download) 或 `brew install --cask obsidian` | Apple Silicon 原生支援 |
| **Linux** | AppImage / `snap install obsidian` / Flatpak | 推薦 AppImage，無依賴 |
| **iOS** | [App Store](https://apps.apple.com/app/obsidian/id1557175442) | 支援 iCloud Vault |
| **Android** | [Google Play](https://play.google.com/store/apps/details?id=md.obsidian) 或 [官網 APK](https://obsidian.md/android) | 支援外部資料夾 |

## Vault 概念

> **Vault = 一個資料夾 + `.obsidian` 配置目錄**

```
MyVault/
├── .obsidian/          ← 所有配置（主題、插件、設定、快捷鍵）
│   ├── app.json        ← 核心設定（語言、編輯器行為）
│   ├── apperance.json  ← 外觀設定（主題、字型）
│   ├── hotkeys.json    ← 自定義快捷鍵
│   ├── core-plugins.json
│   ├── community-plugins.json
│   ├── themes/         ← 安裝的主題
│   └── plugins/        ← 安裝的插件
├── 筆記.md             ← 你的知識
├── Attachments/        ← 圖片/附件（建議集中管理）
└── Templates/          ← 模板（可選）
```

## 初始設定 Initial Setup

| 步驟 | 操作 | 說明 |
|:----:|------|------|
| 1 | 語言 → 設定 → About → Language → 繁體中文 | 或保持 English |
| 2 | 編輯器 → 設定 → 編輯器 → 預設編輯模式 → 即時預覽 | 所見即所得 |
| 3 | 附件 → 設定 → 檔案與連結 → 附件資料夾 → `Attachments` | 集中管理圖片 |
| 4 | 快捷鍵 → 設定 → 快捷鍵 → 自訂常用操作 | 提高效率 |
| 5 | 安全模式 → 設定 → 社群插件 → 關閉安全模式 | 解鎖插件 |
| 6 | 主題 → 設定 → 外觀 → 瀏覽社群主題 | 選擇你喜歡的風格 |

## .obsidian 配置目錄詳解

| 檔案/目錄 | 作用 | 可否手動編輯 |
|-----------|------|:-----------:|
| `app.json` | 核心設定（語言、編輯模式、縮排等） | ✅ |
| `appearance.json` | 主題、字型、CSS snippet 設定 | ✅ |
| `hotkeys.json` | 自定義快捷鍵映射 | ✅ |
| `core-plugins.json` | 核心插件開關狀態 | ✅ |
| `community-plugins.json` | 社群插件列表及啟用狀態 | ⚠️ 小心 |
| `workspace.json` | 工作區佈局（開啟的 pane/tab） | ❌ |
| `themes/` | 安裝的主題 CSS | ✅ |
| `plugins/` | 安裝的插件代碼 | ❌ 僅讀 |
| `snippets/` | 自定義 CSS snippets | ✅ |

> 💡 可以將 `.obsidian` 加入 Git 進行配置版本控制（但注意 `.obsidian/workspace.json` 應加入 `.gitignore`）。

## Vault 位置建議

| 場景 | 建議位置 | 原因 |
|------|----------|------|
| **單機使用** | 本地 SSD（如 `~/Documents/MyVault`） | 速度最快 |
| **跨裝置同步** | Obsidian Sync / 自建 Git repo | 避免同步衝突 |
| **iOS + Mac** | iCloud Drive 內的 Obsidian 資料夾 | 原生支援 |
| **公司環境** | 公司內部 Git / 加密硬碟 | 安全合規 |
| **⚠️ 避免** | OneDrive/Google Drive 即時同步目錄 | 可能產生衝突檔案 |

## 相關筆記

- [[004.915-Obsidian|Obsidian MOC]] — 返回總覽
- [[3 Resources/000 Knowledge/004 Computer Science & technology/004.9-面向应用的计算机技术/004.91-文档处理与生产/004.915-Obsidian/02-核心概念]] — Wikilinks、Graph View、Tags
- [[04-插件体系]] — 插件安裝與推薦
