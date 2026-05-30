# DDC 004.16 嵌入式系統 — KB + LLM-Wiki 部署計劃

## Goal
在 `/mnt/e/knowledge-value` 建立 DDC 004.16 嵌入式系統 (Embedded Systems) 知識庫，含標準 KB 結構 (MOC + 00-MOCs + 01-09 章節 + 資源收集) 及 LLM-Wiki 編譯層 (CLAUDE.md + wiki/)。

## Context
- **Vault 現狀**：004 目錄尚未建立。UDC 表 (`000 Knowledge/050/04-UDC-in-Depth/UDC-完整分类表.md`) 提及 `004 Computer Science & technology` 和 `004.8 AI` 已獨立建庫，但實際路徑不存在。689 业余手工已有 STM32 教程文件，可作為素材參考或遷移。
- **編號依據**：004.16 在 DDC 中對應「特定類型電腦 / 微控制器 / 嵌入式系統」。參考 UDC 004.2–004.9 的細分（架構 → 硬體 → 軟體 → 數據 → 網絡 → AI → 應用），004.16 填補「嵌入式/微控制器」這一空白。
- **命名慣例**：採用簡體中文目錄名 + DDC 編號（與 300/400/500 系列一致）。
- **語言**：繁體中文 + English。

## Proposed Approach
一次性構建：KB 骨架 (14 files) + LLM-Wiki (10 files) ≈ 24 files。

## Directory Structure
```
3 Resources/004 Data Science/
├── README.md                          # 004 領域入口
├── CLAUDE.md                          # 004 領域 LLM-Wiki Schema
└── 004.16-嵌入式系統/
    ├── 004.16-嵌入式系統.md           # MOC 總索引
    ├── README.md
    ├── 00-MOCs/
    │   └── 嵌入式系統知識地圖.md
    ├── 01-嵌入式系統基礎
    ├── 02-微控制器架構
    ├── 03-ARM Cortex-M
    ├── 04-STM32 開發
    ├── 05-RTOS 即時作業系統
    ├── 06-嵌入式 Linux
    ├── 07-周邊介面與通訊
    ├── 08-低功耗設計
    ├── 09-嵌入式 AI (TinyML)
    ├── 99-資源收集/
    │   ├── 資源總覽.md
    │   └── FAQ.md
    ├── CLAUDE.md                      # Wiki Schema
    └── wiki/
        ├── index.md
        ├── log.md
        ├── concepts/
        │   ├── 微控制器.md            (Microcontroller)
        │   ├── ARM架構.md             (ARM Architecture)
        │   ├── RTOS.md                (Real-Time OS)
        │   ├── GPIO.md                (General Purpose I/O)
        │   ├── 嵌入式Linux.md         (Embedded Linux)
        │   ├── 中斷處理.md            (Interrupt Handling)
        │   └── 即時系統.md            (Real-Time Systems)
        ├── entities/
        │   └── STM32.md               (STM32 Family)
        └── sources/
            └── source-嵌入式-KB.md
```

## Step-by-Step Plan

### Phase 1: 004 領域骨架
1. 建立 `3 Resources/004 Data Science/README.md` — 領域入口
2. 建立 `3 Resources/004 Data Science/CLAUDE.md` — 領域級 Wiki Schema

### Phase 2: 004.16 KB 結構 (10 files)
3. 建立 `004.16-嵌入式系統.md` MOC (含 01-09 章節導航 + 關聯 KB 交叉引用)
4. 建立 `README.md`
5. 建立 `00-MOCs/嵌入式系統知識地圖.md`
6–14. 建立 01-09 章節文件 (每章約 8-12 行概述 + 關鍵概念)

### Phase 3: LLM-Wiki 部署 (8 files)
15. 建立 `CLAUDE.md` (Wiki Schema: 7 concepts + 1 entity)
16–22. 建立 7 個 concept 頁面
23. 建立 1 個 entity 頁面 (STM32)
24. 建立 `wiki/index.md` + `wiki/log.md` + `wiki/sources/source-嵌入式-KB.md`

### Phase 4: Commit
25. `git add` + commit + push

## Files Likely to Change
- New: ~24 files under `3 Resources/004 Data Science/`
- No existing files modified

## Validation
- All wikilinks in MOC resolve to existing files
- wiki/index.md enumerates all 7 concepts + 1 entity
- wiki/log.md records completion status
- Git commit clean, push successful

## Cross-References
- 關聯 KB: `689 业余手工/08-電子DIY/智能小车/` (STM32 教程可做素材引用)
- 關聯 KB: `DDC 600 / 620 工程` (嵌入式系統是工程子領域)

## Risks / Tradeoffs
- **素材依賴**：004.16 主要內容來自 agent 知識，非既有 KB 章節 — 質量取決於 prompt 深度
- **目錄位置**：004 既不在 000 Knowledge 下也不在 600 Applied Sciences — 選擇獨立於 `3 Resources/004 Data Science/`，與 UDC 表中引用路徑 `000 Knowledge/004 Computer Science & technology/` 略有偏差。此為務實選擇：DDC 004 自成一體且未來會擴展 (004.6, 004.8 AI 等)
- **STM32 文件**：689 中已有 STM32 教程，可選擇軟鏈接或 wikilink 引用而非物理遷移

## Open Questions
- 004.16 主題名稱最終確認：嵌入式系統 vs 微控制器 vs 單晶片？
- 004 領域 CLAUDE.md 需涵蓋 004.6 (數據), 004.7 (網絡), 004.8 (AI) 的未來擴展藍圖
