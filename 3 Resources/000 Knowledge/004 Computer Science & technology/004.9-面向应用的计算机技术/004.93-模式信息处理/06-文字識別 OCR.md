---
aliases: [Optical Character Recognition]
tags: [DDC/004.93, ocr]
---
# 06 文字識別 OCR
---
## OCR Pipeline
| 階段 | 功能 | 技術 |
|------|------|------|
| **預處理 (Preprocessing)** | 去噪、二值化、糾偏 | 自適應閾值、透視變換 |
| **版面分析 (Layout Analysis)** | 檢測文本區域、段落、表格 | 連通域分析、深度目標檢測 |
| **行/字分割 (Segmentation)** | 切出行、單字 | 投影法、CRAFT |
| **字符識別 (Recognition)** | 字符 → Unicode | 模板匹配、CNN、CRNN |
| **後處理 (Post-processing)** | 拼寫修正、語言模型 | 詞典、N-gram、BERT |

## Tesseract OCR 引擎
- **架構**: 傳統 (≤3.x LSTM-based, ≥4.x LSTM 神經網絡)
- **流程**: 自適應閾值 → 連通域分析 → 文本行 → LSTM 識別
- **特性**: 支援 100+ 語言、訓練工具 (tesstrain)、hOCR/PDF 輸出

## CRNN (Convolutional Recurrent Neural Network) for OCR
CNN 提取特徵 → RNN (BiLSTM) 序列建模 → CTC 解碼 — 端到端無需字符分割。

## 場景文字識別 (Scene Text Recognition)
| 挑戰 | 方法 |
|------|------|
| 不規則排列 | STN (Spatial Transformer Network) |
| 多方向 | 旋轉 ROI、RRPN |
| 光照/遮擋 | 數據增強、對比學習 |
| 端到端 | ABCNet (Bezier 曲線)、TrOCR (Transformer) |

## 評估: CER (字符錯誤率) · WER (詞錯誤率) · 正確率 (Accuracy)
