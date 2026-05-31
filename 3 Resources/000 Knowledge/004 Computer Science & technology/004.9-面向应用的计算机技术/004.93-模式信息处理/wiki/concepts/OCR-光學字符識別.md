---
aliases:
  - OCR
  - Optical Character Recognition
created: 2026-05-30
type: concept
category: pattern-recog
status: reviewed
---
# OCR 光學字符識別

## 定義
將圖像中的文字轉換為機器可編輯文本的技術。涵蓋文檔掃描、場景文字、手寫體三種場景。

## 標準 Pipeline
| 階段 | 操作 |
|------|------|
| **預處理** | 去噪、二值化、透視校正 |
| **版面分析** | 文本區域檢測、閱讀順序 |
| **分割** | 行分割 → 字符/詞分割 |
| **識別** | 字符分類 (CNN、LSTM) |
| **後處理** | 詞典校驗、語言模型 |

## 主要方法
- **Tesseract**: LSTM-based 開源引擎，100+ 語言
- **CRNN + CTC**: 端到端，無需顯式分割
- **TrOCR**: Transformer Encoder-Decoder，SOTA 場景文字
- **CRAFT**: 字符級區域檢測

## 相關:

[[Tesseract-OCR]]
[[Image-Processing-圖像處理]] 

· Sources: [[source-Pattern-KB]]
