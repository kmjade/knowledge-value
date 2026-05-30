---
aliases: [DocProc FAQ] · tags: [UDC/004.91, faq]
---
# 文檔處理 FAQ

### Markdown 還是 Word？
**協作/排版** → Word；**技術文檔/版本控制/自動化** → Markdown + Pandoc。兩者互補非互斥。

### LaTeX 值得學嗎？
學術論文、數學公式、自動參考文獻 → **必需**。一般辦公文檔 → 不必。

### ODF 還是 OOXML？
政府/歐盟/開放性 → **ODF** (LibreOffice)。企業生態/相容性 → **OOXML** (MS Office)。

### PDF 可以編輯嗎？
**不建議**直接編輯 PDF — 應修改原始文檔後重新匯出。緊急時用 Acrobat Pro 或 PDF-XChange。

### 哪些文檔適合版本控制 (Git)？
**純文本** (Markdown/reST/LaTeX) 理想。**DOCX/PDF** 可存但不便 diff。

### 自出版選什麼格式？
電子書 → **EPUB 3** (回流式、無障礙)。印刷 → **PDF/X-4**。Amazon → MOBI + KPF。
