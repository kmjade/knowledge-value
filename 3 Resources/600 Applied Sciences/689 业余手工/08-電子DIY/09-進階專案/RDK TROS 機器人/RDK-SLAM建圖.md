---
title: RDK-SLAM建圖
tags: [RDK, SLAM, 旭日X3派, ROS2, Gazebo, 導航]
created: 2026-05-29
aliases: [SLAM, 即時定位與地圖構建, SLAM-Toolbox]
source: https://d-robotics.github.io/rdk_doc/Robot_development/apps/slam
---

# RDK SLAM 建圖 SLAM Mapping

> SLAM = Simultaneous Localization and Mapping（即時定位與地圖構建）——讓機器人知道自己在哪、周圍長什麼樣。

## 功能介紹

使用 ROS2 的 **SLAM-Toolbox** 作為建圖算法，在 Gazebo 模擬器中控制小車行駛建立地圖，並通過 Rviz2 觀察建圖效果。

- SLAM-Toolbox 運行在 **RDK 板端**
- Gazebo 和 Rviz2 運行在 **PC 端**（與 RDK 同一網段）

## 支援平台

| 平台 | 系統 | ROS2 |
|------|------|------|
| RDK X3 / X3 Module | Ubuntu 20.04 | Foxy |
| RDK X3 / X3 Module | Ubuntu 22.04 | Humble |
| RDK X5 / X5 Module | Ubuntu 22.04 | Humble |
| RDK Ultra | Ubuntu 20.04 | Foxy |

## 環境準備

### RDK 端

```bash
# 安裝 SLAM-Toolbox
# Foxy:
sudo apt-get install ros-foxy-slam-toolbox
# Humble:
sudo apt-get install ros-humble-slam-toolbox
```

> 如果安裝失敗：`apt update && sudo apt install libwebp6=0.6.1-2ubuntu0.20.04.3`

### PC 端（需安裝 ROS2 桌面版）

```bash
# 安裝 Gazebo 和 TurtleBot3 相關包
# Foxy:
sudo apt-get install ros-foxy-gazebo-*
sudo apt install ros-foxy-turtlebot3 ros-foxy-turtlebot3-bringup
sudo apt install ros-foxy-turtlebot3-simulations
sudo apt install ros-foxy-teleop-twist-keyboard

# Humble:
sudo apt-get install ros-humble-gazebo-*
sudo apt install ros-humble-turtlebot3 ros-humble-turtlebot3-bringup
sudo apt install ros-humble-turtlebot3-simulations
sudo apt install ros-humble-teleop-twist-keyboard
```

## 操作步驟 Step-by-Step

### 1. PC 端啟動 Gazebo 模擬環境

```bash
source /opt/ros/foxy/setup.bash   # 或 humble
export TURTLEBOT3_MODEL=burger
ros2 launch turtlebot3_gazebo turtlebot3_world.launch.py
```

> 報錯 `[ERROR] [gzclient-2]: process has died` → 執行 `source /usr/share/gazebo/setup.sh`

### 2. PC 端啟動 Rviz2

```bash
# 新開終端
source /opt/ros/foxy/setup.bash
ros2 launch turtlebot3_bringup rviz2.launch.py
```

在 Rviz2 中添加 **"map"** 可視化選項以顯示地圖。

### 3. RDK 端運行 SLAM-Toolbox

```bash
# 配置 tros.b 環境
source /opt/tros/setup.bash       # Foxy
# 或 source /opt/tros/humble/setup.bash  # Humble

# 啟動 SLAM
ros2 launch slam_toolbox online_sync_launch.py
```

### 4. PC 端遙控小車

```bash
# 新開終端
source /opt/ros/foxy/setup.bash
ros2 run teleop_twist_keyboard teleop_twist_keyboard
```

用鍵盤控制小車移動，隨著雷達探測到更多環境資訊，SLAM 算法建立環境地圖。

## 系統架構

```
┌─────────────┐    雷射數據     ┌──────────────┐
│   Gazebo    │ ─────────────→ │  RDK (X3/X5) │
│  (模擬環境)  │                │ SLAM-Toolbox  │
│  TurtleBot3 │ ←───────────── │   建圖算法     │
└─────────────┘   速度指令      └──────┬───────┘
                                      │ 地圖數據
                                 ┌────▼───────┐
                                 │    Rviz2    │
                                 │  (可視化)    │
                                 └────────────┘
```

## 結果分析

RDK 端輸出：

```
[INFO] [slam_toolbox]: Node using stack size 40000000
[INFO] [slam_toolbox]: Using solver plugin solver_plugins::CeresSolver
Registering sensor: [Custom Described Lidar]
```

> 雷射雷達最大範圍設為 20m（超過實際雷達 3.5m），系統會自動調整。

## 進階擴展

- **實際雷達部署**：將 Gazebo 模擬替換為真實 RPLIDAR/單線雷射雷達
- **自主導航**：結合 Nav2 實現路徑規劃與避障
- **多感測器融合**：IMU + 里程計 + 雷射雷達提高建圖精度

## 相關資源

- [[RDK-TROS機器人開發|TROS 機器人開發]]
- [[RDK-AMR開發指南|AMR 自主導航]]
- [[RDK-深度學習巡線小車|深度學習巡線小車]]
