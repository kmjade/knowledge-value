---
aliases:
  - HarmonyOS 概述
  - HarmonyOS Overview
  - 鴻蒙版本演進
tags:
  - DDC/004.451
  - harmonyos
  - version-history
  - openharmony
  - kernel
created: 2026-05-30
updated: 2026-05-30
---

# 01 — HarmonyOS 概述與版本演進

> HarmonyOS 是華為面向萬物互聯時代的全場景分散式操作系統。
> 從 2019 年發佈至今，經歷了從兼容 Android 到完全自主的 NEXT 路線。

---

## 版本時間線 Version Timeline

| 版本 | 發佈時間 | 內核 | 關鍵特性 | Android 兼容 |
|------|:--------:|------|----------|:------------:|
| **HarmonyOS 1.0** | 2019.08 | Linux + LiteOS | 智慧屏首發、分散式架構初現 | ✅ |
| **HarmonyOS 2.0** | 2020.09 | Linux + LiteOS | 手機/平板/穿戴適配、超級設備 | ✅ |
| **HarmonyOS 3.0** | 2022.07 | Linux + LiteOS | 原子化服務、超級終端增強 | ✅ |
| **HarmonyOS 4.0** | 2023.08 | Linux + LiteOS | ArkUI 增強、方舟引擎升級 | ✅ |
| **HarmonyOS 5 NEXT** | 2024.10 | 鴻蒙微內核 | 完全自主、不再兼容 Android APK | ❌（僅 HAP） |

---

## HarmonyOS vs OpenHarmony

| 維度 | HarmonyOS | OpenHarmony |
|------|-----------|-------------|
| **性質** | 華為商業發行版 | 開源社群版本 |
| **內核** | 鴻蒙微內核 (NEXT) / Linux | LiteOS-M/A + Linux |
| **生態** | HMS、AppGallery、華為服務 | 無 HMS，需自建生態 |
| **許可證** | 商業授權 | Apache 2.0 |
| **應用格式** | HAP (HarmonyOS Ability Package) | HAP (OpenHarmony) |
| **關係** | 基於 OpenHarmony + HMS | 上游開源基礎 |

---

## 鴻蒙內核 vs Linux 內核

| 對比維度 | 鴻蒙微內核 (NEXT) | Linux 內核 |
|----------|-------------------|------------|
| **架構** | 微內核 Microkernel | 單內核 Monolithic |
| **最小 TCB** | <10K LOC | >20M LOC |
| **即時性** | 確定時延引擎 | CFS 調度（非確定性） |
| **安全等級** | CC EAL 5+ 潛力 | CC EAL 4+ |
| **資源消耗** | 極低 (KB 級) | 較高 (MB 級) |
| **適用場景** | IoT 到手機全場景 | 伺服器/桌面/嵌入式 |

---

## 關鍵里程碑

| 年份 | 里程碑 |
|:----:|--------|
| 2012 | 鴻蒙內核立項研發 |
| 2019 | HDC 發佈 HarmonyOS 1.0 |
| 2020 | 開源 OpenHarmony，捐贈給開放原子開源基金會 |
| 2021 | HarmonyOS 2.0 手機升級，用戶破億 |
| 2023 | 方舟編譯器 ArkCompiler 成熟 |
| 2024 | HarmonyOS 5 NEXT 發佈，徹底脫離 AOSP |
| 2025+ | 建構獨立應用生態，目標 500K+ 原生應用 |
