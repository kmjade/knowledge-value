---
title: Software 常見問題
tags: [software, faq]
created: 2026-05-29
aliases: [軟體常見問題, Software FAQ]
---

# Software 常見問題 FAQ

> 軟體工程領域最常見的十大誤解與辨析。
> Top 10 common misconceptions in software engineering — debunked.

---

## 1. 「寫程式就是軟體工程」

**誤解 Misconception**：學會程式語言就是軟體工程師。

**事實 Reality**：
- Programming = 編寫程式碼解決一個特定問題
- Software Engineering = 系統化地設計、構建、測試與維護大型軟體系統
- 軟體工程還包括：需求分析、架構設計、測試策略、專案管理、團隊協作、持續維護
- 一個好的軟體工程師花在「寫程式碼」上的時間可能不到 50%

---

## 2. 「100% 測試覆蓋率 = 零 Bug」

**誤解 Misconception**：只要測試覆蓋率達到 100%，就沒有 bug。

**事實 Reality**：
- Coverage 只能告訴你「哪些程式碼被執行過」，不能告訴你「是否被正確測試」
- 被覆蓋的程式碼仍可能有邏輯錯誤、邊界條件遺漏
- 追求 100% coverage 往往導致為了測試而測試的低價值測試
- 好的測試策略 > 高的覆蓋率數字

---

## 3. 「微服務永遠比單體好」

**誤解 Misconception**：微服務是唯一的現代架構選擇。

**事實 Reality**：
- Monolith first — 從單體開始，需要時再拆分
- 微服務帶來：網路複雜度、分散式除錯、資料一致性挑戰
- 許多成功公司（Stack Overflow, Shopify）仍在使用大規模單體架構
- 關鍵是 Modular Monolith — 模組化但集中部署

---

## 4. 「越多程式碼 = 越多價值」

**誤解 Misconception**：生產力以程式碼行數衡量。

**事實 Reality**：
- 刪除程式碼往往比撰寫程式碼更有價值
- 最好的程式碼是沒寫的程式碼（less surface area for bugs）
- 指標應該是：解決的問題、消除的技術債務、提升的可維護性
- "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away." — Antoine de Saint-Exupéry

---

## 5. 「敏捷 = 沒有文件、沒有規劃」

**誤解 Misconception**：敏捷開發意味著不做設計、不寫文件。

**事實 Reality**：
- Agile Manifesto 說的是 "Working software **over** comprehensive documentation"，不是 "no documentation"
- 敏捷要求 **足夠** 的文件，而非零文件
- Sprint Planning、Backlog 都是規劃活動
- 真正的敏捷是「回應變化」，而非「沒有計畫」

---

## 6. 「新技術總是更好」

**誤解 Misconception**：最新的框架/語言就是最佳選擇。

**事實 Reality**：
- 新技術有未知的邊界情況、較少的社群資源、不穩定的 API
- "Boring technology" (成熟技術) 往往是最安全的選擇
- 選擇技術應基於：成熟度、團隊熟悉度、生態系統，而非炒作週期
- "Choose boring technology." — Dan McKinley

---

## 7. 「效能問題可以以後再處理」

**誤解 Misconception**：先讓功能運作，效能之後再最佳化。

**事實 Reality**：
- 有些架構決策（資料模型、API 設計）後續改變成本極高
- 過早最佳化 (premature optimization) 確實不好，但完全不考慮效能也不行
- 關鍵是：在設計階段考慮效能約束，在實作階段避免明顯的瓶頸
- "Make it work, make it right, make it fast" — 順序很重要

---

## 8. 「重寫比重構更快」

**誤解 Misconception**：遺留程式碼太亂，不如從頭重寫。

**事實 Reality**：
- 重寫會丟失所有隱性知識（bug fixes, edge cases, business rules）
- Netscape 重寫（1998–2002）是軟體史上最著名的重寫失敗案例
- 漸進式重構 (strangler fig pattern) 幾乎永遠比重寫更安全
- "Things You Should Never Do, Part I" — Joel Spolsky

---

## 9. 「AI 將取代軟體工程師」

**誤解 Misconception**：AI coding tools 讓軟體工程師變得不需要。

**事實 Reality**：
- AI 工具提高生產力（code completion, boilerplate generation）
- 但軟體工程的核心——理解需求、架構決策、取捨判斷——仍需要人類
- AI 是 "copilot"（副駕駛），不是 "autopilot"
- 軟體工程師的角色會演變，但不會消失

---

## 10. 「好的程式碼不需要註解」

**誤解 Misconception**：程式碼應該自解釋 (self-documenting)，不需要註解。

**事實 Reality**：
- 程式碼告訴你「做什麼」和「怎麼做」
- 註解告訴你「為什麼這樣做」
- 好的註解解釋 **intent**（意圖），而非重複程式碼
- 壞的註解（過時、誤導）確實比沒有註解更糟

```python
# Bad comment — 重複程式碼
x = x + 1  # increment x by 1

# Good comment — 解釋意圖
x = x + 1  # Account for 1-based indexing in the legacy API
```

---

> 💡 **One More Thing**: The best engineers aren't those who know the most — they're those who know what they don't know and aren't afraid to say "I don't know, let me find out."
