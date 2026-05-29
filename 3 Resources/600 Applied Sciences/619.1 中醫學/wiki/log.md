---
type: log
topic: traditional-chinese-medicine
created: 2026-05-29
---

# 中醫學 Wiki 編譯日誌 Compilation Log

## 2026-05-29 — 首次編譯 Initial Compilation

### 編譯範圍
- 素材來源：`ram/灵枢/` (30 篇章節)
- 概念提取範圍：基礎理論 + 診斷治療

### 產出
- ✅ wiki/index.md — 知識索引
- ✅ wiki/concepts/ — 8 個核心概念頁
- ✅ wiki/entities/ — 5 個關鍵實體頁
- ✅ wiki/sources/ — 3 個來源頁
- ✅ CLAUDE.md — Schema 定義

### 編譯規則
- 數據脫敏：個人醫療記錄不進入 wiki/
- ram/ 只讀：經典原文不修改
- 來源必須：所有頁面標註 sources
- 鏈接優先：使用 [[]] 建立概念關聯

### 待處理事項
- [ ] 靈樞剩餘 ~50 篇章節的增量編譯
- [ ] 素問 81 篇章節的素材恢復
- [ ] 概念→實體→來源的交叉引用完善
- [ ] 方劑學概念頁擴展
- [ ] 針灸推拿概念頁擴展

### 質量指標
- 概念覆蓋率：8/20+ (40%) — 核心基礎理論已覆蓋
- 來源標註率：100%
- 交叉鏈接密度：待測量
