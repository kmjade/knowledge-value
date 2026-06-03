---
created: 2026-06-01
type: compile-log
topic: knowledge-management
---

# KM Wiki 編譯日誌

## 2026-06-01 — 首次編譯

**操作**: `/wiki-compile 060 knowledge`（首次）

**來源文件** (3):
- raw/articles/为什么你的大脑越来越乱.md → compiled: true
- raw/articles/你学的所有笔记方法论，都是给写书的人设计的.md → compiled: true
- raw/articles/六边形AI 数字大脑——完整模板文件包.md → compiled: true

**新建頁面**:

| 類型 | 頁面 | 說明 |
|------|------|------|
| concept | [[Knowledge-Compilation-知識編譯\|知識編譯]] | AI 驅動的知識結構化流程 |
| concept | [[Maintenance-Cost-維護成本困境\|維護成本困境]] | KM 系統隨規模崩潰的根本原因 |
| concept | [[Low-Friction-Capture-低摩擦捕獲\|低摩擦知識捕獲]] | PKM 設計的核心原則 |
| concept | [[Writer-Centric-Bias-創作者偏誤\|創作者偏誤]] | 主流筆記方法論的設計偏差 |
| concept | [[Progressive-Processing-漸進式處理\|漸進式處理]] | 分階段逐層深入的知識處理 |
| source | [[3 Resources/000 Knowledge/005-Management/wiki/sources/为什么你的大脑越来越乱\|為什麼你的大腦越來越亂]] | 來源追溯 |
| source | [[你学的所有笔记方法论\|你學的所有筆記方法論]] | 來源追溯 |
| source | [[六边形AI数字大脑模板\|六邊形 AI 數字大腦模板]] | 來源追溯 |

**修復**:
- [[3 Resources/000 Knowledge/005-Management/wiki/entities/Andrej-Karpathy\|Andrej Karpathy]] — topic: people → knowledge-management；修復 4 處斷鏈

**統計**: 3 來源 → 5 概念 + 3 來源頁 + 1 實體修復

---

## 2026-06-01 — 基礎設施修復（P0）

**操作**: 修復 005-Management 子庫的基礎設施問題。

**變更**:
- CLAUDE.md: People Wiki Schema → KM Wiki Schema（DDC 005 知識管理）
- wiki/index.md: People 索引 → KM Wiki 索引
- wiki/log.md: 本文件，重置為 KM 編譯日誌
- 創建 wiki/concepts/ 目錄
- 創建 wiki/sources/ 目錄

**狀態**: 基礎設施就緒。

---

*最後更新: 2026-06-01*
