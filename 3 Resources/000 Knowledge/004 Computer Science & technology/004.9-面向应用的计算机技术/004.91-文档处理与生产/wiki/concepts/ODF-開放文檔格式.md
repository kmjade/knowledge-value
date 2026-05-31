---
aliases: [ODF, Open Document Format]
created: 2026-05-30
type: concept
topic: doc-processing
status: reviewed
---
# 開放文檔格式 Open Document Format (ODF)

## 定義
ODF (Open Document Format) 是 OASIS 制定、ISO/IEC 26300 認證的開放辦公文檔格式標準 (2005/2006)。使用 ZIP 壓縮 + XML 結構，是 LibreOffice 的原生格式。

## 核心內容
| 特性 | ODF | OOXML (Microsoft) |
|------|:--:|:--:|
| 標準 | ISO/IEC 26300 | ISO/IEC 29500 |
| 原生軟體 | LibreOffice / Apache OpenOffice | Microsoft Office |
| 檔案結構 | ZIP (manifest.xml + content.xml) | ZIP (更複雜部件) |
| 擴展名 | .odt .ods .odp .odg | .docx .xlsx .pptx |
| 開放性 | 完全開放、社群治理 | MS 主導、向後相容約束 |

## 檔案內部結構 (.odt 範例)
```
mimetype            → application/vnd.oasis.opendocument.text
META-INF/manifest.xml → 檔案清單
content.xml         → 實際文檔內容 (文字/表格/圖像)
styles.xml          → 樣式定義
meta.xml            → 中繼資料 (作者/日期/統計)
settings.xml        → 應用設定
```

## 政治與政策: 歐盟多國 (德/法/荷/比) 及多國政府強制使用 ODF 作為公文格式 → 避免廠商鎖定 (Vendor Lock-in)

## ODF 工具鏈: LibreOffice (桌面) + Collabora Online (雲端) + ODF Toolkit (Java) + odfpy (Python)

## 相關: [[PDF]] · [[Desktop-Publishing-桌面出版]] · Sources: [[source-DocProc-KB]]
