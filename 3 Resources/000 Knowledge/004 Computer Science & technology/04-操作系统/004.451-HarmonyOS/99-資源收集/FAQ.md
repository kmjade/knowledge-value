---
aliases:
  - HarmonyOS FAQ
  - 鴻蒙常見問題
tags:
  - DDC/004.451
  - harmonyos
  - faq
created: 2026-05-30
updated: 2026-05-30
---

# FAQ — HarmonyOS 常見問題

> 整理開發者與用戶最高頻的問題與解答。

---

## 基礎概念

| Q | A |
|---|----|
| **HarmonyOS 和 OpenHarmony 有什麼區別？** | HarmonyOS 是華為的商業發行版（= OpenHarmony + HMS + 自有應用），OpenHarmony 是上游開源專案。 |
| **HarmonyOS NEXT 還相容 Android APK 嗎？** | 不兼容。NEXT 徹底移除 AOSP 兼容層，僅支援 HAP 原生格式。 |
| **鴻蒙是 Android 套殼嗎？** | 1.0~4.x 使用了 AOSP 兼容層，但核心架構（分散式軟總線等）是自研。NEXT 已完全自研，內核為鴻蒙微內核。 |
| **ArkTS 和 TypeScript 的關係？** | ArkTS 是 TypeScript 超集，增加裝飾器語法（@State, @Component 等）用於聲明式 UI。 |

---

## 開發相關

| Q | A |
|---|----|
| **DevEco Studio 支援 Mac 嗎？** | 目前僅支援 Windows 和 macOS (Intel + Apple Silicon)。 |
| **可以用 JavaScript 開發嗎？** | 可以，但官方推薦 ArkTS。JS 模式功能受限，新項目建議 ArkTS。 |
| **FA Model 和 Stage Model 選哪個？** | 新項目強烈推薦 Stage Model（API 9+）。FA Model 將逐步淘汰。 |
| **HAP 和 APP 的區別？** | HAP 是單一模組包，APP 是多 HAP 的聚合包，用於應用市場分發。 |
| **如何調試分散式功能？** | DevEco Studio 支援多設備同時調試（分散式調試），需多台真機登入同一 HUAWEI ID。 |
| **支援熱更新嗎？** | 正式應用不允許熱更新（安全限制），但原子化服務支援服務端即時更新。 |

---

## 發佈相關

| Q | A |
|---|----|
| **應用審核需要多久？** | 通常 1~7 個工作日，複雜應用可能更長。 |
| **上架需要準備什麼？** | 應用圖示、截圖、描述、隱私聲明、發佈證書及 Profile、測試帳號（如需）。 |
| **個人開發者可以上架嗎？** | 可以，需完成華為開發者實名認證。 |
| **收費應用支援嗎？** | 支援，需設定價格和稅務資訊。 |
| **是否必須接入 HMS？** | 可以不用 HMS，但登入/支付/推播/地圖等服務依賴 HMS Kit。 |

---

## OpenHarmony 相關

| Q | A |
|---|----|
| **OpenHarmony 能用來做手機嗎？** | Standard 系統型態理論上可以，但缺少 HMS 生態，需自建應用商店和基礎服務。 |
| **哪個開發板適合入門？** | Hi3861 (WiFi IoT) 適合初學者；RK3568 適合富設備開發。 |
| **OpenHarmony 和 HarmonyOS 的 API 兼容嗎？** | 大部分 API 相容，但 HMS Kit 專有 API 僅 HarmonyOS 可用。 |
