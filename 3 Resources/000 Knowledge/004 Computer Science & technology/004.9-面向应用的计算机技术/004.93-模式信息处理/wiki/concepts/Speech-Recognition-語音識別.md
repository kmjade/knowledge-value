---
aliases:
  - Speech Recognition
  - ASR
created: 2026-05-30
type: concept
topic: pattern-recog
status: reviewed
---
# Speech Recognition 語音識別

## 定義
將語音信號自動轉錄為文本的技術 (Automatic Speech Recognition, ASR)。輸入波形 → 輸出詞序列。

## 演化路徑
| 代 | 架構 | 代表 |
|:--:|------|------|
| **1.0** | GMM-HMM | 經典統計 ASR |
| **2.0** | DNN-HMM | 深度聲學模型 |
| **3.0** | End-to-End (CTC/Attention) | DeepSpeech、LAS |
| **4.0** | 大規模預訓練 | Whisper、Wav2Vec |

## 關鍵組件
- **聲學特徵**: MFCC、FBank、Spectrogram
- **聲學模型**: 音頻 → 音素序列
- **語言模型**: N-gram、RNNLM、Transformer LM
- **解碼器**: WFST、Beam Search

## 評估: WER (Word Error Rate) = (S+D+I)/N · 實時率 (RTF)

## 相關: [[Signal-Processing-信號處理]]、[[Classification-分類器]] 

· Sources: [[source-Pattern-KB]]
