# Plan: 智能小車深化 — OriginBot + ROS2 整合文檔

**日期**: 2026-05-29
**計劃類型**: KB 構建（知識庫擴展）
**父級**: [[Applied Sciences + LLM-Wiki 整合系统架构设计 v1.0|Applied Sciences v1.0]] P0 路線
**目標路徑**: `3 Resources/600 Applied Sciences Engineering/689 业余手工/08-電子DIY/智能小车/`

---

## 1. 目標 Goal

在現有智能小車 KB（115+ 文件，涵蓋 RoboMaster/MicroROS/UGV/RDK/STM32）基礎上，新增 **OriginBot + ROS2** 深度整合文檔，形成從硬體組裝 → ROS2 開發 → 自主導航的完整知識鏈。

## 2. 現狀分析 Current State

### 2.1 已覆蓋領域

| 子領域 | 文件數 | 深度 |
|--------|:---:|------|
| RoboMaster (DJI) | 100+ | SDK、Python/C++、多機編隊、拓展模組 — 非常詳盡 |
| UGV01/UGV02 (Waveshare) | 8 | 產品介紹、JSON 指令集、對比 — 完整 |
| RDK (D-Robotics) | 5 | TROS、FCOS、SLAM、巡線小車、感測器 — 中等 |
| STM32 四驅小車 | 5 | 硬體、PID 控制、姿態解算 — 中等 |
| MicroROS | 2 | 控制板硬體 — 較淺 |
| **OriginBot** | **0** | **僅在巡線小車文檔中提及** ❌ |
| **ROS2 基礎** | **0** | **無專用文檔** ❌ |
| **Nav2 導航** | **0** | **僅在 SLAM 文檔中側面提及** ❌ |

### 2.2 現有整合點

- RDK-深度學習巡線小車.md 提到 OriginBot 作為底盤方案
- RDK-SLAM建圖.md 使用 TurtleBot3 + Gazebo 模擬
- RDK-TROS機器人開發.md 介紹了 TROS 與 ROS2 的關係
- UGV JSON 指令集包含 `CMD_ROS_CTRL` (T=2) 用於 ROS Twist 控制

### 2.3 OriginBot 外部資源

- 官網：https://www.originbot.org
- 開源硬體：GitHub 上有結構圖紙
- 軟體棧：基於 RDK X3 + TogetheROS.Bot
- 教程：組裝、燒錄、ROS2 基礎、SLAM、自主導航

## 3. 計劃範圍 Scope

### Phase 1: OriginBot 硬體與組裝 (2 文件)

| # | 文件 | 內容 | 預估行數 |
|:--:|------|------|:--:|
| 1 | `OriginBot-硬體規格與組裝.md` | 底盤規格、零件清單、組裝步驟、接線圖 | ~120 |
| 2 | `OriginBot-軟體環境搭建.md` | RDK X3 燒錄、TROS 安裝、網路配置、SSH | ~100 |

### Phase 2: ROS2 基礎（智能小車場景） (3 文件)

| # | 文件 | 內容 | 預估行數 |
|:--:|------|------|:--:|
| 3 | `ROS2-基礎概念與安裝.md` | Node/Topic/Service、Colcon、Workspace | ~130 |
| 4 | `ROS2-Twist控制與里程計.md` | `/cmd_vel`、Odometry、TF2、小車運動模型 | ~140 |
| 5 | `ROS2-感測器整合（LiDAR+Camera）.md` | LaserScan、Image、CameraInfo、rviz2 | ~120 |

### Phase 3: OriginBot + RDK 深度整合 (3 文件)

| # | 文件 | 內容 | 預估行數 |
|:--:|------|------|:--:|
| 6 | `OriginBot-底盤控制節點.md` | 差速驅動、PID 調速、UART 通訊協議 | ~130 |
| 7 | `OriginBot-感測器驅動.md` | LiDAR (RPLIDAR/YDLIDAR)、IMU、Camera | ~120 |
| 8 | `OriginBot-TROS整合實戰.md` | hobot_sensor、hobot_dnn、zero-copy、Web 可視化 | ~150 |

### Phase 4: Nav2 自主導航 (2 文件)

| # | 文件 | 內容 | 預估行數 |
|:--:|------|------|:--:|
| 9 | `Nav2-自主導航基礎.md` | Nav2 架構、BT/Planner/Controller、Costmap | ~140 |
| 10 | `OriginBot-Nav2導航實戰.md` | 完整流程：建圖→定位→路徑規劃→避障 | ~150 |

### Phase 5: 更新導航與索引 (2-3 文件)

| # | 文件 | 操作 |
|:--:|------|------|
| 11 | `智能小车.md` | 更新 MOC，加入 OriginBot/ROS2 導航入口 |
| 12 | `08-電子DIY.md` | 可選：如有需要加入 ROS2 快速鏈接 |
| 13 | `Applied Sciences v1.0.md` | 更新路線圖狀態 |

## 4. 文件結構預覽

```
智能小车/
├── 智能小车.md                          ← 更新 MOC
│
├── OriginBot/                           ← 🆕 新子目錄
│   ├── OriginBot-硬體規格與組裝.md
│   ├── OriginBot-軟體環境搭建.md
│   ├── OriginBot-底盤控制節點.md
│   ├── OriginBot-感測器驅動.md
│   ├── OriginBot-TROS整合實戰.md
│   └── OriginBot-Nav2導航實戰.md
│
├── ROS2/                                ← 🆕 新子目錄
│   ├── ROS2-基礎概念與安裝.md
│   ├── ROS2-Twist控制與里程計.md
│   └── ROS2-感測器整合.md
│
├── Nav2/                                ← 🆕 新子目錄
│   └── Nav2-自主導航基礎.md
│
├── RoboMaster/                          ← 現有
├── MicroROS/                            ← 現有
├── UGV*.md                              ← 現有
├── RDK-*.md                             ← 現有
├── 旭日X3派*.md                         ← 現有
└── STM32*.md                            ← 現有
```

## 5. 內容標準

- **語言**：繁體中文正文 + English 技術術語
- **程式碼**：fenced code block with language tag (` ```bash `, ` ```python `, ` ```xml `)
- **規格表**：Markdown 表格
- **來源**：OriginBot 官網 / ROS2 官方文檔，使用 `source:` frontmatter
- **內部鏈接**：`[[]]` wikilink 連接 vault 內相關文檔

## 6. 外部來源

| 來源 | URL | 用途 |
|------|-----|------|
| OriginBot 官網 | https://www.originbot.org | 硬體規格、組裝、軟體棧 |
| ROS2 官方文檔 | https://docs.ros.org/en/humble/ | ROS2 基礎概念 |
| Nav2 文檔 | https://navigation.ros.org/ | Nav2 導航棧 |
| TROS 文檔 | https://d-robotics.github.io/rdk_doc/ | TogetheROS.Bot 整合 |
| RDK 文檔 | https://d-robotics.github.io/rdk_doc/RDK | RDK X3 平台 |

## 7. 驗證 Validation

- [ ] 所有 10 個新 .md 文件創建
- [ ] 所有 wikilink 可解析（`[[目標]]` 目標存在）
- [ ] Frontmatter 完整（title, tags, created, aliases）
- [ ] 智能小车.md MOC 更新，包含新子目錄導航
- [ ] 所有程式碼範例有語言標記
- [ ] Git commit + push

## 8. 風險與取捨 Risks & Tradeoffs

| 風險 | 緩解 |
|------|------|
| OriginBot 官網內容可能不完整 | 輔以 ROS2/TROS 官方文檔補充 |
| WSL/NTFS git 操作可能超時 | 分批 commit，push 時設定 120s timeout |
| Nav2 主題過大 | 先做基礎架構 + 實戰，深度擴展留到後續 |
| 與現有 RDK 文檔重疊 | 交叉引用現有文檔，避免重複內容 |

## 9. 實施順序 Execution Order

```
Phase 1 (OriginBot 硬體) → 2 文件
Phase 2 (ROS2 基礎)     → 3 文件
Phase 3 (OriginBot 整合) → 3 文件
Phase 4 (Nav2 導航)     → 2 文件
Phase 5 (更新導航)      → MOC 更新 + commit
```

預計總文件數：**13**（10 新文件 + 2-3 更新）
預計總行數：~1,300–1,500
