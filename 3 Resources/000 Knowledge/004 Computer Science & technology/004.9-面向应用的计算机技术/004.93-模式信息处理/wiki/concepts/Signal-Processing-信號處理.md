---
aliases:
  - Signal Processing
created: 2026-05-30
type: concept
category: pattern-recog
status: reviewed
---
# Signal Processing 信號處理

## 定義
對時域或頻域信號進行分析、變換和濾波的數學與算法體系。是語音、生物醫學、通信、雷達等模態的預處理基礎。

## 核心變換
| 變換 | 域 | 用途 |
|------|-----|------|
| **Fourier (FT/FFT)** | 頻率 | 頻譜分析、濾波 |
| **STFT** | 時頻 | 頻譜圖、短時分析 |
| **Wavelet (DWT/CWT)** | 時頻 (多尺度) | 瞬態檢測、壓縮 |
| **Z-Transform** | 複頻域 | 系統分析、濾波器設計 |

## 數字濾波器
- **FIR**: 有限脈衝響應、穩定、線性相位 → 窗函數設計
- **IIR**: 無限脈衝響應、低階高效 → Butterworth/Chebyshev
- **自適應濾波**: LMS、RLS → 回聲消除、噪聲抵消

## 序列模型
HMM (隱馬爾可夫)、CRF (條件隨機場)、DTW (動態時間規整) — 為深度序列模型 (RNN/LSTM/Transformer) 提供理論基礎。

## 相關: [[Speech-Recognition-語音識別]]、[[Feature-Extraction-特徵提取]] · Sources: [[source-Pattern-KB]]
