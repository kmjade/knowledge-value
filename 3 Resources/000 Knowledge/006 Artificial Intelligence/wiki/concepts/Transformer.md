---
aliases: [Transformer] · created: 2026-05-30
type: concept · category: AI · status: reviewed
---
# Transformer 架構

## 定義
2017 年 "Attention Is All You Need" 提出，**自注意力機制**取代 RNN 成為序列建模主流架構。

## 核心: 自注意力 (Self-Attention) — 每個 token 關注序列中所有其他 token，並行計算 Q·K^T·V

## 架構變體
| 變體 | 用途 | 代表 |
|------|------|------|
| Encoder-only | 理解 | BERT |
| Decoder-only | 生成 | GPT 系列 |
| Encoder-Decoder | 轉換 | T5, BART |

## 為什麼主宰 AI: 並行可擴展 (GPU 友好)、長距離依賴、Transfer Learning (預訓練→微調)、Scaling Law

## 相關: [[LLM]]、[[神經網路]] · Sources: [[source-AI-KB]]
