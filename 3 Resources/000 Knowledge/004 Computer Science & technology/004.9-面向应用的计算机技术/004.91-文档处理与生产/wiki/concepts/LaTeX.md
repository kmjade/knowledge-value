---
aliases: [LaTeX, TeX] · created: 2026-05-30
type: concept · category: doc-processing · status: reviewed
---
# LaTeX

## 定義
LaTeX (Lamport TeX) 是 Leslie Lamport 於 1985 年基於 Donald Knuth 的 TeX 排版引擎構建的文檔準備系統 (Document Preparation System)，以 WYSIWYM (所見即所思) 為範式，專為學術與技術排版設計。

## 核心內容
| 層級 | 組件 | 說明 |
|------|------|------|
| 引擎 | TeX/pdfTeX/XeTeX/LuaTeX | 排版計算核心 (斷行/分頁/數學) |
| 格式 | LaTeX2e / ConTeXt | 巨集集合，定義高層命令 |
| 套件 | CTAN (>6000 套件) | 擴展功能 — 參考文獻/繪圖/化學 |
| 文檔類 | article/report/book/beamer | 預定義文檔結構模板 |

| 優勢 | 說明 |
|------|------|
| 數學排版 | 無與倫比的公式品質 — 學術出版黃金標準 |
| 交叉引用 | `\label{}` + `\ref{}` — 自動編號，永不錯誤 |
| BibTeX/Biber | 參考文獻自動管理 (配合 .bib 資料庫) |
| 版本控制 | 純文本 → git diff 清晰 |
| 模板分離 | 內容 (.tex) 與格式 (.cls) 嚴格分離 |

## 數學範例: `$E = mc^2$` (行內)、`\[ \sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6} \]` (展示)

## 現代工具鏈: Overleaf (雲端協作) + TeX Live (本機) + VS Code + LaTeX Workshop (編輯)

## 相關: [[3 Resources/000 Knowledge/004 Computer Science & technology/004.9-面向应用的计算机技术/004.91-文档处理与生产/wiki/concepts/Markdown]] · [[PDF]] · [[Desktop-Publishing-桌面出版]] · Sources: [[source-DocProc-KB]]
