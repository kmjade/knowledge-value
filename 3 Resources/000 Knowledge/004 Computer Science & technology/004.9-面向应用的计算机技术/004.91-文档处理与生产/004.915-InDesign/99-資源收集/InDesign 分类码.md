---
title: InDesign 分类码对照 — DDC · UDC · CLC · LCC
aliases: [InDesign Classification Codes, Adobe InDesign 分类码]
tags: [classification, indesign, dtp, ddc, udc, clc, lcc]
created: 2026-05-30
updated: 2026-05-31
---

# InDesign 分类码对照

> Adobe InDesign 在四大图书馆分类体系中的精确分类号。

---

## 一、四体系总览

| 体系 | 类号 | 名称 | 分类逻辑 |
|:---:|:---:|------|------|
| **DDC** | `006.686` | Desktop publishing software | 以「軟體技術類型」分類 |
| **UDC** | `004.915` | Desktop publishing | 以「計算機應用領域」分類 |
| **CLC** | `TP317.4` | 桌面出版系統 | 以「軟體功能用途」分類 — 最細 |
| **LCC** | `Z253.532.A34` | Adobe InDesign (Cutter) | 以「出版業務流程」分類 — 最特別 |

---

## 二、DDC 層級詳解

```
006 — 特殊計算機方法 (Special computer methods)
  └── 006.6 — 計算機圖形 (Computer graphics)
       └── 006.68 — 計算機圖形程序 (Programs)
            └── 006.686 — 桌面出版軟體 (Desktop publishing software)
                 ├── 006.686 Adobe InDesign (CC 2024)
                 ├── 006.686 Scribus (開源)
                 └── 006.686 QuarkXPress
```

> InDesign 有獨立的 `006.686`，不同於 Photoshop (`006.696`) 和 Illustrator (`006.68`)。

---

## 三、UDC 層級詳解

```
004 — 計算機科學 (Computer Science and Technology)
  └── 004.9 — 面向應用的計算機技術 (Application-oriented computer-based techniques)
       └── 004.91 — 文檔處理與生產 (Document processing and production)
            ├── 004.912 — 字處理 (Word processing)
            ├── 004.915 — 桌面出版 (Desktop publishing) ← InDesign
            └── 004.918 — 數位出版 (Digital publishing)
```

> UDC 使用字母擴展來區分具體產品：`004.915Adobe InDesign`、`004.915Scribus`

---

## 四、CLC 層級詳解（中圖法）

```
T — 工業技術
  └── TP — 自動化技術、計算機技術
       └── TP31 — 計算機軟體
            └── TP317 — 應用軟體（程序包）
                 ├── TP317.1 — 辦公自動化系統 (Office · Obsidian)
                 ├── TP317.2 — 字處理軟體 (Word)
                 ├── TP317.3 — 文字處理/學術排版 (LaTeX)
                 ├── TP317.4 — 桌面出版系統 (InDesign · Scribus)
                 ├── TP317.42 — 向量繪圖 (Illustrator)
                 └── TP317.46 — 圖像處理 (Photoshop)
```

> **CLC 細分優勢**：TP317.1 到 TP317.4 將辦公、字處理、學術排版、桌面出版四類精確分離——DDC 005.5 將這些全部歸為「辦公室應用」一個總類。

---

## 五、LCC 層級詳解

```
Z — 書目學·圖書館學·資訊資源 (Bibliography. Library Science. Information Resources)
  └── Z116–Z265 — 印刷·出版·書業 (Printing. Publishing. Book trade)
       └── Z253 — 出版排版 (Publishing layout)
            └── Z253.53 — 桌面出版 (Desktop publishing)
                 ├── Z253.532.A34 — Adobe InDesign (Cutter 號)
                 ├── Z253.532.A36 — Adobe FrameMaker
                 └── Z253.532.Q37 — QuarkXPress
```

> **LCC 特色**：將 DTP 軟體歸入書目學 (Z) 而非計算機科學 (QA)——反映了以「出版流程」而非「軟體技術」為中心的分類哲學。

---

## 六、同類軟體分類號對照

| 軟體 | DDC | UDC | CLC | LCC | 類型 |
|------|:---:|:---:|:---:|:---:|------|
| **InDesign** | `006.686` | `004.915` | `TP317.4` | `Z253.532.A34` | 桌面出版 |
| Photoshop | `006.696` | `004.932` | `TP317.46` | `T385` | 圖像處理 |
| Illustrator | `006.68` | `004.92` | `TP317.42` | `T385` | 向量繪圖 |
| Word | `005.52` | `004.912` | `TP317.2` | `Z52.5.M52` | 字處理 |
| LaTeX | `686.22544` | `004.915` | `TP317.3` | `Z253.4.L38` | 學術排版 |
| Scribus | `006.686` | `004.915` | `TP317.4` | `Z253.53.S37` | 開源 DTP |
| Obsidian | `005.52` | `004.91` | `TP317.1` | `QA76.76.T48` | 知識管理 |
| FrameMaker | `006.686` | `004.915` | `TP317.4` | `Z253.532.A36` | 技術文檔 |

---

## 七、四體系分類哲學對比

| 體系 | InDesign 歸屬 | 分類邏輯 | 強項 |
|------|:---:|------|------|
| **DDC** | 006（特殊計算機方法） | 以「軟體技術類型」分類 | 全球適用 |
| **UDC** | 004.9（應用技術） | 以「計算機應用領域」分類 | 多語言擴展 |
| **CLC** | TP317.4（應用軟體） | 以「軟體功能用途」分類 | 細分最精確 |
| **LCC** | Z253（出版） | 以「出版業務流程」分類 | 業務導向 |

---

## 八、Adobe 創意套件分類對照

```
TP317.4  ←  InDesign     (桌面出版 — 版面組合)
TP317.46 ←  Photoshop    (圖像處理 — 點陣)
TP317.42 ←  Illustrator  (向量繪圖 — 圖形)
TP317.1  ←  Acrobat      (PDF — 文檔交換)

三者協同：PS/AI 產出素材 → InDesign 組合版面 → PDF/X 輸出印刷
```

---

## 九、CLC 構建規則

```
TP — 自動化技術、計算機技術
  └── TP3 — 計算技術、計算機技術
       └── TP31 — 計算機軟體
            └── TP317 — 應用軟體（程序包）
                 └── TP317.1~9 — 按功能細分
```

### TP317 完整細分

| 類號 | 子類 | 代表軟體 |
|:---:|------|------|
| `TP317.1` | 辦公自動化 | Office · Obsidian · Notion |
| `TP317.2` | 字處理 | Word · Pages |
| `TP317.3` | 文字處理/排版 | LaTeX · Markdown |
| `TP317.4` | **桌面出版** | **InDesign** · Scribus |
| `TP317.42` | 圖形設計 | Illustrator · CorelDRAW |
| `TP317.46` | 圖像處理 | Photoshop · GIMP |

---

## 十、在本 Vault 中的對應

| 主題 | Vault 位置 | 狀態 |
|------|-----------|:---:|
| InDesign 實體頁 | [[Adobe-InDesign]] | ✅ 完整 |
| 桌面出版概念 | [[Desktop-Publishing-桌面出版]] | ✅ 已創建 |
| DTP 章節 | [[04-桌面出版與排版]] | ✅ 已創建 |
| InDesign KB 入口 | [[004.915-InDesign]] | 🟡 建構中 |
| InDesign 說明書 | `0 Inbox/InDesign.简体中文使用说明书...pdf` (58 MB) | 📥 待入 raw/ |
| OS 分類碼（參考樣式） | [[操作系统分类码]] | ✅ 完整 |
| 分類體系實體 | [[CLC-中國圖書館分類法]] · [[DDC]] · [[UDC]] · [[LCC]] | ✅ 已創建 |

---

## 參考

- [[Adobe-InDesign]] — InDesign 實體頁（含完整功能、演進、市場）
- [[04-桌面出版與排版]] — DTP 知識庫章節
- [[Desktop-Publishing-桌面出版]] — DTP 概念頁
- [[操作系统分类码]] — 四體系分類碼對照（本頁參考樣式）
- 國家圖書館.《中國圖書館分類法》（第五版，2010）
- OCLC. *Dewey Decimal Classification* (DDC 23, 2011)
