---
aliases: [Pattern FAQ] · tags: [DDC/004.93, faq]
---
# 模式信息處理 FAQ

### 模式識別 vs 機器學習？
模式識別聚焦於感知數據 (圖像、語音、信號) 的分類與描述；機器學習是更廣泛的從數據學習的範式。模式識別 = ML 在感知領域的應用。

### 手工特徵 vs 深度特徵？
手工特徵 (SIFT/HOG/MFCC) 可解釋、低數據需求、嵌入式友好。深度特徵 (CNN embedding) 更強表示力、需要大量標註數據、端到端訓練。

### CNN 還是 Transformer？
CNN 局部歸納偏置 → 數據效率高。Transformer 全局注意力 → 大數據 SOTA。ViT/Swin 逐漸替代 CNN backbone。

### OCR 選 Tesseract 還是深度學習？
Tesseract 適合文檔掃描、多語言、開箱即用。CRNN/TrOCR 適合場景文字、不規則排列。混合方案: Tesseract 版面分析 + 深度字符識別。

### 生物特徵安全性？
生物特徵不可撤銷 (一旦洩露無法更改)。應對: 模板保護 (Fuzzy Vault)、同態加密、聯邦學習。
