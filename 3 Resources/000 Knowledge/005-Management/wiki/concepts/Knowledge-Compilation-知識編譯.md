---
aliases:
  - Knowledge Compilation
  - 知識編譯
  - AI 編譯
created: 2026-06-01
ddc: "005"
udc: "659.2:004.8"
clc: "G302"
tags:
  - #udc/060
  - #ddc/060
type: concept
topic: knowledge-management
status: reviewed
---

# 知識編譯 (Knowledge Compilation)

## 定義

**知識編譯**是 LLM-Wiki 方法論的核心流程：AI Agent 自動讀取原始資料（raw/），提取概念、實體和關係，生成結構化的 Wiki 頁面（wiki/）。它將 KM 中最痛苦的「組織和維護」環節交給 AI，將用戶從操作者解放為決策者。

## 核心原理

### 傳統組織 vs AI 編譯

| 傳統方法 | 知識編譯 |
|----------|----------|
| 人類手動分類、標籤、鏈接 | AI 自動提取、分類、關聯 |
| 每新增一條筆記 → 手動決定放哪 | 批量處理，一次性編譯 |
| 維護成本隨規模線性增長 | 維護成本固定（AI 承擔） |
| 用戶 = 組織者 | 用戶 = 審查者 + 消費者 |

### 編譯流程

```
raw/articles/*.md
raw/papers/*.md              AI 讀取 → 提取 → 生成
raw/books/*.md               ────────────────────────→  wiki/concepts/*.md
raw/conversations/*.md                                  wiki/entities/*.md
                                                        wiki/sources/*.md
                             自動更新 wiki/index.md
                             自動記錄 wiki/log.md
```

## 應用場景

- **個人知識庫維護**: 每週自動將新收集的文章轉化為結構化知識
- **研究文獻綜述**: 批量讀取論文筆記，自動生成概念關係圖
- **組織 KM**: 會議記錄自動提煉為行動項和決策日誌

## 相關概念

- [[../../../../000 Knowledge/wiki/concepts/LLM-Wiki\|LLM-Wiki 方法論]] — 知識編譯的上層方法論
- [[../../../../000 Knowledge/wiki/concepts/Information-Lifecycle\|資訊生命週期]] — 從捕獲到編譯的完整流程
- [[Maintenance-Cost-維護成本困境\|維護成本困境]] — 知識編譯解決的核心問題

## Sources

- [[3 Resources/000 Knowledge/005-Management/wiki/sources/为什么你的大脑越来越乱\|為什麼你的大腦越來越亂]]
