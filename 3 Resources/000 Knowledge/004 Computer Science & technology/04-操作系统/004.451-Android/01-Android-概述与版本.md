---
aliases: [Android Versions, Android 版本歷史, Android History]
tags: [DDC/004.451, android, versions, history, aosp]
created: 2026-05-30
---

# 01 Android 概述與版本 Overview & Versions

> 從 2008 年 HTC Dream (G1) 到 Android 16，全球 30 億活躍裝置的行動作業系統霸主。
> From the 2008 HTC Dream (G1) to Android 16, the mobile OS powering 3+ billion active devices worldwide.

## 歷史時間線 History Timeline

| 年份 | 版本 Version | API | 代號 Codename | 重大變革 |
|:---:|:---|:--:|------|------|
| 2008 | 1.0 | 1 | — | 首發 HTC Dream；Android Market |
| 2009 | 1.5 Cupcake | 3 | Cupcake | 虛擬鍵盤、Widget |
| 2010 | 2.2 Froyo | 8 | Froyo | JIT 編譯器、WiFi 熱點 |
| 2011 | 3.0 Honeycomb | 11 | Honeycomb | 平板專用介面 |
| 2011 | 4.0 Ice Cream Sandwich | 14 | ICS | Holo UI、統一手機平板 |
| 2014 | 5.0 Lollipop | 21 | Lollipop | Material Design、ART 取代 Dalvik |
| 2015 | 6.0 Marshmallow | 23 | Marshmallow | Runtime Permissions、Doze |
| 2017 | 8.0 Oreo | 26 | Oreo | Project Treble、Notification Channels |
| 2018 | 9 Pie | 28 | Pie | Gesture Navigation、Digital Wellbeing |
| 2019 | 10 | 29 | Quince Tart | Scoped Storage、5G、Foldable |
| 2020 | 11 | 30 | Red Velvet Cake | Conversation Notifications、Bubbles |
| 2022 | 13 | 33 | Tiramisu | Per-app Language、Photo Picker |
| 2023 | 14 | 34 | Upside Down Cake | Ultra HDR、Health Connect |
| 2024 | 15 | 35 | Vanilla Ice Cream | Private Space、Satellite Connectivity |
| 2025 | 16 | 36 | (TBD) | 嵌入式 AI、更深度 ML 整合 |

## AOSP vs Google Play 生態 Ecosystem

| 面向 Aspect | AOSP (Android Open Source Project) | Google Play 生態 |
|------|------|------|
| **授權** | Apache 2.0 / GPLv2 (Kernel) | 閉源 GMS (Google Mobile Services) |
| **核心應用** | 基礎 AOSP Apps (Dialer, Browser) | Gmail, Maps, Play Store, YouTube |
| **認證** | 無 (自由 fork) | CTS/VTS/GMS 認證 |
| **代表** | LineageOS, Amazon Fire OS, 華為鴻蒙 | Pixel, Samsung, Xiaomi (GMS 認證) |
| **API** | 開放 API | Firebase, Play Services, ML Kit |

## 關鍵概念 Key Concepts

- **API Level**：每個 Android 版本對應一個整數 API Level，`minSdk` / `targetSdk` / `compileSdk` 決定相容範圍
- **CTS (Compatibility Test Suite)**：確保 OEM 實作符合 Android 相容性規範
- **Project Treble** (Android 8+)：將 vendor 實作與 Android framework 分離，加速系統更新
- **Project Mainline** (Android 10+)：透過 Google Play System Update 模組化更新核心系統元件
- **GSI (Generic System Image)**：純 AOSP 映像，可在 Treble 相容裝置上直接啟動

## 代號傳統 Codename Tradition

```text
A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
Astro → Bender → Cupcake → Donut → Eclair → Froyo →
Gingerbread → Honeycomb → Ice Cream Sandwich → Jelly Bean →
KitKat → Lollipop → Marshmallow → Nougat → Oreo → Pie →
Quince Tart → Red Velvet Cake → Snow Cone → Tiramisu →
Upside Down Cake → Vanilla Ice Cream → (W...) → (X...) → (Y...) → (Z...)
```
