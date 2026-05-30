---
aliases: [PDF Technology, Portable Document Format]
tags: [UDC/004.91, pdf]
---
# 06 PDF 技術

## 定義
PDF (Portable Document Format) 由 Adobe 於 1993 年發佈，基於 PostScript 的**頁面描述語言**，旨在跨平台忠實呈現文檔。2008 年成為 ISO 32000 國際標準。

## PDF 規格演進 Specification Evolution
| 版本 | 年份 | 關鍵增補 |
|------|:--:|------|
| PDF 1.0 | 1993 | 基本頁面描述 |
| PDF 1.3 | 2000 | ICC 色彩、JavaScript |
| PDF 1.4 | 2001 | 透明度 (Transparency) |
| PDF 1.6 | 2004 | AES 加密、3D、XML 表單 |
| PDF 1.7 | 2006 | ISO 32000-1 基礎 |
| PDF 2.0 | 2017 | ISO 32000-2; UTF-8、AES-256、註解改進 |

## 專業 PDF 子集 PDF Subsets
| 子集 | 標準 | 用途 |
|------|------|------|
| PDF/A | ISO 19005 | 長期歸檔 — 禁止外部資源/JS/加密 |
| PDF/X | ISO 15930 | 印刷交換 — CMYK/ICC/出血 |
| PDF/E | ISO 24517 | 工程圖交換 — 3D/圖層 |
| PDF/UA | ISO 14289 | 無障礙 (Universal Accessibility) |
| PDF/VT | ISO 16612 | 可變數據印刷 (帳單/對帳單) |

## PDF 工具鏈 PDF Toolchain
| 類別 | 工具 | 功能 |
|------|------|------|
| 建立 | LaTeX/Word/LibreOffice/Chrome | Save as PDF / Print to PDF |
| 檢視 | Adobe Acrobat / Foxit / Sumatra | 閱讀/註解 |
| 編輯 | Adobe Acrobat Pro / PDF-XChange | 頁面操作/OCR |
| 程式化 | iText (Java) / ReportLab (Python) / PDFKit | 動態生成 PDF |
| CLI工具 | Ghostscript / Poppler / qpdf | 轉換/合併/分割 |
| 驗證 | veraPDF (PDF/A) / PAC (PDF/UA) | 合規檢查 |

## PDF 表單與簽章 PDF Forms & Signatures
| 技術 | 說明 |
|------|------|
| AcroForms | 傳統 PDF 表單 — 文字框/複選框/下拉 |
| XFA (XML Forms Architecture) | 動態 XML 表單 — 已被 PDF 2.0 廢棄 |
| 數位簽章 (Digital Signature) | PKI 簽章 — PAdES (歐盟) / 電子簽章法 |
| 簽章欄位 | PDF 2.0 支援鎖定後續修改 (Lock Document) |

## PDF/UA 無障礙 Accessibility
- **標籤化 PDF (Tagged PDF)**: 結構樹反映文檔邏輯 (H1→H2→P→Figure)
- **替代文字 (Alt Text)**: 圖片描述供螢幕閱讀器
- **閱讀順序 (Reading Order)**: 確保輔助技術正確導航
- **字型映射 (Unicode Mapping)**: 所有文字可提取

## 核心技術棧
```
PostScript → PDF → ISO 32000 → 子集 (A/X/UA/E/VT) → Web PDF (PDF.js)
```

## 相關: [[04-桌面出版與排版]] · [[05-文檔格式標準]] · [[08-文檔自動化與轉換]]
