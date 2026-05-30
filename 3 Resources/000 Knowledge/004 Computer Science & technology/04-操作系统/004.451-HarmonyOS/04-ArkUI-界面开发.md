---
aliases:
  - ArkUI
  - 鴻蒙界面開發
  - Declarative UI
  - State Management
tags:
  - DDC/004.451
  - harmonyos
  - arkui
  - ui-framework
  - state-management
created: 2026-05-30
updated: 2026-05-30
---

# 04 — ArkUI 界面開發

> ArkUI 是 HarmonyOS 的聲明式 UI 開發框架，支援跨設備自我調整佈局。
> 內建豐富組件、動畫系統與響應式狀態管理。

---

## 聲明式 UI 典範

| 特性 | 說明 |
|------|------|
| **描述 UI** | 用 `build()` 方法聲明 UI 結構，不手動操作 DOM |
| **狀態驅動** | UI = f(State)，狀態變化自動觸發 UI 刷新 |
| **組合模式** | `@Component` 裝飾的自定義組件可任意嵌套 |
| **條件渲染** | `if/else`、`ForEach` 直接嵌入 `build()` |
| **對比** | 類似 SwiftUI / Jetpack Compose / Flutter |

```typescript
@Component
struct Counter {
  @State count: number = 0
  build() {
    Column() {
      Text(`Count: ${this.count}`)
      Button('+') { this.count++ }
    }
  }
}
```

---

## 核心組件系統 Component System

| 類別 | 組件 | 用途 |
|------|------|------|
| **容器** | Column, Row, Flex, Stack, Grid | 佈局容器 |
| **基礎** | Text, Image, Button, TextInput | 基礎交互 |
| **列表** | List, ListItem, Grid, GridItem | 滾動列表 |
| **導航** | Navigation, NavRouter, TabContent | 頁面導航 |
| **反饋** | Progress, LoadingProgress, Dialog | 狀態反饋 |
| **媒體** | Video, XComponent, Canvas | 多媒體渲染 |
| **穿戴** | WatchCrown, Rotary | 穿戴設備特有 |

---

## 狀態管理 State Management

| 裝飾器 | 作用域 | 資料流向 | 說明 |
|--------|:------:|:--------:|------|
| **@State** | 組件內部 | 單向 | 組件自身狀態，變化觸發 rebuild |
| **@Prop** | 父子 | 父→子（單向） | 父組件傳給子組件的不可變拷貝 |
| **@Link** | 父子 | 雙向同步 | 父子共享同一資料源 |
| **@Provide/@Consume** | 跨層級 | 雙向 | 跨越多層組件的狀態共享 |
| **@Observed/@ObjectLink** | 跨組件 | 雙向 | 對象屬性級別的響應式 |
| **@StorageLink** | 全局 | 雙向 | 綁定 AppStorage（持久化） |
| **LocalStorage** | 頁面級 | — | 頁面級別的鍵值存儲 |

---

## 佈局系統 Layout

| 佈局模式 | 說明 |
|----------|------|
| **線性佈局** | Column (垂直) / Row (水平) 搭配 `justifyContent` + `alignItems` |
| **彈性佈局** | Flex 支援 wrap、basis、grow、shrink |
| **層疊佈局** | Stack 層疊定位，`alignContent` 控制對齊 |
| **網格佈局** | Grid + GridItem 支援合併單元格 |
| **相對佈局** | RelativeContainer 基於錨點的相對定位 |
| **響應式** | 透過 `breakpointSystem` 實現斷點自我調整 |

---

## 動畫系統 Animation

| 類型 | API | 說明 |
|------|-----|------|
| **屬性動畫** | `.animation({ duration, curve })` | 單屬性過渡 |
| **顯式動畫** | `animateTo({}, () => {})` | 批量屬性變化 |
| **轉場動畫** | `.transition()` | 組件出現/消失 |
| **路徑動畫** | `pathAnimation` | 沿路徑運動 |
| **手勢聯動** | `.gesture()` + 動畫 | 拖拽、縮放手勢 + 動畫響應 |
| **Curve** | Linear / EaseIn / EaseOut / Spring / Custom | 緩動曲線 |
