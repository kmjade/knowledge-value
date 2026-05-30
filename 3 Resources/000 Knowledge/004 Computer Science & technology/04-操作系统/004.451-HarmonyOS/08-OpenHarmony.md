---
aliases:
  - OpenHarmony
  - 開源鴻蒙
  - LiteOS
  - Hi3861
tags:
  - DDC/004.451
  - harmonyos
  - openharmony
  - opensource
  - iot
created: 2026-05-30
updated: 2026-05-30
---

# 08 — OpenHarmony 開源專案

> OpenHarmony 是由開放原子開源基金會 (OpenAtom Foundation) 託管的開源操作系統。
> 支援從輕量 IoT 到標準富設備的全場景，採用 Apache 2.0 許可證。

---

## 系統類型 System Types

| 類型 | 記憶體需求 | 適用設備 | 內核 | 範例晶片 |
|------|:----------:|----------|------|----------|
| **Light (輕量)** | ≥128KB | 智慧家居感測器、標籤 | LiteOS-M | Hi3861V100 |
| **Small (小型)** | ≥1MB | 穿戴設備、IP 攝像頭 | LiteOS-A | Hi3516DV300 |
| **Standard (標準)** | ≥128MB | 手機、平板、車機 | Linux / 鴻蒙微內核 | RK3568 |

---

## 主要開發板 Dev Boards

| 開發板 | 晶片 | 系統類型 | 核心規格 | 適用場景 |
|--------|------|:--------:|----------|----------|
| **Hi3861** | Hi3861V100 | Light | ARM Cortex-M4, 160MHz, 352KB SRAM | WiFi IoT 感測器 |
| **Hi3516** | Hi3516DV300 | Small | ARM Cortex-A7, 1GB DDR | 智慧攝像頭、門禁 |
| **RK3568** | Rockchip RK3568 | Standard | ARM Cortex-A55 x4, 2GB+ RAM | 平板、智慧屏、邊緣計算 |
| **BearPi** | 多種 | Light/Small | 社群開發板 | 教育、原型驗證 |

---

## OpenHarmony 社群治理

| 維度 | 說明 |
|------|------|
| **託管組織** | 開放原子開源基金會 (OpenAtom Foundation) |
| **許可證** | Apache 2.0 |
| **程式碼託管** | Gitee (主) / GitHub (鏡像) |
| **SIG** | Special Interest Groups，按技術域分工 |
| **PMC** | Project Management Committee，專案管理委員會 |
| **貢獻者** | 華為、中軟國際、深開鴻、潤和軟體等 |
| **版本週期** | 約 6 個月一個大版本 |

---

## OpenHarmony 版本演進

| 版本 | 發佈時間 | 重點 |
|------|:--------:|------|
| **1.0** | 2020.09 | 初始開源，支援 128KB~128MB 設備 |
| **2.0** | 2021.06 | 標準系統支援，新增分散式能力 |
| **3.0** | 2021.09 | 標準系統完善，ArkUI 開源 |
| **3.1** | 2022.03 | API 9，Stage Model 引入 |
| **3.2** | 2023.04 | API 10，ArkTS 正式語言 |
| **4.0** | 2023.10 | API 11，ArkUI 增強 |
| **4.1** | 2024.04 | API 12，穩定性優化 |
| **5.0** | 2024.10 | API 13，與 HarmonyOS NEXT 對齊 |

---

## 開發環境搭建

| 步驟 | 工具/命令 |
|:----:|----------|
| 1 | 安裝 DevEco Studio (OpenHarmony 版) |
| 2 | 設定 SDK：選擇對應 API Level |
| 3 | 選擇開發板：Hi3861 / Hi3516 / RK3568 |
| 4 | 燒錄工具：HiBurn (Hi3861) / DevEco Device Tool |
| 5 | 編譯命令：`hb build` (針對標準系統) |
| 6 | 原始碼獲取：`repo init` + `repo sync` |

---

## 與 HarmonyOS 的關係

```
OpenHarmony (上游開源)
    │
    ├──→ HarmonyOS (華為商業版 + HMS)
    │
    └──→ 第三方發行版 (深開鴻、潤和、中軟等)
```

> HarmonyOS = OpenHarmony + HMS Core + 華為自有應用 + 商業支援
