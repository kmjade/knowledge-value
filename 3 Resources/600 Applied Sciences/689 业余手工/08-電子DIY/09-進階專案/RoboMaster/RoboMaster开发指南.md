---
title: RoboMaster 开发指南
aliases:
  - RoboMaster Knowledge Base
  - DJI 機甲大師開發
para: resource
domain:
  - "[[RoboMaster]]"
  - "[[DJI]]"
tags:
  - para/resource/tech
  - topic/robotics
  - topic/robomaster
  - type/moc
created: 2026-05-23
modified: 2026-05-23
source: https://robomaster-dev.readthedocs.io/zh-cn/latest/
---

# RoboMaster 开发指南

> [!info] 知識庫概述
> DJI RoboMaster EP 教育機器人完整開發文檔，包括 Python SDK、明文 SDK、拓展模塊和多機控制技術。

---

## 產品概述

| 項目 | 說明 |
|------|------|
| **廠商** | DJI 大疆創新 |
| **產品** | RoboMaster EP 教育拓展套裝 |
| **定位** | 教育機器人開發平台 |
| **官方文檔** | https://robomaster-dev.readthedocs.io/zh-cn/latest/ |
| **GitHub** | https://github.com/dji-sdk/RoboMaster-SDK |

### EP 套裝介紹

RoboMaster EP 教育拓展套裝在 RoboMaster S1 教育機器人的基礎上延展出豐富的拓展性，配有完善的課程內容及全新 RoboMaster 青少年專屬賽事；各類編程模塊均圍繞教學需求精心設計，帶來煥然一新的教學與學習體驗。

### EP 機器人形態

#### 步兵機器人
- 與 S1 外觀接近，軟硬件升級
- 增加新部件，拓展能力強
- 通過傳感器轉接模塊接入第三方傳感器
- 擁有更多可編程空間

#### 工程機器人
- 採用並聯機械臂代替雲台結構
- 保留圖傳系統
- 機械臂末端裝配機械夾爪
- 可執行更複雜的任務

#### 教育無人機
- Tello Talent (TT)
- Tello EDU

---

## 文檔結構

### 一、快速開始

| 章節 | 說明 | 文檔 |
|------|------|------|
| 1 | 開篇介紹 | [[1. 开篇介绍]] |
| 2 | 編程環境安裝 | [[2. 编程环境安装]] |
| 3 | 第三方平台通信 | [[3. 第三方平台通信]] |

### 二、Python SDK 基礎

| 章節 | 說明 | 文檔 |
|------|------|------|
| 1 | SDK 安裝 | [[1. SDK安装]] |
| 2 | SDK 下載源碼 | [[2. SDK下载源码]] |
| 3 | 建立連接 | [[3. 建立连接]] |
| 4 | 新手入門 - 基礎篇 | [[4. 新手入门-基础篇]] |
| 5 | 新手入門 - EP 篇 | [[5. 新手入门-EP篇]] |
| 6 | 新手入門 - 無人機篇 | [[6. 新手入门-无人机篇]] |
| 7 | 新手入門 - 多機控制篇 | [[7. 新手入门-多机控制篇]] |
| 8 | 日誌記錄 | [[8. 日志记录]] |
| 9 | API 參考 | [[9. API参考]] |
| 10 | API 詳細介紹 | [[10. API详细介绍]] |
| 11 | 多機 API 匯總 | [[11. 多机API汇总]] |
| 12 | 多機編隊 TT | [[12. 多机编队TT]] |
| 13 | 多機編隊 EP | [[13. 多机编队EP]] |

### 三、拓展模塊

| 章節 | 說明 | 文檔 |
|------|------|------|
| 概覽 | 拓展模塊概覽 | [[拓展模块概览]] |
| 1 | 機械臂與機械爪 | [[1. 机械臂与机械爪]] |
| 2 | 舵機 | [[2. 舵机]] |
| 3 | 紅外深度傳感器 | [[3. 红外深度传感器]] |
| 4 | 傳感器轉接模塊 | [[4. 传感器转接模块]] |
| 5 | UART 接口 | [[5. UART接口]] |

### 四、開發板示例

| 章節 | 說明 | 文檔 |
|------|------|------|
| 概覽 | 開發板示例概覽 | [[开发板示例概览]] |
| 1 | IMU 陀螺儀 | [[1. IMU陀螺仪]] |
| 2 | PWM 輸出 | [[2. PWM输出]] |
| 3 | 遙控器接收 | [[3. 遥控器接收]] |
| 4 | OLED 顯示 | [[4. OLED显示]] |
| 5 | SD 卡讀寫 | [[5. SD卡读写]] |
| 6 | USB 通信 | [[6. USB通信]] |
| 7 | UWB 定位 | [[7. UWB定位]] |
| 經驗 | A 型板使用入門 | [[大疆A型板使用经验分享（一）——A型板使用入门]] |
| 經驗 | A 型板原理圖與引腳 | [[大疆A型板使用经验分享（二）——A型板原理图和引脚图]] |
| 經驗 | 時鐘樹與 GPIO 配置 | [[大疆A型板使用经验分享（三）——时钟树配置和GPIO口配置]] |
| 經驗 | PWM 與舵機控制 | [[大疆A型板使用经验分享（四）——PWM和舵机SG996的控制]] |
| 經驗 | DMA 與遙控器使用 | [[大疆A型板使用经验分享（5）——DMA配置和遥控器使用]] |
| 經驗 | GPIO 與超聲波傳感器 | [[大疆A型板使用经验分享（6）——GPIO口输入输出模式与HC-SR04超声波传感器控制]] |
| 經驗 | M3508 電機與 PID 控制 | [[大疆A型板使用经验分享（7）——大疆M3508电机和PID控制]] |
| 經驗 | FreeRTOS 操作系統 | [[大疆A型板使用经验分享（8）——FreeRTOS操作系统的使用]] |
| 實踐 | CAN 雙閉環控制 | [[基于大疆A板与STM32F427的CAN总线双闭环控制——M2006_M3508位置与速度模式实践]] |
| 教程 | M3508 PWM 控制 | [[大疆电机M3508 PWM控制]] |
| 教程 | M3508 CAN PID 控制 | [[大疆M3508电机使用CAN通信进行速度PID闭环控制详解]] |
| 入門 | CAN 通信協議 | [[从入门小白成长为嵌入式高手（二）——CAN通信协议（大疆3508电机驱动）（RoboMater篇）（上）]] |
| 入門 | 硬件與軟件準備 | [[09-开发板示例/1. 硬件与软件准备]] |
| 入門 | SBUS 遙控器通信 | [[09-开发板示例/2. 通信任务——遥控器SBUS通信]] |
| 入門 | 姿態角解算 | [[09-开发板示例/3. 传感任务——姿态角解算]] |
| 入門 | 串級 PID 控制 | [[4. 姿态控制任务——偏航角串级PID控制算法]] |
| 入門 | 電機速度 PID | [[5. 电机控制任务——电机速度PID控制算法]] |

### 五、明文 SDK

| 章節 | 說明 | 文檔 |
|------|------|------|
| 1 | 明文 SDK 介紹 | [[1. 明文SDK介绍]] |
| 2 | 接入方式 | [[2. 接入方式]] |
| 3 | 明文協議 | [[3. 明文协议]] |
| 4 | 編隊控制 | [[4. 编队控制]] |

### 五、Python 編程

| 章節 | 說明 | 文檔 |
|------|------|------|
| 1 | Python 編程介紹 | [[05-Python编程/1. Python编程介绍]] |
| 2 | Python 功能介紹 | [[05-Python编程/2. Python功能介绍]] |
| 3 | Python API | [[05-Python编程/3. Python API]] |

### 六、資源收集

| 章節 | 說明 | 文檔 |
|------|------|------|
| 1 | 官方資源 | [[0 Inbox/_processed/01-Tech/智能小车/RoboMaster/99-资源收集/官方资源]] |
| 2 | 示例代碼索引 | [[示例代码索引]] |
| 3 | 教程推薦 | [[0 Inbox/_processed/01-Tech/智能小车/RoboMaster/99-资源收集/教程推荐]] |

### 七、開發板 C 型示例

| 章節 | 說明 | 文檔 |
|------|------|------|
| 產品 | 開發板 C 型產品文檔 | [[ROBOMASTER开发板C型]] |
| 概覽 | 開發板 C 型示例概覽 | [[开发板C型示例概览]] |
| 模板 | FreeRTOS 簡化模板 | [[C-RTOS 简化模板概览]] |

### 八、RoboRTS 機器人系統

| 章節 | 說明 | 文檔 |
|------|------|------|
| 概覽 | RoboRTS 教程概覽 | [[RoboRTS教程概览]] |
| 系統架構 | 雙層架構設計 | [[architecture]] |
| 底層通信 | roborts_base 模塊 | [[roborts_base]] |
| 裝甲板檢測 | roborts_detection 模塊 | [[roborts_detection]] |
| 定位系統 | AMCL 定位 | [[roborts_localization]] |
| 決策系統 | 行為樹決策 | [[roborts_decision]] |
| 運動規劃 | 路徑規劃 | [[roborts_planning]] |

---

## 開發方式

### 1. 官方 App 編程
- **Scratch** - 圖形化編程，適合初學者
- **Python** - 內置 Python 環境，支持 EP 新增功能

### 2. Python SDK
RoboMaster SDK 是基於 Python 語言實現的軟件庫，適用於 RoboMaster EP 和 Tello Edu 等產品。

**核心功能：**
- ✅ 運動控制（底盤、雲台）
- ✅ 飛行控制（無人機）
- ✅ 智能識別（視覺、標籤）
- ✅ 燈效設置
- ✅ 數據推送
- ✅ 視頻流/音頻流
- ✅ 多機編隊控制

**設計原則：**
- 盡量簡單，快速上手
- 便於學習和教學使用

### 3. 明文 SDK
- 支持多種語言（C++、C#、Python 等）
- 適用於複雜二次開發
- 自定義協議通信
- 第三方平台集成

---

## 通信方式

### WiFi 連接

| 模式 | 說明 | 適用場景 |
|------|------|----------|
| **直連模式** | 機器人作為 AP，設備連接機器人熱點 | 單機開發、調試 |
| **路由器模式** | 機器人和設備加入同一局域網 | 多機控制、編隊 |

### 有線連接

| 方式 | 說明 |
|------|------|
| **USB 連接** | USB 直連，穩定可靠 |
| **UART 連接** | 串口通信，適合嵌入式開發 |

---

## SDK 模塊一覽

### 運動控制

| 包 | 功能 | 適用產品 |
|---|------|----------|
| `robomaster.chassis` | 底盤控制 | EP |
| `robomaster.gimbal` | 雲台控制 | EP |
| `robomaster.flight` | 飛行控制 | TT/EDU |

### 功能模塊

| 包 | 功能 | 適用產品 |
|---|------|----------|
| `robomaster.blaster` | 發射器控制 | EP |
| `robomaster.armor` | 裝甲板控制 | EP |
| `robomaster.led` | LED 燈效 | EP/TT |
| `robomaster.camera` | 相機控制 | EP/TT |
| `robomaster.vision` | 視覺識別 | EP |

### 拓展模塊

| 包 | 功能 | 適用產品 |
|---|------|----------|
| `robomaster.robotic_arm` | 機械臂控制 | EP |
| `robomaster.gripper` | 機械爪控制 | EP |
| `robomaster.servo` | 舵機控制 | EP |
| `robomaster.sensor` | 傳感器 | EP |

---

## 快速導航

### 入門指南
- 🚀 [[1. 开篇介绍|EP 套裝介紹]]
- 🛠️ [[2. 编程环境安装|Python 環境安裝]]
- 📡 [[3. 第三方平台通信|通信方式說明]]

### SDK 開發
- 📖 [[1. SDK安装|SDK 安裝指南]]
- 🎮 [[5. 新手入门-EP篇|EP 控制入門]]
- 🚁 [[6. 新手入门-无人机篇|無人機控制入門]]
- 🤖 [[7. 新手入门-多机控制篇|多機編隊入門]]

### 進階開發
- 📚 [[10. API详细介绍|API 詳細文檔]]
- 🔧 [[拓展模块概览|拓展模塊]]
- 📡 [[1. 明文SDK介绍|明文 SDK]]

---

## 最近更新

```dataview
Table without id file.link as "文件", file.mtime as "更新時間"
WHERE contains(file.path, this.file.folder) AND file.name != this.file.name
SORT file.mtime DESC
LIMIT 10
```

---

## 官方資源

- **GitHub**: [dji-sdk/RoboMaster-SDK](https://github.com/dji-sdk/RoboMaster-SDK)
- **官方文檔**: https://robomaster-dev.readthedocs.io/
- **Gitee 鏡像**: https://gitee.com/xitinglin/RoboMaster-SDK

---

## 版本信息

- **產品**: RoboMaster EP 教育套裝
- **SDK 版本**: 參考 [官方版本說明](https://robomaster-dev.readthedocs.io/zh-cn/latest/version.html)
- **文檔構建日期**: 2022-11-10
- **知識庫創建日期**: 2026-05-23
