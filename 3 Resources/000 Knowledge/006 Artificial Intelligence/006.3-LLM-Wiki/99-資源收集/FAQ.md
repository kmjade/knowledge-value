---
title: LLM-Wiki FAQ
aliases: [LLM-Wiki Frequently Asked Questions, 常見問題]
tags: [DDC/006.3, llm-wiki, km, faq, reference]
created: 2026-06-01
type: reference
topic: 006.3-LLM-Wiki
---

# LLM-Wiki FAQ — 常見問題

> 關於 LLM-Wiki 方法論的常見問題與最佳實踐解答。

---

## 基礎概念

### Q1: LLM-Wiki 和傳統 Wiki 有什麼本質區別？

傳統 Wiki 是人類手動撰寫和維護的，LLM-Wiki 將 LLM 定位為「知識編譯器」，自動從 raw/ 原始資料生成 wiki/ 頁面。核心差異在於：人類不再直接編輯 wiki 頁面，而是通過管理 raw/ 間接影響。

### Q2: 為什麼需要 raw/ 和 wiki/ 分離？

分離確保了兩個關鍵屬性：
- **原始純淨**：raw/ 保持資料原貌，不受 AI 編譯誤差污染
- **編譯可復現**：相同的 raw/ + CLAUDE.md 總能產生一致的 wiki/（對相同 LLM）
- **增量更新**：只處理新增 raw 文件，避免重複編譯

### Q3: LLM-Wiki 是否取代 PARA？

否。LLM-Wiki 是知識管理層，PARA 是行動管理層。兩者互補：
- PARA 管理「做什麼」（行動）
- LLM-Wiki 管理「知道什麼」（知識）
- raw/ 是兩者的橋樑（從 PARA Resources 流入）

---

## 實施相關

### Q4: 如何開始建立第一個 LLM-Wiki？

```
1. 選擇一個主題（如「Python 非同步編程」）
2. 創建目錄結構（raw/ + wiki/ + CLAUDE.md）
3. 編寫 CLAUDE.md（定義概念域）
4. 放入 3–5 篇 raw 文章（compiled: false）
5. 執行 /wiki-compile <topic>
6. 檢查 wiki/ 輸出質量
```

### Q5: 一個概念域應該有多少個概念？

建議 **6–15 個**。少於 6 個可能域劃分過細，超過 15 個則認知負載過高，應考慮進一步拆分。

### Q6: raw/ 中的文件應該是什麼格式？

Markdown (.md)，frontmatter 包含：
```yaml
---
title: <title>
compiled: false
source_url: <optional>
date_added: YYYY-MM-DD
---
```

### Q7: 如何處理跨語言內容？

- **正文**：主要語言（如繁體中文）
- **關鍵術語**：保留 English 原文
- **aliases**：在 frontmatter 中同時提供中英文別名
- **CLAUDE.md**：在編譯規則中定義語言策略

---

## 維護相關

### Q8: 多久執行一次 Lint？

| 知識庫活躍度 | Lint 頻率 |
|-------------|----------|
| 高活躍（每日有新 raw） | 每日或每次編譯後 |
| 中活躍（每週有新 raw） | 每週 |
| 低活躍（每月有新 raw） | 每月 |

### Q9: 發現矛盾應該如何處理？

```
1. 檢查兩個頁面的 Sources，確認原始資訊
2. 如果原始資訊矛盾 → 保留兩種觀點，在概念頁標註「存在爭議」
3. 如果原始資訊一致但編譯錯誤 → 手動修正或重新編譯
4. 在 log.md 記錄矛盾處理過程
```

### Q10: 可以手動編輯 wiki/ 頁面嗎？

原則上不建議。如果需要修正：
- **臨時修正**：在 wiki 頁面手動編輯，同時在 raw/ 中修正對應資訊
- **永久方案**：修正 raw/ 後重新編譯
- **例外**：修正明顯的拼寫錯誤等技術問題

---

## 進階問題

### Q11: 如何實現跨知識庫查詢？

使用 QueryAgent 的 Cross-KB 策略：
1. 讀取目標域的 CLAUDE.md 獲取跨庫映射
2. 沿 DDC 映射表路由到相關知識庫
3. 在每個相關庫中執行 Index-first 查詢
4. 合併結果，按相關性排序

### Q12: LLM-Wiki 適用於團隊協作嗎？

適用，但需要額外約定：
- **CLAUDE.md 合議制**：Schema 變更需要團隊審核
- **raw/ 分區**：按團隊成員或主題分目錄
- **Git Flow**：使用 PR 流程管理 wiki/ 變更
- **編譯權限**：指定專人執行 /wiki-compile

---

## 相關連結

- [[01-LLM-Wiki-概述]] — 基礎概念
- [[03-编译工作流]] — 操作流程
- [[08-质量保障]] — 維護標準
- [[99-資源收集/資源總覽|資源總覽]] — 相關資源
- [[006.3-LLM-Wiki]] — 返回 MOC
