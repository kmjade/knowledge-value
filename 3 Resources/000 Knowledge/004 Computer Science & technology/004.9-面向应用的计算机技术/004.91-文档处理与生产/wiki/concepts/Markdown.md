---
aliases: [Markdown]
created: 2026-05-30
type: concept
category: doc-processing
status: reviewed
---
# Markdown

## 定義
Markdown 是 John Gruber 於 2004 年創建的輕量標記語言 (Lightweight Markup Language)，以純文本語法表達文檔結構，可轉換為 HTML/PDF/EPUB 等多種格式。核心理念: 「易讀易寫的純文本格式」。

## 核心內容
| 方言 | 主導者 | 關鍵貢獻 |
|------|------|------|
| CommonMark | 社群規範 (2014) | 無歧義統一語法 |
| GFM (GitHub Flavored) | GitHub | 表格、任務清單、刪除線 |
| MDX | Vercel/社群 | JSX 嵌入 → React 生態 |
| R Markdown | RStudio/Posit | 程式碼嵌入 + Knitr |
| MyST | Executable Books | 科學寫作 + Jupyter |

| 生態工具 | 功能 |
|------|------|
| Pandoc | 萬能轉換：Markdown→PDF/EPUB/DOCX/HTML |
| Obsidian | 雙向連結筆記系統 |
| Hugo/Jekyll | 靜態網站生成 (Markdown→HTML) |
| Docusaurus | 技術文檔站 (Meta 開源) |
| Mermaid | 文本繪圖 (Markdown 內嵌) |

## 語法: `# H1 ## H2` 標題、`**粗體**`、`*斜體*`、`` `code` ``、`[link](url)`、`![img](url)`、`- 列表`、`> 引用`、表格 (GFM 擴展)

## 哲學: 內容與呈現分離 → Write once, publish anywhere. 純文本保證向後相容與版本控制。

## 相關

- [[LaTeX]] · [[Pandoc]] · [[Word-Processor-字處理器]]
- [[3 Resources/000 Knowledge/004 Computer Science & technology/004.43-计算机语言/Markdown/Markdown\|Markdown KB]] — 完整 Markdown 知識庫
- [[3 Resources/000 Knowledge/004 Computer Science & technology/004.43-计算机语言/Python/99-資源收集/计算机语言-分类码\|語言分類碼]] — UDC 004.439Markdown
- [[3 Resources/000 Knowledge/wiki/entities/Obsidian\|Obsidian]] — 基於 Markdown 的 PKM 工具
- Sources: [[../sources/source-DocProc-KB]]
