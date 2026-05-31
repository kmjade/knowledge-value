---
aliases: [Pandoc]
created: 2026-05-30
type: concept
topic: doc-processing
status: reviewed
---
# Pandoc

## 定義
Pandoc 是 John MacFarlane 於 2006 年用 Haskell 編寫的**萬能文檔轉換器** (Universal Document Converter)，支援 40+ 格式互轉。核心架構: 輸入 → AST (Abstract Syntax Tree) → 輸出。

## 核心內容
| 格式類別 | 輸入 | 輸出 |
|------|------|------|
| 標記語言 | Markdown、reST、AsciiDoc、Org-mode | Markdown、reST、AsciiDoc |
| 辦公文檔 | DOCX、ODT | DOCX、ODT、PPTX |
| 排版/出版 | LaTeX | PDF (via LaTeX)、EPUB |
| Web | HTML | HTML、EPUB |
| 學術 | BibTeX、CSL JSON | 格式化引用 |

## Pandoc 轉換管道
```
輸入文檔 → Reader (解析為 AST) → AST (JSON 中間表示) → Filter (可選 Lua/Python 轉換) → Writer (渲染為目標格式) → 輸出文檔
```

## 常用命令
```bash
pandoc doc.md -o doc.pdf --pdf-engine=xelatex         # MD → PDF
pandoc doc.docx -t markdown -o doc.md                 # DOCX → MD
pandoc doc.md --reference-doc=template.docx -o out.docx # 使用模板
pandoc doc.md --filter pandoc-crossref -o doc.pdf     # 交叉引用過濾
pandoc *.md -o book.epub --toc                        # 多文件 → EPUB
```

## 關鍵擴展: pandoc-citeproc/citeproc (引用處理)、pandoc-crossref (交叉引用)、pandoc-plot (圖表)、Lua filters (自訂轉換)

## 相關: [[Markdown]] · [[LaTeX]] · [[PDF]] · Sources: [[../sources/source-DocProc-KB]]
